# Design System Wiring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Codify the Scaffold Design tokens into Tailwind v4 `@theme`, self-host Inter, and build 5 token-driven primitives so vibe-coded UI automatically follows the design system.

**Architecture:** Tokens live in `src/styles.css` as a Tailwind `@theme` block (the runtime source). A `cn()` helper (clsx + a font-size-aware tailwind-merge) plus `cva` give primitives a declarative, extendable variant API. Components live in `src/components/ui/` and are styled exclusively from theme tokens. `CLAUDE.md` gains guardrails so all future codegen uses tokens and primitives.

**Tech Stack:** React 19, TanStack Router, Tailwind CSS v4, Vitest + @testing-library/react (jsdom), TypeScript (strict, `verbatimModuleSyntax`, `#/*` package-imports alias), pnpm.

---

## Conventions (read before starting)

- **Imports:** internal modules use the `#/*` alias (maps to `src/*` via package.json `imports` + tsconfig paths). Test files import siblings relatively (`./button`).
- **`verbatimModuleSyntax: true`:** type-only imports MUST use `import type` (or inline `type` modifier). Splitting value/type imports is mandatory or `tsc`/build fails.
- **React 19 — no `forwardRef`:** per the project's `react19-no-forwardref` convention, components are plain functions typed with `ComponentProps<'tag'>`. `ref` is a normal prop and flows through `{...props}` to the underlying element. Do not import or use `forwardRef`, and do not set `displayName`.
- **`noUnusedLocals`/`noUnusedParameters: true`:** no unused imports or params.
- **Tests import explicitly** from `vitest` (`describe/it/expect`) — there are no global test types.
- **Verify each task** with the commands shown. Final gates: `pnpm lint`, `pnpm type:check`, `pnpm test`, `pnpm build` all clean.

## File Structure

| File | Responsibility |
|---|---|
| `package.json` | + 4 deps |
| `src/styles.css` | `@theme` tokens (colors/type/radius/shadow) + base font |
| `src/main.tsx` | side-effect import of the Inter font |
| `vitest.config.ts` | jsdom test environment + setup file |
| `src/test/setup.ts` | RTL cleanup after each test |
| `src/lib/cn.ts` | `cn()` class-merge helper (font-size-aware) |
| `src/components/ui/button.tsx` | Button primitive |
| `src/components/ui/text-field.tsx` | TextField primitive |
| `src/components/ui/card.tsx` | Card primitive |
| `src/components/ui/alert.tsx` | Alert primitive |
| `src/components/ui/badge.tsx` | Badge primitive |
| `src/components/ui/index.ts` | barrel export |
| `CLAUDE.md` | `## Design System` guardrails |

---

### Task 1: Install dependencies

**Files:**
- Modify: `package.json` (via pnpm)

- [ ] **Step 1: Add the runtime deps**

Run:
```bash
pnpm add @fontsource-variable/inter class-variance-authority clsx tailwind-merge
```
Expected: pnpm adds all four under `dependencies`; install completes; `pnpm-lock.yaml` updated.

- [ ] **Step 2: Verify they resolve**

Run:
```bash
pnpm ls @fontsource-variable/inter class-variance-authority clsx tailwind-merge
```
Expected: each prints a resolved version (no "missing").

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "build: add design-system deps (inter, cva, clsx, tailwind-merge)"
```

---

### Task 2: Configure Vitest for component tests

**Files:**
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Test: `src/test/smoke.test.ts`

- [ ] **Step 1: Write a failing smoke test**

Create `src/test/smoke.test.ts`:
```ts
import { describe, it, expect } from 'vitest'

