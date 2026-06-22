#!/usr/bin/env node
/**
 * Create a new diary entry from the command line.
 *
 *   npm run new -- "My post title"
 *
 * Produces src/posts/YYYY-MM-DD-my-post-title.md with frontmatter ready to go.
 */
const fs = require("fs");
const path = require("path");

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
  console.error('Usage: npm run new -- "My post title"');
  process.exit(1);
}

const now = new Date();
const yyyy = now.getFullYear();
const mm = String(now.getMonth() + 1).padStart(2, "0");
const dd = String(now.getDate()).padStart(2, "0");

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const filename = `${yyyy}-${mm}-${dd}-${slug || "entry"}.md`;
const dir = path.join(__dirname, "..", "src", "posts");
const filepath = path.join(dir, filename);

if (fs.existsSync(filepath)) {
  console.error("A post with that name already exists:", filepath);
  process.exit(1);
}

const body = `---
title: "${title.replace(/"/g, '\\"')}"
date: ${yyyy}-${mm}-${dd}
description: ""
tags: []
---

Write your entry here…
`;

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(filepath, body, "utf8");
console.log("Created " + path.relative(path.join(__dirname, ".."), filepath));
