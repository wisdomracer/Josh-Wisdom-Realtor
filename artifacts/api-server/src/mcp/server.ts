import fs from "node:fs/promises";
import path from "node:path";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  WORKSPACE_ROOT,
  isIgnoredDir,
  resolveSafe,
  toRelative,
} from "./workspace";

const MAX_SEARCH_RESULTS = 200;
const MAX_SEARCH_FILE_BYTES = 1_000_000;

type ToolResult = {
  content: { type: "text"; text: string }[];
  isError?: boolean;
};

function ok(text: string): ToolResult {
  return { content: [{ type: "text", text }] };
}

async function listDirectory(relPath: string): Promise<ToolResult> {
  const abs = resolveSafe(relPath);
  const entries = await fs.readdir(abs, { withFileTypes: true });
  const lines = entries
    .map((e) => `${e.isDirectory() ? "dir " : "file"}  ${e.name}`)
    .sort();
  return ok(
    `Contents of ${toRelative(abs)} (${entries.length} entries):\n${lines.join("\n")}`,
  );
}

async function readFile(relPath: string): Promise<ToolResult> {
  const abs = resolveSafe(relPath);
  const content = await fs.readFile(abs, "utf8");
  return ok(content);
}

async function writeFile(
  relPath: string,
  content: string,
): Promise<ToolResult> {
  const abs = resolveSafe(relPath);
  await fs.mkdir(path.dirname(abs), { recursive: true });
  await fs.writeFile(abs, content, "utf8");
  return ok(`Wrote ${content.length} bytes to ${toRelative(abs)}`);
}

async function createDirectory(relPath: string): Promise<ToolResult> {
  const abs = resolveSafe(relPath);
  await fs.mkdir(abs, { recursive: true });
  return ok(`Created directory ${toRelative(abs)}`);
}

async function deletePath(relPath: string): Promise<ToolResult> {
  const abs = resolveSafe(relPath);
  if (abs === WORKSPACE_ROOT) {
    throw new Error("Refusing to delete the workspace root");
  }
  await fs.rm(abs, { recursive: true, force: true });
  return ok(`Deleted ${toRelative(abs)}`);
}

async function movePath(
  source: string,
  destination: string,
): Promise<ToolResult> {
  const absSource = resolveSafe(source);
  const absDest = resolveSafe(destination);
  await fs.mkdir(path.dirname(absDest), { recursive: true });
  await fs.rename(absSource, absDest);
  return ok(`Moved ${toRelative(absSource)} -> ${toRelative(absDest)}`);
}

async function searchFiles(
  query: string,
  relPath: string | undefined,
): Promise<ToolResult> {
  const root = resolveSafe(relPath ?? ".");
  const matches: string[] = [];

  async function walk(dir: string): Promise<void> {
    if (matches.length >= MAX_SEARCH_RESULTS) return;
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (matches.length >= MAX_SEARCH_RESULTS) return;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (isIgnoredDir(entry.name)) continue;
        await walk(full);
      } else if (entry.isFile()) {
        let content;
        try {
          const stat = await fs.stat(full);
          if (stat.size > MAX_SEARCH_FILE_BYTES) continue;
          content = await fs.readFile(full, "utf8");
        } catch {
          continue;
        }
        const lines = content.split("\n");
        for (let i = 0; i < lines.length; i++) {
          if (lines[i]!.includes(query)) {
            matches.push(`${toRelative(full)}:${i + 1}: ${lines[i]!.trim()}`);
            if (matches.length >= MAX_SEARCH_RESULTS) break;
          }
        }
      }
    }
  }

  await walk(root);
  if (matches.length === 0) {
    return ok(`No matches for "${query}" under ${toRelative(root)}`);
  }
  return ok(
    `${matches.length} match(es) for "${query}":\n${matches.join("\n")}`,
  );
}

const TOOLS = [
  {
    name: "list_directory",
    description:
      "List files and subdirectories at a workspace-relative path. Use '.' for the project root.",
    inputSchema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          description: "Workspace-relative directory path (e.g. 'artifacts/propflow/src').",
        },
      },
      required: ["path"],
    },
  },
  {
    name: "read_file",
    description: "Read the full UTF-8 text contents of a workspace-relative file.",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Workspace-relative file path." },
      },
      required: ["path"],
    },
  },
  {
    name: "write_file",
    description:
      "Create or overwrite a file with the given UTF-8 content. Parent directories are created automatically.",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Workspace-relative file path." },
        content: { type: "string", description: "Full file content to write." },
      },
      required: ["path", "content"],
    },
  },
  {
    name: "create_directory",
    description: "Create a directory (recursively) at a workspace-relative path.",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Workspace-relative directory path." },
      },
      required: ["path"],
    },
  },
  {
    name: "delete_path",
    description: "Delete a file or directory (recursively) at a workspace-relative path.",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Workspace-relative path to delete." },
      },
      required: ["path"],
    },
  },
  {
    name: "move_path",
    description: "Move or rename a file or directory within the workspace.",
    inputSchema: {
      type: "object",
      properties: {
        source: { type: "string", description: "Existing workspace-relative path." },
        destination: { type: "string", description: "Target workspace-relative path." },
      },
      required: ["source", "destination"],
    },
  },
  {
    name: "search_files",
    description:
      "Search file contents for a literal substring under a workspace-relative directory (defaults to the project root). Skips node_modules, .git, and dist.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Literal substring to search for." },
        path: {
          type: "string",
          description: "Optional workspace-relative directory to search within.",
        },
      },
      required: ["query"],
    },
  },
];

export function createMcpServer(): Server {
  const server = new Server(
    { name: "replit-workspace-fs", version: "1.0.0" },
    { capabilities: { tools: {} } },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: TOOLS,
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: rawArgs } = request.params;
    const args = (rawArgs ?? {}) as Record<string, unknown>;
    try {
      switch (name) {
        case "list_directory":
          return await listDirectory(String(args.path ?? ""));
        case "read_file":
          return await readFile(String(args.path ?? ""));
        case "write_file":
          return await writeFile(
            String(args.path ?? ""),
            String(args.content ?? ""),
          );
        case "create_directory":
          return await createDirectory(String(args.path ?? ""));
        case "delete_path":
          return await deletePath(String(args.path ?? ""));
        case "move_path":
          return await movePath(
            String(args.source ?? ""),
            String(args.destination ?? ""),
          );
        case "search_files":
          return await searchFiles(
            String(args.query ?? ""),
            args.path === undefined ? undefined : String(args.path),
          );
        default:
          return {
            content: [{ type: "text", text: `Unknown tool: ${name}` }],
            isError: true,
          };
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        content: [{ type: "text", text: `Error: ${message}` }],
        isError: true,
      };
    }
  });

  return server;
}
