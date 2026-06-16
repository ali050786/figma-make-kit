# Style Guidelines — Jevelina Design System

---

## Typography

### Font family

**Open Sans** is the only typeface used in all UI components and screens.
Never substitute another font family. Required weights: Light · Regular · SemiBold · Bold.

---

### Two scale sets — Desktop and Responsive

The design system defines two text style groups:

| Group | When to use |
|---|---|
| **Desktop** | All web UI — the primary scale. Always use this. |
| **Responsive for Figma** | Figma canvas previews only — never use in code or components. |

---

### Headings

Five heading levels, each available in Light · Regular · SemiBold · Bold.
No letter spacing. No text transform.

| Level | Size | Use for |
|---|---|---|
| H1 | 48px | Page-level hero headings |
| H2 | 32px | Major section headings |
| H3 | 24px | Sub-section headings, card titles |
| H4 | 20px | Widget headings, panel titles |
| H5 | 18px | Small headings, grouped label areas |

---

### Paragraphs

Three sizes, each available in Light · Regular · SemiBold · Bold.
No letter spacing. No text transform.

| Style | Size | Use for |
|---|---|---|
| Paragraph Large | 16px | Intro copy, prominent body text |
| Paragraph | 14px | Default body copy, form labels, descriptions |
| Paragraph Small | 12px | Captions, helper text, metadata |
| Paragraph Underlined | 14px | Inline links within body copy — same weights as Paragraph |

---

### Interactive styles

| Style | Size | Weight | Transform | Use for |
|---|---|---|---|---|
| Button | 14px | Regular | UPPERCASE | Button labels (default) |
| Button Bold | 14px | Bold | UPPERCASE | Button labels on primary/emphasized buttons |
| Small Button | 12px | Regular | UPPERCASE | Small button labels |
| Small Button Semibold | 12px | SemiBold | UPPERCASE | Small button labels (emphasized) |
| Link Regular | 14px | Regular | None | Standalone navigation links |
| Link Bold | 14px | Bold | None | Emphasized standalone links |

> **Menu nav items** — there is no dedicated Menu style in the Desktop scale.
> Use Paragraph Small for sidebar nav items: Regular weight for rest state,
> SemiBold or Bold for active state.

---

### Weight usage rules

| Weight | When to use |
|---|---|
| Light | Large display headings where elegance is the goal; de-emphasis |
| Regular | Default body copy, form labels, nav items at rest, link text |
| SemiBold | Data values, emphasized labels, active nav states, small buttons |
| Bold | Headings (most common default), button labels, strong emphasis, active links |

---

### Line height

All text styles use AUTO line height (browser natural). Do not set explicit
line height values unless a specific component requires it for layout reasons.

---

## Spacing, layout, radius, shadows

> Not yet documented — to be added in a subsequent session.

---

## Spacing

### Base unit

The spacing system uses a base unit of **8px**. All spacing values in the system
are multiples or sub-multiples of 8. The one exception is 4px, which exists as a
half-unit for tight internal component spacing.

---

### Spacing scale

| Token | Value | When to use |
|---|---|---|
| `space-1` | 4px | Tight internal gaps — icon padding, badge top/bottom padding, minor offsets |
| `space-2` | 8px | Gap between icon and label inside a component; gap between stacked elements |
| `space-3` | 12px | Vertical padding in accordions, compact list items |
| `space-4` | 16px | Default input padding (all sides); tab item horizontal padding; standard internal padding |
| `space-5` | 20px | Default horizontal padding in accordion rows; small button horizontal padding |
| `space-6` | 24px | Standard section gap, card inner spacing |
| `space-8` | 32px | Section separators, larger layout gaps |
| `space-10` | 40px | Large button horizontal padding; generous section padding |
| `space-12` | 48px | Large layout spacing, hero section padding |
| `space-16` | 64px | Major section spacing |
| `space-24` | 128px | Page-level spacing, large layout blocks |
| `space-32` | 192px | Maximum layout spacing — page margins or hero areas |

> **Observed in components:**
> - Large button: `12px` top/bottom · `40px` left/right
> - Small button: `8px` top/bottom · `20px` left/right
> - Input field: `16px` all sides
> - Accordion row: `12px` top/bottom · `20px` left/right
> - Tab item: `8px` top/bottom · `16px` left/right
> - Badge: `4px` top/bottom · `12px` left/right

---

### Border radius

No shared radius variable system exists yet — radius is applied per component type.
Always use these values, never arbitrary ones.

| Value | Used on |
|---|---|
| 4px | Buttons (all sizes), input fields, text areas, cards |
| 8px | Dashboard tiles, modals, larger cards |
| 20px | Badges and pill-shaped labels |
| 0px | Accordion rows, tabs, table rows, dividers |

---

## Layout and grid

### Overview

Jevelina uses a **12-column grid** on desktop, scaling down to 8 columns on tablet
and 4 columns on mobile. The grid is defined in Tailwind's theme config — use
standard Tailwind grid utilities (`grid`, `grid-cols-*`, `gap-*`, `col-span-*`)
rather than writing custom layout CSS.

The left navigation sidebar (88px wide) sits **outside** the content container.
The container is centred within the remaining content area, not the full viewport.

---

### Breakpoints

| Name | Viewport width | Container width | Columns | Gutter | Margin each side |
|---|---|---|---|---|---|
| Mobile | below 600px | fluid (100%) | 4 | 16px | 16px |
| Tablet (sm) | 600–959px | fluid (100%) | 8 | 16px | 32px |
| Desktop (md) | 960–1239px | fluid (100%) | 12 | 16px | 128px |
| Desktop (lg) | 1240–1439px | 1240px fixed | 12 | 24px | 144px |
| Desktop (xl) | 1440px and above | 1440px fixed | 12 | 32px | 144px |

---

### How to use in components

**Page wrapper pattern** — every screen uses this structure:

```
<div class="flex">                          ← full viewport, flex row
  <nav class="w-[88px] shrink-0">          ← fixed sidebar, outside grid
  <main class="flex-1 overflow-auto">      ← content area
    <div class="container mx-auto px-[var(--grid-margin-xl)]">
      <div class="grid grid-cols-12 gap-[var(--grid-gutter-xl)]">
        ...
```

**Column spans** — use Tailwind's `col-span-*` utilities:

| Content type | Typical span |
|---|---|
| Full-width section | `col-span-12` |
| Two-column split | `col-span-6` each |
| Sidebar + content | `col-span-3` + `col-span-9` |
| Dashboard widgets (3-up) | `col-span-4` each |
| Dashboard widgets (4-up) | `col-span-3` each |

**Responsive column changes** — always go mobile-first:

```
col-span-4 md:col-span-6 lg:col-span-4
```

---

### What not to do

- Do not use absolute pixel widths for layout — use column spans
- Do not set margins directly on content components — the container handles margins
- Do not place content inside the nav sidebar column — it is a reserved layout slot
- Do not create custom breakpoints — use only the four defined above
