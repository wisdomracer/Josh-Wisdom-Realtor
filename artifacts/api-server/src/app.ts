import express, { type ErrorRequestHandler, type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();
app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  if (process.env.NODE_ENV === "production") {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
  next();
});

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

const allowedOrigins = new Set([
  "https://joshwisdomrealtor.com",
  "https://www.joshwisdomrealtor.com",
  ...(process.env.CORS_ORIGINS ?? "").split(",").map((origin) => origin.trim()).filter(Boolean),
]);

app.use(cors({
  credentials: true,
  origin(origin, callback) {
    if (!origin || process.env.NODE_ENV !== "production" || allowedOrigins.has(origin)) callback(null, true);
    else callback(new Error("Origin not allowed"));
  },
}));
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true, limit: "32kb" }));

app.use("/api", router);

const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  req.log.error({ err: error }, "request failed");
  const forbidden = error instanceof Error && error.message === "Origin not allowed";
  res.status(forbidden ? 403 : 500).json({ error: forbidden ? "Origin not allowed" : "Internal server error" });
};

app.use(errorHandler);

export default app;
