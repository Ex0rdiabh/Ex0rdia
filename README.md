# Exordia Creative Services

Exordia is a React + TypeScript + Vite booking portal for a Bahrain-based creative startup. The site is styled as a polished client-facing experience while staying simple enough to launch and maintain on free hosting.

## Hosting Strategy

This project is set up for:

- `GitHub Pages` for free static hosting
- `HashRouter` for safe client-side routing on GitHub Pages
- direct `WhatsApp` and `email` fallback delivery for inquiries when no backend is available

The repository is configured for:

- GitHub user: `Ex0rdiabh`
- Repository: `Ex0rdia`
- Production URL: [https://ex0rdiabh.github.io/Ex0rdia/](https://ex0rdiabh.github.io/Ex0rdia/)

## What Works On GitHub Pages

- Landing page and content pages
- Multi-step booking flow
- Contact page
- Draft saving in the browser
- Direct WhatsApp and email inquiry delivery

## Optional Backend

The repo still includes `server.ts` for environments that support Node.js and server-side form delivery. GitHub Pages does not run this server.

## Local Development

Prerequisite: install Node.js LTS from [https://nodejs.org](https://nodejs.org)

1. Install dependencies
```bash
npm install
```

2. Start the local dev server
```bash
npm run dev
```

3. Build the production site
```bash
npm run build
```

## GitHub Pages Deployment

This repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

To publish:

1. Push the repository to GitHub
2. Open the repository on GitHub
3. Go to `Settings` -> `Pages`
4. Under `Build and deployment`, choose `GitHub Actions`
5. Push to `main`

GitHub will build and deploy the site automatically.

## Startup-Friendly Notes

- The site is intentionally kept static-first to reduce bugs and hosting cost.
- Automatic form delivery is not required for launch on GitHub Pages.
- WhatsApp and email are the primary production-safe submission paths on the free host.
