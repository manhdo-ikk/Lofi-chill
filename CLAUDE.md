# Project: Lofi Chill

React + TypeScript + Vite + Tailwind CSS application.

## Commands

```bash
yarn start          # dev server
yarn build          # production build
yarn lint           # ESLint
yarn lint:fix       # ESLint --fix
yarn format         # Prettier write
yarn format:check   # Prettier check
```

## Architecture

```
src/
  assets/          # Static assets (icons, images, videos)
  component/       # UI components
    menu/          # Sidebar menu panels
    modal/         # Draggable modal windows
  constants/       # App-wide constants and data
    links/         # External audio/video URLs
  context/         # React Context (global state)
  types.ts         # Shared TypeScript types
  untils/          # Utility functions
```

## TypeScript Rules

- Use `strict: true` — no implicit `any`
- Prefer `type` over `interface` for object shapes
- Export types from `src/types.ts` when shared across files
- Use `React.FC` sparingly — prefer explicit return type or none (inferred)
- Use non-null assertion `!` only when the value is guaranteed to be non-null at runtime (e.g., refs attached to rendered elements)
- Avoid `as any` — use proper type narrowing or assertions with specific types

## React Rules

- **Functional components only** — no class components
- One component per file; file name matches component name
- Component props typed with a local `type Props = { ... }` above the component
- Extract sub-components to separate files when they exceed ~80 lines or are reused
- `useContext` must be called with the specific context — never pass context as a prop
- Avoid `useEffect` for derived state — compute it during render instead
- Memoize (`useMemo`, `useCallback`) only when profiling shows a real bottleneck

## Hooks

- Custom hooks go in `src/hooks/` (create directory when needed)
- Every hook name starts with `use`
- Hooks must not be called conditionally

## State Management

- Global state lives in `src/context/index.tsx`
- Local UI state (open/close, form input) stays in the component
- Persist user preferences to `localStorage` only in the context provider, not in components

## Styling

- **Tailwind CSS only** — no inline `style` props, no CSS modules
- Conditional classes: use template literals or `clsx` (preferred)
- No magic color values — use Tailwind tokens or CSS variables defined in the theme

## Naming Conventions

- Components: `PascalCase` (file and function)
- Hooks: `camelCase` starting with `use`
- Constants: `SCREAMING_SNAKE_CASE`
- Types: `PascalCase`
- Event handlers: `handle` prefix — `handleClick`, `handleChange`

## Imports

Preferred import order (enforced by Prettier/ESLint):
1. React and React hooks
2. Third-party libraries
3. Internal modules (absolute or relative)
4. Types (`import type { ... }`)

## Comments

- Write comments **only when the WHY is non-obvious**
- No comments that restate what the code does
- No commented-out dead code — delete it
- ESLint disable comments are allowed only with a reason on the same line
