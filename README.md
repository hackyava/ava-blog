# Ava's Blog 🖤

A minimal, static blog built with React, Vite, Tailwind CSS, and Markdown.

## Structure

- **`public/posts/`**: Where the markdown files live.
- **`public/posts.json`**: Manifest file listing all posts. Must be updated when adding new posts.
- **`src/pages/`**: React components for pages.
- **`src/components/`**: Reusable UI components.

## How to Add a Post

1. Create a new `.md` file in `public/posts/` (e.g., `my-new-post.md`).
2. Add frontmatter (optional but recommended):
   ```markdown
   ---
   title: My New Post
   date: 2026-03-08
   tags: tech, life
   ---
   ```
3. Update `public/posts.json` to include the new post metadata:
   ```json
   {
     "slug": "my-new-post",
     "title": "My New Post",
     "date": "2026-03-08",
     "excerpt": "A short summary...",
     "tags": ["tech", "life"]
   }
   ```

## Development

```bash
npm install
npm run dev
```

## Deployment (GitHub Pages)

1. Create a repository on GitHub named `ava-blog`.
2. Push this code to it.
3. Enable GitHub Pages in repo settings (Source: `gh-pages` branch).
4. Run:
   ```bash
   npm run deploy
   ```
   (This builds the app and pushes the `dist` folder to the `gh-pages` branch).

## Configuration

- **Base URL**: Edit `vite.config.ts` if you deploy to a custom domain or different subpath.
- **Styling**: `tailwind.config.js` and `src/index.css`.
