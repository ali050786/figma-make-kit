# Alert / Toast

System feedback messages for success, info, warning, and error states.

---

## Import

```ts
import { Alert } from 'src/app/components/Alert';
import type { AlertIndication } from 'src/app/components/Alert';
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `indication` | `'success' \| 'info' \| 'warning' \| 'error'` | required | Semantic feedback type |
| `type` | `'floating' \| 'in-page'` | required | Layout variant |
| `multiline` | `boolean` | `false` | Show a title + body layout instead of single line |
| `title` | `string` | — | Heading text for multiline alerts |
| `onDismiss` | `() => void` | — | If provided, shows a dismiss (×) button |
| `style` | `CSSProperties` | — | Override width or position |

---

## Types

### Floating
Used for transient toast notifications — typically triggered by an action and
dismissed automatically or by the user. Appears above page content, usually anchored
to a corner. Always provide `onDismiss` for floating alerts.

### In-Page
Used for persistent contextual feedback embedded within the page layout — e.g. a form
validation summary, a plan enrollment warning, or a success state after submitting a
claim. Does not float above content. `onDismiss` is optional.

---

## Multiline

Single-line (default) → one line of text, icon on the left, optional dismiss on the right.
Multiline → `title` as a bold heading + body text below it. Use multiline when the
message needs more than ~8 words to be understood.

---

## Usage rules

- Always use `floating` for action-triggered feedback (form submit, save, delete)
- Always use `in-page` for pre-existing or persistent warnings the user needs to act on
- Never show more than one floating alert at a time — queue them if needed
- `error` alerts should always be `in-page` when they block a user from proceeding
- Do not use alerts for empty states — those have their own pattern

---

## Examples

```tsx
// Floating success toast (dismissible)
<Alert indication="success" type="floating" onDismiss={() => setVisible(false)} />

// In-page warning (persistent)
<Alert indication="warning" type="in-page" />

// Multiline error with title
<Alert
  indication="error"
  type="in-page"
  multiline
  title="Enrollment period has closed."
/>
```
