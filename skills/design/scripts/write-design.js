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

  const docDir = path.join(process.cwd(), "doc", moduleName);
  const reqPath = path.join(docDir, "requirements.md");
  const outPath = path.join(docDir, "design.md");

  if (!fs.existsSync(reqPath)) {
    console.error(`[ERROR] requirements.md not found: ${path.relative(process.cwd(), reqPath)}`);
    console.error("Please run requirements_md for the same module first.");
    process.exit(2);
  }

  let content = (process.env.CODEX_GENERATED_MD || "").trim();
  if (!content) content = readStdin();
  if (!content) {
    console.error("[ERROR] No markdown content provided. Use stdin or CODEX_GENERATED_MD.");
    process.exit(2);
  }

  const mustHave = [
    "# 设计文档",
    "## 概述",
    "## 架构",
    "## 组件和接口",
    "## 数据模型",
    "## 正确性属性",
    "## 错误处理",
    "## 测试策略",
    "## 实现注意事项",
  ];
  for (const k of mustHave) {
    if (!content.includes(k)) {
      console.error(`[ERROR] Missing required section: ${k}`);
      process.exit(2);
    }
  }

  fs.mkdirSync(docDir, { recursive: true });
  fs.writeFileSync(outPath, content.replace(/\s+$/g, "") + "\n", "utf-8");
  console.log(`[OK] Wrote ${path.relative(process.cwd(), outPath)}`);
}

main();
