#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

function parseModuleArg(argv) {
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--module" && argv[i + 1]) return argv[i + 1];
  }
  return "";
}

function isValidModuleName(name) {
  return /^[A-Za-z0-9_-]+$/.test(name);
}

function readStdin() {
  try {
    return fs.readFileSync(0, "utf-8").trim();
  } catch {
    return "";
  }
}

function main() {
  const moduleName = parseModuleArg(process.argv.slice(2));

  if (!moduleName) {
    console.error("[ERROR] Missing --module. Example: --module user");
    process.exit(2);
  }
  if (!isValidModuleName(moduleName)) {
    console.error("[ERROR] Invalid module name. Allowed: letters/digits/_/- (e.g., user, order-center).");
    process.exit(2);
  }

  let content = (process.env.CODEX_GENERATED_MD || "").trim();
  if (!content) content = readStdin();
  if (!content) {
    console.error("[ERROR] No markdown content provided. Use stdin or CODEX_GENERATED_MD.");
    process.exit(2);
  }

  const mustHave = ["# 需求文档", "## 简介", "## 术语表", "## 需求"];
  for (const k of mustHave) {
    if (!content.includes(k)) {
      console.error(`[ERROR] Missing required section: ${k}`);
      process.exit(2);
    }
  }

  const outDir = path.join(process.cwd(), "doc", moduleName);
  const outPath = path.join(outDir, "requirements.md");

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, content.replace(/\s+$/g, "") + "\n", "utf-8");
  console.log(`[OK] Wrote ${path.relative(process.cwd(), outPath)}`);
}

main();
