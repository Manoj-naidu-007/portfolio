# Manoj C — Portfolio

A single-page, animated developer portfolio built with React + Vite. No backend required — everything (theme, filters, contact form, animations) runs client-side.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

This outputs a static site to `dist/`. Preview it locally with:

```bash
npm run preview
```

## Deploy

The `dist/` folder (or the repo itself) can be deployed to any static host:

**Vercel**
1. Push this folder to a GitHub repo.
2. Import the repo at vercel.com → New Project.
3. Framework preset: Vite (auto-detected). Deploy.

**Netlify**
1. Push to GitHub, or drag-and-drop the `dist/` folder after `npm run build` onto app.netlify.com/drop.
2. If connecting a repo: Build command `npm run build`, publish directory `dist`.

**GitHub Pages**
1. `npm run build`
2. Deploy the `dist/` folder using `gh-pages` or GitHub Actions (search "Vite GitHub Pages deploy" for a ready-made workflow).

## Editing content

All personal content — name, email, projects, skills, education, testimonials — lives in the data objects near the top of `src/App.jsx` (`PROFILE`, `SKILL_GROUPS`, `TIMELINE`, `PROJECTS`, `CERTIFICATIONS`, `ACHIEVEMENTS`, `TESTIMONIALS`). Update those and the whole site updates — no other files need touching for content changes.

To add a real photo, replace the `.about-photo-placeholder` div in the `About` component with an `<img>` tag pointing at a file in `public/`.

To add a real resume, drop a PDF into `public/` (e.g. `public/resume.pdf`) and point the "Download Resume" button's `href` at `/resume.pdf`.
