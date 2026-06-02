<!-- A single CLAUDE.md file to improve Claude Code behavior, derived from Andrej Karpathy's observations on LLM coding pitfalls. https://github.com/forrestchang/andrej-karpathy-skills -->

# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
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
- If you notice unrelated dead code, mention it - don't delete it.

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

## Design System

This project follows the **Scaffold Design** system. The token snapshot lives in `DESIGN.md`; the runtime tokens live in `src/styles.css` (`@theme`).

When building or generating UI:
- **Read `DESIGN.md` first.** It is the snapshot of the project's Figma library.
- **Use theme token utilities only** — never arbitrary hex or off-scale pixel values. Colors come from the semantic set (`bg-primary`, `text-foreground`, `border-input`, `bg-info-subtle`, …). Spacing uses Tailwind's default 4px scale (`p-4`, `gap-2`, …).
- **Typography** uses the named scale: `text-h1`…`text-h5`, `text-body`, `text-body-sm`, `text-body-xs`, `text-display-1/2`. Font weights are limited to 400 (normal) and 600 (`font-semibold`).
- **Radius/elevation:** `rounded-sm` (4px) for inputs, `rounded-md` (8px) for buttons/cards; `shadow-e1`…`shadow-e3`; `shadow-focus` for focus rings.
- **Compose from `src/components/ui/*`** (Button, TextField, Card, Alert, Badge). Components are React 19 function components (no `forwardRef`); extend a primitive's `cva` variants instead of re-styling inline.
- **For a specific Figma frame,** pull exact specs via the Figma MCP (`get_node` / `get_design_context`) before building.
- **Font:** Inter is the self-hosted stand-in for the proprietary Aestetico; swap later via `--font-sans` + the import in `src/main.tsx`.

**No unit tests.** This project does not use unit tests — never write test files. Verify changes with `pnpm type:check`, `pnpm build`, and `pnpm lint`.
