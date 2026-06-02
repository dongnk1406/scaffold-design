# Scaffold Design

A React app scaffolded around the **Scaffold Design** system — a clean, high-trust
interface built on a vivid green primary, a warm amber secondary, and a calm
blue-grey neutral ramp. The design tokens are mirrored from a Figma library and
shipped as Tailwind theme tokens plus a small set of composable UI primitives.

## Tech Stack

- **React 19** function components (no `forwardRef`)
- **Vite** for dev/build
- **TanStack Router** with file-based routing
- **TanStack Query** for data fetching/caching
- **Tailwind CSS v4** with a token-driven `@theme`
- **TypeScript**, **ESLint** ([`@tanstack/eslint-config`](https://tanstack.com/config/latest/docs/eslint)), **Prettier**

## Getting Started

```bash
pnpm install
pnpm dev      # starts on http://localhost:3000
```

## Building For Production

```bash
pnpm build
pnpm preview  # serve the production build locally
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server on port 3000 |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview the production build |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format with Prettier and apply ESLint fixes |
| `pnpm check` | Check formatting with Prettier |
| `pnpm type:check` | Type-check with `tsc --noEmit` |

> **No unit tests.** This project does not use unit tests. Verify changes with
> `pnpm type:check`, `pnpm build`, and `pnpm lint`.

## Design System

The design system is the heart of this scaffold. Before building or generating UI,
read **[`DESIGN.md`](./DESIGN.md)** — the snapshot of the project's Figma library.
The runtime tokens live in [`src/styles.css`](./src/styles.css) under `@theme`.

Guidelines (see [`CLAUDE.md`](./CLAUDE.md) for the full set):

- **Use theme token utilities only** — never arbitrary hex or off-scale pixel values.
  Colors come from the semantic set (`bg-primary`, `text-foreground`, `border-input`,
  `bg-info-subtle`, …). Spacing uses Tailwind's default 4px scale.
- **Typography** uses the named scale: `text-h1`…`text-h5`, `text-body`,
  `text-body-sm`, `text-body-xs`, `text-display-1/2`. Weights are limited to
  400 (normal) and 600 (`font-semibold`).
- **Radius/elevation:** `rounded-sm` (4px) for inputs, `rounded-md` (8px) for
  buttons/cards; `shadow-e1`…`shadow-e3`; `shadow-focus` for focus rings.
- **Font:** Inter (self-hosted via `@fontsource-variable/inter`) is the stand-in for
  the proprietary Aestetico; swap later via `--font-sans` and the import in
  [`src/main.tsx`](./src/main.tsx).

### UI Primitives

Compose UI from the components in [`src/components/ui/`](./src/components/ui):
`Button`, `TextField`, `Card`, `Alert`, `Badge`. Extend a primitive's `cva`
variants rather than re-styling inline.

```tsx
import { Button, TextField, Card } from '#/components/ui'
```

## Project Structure

```
src/
  components/ui/   Design-system primitives (Button, TextField, Card, Alert, Badge)
  lib/cn.ts        clsx + tailwind-merge helper
  routes/          File-based routes (__root.tsx, index.tsx)
  styles.css       Tailwind import + @theme design tokens
  main.tsx         App entry (Router + React Query providers)
```

## Routing

This project uses [TanStack Router](https://tanstack.com/router) with file-based
routing. Add a route by creating a file in `src/routes/`; the route tree
(`src/routeTree.gen.ts`) is generated automatically. The shared layout lives in
`src/routes/__root.tsx`.

Navigate between routes with the `Link` component:

```tsx
import { Link } from '@tanstack/react-router'

<Link to="/">Home</Link>
```

## Data Fetching

Data is fetched with [TanStack Query](https://tanstack.com/query) (the
`QueryClient` is provided in `src/main.tsx`), or via TanStack Router `loader`s for
route-level loading. The router is configured with `defaultPreloadStaleTime: 0` so
React Query owns caching.

## Learn More

- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com/)
