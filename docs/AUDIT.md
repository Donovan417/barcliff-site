# Design & Accessibility Audit — barcliffimpactsolutions.com

Audited 2026-08-02 against `docs/DESIGN_RUBRIC.md` (rubric IDs referenced per row).
Live site verified byte-identical to this repo's build before auditing (same CSS hash `main-DUQcoVe6`),
so file/line references below are authoritative for the live site.

**Method.** Every page (`/`, `/services.html`, `/level-seven.html`, `/partner-with-us.html`,
`/find-help.html`) was loaded in Chrome and measured at 1440, 768, 375, and 320 CSS px.
Computed styles, real contrast ratios (WCAG relative-luminance on rendered colors, alpha
composited over actual backdrops), rendered target sizes, heading/landmark structure, image
attributes, line lengths, and link integrity were extracted via in-page JavaScript on the live
site. Interactive tests: keyboard tabbing, mobile menu open/close/Escape, form submit paths
(not sent), FAQ accordions. Screenshots were reviewed inline at each viewport (the browser
tooling in this session returns screenshots to the reviewing agent rather than saving files;
"before" evidence per finding = the measured values recorded here, which are reproducible
with the audit script).

**Severity:** P0 = accessibility failure or broken functionality · P1 = major
readability/hierarchy/trust problem · P2 = inconsistency · P3 = polish.

---

## Summary

| Severity | Count |
|---|---|
| P0 | 10 |
| P1 | 7 |
| P2 | 8 |
| P3 | 4 |

The two worst problems are functional, not visual: **neither "message" pathway on the site
actually sends anything** (AUD-02, AUD-03), and the **primary "Find Help" header button is
illegible on every page but one** (AUD-01). For an organization whose entire promise is
"start with one message," these break the core user journey for the primary audience.

---

## P0 — Accessibility failures & broken functionality

| ID | Location | What was measured | Measured value | Rubric threshold | Proposed fix |
|----|----------|-------------------|----------------|------------------|--------------|
| AUD-01 | All pages, header `.btn-cta` "Find Help" (desktop ≥900px) | Text vs button background contrast | `#17201d` on `#0f2a4d` = **1.16:1** (14.5px/500) | R-A1: ≥4.5:1 | `.btn-cta` never sets `color`; it inherits ink. Set explicit `color: #fff` (mobile bar variant already does this, which is why 375px renders correctly) |
| AUD-02 | `/find-help.html` "Send message" (`.fh-submit`) | Submit path | `<button type="button">`, **no `<form>` element, no JS handler** — click does nothing; `.fh-thanks` success panel exists in markup but is never shown | R-U4 / broken functionality | Wire a submit handler in `src/main.js`: validate, show `.fh-thanks`; real backend needs owner decision (flagged in CHANGES.md) |
| AUD-03 | `/partner-with-us.html` "Send inquiry" | Submit path | `<form>` with **no `action`/`method`** and no handler → default GET self-submit: page reloads, message lost, **PII (name, contact, message) lands in the URL query string** | R-U4 / broken functionality + privacy | Same treatment as AUD-02; prevent default GET submit |
| AUD-04 | All pages, muted text on cream (`--ink-60` composited = `#717671` on `#f9f6ef`) — `.hero__note`, `.eyebrow`, section notes | Contrast | **4.31:1** at 13–13.5px | R-A1: ≥4.5:1 | Raise `--ink-60` alpha (token-level fix; see CHANGES.md hex log) |
| AUD-05 | ~25 instances sitewide: gold small text on cream — `.service-row__num`, `.l7-value__num`, `.l7-expect__num`, `.pw-path__num`, `.fh-choice__num`, gold eyebrows, gold text links ("All services →") | Contrast | `#8f6e20` on `#f9f6ef` = **4.40:1** at 13–14.5px | R-A1: ≥4.5:1 | Darken `--gold` slightly for text-on-light use (logged hex change); large/bold gold display text (≥24px) passes at 3:1 and is untouched |
| AUD-06 | Homepage `.story__placeholder` ("partner names to come") | Contrast | `#979b99` on `#ffffff` = **2.82:1** at 11.5px | R-A1: ≥4.5:1 | Darken to muted token; also see AUD-22 (styling) |
| AUD-07 | `/find-help.html` header `.btn-cta` (current-page state) | Contrast | `#8f6e20` on `#0f2a4d` = **3.03:1** at 14.5px/700 (not large text) | R-A1: ≥4.5:1 | Use `--gold-soft`/brighter gold for the active state on navy (logged hex change) |
| AUD-08 | `.svc-detail__fine`, `.pw-inquiry__note`, `.pw-field__optional` (`#7d807b` on cream), `.fh-field__optional` (`#7f8483` on white) | Contrast | **3.70–3.78:1** at 13–14px | R-A1: ≥4.5:1 | Same muted-token consolidation as AUD-04 |
| AUD-09 | Both forms' consent checkbox | Rendered target size | **20×20px** | R-A3: ≥24×24 | Size to 24×24 |
| AUD-10 | All pages, footer "Privacy" (44×16) and "Accessibility" (77×16) links | Rendered target size + adjacency | Height **16px**, side by side | R-A3: ≥24×24 (spacing exception marginal) | Add vertical padding to reach ≥24px hit area |

