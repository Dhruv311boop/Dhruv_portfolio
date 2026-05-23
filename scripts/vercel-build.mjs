import { cpSync, existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = dirname(scriptDir);
const portfolioDir = join(repoRoot, "artifacts", "portfolio");
const portfolioOutput = join(portfolioDir, "dist", "public");
const vercelOutput = join(process.cwd(), "public");

const result = spawnSync(
  process.execPath,
  [join(portfolioDir, "node_modules", "vite", "bin", "vite.js"), "build", "--config", "vite.config.ts"],
  {
    cwd: portfolioDir,
    stdio: "inherit",
    env: {
      ...process.env,
      BASE_PATH: process.env.BASE_PATH ?? "/",
    },
  },
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

if (!existsSync(portfolioOutput)) {
  throw new Error(`Portfolio build output was not found at ${portfolioOutput}`);
}

rmSync(vercelOutput, { recursive: true, force: true });
cpSync(portfolioOutput, vercelOutput, { recursive: true });
