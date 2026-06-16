# Token Guidelines — Jevelina Design System

Color tokens live in `src/styles/tailwind.css` as CSS custom properties scoped to
`[data-theme]` attributes. Always use `var(--color-*)` — never a raw hex value.

---

## Naming pattern

All color tokens follow:
```
--color-{token-name-lowercased-with-hyphens}
```

Examples:
```css
var(--color-primary-1)
var(--color-secondary-background)
var(--color-error-primary)
```

---

## How theming works

Every theme block in `tailwind.css` defines all 22 tokens — including the ones that
are currently identical across clients (text colors, backgrounds, status colors). This
means any client can override any token without requiring a structural change to the CSS.

Theme is applied at the root element:
```html
<div data-theme="aptia"> … </div>
```

Active themes: `aptia` · `keenan` · `bywater` · `hub` · `a1m` (sandbox only)

---

## Token groups and when to use each

### Brand tokens — currently vary per client

These are the tokens most likely to differ between clients. Always check the active
theme — never assume a value or "feel" from the token name alone (e.g. `primary-2`
is green for Aptia, orange for Keenan, blue for Hub).

**`--color-primary-1`** — Structural brand surfaces
- Navigation sidebars (left nav, admin sidebar) backgrounds
- Table header cell borders / strokes
- Do NOT use as text color on light backgrounds

**`--color-primary-2`** — Brand accent / icon color
- Icon fills throughout the UI (widget icons, inline indicators)
- Chart and pie-chart segment fills
- Decorative illustration accents
- Card border accents
- Do NOT use as page or surface backgrounds

**`--color-secondary-1`** — Brand identity / supporting color
- Header / logo area text and supporting icons
- Icon-background tints inside dashboard widgets
- Some outline button fills / strokes (see `guidelines/components.md` for canonical button pattern)

**`--color-secondary-2`** — Primary action color
- Primary button background fill (button label uses `--color-secondary-background`)
- Secondary / outline button stroke and label text (canonical Button component)
- Link text color throughout the UI

---

### Table tokens — currently vary per client, otherwise reserved

**`--color-table-primary`** and **`--color-table-secondary`** exist in every theme
block and have per-brand tint values, but are not currently bound to any component.
Do not use for table row striping or any other purpose until confirmed — table rows
currently use `--color-secondary-background` with `--color-primary-1` header borders.

---

### Background tokens — currently identical across all clients

| Token | Use for | Default value |
|---|---|---|
| `--color-primary-background` | Page / canvas background | `#F6F6F6` |
| `--color-secondary-background` | Card, panel, modal surface | `#FFFFFF` |
| `--color-tertiary-background` | Subtle sub-section background within a card | `#F1F1F1` |

**Decision rule:** page → `primary-background` · card/panel → `secondary-background` ·
tinted sub-section within a card → `tertiary-background`.

---

### Text tokens — currently identical across all clients

| Token | Use for | Default value |
|---|---|---|
| `--color-primary-text` | All default body copy, headings, labels | `#333333` |
| `--color-secondary-text` | Helper text, captions, muted labels | `#666666` |
| `--color-secondary-background` | Text / label on a `--color-secondary-2` filled button | `#FFFFFF` |

---

### Grey tokens — currently identical across all clients

| Token | Use for | Default value |
|---|---|---|
| `--color-primary-grey` | Borders, dividers, separator lines; "Minimal" badge borders | `#E2E2E2` |
| `--color-secondary-grey` | Disabled state fills and text, placeholder text | `#999999` |

---

### Status tokens — currently identical across all clients

Four status pairs: `error` · `warning` · `success` · `info`.
Each pair has a `-primary` (vivid, for text/icon/border) and a `-background` (tinted surface).

**Pattern — always follow this for badges, alerts, toasts, and indicators:**

| Emphasis | Fill | Border | Text / Icon |
|---|---|---|---|
| Bold | `--color-{status}-background` | `--color-{status}-primary` | `--color-primary-text` |
| Subtle | `--color-{status}-background` | none | `--color-{status}-primary` |
| Minimal | none | `--color-primary-grey` | `--color-{status}-primary` |

Rule of thumb: `{status}-primary` is always the colored element. `{status}-background`
is always the tinted surface behind it. Never swap them.

| Token | Default value |
|---|---|
| `--color-error-primary` / `--color-error-background` | `#CC0000` / `#FFDEDE` |
| `--color-warning-primary` / `--color-warning-background` | `#A05600` / `#FFF2E3` |
| `--color-success-primary` / `--color-success-background` | `#007E33` / `#E9FFF3` |
| `--color-info-primary` / `--color-info-background` | `#007399` / `#D0F3FF` |

---

## Quick decision tree

```
What am I coloring?
│
├── Page background                     → --color-primary-background
├── Card / panel / modal surface        → --color-secondary-background
├── Subtle sub-section background       → --color-tertiary-background
│
├── Default text / heading              → --color-primary-text
├── Muted / helper / caption text       → --color-secondary-text
│
├── Navigation sidebar background       → --color-primary-1
├── Icon fill                           → --color-primary-2
├── Chart / data visualization fill     → --color-primary-2
│
├── Primary button background           → --color-secondary-2
├── Primary button label text           → --color-secondary-background
├── Link text                           → --color-secondary-2
│
├── Border / divider                    → --color-primary-grey
├── Disabled / placeholder              → --color-secondary-grey
│
└── Status indicator (badge/alert/toast)
    ├── Surface                         → --color-{status}-background
    ├── Vivid text or icon              → --color-{status}-primary
    └── Border (Bold variant)           → --color-{status}-primary
```

---

## Per-brand values (currently varying tokens only)

| Token | Aptia | Keenan | Bywater | Hub Intl |
|---|---|---|---|---|
| `--color-primary-1` | `#113546` | `#5B2540` | `#263746` | `#263746` |
| `--color-primary-2` | `#00D17C` | `#E87823` | `#59A092` | `#0678D5` |
| `--color-secondary-1` | `#2A7050` | `#2A7050` | `#59A092` | `#055CA3` |
| `--color-secondary-2` | `#00205C` | `#00205C` | `#133659` | `#055CA3` |
| `--color-table-primary` | `#DEF3EA` | `#F5EAE1` | `#EFF6F5` | `#EFF6F5` |
| `--color-table-secondary` | `#98D7BD` | `#DBD0C7` | `#B3C8C4` | `#B3C8C4` |

All other tokens share the default values listed in each group above.