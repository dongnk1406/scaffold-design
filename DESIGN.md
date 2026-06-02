---
version: 1
name: Scaffold Design
description: >
  Scaffold Design — a clean, high-trust interface system built on a vivid
  green primary, a warm amber secondary, and a calm blue-grey neutral ramp.

colors:
  # Surfaces
  page: "#FFFFFF"
  page-subtle: "#FAFCFE"
  surface: "#FFFFFF"
  surface-hover: "#F1F4FB"
  surface-pressed: "#C7CEDB"
  surface-disabled: "#98A2B8"

  # Brand — Primary (green)
  primary: "#00C28D"
  primary-hover: "#00A87B"
  primary-pressed: "#108663"
  primary-subtle: "#EDFAF5"
  primary-text: "#00A87B"

  # Brand — Secondary (amber)
  secondary: "#FFBB66"
  secondary-pressed: "#FF9F29"
  secondary-subtle: "#FFF0E0"

  # Foreground / text
  foreground: "#1A2A3A"
  foreground-subtle: "#646F84"
  foreground-inverted: "#FFFFFF"

  # Borders
  border: "#DCE1EC"
  border-input: "#DCE1EC"
  border-input-hover: "#C7CEDB"
  border-input-active: "#00A87B"

  # Status
  positive: "#27A16A"
  positive-subtle: "#F0F9F1"
  info: "#2B8AED"
  info-subtle: "#F3F8FC"
  caution: "#F39C56"
  caution-subtle: "#FFF5EB"
  critical: "#F53841"
  critical-bold: "#E61E32"
  critical-subtle: "#FFF5F5"
  accent: "#8B5CF6"

typography:
  fontFamily: "Aestetico, 'Helvetica Neue', Arial, sans-serif"
  weights:
    regular: 400
    semibold: 600
  scale:
    # Interface headings (line-heights tuned for multi-line use)
    h1: { size: 35, lineHeight: 40, weight: 600 }
    h2: { size: 23, lineHeight: 36, weight: 600 }
    h3: { size: 19, lineHeight: 28, weight: 600 }
    h4: { size: 17, lineHeight: 24, weight: 600 }
    h5: { size: 13, lineHeight: 16, weight: 600 }
    # Form field label
    label: { size: 14, lineHeight: 20, weight: 600 }
    # Body text
    body-large: { size: 19, lineHeight: 28, weight: 400 }
    body: { size: 17, lineHeight: 24, weight: 400 }
    body-small: { size: 15, lineHeight: 18, weight: 400 }
    body-xsmall: { size: 13, lineHeight: 16, weight: 400 }
    # Marketing display
    display-1: { size: 52, lineHeight: 64, weight: 600 }
    display-2: { size: 40, lineHeight: 48, weight: 600 }

rounded:
  none: 0
  sm: 4      # inputs, fields, buttons, small controls
  md: 8      # cards, surfaces
  full: 9999 # pills, avatars, spinners

spacing:
  # 4px base rhythm. Layout gutter/margin = 24, component inset = 16.
  xs: 4
  sm: 8
  md: 12
  lg: 16
  xl: 24
  "2xl": 32
  "3xl": 48
  "4xl": 64

elevation:
  e1: "0 1px 2px rgba(0,0,0,0.05)"
  e2: "0 2px 8px rgba(0,0,0,0.04)"
  e3: "0 6px 12px rgba(0,0,0,0.10)"
  focus-ring: "0 0 0 2px rgba(3,170,112,0.30)"  # 2px brand-green ring