## P1 — Major readability / hierarchy / trust

| ID | Location | What was measured | Measured value | Rubric threshold | Proposed fix |
|----|----------|-------------------|----------------|------------------|--------------|
| AUD-11 | All pages, footer "Privacy" → `/`, "Accessibility" → `/` | Link destinations | Both links navigate to the homepage — placeholder promises, and "Accessibility" implying a statement that doesn't exist | R-E4 / NN/g #4 | Point both at a real page or remove until real (owner decision flagged; recommend a minimal combined page) |
| AUD-12 | Desktop prose sitewide (`.hero__lede`, section ledes, list bodies) | Computed body size | **15px** on desktop (16px on mobile via clamp) | R-T1: ≥16px | Raise desktop body/lede sizes to ≥16px via type tokens |
| AUD-13 | Homepage `.contact__crisis` (crisis note in navy CTA banner) | Line length | **162 characters per line** | R-T5: 50–75, hard fail >80 | `max-width: 66ch` on the note |
| AUD-14 | `.story__partner-list` (108ch), `.svc-detail__trades` (98ch), `.fh-crisis` (94ch), `.l7-fineprint` (84ch), `.l7-manifesto__body` (81ch) | Line length | 81–108ch | R-T5 | `max-width` caps (~66–72ch) |
| AUD-15 | Homepage + `/partner-with-us.html` hero image | Natural vs rendered size; file weight | `barcliff-hero-community-meeting-corrected.png`: **1,008,851 bytes**, natural 870px rendered 1144px (2288 device px on 2× displays — upscaled & soft); photographic content stored as PNG | R-P4 / R-P1 (LCP element) | Re-export as compressed JPG/WebP at ≥1740px wide; same for `barcliff-community-resources-corrected.png` (867,897 B) |
| AUD-16 | `/level-seven.html` values grid at 1440 | Column fit | "Responsibility" (27px serif) overflows its 25%-width column, colliding with the column divider | R-L4 / R-S4 | Allow wrapping/reduce size or widen gutter so headings clear dividers |
| AUD-17 | Nav "Stories" and "Contact" (all pages) | Destination content | Both scroll to homepage placeholder sections ("Stories coming soon", "Contact details coming soon") | R-E3 / NN/g #1 | Keep links but flag: for the primary audience "Contact" leading to "coming soon" is a trust break — needs owner decision on interim contact method (form page or 988/phone line) |

## P2 — Inconsistencies

