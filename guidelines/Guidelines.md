# Jevelina Design System — Guidelines

You are generating UI for **Javelina**, a white-label health insurance and benefits
administration portal. Read and apply every rule in this file before generating any
screen, component, or layout.

---

## 1. What Jevelina is

Jevelina is a **multi-brand, white-label product**. The same codebase powers several
insurance clients (Aptia, Keenan, Bywater, Hub International). Each client has its own
brand theme — different primary/secondary colors, logo, and name — but the same
component structure, layout patterns, and interaction conventions.

**This has one critical implication for every line of code you generate:**
→ Never use a hardcoded hex color value. Always use a CSS custom property
  (`var(--color-primary-1)` etc.). The theme is applied at the root level and
  every color must resolve through it.

---

## 2. Always ask for the theme first

Before generating any screen or component that involves color, confirm which brand
theme is active. Do not assume a default. If not specified, ask:

> "Which brand theme should I use? (Aptia / Keenan / Bywater / Hub International)"

The theme is applied by setting a `data-theme` attribute on the root element:
```html
<div data-theme="aptia"> … </div>
```

Every theme defines all 22 color tokens in `src/styles/tailwind.css`. Most tokens
are currently identical across clients, but every token is overridable per theme —
so any client can request a custom background, text, or status color at any time
without requiring structural changes to the CSS.

---

## 3. Key rules

* **No hardcoded hex values** — all colors via `var(--color-*)` tokens
* **No hardcoded font sizes** — use the type scale (see `guidelines/styles.md`)
* **Semantic tokens only** — never reference a raw value, always the token name
* Use **flexbox or grid** for layout; absolute positioning only when there is no
  alternative (e.g. overlays, tooltips)
* Keep components in their own files; keep helper functions out of component files
* Refactor as you go — don't let a single component file grow beyond ~200 lines

---

## 4. Reference files — read these when relevant

| What you're building | Read this first |
|---|---|
| Anything with color | `guidelines/tokens.md` |
| Layout, spacing, typography, radius | `guidelines/styles.md` |
| Any UI component | `guidelines/components.md` |
| Environment / imports / setup questions | `guidelines/setup.md` |

---

## 5. Adding a new client

1. Open `src/styles/tailwind.css`
2. Copy any existing `[data-theme]` block in full (all 22 tokens)
3. Rename the attribute to the new client slug (e.g. `data-theme="newclient"`)
4. Update the 6 brand-specific tokens:
   - `--color-primary-1`, `--color-primary-2`
   - `--color-secondary-1`, `--color-secondary-2`
   - `--color-table-primary`, `--color-table-secondary`
5. Leave all other tokens as-is unless the client specifically requires a
   custom value (e.g. a different error color or page background)
6. Add the new slug to the theme-picker wherever themes are listed in the UI

---

## 6. Domain context

Jevelina is a **benefits administration portal** used by HR administrators and plan
members. Screens fall into two broad categories:

- **Member-facing** — individuals reviewing their health insurance, enrolling in plans,
  checking claims, finding providers
- **Admin-facing** — Insurers, Employers, Provider, Brokers configuring enrollment windows, uploading plan
  mappings, managing employee eligibility.

When in doubt about which platform a new screen belongs to, ask before generating.
Domain logic and screen patterns will be documented in `guidelines/components.md` as
coverage grows.