components:
  # Buttons use body-small (15px) text, 4px radius, and a pointer cursor —
  # verified against the Figma Button component (Tone=Primary, Size=Medium).
  button-primary:
    backgroundColor: "#00C28D"
    textColor: "#FFFFFF"
    typography: body-small
    rounded: sm
    height: 44
    padding: "0 16px"
    cursor: pointer
    hover: { backgroundColor: "#00A87B" }
    pressed: { backgroundColor: "#108663" }
    disabled: { backgroundColor: "#98A2B8", textColor: "#FFFFFF" }
  button-secondary:
    backgroundColor: "#FFBB66"
    textColor: "#1A2A3A"
    typography: body-small
    rounded: sm
    height: 44
    cursor: pointer
    pressed: { backgroundColor: "#FF9F29" }
  button-outline:
    backgroundColor: "transparent"
    textColor: "#00A87B"
    border: "1px solid #00C28D"
    rounded: sm
    height: 44
    cursor: pointer
  text-field:
    backgroundColor: "#FFFFFF"
    textColor: "#1A2A3A"
    border: "1px solid #DCE1EC"
    rounded: sm
    height: 44
    padding: "0 12px"
    hover: { border: "1px solid #C7CEDB" }
    focus: { border: "1px solid #00A87B", boxShadow: "0 0 0 2px rgba(3,170,112,0.30)" }
    error: { border: "1px solid #E61E32" }
    disabled: { backgroundColor: "#FAFCFE", textColor: "#98A2B8" }
  card:
    backgroundColor: "#FFFFFF"
    border: "1px solid #DCE1EC"
    rounded: md
    elevation: e2
    padding: 16
  alert:
    rounded: md
    padding: 16
    variants:
      info: { backgroundColor: "#F3F8FC", border: "1px solid #2B8AED", textColor: "#1A2A3A" }
      positive: { backgroundColor: "#F0F9F1", border: "1px solid #27A16A", textColor: "#1A2A3A" }
      caution: { backgroundColor: "#FFF5EB", border: "1px solid #F39C56", textColor: "#1A2A3A" }
      critical: { backgroundColor: "#FFF5F5", border: "1px solid #F53841", textColor: "#1A2A3A" }
  badge:
    rounded: full
    typography: body-xsmall
    padding: "2px 8px"
---

# Scaffold Design

## Overview

Scaffold Design is a web design system. Its personality is **clear, calm, and
trustworthy** — appropriate for a product where users make
consequential decisions. The system pairs a single vivid **green** brand colour
with a warm **amber** secondary and a cool, slightly blue-tinted neutral ramp.
Whitespace is generous, corners are gently rounded, and elevation is used
sparingly so the interface reads as flat and orderly rather than glossy.

Two type registers exist: an **Interface** set for product UI (dense, functional)
and a **Marketing** set for landing/promotional pages (larger, more expressive).
Use the Interface set for anything inside the app.

## Colors

The palette is **semantic, not literal** — choose tokens by role, never by raw
hue. Most roles ship as a triad: `bold` (filled emphasis), `subtle` (tinted
background), and a paired text/border colour.

**Brand**
- `primary` `#00C28D` — the brand green. Primary actions, active states,
  selection. Hover → `#00A87B`, pressed → `#108663`.
- `secondary` `#FFBB66` — amber. Supporting actions and highlights; never for
  destructive or primary CTAs.

**Neutrals & surfaces**
- `page` `#FFFFFF` / `page-subtle` `#FAFCFE` — app background.
- `surface` `#FFFFFF` — cards, panels, inputs. `surface-hover` `#F1F4FB`.
- `foreground` `#1A2A3A` — primary text. `foreground-subtle` `#646F84` —
  secondary text, captions, placeholder.
- `border` `#DCE1EC` — dividers and input outlines.

**Status** (each has a paired `-subtle` background)
- `positive` `#27A16A`, `info` `#2B8AED`, `caution` `#F39C56`,
  `critical` `#F53841`. `accent` `#8B5CF6` is reserved for progress/decorative
  emphasis.

Contrast: `foreground` on `page` and `foreground-inverted` on `primary` both
meet WCAG AA for body text. Do not place `foreground-subtle` on coloured `bold`
fills.

## Typography

Typeface is **Aestetico** (SemiBold 600 and Regular 400 only — no light or
black weights). Fall back to `Helvetica Neue, Arial, sans-serif`.

| Role | Size / Line | Weight | Use |
|------|-------------|--------|-----|
| H1 | 35 / 40 | 600 | Page title |
| H2 | 23 / 36 | 600 | Section heading |
| H3 | 19 / 28 | 600 | Sub-section |
| H4 | 17 / 24 | 600 | Card / group title |
| H5 | 13 / 16 | 600 | Eyebrow |
| Label | 14 / 20 | 600 | Form field label |
| Body L | 19 / 28 | 400 | Lead paragraph |
| Body | 17 / 24 | 400 | Default body copy |
| Body S | 15 / 18 | 400 | Secondary / dense UI |
| Body XS | 13 / 16 | 400 | Captions, badges, helper text |

Bold body variants use SemiBold (600), not a heavier weight. Marketing pages may
step up to `display-1` (52/64) and `display-2` (40/48). Letter-spacing is 0
across the scale.

