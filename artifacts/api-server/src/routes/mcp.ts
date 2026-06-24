import { createHash, timingSafeEqual } from "node:crypto";
import { Router, type IRouter, type RequestHandler } from "express";
import express from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createMcpServer } from "../mcp/server";

const router: IRouter = Router();

router.use(express.json({ limit: "50mb" }));

function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

const requireMcpToken: RequestHandler = (req, res, next) => {
  const expected = process.env["MCP_AUTH_TOKEN"];
  if (!expected) {
    res
      .status(503)
      .json({ error: "MCP server not configured: MCP_AUTH_TOKEN is unset." });
    return;
  }
  const header = req.headers.authorization ?? "";
  const provided = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!provided || !safeEqual(provided, expected)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
};

router.post("/mcp", requireMcpToken, async (req, res) => {
  const server = createMcpServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });
  res.on("close", () => {
    void transport.close();
    void server.close();
  });
  try {
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    req.log?.error({ err }, "MCP request failed");
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal MCP server error" });
    }
  }
});

const methodNotAllowed: RequestHandler = (_req, res) => {
  res.status(405).json({ error: "Method not allowed. Use POST." });
};

router.get("/mcp", requireMcpToken, methodNotAllowed);
router.delete("/mcp", requireMcpToken, methodNotAllowed);

export default router;
