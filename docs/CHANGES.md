# Design Audit — Changes Report (Phase 4)

Branch: `design-audit-fixes` · Dev-side only, **nothing deployed to production**.
All fixes verified in Chrome against the local dev server at 320, 375, 768, and 1440 CSS px
(the audit's measurement script was re-run after the changes; results below are measured, not assumed).

## Verification summary (after fixes)

| Check | Before | After |
|---|---|---|
| Text-contrast failures, all 5 pages | 6–8 failing color pairs per page (~40 instances sitewide, worst 1.16:1) | **0 failures** (409 text elements re-measured across 5 pages) |
| find-help "Send message" | Dead button, no form, no handler | Validates → confirmation panel → reset; tested end-to-end |
| partner "Send inquiry" | GET self-submit, message lost, PII in URL | `preventDefault` + same validated flow; tested end-to-end |
| Horizontal overflow 320/375/768 | none | none (no regression) |
| Homepage image payload | 1,876 KB (two photographic PNGs) | **287 KB** (JPEG q82, same pixels) |
| Level Seven values grid at 1440 | "Responsibility" collided with column divider | Clears column (verified visually) |
| Build (`pnpm build`) | passes | passes |

## Every color/shade change (before → after, with measured ratios)

| Token / use | Before | After | Contrast before → after |
|---|---|---|---|
| `--ink-60` (eyebrows, notes, fine print, optional-field labels — sitewide) | `rgba(23,32,29,0.60)` | `rgba(23,32,29,0.64)` | on cream 4.29 → **4.89**; on white 4.43 → **5.04** |
| `--gold` (small gold text: numerals, gold eyebrows, gold links; also hero italics) | `#8f6e20` | `#8a691f` | small text on cream 4.40 → **4.72**; on white 4.75 → **5.10**; large italic display text was already passing its 3:1 threshold and remains well above it |
| Header `.btn-cta` text (all pages, desktop) | inherited `#17201d` via `.nav-desktop a` specificity bug | explicit `#ffffff` | **1.16 → 14.40** |
| Header `.btn-cta` current-page state (find-help) | gold `#8f6e20` text on navy | `--gold-bright #d2a64a` fill + `--dark #071629` text | **3.03 → 7.37** |
| `.story__placeholder` ("partner names to come") | `rgba(23,32,29,0.45)` ≈ `#979b99` | `var(--ink-60)` ≈ `#6b706e`, left-aligned, 12.5px | **2.82 → 5.04** |
| Fine print (`.svc-detail__fine`, `.pw-inquiry__note`, `.pw-field__optional`, `.fh-field__optional`) | `rgba(23,32,29,0.55)` (3.70–3.78) | `var(--ink-60)` | **3.7 → 4.89–5.04** |
| NEW: `.form-error` semantic color | — | `#9c2f22` on 6% tint | **6.73** on white surface, **6.22** on cream |

Note: the gold-bright current-page button fill is 2.09:1 against the cream header, which is
acceptable under WCAG 1.4.11 because the component is identified by its text label (7.37:1),
not its boundary — logged here for transparency.

## Change → audit/rubric mapping

| Change | Audit ID | Rubric | Where |
|---|---|---|---|
| `.nav-desktop .btn-cta` color re-assertion + hover | AUD-01 | R-A1 | `src/style.css` |
| Message flow wiring (validate → confirm → reset), `FORM_ENDPOINT` constant | AUD-02, AUD-03 | R-U4 | `src/main.js`, `[hidden]` rules in `find-help.css` / `partner-with-us.css` |
| `--ink-60` alpha bump | AUD-04, AUD-06, AUD-08 | R-A1 | `src/style.css` tokens |
| `--gold` darkened | AUD-05 | R-A1/R-C2 | `src/style.css` tokens |
| aria-current excludes `.btn-cta`; dedicated current-CTA state | AUD-07 | R-A1/R-U1 | `services.css`, `level-seven.css`, `style.css` |
| Consent checkboxes 20→24px | AUD-09 | R-A3 | `find-help.css`, `partner-with-us.css` |
| Footer legal links padded to ≥24px hit area | AUD-10 | R-A3 | `style.css` |
| Desktop prose 15/15.5px → 16px (`--fs-base`) | AUD-12 | R-T1 | `style.css` + all page css |
| Line-length caps: crisis note 66ch, trades 58ch, manifesto 56ch, fineprint 56ch, fh-crisis 66ch, L7 disclaimer 56ch | AUD-13, AUD-14 | R-T5 | `style.css`, page css |
| Hero + community PNGs → JPEG (originals in `design-src/originals/`) | AUD-15 | R-P1/R-P4 | `public/uploads/`, `index.html`, `partner-with-us.html` |
| L7 values: min column 240px, name capped at 30px | AUD-16 | R-L4/R-S4 | `level-seven.css` |
| Type + spacing tokens; section paddings unified to `--section-pad(-tight)` | AUD-18, AUD-21 | R-T4/R-S1/R-S2 | `style.css` |
| Mobile: service-row gutter 90→44px; photo cards 240px min; text cards content-height | AUD-19, AUD-20 | R-S3/mobile | `style.css` |
| Story placeholder restyled | AUD-22 | R-S3 | `style.css` |

## Open items NOT fixed (and why)

| Audit ID | Item | Why open |
|---|---|---|
| AUD-11 | Privacy / Accessibility links point to `/` | Needs real content — writing a legal/accessibility page is a content decision (below) |
| AUD-17 | Nav "Stories"/"Contact" land on "coming soon" placeholders | Content decision; links themselves work |
| AUD-18 | Full type-scale consolidation (23 sizes → ≤8) | Tokens are in place and the worst offenders mapped; forcing every remaining size onto the scale in one pass risks broad visual regressions — recommend progressive adoption |
| AUD-24 | Partner page reuses the homepage hero photo | Needs a new photo from you |
| AUD-25 | Level Seven logo served at 3× its rendered size (86KB) | Minor; `srcset` worth adding when images are next touched |
| AUD-26/27 | Empty right columns (Stories section, L7 final CTA) at 1440 | Layout redesign of those sections — P3 polish, and plausibly intentional editorial whitespace |
| — | Hero image is soft on retina (source is 870px, rendered at 2288 device px) | Can't be fixed in code — needs a higher-resolution original (below) |

## Judgment calls that need your decision

1. **Form delivery — RESOLVED 2026-08-04.** Both forms now deliver via FormSubmit.co's
   account-free AJAX endpoint to **barcliffassociates@gmail.com** (owner's decision).
   Verified end-to-end with the test address donovansmith150@gmail.com: submission → 
   FormSubmit → email received with all fields. The code treats FormSubmit's
   `success:"false"` responses as failures (shows a retry error instead of a false
   thank-you). Remaining owner steps:
   - Click **ACTIVATE FORM** in the FormSubmit email now waiting in
     barcliffassociates@gmail.com (use the newest email if several arrived — older
     activation links die when a new one is issued).
   - After the site is deployed, the first submission from the production domain triggers
     one more activation email — same single click.
   - Optional hardening: the activation email contains a "random-like string" alias;
     swapping it into `FORM_ENDPOINT` hides the org address from the public JS bundle.
   - Note: prototype-era confirmation copy ("nothing was actually sent") was replaced with
     "A real person will read your message / A team member will follow up within two
     business days" — needs your copy sign-off.
2. **New microcopy I added (needs your approval):** the validation message
   "Please add a way to reach you and check the consent box so we can respond." and the
   failure message "Something went wrong and your message was not sent. Please try again
   in a moment." — both in `src/main.js`.
3. **Privacy & Accessibility pages** — recommend one simple combined page; I can draft it
   for your approval, or the links can be removed until ready.
4. **Higher-res hero photo** — please export the community-meeting photo at ≥1800px wide
   from the original source; I'll size and compress it.
5. **"Stories"/"Contact" nav** — keep pointing at the coming-soon sections, or drop from
   the nav until real? (For the primary audience, "Contact → coming soon" is the weakest
   trust moment left on the site.)
6. **Gold vs navy CTAs** — Level Seven keeps its gold primary button as a deliberate
   sub-brand accent (it passes contrast at 7.37–8.86:1). Confirm you want that split kept.
7. **Locked hero** — untouched structurally, per constraints. If you ever revisit: the
   stated direction ("centered copy over full-width photo") differs from the built
   implementation (left copy above photo). Flagging the mismatch only.

## Screenshots

Browser tooling in this session reviews screenshots inline rather than saving files, so
before/after evidence is captured as the measured values in `docs/AUDIT.md` and the
verification table above — every number is reproducible by re-running the audit script in
DevTools. The dev server is left running for your own visual review.
