# Design System Wiring — Spec

**Date:** 2026-06-02
**Goal:** Make vibe-coded UI automatically follow the Scaffold Design system (sourced from the project's Figma library, snapshotted in `DESIGN.md`). After this work, generated code should reach for semantic token utilities (`bg-primary`, `text-foreground`, `rounded-md`) and shared primitives instead of arbitrary hex/px values.

## Source of truth

```
Figma (canonical)  →  DESIGN.md (snapshot)  →  src/styles.css @theme (runtime)
```

Figma is canonical. `DESIGN.md` is the human/machine-readable snapshot. The Tailwind `@theme` block is what code consumes. When Figma changes: re-extract via the Figma MCP → update `DESIGN.md` → update `@theme`. **Manual, deliberate re-sync — no automation.**

## Scope

1. Codify tokens into Tailwind v4 `@theme`.
2. Self-host the placeholder font (Inter).
3. Build 5 core primitives in `src/components/ui/`.
4. Add design-system guardrails to `CLAUDE.md`.

Out of scope: a `/design` preview route, additional components beyond the 5, automated Figma sync, Aestetico licensing.

## 1. Tokens → Tailwind v4 `@theme`

Added to `src/styles.css`. Tailwind v4 derives utilities from these CSS vars.

### Colors → `bg-*`, `text-*`, `border-*`
```
--color-page: #FFFFFF;          --color-page-subtle: #FAFCFE;
--color-surface: #FFFFFF;       --color-surface-hover: #F1F4FB;
--color-surface-pressed: #C7CEDB;  --color-surface-disabled: #98A2B8;

--color-primary: #00C28D;       --color-primary-hover: #00A87B;
--color-primary-pressed: #108663;  --color-primary-subtle: #EDFAF5;

--color-secondary: #FFBB66;     --color-secondary-pressed: #FF9F29;
--color-secondary-subtle: #FFF0E0;

--color-foreground: #1A2A3A;    --color-foreground-subtle: #646F84;
--color-foreground-inverted: #FFFFFF;

--color-border: #DCE1EC;        --color-border-input: #DCE1EC;
--color-border-input-hover: #C7CEDB;  --color-border-input-active: #00A87B;

--color-positive: #27A16A;      --color-positive-subtle: #F0F9F1;
--color-info: #2B8AED;          --color-info-subtle: #F3F8FC;
--color-caution: #F39C56;       --color-caution-subtle: #FFF5EB;
--color-critical: #F53841;      --color-critical-bold: #E61E32;
--color-critical-subtle: #FFF5F5;
--color-accent: #8B5CF6;
```

### Typography → `text-*` (size + paired line-height)
Font: `--font-sans: "Inter Variable", "Helvetica Neue", Arial, sans-serif;` (the `"Inter Variable"` family is provided by `@fontsource-variable/inter`, imported in `src/main.tsx`)
```
--text-display-1: 52px;  --text-display-1--line-height: 64px;
--text-display-2: 40px;  --text-display-2--line-height: 48px;
--text-h1: 35px;  --text-h1--line-height: 40px;
--text-h2: 23px;  --text-h2--line-height: 36px;
--text-h3: 19px;  --text-h3--line-height: 28px;
--text-h4: 17px;  --text-h4--line-height: 24px;
--text-h5: 13px;  --text-h5--line-height: 16px;
--text-body-lg: 19px;  --text-body-lg--line-height: 28px;
--text-body: 17px;     --text-body--line-height: 24px;
--text-body-sm: 15px;  --text-body-sm--line-height: 18px;
--text-body-xs: 13px;  --text-body-xs--line-height: 16px;
```
Weights: Regular 400, SemiBold 600 only. Headings use `font-semibold`.

### Radius → `rounded-*`
```
--radius-sm: 4px;   /* inputs, small controls */
--radius-md: 8px;   /* buttons, cards, surfaces */
```
`rounded-full` (default 9999) used for pills/avatars.

### Elevation → `shadow-*`
```
--shadow-e1: 0 1px 2px rgba(0,0,0,0.05);
--shadow-e2: 0 2px 8px rgba(0,0,0,0.04);
--shadow-e3: 0 6px 12px rgba(0,0,0,0.10);
--shadow-focus: 0 0 0 2px rgba(3,170,112,0.30);  /* brand-green focus ring */
```

### Spacing — no custom tokens
The `4·8·12·16·24·32·48·64` scale maps onto Tailwind's default 4px scale (`*-1 *-2 *-3 *-4 *-6 *-8 *-12 *-16`). Use defaults; add nothing.

## 2. Font

Self-hosted **Inter** (placeholder for the proprietary Aestetico).
- Dep: `@fontsource-variable/inter`.
- Import in `src/main.tsx`.
- Wired via `--font-sans` above. Swapping to Aestetico later = replace the import + the `--font-sans` value.

## 3. Core primitives → `src/components/ui/`

**Helper:** `src/lib/cn.ts` = `twMerge(clsx(...))`.
**Pattern:** `cva` for variants, so the variant API is declarative and extendable by codegen.
**Deps:** `class-variance-authority`, `clsx`, `tailwind-merge`.
Each component: typed props extending the native element, `className` passthrough, `forwardRef`. Barrel export from `src/components/ui/index.ts`.

### Button (`button.tsx`)
- Base: `inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-colors focus-visible:outline-none focus-visible:shadow-focus disabled:cursor-not-allowed`
- `variant`:
  - `primary` — `bg-primary text-foreground-inverted hover:bg-primary-hover active:bg-primary-pressed disabled:bg-surface-disabled`
  - `secondary` — `bg-secondary text-foreground active:bg-secondary-pressed disabled:bg-surface-disabled disabled:text-foreground-inverted`
  - `outline` — `border border-primary text-primary-hover hover:bg-primary-subtle disabled:border-border disabled:text-foreground-subtle`
  - `ghost` — `text-primary-hover hover:bg-primary-subtle disabled:text-foreground-subtle`
- `size`: `sm` (`h-9 px-3 text-body-sm`), `md` (`h-11 px-4 text-body`), `lg` (`h-14 px-6 text-body-lg`)
- Defaults: `variant=primary`, `size=md`.

### TextField (`text-field.tsx`)
- Props: `label`, `helperText`, `error?: string`, native input props.
- Label: `text-h5 text-foreground`.
- Input: `h-11 w-full rounded-sm border border-input bg-surface px-3 text-body text-foreground placeholder:text-foreground-subtle hover:border-input-hover focus-visible:border-input-active focus-visible:shadow-focus focus-visible:outline-none disabled:bg-page-subtle disabled:text-foreground-subtle`
- Error: input border → `border-critical-bold`; message → `text-body-xs text-critical`. Else helper → `text-body-xs text-foreground-subtle`.

### Card (`card.tsx`)
- `bg-surface border border-border rounded-md shadow-e2 p-4`. `className` passthrough; renders `children`.

### Alert (`alert.tsx`)
- Base: `flex gap-3 rounded-md border p-4 text-body text-foreground`.
- `variant`: `info` (`bg-info-subtle border-info`), `positive` (`bg-positive-subtle border-positive`), `caution` (`bg-caution-subtle border-caution`), `critical` (`bg-critical-subtle border-critical`).
- Leading lucide icon per variant (`Info`, `CheckCircle2`, `AlertTriangle`, `XCircle`), colored `text-{status}`.

### Badge (`badge.tsx`)
- Base: `inline-flex items-center rounded-full px-2 py-0.5 text-body-xs font-semibold`.
- `variant`: `neutral` (`bg-surface-hover text-foreground`), `positive` (`bg-positive-subtle text-positive`), `info` (`bg-info-subtle text-info`), `caution` (`bg-caution-subtle text-caution`), `critical` (`bg-critical-subtle text-critical`).

## 4. Agent guardrails → `CLAUDE.md`

Append a `## Design System` section stating:
- Read `DESIGN.md` before building UI.
- Use theme token utilities only — never arbitrary hex or off-scale px. Colors come from the semantic set; spacing from the default 4px scale.
- Compose from `src/components/ui/*`; extend a primitive's `cva` variants rather than re-styling inline.
- Typography via `text-h*` / `text-body*`; weights limited to 400/600.
- When implementing a specific Figma frame, pull exact specs from the Figma MCP (`get_node` / `get_design_context`).
- Font note: Inter stands in for Aestetico.

## File changes summary

| File | Change |
|---|---|
| `src/styles.css` | Add `@theme` block (colors, type, radius, shadows) + font import |
| `src/main.tsx` | Import `@fontsource-variable/inter` |
| `src/lib/cn.ts` | New — `cn()` helper |
| `src/components/ui/{button,text-field,card,alert,badge}.tsx` | New primitives |
| `src/components/ui/index.ts` | New — barrel export |
| `CLAUDE.md` | Add `## Design System` section |
| `package.json` | Add 4 deps |

## Verification

- `pnpm build` succeeds.
- `pnpm lint` clean.
- `pnpm type:check` clean.
- Render the 5 primitives on the index route (temporary) and visually confirm tokens apply; or trust token classes compile. Final check: a sample `bg-primary` element shows `#00C28D`.
