# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

---

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

# Project: KARAOKE JEWELRY — Website

E-commerce website for **KARAOKE JEWELRY**, a silver jewelry brand based in Vietnam. Design reference: bobby-world.com.

## Mandatory Rules

- **After every major UI change:** take a screenshot and compare against the reference design (bobby-world.com style). Flag regressions before moving on.
- **Mobile-first:** every component must be fully functional and visually correct on mobile (320px–430px). Test responsive breakpoints before marking any task done.

## Store Information

- **Brand name:** KARAOKE JEWELRY
- **Instagram:** [@karaoke.jewelry](https://www.instagram.com/karaoke.jewelry/)
- **Products:** silver jewelry — rings, earrings, necklaces, bracelets
- **Currency:** VND (₫)
- **Language:** English primary; Vietnamese secondary where needed
- **[TODO] Tagline / slogan:** _(fill in from Instagram bio)_
- **[TODO] Physical address / store location:** _(fill in if applicable)_
- **[TODO] Contact email / phone:** _(fill in)_
- **[TODO] Shipping policy highlights:** _(fill in)_

## Brand Identity

**Personality:** Playful, energetic, pop-culture — not cold luxury. The name "KARAOKE" is intentional: fun, bold, unexpected for jewelry.

**Brand motif:** Checkerboard / pixel pattern — appears in the logo "O" and on the disco ball in the symbol. Reuse as texture, divider, or micro-detail.

## Brand Assets

All files in `Brand Asset/`:

| File | Usage |
|---|---|
| `LOGO_NGANG_BLACK.png` | Navbar, light backgrounds |
| `LOGO_NGANG_WHITE.png` | Navbar on dark backgrounds |
| `LOGO_VUONG_BLACK.png` | Favicon, social avatar, square placements |
| `LOGO_VUONG_WHITE.png` | Square logo on dark backgrounds |
| `SYMBOL_LOGO_BLACK0.png` | Icon/accent on light backgrounds |
| `SYMBOL_LOGO_WHITE0.png` | Icon/accent on dark backgrounds |
| `SYMBOL_LOGO_GREEN0.png` | Accent element (neon green) |
| `SYMBOL_LOGO_PINK0.png` | Accent element (hot pink/magenta) |

## Design System

### Color Palette

| Role | Value |
|---|---|
| Background | `#ffffff` |
| Dark / hero section | `#111111` |
| Text primary | `#111111` |
| Text muted | `#888888` |
| Border | `#e0e0e0` |
| Accent Green (neon) | `#22E033` |
| Accent Pink (magenta) | `#FF1AB8` |

Accent color rules:
- Use sparingly — one accent moment per section maximum.
- Only on white or black backgrounds, never on grey.
- Don't mix both accent colors in the same block unless intentional.

### Typography

- Font stack: `'Helvetica Neue', Helvetica, Arial, sans-serif`
- Display headings: weight 300–400, letter-spacing 0.2em–0.4em, UPPERCASE
- Body / labels: 11–12px, letter-spacing 0.04–0.08em
- No heavy bold weights. No serif fonts.

### Layout

- Product grid: 4 columns desktop → 2 columns mobile
- Card border: `1px solid #e0e0e0`, no border-radius
- Card content padding: 10–14px
- Navbar height: ~46px, `border-bottom: 1px solid #e0e0e0`
- Logo: `LOGO_NGANG`, absolutely centered (`position:absolute; left:50%; transform:translateX(-50%)`)

### Reusable Components

- **Marquee banner** — scrolling announcement at top and bottom of page
- **Navbar** — centered logo, nav-left / nav-right, cart icon with badge
- **Product card** — hover swaps image (fade opacity), name + price label hides on hover
- **Cart overlay** — right-side panel, dark scrim behind
- **Toast** — "Added to cart", 1.6s auto-dismiss
- **Symbol logo** — reuse as empty-state illustration, section divider, or loading indicator

### Visual Principles

- Black/white base — accent colors land like a flash, not wallpaper.
- Product images: white background, 1:1 aspect ratio.
- Hero section: dark background, large product image, small text overlay.
- Checkerboard pattern can be used as a micro-texture or decorative border.
- White space is a design element — don't fill it.

## Tech Stack

- Vanilla HTML / CSS / JS — no framework
- No external libraries unless strictly necessary
- Single HTML file per prototype/demo
- CSS in `<style>` tag, JS in `<script>` tag
- All asset paths relative to project root