## Layout

- **Spacing rhythm:** 4px base. Use the scale `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64`.
  Component internal padding is typically **16**; the page grid gutter/margin is
  **24–32**.
- **Grids:**
  - *Web App* — 12 columns, 32px gutter, 32px margin.
  - *Website* — 12 columns, 72px column width, 32px gutter (centred).
  - *Mobile* — 4 columns, 32px gutter, 360px artboards.
- Prefer auto-layout/flex with consistent gaps over absolute positioning. Align
  controls to the grid; keep form fields full-width within their column.

## Elevation & Depth

Depth is minimal and purposeful. Three levels only:

- **E1** `0 1px 2px rgba(0,0,0,0.05)` — resting cards, low-lift surfaces.
- **E2** `0 2px 8px rgba(0,0,0,0.04)` — raised cards, dropdowns.
- **E3** `0 6px 12px rgba(0,0,0,0.10)` — modals, popovers, menus.

**Focus** is communicated with a 2px brand-coloured ring (spread 2,
`rgba(3,170,112,0.30)`), with critical/caution/info ring variants matching the
relevant status colour. Never remove focus rings for keyboard users.

## Shapes

- Radii: `sm 4px` for inputs, buttons, and small controls; `md 8px` for cards
  and surfaces; `full` for pills, avatars, and spinners.
- Borders are 1px, `border` `#DCE1EC` by default; active/focus borders switch to
  brand green or the relevant status colour.
- Keep corner radii consistent within a composition — don't mix 4px and 8px on
  sibling elements.

## Components

**Button** — Default height 44px, radius `sm` (4px), `body-small` text (15px
SemiBold), pointer cursor. Labels are sentence/title case (not uppercase).
- *Primary*: green fill `#00C28D`, white text. Hover/pressed darken through
  `#00A87B` → `#108663`. Disabled fills `#98A2B8`.
- *Secondary*: amber fill, dark text.
- *Outline*: transparent fill, green text, green border.
- *Ghost*: transparent fill, green text, no border — used for text/link actions.
One primary action per view; everything else is secondary or ghost.

**Text field** — 44px tall, radius `sm` (4px), 1px `border-input`. Hover
darkens the border; focus shows the green border + focus ring; error uses
`critical-bold` border; disabled uses `page-subtle` fill with subtle text.
Always pair with a visible label (14px `label` style, SemiBold) and reserve
space for a helper/error message.

**Card** — White surface, 1px `border`, radius `md`, **E2** elevation, 16px
padding. Use for grouped content and selectable options.

**Alert** — Radius `md`, 16px padding, `-subtle` background with a matching
status border and icon. Four intents: info, positive, caution, critical.

**Badge** — `full` radius pill, Body XS text, 2px×8px padding. Status colours
map to the same semantic set.

Other library components (Select, Combobox, Currency, Password, Search,
Textarea, Date, Dropzone, Checkbox, Radio, Radio Card, Stepper, Tabs, Menu,
Modal, Accordion, Top Bar) follow the same token rules: `sm` radius for inputs,
`md` for containers, 44px control height, brand green for active/selected, and
status colours for feedback.

## Do's and Don'ts

**Do**
- Use semantic tokens (`primary`, `critical`, `border`) — never hard-coded hex.
- Reserve `primary` green for the single most important action on screen.
- Keep one type register per surface (Interface for app, Marketing for landing).
- Pair every status colour with its `-subtle` background and an icon for
  redundancy (don't rely on colour alone).
- Maintain the 4px spacing rhythm and a consistent radius within a group.

**Don't**
- Don't introduce new hues outside the palette or tint the neutrals warm.
- Don't use amber `secondary` for destructive actions — that's `critical`.
- Don't stack more than one elevation level on nested surfaces.
- Don't remove focus rings or drop input labels to save space.
- Don't use weights other than Regular (400) and SemiBold (600).

---

> **Provenance & assumptions.** Colours, typography, elevation, focus rings, and
> grids are extracted verbatim from the source Figma library styles. The file has
> no `spacing` or `rounded` *variables*, so the spacing scale is inferred from
> the grid gutters/margins (24–32px) and component padding (16px), and the radius
> scale from observed component corner radii (4px and 8px dominant). Component
> token values (heights, paddings) are representative defaults sampled from the
> Button and Field components — confirm against the live library before shipping.
