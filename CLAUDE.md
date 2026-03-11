# CLAUDE.md — AI Assistant Guide for a-liquid-glass-demo

## Project Overview

A minimal, dependency-free frontend prototype demonstrating a "liquid glass" design language. Features layered glass panels, fluid animated gradients, and pointer-responsive canvas effects. No build tooling required.

## Repository Structure

```
a-liquid-glass-demo/
├── index.html        # Single-page entry point; all HTML structure lives here
├── README.md         # Short project description
├── CLAUDE.md         # This file
└── src/
    ├── app.js        # Canvas animation + pointer tracking (ES6 module, ~95 lines)
    └── styles.css    # Full design system via CSS custom properties (~502 lines)
```

No `package.json`, no `node_modules`, no build artifacts — the project is intentionally self-contained.

## Technology Stack

| Layer | Choice |
|-------|--------|
| Markup | HTML5 (semantic elements) |
| Styling | Vanilla CSS3 (custom properties, backdrop-filter, grid, flexbox) |
| Scripting | Vanilla JavaScript ES6 modules |
| Animation | HTML5 Canvas API + `requestAnimationFrame` |
| Fonts | Google Fonts (Manrope, weights 300/400/600/700) |
| Build tool | None |
| Package manager | None |
| Test framework | None |

## Running the Project

Open `index.html` directly in any modern browser — no server required for local development:

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Or simply drag the file into a browser tab
```

For serving over HTTP (optional, e.g. to test `fetch` or service workers):

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

**Browser requirements:** Chrome 76+, Safari 9+, Firefox 103+ (backdrop-filter support required).

## Architecture & Key Files

### `index.html`
- Single HTML document; contains all structural markup.
- Loads `src/styles.css` via `<link>` and `src/app.js` via `<script type="module">`.
- Canvas element `#liquid-canvas` is the animated background.
- `.noise` div overlays an SVG `feTurbulence` pattern for texture.
- Sections: hero → token panels → styleguide → footer.

### `src/app.js`
- **Canvas scaling:** Uses `devicePixelRatio` for crisp rendering on HiDPI displays.
- **Bubble system:** 9 bubbles defined with hue (210°–362°), radius (160–380 px), position, and drift speed. Each bubble is a radial gradient rendered with `ctx.arc`.
- **Pointer glow:** Tracks `pointermove`/`touchmove`; draws a soft radial glow at cursor position.
- **Resize handler:** Recalculates canvas dimensions on `resize`.
- **Motion tokens:** Queries `.motion-pill[data-ease]` elements and applies the `data-ease` value as a CSS custom property for live easing demos.
- Animation loop via `requestAnimationFrame`; no external animation library.

### `src/styles.css`
- All design tokens live under `:root` as CSS custom properties.
- Key token groups:
  - Colors: `--accent-violet`, `--accent-blue`, `--accent-coral`, `--accent-mint`
  - Glass: `--panel-blur: 18px`, `--panel-radius: 32px`, gradient border tokens
  - Typography: `--font-sans`, size scale
  - Easing: `--ease-flip: cubic-bezier(0.19, 1, 0.22, 1)`
  - Shadows: multi-layer box-shadow tokens
- Mobile breakpoint: `@media (max-width: 720px)`.
- Glass morphism achieved with `backdrop-filter: blur() saturate()` + translucent backgrounds.
- Noise overlay uses `mix-blend-mode: screen` + SVG `feTurbulence` data URI.

## CSS Component Classes

| Component | Classes |
|-----------|---------|
| Header | `.site-header`, `.logo`, `.site-nav`, `.spec-link` |
| Hero | `.hero`, `.hero__glass`, `.hero__stats`, `.stat-card` |
| Buttons | `.btn`, `.btn--primary`, `.btn--ghost` |
| Badge | `.badge` |
| Panel grid | `.panel-grid`, `.panel`, `.panel--glass` |
| Swatches | `.swatch-row`, `.swatch` |
| Motion pills | `.motion-pill` (data attribute `data-ease` drives CSS var) |
| Styleguide | `.styleguide`, `.styleguide-card`, `.styleguide__grid` |
| Footer | `.site-footer` |

## Development Conventions

### General
- **No dependencies.** Do not introduce npm packages, bundlers, or transpilers unless explicitly requested.
- **No TypeScript.** The project uses plain JS; do not convert files.
- **No test framework.** Manual browser testing only.
- **File count is intentionally minimal.** Avoid creating new files; extend existing ones.

### HTML
- Keep markup semantic and accessible. Use `aria-hidden="true"` on purely decorative elements.
- All new sections follow the existing pattern: semantic wrapper element → inner content structure.

### CSS
- Add new design tokens to `:root` as CSS custom properties.
- Follow the BEM-ish naming used in existing components (`block__element--modifier`).
- Place new component styles in a logically grouped section, not scattered.
- Prefer `backdrop-filter` + translucent backgrounds for glass effects.

### JavaScript (`app.js`)
- Keep all canvas logic inside `app.js`; do not split into additional modules unless the file grows significantly.
- Maintain `requestAnimationFrame` loop pattern — do not use `setInterval`.
- High-DPI scaling (`devicePixelRatio`) must be preserved on any canvas resize logic.
- Pointer tracking must support both mouse (`pointermove`/`pointerleave`) and touch (`touchmove`/`touchend`).

## Git Workflow

- **Main branch:** `main` (production)
- **Development branch:** `master`
- **Feature branches:** `codex/<description>` or `claude/<description>`
- Commit messages are plain English, imperative mood, short (e.g. `Add footer nav links`).
- No CI/CD pipeline — merges are done via pull requests on the remote.

## What to Avoid

- Do not add a build step (webpack, vite, rollup, etc.) without being explicitly asked.
- Do not add a JavaScript framework (React, Vue, Svelte, etc.) without being explicitly asked.
- Do not add a CSS preprocessor (Sass, Less, PostCSS) without being explicitly asked.
- Do not add linting or formatting config unless asked.
- Do not modify `.gitattributes` — LF normalization is intentional.
- Do not remove the `devicePixelRatio` canvas scaling; it ensures crisp rendering on Retina/HiDPI screens.
- Do not replace CSS custom properties with hard-coded values.
