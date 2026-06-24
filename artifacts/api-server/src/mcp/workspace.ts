import fs from "node:fs";
import path from "node:path";

function findWorkspaceRoot(start: string): string {
  let dir = path.resolve(start);
  for (;;) {
    if (fs.existsSync(path.join(dir, "pnpm-workspace.yaml"))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      return path.resolve(start);
    }
    dir = parent;
  }
}

export const WORKSPACE_ROOT = findWorkspaceRoot(process.cwd());

const IGNORED_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  ".cache",
  ".pnpm-store",
]);

export function isIgnoredDir(name: string): boolean {
  return IGNORED_DIRS.has(name);
}

/**
 * Resolve a workspace-relative path to an absolute path, rejecting any path
 * that would escape the workspace root (path traversal protection).
 */
export function resolveSafe(relPath: string): string {
  const cleaned = relPath.replace(/^[/\\]+/, "");
  const resolved = path.resolve(WORKSPACE_ROOT, cleaned);
  const rootWithSep = WORKSPACE_ROOT.endsWith(path.sep)
    ? WORKSPACE_ROOT
    : WORKSPACE_ROOT + path.sep;
  if (resolved !== WORKSPACE_ROOT && !resolved.startsWith(rootWithSep)) {
    throw new Error(`Path "${relPath}" escapes the workspace root`);
  }
  return resolved;
}

export function toRelative(absPath: string): string {
  const rel = path.relative(WORKSPACE_ROOT, absPath);
  return rel === "" ? "." : rel;
}
