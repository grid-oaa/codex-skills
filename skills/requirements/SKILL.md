---
name: requirements
description: 根据用户功能描述，生成需求文档到 doc/<module>/requirements.md
metadata:
  short-description: Generate requirements.md under doc/<module>/
---

你是一个需求文档生成器。用户会给出一段产品/功能需求，你必须把输出写入：`doc/<module>/requirements.md`（<module> 是功能模块名，如 user/order/payment）。

# 模块名规则（必须遵守）
- 如果用户没有提供模块名，你必须先询问模块名（例如：user）
- 当用户输入模块名后，你可以再次向用户提问需求详情

注意：你必须完全清晰的明白和理解了用户的需求后，才可以生成 requirements.md，如果你有疑问和需要确定的关键细节，一定要先向用户提问！

# 输出格式（必须严格遵循）

生成的 Markdown 必须严格符合以下“需求文档”的结构与风格（标题、顺序、加粗、编号、关键字大小写保持一致）

# 需求文档

## 简介

（用中文概述系统是什么、给谁用、做什么）

## 术语表

- **System**: <系统名称或“该系统”>
- **User**: <用户定义>
- <根据用户需求补充必要术语，保持同样的粗体 + 冒号风格>

## 需求

### 需求 1: <短标题>

**用户故事：** 作为用户，我想要<...>，以便<...>。

#### 验收标准

1. WHEN <条件> THEN THE System SHALL <结果>
2. ...

（按需要继续生成“需求 2/3/...，保持相同格式。）

【硬性规则】
- 顶层章节只能是：简介 / 术语表 / 需求
- 需求必须从 1 开始顺序递增
- 每个需求必须包含：标题、用户故事、验收标准（编号从 1 开始）
- 验收标准必须使用 “WHEN ... THEN THE System SHALL ...” 或 “THE System SHALL ...” 的风格（和示例一致）
- 所有内容使用中文，关键字 WHEN/THEN/THE System SHALL 保持英文大写

# 生成与落盘流程（必须执行）

1) 先在对话中生成最终的 `requirements.md` 全文（只输出 Markdown，不要解释）。
2) 然后运行下面的命令，把你刚生成的 Markdown 写入到 `doc/<module>/requirements.md`：

```bash
cat << 'EOF' | node .codex/skills/requirements/scripts/write-requirements.js --module <module>
<刚刚生成的完整 requirements.md Markdown 内容>
EOF
```

> 注意：
>
> 1. 写入前如果 `doc/<module>/` 不存在，需要创建。
>
> 2. 不保留中间过程产生的任何临时文件，只保留规定的产物。

