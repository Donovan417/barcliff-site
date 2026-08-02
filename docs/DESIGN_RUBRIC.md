# Design Rubric — Barcliff Impact Solutions

Objective, measurable pass/fail criteria for auditing barcliffimpactsolutions.com.
Compiled 2026-08-02 from primary sources (fetched and verified on that date).

**Precedence rule:** where a rubric item conflicts with the locked brand constraints
(navy + gold palette, locked hero concept, copy meaning), the brand constraint wins
and the conflict is logged in AUDIT.md instead of "fixed."

**Severity mapping used in AUDIT.md:**
P0 = accessibility failure or broken functionality · P1 = major readability/hierarchy/trust
problem · P2 = inconsistency · P3 = polish.

---

## 1. Accessibility (WCAG 2.2 AA)

| ID | Requirement | Pass threshold | How measured | Source |
|----|-------------|----------------|--------------|--------|
| R-A1 | Text contrast | ≥4.5:1 for normal text; ≥3:1 for large text (≥24px regular or ≥18.66px bold — 18pt / 14pt bold) | Computed fg/bg colors per element via JS; WCAG relative-luminance formula; no rounding (4.49:1 fails) | [WCAG 2.2 SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) |
| R-A2 | Non-text contrast | ≥3:1 for UI component boundaries/states, meaningful icons, and focus indicators, against adjacent colors | Computed colors of borders, icons, focus rings vs adjacent bg | [WCAG 2.2 SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) |
| R-A3 | Target size | Every pointer target ≥24×24 CSS px, except inline-in-sentence links, or undersized targets whose 24px circles don't intersect another target | `getBoundingClientRect()` on all `a`, `button`, inputs | [WCAG 2.2 SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) |
| R-A4 | Visible focus | Every keyboard-focusable element shows a visible focus indicator (and that indicator meets R-A2) | Tab through page; screenshot each focus stop; check `:focus-visible` styles | [WCAG 2.2 SC 2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) |
| R-A5 | Image alt text | Every `<img>` has an `alt`; informative images describe content, decorative images have `alt=""` | DOM scan of all images | [WCAG 2.2 SC 1.1.1](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) |
| R-A6 | Heading order | Exactly one `<h1>` per page; no skipped levels going down (h2→h4 fails) | DOM scan of h1–h6 sequence | [W3C WAI Headings tutorial](https://www.w3.org/WAI/tutorials/page-structure/headings/) |
| R-A7 | Landmarks | `<header>`, `<nav>`, `<main>` (exactly one), `<footer>` present and correctly used | DOM scan | [W3C WAI Page Regions tutorial](https://www.w3.org/WAI/tutorials/page-structure/regions/) |
| R-A8 | Reflow | No two-dimensional (horizontal) scrolling at 320 CSS px width | `document.documentElement.scrollWidth <= innerWidth` at 320px | [WCAG 2.2 SC 1.4.10](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) |
| R-A9 | Text resize | Text resizable to 200% without loss of content or function | Browser zoom 200% spot-check on key pages | [WCAG 2.2 SC 1.4.4](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) |
| R-A10 | Color not sole carrier | Color is never the only visual means of conveying information (links in prose also underlined/weighted, etc.) | Visual + DOM inspection of links, states | [WCAG 2.2 SC 1.4.1](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) |

## 2. Typography

| ID | Requirement | Pass threshold | How measured | Source |
|----|-------------|----------------|--------------|--------|
| R-T1 | Base body size | Computed body/paragraph text ≥16px at all viewports | `getComputedStyle().fontSize` on prose elements | [WCAG 2.2 SC 1.4.4 intent](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) + [web.dev accessibility](https://web.dev/articles/font-best-practices) |
| R-T2 | Body line-height | 1.45–1.65 (unitless equivalent) for paragraphs; WCAG floor is 1.5 for blocks of text | Computed line-height ÷ font-size | [WCAG 2.2 SC 1.4.8](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html) |
| R-T3 | Heading line-height | 1.1–1.3 for headings ≥28px | Computed line-height ÷ font-size on h1–h3 | Industry convention per [Material type scale](https://m3.material.io/styles/typography/applying-type); logged as guidance, not WCAG |
| R-T4 | Modular type scale | All font sizes fall on one documented scale (ratio 1.2–1.333); ≤8 distinct sizes sitewide | Census of computed font sizes across pages | [Material Design type scale](https://m3.material.io/styles/typography/applying-type) |
| R-T5 | Line length | Prose blocks 50–75 characters per line; hard fail >80ch | Computed width ÷ average char width; check `max-width` on prose containers | [Baymard line-length research](https://baymard.com/blog/line-length-readability); hard cap: [WCAG 1.4.8](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html) |
| R-T6 | Text not justified | No `text-align: justify` on blocks of text | Computed style scan | [WCAG 2.2 SC 1.4.8](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html) |

## 3. Spacing & rhythm

| ID | Requirement | Pass threshold | How measured | Source |
|----|-------------|----------------|--------------|--------|
| R-S1 | Spacing scale | All margins/paddings/gaps are multiples of 4px (8px preferred); ≤12 distinct spacing values sitewide | Census of computed margin/padding/gap values | [Material layout spacing](https://m2.material.io/design/layout/understanding-layout.html) (8dp grid) |
| R-S2 | Section rhythm | Same-level sections on a page share vertical padding within one scale step | Computed section padding census per page | Derived from R-S1; consistency measured objectively |
| R-S3 | Component-internal consistency | Same component type (cards, list items, buttons) uses identical internal padding and gaps everywhere it appears | Computed style comparison across instances | [NN/g heuristic 4: Consistency](https://www.nngroup.com/articles/ten-usability-heuristics/) |
| R-S4 | Edge alignment | Content blocks within a section align to the same container edges (left/right) within 1px | `getBoundingClientRect()` x-coordinates | [NN/g heuristic 8: Aesthetic & minimalist design](https://www.nngroup.com/articles/ten-usability-heuristics/) |

## 4. Color system

| ID | Requirement | Pass threshold | How measured | Source |
|----|-------------|----------------|--------------|--------|
| R-C1 | Documented palette | Every color in use maps to a named token with a semantic role (bg, surface, text, primary action, accent); ≤3 unaccounted "stray" colors sitewide | Census of computed colors vs CSS custom properties | [Material color roles](https://m3.material.io/styles/color/roles) |
| R-C2 | Accessible brand pairings | Every navy/gold text-on-bg pairing in use passes R-A1; every UI use passes R-A2 | Contrast computation on all observed pairings | [WCAG 2.2 SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) |
| R-C3 | Single dominant CTA color | One color reserved for primary actions; primary CTA style not reused for secondary actions | Census of button/CTA styles per page | [NN/g heuristic 4: Consistency](https://www.nngroup.com/articles/ten-usability-heuristics/) |

## 5. Layout & hierarchy

| ID | Requirement | Pass threshold | How measured | Source |
|----|-------------|----------------|--------------|--------|
| R-L1 | One primary CTA per region | Each screen-height region has ≤1 visually primary action | Screenshot review per viewport-height slice | [NN/g heuristic 8](https://www.nngroup.com/articles/ten-usability-heuristics/) |
| R-L2 | First-viewport clarity | Within the first viewport at every breakpoint: what this is, who it's for, and one clear next action, without scrolling | Screenshot at 375/768/1440 above the fold | [NN/g heuristic 1 & 2](https://www.nngroup.com/articles/ten-usability-heuristics/) |
| R-L3 | Scanning pattern | Section layouts put key info on left-edge/top scan lines (F-pattern for text, Z for hero/CTA blocks) | Screenshot review | [NN/g F-shaped pattern](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/) |
| R-L4 | Grid alignment | Multi-column content uses consistent column widths and gutters per page | Computed grid/flex values | [Material responsive grid](https://m2.material.io/design/layout/responsive-layout-grid.html) |

## 6. UX heuristics (Nielsen's 10)

| ID | Requirement | Pass threshold | How measured | Source |
|----|-------------|----------------|--------------|--------|
| R-U1 | Current location visible | Nav indicates the current page (aria-current or visual state) | DOM + screenshot on every page | [NN/g heuristic 1](https://www.nngroup.com/articles/ten-usability-heuristics/) |
| R-U2 | Affordance consistency | Links look like links, buttons like buttons; identical actions styled identically on all pages | Style census of interactive elements | [NN/g heuristic 4](https://www.nngroup.com/articles/ten-usability-heuristics/) |
| R-U3 | Plain language | Navigation and CTA labels use audience vocabulary, no internal jargon | Copy review (flag only — copy changes need approval) | [NN/g heuristic 2](https://www.nngroup.com/articles/ten-usability-heuristics/) |
| R-U4 | Error prevention & recovery | Any form: labels tied to inputs, errors identified in text, no data loss on error | Interactive form test (no submission) | [NN/g heuristics 5 & 9](https://www.nngroup.com/articles/ten-usability-heuristics/) |

## 7. Responsiveness & mobile ergonomics

| ID | Requirement | Pass threshold | How measured | Source |
|----|-------------|----------------|--------------|--------|
| R-M1 | No horizontal scroll | `scrollWidth ≤ innerWidth` at 320, 375, 768, 1024, 1440px | JS check at each width | [WCAG 2.2 SC 1.4.10](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) |
| R-M2 | Mobile menu works | Menu opens, closes, traps no focus, all links reachable, closes on navigation | Interactive test at 375px | [WCAG 2.2 SC 2.1.1 keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) |
| R-M3 | Mobile tap comfort | Primary nav/CTA targets ≥44×44px on mobile (WCAG floor 24px; 44–48px recommended) | Rendered sizes at 375px | [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/accessibility) / [Material accessibility](https://m2.material.io/design/usability/accessibility.html); floor: [WCAG 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) |
| R-M4 | Readable without zoom | Body text ≥16px computed at 375px; no viewport `user-scalable=no` | Computed styles + meta viewport check | [WCAG 2.2 SC 1.4.4](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) |

## 8. Performance & Core Web Vitals

| ID | Requirement | Pass threshold | How measured | Source |
|----|-------------|----------------|--------------|--------|
| R-P1 | LCP | <2.5s at 75th percentile (lab proxy: LCP in dev tools on throttled load) | PerformanceObserver / Lighthouse-style lab check | [web.dev Web Vitals](https://web.dev/articles/vitals) |
| R-P2 | CLS | <0.1 | PerformanceObserver during load + scroll | [web.dev Web Vitals](https://web.dev/articles/vitals) |
| R-P3 | INP | <200ms | Interaction timing on menu/CTA clicks | [web.dev Web Vitals](https://web.dev/articles/vitals) |
| R-P4 | Image discipline | Every `<img>` has explicit `width`/`height` (or CSS `aspect-ratio`); rendered size within 2× of natural size; modern format or compressed | DOM scan: naturalWidth vs rendered width; attribute check | [web.dev optimize CLS](https://web.dev/articles/optimize-cls) |
| R-P5 | Font loading | Web fonts use `font-display: swap` (or `optional`); no invisible-text period; `preconnect` to font origins | CSS inspection + network panel | [web.dev font best practices](https://web.dev/articles/font-best-practices) |

## 9. Trust & emotional tone (audience: people in recovery / with records)

| ID | Requirement | Pass threshold | How measured | Source |
|----|-------------|----------------|--------------|--------|
| R-E1 | Human photography | ≥1 photo of real people above the fold on the homepage (locked hero satisfies this); photos are warm/candid, not stock-clinical | Screenshot review | Brand constraint (user-specified); supported by [NN/g heuristic 2](https://www.nngroup.com/articles/ten-usability-heuristics/) |
| R-E2 | Welcoming first read | First heading + first paragraph address the visitor directly ("you"), no institutional jargon, no stigmatizing language | Copy review (flag only) | Brand constraint (user-specified) |
| R-E3 | Low-friction help path | From any page, a "get help"-type action is reachable in ≤1 click, and the contact method requires ≤2 fields or is direct (tel/email link) | Click-path trace from every page | [NN/g heuristic 7: Flexibility & efficiency](https://www.nngroup.com/articles/ten-usability-heuristics/) |
| R-E4 | No dark patterns | No fake urgency, no disguised ads, no forced disclosure of sensitive info (recovery/record status never required to browse) | Full-site review | [NN/g heuristic 3: User control](https://www.nngroup.com/articles/ten-usability-heuristics/) |

---

### Measurement notes

- Contrast ratios computed with the WCAG 2.x relative-luminance formula on computed
  (rendered) colors, resolving alpha over the actual backdrop. Values are not rounded up.
- "Large text" cutoffs: ≥24px at weight <700, or ≥18.66px at weight ≥700.
- Character-per-line estimate: container width ÷ (0.5 × font-size) cross-checked against a
  rendered `ch` measurement in the page's own font.
- Web font note: the site's fonts are loaded via Google Fonts `<link>` tags; `display=swap`
  must be present in the request URL to satisfy R-P5.
