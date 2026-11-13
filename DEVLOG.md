# How the dev log works

The dev log lives at https://www.foundersplot.com/devlog/. Nothing goes live until Charles merges a pull request.

## Each Friday

1. The Friday routine writes the week's post as markdown and commits it on a new branch on Charles's PC (the PC can't push to GitHub). Charles's main Claude session checks every claim, pushes the branch and opens a pull request titled "Dev log: (date)".
2. Charles reads it on GitHub. Open the pull request, then "Files changed", then the `.md` file and "View file" to read it formatted.
3. To fix wording, edit the `.md` file right there (the pencil icon) and commit to the same branch. A GitHub Action rebuilds the pages in the pull request within a minute.
4. **Merge = publish.** GitHub Pages puts it live about a minute after the merge. **Close the pull request = nothing goes live.**

## Files

| What | Where |
|---|---|
| Weekly post | `devlog/posts/YYYY-MM-DD-short-title.md` |
| Build script | `scripts/build-devlog.mjs` (plain Node, nothing to install) |

- The first line of each file is the title, starting with `# ` (for example `# Dev Log #16: The Market Gets Busy`).
- The rest is plain markdown: paragraphs, `**bold**`, `*italic*`, `[links](https://...)`, `## ` headings, `- ` lists, `> ` quotes.
- The file name is the page address (`/devlog/2026-11-14-short-title.html`), so only rename a file before it is published. Lowercase letters, numbers and dashes.
- Every `.html` file under `devlog/`, plus the "latest posts" block on the home page and the dev log lines in `sitemap.xml`, is rebuilt by the script. Never edit those by hand.

## Building by hand

```
node scripts/build-devlog.mjs
```

Run it after adding or editing a post, then commit the `.md` and the rebuilt files together.

## Rules for every post

- The dev log is for players only: what changed in the game, why, and what is coming next. First person, plain words, written by Charles. No hype, and no technical write-ups (those stay offline in Charles's Dev Logs folder).
- No em dashes. Say "Kansas", never the city.
- Only claim what the commit notes, NEXT.md and the store status actually show. No invented player reports or results.
- Nothing reaches `main` without Charles merging it.
