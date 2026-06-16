# Radio

Single-select radio button. Always use in groups sharing the same `name`.

---

## Import

```ts
import { Radio } from 'src/app/components/Radio';
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Label text beside the radio |
| `checked` | `boolean` | — | Controlled selected state |
| `defaultChecked` | `boolean` | `false` | Uncontrolled initial state |
| `state` | `'default' \| 'hovered' \| 'focused' \| 'disabled' \| 'error'` | — | Force a visual state |
| `onChange` | `(checked: boolean) => void` | — | Called with `true` when selected |
| `name` | `string` | — | HTML name attribute — required for grouping radio buttons |
| `className` | `string` | `''` | Additional wrapper class |

---

## States

| State | Visual |
|---|---|
| Unselected default | White circle, dark grey border (`#6B6F7A`) |
| Unselected hovered / focused | Lighter border, focus ring via SVG stroke at 40% opacity |
| Unselected error | Red border (`--color-error-primary`) |
| Selected default | `--color-secondary-2` outer ring and inner fill |
| Selected hovered / focused | Same at 80% opacity |
| Selected error | `--color-error-primary` outer ring and inner fill |
| Disabled | Grey fill (#E7E7E7), grey border/fill (#999999) |

---

## Usage rules

- Always group related radios with the same `name` attribute for correct browser/AT behavior
- Radio only fires `onChange(true)` — it does not deselect itself; deselection is handled by the group
- Do not use a single standalone radio — if only one option exists, use a Checkbox instead
- Prefer controlled usage (`checked` + `onChange`) inside forms with a managed state model

---

## Examples

```tsx
// Uncontrolled group
<div role="radiogroup" aria-label="Plan type">
  <Radio label="HMO" name="plan-type" />
  <Radio label="PPO" name="plan-type" defaultChecked />
  <Radio label="EPO" name="plan-type" />
</div>

// Controlled
{options.map(opt => (
  <Radio
    key={opt.value}
    label={opt.label}
    name="coverage"
    checked={selected === opt.value}
    onChange={() => setSelected(opt.value)}
  />
))}
```
