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

// Canonical (symlink-resolved) workspace root, used to enforce that no path —
// even one reachable through an in-workspace symlink — escapes the boundary.
const REAL_ROOT = fs.realpathSync(WORKSPACE_ROOT);

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

function within(root: string, target: string): boolean {
  if (target === root) return true;
  const rootWithSep = root.endsWith(path.sep) ? root : root + path.sep;
  return target.startsWith(rootWithSep);
}

/**
 * Resolve a workspace-relative path to an absolute path, rejecting any path
 * that would escape the workspace root (path traversal protection), including
 * escapes via in-workspace symlinks.
 */
export function resolveSafe(relPath: string): string {
  const cleaned = relPath.replace(/^[/\\]+/, "");
  const resolved = path.resolve(WORKSPACE_ROOT, cleaned);

  // Lexical containment check (fast path, catches "../" traversal).
  if (!within(WORKSPACE_ROOT, resolved)) {
    throw new Error(`Path "${relPath}" escapes the workspace root`);
  }

  // Symlink-aware check: canonicalize the nearest existing ancestor and ensure
  // it still resolves inside the real workspace root. This blocks escapes via
  // an in-workspace symlink that points outside the tree.
  let ancestor = resolved;
  for (;;) {
    if (fs.existsSync(ancestor)) {
      const realAncestor = fs.realpathSync(ancestor);
      if (!within(REAL_ROOT, realAncestor)) {
        throw new Error(`Path "${relPath}" escapes the workspace root`);
      }
      break;
    }
    const parent = path.dirname(ancestor);
    if (parent === ancestor) break;
    ancestor = parent;
  }

  return resolved;
}

export function toRelative(absPath: string): string {
  const rel = path.relative(WORKSPACE_ROOT, absPath);
  return rel === "" ? "." : rel;
}
