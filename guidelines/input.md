# Input / Textarea

Text input fields for single-line and multi-line user entry.

---

## Import

```ts
import { Input, Textarea } from 'src/app/components/Input';
```

---

## Input props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Optional label above the field |
| `state` | `'default' \| 'error' \| 'disabled'` | `'default'` | Visual and interactive state |
| `errorMessage` | `string` | — | Error text below the field — only shown when `state="error"` |
| `trailingIcon` | `'none' \| 'dropdown' \| 'stepper' \| 'eye'` | `'none'` | Trailing icon inside the field |
| `type` | `string` | — | Standard HTML input type. `eye` trailing icon overrides to `password`/`text` toggle automatically |
| ...rest | `InputHTMLAttributes` | — | All standard input attributes (placeholder, value, onChange, etc.) |

## Textarea props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Optional label above the field |
| `state` | `'default' \| 'error' \| 'disabled'` | `'default'` | Visual and interactive state |
| `errorMessage` | `string` | — | Error text — only shown when `state="error"` |
| ...rest | `TextareaHTMLAttributes` | — | Standard textarea attributes |

---

## States

| State | Border | Background | Label / text color |
|---|---|---|---|
| Default | `--color-secondary-grey` → focuses to `--color-secondary-2` | `--color-secondary-background` | `--color-primary-text` |
| Focused | `--color-secondary-2` | `--color-secondary-background` | `--color-primary-text` |
| Error | `--color-error-primary` | `--color-secondary-background` | `--color-primary-text` |
| Disabled | `--color-secondary-grey` | `#E7E7E7` | `#565962` |

Focus state is handled automatically via CSS `peer-focus` — no JS required.

---

## Trailing icons

| Value | Use for |
|---|---|
| `none` | Plain text input (default) |
| `dropdown` | Triggers a dropdown (styling only — attach `onClick` separately) |
| `stepper` | Numeric up/down stepper (styling only) |
| `eye` | Password field — automatically toggles between `password` and `text` type |

---

## Usage rules

- Always provide `label` on forms — unlabelled inputs are only for search bars or inline filtering
- Always provide `errorMessage` when using `state="error"` — the error border alone is not sufficient
- Use `Input` for single-line fields and `Textarea` for multi-line (notes, addresses, descriptions)
- Do not use `state="disabled"` and make the field focusable — disabled fields should not be in the tab order

---

## Examples

```tsx
// Basic with label
<Input label="First name" placeholder="Enter first name" />

// Error state
<Input
  label="Email"
  state="error"
  defaultValue="not-an-email"
  errorMessage="Please enter a valid email address"
/>

// Password field
<Input label="Password" trailingIcon="eye" />

// Disabled
<Input label="Employee ID" state="disabled" defaultValue="EMP-00123" />

// Textarea
<Textarea label="Notes" placeholder="Enter any additional notes" />
```
