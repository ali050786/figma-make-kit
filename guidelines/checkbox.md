# Checkbox

Three-state checkbox for single selections and indeterminate group states.

---

## Import

```ts
import { Checkbox } from 'src/app/components/Checkbox';
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Label text shown beside the checkbox |
| `status` | `'unchecked' \| 'checked' \| 'indeterminate'` | — | Controlled check state |
| `defaultStatus` | `'unchecked' \| 'checked' \| 'indeterminate'` | `'unchecked'` | Uncontrolled initial state |
| `state` | `'default' \| 'hovered' \| 'focused' \| 'disabled' \| 'error'` | — | Force a visual state (used for design system showcase — in production let interaction drive state) |
| `onChange` | `(next: CheckboxStatus) => void` | — | Called with the new status on click |
| `className` | `string` | `''` | Additional wrapper class |

---

## States

| State | Visual |
|---|---|
| Default unchecked | White box, grey border (`#565962`) |
| Default checked | Filled `--color-secondary-2`, white tick |
| Default indeterminate | Filled `--color-secondary-2`, white dash |
| Hovered / Focused | Border changes to `--color-secondary-2`; focus ring appears at 24×24px |
| Error | Border and fill change to `--color-error-primary` |
| Disabled unchecked | Grey background (`#E7E7E7`), grey border |
| Disabled checked | Grey fill (`#999999`), white tick |
| Disabled indeterminate | Grey fill (`#999999`), white dash |

---

## Usage rules

- Use `indeterminate` when a checkbox represents a group where some (not all) items are checked
- Click cycles: unchecked → checked → unchecked (indeterminate is set programmatically, not via click)
- Always provide `label` — an unlabelled checkbox must still have an `aria-label` set via the wrapper
- Do not use `state` prop to drive real interaction — it is for showcase/documentation only

---

## Examples

```tsx
// Basic uncontrolled
<Checkbox label="I agree to the terms and conditions" />

// Pre-checked
<Checkbox label="Receive email notifications" defaultStatus="checked" />

// Controlled
<Checkbox
  label="Select all"
  status={allSelected ? 'checked' : someSelected ? 'indeterminate' : 'unchecked'}
  onChange={handleSelectAll}
/>

// Disabled
<Checkbox label="Auto-renew" defaultStatus="checked" state="disabled" />
```
