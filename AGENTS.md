# AGENTS.md — Barcliff Impact Solutions site

Guidance for AI coding agents (Codex, Claude, etc.) working in this repo.

## Project

Static marketing site for Barcliff Impact Solutions. Vanilla HTML/CSS/JS — **no framework**. Built with Vite 8 (Rolldown-based). Package manager is **pnpm**. No tests, no linter.

## Commands

- `pnpm install` — install dependencies
- `pnpm dev` — dev server
- `pnpm build` — production build to `dist/` (run this to verify changes compile)
- `pnpm preview` — serve the built `dist/`

## Deployment

Vercel auto-deploys from GitHub: a push to `main` deploys production (barcliffimpactsolutions.com); pushes to other branches / pull requests get preview URLs. **Prefer opening a pull request over pushing straight to `main`** so changes can be reviewed on a preview URL first.

## Pages and architecture — READ BEFORE EDITING

The site is a multi-page app. Each page is a root-level `.html` file:

- `index.html` (homepage)
- `services.html`
- `level-seven.html`
- `partner-with-us.html`
- `find-help.html`

### Adding a new page (all steps required, or the page breaks)

1. Create the root-level `.html` file (copy the `<head>`, utility line, header/nav, and footer from an existing page).
2. Register it in `vite.config.js` under `build.rolldownOptions.input` (Vite 8 uses Rolldown — it's `rolldownOptions`, **not** `rollupOptions`). A page missing from this map is silently excluded from the build.
3. Create `src/styles/<page>.css` for its styles, with a unique class prefix (existing prefixes: `svc-` services, `l7-` level-seven, `fh-` find-help, `pw-` partner-with-us).
4. Import that stylesheet in `src/main.js`.
5. Add the page to the nav — see the duplication rule below.

### No templating — shared markup is duplicated

There is no templating system. The `<head>` (Google Fonts, meta), utility line, header/nav, and footer markup are **copy-pasted into every `.html` file**. Any change to navigation, header, footer, or shared chrome must be applied to **all five HTML files** (plus any new ones). Never change shared markup in only one file.

## Styling rules

- `src/style.css` — global stylesheet: design tokens (colors, fonts) as CSS custom properties in `:root`, shared chrome, and all homepage sections. **Use the CSS variables; never hardcode colors.**
- `src/styles/<page>.css` — page-specific styles only, one file per secondary page, classes prefixed per page.
- Responsive convention: a single breakpoint `@media (max-width: 899px)`, plus `clamp()` for fluid sizing. Follow this pattern; do not introduce new breakpoints.

## Forms

Contact/intake forms submit via FormSubmit.co. **Do not change form `action` URLs, hidden `_`-prefixed inputs (e.g. `_subject`, `_next`), or input `name` attributes** — delivery breaks silently if these change.

## Assets

- `public/` is served at the site root (`public/uploads/`, `public/assets/`, favicon) — reference by absolute path (`/uploads/...`).
- `src/assets/` is for bundler-imported assets.
- `design-src/` contains original design prototypes for **reference only** — never edit, link to, or serve these files.

## Verification checklist before committing

1. `pnpm build` succeeds.
2. If shared chrome changed: confirm the same edit exists in all five HTML files.
3. If a page was added: confirm it is in `vite.config.js` input map and its CSS is imported in `src/main.js`.
