# Badge

Status indicator label. Used to communicate success, info, warning, or error states inline.

---

## Import

```ts
import { Badge } from 'src/app/components/Badge';
import type { BadgeEmphasis, BadgeIndication } from 'src/app/components/Badge';
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `indication` | `'success' \| 'info' \| 'warning' \| 'error'` | required | The semantic status type |
| `emphasis` | `'bold' \| 'subtle' \| 'minimal'` | required | Visual weight |
| `withIcon` | `boolean` | `false` | Show a status icon alongside the label |

---

## Emphasis pattern

Follows the system-wide status color pattern (see `guidelines/tokens.md`):

| Emphasis | Fill | Border | Text |
|---|---|---|---|
| Bold | `--color-{status}-background` | `--color-{status}-primary` (1px) | `--color-{status}-primary` |
| Subtle | `--color-{status}-background` | none | `--color-{status}-primary` |
| Minimal | none | `--color-primary-grey` (1px) | `--color-{status}-primary` |

---

## Usage rules

- Use `bold` for the most prominent status — e.g. a claim status in a data table header row
- Use `subtle` for secondary status — e.g. a status alongside other metadata in a card
- Use `minimal` for low-prominence status in dense UIs where color is not the primary differentiator
- Do not stack multiple badges of different indications in the same cell — pick the most important one
- Badges are read-only indicators — they are never interactive (no click handler)

---

## Examples

```tsx
// In a table cell — claim status
<Badge indication="success" emphasis="bold" withIcon />

// Inline beside a plan name
<Badge indication="warning" emphasis="subtle" />

// Dense list
<Badge indication="error" emphasis="minimal" />
```