| ID | Location | Measured | Rubric | Proposed fix |
|----|----------|----------|--------|--------------|
| AUD-18 | Sitewide type | **23 distinct font sizes** on the homepage alone (11.5→68px); no modular scale | R-T4: one scale, ≤8 sizes | Define type-scale tokens (1.2 ratio), map all text to nearest step |
| AUD-19 | Homepage "What do you need today?" cards | Equal-height grid leaves large empty bottoms in text-only cards (Housing, Business) at all widths | R-S3 | Let arrow anchor to bottom with tighter min-height |
| AUD-20 | Numbered rows (`.service-row`, `.fh-choice`, L7 lists) at 375px | Number column reserves ~90–110px left gutter; headings wrap 2–3 lines in a narrow column | R-L4 / mobile ergonomics | Collapse number into inline/stacked layout under 900px |
| AUD-21 | Section vertical rhythm | Same-page section paddings vary widely (e.g. services detail sections have ~200px+ compound gaps; homepage sections differ step to step) | R-S1/R-S2 | Spacing tokens + consistent section padding |
| AUD-22 | Homepage `.story__placeholder` | Right-aligned 11.5px monospace annotation floating oddly under the partner list | R-S3 / R-E1 tone | Restyle as a quiet left-aligned note (also AUD-06) |
| AUD-23 | Primary CTA color | Navy primary sitewide, but L7 sections/pages use gold-filled primaries for the same "get connected" action | R-C3 | Accept as deliberate sub-brand accent but make gold buttons consistent (they currently pass contrast: ink on gold ≈ 7.5:1) — log as judgment call |
| AUD-24 | `/partner-with-us.html` hero | Reuses the homepage hero photo (same file) | R-E1 | Flagged as judgment call — needs a different photo from owner; not fixable in CSS |
| AUD-25 | `level-seven-logo.jpg` | Natural 1080px rendered 358px (3× oversized download, 86KB) | R-P4 | Acceptable size cost; optionally add `srcset`/smaller variant — low priority |

## P3 — Polish

| ID | Location | Measured | Proposed fix |
|----|----------|----------|--------------|
| AUD-26 | Homepage "Stories coming soon" section | Right half of a 2-col grid entirely empty at 1440 | Tighten to single readable column with caption note |
| AUD-27 | Level Seven final CTA ("One message is enough to start.") | Right half empty at 1440 | Same treatment |
| AUD-28 | `.fh-choice__input` radios | 1×1px visually-hidden inputs; keyboard focus style on the visible row must be verified/added in CSS (`:focus-visible` sibling styling) | Verify + add `:has(:focus-visible)` row outline |
| AUD-29 | Hero heading widow risk at 768 ("Strengthening communities." wraps mid-word region) | Minor | `text-wrap: balance` on display headings |

---

## What passes (measured, not assumed)

- **Alt text:** 4/4 homepage images (and all subpage images) have descriptive `alt`; zero missing sitewide (R-A5 ✓)
- **Headings:** exactly one `h1` per page; no skipped levels on any page (R-A6 ✓)
- **Landmarks:** one `header`/`main`/`footer`, `nav` labeled; `aria-current` present on nav for current page (R-A7, R-U1 ✓)
- **Reflow:** zero horizontal scroll on all 5 pages at 320, 375, 768, 1440 (R-A8/R-M1 ✓)
- **Mobile menu:** opens/closes, `aria-expanded` toggled, closes on link click and Escape with focus returned (R-M2 ✓)
- **Focus:** 27 `:focus`/`:focus-visible` rules; visible double-ring indicator confirmed on nav links and header CTA (R-A4 ✓ on light surfaces; navy-surface indicators re-verified in fix phase)
- **Fonts:** Google Fonts loaded with `display=swap` + `preconnect` (R-P5 ✓)
- **Images:** all have explicit `width`/`height` attributes → CLS-safe (R-P2/R-P4 attribute check ✓)
- **Viewport meta:** `width=device-width, initial-scale=1`, no zoom blocking (R-M4 ✓)
- **No dark patterns**; crisis line (911/988) present in utility bar, find-help, and footer CTA on every page (R-E4, R-E3 partial ✓)
- **Tone:** first-viewport copy on every page addresses the visitor directly and non-clinically; "We never ask about criminal history…" on find-help is exactly right for the audience (R-E2 ✓)
- **JS/CSS weight:** 1.1KB JS + 41KB CSS — minimal (R-P1 supporting ✓)

## Performance (lab proxy)

- LCP element (homepage): the 1.0MB upscaled hero PNG (AUD-15) — the only realistic LCP risk on the site; text-first subpages are effectively instant. CLS structurally protected by image dimensions; INP trivial (static site, 1KB JS).

## Conflicts with brand constraints (logged, not "fixed")

1. **Gold as small-text color** fails 4.5:1 on cream at any usable gold; the fix darkens gold *for small text only* — display-size gold (hero italics, big numerals) stays brand-bright and passes its 3:1 large-text threshold.
2. **Locked hero** is left-aligned copy above the photo rather than "centered over photo" — the lock is interpreted as "don't restructure"; only contrast/spacing/type touched inside it.
