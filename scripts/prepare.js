#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const bin = (name) =>
  join(root, "node_modules", ".bin", process.platform === "win32" ? `${name}.cmd` : name);
const hasPath = (path) => existsSync(join(root, path));
const run = (command, args) => {
  const child = spawnSync(command, args, { cwd: root, stdio: "inherit" });
  if (child.error) throw child.error;
  if (child.status !== 0) process.exit(child.status ?? 1);
};

const simpleGitHooks = bin("simple-git-hooks");
if (existsSync(simpleGitHooks)) run(simpleGitHooks, []);

if (existsSync(bin("tsc")) && existsSync(bin("vite"))) {
  run("npm", ["run", "build"]);
} else if (!hasPath("dist/server/index.js") || !hasPath("viewer/dist/index.html")) {
  console.error("sideshow prepare: build output missing and dev dependencies are not installed");
  process.exit(1);
}
