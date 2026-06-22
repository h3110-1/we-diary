# we diary

A personal static blog / diary. Write entries in **markdown**, run one command,
and get a clean, styled website. No database, no server to run, nothing to break.

Built with [Eleventy](https://www.11ty.dev/).

## Quick start

```bash
npm install        # one time
npm start          # local preview at http://localhost:8080 with live reload
```

Leave `npm start` running and edit files — the page reloads as you save.

## Writing a new entry

```bash
npm run new -- "The title of my entry"
```

This creates a dated markdown file in `src/posts/`, e.g.
`src/posts/2026-06-22-the-title-of-my-entry.md`, with the frontmatter filled in:

```markdown
---
title: "The title of my entry"
date: 2026-06-22
description: ""     # one line shown in the post list (optional)
tags: []            # e.g. ["days", "travel"] (optional)
---

Write your entry here…
```

Everything below the second `---` is plain markdown: headings, **bold**,
*italic*, lists, > quotes, `code`, [links](https://example.com), and images.

## Building the finished site

```bash
npm run build      # writes the static site to _site/
```

Upload the contents of `_site/` to any static host (GitHub Pages, Netlify,
Cloudflare Pages, an S3 bucket — anywhere). Or just open `_site/index.html`.

## Project layout

```
src/
  _data/site.js            # site title, author, tagline — edit to taste
  _includes/
    layouts/base.njk       # page shell (header, footer, <head>)
    layouts/post.njk       # single-entry layout
    postslist.njk          # the reusable list of entries
  css/style.css            # the whole theme lives here
  assets/                  # images & downloads → copied to /assets/
  posts/                   # your entries (one markdown file each)
  index.njk                # home page
  archive.njk              # full list of entries
  about.md                 # about page
eleventy.config.js         # build config (filters, collections)
scripts/new-post.js        # the `npm run new` helper
```

## Customising

- **Title / author / tagline:** `src/_data/site.js`
- **Colours & fonts:** the `:root` block at the top of `src/css/style.css`
  (it has a dark-mode section too).
- **Navigation links:** `src/_includes/layouts/base.njk`

## Commands

| Command | What it does |
| --- | --- |
| `npm start` | Local preview with live reload |
| `npm run build` | Generate the static site into `_site/` |
| `npm run new -- "Title"` | Scaffold a new dated entry |
| `npm run clean` | Delete the `_site/` output folder |