describe('test environment', () => {
  it('runs in jsdom (document is defined)', () => {
    expect(typeof document).toBe('object')
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `pnpm test`
Expected: FAIL — either "No test files found" was the prior state; now the test runs but `document` is `undefined` (default node env) → assertion fails, OR config error. Either way it does not pass.

- [ ] **Step 3: Create the Vitest config**

Create `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [viteReact()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

Create `src/test/setup.ts`:
```ts
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})
```

- [ ] **Step 4: Run the smoke test to verify it passes**

Run: `pnpm test`
Expected: PASS — 1 passed.

- [ ] **Step 5: Commit**

```bash
git add vitest.config.ts src/test/setup.ts src/test/smoke.test.ts
git commit -m "test: configure vitest with jsdom + RTL cleanup"
```

---

### Task 3: Codify tokens into the Tailwind theme

**Files:**
- Modify: `src/styles.css` (full rewrite of the file)

- [ ] **Step 1: Replace `src/styles.css` with the themed version**

Overwrite `src/styles.css` with:
```css
@import "tailwindcss";

@theme {
  /* ---- Colors ---- */
  --color-page: #FFFFFF;
  --color-page-subtle: #FAFCFE;
  --color-surface: #FFFFFF;
  --color-surface-hover: #F1F4FB;
  --color-surface-pressed: #C7CEDB;
  --color-surface-disabled: #98A2B8;

  --color-primary: #00C28D;
  --color-primary-hover: #00A87B;
  --color-primary-pressed: #108663;
  --color-primary-subtle: #EDFAF5;

  --color-secondary: #FFBB66;
  --color-secondary-pressed: #FF9F29;
  --color-secondary-subtle: #FFF0E0;

  --color-foreground: #1A2A3A;
  --color-foreground-subtle: #646F84;
  --color-foreground-inverted: #FFFFFF;

  --color-border: #DCE1EC;
  --color-input: #DCE1EC;
  --color-input-hover: #C7CEDB;
  --color-input-active: #00A87B;

  --color-positive: #27A16A;
  --color-positive-subtle: #F0F9F1;
  --color-info: #2B8AED;
  --color-info-subtle: #F3F8FC;
  --color-caution: #F39C56;
  --color-caution-subtle: #FFF5EB;
  --color-critical: #F53841;
  --color-critical-bold: #E61E32;
  --color-critical-subtle: #FFF5F5;
  --color-accent: #8B5CF6;

  /* ---- Typography ---- */
  --font-sans: "Inter Variable", "Helvetica Neue", Arial, sans-serif;

  --text-display-1: 52px;
  --text-display-1--line-height: 64px;
  --text-display-2: 40px;
  --text-display-2--line-height: 48px;
  --text-h1: 35px;
  --text-h1--line-height: 40px;
  --text-h2: 23px;
  --text-h2--line-height: 36px;
  --text-h3: 19px;
  --text-h3--line-height: 28px;
  --text-h4: 17px;
  --text-h4--line-height: 24px;
  --text-h5: 13px;
  --text-h5--line-height: 16px;
  --text-body-lg: 19px;
  --text-body-lg--line-height: 28px;
  --text-body: 17px;
  --text-body--line-height: 24px;
  --text-body-sm: 15px;
  --text-body-sm--line-height: 18px;
  --text-body-xs: 13px;
  --text-body-xs--line-height: 16px;

  /* ---- Radius ---- */
  --radius-sm: 4px;
  --radius-md: 8px;

  /* ---- Elevation ---- */
  --shadow-e1: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-e2: 0 2px 8px rgba(0, 0, 0, 0.04);
  --shadow-e3: 0 6px 12px rgba(0, 0, 0, 0.10);
  --shadow-focus: 0 0 0 2px rgba(3, 170, 112, 0.30);
}

* {
  box-sizing: border-box;
}

html,
body,
#app {
  min-height: 100%;
}

body {
  margin: 0;
  font-family: var(--font-sans);
  color: var(--color-foreground);
  background-color: var(--color-page);
}
```

> Note: the border tokens are named `--color-input{,-hover,-active}` (not `--color-border-input`) so they generate the clean utilities `border-input`, `border-input-hover`, `border-input-active`. The default border is `--color-border` → `border-border`.

- [ ] **Step 2: Verify the build compiles the theme**

Run: `pnpm build`
Expected: build succeeds; `dist/assets/*.css` is produced (no CSS errors).

- [ ] **Step 3: Commit**

```bash
git add src/styles.css
git commit -m "feat: codify design tokens into tailwind @theme"
```

---

### Task 4: Wire the Inter font

**Files:**
- Modify: `src/main.tsx:1` (add a side-effect import)

- [ ] **Step 1: Add the font import**

In `src/main.tsx`, add as the FIRST line of the file:
```ts
import '@fontsource-variable/inter'
```
(The existing first line `import ReactDOM from 'react-dom/client'` and the rest stay unchanged below it.)

- [ ] **Step 2: Verify build + type-check**

Run: `pnpm build && pnpm type:check`
Expected: both succeed. The font CSS is bundled (CSS asset size grows slightly).

- [ ] **Step 3: Commit**

```bash
git add src/main.tsx
git commit -m "feat: self-host Inter as the placeholder for Aestetico"
```

---

### Task 5: `cn()` class-merge helper

**Files:**
- Create: `src/lib/cn.ts`
- Test: `src/lib/cn.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/lib/cn.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { cn } from './cn'

describe('cn', () => {
  it('keeps the last of conflicting same-group classes', () => {
    expect(cn('bg-primary', 'bg-secondary')).toBe('bg-secondary')
  })

  it('keeps a font size and a text color together (different groups)', () => {
    const result = cn('text-body', 'text-foreground')
    expect(result).toContain('text-body')
    expect(result).toContain('text-foreground')
  })

  it('dedupes conflicting custom font sizes', () => {
    expect(cn('text-body', 'text-h1')).toBe('text-h1')
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `pnpm test src/lib/cn.test.ts`
Expected: FAIL — `cn` not found / module missing.

- [ ] **Step 3: Implement `cn` with a font-size-aware merge**

Create `src/lib/cn.ts`:
```ts
import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Custom typography utilities (text-h1, text-body, ...) are font sizes, not
// colors. Register them in the font-size group so merging text-body with
// text-foreground does not drop one of them.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'display-1',
            'display-2',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'body-lg',
            'body',
            'body-sm',
            'body-xs',
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: Array<ClassValue>): string {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm test src/lib/cn.test.ts`
Expected: PASS — 3 passed.

- [ ] **Step 5: Commit**

```bash
git add src/lib/cn.ts src/lib/cn.test.ts
git commit -m "feat: add cn() helper with font-size-aware tailwind-merge"
```

---

### Task 6: Button primitive

**Files:**
- Create: `src/components/ui/button.tsx`
- Test: `src/components/ui/button.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/ui/button.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('renders children and defaults to the primary variant', () => {
    render(<Button>Click</Button>)
    const btn = screen.getByRole('button', { name: 'Click' })
    expect(btn.className).toContain('bg-primary')
    expect(btn.className).toContain('h-11')
  })

  it('applies the secondary variant and sm size', () => {
    render(
      <Button variant="secondary" size="sm">
        Go
      </Button>,
    )
    const btn = screen.getByRole('button', { name: 'Go' })
    expect(btn.className).toContain('bg-secondary')
    expect(btn.className).toContain('h-9')
  })

  it('forwards the disabled attribute', () => {
    render(<Button disabled>X</Button>)
    expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(true)
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `pnpm test src/components/ui/button.test.tsx`
Expected: FAIL — module `./button` not found.

- [ ] **Step 3: Implement the Button**

Create `src/components/ui/button.tsx`:
```tsx
import type { ComponentProps } from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '#/lib/cn'

const button = cva(
  'inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-colors focus-visible:outline-none focus-visible:shadow-focus disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-foreground-inverted hover:bg-primary-hover active:bg-primary-pressed disabled:bg-surface-disabled disabled:text-foreground-inverted',
        secondary:
          'bg-secondary text-foreground active:bg-secondary-pressed disabled:bg-surface-disabled disabled:text-foreground-inverted',
        outline:
          'border border-primary text-primary-hover bg-transparent hover:bg-primary-subtle disabled:border-border disabled:text-foreground-subtle',
        ghost:
          'text-primary-hover bg-transparent hover:bg-primary-subtle disabled:text-foreground-subtle',
      },
      size: {
        sm: 'h-9 px-3 text-body-sm',
        md: 'h-11 px-4 text-body',
        lg: 'h-14 px-6 text-body-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof button> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(button({ variant, size }), className)}
      {...props}
    />
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm test src/components/ui/button.test.tsx`
Expected: PASS — 3 passed.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/button.tsx src/components/ui/button.test.tsx
git commit -m "feat: add Button primitive"
```

---

### Task 7: TextField primitive

**Files:**
- Create: `src/components/ui/text-field.tsx`
- Test: `src/components/ui/text-field.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/ui/text-field.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TextField } from './text-field'

describe('TextField', () => {
  it('associates the label with the input', () => {
    render(<TextField label="Email" />)
    expect(screen.getByLabelText('Email')).toBeTruthy()
  })

  it('renders the error message and marks the input invalid', () => {
    render(<TextField label="Email" error="Required" />)
    const input = screen.getByLabelText('Email')
    expect(input.getAttribute('aria-invalid')).toBe('true')
    expect(input.className).toContain('border-critical-bold')
    expect(screen.getByText('Required')).toBeTruthy()
  })

  it('renders helper text when there is no error', () => {
    render(<TextField label="Email" helperText="We never share it" />)
    expect(screen.getByText('We never share it')).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `pnpm test src/components/ui/text-field.test.tsx`
Expected: FAIL — module `./text-field` not found.

- [ ] **Step 3: Implement the TextField**

Create `src/components/ui/text-field.tsx`:
```tsx
import { useId } from 'react'
import type { ComponentProps } from 'react'
import { cn } from '#/lib/cn'

export interface TextFieldProps extends ComponentProps<'input'> {
  label: string
  helperText?: string
  error?: string
}

export function TextField({
  label,
  helperText,
  error,
  className,
  id,
  ...props
}: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const message = error ?? helperText
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-h5 text-foreground">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        className={cn(
          'h-11 w-full rounded-sm border border-input bg-surface px-3 text-body text-foreground placeholder:text-foreground-subtle hover:border-input-hover focus-visible:border-input-active focus-visible:shadow-focus focus-visible:outline-none disabled:bg-page-subtle disabled:text-foreground-subtle',
          error && 'border-critical-bold',
          className,
        )}
        {...props}
      />
      {message && (
        <span
          className={cn(
            'text-body-xs',
            error ? 'text-critical' : 'text-foreground-subtle',
          )}
        >
          {message}
        </span>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm test src/components/ui/text-field.test.tsx`
Expected: PASS — 3 passed.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/text-field.tsx src/components/ui/text-field.test.tsx
git commit -m "feat: add TextField primitive"
```

---

### Task 8: Card primitive

**Files:**
- Create: `src/components/ui/card.tsx`
- Test: `src/components/ui/card.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/ui/card.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from './card'

describe('Card', () => {
  it('renders children with surface + elevation classes', () => {
    render(<Card>Inside</Card>)
    const el = screen.getByText('Inside')
    expect(el.className).toContain('bg-surface')
    expect(el.className).toContain('rounded-md')
    expect(el.className).toContain('shadow-e2')
  })

  it('merges a passed className', () => {
    render(<Card className="p-8">X</Card>)
    expect(screen.getByText('X').className).toContain('p-8')
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `pnpm test src/components/ui/card.test.tsx`
Expected: FAIL — module `./card` not found.

- [ ] **Step 3: Implement the Card**

Create `src/components/ui/card.tsx`:
```tsx
import type { ComponentProps } from 'react'
import { cn } from '#/lib/cn'

export type CardProps = ComponentProps<'div'>

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface border border-border rounded-md shadow-e2 p-4',
        className,
      )}
      {...props}
    />
  )
}
```

> Note: the `p-8` test passes because `cn` (tailwind-merge) resolves the `p-4`/`p-8` padding conflict in favor of the later `p-8`.

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm test src/components/ui/card.test.tsx`
Expected: PASS — 2 passed.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/card.tsx src/components/ui/card.test.tsx
git commit -m "feat: add Card primitive"
```

---

### Task 9: Alert primitive

**Files:**
- Create: `src/components/ui/alert.tsx`
- Test: `src/components/ui/alert.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/ui/alert.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Alert } from './alert'

describe('Alert', () => {
  it('renders content with role=alert and the default info variant', () => {
    render(<Alert>Heads up</Alert>)
    const el = screen.getByRole('alert')
    expect(el.textContent).toContain('Heads up')
    expect(el.className).toContain('bg-info-subtle')
  })

  it('applies the critical variant', () => {
    render(<Alert variant="critical">Boom</Alert>)
    expect(screen.getByRole('alert').className).toContain('bg-critical-subtle')
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `pnpm test src/components/ui/alert.test.tsx`
Expected: FAIL — module `./alert` not found.

- [ ] **Step 3: Implement the Alert**

Create `src/components/ui/alert.tsx`:
```tsx
import type { ComponentProps } from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '#/lib/cn'

const alert = cva('flex gap-3 rounded-md border p-4 text-body text-foreground', {
  variants: {
    variant: {
      info: 'bg-info-subtle border-info',
      positive: 'bg-positive-subtle border-positive',
      caution: 'bg-caution-subtle border-caution',
      critical: 'bg-critical-subtle border-critical',
    },
  },
  defaultVariants: { variant: 'info' },
})

type AlertVariant = NonNullable<VariantProps<typeof alert>['variant']>

const icons: Record<AlertVariant, LucideIcon> = {
  info: Info,
  positive: CheckCircle2,
  caution: AlertTriangle,
  critical: XCircle,
}

const iconColor: Record<AlertVariant, string> = {
  info: 'text-info',
  positive: 'text-positive',
  caution: 'text-caution',
  critical: 'text-critical',
}

export interface AlertProps
  extends ComponentProps<'div'>,
    VariantProps<typeof alert> {}

export function Alert({
  variant = 'info',
  className,
  children,
  ...props
}: AlertProps) {
  const Icon = icons[variant]
  return (
    <div role="alert" className={cn(alert({ variant }), className)} {...props}>
      <Icon className={cn('h-5 w-5 shrink-0', iconColor[variant])} aria-hidden />
      <div>{children}</div>
    </div>
  )
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm test src/components/ui/alert.test.tsx`
Expected: PASS — 2 passed.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/alert.tsx src/components/ui/alert.test.tsx
git commit -m "feat: add Alert primitive"
```

---

### Task 10: Badge primitive

**Files:**
- Create: `src/components/ui/badge.tsx`
- Test: `src/components/ui/badge.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/ui/badge.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './badge'

describe('Badge', () => {
  it('renders children with the neutral default', () => {
    render(<Badge>New</Badge>)
    const el = screen.getByText('New')
    expect(el.className).toContain('rounded-full')
    expect(el.className).toContain('bg-surface-hover')
  })

  it('applies the positive variant', () => {
    render(<Badge variant="positive">Done</Badge>)
    expect(screen.getByText('Done').className).toContain('bg-positive-subtle')
  })
})
```

- [ ] **Step 2: Run it to verify it fails**

Run: `pnpm test src/components/ui/badge.test.tsx`
Expected: FAIL — module `./badge` not found.

- [ ] **Step 3: Implement the Badge**

Create `src/components/ui/badge.tsx`:
```tsx
import type { ComponentProps } from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '#/lib/cn'

const badge = cva(
  'inline-flex items-center rounded-full px-2 py-0.5 text-body-xs font-semibold',
  {
    variants: {
      variant: {
        neutral: 'bg-surface-hover text-foreground',
        positive: 'bg-positive-subtle text-positive',
        info: 'bg-info-subtle text-info',
        caution: 'bg-caution-subtle text-caution',
        critical: 'bg-critical-subtle text-critical',
      },
    },
    defaultVariants: { variant: 'neutral' },
  },
)

export interface BadgeProps
  extends ComponentProps<'span'>,
    VariantProps<typeof badge> {}

export function Badge({ variant, className, ...props }: BadgeProps) {
  return <span className={cn(badge({ variant }), className)} {...props} />
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm test src/components/ui/badge.test.tsx`
Expected: PASS — 2 passed.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/badge.tsx src/components/ui/badge.test.tsx
git commit -m "feat: add Badge primitive"
```

---

### Task 11: Barrel export

**Files:**
- Create: `src/components/ui/index.ts`

- [ ] **Step 1: Create the barrel**

Create `src/components/ui/index.ts`:
```ts
export { Button } from './button'
export type { ButtonProps } from './button'
export { TextField } from './text-field'
export type { TextFieldProps } from './text-field'
export { Card } from './card'
export type { CardProps } from './card'
export { Alert } from './alert'
export type { AlertProps } from './alert'
export { Badge } from './badge'
export type { BadgeProps } from './badge'
```

- [ ] **Step 2: Verify type-check resolves all exports**

Run: `pnpm type:check`
Expected: PASS — no errors (confirms every name/type exists and `verbatimModuleSyntax` is satisfied).

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/index.ts
git commit -m "feat: add ui components barrel export"
```

---

### Task 12: Add design-system guardrails to CLAUDE.md

**Files:**
- Modify: `CLAUDE.md` (append a section at the end)

- [ ] **Step 1: Append the guardrails section**

Append to the end of `CLAUDE.md`:
```markdown

---

## Design System

This project follows the **Scaffold Design** system. The token snapshot lives in `DESIGN.md`; the runtime tokens live in `src/styles.css` (`@theme`).

When building or generating UI:
- **Read `DESIGN.md` first.** It is the snapshot of the project's Figma library.
- **Use theme token utilities only** — never arbitrary hex or off-scale pixel values. Colors come from the semantic set (`bg-primary`, `text-foreground`, `border-input`, `bg-info-subtle`, …). Spacing uses Tailwind's default 4px scale (`p-4`, `gap-2`, …).
- **Typography** uses the named scale: `text-h1`…`text-h5`, `text-body`, `text-body-sm`, `text-body-xs`, `text-display-1/2`. Font weights are limited to 400 (normal) and 600 (`font-semibold`).
- **Radius/elevation:** `rounded-sm` (4px) for inputs, `rounded-md` (8px) for buttons/cards; `shadow-e1`…`shadow-e3`; `shadow-focus` for focus rings.
- **Compose from `src/components/ui/*`** (Button, TextField, Card, Alert, Badge). Extend a primitive's `cva` variants instead of re-styling inline.
- **For a specific Figma frame,** pull exact specs via the Figma MCP (`get_node` / `get_design_context`) before building.
- **Font:** Inter is the self-hosted stand-in for the proprietary Aestetico; swap later via `--font-sans` + the import in `src/main.tsx`.
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add design-system guardrails to CLAUDE.md"
```

---

### Task 13: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Run the full gate suite**

Run:
```bash
pnpm lint && pnpm type:check && pnpm test && pnpm build
```
Expected: lint clean (no output / exit 0); type-check clean; all test files pass; build succeeds and emits `dist/`.

- [ ] **Step 2: Confirm tokens are live (spot check)**

Run: `pnpm build` then inspect the emitted CSS for a token utility:
```bash
grep -o "\.bg-primary{[^}]*}" dist/assets/*.css | head -1
```
Expected: a rule whose background-color resolves to the `--color-primary` (`#00C28D`) token.

- [ ] **Step 3: Commit any remaining changes (if the lockfile or generated files moved)**

```bash
git add -A
git commit -m "chore: design-system wiring verification" || echo "nothing to commit"
```

---

## Self-Review (completed by plan author)

- **Spec coverage:** tokens→@theme (Task 3), font (Task 4), `cn` (Task 5), 5 primitives (Tasks 6–10), barrel (Task 11), CLAUDE.md guardrails (Task 12), source-of-truth note (in CLAUDE.md text + spec). Spacing intentionally adds no tokens (Task 3 note). Vitest infra (Task 2) supports the TDD steps. ✅
- **Naming:** no "Spark Web" references anywhere in this plan. The Figma source is referred to as "the project's Figma library." ✅
- **Type consistency:** `cn(...inputs)`, `ButtonProps/TextFieldProps/CardProps/AlertProps/BadgeProps`, and the `#/lib/cn` import path are used identically across tasks. All type-only imports use `import type` per `verbatimModuleSyntax`. ✅
- **Placeholders:** none — every code/test/command step is concrete.
