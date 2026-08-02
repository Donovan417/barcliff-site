# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing site for Barcliff Impact Solutions — vanilla HTML/CSS/JS built with Vite 8 (Rolldown-based). No framework, no tests, no linter.

## Commands

Uses pnpm.

- `pnpm dev` — dev server
- `pnpm build` — production build to `dist/`
- `pnpm preview` — serve the built `dist/`

## Architecture

Multi-page app: each page is a root-level `.html` file registered as an entry in `vite.config.js` under `build.rolldownOptions.input` (Vite 8 uses Rolldown, so it's `rolldownOptions`, not `rollupOptions`). **Adding a page requires both creating the `.html` file and adding it to that input map**, or it will be missing from the build.

Pages: `index.html` (homepage) plus `services.html`, `level-seven.html`, `partner-with-us.html`, `find-help.html` — all full pages converted from the Claude Design project "Barcliff Homepage V2" (original prototype files preserved in `design-src/` for reference; they are inline-styled DC prototypes, not served).

Shared code:
- `src/main.js` — single JS entry loaded by every page via `<script type="module" src="/src/main.js">`; imports all stylesheets and wires the mobile menu toggle (`.menu-toggle` / `.nav-mobile`).
- `src/style.css` — global stylesheet: design tokens (colors, fonts) as CSS custom properties in `:root`, shared chrome (utility line, header, footer), and all homepage sections. Use the variables rather than hardcoding colors.
- `src/styles/<page>.css` — page-specific styles, one file per secondary page, classes prefixed per page (`svc-`, `l7-`, `fh-`, `pw-`). A new page's stylesheet must also be imported in `src/main.js`.

Responsive convention: single breakpoint `@media (max-width: 899px)` plus `clamp()` for fluid sizing.

There is no templating: the `<head>` (Google Fonts links, meta), utility line, and header/nav markup are duplicated in every `.html` file. A change to navigation or shared chrome must be replicated across all five pages.

Static assets: `public/` is served at the site root (favicon, `public/uploads/` and `public/assets/` images referenced by absolute path); `src/assets/` is for bundler-imported assets.
