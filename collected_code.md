# Project Code Collection
**Source Directory**: `/Users/sikandar/Desktop/projects/Figma_Kit`
**Total Files**: 90

--- 

## .gitignore
```txt
node_modules/
dist/
pnpm-lock.yaml
pnpm-workspace.yaml
__figma__entrypoint__.ts
default_shadcn_theme.css
.figma/
.mcp.json
.npmrc
src/styles/globals.css
src/styles/theme.css
.DS_Store
src/.DS_Store
index.html
src/preview/
```

## ATTRIBUTIONS.md
```md
This Figma Make file includes components from [shadcn/ui](https://ui.shadcn.com/) used under [MIT license](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md).

This Figma Make file includes photos from [Unsplash](https://unsplash.com) used under [license](https://unsplash.com/license).

```

## guidelines/Guidelines.md
```md
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
```

## guidelines/alert.md
```md
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

```

## guidelines/badge.md
```md
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

```

## guidelines/body-layout.md
```md
# Page Body Layout

The body content area (the `<main>` region between the header and footer) follows the same wrapper principle as `GlobalHeader` and `Footer`. The `<main>` element itself is always `flex: 1` and full width. The **inner content wrapper** is what controls alignment.

---

## Layout contract

### Unsecured body (pre-login)
- No `<SideNav>` is present
- Inner content wrapper: **1216px wide, horizontally centered** (`margin: 0 auto`)
- Matches the 12-column grid

### Secured body (post-login)
- `<SideNav>` is present in a flex row alongside `<main>`
- Inner content wrapper: **1216px wide, left-pinned** (`margin-left: 112px`)
- The 112px offset clears the left nav visually and aligns the body content with the header and footer content above and below

```
Unsecured:  |←——auto——→[——1216px content——]←——auto——→|
Secured:    |←—112px—→[——1216px content——————————————]|
```

---

## Implementation pattern

Every screen's `<main>` should follow this structure:

```tsx
// Determine wrapper style based on secured context
const contentWrapperStyle: React.CSSProperties = secured
  ? { width: 1216, marginLeft: 112 }
  : { width: 1216, marginLeft: 'auto', marginRight: 'auto' };

<main style={{ flex: 1, overflow: 'auto', paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
  <div style={{ ...contentWrapperStyle, display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
    {/* Page content goes here */}
  </div>
</main>
```

---

## Full shell structure

```tsx
<div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
  <GlobalHeader secured={secured} ... />

  <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
    {secured && <SideNav ... />}

    <main style={{ flex: 1, overflow: 'auto', paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
      <div style={contentWrapperStyle}>
        {/* Page content */}
      </div>
    </main>
  </div>

  <Footer secured={secured} ... />
</div>
```

---

## Rules

- `secured` must be consistent across `<GlobalHeader>`, body wrapper, and `<Footer>` on the same screen
- Never put horizontal padding directly on `<main>` — use the inner content wrapper
- Never center the secured body wrapper — it must be left-pinned at 112px
- Never use a fixed left offset for the unsecured body wrapper — it must use `margin: auto`
- The `<SideNav>` is only rendered on secured screens. Do not render it on unsecured screens
- All colors via `var(--color-*)` tokens — no hardcoded hex values

```

## guidelines/checkbox.md
```md
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

```

## guidelines/components.md
```md
# Component Guidelines — Jevelina Design System

All components live in `src/app/components/`. Import from that path directly.
Read the relevant file below before generating any screen that uses a component.

---

## Atoms

| Component | Import | Doc |
|---|---|---|
| Button | `src/app/components/Button` | `guidelines/components/button.md` |
| Input / Textarea | `src/app/components/Input` | `guidelines/components/input.md` |
| Checkbox | `src/app/components/Checkbox` | `guidelines/components/checkbox.md` |
| Radio | `src/app/components/Radio` | `guidelines/components/radio.md` |
| Badge | `src/app/components/Badge` | `guidelines/components/badge.md` |
| Alert | `src/app/components/Alert` | `guidelines/components/alert.md` |

## Organisms

| Component | Import | Doc |
|---|---|---|
| GlobalHeader | `src/app/components/GlobalHeader` | `guidelines/components/global-header.md` |
| SideNav | `src/app/components/SideNav` | `guidelines/components/side-nav.md` |
| Footer | `src/app/components/Footer` | `guidelines/components/footer.md` |

---

> Do not recreate any of these components inline. Always import and use the
> existing component. If a component does not exist in this list, ask before
> inventing a new one.

```

## guidelines/footer.md
```md
# Footer

Full-width footer used on all Jevelina screens. Follows the same secured/unsecured wrapper principle as `GlobalHeader` and the body content area.

---

## Layout contract

The footer's background spans full width. The inner content is constrained by a **1216px wrapper** whose alignment depends on the screen context — identical to the header and body.

### Unsecured footer (pre-login)
- Content wrapper: **1216px wide, horizontally centered** (`margin: 0 auto`)
- Matches the 12-column grid
- Used on login, registration, password reset, and any pre-auth screen

### Secured footer (post-login)
- Content wrapper: **1216px wide, left-pinned** (`margin-left: 112px`)
- Clears the left navigation bar
- Used on all screens where the left nav is visible

```
Unsecured:  |←——auto——→[——1216px content——]←——auto——→|
Secured:    |←—112px—→[——1216px content——————————————]|
```

The wrapper is applied to **both** the main content area and the bottom copyright bar, so both rows stay optically aligned.

---

## When to use which variant

| Situation | Use |
|---|---|
| Pre-login screens (login, registration, password reset) | `secured={false}` |
| Any post-login screen where the left nav is visible | `secured={true}` |

Always pass the same `secured` value to `<GlobalHeader>`, `<Footer>`, and the body content wrapper on a given screen.

---

## API

```tsx
<Footer
  secured={false}           // false = unsecured (default), true = secured
  companyName="A1M Health"  // Brand name in the bottom bar
  copyrightText="..."       // Copyright line in the bottom bar
  contact={{                // Contact Us column
    phone: "...",
    email: "...",
    address: "...",
  }}
  columns={[                // Link columns (array of { title, links[] })
    { title: "Block 1", links: [{ label: "Privacy Policy" }] }
  ]}
  showSocial={true}         // Show the Stay Connected / social icons column
  showAppBadges={false}     // Show App Store / Google Play badges under social
  poweredBy="Mphasis"       // Optional "Powered by" line in bottom bar
/>
```

---

## Do not

- ❌ Use `padding` on the footer's outer `<footer>` element to create side margins — the wrapper handles that
- ❌ Center the secured wrapper — it must be left-pinned at 112px
- ❌ Use a fixed left offset for the unsecured wrapper — it must use `margin: auto`
- ❌ Apply different wrapper logic to the main content row vs the bottom bar — both must use the same `wrapperStyle`
- ❌ Use hardcoded hex colors — all colors via `var(--color-*)` tokens

```

## guidelines/global-header.md
```md
GlobalHeader

A full-width header component used across all Jevelina screens. Supports two modes: Unsecured (pre-login) and Secured (post-login, with left navigation visible).


Layout contract

This is the most critical rule for the header. The two modes use fundamentally different alignment strategies for their inner content wrapper.

Unsecured header


The content wrapper is 1216px wide and horizontally centered using margin: 0 auto
This aligns the header content to the 12-column grid
The visual result is symmetric: equal space on left and right (112px each at 1440px viewport)
Do not use a fixed left offset — centering is intentional


Secured header


The content wrapper is also 1216px wide but left-pinned with a fixed margin-left: 112px
This offsets the content to clear the left navigation bar that is present on secured screens
The wrapper does not center — it is always anchored from the left at 112px
Do not center this wrapper — it must stay left-aligned


Unsecured:  |←——auto——→[——1216px content——]←——auto——→|
Secured:    |←—112px—→[——1216px content——————————————]|


When to use which variant

SituationUseLogin page, registration, password reset, any pre-auth screensecured={false} (Unsecured)Any screen where the left navigation bar is visiblesecured={true} (Secured)

The left nav and the secured header are always paired — if the left nav is present, the header must be secured.


API

tsx<GlobalHeader
  secured={false}           // false = unsecured (default), true = secured
  companyName="..."         // Brand/TPA name — top right, semibold, uppercase
  portalName="..."          // Portal label — below companyName, smaller
  logo={<YourLogo />}       // Logo node, constrained to 240×64px
  userName="..."            // Secured only — shown in profile dropdown
  userRole="..."            // Secured only — shown in profile dropdown
  userInitials="SJ"         // Secured only — avatar initials
  avatarBg="..."            // Secured only — avatar background color, defaults to var(--color-primary-2)
  onMyProfile={() => {}}    // Secured only — profile dropdown "My Profile" action
  onLogout={() => {}}       // Secured only — profile dropdown "Logout" action
/>


Content structure

Unsecured (left to right within centered wrapper):


Logo (left)
Spacer (flex: 1)
Company name + portal label (right)


Secured (left to right within left-pinned wrapper):


Logo (left)
Spacer (flex: 1)
Company name + portal label (right)
Divider line
Help icon
Bell icon
Avatar + chevron (opens ProfileDropdown)



Do not


❌ Change the wrapper width away from 1216px
❌ Center the secured header wrapper — it must be left-pinned at 112px
❌ Use a fixed left offset for the unsecured wrapper — it must use margin: auto
❌ Use hardcoded hex colors — all colors via var(--color-*) tokens
❌ Render the secured action icons (Help, Bell, Avatar) on an unsecured header
❌ Place the header inside the left nav's width — the header is always full-width (width: 100%) and the content wrapper handles the offset
```

## guidelines/input.md
```md
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

```

## guidelines/radio.md
```md
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

```

## guidelines/setup.md
```md
**Add your own guidelines here**
```

## guidelines/side-nav.md
```md
# SideNav

The left navigation bar present on all secured (post-login) screens. Full-width `var(--color-primary-1)` background. Collapses to icon-only, expands to icon + label.

---

## Item states (from Figma)

Three states per item, matching the Figma component variants exactly:

| State | Background | Icon | Label weight |
|---|---|---|---|
| **Active** | `rgba(38,49,84,0.2)` + 4px left accent bar (`var(--color-primary-2)`) | Filled / solid white | Semibold |
| **Hover** | `rgba(38,49,84,0.1)` | Outline / stroke white | Regular |
| **Default** | Transparent | Outline / stroke white | Regular |

Each `NavItem` provides **both** icon variants — `iconActive` (filled) and `iconDefault` (outline). The component swaps between them based on state. Never use a single icon for both states.

---

## Portal item sets

Item sets are fixed per portal. Do not invent new items unless specified.

### Member Portal
`MEMBER_PORTAL_NAV_ITEMS` — in order:
1. Home
2. Coverages
3. ID Cards
4. Claims
5. Prior Auth
6. Resources
7. Documents

### Admin Portal
`ADMIN_PORTAL_NAV_ITEMS` — in order:
1. Home

Import the correct constant and pass it via `items` prop. Do not hardcode items inline.

---

## Collapsed vs expanded

| | Collapsed | Expanded |
|---|---|---|
| Width | 80px | 240px |
| Shows | Icon only | Icon + label |
| Toggle | Chevron button at top | Same, with "Collapse" label |

Default state is collapsed. The nav expands on toggle click only.

When collapsed, each item's `title` attribute exposes the label as a native tooltip.

---

## API

```tsx
import { SideNav, MEMBER_PORTAL_NAV_ITEMS, ADMIN_PORTAL_NAV_ITEMS } from './components/SideNav';

<SideNav
  items={MEMBER_PORTAL_NAV_ITEMS}  // or ADMIN_PORTAL_NAV_ITEMS
  activeId="home"                   // id string matching a NavItem
  collapsed={false}                 // optional controlled mode
  onToggle={() => {}}               // called on collapse/expand toggle
  onItemClick={(id) => {}}          // called when a nav item is clicked
/>
```

### NavItem shape

```ts
interface NavItem {
  id: string;           // unique identifier, used for activeId matching
  label: string;        // display label (shown when expanded, tooltip when collapsed)
  iconActive: ReactNode;  // filled icon — shown when this item is active
  iconDefault: ReactNode; // outline icon — shown in default and hover states
}
```

---

## Design system page

The design system page uses `MEMBER_PORTAL_NAV_ITEMS` — it shares the Member Portal shell. Do not give it a separate nav or a different set.

---

## Do not

- ❌ Add nav items unless the product spec says so
- ❌ Use the same icon for both Active and Default states — they are visually different (filled vs outline)
- ❌ Put a logout button in the SideNav — logout belongs in the ProfileDropdown in GlobalHeader
- ❌ Hardcode hex colors — use `var(--color-primary-1)`, `var(--color-primary-2)`, etc.
- ❌ Render SideNav on unsecured (pre-login) screens
- ❌ Use Admin Portal nav items on a Member Portal screen or vice versa
```

## guidelines/styles.md
```md
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

```

## guidelines/tokens.md
```md
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
```

## package.json
```json
{
  "name": "@make-kits/javelina-design-system",
  "version": "0.0.3",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emotion/react": "11.14.0",
    "@emotion/styled": "11.14.1",
    "class-variance-authority": "0.7.1",
    "clsx": "2.1.1",
    "cmdk": "1.1.1",
    "date-fns": "3.6.0",
    "embla-carousel-react": "8.6.0",
    "input-otp": "1.4.2",
    "lucide-react": "0.487.0",
    "motion": "12.23.24",
    "next-themes": "0.4.6",
    "react-day-picker": "8.10.1",
    "react-dnd": "16.0.1",
    "react-dnd-html5-backend": "16.0.1",
    "react-hook-form": "7.55.0",
    "react-popper": "2.3.0",
    "react-resizable-panels": "2.1.7",
    "react-responsive-masonry": "2.7.1",
    "react-router": "7.13.0",
    "react-slick": "0.31.0",
    "recharts": "2.15.2",
    "sonner": "2.0.3",
    "tailwind-merge": "3.2.0",
    "tw-animate-css": "1.3.8",
    "vaul": "1.1.2"
  },
  "devDependencies": {
    "@tailwindcss/vite": "4.1.12",
    "@vitejs/plugin-react": "4.7.0",
    "tailwindcss": "4.1.12",
    "vite": "6.3.5"
  },
  "peerDependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "peerDependenciesMeta": {
    "react": {
      "optional": true
    },
    "react-dom": {
      "optional": true
    }
  },
  "pnpm": {
    "overrides": {
      "vite": "6.3.5"
    }
  },
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./style.css": "./dist/style.css",
    "./dist/*": {
      "types": "./dist/*",
      "import": "./dist/*"
    },
    "./guidelines/*": "./guidelines/*"
  },
  "figma": {
    "makeKit": {
      "kitType": "byoc+byods",
      "formatVersion": 1
    }
  },
  "files": [
    "dist",
    "**/*.md",
    ".figma/make/kit.json"
  ]
}
```

## postcss.config.mjs
```mjs
/**
 * PostCSS Configuration
 *
 * Tailwind CSS v4 (via @tailwindcss/vite) automatically sets up all required
 * PostCSS plugins — you do NOT need to include `tailwindcss` or `autoprefixer` here.
 *
 * This file only exists for adding additional PostCSS plugins, if needed.
 * For example:
 *
 * import postcssNested from 'postcss-nested'
 * export default { plugins: [postcssNested()] }
 *
 * Otherwise, you can leave this file empty.
 */
export default {}

```

## src/app/App.tsx
```tsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router';
import { Palette, Type, Ruler, MousePointer, TextCursor, CheckSquare, Bell, Tag, Monitor, PanelLeft, AlignLeft } from 'lucide-react';
import { DesignSystemPage } from './components/DesignSystemPage';
import { GlobalHeader } from './components/GlobalHeader';
import { SideNav, MEMBER_PORTAL_NAV_ITEMS, ADMIN_PORTAL_NAV_ITEMS } from './components/SideNav';
import type { NavItem } from './components/SideNav';
import { Footer } from './components/Footer';
import keenanLogo from '../imports/GlobalHeader/268260c7c4b29dd81e298ecb1511858d1fbd3c50.png';

// ─── Logo ─────────────────────────────────────────────────────────────────────

function KeenanLogo() {
  return (
    <div style={{ height: 64, width: 240, overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: '9.38% 24.58% 9.38% -1.67%' }}>
        <img
          alt="Keenan Logo"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          src={keenanLogo}
        />
      </div>
    </div>
  );
}

// ─── Design system nav items ──────────────────────────────────────────────────
// Uses Lucide icons (outline = default, same icon slightly bolder = active).
// These are internal to the design system page only — not a product portal nav.

function DSIcon({ icon: Icon, active }: { icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>; active?: boolean }) {
  return (
    <div style={{ width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon size={22} color="white" strokeWidth={active ? 2.5 : 1.5} />
    </div>
  );
}

function makeDSItem(id: string, label: string, Icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>): NavItem {
  return {
    id,
    label,
    iconActive: <DSIcon icon={Icon} active />,
    iconDefault: <DSIcon icon={Icon} />,
  };
}

const DS_NAV_ITEMS: NavItem[] = [
  makeDSItem('colors', 'Colors', Palette),
  makeDSItem('typography', 'Typography', Type),
  makeDSItem('spacing', 'Spacing', Ruler),
  makeDSItem('buttons', 'Buttons', MousePointer),
  makeDSItem('inputs', 'Inputs', TextCursor),
  makeDSItem('selection', 'Selection', CheckSquare),
  makeDSItem('alerts', 'Alerts', Bell),
  makeDSItem('badges', 'Badges', Tag),
  makeDSItem('header', 'Header', Monitor),
  makeDSItem('sidenav', 'Side Nav', PanelLeft),
  makeDSItem('footer', 'Footer', AlignLeft),
];

// ─── Shared AppShell ──────────────────────────────────────────────────────────
// All secured screens share this shell. The secured body wrapper (1216px,
// margin-left: 112px) and secured footer wrapper are applied here consistently.

interface AppShellProps {
  navItems: NavItem[];
  activeNav: string;
  onNavClick: (id: string) => void;
  companyName: string;
  portalName: string;
  children: React.ReactNode;
}

function AppShell({ navItems, activeNav, onNavClick, companyName, portalName, children }: AppShellProps) {
  // Secured layout: body content wrapper is 1216px left-pinned at 112px.
  // This matches the GlobalHeader and Footer wrapper contract.
  const contentWrapperStyle: React.CSSProperties = {
    width: 1216,
    marginLeft: 112,
  };

  return (
    <div data-theme="keenan" style={{
      fontFamily: 'var(--font-family-base)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: 'var(--color-primary-background)',
    }}>
      {/* MARKER-MAKE-KIT-INVOKED */}
      <GlobalHeader
        secured
        companyName={companyName}
        portalName={portalName}
        userName="Dr. Stevenson, Jennifer"
        userRole="Providers"
        userInitials="SJ"
        avatarBg="var(--color-primary-2)"
        logo={<KeenanLogo />}
      />

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <SideNav
          items={navItems}
          activeId={activeNav}
          onItemClick={onNavClick}
        />

        {/* Main — full width, inner wrapper handles the 112px offset */}
        <main style={{
          flex: 1,
          overflow: 'auto',
          paddingTop: 'var(--space-8)',
          paddingBottom: 'var(--space-8)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ ...contentWrapperStyle, display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {children}
          </div>
        </main>
      </div>

      {/* Footer — secured wrapper: 1216px left-pinned at 112px */}
      <Footer
        secured
        companyName="A1M Health"
        contact={{
          phone: '1 (800) CALL-NOW | 1 (800) 121-2412',
          email: 'support@eldocomp.com',
          address: '9025 Smoky Hollow Street, Niagara Falls, NY 14304',
        }}
        showSocial
        poweredBy="Mphasis"
      />
    </div>
  );
}

// ─── Member Portal ────────────────────────────────────────────────────────────

function MemberPortalPage() {
  const [activeNav, setActiveNav] = useState('home');

  return (
    <AppShell
      navItems={MEMBER_PORTAL_NAV_ITEMS}
      activeNav={activeNav}
      onNavClick={setActiveNav}
      companyName="A1M Health Insurance TPA"
      portalName="Member Portal"
    >
      <div>
        <h1 style={{
          fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-h3)',
          fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary-text)', margin: 0,
        }}>
          {MEMBER_PORTAL_NAV_ITEMS.find(i => i.id === activeNav)?.label ?? 'Home'}
        </h1>
        <p style={{
          fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para)',
          color: 'var(--color-secondary-text)', margin: 'var(--space-1) 0 0',
        }}>
          Select a navigation item to preview the active state
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
        {['Overview', 'Recent Activity', 'Quick Actions', 'Notifications'].map(card => (
          <div key={card} style={{
            background: 'var(--color-secondary-background)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-primary-grey)',
            padding: 'var(--space-6)',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-h5)',
              fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary-text)',
              margin: '0 0 var(--space-3) 0',
            }}>
              {card}
            </h3>
            <div style={{ height: 80, background: 'var(--color-tertiary-background)', borderRadius: 'var(--radius-sm)' }} />
          </div>
        ))}
      </div>

      <div style={{
        background: 'var(--color-secondary-background)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-primary-grey)',
        padding: 'var(--space-6)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-h5)',
            fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary-text)', margin: 0,
          }}>
            Jevelina Design System
          </h3>
          <p style={{
            fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para)',
            color: 'var(--color-secondary-text)', margin: 'var(--space-1) 0 0',
          }}>
            View all tokens, typography, components and patterns
          </p>
        </div>
        <Link
          to="/designsystem"
          style={{
            fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para)',
            fontWeight: 'var(--font-weight-bold)', color: 'var(--color-secondary-2)',
            textDecoration: 'none',
          }}
        >
          Open Design System →
        </Link>
      </div>
    </AppShell>
  );
}

// ─── Design System page ───────────────────────────────────────────────────────
// Uses its own DS_NAV_ITEMS (section anchors) for the sidenav.
// The shell (header, nav, footer, body wrapper) is all provided by AppShell —
// DesignSystemPage renders content only.

function DesignSystemShell() {
  const [activeSection, setActiveSection] = useState('colors');

  function handleNavClick(id: string) {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <AppShell
      navItems={DS_NAV_ITEMS}
      activeNav={activeSection}
      onNavClick={handleNavClick}
      companyName="Jevelina Design System"
      portalName="Component Library v2.0"
    >
      <DesignSystemPage />
    </AppShell>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      {/* MARKER-MAKE-KIT-DISCOVERY-READ */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MemberPortalPage />} />
          <Route path="/designsystem" element={<DesignSystemShell />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
```

## src/app/components/Alert.tsx
```tsx
import { X } from 'lucide-react';
import alertSvg from '../../imports/AlertsToasts/svg-p1t2lt1k6m';

// ─── Types ────────────────────────────────────────────────────────────────────

export type AlertIndication = 'success' | 'error' | 'warning' | 'info';
export type AlertType = 'floating' | 'in-page';

export interface AlertProps {
  indication?: AlertIndication;
  type?: AlertType;
  multiline?: boolean;
  title?: string;
  message?: string;
  onDismiss?: () => void;
  className?: string;
}

// ─── Color map (design tokens) ────────────────────────────────────────────────

const COLORS: Record<AlertIndication, { bg: string; border: string; text: string }> = {
  success: { bg: 'var(--color-success-background)', border: 'var(--color-success-primary)', text: 'var(--color-success-primary)' },
  error:   { bg: 'var(--color-error-background)',   border: 'var(--color-error-primary)',   text: 'var(--color-error-primary)'   },
  warning: { bg: 'var(--color-warning-background)', border: 'var(--color-warning-primary)', text: 'var(--color-warning-primary)' },
  info:    { bg: 'var(--color-info-background)',    border: 'var(--color-info-primary)',    text: 'var(--color-info-primary)'    },
};

// ─── Status icon ──────────────────────────────────────────────────────────────

function StatusIcon({ indication }: { indication: AlertIndication }) {
  if (indication === 'warning') {
    return (
      <div className="flex items-center justify-center shrink-0 size-[20px] px-[4px] py-[3px]">
        <div className="relative h-[14px] w-[16px]">
          <svg className="absolute block size-full" fill="none" viewBox="0 0 16 14">
            <path d={alertSvg.p1180e700} fill="var(--color-warning-primary)" />
          </svg>
        </div>
      </div>
    );
  }
  if (indication === 'error') {
    return (
      <div className="flex items-center justify-center shrink-0 size-[20px] px-[4px] py-[3px]">
        <div className="relative size-[16px]">
          <svg className="absolute block size-full" fill="none" viewBox="0 0 16 16">
            <path d={alertSvg.pa4eed00} fill="var(--color-error-primary)" />
          </svg>
        </div>
      </div>
    );
  }
  if (indication === 'success') {
    return (
      <div className="flex items-center justify-center shrink-0 size-[20px] px-[4px] py-[3px]">
        <div className="relative size-[16px]">
          <svg className="absolute block size-full" fill="none" viewBox="0 0 16 16">
            <path d={alertSvg.p19807400} fill="var(--color-success-primary)" />
          </svg>
        </div>
      </div>
    );
  }
  // Info (rotated 180°)
  return (
    <div className="flex items-center justify-center shrink-0 size-[20px] px-[4px] py-[3px]">
      <div className="rotate-180 size-[16px] relative">
        <svg className="absolute block size-full" fill="none" viewBox="0 0 16 16">
          <path d={alertSvg.p147c2c00} fill="var(--color-info-primary)" />
        </svg>
      </div>
    </div>
  );
}

// ─── Alert ────────────────────────────────────────────────────────────────────

export function Alert({
  indication = 'success',
  type = 'floating',
  multiline = false,
  title = 'A Request Completed Successfully.',
  message = 'Registration Setup has been changed successfully',
  onDismiss,
  className = '',
}: AlertProps) {
  const colors  = COLORS[indication];
  const isFloat = type === 'floating';

  return (
    <div
      className={`relative flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] ${isFloat ? 'drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)]' : ''} ${className}`}
      style={{ background: colors.bg }}
      role="alert"
    >
      {/* Border overlay */}
      <div aria-hidden className="absolute inset-0 border border-solid pointer-events-none" style={{ borderColor: colors.border }} />

      {/* Icon */}
      <StatusIcon indication={indication} />

      {/* Content */}
      {multiline ? (
        <div className="flex flex-col gap-[4px] flex-1 min-w-0 self-stretch" style={{ color: colors.text }}>
          <p style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-para)',
            fontWeight: 'var(--font-weight-semibold)',
          }}>
            {title}
          </p>
          <p style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-para)',
            fontWeight: 'var(--font-weight-regular)',
          }}>
            {message}
          </p>
        </div>
      ) : (
        <p className="self-stretch shrink-0 flex-1" style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-para)',
          fontWeight: 'var(--font-weight-regular)',
          color: colors.text,
        }}>
          {message}
        </p>
      )}

      {/* Dismiss button (floating only) */}
      {isFloat && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="absolute right-[14px] top-[8px] flex items-center justify-center size-[20px] bg-transparent border-none cursor-pointer"
          style={{ color: 'var(--color-secondary-grey)' }}
        >
          <X size={12} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}

export default Alert;

```

## src/app/components/Badge.tsx
```tsx
import badgeSvg from '../../imports/Badge/svg-mu4a9k8nju';

// ─── Types ────────────────────────────────────────────────────────────────────

export type BadgeEmphasis   = 'bold' | 'subtle' | 'minimal';
export type BadgeIndication = 'success' | 'info' | 'warning' | 'error';

export interface BadgeProps {
  emphasis?:   BadgeEmphasis;
  indication?: BadgeIndication;
  withIcon?:   boolean;
  label?:      string;
  className?:  string;
}

// ─── Color + shape map (design tokens) ───────────────────────────────────────

const COLORS: Record<BadgeIndication, { bg: string; border: string; text: string }> = {
  success: { bg: 'var(--color-success-background)', border: 'var(--color-success-primary)', text: 'var(--color-success-primary)' },
  info:    { bg: 'var(--color-info-background)',    border: 'var(--color-info-primary)',    text: 'var(--color-info-primary)'    },
  warning: { bg: 'var(--color-warning-background)', border: 'var(--color-warning-primary)', text: 'var(--color-warning-primary)' },
  error:   { bg: 'var(--color-error-background)',   border: 'var(--color-error-primary)',   text: 'var(--color-error-primary)'   },
};

const DEFAULT_LABELS: Record<BadgeIndication, string> = {
  success: 'Green Indication',
  info:    'Blue Indication',
  warning: 'Orange Indication',
  error:   'Red Indication',
};

// ─── Status icon ──────────────────────────────────────────────────────────────

function BadgeIcon({ indication }: { indication: BadgeIndication }) {
  const color = COLORS[indication].text;

  if (indication === 'warning') {
    return (
      <div className="flex items-center justify-center size-[16px] px-[4px] py-[3px] shrink-0">
        <div className="relative h-[14px] w-[16px]">
          <svg className="absolute block size-full" fill="none" viewBox="0 0 16 14">
            <path d={badgeSvg.p1180e700} fill={color} />
          </svg>
        </div>
      </div>
    );
  }
  if (indication === 'error') {
    return (
      <div className="flex items-center justify-center size-[16px] px-[4px] py-[3px] shrink-0">
        <div className="relative size-[16px]">
          <svg className="absolute block size-full" fill="none" viewBox="0 0 16 16">
            <path d={badgeSvg.p2ce08100} fill={color} />
          </svg>
        </div>
      </div>
    );
  }
  if (indication === 'success') {
    return (
      <div className="flex items-center justify-center size-[16px] px-[4px] py-[3px] shrink-0">
        <div className="relative size-[16px]">
          <svg className="absolute block size-full" fill="none" viewBox="0 0 16 16">
            <path d={badgeSvg.p19807400} fill={color} />
          </svg>
        </div>
      </div>
    );
  }
  // Info (rotated)
  return (
    <div className="flex items-center justify-center size-[16px] px-[4px] py-[3px] shrink-0">
      <div className="rotate-180 size-[16px] relative">
        <svg className="absolute block size-full" fill="none" viewBox="0 0 16 16">
          <path d={badgeSvg.p147c2c00} fill={color} />
        </svg>
      </div>
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────

export function Badge({
  emphasis   = 'bold',
  indication = 'success',
  withIcon   = false,
  label,
  className  = '',
}: BadgeProps) {
  const colors     = COLORS[indication];
  const displayLabel = label ?? DEFAULT_LABELS[indication];

  // Layout by emphasis
  const isBold    = emphasis === 'bold';
  const isSubtle  = emphasis === 'subtle';
  const isMinimal = emphasis === 'minimal';

  const padding = isBold
    ? (withIcon ? 'px-[12px] pb-[5px] pt-[4px]' : 'px-[12px] pb-[5px] pt-[4px]')
    : isSubtle
      ? (withIcon ? 'px-[8px] py-[4px]' : 'px-[12px] py-[4px]')
      : (withIcon ? 'px-[6px] py-[2px]' : 'px-[6px] py-[2px]');

  const radius  = isBold ? 'rounded-[20px]' : 'rounded-[12px]';
  const gap     = withIcon ? (isBold ? 'gap-[8px]' : 'gap-[4px]') : '';

  // Text style
  const textStyle: React.CSSProperties = isBold ? {
    fontFamily:  'var(--font-family-base)',
    fontSize:    'var(--font-size-para)',
    fontWeight:  'var(--font-weight-regular)',
    color:       'var(--color-primary-text)',
    whiteSpace:  'nowrap',
  } : {
    fontFamily:  'var(--font-family-base)',
    fontSize:    'var(--font-size-para-sm)',
    fontWeight:  'var(--font-weight-semibold)',
    color:       colors.text,
    textTransform: 'uppercase' as const,
    whiteSpace:  'nowrap',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center ${padding} ${radius} ${gap} ${className}`}
      style={{ background: isMinimal ? 'transparent' : colors.bg }}
    >
      {/* Border */}
      {(isBold || isMinimal) && (
        <div
          aria-hidden
          className={`absolute inset-0 border border-solid pointer-events-none ${radius}`}
          style={{ borderColor: isMinimal ? '#E7E7E7' : colors.border }}
        />
      )}

      {/* Icon */}
      {withIcon && <BadgeIcon indication={indication} />}

      {/* Label */}
      <span style={textStyle}>{displayLabel}</span>
    </div>
  );
}

export default Badge;

```

## src/app/components/Button.tsx
```tsx
import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonType = 'primary' | 'secondary' | 'link';
export type ButtonSize = 'large' | 'small';
export type ButtonIcon = 'none' | 'with-icon' | 'only-icon' | 'split';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis level */
  variant?: ButtonType;
  /** Large (43px) or Small (32px) */
  size?: ButtonSize;
  /** Icon configuration */
  icon?: ButtonIcon;
  /** Icon element — required when icon is 'with-icon', 'only-icon', or 'split' */
  iconElement?: React.ReactNode;
  /** Secondary action element for Split variant (chevron or icon) */
  splitAction?: React.ReactNode;
  /** Accessible label — required when icon is 'only-icon' */
  'aria-label'?: string;
  /** Disabled state */
  disabled?: boolean;
  children?: React.ReactNode;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const base = `
  inline-flex items-center justify-center
  font-['Open_Sans'] uppercase tracking-normal
  rounded-[4px] cursor-pointer
  transition-opacity duration-150
  disabled:cursor-not-allowed
`.trim().replace(/\s+/g, ' ');

// Focus ring: 4px semi-transparent ring flush with button edge (outline-offset-0),
// matching Figma's inset[-4px] border-4 overlay at 40% opacity.
const focusPrimary = `focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-0 focus-visible:[outline-color:color-mix(in_srgb,var(--color-secondary-1)_40%,transparent)]`;
const focusLink    = `focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-0 focus-visible:[outline-color:color-mix(in_srgb,var(--color-secondary-2)_40%,transparent)]`;

const variants: Record<ButtonType, string> = {
  primary: `
    bg-[var(--color-secondary-1)]
    text-[var(--color-secondary-background)]
    border-0
    hover:opacity-80
    disabled:bg-[#565962] disabled:opacity-100
    ${focusPrimary}
  `.trim().replace(/\s+/g, ' '),

  secondary: `
    bg-transparent
    text-[var(--color-secondary-1)]
    border border-[var(--color-secondary-1)]
    hover:opacity-80
    disabled:border-[var(--color-secondary-grey)]
    disabled:text-[#565962]
    ${focusPrimary}
  `.trim().replace(/\s+/g, ' '),

  link: `
    bg-transparent
    text-[var(--color-secondary-2)]
    border-0
    font-semibold
    !normal-case
    hover:underline
    disabled:text-[#565962]
    disabled:no-underline
    ${focusLink}
  `.trim().replace(/\s+/g, ' '),
};

const sizes: Record<ButtonSize, Record<ButtonIcon, string>> = {
  large: {
    'none':      'px-[40px] py-[12px] text-[14px] font-bold',
    'with-icon': 'px-[30px] py-[12px] text-[14px] font-bold gap-[8px]',
    'only-icon': 'p-[12px] text-[14px] font-bold',
    'split':     'text-[14px] font-bold',
  },
  small: {
    'none':      'px-[20px] py-[8px] text-[12px] font-semibold',
    'with-icon': 'px-[16px] py-[8px] text-[12px] font-semibold gap-[8px]',
    'only-icon': 'p-[8px] text-[12px] font-semibold',
    'split':     'text-[12px] font-semibold',
  },
};

// ─── Split Button ─────────────────────────────────────────────────────────────

interface SplitButtonProps {
  variant: 'primary' | 'secondary';
  size: ButtonSize;
  children: React.ReactNode;
  splitAction?: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function SplitButton({ variant, size, children, splitAction, disabled, onClick }: SplitButtonProps) {
  const isLarge = size === 'large';
  const height = isLarge ? 'h-[43px]' : 'h-[32px]';
  const textSize = isLarge ? 'text-[14px]' : 'text-[12px]';
  const labelPad = isLarge ? 'px-[24px]' : 'px-[16px]';
  const iconPad  = isLarge ? 'px-[12px]' : 'px-[8px]';

  const isPrimary = variant === 'primary';
  const fillClass = isPrimary
    ? 'bg-[var(--color-secondary-1)] text-[var(--color-secondary-background)] disabled:bg-[#565962]'
    : 'bg-transparent text-[var(--color-secondary-1)] border border-[var(--color-secondary-1)] disabled:border-[var(--color-secondary-grey)] disabled:text-[#565962]';

  const splitFocus = `focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-0 focus-visible:[outline-color:color-mix(in_srgb,var(--color-secondary-1)_40%,transparent)]`;

  return (
    <div
      className={`inline-flex items-stretch rounded-[5px] overflow-hidden gap-[1px] ${disabled ? 'opacity-60 pointer-events-none' : ''}`}
      role="group"
    >
      {/* Primary action */}
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          inline-flex items-center justify-center font-['Open_Sans'] uppercase
          font-bold ${textSize} ${height} ${labelPad} ${fillClass}
          ${splitFocus}
          cursor-pointer disabled:cursor-not-allowed transition-opacity hover:opacity-80
        `.trim().replace(/\s+/g, ' ')}
      >
        {children}
      </button>

      {/* Split action */}
      <button
        disabled={disabled}
        aria-label="More options"
        className={`
          inline-flex items-center justify-center font-['Open_Sans']
          ${height} ${iconPad} ${fillClass}
          ${splitFocus}
          cursor-pointer disabled:cursor-not-allowed transition-opacity hover:opacity-80
        `.trim().replace(/\s+/g, ' ')}
      >
        {splitAction ?? (
          // Default chevron icon
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </div>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────

export function Button({
  variant = 'primary',
  size = 'large',
  icon = 'none',
  iconElement,
  splitAction,
  disabled = false,
  children,
  className = '',
  ...rest
}: ButtonProps) {

  // Split is a structural variant — render separately
  if (icon === 'split') {
    if (variant === 'link') {
      console.warn('Button: Split variant is not available for Link type. Falling back to Primary.');
    }
    return (
      <SplitButton
        variant={variant === 'link' ? 'primary' : variant}
        size={size}
        splitAction={splitAction}
        disabled={disabled}
        onClick={rest.onClick}
      >
        {children}
      </SplitButton>
    );
  }

  const classes = [
    base,
    variants[variant],
    sizes[size][icon],
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      disabled={disabled}
      className={classes}
      {...rest}
    >
      {icon === 'with-icon' && iconElement && (
        <span className="shrink-0 w-4 h-4" aria-hidden="true">{iconElement}</span>
      )}

      {icon === 'only-icon' ? (
        <span className="shrink-0 w-4 h-4" aria-hidden="true">{iconElement}</span>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
}

export default Button;

```

## src/app/components/Checkbox.tsx
```tsx
import { useState } from 'react';
import checkboxSvg from '../../imports/Checkbox/svg-ya5yqn2omj';

// ─── Types ────────────────────────────────────────────────────────────────────

export type CheckboxState  = 'default' | 'hovered' | 'focused' | 'disabled' | 'error';
export type CheckboxStatus = 'unchecked' | 'checked' | 'indeterminate';

export interface CheckboxProps {
  label?: string;
  status?: CheckboxStatus;
  defaultStatus?: CheckboxStatus;
  state?: CheckboxState;
  onChange?: (next: CheckboxStatus) => void;
  className?: string;
}

// ─── Visual box ───────────────────────────────────────────────────────────────

function CheckboxBox({ state, status }: { state: CheckboxState; status: CheckboxStatus }) {
  const isChecked   = status === 'checked';
  const isIndet     = status === 'indeterminate';
  const isDisabled  = state === 'disabled';
  const isError     = state === 'error';
  const isActive    = state === 'hovered' || state === 'focused';

  // Disabled checked
  if (isDisabled && isChecked) {
    return (
      <div className="relative shrink-0 size-[20px]" style={{ background: '#999999' }}>
        <div className="absolute" style={{ bottom: '30%', left: 4, top: '30%', width: 12 }}>
          <svg className="absolute block size-full" fill="none" viewBox="0 0 12 8">
            <path d={checkboxSvg.p11aab0c0} fill="white" />
          </svg>
        </div>
      </div>
    );
  }

  // Disabled indeterminate
  if (isDisabled && isIndet) {
    return (
      <div className="relative shrink-0 size-[20px]" style={{ background: '#999999' }}>
        <div className="absolute bg-white" style={{ height: 2, width: 10, top: 9, left: 5 }} />
      </div>
    );
  }

  // Disabled unchecked
  if (isDisabled) {
    return (
      <div className="relative shrink-0 size-[20px] bg-[#E7E7E7]">
        <div aria-hidden className="absolute inset-0 border border-solid pointer-events-none border-[#999999]" />
      </div>
    );
  }

  // Checked (enabled)
  if (isChecked) {
    return (
      <div className="relative shrink-0 size-[20px]">
        <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 20 20">
          <rect
            fill={isError ? 'var(--color-error-primary)' : 'var(--color-secondary-2)'}
            fillOpacity={isActive ? 0.8 : 1}
            height="20" width="20"
          />
          <path d={checkboxSvg.p236b3ac0} fill="white" />
        </svg>
      </div>
    );
  }

  // Indeterminate (enabled)
  if (isIndet) {
    return (
      <div className="relative shrink-0 size-[20px]" style={{
        background: isError ? 'var(--color-error-primary)' : `var(--color-secondary-2)`,
        opacity: isActive ? 0.8 : 1,
      }}>
        <div className="absolute bg-white" style={{ height: 2, width: 10, top: 9, left: 5 }} />
      </div>
    );
  }

  // Unchecked
  const borderColor = isError   ? 'var(--color-error-primary)'
    : isActive  ? 'var(--color-secondary-2)'
    : '#565962';

  return (
    <div className="relative shrink-0 size-[20px] bg-white">
      <div aria-hidden className="absolute inset-0 border border-solid pointer-events-none" style={{ borderColor }} />
    </div>
  );
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

export function Checkbox({
  label,
  status: controlledStatus,
  defaultStatus = 'unchecked',
  state: forcedState,
  onChange,
  className = '',
}: CheckboxProps) {
  const [internalStatus, setInternalStatus] = useState<CheckboxStatus>(defaultStatus);
  const [hover, setHover]     = useState(false);
  const [focused, setFocused] = useState(false);

  const status = controlledStatus ?? internalStatus;

  const effectiveState: CheckboxState = forcedState ?? (
    status === 'unchecked' || status === 'checked' || status === 'indeterminate'
      ? (focused ? 'focused' : hover ? 'hovered' : 'default')
      : 'default'
  );

  const isDisabled = effectiveState === 'disabled';

  function handleClick() {
    if (isDisabled) return;
    const next: CheckboxStatus = status === 'unchecked' ? 'checked'
      : status === 'checked' ? 'unchecked'
      : 'unchecked';
    setInternalStatus(next);
    onChange?.(next);
  }

  return (
    <div
      className={`relative inline-flex gap-[8px] items-start cursor-pointer select-none ${isDisabled ? 'cursor-not-allowed' : ''} ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      tabIndex={isDisabled ? -1 : 0}
      role="checkbox"
      aria-checked={status === 'indeterminate' ? 'mixed' : status === 'checked'}
      aria-disabled={isDisabled}
      onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handleClick(); } }}
    >
      <CheckboxBox state={effectiveState} status={status} />

      {/* Focus ring */}
      {effectiveState === 'focused' && (
        <div className="absolute size-[24px]" style={{ left: -2, top: -2, pointerEvents: 'none' }}>
          <div aria-hidden className="absolute inset-0 border border-solid pointer-events-none border-[rgba(10,117,147,0.4)]" />
        </div>
      )}

      {label && (
        <span style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-para)',
          fontWeight: 'var(--font-weight-regular)',
          color: isDisabled ? '#565962' : 'var(--color-primary-text)',
          lineHeight: 'normal',
        }}>
          {label}
        </span>
      )}
    </div>
  );
}

export default Checkbox;

```

## src/app/components/DesignSystemPage.tsx
```tsx
import { useState } from 'react';
import { Palette, Type, Ruler, MousePointer, TextCursor, CheckSquare, Bell, Tag, Monitor, PanelLeft, AlignLeft } from 'lucide-react';
import { Button } from './Button';
import { ColorSection } from './designsystem/ColorSection';
import { TypographySection } from './designsystem/TypographySection';
import { SpacingSection } from './designsystem/SpacingSection';
import { ButtonSection } from './designsystem/ButtonSection';
import { InputSection } from './designsystem/InputSection';
import { CheckboxSection } from './designsystem/CheckboxSection';
import { RadioSection } from './designsystem/RadioSection';
import { AlertSection } from './designsystem/AlertSection';
import { BadgeSection } from './designsystem/BadgeSection';
import { HeaderSection } from './designsystem/HeaderSection';
import { SideNavSection } from './designsystem/SideNavSection';
import { FooterSection } from './designsystem/FooterSection';

// ─── Types ────────────────────────────────────────────────────────────────────

type Theme = 'aptia' | 'keenan' | 'bywater' | 'hub';

const themes: { id: Theme; label: string }[] = [
  { id: 'aptia', label: 'Aptia' },
  { id: 'keenan', label: 'Keenan' },
  { id: 'bywater', label: 'Bywater' },
  { id: 'hub', label: 'Hub International' },
];

// ─── Section scroll IDs ───────────────────────────────────────────────────────
// These are the anchor IDs used by the design system nav in App.tsx.
// They must match the `id` props on each section div below.

export const DS_SECTION_IDS = [
  'colors', 'typography', 'spacing', 'buttons', 'inputs',
  'selection', 'alerts', 'badges', 'header', 'sidenav', 'footer',
] as const;

// ─── DesignSystemPage ─────────────────────────────────────────────────────────
// Content-only component. No header, no nav, no footer — those are provided
// by AppShell in App.tsx. This component renders only the page content that
// lives inside the secured body wrapper.

export function DesignSystemPage() {
  const [activeTheme, setActiveTheme] = useState<Theme>('aptia');

  return (
    <div data-theme={activeTheme}>

      {/* Page intro */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-h3)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-primary-text)',
          margin: 0,
        }}>
          Jevelina Design System
        </h1>
        <p style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-para)',
          fontWeight: 'var(--font-weight-regular)',
          color: 'var(--color-secondary-text)',
          margin: 'var(--space-1) 0 0',
        }}>
          Multi-brand white-label component library — tokens, typography, spacing, and components.
        </p>
      </div>

      {/* Theme switcher */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        padding: 'var(--space-3) var(--space-4)',
        background: 'var(--color-secondary-background)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-primary-grey)',
        marginBottom: 'var(--space-12)',
      }}>
        <span style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-para-sm)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-secondary-text)',
          paddingRight: 'var(--space-2)',
        }}>
          Brand
        </span>
        {themes.map(t => (
          <Button
            key={t.id}
            variant={activeTheme === t.id ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setActiveTheme(t.id)}
          >
            {t.label}
          </Button>
        ))}
      </div>

      {/* Sections — each with a scroll anchor id */}
      <div id="colors">    <ColorSection activeTheme={activeTheme} /></div>
      <div id="typography"><TypographySection /></div>
      <div id="spacing">   <SpacingSection /></div>
      <div id="buttons">   <ButtonSection /></div>
      <div id="inputs">    <InputSection /></div>
      <div id="selection" style={{ scrollMarginTop: 16 }}>
        <CheckboxSection />
        <RadioSection />
      </div>
      <div id="alerts">    <AlertSection /></div>
      <div id="badges">    <BadgeSection /></div>
      <div id="header">    <HeaderSection /></div>
      <div id="sidenav">   <SideNavSection /></div>
      <div id="footer">    <FooterSection /></div>
    </div>
  );
}
```

## src/app/components/Footer.tsx
```tsx
import svgPaths from '../../imports/MobileFooter/svg-8vrbzbfzhc';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FooterLink {
  label: string;
  href?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterContactInfo {
  phone?: string;
  email?: string;
  address?: string;
}

export interface FooterProps {
  secured?: boolean;
  companyName?: string;
  copyrightText?: string;
  contact?: FooterContactInfo;
  columns?: FooterColumn[];
  showSocial?: boolean;
  showAppBadges?: boolean;
  poweredBy?: string;
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: 'Block 1',
    links: [
      { label: 'Privacy Policy' },
      { label: 'Terms of Use' },
      { label: 'Legal' },
      { label: 'Contact Us' },
    ],
  },
  {
    title: 'Block 2',
    links: [
      { label: 'Privacy Policy' },
      { label: 'Terms of Use' },
      { label: 'Legal' },
      { label: 'Contact Us' },
    ],
  },
  {
    title: 'Block 3',
    links: [
      { label: 'Privacy Policy' },
      { label: 'Terms of Use' },
      { label: 'Legal' },
      { label: 'Contact Us' },
    ],
  },
];

const DEFAULT_CONTACT: FooterContactInfo = {
  phone: '1 (800) CALL-NOW | 1 (800) 121-2412',
  email: 'support@eldocomp.com',
  address: '9025 Smoky Hollow Street, Niagara Falls, NY 14304',
};

// ─── Social icons (SVG from Figma import) ─────────────────────────────────────

function SocialIcons() {
  const iconStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', color: 'var(--color-primary-text)',
  };

  return (
    <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
      <div style={iconStyle}>
        <svg width="20" height="15.2" fill="none" viewBox="0 0 20 15.2">
          <path clipRule="evenodd" d={svgPaths.p3d60a00} fill="var(--color-primary-text)" fillRule="evenodd" />
        </svg>
      </div>
      <div style={iconStyle}>
        <svg width="14" height="12.688" fill="none" viewBox="0 0 14 12.688">
          <path d={svgPaths.p1d6b7300} fill="var(--color-primary-text)" />
        </svg>
      </div>
      <div style={iconStyle}>
        <svg width="20" height="14" fill="none" viewBox="0 0 20 14">
          <path clipRule="evenodd" d={svgPaths.p326bd400} fill="var(--color-primary-text)" fillRule="evenodd" />
        </svg>
      </div>
      <div style={iconStyle}>
        <svg width="20" height="16" fill="none" viewBox="0 0 20 16">
          <path clipRule="evenodd" d={svgPaths.p8b5ce00} fill="var(--color-primary-text)" fillRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}

// ─── Text styles ──────────────────────────────────────────────────────────────

const headingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-para-lg)',
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-primary-text)',
  marginBottom: 'var(--space-3)',
};

const bodyStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-para)',
  fontWeight: 'var(--font-weight-regular)',
  color: 'var(--color-primary-text)',
  lineHeight: 1.6,
};

const linkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-para)',
  fontWeight: 'var(--font-weight-regular)',
  color: 'var(--color-secondary-2)',
  display: 'block',
  padding: '4px 0',
  textDecoration: 'none',
  cursor: 'pointer',
  lineHeight: 2,
};

// ─── Footer ───────────────────────────────────────────────────────────────────
//
// Layout contract (mirrors the GlobalHeader wrapper principle):
//
// UNSECURED footer
//   Inner content wrapper is 1216px wide, horizontally centered (margin: 0 auto).
//   Matches the 12-column grid. Used on pre-login screens with no left nav.
//
// SECURED footer
//   Inner content wrapper is 1216px wide, left-pinned at margin-left: 112px.
//   Clears the left navigation bar. Used on all post-login screens.

export function Footer({
  secured = false,
  companyName = 'A1M Health',
  copyrightText = 'Copyright © 2022 A1M Health  •  CA Insurance License Number 0451271',
  contact = DEFAULT_CONTACT,
  columns = DEFAULT_COLUMNS,
  showSocial = true,
  showAppBadges = false,
  poweredBy,
}: FooterProps) {

  // Wrapper styles implement the layout contract described above.
  const wrapperStyle: React.CSSProperties = secured
    ? { width: 1216, marginLeft: 112 }
    : { width: 1216, marginLeft: 'auto', marginRight: 'auto' };

  return (
    <footer>
      {/* Main content area — full-width background, constrained inner wrapper */}
      <div style={{ background: 'var(--color-tertiary-background)', padding: 'var(--space-8) 0' }}>
        <div style={wrapperStyle}>
          <div style={{ display: 'flex', gap: 'var(--space-10)', flexWrap: 'wrap', justifyContent: 'space-between' }}>

            {/* Contact Us */}
            <div style={{ minWidth: 200 }}>
              <h3 style={headingStyle}>Contact Us</h3>
              {contact.phone && (
                <p style={{ ...bodyStyle, marginBottom: 'var(--space-2)' }}>
                  For immediate assistance, please call:<br />
                  <strong>{contact.phone}</strong>
                </p>
              )}
              {contact.email && (
                <p style={{ ...bodyStyle, marginBottom: 'var(--space-2)' }}>
                  Email:{' '}
                  <a href={`mailto:${contact.email}`} style={{ color: 'var(--color-secondary-2)', textDecoration: 'none' }}>
                    {contact.email}
                  </a>
                </p>
              )}
              {contact.address && (
                <p style={{ ...bodyStyle }}>{contact.address}</p>
              )}
            </div>

            {/* Link columns */}
            {columns.map(col => (
              <div key={col.title} style={{ minWidth: 120 }}>
                <h3 style={headingStyle}>{col.title}</h3>
                {col.links.map(link => (
                  <a key={link.label} href={link.href ?? '#'} style={linkStyle}>
                    {link.label}
                  </a>
                ))}
              </div>
            ))}

            {/* Stay Connected */}
            {showSocial && (
              <div style={{ minWidth: 150 }}>
                <h3 style={headingStyle}>Stay Connected</h3>
                <SocialIcons />
                {showAppBadges && (
                  <div style={{ marginTop: 'var(--space-4)' }}>
                    <h3 style={{ ...headingStyle, marginTop: 'var(--space-4)' }}>Get the Mobile App</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                      <div style={{
                        background: '#263154', borderRadius: 5, padding: '8px 12px',
                        display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                      }}>
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83" />
                          <path d="M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                        <span style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para-sm)', color: 'white', fontWeight: 'var(--font-weight-regular)' }}>
                          Download on the App Store
                        </span>
                      </div>
                      <div style={{
                        background: '#263154', borderRadius: 5, padding: '8px 12px',
                        display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                      }}>
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                          <path d="M3.18 23.18L13.41 12 3.18.82C2.85 1.19 2.64 1.67 2.64 2.23v19.54c0 .56.21 1.04.54 1.41z" fill="#EA4335" />
                          <path d="M17.5 8.14l2.58-1.49-2.22-3.85L3.18.82l10.23 11.18 4.09-3.86z" fill="#FBBC04" />
                          <path d="M20.08 16.35l-2.58-1.49-4.09-3.86 2.38-2.6 4.29 2.48c.74.43 1.24 1.22 1.24 2.12s-.5 1.69-1.24 2.35z" fill="#4285F4" />
                          <path d="M13.41 12L3.18 23.18l14.68-5.32 2.22-3.85-2.38-2.6-4.29 5.59z" fill="#34A853" />
                        </svg>
                        <span style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para-sm)', color: 'white', fontWeight: 'var(--font-weight-regular)' }}>
                          Get it on Google Play
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar — same wrapper constraint */}
      <div style={{ background: 'var(--color-secondary-background)', borderTop: '1px solid var(--color-primary-grey)', padding: 'var(--space-4) 0' }}>
        <div style={{
          ...wrapperStyle,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)',
        }}>
          <div>
            <p style={{
              fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para-lg)',
              fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary-text)', margin: 0,
            }}>
              {companyName}
            </p>
            <p style={{
              fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para-sm)',
              fontWeight: 'var(--font-weight-regular)', color: 'var(--color-secondary-text)', margin: 0,
            }}>
              {copyrightText}
            </p>
          </div>
          {poweredBy && (
            <p style={{
              fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para-sm)',
              fontWeight: 'var(--font-weight-regular)', color: 'var(--color-secondary-text)', margin: 0,
            }}>
              Powered by {poweredBy}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
```

## src/app/components/GlobalHeader.tsx
```tsx
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Bell } from 'lucide-react';

// ─── Profile dropdown ─────────────────────────────────────────────────────────

interface ProfileDropdownProps {
  userName: string;
  userRole: string;
  userInitials: string;
  avatarBg: string;
  onMyProfile?: () => void;
  onLogout?: () => void;
  onClose: () => void;
}

function ProfileDropdown({ userName, userRole, userInitials, avatarBg, onMyProfile, onLogout, onClose }: ProfileDropdownProps) {
  return (
    <div
      className="absolute right-0 top-full mt-[4px] z-50"
      style={{
        background: 'var(--color-secondary-background)',
        boxShadow: '0 0 4px rgba(0,0,0,0.25)',
        borderRadius: 'var(--radius-sm)',
        minWidth: 237,
      }}
    >
      {/* User info header */}
      <div style={{
        display: 'flex', gap: 10, alignItems: 'center',
        padding: 16,
        borderBottom: '1px solid var(--color-primary-grey)',
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: avatarBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <span style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para)', fontWeight: 'var(--font-weight-bold)', color: 'white' }}>
            {userInitials}
          </span>
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para)', fontWeight: 'var(--font-weight-semibold)', color: '#565962', margin: 0 }}>
            {userName}
          </p>
          <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para-sm)', fontWeight: 'var(--font-weight-regular)', color: '#565962', margin: 0 }}>
            {userRole}
          </p>
        </div>
      </div>
      {[
        { label: 'My Profile', action: onMyProfile },
        { label: 'Logout', action: onLogout },
      ].map(item => (
        <button
          key={item.label}
          onClick={() => { item.action?.(); onClose(); }}
          style={{
            display: 'block', width: '100%', textAlign: 'left',
            padding: '10px 16px',
            fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para)',
            fontWeight: 'var(--font-weight-regular)', color: 'var(--color-secondary-2)',
            background: 'transparent', border: 'none', borderBottom: '1px solid var(--color-primary-grey)',
            cursor: 'pointer',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(38,49,84,0.1)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

// ─── Action icon button ───────────────────────────────────────────────────────

function ActionIcon({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: 32, height: 32, borderRadius: '50%',
      background: 'var(--color-info-background)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', flexShrink: 0,
      color: 'var(--color-info-primary)',
    }}>
      {children}
    </div>
  );
}

// ─── GlobalHeader ─────────────────────────────────────────────────────────────
//
// Layout contract (must match Figma design system spec):
//
// UNSECURED header
//   The inner content wrapper is 1216px wide and horizontally centered
//   within the 1440px header using `margin: 0 auto`. This aligns with
//   the 12-column grid. Do NOT use fixed left offsets here.
//
// SECURED header
//   The inner content wrapper is also 1216px wide but LEFT-PINNED with
//   a fixed `margin-left: 112px`. This offsets the content to clear the
//   left navigation bar. The wrapper does NOT center — it is always
//   anchored to the left at 112px.

export interface GlobalHeaderProps {
  secured?: boolean;
  companyName?: string;
  portalName?: string;
  userName?: string;
  userRole?: string;
  userInitials?: string;
  avatarBg?: string;
  logo?: React.ReactNode;
  onMyProfile?: () => void;
  onLogout?: () => void;
}

export function GlobalHeader({
  secured = false,
  companyName = 'A1M Health Insurance TPA',
  portalName = 'Member Portal',
  userName = 'Dr. Stevenson, Jennifer',
  userRole = 'Providers',
  userInitials = 'SJ',
  avatarBg,
  logo,
  onMyProfile,
  onLogout,
}: GlobalHeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const effectiveAvatarBg = avatarBg ?? 'var(--color-primary-2)';

  // Wrapper styles implement the layout contract described above:
  // - Unsecured: 1216px centered via margin auto (12-col grid alignment)
  // - Secured:   1216px left-pinned at margin-left 112px (clears left nav)
  const wrapperStyle: React.CSSProperties = secured
    ? {
      width: 1216,
      marginLeft: 112,
      // no marginRight — intentionally left-pinned, not centered
    }
    : {
      width: 1216,
      marginLeft: 'auto',
      marginRight: 'auto',
    };

  return (
    <header style={{
      background: 'var(--color-secondary-background)',
      borderBottom: '1px solid var(--color-primary-grey)',
      height: 110,
      flexShrink: 0,
      position: 'relative',
    }}>
      {/* Content wrapper — see layout contract above */}
      <div style={{ ...wrapperStyle, height: '100%' }}>

        {/* Main row */}
        <div style={{
          display: 'flex', alignItems: 'center',
          height: '100%',
          gap: 'var(--space-6)',
        }}>
          {/* Logo */}
          <div style={{ width: 240, height: 64, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            {logo}
          </div>

          <div style={{ flex: 1 }} />

          {/* Brand name + portal label */}
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <p style={{
              fontFamily: 'var(--font-family-base)', fontSize: 18, fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-secondary-1)', letterSpacing: '1.5px', textTransform: 'uppercase', margin: 0,
            }}>
              {companyName}
            </p>
            <p style={{
              fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para)',
              fontWeight: 'var(--font-weight-regular)', color: 'var(--color-secondary-text)', margin: 0,
            }}>
              {portalName}
            </p>
          </div>

          {secured && (
            <>
              <div style={{ width: 1, height: 51, background: 'var(--color-secondary-grey)', flexShrink: 0 }} />

              {/* Help & Bell */}
              <ActionIcon><HelpCircle size={16} /></ActionIcon>
              <ActionIcon><Bell size={16} /></ActionIcon>

              {/* Avatar + dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowDropdown(v => !v)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                    background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
                  }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: effectiveAvatarBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para-sm)', fontWeight: 'var(--font-weight-bold)', color: 'white' }}>
                      {userInitials}
                    </span>
                  </div>
                  <ChevronDown size={14} color="var(--color-secondary-grey)" />
                </button>

                {showDropdown && (
                  <ProfileDropdown
                    userName={userName} userRole={userRole}
                    userInitials={userInitials} avatarBg={effectiveAvatarBg}
                    onMyProfile={onMyProfile} onLogout={onLogout}
                    onClose={() => setShowDropdown(false)}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>


    </header>
  );
}

export default GlobalHeader;
```

## src/app/components/Input.tsx
```tsx
import React, { useState } from 'react';
import svgPaths from '../../imports/Input/svg-xqeqd5rtrv';

// ─── Types ────────────────────────────────────────────────────────────────────

export type InputState = 'default' | 'error' | 'disabled';
export type InputTrailingIcon = 'none' | 'dropdown' | 'stepper' | 'eye';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'disabled'> {
  label?: string;
  state?: InputState;
  errorMessage?: string;
  trailingIcon?: InputTrailingIcon;
}

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'disabled'> {
  label?: string;
  state?: InputState;
  errorMessage?: string;
}

// ─── Trailing icons (SVGs from Figma import) ──────────────────────────────────

function DropdownIcon() {
  return (
    <div className="flex items-center justify-center shrink-0 size-[24px] px-[4px] py-[3px]" aria-hidden>
      <div className="relative w-[10px] h-[6px]">
        <svg className="absolute block size-full" fill="none" viewBox="0 0 10 6">
          <path clipRule="evenodd" d={svgPaths.p1a656c80} fill="#6B6F7A" fillRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}

function StepperIcon() {
  return (
    <div className="flex items-center justify-center shrink-0 size-[24px] px-[4px] py-[3px]" aria-hidden>
      <div className="relative w-[17px] h-[22px]">
        <svg className="block size-full" fill="none" viewBox="0 0 17 23.4142">
          <path d={svgPaths.pe07b180} stroke="#6B6F7A" />
          <path d={svgPaths.pc56eac0} stroke="#6B6F7A" />
          <line stroke="#999999" x2="17" y1="11.2071" y2="11.2071" />
        </svg>
      </div>
    </div>
  );
}

function EyeIcon({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={-1}
      aria-label="Toggle password visibility"
      className="flex items-center justify-center shrink-0 size-[24px] px-[4px] py-[3px] bg-transparent border-none cursor-pointer"
    >
      <div className="relative w-[14.286px] h-[10px]">
        <svg className="absolute block size-full" fill="none" viewBox="0 0 14.2857 10">
          <path clipRule="evenodd" d={svgPaths.pa055800} fill="#6B6F7A" fillRule="evenodd" />
        </svg>
      </div>
    </button>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getBorderClass(state: InputState): string {
  if (state === 'error')    return 'border-[var(--color-error-primary)]';
  if (state === 'disabled') return 'border-[var(--color-secondary-grey)]';
  // peer-focus: activates when the <input>/.peer sibling gains focus
  return 'border-[var(--color-secondary-grey)] peer-focus:border-[var(--color-secondary-2)]';
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-para-sm)',
  fontWeight: 'var(--font-weight-regular)',
  lineHeight: 'normal',
};

const errorStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-para-sm)',
  fontWeight: 'var(--font-weight-regular)',
  color: 'var(--color-error-primary)',
  marginTop: 'var(--space-1)',
};

// ─── Input ────────────────────────────────────────────────────────────────────

export function Input({
  label,
  state = 'default',
  errorMessage,
  trailingIcon = 'none',
  type,
  className = '',
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isDisabled = state === 'disabled';
  const hasIcon = trailingIcon !== 'none';

  const effectiveType = trailingIcon === 'eye' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`flex flex-col gap-[4px] ${className}`}>
      {label && (
        <span
          style={{
            ...labelStyle,
            color: isDisabled ? '#565962' : 'var(--color-primary-text)',
          }}
        >
          {label}
        </span>
      )}

      {/* Input wrapper — peer-focus: relies on the <input class="peer"> inside */}
      <div
        className={`relative flex items-center h-[40px] rounded-[4px] min-w-[100px]
          ${isDisabled ? 'bg-[#E7E7E7]' : 'bg-[var(--color-secondary-background)]'}
          ${hasIcon ? 'pl-[16px] pr-[8px]' : 'px-[16px]'}
        `}
      >
        <input
          type={effectiveType}
          disabled={isDisabled}
          className={`
            peer flex-1 h-full bg-transparent border-none outline-none
            font-['Open_Sans'] text-[14px] font-normal leading-normal
            placeholder:text-[#565962]
            ${isDisabled ? 'text-[#565962] cursor-not-allowed' : 'text-[var(--color-primary-text)]'}
          `.trim().replace(/\s+/g, ' ')}
          {...rest}
        />

        {trailingIcon === 'dropdown' && <DropdownIcon />}
        {trailingIcon === 'stepper'  && <StepperIcon />}
        {trailingIcon === 'eye'      && <EyeIcon onClick={() => setShowPassword(v => !v)} />}

        {/* Border overlay — uses peer-focus to react to input focus */}
        <div
          aria-hidden
          className={`absolute inset-0 rounded-[4px] border border-solid pointer-events-none ${getBorderClass(state)}`}
        />
      </div>

      {state === 'error' && errorMessage && (
        <span style={errorStyle}>{errorMessage}</span>
      )}
    </div>
  );
}

// ─── Textarea ─────────────────────────────────────────────────────────────────

export function Textarea({
  label,
  state = 'default',
  errorMessage,
  className = '',
  ...rest
}: TextareaProps) {
  const isDisabled = state === 'disabled';

  return (
    <div className={`flex flex-col gap-[4px] ${className}`}>
      {label && (
        <span
          style={{
            ...labelStyle,
            color: isDisabled ? '#565962' : 'var(--color-primary-text)',
          }}
        >
          {label}
        </span>
      )}

      <div className={`relative rounded-[4px] min-w-[100px] ${isDisabled ? 'bg-[#E7E7E7]' : 'bg-[var(--color-secondary-background)]'}`}>
        <textarea
          disabled={isDisabled}
          className={`
            peer w-full px-[16px] py-[16px] bg-transparent border-none outline-none resize-y
            font-['Open_Sans'] text-[14px] font-normal leading-[20px]
            min-h-[72px] placeholder:text-[#565962] rounded-[4px]
            ${isDisabled ? 'text-[#565962] cursor-not-allowed resize-none' : 'text-[var(--color-primary-text)]'}
          `.trim().replace(/\s+/g, ' ')}
          {...rest}
        />

        {/* Border overlay */}
        <div
          aria-hidden
          className={`absolute inset-0 rounded-[4px] border border-solid pointer-events-none ${getBorderClass(state)}`}
        />
      </div>

      {state === 'error' && errorMessage && (
        <span style={errorStyle}>{errorMessage}</span>
      )}
    </div>
  );
}

export default Input;

```

## src/app/components/Radio.tsx
```tsx
import { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type RadioState = 'default' | 'hovered' | 'focused' | 'disabled' | 'error';

export interface RadioProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  state?: RadioState;
  onChange?: (checked: boolean) => void;
  name?: string;
  className?: string;
}

// ─── Radio circle SVG ─────────────────────────────────────────────────────────

function RadioCircle({ state, checked }: { state: RadioState; checked: boolean }) {
  const isDisabled = state === 'disabled';
  const isError    = state === 'error';
  const isActive   = state === 'hovered' || state === 'focused';

  if (checked) {
    // Selected
    const outerStroke = isDisabled ? '#999999'
      : isError     ? 'var(--color-error-primary)'
      : isActive    ? 'var(--color-secondary-2)'
      : 'var(--color-secondary-2)';

    const innerFill  = isDisabled ? '#999999'
      : isError     ? 'var(--color-error-primary)'
      : 'var(--color-secondary-2)';

    const opacity = isActive ? 0.8 : 1;

    return (
      <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 20 20">
        <circle cx="10" cy="10" fill="white"  r="9.5" stroke={outerStroke} strokeOpacity={opacity} />
        <circle cx="10" cy="10" fill={innerFill} fillOpacity={opacity} r="4.5" stroke={innerFill} strokeOpacity={opacity} />
      </svg>
    );
  }

  // Unselected
  const stroke = isActive ? 'var(--color-secondary-2)' : 'var(--color-secondary-2)';
  const defaultStroke = '#6B6F7A';
  const bg = isDisabled ? '#E7E7E7' : 'white';

  if (isError) {
    return (
      <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 20 20">
        <circle cx="10" cy="10" fill="white" r="9.5" stroke="var(--color-error-primary)" />
      </svg>
    );
  }

  if (isActive) {
    return (
      <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 20 20">
        <g>
          <circle cx="10" cy="10" fill="white" r="10" />
          <circle cx="10" cy="10" r="9.5" stroke={stroke} strokeOpacity="0.8" />
        </g>
      </svg>
    );
  }

  return (
    <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 20 20">
      <g>
        <circle cx="10" cy="10" fill={bg} r="9.5" />
        <circle cx="10" cy="10" r="9.5" stroke={defaultStroke} />
        {!isDisabled && <circle cx="10" cy="10" r="9.5" stroke="black" strokeOpacity="0.2" />}
      </g>
    </svg>
  );
}

// ─── Radio ────────────────────────────────────────────────────────────────────

export function Radio({
  label,
  checked: controlledChecked,
  defaultChecked = false,
  state: forcedState,
  onChange,
  className = '',
}: RadioProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const [hover, setHover]     = useState(false);
  const [focused, setFocused] = useState(false);

  const checked = controlledChecked ?? internalChecked;

  const effectiveState: RadioState = forcedState ?? (
    focused ? 'focused' : hover ? 'hovered' : 'default'
  );

  const isDisabled = effectiveState === 'disabled';

  function handleClick() {
    if (isDisabled) return;
    setInternalChecked(true);
    onChange?.(true);
  }

  return (
    <div
      className={`relative inline-flex gap-[8px] items-start select-none ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      tabIndex={isDisabled ? -1 : 0}
      role="radio"
      aria-checked={checked}
      aria-disabled={isDisabled}
      onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handleClick(); } }}
    >
      {/* Radio circle */}
      <div className="relative shrink-0 size-[20px]">
        <RadioCircle state={effectiveState} checked={checked} />
      </div>

      {/* Focus ring */}
      {effectiveState === 'focused' && (
        <div className="absolute pointer-events-none" style={{ left: -2, top: -2, width: 24, height: 24 }}>
          <svg className="absolute block size-full" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="11.5" stroke="var(--color-secondary-2)" strokeOpacity="0.4" />
          </svg>
        </div>
      )}

      {label && (
        <span style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-para)',
          fontWeight: 'var(--font-weight-regular)',
          color: isDisabled ? '#565962' : 'var(--color-primary-text)',
          lineHeight: 'normal',
        }}>
          {label}
        </span>
      )}
    </div>
  );
}

export default Radio;

```

## src/app/components/SideNav.tsx
```tsx
import React, { useState } from 'react';
import svgPaths from '../../imports/SideNavigation-1/svg-uo3p29yi7g';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavItem {
  id: string;
  label: string;
  // Each item provides both icon variants, matching Figma's Active/Default states.
  // Active  = filled solid icon (white fill, no stroke)
  // Default = outline/stroke icon (white stroke, no fill)
  iconActive: React.ReactNode;
  iconDefault: React.ReactNode;
}

export interface SideNavProps {
  collapsed?: boolean;
  activeId?: string;
  items?: NavItem[];
  onToggle?: () => void;
  onItemClick?: (id: string) => void;
}

// ─── Icon helpers ─────────────────────────────────────────────────────────────
// Icons are 42×42px containers, centered within the nav item.
// Active icons use filled paths (solid white).
// Default icons use stroked paths (white stroke, transparent fill).

function FilledIcon({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: 42, height: 42, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </div>
  );
}

// ─── Member Portal nav items ──────────────────────────────────────────────────
// Canonical order per product spec:
// Home, Coverages, ID Cards, Claims, Prior Auth, Resources, Documents

export const MEMBER_PORTAL_NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    iconActive: (
      <FilledIcon>
        <svg width="26" height="28" viewBox="0 0 26 28" fill="none">
          <path fill="white" d="M13 0L0 10.4V28h8.667v-8.4H17.333V28H26V10.4L13 0z" />
        </svg>
      </FilledIcon>
    ),
    iconDefault: (
      <FilledIcon>
        <svg width="26" height="28" viewBox="0 0 26 28" fill="none">
          <path stroke="white" strokeWidth="1.8" strokeLinejoin="round" d="M13 1.8L1 11.2V27h7.667v-8.4h8.666V27H25V11.2L13 1.8z" />
        </svg>
      </FilledIcon>
    ),
  },
  {
    id: 'coverages',
    label: 'Coverages',
    iconActive: (
      <FilledIcon>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path fill="white" fillRule="evenodd" clipRule="evenodd" d="M14 0L2 5v9c0 7 5.2 13.5 12 15 6.8-1.5 12-8 12-15V5L14 0z" />
        </svg>
      </FilledIcon>
    ),
    iconDefault: (
      <FilledIcon>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path stroke="white" strokeWidth="1.8" strokeLinejoin="round" d="M14 1.5L2.9 6.2v8.8c0 6.5 4.8 12.6 11.1 14 6.3-1.4 11.1-7.5 11.1-14V6.2L14 1.5z" />
        </svg>
      </FilledIcon>
    ),
  },
  {
    id: 'id-cards',
    label: 'ID Cards',
    iconActive: (
      <FilledIcon>
        <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
          <path fill="white" fillRule="evenodd" clipRule="evenodd" d={svgPaths.p242e2300} />
        </svg>
      </FilledIcon>
    ),
    iconDefault: (
      <FilledIcon>
        <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
          <rect x="1" y="1" width="30" height="22" rx="2" stroke="white" strokeWidth="1.8" />
          <circle cx="9" cy="10" r="3.5" stroke="white" strokeWidth="1.5" />
          <line x1="16" y1="8" x2="27" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="16" y1="12" x2="24" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </FilledIcon>
    ),
  },
  {
    id: 'claims',
    label: 'Claims',
    iconActive: (
      <FilledIcon>
        <svg width="24" height="30" viewBox="0 0 24 30" fill="none">
          <path fill="white" fillRule="evenodd" clipRule="evenodd" d={svgPaths.pc18170} />
        </svg>
      </FilledIcon>
    ),
    iconDefault: (
      <FilledIcon>
        <svg width="24" height="30" viewBox="0 0 24 30" fill="none">
          <path stroke="white" strokeWidth="1.8" strokeLinejoin="round" d="M4 1h10l6 6v22H4V1z" />
          <path stroke="white" strokeWidth="1.5" strokeLinecap="round" d="M14 1v6h6" />
          <line x1="7" y1="13" x2="17" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="7" y1="17" x2="17" y2="17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="7" y1="21" x2="13" y2="21" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </FilledIcon>
    ),
  },
  {
    id: 'prior-auth',
    label: 'Prior Auth',
    iconActive: (
      <FilledIcon>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path fill="white" fillRule="evenodd" clipRule="evenodd" d="M14 0a14 14 0 100 28A14 14 0 0014 0zm-2 20.5l-5-5 1.4-1.4 3.6 3.6 7.6-7.6 1.4 1.4-9 9z" />
        </svg>
      </FilledIcon>
    ),
    iconDefault: (
      <FilledIcon>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="13" stroke="white" strokeWidth="1.8" />
          <path stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.5l4 4 9-9" />
        </svg>
      </FilledIcon>
    ),
  },
  {
    id: 'resources',
    label: 'Resources',
    iconActive: (
      <FilledIcon>
        <svg width="24" height="30" viewBox="0 0 24 30" fill="none">
          <path fill="white" fillRule="evenodd" clipRule="evenodd" d={svgPaths.p3f76b280} />
        </svg>
      </FilledIcon>
    ),
    iconDefault: (
      <FilledIcon>
        <svg width="24" height="30" viewBox="0 0 24 30" fill="none">
          <path stroke="white" strokeWidth="1.8" strokeLinejoin="round" d="M2 2h14l6 6v20H2V2z" />
          <path stroke="white" strokeWidth="1.5" strokeLinecap="round" d="M16 2v6h6" />
          <line x1="6" y1="14" x2="18" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="6" y1="18" x2="18" y2="18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="6" y1="22" x2="14" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </FilledIcon>
    ),
  },
  {
    id: 'documents',
    label: 'Documents',
    iconActive: (
      <FilledIcon>
        <svg width="26" height="30" viewBox="0 0 26 30" fill="none">
          <path fill="white" fillRule="evenodd" clipRule="evenodd" d="M2 0h16l8 8v22H2V0zm16 0v8h8" />
        </svg>
      </FilledIcon>
    ),
    iconDefault: (
      <FilledIcon>
        <svg width="26" height="30" viewBox="0 0 26 30" fill="none">
          <path stroke="white" strokeWidth="1.8" strokeLinejoin="round" d="M2 1h14l8 8v20H2V1z" />
          <path stroke="white" strokeWidth="1.5" strokeLinecap="round" d="M16 1v8h8" />
          <line x1="6" y1="16" x2="20" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="6" y1="20" x2="20" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="6" y1="24" x2="14" y2="24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </FilledIcon>
    ),
  },
];

// ─── Admin Portal nav items ───────────────────────────────────────────────────
// Admin portal currently only has Home.

export const ADMIN_PORTAL_NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    iconActive: MEMBER_PORTAL_NAV_ITEMS[0].iconActive,
    iconDefault: MEMBER_PORTAL_NAV_ITEMS[0].iconDefault,
  },
];

// ─── Nav item row ─────────────────────────────────────────────────────────────
// States from Figma:
//   Active   → background rgba(38,49,84,0.2), left 4px accent bar, filled icon
//   Hover    → background rgba(38,49,84,0.1), outline icon
//   Default  → transparent background, outline icon

interface NavItemRowProps {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}

function NavItemRow({ item, active, collapsed, onClick }: NavItemRowProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={item.label}
      aria-current={active ? 'page' : undefined}
      title={collapsed ? item.label : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        height: 64,
        paddingLeft: collapsed ? 19 : 16,
        paddingRight: 16,
        background: active
          ? 'rgba(38,49,84,0.2)'
          : hovered
            ? 'rgba(38,49,84,0.1)'
            : 'transparent',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        flexShrink: 0,
        transition: 'background 0.15s',
        textAlign: 'left',
      }}
    >
      {/* Active state: 4px left accent bar */}
      {active && (
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
          background: 'var(--color-primary-2)',
        }} />
      )}

      {/* Icon: filled when active, outline when default/hover */}
      {active ? item.iconActive : item.iconDefault}

      {/* Label — hidden when collapsed */}
      {!collapsed && (
        <span style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-para)',
          fontWeight: active ? 'var(--font-weight-semibold)' : 'var(--font-weight-regular)',
          color: 'white',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {item.label}
        </span>
      )}
    </button>
  );
}

// ─── SideNav ──────────────────────────────────────────────────────────────────
// Width: 80px collapsed (icon only), 240px expanded (icon + label).
// Background: var(--color-primary-1) — the brand purple, theme-aware.
// The nav does NOT include a logout button — logout is in the profile dropdown
// in the GlobalHeader.
//
// Do not add items unless specified. Pass items={MEMBER_PORTAL_NAV_ITEMS}
// or items={ADMIN_PORTAL_NAV_ITEMS} from the parent.

export function SideNav({
  collapsed: controlledCollapsed,
  activeId = 'home',
  items = MEMBER_PORTAL_NAV_ITEMS,
  onToggle,
  onItemClick,
}: SideNavProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(true);
  const collapsed = controlledCollapsed ?? internalCollapsed;

  function handleToggle() {
    setInternalCollapsed(v => !v);
    onToggle?.();
  }

  const NAV_WIDTH_COLLAPSED = 80;
  const NAV_WIDTH_EXPANDED = 240;
  const width = collapsed ? NAV_WIDTH_COLLAPSED : NAV_WIDTH_EXPANDED;

  return (
    <nav
      aria-label="Main navigation"
      style={{
        width,
        minHeight: '100%',
        background: 'var(--color-primary-1)',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.2s ease',
        overflow: 'hidden',
      }}
    >
      {/* Collapse / expand toggle — chevron icon, same 64px row height as items */}
      <button
        onClick={handleToggle}
        aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          height: 64,
          paddingLeft: collapsed ? 19 : 16,
          paddingRight: 16,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          flexShrink: 0,
          width: '100%',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(38,49,84,0.1)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        <FilledIcon>
          <svg
            width="22" height="22" viewBox="0 0 22 22" fill="none"
            style={{ transform: collapsed ? 'none' : 'rotate(180deg)', transition: 'transform 0.2s' }}
          >
            {/* Left-pointing chevron / hamburger toggle */}
            <path stroke="white" strokeWidth="2" strokeLinecap="round" d="M14 5L8 11l6 6" />
          </svg>
        </FilledIcon>
        {!collapsed && (
          <span style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-para)',
            fontWeight: 'var(--font-weight-regular)',
            color: 'white',
            whiteSpace: 'nowrap',
          }}>
            Collapse
          </span>
        )}
      </button>

      {/* Nav items */}
      {items.map(item => (
        <NavItemRow
          key={item.id}
          item={item}
          active={item.id === activeId}
          collapsed={collapsed}
          onClick={() => onItemClick?.(item.id)}
        />
      ))}

      <div style={{ flex: 1 }} />

      {/* Bottom divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.2)', margin: '0 16px' }} />
    </nav>
  );
}

export default SideNav;
```

## src/app/components/designsystem/AlertSection.tsx
```tsx
import { useState } from 'react';
import { Alert } from '../Alert';
import type { AlertIndication } from '../Alert';
import { SectionBlock } from './SectionBlock';

function GroupLabel({ children }: { children: string }) {
  return (
    <span style={{
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-para-sm)',
      fontWeight: 'var(--font-weight-semibold)',
      color: 'var(--color-secondary-text)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.06em',
    }}>
      {children}
    </span>
  );
}

const INDICATIONS: AlertIndication[] = ['success', 'warning', 'error', 'info'];

function DismissableAlert({ indication }: { indication: AlertIndication }) {
  const [visible, setVisible] = useState(true);
  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-para-sm)',
          color: 'var(--color-secondary-2)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        Show again
      </button>
    );
  }
  return (
    <Alert
      indication={indication}
      type="floating"
      onDismiss={() => setVisible(false)}
      style={{ width: 445 } as React.CSSProperties}
    />
  );
}

export function AlertSection() {
  return (
    <SectionBlock title="Alerts / Toasts">

      {/* Floating — all types */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        Floating — Single line (dismissible)
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
        {INDICATIONS.map(ind => (
          <DismissableAlert key={ind} indication={ind} />
        ))}
      </div>

      {/* In-page — all types */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        In-Page — Single line
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
        {INDICATIONS.map(ind => (
          <Alert
            key={ind}
            indication={ind}
            type="in-page"
            style={{ width: 445 } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Multiline floating */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        Floating — Multiline
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {INDICATIONS.map(ind => (
          <Alert
            key={ind}
            indication={ind}
            type="floating"
            multiline
            title="A Request Completed Successfully."
            style={{ width: 445 } as React.CSSProperties}
          />
        ))}
      </div>

    </SectionBlock>
  );
}

```

## src/app/components/designsystem/BadgeSection.tsx
```tsx
import { Badge } from '../Badge';
import type { BadgeEmphasis, BadgeIndication } from '../Badge';
import { SectionBlock } from './SectionBlock';

function GroupLabel({ children }: { children: string }) {
  return (
    <span style={{
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-para-sm)',
      fontWeight: 'var(--font-weight-semibold)',
      color: 'var(--color-secondary-text)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.06em',
    }}>
      {children}
    </span>
  );
}

const INDICATIONS: BadgeIndication[] = ['success', 'info', 'warning', 'error'];
const EMPHASES: { id: BadgeEmphasis; label: string }[] = [
  { id: 'bold',    label: 'Bold'    },
  { id: 'subtle',  label: 'Subtle'  },
  { id: 'minimal', label: 'Minimal' },
];

const cellPad: React.CSSProperties = { padding: 'var(--space-4)', verticalAlign: 'middle' };

export function BadgeSection() {
  return (
    <SectionBlock title="Badges">

      {/* Without icon matrix */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        Without Icon
      </p>
      <div style={{ overflowX: 'auto', marginBottom: 'var(--space-8)' }}>
        <table style={{ borderCollapse: 'collapse', minWidth: 500 }}>
          <thead>
            <tr>
              <th style={{ width: 100, ...cellPad, textAlign: 'left' }} />
              {EMPHASES.map(e => (
                <th key={e.id} style={{ width: 180, ...cellPad, textAlign: 'left' }}>
                  <GroupLabel>{e.label}</GroupLabel>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INDICATIONS.map(ind => (
              <tr key={ind} style={{ borderTop: '1px solid var(--color-primary-grey)' }}>
                <td style={{ ...cellPad }}><GroupLabel>{ind}</GroupLabel></td>
                {EMPHASES.map(e => (
                  <td key={e.id} style={{ ...cellPad }}>
                    <Badge emphasis={e.id} indication={ind} withIcon={false} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* With icon matrix */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        With Icon
      </p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', minWidth: 500 }}>
          <thead>
            <tr>
              <th style={{ width: 100, ...cellPad, textAlign: 'left' }} />
              {EMPHASES.map(e => (
                <th key={e.id} style={{ width: 180, ...cellPad, textAlign: 'left' }}>
                  <GroupLabel>{e.label}</GroupLabel>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INDICATIONS.map(ind => (
              <tr key={ind} style={{ borderTop: '1px solid var(--color-primary-grey)' }}>
                <td style={{ ...cellPad }}><GroupLabel>{ind}</GroupLabel></td>
                {EMPHASES.map(e => (
                  <td key={e.id} style={{ ...cellPad }}>
                    <Badge emphasis={e.id} indication={ind} withIcon />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </SectionBlock>
  );
}

```

## src/app/components/designsystem/ButtonSection.tsx
```tsx
import { Star, ChevronDown } from 'lucide-react';
import { Button } from '../Button';
import { SectionBlock } from './SectionBlock';
import type { ButtonType, ButtonSize, ButtonIcon } from '../Button';

const ICON_EL = <Star size={14} />;
const SPLIT_EL = <ChevronDown size={14} />;

const VARIANTS: ButtonType[] = ['primary', 'secondary', 'link'];
const VARIANT_LABELS: Record<ButtonType, string> = { primary: 'Primary', secondary: 'Secondary', link: 'Link' };

const ICON_MODES: { id: ButtonIcon; label: string }[] = [
  { id: 'none',      label: 'None' },
  { id: 'with-icon', label: 'With Icon' },
  { id: 'only-icon', label: 'Only Icon' },
  { id: 'split',     label: 'Split' },
];

const STATES = [
  { id: 'default',  label: 'Default' },
  { id: 'hovered',  label: 'Hovered' },
  { id: 'focused',  label: 'Focused' },
  { id: 'disabled', label: 'Disabled' },
];

function GroupLabel({ children }: { children: string }) {
  return (
    <span style={{
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-para-sm)',
      fontWeight: 'var(--font-weight-semibold)',
      color: 'var(--color-secondary-text)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.06em',
    }}>
      {children}
    </span>
  );
}

function MatrixCell({ variant, size, iconMode }: { variant: ButtonType; size: ButtonSize; iconMode: ButtonIcon }) {
  const isSplitLink = iconMode === 'split' && variant === 'link';
  // Link + split falls back to primary per Button implementation
  const effectiveVariant: ButtonType = isSplitLink ? 'primary' : variant;

  return (
    <Button
      variant={effectiveVariant}
      size={size}
      icon={iconMode}
      iconElement={iconMode !== 'none' ? ICON_EL : undefined}
      splitAction={iconMode === 'split' ? SPLIT_EL : undefined}
      aria-label={iconMode === 'only-icon' ? `${variant} ${size} button` : undefined}
    >
      {iconMode !== 'only-icon' ? 'Action' : null}
    </Button>
  );
}

const COL_W = 168;
const ROW_LABEL_W = 90;

const cellPad: React.CSSProperties = { padding: 'var(--space-4)', verticalAlign: 'middle' };

export function ButtonSection() {
  return (
    <SectionBlock title="Buttons">

      {/* — Matrix: variant rows × icon-mode columns — */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        Types &amp; Icon Variants — Large / Small
      </p>

      <div style={{ overflowX: 'auto', marginBottom: 'var(--space-8)' }}>
        <table style={{ borderCollapse: 'collapse', minWidth: 720 }}>
          <thead>
            <tr>
              <th style={{ width: ROW_LABEL_W, ...cellPad, textAlign: 'left' }} />
              {ICON_MODES.map(m => (
                <th key={m.id} style={{ width: COL_W, ...cellPad, textAlign: 'left' }}>
                  <GroupLabel>{m.label}</GroupLabel>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {VARIANTS.map(variant => (
              <tr key={variant} style={{ borderTop: '1px solid var(--color-primary-grey)' }}>
                <td style={{ ...cellPad }}>
                  <GroupLabel>{VARIANT_LABELS[variant]}</GroupLabel>
                </td>
                {ICON_MODES.map(m => (
                  <td key={m.id} style={{ ...cellPad }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                      <MatrixCell variant={variant} size="large" iconMode={m.id} />
                      <MatrixCell variant={variant} size="small" iconMode={m.id} />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* — States: Primary Large and Secondary Large — */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        States — Primary Large &amp; Secondary Large
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', minWidth: 600 }}>
          <thead>
            <tr>
              <th style={{ width: ROW_LABEL_W, ...cellPad, textAlign: 'left' }} />
              {STATES.map(s => (
                <th key={s.id} style={{ width: COL_W, ...cellPad, textAlign: 'left' }}>
                  <GroupLabel>{s.label}</GroupLabel>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Primary Large states */}
            <tr style={{ borderTop: '1px solid var(--color-primary-grey)' }}>
              <td style={{ ...cellPad }}><GroupLabel>Primary</GroupLabel></td>
              <td style={{ ...cellPad }}>
                <Button variant="primary" size="large">Action</Button>
              </td>
              <td style={{ ...cellPad }}>
                {/* Simulated hover: opacity-90 matches the Button's hover:opacity-90 rule */}
                <Button variant="primary" size="large" style={{ opacity: 0.9 }}>Action</Button>
              </td>
              <td style={{ ...cellPad }}>
                {/* Simulated focus ring */}
                <Button variant="primary" size="large" style={{ outline: '4px solid var(--color-secondary-2)', outlineOffset: '1px' }}>Action</Button>
              </td>
              <td style={{ ...cellPad }}>
                <Button variant="primary" size="large" disabled>Action</Button>
              </td>
            </tr>

            {/* Secondary Large states */}
            <tr style={{ borderTop: '1px solid var(--color-primary-grey)' }}>
              <td style={{ ...cellPad }}><GroupLabel>Secondary</GroupLabel></td>
              <td style={{ ...cellPad }}>
                <Button variant="secondary" size="large">Action</Button>
              </td>
              <td style={{ ...cellPad }}>
                {/* Simulated hover: secondary hover fills with primary-background */}
                <Button variant="secondary" size="large" style={{ background: 'var(--color-primary-background)' }}>Action</Button>
              </td>
              <td style={{ ...cellPad }}>
                <Button variant="secondary" size="large" style={{ outline: '4px solid var(--color-secondary-2)', outlineOffset: '1px' }}>Action</Button>
              </td>
              <td style={{ ...cellPad }}>
                <Button variant="secondary" size="large" disabled>Action</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </SectionBlock>
  );
}

```

## src/app/components/designsystem/CheckboxSection.tsx
```tsx
import { Checkbox } from '../Checkbox';
import type { CheckboxState, CheckboxStatus } from '../Checkbox';
import { SectionBlock } from './SectionBlock';

function GroupLabel({ children }: { children: string }) {
  return (
    <span style={{
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-para-sm)',
      fontWeight: 'var(--font-weight-semibold)',
      color: 'var(--color-secondary-text)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.06em',
    }}>
      {children}
    </span>
  );
}

const STATES: { id: CheckboxState; label: string }[] = [
  { id: 'default',  label: 'Default'  },
  { id: 'hovered',  label: 'Hovered'  },
  { id: 'focused',  label: 'Focused'  },
  { id: 'disabled', label: 'Disabled' },
  { id: 'error',    label: 'Error'    },
];

const STATUSES: { id: CheckboxStatus; label: string }[] = [
  { id: 'unchecked',     label: 'Unchecked'     },
  { id: 'checked',       label: 'Checked'       },
  { id: 'indeterminate', label: 'Indeterminate' },
];

const cellPad: React.CSSProperties = { padding: 'var(--space-4)', verticalAlign: 'middle' };

export function CheckboxSection() {
  return (
    <SectionBlock title="Checkbox">

      {/* Interactive examples */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        Interactive
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" defaultStatus="checked" />
        <Checkbox label="Indeterminate" defaultStatus="indeterminate" />
      </div>

      {/* States matrix */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        States
      </p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', minWidth: 600 }}>
          <thead>
            <tr>
              <th style={{ width: 100, ...cellPad, textAlign: 'left' }} />
              {STATES.map(s => (
                <th key={s.id} style={{ width: 130, ...cellPad, textAlign: 'left' }}>
                  <GroupLabel>{s.label}</GroupLabel>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STATUSES.map(st => (
              <tr key={st.id} style={{ borderTop: '1px solid var(--color-primary-grey)' }}>
                <td style={{ ...cellPad }}>
                  <GroupLabel>{st.label}</GroupLabel>
                </td>
                {STATES.map(s => (
                  <td key={s.id} style={{ ...cellPad }}>
                    <Checkbox
                      label="Label"
                      status={st.id}
                      state={s.id}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionBlock>
  );
}

```

## src/app/components/designsystem/ColorSection.tsx
```tsx
import { useLayoutEffect, useRef, useState } from 'react';
import { SectionBlock } from './SectionBlock';

const ALL_TOKENS = [
  '--color-primary-1', '--color-primary-2', '--color-secondary-1', '--color-secondary-2',
  '--color-table-primary', '--color-table-secondary',
  '--color-primary-text', '--color-secondary-text',
  '--color-primary-background', '--color-secondary-background', '--color-tertiary-background',
  '--color-primary-grey', '--color-secondary-grey',
  '--color-error-primary', '--color-error-background',
  '--color-warning-primary', '--color-warning-background',
  '--color-success-primary', '--color-success-background',
  '--color-info-primary', '--color-info-background',
];

// Tokens that render light/white fills — need border to be visible against page bg
const LIGHT_TOKENS = new Set([
  '--color-primary-background', '--color-secondary-background', '--color-tertiary-background',
  '--color-primary-grey', '--color-secondary-grey',
  '--color-table-primary', '--color-table-secondary',
  '--color-error-background', '--color-warning-background',
  '--color-success-background', '--color-info-background',
  '--color-primary-text', '--color-secondary-text',
]);

const TOKEN_LABELS: Record<string, string> = {
  '--color-primary-1': 'Primary 1',
  '--color-primary-2': 'Primary 2',
  '--color-secondary-1': 'Secondary 1',
  '--color-secondary-2': 'Secondary 2',
  '--color-table-primary': 'Table Primary',
  '--color-table-secondary': 'Table Secondary',
  '--color-primary-text': 'Primary Text',
  '--color-secondary-text': 'Secondary Text',
  '--color-primary-background': 'Primary BG',
  '--color-secondary-background': 'Secondary BG',
  '--color-tertiary-background': 'Tertiary BG',
  '--color-primary-grey': 'Primary Grey',
  '--color-secondary-grey': 'Secondary Grey',
  '--color-error-primary': 'Error Primary',
  '--color-error-background': 'Error BG',
  '--color-warning-primary': 'Warning Primary',
  '--color-warning-background': 'Warning BG',
  '--color-success-primary': 'Success Primary',
  '--color-success-background': 'Success BG',
  '--color-info-primary': 'Info Primary',
  '--color-info-background': 'Info BG',
};

interface SwatchProps {
  token: string;
  resolved: Record<string, string>;
}

function Swatch({ token, resolved }: SwatchProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 80 }}>
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 'var(--radius-sm)',
        background: `var(${token})`,
        border: LIGHT_TOKENS.has(token) ? '1px solid var(--color-primary-grey)' : 'none',
        flexShrink: 0,
      }} />
      <span style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-regular)',
        color: 'var(--color-primary-text)',
        lineHeight: 1.4,
      }}>
        {TOKEN_LABELS[token]}
      </span>
      <span style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-regular)',
        color: 'var(--color-secondary-text)',
        lineHeight: 1.4,
      }}>
        {resolved[token] || '—'}
      </span>
    </div>
  );
}

function SwatchGroup({ label, tokens, resolved }: { label: string; tokens: string[]; resolved: Record<string, string> }) {
  return (
    <div style={{ marginBottom: 'var(--space-6)' }}>
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        margin: '0 0 var(--space-3) 0',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}>
        {label}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)' }}>
        {tokens.map(t => <Swatch key={t} token={t} resolved={resolved} />)}
      </div>
    </div>
  );
}

interface ColorSectionProps {
  activeTheme: string;
}

export function ColorSection({ activeTheme }: ColorSectionProps) {
  const probeRef = useRef<HTMLSpanElement>(null);
  const [resolved, setResolved] = useState<Record<string, string>>({});

  // Reads CSS custom property values from the themed ancestor after each theme change
  useLayoutEffect(() => {
    if (!probeRef.current) return;
    const cs = getComputedStyle(probeRef.current);
    const map: Record<string, string> = {};
    ALL_TOKENS.forEach(t => { map[t] = cs.getPropertyValue(t).trim(); });
    setResolved(map);
  }, [activeTheme]);

  return (
    <SectionBlock title="Colors">
      {/* Invisible probe element — inherits CSS custom properties from [data-theme] ancestor */}
      <span ref={probeRef} style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', opacity: 0, pointerEvents: 'none' }} />

      <SwatchGroup label="Brand" tokens={['--color-primary-1', '--color-primary-2', '--color-secondary-1', '--color-secondary-2']} resolved={resolved} />
      <SwatchGroup label="Table" tokens={['--color-table-primary', '--color-table-secondary']} resolved={resolved} />
      <SwatchGroup label="Text" tokens={['--color-primary-text', '--color-secondary-text']} resolved={resolved} />
      <SwatchGroup label="Backgrounds" tokens={['--color-primary-background', '--color-secondary-background', '--color-tertiary-background']} resolved={resolved} />
      <SwatchGroup label="Greys" tokens={['--color-primary-grey', '--color-secondary-grey']} resolved={resolved} />

      {/* Status — primary + background paired per status */}
      <div>
        <p style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-para-sm)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-secondary-text)',
          margin: '0 0 var(--space-3) 0',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}>
          Status
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {([
            ['Error',   '--color-error-primary',   '--color-error-background'],
            ['Warning', '--color-warning-primary', '--color-warning-background'],
            ['Success', '--color-success-primary', '--color-success-background'],
            ['Info',    '--color-info-primary',    '--color-info-background'],
          ] as const).map(([name, primary, bg]) => (
            <div key={name} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
              <span style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-para-sm)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-secondary-text)',
                width: 64,
                paddingTop: 'var(--space-1)',
                flexShrink: 0,
              }}>
                {name}
              </span>
              <Swatch token={primary} resolved={resolved} />
              <Swatch token={bg} resolved={resolved} />
            </div>
          ))}
        </div>
      </div>
    </SectionBlock>
  );
}

```

## src/app/components/designsystem/FooterSection.tsx
```tsx
import { Footer } from '../Footer';
import { SectionBlock } from './SectionBlock';

function GroupLabel({ children }: { children: string }) {
  return (
    <span style={{
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-para-sm)',
      fontWeight: 'var(--font-weight-semibold)',
      color: 'var(--color-secondary-text)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.06em',
    }}>
      {children}
    </span>
  );
}

function PreviewFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 'var(--space-8)' }}>
      <div style={{ marginBottom: 'var(--space-3)' }}>
        <GroupLabel>{label}</GroupLabel>
      </div>
      <div style={{
        border: '1px solid var(--color-primary-grey)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
      }}>
        {children}
      </div>
    </div>
  );
}

const COLUMNS_3 = [
  { title: 'Block 1', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Use' }, { label: 'Legal' }, { label: 'Contact Us' }] },
  { title: 'Block 2', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Use' }, { label: 'Legal' }, { label: 'Contact Us' }] },
  { title: 'Block 3', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Use' }, { label: 'Legal' }, { label: 'Contact Us' }] },
];

const COLUMNS_1 = [
  { title: 'Block 1', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Use' }, { label: 'Legal' }, { label: 'Contact Us' }] },
];

export function FooterSection() {
  return (
    <SectionBlock title="Footer">

      {/* Variant 1: Full footer — Contact + 3 columns + Social */}
      <PreviewFrame label="Full footer — Contact, 3 Link Columns, Social">
        <Footer
          companyName="A1M Health"
          copyrightText="Copyright © 2022 A1M Health  •  CA Insurance License Number 0451271"
          contact={{
            phone: '1 (800) CALL-NOW | 1 (800) 121-2412',
            email: 'support@eldocomp.com',
            address: '9025 Smoky Hollow Street, Niagara Falls, NY 14304',
          }}
          columns={COLUMNS_3}
          showSocial
          poweredBy="Mphasis"
        />
      </PreviewFrame>

      {/* Variant 2: Minimal — social + 1 column, no contact */}
      <PreviewFrame label="Minimal — 1 link column + Social, no contact">
        <Footer
          companyName="A1M Health"
          contact={undefined}
          columns={COLUMNS_1}
          showSocial
        />
      </PreviewFrame>

      {/* Variant 3: Contact + Social + App badges */}
      <PreviewFrame label="With App Badges">
        <Footer
          companyName="A1M Health"
          contact={{
            phone: '1 (800) CALL-NOW | 1 (800) 121-2412',
            email: 'support@eldocomp.com',
            address: '9025 Smoky Hollow Street, Niagara Falls, NY 14304',
          }}
          columns={COLUMNS_1}
          showSocial
          showAppBadges
          poweredBy="Mphasis"
        />
      </PreviewFrame>

      {/* Props reference */}
      <div>
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <GroupLabel>Component Props</GroupLabel>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', minWidth: 500 }}>
            <thead>
              <tr>
                {['Prop', 'Type', 'Default', 'Description'].map(h => (
                  <th key={h} style={{
                    padding: 'var(--space-3) var(--space-4)', textAlign: 'left',
                    borderBottom: '1px solid var(--color-primary-grey)',
                  }}>
                    <GroupLabel>{h}</GroupLabel>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['companyName', 'string', '"A1M Health"', 'Name shown in the bottom bar'],
                ['copyrightText', 'string', 'Built-in', 'Full copyright line in the bottom bar'],
                ['contact', 'FooterContactInfo', 'Built-in', 'phone, email, address fields'],
                ['columns', 'FooterColumn[]', '3 default blocks', 'Array of { title, links[] } columns'],
                ['showSocial', 'boolean', 'true', 'Show Stay Connected section with social icons'],
                ['showAppBadges', 'boolean', 'false', 'Show App Store + Google Play badges'],
                ['poweredBy', 'string', 'undefined', 'Text after "Powered by" in bottom bar'],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop} style={{ borderBottom: '1px solid var(--color-primary-grey)' }}>
                  <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                    <code style={{ fontFamily: 'monospace', fontSize: 'var(--font-size-para-sm)', background: 'var(--color-tertiary-background)', padding: '2px 6px', borderRadius: 2, color: 'var(--color-primary-text)' }}>
                      {prop}
                    </code>
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', fontFamily: 'monospace', fontSize: 'var(--font-size-para-sm)', color: 'var(--color-secondary-text)' }}>
                    {type}
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para-sm)', color: 'var(--color-secondary-text)' }}>
                    {def}
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para)', color: 'var(--color-primary-text)' }}>
                    {desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </SectionBlock>
  );
}

```

## src/app/components/designsystem/HeaderSection.tsx
```tsx
import { useState } from 'react';
import { GlobalHeader } from '../GlobalHeader';
import { SectionBlock } from './SectionBlock';
import keenanLogo from '../../../imports/GlobalHeader/268260c7c4b29dd81e298ecb1511858d1fbd3c50.png';

function GroupLabel({ children }: { children: string }) {
  return (
    <span style={{
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-para-sm)',
      fontWeight: 'var(--font-weight-semibold)',
      color: 'var(--color-secondary-text)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.06em',
    }}>
      {children}
    </span>
  );
}

function PreviewFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div style={{ marginBottom: 'var(--space-6)' }}>
      <div style={{ marginBottom: 'var(--space-3)' }}>
        <GroupLabel>{label}</GroupLabel>
      </div>
      <div style={{
        border: '1px solid var(--color-primary-grey)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        background: 'var(--color-primary-background)',
      }}>
        {children}
      </div>
    </div>
  );
}

// Theme-aware logo placeholder that responds to data-theme
function ThemeLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 64 }}>
      <div style={{
        width: 42, height: 42, borderRadius: 4,
        background: 'var(--color-primary-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <span style={{
          color: 'var(--color-primary-1)', fontWeight: 700, fontSize: 18,
          fontFamily: 'var(--font-family-base)',
        }}>J</span>
      </div>
      <div>
        <p style={{
          margin: 0, fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-para)', fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-primary-1)',
        }}>
          Jevelina
        </p>
        <p style={{
          margin: 0, fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-para-sm)', fontWeight: 'var(--font-weight-regular)',
          color: 'var(--color-secondary-text)',
        }}>
          Health Insurance
        </p>
      </div>
    </div>
  );
}

function KeenanLogo() {
  return (
    <div style={{ height: 64, width: 240, overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: '9.38% 24.58% 9.38% -1.67%' }}>
        <img
          alt="Keenan Logo"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          src={keenanLogo}
        />
      </div>
    </div>
  );
}

export function HeaderSection() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <SectionBlock title="Global Header">

      {/* Unsecured */}
      <PreviewFrame label="Unsecured (pre-login)">
        <GlobalHeader
          secured={false}
          companyName="A1M Health Insurance TPA"
          portalName="Member Portal"
          logo={<ThemeLogo />}
        />
      </PreviewFrame>

      {/* Secured */}
      <PreviewFrame label="Secured (logged in) — Keenan theme">
        <GlobalHeader
          secured
          companyName="ADMIN CENTER"
          portalName="For Employers"
          userName="Dr. Stevenson, Jennifer"
          userRole="Providers"
          userInitials="SJ"
          avatarBg="#df126c"
          logo={<KeenanLogo />}
        />
      </PreviewFrame>

      {/* Secured — theme-aware */}
      <PreviewFrame label="Secured — theme-aware logo">
        <GlobalHeader
          secured
          companyName="A1M Health Insurance TPA"
          portalName="Member Portal"
          userName="Hi, Jennifer"
          userRole="Employer"
          userInitials="JH"
          logo={<ThemeLogo />}
        />
      </PreviewFrame>

      {/* Profile dropdown */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ marginBottom: 'var(--space-3)' }}><GroupLabel>Profile Dropdown States</GroupLabel></div>
        <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
          {['Default', 'Hover', 'Focused'].map(state => (
            <div key={state}>
              <p style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-para-sm)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-secondary-text)',
                margin: '0 0 var(--space-2) 0',
              }}>
                {state}
              </p>
              <div style={{
                background: 'var(--color-secondary-background)',
                boxShadow: '0 0 4px rgba(0,0,0,0.25)',
                borderRadius: 'var(--radius-sm)',
                minWidth: 237,
              }}>
                {/* User info */}
                <div style={{
                  display: 'flex', gap: 10, alignItems: 'center',
                  padding: 16,
                  borderBottom: '1px solid var(--color-primary-grey)',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: '#df126c',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <span style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para)', fontWeight: 'var(--font-weight-bold)', color: 'white' }}>SJ</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para)', fontWeight: 'var(--font-weight-semibold)', color: '#565962', margin: 0 }}>
                      Dr. Stevenson, Jennifer
                    </p>
                    <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para-sm)', color: '#565962', margin: 0 }}>
                      Providers
                    </p>
                  </div>
                </div>
                {/* Menu items */}
                {['My Profile', 'Logout'].map((item, i) => (
                  <div key={item} style={{
                    padding: '10px 16px',
                    background: state === 'Hover' && i === 0 ? 'rgba(38,49,84,0.1)' : 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--color-primary-grey)',
                    outline: state === 'Focused' && i === 0 ? '2px solid rgba(10,117,147,0.3)' : 'none',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-family-base)',
                      fontSize: 'var(--font-size-para)',
                      color: 'var(--color-secondary-2)',
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionBlock>
  );
}

```

## src/app/components/designsystem/InputSection.tsx
```tsx
import { Input, Textarea } from '../Input';
import { SectionBlock } from './SectionBlock';

function GroupLabel({ children }: { children: string }) {
  return (
    <span style={{
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-para-sm)',
      fontWeight: 'var(--font-weight-semibold)',
      color: 'var(--color-secondary-text)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.06em',
    }}>
      {children}
    </span>
  );
}

const COL_W = 240;
const ROW_LABEL_W = 90;
const cellPad: React.CSSProperties = { padding: 'var(--space-4)', verticalAlign: 'top' };

export function InputSection() {
  return (
    <SectionBlock title="Inputs">

      {/* ── Single-line input states ── */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        Input — States
      </p>

      <div style={{ overflowX: 'auto', marginBottom: 'var(--space-8)' }}>
        <table style={{ borderCollapse: 'collapse', minWidth: 700 }}>
          <thead>
            <tr>
              <th style={{ width: ROW_LABEL_W, ...cellPad, textAlign: 'left' }} />
              <th style={{ width: COL_W, ...cellPad, textAlign: 'left' }}><GroupLabel>Default</GroupLabel></th>
              <th style={{ width: COL_W, ...cellPad, textAlign: 'left' }}><GroupLabel>Focused</GroupLabel></th>
              <th style={{ width: COL_W, ...cellPad, textAlign: 'left' }}><GroupLabel>Error</GroupLabel></th>
              <th style={{ width: COL_W, ...cellPad, textAlign: 'left' }}><GroupLabel>Disabled</GroupLabel></th>
            </tr>
          </thead>
          <tbody>
            {/* With label */}
            <tr style={{ borderTop: '1px solid var(--color-primary-grey)' }}>
              <td style={{ ...cellPad, paddingTop: 'var(--space-5)' }}>
                <GroupLabel>With label</GroupLabel>
              </td>
              <td style={cellPad}>
                <Input
                  label="Label"
                  placeholder="Hint Text"
                  state="default"
                  style={{ width: 200 }}
                />
              </td>
              <td style={cellPad}>
                {/* autoFocus to demonstrate focus state */}
                <Input
                  label="Label"
                  placeholder="Hint Text"
                  state="default"
                  defaultValue="Focused"
                  style={{ width: 200 }}
                />
              </td>
              <td style={cellPad}>
                <Input
                  label="Label"
                  placeholder="Hint Text"
                  state="error"
                  defaultValue="Error value"
                  errorMessage="Sample error message"
                  style={{ width: 200 }}
                />
              </td>
              <td style={cellPad}>
                <Input
                  label="Label"
                  placeholder="Hint Text"
                  state="disabled"
                  style={{ width: 200 }}
                />
              </td>
            </tr>

            {/* Without label */}
            <tr style={{ borderTop: '1px solid var(--color-primary-grey)' }}>
              <td style={{ ...cellPad, paddingTop: 'var(--space-5)' }}>
                <GroupLabel>No label</GroupLabel>
              </td>
              <td style={cellPad}>
                <Input placeholder="Hint Text" state="default" style={{ width: 200 }} />
              </td>
              <td style={cellPad}>
                <Input placeholder="Hint Text" state="default" defaultValue="Focused" style={{ width: 200 }} />
              </td>
              <td style={cellPad}>
                <Input
                  placeholder="Hint Text"
                  state="error"
                  defaultValue="Error value"
                  errorMessage="Sample error message"
                  style={{ width: 200 }}
                />
              </td>
              <td style={cellPad}>
                <Input placeholder="Hint Text" state="disabled" style={{ width: 200 }} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Trailing icons ── */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        Input — Trailing Icons
      </p>

      <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
        <Input
          label="Dropdown"
          placeholder="Hint Text"
          trailingIcon="dropdown"
          style={{ width: 240 }}
        />
        <Input
          label="Number Stepper"
          placeholder="Hint Text"
          trailingIcon="stepper"
          style={{ width: 240 }}
        />
        <Input
          label="Password"
          placeholder="Hint Text"
          type="password"
          trailingIcon="eye"
          defaultValue="secret123"
          style={{ width: 240 }}
        />
      </div>

      {/* ── Textarea states ── */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        Textarea — States
      </p>

      <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
        <Textarea
          label="Default"
          placeholder="Hint text for Textarea"
          state="default"
          style={{ width: 320 }}
        />
        <Textarea
          label="Focused"
          defaultValue="To reset password, please enter the email you have used to register."
          state="default"
          style={{ width: 320 }}
        />
        <Textarea
          label="Disabled"
          placeholder="Hint text for Textarea"
          state="disabled"
          style={{ width: 320 }}
        />
        <Textarea
          label="Error"
          defaultValue="To reset password, please enter the email you have used to register."
          state="error"
          errorMessage="Sample error message"
          style={{ width: 320 }}
        />
      </div>

    </SectionBlock>
  );
}

```

## src/app/components/designsystem/RadioSection.tsx
```tsx
import { Radio } from '../Radio';
import type { RadioState } from '../Radio';
import { SectionBlock } from './SectionBlock';

function GroupLabel({ children }: { children: string }) {
  return (
    <span style={{
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-para-sm)',
      fontWeight: 'var(--font-weight-semibold)',
      color: 'var(--color-secondary-text)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.06em',
    }}>
      {children}
    </span>
  );
}

const STATES: { id: RadioState; label: string }[] = [
  { id: 'default',  label: 'Default'  },
  { id: 'hovered',  label: 'Hovered'  },
  { id: 'focused',  label: 'Focused'  },
  { id: 'disabled', label: 'Disabled' },
  { id: 'error',    label: 'Error'    },
];

const cellPad: React.CSSProperties = { padding: 'var(--space-4)', verticalAlign: 'middle' };

export function RadioSection() {
  return (
    <SectionBlock title="Radio">

      {/* Interactive examples */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        Interactive
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
        <Radio label="Option A" name="demo" />
        <Radio label="Option B" name="demo" />
        <Radio label="Option C" name="demo" />
      </div>

      {/* States matrix */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        States
      </p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', minWidth: 550 }}>
          <thead>
            <tr>
              <th style={{ width: 110, ...cellPad, textAlign: 'left' }} />
              {STATES.map(s => (
                <th key={s.id} style={{ width: 130, ...cellPad, textAlign: 'left' }}>
                  <GroupLabel>{s.label}</GroupLabel>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: 'Unselected', checked: false },
              { label: 'Selected',   checked: true  },
            ].map(row => (
              <tr key={row.label} style={{ borderTop: '1px solid var(--color-primary-grey)' }}>
                <td style={{ ...cellPad }}><GroupLabel>{row.label}</GroupLabel></td>
                {STATES.map(s => (
                  <td key={s.id} style={{ ...cellPad }}>
                    <Radio
                      label="Label"
                      checked={row.checked}
                      state={s.id}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionBlock>
  );
}

```

## src/app/components/designsystem/SectionBlock.tsx
```tsx
import type { ReactNode } from 'react';

interface SectionBlockProps {
  title: string;
  children: ReactNode;
}

export function SectionBlock({ title, children }: SectionBlockProps) {
  return (
    <section style={{ marginBottom: 'var(--space-12)' }}>
      <h2 style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-h2)',
        fontWeight: 'var(--font-weight-bold)',
        color: 'var(--color-primary-text)',
        margin: '0 0 var(--space-4) 0',
        lineHeight: 1,
      }}>
        {title}
      </h2>
      <hr style={{
        border: 'none',
        borderTop: '1px solid var(--color-primary-grey)',
        margin: '0 0 var(--space-6) 0',
      }} />
      {children}
    </section>
  );
}

```

## src/app/components/designsystem/SideNavSection.tsx
```tsx
import { useState } from 'react';
import { SideNav, MEMBER_PORTAL_NAV_ITEMS } from '../SideNav';
import { SectionBlock } from './SectionBlock';

function GroupLabel({ children }: { children: string }) {
  return (
    <span style={{
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-para-sm)',
      fontWeight: 'var(--font-weight-semibold)',
      color: 'var(--color-secondary-text)',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.06em',
    }}>
      {children}
    </span>
  );
}

const NAV_HEIGHT = 480;

export function SideNavSection() {
  const [activeId, setActiveId] = useState('home');

  return (
    <SectionBlock title="Side Navigation">

      {/* Orientation: Collapsed vs Expanded */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <GroupLabel>Orientation — Collapsed &amp; Expanded</GroupLabel>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* Collapsed */}
          <div>
            <p style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-para-sm)',
              color: 'var(--color-secondary-text)',
              margin: '0 0 var(--space-2) 0',
            }}>
              Collapsed (80px)
            </p>
            <div style={{
              border: '1px solid var(--color-primary-grey)',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              height: NAV_HEIGHT,
            }}>
              <SideNav
                collapsed={true}
                activeId="home"
              />
            </div>
          </div>

          {/* Expanded */}
          <div>
            <p style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-para-sm)',
              color: 'var(--color-secondary-text)',
              margin: '0 0 var(--space-2) 0',
            }}>
              Expanded (240px)
            </p>
            <div style={{
              border: '1px solid var(--color-primary-grey)',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              height: NAV_HEIGHT,
            }}>
              <SideNav
                collapsed={false}
                activeId="id-cards"
              />
            </div>
          </div>
        </div>
      </div>

      {/* States */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <GroupLabel>States — Default, Active, Hover</GroupLabel>
        </div>
        <p style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-para-sm)',
          color: 'var(--color-secondary-text)',
          margin: '0 0 var(--space-3) 0',
        }}>
          Each item shows: default (outline icon, transparent bg), active (filled icon, dark overlay + left accent bar), hover (outline icon, lighter overlay on mouse-over). The active left border uses <code style={{ background: 'var(--color-tertiary-background)', padding: '1px 4px', borderRadius: 2 }}>--color-primary-2</code>.
        </p>
        <div style={{
          border: '1px solid var(--color-primary-grey)',
          borderRadius: 'var(--radius-sm)',
          overflow: 'hidden',
          display: 'inline-block',
        }}>
          <SideNav
            collapsed={false}
            activeId={activeId}
            onItemClick={setActiveId}
          />
        </div>
        <p style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-para-sm)',
          color: 'var(--color-secondary-text)',
          marginTop: 'var(--space-2)',
        }}>
          ↑ Interactive — click items to change active state
        </p>
      </div>

      {/* Nav items list */}
      <div>
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <GroupLabel>Member Portal Navigation Items</GroupLabel>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', minWidth: 400 }}>
            <thead>
              <tr>
                {['ID', 'Label', 'Default Icon', 'Active Icon'].map(h => (
                  <th key={h} style={{
                    padding: 'var(--space-3) var(--space-4)',
                    textAlign: 'left',
                    borderBottom: '1px solid var(--color-primary-grey)',
                  }}>
                    <GroupLabel>{h}</GroupLabel>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MEMBER_PORTAL_NAV_ITEMS.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--color-primary-grey)' }}>
                  <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                    <code style={{
                      fontFamily: 'monospace', fontSize: 'var(--font-size-para-sm)',
                      background: 'var(--color-tertiary-background)',
                      padding: '2px 6px', borderRadius: 2,
                      color: 'var(--color-primary-text)',
                    }}>
                      {item.id}
                    </code>
                  </td>
                  <td style={{
                    padding: 'var(--space-3) var(--space-4)',
                    fontFamily: 'var(--font-family-base)',
                    fontSize: 'var(--font-size-para)',
                    color: 'var(--color-primary-text)',
                  }}>
                    {item.label}
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                    <div style={{
                      width: 42, height: 42,
                      background: 'var(--color-primary-1)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {item.iconDefault}
                    </div>
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                    <div style={{
                      width: 42, height: 42,
                      background: 'var(--color-primary-1)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {item.iconActive}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </SectionBlock>
  );
}
```

## src/app/components/designsystem/SpacingSection.tsx
```tsx
import { SectionBlock } from './SectionBlock';

const SPACING_TOKENS = [
  { token: '--space-1',  px: '4px' },
  { token: '--space-2',  px: '8px' },
  { token: '--space-3',  px: '12px' },
  { token: '--space-4',  px: '16px' },
  { token: '--space-5',  px: '20px' },
  { token: '--space-6',  px: '24px' },
  { token: '--space-8',  px: '32px' },
  { token: '--space-10', px: '40px' },
];

export function SpacingSection() {
  return (
    <SectionBlock title="Spacing">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {SPACING_TOKENS.map((item, i) => (
          <div
            key={item.token}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-6)',
              padding: 'var(--space-3) 0',
              borderBottom: i < SPACING_TOKENS.length - 1 ? '1px solid var(--color-primary-grey)' : 'none',
            }}
          >
            {/* Token name */}
            <span style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-para-sm)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-primary-text)',
              width: 90,
              flexShrink: 0,
            }}>
              {item.token}
            </span>

            {/* Bar — width equals the token value */}
            <div style={{
              width: `var(${item.token})`,
              height: 8,
              background: 'var(--color-primary-2)',
              borderRadius: '2px',
              flexShrink: 0,
            }} />

            {/* Pixel value */}
            <span style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-para-sm)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-secondary-text)',
            }}>
              {item.px}
            </span>
          </div>
        ))}
      </div>
    </SectionBlock>
  );
}

```

## src/app/components/designsystem/TypographySection.tsx
```tsx
import { SectionBlock } from './SectionBlock';

interface TypeStyle {
  name: string;
  fontSize: string;
  fontWeight: string;
  textTransform: 'none' | 'uppercase';
  color?: string;
}

const TYPE_STYLES: TypeStyle[] = [
  { name: 'H1 Bold',                fontSize: 'var(--font-size-h1)',      fontWeight: 'var(--font-weight-bold)',     textTransform: 'none' },
  { name: 'H2 Bold',                fontSize: 'var(--font-size-h2)',      fontWeight: 'var(--font-weight-bold)',     textTransform: 'none' },
  { name: 'H3 Bold',                fontSize: 'var(--font-size-h3)',      fontWeight: 'var(--font-weight-bold)',     textTransform: 'none' },
  { name: 'H4 Bold',                fontSize: 'var(--font-size-h4)',      fontWeight: 'var(--font-weight-bold)',     textTransform: 'none' },
  { name: 'H5 Bold',                fontSize: 'var(--font-size-h5)',      fontWeight: 'var(--font-weight-bold)',     textTransform: 'none' },
  { name: 'Paragraph Large Regular', fontSize: 'var(--font-size-para-lg)', fontWeight: 'var(--font-weight-regular)', textTransform: 'none' },
  { name: 'Paragraph Regular',      fontSize: 'var(--font-size-para)',    fontWeight: 'var(--font-weight-regular)', textTransform: 'none' },
  { name: 'Paragraph Small Regular', fontSize: 'var(--font-size-para-sm)', fontWeight: 'var(--font-weight-regular)', textTransform: 'none' },
  { name: 'Link Bold',              fontSize: 'var(--font-size-link)',    fontWeight: 'var(--font-weight-bold)',     textTransform: 'none', color: 'var(--color-secondary-2)' },
  { name: 'Button',                 fontSize: 'var(--font-size-btn)',     fontWeight: 'var(--font-weight-regular)', textTransform: 'uppercase' },
  { name: 'Small Button',           fontSize: 'var(--font-size-btn-sm)',  fontWeight: 'var(--font-weight-regular)', textTransform: 'uppercase' },
];

export function TypographySection() {
  return (
    <SectionBlock title="Typography">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {TYPE_STYLES.map((style, i) => (
          <div
            key={style.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-6)',
              padding: 'var(--space-4) 0',
              borderBottom: i < TYPE_STYLES.length - 1 ? '1px solid var(--color-primary-grey)' : 'none',
            }}
          >
            {/* Style label — Paragraph Small SemiBold, 120px wide */}
            <span style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-para-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-secondary-text)',
              width: 120,
              flexShrink: 0,
              lineHeight: 1.4,
            }}>
              {style.name}
            </span>

            {/* Live sample */}
            <span style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: style.fontSize,
              fontWeight: style.fontWeight,
              textTransform: style.textTransform,
              color: style.color ?? 'var(--color-primary-text)',
              lineHeight: 1,
            }}>
              The quick brown fox
            </span>
          </div>
        ))}
      </div>
    </SectionBlock>
  );
}

```

## src/imports/AlertsToasts-1/index.tsx
```tsx
import svgPaths from "./svg-iv1k41yeb6";

function Header() {
  return (
    <div className="[word-break:break-word] absolute bg-[#82479d] content-stretch drop-shadow-[0px_8px_8px_rgba(0,0,0,0.15)] flex font-['Open_Sans:Light',sans-serif] font-light items-center justify-between left-0 px-[117px] py-[16px] right-0 text-white top-0 whitespace-nowrap" data-name="header">
      <p className="leading-[0] relative shrink-0 text-[36px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        <span className="leading-[normal]">{`Javelina `}</span>
        <span className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Design System
        </span>
      </p>
      <p className="leading-[normal] relative shrink-0 text-[20px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Inputs
      </p>
      <p className="leading-[normal] relative shrink-0 text-[20px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Version 2.0
      </p>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 flex h-[13.8px] items-center justify-center ml-0 mt-0 relative row-1 w-[14px]">
        <div className="flex-none rotate-[44.48deg] skew-x-[-0.35deg]">
          <div className="bg-[#999] h-[3.04px] relative w-[16.618px]" />
        </div>
      </div>
      <div className="col-1 flex h-[13.915px] items-center justify-center ml-[0.06px] mt-[0.09px] relative row-1 w-[13.885px]">
        <div className="flex-none rotate-[134.83deg] skew-x-[0.35deg]">
          <div className="bg-[#999] h-[3.04px] relative w-[16.617px]" />
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[106px] items-center justify-center relative shrink-0 w-[607px]">
      <div className="bg-[#e9fff3] content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] relative shrink-0 w-[445px]" data-name="Alerts/toasts">
        <div aria-hidden className="absolute border border-[#007e33] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[20px]" data-name="icon 20x20">
          <div className="relative shrink-0 size-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p19807400} fill="var(--fill-0, #007E33)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative self-stretch shrink-0 text-[#007e33] text-[14px] w-[324px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Registration Setup has been changed successfully
        </p>
        <div className="absolute content-stretch flex items-center justify-center px-[4px] py-[3px] right-[14px] size-[20px] top-[8px]" data-name="icon 20x20">
          <Group />
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 flex h-[13.8px] items-center justify-center ml-0 mt-0 relative row-1 w-[14px]">
        <div className="flex-none rotate-[44.48deg] skew-x-[-0.35deg]">
          <div className="bg-[#999] h-[3.04px] relative w-[16.618px]" />
        </div>
      </div>
      <div className="col-1 flex h-[13.915px] items-center justify-center ml-[0.06px] mt-[0.09px] relative row-1 w-[13.885px]">
        <div className="flex-none rotate-[134.83deg] skew-x-[0.35deg]">
          <div className="bg-[#999] h-[3.04px] relative w-[16.617px]" />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px relative self-stretch text-[#007e33] text-[14px]">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 w-[337px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        A Request Completed Successfully.
      </p>
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal min-w-full relative shrink-0 w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Registration Setup has been changed successfully
      </p>
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 flex h-[13.8px] items-center justify-center ml-0 mt-0 relative row-1 w-[14px]">
        <div className="flex-none rotate-[44.48deg] skew-x-[-0.35deg]">
          <div className="bg-[#999] h-[3.04px] relative w-[16.618px]" />
        </div>
      </div>
      <div className="col-1 flex h-[13.915px] items-center justify-center ml-[0.06px] mt-[0.09px] relative row-1 w-[13.885px]">
        <div className="flex-none rotate-[134.83deg] skew-x-[0.35deg]">
          <div className="bg-[#999] h-[3.04px] relative w-[16.617px]" />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px relative self-stretch text-[#007e33] text-[14px]">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 w-[337px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        A Request Completed Successfully.
      </p>
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal min-w-full relative shrink-0 w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Registration Setup has been changed successfully
      </p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0">
      <div className="bg-[#e9fff3] content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] relative shrink-0 w-[445px]" data-name="Alerts/toasts">
        <div aria-hidden className="absolute border border-[#007e33] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[20px]" data-name="icon 20x20">
          <div className="relative shrink-0 size-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p19807400} fill="var(--fill-0, #007E33)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative self-stretch shrink-0 text-[#007e33] text-[14px] w-[324px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Registration Setup has been changed successfully
        </p>
        <div className="absolute content-stretch flex items-center justify-center px-[4px] py-[3px] right-[14px] size-[20px] top-[8px]" data-name="icon 20x20">
          <Group1 />
        </div>
      </div>
      <div className="bg-[#e9fff3] content-stretch flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] relative shrink-0 w-[445px]" data-name="Alerts/toasts">
        <div aria-hidden className="absolute border border-[#007e33] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[20px]" data-name="icon 20x20">
          <div className="relative shrink-0 size-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p19807400} fill="var(--fill-0, #007E33)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative self-stretch shrink-0 text-[#007e33] text-[14px] w-[324px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Registration Setup has been changed successfully
        </p>
      </div>
      <div className="bg-[#e9fff3] content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] relative shrink-0 w-[445px]" data-name="Alerts/toasts">
        <div aria-hidden className="absolute border border-[#007e33] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[20px]" data-name="icon 20x20">
          <div className="relative shrink-0 size-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p19807400} fill="var(--fill-0, #007E33)" id="Vector" />
            </svg>
          </div>
        </div>
        <Frame />
        <div className="absolute content-stretch flex items-center justify-center px-[4px] py-[3px] right-[14px] size-[20px] top-[8px]" data-name="icon 20x20">
          <Group2 />
        </div>
      </div>
      <div className="bg-[#e9fff3] content-stretch flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] relative shrink-0 w-[445px]" data-name="Alerts/toasts">
        <div aria-hidden className="absolute border border-[#007e33] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[20px]" data-name="icon 20x20">
          <div className="relative shrink-0 size-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p19807400} fill="var(--fill-0, #007E33)" id="Vector" />
            </svg>
          </div>
        </div>
        <Frame1 />
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[297px] items-center justify-center relative shrink-0 w-[629px]">
      <Frame13 />
    </div>
  );
}

function Group3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 flex h-[13.8px] items-center justify-center ml-0 mt-0 relative row-1 w-[14px]">
        <div className="flex-none rotate-[44.48deg] skew-x-[-0.35deg]">
          <div className="bg-[#999] h-[3.04px] relative w-[16.618px]" />
        </div>
      </div>
      <div className="col-1 flex h-[13.915px] items-center justify-center ml-[0.06px] mt-[0.09px] relative row-1 w-[13.885px]">
        <div className="flex-none rotate-[134.83deg] skew-x-[0.35deg]">
          <div className="bg-[#999] h-[3.04px] relative w-[16.617px]" />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px relative self-stretch text-[#007e33] text-[14px]">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 w-[337px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        A Request Completed Successfully.
      </p>
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal min-w-full relative shrink-0 w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Registration Setup has been changed successfully
      </p>
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 flex h-[13.8px] items-center justify-center ml-0 mt-0 relative row-1 w-[14px]">
        <div className="flex-none rotate-[44.48deg] skew-x-[-0.35deg]">
          <div className="bg-[#999] h-[3.04px] relative w-[16.618px]" />
        </div>
      </div>
      <div className="col-1 flex h-[13.915px] items-center justify-center ml-[0.06px] mt-[0.09px] relative row-1 w-[13.885px]">
        <div className="flex-none rotate-[134.83deg] skew-x-[0.35deg]">
          <div className="bg-[#999] h-[3.04px] relative w-[16.617px]" />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px relative self-stretch text-[#007e33] text-[14px]">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 w-[337px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        A Request Completed Successfully.
      </p>
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal min-w-full relative shrink-0 w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Registration Setup has been changed successfully
      </p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0">
      <div className="bg-[#e9fff3] content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] relative shrink-0 w-[445px]" data-name="Alerts/toasts">
        <div aria-hidden className="absolute border border-[#007e33] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[20px]" data-name="icon 20x20">
          <div className="relative shrink-0 size-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p19807400} fill="var(--fill-0, #007E33)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative self-stretch shrink-0 text-[#007e33] text-[14px] w-[324px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Registration Setup has been changed successfully
        </p>
        <div className="absolute content-stretch flex items-center justify-center px-[4px] py-[3px] right-[14px] size-[20px] top-[8px]" data-name="icon 20x20">
          <Group3 />
        </div>
      </div>
      <div className="bg-[#e9fff3] content-stretch flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] relative shrink-0 w-[445px]" data-name="Alerts/toasts">
        <div aria-hidden className="absolute border border-[#007e33] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[20px]" data-name="icon 20x20">
          <div className="relative shrink-0 size-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p19807400} fill="var(--fill-0, #007E33)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative self-stretch shrink-0 text-[#007e33] text-[14px] w-[324px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Registration Setup has been changed successfully
        </p>
      </div>
      <div className="bg-[#e9fff3] content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] relative shrink-0 w-[445px]" data-name="Alerts/toasts">
        <div aria-hidden className="absolute border border-[#007e33] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[20px]" data-name="icon 20x20">
          <div className="relative shrink-0 size-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p19807400} fill="var(--fill-0, #007E33)" id="Vector" />
            </svg>
          </div>
        </div>
        <Frame2 />
        <div className="absolute content-stretch flex items-center justify-center px-[4px] py-[3px] right-[14px] size-[20px] top-[8px]" data-name="icon 20x20">
          <Group4 />
        </div>
      </div>
      <div className="bg-[#e9fff3] content-stretch flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] relative shrink-0 w-[445px]" data-name="Alerts/toasts">
        <div aria-hidden className="absolute border border-[#007e33] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[20px]" data-name="icon 20x20">
          <div className="relative shrink-0 size-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p19807400} fill="var(--fill-0, #007E33)" id="Vector" />
            </svg>
          </div>
        </div>
        <Frame3 />
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[297px] items-center justify-center relative shrink-0 w-[629px]">
      <Frame15 />
    </div>
  );
}

function Group5() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 flex h-[13.8px] items-center justify-center ml-0 mt-0 relative row-1 w-[14px]">
        <div className="flex-none rotate-[44.48deg] skew-x-[-0.35deg]">
          <div className="bg-[#999] h-[3.04px] relative w-[16.618px]" />
        </div>
      </div>
      <div className="col-1 flex h-[13.915px] items-center justify-center ml-[0.06px] mt-[0.09px] relative row-1 w-[13.885px]">
        <div className="flex-none rotate-[134.83deg] skew-x-[0.35deg]">
          <div className="bg-[#999] h-[3.04px] relative w-[16.617px]" />
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px relative self-stretch text-[#a05600] text-[14px]">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 w-[337px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        A Request Completed Successfully.
      </p>
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal min-w-full relative shrink-0 w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Registration Setup has been changed successfully
      </p>
    </div>
  );
}

function Group6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 flex h-[13.8px] items-center justify-center ml-0 mt-0 relative row-1 w-[14px]">
        <div className="flex-none rotate-[44.48deg] skew-x-[-0.35deg]">
          <div className="bg-[#999] h-[3.04px] relative w-[16.618px]" />
        </div>
      </div>
      <div className="col-1 flex h-[13.915px] items-center justify-center ml-[0.06px] mt-[0.09px] relative row-1 w-[13.885px]">
        <div className="flex-none rotate-[134.83deg] skew-x-[0.35deg]">
          <div className="bg-[#999] h-[3.04px] relative w-[16.617px]" />
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px relative self-stretch text-[#a05600] text-[14px]">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 w-[337px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        A Request Completed Successfully.
      </p>
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal min-w-full relative shrink-0 w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Registration Setup has been changed successfully
      </p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0">
      <div className="bg-[#fff2e3] content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] relative shrink-0 w-[445px]" data-name="Alerts/toasts">
        <div aria-hidden className="absolute border border-[#a05600] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[20px]" data-name="icon 20x20">
          <div className="h-[14px] relative shrink-0 w-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 14">
              <path d={svgPaths.p1180e700} fill="var(--fill-0, #A05600)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative self-stretch shrink-0 text-[#a05600] text-[14px] w-[324px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Registration Setup has been changed successfully
        </p>
        <div className="absolute content-stretch flex items-center justify-center px-[4px] py-[3px] right-[14px] size-[20px] top-[8px]" data-name="icon 20x20">
          <Group5 />
        </div>
      </div>
      <div className="bg-[#fff2e3] content-stretch flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] relative shrink-0 w-[445px]" data-name="Alerts/toasts">
        <div aria-hidden className="absolute border border-[#a05600] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[20px]" data-name="icon 20x20">
          <div className="h-[14px] relative shrink-0 w-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 14">
              <path d={svgPaths.p1180e700} fill="var(--fill-0, #A05600)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative self-stretch shrink-0 text-[#a05600] text-[14px] w-[324px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Registration Setup has been changed successfully
        </p>
      </div>
      <div className="bg-[#fff2e3] content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] relative shrink-0 w-[445px]" data-name="Alerts/toasts">
        <div aria-hidden className="absolute border border-[#a05600] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[20px]" data-name="icon 20x20">
          <div className="h-[14px] relative shrink-0 w-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 14">
              <path d={svgPaths.p1180e700} fill="var(--fill-0, #A05600)" id="Vector" />
            </svg>
          </div>
        </div>
        <Frame4 />
        <div className="absolute content-stretch flex items-center justify-center px-[4px] py-[3px] right-[14px] size-[20px] top-[8px]" data-name="icon 20x20">
          <Group6 />
        </div>
      </div>
      <div className="bg-[#fff2e3] content-stretch flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] relative shrink-0 w-[445px]" data-name="Alerts/toasts">
        <div aria-hidden className="absolute border border-[#a05600] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[20px]" data-name="icon 20x20">
          <div className="h-[14px] relative shrink-0 w-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 14">
              <path d={svgPaths.p1180e700} fill="var(--fill-0, #A05600)" id="Vector" />
            </svg>
          </div>
        </div>
        <Frame5 />
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[297px] items-center justify-center relative shrink-0 w-[629px]">
      <Frame17 />
    </div>
  );
}

function Group7() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 flex h-[13.8px] items-center justify-center ml-0 mt-0 relative row-1 w-[14px]">
        <div className="flex-none rotate-[44.48deg] skew-x-[-0.35deg]">
          <div className="bg-[#999] h-[3.04px] relative w-[16.618px]" />
        </div>
      </div>
      <div className="col-1 flex h-[13.915px] items-center justify-center ml-[0.06px] mt-[0.09px] relative row-1 w-[13.885px]">
        <div className="flex-none rotate-[134.83deg] skew-x-[0.35deg]">
          <div className="bg-[#999] h-[3.04px] relative w-[16.617px]" />
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px relative self-stretch text-[#c00] text-[14px]">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 w-[337px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        A Request Completed Successfully.
      </p>
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal min-w-full relative shrink-0 w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Registration Setup has been changed successfully
      </p>
    </div>
  );
}

function Group8() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 flex h-[13.8px] items-center justify-center ml-0 mt-0 relative row-1 w-[14px]">
        <div className="flex-none rotate-[44.48deg] skew-x-[-0.35deg]">
          <div className="bg-[#999] h-[3.04px] relative w-[16.618px]" />
        </div>
      </div>
      <div className="col-1 flex h-[13.915px] items-center justify-center ml-[0.06px] mt-[0.09px] relative row-1 w-[13.885px]">
        <div className="flex-none rotate-[134.83deg] skew-x-[0.35deg]">
          <div className="bg-[#999] h-[3.04px] relative w-[16.617px]" />
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px relative self-stretch text-[#c00] text-[14px]">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 w-[337px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        A Request Completed Successfully.
      </p>
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal min-w-full relative shrink-0 w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Registration Setup has been changed successfully
      </p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0">
      <div className="bg-[#ffecec] content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] relative shrink-0 w-[445px]" data-name="Alerts/toasts">
        <div aria-hidden className="absolute border border-[#c00] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[20px]" data-name="icon 20x20">
          <div className="relative shrink-0 size-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.pa4eed00} fill="var(--fill-0, #CC0000)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative self-stretch shrink-0 text-[#c00] text-[14px] w-[324px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Registration Setup has been changed successfully
        </p>
        <div className="absolute content-stretch flex items-center justify-center px-[4px] py-[3px] right-[14px] size-[20px] top-[8px]" data-name="icon 20x20">
          <Group7 />
        </div>
      </div>
      <div className="bg-[#ffecec] content-stretch flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] relative shrink-0 w-[445px]" data-name="Alerts/toasts">
        <div aria-hidden className="absolute border border-[#c00] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[20px]" data-name="icon 20x20">
          <div className="relative shrink-0 size-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.pa4eed00} fill="var(--fill-0, #CC0000)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative self-stretch shrink-0 text-[#c00] text-[14px] w-[324px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Registration Setup has been changed successfully
        </p>
      </div>
      <div className="bg-[#ffecec] content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] relative shrink-0 w-[445px]" data-name="Alerts/toasts">
        <div aria-hidden className="absolute border border-[#c00] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[20px]" data-name="icon 20x20">
          <div className="relative shrink-0 size-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.pa4eed00} fill="var(--fill-0, #CC0000)" id="Vector" />
            </svg>
          </div>
        </div>
        <Frame6 />
        <div className="absolute content-stretch flex items-center justify-center px-[4px] py-[3px] right-[14px] size-[20px] top-[8px]" data-name="icon 20x20">
          <Group8 />
        </div>
      </div>
      <div className="bg-[#ffecec] content-stretch flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] relative shrink-0 w-[445px]" data-name="Alerts/toasts">
        <div aria-hidden className="absolute border border-[#c00] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[20px]" data-name="icon 20x20">
          <div className="relative shrink-0 size-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.pa4eed00} fill="var(--fill-0, #CC0000)" id="Vector" />
            </svg>
          </div>
        </div>
        <Frame7 />
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[297px] items-center justify-center relative shrink-0 w-[629px]">
      <Frame19 />
    </div>
  );
}

function Group9() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 flex h-[13.8px] items-center justify-center ml-0 mt-0 relative row-1 w-[14px]">
        <div className="flex-none rotate-[44.48deg] skew-x-[-0.35deg]">
          <div className="bg-[#999] h-[3.04px] relative w-[16.618px]" />
        </div>
      </div>
      <div className="col-1 flex h-[13.915px] items-center justify-center ml-[0.06px] mt-[0.09px] relative row-1 w-[13.885px]">
        <div className="flex-none rotate-[134.83deg] skew-x-[0.35deg]">
          <div className="bg-[#999] h-[3.04px] relative w-[16.617px]" />
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px relative self-stretch text-[#0a7593] text-[14px]">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 w-[337px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        A Request Completed Successfully.
      </p>
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal min-w-full relative shrink-0 w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Registration Setup has been changed successfully
      </p>
    </div>
  );
}

function Group10() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 flex h-[13.8px] items-center justify-center ml-0 mt-0 relative row-1 w-[14px]">
        <div className="flex-none rotate-[44.48deg] skew-x-[-0.35deg]">
          <div className="bg-[#999] h-[3.04px] relative w-[16.618px]" />
        </div>
      </div>
      <div className="col-1 flex h-[13.915px] items-center justify-center ml-[0.06px] mt-[0.09px] relative row-1 w-[13.885px]">
        <div className="flex-none rotate-[134.83deg] skew-x-[0.35deg]">
          <div className="bg-[#999] h-[3.04px] relative w-[16.617px]" />
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px relative self-stretch text-[#0a7593] text-[14px]">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 w-[337px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        A Request Completed Successfully.
      </p>
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal min-w-full relative shrink-0 w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Registration Setup has been changed successfully
      </p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0">
      <div className="bg-[#f0fbff] content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] relative shrink-0 w-[445px]" data-name="Alerts/toasts">
        <div aria-hidden className="absolute border border-[#0a7593] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[20px]" data-name="icon 20x20">
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <div className="relative size-[16px]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p147c2c00} fill="var(--fill-0, #0A7593)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative self-stretch shrink-0 text-[#0a7593] text-[14px] w-[324px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Registration Setup has been changed successfully
        </p>
        <div className="absolute content-stretch flex items-center justify-center px-[4px] py-[3px] right-[14px] size-[20px] top-[8px]" data-name="icon 20x20">
          <Group9 />
        </div>
      </div>
      <div className="bg-[#f0fbff] content-stretch flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] relative shrink-0 w-[445px]" data-name="Alerts/toasts">
        <div aria-hidden className="absolute border border-[#0a7593] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[20px]" data-name="icon 20x20">
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <div className="relative size-[16px]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p147c2c00} fill="var(--fill-0, #0A7593)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative self-stretch shrink-0 text-[#0a7593] text-[14px] w-[324px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Registration Setup has been changed successfully
        </p>
      </div>
      <div className="bg-[#f0fbff] content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)] flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] relative shrink-0 w-[445px]" data-name="Alerts/toasts">
        <div aria-hidden className="absolute border border-[#0a7593] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[20px]" data-name="icon 20x20">
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <div className="relative size-[16px]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p147c2c00} fill="var(--fill-0, #0A7593)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <Frame8 />
        <div className="absolute content-stretch flex items-center justify-center px-[4px] py-[3px] right-[14px] size-[20px] top-[8px]" data-name="icon 20x20">
          <Group10 />
        </div>
      </div>
      <div className="bg-[#f0fbff] content-stretch flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] relative shrink-0 w-[445px]" data-name="Alerts/toasts">
        <div aria-hidden className="absolute border border-[#0a7593] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[20px]" data-name="icon 20x20">
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <div className="relative size-[16px]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p147c2c00} fill="var(--fill-0, #0A7593)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <Frame9 />
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[297px] items-center justify-center relative shrink-0 w-[629px]">
      <Frame21 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[2173px] items-start left-[114px] top-[126px]">
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Alerts/Toasts
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Alerts display a status update, reflecting a user or system action.
      </p>
      <Frame12 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] w-[245px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Variations
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Alerts have four core types — basic, with Multiple line, Floating and In-Page
      </p>
      <Frame11 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] w-[314px]" style={{ fontVariationSettings: '"wdth" 100' }}>{`Emphasis & Status`}</p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Alerts can have a bold or subtle emphasis. Alerts offer the following messaging status — Success, Information, warning, or error.
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Success
      </p>
      <Frame14 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Warning
      </p>
      <Frame16 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Error
      </p>
      <Frame18 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Information
      </p>
      <Frame20 />
    </div>
  );
}

export default function AlertsToasts() {
  return (
    <div className="bg-white relative size-full" data-name="Alerts-Toasts">
      <Header />
      <Frame10 />
    </div>
  );
}
```

## src/imports/AlertsToasts-1/svg-iv1k41yeb6.ts
```ts
export default {
p1180e700: "M7.95833 0.000777169C7.80855 0.00749195 7.66291 0.0516676 7.53491 0.129205C7.4069 0.206742 7.30068 0.315127 7.2261 0.444316L0.118106 12.6754C0.0403508 12.81 -0.000380657 12.9626 2.68098e-06 13.1177C0.000386019 13.2729 0.0418707 13.4253 0.12029 13.5595C0.19871 13.6937 0.311303 13.8051 0.446763 13.8824C0.582222 13.9597 0.735778 14.0003 0.892008 14H15.108C15.2642 14.0003 15.4178 13.9597 15.5532 13.8824C15.6887 13.8051 15.8013 13.6937 15.8797 13.5595C15.9581 13.4253 15.9996 13.2729 16 13.1177C16.0004 12.9626 15.9597 12.81 15.8819 12.6754L8.76795 0.444316C8.68682 0.30384 8.56841 0.188194 8.42564 0.10998C8.28288 0.031766 8.12123 -0.00601026 7.95833 0.000777169V0.000777169ZM8 3.88944C8.42084 3.88944 8.762 4.23765 8.762 4.66718L8.5715 8.16699C8.5715 8.48912 8.31563 8.75029 8 8.75029C7.68437 8.75029 7.4285 8.48912 7.4285 8.16699L7.238 4.66718C7.238 4.23765 7.57916 3.88944 8 3.88944ZM8 9.72245C8.52605 9.72245 8.95249 10.1577 8.95249 10.6946C8.95249 11.2315 8.52605 11.6668 8 11.6668C7.47395 11.6668 7.04751 11.2315 7.04751 10.6946C7.04751 10.1577 7.47395 9.72245 8 9.72245Z",
p147c2c00: "M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346626 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0V0ZM8 12.5C7.80222 12.5 7.60888 12.4413 7.44443 12.3315C7.27998 12.2216 7.15181 12.0654 7.07612 11.8827C7.00043 11.7 6.98063 11.4989 7.01922 11.3049C7.0578 11.1109 7.15304 10.9327 7.2929 10.7929C7.43275 10.653 7.61093 10.5578 7.80491 10.5192C7.99889 10.4806 8.19996 10.5004 8.38269 10.5761C8.56541 10.6518 8.72159 10.78 8.83147 10.9444C8.94135 11.1089 9 11.3022 9 11.5C9 11.7652 8.89464 12.0196 8.70711 12.2071C8.51957 12.3946 8.26522 12.5 8 12.5ZM9 9H7V3.5H9V9Z",
p19807400: "M8 0C3.58333 0 0 3.58333 0 8C0 12.4167 3.58333 16 8 16C12.4167 16 16 12.4167 16 8C16 3.58333 12.4167 0 8 0ZM12.1167 6.06667L7.41667 10.7833C7.26667 10.9333 7.05 11.0333 6.83333 11.0333C6.61667 11.0333 6.4 10.95 6.25 10.7833L3.88333 8.41667C3.55 8.08333 3.55 7.56667 3.88333 7.23333C4.21667 6.9 4.73333 6.9 5.06667 7.23333L6.83333 9L10.95 4.88333C11.2833 4.55 11.8 4.55 12.1333 4.88333C12.45 5.21667 12.45 5.73333 12.1167 6.06667Z",
pa4eed00: "M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346626 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0ZM8 12.5C7.80222 12.5 7.60888 12.4413 7.44443 12.3315C7.27998 12.2216 7.15181 12.0654 7.07612 11.8827C7.00043 11.7 6.98063 11.4989 7.01922 11.3049C7.0578 11.1109 7.15304 10.9327 7.29289 10.7929C7.43275 10.653 7.61093 10.5578 7.80491 10.5192C7.99889 10.4806 8.19996 10.5004 8.38269 10.5761C8.56541 10.6518 8.72159 10.78 8.83147 10.9444C8.94135 11.1089 9 11.3022 9 11.5C9 11.7652 8.89464 12.0196 8.70711 12.2071C8.51957 12.3946 8.26522 12.5 8 12.5ZM9 9H7V3.5H9V9Z",
}

```

## src/imports/AlertsToasts/index.tsx
```tsx
import svgPaths from "./svg-p1t2lt1k6m";
type AlertsToastsProps = {
  className?: string;
  indication?: "Success" | "Error" | "Warning" | "Info";
  multiline?: boolean;
  type?: "Floating" | "In-Page";
};

export default function AlertsToasts({ className, indication = "Success", multiline = false, type = "Floating" }: AlertsToastsProps) {
  const isError = indication === "Error";
  const isInfo = indication === "Info";
  const isWarning = indication === "Warning";
  return (
    <div className={className || `content-stretch flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] relative w-[445px] ${indication === "Info" && type === "In-Page" ? "bg-[#f0fbff]" : indication === "Info" && type === "Floating" ? "bg-[#f0fbff] drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)]" : indication === "Warning" && type === "In-Page" ? "bg-[#fff2e3]" : indication === "Warning" && type === "Floating" ? "bg-[#fff2e3] drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)]" : indication === "Error" && type === "In-Page" ? "bg-[#ffecec]" : indication === "Error" && type === "Floating" ? "bg-[#ffecec] drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)]" : indication === "Success" && type === "In-Page" ? "bg-[#e9fff3]" : "bg-[#e9fff3] drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)]"}`}>
      <div aria-hidden className={`absolute border border-solid inset-0 pointer-events-none ${isInfo ? "border-[#0a7593]" : isWarning ? "border-[#a05600]" : isError ? "border-[#c00]" : "border-[#007e33]"}`} />
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[20px]" data-name="icon 20x20">
        {["Success", "Error", "Warning"].includes(indication) && (
          <div className={`relative shrink-0 ${isWarning ? "h-[14px] w-[16px]" : "size-[16px]"}`} data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox={isWarning ? "0 0 16 14" : "0 0 16 16"}>
              <path d={isWarning ? svgPaths.p1180e700 : isError ? svgPaths.pa4eed00 : svgPaths.p19807400} fill={isWarning ? "var(--fill-0, #A05600)" : isError ? "var(--fill-0, #CC0000)" : "var(--fill-0, #007E33)"} id="Vector" />
            </svg>
          </div>
        )}
        {isInfo && (
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <div className="relative size-[16px]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p147c2c00} fill="var(--fill-0, #0A7593)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
      {!multiline && (
        <p className={`[word-break:break-word] font-["Open_Sans:Regular",sans-serif] font-normal leading-[normal] relative self-stretch shrink-0 text-[14px] w-[324px] ${indication === "Info" && !multiline ? "text-[#0a7593]" : indication === "Warning" && !multiline ? "text-[#a05600]" : indication === "Error" && !multiline ? "text-[#c00]" : "text-[#007e33]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
          Registration Setup has been changed successfully
        </p>
      )}
      {multiline && (
        <div className={`[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px relative self-stretch text-[14px] ${indication === "Info" && multiline ? "text-[#0a7593]" : indication === "Warning" && multiline ? "text-[#a05600]" : indication === "Error" && multiline ? "text-[#c00]" : "text-[#007e33]"}`}>
          <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 w-[337px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            A Request Completed Successfully.
          </p>
          <p className="font-['Open_Sans:Regular',sans-serif] font-normal min-w-full relative shrink-0 w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
            Registration Setup has been changed successfully
          </p>
        </div>
      )}
      {type === "Floating" && (
        <div className="absolute content-stretch flex items-center justify-center px-[4px] py-[3px] right-[14px] size-[20px] top-[8px]" data-name="icon 20x20">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
            <div className="col-1 flex h-[13.8px] items-center justify-center ml-0 mt-0 relative row-1 w-[14px]">
              <div className="flex-none rotate-[44.48deg] skew-x-[-0.35deg]">
                <div className="bg-[#999] h-[3.04px] relative w-[16.618px]" />
              </div>
            </div>
            <div className="col-1 flex h-[13.915px] items-center justify-center ml-[0.06px] mt-[0.09px] relative row-1 w-[13.885px]">
              <div className="flex-none rotate-[134.83deg] skew-x-[0.35deg]">
                <div className="bg-[#999] h-[3.04px] relative w-[16.617px]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

## src/imports/AlertsToasts/svg-p1t2lt1k6m.ts
```ts
export default {
p1180e700: "M7.95833 0.000777169C7.80855 0.00749195 7.66291 0.0516676 7.53491 0.129205C7.4069 0.206742 7.30068 0.315127 7.2261 0.444316L0.118106 12.6754C0.0403508 12.81 -0.000380657 12.9626 2.68098e-06 13.1177C0.000386019 13.2729 0.0418707 13.4253 0.12029 13.5595C0.19871 13.6937 0.311303 13.8051 0.446763 13.8824C0.582222 13.9597 0.735778 14.0003 0.892008 14H15.108C15.2642 14.0003 15.4178 13.9597 15.5532 13.8824C15.6887 13.8051 15.8013 13.6937 15.8797 13.5595C15.9581 13.4253 15.9996 13.2729 16 13.1177C16.0004 12.9626 15.9597 12.81 15.8819 12.6754L8.76795 0.444316C8.68682 0.30384 8.56841 0.188194 8.42564 0.10998C8.28288 0.031766 8.12123 -0.00601026 7.95833 0.000777169V0.000777169ZM8 3.88944C8.42084 3.88944 8.762 4.23765 8.762 4.66718L8.5715 8.16699C8.5715 8.48912 8.31563 8.75029 8 8.75029C7.68437 8.75029 7.4285 8.48912 7.4285 8.16699L7.238 4.66718C7.238 4.23765 7.57916 3.88944 8 3.88944ZM8 9.72245C8.52605 9.72245 8.95249 10.1577 8.95249 10.6946C8.95249 11.2315 8.52605 11.6668 8 11.6668C7.47395 11.6668 7.04751 11.2315 7.04751 10.6946C7.04751 10.1577 7.47395 9.72245 8 9.72245Z",
p147c2c00: "M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346626 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0V0ZM8 12.5C7.80222 12.5 7.60888 12.4413 7.44443 12.3315C7.27998 12.2216 7.15181 12.0654 7.07612 11.8827C7.00043 11.7 6.98063 11.4989 7.01922 11.3049C7.0578 11.1109 7.15304 10.9327 7.2929 10.7929C7.43275 10.653 7.61093 10.5578 7.80491 10.5192C7.99889 10.4806 8.19996 10.5004 8.38269 10.5761C8.56541 10.6518 8.72159 10.78 8.83147 10.9444C8.94135 11.1089 9 11.3022 9 11.5C9 11.7652 8.89464 12.0196 8.70711 12.2071C8.51957 12.3946 8.26522 12.5 8 12.5ZM9 9H7V3.5H9V9Z",
p19807400: "M8 0C3.58333 0 0 3.58333 0 8C0 12.4167 3.58333 16 8 16C12.4167 16 16 12.4167 16 8C16 3.58333 12.4167 0 8 0ZM12.1167 6.06667L7.41667 10.7833C7.26667 10.9333 7.05 11.0333 6.83333 11.0333C6.61667 11.0333 6.4 10.95 6.25 10.7833L3.88333 8.41667C3.55 8.08333 3.55 7.56667 3.88333 7.23333C4.21667 6.9 4.73333 6.9 5.06667 7.23333L6.83333 9L10.95 4.88333C11.2833 4.55 11.8 4.55 12.1333 4.88333C12.45 5.21667 12.45 5.73333 12.1167 6.06667Z",
pa4eed00: "M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346626 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0ZM8 12.5C7.80222 12.5 7.60888 12.4413 7.44443 12.3315C7.27998 12.2216 7.15181 12.0654 7.07612 11.8827C7.00043 11.7 6.98063 11.4989 7.01922 11.3049C7.0578 11.1109 7.15304 10.9327 7.29289 10.7929C7.43275 10.653 7.61093 10.5578 7.80491 10.5192C7.99889 10.4806 8.19996 10.5004 8.38269 10.5761C8.56541 10.6518 8.72159 10.78 8.83147 10.9444C8.94135 11.1089 9 11.3022 9 11.5C9 11.7652 8.89464 12.0196 8.70711 12.2071C8.51957 12.3946 8.26522 12.5 8 12.5ZM9 9H7V3.5H9V9Z",
}

```

## src/imports/Badge-1/index.tsx
```tsx
import svgPaths from "./svg-t0hylu1hsv";

function Header() {
  return (
    <div className="[word-break:break-word] absolute bg-[#82479d] content-stretch drop-shadow-[0px_8px_8px_rgba(0,0,0,0.15)] flex font-['Open_Sans:Light',sans-serif] font-light items-center justify-between left-0 px-[117px] py-[16px] right-0 text-white top-0 whitespace-nowrap" data-name="header">
      <p className="leading-[0] relative shrink-0 text-[36px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        <span className="leading-[normal]">{`Javelina `}</span>
        <span className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Design System
        </span>
      </p>
      <p className="leading-[normal] relative shrink-0 text-[20px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Inputs
      </p>
      <p className="leading-[normal] relative shrink-0 text-[20px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Version 2.0
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col gap-[10px] h-[106px] items-center justify-center relative shrink-0 w-[607px]">
      <div className="bg-[#ffecec] content-stretch flex gap-[8px] items-center justify-center pb-[5px] pt-[4px] px-[12px] relative rounded-[20px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#c00] border-solid inset-0 pointer-events-none rounded-[20px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="relative shrink-0 size-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p2ce08100} fill="var(--fill-0, #CC0000)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Red Indication
        </p>
      </div>
      <div className="bg-[#e9fff3] content-stretch flex gap-[8px] items-center justify-center pb-[5px] pt-[4px] px-[12px] relative rounded-[20px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#007e33] border-solid inset-0 pointer-events-none rounded-[20px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="relative shrink-0 size-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p19807400} fill="var(--fill-0, #007E33)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Green Indication
        </p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col gap-[10px] h-[106px] items-center justify-center relative shrink-0 w-[607px]">
      <div className="bg-[#ffecec] content-stretch flex gap-[8px] items-center justify-center pb-[5px] pt-[4px] px-[12px] relative rounded-[20px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#c00] border-solid inset-0 pointer-events-none rounded-[20px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="relative shrink-0 size-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p2ce08100} fill="var(--fill-0, #CC0000)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Red Indication
        </p>
      </div>
      <div className="bg-[#ffecec] content-stretch flex items-center justify-center pb-[5px] pt-[4px] px-[12px] relative rounded-[20px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#c00] border-solid inset-0 pointer-events-none rounded-[20px]" />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Red Indication
        </p>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-['Open_Sans:Regular',sans-serif] font-normal items-center justify-between leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[372px] whitespace-nowrap">
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Bold
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Subtle
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Minimal
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0">
      <div className="bg-[#e9fff3] content-stretch flex items-center justify-center pb-[5px] pt-[4px] px-[12px] relative rounded-[20px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#007e33] border-solid inset-0 pointer-events-none rounded-[20px]" />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Green Indication
        </p>
      </div>
      <div className="bg-[#ffecec] content-stretch flex items-center justify-center pb-[5px] pt-[4px] px-[12px] relative rounded-[20px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#c00] border-solid inset-0 pointer-events-none rounded-[20px]" />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Red Indication
        </p>
      </div>
      <div className="bg-[#f0fbff] content-stretch flex items-center justify-center px-[12px] py-[4px] relative rounded-[20px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#0a7593] border-solid inset-0 pointer-events-none rounded-[20px]" />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Blue Indication
        </p>
      </div>
      <div className="bg-[#fff2e3] content-stretch flex items-center justify-center pb-[5px] pt-[4px] px-[12px] relative rounded-[20px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#a05600] border-solid inset-0 pointer-events-none rounded-[20px]" />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Orange Indication
        </p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col h-[138px] items-start justify-between relative shrink-0">
      <div className="bg-[#e9fff3] content-stretch flex items-center justify-center px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Badge">
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#007e33] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Green Indication
        </p>
      </div>
      <div className="bg-[#ffecec] content-stretch flex items-center justify-center px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Badge">
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#c00] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Red Indication
        </p>
      </div>
      <div className="bg-[#f0fbff] content-stretch flex items-center justify-center px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Badge">
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#0a7593] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Blue Indication
        </p>
      </div>
      <div className="bg-[#fff2e3] content-stretch flex items-center justify-center px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Badge">
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#a05600] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Orange Indication
        </p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col h-[134px] items-start justify-between relative shrink-0">
      <div className="content-stretch flex items-center justify-center px-[6px] py-[2px] relative rounded-[12px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#007e33] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Green Indication
        </p>
      </div>
      <div className="content-stretch flex items-center justify-center px-[6px] py-[2px] relative rounded-[12px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#c00] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Red Indication
        </p>
      </div>
      <div className="content-stretch flex items-center justify-center px-[6px] py-[2px] relative rounded-[12px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#0a7593] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Blue Indication
        </p>
      </div>
      <div className="content-stretch flex items-center justify-center px-[6px] py-[2px] relative rounded-[12px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#a05600] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Orange Indication
        </p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[10px] items-start justify-center relative shrink-0">
      <Frame5 />
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col gap-[10px] h-[297px] items-center justify-center relative shrink-0 w-[629px]">
      <Frame7 />
      <Frame6 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0">
      <div className="bg-[#ffecec] content-stretch flex items-center justify-center pb-[5px] pt-[4px] px-[12px] relative rounded-[20px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#c00] border-solid inset-0 pointer-events-none rounded-[20px]" />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Red Indication
        </p>
      </div>
      <div className="bg-[#ffecec] content-stretch flex gap-[8px] items-center justify-center pb-[5px] pt-[4px] px-[12px] relative rounded-[20px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#c00] border-solid inset-0 pointer-events-none rounded-[20px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="relative shrink-0 size-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p2ce08100} fill="var(--fill-0, #CC0000)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Red Indication
        </p>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col h-[66px] items-start justify-between relative shrink-0">
      <div className="bg-[#ffecec] content-stretch flex items-center justify-center px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Badge">
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#c00] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Red Indication
        </p>
      </div>
      <div className="bg-[#ffecec] content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative rounded-[12px] shrink-0" data-name="Badge">
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="relative shrink-0 size-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p2ce08100} fill="var(--fill-0, #CC0000)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#c00] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Red Indication
        </p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col h-[61px] items-start justify-between relative shrink-0">
      <div className="content-stretch flex items-center justify-center px-[6px] py-[2px] relative rounded-[12px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#c00] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Red Indication
        </p>
      </div>
      <div className="content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] relative rounded-[12px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="relative shrink-0 size-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p2ce08100} fill="var(--fill-0, #CC0000)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#c00] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Red Indication
        </p>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[10px] items-start justify-center relative shrink-0">
      <Frame11 />
      <Frame12 />
      <Frame13 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[116px] items-center justify-center relative shrink-0 w-[629px]">
      <Frame10 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0">
      <div className="bg-[#fff2e3] content-stretch flex items-center justify-center pb-[5px] pt-[4px] px-[12px] relative rounded-[20px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#a05600] border-solid inset-0 pointer-events-none rounded-[20px]" />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Orange Indication
        </p>
      </div>
      <div className="bg-[#fff2e3] content-stretch flex gap-[8px] items-center justify-center pb-[5px] pt-[4px] px-[12px] relative rounded-[20px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#a05600] border-solid inset-0 pointer-events-none rounded-[20px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="h-[14px] relative shrink-0 w-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 14">
              <path d={svgPaths.p1180e700} fill="var(--fill-0, #A05600)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Orange Indication
        </p>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col h-[66px] items-start justify-between relative shrink-0">
      <div className="bg-[#fff2e3] content-stretch flex items-center justify-center px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Badge">
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#a05600] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Orange Indication
        </p>
      </div>
      <div className="bg-[#fff2e3] content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative rounded-[12px] shrink-0" data-name="Badge">
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="h-[14px] relative shrink-0 w-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 14">
              <path d={svgPaths.p1180e700} fill="var(--fill-0, #A05600)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#a05600] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Orange Indication
        </p>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col h-[61px] items-start justify-between relative shrink-0">
      <div className="content-stretch flex items-center justify-center px-[6px] py-[2px] relative rounded-[12px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#a05600] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Orange Indication
        </p>
      </div>
      <div className="content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] relative rounded-[12px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="h-[14px] relative shrink-0 w-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 14">
              <path d={svgPaths.p1180e700} fill="var(--fill-0, #A05600)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#a05600] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Orange Indication
        </p>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[10px] items-start justify-center relative shrink-0">
      <Frame16 />
      <Frame17 />
      <Frame18 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[116px] items-center justify-center relative shrink-0 w-[629px]">
      <Frame15 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0">
      <div className="bg-[#f0fbff] content-stretch flex items-center justify-center px-[12px] py-[4px] relative rounded-[20px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#0a7593] border-solid inset-0 pointer-events-none rounded-[20px]" />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Blue Indication
        </p>
      </div>
      <div className="bg-[#f0fbff] content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[4px] relative rounded-[20px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#0a7593] border-solid inset-0 pointer-events-none rounded-[20px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <div className="relative size-[16px]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p147c2c00} fill="var(--fill-0, #0A7593)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Blue Indication
        </p>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-col h-[66px] items-start justify-between relative shrink-0">
      <div className="bg-[#f0fbff] content-stretch flex items-center justify-center px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Badge">
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#0a7593] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Blue Indication
        </p>
      </div>
      <div className="bg-[#f0fbff] content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative rounded-[12px] shrink-0" data-name="Badge">
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <div className="relative size-[16px]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p147c2c00} fill="var(--fill-0, #0A7593)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#0a7593] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Blue Indication
        </p>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col h-[61px] items-start justify-between relative shrink-0">
      <div className="content-stretch flex items-center justify-center px-[6px] py-[2px] relative rounded-[12px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#0a7593] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Blue Indication
        </p>
      </div>
      <div className="content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] relative rounded-[12px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <div className="relative size-[16px]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p147c2c00} fill="var(--fill-0, #0A7593)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#0a7593] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Blue Indication
        </p>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex gap-[10px] items-start justify-center relative shrink-0">
      <Frame21 />
      <Frame22 />
      <Frame23 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[116px] items-center justify-center relative shrink-0 w-[629px]">
      <Frame20 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0">
      <div className="bg-[#e9fff3] content-stretch flex items-center justify-center pb-[5px] pt-[4px] px-[12px] relative rounded-[20px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#007e33] border-solid inset-0 pointer-events-none rounded-[20px]" />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Green Indication
        </p>
      </div>
      <div className="bg-[#e9fff3] content-stretch flex gap-[8px] items-center justify-center pb-[5px] pt-[4px] px-[12px] relative rounded-[20px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#007e33] border-solid inset-0 pointer-events-none rounded-[20px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="relative shrink-0 size-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p19807400} fill="var(--fill-0, #007E33)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Green Indication
        </p>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col h-[66px] items-start justify-between relative shrink-0">
      <div className="bg-[#e9fff3] content-stretch flex items-center justify-center px-[12px] py-[4px] relative rounded-[12px] shrink-0" data-name="Badge">
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#007e33] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Green Indication
        </p>
      </div>
      <div className="bg-[#e9fff3] content-stretch flex gap-[4px] items-center justify-center px-[8px] py-[4px] relative rounded-[12px] shrink-0" data-name="Badge">
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="relative shrink-0 size-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p19807400} fill="var(--fill-0, #007E33)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#007e33] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Green Indication
        </p>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col h-[61px] items-start justify-between relative shrink-0">
      <div className="content-stretch flex items-center justify-center px-[6px] py-[2px] relative rounded-[12px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#007e33] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Green Indication
        </p>
      </div>
      <div className="content-stretch flex gap-[4px] items-center justify-center px-[6px] py-[2px] relative rounded-[12px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#e7e7e7] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="relative shrink-0 size-[16px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p19807400} fill="var(--fill-0, #007E33)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#007e33] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Green Indication
        </p>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex gap-[10px] items-start justify-center relative shrink-0">
      <Frame26 />
      <Frame27 />
      <Frame28 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[116px] items-center justify-center relative shrink-0 w-[629px]">
      <Frame25 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[1700px] items-start left-[107px] top-[133px]">
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Badge
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        A badge is a highly visual way to draw attention to content.
      </p>
      <Frame1 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] w-[314px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Variations
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Badge has two display options — With Icons and without icons
      </p>
      <Frame4 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] w-[314px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Emphasis
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Badge has three types of emphasis — bold, subtle, or outlined, with bold being the default.
      </p>
      <Frame2 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] w-[314px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Colors/Status
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Badge has four display options to indicate status — error, warning, information, success.
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Red/Error
      </p>
      <Frame3 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Orange/Warning
      </p>
      <Frame14 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Blue/Information
      </p>
      <Frame19 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Green/Success
      </p>
      <Frame24 />
    </div>
  );
}

export default function Badge() {
  return (
    <div className="bg-white relative size-full" data-name="Badge">
      <Header />
      <Frame />
    </div>
  );
}
```

## src/imports/Badge-1/svg-t0hylu1hsv.ts
```ts
export default {
p1180e700: "M7.95833 0.000777169C7.80855 0.00749195 7.66291 0.0516676 7.53491 0.129205C7.4069 0.206742 7.30068 0.315127 7.2261 0.444316L0.118106 12.6754C0.0403508 12.81 -0.000380657 12.9626 2.68098e-06 13.1177C0.000386019 13.2729 0.0418707 13.4253 0.12029 13.5595C0.19871 13.6937 0.311303 13.8051 0.446763 13.8824C0.582222 13.9597 0.735778 14.0003 0.892008 14H15.108C15.2642 14.0003 15.4178 13.9597 15.5532 13.8824C15.6887 13.8051 15.8013 13.6937 15.8797 13.5595C15.9581 13.4253 15.9996 13.2729 16 13.1177C16.0004 12.9626 15.9597 12.81 15.8819 12.6754L8.76795 0.444316C8.68682 0.30384 8.56841 0.188194 8.42564 0.10998C8.28288 0.031766 8.12123 -0.00601026 7.95833 0.000777169V0.000777169ZM8 3.88944C8.42084 3.88944 8.762 4.23765 8.762 4.66718L8.5715 8.16699C8.5715 8.48912 8.31563 8.75029 8 8.75029C7.68437 8.75029 7.4285 8.48912 7.4285 8.16699L7.238 4.66718C7.238 4.23765 7.57916 3.88944 8 3.88944ZM8 9.72245C8.52605 9.72245 8.95249 10.1577 8.95249 10.6946C8.95249 11.2315 8.52605 11.6668 8 11.6668C7.47395 11.6668 7.04751 11.2315 7.04751 10.6946C7.04751 10.1577 7.47395 9.72245 8 9.72245Z",
p147c2c00: "M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346626 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0V0ZM8 12.5C7.80222 12.5 7.60888 12.4413 7.44443 12.3315C7.27998 12.2216 7.15181 12.0654 7.07612 11.8827C7.00043 11.7 6.98063 11.4989 7.01922 11.3049C7.0578 11.1109 7.15304 10.9327 7.2929 10.7929C7.43275 10.653 7.61093 10.5578 7.80491 10.5192C7.99889 10.4806 8.19996 10.5004 8.38269 10.5761C8.56541 10.6518 8.72159 10.78 8.83147 10.9444C8.94135 11.1089 9 11.3022 9 11.5C9 11.7652 8.89464 12.0196 8.70711 12.2071C8.51957 12.3946 8.26522 12.5 8 12.5ZM9 9H7V3.5H9V9Z",
p19807400: "M8 0C3.58333 0 0 3.58333 0 8C0 12.4167 3.58333 16 8 16C12.4167 16 16 12.4167 16 8C16 3.58333 12.4167 0 8 0ZM12.1167 6.06667L7.41667 10.7833C7.26667 10.9333 7.05 11.0333 6.83333 11.0333C6.61667 11.0333 6.4 10.95 6.25 10.7833L3.88333 8.41667C3.55 8.08333 3.55 7.56667 3.88333 7.23333C4.21667 6.9 4.73333 6.9 5.06667 7.23333L6.83333 9L10.95 4.88333C11.2833 4.55 11.8 4.55 12.1333 4.88333C12.45 5.21667 12.45 5.73333 12.1167 6.06667Z",
p2ce08100: "M8 0C3.58214 0 0 3.58214 0 8C0 12.4179 3.58214 16 8 16C12.4179 16 16 12.4179 16 8C16 3.58214 12.4179 0 8 0ZM10.9536 11.0393L9.775 11.0339L8 8.91786L6.22679 11.0321L5.04643 11.0375C4.96786 11.0375 4.90357 10.975 4.90357 10.8946C4.90357 10.8607 4.91607 10.8286 4.9375 10.8018L7.26071 8.03393L4.9375 5.26786C4.91592 5.24169 4.90395 5.20892 4.90357 5.175C4.90357 5.09643 4.96786 5.03214 5.04643 5.03214L6.22679 5.0375L8 7.15357L9.77321 5.03929L10.9518 5.03393C11.0304 5.03393 11.0946 5.09643 11.0946 5.17679C11.0946 5.21071 11.0821 5.24286 11.0607 5.26964L8.74107 8.03572L11.0625 10.8036C11.0839 10.8304 11.0964 10.8625 11.0964 10.8964C11.0964 10.975 11.0321 11.0393 10.9536 11.0393Z",
}

```

## src/imports/Badge/index.tsx
```tsx
import svgPaths from "./svg-mu4a9k8nju";
type BadgeProps = {
  className?: string;
  emphasisColors?: "Bold" | "Subtle" | "Minimal";
  indication?: "Green/Success" | "Blue/Information" | "Orange/Warning" | "Red/Error";
  withIcon?: boolean;
};

export default function Badge({ className, emphasisColors = "Bold", indication = "Green/Success", withIcon = false }: BadgeProps) {
  const isBlueInformationAndWithIcon = indication === "Blue/Information" && withIcon;
  const isGreenSuccessAndNotWithIconAndIsSubtleOrMinimal = indication === "Green/Success" && !withIcon && ["Subtle", "Minimal"].includes(emphasisColors);
  const isOrangeWarningAndWithIcon = indication === "Orange/Warning" && withIcon;
  const isRedErrorAndWithIcon = indication === "Red/Error" && withIcon;
  const isWithIcon = withIcon;
  return (
    <div className={className || `content-stretch flex items-center justify-center relative ${emphasisColors === "Minimal" && withIcon ? "gap-[4px] px-[6px] py-[2px] rounded-[12px]" : emphasisColors === "Minimal" && !withIcon ? "px-[6px] py-[2px] rounded-[12px]" : indication === "Blue/Information" && emphasisColors === "Subtle" && withIcon ? "bg-[#f0fbff] gap-[4px] px-[8px] py-[4px] rounded-[12px]" : indication === "Blue/Information" && emphasisColors === "Subtle" && !withIcon ? "bg-[#f0fbff] px-[12px] py-[4px] rounded-[12px]" : indication === "Orange/Warning" && emphasisColors === "Subtle" && withIcon ? "bg-[#fff2e3] gap-[4px] px-[8px] py-[4px] rounded-[12px]" : indication === "Orange/Warning" && emphasisColors === "Subtle" && !withIcon ? "bg-[#fff2e3] px-[12px] py-[4px] rounded-[12px]" : indication === "Red/Error" && emphasisColors === "Subtle" && withIcon ? "bg-[#ffecec] gap-[4px] px-[8px] py-[4px] rounded-[12px]" : indication === "Red/Error" && emphasisColors === "Subtle" && !withIcon ? "bg-[#ffecec] px-[12px] py-[4px] rounded-[12px]" : indication === "Green/Success" && emphasisColors === "Subtle" && withIcon ? "bg-[#e9fff3] gap-[4px] px-[8px] py-[4px] rounded-[12px]" : indication === "Green/Success" && emphasisColors === "Subtle" && !withIcon ? "bg-[#e9fff3] px-[12px] py-[4px] rounded-[12px]" : indication === "Blue/Information" && emphasisColors === "Bold" && withIcon ? "bg-[#f0fbff] gap-[8px] px-[12px] py-[4px] rounded-[20px]" : indication === "Blue/Information" && emphasisColors === "Bold" && !withIcon ? "bg-[#f0fbff] px-[12px] py-[4px] rounded-[20px]" : indication === "Orange/Warning" && emphasisColors === "Bold" && withIcon ? "bg-[#fff2e3] gap-[8px] pb-[5px] pt-[4px] px-[12px] rounded-[20px]" : indication === "Orange/Warning" && emphasisColors === "Bold" && !withIcon ? "bg-[#fff2e3] pb-[5px] pt-[4px] px-[12px] rounded-[20px]" : indication === "Red/Error" && emphasisColors === "Bold" && withIcon ? "bg-[#ffecec] gap-[8px] pb-[5px] pt-[4px] px-[12px] rounded-[20px]" : indication === "Red/Error" && emphasisColors === "Bold" && !withIcon ? "bg-[#ffecec] pb-[5px] pt-[4px] px-[12px] rounded-[20px]" : indication === "Green/Success" && emphasisColors === "Bold" && withIcon ? "bg-[#e9fff3] gap-[8px] pb-[5px] pt-[4px] px-[12px] rounded-[20px]" : "bg-[#e9fff3] pb-[5px] pt-[4px] px-[12px] rounded-[20px]"}`}>
      {["Bold", "Minimal"].includes(emphasisColors) && <div aria-hidden className={`absolute border border-solid inset-0 pointer-events-none ${emphasisColors === "Minimal" ? "border-[#e7e7e7] rounded-[12px]" : indication === "Blue/Information" && emphasisColors === "Bold" ? "border-[#0a7593] rounded-[20px]" : indication === "Orange/Warning" && emphasisColors === "Bold" ? "border-[#a05600] rounded-[20px]" : indication === "Red/Error" && emphasisColors === "Bold" ? "border-[#c00] rounded-[20px]" : "border-[#007e33] rounded-[20px]"}`} />}
      {!withIcon && (
        <p className={`[word-break:break-word] leading-[normal] relative shrink-0 whitespace-nowrap ${indication === "Blue/Information" && !withIcon && ["Subtle", "Minimal"].includes(emphasisColors) ? 'font-["Open_Sans:SemiBold",sans-serif] font-semibold text-[#0a7593] text-[12px] uppercase' : indication === "Orange/Warning" && !withIcon && ["Subtle", "Minimal"].includes(emphasisColors) ? 'font-["Open_Sans:SemiBold",sans-serif] font-semibold text-[#a05600] text-[12px] uppercase' : indication === "Red/Error" && !withIcon && ["Subtle", "Minimal"].includes(emphasisColors) ? 'font-["Open_Sans:SemiBold",sans-serif] font-semibold text-[#c00] text-[12px] uppercase' : isGreenSuccessAndNotWithIconAndIsSubtleOrMinimal ? 'font-["Open_Sans:SemiBold",sans-serif] font-semibold text-[#007e33] text-[12px] uppercase' : 'font-["Open_Sans:Regular",sans-serif] font-normal text-[#263154] text-[14px]'}`} style={{ fontVariationSettings: '"wdth" 100' }}>
          {indication === "Blue/Information" && !withIcon ? "Blue Indication" : indication === "Orange/Warning" && !withIcon ? "Orange Indication" : indication === "Red/Error" && !withIcon ? "Red Indication" : isGreenSuccessAndNotWithIconAndIsSubtleOrMinimal ? "Green Indication" : "Green Indication"}
        </p>
      )}
      {isWithIcon && (
        <>
          <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
            {withIcon && ["Green/Success", "Red/Error", "Orange/Warning"].includes(indication) && (
              <div className={`relative shrink-0 ${isOrangeWarningAndWithIcon ? "h-[14px] w-[16px]" : "size-[16px]"}`} data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox={isOrangeWarningAndWithIcon ? "0 0 16 14" : "0 0 16 16"}>
                  <path d={isOrangeWarningAndWithIcon ? svgPaths.p1180e700 : isRedErrorAndWithIcon ? svgPaths.p2ce08100 : svgPaths.p19807400} fill={isOrangeWarningAndWithIcon ? "var(--fill-0, #A05600)" : isRedErrorAndWithIcon ? "var(--fill-0, #CC0000)" : "var(--fill-0, #007E33)"} id="Vector" />
                </svg>
              </div>
            )}
            {isBlueInformationAndWithIcon && (
              <div className="flex items-center justify-center relative shrink-0">
                <div className="flex-none rotate-180">
                  <div className="relative size-[16px]" data-name="Vector">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <path d={svgPaths.p147c2c00} fill="var(--fill-0, #0A7593)" id="Vector" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
          <p className={`[word-break:break-word] leading-[normal] relative shrink-0 whitespace-nowrap ${indication === "Blue/Information" && withIcon && ["Subtle", "Minimal"].includes(emphasisColors) ? 'font-["Open_Sans:SemiBold",sans-serif] font-semibold text-[#0a7593] text-[12px] uppercase' : indication === "Orange/Warning" && withIcon && ["Subtle", "Minimal"].includes(emphasisColors) ? 'font-["Open_Sans:SemiBold",sans-serif] font-semibold text-[#a05600] text-[12px] uppercase' : indication === "Red/Error" && withIcon && ["Subtle", "Minimal"].includes(emphasisColors) ? 'font-["Open_Sans:SemiBold",sans-serif] font-semibold text-[#c00] text-[12px] uppercase' : indication === "Green/Success" && withIcon && ["Subtle", "Minimal"].includes(emphasisColors) ? 'font-["Open_Sans:SemiBold",sans-serif] font-semibold text-[#007e33] text-[12px] uppercase' : 'font-["Open_Sans:Regular",sans-serif] font-normal text-[#263154] text-[14px]'}`} style={{ fontVariationSettings: '"wdth" 100' }}>
            {isBlueInformationAndWithIcon ? "Blue Indication" : isOrangeWarningAndWithIcon ? "Orange Indication" : isRedErrorAndWithIcon ? "Red Indication" : indication === "Green/Success" && withIcon ? "Green Indication" : ""}
          </p>
        </>
      )}
    </div>
  );
}
```

## src/imports/Badge/svg-mu4a9k8nju.ts
```ts
export default {
p1180e700: "M7.95833 0.000777169C7.80855 0.00749195 7.66291 0.0516676 7.53491 0.129205C7.4069 0.206742 7.30068 0.315127 7.2261 0.444316L0.118106 12.6754C0.0403508 12.81 -0.000380657 12.9626 2.68098e-06 13.1177C0.000386019 13.2729 0.0418707 13.4253 0.12029 13.5595C0.19871 13.6937 0.311303 13.8051 0.446763 13.8824C0.582222 13.9597 0.735778 14.0003 0.892008 14H15.108C15.2642 14.0003 15.4178 13.9597 15.5532 13.8824C15.6887 13.8051 15.8013 13.6937 15.8797 13.5595C15.9581 13.4253 15.9996 13.2729 16 13.1177C16.0004 12.9626 15.9597 12.81 15.8819 12.6754L8.76795 0.444316C8.68682 0.30384 8.56841 0.188194 8.42564 0.10998C8.28288 0.031766 8.12123 -0.00601026 7.95833 0.000777169V0.000777169ZM8 3.88944C8.42084 3.88944 8.762 4.23765 8.762 4.66718L8.5715 8.16699C8.5715 8.48912 8.31563 8.75029 8 8.75029C7.68437 8.75029 7.4285 8.48912 7.4285 8.16699L7.238 4.66718C7.238 4.23765 7.57916 3.88944 8 3.88944ZM8 9.72245C8.52605 9.72245 8.95249 10.1577 8.95249 10.6946C8.95249 11.2315 8.52605 11.6668 8 11.6668C7.47395 11.6668 7.04751 11.2315 7.04751 10.6946C7.04751 10.1577 7.47395 9.72245 8 9.72245Z",
p147c2c00: "M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346626 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0V0ZM8 12.5C7.80222 12.5 7.60888 12.4413 7.44443 12.3315C7.27998 12.2216 7.15181 12.0654 7.07612 11.8827C7.00043 11.7 6.98063 11.4989 7.01922 11.3049C7.0578 11.1109 7.15304 10.9327 7.2929 10.7929C7.43275 10.653 7.61093 10.5578 7.80491 10.5192C7.99889 10.4806 8.19996 10.5004 8.38269 10.5761C8.56541 10.6518 8.72159 10.78 8.83147 10.9444C8.94135 11.1089 9 11.3022 9 11.5C9 11.7652 8.89464 12.0196 8.70711 12.2071C8.51957 12.3946 8.26522 12.5 8 12.5ZM9 9H7V3.5H9V9Z",
p19807400: "M8 0C3.58333 0 0 3.58333 0 8C0 12.4167 3.58333 16 8 16C12.4167 16 16 12.4167 16 8C16 3.58333 12.4167 0 8 0ZM12.1167 6.06667L7.41667 10.7833C7.26667 10.9333 7.05 11.0333 6.83333 11.0333C6.61667 11.0333 6.4 10.95 6.25 10.7833L3.88333 8.41667C3.55 8.08333 3.55 7.56667 3.88333 7.23333C4.21667 6.9 4.73333 6.9 5.06667 7.23333L6.83333 9L10.95 4.88333C11.2833 4.55 11.8 4.55 12.1333 4.88333C12.45 5.21667 12.45 5.73333 12.1167 6.06667Z",
p2ce08100: "M8 0C3.58214 0 0 3.58214 0 8C0 12.4179 3.58214 16 8 16C12.4179 16 16 12.4179 16 8C16 3.58214 12.4179 0 8 0ZM10.9536 11.0393L9.775 11.0339L8 8.91786L6.22679 11.0321L5.04643 11.0375C4.96786 11.0375 4.90357 10.975 4.90357 10.8946C4.90357 10.8607 4.91607 10.8286 4.9375 10.8018L7.26071 8.03393L4.9375 5.26786C4.91592 5.24169 4.90395 5.20892 4.90357 5.175C4.90357 5.09643 4.96786 5.03214 5.04643 5.03214L6.22679 5.0375L8 7.15357L9.77321 5.03929L10.9518 5.03393C11.0304 5.03393 11.0946 5.09643 11.0946 5.17679C11.0946 5.21071 11.0821 5.24286 11.0607 5.26964L8.74107 8.03572L11.0625 10.8036C11.0839 10.8304 11.0964 10.8625 11.0964 10.8964C11.0964 10.975 11.0321 11.0393 10.9536 11.0393Z",
}

```

## src/imports/Button/index.tsx
```tsx
import svgPaths from "./svg-eiwquzlhof";

function Header() {
  return (
    <div className="[word-break:break-word] absolute bg-[#82479d] content-stretch drop-shadow-[0px_8px_8px_rgba(0,0,0,0.15)] flex font-['Open_Sans:Light',sans-serif] font-light items-center justify-between left-0 px-[117px] py-[16px] right-0 text-white top-0 whitespace-nowrap" data-name="header">
      <p className="leading-[0] relative shrink-0 text-[36px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        <span className="leading-[normal]">{`Javelina `}</span>
        <span className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal]" style={{ fontVariationSettings: '"wdth" 100' }}>{`Design System `}</span>
      </p>
      <p className="leading-[normal] relative shrink-0 text-[20px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Buttons
      </p>
      <p className="leading-[normal] relative shrink-0 text-[20px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Version 2.0
      </p>
    </div>
  );
}

function Frame45() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[106px] items-center justify-center relative shrink-0 w-[387px]">
      <div className="bg-[#60034c] content-stretch flex flex-col items-start px-[40px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-center text-white uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Button
        </p>
      </div>
    </div>
  );
}

function Frame36() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[106px] items-center justify-center relative shrink-0 w-[387px]">
      <div className="bg-[#60034c] content-stretch flex flex-col items-start px-[40px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-center text-white uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Button
        </p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
        <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
            <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-white uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Button
      </p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="bg-[#60034c] content-stretch flex items-start px-[24px] py-[12px] relative rounded-bl-[4px] rounded-tl-[4px] shrink-0">
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-center text-white uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Button
      </p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="bg-[#60034c] relative rounded-br-[4px] rounded-tr-[4px] self-stretch shrink-0">
      <div className="content-stretch flex items-start p-[12px] relative size-full">
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="h-[3px] relative shrink-0 w-[6px]">
            <div className="absolute inset-[-11.79%_-5.89%_-23.57%_-5.89%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.70711 4.06066">
                <path d={svgPaths.p1fd2af40} id="Vector 8" stroke="var(--stroke-0, white)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-start flex flex-wrap gap-[20px] items-start relative shrink-0">
      <div className="bg-[#60034c] content-stretch flex flex-col items-start p-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border border-[#60034c] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
          <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
              <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#60034c] content-stretch flex flex-col items-start px-[40px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-center text-white uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Button
        </p>
      </div>
      <div className="bg-[#60034c] content-stretch flex flex-col items-start px-[30px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <Frame />
      </div>
      <div className="content-stretch flex gap-px items-start relative rounded-[5px] shrink-0" data-name="Button">
        <Frame15 />
        <Frame16 />
      </div>
    </div>
  );
}

function Frame37() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[106px] items-center justify-center relative shrink-0 w-[690px]">
      <Frame17 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-start flex flex-wrap gap-[20px] items-start relative shrink-0">
      <div className="bg-[#60034c] content-stretch flex flex-col items-start px-[40px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-center text-white uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Button
        </p>
      </div>
      <div className="content-stretch flex flex-col items-start px-[40px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border border-[#60034c] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#60034c] text-[14px] text-center uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Button
        </p>
      </div>
      <div className="content-stretch flex flex-col items-start px-[40px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#0a7593] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Link
        </p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
        <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
            <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-white uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Button
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
        <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
            <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, #60034C)" fillRule="evenodd" id="Shape" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#60034c] text-[14px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Button
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
        <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
            <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, #0A7593)" fillRule="evenodd" id="Shape" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#0a7593] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Link
      </p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-start flex flex-wrap gap-[20px] items-start relative shrink-0 w-[449px]">
      <div className="bg-[#60034c] content-stretch flex flex-col items-start px-[30px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <Frame1 />
      </div>
      <div className="content-stretch flex flex-col items-start px-[30px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border border-[#60034c] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <Frame2 />
      </div>
      <div className="content-stretch flex flex-col items-start px-[30px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <Frame3 />
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="bg-[#60034c] content-stretch flex items-start px-[24px] py-[12px] relative rounded-bl-[4px] rounded-tl-[4px] shrink-0">
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-center text-white uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Button
      </p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="bg-[#60034c] relative rounded-br-[4px] rounded-tr-[4px] self-stretch shrink-0">
      <div className="content-stretch flex items-start p-[12px] relative size-full">
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="h-[3px] relative shrink-0 w-[6px]">
            <div className="absolute inset-[-11.79%_-5.89%_-23.57%_-5.89%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.70711 4.06066">
                <path d={svgPaths.p1fd2af40} id="Vector 8" stroke="var(--stroke-0, white)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex items-start px-[24px] py-[12px] relative rounded-bl-[4px] rounded-tl-[4px] shrink-0">
      <div aria-hidden className="absolute border border-[#60034c] border-solid inset-0 pointer-events-none rounded-bl-[4px] rounded-tl-[4px]" />
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#60034c] text-[14px] text-center uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Button
      </p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="relative rounded-br-[4px] rounded-tr-[4px] self-stretch shrink-0">
      <div aria-hidden className="absolute border-[#60034c] border-b border-r border-solid border-t inset-0 pointer-events-none rounded-br-[4px] rounded-tr-[4px]" />
      <div className="content-stretch flex items-start p-[12px] relative size-full">
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="h-[3px] relative shrink-0 w-[6px]">
            <div className="absolute inset-[-11.79%_-5.89%_-23.57%_-5.89%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.70711 4.06066">
                <path d={svgPaths.p1fd2af40} id="Vector 8" stroke="var(--stroke-0, #60034C)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0">
      <div className="content-stretch flex gap-px items-start relative rounded-[5px] shrink-0" data-name="Button">
        <Frame20 />
        <Frame21 />
      </div>
      <div className="content-stretch flex items-start relative rounded-[5px] shrink-0" data-name="Button">
        <Frame22 />
        <Frame23 />
      </div>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0">
      <Frame18 />
      <Frame19 />
      <Frame39 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[228px] items-center justify-center relative shrink-0 w-[498px]">
      <Frame40 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-start flex flex-wrap gap-[20px] items-start relative shrink-0">
      <div className="bg-[#60034c] content-stretch flex flex-col items-start px-[40px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-center text-white uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Button
        </p>
      </div>
      <div className="content-stretch flex flex-col items-start px-[20px] py-[8px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border border-[#60034c] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#60034c] text-[12px] text-center uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Button
        </p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
        <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
            <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-white uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Button
      </p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icon">
          <path clipRule="evenodd" d={svgPaths.p1106300} fill="var(--fill-0, #60034C)" fillRule="evenodd" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div className="col-1 content-stretch flex gap-[4px] items-start ml-0 mt-0 relative row-1">
      <Icon />
      <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#60034c] text-[12px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Button
      </p>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Frame14 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-start flex flex-wrap gap-[20px] items-start relative shrink-0">
      <div className="bg-[#60034c] content-stretch flex flex-col items-start px-[30px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <Frame4 />
      </div>
      <div className="content-stretch flex flex-col items-start px-[16px] py-[8px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border border-[#60034c] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <Group />
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-start flex flex-wrap gap-[20px] items-start relative shrink-0">
      <div className="bg-[#60034c] content-stretch flex flex-col items-start p-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border border-[#60034c] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
          <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
              <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start p-[8px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border border-[#60034c] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
          <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
              <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, #60034C)" fillRule="evenodd" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-start flex flex-wrap gap-[20px] items-start relative shrink-0">
      <div className="content-stretch flex flex-col items-start px-[40px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#0a7593] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Link
        </p>
      </div>
      <div className="content-stretch flex flex-col items-start px-[20px] py-[8px] relative rounded-[4px] shrink-0" data-name="Button">
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#0a7593] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Link
        </p>
      </div>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0">
      <Frame24 />
      <Frame25 />
      <Frame26 />
      <Frame27 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[291px] items-center justify-center relative shrink-0 w-[364px]">
      <Frame41 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-['Open_Sans:Regular',sans-serif] font-normal items-start justify-between leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[586px] whitespace-nowrap">
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Default
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Hovered
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Focused
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Disabled
      </p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-[616px]">
      <div className="bg-[#60034c] content-stretch flex flex-col items-start px-[40px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-center text-white uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Button
        </p>
      </div>
      <div className="bg-[rgba(96,3,76,0.8)] content-stretch flex flex-col items-start px-[40px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-center text-white uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Button
        </p>
      </div>
      <div className="bg-[rgba(96,3,76,0.8)] content-stretch flex flex-col items-start px-[40px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border-4 border-[rgba(96,3,76,0.4)] border-solid inset-[-4px] pointer-events-none rounded-[8px]" />
        <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-center text-white uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Button
        </p>
      </div>
      <div className="content-stretch flex flex-col items-start px-[40px] py-[12px] relative rounded-[4px] shrink-0" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgb(107, 111, 122) 0%, rgb(107, 111, 122) 100%)" }} data-name="Button">
        <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-center text-white uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Button
        </p>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-[616px]">
      <div className="content-stretch flex flex-col items-start px-[40px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border border-[#60034c] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#60034c] text-[14px] text-center uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Button
        </p>
      </div>
      <div className="content-stretch flex flex-col items-start px-[40px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border border-[rgba(96,3,76,0.8)] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-[rgba(96,3,76,0.8)] text-center uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Button
        </p>
      </div>
      <div className="content-stretch flex flex-col items-start px-[40px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border-4 border-[rgba(96,3,76,0.4)] border-solid inset-[-4px] pointer-events-none rounded-[8px]" />
        <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-[rgba(96,3,76,0.8)] text-center uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Button
        </p>
      </div>
      <div className="content-stretch flex flex-col items-start px-[40px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border border-[#999] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#565962] text-[14px] text-center uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Button
        </p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
        <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
            <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-white uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Button
      </p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
        <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
            <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-white uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Button
      </p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
        <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
            <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-white uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Button
      </p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
        <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
            <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-white uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Button
      </p>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-[616px]">
      <div className="bg-[#60034c] content-stretch flex flex-col items-start px-[30px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <Frame5 />
      </div>
      <div className="bg-[rgba(96,3,76,0.8)] content-stretch flex flex-col items-start px-[30px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <Frame6 />
      </div>
      <div className="bg-[rgba(96,3,76,0.8)] content-stretch flex flex-col items-start px-[30px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border-4 border-[rgba(96,3,76,0.4)] border-solid inset-[-4px] pointer-events-none rounded-[8px]" />
        <Frame7 />
      </div>
      <div className="content-stretch flex flex-col items-start px-[30px] py-[12px] relative rounded-[4px] shrink-0" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgb(107, 111, 122) 0%, rgb(107, 111, 122) 100%)" }} data-name="Button">
        <Frame8 />
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="bg-[#60034c] content-stretch flex items-start px-[24px] py-[12px] relative rounded-bl-[4px] rounded-tl-[4px] shrink-0">
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-center text-white uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Button
      </p>
    </div>
  );
}

function Frame34() {
  return (
    <div className="bg-[#60034c] relative rounded-br-[4px] rounded-tr-[4px] self-stretch shrink-0">
      <div className="content-stretch flex items-start p-[12px] relative size-full">
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="h-[3px] relative shrink-0 w-[6px]">
            <div className="absolute inset-[-11.79%_-5.89%_-23.57%_-5.89%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.70711 4.06066">
                <path d={svgPaths.p1fd2af40} id="Vector 8" stroke="var(--stroke-0, white)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="bg-[rgba(96,3,76,0.8)] content-stretch flex items-start px-[24px] py-[12px] relative rounded-bl-[4px] rounded-tl-[4px] shrink-0">
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-center text-white uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Button
      </p>
    </div>
  );
}

function Frame46() {
  return (
    <div className="bg-[rgba(96,3,76,0.8)] relative rounded-br-[4px] rounded-tr-[4px] self-stretch shrink-0">
      <div className="content-stretch flex items-start p-[12px] relative size-full">
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="h-[3px] relative shrink-0 w-[6px]">
            <div className="absolute inset-[-11.79%_-5.89%_-23.57%_-5.89%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.70711 4.06066">
                <path d={svgPaths.p1fd2af40} id="Vector 8" stroke="var(--stroke-0, white)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame47() {
  return (
    <div className="bg-[rgba(96,3,76,0.8)] content-stretch flex items-start px-[24px] py-[12px] relative rounded-bl-[4px] rounded-tl-[4px] shrink-0">
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-center text-white uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Button
      </p>
    </div>
  );
}

function Frame48() {
  return (
    <div className="bg-[rgba(96,3,76,0.8)] relative rounded-br-[4px] rounded-tr-[4px] self-stretch shrink-0">
      <div className="content-stretch flex items-start p-[12px] relative size-full">
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="h-[3px] relative shrink-0 w-[6px]">
            <div className="absolute inset-[-11.79%_-5.89%_-23.57%_-5.89%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.70711 4.06066">
                <path d={svgPaths.p1fd2af40} id="Vector 8" stroke="var(--stroke-0, white)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex items-start px-[24px] py-[12px] relative rounded-bl-[4px] rounded-tl-[4px] shrink-0" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgb(107, 111, 122) 0%, rgb(107, 111, 122) 100%)" }}>
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-center text-white uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Button
      </p>
    </div>
  );
}

function Frame50() {
  return (
    <div className="relative rounded-br-[4px] rounded-tr-[4px] self-stretch shrink-0" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgb(107, 111, 122) 0%, rgb(107, 111, 122) 100%)" }}>
      <div className="content-stretch flex items-start p-[12px] relative size-full">
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="h-[3px] relative shrink-0 w-[6px]">
            <div className="absolute inset-[-11.79%_-5.89%_-23.57%_-5.89%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.70711 4.06066">
                <path d={svgPaths.p1fd2af40} id="Vector 8" stroke="var(--stroke-0, white)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-[616px]">
      <div className="content-stretch flex gap-px items-start relative rounded-[5px] shrink-0" data-name="Button">
        <Frame33 />
        <Frame34 />
      </div>
      <div className="content-stretch flex gap-px items-start relative rounded-[5px] shrink-0" data-name="Button">
        <Frame35 />
        <Frame46 />
      </div>
      <div className="content-stretch flex gap-px items-start relative rounded-[5px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border-4 border-[rgba(96,3,76,0.4)] border-solid inset-[-4px] pointer-events-none rounded-[9px]" />
        <Frame47 />
        <Frame48 />
      </div>
      <div className="content-stretch flex gap-px items-start relative rounded-[5px] shrink-0" data-name="Button">
        <Frame49 />
        <Frame50 />
      </div>
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex items-start px-[24px] py-[12px] relative rounded-bl-[4px] rounded-tl-[4px] shrink-0">
      <div aria-hidden className="absolute border border-[#60034c] border-solid inset-0 pointer-events-none rounded-bl-[4px] rounded-tl-[4px]" />
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#60034c] text-[14px] text-center uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Button
      </p>
    </div>
  );
}

function Frame53() {
  return (
    <div className="relative rounded-br-[4px] rounded-tr-[4px] self-stretch shrink-0">
      <div aria-hidden className="absolute border-[#60034c] border-b border-r border-solid border-t inset-0 pointer-events-none rounded-br-[4px] rounded-tr-[4px]" />
      <div className="content-stretch flex items-start p-[12px] relative size-full">
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="h-[3px] relative shrink-0 w-[6px]">
            <div className="absolute inset-[-11.79%_-5.89%_-23.57%_-5.89%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.70711 4.06066">
                <path d={svgPaths.p1fd2af40} id="Vector 8" stroke="var(--stroke-0, #60034C)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex items-start px-[24px] py-[12px] relative rounded-bl-[4px] rounded-tl-[4px] shrink-0">
      <div aria-hidden className="absolute border border-[rgba(96,3,76,0.8)] border-solid inset-0 pointer-events-none rounded-bl-[4px] rounded-tl-[4px]" />
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-[rgba(96,3,76,0.8)] text-center uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Button
      </p>
    </div>
  );
}

function Frame55() {
  return (
    <div className="relative rounded-br-[4px] rounded-tr-[4px] self-stretch shrink-0">
      <div aria-hidden className="absolute border-[rgba(96,3,76,0.8)] border-b border-r border-solid border-t inset-0 pointer-events-none rounded-br-[4px] rounded-tr-[4px]" />
      <div className="content-stretch flex items-start p-[12px] relative size-full">
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="h-[3px] relative shrink-0 w-[6px]">
            <div className="absolute inset-[-11.79%_-5.89%_-23.57%_-5.89%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.70711 4.06066">
                <path d={svgPaths.p1fd2af40} id="Vector 8" stroke="var(--stroke-0, #60034C)" strokeOpacity="0.8" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex items-start px-[24px] py-[12px] relative rounded-bl-[4px] rounded-tl-[4px] shrink-0">
      <div aria-hidden className="absolute border border-[rgba(96,3,76,0.8)] border-solid inset-0 pointer-events-none rounded-bl-[4px] rounded-tl-[4px]" />
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-[rgba(96,3,76,0.8)] text-center uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Button
      </p>
    </div>
  );
}

function Frame57() {
  return (
    <div className="relative rounded-br-[4px] rounded-tr-[4px] self-stretch shrink-0">
      <div aria-hidden className="absolute border-[rgba(96,3,76,0.8)] border-b border-r border-solid border-t inset-0 pointer-events-none rounded-br-[4px] rounded-tr-[4px]" />
      <div className="content-stretch flex items-start p-[12px] relative size-full">
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="h-[3px] relative shrink-0 w-[6px]">
            <div className="absolute inset-[-11.79%_-5.89%_-23.57%_-5.89%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.70711 4.06066">
                <path d={svgPaths.p1fd2af40} id="Vector 8" stroke="var(--stroke-0, #60034C)" strokeOpacity="0.8" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex items-start px-[24px] py-[12px] relative rounded-bl-[4px] rounded-tl-[4px] shrink-0">
      <div aria-hidden className="absolute border border-[#565962] border-solid inset-0 pointer-events-none rounded-bl-[4px] rounded-tl-[4px]" />
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#565962] text-[14px] text-center uppercase whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Button
      </p>
    </div>
  );
}

function Frame59() {
  return (
    <div className="relative rounded-br-[4px] rounded-tr-[4px] self-stretch shrink-0">
      <div aria-hidden className="absolute border-[#565962] border-b border-r border-solid border-t inset-0 pointer-events-none rounded-br-[4px] rounded-tr-[4px]" />
      <div className="content-stretch flex items-start p-[12px] relative size-full">
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
          <div className="h-[3px] relative shrink-0 w-[6px]">
            <div className="absolute inset-[-11.79%_-5.89%_-23.57%_-5.89%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.70711 4.06066">
                <g id="Vector 8">
                  <path d={svgPaths.p1fd2af40} stroke="var(--stroke-0, #6B6F7A)" />
                  <path d={svgPaths.p1fd2af40} stroke="var(--stroke-1, black)" strokeOpacity="0.2" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-[616px]">
      <div className="content-stretch flex items-start relative rounded-[5px] shrink-0" data-name="Button">
        <Frame52 />
        <Frame53 />
      </div>
      <div className="content-stretch flex items-start relative rounded-[5px] shrink-0" data-name="Button">
        <Frame54 />
        <Frame55 />
      </div>
      <div className="content-stretch flex items-start relative rounded-[5px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border-4 border-[rgba(96,3,76,0.4)] border-solid inset-[-4px] pointer-events-none rounded-[9px]" />
        <Frame56 />
        <Frame57 />
      </div>
      <div className="content-stretch flex items-start relative rounded-[5px] shrink-0" data-name="Button">
        <Frame58 />
        <Frame59 />
      </div>
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-[616px]">
      <div className="content-stretch flex flex-col items-start px-[40px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#0a7593] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Link
        </p>
      </div>
      <div className="content-stretch flex flex-col items-start px-[40px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[14px] text-[rgba(10,117,147,0.8)] text-center underline whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Link
        </p>
      </div>
      <div className="content-stretch flex flex-col items-start px-[40px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border-4 border-[rgba(10,117,147,0.4)] border-solid inset-[-4px] pointer-events-none rounded-[8px]" />
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[14px] text-[rgba(10,117,147,0.8)] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Link
        </p>
      </div>
      <div className="content-stretch flex flex-col items-start px-[40px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#565962] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Link
        </p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
        <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
            <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, #0A7593)" fillRule="evenodd" id="Shape" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#0a7593] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Link
      </p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
        <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
            <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, #0A7593)" fillOpacity="0.8" fillRule="evenodd" id="Shape" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[14px] text-[rgba(10,117,147,0.8)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Link
      </p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
        <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
            <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, #0A7593)" fillOpacity="0.8" fillRule="evenodd" id="Shape" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[14px] text-[rgba(10,117,147,0.8)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Link
      </p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
        <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
            <g id="Shape">
              <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, #6B6F7A)" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-1, black)" fillOpacity="0.2" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#565962] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Link
      </p>
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-[616px]">
      <div className="content-stretch flex flex-col items-start px-[30px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <Frame9 />
      </div>
      <div className="content-stretch flex flex-col items-start px-[30px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <Frame10 />
      </div>
      <div className="content-stretch flex flex-col items-start px-[30px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border-4 border-[rgba(10,117,147,0.4)] border-solid inset-[-4px] pointer-events-none rounded-[8px]" />
        <Frame12 />
      </div>
      <div className="content-stretch flex flex-col items-start px-[30px] py-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <Frame13 />
      </div>
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-[616px]">
      <div className="bg-[#60034c] content-stretch flex flex-col items-start p-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border border-[#60034c] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
          <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
              <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(96,3,76,0.8)] content-stretch flex flex-col items-start p-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border-0 border-[rgba(96,3,76,0.8)] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
          <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
              <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(96,3,76,0.8)] content-stretch flex flex-col items-start p-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border-4 border-[rgba(96,3,76,0.4)] border-solid inset-[-4px] pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
          <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
              <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start p-[12px] relative rounded-[4px] shrink-0" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgb(107, 111, 122) 0%, rgb(107, 111, 122) 100%)" }} data-name="Button">
        <div aria-hidden className="absolute border border-[#565962] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
          <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
              <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-[616px]">
      <div className="content-stretch flex flex-col items-start p-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border border-[#60034c] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
          <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
              <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, #60034C)" fillRule="evenodd" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start p-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border border-[rgba(96,3,76,0.8)] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
          <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
              <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, #60034C)" fillOpacity="0.8" fillRule="evenodd" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start p-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border-4 border-[rgba(96,3,76,0.4)] border-solid inset-[-4px] pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
          <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
              <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, #60034C)" fillOpacity="0.8" fillRule="evenodd" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start p-[12px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border border-[#565962] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
          <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
              <g id="Shape">
                <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, #6B6F7A)" fillRule="evenodd" />
                <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-1, black)" fillOpacity="0.2" fillRule="evenodd" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0">
      <div className="bg-[#60034c] content-stretch flex flex-col items-start p-[8px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border border-[#60034c] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
          <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
              <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(96,3,76,0.8)] content-stretch flex flex-col items-start p-[8px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border-0 border-[rgba(96,3,76,0.8)] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
          <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
              <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(96,3,76,0.8)] content-stretch flex flex-col items-start p-[8px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border-4 border-[rgba(96,3,76,0.4)] border-solid inset-[-4px] pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
          <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
              <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start p-[8px] relative rounded-[4px] shrink-0" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, rgb(107, 111, 122) 0%, rgb(107, 111, 122) 100%)" }} data-name="Button">
        <div aria-hidden className="absolute border border-[#565962] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
          <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
              <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame65() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0">
      <div className="content-stretch flex flex-col items-start p-[8px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border border-[#60034c] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
          <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
              <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, #60034C)" fillRule="evenodd" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start p-[8px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border border-[rgba(96,3,76,0.8)] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
          <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
              <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, #60034C)" fillOpacity="0.8" fillRule="evenodd" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start p-[8px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border-4 border-[rgba(96,3,76,0.4)] border-solid inset-[-4px] pointer-events-none rounded-[8px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
          <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
              <g id="Shape">
                <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, #6B6F7A)" fillRule="evenodd" />
                <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-1, black)" fillOpacity="0.2" fillRule="evenodd" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start p-[8px] relative rounded-[4px] shrink-0" data-name="Button">
        <div aria-hidden className="absolute border border-[#565962] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0" data-name="icon 16x16">
          <div className="h-[9.999px] relative shrink-0 w-[8px]" data-name="Shape">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 9.99939">
              <g id="Shape">
                <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-0, #6B6F7A)" fillRule="evenodd" />
                <path clipRule="evenodd" d={svgPaths.p1c66f300} fill="var(--fill-1, black)" fillOpacity="0.2" fillRule="evenodd" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-[674px]">
      <Frame28 />
      <Frame29 />
      <Frame30 />
      <Frame31 />
      <Frame32 />
      <Frame51 />
      <Frame60 />
      <Frame61 />
      <Frame62 />
      <Frame63 />
      <Frame64 />
      <Frame65 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[822px] items-center justify-center relative shrink-0 w-[815px]">
      <Frame43 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[2211px] items-start left-[115px] top-[137px]">
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Buttons
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Buttons allow a user to take an action.
      </p>
      <Frame45 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] w-[245px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Variations
      </p>
      <Frame36 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        There are four types of buttons – icon only, basic, with icons, split icons.
      </p>
      <Frame37 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Emphasis
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>{`All button types have three levels of emphasis available — Primary, Secondary and Links. `}</p>
      <Frame38 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Sizes
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>{`Buttons can be displayed in  large and small`}</p>
      <Frame42 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        States
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        For each button action type and emphasis style there are five button states — enabled, hover, focus and disabled
      </p>
      <Frame44 />
    </div>
  );
}

export default function Button() {
  return (
    <div className="bg-white relative size-full" data-name="Button">
      <Header />
      <Frame11 />
    </div>
  );
}
```

## src/imports/Button/svg-eiwquzlhof.ts
```ts
export default {
p1106300: "M9.26984 6.19603H11.5556L7.55556 10.3137L3.55556 6.19603H5.84127V2.66662H9.26984V6.19603ZM3.55556 12.666V11.4895H11.5556V12.666H3.55556Z",
p1c66f300: "M5.71429 3.52941H8L4 7.64706L0 3.52941H2.28571V0H5.71429V3.52941ZM0 9.99939V8.82292H8V9.99939H0Z",
p1fd2af40: "M0.353553 0.353553L3.35355 3.35355L6.35355 0.353553",
}

```

## src/imports/Checkbox/index.tsx
```tsx
import svgPaths from "./svg-ya5yqn2omj";

function Header() {
  return (
    <div className="[word-break:break-word] absolute bg-[#82479d] content-stretch drop-shadow-[0px_8px_8px_rgba(0,0,0,0.15)] flex font-['Open_Sans:Light',sans-serif] font-light items-center justify-between left-0 px-[117px] py-[16px] right-0 text-white top-0 whitespace-nowrap" data-name="header">
      <p className="leading-[0] relative shrink-0 text-[36px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        <span className="leading-[normal]">{`Javelina `}</span>
        <span className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Design System
        </span>
      </p>
      <p className="leading-[normal] relative shrink-0 text-[20px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Inputs
      </p>
      <p className="leading-[normal] relative shrink-0 text-[20px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Version 2.0
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <div className="bg-white relative shrink-0 size-[20px]">
          <div aria-hidden className="absolute border border-[#565962] border-solid inset-0 pointer-events-none" />
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <div className="bg-white relative shrink-0 size-[20px]">
          <div aria-hidden className="absolute border border-[#565962] border-solid inset-0 pointer-events-none" />
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <div className="bg-white relative shrink-0 size-[20px]">
          <div aria-hidden className="absolute border border-[#565962] border-solid inset-0 pointer-events-none" />
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <div className="bg-white relative shrink-0 size-[20px]">
          <div aria-hidden className="absolute border border-[#565962] border-solid inset-0 pointer-events-none" />
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <div className="bg-white relative shrink-0 size-[20px]">
          <div aria-hidden className="absolute border border-[#565962] border-solid inset-0 pointer-events-none" />
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[106px] items-center justify-center relative shrink-0 w-[477px]">
      <Frame1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <div className="bg-white relative shrink-0 size-[20px]">
          <div aria-hidden className="absolute border border-[#565962] border-solid inset-0 pointer-events-none" />
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <div className="bg-white relative shrink-0 size-[20px]">
          <div aria-hidden className="absolute border border-[#565962] border-solid inset-0 pointer-events-none" />
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <div className="bg-white relative shrink-0 size-[20px]">
          <div aria-hidden className="absolute border border-[#565962] border-solid inset-0 pointer-events-none" />
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <div className="bg-white relative shrink-0 size-[20px]">
          <div aria-hidden className="absolute border border-[#565962] border-solid inset-0 pointer-events-none" />
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <div className="bg-white relative shrink-0 size-[20px]">
          <div aria-hidden className="absolute border border-[#565962] border-solid inset-0 pointer-events-none" />
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[263px] items-center justify-center relative shrink-0 w-[119px]">
      <Frame2 />
    </div>
  );
}

function Group() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 402">
          <rect fill="var(--fill-0, #0A7593)" height="20" id="Rectangle 193" width="20" />
          <path d={svgPaths.p236b3ac0} fill="var(--fill-0, white)" id="Path" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <Group />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Parent 1
        </p>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 402">
          <rect fill="var(--fill-0, #0A7593)" height="20" id="Rectangle 193" width="20" />
          <path d={svgPaths.p236b3ac0} fill="var(--fill-0, white)" id="Path" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <Group1 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          1 Child One
        </p>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 402">
          <rect fill="var(--fill-0, #0A7593)" height="20" id="Rectangle 193" width="20" />
          <path d={svgPaths.p236b3ac0} fill="var(--fill-0, white)" id="Path" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <Group2 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          1 Child Two
        </p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start pl-[29px] relative shrink-0">
      <Frame4 />
      <Frame5 />
    </div>
  );
}

function Group3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[#0a7593] col-1 ml-0 mt-0 relative row-1 size-[20px]" />
      <div className="bg-white col-1 h-[2px] ml-[5px] mt-[9px] relative row-1 w-[10px]" />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <Group3 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Parent 2
        </p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <div className="bg-white relative shrink-0 size-[20px]">
          <div aria-hidden className="absolute border border-[#565962] border-solid inset-0 pointer-events-none" />
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          2 Child One
        </p>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 402">
          <rect fill="var(--fill-0, #0A7593)" height="20" id="Rectangle 193" width="20" />
          <path d={svgPaths.p236b3ac0} fill="var(--fill-0, white)" id="Path" />
        </g>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <Group4 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          2 Child Two
        </p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start pl-[29px] relative shrink-0">
      <Frame9 />
      <Frame10 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <div className="bg-white relative shrink-0 size-[20px]">
          <div aria-hidden className="absolute border border-[#565962] border-solid inset-0 pointer-events-none" />
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Parent 3
        </p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <div className="bg-white relative shrink-0 size-[20px]">
          <div aria-hidden className="absolute border border-[#565962] border-solid inset-0 pointer-events-none" />
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          3 Child One
        </p>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <div className="bg-white relative shrink-0 size-[20px]">
          <div aria-hidden className="absolute border border-[#565962] border-solid inset-0 pointer-events-none" />
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          4 Child Two
        </p>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start pl-[29px] relative shrink-0">
      <Frame13 />
      <Frame14 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0">
      <Frame3 />
      <Frame6 />
      <Frame7 />
      <Frame8 />
      <Frame11 />
      <Frame12 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[404px] items-center justify-center relative shrink-0 w-[238px]">
      <Frame29 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-['Open_Sans:Regular',sans-serif] font-normal items-start justify-between leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[362px] whitespace-nowrap">
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Unchecked
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Checked
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        indeterminate
      </p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <div className="bg-white relative shrink-0 size-[20px]">
          <div aria-hidden className="absolute border border-[#565962] border-solid inset-0 pointer-events-none" />
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 402">
          <rect fill="var(--fill-0, #0A7593)" height="20" id="Rectangle 193" width="20" />
          <path d={svgPaths.p236b3ac0} fill="var(--fill-0, white)" id="Path" />
        </g>
      </svg>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <Group5 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
    </div>
  );
}

function Group6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[#0a7593] col-1 ml-0 mt-0 relative row-1 size-[20px]" />
      <div className="bg-white col-1 h-[2px] ml-[5px] mt-[9px] relative row-1 w-[10px]" />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <Group6 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[348px]">
      <Frame16 />
      <Frame17 />
      <Frame18 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[84px]">
      <div className="h-[20px] relative shrink-0 w-[67px]" data-name="Check Box">
        <p className="[word-break:break-word] absolute bottom-[-5%] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] left-[28px] text-[#263154] text-[14px] top-[10%] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
        <div className="absolute bg-[#e7e7e7] border border-[#999] border-solid bottom-0 left-0 top-0 w-[20px]" />
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[84px]">
      <div className="h-[20px] relative shrink-0 w-[67px]" data-name="Check Box">
        <p className="[word-break:break-word] absolute bottom-[-5%] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] left-[28px] text-[#263154] text-[14px] top-[10%] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
        <div className="absolute bg-[#999] bottom-0 left-0 top-0 w-[20px]" />
        <div className="absolute bottom-[30%] left-[4px] top-[30%] w-[12px]" data-name="Path">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8">
            <path d={svgPaths.p11aab0c0} fill="var(--fill-0, white)" id="Path" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group7() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[#999] col-1 ml-0 mt-0 relative row-1 size-[20px]" />
      <div className="bg-white col-1 h-[2px] ml-[5px] mt-[9px] relative row-1 w-[10px]" />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <Group7 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[348px]">
      <Frame21 />
      <Frame22 />
      <Frame23 />
    </div>
  );
}

function Group8() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 402">
          <rect fill="var(--fill-0, #0A7593)" fillOpacity="0.8" height="20" id="Rectangle 193" width="20" />
          <path d={svgPaths.p236b3ac0} fill="var(--fill-0, white)" id="Path" />
        </g>
      </svg>
    </div>
  );
}

function Group9() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[rgba(10,117,147,0.8)] col-1 ml-0 mt-0 relative row-1 size-[20px]" />
      <div className="bg-white col-1 h-[2px] ml-[5px] mt-[9px] relative row-1 w-[10px]" />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[348px]">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <div className="bg-white relative shrink-0 size-[20px]">
          <div aria-hidden className="absolute border border-[#0a7593] border-solid inset-0 pointer-events-none" />
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <Group8 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <Group9 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
    </div>
  );
}

function Group10() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 402">
          <rect fill="var(--fill-0, #0A7593)" fillOpacity="0.8" height="20" id="Rectangle 193" width="20" />
          <path d={svgPaths.p236b3ac0} fill="var(--fill-0, white)" id="Path" />
        </g>
      </svg>
    </div>
  );
}

function Group11() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[rgba(10,117,147,0.8)] col-1 ml-0 mt-0 relative row-1 size-[20px]" />
      <div className="bg-white col-1 h-[2px] ml-[5px] mt-[9px] relative row-1 w-[10px]" />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[348px]">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <div className="bg-white relative shrink-0 size-[20px]">
          <div aria-hidden className="absolute border border-[#0a7593] border-solid inset-0 pointer-events-none" />
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
        <div className="absolute left-[-2px] size-[24px] top-[-2px]">
          <div aria-hidden className="absolute border border-[rgba(10,117,147,0.4)] border-solid inset-0 pointer-events-none" />
        </div>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <Group10 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
        <div className="absolute left-[-2px] size-[24px] top-[-2px]">
          <div aria-hidden className="absolute border border-[rgba(10,117,147,0.4)] border-solid inset-0 pointer-events-none" />
        </div>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <Group11 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
        <div className="absolute left-[-2px] size-[24px] top-[-2px]">
          <div aria-hidden className="absolute border border-[rgba(10,117,147,0.4)] border-solid inset-0 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

function Group12() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 402">
          <rect fill="var(--fill-0, #CC0000)" height="20" id="Rectangle 193" width="20" />
          <path d={svgPaths.p236b3ac0} fill="var(--fill-0, white)" id="Path" />
        </g>
      </svg>
    </div>
  );
}

function Group13() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[#c00] col-1 ml-0 mt-0 relative row-1 size-[20px]" />
      <div className="bg-white col-1 h-[2px] ml-[5px] mt-[9px] relative row-1 w-[10px]" />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[348px]">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <div className="bg-white relative shrink-0 size-[20px]">
          <div aria-hidden className="absolute border border-[#c00] border-solid inset-0 pointer-events-none" />
        </div>
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <Group12 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Check Box">
        <Group13 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0">
      <Frame15 />
      <Frame19 />
      <Frame20 />
      <Frame24 />
      <Frame25 />
      <Frame32 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[300px] items-center justify-center relative shrink-0 w-[544px]">
      <Frame31 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[1633px] items-start left-[114px] top-[139px]">
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Checkbox
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Checkboxes allow multiple selections from a set of options.
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] w-[245px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Orientation
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Checkboxes can be grouped in horizontal or vertical orientations for users to pick from a set of related options
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Horizontal
      </p>
      <Frame26 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Vertical
      </p>
      <Frame27 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] w-[245px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Nested
      </p>
      <Frame28 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] w-[245px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        States
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>{`Checkbox interaction states are enabled, hovered, focused, disabled, and error. Checkbox selection states are checked, unchecked and indeterminate. Checkboxes can be configured to display checked, unchecked, or disabled by default. When using checkboxes, there should be no action that the user cannot undo by checking the box again. For example, it's okay to use checkboxes for filtering but not for deletion. `}</p>
      <Frame30 />
    </div>
  );
}

export default function Checkbox() {
  return (
    <div className="bg-white relative size-full" data-name="Checkbox">
      <Header />
      <Frame />
    </div>
  );
}
```

## src/imports/Checkbox/svg-llfk1czuf0.ts
```ts
export default {
p11aab0c0: "M3.87789 7.79068C3.94603 7.85698 4.02726 7.90962 4.11684 7.94556C4.20642 7.98149 4.30257 8 4.39969 8C4.49681 8 4.59295 7.98149 4.68254 7.94556C4.77212 7.90962 4.85334 7.85698 4.92149 7.79068L11.8056 1.17775C11.9332 1.04538 12.0028 0.871041 11.9999 0.690857C11.997 0.510673 11.9219 0.338462 11.7901 0.209915C11.6582 0.0813681 11.4799 0.00634128 11.2919 0.000383889C11.1039 -0.0055735 10.9207 0.0579953 10.7803 0.177916L4.39053 6.2997L1.25974 3.3002C1.12135 3.16762 0.933649 3.09313 0.737936 3.09313C0.542223 3.09313 0.354526 3.16762 0.216136 3.3002C0.0777465 3.43279 0 3.61261 0 3.80012C0 3.89296 0.0190874 3.9849 0.0561721 4.07067C0.0932569 4.15645 0.147613 4.23439 0.216136 4.30004L3.87789 7.79068Z",
p236b3ac0: "M7.87789 13.7907C7.94603 13.857 8.02726 13.9096 8.11684 13.9456C8.20642 13.9815 8.30257 14 8.39969 14C8.49681 14 8.59295 13.9815 8.68254 13.9456C8.77212 13.9096 8.85334 13.857 8.92149 13.7907L15.8056 7.17775C15.9332 7.04538 16.0028 6.87104 15.9999 6.69086C15.997 6.51067 15.9219 6.33846 15.7901 6.20992C15.6582 6.08137 15.4799 6.00634 15.2919 6.00038C15.1039 5.99443 14.9207 6.058 14.7803 6.17792L8.39053 12.2997L5.25974 9.3002C5.12135 9.16762 4.93365 9.09313 4.73794 9.09313C4.54222 9.09313 4.35453 9.16762 4.21614 9.3002C4.07775 9.43279 4 9.61261 4 9.80012C4 9.89296 4.01909 9.9849 4.05617 10.0707C4.09326 10.1564 4.14761 10.2344 4.21614 10.3L7.87789 13.7907Z",
}

```

## src/imports/Checkbox/svg-ya5yqn2omj.ts
```ts
export default {
p11aab0c0: "M3.87789 7.79068C3.94603 7.85698 4.02726 7.90962 4.11684 7.94556C4.20642 7.98149 4.30257 8 4.39969 8C4.49681 8 4.59295 7.98149 4.68254 7.94556C4.77212 7.90962 4.85334 7.85698 4.92149 7.79068L11.8056 1.17775C11.9332 1.04538 12.0028 0.871041 11.9999 0.690857C11.997 0.510673 11.9219 0.338462 11.7901 0.209915C11.6582 0.0813681 11.4799 0.00634128 11.2919 0.000383889C11.1039 -0.0055735 10.9207 0.0579953 10.7803 0.177916L4.39053 6.2997L1.25974 3.3002C1.12135 3.16762 0.933649 3.09313 0.737936 3.09313C0.542223 3.09313 0.354526 3.16762 0.216136 3.3002C0.0777465 3.43279 0 3.61261 0 3.80012C0 3.89296 0.0190874 3.9849 0.0561721 4.07067C0.0932569 4.15645 0.147613 4.23439 0.216136 4.30004L3.87789 7.79068Z",
p236b3ac0: "M7.87789 13.7907C7.94603 13.857 8.02726 13.9096 8.11684 13.9456C8.20642 13.9815 8.30257 14 8.39969 14C8.49681 14 8.59295 13.9815 8.68254 13.9456C8.77212 13.9096 8.85334 13.857 8.92149 13.7907L15.8056 7.17775C15.9332 7.04538 16.0028 6.87104 15.9999 6.69086C15.997 6.51067 15.9219 6.33846 15.7901 6.20992C15.6582 6.08137 15.4799 6.00634 15.2919 6.00038C15.1039 5.99443 14.9207 6.058 14.7803 6.17792L8.39053 12.2997L5.25974 9.3002C5.12135 9.16762 4.93365 9.09313 4.73794 9.09313C4.54222 9.09313 4.35453 9.16762 4.21614 9.3002C4.07775 9.43279 4 9.61261 4 9.80012C4 9.89296 4.01909 9.9849 4.05617 10.0707C4.09326 10.1564 4.14761 10.2344 4.21614 10.3L7.87789 13.7907Z",
}

```

## src/imports/Footer/index.tsx
```tsx
import svgPaths from "./svg-rplma24xlo";
import imgImage3 from "./fd28a89c95b1b13661178375300912781fa4df5d.png";
import { imgGroup } from "./svg-85l6h";

function Header() {
  return (
    <div className="[word-break:break-word] absolute bg-[#82479d] content-stretch drop-shadow-[0px_8px_8px_rgba(0,0,0,0.15)] flex font-['Open_Sans:Light',sans-serif] font-light items-center justify-between left-0 px-[117px] py-[16px] right-0 text-white top-0 whitespace-nowrap" data-name="header">
      <p className="leading-[0] relative shrink-0 text-[36px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        <span className="leading-[normal]">{`Javelina `}</span>
        <span className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal]" style={{ fontVariationSettings: '"wdth" 100' }}>{`Design System `}</span>
      </p>
      <p className="leading-[normal] relative shrink-0 text-[20px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Buttons
      </p>
      <p className="leading-[normal] relative shrink-0 text-[20px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Version 2.0
      </p>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#d0f3ff] content-stretch flex items-center justify-center p-[10px] relative shrink-0">
      <div aria-hidden className="absolute border-[#007399] border-l border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>{`If Contact Info not Configured `}</p>
    </div>
  );
}

function Group12() {
  return (
    <div className="-translate-y-1/2 absolute contents left-[10%] right-[70.9%] top-[calc(50%+97px)]">
      <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold h-[23px] leading-[20px] left-[10%] right-[70.9%] text-[#263154] text-[16px] top-[calc(50%+85.5px)]" style={{ fontVariationSettings: '"wdth" 100' }}>{`A1M Health `}</p>
    </div>
  );
}

function GooglePlayBadgeUs() {
  return (
    <div className="absolute inset-[47.92%_32.29%_40%_60%]" data-name="Google Play Badge US">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 111 32">
        <g id="Google Play Badge US">
          <rect fill="var(--fill-0, #263154)" height="32" id="Background Black" rx="5" width="111" />
          <path d={svgPaths.p2632eb80} fill="var(--fill-0, #999999)" id="Border Gray" />
          <path d={svgPaths.p22529870} fill="var(--fill-0, white)" id="Google Play" />
          <g id="GET IT ON">
            <path clipRule="evenodd" d={svgPaths.p38f0b0f0} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path d={svgPaths.pba33300} fill="var(--stroke-0, white)" />
          </g>
          <g id="Icon">
            <path d={svgPaths.p3247de00} fill="url(#paint0_linear_10_5281)" id="Shape" />
            <path d={svgPaths.p211ff5c0} fill="url(#paint1_linear_10_5281)" id="Shape_2" />
            <path d={svgPaths.p34d3eaec} fill="url(#paint2_linear_10_5281)" id="Shape_3" />
            <path d={svgPaths.p3d90f900} fill="url(#paint3_linear_10_5281)" id="Shape_4" />
            <path d={svgPaths.p2e74de00} fill="var(--fill-0, #263154)" id="Shape_5" opacity="0.2" />
            <path d={svgPaths.p5b93500} fill="var(--fill-0, #263154)" id="Shape_6" opacity="0.12" />
            <path d={svgPaths.p1199ca80} fill="var(--fill-0, white)" id="Shape_7" opacity="0.25" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10_5281" x1="14.3753" x2="-1.87662" y1="-6.04662" y2="-1.60432">
            <stop stopColor="#00A0FF" />
            <stop offset="0.01" stopColor="#00A1FF" />
            <stop offset="0.26" stopColor="#00BEFF" />
            <stop offset="0.51" stopColor="#00D2FF" />
            <stop offset="0.76" stopColor="#00DFFF" />
            <stop offset="1" stopColor="#00E3FF" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10_5281" x1="27.8223" x2="7.9328" y1="7.8409" y2="7.8409">
            <stop stopColor="#FFE000" />
            <stop offset="0.41" stopColor="#FFBD00" />
            <stop offset="0.78" stopColor="#FFA500" />
            <stop offset="1" stopColor="#FF9C00" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_10_5281" x1="8.29766" x2="-4.2821" y1="10.822" y2="32.5701">
            <stop stopColor="#FF3A44" />
            <stop offset="1" stopColor="#C31162" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_10_5281" x1="0.593331" x2="6.20829" y1="3.27743" y2="12.9889">
            <stop stopColor="#32A071" />
            <stop offset="0.07" stopColor="#2DA771" />
            <stop offset="0.48" stopColor="#15CF74" />
            <stop offset="0.8" stopColor="#06E775" />
            <stop offset="1" stopColor="#00F076" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function AppStoreBadgeUsBlack() {
  return (
    <div className="absolute inset-[47.92%_40.56%_40%_53.26%]" data-name="App Store Badge US Black">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 89 32">
        <g id="App Store Badge US Black">
          <path d={svgPaths.p30285a80} fill="var(--fill-0, #999999)" id="Background Gray" />
          <path d={svgPaths.p2e6c3100} fill="var(--fill-0, #263154)" id="Background Black" />
          <path d={svgPaths.p27462500} fill="var(--fill-0, white)" id="App Store" />
          <path d={svgPaths.p12d66f80} fill="var(--fill-0, white)" id="Download on the" />
          <path d={svgPaths.p355a5900} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Facebook() {
  return (
    <div className="h-[15.2px] relative shrink-0 w-[20px]" data-name="📷 facebook">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 15.2">
        <g id="ð· facebook">
          <path clipRule="evenodd" d={svgPaths.p3d60a00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="facebook" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="col-1 h-[12.688px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.656px] mask-size-[14px_14px] ml-0 mt-[0.66px] relative row-1 w-[14px]" style={{ maskImage: `url("${imgGroup}")` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12.688">
        <g id="Group">
          <path d={svgPaths.p1d6b7300} fill="var(--fill-0, #263154)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Clip path group">
      <Group1 />
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
      <ClipPathGroup />
    </div>
  );
}

function PrimeTwitter() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 w-[20px]" data-name="prime:twitter">
      <Group />
    </div>
  );
}

function Linkedin() {
  return (
    <div className="h-[16px] relative shrink-0 w-[20px]" data-name="linkedin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
        <g id="linkedin">
          <path clipRule="evenodd" d={svgPaths.p8b5ce00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-center left-[767px] top-[55px]">
      <Facebook />
      <PrimeTwitter />
      <div className="h-[14px] relative shrink-0 w-[20px]" data-name="XMLID_823_">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 14">
          <path clipRule="evenodd" d={svgPaths.p326bd400} fill="var(--fill-0, #263154)" fillRule="evenodd" id="XMLID_823_" />
        </svg>
      </div>
      <Linkedin />
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute contents left-[767px] top-[20px]">
      <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[53.26%] right-[38.06%] text-[#263154] text-[16px] top-[calc(50%-112.5px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Stay Connected
      </p>
      <Frame5 />
    </div>
  );
}

function Group14() {
  return (
    <div className="[word-break:break-word] absolute contents left-[10%] right-[82.43%] top-[20px]">
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[18.11%_82.43%_32.83%_10%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[32px] mb-0">Privacy Policy</p>
        <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
        <p className="leading-[32px] mb-0">Legal</p>
        <p className="leading-[32px] mb-0">{`Contact Us `}</p>
        <p className="leading-[32px]">​</p>
      </div>
      <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[10%] right-[85.97%] text-[#263154] text-[16px] top-[calc(50%-112.5px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Block 1
      </p>
    </div>
  );
}

function Group22() {
  return (
    <div className="[word-break:break-word] absolute contents left-[24.38%] right-[68.06%] top-[20px]">
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[18.11%_68.06%_32.83%_24.38%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[32px] mb-0">Privacy Policy</p>
        <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
        <p className="leading-[32px] mb-0">Legal</p>
        <p className="leading-[32px] mb-0">{`Contact Us `}</p>
        <p className="leading-[32px]">​</p>
      </div>
      <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[24.38%] right-[71.6%] text-[#263154] text-[16px] top-[calc(50%-112.5px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Block 2
      </p>
    </div>
  );
}

function Group23() {
  return (
    <div className="[word-break:break-word] absolute contents left-[38.82%] right-[53.61%] top-[20px]">
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[18.11%_53.61%_32.83%_38.82%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[32px] mb-0">Privacy Policy</p>
        <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
        <p className="leading-[32px] mb-0">Legal</p>
        <p className="leading-[32px] mb-0">{`Contact Us `}</p>
        <p className="leading-[32px]">​</p>
      </div>
      <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[38.82%] right-[57.15%] text-[#263154] text-[16px] top-[calc(50%-112.5px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Block 3
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#d0f3ff] content-stretch flex items-center justify-center p-[10px] relative shrink-0">
      <div aria-hidden className="absolute border-[#007399] border-l border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        If Links not Configured
      </p>
    </div>
  );
}

function Group13() {
  return (
    <div className="-translate-y-1/2 absolute contents left-[10%] right-[70.9%] top-[calc(50%+97px)]">
      <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold h-[23px] leading-[20px] left-[10%] right-[70.9%] text-[#263154] text-[16px] top-[calc(50%+85.5px)]" style={{ fontVariationSettings: '"wdth" 100' }}>{`A1M Health `}</p>
    </div>
  );
}

function Group15() {
  return (
    <div className="[word-break:break-word] absolute contents left-[10%] right-[68.26%] text-[#263154] top-[20px]">
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[18.11%_68.26%_74.34%_10%] leading-[0] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[normal] mb-0">For immediate assistance, please call:</p>
        <p className="leading-[normal]">​</p>
      </div>
      <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold h-[20px] leading-[normal] left-[10%] right-[83.96%] text-[16px] top-[calc(50%-112.5px)]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Contact Us
      </p>
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[26.42%_68.26%_66.42%_10%] leading-[0] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[normal] mb-0">1 (800) CALL-NOW | 1 (800) 121-2412</p>
        <p className="leading-[normal] mb-0">​</p>
        <p className="leading-[normal]">​</p>
      </div>
    </div>
  );
}

function GooglePlayBadgeUs1() {
  return (
    <div className="absolute inset-[47.92%_53.89%_40%_38.4%]" data-name="Google Play Badge US">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 111 32">
        <g id="Google Play Badge US">
          <rect fill="var(--fill-0, #263154)" height="32" id="Background Black" rx="5" width="111" />
          <path d={svgPaths.p2632eb80} fill="var(--fill-0, #999999)" id="Border Gray" />
          <path d={svgPaths.p22529870} fill="var(--fill-0, white)" id="Google Play" />
          <g id="GET IT ON">
            <path clipRule="evenodd" d={svgPaths.p38f0b0f0} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path d={svgPaths.pba33300} fill="var(--stroke-0, white)" />
          </g>
          <g id="Icon">
            <path d={svgPaths.p3247de00} fill="url(#paint0_linear_10_5281)" id="Shape" />
            <path d={svgPaths.p211ff5c0} fill="url(#paint1_linear_10_5281)" id="Shape_2" />
            <path d={svgPaths.p34d3eaec} fill="url(#paint2_linear_10_5281)" id="Shape_3" />
            <path d={svgPaths.p3d90f900} fill="url(#paint3_linear_10_5281)" id="Shape_4" />
            <path d={svgPaths.p2e74de00} fill="var(--fill-0, #263154)" id="Shape_5" opacity="0.2" />
            <path d={svgPaths.p5b93500} fill="var(--fill-0, #263154)" id="Shape_6" opacity="0.12" />
            <path d={svgPaths.p1199ca80} fill="var(--fill-0, white)" id="Shape_7" opacity="0.25" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10_5281" x1="14.3753" x2="-1.87662" y1="-6.04662" y2="-1.60432">
            <stop stopColor="#00A0FF" />
            <stop offset="0.01" stopColor="#00A1FF" />
            <stop offset="0.26" stopColor="#00BEFF" />
            <stop offset="0.51" stopColor="#00D2FF" />
            <stop offset="0.76" stopColor="#00DFFF" />
            <stop offset="1" stopColor="#00E3FF" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10_5281" x1="27.8223" x2="7.9328" y1="7.8409" y2="7.8409">
            <stop stopColor="#FFE000" />
            <stop offset="0.41" stopColor="#FFBD00" />
            <stop offset="0.78" stopColor="#FFA500" />
            <stop offset="1" stopColor="#FF9C00" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_10_5281" x1="8.29766" x2="-4.2821" y1="10.822" y2="32.5701">
            <stop stopColor="#FF3A44" />
            <stop offset="1" stopColor="#C31162" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_10_5281" x1="0.593331" x2="6.20829" y1="3.27743" y2="12.9889">
            <stop stopColor="#32A071" />
            <stop offset="0.07" stopColor="#2DA771" />
            <stop offset="0.48" stopColor="#15CF74" />
            <stop offset="0.8" stopColor="#06E775" />
            <stop offset="1" stopColor="#00F076" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function AppStoreBadgeUsBlack1() {
  return (
    <div className="absolute inset-[47.92%_62.15%_40%_31.67%]" data-name="App Store Badge US Black">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 89 32">
        <g id="App Store Badge US Black">
          <path d={svgPaths.p30285a80} fill="var(--fill-0, #999999)" id="Background Gray" />
          <path d={svgPaths.p2e6c3100} fill="var(--fill-0, #263154)" id="Background Black" />
          <path d={svgPaths.p27462500} fill="var(--fill-0, white)" id="App Store" />
          <path d={svgPaths.p12d66f80} fill="var(--fill-0, white)" id="Download on the" />
          <path d={svgPaths.p355a5900} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Group24() {
  return (
    <div className="-translate-y-1/2 absolute contents left-[31.67%] right-[59.65%] top-[calc(50%-101.5px)]">
      <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[31.67%] right-[59.65%] text-[#263154] text-[16px] top-[calc(50%-112.5px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Stay Connected
      </p>
    </div>
  );
}

function Facebook1() {
  return (
    <div className="h-[15.2px] relative shrink-0 w-[20px]" data-name="📷 facebook">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 15.2">
        <g id="ð· facebook">
          <path clipRule="evenodd" d={svgPaths.p3d60a00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="facebook" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="col-1 h-[12.688px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.656px] mask-size-[14px_14px] ml-0 mt-[0.66px] relative row-1 w-[14px]" style={{ maskImage: `url("${imgGroup}")` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12.688">
        <g id="Group">
          <path d={svgPaths.p1d6b7300} fill="var(--fill-0, #263154)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Clip path group">
      <Group3 />
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
      <ClipPathGroup1 />
    </div>
  );
}

function PrimeTwitter1() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 w-[20px]" data-name="prime:twitter">
      <Group2 />
    </div>
  );
}

function Linkedin1() {
  return (
    <div className="h-[16px] relative shrink-0 w-[20px]" data-name="linkedin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
        <g id="linkedin">
          <path clipRule="evenodd" d={svgPaths.p8b5ce00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-center left-[456px] top-[55px]">
      <Facebook1 />
      <PrimeTwitter1 />
      <div className="h-[14px] relative shrink-0 w-[20px]" data-name="XMLID_823_">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 14">
          <path clipRule="evenodd" d={svgPaths.p326bd400} fill="var(--fill-0, #263154)" fillRule="evenodd" id="XMLID_823_" />
        </svg>
      </div>
      <Linkedin1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#d0f3ff] content-stretch flex items-center justify-center p-[10px] relative shrink-0">
      <div aria-hidden className="absolute border-[#007399] border-l border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        If Contact and Links not Configured
      </p>
    </div>
  );
}

function Facebook2() {
  return (
    <div className="h-[15.2px] relative shrink-0 w-[20px]" data-name="📷 facebook">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 15.2">
        <g id="ð· facebook">
          <path clipRule="evenodd" d={svgPaths.p3d60a00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="facebook" />
        </g>
      </svg>
    </div>
  );
}

function Group5() {
  return (
    <div className="col-1 h-[12.688px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.656px] mask-size-[14px_14px] ml-0 mt-[0.66px] relative row-1 w-[14px]" style={{ maskImage: `url("${imgGroup}")` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12.688">
        <g id="Group">
          <path d={svgPaths.p1d6b7300} fill="var(--fill-0, #263154)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup2() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Clip path group">
      <Group5 />
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
      <ClipPathGroup2 />
    </div>
  );
}

function PrimeTwitter2() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 w-[20px]" data-name="prime:twitter">
      <Group4 />
    </div>
  );
}

function Linkedin2() {
  return (
    <div className="h-[16px] relative shrink-0 w-[20px]" data-name="linkedin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
        <g id="linkedin">
          <path clipRule="evenodd" d={svgPaths.p8b5ce00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-center left-[143px] top-[58px]">
      <Facebook2 />
      <PrimeTwitter2 />
      <div className="h-[14px] relative shrink-0 w-[20px]" data-name="XMLID_823_">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 14">
          <path clipRule="evenodd" d={svgPaths.p326bd400} fill="var(--fill-0, #263154)" fillRule="evenodd" id="XMLID_823_" />
        </svg>
      </div>
      <Linkedin2 />
    </div>
  );
}

function Group16() {
  return (
    <div className="-translate-y-1/2 absolute contents left-[10%] right-[70.9%] top-[calc(50%+97px)]">
      <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold h-[23px] leading-[20px] left-[10%] right-[70.9%] text-[#263154] text-[16px] top-[calc(50%+85.5px)]" style={{ fontVariationSettings: '"wdth" 100' }}>{`A1M Health `}</p>
    </div>
  );
}

function GooglePlayBadgeUs2() {
  return (
    <div className="absolute inset-[47.92%_75.56%_40%_16.74%]" data-name="Google Play Badge US">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 111 32">
        <g id="Google Play Badge US">
          <rect fill="var(--fill-0, #263154)" height="32" id="Background Black" rx="5" width="111" />
          <path d={svgPaths.p2632eb80} fill="var(--fill-0, #999999)" id="Border Gray" />
          <path d={svgPaths.p22529870} fill="var(--fill-0, white)" id="Google Play" />
          <g id="GET IT ON">
            <path clipRule="evenodd" d={svgPaths.p38f0b0f0} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path d={svgPaths.pba33300} fill="var(--stroke-0, white)" />
          </g>
          <g id="Icon">
            <path d={svgPaths.p3247de00} fill="url(#paint0_linear_10_5281)" id="Shape" />
            <path d={svgPaths.p211ff5c0} fill="url(#paint1_linear_10_5281)" id="Shape_2" />
            <path d={svgPaths.p34d3eaec} fill="url(#paint2_linear_10_5281)" id="Shape_3" />
            <path d={svgPaths.p3d90f900} fill="url(#paint3_linear_10_5281)" id="Shape_4" />
            <path d={svgPaths.p2e74de00} fill="var(--fill-0, #263154)" id="Shape_5" opacity="0.2" />
            <path d={svgPaths.p5b93500} fill="var(--fill-0, #263154)" id="Shape_6" opacity="0.12" />
            <path d={svgPaths.p1199ca80} fill="var(--fill-0, white)" id="Shape_7" opacity="0.25" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10_5281" x1="14.3753" x2="-1.87662" y1="-6.04662" y2="-1.60432">
            <stop stopColor="#00A0FF" />
            <stop offset="0.01" stopColor="#00A1FF" />
            <stop offset="0.26" stopColor="#00BEFF" />
            <stop offset="0.51" stopColor="#00D2FF" />
            <stop offset="0.76" stopColor="#00DFFF" />
            <stop offset="1" stopColor="#00E3FF" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10_5281" x1="27.8223" x2="7.9328" y1="7.8409" y2="7.8409">
            <stop stopColor="#FFE000" />
            <stop offset="0.41" stopColor="#FFBD00" />
            <stop offset="0.78" stopColor="#FFA500" />
            <stop offset="1" stopColor="#FF9C00" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_10_5281" x1="8.29766" x2="-4.2821" y1="10.822" y2="32.5701">
            <stop stopColor="#FF3A44" />
            <stop offset="1" stopColor="#C31162" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_10_5281" x1="0.593331" x2="6.20829" y1="3.27743" y2="12.9889">
            <stop stopColor="#32A071" />
            <stop offset="0.07" stopColor="#2DA771" />
            <stop offset="0.48" stopColor="#15CF74" />
            <stop offset="0.8" stopColor="#06E775" />
            <stop offset="1" stopColor="#00F076" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function AppStoreBadgeUsBlack2() {
  return (
    <div className="absolute inset-[47.92%_83.82%_40%_10%]" data-name="App Store Badge US Black">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 89 32">
        <g id="App Store Badge US Black">
          <path d={svgPaths.p30285a80} fill="var(--fill-0, #999999)" id="Background Gray" />
          <path d={svgPaths.p2e6c3100} fill="var(--fill-0, #263154)" id="Background Black" />
          <path d={svgPaths.p27462500} fill="var(--fill-0, white)" id="App Store" />
          <path d={svgPaths.p12d66f80} fill="var(--fill-0, white)" id="Download on the" />
          <path d={svgPaths.p355a5900} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Group25() {
  return (
    <div className="-translate-y-1/2 absolute contents left-[10%] right-[81.32%] top-[calc(50%-101.5px)]">
      <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[10%] right-[81.32%] text-[#263154] text-[16px] top-[calc(50%-112.5px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Stay Connected
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#d0f3ff] content-stretch flex items-center justify-center p-[10px] relative shrink-0">
      <div aria-hidden className="absolute border-[#007399] border-l border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        If Social Media not Configured
      </p>
    </div>
  );
}

function Group17() {
  return (
    <div className="-translate-y-1/2 absolute contents left-[10%] right-[70.9%] top-[calc(50%+97px)]">
      <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold h-[23px] leading-[20px] left-[10%] right-[70.9%] text-[#263154] text-[16px] top-[calc(50%+85.5px)]" style={{ fontVariationSettings: '"wdth" 100' }}>{`A1M Health `}</p>
    </div>
  );
}

function Group18() {
  return (
    <div className="[word-break:break-word] absolute contents left-[10%] right-[68.26%] text-[#263154] top-[20px]">
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[18.11%_68.26%_74.34%_10%] leading-[0] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[normal] mb-0">For immediate assistance, please call:</p>
        <p className="leading-[normal]">​</p>
      </div>
      <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold h-[20px] leading-[normal] left-[10%] right-[83.96%] text-[16px] top-[calc(50%-112.5px)]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Contact Us
      </p>
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[26.42%_68.26%_66.42%_10%] leading-[0] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[normal] mb-0">1 (800) CALL-NOW | 1 (800) 121-2412</p>
        <p className="leading-[normal] mb-0">​</p>
        <p className="leading-[normal]">​</p>
      </div>
    </div>
  );
}

function Group19() {
  return (
    <div className="[word-break:break-word] absolute contents left-[31.74%] right-[60.69%] top-[20px]">
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[18.11%_60.69%_32.83%_31.74%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[32px] mb-0">Privacy Policy</p>
        <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
        <p className="leading-[32px] mb-0">Legal</p>
        <p className="leading-[32px] mb-0">{`Contact Us `}</p>
        <p className="leading-[32px]">​</p>
      </div>
      <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[31.74%] right-[64.24%] text-[#263154] text-[16px] top-[calc(50%-112.5px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Block 1
      </p>
    </div>
  );
}

function Group26() {
  return (
    <div className="[word-break:break-word] absolute contents left-[46.11%] right-[46.32%] top-[20px]">
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[18.11%_46.32%_32.83%_46.11%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[32px] mb-0">Privacy Policy</p>
        <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
        <p className="leading-[32px] mb-0">Legal</p>
        <p className="leading-[32px] mb-0">{`Contact Us `}</p>
        <p className="leading-[32px]">​</p>
      </div>
      <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[46.11%] right-[49.86%] text-[#263154] text-[16px] top-[calc(50%-112.5px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Block 2
      </p>
    </div>
  );
}

function Group27() {
  return (
    <div className="[word-break:break-word] absolute contents left-[60.56%] right-[31.88%] top-[20px]">
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[18.11%_31.88%_32.83%_60.56%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[32px] mb-0">Privacy Policy</p>
        <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
        <p className="leading-[32px] mb-0">Legal</p>
        <p className="leading-[32px] mb-0">{`Contact Us `}</p>
        <p className="leading-[32px]">​</p>
      </div>
      <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[60.56%] right-[35.42%] text-[#263154] text-[16px] top-[calc(50%-112.5px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Block 3
      </p>
    </div>
  );
}

function GooglePlayBadgeUs3() {
  return (
    <div className="absolute inset-[21.13%_10.49%_66.79%_81.81%]" data-name="Google Play Badge US">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 111 32">
        <g id="Google Play Badge US">
          <rect fill="var(--fill-0, #263154)" height="32" id="Background Black" rx="5" width="111" />
          <path d={svgPaths.p2632eb80} fill="var(--fill-0, #999999)" id="Border Gray" />
          <path d={svgPaths.p22529870} fill="var(--fill-0, white)" id="Google Play" />
          <g id="GET IT ON">
            <path clipRule="evenodd" d={svgPaths.p38f0b0f0} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path d={svgPaths.pba33300} fill="var(--stroke-0, white)" />
          </g>
          <g id="Icon">
            <path d={svgPaths.p3247de00} fill="url(#paint0_linear_10_5281)" id="Shape" />
            <path d={svgPaths.p211ff5c0} fill="url(#paint1_linear_10_5281)" id="Shape_2" />
            <path d={svgPaths.p34d3eaec} fill="url(#paint2_linear_10_5281)" id="Shape_3" />
            <path d={svgPaths.p3d90f900} fill="url(#paint3_linear_10_5281)" id="Shape_4" />
            <path d={svgPaths.p2e74de00} fill="var(--fill-0, #263154)" id="Shape_5" opacity="0.2" />
            <path d={svgPaths.p5b93500} fill="var(--fill-0, #263154)" id="Shape_6" opacity="0.12" />
            <path d={svgPaths.p1199ca80} fill="var(--fill-0, white)" id="Shape_7" opacity="0.25" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10_5281" x1="14.3753" x2="-1.87662" y1="-6.04662" y2="-1.60432">
            <stop stopColor="#00A0FF" />
            <stop offset="0.01" stopColor="#00A1FF" />
            <stop offset="0.26" stopColor="#00BEFF" />
            <stop offset="0.51" stopColor="#00D2FF" />
            <stop offset="0.76" stopColor="#00DFFF" />
            <stop offset="1" stopColor="#00E3FF" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10_5281" x1="27.8223" x2="7.9328" y1="7.8409" y2="7.8409">
            <stop stopColor="#FFE000" />
            <stop offset="0.41" stopColor="#FFBD00" />
            <stop offset="0.78" stopColor="#FFA500" />
            <stop offset="1" stopColor="#FF9C00" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_10_5281" x1="8.29766" x2="-4.2821" y1="10.822" y2="32.5701">
            <stop stopColor="#FF3A44" />
            <stop offset="1" stopColor="#C31162" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_10_5281" x1="0.593331" x2="6.20829" y1="3.27743" y2="12.9889">
            <stop stopColor="#32A071" />
            <stop offset="0.07" stopColor="#2DA771" />
            <stop offset="0.48" stopColor="#15CF74" />
            <stop offset="0.8" stopColor="#06E775" />
            <stop offset="1" stopColor="#00F076" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function AppStoreBadgeUsBlack3() {
  return (
    <div className="absolute inset-[21.13%_18.75%_66.79%_75.07%]" data-name="App Store Badge US Black">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 89 32">
        <g id="App Store Badge US Black">
          <path d={svgPaths.p30285a80} fill="var(--fill-0, #999999)" id="Background Gray" />
          <path d={svgPaths.p2e6c3100} fill="var(--fill-0, #263154)" id="Background Black" />
          <path d={svgPaths.p27462500} fill="var(--fill-0, white)" id="App Store" />
          <path d={svgPaths.p12d66f80} fill="var(--fill-0, white)" id="Download on the" />
          <path d={svgPaths.p355a5900} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[#d0f3ff] content-stretch flex items-center justify-center p-[10px] relative shrink-0">
      <div aria-hidden className="absolute border-[#007399] border-l border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Unsecured
      </p>
    </div>
  );
}

function Group20() {
  return (
    <div className="-translate-y-1/2 absolute contents left-[7.78%] right-[66.6%] top-[calc(50%+96.5px)]">
      <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold h-[23px] leading-[20px] left-[7.78%] right-[66.6%] text-[#263154] text-[16px] top-[calc(50%+85px)]" style={{ fontVariationSettings: '"wdth" 100' }}>{`A1M Health `}</p>
    </div>
  );
}

function Group28() {
  return (
    <div className="[word-break:break-word] absolute contents left-[7.78%] right-[70.49%] text-[#263154] top-[20px]">
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[18.05%_70.49%_74.44%_7.78%] leading-[0] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[normal] mb-0">For immediate assistance, please call:</p>
        <p className="leading-[normal]">​</p>
      </div>
      <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold h-[20px] leading-[normal] left-[7.78%] right-[86.18%] text-[16px] top-[calc(50%-113px)]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Contact Us
      </p>
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[26.32%_70.49%_66.92%_7.78%] leading-[0] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[normal] mb-0">1 (800) CALL-NOW | 1 (800) 121-2412</p>
        <p className="leading-[normal] mb-0">​</p>
        <p className="leading-[normal]">​</p>
      </div>
    </div>
  );
}

function Group29() {
  return (
    <div className="[word-break:break-word] absolute contents left-[29.51%] right-[62.92%] top-[20px]">
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[18.05%_62.92%_33.08%_29.51%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[32px] mb-0">Privacy Policy</p>
        <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
        <p className="leading-[32px] mb-0">Legal</p>
        <p className="leading-[32px] mb-0">{`Contact Us `}</p>
        <p className="leading-[32px]">​</p>
      </div>
      <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[29.51%] right-[66.46%] text-[#263154] text-[16px] top-[calc(50%-113px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Block 1
      </p>
    </div>
  );
}

function Group30() {
  return (
    <div className="[word-break:break-word] absolute contents left-[43.89%] right-[48.54%] top-[20px]">
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[18.05%_48.54%_33.08%_43.89%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[32px] mb-0">Privacy Policy</p>
        <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
        <p className="leading-[32px] mb-0">Legal</p>
        <p className="leading-[32px] mb-0">{`Contact Us `}</p>
        <p className="leading-[32px]">​</p>
      </div>
      <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[43.89%] right-[52.08%] text-[#263154] text-[16px] top-[calc(50%-113px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Block 2
      </p>
    </div>
  );
}

function Group31() {
  return (
    <div className="[word-break:break-word] absolute contents left-[58.33%] right-[34.1%] top-[20px]">
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[18.05%_34.1%_33.08%_58.33%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[32px] mb-0">Privacy Policy</p>
        <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
        <p className="leading-[32px] mb-0">Legal</p>
        <p className="leading-[32px] mb-0">{`Contact Us `}</p>
        <p className="leading-[32px]">​</p>
      </div>
      <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[58.33%] right-[37.64%] text-[#263154] text-[16px] top-[calc(50%-113px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Block 3
      </p>
    </div>
  );
}

function Facebook3() {
  return (
    <div className="h-[15.2px] relative shrink-0 w-[20px]" data-name="📷 facebook">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 15.2">
        <g id="ð· facebook">
          <path clipRule="evenodd" d={svgPaths.p3d60a00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="facebook" />
        </g>
      </svg>
    </div>
  );
}

function Group7() {
  return (
    <div className="col-1 h-[12.688px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.656px] mask-size-[14px_14px] ml-0 mt-[0.66px] relative row-1 w-[14px]" style={{ maskImage: `url("${imgGroup}")` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12.688">
        <g id="Group">
          <path d={svgPaths.p1d6b7300} fill="var(--fill-0, #263154)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup3() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Clip path group">
      <Group7 />
    </div>
  );
}

function Group6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
      <ClipPathGroup3 />
    </div>
  );
}

function PrimeTwitter3() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 w-[20px]" data-name="prime:twitter">
      <Group6 />
    </div>
  );
}

function Linkedin3() {
  return (
    <div className="h-[16px] relative shrink-0 w-[20px]" data-name="linkedin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
        <g id="linkedin">
          <path clipRule="evenodd" d={svgPaths.p8b5ce00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-center left-[1048px] top-[55px]">
      <Facebook3 />
      <PrimeTwitter3 />
      <div className="h-[14px] relative shrink-0 w-[20px]" data-name="XMLID_823_">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 14">
          <path clipRule="evenodd" d={svgPaths.p326bd400} fill="var(--fill-0, #263154)" fillRule="evenodd" id="XMLID_823_" />
        </svg>
      </div>
      <Linkedin3 />
    </div>
  );
}

function Group32() {
  return (
    <div className="absolute contents left-[1048px] top-[20px]">
      <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[72.78%] right-[18.54%] text-[#263154] text-[16px] top-[calc(50%-113px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Stay Connected
      </p>
      <Frame9 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[#d0f3ff] content-stretch flex items-center justify-center p-[10px] relative shrink-0">
      <div aria-hidden className="absolute border-[#007399] border-l border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Mobile Footer | Unsecured
      </p>
    </div>
  );
}

function Facebook4() {
  return (
    <div className="h-[15.2px] relative shrink-0 w-[20px]" data-name="📷 facebook">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 15.2">
        <g id="ð· facebook">
          <path clipRule="evenodd" d={svgPaths.p3d60a00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="facebook" />
        </g>
      </svg>
    </div>
  );
}

function Group9() {
  return (
    <div className="col-1 h-[12.688px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.656px] mask-size-[14px_14px] ml-0 mt-[0.66px] relative row-1 w-[14px]" style={{ maskImage: `url("${imgGroup}")` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12.688">
        <g id="Group">
          <path d={svgPaths.p1d6b7300} fill="var(--fill-0, #263154)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup4() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Clip path group">
      <Group9 />
    </div>
  );
}

function Group8() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
      <ClipPathGroup4 />
    </div>
  );
}

function PrimeTwitter4() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 w-[20px]" data-name="prime:twitter">
      <Group8 />
    </div>
  );
}

function Linkedin4() {
  return (
    <div className="h-[16px] relative shrink-0 w-[20px]" data-name="linkedin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
        <g id="linkedin">
          <path clipRule="evenodd" d={svgPaths.p8b5ce00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-center left-[calc(50%+5.5px)] top-[405px]">
      <Facebook4 />
      <PrimeTwitter4 />
      <div className="h-[14px] relative shrink-0 w-[20px]" data-name="XMLID_823_">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 14">
          <path clipRule="evenodd" d={svgPaths.p326bd400} fill="var(--fill-0, #263154)" fillRule="evenodd" id="XMLID_823_" />
        </svg>
      </div>
      <Linkedin4 />
    </div>
  );
}

function Group33() {
  return (
    <div className="[word-break:break-word] absolute contents left-[4.27%] right-[12.27%] text-[#263154] top-[20px]">
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[8.39%_12.27%_88.39%_4.27%] leading-[0] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[normal] mb-0">For immediate assistance, please call:</p>
        <p className="leading-[normal]">​</p>
      </div>
      <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold h-[20px] leading-[normal] left-[4.27%] right-[72.53%] text-[16px] top-[calc(50%-290px)]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Contact Us
      </p>
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[11.94%_12.27%_85.48%_4.27%] leading-[0] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[normal] mb-0">1 (800) CALL-NOW | 1 (800) 121-2412</p>
        <p className="leading-[normal] mb-0">​</p>
        <p className="leading-[normal]">​</p>
      </div>
    </div>
  );
}

function Group34() {
  return (
    <div className="absolute contents inset-[22.9%_11.47%_70.97%_4.27%]">
      <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[22.9%_11.47%_70.97%_4.27%] leading-[normal] text-[#263154] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        9025 Smoky Hollow Street, Niagara Falls, NY 14304
      </p>
    </div>
  );
}

function Group35() {
  return (
    <div className="[word-break:break-word] absolute contents left-[4.27%] right-[52%] top-[196px]">
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[36.13%_52%_42.9%_4.27%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[32px] mb-0">Privacy Policy</p>
        <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
        <p className="leading-[32px] mb-0">Legal</p>
        <p className="leading-[32px] mb-0">{`Contact Us `}</p>
        <p className="leading-[32px]">​</p>
      </div>
      <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[4.27%] right-[80.27%] text-[#263154] text-[16px] top-[calc(50%-114px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Block 1
      </p>
    </div>
  );
}

function Group36() {
  return (
    <div className="[word-break:break-word] absolute contents left-[4.27%] right-[66.67%] top-[374px]">
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[64.84%_66.67%_14.19%_4.27%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[32px] mb-0">Privacy Policy</p>
        <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
        <p className="leading-[32px] mb-0">Legal</p>
        <p className="leading-[32px] mb-0">{`Contact Us `}</p>
        <p className="leading-[32px]">​</p>
      </div>
      <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[4.27%] right-[80.27%] text-[#263154] text-[16px] top-[calc(50%+64px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Block 1
      </p>
    </div>
  );
}

function Group37() {
  return (
    <div className="[word-break:break-word] absolute contents left-[52.27%] right-[18.67%] top-[196px]">
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[36.13%_18.67%_42.9%_52.27%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[32px] mb-0">Privacy Policy</p>
        <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
        <p className="leading-[32px] mb-0">Legal</p>
        <p className="leading-[32px] mb-0">{`Contact Us `}</p>
        <p className="leading-[32px]">​</p>
      </div>
      <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[52.27%] right-[32.27%] text-[#263154] text-[16px] top-[calc(50%-114px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Block 2
      </p>
    </div>
  );
}

function Group38() {
  return (
    <div className="-translate-y-1/2 absolute contents left-[52.27%] right-[14.4%] top-[calc(50%+75px)]">
      <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[52.27%] right-[14.4%] text-[#263154] text-[16px] top-[calc(50%+64px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Stay Connected
      </p>
    </div>
  );
}

function Group39() {
  return (
    <div className="-translate-y-1/2 absolute contents left-[4.27%] right-[4.27%] top-[calc(50%+257px)]">
      <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[20px] left-[4.27%] right-[4.27%] text-[#263154] text-[16px] top-[calc(50%+247px)]" style={{ fontVariationSettings: '"wdth" 100' }}>{`A1M Health `}</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-[#d0f3ff] content-stretch flex items-center justify-center p-[10px] relative shrink-0">
      <div aria-hidden className="absolute border-[#007399] border-l border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-black whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Mobile Footer | Secured
      </p>
    </div>
  );
}

function Group40() {
  return (
    <div className="[word-break:break-word] absolute contents left-[4.27%] right-[12.27%] text-[#263154] top-[20px]">
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[8.05%_12.27%_88.85%_4.27%] leading-[0] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[normal] mb-0">For immediate assistance, please call:</p>
        <p className="leading-[normal]">​</p>
      </div>
      <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold h-[20px] leading-[normal] left-[4.27%] right-[72.53%] text-[16px] top-[calc(50%-303px)]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Contact Us
      </p>
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[11.38%_12.27%_78.95%_4.27%] leading-[0] text-[0px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[normal] mb-0 text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          1 (800) CALL-NOW | 1 (800) 121-2412
        </p>
        <p className="leading-[normal] mb-0 text-[14px]">​</p>
        <p className="text-[14px]">
          <span className="leading-[normal]" style={{ fontVariationSettings: '"wdth" 100' }}>{`Email: `}</span>
          <span className="leading-[normal] text-[#0a7593]" style={{ fontVariationSettings: '"wdth" 100' }}>
            support@eldocomp.com
          </span>
        </p>
      </div>
    </div>
  );
}

function Group41() {
  return (
    <div className="absolute contents inset-[21.98%_11.47%_72.14%_4.27%]">
      <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[21.98%_11.47%_72.14%_4.27%] leading-[normal] text-[#263154] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        9025 Smoky Hollow Street, Niagara Falls, NY 14304
      </p>
    </div>
  );
}

function Group42() {
  return (
    <div className="[word-break:break-word] absolute contents left-[4.27%] right-[52%] top-[196px]">
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[34.67%_52%_45.2%_4.27%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[32px] mb-0">Privacy Policy</p>
        <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
        <p className="leading-[32px] mb-0">Legal</p>
        <p className="leading-[32px] mb-0">{`Contact Us `}</p>
        <p className="leading-[32px]">​</p>
      </div>
      <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[4.27%] right-[80.27%] text-[#263154] text-[16px] top-[calc(50%-127px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Block 1
      </p>
    </div>
  );
}

function Group43() {
  return (
    <div className="[word-break:break-word] absolute contents left-[4.27%] right-[66.67%] top-[374px]">
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[62.23%_66.67%_17.65%_4.27%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[32px] mb-0">Privacy Policy</p>
        <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
        <p className="leading-[32px] mb-0">Legal</p>
        <p className="leading-[32px] mb-0">{`Contact Us `}</p>
        <p className="leading-[32px]">​</p>
      </div>
      <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[4.27%] right-[80.27%] text-[#263154] text-[16px] top-[calc(50%+51px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Block 1
      </p>
    </div>
  );
}

function Group44() {
  return (
    <div className="[word-break:break-word] absolute contents left-[52.27%] right-[18.67%] top-[196px]">
      <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[34.67%_18.67%_45.2%_52.27%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[32px] mb-0">Privacy Policy</p>
        <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
        <p className="leading-[32px] mb-0">Legal</p>
        <p className="leading-[32px] mb-0">{`Contact Us `}</p>
        <p className="leading-[32px]">​</p>
      </div>
      <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[52.27%] right-[32.27%] text-[#263154] text-[16px] top-[calc(50%-127px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Block 2
      </p>
    </div>
  );
}

function Group45() {
  return (
    <div className="-translate-y-1/2 absolute contents left-[4.27%] right-[4.27%] top-[calc(50%+269px)]">
      <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[20px] left-[4.27%] right-[4.27%] text-[#263154] text-[16px] top-[calc(50%+259px)]" style={{ fontVariationSettings: '"wdth" 100' }}>{`A1M Health `}</p>
    </div>
  );
}

function Facebook5() {
  return (
    <div className="h-[15.2px] relative shrink-0 w-[20px]" data-name="📷 facebook">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 15.2">
        <g id="ð· facebook">
          <path clipRule="evenodd" d={svgPaths.p3d60a00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="facebook" />
        </g>
      </svg>
    </div>
  );
}

function Group11() {
  return (
    <div className="col-1 h-[12.688px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.656px] mask-size-[14px_14px] ml-0 mt-[0.66px] relative row-1 w-[14px]" style={{ maskImage: `url("${imgGroup}")` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12.688">
        <g id="Group">
          <path d={svgPaths.p1d6b7300} fill="var(--fill-0, #263154)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup5() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Clip path group">
      <Group11 />
    </div>
  );
}

function Group10() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
      <ClipPathGroup5 />
    </div>
  );
}

function PrimeTwitter5() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 w-[20px]" data-name="prime:twitter">
      <Group10 />
    </div>
  );
}

function Linkedin5() {
  return (
    <div className="h-[16px] relative shrink-0 w-[20px]" data-name="linkedin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
        <g id="linkedin">
          <path clipRule="evenodd" d={svgPaths.p8b5ce00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="Shape" />
        </g>
      </svg>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-center left-[calc(50%+5.5px)] top-[407px]">
      <Facebook5 />
      <PrimeTwitter5 />
      <div className="h-[14px] relative shrink-0 w-[20px]" data-name="XMLID_823_">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 14">
          <path clipRule="evenodd" d={svgPaths.p326bd400} fill="var(--fill-0, #263154)" fillRule="evenodd" id="XMLID_823_" />
        </svg>
      </div>
      <Linkedin5 />
    </div>
  );
}

function Group46() {
  return (
    <div className="absolute contents left-[calc(50%+5.5px)] top-[374px]">
      <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[52.27%] right-[14.4%] text-[#263154] text-[16px] top-[calc(50%+51px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Stay Connected
      </p>
      <Frame13 />
    </div>
  );
}

function GooglePlayBadgeUs4() {
  return (
    <div className="absolute inset-[80.03%_9.87%_13.78%_52.27%]" data-name="Google Play Badge US">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 142 40">
        <g id="Google Play Badge US">
          <rect fill="var(--fill-0, #263154)" height="40" id="Background Black" rx="5" width="142" />
          <path d={svgPaths.p3a6e5200} fill="var(--fill-0, #999999)" id="Border Gray" />
          <path d={svgPaths.p1d734a00} fill="var(--fill-0, white)" id="Google Play" />
          <g id="GET IT ON">
            <path clipRule="evenodd" d={svgPaths.p141af000} fill="var(--fill-0, white)" fillRule="evenodd" />
            <path d={svgPaths.p2c89000} fill="var(--stroke-0, white)" />
          </g>
          <g id="Icon">
            <path d={svgPaths.p26224000} fill="url(#paint0_linear_10_6953)" id="Shape" />
            <path d={svgPaths.p25896680} fill="url(#paint1_linear_10_6953)" id="Shape_2" />
            <path d={svgPaths.p2dcab5c0} fill="url(#paint2_linear_10_6953)" id="Shape_3" />
            <path d={svgPaths.p2d925300} fill="url(#paint3_linear_10_6953)" id="Shape_4" />
            <path d={svgPaths.p30ea3500} fill="var(--fill-0, #263154)" id="Shape_5" opacity="0.2" />
            <path d={svgPaths.p25adbe40} fill="var(--fill-0, #263154)" id="Shape_6" opacity="0.12" />
            <path d={svgPaths.p20c91300} fill="var(--fill-0, white)" id="Shape_7" opacity="0.25" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10_6953" x1="18.3911" x2="-2.33143" y1="-7.55919" y2="-1.76224">
            <stop stopColor="#00A0FF" />
            <stop offset="0.01" stopColor="#00A1FF" />
            <stop offset="0.26" stopColor="#00BEFF" />
            <stop offset="0.51" stopColor="#00D2FF" />
            <stop offset="0.76" stopColor="#00DFFF" />
            <stop offset="1" stopColor="#00E3FF" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10_6953" x1="35.5939" x2="10.1494" y1="9.79941" y2="9.79941">
            <stop stopColor="#FFE000" />
            <stop offset="0.41" stopColor="#FFBD00" />
            <stop offset="0.78" stopColor="#FFA500" />
            <stop offset="1" stopColor="#FF9C00" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_10_6953" x1="10.6159" x2="-4.92522" y1="13.527" y2="41.0241">
            <stop stopColor="#FF3A44" />
            <stop offset="1" stopColor="#C31162" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_10_6953" x1="0.761248" x2="7.69795" y1="4.09606" y2="16.3747">
            <stop stopColor="#32A071" />
            <stop offset="0.07" stopColor="#2DA771" />
            <stop offset="0.48" stopColor="#15CF74" />
            <stop offset="0.8" stopColor="#06E775" />
            <stop offset="1" stopColor="#00F076" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function AppStoreBadgeUsBlack4() {
  return (
    <div className="absolute inset-[72.6%_17.87%_21.21%_52.27%]" data-name="App Store Badge US Black">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 112 40.0001">
        <g id="App Store Badge US Black">
          <path d={svgPaths.p2eceb200} fill="var(--fill-0, #999999)" id="Background Gray" />
          <path d={svgPaths.p32412d00} fill="var(--fill-0, #263154)" id="Background Black" />
          <path d={svgPaths.p8a57f80} fill="var(--fill-0, white)" id="App Store" />
          <path d={svgPaths.p8e47500} fill="var(--fill-0, white)" id="Download on the" />
          <path d={svgPaths.p2ef3e80} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[47px] h-[3474px] items-start left-[149px] top-[180px]">
      <Frame />
      <div className="h-[265px] relative shrink-0 w-[1440px]" data-name="Web Footer">
        <div className="absolute bg-[#fff2f8] inset-0" data-name="Rectangle Copy" />
        <div className="absolute bottom-[10px] h-[30px] left-[1162px] w-[100px]" data-name="image 3">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage3} />
        </div>
        <p className="[word-break:break-word] absolute bottom-[33px] font-['Open_Sans:Regular',sans-serif] font-normal leading-[16px] left-[1081px] text-[#565962] text-[12px] translate-y-full whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Powered by
        </p>
        <Group12 />
        <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[14px] left-[144px] text-[#565962] text-[12px] top-[calc(50%+110.5px)] whitespace-pre" style={{ fontVariationSettings: '"wdth" 100' }}>{`Copyright © 2022 A1M Health  • CA Insurance License Number 0451271`}</p>
        <div className="absolute h-0 left-0 top-[210px] w-[1440px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 1">
              <line id="Line 23" stroke="var(--stroke-0, #999999)" x2="1440" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold inset-[34.34%_30.14%_58.11%_53.26%] leading-[normal] text-[#263154] text-[16px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Get the Mobile Application
        </p>
        <GooglePlayBadgeUs />
        <AppStoreBadgeUsBlack />
        <Group21 />
        <Group14 />
        <Group22 />
        <Group23 />
      </div>
      <Frame2 />
      <div className="h-[265px] relative shrink-0 w-[1440px]" data-name="Web Footer">
        <div className="absolute bg-[#fff2f8] inset-0" data-name="Rectangle Copy" />
        <div className="absolute bottom-[10px] h-[30px] left-[1162px] w-[100px]" data-name="image 3">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage3} />
        </div>
        <p className="[word-break:break-word] absolute bottom-[33px] font-['Open_Sans:Regular',sans-serif] font-normal leading-[16px] left-[1081px] text-[#565962] text-[12px] translate-y-full whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Powered by
        </p>
        <div className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[55.47%_72.16%_29.43%_10%] leading-[0] text-[#263154] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          <p className="leading-[normal] mb-0">{`9025 Smoky Hollow Street `}</p>
          <p className="leading-[normal]">Niagara Falls, NY 14304</p>
        </div>
        <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[0] left-[144px] text-[0px] text-black top-[109px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          <span className="leading-[normal] text-[#263154] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>{`Email: `}</span>
          <span className="leading-[normal] text-[#0a7593] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            support@eldocomp.com
          </span>
        </p>
        <Group13 />
        <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[14px] left-[144px] text-[#565962] text-[12px] top-[calc(50%+110.5px)] whitespace-pre" style={{ fontVariationSettings: '"wdth" 100' }}>{`Copyright © 2022 A1M Health  • CA Insurance License Number 0451271`}</p>
        <div className="absolute h-0 left-0 top-[210px] w-[1440px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 1">
              <line id="Line 23" stroke="var(--stroke-0, #999999)" x2="1440" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <Group15 />
        <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold inset-[34.34%_51.74%_58.11%_31.67%] leading-[normal] text-[#263154] text-[16px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Get the Mobile Application
        </p>
        <GooglePlayBadgeUs1 />
        <AppStoreBadgeUsBlack1 />
        <Group24 />
        <Frame6 />
      </div>
      <Frame1 />
      <div className="h-[265px] relative shrink-0 w-[1440px]" data-name="Web Footer">
        <div className="absolute bg-[#fff2f8] inset-0" data-name="Rectangle Copy" />
        <div className="absolute bg-[#fff2f8] inset-0" data-name="Rectangle Copy" />
        <Frame7 />
        <div className="absolute bottom-[10px] h-[30px] left-[1162px] w-[100px]" data-name="image 3">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage3} />
        </div>
        <p className="[word-break:break-word] absolute bottom-[33px] font-['Open_Sans:Regular',sans-serif] font-normal leading-[16px] left-[1081px] text-[#565962] text-[12px] translate-y-full whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Powered by
        </p>
        <Group16 />
        <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[14px] left-[144px] text-[#565962] text-[12px] top-[calc(50%+110.5px)] whitespace-pre" style={{ fontVariationSettings: '"wdth" 100' }}>{`Copyright © 2022 A1M Health  • CA Insurance License Number 0451271`}</p>
        <div className="absolute h-0 left-0 top-[210px] w-[1440px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 1">
              <line id="Line 23" stroke="var(--stroke-0, #999999)" x2="1440" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold inset-[34.34%_73.4%_58.11%_10%] leading-[normal] text-[#263154] text-[16px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Get the Mobile Application
        </p>
        <GooglePlayBadgeUs2 />
        <AppStoreBadgeUsBlack2 />
        <Group25 />
      </div>
      <Frame3 />
      <div className="h-[265px] relative shrink-0 w-[1440px]" data-name="Web Footer">
        <div className="absolute bg-[#fff2f8] inset-0" data-name="Rectangle Copy" />
        <div className="absolute bottom-[10px] h-[30px] left-[1162px] w-[100px]" data-name="image 3">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage3} />
        </div>
        <p className="[word-break:break-word] absolute bottom-[33px] font-['Open_Sans:Regular',sans-serif] font-normal leading-[16px] left-[1081px] text-[#565962] text-[12px] translate-y-full whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Powered by
        </p>
        <div className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[55.47%_72.16%_29.43%_10%] leading-[0] text-[#263154] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          <p className="leading-[normal] mb-0">{`9025 Smoky Hollow Street `}</p>
          <p className="leading-[normal]">Niagara Falls, NY 14304</p>
        </div>
        <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[0] left-[144px] text-[0px] text-black top-[109px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          <span className="leading-[normal] text-[#263154] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>{`Email: `}</span>
          <span className="leading-[normal] text-[#0a7593] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            support@eldocomp.com
          </span>
        </p>
        <Group17 />
        <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[14px] left-[144px] text-[#565962] text-[12px] top-[calc(50%+110.5px)] whitespace-pre" style={{ fontVariationSettings: '"wdth" 100' }}>{`Copyright © 2022 A1M Health  • CA Insurance License Number 0451271`}</p>
        <div className="absolute h-0 left-0 top-[210px] w-[1440px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 1">
              <line id="Line 23" stroke="var(--stroke-0, #999999)" x2="1440" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <Group18 />
        <Group19 />
        <Group26 />
        <Group27 />
        <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold inset-[7.55%_8.33%_84.91%_75.07%] leading-[normal] text-[#263154] text-[16px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Get the Mobile Application
        </p>
        <GooglePlayBadgeUs3 />
        <AppStoreBadgeUsBlack3 />
      </div>
      <Frame8 />
      <div className="h-[266px] relative shrink-0 w-[1440px]" data-name="Web Footer">
        <div className="absolute bg-[#fff2f8] inset-0" data-name="Rectangle Copy" />
        <div className="absolute bottom-[11px] h-[30px] left-[1129px] w-[100px]" data-name="image 3">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage3} />
        </div>
        <p className="[word-break:break-word] absolute bottom-[34px] font-['Open_Sans:Regular',sans-serif] font-normal leading-[16px] left-[1048px] text-[#999] text-[12px] translate-y-full whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Powered by
        </p>
        <Group20 />
        <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal h-[15px] leading-[14px] left-[112px] text-[#565962] text-[12px] top-[calc(50%+110px)] w-[517px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>{`Copyright © 2022 A1M Health  • CA Insurance License Number 0451271`}</p>
        <div className="absolute h-0 left-0 top-[210px] w-[1440px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 1">
              <g id="Line 23">
                <line stroke="var(--stroke-0, #6B6F7A)" x2="1440" y1="0.5" y2="0.5" />
                <line stroke="var(--stroke-1, black)" strokeOpacity="0.2" x2="1440" y1="0.5" y2="0.5" />
              </g>
            </svg>
          </div>
        </div>
        <Group28 />
        <Group29 />
        <Group30 />
        <Group31 />
        <Group32 />
        <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[40.6%_75.28%_52.63%_7.78%] leading-[0] text-[#263154] text-[0px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          <span className="leading-[normal] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>{`Email: `}</span>
          <span className="leading-[normal] text-[#0a7593] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            support@eldocomp.com
          </span>
        </p>
        <div className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[54.89%_74.39%_30.08%_7.78%] leading-[0] text-[#263154] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          <p className="leading-[normal] mb-0">{`9025 Smoky Hollow Street `}</p>
          <p className="leading-[normal]">Niagara Falls, NY 14304</p>
        </div>
      </div>
      <Frame10 />
      <div className="h-[620px] relative shrink-0 w-[375px]" data-name="Mobile Footer">
        <div className="absolute bg-[#fff2f8] inset-0" data-name="Rectangle Copy" />
        <Frame11 />
        <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[17.1%_12.27%_79.68%_4.27%] leading-[0] text-[#263154] text-[0px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          <span className="leading-[normal] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>{`Email: `}</span>
          <span className="leading-[normal] text-[#0a7593] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            support@eldocomp.com
          </span>
        </p>
        <Group33 />
        <Group34 />
        <Group35 />
        <Group36 />
        <Group37 />
        <div className="absolute h-0 left-0 top-[548px] w-[375px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 375 1">
              <line id="Line 35" stroke="var(--stroke-0, #999999)" x2="375" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <Group38 />
        <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[14px] left-[16px] text-[#565962] text-[12px] top-[calc(50%+271px)] w-[343px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>{`Copyright © 2022 A1M Health  • CA Insurance License Number 0451271`}</p>
        <Group39 />
      </div>
      <Frame12 />
      <div className="h-[646px] relative shrink-0 w-[375px]" data-name="Mobile Footer">
        <div className="absolute bg-[#fff2f8] inset-0" data-name="Rectangle Copy" />
        <Group40 />
        <Group41 />
        <Group42 />
        <Group43 />
        <Group44 />
        <div className="absolute h-0 left-0 top-[573px] w-[375px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 375 1">
              <line id="Line 35" stroke="var(--stroke-0, #999999)" x2="375" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[14px] left-[16px] text-[#565962] text-[12px] top-[calc(50%+283px)] w-[343px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>{`Copyright © 2022 A1M Health  • CA Insurance License Number 0451271`}</p>
        <Group45 />
        <Group46 />
        <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold inset-[68.27%_2.13%_28.64%_52.27%] leading-[normal] text-[#263154] text-[16px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Get the Mobile App
        </p>
        <GooglePlayBadgeUs4 />
        <AppStoreBadgeUsBlack4 />
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <div className="bg-white relative size-full" data-name="Footer">
      <Header />
      <Frame4 />
    </div>
  );
}
```

## src/imports/Footer/svg-85l6h.tsx
```tsx
export const imgGroup = "data:image/svg+xml,%3Csvg%20preserveAspectRatio%3D%22none%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20overflow%3D%22visible%22%20style%3D%22display%3A%20block%3B%22%20viewBox%3D%220%200%2014%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20id%3D%22primeTwitter0%22%3E%0A%3Cpath%20id%3D%22Vector%22%20d%3D%22M0%200H14V14H0V0Z%22%20fill%3D%22var(--fill-0%2C%20black)%22%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A";
```

## src/imports/Footer/svg-rplma24xlo.ts
```ts
export default {
p1199ca80: "M10.2883 6.09693L26.3134 14.9609C26.7382 15.165 27.0419 15.5491 27.1356 16.0009C27.0932 15.5014 26.7796 15.062 26.3134 14.8489L10.2883 5.98493C9.13715 5.35293 8.19982 5.88093 8.19982 7.16093V7.28093C8.22448 5.99293 9.14537 5.46493 10.2883 6.09693V6.09693Z",
p12d66f80: "M76.4588 8.08691C77.3907 8.08691 77.953 8.77212 77.953 9.90332V10.1514H75.5877V10.1904C75.5668 10.4577 75.6523 10.7225 75.8221 10.9189C75.9919 11.1154 76.231 11.2256 76.4803 11.2227C76.8036 11.2643 77.1186 11.092 77.2772 10.7861H77.9129C77.7276 11.4656 77.1163 11.9045 76.4618 11.8281C76.0153 11.8408 75.5858 11.6422 75.2879 11.2842C74.99 10.9261 74.8538 10.4448 74.9149 9.96875C74.8555 9.49154 74.9918 9.01043 75.2879 8.64941C75.5842 8.28836 76.0112 8.08284 76.4588 8.08691ZM31.746 8.34375C32.2583 8.00185 32.9065 8.00178 33.4188 8.34375C33.931 8.6858 34.2184 9.31048 34.161 9.95605C34.2195 10.6024 33.9325 11.2285 33.4198 11.5713C32.907 11.914 32.2578 11.9138 31.745 11.5713C31.2321 11.2285 30.9443 10.6024 31.0028 9.95605C30.9454 9.31036 31.2336 8.68576 31.746 8.34375ZM46.2723 8.34375C46.7848 8.00173 47.4337 8.00173 47.9461 8.34375C48.4584 8.6858 48.7467 9.31046 48.6893 9.95605C48.7477 10.6024 48.4599 11.2285 47.9471 11.5713C47.4344 11.9139 46.7851 11.9138 46.2723 11.5713C45.7594 11.2286 45.4717 10.6025 45.5301 9.95605C45.4728 9.3105 45.7602 8.68583 46.2723 8.34375ZM59.6727 8.34375C60.1851 8.00174 60.8332 8.00174 61.3456 8.34375C61.8579 8.68577 62.1462 9.31039 62.0887 9.95605C62.1472 10.6024 61.8594 11.2286 61.3465 11.5713C60.8337 11.914 60.1846 11.914 59.6717 11.5713C59.1589 11.2286 58.8711 10.6024 58.9295 9.95605C58.8721 9.31038 59.1603 8.68577 59.6727 8.34375ZM50.8885 8.08691C51.7281 8.08695 52.202 8.53694 52.202 9.29785V11.7588H51.5653V11.2529H51.5135C51.2974 11.6226 50.9122 11.8385 50.5067 11.8184C50.2226 11.85 49.939 11.7511 49.7264 11.5459C49.5138 11.3405 49.3917 11.0476 49.3905 10.7402C49.3905 10.0918 49.8398 9.71817 50.6366 9.66504L51.5438 9.6084V9.29785C51.5438 8.91747 51.3098 8.70225 50.8583 8.70215C50.4893 8.70215 50.2334 8.84786 50.16 9.10254H49.5204C49.5879 8.48381 50.1288 8.08691 50.8885 8.08691ZM56.1932 11.7588H55.5594V11.1895H55.5067C55.292 11.5929 54.8868 11.8355 54.4549 11.8184C53.6033 11.8181 53.0653 11.0968 53.0653 9.95605C53.0653 8.81798 53.609 8.09694 54.4549 8.09668C54.8822 8.0755 55.2827 8.32162 55.4823 8.72852H55.5321V6.75H56.1932V11.7588ZM69.5516 8.17285H70.2772V8.77148H69.5516V10.624C69.5516 11.0013 69.6964 11.1669 70.0252 11.167C70.1094 11.1667 70.1937 11.161 70.2772 11.1504V11.7422C70.1586 11.765 70.0383 11.778 69.9178 11.7793C69.1831 11.7792 68.8906 11.5008 68.8905 10.8066V8.77148H68.3583V8.17285H68.8905V7.25977H69.5516V8.17285ZM28.1356 6.98535C28.7224 6.94006 29.2975 7.18019 29.702 7.63965C30.1063 8.099 30.2983 8.72891 30.2245 9.35645C30.2245 10.8814 29.4575 11.7588 28.1356 11.7588H26.5331V6.98535H28.1356ZM35.9032 10.9053H35.953L36.6415 8.15625H37.2752L37.9637 10.9053H38.0155L38.6131 8.15625H39.2743L38.3544 11.7588H37.6688L36.9764 9.10547H36.9247L36.2352 11.7588H35.5555L34.6327 8.15625H35.3036L35.9032 10.9053ZM41.746 8.08691C42.076 8.06022 42.3994 8.19638 42.6249 8.45703C42.8504 8.71768 42.9536 9.07455 42.9051 9.42676V11.7588H42.244V9.60449C42.2439 9.02589 42.01 8.73828 41.5213 8.73828C41.2976 8.72717 41.0803 8.82169 40.9266 8.99707C40.773 9.17252 40.6978 9.41171 40.7215 9.65137V11.7588H40.0614V8.15625H40.6971V8.72852H40.7469C40.9187 8.30722 41.3197 8.0497 41.746 8.08691ZM44.6141 11.7588H43.953V6.75H44.6141V11.7588ZM64.662 8.08691C64.9921 8.06022 65.3154 8.19638 65.5409 8.45703C65.7663 8.71767 65.8696 9.07457 65.8211 9.42676V11.7588H65.16V9.60449C65.1599 9.02589 64.926 8.73828 64.4374 8.73828C64.2135 8.72713 63.9963 8.82166 63.8426 8.99707C63.689 9.17253 63.6138 9.41169 63.6376 9.65137V11.7588H62.9774V8.15625H63.6131V8.72852H63.6629C63.8347 8.30718 64.2357 8.04964 64.662 8.08691ZM71.8368 8.73535H71.8885C72.0685 8.31033 72.4772 8.05207 72.91 8.08984C73.2382 8.07063 73.5571 8.21003 73.7801 8.46973C74.0031 8.72939 74.107 9.08226 74.0633 9.43262V11.7588H73.4022V9.6084C73.4022 9.03301 73.1524 8.74121 72.6854 8.74121C72.4556 8.72102 72.2288 8.81129 72.0663 8.9873C71.9039 9.16328 71.8223 9.40735 71.8426 9.6543V11.7588H71.1815V6.75H71.8368V8.73535ZM50.7245 10.1875C50.2634 10.2207 50.0545 10.3895 50.0545 10.707C50.0548 11.031 50.3162 11.2197 50.6756 11.2197C50.8884 11.2428 51.1011 11.1718 51.2645 11.0234C51.4278 10.875 51.5284 10.6611 51.5428 10.4316V10.1309L50.7245 10.1875ZM32.5799 8.71875C32.0055 8.71875 31.6816 9.17531 31.6815 9.95605C31.6815 10.7432 32.0054 11.1963 32.5799 11.1963C33.1521 11.1961 33.4784 10.7399 33.4784 9.95605C33.4783 9.17544 33.1521 8.71889 32.5799 8.71875ZM47.1161 8.71875C46.5419 8.71897 46.2187 9.1755 46.2186 9.95605C46.2186 10.743 46.5418 11.1961 47.1161 11.1963C47.6884 11.1963 48.0145 10.74 48.0145 9.95605C48.0145 9.17532 47.6884 8.71875 47.1161 8.71875ZM60.5047 8.71875C59.9303 8.71877 59.6073 9.17533 59.6073 9.95605C59.6073 10.7431 59.9303 11.1963 60.5047 11.1963C61.0771 11.1963 61.4032 10.74 61.4032 9.95605C61.4031 9.17532 61.077 8.71875 60.5047 8.71875ZM54.6454 8.73535C54.089 8.73535 53.7499 9.19824 53.7499 9.95605C53.7499 10.7201 54.0854 11.1797 54.6454 11.1797C55.2022 11.1794 55.5467 10.7131 55.5467 9.95898C55.5467 9.20852 55.1985 8.73561 54.6454 8.73535ZM27.2196 11.084H28.0565C28.4758 11.1109 28.8839 10.9335 29.1678 10.6006C29.4517 10.2675 29.5816 9.81422 29.5204 9.36719C29.577 8.92216 29.446 8.47281 29.1629 8.14258C28.915 7.85342 28.5729 7.68173 28.2118 7.66016H27.2196V11.084ZM76.4667 8.69141C76.2357 8.68829 76.0127 8.78621 75.8495 8.96191C75.6864 9.13759 75.5965 9.37673 75.5995 9.625H77.2909C77.3077 9.38052 77.2272 9.13963 77.0702 8.96191C76.9133 8.78441 76.6943 8.68593 76.4667 8.69141Z",
p141af000: "M72.7978 7.76997C71.5569 9.01874 71.5569 10.9712 72.7978 12.22C74.0779 13.4302 76.1458 13.4302 77.4259 12.22C78.6721 10.9732 78.6721 9.01673 77.4259 7.76997C76.8137 7.18372 75.9808 6.854 75.1118 6.854C74.2429 6.854 73.4099 7.18372 72.7978 7.76997ZM49.0954 12.24C49.6352 11.7041 49.9204 10.9812 49.8843 10.24C49.8843 10.0891 49.8702 9.93849 49.8422 9.78997H46.7813V10.51H49.0638C49.0482 10.9635 48.8615 11.3965 48.5379 11.73C47.8169 12.3925 46.7475 12.5776 45.8272 12.1992C44.9069 11.8208 44.3164 10.9532 44.3305 9.99997C44.3076 9.36919 44.556 8.75676 45.0184 8.30391C45.4809 7.85106 46.1174 7.59687 46.7813 7.59997C47.4417 7.56566 48.0807 7.82865 48.5063 8.30997L49.0638 7.77997C48.7945 7.48553 48.4557 7.25592 48.0751 7.10997C47.6663 6.94364 47.226 6.85856 46.7813 6.85997C45.9089 6.84149 45.0673 7.1673 44.4567 7.75997C43.5169 8.65929 43.2357 10.0066 43.7432 11.1789C44.2507 12.3512 45.4479 13.12 46.7813 13.13C47.6506 13.1594 48.4921 12.8358 49.0954 12.24ZM51.8566 7.73951H54.6966V6.99951H51.0152V12.9995H54.6966V12.2595H51.8566V10.3595H54.4442V9.63951H51.8566V7.73951ZM58.1241 12.9995H57.3142V7.73951H55.5471V6.99951H59.9333V7.73951H58.1241V12.9995ZM63.0393 6.99951V12.9995H63.8492V6.99951H63.0393ZM67.4634 12.9995H66.6534V7.73951H64.8863V6.99951H69.22V7.73951H67.4634V12.9995ZM73.3876 11.7196C74.3357 12.6172 75.8686 12.6172 76.8166 11.7196C77.7477 10.7438 77.7477 9.25545 76.8166 8.27962C75.8686 7.38205 74.3357 7.38205 73.3876 8.27962C72.4565 9.25545 72.4565 10.7438 73.3876 11.7196ZM79.5167 6.99951V12.9995H80.3371V8.10951L83.5453 12.9995H84.3867V6.99951H83.5768V11.6695L80.5054 6.99951H79.5167Z",
p1d6b7300: "M11.025 0H13.172L8.482 5.374L14 12.688H9.68L6.294 8.253L2.424 12.688H0.275L5.291 6.938L0 0.000999987H4.43L7.486 4.054L11.025 0ZM10.27 11.4H11.46L3.78 1.221H2.504L10.27 11.4Z",
p1d734a00: "M81.2833 21.6995C82.1824 21.6985 83.0393 22.0624 83.6388 22.6995H83.713V21.9993H85.5216V29.5696C85.5216 32.7095 83.618 33.9992 81.3145 33.9993C79.5782 34.0091 78.0089 33.0163 77.3487 31.4895L79.0636 30.8098C79.422 31.7008 80.3114 32.2972 81.3145 32.3196C82.787 32.3195 83.7022 31.4495 83.7022 29.8196V29.2102H83.6388C83.0477 29.8581 82.1853 30.2245 81.2833 30.2102C78.8957 30.1001 77.0186 28.2269 77.0186 25.9543C77.0188 23.682 78.8959 21.8095 81.2833 21.6995ZM127.851 27.4202H127.914L130.165 22.0002H132.353L126.968 33.7903H124.916L126.915 29.5803L123.412 22.0002H125.516L127.851 27.4202ZM61.8819 21.7493C63.0733 21.7297 64.2228 22.1697 65.0675 22.969C65.914 23.7702 66.3816 24.8638 66.3643 25.9993C66.3643 28.3452 64.3651 30.2474 61.8975 30.2493C59.4302 30.2509 57.4279 28.3518 57.4239 26.0061C57.42 23.6608 59.4153 21.7558 61.8819 21.7493ZM71.6632 21.7493C72.8575 21.7275 74.0099 22.1678 74.8565 22.969C75.7032 23.7702 76.1717 24.8637 76.1544 25.9993C76.1543 28.3439 74.1567 30.2456 71.6905 30.2493C69.2247 30.2527 67.2219 28.3572 67.2139 26.0129C67.2062 23.6683 69.197 21.7603 71.6632 21.7493ZM94.0538 21.7493C95.7974 21.8104 97.3203 22.8887 97.8819 24.4592L98.1026 24.9094L92.1182 27.26C92.4935 28.0719 93.3531 28.5828 94.2852 28.5491C95.1853 28.5511 96.0205 28.1032 96.4835 27.3694L98.0089 28.3694C97.1787 29.5507 95.7796 30.2568 94.2852 30.2493C93.0972 30.2658 91.9525 29.8223 91.1153 29.0207C90.2784 28.2192 89.82 27.1284 89.8458 25.9993C89.7732 24.8959 90.1845 23.8131 90.9815 23.008C91.7786 22.203 92.8909 21.7471 94.0538 21.7493ZM50.2169 16.9993C52.0058 16.9845 53.7255 17.6592 54.9825 18.8694L53.6466 20.1399C52.725 19.294 51.4879 18.8301 50.2071 18.8498C47.4187 18.8498 45.1583 20.9987 45.1583 23.6496C45.1583 26.3006 47.4187 28.4495 50.2071 28.4495C51.518 28.499 52.7899 28.02 53.7091 27.1301C54.319 26.5079 54.6896 25.7074 54.7608 24.8596H50.2169V23.0598L56.6016 23.01C56.675 23.3825 56.7105 23.761 56.7071 24.1399C56.7565 25.6955 56.1684 27.2086 55.0665 28.3596C53.8071 29.6133 52.0384 30.2875 50.2169 30.2092C47.6705 30.3033 45.2735 29.0659 43.9708 26.9836C42.6682 24.9014 42.6682 22.3081 43.9708 20.2258C45.2735 18.1436 47.6705 16.9052 50.2169 16.9993ZM119.249 21.6995L119.301 21.7288C121.541 21.7288 123.288 22.999 123.288 25.1887V29.9993H121.395V28.9993H121.331C120.784 29.8079 119.816 30.2683 118.807 30.1995C117.988 30.2569 117.18 29.9967 116.566 29.4788C115.951 28.9609 115.584 28.229 115.546 27.4495C115.546 25.6395 117.45 24.6389 119.333 24.6389C120.048 24.6361 120.752 24.8014 121.384 25.1194V24.9895C121.334 24.5092 121.083 24.0676 120.688 23.7649C120.292 23.4622 119.785 23.3232 119.28 23.3791C118.545 23.322 117.844 23.6828 117.492 24.2991L115.746 23.6096C116.41 22.3667 117.786 21.6163 119.249 21.6995ZM88.8702 30.0002H86.9034V17.5002H88.8702V30.0002ZM114.456 17.5002V30.0002H112.489V17.5002H114.456ZM107.084 17.4993C108.612 17.3951 110.073 18.1113 110.87 19.3547C111.668 20.5982 111.668 22.1611 110.87 23.4045C110.073 24.6478 108.612 25.3632 107.084 25.259H104.338V29.9993H102.371V17.4993H107.084ZM62.6925 23.6028C61.6537 23.2173 60.4728 23.4755 59.7149 24.2532C58.9572 25.0308 58.7764 26.17 59.2598 27.1252C59.7436 28.0805 60.7932 28.6574 61.9054 28.5793H61.8946C62.5923 28.564 63.2542 28.2809 63.7296 27.7952C64.2047 27.3094 64.4532 26.6618 64.419 25.9993C64.416 24.9391 63.7312 23.9884 62.6925 23.6028ZM72.4698 23.6038C71.4324 23.2173 70.2512 23.4727 69.4923 24.2483C68.7333 25.0239 68.55 26.1625 69.0304 27.1184C69.5107 28.0742 70.5575 28.6532 71.669 28.5793C72.3664 28.5639 73.0278 28.2816 73.503 27.7961C73.9783 27.3103 74.2277 26.6619 74.1934 25.9993C74.1906 24.9402 73.507 23.9903 72.4698 23.6038ZM81.4483 28.5803H81.4591C81.4574 28.5802 81.4558 28.5795 81.4542 28.5793C81.4524 28.5794 81.4501 28.5802 81.4483 28.5803ZM81.4591 23.4202C80.0527 23.5381 78.9737 24.658 78.9737 26.0002C78.9739 27.3408 80.0504 28.4592 81.4542 28.5793C82.1358 28.553 82.7768 28.2636 83.2286 27.7776C83.6815 27.2903 83.9047 26.6481 83.8468 26.0002C83.8987 25.3553 83.675 24.7174 83.2257 24.2317C82.7761 23.746 82.1387 23.4533 81.4591 23.4202ZM119.526 26.1594C118.538 26.1594 117.423 26.4897 117.423 27.4895C117.423 28.2394 118.316 28.5499 118.958 28.55L119.011 28.5793C120.196 28.5519 121.179 27.6987 121.315 26.5793C120.769 26.2898 120.151 26.1448 119.526 26.1594ZM94.1173 23.3996C93.4595 23.4279 92.8416 23.7068 92.4024 24.1731C91.9632 24.6395 91.7394 25.2545 91.7823 25.8791L95.7794 24.3C95.4649 23.7107 94.8108 23.3562 94.1173 23.3996ZM104.326 23.4993H107.072L107.114 23.5295C108.36 23.5293 109.37 22.5694 109.37 21.385C109.37 20.2005 108.36 19.2397 107.114 19.2395H104.326V23.4993Z",
p20c91300: "M13.1636 7.61967L33.6642 18.6997C34.2077 18.9547 34.5961 19.4348 34.716 19.9997C34.6618 19.3753 34.2606 18.8261 33.6642 18.5597L13.1636 7.47967C11.691 6.68967 10.4919 7.34967 10.4919 8.94967V9.09967C10.5234 7.48967 11.7015 6.82967 13.1636 7.61967V7.61967Z",
p211ff5c0: "M22.2066 19.4251L18.8355 16.1211V15.8891L22.2066 12.5771L22.2806 12.6171L26.3177 14.8491C27.4688 15.4811 27.4688 16.5211 26.3177 17.1611L22.297 19.3851L22.2066 19.4251Z",
p22529870: "M63.5398 17.3585C64.2428 17.3576 64.9129 17.6485 65.3816 18.1583H65.4392V17.5987H66.8533V23.6544C66.8533 26.1664 65.3649 27.1984 63.5642 27.1984C62.2071 27.2061 60.9807 26.4119 60.4646 25.1905L61.8055 24.6466C62.0856 25.3592 62.7803 25.8366 63.5642 25.8546C64.7153 25.8546 65.4314 25.1585 65.4314 23.8546V23.3663H65.3816C64.9195 23.8849 64.2452 24.1777 63.5398 24.1661C61.6736 24.078 60.207 22.5807 60.2068 20.7628C60.2068 18.9448 61.6735 17.4466 63.5398 17.3585ZM99.9402 21.9357H99.99L101.75 17.5997H103.46L99.2498 27.0314H97.6463L99.2088 23.6642L96.4705 17.5997H98.115L99.9402 21.9357ZM48.3719 17.3985C49.3034 17.3827 50.2016 17.7345 50.8621 18.3741C51.5239 19.015 51.8902 19.8895 51.8767 20.798C51.8767 22.6746 50.3142 24.1967 48.3855 24.1984C46.4568 24.1998 44.8907 22.6804 44.8875 20.8038C44.8845 18.9278 46.4441 17.4042 48.3719 17.3985ZM56.0183 17.3985C56.952 17.3811 57.8535 17.7332 58.5154 18.3741C59.177 19.015 59.5435 19.8897 59.5301 20.798C59.53 22.6736 57.9685 24.1953 56.0408 24.1984C54.113 24.2013 52.5468 22.6844 52.5408 20.8087C52.5348 18.9332 54.0908 17.4076 56.0183 17.3985ZM73.5213 17.3985C74.8845 17.4474 76.0754 18.3099 76.5144 19.5665L76.6873 19.9269L72.0086 21.8067C72.3018 22.4563 72.9733 22.8658 73.7019 22.839C74.4056 22.8407 75.0587 22.4817 75.4207 21.8946L76.6131 22.6944C75.964 23.6396 74.8702 24.2045 73.7019 24.1984C72.7735 24.2115 71.8797 23.8569 71.2254 23.2159C70.5711 22.5748 70.2121 21.7022 70.2322 20.7989C70.1754 19.9162 70.4969 19.0495 71.1199 18.4054C71.7429 17.7613 72.6122 17.3969 73.5213 17.3985ZM39.2556 13.5987C40.6539 13.587 41.9977 14.1268 42.9803 15.0948L41.9363 16.1105C41.2158 15.4337 40.2482 15.0633 39.2469 15.0792C37.0673 15.0794 35.3006 16.7984 35.3006 18.9191C35.3007 21.0396 37.0674 22.7587 39.2469 22.7589C40.2717 22.7986 41.2666 22.4153 41.9851 21.7032C42.4619 21.2055 42.7517 20.5651 42.8074 19.8868H39.2556V18.4464L44.2459 18.4073C44.3032 18.7052 44.3315 19.0076 44.3289 19.3107C44.3676 20.5552 43.9071 21.7658 43.0457 22.6866C42.0613 23.6895 40.6795 24.2296 39.2556 24.1671C37.265 24.2425 35.3912 23.252 34.3728 21.586C33.3545 19.9202 33.3546 17.8457 34.3728 16.1798C35.3912 14.5139 37.265 13.5234 39.2556 13.5987ZM93.2176 17.3585L93.2586 17.3829C95.0099 17.3829 96.3747 18.3986 96.3748 20.1505V23.9982H94.8953V23.1984H94.8455C94.4176 23.8453 93.6614 24.2133 92.8728 24.1583C92.2328 24.2043 91.601 23.9965 91.1209 23.5821C90.6409 23.1679 90.3535 22.5827 90.324 21.9591C90.324 20.5111 91.8122 19.711 93.284 19.711C93.8426 19.7088 94.3937 19.8405 94.8875 20.0948V19.9903C94.8482 19.6061 94.6517 19.253 94.3426 19.0109C94.0335 18.7688 93.6371 18.6576 93.243 18.7023C92.6683 18.6565 92.1195 18.9455 91.8445 19.4386L90.4803 18.8868C90.9988 17.8926 92.0737 17.2921 93.2176 17.3585ZM69.4695 23.9991H67.9324V13.9991H69.4695V23.9991ZM89.4715 13.9991V23.9991H87.9344V13.9991H89.4715ZM83.7078 13.9982C84.9021 13.9148 86.0444 14.4878 86.6678 15.4825C87.291 16.4773 87.2911 17.728 86.6678 18.7228C86.0444 19.7174 84.902 20.2895 83.7078 20.2062H81.5613V23.9982H80.0242V13.9982H83.7078ZM49.0076 18.8819C48.1958 18.5737 47.2728 18.7795 46.6805 19.4015C46.0881 20.0236 45.9471 20.9352 46.325 21.6993C46.7031 22.4635 47.5231 22.9248 48.3924 22.8624H48.3846C48.9299 22.8501 49.4466 22.624 49.8181 22.2355C50.1897 21.8469 50.3849 21.329 50.3582 20.7989C50.3558 19.9508 49.8196 19.1904 49.0076 18.8819ZM56.6502 18.8829C55.8393 18.5738 54.9163 18.7782 54.323 19.3985C53.7298 20.0191 53.5862 20.9297 53.9617 21.6944C54.3372 22.459 55.1554 22.9225 56.0242 22.8634C56.5694 22.851 57.0863 22.6249 57.4578 22.2364C57.8294 21.8478 58.0236 21.3291 57.9969 20.7989C57.9945 19.9518 57.4608 19.1921 56.6502 18.8829ZM63.6697 22.8634H63.6785C63.6773 22.8633 63.6758 22.8625 63.6746 22.8624C63.673 22.8625 63.6713 22.8633 63.6697 22.8634ZM63.6785 18.7355C62.5791 18.8297 61.7351 19.7261 61.7351 20.7999C61.7354 21.8724 62.5771 22.7665 63.6746 22.8624C64.2072 22.8412 64.7082 22.6105 65.0613 22.2218C65.4153 21.832 65.5899 21.3182 65.5447 20.7999C65.5853 20.2839 65.4097 19.7734 65.0584 19.3849C64.7071 18.9964 64.2096 18.7621 63.6785 18.7355ZM93.4334 20.9269C92.6607 20.927 91.7901 21.1908 91.7898 21.9903C91.7898 22.5903 92.4885 22.839 92.99 22.839L93.031 22.8624C93.9572 22.8404 94.7255 22.1583 94.8318 21.2628C94.4052 21.0311 93.9218 20.9151 93.4334 20.9269ZM73.573 18.7189C73.0587 18.7414 72.5746 18.9648 72.2312 19.338C71.8881 19.7112 71.7142 20.2035 71.7478 20.7032L74.8719 19.4386C74.6261 18.9673 74.115 18.6842 73.573 18.7189ZM81.5525 18.7989H83.699L83.7312 18.8224C84.7053 18.8224 85.4949 18.0543 85.4949 17.1066C85.4948 16.1589 84.7052 15.3907 83.7312 15.3907H81.5525V18.7989Z",
p25896680: "M28.4097 24.2797L24.0971 20.1497V19.8597L28.4097 15.7197L28.5044 15.7697L33.669 18.5597C35.1416 19.3497 35.1416 20.6497 33.669 21.4497L28.5254 24.2297L28.4097 24.2797Z",
p25adbe40: "M10.5086 31.1316C10.5297 31.5654 10.6979 31.9835 10.9929 32.32L11.0672 32.3991L10.9929 32.4695C10.6641 32.0943 10.4938 31.6183 10.5086 31.1316ZM10.5096 31.07C10.5083 31.0906 10.5092 31.1111 10.5086 31.1316C10.5052 31.0612 10.5051 30.9906 10.5096 30.9197V31.07ZM34.6883 19.9997C34.6341 20.6241 34.233 21.1738 33.6365 21.4402L28.4715 24.2195L28.3777 24.1296L33.6365 21.2995C34.18 21.0445 34.5684 20.5645 34.6883 19.9997Z",
p26224000: "M10.9931 7.53978C10.6503 7.93089 10.4773 8.43158 10.5093 8.93978V31.0598C10.4773 31.568 10.6503 32.0687 10.9931 32.4598L11.0668 32.5298L24.0992 20.1498V19.8598L11.0668 7.46978L10.9931 7.53978Z",
p2632eb80: "M106.889 0C109.159 0 111 1.79086 111 4V28C111 30.2091 109.159 32 106.889 32H4.11133C1.84082 32 0 30.2091 0 28V4C3.31081e-08 1.79086 1.84082 0 4.11133 0H106.889ZM4.1084 0.639648C2.20117 0.639648 0.654297 2.14432 0.654297 4V28C0.654492 29.8555 2.20129 31.3594 4.1084 31.3594H106.886C108.793 31.3594 110.339 29.8555 110.339 28V4C110.339 2.14433 108.793 0.639663 106.886 0.639648H4.1084Z",
p27462500: "M38.1852 17.0771C39.8942 17.0772 41.0212 18.5309 41.0212 20.7754C41.0211 23.026 39.9007 24.4717 38.2106 24.4717C37.337 24.5208 36.5136 24.0292 36.0915 23.2051H36.0602V26.792H34.6774V17.1533H36.0153V18.3584H36.0407C36.4816 17.5394 37.3058 17.0466 38.1852 17.0771ZM45.6003 17.0771C47.3092 17.0773 48.4352 18.531 48.4352 20.7754C48.4352 23.026 47.3157 24.4716 45.6257 24.4717C44.7521 24.5208 43.9287 24.0292 43.5065 23.2051H43.4753V26.792H42.0925V17.1533H43.4304V18.3584H43.4557C43.8966 17.5394 44.7209 17.0466 45.6003 17.0771ZM55.529 14.2969C57.4805 14.2969 58.8179 15.4745 58.863 17.1885H57.4684C57.3849 16.1971 56.6228 15.5987 55.5095 15.5986C54.3961 15.5986 53.6336 16.2038 53.6335 17.085C53.6335 17.7873 54.1208 18.2012 55.3112 18.5176L56.3288 18.7861C58.2235 19.2682 59.0104 20.087 59.0104 21.54C59.0103 23.3985 57.634 24.5625 55.445 24.5625C53.397 24.5624 52.0138 23.4257 51.9245 21.6289H53.3395C53.4419 22.614 54.3318 23.2607 55.5475 23.2607C56.7126 23.2607 57.5505 22.6139 57.5505 21.7256C57.5504 20.9546 57.0452 20.4931 55.8483 20.1768L54.6511 19.8662C52.9555 19.4256 52.1687 18.5726 52.1686 17.1885C52.1686 15.4744 53.557 14.2969 55.529 14.2969ZM67.2048 17.0645C69.1571 17.0645 70.3991 18.4965 70.3991 20.7754C70.3991 23.0605 69.1636 24.4863 67.2048 24.4863C65.2467 24.4862 64.0114 23.0604 64.0114 20.7754C64.0114 18.4966 65.2591 17.0646 67.2048 17.0645ZM78.4001 17.0645C80.2628 17.0646 81.4341 18.441 81.4343 20.6367V21.1465H76.6784V21.2363C76.634 21.7755 76.8074 22.3096 77.154 22.7021C77.5005 23.0944 77.9871 23.308 78.4899 23.2881C79.1605 23.3556 79.7926 22.9413 80.0446 22.2695H81.3571C81.171 23.5841 79.9806 24.4863 78.4577 24.4863C76.4989 24.4863 75.2829 23.0744 75.2829 20.8096C75.283 18.5378 76.5059 17.0645 78.4001 17.0645ZM61.987 17.1533H63.2673V18.3311H61.987V22.3242C61.9871 22.9442 62.2436 23.2334 62.8063 23.2334C62.9581 23.2305 63.1097 23.2192 63.2604 23.1992V24.3691C63.0075 24.4199 62.7501 24.4426 62.4929 24.4375C61.1298 24.4374 60.5983 23.887 60.5983 22.4824V18.3311H59.6188V17.1533H60.5983V15.4395H61.987V17.1533ZM33.821 24.3975H32.3044L31.4596 21.7119H27.9391L27.0934 24.3975H25.6022L28.9372 14.4629H30.486L33.821 24.3975ZM74.5104 17.0771C74.6697 17.0766 74.8287 17.0954 74.9841 17.1328V18.5234C74.783 18.4574 74.5731 18.427 74.363 18.4336C73.9568 18.4159 73.5636 18.59 73.2868 18.9102C73.01 19.2304 72.8767 19.6652 72.9225 20.0996V24.3965H71.5407V17.1533H72.8591V18.3857H72.8913C73.0752 17.5924 73.7508 17.0461 74.5104 17.0771ZM67.2009 18.29C66.0811 18.2903 65.4157 19.2203 65.4157 20.7764C65.4158 22.3455 66.0812 23.2605 67.2009 23.2607C68.3207 23.2607 68.9869 22.3456 68.987 20.7764C68.987 19.2131 68.3208 18.29 67.2009 18.29ZM37.8278 18.3457C36.7717 18.3457 36.0612 19.3303 36.0612 20.7764C36.0613 22.2356 36.7718 23.2129 37.8278 23.2129C38.9025 23.2127 39.607 22.2558 39.6071 20.7764C39.6071 19.3101 38.9026 18.3459 37.8278 18.3457ZM45.2311 18.3457C44.1751 18.3457 43.4645 19.3303 43.4645 20.7764C43.4646 22.2356 44.1751 23.2129 45.2311 23.2129C46.3058 23.2126 47.0104 22.2557 47.0104 20.7764C47.0104 19.3102 46.3058 18.346 45.2311 18.3457ZM28.3083 20.4727H31.0993L29.7233 16.1152H29.6852L28.3083 20.4727ZM78.3932 18.2686C77.9386 18.2656 77.5014 18.4586 77.1794 18.8037C76.8574 19.1489 76.6772 19.6184 76.6784 20.1074H80.0446C80.0697 19.623 79.9059 19.1487 79.5925 18.7998C79.279 18.451 78.8441 18.2583 78.3932 18.2686Z",
p2c89000: "M72.7978 12.22L72.7268 12.2905L72.7291 12.2926L72.7978 12.22ZM72.7978 7.76997L72.7286 7.69773L72.7268 7.69948L72.7978 7.76997ZM77.4259 12.22L77.4946 12.2927L77.4966 12.2907L77.4259 12.22ZM77.4259 7.76997L77.4967 7.69926L77.4951 7.69775L77.4259 7.76997ZM49.8843 10.24L49.7841 10.2399L49.7844 10.2448L49.8843 10.24ZM49.0954 12.24L49.1656 12.3111L49.1658 12.3109L49.0954 12.24ZM49.8422 9.78997L49.9404 9.77141L49.9251 9.68997H49.8422V9.78997ZM46.7813 9.78997V9.68997H46.6813V9.78997H46.7813ZM46.7813 10.51H46.6813V10.61H46.7813V10.51ZM49.0638 10.51L49.1638 10.5134L49.1673 10.41H49.0638V10.51ZM48.5379 11.73L48.6057 11.8037L48.6096 11.7996L48.5379 11.73ZM45.8272 12.1992L45.7892 12.2917V12.2917L45.8272 12.1992ZM44.3305 9.99997L44.4306 10.0015L44.4304 9.99634L44.3305 9.99997ZM45.0184 8.30391L45.0884 8.37536V8.37536L45.0184 8.30391ZM46.7813 7.59997L46.7808 7.70013L46.7865 7.69984L46.7813 7.59997ZM48.5063 8.30997L48.4314 8.37622L48.5001 8.45388L48.5752 8.38245L48.5063 8.30997ZM49.0638 7.77997L49.1327 7.85245L49.2038 7.78486L49.1376 7.71248L49.0638 7.77997ZM48.0751 7.10997L48.0374 7.20262L48.0393 7.20334L48.0751 7.10997ZM46.7813 6.85997L46.7792 6.95998L46.7816 6.95997L46.7813 6.85997ZM44.4567 7.75997L44.5258 7.83222L44.5263 7.83173L44.4567 7.75997ZM43.7432 11.1789L43.6514 11.2186V11.2186L43.7432 11.1789ZM46.7813 13.13L46.7847 13.03L46.782 13.03L46.7813 13.13ZM54.6966 7.73951V7.83951H54.7966V7.73951H54.6966ZM51.8566 7.73951V7.63951H51.7566V7.73951H51.8566ZM54.6966 6.99951H54.7966V6.89951H54.6966V6.99951ZM51.0152 6.99951V6.89951H50.9152V6.99951H51.0152ZM51.0152 12.9995H50.9152V13.0995H51.0152V12.9995ZM54.6966 12.9995V13.0995H54.7966V12.9995H54.6966ZM54.6966 12.2595H54.7966V12.1595H54.6966V12.2595ZM51.8566 12.2595H51.7566V12.3595H51.8566V12.2595ZM51.8566 10.3595V10.2595H51.7566V10.3595H51.8566ZM54.4442 10.3595V10.4595H54.5442V10.3595H54.4442ZM54.4442 9.63951H54.5442V9.53951H54.4442V9.63951ZM51.8566 9.63951H51.7566V9.73951H51.8566V9.63951ZM57.3142 12.9995H57.2142V13.0995H57.3142V12.9995ZM58.1241 12.9995V13.0995H58.2241V12.9995H58.1241ZM57.3142 7.73951H57.4142V7.63951H57.3142V7.73951ZM55.5471 7.73951H55.4471V7.83951H55.5471V7.73951ZM55.5471 6.99951V6.89951H55.4471V6.99951H55.5471ZM59.9333 6.99951H60.0333V6.89951H59.9333V6.99951ZM59.9333 7.73951V7.83951H60.0333V7.73951H59.9333ZM58.1241 7.73951V7.63951H58.0241V7.73951H58.1241ZM63.0393 12.9995H62.9393V13.0995H63.0393V12.9995ZM63.0393 6.99951V6.89951H62.9393V6.99951H63.0393ZM63.8492 12.9995V13.0995H63.9492V12.9995H63.8492ZM63.8492 6.99951H63.9492V6.89951H63.8492V6.99951ZM66.6534 12.9995H66.5534V13.0995H66.6534V12.9995ZM67.4634 12.9995V13.0995H67.5634V12.9995H67.4634ZM66.6534 7.73951H66.7534V7.63951H66.6534V7.73951ZM64.8863 7.73951H64.7863V7.83951H64.8863V7.73951ZM64.8863 6.99951V6.89951H64.7863V6.99951H64.8863ZM69.22 6.99951H69.32V6.89951H69.22V6.99951ZM69.22 7.73951V7.83951H69.32V7.73951H69.22ZM67.4634 7.73951V7.63951H67.3634V7.73951H67.4634ZM76.8166 11.7196L76.8855 11.7923L76.889 11.7887L76.8166 11.7196ZM73.3876 11.7196L73.3152 11.7887L73.3189 11.7922L73.3876 11.7196ZM76.8166 8.27962L76.8891 8.2105L76.8854 8.207L76.8166 8.27962ZM73.3876 8.27962L73.3188 8.20691L73.3153 8.21059L73.3876 8.27962ZM79.5167 12.9995H79.4167V13.0995H79.5167V12.9995ZM79.5167 6.99951V6.89951H79.4167V6.99951H79.5167ZM80.3371 12.9995V13.0995H80.4371V12.9995H80.3371ZM80.3371 8.10951L80.4207 8.05466L80.2371 7.77479V8.10951H80.3371ZM83.5453 12.9995L83.4616 13.0544L83.4913 13.0995H83.5453V12.9995ZM84.3867 12.9995V13.0995H84.4867V12.9995H84.3867ZM84.3867 6.99951H84.4867V6.89951H84.3867V6.99951ZM83.5768 6.99951V6.89951H83.4768V6.99951H83.5768ZM83.5768 11.6695L83.4933 11.7245L83.6768 12.0035V11.6695H83.5768ZM80.5054 6.99951L80.589 6.94456L80.5593 6.89951H80.5054V6.99951ZM72.7978 12.22L72.8687 12.1495C71.6666 10.9397 71.6666 9.05022 72.8687 7.84046L72.7978 7.76997L72.7268 7.69948C71.4472 8.98725 71.4472 11.0027 72.7268 12.2905L72.7978 12.22ZM77.4259 12.22L77.3572 12.1473C76.1157 13.3211 74.108 13.3211 72.8665 12.1473L72.7978 12.22L72.7291 12.2926C74.0477 13.5393 76.176 13.5393 77.4946 12.2926L77.4259 12.22ZM77.4259 7.76997L77.3552 7.84067C78.5624 9.04838 78.5624 10.9416 77.3552 12.1493L77.4259 12.22L77.4966 12.2907C78.7819 11.0049 78.7819 8.98509 77.4966 7.69928L77.4259 7.76997ZM75.1118 6.854V6.954C75.9557 6.954 76.7637 7.27426 77.3568 7.84219L77.4259 7.76997L77.4951 7.69775C76.8638 7.09318 76.0058 6.754 75.1118 6.754V6.854ZM72.7978 7.76997L72.8669 7.84219C73.46 7.27426 74.268 6.954 75.1118 6.954V6.854V6.754C74.2179 6.754 73.3599 7.09318 72.7286 7.69775L72.7978 7.76997ZM49.8843 10.24L49.7844 10.2448C49.8191 10.957 49.5453 11.6525 49.0249 12.169L49.0954 12.24L49.1658 12.3109C49.7252 11.7557 50.0217 11.0054 49.9841 10.2351L49.8843 10.24ZM49.8422 9.78997L49.7439 9.80853C49.7708 9.95092 49.7843 10.0953 49.7843 10.2399L49.8843 10.24L49.9843 10.24C49.9843 10.0829 49.9697 9.92605 49.9404 9.77141L49.8422 9.78997ZM46.7813 9.78997V9.88997H49.8422V9.78997V9.68997H46.7813V9.78997ZM46.7813 10.51H46.8813V9.78997H46.7813H46.6813V10.51H46.7813ZM49.0638 10.51V10.41H46.7813V10.51V10.61H49.0638V10.51ZM48.5379 11.73L48.6096 11.7996C48.9501 11.4488 49.1473 10.9924 49.1638 10.5134L49.0638 10.51L48.9639 10.5065C48.9492 10.9346 48.773 11.3442 48.4661 11.6603L48.5379 11.73ZM45.8272 12.1992L45.7892 12.2917C46.7446 12.6846 47.8554 12.493 48.6056 11.8036L48.5379 11.73L48.4702 11.6563C47.7785 12.2921 46.7504 12.4707 45.8652 12.1067L45.8272 12.1992ZM44.3305 9.99997L44.2305 9.99849C44.2158 10.9951 44.833 11.8986 45.7892 12.2917L45.8272 12.1992L45.8652 12.1067C44.9807 11.743 44.417 10.9112 44.4305 10.0014L44.3305 9.99997ZM45.0184 8.30391L44.9485 8.23246C44.4665 8.70444 44.2066 9.34389 44.2305 10.0036L44.3305 9.99997L44.4304 9.99634C44.4086 9.39449 44.6455 8.80909 45.0884 8.37536L45.0184 8.30391ZM46.7813 7.59997L46.7818 7.49997C46.0923 7.49676 45.4302 7.76067 44.9485 8.23246L45.0184 8.30391L45.0884 8.37536C45.5315 7.94144 46.1425 7.69699 46.7808 7.69997L46.7813 7.59997ZM48.5063 8.30997L48.5812 8.24373C48.1347 7.73881 47.4659 7.46427 46.7761 7.50011L46.7813 7.59997L46.7865 7.69984C47.4175 7.66705 48.0266 7.91848 48.4314 8.37622L48.5063 8.30997ZM49.0638 7.77997L48.9949 7.7075L48.4374 8.2375L48.5063 8.30997L48.5752 8.38245L49.1327 7.85245L49.0638 7.77997ZM48.0751 7.10997L48.0393 7.20334C48.4057 7.34386 48.7314 7.56473 48.99 7.84746L49.0638 7.77997L49.1376 7.71248C48.8576 7.40632 48.5057 7.16799 48.1109 7.0166L48.0751 7.10997ZM46.7813 6.85997L46.7816 6.95997C47.2134 6.9586 47.6407 7.04121 48.0374 7.2026L48.0751 7.10997L48.1128 7.01734C47.6918 6.84607 47.2386 6.75852 46.781 6.75997L46.7813 6.85997ZM44.4567 7.75997L44.5263 7.83173C45.1173 7.2582 45.9327 6.94201 46.7792 6.95995L46.7813 6.85997L46.7834 6.75999C45.885 6.74096 45.0174 7.07639 44.3871 7.68821L44.4567 7.75997ZM43.7432 11.1789L43.835 11.1392C43.3445 10.0062 43.6155 8.70333 44.5258 7.83222L44.4567 7.75997L44.3876 7.68772C43.4183 8.61525 43.127 10.007 43.6514 11.2186L43.7432 11.1789ZM46.7813 13.13L46.782 13.03C45.486 13.0203 44.3259 12.2731 43.835 11.1392L43.7432 11.1789L43.6514 11.2186C44.1755 12.4293 45.4098 13.2198 46.7805 13.23L46.7813 13.13ZM49.0954 12.24L49.0251 12.1688C48.4419 12.7448 47.6274 13.0586 46.7847 13.03L46.7813 13.13L46.7779 13.2299C47.6739 13.2602 48.5422 12.9268 49.1656 12.3111L49.0954 12.24ZM54.6966 7.73951V7.63951H51.8566V7.73951V7.83951H54.6966V7.73951ZM54.6966 6.99951H54.5966V7.73951H54.6966H54.7966V6.99951H54.6966ZM51.0152 6.99951V7.09951H54.6966V6.99951V6.89951H51.0152V6.99951ZM51.0152 12.9995H51.1152V6.99951H51.0152H50.9152V12.9995H51.0152ZM54.6966 12.9995V12.8995H51.0152V12.9995V13.0995H54.6966V12.9995ZM54.6966 12.2595H54.5966V12.9995H54.6966H54.7966V12.2595H54.6966ZM51.8566 12.2595V12.3595H54.6966V12.2595V12.1595H51.8566V12.2595ZM51.8566 10.3595H51.7566V12.2595H51.8566H51.9566V10.3595H51.8566ZM54.4442 10.3595V10.2595H51.8566V10.3595V10.4595H54.4442V10.3595ZM54.4442 9.63951H54.3442V10.3595H54.4442H54.5442V9.63951H54.4442ZM51.8566 9.63951V9.73951H54.4442V9.63951V9.53951H51.8566V9.63951ZM51.8566 7.73951H51.7566V9.63951H51.8566H51.9566V7.73951H51.8566ZM57.3142 12.9995V13.0995H58.1241V12.9995V12.8995H57.3142V12.9995ZM57.3142 7.73951H57.2142V12.9995H57.3142H57.4142V7.73951H57.3142ZM55.5471 7.73951V7.83951H57.3142V7.73951V7.63951H55.5471V7.73951ZM55.5471 6.99951H55.4471V7.73951H55.5471H55.6471V6.99951H55.5471ZM59.9333 6.99951V6.89951H55.5471V6.99951V7.09951H59.9333V6.99951ZM59.9333 7.73951H60.0333V6.99951H59.9333H59.8333V7.73951H59.9333ZM58.1241 7.73951V7.83951H59.9333V7.73951V7.63951H58.1241V7.73951ZM58.1241 12.9995H58.2241V7.73951H58.1241H58.0241V12.9995H58.1241ZM63.0393 12.9995H63.1393V6.99951H63.0393H62.9393V12.9995H63.0393ZM63.8492 12.9995V12.8995H63.0393V12.9995V13.0995H63.8492V12.9995ZM63.8492 6.99951H63.7492V12.9995H63.8492H63.9492V6.99951H63.8492ZM63.0393 6.99951V7.09951H63.8492V6.99951V6.89951H63.0393V6.99951ZM66.6534 12.9995V13.0995H67.4634V12.9995V12.8995H66.6534V12.9995ZM66.6534 7.73951H66.5534V12.9995H66.6534H66.7534V7.73951H66.6534ZM64.8863 7.73951V7.83951H66.6534V7.73951V7.63951H64.8863V7.73951ZM64.8863 6.99951H64.7863V7.73951H64.8863H64.9863V6.99951H64.8863ZM69.22 6.99951V6.89951H64.8863V6.99951V7.09951H69.22V6.99951ZM69.22 7.73951H69.32V6.99951H69.22H69.12V7.73951H69.22ZM67.4634 7.73951V7.83951H69.22V7.73951V7.63951H67.4634V7.73951ZM67.4634 12.9995H67.5634V7.73951H67.4634H67.3634V12.9995H67.4634ZM76.8166 11.7196L76.7479 11.647C75.8384 12.5081 74.3659 12.5081 73.4564 11.647L73.3876 11.7196L73.3189 11.7922C74.3055 12.7263 75.8988 12.7263 76.8854 11.7922L76.8166 11.7196ZM76.8166 8.27962L76.7443 8.34865C77.6385 9.28584 77.6385 10.7134 76.7443 11.6506L76.8166 11.7196L76.889 11.7887C77.857 10.7742 77.857 9.22505 76.889 8.21059L76.8166 8.27962ZM73.3876 8.27962L73.4564 8.35224C74.3659 7.49118 75.8384 7.49118 76.7479 8.35224L76.8166 8.27962L76.8854 8.207C75.8988 7.27293 74.3055 7.27293 73.3189 8.207L73.3876 8.27962ZM73.3876 11.7196L73.46 11.6506C72.5657 10.7134 72.5657 9.28584 73.46 8.34865L73.3876 8.27962L73.3153 8.21059C72.3473 9.22505 72.3473 10.7742 73.3153 11.7887L73.3876 11.7196ZM79.5167 12.9995H79.6167V6.99951H79.5167H79.4167V12.9995H79.5167ZM80.3371 12.9995V12.8995H79.5167V12.9995V13.0995H80.3371V12.9995ZM80.3371 8.10951H80.2371V12.9995H80.3371H80.4371V8.10951H80.3371ZM83.5453 12.9995L83.6289 12.9447L80.4207 8.05466L80.3371 8.10951L80.2535 8.16437L83.4616 13.0544L83.5453 12.9995ZM84.3867 12.9995V12.8995H83.5453V12.9995V13.0995H84.3867V12.9995ZM84.3867 6.99951H84.2867V12.9995H84.3867H84.4867V6.99951H84.3867ZM83.5768 6.99951V7.09951H84.3867V6.99951V6.89951H83.5768V6.99951ZM83.5768 11.6695H83.6768V6.99951H83.5768H83.4768V11.6695H83.5768ZM80.5054 6.99951L80.4219 7.05446L83.4933 11.7245L83.5768 11.6695L83.6604 11.6146L80.589 6.94456L80.5054 6.99951ZM79.5167 6.99951V7.09951H80.5054V6.99951V6.89951H79.5167V6.99951Z",
p2d925300: "M28.5406 15.7801L13.1731 7.48005C12.5235 6.99733 11.6045 7.02253 10.9852 7.54005L24.1018 20.0001L28.5406 15.7801Z",
p2dcab5c0: "M28.5459 24.2195L24.107 19.9995L11.001 32.4595C11.6202 32.977 12.5392 33.0022 13.1888 32.5195L28.5564 24.2195",
p2e6c3100: "M6.28145 31.3001C6.05484 31.3001 5.83371 31.297 5.60888 31.2915C5.14314 31.285 4.67847 31.2414 4.21871 31.1611C3.79001 31.0816 3.37471 30.9339 2.98652 30.7227C2.60188 30.5133 2.25106 30.2387 1.9475 29.9095C1.63954 29.5841 1.38315 29.2067 1.1885 28.7923C0.991692 28.3751 0.855492 27.928 0.78464 27.4665C0.708127 26.9706 0.66673 26.4692 0.660806 25.9665C0.656091 25.7978 0.649918 25.236 0.649918 25.236V6.75565C0.649918 6.75565 0.656492 6.20252 0.660843 6.04002C0.666515 5.53817 0.707671 5.0375 0.783956 4.54237C0.854938 4.07958 0.991244 3.63118 1.18815 3.21269C1.3821 2.79854 1.63706 2.42088 1.94316 2.09433C2.24892 1.76469 2.60086 1.48868 2.98615 1.27636C3.37345 1.06587 3.78797 0.919181 4.21581 0.841211C4.67708 0.760064 5.14335 0.716192 5.61071 0.709963L6.28181 0.700195H82.7158L83.3949 0.710355C83.858 0.716275 84.3201 0.759755 84.7771 0.840427C85.2093 0.919375 85.6281 1.06709 86.0198 1.27871C86.7917 1.70658 87.4198 2.38352 87.816 3.21464C88.0097 3.63025 88.1439 4.07499 88.214 4.53377C88.2912 5.03297 88.3344 5.53757 88.3433 6.04354C88.3454 6.2701 88.3454 6.51346 88.3454 6.75565C88.3513 7.05565 88.3513 7.34119 88.3513 7.62908V24.372C88.3513 24.6626 88.3513 24.9462 88.3454 25.2321C88.3454 25.4923 88.3454 25.7306 88.3425 25.9759C88.3339 26.4728 88.2914 26.9684 88.2154 27.4587C88.146 27.9235 88.0106 28.3741 87.8138 28.7947C87.6178 29.2046 87.3629 29.5787 87.0585 29.9032C86.7546 30.2342 86.4032 30.5105 86.0177 30.7212C85.627 30.934 85.2088 31.0823 84.7771 31.1611C84.3174 31.2418 83.8527 31.2854 83.3869 31.2915C83.169 31.297 82.9409 31.3001 82.7194 31.3001L81.9132 31.3017L6.28145 31.3001Z",
p2e74de00: "M22.2147 19.3047L10.3007 25.9047C9.81313 26.2594 9.14378 26.2594 8.65623 25.9047L8.59868 25.9607L8.65623 26.0167C9.14286 26.374 9.81405 26.374 10.3007 26.0167L22.3133 19.3767L22.2147 19.3047Z",
p2eceb200: "M103.081 0.00013H8.92402C8.5808 0.00013 8.24171 0.00013 7.8994 0.00213C7.61286 0.00413 7.3286 0.00994 7.03931 0.01483C6.41083 0.0227318 5.78382 0.0818063 5.16375 0.19154C4.54454 0.303663 3.94474 0.515046 3.38461 0.81854C2.82517 1.1246 2.314 1.5223 1.86963 1.9972C1.42293 2.47077 1.05057 3.01815 0.766873 3.61829C0.482391 4.21724 0.285129 4.85907 0.181903 5.52161C0.0776944 6.18331 0.021619 6.85265 0.0141797 7.52361C0.00549405 7.83021 0.00457681 8.13783 0 8.44447V31.5587C0.00457681 31.8692 0.00549405 32.17 0.0141797 32.4806C0.0216213 33.1516 0.0776967 33.8209 0.181903 34.4825C0.284844 35.1455 0.482117 35.7877 0.766873 36.3868C1.05044 36.985 1.42286 37.5302 1.86963 38.0011C2.31231 38.4781 2.82382 38.8761 3.38461 39.1798C3.94473 39.4841 4.54448 39.6968 5.16375 39.8106C5.78393 39.9195 6.41087 39.9786 7.03931 39.9874C7.3286 39.9942 7.61286 39.9981 7.8994 39.9981C8.2417 40.0001 8.58082 40.0001 8.92402 40.0001H103.081C103.417 40.0001 103.759 40.0001 104.096 39.9981C104.381 39.9981 104.673 39.9942 104.958 39.9874C105.586 39.9791 106.211 39.92 106.83 39.8106C107.452 39.696 108.054 39.4834 108.616 39.1798C109.177 38.8759 109.688 38.478 110.13 38.0011C110.576 37.5284 110.949 36.9836 111.236 36.3868C111.519 35.7872 111.714 35.1451 111.815 34.4825C111.92 33.8208 111.978 33.1516 111.989 32.4806C111.993 32.17 111.993 31.8692 111.993 31.5587C112 31.1954 112 30.8341 112 30.4649V9.53626C112 9.17005 112 8.80677 111.993 8.44447C111.993 8.13783 111.993 7.83021 111.989 7.52357C111.978 6.85255 111.92 6.18337 111.815 5.52157C111.714 4.85941 111.518 4.21763 111.236 3.61825C110.658 2.41533 109.742 1.43616 108.616 0.81845C108.054 0.515697 107.452 0.30437 106.83 0.19145C106.212 0.0812328 105.586 0.0221378 104.958 0.01469C104.673 0.00981 104.381 0.00395 104.096 0.002C103.759 0 103.417 0 103.081 0V0.00013Z",
p2ef3e80: "M21.65 13.9907C23.1439 14.0407 24.5291 14.8408 25.3864 16.1489C24.0337 17.0374 23.2009 18.6039 23.1803 20.3003C23.1822 22.2196 24.2582 23.952 25.9127 24.6997C25.5945 25.8041 25.1151 26.8481 24.4918 27.7925C23.6547 29.1304 22.7765 30.4373 21.3834 30.4614C20.0299 30.4948 19.5746 29.6099 18.0221 29.6099C16.4554 29.61 15.9705 30.4371 14.6725 30.4946C13.3459 30.5471 12.332 29.067 11.4645 27.7417C9.73053 25.0351 8.37994 20.1136 10.1901 16.7651C11.0401 15.1333 12.6296 14.0979 14.3766 14.0376C15.7045 14.0084 16.9381 14.9956 17.7545 14.9956C18.5555 14.9952 20.0787 13.8147 21.65 13.9907ZM21.6618 8.72021C21.7524 9.98442 21.3773 11.2363 20.6178 12.2104C19.8809 13.1897 18.7645 13.7546 17.5885 13.7417C17.5137 12.5139 17.8987 11.3037 18.6588 10.3794C19.4286 9.4426 20.5014 8.85043 21.6618 8.72021Z",
p30285a80: "M81.9126 0.000104H7.09141C6.81867 0.000104 6.54921 0.000104 6.2772 0.00170399C6.0495 0.00330399 5.82362 0.00795197 5.59373 0.011864C5.09432 0.0181854 4.59607 0.0654448 4.10334 0.153232C3.61129 0.242929 3.13466 0.412035 2.68956 0.65483C2.24501 0.899678 1.8388 1.21783 1.48569 1.59775C1.13072 1.97661 0.834831 2.41451 0.609391 2.89462C0.383328 3.37378 0.226576 3.88724 0.144548 4.41727C0.0617393 4.94664 0.0171794 5.4821 0.0112678 6.01887C0.00436581 6.26415 0.00363693 6.51024 0 6.75555V25.2469C0.00363693 25.4953 0.00436581 25.7359 0.0112678 25.9844C0.0171812 26.5212 0.0617411 27.0566 0.144548 27.5859C0.226349 28.1163 0.383111 28.63 0.609391 29.1094C0.834728 29.5879 1.13066 30.0241 1.48569 30.4008C1.83746 30.7824 2.24393 31.1008 2.68956 31.3438C3.13465 31.5872 3.61123 31.7573 4.10334 31.8484C4.59616 31.9355 5.09435 31.9828 5.59373 31.9898C5.82362 31.9953 6.0495 31.9984 6.2772 31.9984C6.54921 32 6.81869 32 7.09141 32H81.9126C82.1799 32 82.4515 32 82.7188 31.9984C82.9454 31.9984 83.1779 31.9953 83.4045 31.9898C83.9029 31.9831 84.4002 31.9359 84.892 31.8484C85.3857 31.7567 85.864 31.5866 86.3112 31.3438C86.7564 31.1006 87.1625 30.7823 87.514 30.4008C87.8681 30.0226 88.1647 29.5868 88.3928 29.1094C88.6174 28.6297 88.7727 28.116 88.8533 27.5859C88.9362 27.0565 88.9823 26.5212 88.9913 25.9844C88.9942 25.7359 88.9942 25.4953 88.9942 25.2469C89 24.9563 89 24.6672 89 24.3719V7.62898C89 7.33602 89 7.04539 88.9942 6.75555C88.9942 6.51024 88.9942 6.26415 88.9913 6.01884C88.9823 5.48202 88.9362 4.94668 88.8533 4.41724C88.7724 3.88752 88.6172 3.3741 88.3928 2.89459C87.9337 1.93225 87.2057 1.14892 86.3112 0.654758C85.864 0.412557 85.3856 0.243496 84.892 0.15316C84.4003 0.064986 83.903 0.0177102 83.4045 0.011752C83.1779 0.00784797 82.9454 0.00315999 82.7188 0.00159999C82.4515 0 82.1799 0 81.9126 0V0.000104Z",
p30ea3500: "M28.4196 24.1299L13.1783 32.3799C12.5546 32.8232 11.6983 32.8232 11.0746 32.3799L11.001 32.4499L11.0746 32.5199C11.6971 32.9666 12.5558 32.9666 13.1783 32.5199L28.5459 24.2199L28.4196 24.1299Z",
p32412d00: "M7.90586 39.125C7.62069 39.125 7.34241 39.1211 7.05948 39.1143C6.47337 39.1061 5.88863 39.0516 5.31006 38.9512C4.77056 38.8519 4.24794 38.6673 3.75943 38.4033C3.27539 38.1415 2.83391 37.7983 2.4519 37.3867C2.06436 36.98 1.74171 36.5082 1.49675 35.9902C1.24909 35.4688 1.07769 34.9099 0.988526 34.333C0.892239 33.7131 0.840144 33.0863 0.832689 32.458C0.826756 32.2471 0.818987 31.5449 0.818987 31.5449V8.44434C0.818987 8.44434 0.827261 7.75293 0.832736 7.5498C0.839874 6.92248 0.891666 6.29665 0.987665 5.67773C1.07699 5.09925 1.24852 4.53875 1.49632 4.01563C1.74038 3.49794 2.06124 3.02586 2.44644 2.61768C2.83121 2.20562 3.27411 1.8606 3.75897 1.59521C4.24636 1.33209 4.76799 1.14873 5.3064 1.05127C5.88687 0.949836 6.47364 0.894996 7.06179 0.88721L7.90632 0.875H104.093L104.948 0.8877C105.53 0.895099 106.112 0.94945 106.687 1.05029C107.231 1.14898 107.758 1.33362 108.251 1.59814C109.222 2.13299 110.012 2.97916 110.511 4.01807C110.755 4.53758 110.924 5.09351 111.012 5.66699C111.109 6.29099 111.164 6.92174 111.175 7.5542C111.177 7.8374 111.177 8.1416 111.177 8.44434C111.185 8.81934 111.185 9.17627 111.185 9.53613V30.4648C111.185 30.8281 111.185 31.1826 111.177 31.54C111.177 31.8652 111.177 32.1631 111.174 32.4697C111.163 33.0909 111.109 33.7104 111.014 34.3232C110.926 34.9043 110.756 35.4675 110.508 35.9932C110.262 36.5056 109.941 36.9733 109.558 37.3789C109.175 37.7927 108.733 38.1379 108.248 38.4014C107.756 38.6674 107.23 38.8527 106.687 38.9512C106.108 39.0522 105.524 39.1067 104.937 39.1143C104.663 39.1211 104.376 39.125 104.097 39.125L103.083 39.127L7.90586 39.125Z",
p3247de00: "M8.59244 6.03256C8.32444 6.34545 8.18918 6.746 8.21421 7.15256V24.8486C8.18918 25.2551 8.32444 25.6557 8.59244 25.9686L8.64999 26.0246L18.8373 16.1206V15.8886L8.64999 5.97656L8.59244 6.03256Z",
p326bd400: "M14.6201 0C17.1656 0 18.4985 0.348194 19.2205 1.2018C19.9457 2.05919 20 3.37246 20 5.27803V8.72204C20 10.9057 19.6537 12.1669 18.8422 12.9394C18.0508 13.6927 16.8276 14 14.6201 14H5.37974C0.832 14 0 12.2226 0 8.72204V5.27803C0 3.47109 0 2.16553 0.701226 1.27945C1.42045 0.370654 2.77594 0 5.37974 0H14.6201ZM8.64406 9.65676L12.8401 7.47551C13.0532 7.36475 13.1867 7.14522 13.1865 6.90586C13.1861 6.66669 13.0521 6.44748 12.8386 6.33724L8.64258 4.17004C8.44265 4.06673 8.20297 4.07469 8.01026 4.19109C7.81761 4.3075 7.70006 4.51541 7.70006 4.7395V9.08801C7.70006 9.31248 7.81794 9.52059 8.01097 9.63693C8.11348 9.69866 8.22923 9.72972 8.34523 9.72972C8.44768 9.72972 8.55026 9.70553 8.64406 9.65676Z",
p34d3eaec: "M22.3134 19.376L18.8436 16L8.59868 25.968C9.08274 26.382 9.80112 26.4022 10.3089 26.016L22.3216 19.376",
p355a5900: "M17.2039 11.1934C18.3908 11.2334 19.4905 11.8728 20.1717 12.9189C19.0968 13.6298 18.436 14.8841 18.4198 16.2412C18.4214 17.7765 19.2761 19.1617 20.5907 19.7598C20.3378 20.6433 19.9561 21.4789 19.4608 22.2344C18.7957 23.3044 18.0986 24.3496 16.992 24.3691C15.9165 24.3958 15.5546 23.6886 14.3211 23.6885C13.076 23.6885 12.6904 24.3503 11.659 24.3965C10.6048 24.4385 9.7986 23.2536 9.10922 22.1934C7.73148 20.0282 6.65854 16.0917 8.09652 13.4131C8.77197 12.1075 10.0353 11.2787 11.4237 11.2305C12.4787 11.2071 13.4585 11.9969 14.1073 11.9971C14.7437 11.9971 15.955 11.0524 17.2039 11.1934ZM17.2108 6.97656C17.2828 7.98795 16.9853 8.99017 16.3817 9.76953C15.7961 10.5526 14.9087 11.0035 13.9745 10.9932C13.9151 10.0111 14.2212 9.04403 14.825 8.30469C15.4367 7.55527 16.2887 7.08078 17.2108 6.97656Z",
p38f0b0f0: "M56.9063 9.77617C57.9069 10.7444 59.5234 10.7444 60.524 9.77617C61.4982 8.77876 61.4982 7.21358 60.524 6.21617C60.0455 5.74717 59.3944 5.4834 58.7152 5.4834C58.0359 5.4834 57.3848 5.74717 56.9063 6.21617C55.9363 7.21519 55.9363 8.77716 56.9063 9.77617ZM38.3778 9.7919C38.7998 9.3632 39.0227 8.78489 38.9944 8.1919C38.9945 8.07119 38.9835 7.95071 38.9615 7.8319H36.5689V8.4079H38.3531C38.3409 8.7707 38.195 9.11713 37.942 9.3839C37.3784 9.91394 36.5425 10.062 35.8231 9.75931C35.1037 9.45657 34.6421 8.76245 34.6531 7.9999C34.6352 7.49528 34.8294 7.00533 35.1909 6.64305C35.5523 6.28077 36.0499 6.07742 36.5689 6.0799C37.0851 6.05245 37.5846 6.26284 37.9173 6.6479L38.3531 6.2239C38.1426 5.98835 37.8777 5.80466 37.5802 5.6879C37.2606 5.55484 36.9165 5.48677 36.5689 5.4879C35.8869 5.47311 35.2291 5.73376 34.7518 6.2079C34.0171 6.92736 33.7974 8.00519 34.194 8.94303C34.5907 9.88087 35.5266 10.496 36.5689 10.5039C37.2484 10.5274 37.9062 10.2685 38.3778 9.7919ZM40.5367 6.19161H42.7567V5.59961H39.8789V10.3996H42.7567V9.80761H40.5367V8.28761H42.5594V7.71161H40.5367V6.19161ZM45.4354 10.3996H44.8023V6.19161H43.421V5.59961H46.8496V6.19161H45.4354V10.3996ZM49.2779 5.59961V10.3996H49.911V5.59961H49.2779ZM52.7351 10.3996H52.102V6.19161H50.7207V5.59961H54.1082V6.19161H52.7351V10.3996ZM57.3659 9.3755C58.107 10.0936 59.3052 10.0936 60.0463 9.3755C60.7741 8.59484 60.7741 7.40416 60.0463 6.6235C59.3052 5.90545 58.107 5.90545 57.3659 6.6235C56.638 7.40416 56.638 8.59484 57.3659 9.3755ZM62.1579 5.59961V10.3996H62.7992V6.48761L65.307 10.3996H65.9647V5.59961H65.3316V9.33561L62.9307 5.59961H62.1579Z",
p3a6e5200: "M136.741 0C139.646 0.000240451 142 2.23872 142 5V35C142 37.7613 139.646 39.9998 136.741 40H5.25879C2.3544 39.9998 0 37.7613 0 35V5C0 2.23873 2.3544 0.000241614 5.25879 0H136.741ZM5.25586 0.799805C2.81599 0.799805 0.837891 2.6804 0.837891 5V35C0.838001 37.3195 2.81606 39.2002 5.25586 39.2002H136.737C139.177 39.2001 141.155 37.3195 141.155 35V5C141.155 2.68044 139.177 0.799856 136.737 0.799805H5.25586Z",
p3d60a00: "M11.148 4.92433V3.34543C11.148 2.7533 11.5471 2.61405 11.8306 2.61405H13.5604V0.00985853L11.1769 0C8.53143 0 7.93012 1.94429 7.93012 3.18584V4.92156H6.4V7.60493H7.93012V15.2H11.148V7.60493H13.319L13.6 4.92433H11.148Z",
p3d90f900: "M22.3082 12.6246L10.2955 5.98463C9.78776 5.59845 9.06938 5.61861 8.58532 6.03263L18.8384 16.0006L22.3082 12.6246Z",
p5b93500: "M8.21212 24.9043C8.22827 25.2519 8.36011 25.5868 8.59103 25.8564L8.64864 25.9199L8.59103 25.9766C8.33358 25.676 8.20014 25.2943 8.21212 24.9043ZM8.2131 24.8564C8.21212 24.8724 8.21261 24.8884 8.21212 24.9043C8.20953 24.8486 8.20964 24.7925 8.2131 24.7363V24.8564ZM27.1135 16C27.0711 16.4995 26.7574 16.9392 26.2912 17.1523L22.2541 19.376L22.1799 19.3037L26.2912 17.04C26.716 16.836 27.0198 16.4518 27.1135 16Z",
p8a57f80: "M48.0533 21.3477C50.2039 21.3477 51.6216 23.1642 51.6217 25.9697C51.6217 28.7832 50.2125 30.5908 48.0856 30.5908C46.9862 30.6522 45.9508 30.037 45.4195 29.0068H45.3795V33.4912H43.6402V21.4424H45.3238V22.9482H45.3551C45.9099 21.9246 46.9468 21.3097 48.0533 21.3477ZM57.3844 21.3477C59.535 21.3477 60.9527 23.1642 60.9527 25.9697C60.9527 28.7831 59.5434 30.5907 57.4166 30.5908C56.3172 30.6523 55.2818 30.037 54.7506 29.0068H54.7096V33.4912H52.9703V21.4424H54.6539V22.9482H54.6861C55.241 21.9246 56.2778 21.3095 57.3844 21.3477ZM69.8785 17.8711C72.3344 17.8711 74.0181 19.3428 74.0748 21.4854H72.319C72.2139 20.2462 71.2551 19.4982 69.8541 19.498C68.4529 19.498 67.4938 20.2549 67.4938 21.3564C67.4938 22.2344 68.1061 22.751 69.6041 23.1465L70.8844 23.4824C73.2691 24.085 74.2604 25.1084 74.2604 26.9248C74.2603 29.248 72.5279 30.7031 69.7731 30.7031C67.1957 30.703 65.4558 29.2821 65.3434 27.0361H67.1236C67.2525 28.2675 68.3721 29.0761 69.902 29.0762C71.368 29.0762 72.4234 28.2676 72.4234 27.1572C72.4234 26.1934 71.787 25.6162 70.2809 25.2207L68.774 24.833C66.64 24.2822 65.649 23.2157 65.649 21.4854C65.649 19.3428 67.397 17.8711 69.8785 17.8711ZM84.5719 21.3311C87.0287 21.3311 88.5914 23.1211 88.5914 25.9697C88.5914 28.8261 87.0369 30.6084 84.5719 30.6084C82.1077 30.6084 80.5533 28.8262 80.5533 25.9697C80.5533 23.1211 82.1232 21.3311 84.5719 21.3311ZM98.6608 21.3311C101.005 21.3311 102.48 23.0518 102.48 25.7969V26.4336H96.4947V26.5459C96.4389 27.2199 96.6563 27.8873 97.0924 28.3779C97.5285 28.8685 98.1412 29.1352 98.774 29.1104C99.6181 29.1948 100.414 28.677 100.731 27.8369H102.382C102.148 29.4804 100.651 30.6084 98.734 30.6084C96.2689 30.6084 94.7389 28.8437 94.7389 26.0127C94.7389 23.1729 96.2771 21.3311 98.6608 21.3311ZM78.0045 21.4424H79.6158V22.9141H78.0045V27.9053C78.0045 28.6807 78.3274 29.042 79.0358 29.042C79.2269 29.0384 79.4183 29.0241 79.608 28.999V30.4619C79.2895 30.5255 78.9652 30.5543 78.6412 30.5479C76.9258 30.5478 76.2565 29.8593 76.2565 28.1035V22.9141H75.025V21.4424H76.2565V19.2998H78.0045V21.4424ZM42.5602 30.4961H40.652L39.5895 27.1396H35.1588L34.0953 30.4961H32.2184L36.4147 18.0781H38.3639L42.5602 30.4961ZM93.7672 21.3477C93.9676 21.3469 94.1674 21.3702 94.3629 21.417V23.1553C94.1099 23.0727 93.846 23.0347 93.5816 23.043C93.0705 23.0208 92.5756 23.2385 92.2272 23.6387C91.8787 24.0391 91.7113 24.5827 91.7691 25.126V30.4961H90.0299V21.4424H91.6891V22.9834H91.7291C91.9605 21.9915 92.8111 21.3086 93.7672 21.3477ZM84.569 22.8623C83.1596 22.8624 82.3229 24.0245 82.3229 25.9697C82.3229 27.9316 83.1596 29.0761 84.569 29.0762C85.9784 29.0762 86.817 27.9316 86.817 25.9697C86.817 24.0156 85.9784 22.8623 84.569 22.8623ZM47.6031 22.9316C46.2742 22.9317 45.3805 24.1621 45.3805 25.9697C45.3805 27.7939 46.2742 29.0156 47.6031 29.0156C48.9559 29.0156 49.8424 27.8193 49.8424 25.9697C49.8424 24.1367 48.9559 22.9316 47.6031 22.9316ZM56.9195 22.9316C55.5906 22.9316 54.6959 24.1621 54.6959 25.9697C54.6959 27.7939 55.5906 29.0156 56.9195 29.0156C58.2721 29.0154 59.1588 27.8192 59.1588 25.9697C59.1588 24.1369 58.2721 22.9319 56.9195 22.9316ZM35.6256 25.5908H39.1373L37.4059 20.1436H37.358L35.6256 25.5908ZM98.652 22.8369C98.0799 22.8333 97.5299 23.0744 97.1246 23.5059C96.7196 23.9373 96.4923 24.5236 96.4938 25.1348H100.73C100.762 24.5291 100.555 23.9372 100.161 23.501C99.7662 23.0648 99.2195 22.8239 98.652 22.8369Z",
p8b5ce00: "M3.85687 0H16.1431C16.8925 0 17.5 0.648 17.5 1.44733V14.5526C17.5 15.352 16.8925 16 16.1431 16H3.85687C3.1075 16 2.5 15.352 2.5 14.5526V1.44733C2.5 0.648 3.1075 0 3.85687 0ZM6.74677 14.2366C6.96486 14.2366 7.14164 14.0481 7.14164 13.8155V6.2996C7.14164 6.06697 6.96486 5.87841 6.74677 5.87841H5.0659C4.84781 5.87841 4.67103 6.06697 4.67103 6.2996V13.8155C4.67103 14.0481 4.84781 14.2366 5.0659 14.2366H6.74677ZM5.90634 5.16993C5.02444 5.16993 4.3095 4.40733 4.3095 3.46664C4.3095 2.52595 5.02444 1.76335 5.90634 1.76335C6.78823 1.76335 7.50317 2.52595 7.50317 3.46664C7.50317 4.40733 6.78827 5.16993 5.90634 5.16993ZM15.5627 14.2366C15.7632 14.2366 15.9258 14.0632 15.9258 13.8494V10.2119L15.9258 10.185C15.9259 8.59811 15.926 5.75229 13.0541 5.75229C11.7499 5.75229 11.1373 6.26157 10.7251 6.92138V6.26568C10.7251 6.05181 10.5626 5.87841 10.3621 5.87841H8.6176C8.41711 5.87841 8.25454 6.05181 8.25454 6.26568V13.8494C8.25454 14.0632 8.41711 14.2366 8.6176 14.2366H10.3621C10.5626 14.2366 10.7251 14.0632 10.7251 13.8494V9.78325C10.7704 9.2369 10.9959 8.01948 12.1075 8.01948C13.435 8.01948 13.4087 9.54571 13.3976 10.1886C13.3968 10.2397 13.396 10.2853 13.396 10.324V13.8494C13.396 14.0632 13.5585 14.2366 13.759 14.2366H15.5627Z",
p8e47500: "M96.2174 10.1079C97.3901 10.1079 98.0973 10.9644 98.0973 12.3784V12.688H95.1217V12.7378C95.0954 13.0719 95.2021 13.4024 95.4157 13.6479C95.6293 13.8935 95.9301 14.0315 96.2438 14.0278C96.6507 14.08 97.0471 13.8644 97.2467 13.4819H98.0475C97.8143 14.3312 97.0449 14.88 96.2214 14.7847C95.6594 14.8005 95.1187 14.5516 94.7438 14.104C94.3691 13.6565 94.1972 13.0553 94.2741 12.4604C94.1993 11.8638 94.371 11.2614 94.7438 10.8101C95.1166 10.359 95.6542 10.1028 96.2174 10.1079ZM39.9479 10.4282C40.5926 10.0008 41.4086 10.0009 42.0534 10.4282C42.6981 10.8557 43.0601 11.6369 42.988 12.4438C43.0616 13.2518 42.6997 14.0349 42.0544 14.4634C41.409 14.8916 40.5922 14.8917 39.9469 14.4634C39.3016 14.0349 38.9397 13.2518 39.0133 12.4438C38.9413 11.6369 39.3032 10.8557 39.9479 10.4282ZM58.2292 10.4282C58.8739 10.0008 59.6899 10.0009 60.3346 10.4282C60.9795 10.8557 61.3424 11.6377 61.2702 12.4448C61.3435 13.2527 60.9809 14.035 60.3356 14.4634C59.6902 14.8916 58.8735 14.8917 58.2282 14.4634C57.5829 14.035 57.2212 13.2527 57.2946 12.4448C57.2224 11.6377 57.5843 10.8557 58.2292 10.4282ZM75.0915 10.4282C75.7362 10.0009 76.5522 10.0009 77.1969 10.4282C77.8416 10.8557 78.2036 11.6369 78.1315 12.4438C78.2052 13.2518 77.8433 14.0349 77.1979 14.4634C76.5526 14.8917 75.7358 14.8917 75.0905 14.4634C74.4451 14.0349 74.0833 13.2518 74.1569 12.4438C74.0848 11.6369 74.4468 10.8557 75.0915 10.4282ZM64.0397 10.1079C65.0961 10.1079 65.6919 10.6697 65.6921 11.6206V14.6978H64.8913V14.0649H64.8258C64.554 14.5269 64.0704 14.797 63.5602 14.772C63.2025 14.8117 62.8454 14.6878 62.5778 14.4312C62.3101 14.1744 62.1564 13.8086 62.1549 13.4243C62.1549 12.6138 62.7197 12.146 63.7223 12.0796L64.8639 12.0093V11.6206C64.8637 11.1454 64.5697 10.8766 64.0016 10.8765C63.5373 10.8765 63.215 11.0591 63.1227 11.3774H62.318C62.4031 10.604 63.0837 10.1079 64.0397 10.1079ZM70.7126 14.6978H69.9147V13.9858H69.8493C69.5792 14.4902 69.0695 14.7933 68.526 14.772C67.454 14.772 66.7762 13.8708 66.776 12.4448C66.776 11.022 67.4612 10.1206 68.526 10.1206C69.0635 10.0942 69.5668 10.4014 69.818 10.9097H69.8805V8.43701H70.7126V14.6978ZM87.5241 10.2153H88.4372V10.9644H87.5241V13.2798C87.5242 13.751 87.7062 13.9574 88.1198 13.9575C88.2257 13.9572 88.332 13.9503 88.4372 13.937V14.6772C88.2879 14.7058 88.1367 14.7205 87.985 14.7222C87.06 14.7222 86.6921 14.3745 86.6921 13.5063V10.9634H86.0221V10.2153H86.6921V9.07373H87.5241V10.2153ZM35.4059 8.73096C36.1442 8.67446 36.8677 8.97508 37.3766 9.54932C37.8854 10.1236 38.1269 10.9113 38.0339 11.6958C38.0339 13.6019 37.0692 14.6976 35.4059 14.6978H33.3883V8.73096H35.4059ZM45.1803 13.6304H45.2419L46.1091 10.1948H46.9069L47.7731 13.6304H47.8385L48.5905 10.1948H49.4216L48.2653 14.6978H47.402L46.5309 11.3813H46.4655L45.5973 14.6978H44.7428L43.5817 10.1948H44.4255L45.1803 13.6304ZM52.5319 10.1079C52.9473 10.0746 53.3546 10.245 53.6383 10.5708C53.922 10.8966 54.0518 11.3426 53.9909 11.7827V14.6978H53.1589V12.0063C53.1589 11.2828 52.8646 10.9225 52.2497 10.9224C51.968 10.9083 51.6941 11.0263 51.5007 11.2456C51.3072 11.4649 51.213 11.7643 51.2428 12.064V14.6978H50.4108V10.1948H51.2116V10.9106H51.2741C51.4902 10.384 51.9954 10.0613 52.5319 10.1079ZM56.1423 14.6978H55.3102V8.43701H56.1423V14.6978ZM81.3717 10.1079C81.7871 10.0745 82.1944 10.245 82.4782 10.5708C82.7619 10.8966 82.8917 11.3425 82.8307 11.7827V14.6978H81.9987V12.0063C81.9987 11.2828 81.7046 10.9224 81.0895 10.9224C80.8078 10.9083 80.5339 11.0263 80.3405 11.2456C80.1471 11.4649 80.0528 11.7643 80.0827 12.064V14.6978H79.2516V10.1948H80.0524V10.9106H80.1139C80.3301 10.384 80.8353 10.0614 81.3717 10.1079ZM90.401 10.9185H90.4665C90.693 10.3872 91.207 10.0646 91.7516 10.1118C92.1647 10.0878 92.5666 10.2618 92.8473 10.5864C93.1279 10.911 93.2579 11.3526 93.2028 11.7905V14.6978H92.3708V12.0093C92.3706 11.2904 92.0569 10.9263 91.4694 10.9263C91.18 10.9009 90.8947 11.0138 90.6901 11.2339C90.4857 11.454 90.3822 11.7591 90.4079 12.0679V14.6978H89.5768V8.43701H90.401V10.9185ZM63.8327 12.7329C63.2525 12.7744 62.9891 12.9857 62.9889 13.3823C62.9889 13.7876 63.3177 14.0239 63.7702 14.0239C64.038 14.0529 64.3057 13.9643 64.5114 13.7788C64.717 13.5933 64.8428 13.3264 64.861 13.0396V12.6636L63.8327 12.7329ZM40.9967 10.8979C40.2738 10.8979 39.8669 11.4687 39.8669 12.4448C39.867 13.4284 40.2739 13.9946 40.9967 13.9946C41.7168 13.9945 42.1276 13.4237 42.1276 12.4438C42.1275 11.4682 41.7167 10.8981 40.9967 10.8979ZM59.2917 10.8979C58.5689 10.8982 58.1628 11.4689 58.1628 12.4448C58.1629 13.4282 58.5691 13.9944 59.2917 13.9946C60.0119 13.9946 60.4225 13.4238 60.4225 12.4438C60.4224 11.4681 60.0118 10.8979 59.2917 10.8979ZM76.1403 10.8979C75.4173 10.8979 75.0104 11.4687 75.0104 12.4448C75.0106 13.4284 75.4175 13.9946 76.1403 13.9946C76.8602 13.9944 77.2702 13.4236 77.2702 12.4438C77.27 11.4683 76.8601 10.8982 76.1403 10.8979ZM68.7653 10.9185C68.0652 10.9185 67.6393 11.4976 67.6393 12.4448C67.6395 13.3996 68.0607 13.9741 68.7653 13.9741C69.4662 13.9741 69.8999 13.3913 69.9001 12.4487C69.9001 11.5103 69.4618 10.9185 68.7653 10.9185ZM34.2507 13.854H35.3034C35.8311 13.8877 36.3455 13.6658 36.7028 13.2495C37.0601 12.8332 37.2222 12.2663 37.1452 11.7075C37.2165 11.1513 37.0521 10.59 36.696 10.1772C36.3841 9.81593 35.9539 9.60083 35.4997 9.57373H34.2507V13.854ZM96.2253 10.8638C95.9346 10.8599 95.6544 10.982 95.4489 11.2017C95.2436 11.4213 95.1297 11.7204 95.1335 12.0308H97.2624C97.2836 11.7252 97.1835 11.4238 96.986 11.2017C96.7885 10.9795 96.512 10.8568 96.2253 10.8638Z",
pba33300: "M60.524 9.77617L60.5936 9.84807L60.5956 9.84604L60.524 9.77617ZM56.9063 9.77617L56.8345 9.84587L56.8367 9.84804L56.9063 9.77617ZM60.524 6.21617L60.5956 6.14628L60.594 6.14475L60.524 6.21617ZM56.9063 6.21617L56.8362 6.14473L56.8345 6.14651L56.9063 6.21617ZM38.9944 8.1919L38.8943 8.19186L38.8945 8.19666L38.9944 8.1919ZM38.3778 9.7919L38.4489 9.86223L38.449 9.86205L38.3778 9.7919ZM38.9615 7.8319L39.0599 7.81375L39.0448 7.7319H38.9615V7.8319ZM36.5689 7.8319V7.7319H36.4689V7.8319H36.5689ZM36.5689 8.4079H36.4689V8.5079H36.5689V8.4079ZM38.3531 8.4079L38.453 8.41126L38.4565 8.3079H38.3531V8.4079ZM37.942 9.3839L38.0106 9.45686L38.0145 9.45272L37.942 9.3839ZM35.8231 9.75931L35.8619 9.66714V9.66714L35.8231 9.75931ZM34.6531 7.9999L34.7532 8.00135L34.753 7.99636L34.6531 7.9999ZM35.1909 6.64305L35.1201 6.57242V6.57242L35.1909 6.64305ZM36.5689 6.0799L36.5684 6.18007L36.5742 6.17976L36.5689 6.0799ZM37.9173 6.6479L37.8417 6.71328L37.911 6.79356L37.9871 6.71957L37.9173 6.6479ZM38.3531 6.2239L38.4228 6.29557L38.4915 6.22873L38.4277 6.15727L38.3531 6.2239ZM37.5802 5.6879L37.5418 5.78024L37.5437 5.78099L37.5802 5.6879ZM36.5689 5.4879L36.5667 5.58791L36.5692 5.5879L36.5689 5.4879ZM34.7518 6.2079L34.8217 6.27935L34.8222 6.27885L34.7518 6.2079ZM34.194 8.94303L34.2861 8.90408L34.194 8.94303ZM36.5689 10.5039L36.5723 10.4039L36.5696 10.4039L36.5689 10.5039ZM42.7567 6.19161V6.29161H42.8567V6.19161H42.7567ZM40.5367 6.19161V6.09161H40.4367V6.19161H40.5367ZM42.7567 5.59961H42.8567V5.49961H42.7567V5.59961ZM39.8789 5.59961V5.49961H39.7789V5.59961H39.8789ZM39.8789 10.3996H39.7789V10.4996H39.8789V10.3996ZM42.7567 10.3996V10.4996H42.8567V10.3996H42.7567ZM42.7567 9.80761H42.8567V9.70761H42.7567V9.80761ZM40.5367 9.80761H40.4367V9.90761H40.5367V9.80761ZM40.5367 8.28761V8.18761H40.4367V8.28761H40.5367ZM42.5594 8.28761V8.38761H42.6594V8.28761H42.5594ZM42.5594 7.71161H42.6594V7.61161H42.5594V7.71161ZM40.5367 7.71161H40.4367V7.81161H40.5367V7.71161ZM44.8023 10.3996H44.7023V10.4996H44.8023V10.3996ZM45.4354 10.3996V10.4996H45.5354V10.3996H45.4354ZM44.8023 6.19161H44.9023V6.09161H44.8023V6.19161ZM43.421 6.19161H43.321V6.29161H43.421V6.19161ZM43.421 5.59961V5.49961H43.321V5.59961H43.421ZM46.8496 5.59961H46.9496V5.49961H46.8496V5.59961ZM46.8496 6.19161V6.29161H46.9496V6.19161H46.8496ZM45.4354 6.19161V6.09161H45.3354V6.19161H45.4354ZM49.2779 10.3996H49.1779V10.4996H49.2779V10.3996ZM49.2779 5.59961V5.49961H49.1779V5.59961H49.2779ZM49.911 10.3996V10.4996H50.011V10.3996H49.911ZM49.911 5.59961H50.011V5.49961H49.911V5.59961ZM52.102 10.3996H52.002V10.4996H52.102V10.3996ZM52.7351 10.3996V10.4996H52.8351V10.3996H52.7351ZM52.102 6.19161H52.202V6.09161H52.102V6.19161ZM50.7207 6.19161H50.6207V6.29161H50.7207V6.19161ZM50.7207 5.59961V5.49961H50.6207V5.59961H50.7207ZM54.1082 5.59961H54.2082V5.49961H54.1082V5.59961ZM54.1082 6.19161V6.29161H54.2082V6.19161H54.1082ZM52.7351 6.19161V6.09161H52.6351V6.19161H52.7351ZM60.0463 9.3755L60.116 9.44741L60.1195 9.44369L60.0463 9.3755ZM57.3659 9.3755L57.2926 9.44378L57.2963 9.44732L57.3659 9.3755ZM60.0463 6.6235L60.1195 6.55522L60.1159 6.55168L60.0463 6.6235ZM57.3659 6.6235L57.2962 6.55159L57.2927 6.55531L57.3659 6.6235ZM62.1579 10.3996H62.0579V10.4996H62.1579V10.3996ZM62.1579 5.59961V5.49961H62.0579V5.59961H62.1579ZM62.7992 10.3996V10.4996H62.8992V10.3996H62.7992ZM62.7992 6.48761L62.8834 6.43364L62.6992 6.14632V6.48761H62.7992ZM65.307 10.3996L65.2228 10.4536L65.2523 10.4996H65.307V10.3996ZM65.9647 10.3996V10.4996H66.0647V10.3996H65.9647ZM65.9647 5.59961H66.0647V5.49961H65.9647V5.59961ZM65.3316 5.59961V5.49961H65.2316V5.59961H65.3316ZM65.3316 9.33561L65.2475 9.38967L65.4316 9.67619V9.33561H65.3316ZM62.9307 5.59961L63.0149 5.54555L62.9853 5.49961H62.9307V5.59961ZM60.524 9.77617L60.4545 9.70431C59.4926 10.635 57.9377 10.635 56.9758 9.70431L56.9063 9.77617L56.8367 9.84804C57.8762 10.8537 59.5542 10.8537 60.5936 9.84804L60.524 9.77617ZM60.524 6.21617L60.4525 6.28604C61.3887 7.2446 61.3887 8.74775 60.4525 9.7063L60.524 9.77617L60.5956 9.84604C61.6077 8.80978 61.6077 7.18256 60.5956 6.1463L60.524 6.21617ZM58.7152 5.4834V5.5834C59.3686 5.5834 59.9945 5.83719 60.454 6.28759L60.524 6.21617L60.594 6.14475C60.0965 5.65715 59.4202 5.3834 58.7152 5.3834V5.4834ZM56.9063 6.21617L56.9763 6.28759C57.4358 5.83719 58.0617 5.5834 58.7152 5.5834V5.4834V5.3834C58.0102 5.3834 57.3338 5.65715 56.8363 6.14475L56.9063 6.21617ZM56.9063 9.77617L56.978 9.70651C56.0457 8.7463 56.0457 7.24605 56.978 6.28583L56.9063 6.21617L56.8345 6.14651C55.8268 7.18432 55.8268 8.80802 56.8345 9.84583L56.9063 9.77617ZM38.9944 8.1919L38.8945 8.19666C38.9214 8.76135 38.7092 9.31263 38.3065 9.72175L38.3778 9.7919L38.449 9.86205C38.8903 9.41377 39.1239 8.80842 39.0943 8.18714L38.9944 8.1919ZM38.9615 7.8319L38.8632 7.85005C38.884 7.96287 38.8945 8.07726 38.8944 8.19186L38.9944 8.1919L39.0944 8.19194C39.0945 8.06512 39.0829 7.93856 39.0599 7.81375L38.9615 7.8319ZM36.5689 7.8319V7.9319H38.9615V7.8319V7.7319H36.5689V7.8319ZM36.5689 8.4079H36.6689V7.8319H36.5689H36.4689V8.4079H36.5689ZM38.3531 8.4079V8.3079H36.5689V8.4079V8.5079H38.3531V8.4079ZM37.942 9.3839L38.0145 9.45272C38.2841 9.16846 38.44 8.79884 38.453 8.41126L38.3531 8.4079L38.2532 8.40455C38.2418 8.74257 38.1058 9.0658 37.8694 9.31509L37.942 9.3839ZM35.8231 9.75931L35.7843 9.85148C36.5397 10.1694 37.4178 10.0142 38.0105 9.45675L37.942 9.3839L37.8735 9.31106C37.339 9.81369 36.5452 9.95471 35.8619 9.66714L35.8231 9.75931ZM34.6531 7.9999L34.5531 7.99846C34.5415 8.80302 35.0285 9.53342 35.7843 9.85148L35.8231 9.75931L35.8619 9.66714C35.1789 9.37972 34.7427 8.72188 34.7531 8.00135L34.6531 7.9999ZM35.1909 6.64305L35.1201 6.57242C34.7393 6.95402 34.5343 7.4707 34.5532 8.00345L34.6531 7.9999L34.753 7.99636C34.7361 7.51985 34.9194 7.05665 35.2616 6.71369L35.1909 6.64305ZM36.5689 6.0799L36.5694 5.9799C36.0241 5.9773 35.5007 6.19092 35.1201 6.57242L35.1909 6.64305L35.2616 6.71369C35.604 6.37062 36.0758 6.17755 36.5684 6.1799L36.5689 6.0799ZM37.9173 6.6479L37.993 6.58252C37.6397 6.17364 37.1101 5.95098 36.5636 5.98004L36.5689 6.0799L36.5742 6.17976C37.0602 6.15392 37.5295 6.35205 37.8417 6.71328L37.9173 6.6479ZM38.3531 6.2239L38.2834 6.15223L37.8476 6.57623L37.9173 6.6479L37.9871 6.71957L38.4228 6.29557L38.3531 6.2239ZM37.5802 5.6879L37.5437 5.78099C37.8268 5.8921 38.0786 6.0668 38.2785 6.29054L38.3531 6.2239L38.4277 6.15727C38.2066 5.9099 37.9287 5.71723 37.6167 5.59481L37.5802 5.6879ZM36.5689 5.4879L36.5692 5.5879C36.9036 5.58682 37.2345 5.65229 37.5418 5.78022L37.5802 5.6879L37.6186 5.59558C37.2867 5.45738 36.9294 5.38673 36.5685 5.3879L36.5689 5.4879ZM34.7518 6.2079L34.8222 6.27885C35.28 5.82415 35.9115 5.57367 36.5667 5.58788L36.5689 5.4879L36.571 5.38792C35.8623 5.37256 35.1782 5.64338 34.6813 6.13695L34.7518 6.2079ZM34.194 8.94303L34.2861 8.90408C33.9057 8.00458 34.1161 6.97042 34.8217 6.27935L34.7518 6.2079L34.6818 6.13646C33.9182 6.8843 33.689 8.0058 34.1019 8.98199L34.194 8.94303ZM36.5689 10.5039L36.5696 10.4039C35.566 10.3963 34.6668 9.80405 34.2861 8.90408L34.194 8.94303L34.1019 8.98199C34.5146 9.9577 35.4871 10.5957 36.5681 10.6039L36.5689 10.5039ZM38.3778 9.7919L38.3067 9.72157C37.855 10.1781 37.2244 10.4266 36.5723 10.404L36.5689 10.5039L36.5654 10.6038C37.2724 10.6283 37.9573 10.359 38.4489 9.86223L38.3778 9.7919ZM42.7567 6.19161V6.09161H40.5367V6.19161V6.29161H42.7567V6.19161ZM42.7567 5.59961H42.6567V6.19161H42.7567H42.8567V5.59961H42.7567ZM39.8789 5.59961V5.69961H42.7567V5.59961V5.49961H39.8789V5.59961ZM39.8789 10.3996H39.9789V5.59961H39.8789H39.7789V10.3996H39.8789ZM42.7567 10.3996V10.2996H39.8789V10.3996V10.4996H42.7567V10.3996ZM42.7567 9.80761H42.6567V10.3996H42.7567H42.8567V9.80761H42.7567ZM40.5367 9.80761V9.90761H42.7567V9.80761V9.70761H40.5367V9.80761ZM40.5367 8.28761H40.4367V9.80761H40.5367H40.6367V8.28761H40.5367ZM42.5594 8.28761V8.18761H40.5367V8.28761V8.38761H42.5594V8.28761ZM42.5594 7.71161H42.4594V8.28761H42.5594H42.6594V7.71161H42.5594ZM40.5367 7.71161V7.81161H42.5594V7.71161V7.61161H40.5367V7.71161ZM40.5367 6.19161H40.4367V7.71161H40.5367H40.6367V6.19161H40.5367ZM44.8023 10.3996V10.4996H45.4354V10.3996V10.2996H44.8023V10.3996ZM44.8023 6.19161H44.7023V10.3996H44.8023H44.9023V6.19161H44.8023ZM43.421 6.19161V6.29161H44.8023V6.19161V6.09161H43.421V6.19161ZM43.421 5.59961H43.321V6.19161H43.421H43.521V5.59961H43.421ZM46.8496 5.59961V5.49961H43.421V5.59961V5.69961H46.8496V5.59961ZM46.8496 6.19161H46.9496V5.59961H46.8496H46.7496V6.19161H46.8496ZM45.4354 6.19161V6.29161H46.8496V6.19161V6.09161H45.4354V6.19161ZM45.4354 10.3996H45.5354V6.19161H45.4354H45.3354V10.3996H45.4354ZM49.2779 10.3996H49.3779V5.59961H49.2779H49.1779V10.3996H49.2779ZM49.911 10.3996V10.2996H49.2779V10.3996V10.4996H49.911V10.3996ZM49.911 5.59961H49.811V10.3996H49.911H50.011V5.59961H49.911ZM49.2779 5.59961V5.69961H49.911V5.59961V5.49961H49.2779V5.59961ZM52.102 10.3996V10.4996H52.7351V10.3996V10.2996H52.102V10.3996ZM52.102 6.19161H52.002V10.3996H52.102H52.202V6.19161H52.102ZM50.7207 6.19161V6.29161H52.102V6.19161V6.09161H50.7207V6.19161ZM50.7207 5.59961H50.6207V6.19161H50.7207H50.8207V5.59961H50.7207ZM54.1082 5.59961V5.49961H50.7207V5.59961V5.69961H54.1082V5.59961ZM54.1082 6.19161H54.2082V5.59961H54.1082H54.0082V6.19161H54.1082ZM52.7351 6.19161V6.29161H54.1082V6.19161V6.09161H52.7351V6.19161ZM52.7351 10.3996H52.8351V6.19161H52.7351H52.6351V10.3996H52.7351ZM60.0463 9.3755L59.9767 9.30368C59.2744 9.98416 58.1378 9.98416 57.4355 9.30368L57.3659 9.3755L57.2963 9.44732C58.0762 10.2029 59.336 10.2029 60.1159 9.44732L60.0463 9.3755ZM60.0463 6.6235L59.9732 6.69169C60.6652 7.43395 60.6652 8.56505 59.9732 9.30731L60.0463 9.3755L60.1195 9.44369C60.8831 8.62462 60.8831 7.37438 60.1195 6.55531L60.0463 6.6235ZM57.3659 6.6235L57.4355 6.69532C58.1378 6.01484 59.2744 6.01484 59.9767 6.69532L60.0463 6.6235L60.1159 6.55168C59.336 5.79605 58.0762 5.79605 57.2963 6.55168L57.3659 6.6235ZM57.3659 9.3755L57.439 9.30731C56.747 8.56505 56.747 7.43395 57.439 6.69169L57.3659 6.6235L57.2927 6.55531C56.5291 7.37438 56.5291 8.62462 57.2927 9.44369L57.3659 9.3755ZM62.1579 10.3996H62.2579V5.59961H62.1579H62.0579V10.3996H62.1579ZM62.7992 10.3996V10.2996H62.1579V10.3996V10.4996H62.7992V10.3996ZM62.7992 6.48761H62.6992V10.3996H62.7992H62.8992V6.48761H62.7992ZM65.307 10.3996L65.3912 10.3456L62.8834 6.43364L62.7992 6.48761L62.715 6.54158L65.2228 10.4536L65.307 10.3996ZM65.9647 10.3996V10.2996H65.307V10.3996V10.4996H65.9647V10.3996ZM65.9647 5.59961H65.8647V10.3996H65.9647H66.0647V5.59961H65.9647ZM65.3316 5.59961V5.69961H65.9647V5.59961V5.49961H65.3316V5.59961ZM65.3316 9.33561H65.4316V5.59961H65.3316H65.2316V9.33561H65.3316ZM62.9307 5.59961L62.8466 5.65367L65.2475 9.38967L65.3316 9.33561L65.4158 9.28155L63.0149 5.54555L62.9307 5.59961ZM62.1579 5.59961V5.69961H62.9307V5.59961V5.49961H62.1579V5.59961Z",
}

```

## src/imports/GlobalHeader/index.tsx
```tsx
import svgPaths from "./svg-47mxa9zv1t";
import imgDownload1 from "./948fb7f1a82164701b58a55f2f3d7d39fa029500.png";
import imgKeenanLogo1 from "./268260c7c4b29dd81e298ecb1511858d1fbd3c50.png";
import { imgBkgd, imgBkgd1 } from "./svg-4iv0a";
type LogoProps = {
  className?: string;
  logo?: "A1M" | "mobile A1M" | "Aptia";
};

function Logo({ className, logo = "A1M" }: LogoProps) {
  const isAptia = logo === "Aptia";
  const isMobileA1M = logo === "mobile A1M";
  return (
    <div className={className || `content-stretch flex flex-col items-start justify-center relative ${isMobileA1M ? "h-[48px] w-[180px]" : isAptia ? "h-[86px] w-[240px]" : "h-[86px]"}`}>
      {["A1M", "mobile A1M"].includes(logo) && (
        <div className={`relative shrink-0 ${isMobileA1M ? "h-[40.05px] w-[178px]" : "h-[54px] w-[240px]"}`}>
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox={isMobileA1M ? "0 0 178 40.0501" : "0 0 240 54"}>
            <g id="Group 1">
              <rect fill="var(--fill-0, #82479D)" height={isMobileA1M ? "32.6939" : "44.0816"} id="Rectangle" width={isMobileA1M ? "61.0615" : "82.33"} x={isMobileA1M ? "36.1552" : "48.7485"} />
              <path d={isMobileA1M ? svgPaths.p1c04ec0 : svgPaths.p3cfc9d00} fill="var(--fill-0, #BED34F)" id="Combined Shape" />
              <g id="Health Insurance">
                <path d={isMobileA1M ? svgPaths.p15562400 : svgPaths.pd6a2880} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p3bf1f380 : svgPaths.p15ba9c00} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p2b918a30 : svgPaths.p3bff9900} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p39466b40 : svgPaths.p4f5e480} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p21bc7e00 : svgPaths.p26346b00} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p2f526270 : svgPaths.p2f325480} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p2a0ac600 : svgPaths.pb20da00} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p3c127600 : svgPaths.p2de3d800} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p17c607e0 : svgPaths.p364197c0} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p24996380 : svgPaths.p3ea74670} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p18b9eca0 : svgPaths.p3affbb00} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p1dfac600 : svgPaths.p21ef200} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p7a3d8f2 : svgPaths.p42b2650} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p3ee2c900 : svgPaths.p261f0380} fill="var(--fill-0, #263154)" />
                <path d={isMobileA1M ? svgPaths.p37688980 : svgPaths.p2eca6600} fill="var(--fill-0, #263154)" />
              </g>
              <g id="A M">
                <path d={isMobileA1M ? svgPaths.p29d99100 : svgPaths.p10761f00} fill="var(--fill-0, white)" />
                <path d={isMobileA1M ? svgPaths.p2a3d6080 : svgPaths.p205881f0} fill="var(--fill-0, white)" />
              </g>
              <path clipRule="evenodd" d={isMobileA1M ? svgPaths.p16ba19c0 : svgPaths.p28b6ee00} fill="var(--fill-0, white)" fillRule="evenodd" id="Path 2" />
            </g>
          </svg>
        </div>
      )}
      {isAptia && (
        <div className="h-[84px] relative shrink-0 w-[82px]" data-name="download 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDownload1} />
        </div>
      )}
    </div>
  );
}

function Logo1({ className }: { className?: string }) {
  return (
    <div className={className || "h-[64px] overflow-clip relative w-[240px]"} data-name="Logo">
      <div className="absolute inset-[9.38%_24.58%_9.38%_-1.67%]" data-name="Keenan-Logo 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgKeenanLogo1} />
      </div>
      <div className="absolute inset-[34.38%_20.83%_53.13%_75.42%] overflow-clip" data-name="Asset 2 1">
        <div className="absolute contents inset-[1.92%_5.02%_5.19%_5.08%]" data-name="Layer 2">
          <div className="absolute inset-[1.92%_5.02%_5.19%_5.08%]" data-name="Layer 1">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.09024 7.43104">
              <g id="Layer 1">
                <path d={svgPaths.p2b0ed700} fill="url(#paint0_linear_10_3807)" id="Vector" />
                <path d={svgPaths.p3425f6f0} fill="url(#paint1_linear_10_3807)" id="Vector_2" />
              </g>
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10_3807" x1="4.04512" x2="4.04512" y1="0" y2="7.43104">
                  <stop stopColor="#5B2540" />
                  <stop offset="0.0001" stopColor="#5B2540" />
                  <stop offset="1" stopColor="#5B2540" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10_3807" x1="4.24569" x2="4.24569" y1="1.69388" y2="5.72259">
                  <stop stopColor="#5B2540" />
                  <stop offset="0.0001" stopColor="#5B2540" />
                  <stop offset="1" stopColor="#5B2540" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
type ArrowMainProps = {
  className?: string;
  property1?: "Default" | "Right" | "Up" | "left";
};

function ArrowMain({ className, property1 = "Default" }: ArrowMainProps) {
  const isUp = property1 === "Up";
  return (
    <div className={className || "relative size-[24px]"}>
      {["Right", "Up", "left"].includes(property1) && (
        <div className={`absolute flex items-center justify-center ${isUp ? "bottom-[37.48%] left-1/4 right-[25.61%] top-[33.33%]" : "inset-[23.23%_35.71%_27.38%_35.1%]"}`} style={{ containerType: "size" }}>
          <div className={`flex-none ${property1 === "left" ? "h-[100cqw] rotate-90 w-[100cqh]" : isUp ? "h-[100cqh] rotate-180 w-[100cqw]" : "-rotate-90 h-[100cqw] w-[100cqh]"}`}>
            <div className="relative size-full" data-name="Fill 1">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8529 7.00438">
                <path clipRule="evenodd" d={svgPaths.p2be5a800} fill="var(--fill-0, #818285)" fillRule="evenodd" id="Fill 1" />
              </svg>
            </div>
          </div>
        </div>
      )}
      {property1 === "Default" && (
        <div className="absolute bottom-[37.48%] left-1/4 right-[25.61%] top-[33.33%]" data-name="Fill 1">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8529 7.00438">
            <path clipRule="evenodd" d={svgPaths.p2be5a800} fill="var(--fill-0, #818285)" fillRule="evenodd" id="Fill 1" />
          </svg>
        </div>
      )}
    </div>
  );
}
type GlobalHeaderProps = {
  className?: string;
  responsive?: "Mobile" | "Desktop";
  secured?: "Secured" | "Unsecured";
};

export default function GlobalHeader({ className, responsive = "Desktop", secured = "Secured" }: GlobalHeaderProps) {
  const isSecuredAndDesktop = secured === "Secured" && responsive === "Desktop";
  const isSecuredAndMobile = secured === "Secured" && responsive === "Mobile";
  const isUnsecuredAndDesktop = secured === "Unsecured" && responsive === "Desktop";
  const isUnsecuredAndMobile = secured === "Unsecured" && responsive === "Mobile";
  return (
    <div className={className || `relative ${responsive === "Mobile" ? "bg-white h-[64px] w-[375px]" : "h-[110px] w-[1440px]"}`}>
      {isSecuredAndDesktop && (
        <>
          <div className="absolute inset-[72.73%_0.28%_27.27%_0]" data-name="Header">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1437 1">
                <g id="Header">
                  <path d="M0.5 0.5H1436.5" id="Line 2" stroke="var(--stroke-0, #E2E2E2)" strokeLinecap="square" />
                </g>
              </svg>
            </div>
          </div>
          <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] left-[26.81%] right-[62.99%] text-[#333] text-[18px] top-[calc(50%-27px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            MEMBER PORTAL
          </p>
        </>
      )}
      {secured === "Secured" && (
        <div className={`absolute ${isSecuredAndMobile ? "bg-[#82479d] inset-[0_82.93%_0_0]" : "contents left-[1224px] top-[20px]"}`}>
          {isSecuredAndDesktop && (
            <>
              <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[24.55%_7.78%_59.09%_87.78%] leading-[normal] text-[#333] text-[13px] text-right" style={{ fontVariationSettings: '"wdth" 100' }}>
                Hi, Dennis
              </p>
              <ArrowMain className="absolute left-[1336px] size-[24px] top-[24px]" />
              <div className="absolute contents inset-[18.18%_12.78%_51.98%_85%]" data-name="Identity">
                <div className="absolute contents inset-[16.32%_12.64%_50.12%_84.86%]" data-name="circle image small">
                  <div className="absolute bg-[#e87823] inset-[16.32%_12.64%_50.12%_84.86%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[2px_2.052px] mask-size-[32px_32.821px] rounded-[100px]" style={{ maskImage: `url("${imgBkgd}")` }} data-name="bkgd" />
                  <div className="absolute inset-[25.64%_13.33%_59.44%_85.56%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-8px_-8.205px] mask-size-[32px_32.821px]" style={{ maskImage: `url("${imgBkgd}")` }} data-name="avatar">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16.4107">
                      <g id="avatar">
                        <path clipRule="evenodd" d={svgPaths.p2f6205e8} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 1" />
                        <path clipRule="evenodd" d={svgPaths.p283c2600} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 3" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      {isSecuredAndDesktop && <Logo1 className="absolute h-[64px] left-[144px] overflow-clip top-[8px] w-[240px]" />}
      {responsive === "Desktop" && (
        <div className={`absolute h-[110px] top-0 w-[1440px] ${isUnsecuredAndDesktop ? "right-0" : "left-0"}`} data-name="Global Header">
          {isSecuredAndDesktop && (
            <div className="absolute h-[110px] left-0 top-0 w-[1440px]" data-name="Global Header">
              <div className="absolute contents left-0 top-0" data-name="Mask Group">
                <div className="absolute bg-white h-[110px] left-0 top-0 w-[1440px]" />
              </div>
              <div className="absolute contents left-0 top-0" data-name="Mask Group">
                <div className="absolute bg-white h-[110px] left-0 top-0 w-[1440px]" />
              </div>
              <div className="absolute content-stretch flex gap-[24px] items-center left-[990px] top-[29px]">
                <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                    <div className="relative shrink-0 size-[32px]" data-name="icon">
                      <div className="absolute contents inset-0" data-name="Identity">
                        <div className="absolute bg-[#df126c] inset-0 rounded-[100px]" data-name="Mask" />
                        <div className="absolute contents inset-[-6.25%]" data-name="circle image small">
                          <div className="absolute bg-[#df126c] inset-[-6.25%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[2px_2px] mask-size-[32px_32px] rounded-[100px]" style={{ maskImage: `url("${imgBkgd1}")` }} data-name="bkgd" />
                          <div className="absolute inset-1/4 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-8px_-8px] mask-size-[32px_32px]" style={{ maskImage: `url("${imgBkgd1}")` }} data-name="avatar">
                            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16.0012">
                              <g id="avatar">
                                <path clipRule="evenodd" d={svgPaths.p211de5d0} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 1" />
                                <path clipRule="evenodd" d={svgPaths.paf15100} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 3" />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="[word-break:break-word] content-stretch flex flex-col font-['Open_Sans:Regular',sans-serif] font-normal items-start leading-[normal] relative shrink-0 whitespace-nowrap">
                      <p className="relative shrink-0 text-[#333] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
                        Hi, Jennifer
                      </p>
                      <p className="relative shrink-0 text-[#666] text-[12px]" style={{ fontVariationSettings: '"wdth" 100' }}>
                        Employer
                      </p>
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[16px]" data-name="icon">
                    <div className="absolute inset-[31.25%_13.42%_26.07%_12.5%]" data-name="Fill 1">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8529 6.82927">
                        <path clipRule="evenodd" d={svgPaths.p222fb280} fill="var(--fill-0, #999999)" fillRule="evenodd" id="Fill 1" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex h-[51px] items-center justify-center relative shrink-0 w-0">
                  <div className="flex-none rotate-90">
                    <div className="h-0 relative w-[51px]">
                      <div className="absolute inset-[-1px_0_0_0]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51 1">
                          <line id="Line 37" stroke="var(--stroke-0, #999999)" x2="51" y1="0.5" y2="0.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-end relative shrink-0">
                  <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[105.87450408935547%] relative shrink-0 text-[#666] text-[18px] tracking-[1.5px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                    ADMIN CENTER
                  </p>
                  <div className="content-stretch flex items-start px-[10px] py-[4px] relative rounded-[6px] shrink-0">
                    <div aria-hidden className="absolute border border-[#666] border-solid inset-0 pointer-events-none rounded-[6px]" />
                    <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#666] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                      For Employers
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-[21.82%_72.99%_20%_10.35%] overflow-clip" data-name="Logo">
                <div className="absolute inset-[9.38%_24.58%_9.38%_-1.67%]" data-name="Keenan-Logo 1">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgKeenanLogo1} />
                </div>
              </div>
              <div className="absolute h-[110px] left-0 top-0 w-[1440px]" data-name="Header 2">
                <div className="absolute contents left-0 top-0" data-name="Mask Group">
                  <div className="absolute bg-white h-[110px] left-0 top-0 w-[1440px]" />
                </div>
              </div>
            </div>
          )}
          {isUnsecuredAndDesktop && (
            <>
              <div className="absolute contents left-0 top-0" data-name="Mask Group">
                <div className="absolute bg-white h-[110px] left-0 top-0 w-[1440px]" />
              </div>
              <div className="absolute contents left-0 top-0" data-name="Mask Group">
                <div className="absolute bg-white h-[110px] left-0 top-0 w-[1440px]" />
              </div>
              <Logo className="absolute content-stretch flex flex-col h-[86px] items-start justify-center left-[112px] top-[12px]" />
              <div className="[word-break:break-word] absolute content-stretch flex flex-col items-end leading-[normal] right-[112px] text-right top-[33px] whitespace-nowrap">
                <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 text-[#82479d] text-[18px]" style={{ fontVariationSettings: '"wdth" 100' }}>
                  A1M Health Insurance TPA
                </p>
                <p className="font-['Open_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[#565962] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
                  Member Portal
                </p>
              </div>
            </>
          )}
        </div>
      )}
      {isSecuredAndDesktop && (
        <div className="-translate-y-1/2 absolute content-stretch flex gap-[8px] items-center justify-end right-[87px] top-[calc(50%+0.5px)]">
          <div className="[word-break:break-word] content-stretch flex flex-col items-end justify-center leading-[normal] relative shrink-0 text-right whitespace-nowrap">
            <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 text-[#82479d] text-[18px]" style={{ fontVariationSettings: '"wdth" 100' }}>
              A1M Health Insurance TPA
            </p>
            <p className="font-['Open_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[#565962] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
              Member Portal
            </p>
          </div>
          <div className="flex h-[51px] items-center justify-center relative shrink-0 w-0">
            <div className="flex-none rotate-90">
              <div className="h-0 relative w-[51px]">
                <div className="absolute inset-[-1px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51 1">
                    <line id="Line 37" stroke="var(--stroke-0, #999999)" x2="51" y1="0.5" y2="0.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-center justify-center relative shrink-0">
            <div className="bg-[rgba(10,117,147,0.2)] content-stretch flex items-center justify-center relative rounded-[31px] shrink-0 size-[32px]">
              <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[32px]" data-name="icon 32x32">
                <div className="h-[15px] relative shrink-0 w-[10px]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 15">
                    <path d={svgPaths.p209d5200} fill="var(--fill-0, #0A7593)" id="Vector" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-center justify-center relative shrink-0">
            <div className="bg-[rgba(10,117,147,0.2)] content-stretch flex items-center justify-center relative rounded-[31px] shrink-0 size-[32px]">
              <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[32px]" data-name="icon 32x32">
                <div className="h-[18px] relative shrink-0 w-[14px]" data-name="Vector">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 18">
                    <g id="Vector">
                      <path d={svgPaths.p3f8ec680} fill="var(--fill-0, #0A7593)" />
                      <path d={svgPaths.p1d1a0700} fill="var(--fill-0, #0A7593)" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-center justify-center relative shrink-0">
            <div className="bg-[#df126c] content-stretch flex items-center justify-center relative rounded-[31px] shrink-0 size-[32px]">
              <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-right text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                SJ
              </p>
            </div>
          </div>
          <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
            <div className="h-[3px] relative shrink-0 w-[6px]">
              <div className="absolute inset-[-11.79%_-5.89%_-23.57%_-5.89%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.70711 4.06066">
                  <g id="Vector 8">
                    <path d={svgPaths.p1fd2af40} stroke="var(--stroke-0, #6B6F7A)" />
                    <path d={svgPaths.p1fd2af40} stroke="var(--stroke-1, black)" strokeOpacity="0.2" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
      {(isSecuredAndDesktop || isUnsecuredAndMobile) && <Logo className={`absolute content-stretch flex flex-col items-start justify-center ${isUnsecuredAndMobile ? "inset-[12.5%_47.73%_12.5%_4.27%]" : "h-[86px] left-[146px] top-[12px]"}`} logo={isUnsecuredAndMobile ? "mobile A1M" : undefined} />}
      {isSecuredAndMobile && (
        <>
          <div className="absolute content-stretch flex inset-[18.75%_86.13%_18.75%_3.2%] items-center justify-center px-[4px] py-[3px]" data-name="icon 40x40">
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
              <div className="bg-white col-1 h-[4px] ml-0 mt-0 relative row-1 w-[30px]" data-name="Rectangle" />
              <div className="bg-white col-1 h-[4px] ml-0 mt-[10px] relative row-1 w-[30px]" data-name="Rectangle Copy 8" />
              <div className="bg-white col-1 h-[4px] ml-0 mt-[20px] relative row-1 w-[30px]" data-name="Rectangle Copy 9" />
            </div>
          </div>
          <Logo className="absolute content-stretch flex flex-col inset-[12.5%_30.67%_12.5%_21.33%] items-start justify-center" logo="mobile A1M" />
        </>
      )}
    </div>
  );
}
```

## src/imports/GlobalHeader/svg-47mxa9zv1t.ts
```ts
export default {
p10761f00: "M68.9508 27.5957L65.9003 18.7441L62.8498 27.5957H68.9508ZM70.7534 32.8503H61.0472L59.4872 37.47H52.2422L62.1911 10.88H69.6095L79.5584 37.47H72.3134L70.7534 32.8503Z",
p15562400: "M112.035 14.7122H110.635V8.9461H104.291V14.7122H102.89V2.45919H104.291V7.67218H110.635V2.45919H112.035V14.7122Z",
p15ba9c00: "M160.389 20.0627C158.59 20.0627 157.168 19.5053 156.124 18.3903C155.087 17.2753 154.568 15.7272 154.568 13.7459C154.568 11.7495 155.05 10.1637 156.012 8.98851C156.983 7.81329 158.282 7.22568 159.911 7.22568C161.437 7.22568 162.644 7.73796 163.533 8.76251C164.421 9.77953 164.866 11.1243 164.866 12.7967V13.9832H156.479C156.516 15.4372 156.875 16.5408 157.556 17.2942C158.245 18.0475 159.212 18.4242 160.456 18.4242C161.766 18.4242 163.062 18.1455 164.343 17.588V19.2604C163.692 19.5467 163.073 19.7501 162.488 19.8706C161.911 19.9987 161.211 20.0627 160.389 20.0627ZM159.889 8.79641C158.912 8.79641 158.13 9.12035 157.545 9.76823C156.968 10.4161 156.627 11.3126 156.523 12.4577H162.888C162.888 11.2749 162.629 10.3709 162.111 9.74563C161.592 9.11282 160.852 8.79641 159.889 8.79641Z",
p16ba19c0: "M56.4672 9.85849C62.0347 7.99285 66.3162 4.79261 70.3369 0.028717C70.4452 -0.0996122 73.8953 0.200557 73.9169 0.961537C73.9514 2.17775 69.4638 7.74109 63.1204 26.601C62.344 28.9092 61.0762 36.144 61.0762 36.144L53.0276 40.0501C53.0276 40.0501 59.1943 20.0272 66.3162 7.76603C66.5459 7.37067 64.5157 8.87335 56.4672 11.5141V9.85849Z",
p17c607e0: "M123.585 26.9186C123.585 27.7734 123.272 28.4327 122.646 28.8965C122.02 29.3602 121.141 29.5921 120.01 29.5921C118.813 29.5921 117.879 29.3994 117.209 29.0138V27.7232C117.643 27.9466 118.107 28.1226 118.601 28.2512C119.101 28.3797 119.581 28.4439 120.043 28.4439C120.757 28.4439 121.306 28.3294 121.691 28.1003C122.075 27.8656 122.267 27.5108 122.267 27.0359C122.267 26.6783 122.113 26.3738 121.806 26.1224C121.504 25.8654 120.911 25.5636 120.026 25.2172C119.186 24.8987 118.587 24.6222 118.23 24.3875C117.879 24.1473 117.615 23.8763 117.439 23.5746C117.269 23.2728 117.184 22.9125 117.184 22.4934C117.184 21.7447 117.483 21.1552 118.082 20.725C118.681 20.2892 119.502 20.0713 120.545 20.0713C121.518 20.0713 122.468 20.2724 123.396 20.6747L122.91 21.8062C122.004 21.4262 121.182 21.2362 120.447 21.2362C119.798 21.2362 119.31 21.3396 118.98 21.5463C118.651 21.7531 118.486 22.038 118.486 22.4012C118.486 22.6471 118.546 22.8566 118.667 23.0298C118.793 23.203 118.994 23.3678 119.268 23.5243C119.543 23.6807 120.07 23.907 120.85 24.2031C121.921 24.5998 122.643 24.9993 123.017 25.4016C123.396 25.8039 123.585 26.3096 123.585 26.9186Z",
p18b9eca0: "M140.301 20.0713C140.702 20.0713 141.062 20.1048 141.38 20.1719L141.191 21.4625C140.817 21.3787 140.488 21.3368 140.202 21.3368C139.472 21.3368 138.846 21.6385 138.324 22.242C137.808 22.8454 137.549 23.5969 137.549 24.4965V29.4245H136.182V20.2389H137.311L137.467 21.9403H137.533C137.868 21.3424 138.272 20.8815 138.744 20.5574C139.216 20.2333 139.735 20.0713 140.301 20.0713Z",
p1c04ec0: "M20.0869 12.2598H32.1377V20.4336H20.0869V32.6943H12.0527V20.4336H0V12.2598H12.0527V0H20.0869V12.2598Z",
p1d1a0700: "M12.6132 14.5987C13.3787 14.5987 13.9999 14.5472 13.9999 13.7655L14 13.631C14 13.069 13.6767 12.5884 13.2118 12.3597L12.7718 8.48234C12.7718 5.64401 10.8053 3.27533 8.18721 2.7167L8.18743 1.21142C8.18743 0.542526 7.6559 0 7.00045 0C6.3446 0 5.81302 0.54248 5.81302 1.21142V2.71646C3.19489 3.27532 1.22839 5.64401 1.22839 8.48211L0.7884 12.3588C0.323488 12.5872 0 13.0685 0 13.6308V13.7655C0 14.5472 0.620327 14.5987 1.38602 14.5987H12.6132Z",
p1dfac600: "M148.622 29.4245L148.35 28.1171H148.284C147.834 28.6926 147.383 29.0837 146.933 29.2904C146.488 29.4915 145.931 29.5921 145.261 29.5921C144.365 29.5921 143.662 29.3574 143.152 28.8881C142.646 28.4188 142.394 27.7511 142.394 26.885C142.394 25.0301 143.852 24.0579 146.768 23.9685L148.301 23.9182V23.3483C148.301 22.6275 148.147 22.0967 147.839 21.7559C147.537 21.4095 147.051 21.2362 146.381 21.2362C145.629 21.2362 144.777 21.4709 143.827 21.9403L143.407 20.8759C143.852 20.63 144.338 20.4373 144.865 20.2976C145.398 20.1579 145.931 20.088 146.463 20.088C147.54 20.088 148.336 20.3311 148.853 20.8172C149.374 21.3033 149.635 22.0827 149.635 23.1555V29.4245H148.622ZM145.532 28.4439C146.384 28.4439 147.051 28.2065 147.534 27.7315C148.023 27.2566 148.268 26.5917 148.268 25.7369V24.9071L146.9 24.9658C145.813 25.0049 145.027 25.1781 144.544 25.4854C144.066 25.7871 143.827 26.2593 143.827 26.9018C143.827 27.4047 143.975 27.7874 144.272 28.05C144.574 28.3126 144.994 28.4439 145.532 28.4439Z",
p1fd2af40: "M0.353553 0.353553L3.35355 3.35355L6.35355 0.353553",
p205881f0: "M93.1334 37.47L97.5705 10.88H104.296L109.53 25.0566L114.73 10.88H121.455L125.892 37.47H119.132L116.879 22.1649L110.709 37.47H108.005L102.146 22.1649L99.8931 37.47H93.1334Z",
p209d5200: "M3.75 15H6.25V12.5H3.75V15ZM5 0C2.2375 0 0 2.2375 0 5H2.5C2.5 3.625 3.625 2.5 5 2.5C6.375 2.5 7.5 3.625 7.5 5C7.5 7.5 3.75 7.1875 3.75 11.25H6.25C6.25 8.4375 10 8.125 10 5C10 2.2375 7.7625 0 5 0Z",
p211de5d0: "M16 13.6545V14.4012C16 15.2812 15.28 16.0012 14.4 16.0012H1.6C0.720001 16.0012 0 15.2812 0 14.4012V13.6545C0 11.7079 2.26667 10.5345 4.4 9.60119C4.48 9.57453 4.53334 9.54786 4.61334 9.49453C4.77334 9.41453 4.96 9.41453 5.12 9.52119C5.97334 10.0812 6.96001 10.4012 8.00001 10.4012C9.04001 10.4012 10.0267 10.0812 10.88 9.54786C11.04 9.44119 11.2267 9.44119 11.3867 9.52119C11.4667 9.54786 11.52 9.57453 11.6 9.62786C13.7333 10.5345 16 11.7079 16 13.6545",
p21bc7e00: "M141.191 13.7317C141.432 13.7317 141.666 13.7149 141.891 13.6814C142.116 13.6423 142.295 13.6031 142.427 13.564V14.6284C142.278 14.7011 142.059 14.7597 141.767 14.8044C141.482 14.8547 141.224 14.8799 140.993 14.8799C139.247 14.8799 138.373 13.944 138.373 12.0722V6.60779H137.08V5.93731L138.373 5.35902L138.95 3.39787H139.741V5.52664H142.361V6.60779H139.741V12.0135C139.741 12.5667 139.87 12.9913 140.128 13.2875C140.386 13.5836 140.74 13.7317 141.191 13.7317Z",
p21ef200: "M200.389 39.6735L200.022 37.9106H199.933C199.326 38.6866 198.719 39.2139 198.112 39.4927C197.512 39.7639 196.76 39.8995 195.857 39.8995C194.65 39.8995 193.702 39.5831 193.013 38.9502C192.332 38.3174 191.991 37.4172 191.991 36.2495C191.991 33.7484 193.957 32.4375 197.889 32.317L199.955 32.2492V31.4808C199.955 30.509 199.748 29.7933 199.333 29.3338C198.926 28.8667 198.271 28.6331 197.367 28.6331C196.353 28.6331 195.205 28.9495 193.924 29.5824L193.357 28.1472C193.957 27.8158 194.613 27.5559 195.323 27.3675C196.042 27.1792 196.76 27.085 197.478 27.085C198.93 27.085 200.004 27.4127 200.7 28.0681C201.403 28.7235 201.755 29.7745 201.755 31.2209V39.6735H200.389ZM196.223 38.3513C197.371 38.3513 198.271 38.0312 198.922 37.3908C199.582 36.7505 199.911 35.854 199.911 34.7014V33.5826L198.067 33.6617C196.601 33.7145 195.542 33.948 194.89 34.3624C194.246 34.7692 193.924 35.4057 193.924 36.2721C193.924 36.9501 194.124 37.4661 194.524 37.8202C194.931 38.1743 195.498 38.3513 196.223 38.3513Z",
p222fb280: "M6.23269 6.71107C6.07115 6.86867 5.80192 6.86867 5.64038 6.71107L0.121154 1.27392C-0.0403846 1.11632 -0.0403846 0.853659 0.121154 0.69606L0.713462 0.118199C0.875269 -0.0393996 1.1445 -0.0393996 1.30577 0.118199L5.64038 4.39962C5.80192 4.55722 6.07115 4.55722 6.23269 4.39962L10.5676 0.144465C10.7288 -0.0131332 10.9981 -0.0131332 11.1599 0.144465L11.7519 0.722326C11.8865 0.879925 11.8865 1.11632 11.7519 1.27392L6.23269 6.71107Z",
p24996380: "M127.103 20.2389V26.1978C127.103 26.9465 127.271 27.5052 127.606 27.874C127.941 28.2428 128.465 28.4272 129.179 28.4272C130.124 28.4272 130.813 28.1646 131.247 27.6393C131.686 27.1141 131.906 26.2565 131.906 25.0664V20.2389H133.274V29.4245H132.145L131.947 28.1925H131.873C131.593 28.6451 131.203 28.9915 130.703 29.2317C130.209 29.472 129.643 29.5921 129.006 29.5921C127.908 29.5921 127.084 29.3267 126.535 28.7959C125.991 28.2651 125.719 27.4158 125.719 26.2481V20.2389H127.103Z",
p261f0380: "M224.404 39.8995C222.642 39.8995 221.275 39.3495 220.305 38.2496C219.343 37.1422 218.861 35.579 218.861 33.56C218.861 31.4883 219.35 29.8875 220.327 28.7574C221.312 27.6274 222.712 27.0624 224.526 27.0624C225.111 27.0624 225.696 27.1264 226.281 27.2545C226.866 27.3826 227.325 27.5333 227.659 27.7065L227.092 29.2999C226.685 29.1341 226.241 28.9985 225.759 28.893C225.278 28.78 224.852 28.7235 224.482 28.7235C222.008 28.7235 220.772 30.3282 220.772 33.5374C220.772 35.0592 221.072 36.2269 221.672 37.0405C222.279 37.8541 223.175 38.2609 224.36 38.2609C225.374 38.2609 226.415 38.0387 227.481 37.5942V39.2553C226.666 39.6848 225.641 39.8995 224.404 39.8995Z",
p26346b00: "M190.369 18.5146C190.695 18.5146 191.01 18.492 191.314 18.4468C191.617 18.3941 191.858 18.3413 192.036 18.2886V19.7237C191.836 19.8217 191.539 19.9008 191.147 19.961C190.762 20.0288 190.414 20.0627 190.103 20.0627C187.748 20.0627 186.57 18.8009 186.57 16.2772V8.90941H184.826V8.00539L186.57 7.22568L187.348 4.58143H188.414V7.45168H191.947V8.90941H188.414V16.1981C188.414 16.9439 188.588 17.5164 188.936 17.9157C189.284 18.315 189.762 18.5146 190.369 18.5146Z",
p283c2600: "M8.00073 0C10.1952 0 11.9741 2.02038 11.9741 4.51282C11.9741 7.00526 10.1952 9.02564 8.00073 9.02564C5.8063 9.02564 4.02734 7.00526 4.02734 4.51282C4.02734 2.02038 5.8063 0 8.00073 0",
p28b6ee00: "M76.1354 13.2923C83.6421 10.7769 89.415 6.46193 94.8361 0.0387195C94.9822 -0.134308 99.6339 0.270414 99.663 1.29645C99.7096 2.93629 93.659 10.4374 85.106 35.8664C84.0592 38.9786 82.3497 48.7334 82.3497 48.7334L71.4978 54C71.4978 54 79.8124 27.0029 89.415 10.471C89.7246 9.93797 86.9873 11.9641 76.1354 15.5246V13.2923Z",
p29d99100: "M51.1386 20.4669L48.8761 13.9019L46.6136 20.4669H51.1386ZM52.4755 24.364H45.2767L44.1198 27.7903H38.7463L46.1251 8.06935H51.6271L59.0059 27.7903H53.6325L52.4755 24.364Z",
p2a0ac600: "M102.89 29.4245V17.1715H104.291V29.4245H102.89Z",
p2a3d6080: "M69.074 27.7903L72.3649 8.06935H77.3527L81.2349 18.5837L85.0914 8.06935H90.0792L93.3701 27.7903H88.3566L86.6854 16.439L82.109 27.7903H80.1037L75.7587 16.439L74.0875 27.7903H69.074Z",
p2b0ed700: "M4.04151 6.72049C3.39375 6.72049 2.76054 6.54406 2.22194 6.2135C1.68334 5.88295 1.26356 5.41312 1.01567 4.86343C0.767785 4.31373 0.702926 3.70887 0.829299 3.12532C0.955671 2.54177 1.2676 2.00574 1.72564 1.58503C2.18367 1.16431 2.76725 0.877801 3.40256 0.761726C4.03788 0.645651 4.6964 0.705225 5.29486 0.932915C5.89331 1.1606 6.40482 1.54618 6.7647 2.04089C7.12458 2.5356 7.31666 3.11722 7.31666 3.71221C7.3159 4.50984 6.97059 5.2746 6.35655 5.83861C5.7425 6.40262 4.9099 6.71979 4.04151 6.72049ZM6.81312 1.17306C6.45608 0.8137 6.02343 0.524557 5.54132 0.323098C5.0592 0.121639 4.53762 0.0120453 4.0081 0.000938218C3.47857 -0.0101688 2.95209 0.0774414 2.46046 0.258476C1.96884 0.43951 1.52227 0.71021 1.14774 1.05422C0.773213 1.39823 0.478499 1.80841 0.281405 2.25998C0.0843112 2.71155 -0.0110709 3.19513 0.00102145 3.68151C0.0131138 4.16789 0.13243 4.64697 0.35176 5.0898C0.57109 5.53264 0.885883 5.93003 1.27712 6.25798C1.63416 6.61734 2.06681 6.90648 2.54892 7.10794C3.03104 7.3094 3.55262 7.41899 4.08214 7.4301C4.61167 7.44121 5.13815 7.3536 5.62978 7.17256C6.1214 6.99153 6.56797 6.72083 6.9425 6.37682C7.31703 6.0328 7.61174 5.62262 7.80884 5.17105C8.00593 4.71949 8.10131 4.2359 8.08922 3.74953C8.07713 3.26315 7.95781 2.78407 7.73848 2.34123C7.51915 1.8984 7.20436 1.501 6.81312 1.17306Z",
p2b918a30: "M130.168 14.7122L129.896 13.4048H129.83C129.38 13.9803 128.929 14.3714 128.479 14.5781C128.034 14.7793 127.477 14.8799 126.807 14.8799C125.911 14.8799 125.208 14.6452 124.698 14.1758C124.192 13.7065 123.94 13.0388 123.94 12.1728C123.94 10.3178 125.398 9.34559 128.314 9.25619L129.847 9.20591V8.636C129.847 7.91523 129.693 7.38443 129.385 7.04361C129.083 6.69719 128.597 6.52398 127.927 6.52398C127.175 6.52398 126.323 6.75865 125.373 7.22799L124.953 6.1636C125.398 5.91776 125.884 5.72499 126.411 5.58531C126.944 5.44563 127.477 5.37578 128.009 5.37578C129.086 5.37578 129.882 5.61883 130.399 6.10493C130.92 6.59103 131.181 7.37047 131.181 8.44323V14.7122H130.168ZM127.078 13.7317C127.93 13.7317 128.597 13.4942 129.08 13.0193C129.569 12.5443 129.814 11.8794 129.814 11.0246V10.1949L128.446 10.2535C127.359 10.2926 126.573 10.4659 126.09 10.7732C125.612 11.0749 125.373 11.547 125.373 12.1895C125.373 12.6924 125.521 13.0751 125.818 13.3377C126.12 13.6003 126.54 13.7317 127.078 13.7317Z",
p2be5a800: "M6.2327 6.88315C6.07116 7.04479 5.80193 7.04479 5.64039 6.88315L0.121154 1.30659C-0.0403847 1.14495 -0.0403847 0.875547 0.121154 0.713908L0.713463 0.12123C0.875271 -0.0404099 1.1445 -0.0404099 1.30577 0.12123L5.64039 4.51244C5.80193 4.67408 6.07116 4.67408 6.2327 4.51244L10.5676 0.14817C10.7289 -0.0134699 10.9981 -0.0134699 11.1599 0.14817L11.7519 0.740848C11.8866 0.902487 11.8866 1.14495 11.7519 1.30659L6.2327 6.88315Z",
p2de3d800: "M153.136 39.6735V31.6616C153.136 30.6521 152.91 29.8988 152.458 29.4016C152.006 28.9043 151.299 28.6557 150.336 28.6557C149.063 28.6557 148.13 29.006 147.537 29.7067C146.945 30.4073 146.648 31.5637 146.648 33.1758V39.6735H144.805V27.2884H146.304L146.604 28.9834H146.693C147.071 28.3732 147.6 27.9024 148.281 27.5709C148.963 27.2319 149.722 27.0624 150.558 27.0624C152.025 27.0624 153.128 27.424 153.869 28.1472C154.609 28.8629 154.979 30.0118 154.979 31.5938V39.6735H153.136Z",
p2eca6600: "M235.523 39.8995C233.724 39.8995 232.302 39.342 231.258 38.227C230.221 37.1121 229.703 35.5639 229.703 33.5826C229.703 31.5863 230.184 30.0005 231.147 28.8252C232.117 27.65 233.416 27.0624 235.045 27.0624C236.571 27.0624 237.778 27.5747 238.667 28.5992C239.555 29.6163 240 30.961 240 32.6334V33.8199H231.613C231.65 35.2739 232.009 36.3776 232.691 37.1309C233.379 37.8843 234.346 38.2609 235.59 38.2609C236.901 38.2609 238.196 37.9822 239.478 37.4247V39.0971C238.826 39.3834 238.208 39.5868 237.623 39.7074C237.045 39.8354 236.345 39.8995 235.523 39.8995ZM235.023 28.6331C234.046 28.6331 233.265 28.9571 232.679 29.605C232.102 30.2528 231.761 31.1493 231.658 32.2944H238.022C238.022 31.1117 237.763 30.2076 237.245 29.5824C236.726 28.9495 235.986 28.6331 235.023 28.6331Z",
p2f325480: "M202.81 19.8367V11.8249C202.81 10.8154 202.584 10.062 202.133 9.56483C201.681 9.06762 200.974 8.81901 200.011 8.81901C198.73 8.81901 197.793 9.17308 197.201 9.88123C196.616 10.5894 196.323 11.7495 196.323 13.3617V19.8367H194.479V2.25358H196.323V7.57599C196.323 8.21633 196.294 8.74744 196.234 9.16932H196.345C196.708 8.57417 197.223 8.1071 197.889 7.76809C198.563 7.42155 199.33 7.24828 200.189 7.24828C201.677 7.24828 202.792 7.60989 203.532 8.3331C204.28 9.04878 204.654 10.1901 204.654 11.7571V19.8367H202.81Z",
p2f526270: "M150.418 14.7122V8.77009C150.418 8.02139 150.25 7.46266 149.915 7.09389C149.58 6.72513 149.056 6.54075 148.342 6.54075C147.392 6.54075 146.697 6.80335 146.257 7.32856C145.824 7.85377 145.607 8.71422 145.607 9.90991V14.7122H144.239V1.67138H145.607V5.61883C145.607 6.09376 145.585 6.48767 145.541 6.80056H145.623C145.892 6.35916 146.274 6.01274 146.768 5.76131C147.268 5.50429 147.836 5.37578 148.474 5.37578C149.578 5.37578 150.404 5.64398 150.953 6.18036C151.508 6.71116 151.785 7.55764 151.785 8.71981V14.7122H150.418Z",
p2f6205e8: "M16 14.0039V14.7697C16 15.6722 15.28 16.4107 14.4 16.4107H1.6C0.72 16.4107 0 15.6722 0 14.7697V14.0039C0 12.0073 2.26667 10.8039 4.4 9.8466C4.48 9.81925 4.53333 9.7919 4.61333 9.7372C4.77333 9.65515 4.96 9.65515 5.12 9.76455C5.97333 10.3389 6.96 10.6671 8 10.6671C9.04 10.6671 10.0267 10.3389 10.88 9.7919C11.04 9.6825 11.2267 9.6825 11.3867 9.76455C11.4667 9.7919 11.52 9.81925 11.6 9.87395C13.7333 10.8039 16 12.0073 16 14.0039",
p3425f6f0: "M4.00114 3.55849H3.24656V2.18024C3.46138 2.16137 3.67714 2.15297 3.89293 2.15506C4.70282 2.15506 5.10728 2.38654 5.10632 2.84948C5.10536 3.31243 4.73696 3.54877 4.00114 3.55849ZM4.9404 3.81028C5.45019 3.60884 5.7046 3.2793 5.70364 2.82166C5.70734 2.65757 5.66412 2.49547 5.5783 2.35153C5.49247 2.20758 5.36704 2.08683 5.21453 2.00133C4.88413 1.7946 4.45129 1.69388 3.89293 1.69388C3.4696 1.69864 3.0474 1.73498 2.63048 1.80255V5.72259H3.24656V3.98919H4.02999C4.66386 3.98919 5.06833 4.56699 5.24338 5.72259H5.8609C5.80066 5.27516 5.68048 4.83628 5.50309 4.41591C5.38536 4.16568 5.18956 3.95309 4.9404 3.80498V3.81028Z",
p364197c0: "M166.632 36.2947C166.632 37.4473 166.21 38.3363 165.365 38.9615C164.521 39.5868 163.336 39.8995 161.811 39.8995C160.196 39.8995 158.938 39.6396 158.034 39.1197V37.3795C158.619 37.6809 159.245 37.9182 159.911 38.0914C160.585 38.2647 161.233 38.3513 161.855 38.3513C162.818 38.3513 163.558 38.1969 164.077 37.888C164.595 37.5716 164.854 37.0932 164.854 36.4529C164.854 35.9708 164.647 35.5602 164.232 35.2212C163.825 34.8746 163.025 34.4678 161.833 34.0007C160.7 33.5713 159.893 33.1984 159.412 32.882C158.938 32.5581 158.582 32.1927 158.345 31.7859C158.116 31.3791 158.001 30.8932 158.001 30.3282C158.001 29.3187 158.404 28.5239 159.212 27.9438C160.019 27.3562 161.126 27.0624 162.533 27.0624C163.844 27.0624 165.125 27.3336 166.376 27.876L165.721 29.4016C164.499 28.8893 163.392 28.6331 162.4 28.6331C161.526 28.6331 160.867 28.7725 160.422 29.0512C159.978 29.33 159.756 29.7142 159.756 30.2039C159.756 30.5353 159.837 30.8179 160 31.0514C160.171 31.2849 160.441 31.5072 160.811 31.7181C161.181 31.929 161.892 32.2341 162.944 32.6334C164.388 33.1683 165.362 33.7069 165.865 34.2494C166.376 34.7918 166.632 35.4735 166.632 36.2947Z",
p37688980: "M174.68 29.5921C173.345 29.5921 172.291 29.1787 171.516 28.3517C170.747 27.5248 170.363 26.3766 170.363 24.9071C170.363 23.4265 170.72 22.2504 171.434 21.3787C172.153 20.5071 173.117 20.0713 174.326 20.0713C175.457 20.0713 176.352 20.4512 177.011 21.2111C177.67 21.9654 178 22.9627 178 24.2031V25.0831H171.78C171.807 26.1615 172.074 26.98 172.579 27.5388C173.09 28.0975 173.807 28.3769 174.729 28.3769C175.701 28.3769 176.663 28.1701 177.613 27.7567V28.9971C177.129 29.2094 176.671 29.3602 176.237 29.4496C175.809 29.5446 175.29 29.5921 174.68 29.5921ZM174.309 21.2362C173.584 21.2362 173.005 21.4765 172.571 21.957C172.142 22.4375 171.89 23.1024 171.813 23.9517H176.534C176.534 23.0745 176.341 22.404 175.957 21.9403C175.572 21.4709 175.023 21.2362 174.309 21.2362Z",
p39466b40: "M135.374 14.7122H134.007V1.67138H135.374V14.7122Z",
p3affbb00: "M189.17 27.0624C189.71 27.0624 190.195 27.1076 190.625 27.198L190.369 28.9382C189.866 28.8252 189.421 28.7687 189.036 28.7687C188.051 28.7687 187.207 29.1756 186.504 29.9892C185.808 30.8028 185.46 31.816 185.46 33.0289V39.6735H183.616V27.2884H185.138L185.349 29.5824H185.437C185.889 28.7763 186.433 28.1548 187.07 27.7178C187.707 27.2809 188.407 27.0624 189.17 27.0624Z",
p3bf1f380: "M118.955 14.8799C117.621 14.8799 116.566 14.4664 115.792 13.6395C115.023 12.8125 114.638 11.6643 114.638 10.1949C114.638 8.71422 114.995 7.53809 115.709 6.66646C116.429 5.79484 117.393 5.35902 118.601 5.35902C119.733 5.35902 120.628 5.73896 121.287 6.49884C121.946 7.25313 122.275 8.25047 122.275 9.49086V10.3709H116.055C116.083 11.4492 116.349 12.2678 116.855 12.8265C117.365 13.3852 118.082 13.6646 119.005 13.6646C119.977 13.6646 120.938 13.4579 121.888 13.0444V14.2848C121.405 14.4971 120.946 14.648 120.512 14.7374C120.084 14.8324 119.565 14.8799 118.955 14.8799ZM118.585 6.52398C117.86 6.52398 117.28 6.76424 116.846 7.24475C116.418 7.72526 116.165 8.39015 116.088 9.23943H120.809C120.809 8.36222 120.617 7.69174 120.232 7.22799C119.848 6.75865 119.299 6.52398 118.585 6.52398Z",
p3bff9900: "M175.507 19.8367L175.14 18.0739H175.051C174.444 18.8498 173.837 19.3772 173.23 19.6559C172.63 19.9271 171.878 20.0627 170.975 20.0627C169.768 20.0627 168.82 19.7463 168.131 19.1135C167.45 18.4807 167.109 17.5804 167.109 16.4128C167.109 13.9116 169.075 12.6008 173.008 12.4803L175.074 12.4125V11.6441C175.074 10.6722 174.866 9.95657 174.452 9.49702C174.044 9.02995 173.389 8.79641 172.486 8.79641C171.471 8.79641 170.323 9.11282 169.042 9.74563L168.476 8.3105C169.075 7.97903 169.731 7.71912 170.442 7.53079C171.16 7.34245 171.878 7.24828 172.597 7.24828C174.048 7.24828 175.122 7.57599 175.818 8.2314C176.521 8.88681 176.873 9.93773 176.873 11.3842V19.8367H175.507ZM171.341 18.5146C172.489 18.5146 173.389 18.1944 174.041 17.5541C174.7 16.9137 175.029 16.0173 175.029 14.8646V13.7459L173.185 13.825C171.719 13.8777 170.66 14.1113 170.008 14.5256C169.364 14.9324 169.042 15.569 169.042 16.4354C169.042 17.1134 169.242 17.6294 169.642 17.9835C170.049 18.3376 170.616 18.5146 171.341 18.5146Z",
p3c127600: "M113.576 29.4245V23.4824C113.576 22.7337 113.408 22.1749 113.073 21.8062C112.738 21.4374 112.214 21.253 111.5 21.253C110.555 21.253 109.863 21.5128 109.424 22.0324C108.984 22.5521 108.764 23.4097 108.764 24.6054V29.4245H107.397V20.2389H108.509L108.732 21.4961H108.797C109.078 21.0435 109.47 20.6943 109.975 20.4484C110.481 20.197 111.044 20.0713 111.664 20.0713C112.752 20.0713 113.57 20.3395 114.119 20.8759C114.669 21.4067 114.943 22.2587 114.943 23.4321V29.4245H113.576Z",
p3cfc9d00: "M27.084 16.5303H43.332V27.5508H27.084V44.082H16.251V27.5508H0V16.5303H16.251V0H27.084V16.5303Z",
p3ea74670: "M171.375 27.2884V35.3229C171.375 36.3324 171.601 37.0857 172.052 37.5829C172.504 38.0801 173.211 38.3287 174.174 38.3287C175.448 38.3287 176.377 37.9747 176.962 37.2665C177.554 36.5584 177.851 35.402 177.851 33.7973V27.2884H179.695V39.6735H178.173L177.906 38.0123H177.806C177.429 38.6225 176.903 39.0896 176.229 39.4136C175.562 39.7375 174.8 39.8995 173.941 39.8995C172.46 39.8995 171.349 39.5416 170.608 38.8259C169.875 38.1103 169.509 36.9652 169.509 35.3907V27.2884H171.375Z",
p3ee2c900: "M166.433 29.5921C165.126 29.5921 164.113 29.1842 163.393 28.3685C162.679 27.5471 162.322 26.3878 162.322 24.8904C162.322 23.3539 162.685 22.1665 163.41 21.3284C164.14 20.4903 165.178 20.0713 166.524 20.0713C166.958 20.0713 167.392 20.1188 167.826 20.2138C168.259 20.3087 168.6 20.4205 168.847 20.549L168.427 21.7307C168.125 21.6078 167.795 21.5072 167.438 21.429C167.081 21.3452 166.766 21.3033 166.491 21.3033C164.657 21.3033 163.739 22.4934 163.739 24.8736C163.739 26.0022 163.962 26.8683 164.407 27.4717C164.857 28.0752 165.522 28.3769 166.4 28.3769C167.153 28.3769 167.924 28.212 168.715 27.8824V29.1144C168.111 29.4329 167.35 29.5921 166.433 29.5921Z",
p3f8ec680: "M4.92816 15.8857C4.92816 17.054 5.85589 18 6.99979 18C8.14346 18 9.07124 17.0538 9.07101 15.8857H4.92816Z",
p42b2650: "M213.896 39.6735V31.6616C213.896 30.6521 213.67 29.8988 213.218 29.4016C212.767 28.9043 212.059 28.6557 211.097 28.6557C209.823 28.6557 208.89 29.006 208.298 29.7067C207.705 30.4073 207.409 31.5637 207.409 33.1758V39.6735H205.565V27.2884H207.065L207.364 28.9834H207.453C207.831 28.3732 208.361 27.9024 209.042 27.5709C209.723 27.2319 210.482 27.0624 211.319 27.0624C212.785 27.0624 213.889 27.424 214.629 28.1472C215.37 28.8629 215.74 30.0118 215.74 31.5938V39.6735H213.896Z",
p4f5e480: "M182.527 19.8367H180.683V2.25358H182.527V19.8367Z",
p7a3d8f2: "M158.64 29.4245V23.4824C158.64 22.7337 158.472 22.1749 158.137 21.8062C157.802 21.4374 157.278 21.253 156.564 21.253C155.619 21.253 154.927 21.5128 154.488 22.0324C154.048 22.5521 153.829 23.4097 153.829 24.6054V29.4245H152.461V20.2389H153.573L153.796 21.4961H153.861C154.142 21.0435 154.534 20.6943 155.04 20.4484C155.545 20.197 156.108 20.0713 156.728 20.0713C157.816 20.0713 158.634 20.3395 159.183 20.8759C159.733 21.4067 160.007 22.2587 160.007 23.4321V29.4245H158.64Z",
paf15100: "M8.00004 6.91414e-05C10.1945 6.91414e-05 11.9734 1.96994 11.9734 4.40007C11.9734 6.83021 10.1945 8.80008 8.00004 8.80008C5.80561 8.80008 4.02665 6.83021 4.02665 4.40007C4.02665 1.96994 5.80561 6.91414e-05 8.00004 6.91414e-05",
pb20da00: "M138.729 39.6735V23.1525H140.617V39.6735H138.729Z",
pd6a2880: "M151.058 19.8367H149.17V12.0622H140.617V19.8367H138.729V3.3158H140.617V10.3445H149.17V3.3158H151.058V19.8367Z",
}

```

## src/imports/GlobalHeader/svg-4iv0a.tsx
```tsx
export const imgBkgd = "data:image/svg+xml,%3Csvg%20preserveAspectRatio%3D%22none%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20overflow%3D%22visible%22%20style%3D%22display%3A%20block%3B%22%20viewBox%3D%220%200%2032%2032.8205%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20id%3D%22Mask%22%20width%3D%2232%22%20height%3D%2232.8205%22%20rx%3D%2216%22%20fill%3D%22var(--fill-0%2C%20black)%22%2F%3E%0A%3C%2Fsvg%3E%0A";
export const imgBkgd1 = "data:image/svg+xml,%3Csvg%20preserveAspectRatio%3D%22none%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20overflow%3D%22visible%22%20style%3D%22display%3A%20block%3B%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20id%3D%22Mask%22%20width%3D%2232%22%20height%3D%2232%22%20rx%3D%2216%22%20fill%3D%22var(--fill-0%2C%20black)%22%2F%3E%0A%3C%2Fsvg%3E%0A";
```

## src/imports/Input/index.tsx
```tsx
import svgPaths from "./svg-xqeqd5rtrv";

function Header() {
  return (
    <div className="[word-break:break-word] absolute bg-[#82479d] content-stretch drop-shadow-[0px_8px_8px_rgba(0,0,0,0.15)] flex font-['Open_Sans:Light',sans-serif] font-light items-center justify-between left-0 px-[117px] py-[16px] right-0 text-white top-0 whitespace-nowrap" data-name="header">
      <p className="leading-[0] relative shrink-0 text-[36px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        <span className="leading-[normal]">{`Javelina `}</span>
        <span className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Design System
        </span>
      </p>
      <p className="leading-[normal] relative shrink-0 text-[20px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Inputs
      </p>
      <p className="leading-[normal] relative shrink-0 text-[20px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Version 2.0
      </p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white content-stretch flex h-[40px] items-center min-w-[100px] p-[16px] relative rounded-[4px] shrink-0 w-[400px]" data-name="Input">
      <div aria-hidden className="absolute border border-[#999] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[#565962] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Hint Text
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[106px] items-center justify-center relative shrink-0 w-[477px]">
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Input">
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[12px] w-[368px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
        <Input1 />
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white content-stretch flex h-[40px] items-center min-w-[100px] p-[16px] relative rounded-[4px] shrink-0 w-[400px]" data-name="Input">
      <div aria-hidden className="absolute border border-[#999] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[#565962] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Hint Text
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col gap-[10px] h-[157px] items-center justify-center relative shrink-0 w-[477px]">
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Input">
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[12px] w-[368px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
        <Input2 />
      </div>
      <div className="bg-white content-stretch flex h-[40px] items-center min-w-[100px] p-[16px] relative rounded-[4px] shrink-0 w-[400px]" data-name="Input">
        <div aria-hidden className="absolute border border-[#999] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[#565962] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Hint Text
        </p>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-white content-stretch flex h-[40px] items-center min-w-[100px] p-[16px] relative rounded-[4px] shrink-0 w-[400px]" data-name="Input">
      <div aria-hidden className="absolute border border-[#999] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[#565962] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Hint Text
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col gap-[10px] h-[157px] items-center justify-center relative shrink-0 w-[477px]">
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Input">
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[12px] w-[368px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
        <Input3 />
      </div>
      <div className="bg-white content-stretch flex h-[40px] items-center min-w-[100px] p-[16px] relative rounded-[4px] shrink-0 w-[400px]" data-name="Input">
        <div aria-hidden className="absolute border border-[#999] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[#565962] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Hint Text
        </p>
      </div>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-white content-stretch flex h-[40px] items-center min-w-[100px] p-[16px] relative rounded-[4px] shrink-0 w-[400px]" data-name="Input">
      <div aria-hidden className="absolute border border-[#0a7593] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[#263154] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Focused|
      </p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col gap-[10px] h-[157px] items-center justify-center relative shrink-0 w-[477px]">
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Input">
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[12px] w-[368px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
        <Input4 />
      </div>
      <div className="bg-white content-stretch flex h-[40px] items-center min-w-[100px] p-[16px] relative rounded-[4px] shrink-0 w-[400px]" data-name="Input">
        <div aria-hidden className="absolute border border-[#0a7593] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[#263154] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Focused|
        </p>
      </div>
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-white content-stretch flex h-[40px] items-center min-w-[100px] p-[16px] relative rounded-[4px] shrink-0 w-[400px]" data-name="Input">
      <div aria-hidden className="absolute border border-[#c00] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[#263154] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Error|
      </p>
    </div>
  );
}

function Input6() {
  return (
    <div className="bg-white content-stretch flex h-[40px] items-center min-w-[100px] p-[16px] relative rounded-[4px] shrink-0 w-[400px]" data-name="Input">
      <div aria-hidden className="absolute border border-[#c00] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[#263154] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Error|
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col gap-[10px] h-[201px] items-center justify-center relative shrink-0 w-[477px]">
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Input">
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[12px] w-[368px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
        <Input5 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#c00] text-[12px] w-[368px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Sample error message
        </p>
      </div>
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Input">
        <Input6 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#c00] text-[12px] w-[368px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Sample error message
        </p>
      </div>
    </div>
  );
}

function Input7() {
  return (
    <div className="bg-[#e7e7e7] content-stretch flex h-[40px] items-center min-w-[100px] p-[16px] relative rounded-[4px] shrink-0 w-[400px]" data-name="Input">
      <div aria-hidden className="absolute border border-[#999] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[#565962] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Hint Text
      </p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col gap-[10px] h-[201px] items-center justify-center relative shrink-0 w-[477px]">
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Input">
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#565962] text-[12px] w-[368px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
        <Input7 />
      </div>
      <div className="bg-[#e7e7e7] content-stretch flex h-[40px] items-center min-w-[100px] p-[16px] relative rounded-[4px] shrink-0 w-[400px]" data-name="Input">
        <div aria-hidden className="absolute border border-[#999] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[#565962] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Hint Text
        </p>
      </div>
    </div>
  );
}

function Input8() {
  return (
    <div className="bg-white content-stretch flex h-[40px] items-center justify-between min-w-[100px] pl-[16px] pr-[8px] py-[16px] relative rounded-[4px] shrink-0 w-[400px]" data-name="Input">
      <div aria-hidden className="absolute border border-[#999] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[#565962] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Hint Text
      </p>
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[24px]" data-name="icon 24x24">
        <div className="h-[6px] relative shrink-0 w-[10px]" data-name="Vector 8 (Stroke)">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
            <g id="Vector 8 (Stroke)">
              <path clipRule="evenodd" d={svgPaths.p1a656c80} fill="var(--fill-0, #6B6F7A)" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p1a656c80} fill="var(--fill-1, black)" fillOpacity="0.2" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="h-[22px] relative shrink-0 w-[17px]">
      <div className="absolute inset-[-3.21%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 23.4142">
          <g id="Group 401">
            <g id="Vector 5">
              <path d={svgPaths.pe07b180} stroke="var(--stroke-0, #6B6F7A)" />
              <path d={svgPaths.pe07b180} stroke="var(--stroke-1, black)" strokeOpacity="0.2" />
            </g>
            <g id="Vector 6">
              <path d={svgPaths.pc56eac0} stroke="var(--stroke-0, #6B6F7A)" />
              <path d={svgPaths.pc56eac0} stroke="var(--stroke-1, black)" strokeOpacity="0.2" />
            </g>
            <line id="Line 5" stroke="var(--stroke-0, #999999)" x2="17" y1="11.2071" y2="11.2071" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Input9() {
  return (
    <div className="bg-white content-stretch flex h-[40px] items-center justify-between min-w-[100px] pl-[16px] pr-[8px] py-[16px] relative rounded-[4px] shrink-0 w-[400px]" data-name="Input">
      <div aria-hidden className="absolute border border-[#999] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[#565962] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Hint Text
      </p>
      <Group />
    </div>
  );
}

function Input10() {
  return (
    <div className="bg-white content-stretch flex h-[40px] items-center justify-between min-w-[100px] pl-[16px] pr-[8px] py-[16px] relative rounded-[4px] shrink-0 w-[400px]" data-name="Input">
      <div aria-hidden className="absolute border border-[#999] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[#565962] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Hint Text
      </p>
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[24px]" data-name="icon 24x24">
        <div className="h-[10px] relative shrink-0 w-[14.286px]" data-name="Eye">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.2857 10">
            <g id="Eye">
              <path clipRule="evenodd" d={svgPaths.pa055800} fill="var(--fill-0, #6B6F7A)" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.pa055800} fill="var(--fill-1, black)" fillOpacity="0.2" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col gap-[10px] h-[267px] items-center justify-center relative shrink-0 w-[477px]">
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Input">
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[12px] w-[368px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
        <Input8 />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Input">
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[12px] w-[368px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
        <Input9 />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Input">
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[12px] w-[368px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
        <Input10 />
      </div>
    </div>
  );
}

function Textarea() {
  return (
    <div className="bg-white min-h-[72px] min-w-[100px] relative rounded-[4px] shrink-0 w-[529px]" data-name="Textarea">
      <div className="content-stretch flex items-start min-h-[inherit] min-w-[inherit] overflow-clip p-[16px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] min-w-px relative text-[#565962] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Hint text for Textarea
        </p>
      </div>
      <div aria-hidden className="absolute border border-[#999] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col gap-[10px] h-[219px] items-center justify-center relative shrink-0 w-[693px]">
      <div className="bg-white min-h-[72px] min-w-[100px] relative rounded-[4px] shrink-0 w-[529px]" data-name="Textarea">
        <div className="content-stretch flex items-start min-h-[inherit] min-w-[inherit] overflow-clip p-[16px] relative rounded-[inherit] size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] min-w-px relative text-[#565962] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            Hint text for Textarea
          </p>
        </div>
        <div aria-hidden className="absolute border border-[#999] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Textarea">
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[12px] w-[368px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
        <Textarea />
      </div>
    </div>
  );
}

function Textarea1() {
  return (
    <div className="bg-white min-h-[72px] min-w-[100px] relative rounded-[4px] shrink-0 w-[529px]" data-name="Textarea">
      <div className="content-stretch flex items-start min-h-[inherit] min-w-[inherit] overflow-clip p-[16px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] min-w-px relative text-[#263154] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          To reset password, please enter the email you have used to register. To validate your account, you may be asked for additional informat|
        </p>
      </div>
      <div aria-hidden className="absolute border border-[#0a7593] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col gap-[10px] h-[219px] items-center justify-center relative shrink-0 w-[693px]">
      <div className="bg-white min-h-[72px] min-w-[100px] relative rounded-[4px] shrink-0 w-[529px]" data-name="Textarea">
        <div className="content-stretch flex items-start min-h-[inherit] min-w-[inherit] overflow-clip p-[16px] relative rounded-[inherit] size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] min-w-px relative text-[#263154] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            To reset password, please enter the email you have used to register. To validate your account, you may be asked for additional informat|
          </p>
        </div>
        <div aria-hidden className="absolute border border-[#0a7593] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Textarea">
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[12px] w-[368px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
        <Textarea1 />
      </div>
    </div>
  );
}

function Textarea2() {
  return (
    <div className="bg-[#e7e7e7] min-h-[72px] min-w-[100px] relative rounded-[4px] shrink-0 w-[529px]" data-name="Textarea">
      <div className="content-stretch flex items-start min-h-[inherit] min-w-[inherit] overflow-clip p-[16px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] min-w-px relative text-[#263154] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          To reset password, please enter the email you have used to register. To validate your account, you may be asked for additional informat|
        </p>
      </div>
      <div aria-hidden className="absolute border border-[#999] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col gap-[10px] h-[219px] items-center justify-center relative shrink-0 w-[693px]">
      <div className="bg-[#e7e7e7] min-h-[72px] min-w-[100px] relative rounded-[4px] shrink-0 w-[529px]" data-name="Textarea">
        <div className="content-stretch flex items-start min-h-[inherit] min-w-[inherit] overflow-clip p-[16px] relative rounded-[inherit] size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] min-w-px relative text-[#565962] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            Hint text for Textarea
          </p>
        </div>
        <div aria-hidden className="absolute border border-[#999] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Textarea">
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[12px] w-[368px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
        <Textarea2 />
      </div>
    </div>
  );
}

function Textarea3() {
  return (
    <div className="bg-white min-h-[72px] min-w-[100px] relative rounded-[4px] shrink-0 w-[529px]" data-name="Textarea">
      <div className="content-stretch flex items-start min-h-[inherit] min-w-[inherit] overflow-clip p-[16px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] min-w-px relative text-[#263154] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          To reset password, please enter the email you have used to register. To validate your account, you may be asked for additional informat|
        </p>
      </div>
      <div aria-hidden className="absolute border border-[#c00] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Textarea4() {
  return (
    <div className="bg-[#e7e7e7] min-h-[72px] min-w-[100px] relative rounded-[4px] shrink-0 w-[529px]" data-name="Textarea">
      <div className="content-stretch flex items-start min-h-[inherit] min-w-[inherit] overflow-clip p-[16px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] min-w-px relative text-[#263154] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          To reset password, please enter the email you have used to register. To validate your account, you may be asked for additional informat|
        </p>
      </div>
      <div aria-hidden className="absolute border border-[#c00] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col gap-[10px] h-[298px] items-center justify-center relative shrink-0 w-[693px]">
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Textarea">
        <Textarea3 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#c00] text-[12px] w-[368px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Sample error message
        </p>
      </div>
      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Textarea">
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[12px] w-[368px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
        <Textarea4 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#c00] text-[12px] w-[368px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Sample error message
        </p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[3263px] items-start left-[114px] top-[142px]">
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Inputs
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Inputs allow users to enter text or numbers.
      </p>
      <Frame1 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] w-[245px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Variations
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        There are two variations of Input - With label and without label
      </p>
      <Frame2 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        States
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Input has four types of status available that should be used for form validation — default, focused, error, and disabled.
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Default
      </p>
      <Frame3 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Focused
      </p>
      <Frame4 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Error
      </p>
      <Frame5 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Disabled
      </p>
      <Frame6 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Icons and Drop Down
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Input has four types of status available that should be used for form validation — default, focused, error, and disabled.
      </p>
      <Frame7 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Text Area
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Textarea is an input that accepts long-form text entries.
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Default
      </p>
      <Frame8 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Focused
      </p>
      <Frame9 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Disabled
      </p>
      <Frame10 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Error
      </p>
      <Frame11 />
    </div>
  );
}

export default function Input() {
  return (
    <div className="bg-white relative size-full" data-name="Input">
      <Header />
      <Frame />
    </div>
  );
}
```

## src/imports/Input/svg-xqeqd5rtrv.ts
```ts
export default {
p1a656c80: "M0 1.04482L1.05426 0L5 3.91037L8.94573 0L10 1.04482L5 6L0 1.04482Z",
pa055800: "M7.14286 0C3.8961 0 1.12338 2.07333 0 5C1.12338 7.92667 3.8961 10 7.14286 10C10.3896 10 13.1623 7.92667 14.2857 5C13.1623 2.07333 10.3896 0 7.14286 0ZM7.50072 7.85832C5.72643 7.85832 4.28643 6.57832 4.28643 5.00117C4.28643 3.42403 5.72643 2.14403 7.50072 2.14403C9.275 2.14403 10.715 3.42403 10.715 5.00117C10.715 6.57832 9.275 7.85832 7.50072 7.85832ZM7.49948 2.85871C6.11614 2.85871 4.99948 3.81585 4.99948 5.00157C4.99948 6.18728 6.11614 7.14442 7.49948 7.14442C8.88281 7.14442 9.99948 6.18728 9.99948 5.00157C9.99948 3.81585 8.88281 2.85871 7.49948 2.85871Z",
pc56eac0: "M12 3.70711L9 0.707107L6 3.70711",
pe07b180: "M6 19.7071L9 22.7071L12 19.7071",
}

```

## src/imports/MobileFooter/index.tsx
```tsx
import svgPaths from "./svg-8vrbzbfzhc";
import { imgGroup } from "./svg-jyd2r";
type MobileFooterProps = {
  className?: string;
  property1?: "Footer 2" | "Footer 1";
};

export default function MobileFooter({ className, property1 = "Footer 1" }: MobileFooterProps) {
  const isFooter1 = property1 === "Footer 1";
  const isFooter2 = property1 === "Footer 2";
  return (
    <div className={className || `relative w-[375px] ${isFooter2 ? "h-[646px]" : "h-[620px]"}`}>
      <div className="absolute bg-[#fff2f8] inset-0" data-name="Rectangle Copy" />
      <div className={`absolute ${isFooter2 ? "[word-break:break-word] contents left-[4.27%] right-[12.27%] text-[#263154] top-[20px]" : "content-stretch flex gap-[16px] items-center left-[calc(50%+5.5px)] top-[405px]"}`}>
        {isFooter1 && (
          <>
            <div className="h-[15.2px] relative shrink-0 w-[20px]" data-name="📷 facebook">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 15.2">
                <g id="ð· facebook">
                  <path clipRule="evenodd" d={svgPaths.p3d60a00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="facebook" />
                </g>
              </svg>
            </div>
            <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 w-[20px]" data-name="prime:twitter">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
                <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Clip path group">
                  <div className="col-1 h-[12.688px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.656px] mask-size-[14px_14px] ml-0 mt-[0.66px] relative row-1 w-[14px]" style={{ maskImage: `url("${imgGroup}")` }} data-name="Group">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12.688">
                      <g id="Group">
                        <path d={svgPaths.p1d6b7300} fill="var(--fill-0, #263154)" id="Vector" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[14px] relative shrink-0 w-[20px]" data-name="XMLID_823_">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 14">
                <path clipRule="evenodd" d={svgPaths.p326bd400} fill="var(--fill-0, #263154)" fillRule="evenodd" id="XMLID_823_" />
              </svg>
            </div>
            <div className="h-[16px] relative shrink-0 w-[20px]" data-name="linkedin">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
                <g id="linkedin">
                  <path clipRule="evenodd" d={svgPaths.p8b5ce00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="Shape" />
                </g>
              </svg>
            </div>
          </>
        )}
        {isFooter2 && (
          <>
            <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[8.05%_12.27%_88.85%_4.27%] leading-[0] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[normal] mb-0">For immediate assistance, please call:</p>
              <p className="leading-[normal]">​</p>
            </div>
            <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold h-[20px] leading-[normal] left-[4.27%] right-[72.53%] text-[16px] top-[calc(50%-303px)]" style={{ fontVariationSettings: '"wdth" 100' }}>
              Contact Us
            </p>
            <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[11.38%_12.27%_78.95%_4.27%] leading-[0] text-[0px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[normal] mb-0 text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
                1 (800) CALL-NOW | 1 (800) 121-2412
              </p>
              <p className="leading-[normal] mb-0 text-[14px]">​</p>
              <p className="text-[14px]">
                <span className="leading-[normal]" style={{ fontVariationSettings: '"wdth" 100' }}>{`Email: `}</span>
                <span className="leading-[normal] text-[#0a7593]" style={{ fontVariationSettings: '"wdth" 100' }}>
                  support@eldocomp.com
                </span>
              </p>
            </div>
          </>
        )}
      </div>
      {isFooter1 && (
        <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[17.1%_12.27%_79.68%_4.27%] leading-[0] text-[#263154] text-[0px]" style={{ fontVariationSettings: '"wdth" 100' }}>
          <span className="leading-[normal] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>{`Email: `}</span>
          <span className="leading-[normal] text-[#0a7593] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            support@eldocomp.com
          </span>
        </p>
      )}
      <div className={`absolute contents ${isFooter2 ? "inset-[21.98%_11.47%_72.14%_4.27%]" : "[word-break:break-word] left-[4.27%] right-[12.27%] text-[#263154] top-[20px]"}`}>
        {isFooter1 && (
          <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[8.39%_12.27%_88.39%_4.27%] leading-[0] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            <p className="leading-[normal] mb-0">For immediate assistance, please call:</p>
            <p className="leading-[normal]">​</p>
          </div>
        )}
        <p className={`absolute leading-[normal] ${isFooter2 ? '[word-break:break-word] font-["Open_Sans:Regular",sans-serif] font-normal inset-[21.98%_11.47%_72.14%_4.27%] text-[#263154] text-[14px]' : 'font-["Open_Sans:Bold",sans-serif] font-bold h-[20px] left-[4.27%] right-[72.53%] text-[16px] top-[calc(50%-290px)]'}`} style={{ fontVariationSettings: '"wdth" 100' }}>
          {isFooter2 ? "9025 Smoky Hollow Street, Niagara Falls, NY 14304" : "Contact Us"}
        </p>
        {isFooter1 && (
          <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[11.94%_12.27%_85.48%_4.27%] leading-[0] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            <p className="leading-[normal] mb-0">1 (800) CALL-NOW | 1 (800) 121-2412</p>
            <p className="leading-[normal] mb-0">​</p>
            <p className="leading-[normal]">​</p>
          </div>
        )}
      </div>
      <div className={`absolute contents ${isFooter2 ? "[word-break:break-word] left-[4.27%] right-[52%] top-[196px]" : "inset-[22.9%_11.47%_70.97%_4.27%]"}`}>
        {isFooter1 && (
          <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[22.9%_11.47%_70.97%_4.27%] leading-[normal] text-[#263154] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            9025 Smoky Hollow Street, Niagara Falls, NY 14304
          </p>
        )}
        {isFooter2 && (
          <>
            <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[34.67%_52%_45.2%_4.27%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[32px] mb-0">Privacy Policy</p>
              <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
              <p className="leading-[32px] mb-0">Legal</p>
              <p className="leading-[32px] mb-0">{`Contact Us `}</p>
              <p className="leading-[32px]">​</p>
            </div>
            <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[4.27%] right-[80.27%] text-[#263154] text-[16px] top-[calc(50%-127px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Block 1
            </p>
          </>
        )}
      </div>
      <div className={`[word-break:break-word] absolute contents left-[4.27%] ${isFooter2 ? "right-[66.67%] top-[374px]" : "right-[52%] top-[196px]"}`}>
        <div className={`absolute font-["Open_Sans:Regular",sans-serif] font-normal leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap ${isFooter2 ? "inset-[62.23%_66.67%_17.65%_4.27%]" : "inset-[36.13%_52%_42.9%_4.27%]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
          <p className="leading-[32px] mb-0">Privacy Policy</p>
          <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
          <p className="leading-[32px] mb-0">Legal</p>
          <p className="leading-[32px] mb-0">{`Contact Us `}</p>
          <p className="leading-[32px]">​</p>
        </div>
        <p className={`absolute font-["Open_Sans:Bold",sans-serif] font-bold leading-[normal] left-[4.27%] right-[80.27%] text-[#263154] text-[16px] whitespace-nowrap ${isFooter2 ? "top-[calc(50%+51px)]" : "top-[calc(50%-114px)]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
          Block 1
        </p>
      </div>
      <div className={`[word-break:break-word] absolute contents ${isFooter2 ? "left-[52.27%] right-[18.67%] top-[196px]" : "left-[4.27%] right-[66.67%] top-[374px]"}`}>
        <div className={`absolute font-["Open_Sans:Regular",sans-serif] font-normal leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap ${isFooter2 ? "inset-[34.67%_18.67%_45.2%_52.27%]" : "inset-[64.84%_66.67%_14.19%_4.27%]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
          <p className="leading-[32px] mb-0">Privacy Policy</p>
          <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
          <p className="leading-[32px] mb-0">Legal</p>
          <p className="leading-[32px] mb-0">{`Contact Us `}</p>
          <p className="leading-[32px]">​</p>
        </div>
        <p className={`absolute font-["Open_Sans:Bold",sans-serif] font-bold leading-[normal] text-[#263154] text-[16px] whitespace-nowrap ${isFooter2 ? "left-[52.27%] right-[32.27%] top-[calc(50%-127px)]" : "left-[4.27%] right-[80.27%] top-[calc(50%+64px)]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
          {isFooter2 ? "Block 2" : "Block 1"}
        </p>
      </div>
      <div className={`absolute ${isFooter2 ? "h-0 left-0 top-[573px] w-[375px]" : "[word-break:break-word] contents left-[52.27%] right-[18.67%] top-[196px]"}`}>
        <div className={`absolute ${isFooter2 ? "inset-[-1px_0_0_0]" : 'font-["Open_Sans:Regular",sans-serif] font-normal inset-[36.13%_18.67%_42.9%_52.27%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap'}`} style={isFooter1 ? { fontVariationSettings: '"wdth" 100' } : undefined}>
          {isFooter1 && (
            <>
              <p className="leading-[32px] mb-0">Privacy Policy</p>
              <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
              <p className="leading-[32px] mb-0">Legal</p>
              <p className="leading-[32px] mb-0">{`Contact Us `}</p>
              <p className="leading-[32px]">​</p>
            </>
          )}
          {isFooter2 && (
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 375 1">
              <line id="Line 35" stroke="var(--stroke-0, #999999)" x2="375" y1="0.5" y2="0.5" />
            </svg>
          )}
        </div>
        {isFooter1 && (
          <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[52.27%] right-[32.27%] text-[#263154] text-[16px] top-[calc(50%-114px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            Block 2
          </p>
        )}
      </div>
      {isFooter1 && (
        <>
          <div className="absolute h-0 left-0 top-[548px] w-[375px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 375 1">
                <line id="Line 35" stroke="var(--stroke-0, #999999)" x2="375" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
          <div className="-translate-y-1/2 absolute contents left-[52.27%] right-[14.4%] top-[calc(50%+75px)]">
            <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[52.27%] right-[14.4%] text-[#263154] text-[16px] top-[calc(50%+64px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Stay Connected
            </p>
          </div>
          <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[14px] left-[16px] text-[#565962] text-[12px] top-[calc(50%+271px)] w-[343px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>{`Copyright © 2022 A1M Health  • CA Insurance License Number 0451271`}</p>
          <div className="-translate-y-1/2 absolute contents left-[4.27%] right-[4.27%] top-[calc(50%+257px)]">
            <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[20px] left-[4.27%] right-[4.27%] text-[#263154] text-[16px] top-[calc(50%+247px)]" style={{ fontVariationSettings: '"wdth" 100' }}>{`A1M Health `}</p>
          </div>
        </>
      )}
      {isFooter2 && (
        <>
          <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[14px] left-[16px] text-[#565962] text-[12px] top-[calc(50%+283px)] w-[343px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>{`Copyright © 2022 A1M Health  • CA Insurance License Number 0451271`}</p>
          <div className="-translate-y-1/2 absolute contents left-[4.27%] right-[4.27%] top-[calc(50%+269px)]">
            <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[20px] left-[4.27%] right-[4.27%] text-[#263154] text-[16px] top-[calc(50%+259px)]" style={{ fontVariationSettings: '"wdth" 100' }}>{`A1M Health `}</p>
          </div>
          <div className="absolute contents left-[calc(50%+5.5px)] top-[374px]">
            <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[52.27%] right-[14.4%] text-[#263154] text-[16px] top-[calc(50%+51px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Stay Connected
            </p>
            <div className="absolute content-stretch flex gap-[16px] items-center left-[calc(50%+5.5px)] top-[407px]">
              <div className="h-[15.2px] relative shrink-0 w-[20px]" data-name="📷 facebook">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 15.2">
                  <g id="ð· facebook">
                    <path clipRule="evenodd" d={svgPaths.p3d60a00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="facebook" />
                  </g>
                </svg>
              </div>
              <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 w-[20px]" data-name="prime:twitter">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
                  <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Clip path group">
                    <div className="col-1 h-[12.688px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.656px] mask-size-[14px_14px] ml-0 mt-[0.66px] relative row-1 w-[14px]" style={{ maskImage: `url("${imgGroup}")` }} data-name="Group">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12.688">
                        <g id="Group">
                          <path d={svgPaths.p1d6b7300} fill="var(--fill-0, #263154)" id="Vector" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[14px] relative shrink-0 w-[20px]" data-name="XMLID_823_">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 14">
                  <path clipRule="evenodd" d={svgPaths.p326bd400} fill="var(--fill-0, #263154)" fillRule="evenodd" id="XMLID_823_" />
                </svg>
              </div>
              <div className="h-[16px] relative shrink-0 w-[20px]" data-name="linkedin">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
                  <g id="linkedin">
                    <path clipRule="evenodd" d={svgPaths.p8b5ce00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="Shape" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold inset-[68.27%_2.13%_28.64%_52.27%] leading-[normal] text-[#263154] text-[16px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            Get the Mobile App
          </p>
          <div className="absolute inset-[80.03%_9.87%_13.78%_52.27%]" data-name="Google Play Badge US">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 142 40">
              <g id="Google Play Badge US">
                <rect fill="var(--fill-0, #263154)" height="40" id="Background Black" rx="5" width="142" />
                <path d={svgPaths.p3a6e5200} fill="var(--fill-0, #999999)" id="Border Gray" />
                <path d={svgPaths.p3eab8100} fill="var(--fill-0, white)" id="Google Play" />
                <g id="GET IT ON">
                  <path clipRule="evenodd" d={svgPaths.p141af000} fill="var(--fill-0, white)" fillRule="evenodd" />
                  <path d={svgPaths.p2c89000} fill="var(--stroke-0, white)" />
                </g>
                <g id="Icon">
                  <path d={svgPaths.p26224000} fill="url(#paint0_linear_10_5540)" id="Shape" />
                  <path d={svgPaths.p25896680} fill="url(#paint1_linear_10_5540)" id="Shape_2" />
                  <path d={svgPaths.p2dcab5c0} fill="url(#paint2_linear_10_5540)" id="Shape_3" />
                  <path d={svgPaths.p2d925300} fill="url(#paint3_linear_10_5540)" id="Shape_4" />
                  <path d={svgPaths.p30ea3500} fill="var(--fill-0, #263154)" id="Shape_5" opacity="0.2" />
                  <path d={svgPaths.p2cd4fc80} fill="var(--fill-0, #263154)" id="Shape_6" opacity="0.12" />
                  <path d={svgPaths.p20c91300} fill="var(--fill-0, white)" id="Shape_7" opacity="0.25" />
                </g>
              </g>
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10_5540" x1="18.3911" x2="-2.33143" y1="-7.55919" y2="-1.76224">
                  <stop stopColor="#00A0FF" />
                  <stop offset="0.01" stopColor="#00A1FF" />
                  <stop offset="0.26" stopColor="#00BEFF" />
                  <stop offset="0.51" stopColor="#00D2FF" />
                  <stop offset="0.76" stopColor="#00DFFF" />
                  <stop offset="1" stopColor="#00E3FF" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10_5540" x1="35.5939" x2="10.1494" y1="9.79941" y2="9.79941">
                  <stop stopColor="#FFE000" />
                  <stop offset="0.41" stopColor="#FFBD00" />
                  <stop offset="0.78" stopColor="#FFA500" />
                  <stop offset="1" stopColor="#FF9C00" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_10_5540" x1="10.6159" x2="-4.92522" y1="13.527" y2="41.0241">
                  <stop stopColor="#FF3A44" />
                  <stop offset="1" stopColor="#C31162" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_10_5540" x1="0.761248" x2="7.69795" y1="4.09606" y2="16.3747">
                  <stop stopColor="#32A071" />
                  <stop offset="0.07" stopColor="#2DA771" />
                  <stop offset="0.48" stopColor="#15CF74" />
                  <stop offset="0.8" stopColor="#06E775" />
                  <stop offset="1" stopColor="#00F076" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute inset-[72.6%_17.87%_21.21%_52.27%]" data-name="App Store Badge US Black">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 112 40.0001">
              <g id="App Store Badge US Black">
                <path d={svgPaths.p2eceb200} fill="var(--fill-0, #999999)" id="Background Gray" />
                <path d={svgPaths.p32412d00} fill="var(--fill-0, #263154)" id="Background Black" />
                <path d={svgPaths.p8a57f80} fill="var(--fill-0, white)" id="App Store" />
                <path d={svgPaths.p8e47500} fill="var(--fill-0, white)" id="Download on the" />
                <path d={svgPaths.p2ef3e80} fill="var(--fill-0, white)" id="Icon" />
              </g>
            </svg>
          </div>
        </>
      )}
    </div>
  );
}
```

## src/imports/MobileFooter/svg-8vrbzbfzhc.ts
```ts
export default {
p141af000: "M72.7978 7.76997C71.5569 9.01874 71.5569 10.9712 72.7978 12.22C74.0779 13.4302 76.1458 13.4302 77.4259 12.22C78.6721 10.9732 78.6721 9.01673 77.4259 7.76997C76.8137 7.18372 75.9808 6.854 75.1118 6.854C74.2429 6.854 73.4099 7.18372 72.7978 7.76997ZM49.0954 12.24C49.6352 11.7041 49.9204 10.9812 49.8843 10.24C49.8843 10.0891 49.8702 9.93849 49.8422 9.78997H46.7813V10.51H49.0638C49.0482 10.9635 48.8615 11.3965 48.5379 11.73C47.8169 12.3925 46.7475 12.5776 45.8272 12.1992C44.9069 11.8208 44.3164 10.9532 44.3305 9.99997C44.3076 9.36919 44.556 8.75676 45.0184 8.30391C45.4809 7.85106 46.1174 7.59687 46.7813 7.59997C47.4417 7.56566 48.0807 7.82865 48.5063 8.30997L49.0638 7.77997C48.7945 7.48553 48.4557 7.25592 48.0751 7.10997C47.6663 6.94364 47.226 6.85856 46.7813 6.85997C45.9089 6.84149 45.0673 7.1673 44.4567 7.75997C43.5169 8.65929 43.2357 10.0066 43.7432 11.1789C44.2507 12.3512 45.4479 13.12 46.7813 13.13C47.6506 13.1594 48.4921 12.8358 49.0954 12.24ZM51.8566 7.73951H54.6966V6.99951H51.0152V12.9995H54.6966V12.2595H51.8566V10.3595H54.4442V9.63951H51.8566V7.73951ZM58.1241 12.9995H57.3142V7.73951H55.5471V6.99951H59.9333V7.73951H58.1241V12.9995ZM63.0393 6.99951V12.9995H63.8492V6.99951H63.0393ZM67.4634 12.9995H66.6534V7.73951H64.8863V6.99951H69.22V7.73951H67.4634V12.9995ZM73.3876 11.7196C74.3357 12.6172 75.8686 12.6172 76.8166 11.7196C77.7477 10.7438 77.7477 9.25545 76.8166 8.27962C75.8686 7.38205 74.3357 7.38205 73.3876 8.27962C72.4565 9.25545 72.4565 10.7438 73.3876 11.7196ZM79.5167 6.99951V12.9995H80.3371V8.10951L83.5453 12.9995H84.3867V6.99951H83.5768V11.6695L80.5054 6.99951H79.5167Z",
p1d6b7300: "M11.025 0H13.172L8.482 5.374L14 12.688H9.68L6.294 8.253L2.424 12.688H0.275L5.291 6.938L0 0.000999987H4.43L7.486 4.054L11.025 0ZM10.27 11.4H11.46L3.78 1.221H2.504L10.27 11.4Z",
p20c91300: "M13.1636 7.61967L33.6642 18.6997C34.2077 18.9547 34.5961 19.4348 34.716 19.9997C34.6618 19.3753 34.2606 18.8261 33.6642 18.5597L13.1636 7.47967C11.691 6.68967 10.4919 7.34967 10.4919 8.94967V9.09967C10.5234 7.48967 11.7015 6.82967 13.1636 7.61967V7.61967Z",
p25896680: "M28.4097 24.2797L24.0971 20.1497V19.8597L28.4097 15.7197L28.5044 15.7697L33.669 18.5597C35.1416 19.3497 35.1416 20.6497 33.669 21.4497L28.5254 24.2297L28.4097 24.2797Z",
p26224000: "M10.9931 7.53978C10.6503 7.93089 10.4773 8.43158 10.5093 8.93978V31.0598C10.4773 31.568 10.6503 32.0687 10.9931 32.4598L11.0668 32.5298L24.0992 20.1498V19.8598L11.0668 7.46978L10.9931 7.53978Z",
p2c89000: "M72.7978 12.22L72.7268 12.2905L72.7291 12.2926L72.7978 12.22ZM72.7978 7.76997L72.7286 7.69773L72.7268 7.69948L72.7978 7.76997ZM77.4259 12.22L77.4946 12.2927L77.4966 12.2907L77.4259 12.22ZM77.4259 7.76997L77.4967 7.69926L77.4951 7.69775L77.4259 7.76997ZM49.8843 10.24L49.7841 10.2399L49.7844 10.2448L49.8843 10.24ZM49.0954 12.24L49.1656 12.3111L49.1658 12.3109L49.0954 12.24ZM49.8422 9.78997L49.9404 9.77141L49.9251 9.68997H49.8422V9.78997ZM46.7813 9.78997V9.68997H46.6813V9.78997H46.7813ZM46.7813 10.51H46.6813V10.61H46.7813V10.51ZM49.0638 10.51L49.1638 10.5134L49.1673 10.41H49.0638V10.51ZM48.5379 11.73L48.6057 11.8037L48.6096 11.7996L48.5379 11.73ZM45.8272 12.1992L45.7892 12.2917V12.2917L45.8272 12.1992ZM44.3305 9.99997L44.4306 10.0015L44.4304 9.99634L44.3305 9.99997ZM45.0184 8.30391L45.0884 8.37536V8.37536L45.0184 8.30391ZM46.7813 7.59997L46.7808 7.70013L46.7865 7.69984L46.7813 7.59997ZM48.5063 8.30997L48.4314 8.37622L48.5001 8.45388L48.5752 8.38245L48.5063 8.30997ZM49.0638 7.77997L49.1327 7.85245L49.2038 7.78486L49.1376 7.71248L49.0638 7.77997ZM48.0751 7.10997L48.0374 7.20262L48.0393 7.20334L48.0751 7.10997ZM46.7813 6.85997L46.7792 6.95998L46.7816 6.95997L46.7813 6.85997ZM44.4567 7.75997L44.5258 7.83222L44.5263 7.83173L44.4567 7.75997ZM43.7432 11.1789L43.6514 11.2186V11.2186L43.7432 11.1789ZM46.7813 13.13L46.7847 13.03L46.782 13.03L46.7813 13.13ZM54.6966 7.73951V7.83951H54.7966V7.73951H54.6966ZM51.8566 7.73951V7.63951H51.7566V7.73951H51.8566ZM54.6966 6.99951H54.7966V6.89951H54.6966V6.99951ZM51.0152 6.99951V6.89951H50.9152V6.99951H51.0152ZM51.0152 12.9995H50.9152V13.0995H51.0152V12.9995ZM54.6966 12.9995V13.0995H54.7966V12.9995H54.6966ZM54.6966 12.2595H54.7966V12.1595H54.6966V12.2595ZM51.8566 12.2595H51.7566V12.3595H51.8566V12.2595ZM51.8566 10.3595V10.2595H51.7566V10.3595H51.8566ZM54.4442 10.3595V10.4595H54.5442V10.3595H54.4442ZM54.4442 9.63951H54.5442V9.53951H54.4442V9.63951ZM51.8566 9.63951H51.7566V9.73951H51.8566V9.63951ZM57.3142 12.9995H57.2142V13.0995H57.3142V12.9995ZM58.1241 12.9995V13.0995H58.2241V12.9995H58.1241ZM57.3142 7.73951H57.4142V7.63951H57.3142V7.73951ZM55.5471 7.73951H55.4471V7.83951H55.5471V7.73951ZM55.5471 6.99951V6.89951H55.4471V6.99951H55.5471ZM59.9333 6.99951H60.0333V6.89951H59.9333V6.99951ZM59.9333 7.73951V7.83951H60.0333V7.73951H59.9333ZM58.1241 7.73951V7.63951H58.0241V7.73951H58.1241ZM63.0393 12.9995H62.9393V13.0995H63.0393V12.9995ZM63.0393 6.99951V6.89951H62.9393V6.99951H63.0393ZM63.8492 12.9995V13.0995H63.9492V12.9995H63.8492ZM63.8492 6.99951H63.9492V6.89951H63.8492V6.99951ZM66.6534 12.9995H66.5534V13.0995H66.6534V12.9995ZM67.4634 12.9995V13.0995H67.5634V12.9995H67.4634ZM66.6534 7.73951H66.7534V7.63951H66.6534V7.73951ZM64.8863 7.73951H64.7863V7.83951H64.8863V7.73951ZM64.8863 6.99951V6.89951H64.7863V6.99951H64.8863ZM69.22 6.99951H69.32V6.89951H69.22V6.99951ZM69.22 7.73951V7.83951H69.32V7.73951H69.22ZM67.4634 7.73951V7.63951H67.3634V7.73951H67.4634ZM76.8166 11.7196L76.8855 11.7923L76.889 11.7887L76.8166 11.7196ZM73.3876 11.7196L73.3152 11.7887L73.3189 11.7922L73.3876 11.7196ZM76.8166 8.27962L76.8891 8.2105L76.8854 8.207L76.8166 8.27962ZM73.3876 8.27962L73.3188 8.20691L73.3153 8.21059L73.3876 8.27962ZM79.5167 12.9995H79.4167V13.0995H79.5167V12.9995ZM79.5167 6.99951V6.89951H79.4167V6.99951H79.5167ZM80.3371 12.9995V13.0995H80.4371V12.9995H80.3371ZM80.3371 8.10951L80.4207 8.05466L80.2371 7.77479V8.10951H80.3371ZM83.5453 12.9995L83.4616 13.0544L83.4913 13.0995H83.5453V12.9995ZM84.3867 12.9995V13.0995H84.4867V12.9995H84.3867ZM84.3867 6.99951H84.4867V6.89951H84.3867V6.99951ZM83.5768 6.99951V6.89951H83.4768V6.99951H83.5768ZM83.5768 11.6695L83.4933 11.7245L83.6768 12.0035V11.6695H83.5768ZM80.5054 6.99951L80.589 6.94456L80.5593 6.89951H80.5054V6.99951ZM72.7978 12.22L72.8687 12.1495C71.6666 10.9397 71.6666 9.05022 72.8687 7.84046L72.7978 7.76997L72.7268 7.69948C71.4472 8.98725 71.4472 11.0027 72.7268 12.2905L72.7978 12.22ZM77.4259 12.22L77.3572 12.1473C76.1157 13.3211 74.108 13.3211 72.8665 12.1473L72.7978 12.22L72.7291 12.2926C74.0477 13.5393 76.176 13.5393 77.4946 12.2926L77.4259 12.22ZM77.4259 7.76997L77.3552 7.84067C78.5624 9.04838 78.5624 10.9416 77.3552 12.1493L77.4259 12.22L77.4966 12.2907C78.7819 11.0049 78.7819 8.98509 77.4966 7.69928L77.4259 7.76997ZM75.1118 6.854V6.954C75.9557 6.954 76.7637 7.27426 77.3568 7.84219L77.4259 7.76997L77.4951 7.69775C76.8638 7.09318 76.0058 6.754 75.1118 6.754V6.854ZM72.7978 7.76997L72.8669 7.84219C73.46 7.27426 74.268 6.954 75.1118 6.954V6.854V6.754C74.2179 6.754 73.3599 7.09318 72.7286 7.69775L72.7978 7.76997ZM49.8843 10.24L49.7844 10.2448C49.8191 10.957 49.5453 11.6525 49.0249 12.169L49.0954 12.24L49.1658 12.3109C49.7252 11.7557 50.0217 11.0054 49.9841 10.2351L49.8843 10.24ZM49.8422 9.78997L49.7439 9.80853C49.7708 9.95092 49.7843 10.0953 49.7843 10.2399L49.8843 10.24L49.9843 10.24C49.9843 10.0829 49.9697 9.92605 49.9404 9.77141L49.8422 9.78997ZM46.7813 9.78997V9.88997H49.8422V9.78997V9.68997H46.7813V9.78997ZM46.7813 10.51H46.8813V9.78997H46.7813H46.6813V10.51H46.7813ZM49.0638 10.51V10.41H46.7813V10.51V10.61H49.0638V10.51ZM48.5379 11.73L48.6096 11.7996C48.9501 11.4488 49.1473 10.9924 49.1638 10.5134L49.0638 10.51L48.9639 10.5065C48.9492 10.9346 48.773 11.3442 48.4661 11.6603L48.5379 11.73ZM45.8272 12.1992L45.7892 12.2917C46.7446 12.6846 47.8554 12.493 48.6056 11.8036L48.5379 11.73L48.4702 11.6563C47.7785 12.2921 46.7504 12.4707 45.8652 12.1067L45.8272 12.1992ZM44.3305 9.99997L44.2305 9.99849C44.2158 10.9951 44.833 11.8986 45.7892 12.2917L45.8272 12.1992L45.8652 12.1067C44.9807 11.743 44.417 10.9112 44.4305 10.0014L44.3305 9.99997ZM45.0184 8.30391L44.9485 8.23246C44.4665 8.70444 44.2066 9.34389 44.2305 10.0036L44.3305 9.99997L44.4304 9.99634C44.4086 9.39449 44.6455 8.80909 45.0884 8.37536L45.0184 8.30391ZM46.7813 7.59997L46.7818 7.49997C46.0923 7.49676 45.4302 7.76067 44.9485 8.23246L45.0184 8.30391L45.0884 8.37536C45.5315 7.94144 46.1425 7.69699 46.7808 7.69997L46.7813 7.59997ZM48.5063 8.30997L48.5812 8.24373C48.1347 7.73881 47.4659 7.46427 46.7761 7.50011L46.7813 7.59997L46.7865 7.69984C47.4175 7.66705 48.0266 7.91848 48.4314 8.37622L48.5063 8.30997ZM49.0638 7.77997L48.9949 7.7075L48.4374 8.2375L48.5063 8.30997L48.5752 8.38245L49.1327 7.85245L49.0638 7.77997ZM48.0751 7.10997L48.0393 7.20334C48.4057 7.34386 48.7314 7.56473 48.99 7.84746L49.0638 7.77997L49.1376 7.71248C48.8576 7.40632 48.5057 7.16799 48.1109 7.0166L48.0751 7.10997ZM46.7813 6.85997L46.7816 6.95997C47.2134 6.9586 47.6407 7.04121 48.0374 7.2026L48.0751 7.10997L48.1128 7.01734C47.6918 6.84607 47.2386 6.75852 46.781 6.75997L46.7813 6.85997ZM44.4567 7.75997L44.5263 7.83173C45.1173 7.2582 45.9327 6.94201 46.7792 6.95995L46.7813 6.85997L46.7834 6.75999C45.885 6.74096 45.0174 7.07639 44.3871 7.68821L44.4567 7.75997ZM43.7432 11.1789L43.835 11.1392C43.3445 10.0062 43.6155 8.70333 44.5258 7.83222L44.4567 7.75997L44.3876 7.68772C43.4183 8.61525 43.127 10.007 43.6514 11.2186L43.7432 11.1789ZM46.7813 13.13L46.782 13.03C45.486 13.0203 44.3259 12.2731 43.835 11.1392L43.7432 11.1789L43.6514 11.2186C44.1755 12.4293 45.4098 13.2198 46.7805 13.23L46.7813 13.13ZM49.0954 12.24L49.0251 12.1688C48.4419 12.7448 47.6274 13.0586 46.7847 13.03L46.7813 13.13L46.7779 13.2299C47.6739 13.2602 48.5422 12.9268 49.1656 12.3111L49.0954 12.24ZM54.6966 7.73951V7.63951H51.8566V7.73951V7.83951H54.6966V7.73951ZM54.6966 6.99951H54.5966V7.73951H54.6966H54.7966V6.99951H54.6966ZM51.0152 6.99951V7.09951H54.6966V6.99951V6.89951H51.0152V6.99951ZM51.0152 12.9995H51.1152V6.99951H51.0152H50.9152V12.9995H51.0152ZM54.6966 12.9995V12.8995H51.0152V12.9995V13.0995H54.6966V12.9995ZM54.6966 12.2595H54.5966V12.9995H54.6966H54.7966V12.2595H54.6966ZM51.8566 12.2595V12.3595H54.6966V12.2595V12.1595H51.8566V12.2595ZM51.8566 10.3595H51.7566V12.2595H51.8566H51.9566V10.3595H51.8566ZM54.4442 10.3595V10.2595H51.8566V10.3595V10.4595H54.4442V10.3595ZM54.4442 9.63951H54.3442V10.3595H54.4442H54.5442V9.63951H54.4442ZM51.8566 9.63951V9.73951H54.4442V9.63951V9.53951H51.8566V9.63951ZM51.8566 7.73951H51.7566V9.63951H51.8566H51.9566V7.73951H51.8566ZM57.3142 12.9995V13.0995H58.1241V12.9995V12.8995H57.3142V12.9995ZM57.3142 7.73951H57.2142V12.9995H57.3142H57.4142V7.73951H57.3142ZM55.5471 7.73951V7.83951H57.3142V7.73951V7.63951H55.5471V7.73951ZM55.5471 6.99951H55.4471V7.73951H55.5471H55.6471V6.99951H55.5471ZM59.9333 6.99951V6.89951H55.5471V6.99951V7.09951H59.9333V6.99951ZM59.9333 7.73951H60.0333V6.99951H59.9333H59.8333V7.73951H59.9333ZM58.1241 7.73951V7.83951H59.9333V7.73951V7.63951H58.1241V7.73951ZM58.1241 12.9995H58.2241V7.73951H58.1241H58.0241V12.9995H58.1241ZM63.0393 12.9995H63.1393V6.99951H63.0393H62.9393V12.9995H63.0393ZM63.8492 12.9995V12.8995H63.0393V12.9995V13.0995H63.8492V12.9995ZM63.8492 6.99951H63.7492V12.9995H63.8492H63.9492V6.99951H63.8492ZM63.0393 6.99951V7.09951H63.8492V6.99951V6.89951H63.0393V6.99951ZM66.6534 12.9995V13.0995H67.4634V12.9995V12.8995H66.6534V12.9995ZM66.6534 7.73951H66.5534V12.9995H66.6534H66.7534V7.73951H66.6534ZM64.8863 7.73951V7.83951H66.6534V7.73951V7.63951H64.8863V7.73951ZM64.8863 6.99951H64.7863V7.73951H64.8863H64.9863V6.99951H64.8863ZM69.22 6.99951V6.89951H64.8863V6.99951V7.09951H69.22V6.99951ZM69.22 7.73951H69.32V6.99951H69.22H69.12V7.73951H69.22ZM67.4634 7.73951V7.83951H69.22V7.73951V7.63951H67.4634V7.73951ZM67.4634 12.9995H67.5634V7.73951H67.4634H67.3634V12.9995H67.4634ZM76.8166 11.7196L76.7479 11.647C75.8384 12.5081 74.3659 12.5081 73.4564 11.647L73.3876 11.7196L73.3189 11.7922C74.3055 12.7263 75.8988 12.7263 76.8854 11.7922L76.8166 11.7196ZM76.8166 8.27962L76.7443 8.34865C77.6385 9.28584 77.6385 10.7134 76.7443 11.6506L76.8166 11.7196L76.889 11.7887C77.857 10.7742 77.857 9.22505 76.889 8.21059L76.8166 8.27962ZM73.3876 8.27962L73.4564 8.35224C74.3659 7.49118 75.8384 7.49118 76.7479 8.35224L76.8166 8.27962L76.8854 8.207C75.8988 7.27293 74.3055 7.27293 73.3189 8.207L73.3876 8.27962ZM73.3876 11.7196L73.46 11.6506C72.5657 10.7134 72.5657 9.28584 73.46 8.34865L73.3876 8.27962L73.3153 8.21059C72.3473 9.22505 72.3473 10.7742 73.3153 11.7887L73.3876 11.7196ZM79.5167 12.9995H79.6167V6.99951H79.5167H79.4167V12.9995H79.5167ZM80.3371 12.9995V12.8995H79.5167V12.9995V13.0995H80.3371V12.9995ZM80.3371 8.10951H80.2371V12.9995H80.3371H80.4371V8.10951H80.3371ZM83.5453 12.9995L83.6289 12.9447L80.4207 8.05466L80.3371 8.10951L80.2535 8.16437L83.4616 13.0544L83.5453 12.9995ZM84.3867 12.9995V12.8995H83.5453V12.9995V13.0995H84.3867V12.9995ZM84.3867 6.99951H84.2867V12.9995H84.3867H84.4867V6.99951H84.3867ZM83.5768 6.99951V7.09951H84.3867V6.99951V6.89951H83.5768V6.99951ZM83.5768 11.6695H83.6768V6.99951H83.5768H83.4768V11.6695H83.5768ZM80.5054 6.99951L80.4219 7.05446L83.4933 11.7245L83.5768 11.6695L83.6604 11.6146L80.589 6.94456L80.5054 6.99951ZM79.5167 6.99951V7.09951H80.5054V6.99951V6.89951H79.5167V6.99951Z",
p2cd4fc80: "M10.5079 31.1247C10.5276 31.561 10.6967 31.9817 10.9933 32.32L11.0665 32.3991L10.9933 32.4695C10.6629 32.0925 10.4913 31.6139 10.5079 31.1247ZM10.5089 31.07C10.5078 31.0883 10.5085 31.1065 10.5079 31.1247C10.5049 31.0567 10.5046 30.9882 10.5089 30.9197V31.07ZM34.6886 19.9997C34.6344 20.6241 34.2332 21.1738 33.6368 21.4402L28.4718 24.2195L28.3771 24.1296L33.6368 21.2995C34.1802 21.0445 34.5687 20.5645 34.6886 19.9997Z",
p2d925300: "M28.5406 15.7801L13.1731 7.48005C12.5235 6.99733 11.6045 7.02253 10.9852 7.54005L24.1018 20.0001L28.5406 15.7801Z",
p2dcab5c0: "M28.5459 24.2195L24.107 19.9995L11.001 32.4595C11.6202 32.977 12.5392 33.0022 13.1888 32.5195L28.5564 24.2195",
p2eceb200: "M103.081 0.00013H8.92402C8.5808 0.00013 8.24171 0.00013 7.8994 0.00213C7.61286 0.00413 7.3286 0.00994 7.03931 0.01483C6.41083 0.0227318 5.78382 0.0818063 5.16375 0.19154C4.54454 0.303663 3.94474 0.515046 3.38461 0.81854C2.82517 1.1246 2.314 1.5223 1.86963 1.9972C1.42293 2.47077 1.05057 3.01815 0.766873 3.61829C0.482391 4.21724 0.285129 4.85907 0.181903 5.52161C0.0776944 6.18331 0.021619 6.85265 0.0141797 7.52361C0.00549405 7.83021 0.00457681 8.13783 0 8.44447V31.5587C0.00457681 31.8692 0.00549405 32.17 0.0141797 32.4806C0.0216213 33.1516 0.0776967 33.8209 0.181903 34.4825C0.284844 35.1455 0.482117 35.7877 0.766873 36.3868C1.05044 36.985 1.42286 37.5302 1.86963 38.0011C2.31231 38.4781 2.82382 38.8761 3.38461 39.1798C3.94473 39.4841 4.54448 39.6968 5.16375 39.8106C5.78393 39.9195 6.41087 39.9786 7.03931 39.9874C7.3286 39.9942 7.61286 39.9981 7.8994 39.9981C8.2417 40.0001 8.58082 40.0001 8.92402 40.0001H103.081C103.417 40.0001 103.759 40.0001 104.096 39.9981C104.381 39.9981 104.673 39.9942 104.958 39.9874C105.586 39.9791 106.211 39.92 106.83 39.8106C107.452 39.696 108.054 39.4834 108.616 39.1798C109.177 38.8759 109.688 38.478 110.13 38.0011C110.576 37.5284 110.949 36.9836 111.236 36.3868C111.519 35.7872 111.714 35.1451 111.815 34.4825C111.92 33.8208 111.978 33.1516 111.989 32.4806C111.993 32.17 111.993 31.8692 111.993 31.5587C112 31.1954 112 30.8341 112 30.4649V9.53626C112 9.17005 112 8.80677 111.993 8.44447C111.993 8.13783 111.993 7.83021 111.989 7.52357C111.978 6.85255 111.92 6.18337 111.815 5.52157C111.714 4.85941 111.518 4.21763 111.236 3.61825C110.658 2.41533 109.742 1.43616 108.616 0.81845C108.054 0.515697 107.452 0.30437 106.83 0.19145C106.212 0.0812328 105.586 0.0221378 104.958 0.01469C104.673 0.00981 104.381 0.00395 104.096 0.002C103.759 0 103.417 0 103.081 0V0.00013Z",
p2ef3e80: "M21.65 13.9907C23.1439 14.0407 24.5291 14.8408 25.3864 16.1489C24.0337 17.0374 23.2009 18.6039 23.1803 20.3003C23.1822 22.2196 24.2582 23.952 25.9127 24.6997C25.5945 25.8041 25.1151 26.8481 24.4918 27.7925C23.6547 29.1304 22.7765 30.4373 21.3834 30.4614C20.0299 30.4948 19.5746 29.6099 18.0221 29.6099C16.4554 29.61 15.9705 30.4371 14.6725 30.4946C13.3459 30.5471 12.332 29.067 11.4645 27.7417C9.73053 25.0351 8.37994 20.1136 10.1901 16.7651C11.0401 15.1333 12.6296 14.0979 14.3766 14.0376C15.7045 14.0084 16.9381 14.9956 17.7545 14.9956C18.5555 14.9952 20.0787 13.8147 21.65 13.9907ZM21.6618 8.72021C21.7524 9.98442 21.3773 11.2363 20.6178 12.2104C19.8809 13.1897 18.7645 13.7546 17.5885 13.7417C17.5137 12.5139 17.8987 11.3037 18.6588 10.3794C19.4286 9.4426 20.5014 8.85043 21.6618 8.72021Z",
p30ea3500: "M28.4196 24.1299L13.1783 32.3799C12.5546 32.8232 11.6983 32.8232 11.0746 32.3799L11.001 32.4499L11.0746 32.5199C11.6971 32.9666 12.5558 32.9666 13.1783 32.5199L28.5459 24.2199L28.4196 24.1299Z",
p32412d00: "M7.90586 39.125C7.62069 39.125 7.34241 39.1211 7.05948 39.1143C6.47337 39.1061 5.88863 39.0516 5.31006 38.9512C4.77056 38.8519 4.24794 38.6673 3.75943 38.4033C3.27539 38.1415 2.83391 37.7983 2.4519 37.3867C2.06436 36.98 1.74171 36.5082 1.49675 35.9902C1.24909 35.4688 1.07769 34.9099 0.988526 34.333C0.892239 33.7131 0.840144 33.0863 0.832689 32.458C0.826756 32.2471 0.818987 31.5449 0.818987 31.5449V8.44434C0.818987 8.44434 0.827261 7.75293 0.832736 7.5498C0.839874 6.92248 0.891666 6.29665 0.987665 5.67773C1.07699 5.09925 1.24852 4.53875 1.49632 4.01563C1.74038 3.49794 2.06124 3.02586 2.44644 2.61768C2.83121 2.20562 3.27411 1.8606 3.75897 1.59521C4.24636 1.33209 4.76799 1.14873 5.3064 1.05127C5.88687 0.949836 6.47364 0.894996 7.06179 0.88721L7.90632 0.875H104.093L104.948 0.8877C105.53 0.895099 106.112 0.94945 106.687 1.05029C107.231 1.14898 107.758 1.33362 108.251 1.59814C109.222 2.13299 110.012 2.97916 110.511 4.01807C110.755 4.53758 110.924 5.09351 111.012 5.66699C111.109 6.29099 111.164 6.92174 111.175 7.5542C111.177 7.8374 111.177 8.1416 111.177 8.44434C111.185 8.81934 111.185 9.17627 111.185 9.53613V30.4648C111.185 30.8281 111.185 31.1826 111.177 31.54C111.177 31.8652 111.177 32.1631 111.174 32.4697C111.163 33.0909 111.109 33.7104 111.014 34.3232C110.926 34.9043 110.756 35.4675 110.508 35.9932C110.262 36.5056 109.941 36.9733 109.558 37.3789C109.175 37.7927 108.733 38.1379 108.248 38.4014C107.756 38.6674 107.23 38.8527 106.687 38.9512C106.108 39.0522 105.524 39.1067 104.937 39.1143C104.663 39.1211 104.376 39.125 104.097 39.125L103.083 39.127L7.90586 39.125Z",
p326bd400: "M14.6201 0C17.1656 0 18.4985 0.348194 19.2205 1.2018C19.9457 2.05919 20 3.37246 20 5.27803V8.72204C20 10.9057 19.6537 12.1669 18.8422 12.9394C18.0508 13.6927 16.8276 14 14.6201 14H5.37974C0.832 14 0 12.2226 0 8.72204V5.27803C0 3.47109 0 2.16553 0.701226 1.27945C1.42045 0.370654 2.77594 0 5.37974 0H14.6201ZM8.64406 9.65676L12.8401 7.47551C13.0532 7.36475 13.1867 7.14522 13.1865 6.90586C13.1861 6.66669 13.0521 6.44748 12.8386 6.33724L8.64258 4.17004C8.44265 4.06673 8.20297 4.07469 8.01026 4.19109C7.81761 4.3075 7.70006 4.51541 7.70006 4.7395V9.08801C7.70006 9.31248 7.81794 9.52059 8.01097 9.63693C8.11348 9.69866 8.22923 9.72972 8.34523 9.72972C8.44768 9.72972 8.55026 9.70553 8.64406 9.65676Z",
p3a6e5200: "M136.741 0C139.646 0.000240451 142 2.23872 142 5V35C142 37.7613 139.646 39.9998 136.741 40H5.25879C2.3544 39.9998 0 37.7613 0 35V5C0 2.23873 2.3544 0.000241614 5.25879 0H136.741ZM5.25586 0.799805C2.81599 0.799805 0.837891 2.6804 0.837891 5V35C0.838001 37.3195 2.81606 39.2002 5.25586 39.2002H136.737C139.177 39.2001 141.155 37.3195 141.155 35V5C141.155 2.68044 139.177 0.799856 136.737 0.799805H5.25586Z",
p3d60a00: "M11.148 4.92433V3.34543C11.148 2.7533 11.5471 2.61405 11.8306 2.61405H13.5604V0.00985853L11.1769 0C8.53143 0 7.93012 1.94429 7.93012 3.18584V4.92156H6.4V7.60493H7.93012V15.2H11.148V7.60493H13.319L13.6 4.92433H11.148Z",
p3eab8100: "M81.2828 21.6996C82.1821 21.6985 83.0396 22.0623 83.6392 22.6996H83.7124V21.9994H85.522V29.5697C85.522 32.7097 83.6176 33.9994 81.314 33.9994C79.5778 34.0091 78.0093 33.0163 77.3492 31.4896L79.063 30.8099C79.4214 31.7008 80.311 32.2972 81.314 32.3197C82.7866 32.3197 83.7017 31.4497 83.7017 29.8197V29.2094H83.6392C83.0481 29.8576 82.1851 30.2238 81.2828 30.2094C78.8953 30.0992 77.0191 28.227 77.0191 25.9545C77.0192 23.6821 78.8953 21.8097 81.2828 21.6996ZM127.851 27.4203H127.914L130.165 22.0004H132.353L126.967 33.7904H124.917L126.915 29.5804L123.412 22.0004H125.516L127.851 27.4203ZM61.8814 21.7494C63.0729 21.7297 64.2221 22.1697 65.0669 22.9691C65.9136 23.7703 66.3821 24.8638 66.3648 25.9994C66.3647 28.3452 64.3654 30.2475 61.898 30.2494C59.4305 30.2512 57.4284 28.352 57.4244 26.0062C57.4205 23.6611 59.415 21.7562 61.8814 21.7494ZM71.6626 21.7494C72.8571 21.7276 74.0103 22.1679 74.857 22.9691C75.7035 23.7703 76.1721 24.8639 76.1548 25.9994C76.1547 28.344 74.1571 30.2457 71.691 30.2494C69.225 30.2531 67.2214 28.3574 67.2134 26.0131C67.2057 23.6686 69.1966 21.7606 71.6626 21.7494ZM94.0533 21.7494C95.7971 21.8104 97.3207 22.8886 97.8824 24.4594L98.1031 24.9095L92.1177 27.2592C92.4928 28.0713 93.3524 28.5829 94.2847 28.5492C95.1849 28.5514 96.0199 28.1034 96.483 27.3695L98.0083 28.3695C97.1781 29.5509 95.7792 30.2571 94.2847 30.2494C93.0967 30.2659 91.9529 29.8224 91.1158 29.0209C90.2786 28.2193 89.8204 27.1287 89.8462 25.9994C89.7736 24.8961 90.1841 23.8133 90.981 23.0082C91.778 22.2031 92.8904 21.7473 94.0533 21.7494ZM50.2173 16.9994C52.0061 16.9847 53.7249 17.6595 54.982 18.8695L53.646 20.14C52.7244 19.2941 51.4875 18.8301 50.2066 18.85C47.4183 18.8501 45.1578 20.9989 45.1578 23.6498C45.1578 26.3006 47.4183 28.4495 50.2066 28.4496C51.5178 28.4992 52.7902 28.0195 53.7095 27.1293C54.3193 26.5071 54.69 25.7074 54.7613 24.8597H50.2173V23.0599L56.6021 23.0101C56.6754 23.3825 56.711 23.7612 56.7076 24.14C56.7569 25.6956 56.1679 27.2088 55.066 28.3597C53.8066 29.6133 52.0388 30.2876 50.2173 30.2094C47.6708 30.3036 45.274 29.0661 43.9712 26.9838C42.6685 24.9014 42.6686 22.3083 43.9712 20.226C45.274 18.1436 47.6708 16.9052 50.2173 16.9994ZM119.249 21.6996L119.301 21.7289C121.542 21.7289 123.287 22.999 123.288 25.1888V29.9994H121.394V28.9994H121.332C120.784 29.808 119.816 30.2684 118.807 30.1996C117.988 30.2571 117.18 29.9967 116.566 29.4789C115.952 28.961 115.584 28.2291 115.546 27.4496C115.546 25.6397 117.45 24.6391 119.333 24.639C120.047 24.6362 120.753 24.8015 121.384 25.1195V24.9887C121.334 24.5084 121.082 24.0677 120.687 23.765C120.291 23.4623 119.784 23.3233 119.28 23.3793C118.545 23.3223 117.843 23.683 117.492 24.2992L115.746 23.6088C116.409 22.366 117.785 21.6165 119.249 21.6996ZM88.8697 30.0004H86.9029V17.5004H88.8697V30.0004ZM114.457 17.5004V30.0004H112.49V17.5004H114.457ZM107.084 17.4994C108.611 17.395 110.073 18.1105 110.871 19.3539C111.668 20.5974 111.668 22.1611 110.871 23.4047C110.073 24.6481 108.611 25.3635 107.084 25.2592H104.338V29.9994H102.372V17.4994H107.084ZM62.6929 23.6029C61.6541 23.2173 60.4722 23.4755 59.7144 24.2533C58.9568 25.031 58.7767 26.1702 59.2603 27.1254C59.744 28.0806 60.7937 28.6575 61.9058 28.5795H61.8951C62.5926 28.564 63.2538 28.281 63.729 27.7953C64.2044 27.3095 64.4537 26.6621 64.4195 25.9994C64.4164 24.9393 63.7315 23.9886 62.6929 23.6029ZM72.4693 23.6039C71.4319 23.2175 70.2517 23.473 69.4927 24.2484C68.7339 25.024 68.5507 26.1617 69.0308 27.1176C69.5111 28.0734 70.557 28.6533 71.6685 28.5795C72.3662 28.5641 73.0281 28.2811 73.5035 27.7953C73.9786 27.3095 74.2271 26.6619 74.1929 25.9994C74.1901 24.9401 73.5067 23.9903 72.4693 23.6039ZM81.4488 28.5795H81.4595C81.4579 28.5793 81.4562 28.5786 81.4546 28.5785C81.4527 28.5786 81.4507 28.5794 81.4488 28.5795ZM119.527 26.1595C118.538 26.1595 117.422 26.4897 117.422 27.4896C117.422 28.2396 118.317 28.5502 118.959 28.5502L119.011 28.5795C120.196 28.5519 121.179 27.6988 121.315 26.5795C120.769 26.2899 120.152 26.145 119.527 26.1595ZM81.4595 23.4203C80.0531 23.5381 78.9742 24.6581 78.9742 26.0004C78.9744 27.341 80.0507 28.4585 81.4546 28.5785C82.1359 28.5521 82.7764 28.2635 83.2281 27.7777C83.681 27.2905 83.9051 26.6483 83.8472 26.0004C83.8991 25.3554 83.6745 24.7175 83.2251 24.2318C82.7757 23.7461 82.139 23.4535 81.4595 23.4203ZM94.1177 23.3998C93.4597 23.428 92.8412 23.7067 92.4019 24.1732C91.9627 24.6397 91.7398 25.2546 91.7828 25.8793L95.7798 24.2992C95.4654 23.71 94.8112 23.3564 94.1177 23.3998ZM104.327 23.4994H107.072L107.114 23.5297C108.36 23.5297 109.37 22.5696 109.371 21.3851C109.371 20.2005 108.36 19.2396 107.114 19.2396H104.327V23.4994Z",
p8a57f80: "M48.0533 21.3477C50.2039 21.3477 51.6216 23.1642 51.6217 25.9697C51.6217 28.7832 50.2125 30.5908 48.0856 30.5908C46.9862 30.6522 45.9508 30.037 45.4195 29.0068H45.3795V33.4912H43.6402V21.4424H45.3238V22.9482H45.3551C45.9099 21.9246 46.9468 21.3097 48.0533 21.3477ZM57.3844 21.3477C59.535 21.3477 60.9527 23.1642 60.9527 25.9697C60.9527 28.7831 59.5434 30.5907 57.4166 30.5908C56.3172 30.6523 55.2818 30.037 54.7506 29.0068H54.7096V33.4912H52.9703V21.4424H54.6539V22.9482H54.6861C55.241 21.9246 56.2778 21.3095 57.3844 21.3477ZM69.8785 17.8711C72.3344 17.8711 74.0181 19.3428 74.0748 21.4854H72.319C72.2139 20.2462 71.2551 19.4982 69.8541 19.498C68.4529 19.498 67.4938 20.2549 67.4938 21.3564C67.4938 22.2344 68.1061 22.751 69.6041 23.1465L70.8844 23.4824C73.2691 24.085 74.2604 25.1084 74.2604 26.9248C74.2603 29.248 72.5279 30.7031 69.7731 30.7031C67.1957 30.703 65.4558 29.2821 65.3434 27.0361H67.1236C67.2525 28.2675 68.3721 29.0761 69.902 29.0762C71.368 29.0762 72.4234 28.2676 72.4234 27.1572C72.4234 26.1934 71.787 25.6162 70.2809 25.2207L68.774 24.833C66.64 24.2822 65.649 23.2157 65.649 21.4854C65.649 19.3428 67.397 17.8711 69.8785 17.8711ZM84.5719 21.3311C87.0287 21.3311 88.5914 23.1211 88.5914 25.9697C88.5914 28.8261 87.0369 30.6084 84.5719 30.6084C82.1077 30.6084 80.5533 28.8262 80.5533 25.9697C80.5533 23.1211 82.1232 21.3311 84.5719 21.3311ZM98.6608 21.3311C101.005 21.3311 102.48 23.0518 102.48 25.7969V26.4336H96.4947V26.5459C96.4389 27.2199 96.6563 27.8873 97.0924 28.3779C97.5285 28.8685 98.1412 29.1352 98.774 29.1104C99.6181 29.1948 100.414 28.677 100.731 27.8369H102.382C102.148 29.4804 100.651 30.6084 98.734 30.6084C96.2689 30.6084 94.7389 28.8437 94.7389 26.0127C94.7389 23.1729 96.2771 21.3311 98.6608 21.3311ZM78.0045 21.4424H79.6158V22.9141H78.0045V27.9053C78.0045 28.6807 78.3274 29.042 79.0358 29.042C79.2269 29.0384 79.4183 29.0241 79.608 28.999V30.4619C79.2895 30.5255 78.9652 30.5543 78.6412 30.5479C76.9258 30.5478 76.2565 29.8593 76.2565 28.1035V22.9141H75.025V21.4424H76.2565V19.2998H78.0045V21.4424ZM42.5602 30.4961H40.652L39.5895 27.1396H35.1588L34.0953 30.4961H32.2184L36.4147 18.0781H38.3639L42.5602 30.4961ZM93.7672 21.3477C93.9676 21.3469 94.1674 21.3702 94.3629 21.417V23.1553C94.1099 23.0727 93.846 23.0347 93.5816 23.043C93.0705 23.0208 92.5756 23.2385 92.2272 23.6387C91.8787 24.0391 91.7113 24.5827 91.7691 25.126V30.4961H90.0299V21.4424H91.6891V22.9834H91.7291C91.9605 21.9915 92.8111 21.3086 93.7672 21.3477ZM84.569 22.8623C83.1596 22.8624 82.3229 24.0245 82.3229 25.9697C82.3229 27.9316 83.1596 29.0761 84.569 29.0762C85.9784 29.0762 86.817 27.9316 86.817 25.9697C86.817 24.0156 85.9784 22.8623 84.569 22.8623ZM47.6031 22.9316C46.2742 22.9317 45.3805 24.1621 45.3805 25.9697C45.3805 27.7939 46.2742 29.0156 47.6031 29.0156C48.9559 29.0156 49.8424 27.8193 49.8424 25.9697C49.8424 24.1367 48.9559 22.9316 47.6031 22.9316ZM56.9195 22.9316C55.5906 22.9316 54.6959 24.1621 54.6959 25.9697C54.6959 27.7939 55.5906 29.0156 56.9195 29.0156C58.2721 29.0154 59.1588 27.8192 59.1588 25.9697C59.1588 24.1369 58.2721 22.9319 56.9195 22.9316ZM35.6256 25.5908H39.1373L37.4059 20.1436H37.358L35.6256 25.5908ZM98.652 22.8369C98.0799 22.8333 97.5299 23.0744 97.1246 23.5059C96.7196 23.9373 96.4923 24.5236 96.4938 25.1348H100.73C100.762 24.5291 100.555 23.9372 100.161 23.501C99.7662 23.0648 99.2195 22.8239 98.652 22.8369Z",
p8b5ce00: "M3.85687 0H16.1431C16.8925 0 17.5 0.648 17.5 1.44733V14.5526C17.5 15.352 16.8925 16 16.1431 16H3.85687C3.1075 16 2.5 15.352 2.5 14.5526V1.44733C2.5 0.648 3.1075 0 3.85687 0ZM6.74677 14.2366C6.96486 14.2366 7.14164 14.0481 7.14164 13.8155V6.2996C7.14164 6.06697 6.96486 5.87841 6.74677 5.87841H5.0659C4.84781 5.87841 4.67103 6.06697 4.67103 6.2996V13.8155C4.67103 14.0481 4.84781 14.2366 5.0659 14.2366H6.74677ZM5.90634 5.16993C5.02444 5.16993 4.3095 4.40733 4.3095 3.46664C4.3095 2.52595 5.02444 1.76335 5.90634 1.76335C6.78823 1.76335 7.50317 2.52595 7.50317 3.46664C7.50317 4.40733 6.78827 5.16993 5.90634 5.16993ZM15.5627 14.2366C15.7632 14.2366 15.9258 14.0632 15.9258 13.8494V10.2119L15.9258 10.185C15.9259 8.59811 15.926 5.75229 13.0541 5.75229C11.7499 5.75229 11.1373 6.26157 10.7251 6.92138V6.26568C10.7251 6.05181 10.5626 5.87841 10.3621 5.87841H8.6176C8.41711 5.87841 8.25454 6.05181 8.25454 6.26568V13.8494C8.25454 14.0632 8.41711 14.2366 8.6176 14.2366H10.3621C10.5626 14.2366 10.7251 14.0632 10.7251 13.8494V9.78325C10.7704 9.2369 10.9959 8.01948 12.1075 8.01948C13.435 8.01948 13.4087 9.54571 13.3976 10.1886C13.3968 10.2397 13.396 10.2853 13.396 10.324V13.8494C13.396 14.0632 13.5585 14.2366 13.759 14.2366H15.5627Z",
p8e47500: "M96.2174 10.1079C97.3901 10.1079 98.0973 10.9644 98.0973 12.3784V12.688H95.1217V12.7378C95.0954 13.0719 95.2021 13.4024 95.4157 13.6479C95.6293 13.8935 95.9301 14.0315 96.2438 14.0278C96.6507 14.08 97.0471 13.8644 97.2467 13.4819H98.0475C97.8143 14.3312 97.0449 14.88 96.2214 14.7847C95.6594 14.8005 95.1187 14.5516 94.7438 14.104C94.3691 13.6565 94.1972 13.0553 94.2741 12.4604C94.1993 11.8638 94.371 11.2614 94.7438 10.8101C95.1166 10.359 95.6542 10.1028 96.2174 10.1079ZM39.9479 10.4282C40.5926 10.0008 41.4086 10.0009 42.0534 10.4282C42.6981 10.8557 43.0601 11.6369 42.988 12.4438C43.0616 13.2518 42.6997 14.0349 42.0544 14.4634C41.409 14.8916 40.5922 14.8917 39.9469 14.4634C39.3016 14.0349 38.9397 13.2518 39.0133 12.4438C38.9413 11.6369 39.3032 10.8557 39.9479 10.4282ZM58.2292 10.4282C58.8739 10.0008 59.6899 10.0009 60.3346 10.4282C60.9795 10.8557 61.3424 11.6377 61.2702 12.4448C61.3435 13.2527 60.9809 14.035 60.3356 14.4634C59.6902 14.8916 58.8735 14.8917 58.2282 14.4634C57.5829 14.035 57.2212 13.2527 57.2946 12.4448C57.2224 11.6377 57.5843 10.8557 58.2292 10.4282ZM75.0915 10.4282C75.7362 10.0009 76.5522 10.0009 77.1969 10.4282C77.8416 10.8557 78.2036 11.6369 78.1315 12.4438C78.2052 13.2518 77.8433 14.0349 77.1979 14.4634C76.5526 14.8917 75.7358 14.8917 75.0905 14.4634C74.4451 14.0349 74.0833 13.2518 74.1569 12.4438C74.0848 11.6369 74.4468 10.8557 75.0915 10.4282ZM64.0397 10.1079C65.0961 10.1079 65.6919 10.6697 65.6921 11.6206V14.6978H64.8913V14.0649H64.8258C64.554 14.5269 64.0704 14.797 63.5602 14.772C63.2025 14.8117 62.8454 14.6878 62.5778 14.4312C62.3101 14.1744 62.1564 13.8086 62.1549 13.4243C62.1549 12.6138 62.7197 12.146 63.7223 12.0796L64.8639 12.0093V11.6206C64.8637 11.1454 64.5697 10.8766 64.0016 10.8765C63.5373 10.8765 63.215 11.0591 63.1227 11.3774H62.318C62.4031 10.604 63.0837 10.1079 64.0397 10.1079ZM70.7126 14.6978H69.9147V13.9858H69.8493C69.5792 14.4902 69.0695 14.7933 68.526 14.772C67.454 14.772 66.7762 13.8708 66.776 12.4448C66.776 11.022 67.4612 10.1206 68.526 10.1206C69.0635 10.0942 69.5668 10.4014 69.818 10.9097H69.8805V8.43701H70.7126V14.6978ZM87.5241 10.2153H88.4372V10.9644H87.5241V13.2798C87.5242 13.751 87.7062 13.9574 88.1198 13.9575C88.2257 13.9572 88.332 13.9503 88.4372 13.937V14.6772C88.2879 14.7058 88.1367 14.7205 87.985 14.7222C87.06 14.7222 86.6921 14.3745 86.6921 13.5063V10.9634H86.0221V10.2153H86.6921V9.07373H87.5241V10.2153ZM35.4059 8.73096C36.1442 8.67446 36.8677 8.97508 37.3766 9.54932C37.8854 10.1236 38.1269 10.9113 38.0339 11.6958C38.0339 13.6019 37.0692 14.6976 35.4059 14.6978H33.3883V8.73096H35.4059ZM45.1803 13.6304H45.2419L46.1091 10.1948H46.9069L47.7731 13.6304H47.8385L48.5905 10.1948H49.4216L48.2653 14.6978H47.402L46.5309 11.3813H46.4655L45.5973 14.6978H44.7428L43.5817 10.1948H44.4255L45.1803 13.6304ZM52.5319 10.1079C52.9473 10.0746 53.3546 10.245 53.6383 10.5708C53.922 10.8966 54.0518 11.3426 53.9909 11.7827V14.6978H53.1589V12.0063C53.1589 11.2828 52.8646 10.9225 52.2497 10.9224C51.968 10.9083 51.6941 11.0263 51.5007 11.2456C51.3072 11.4649 51.213 11.7643 51.2428 12.064V14.6978H50.4108V10.1948H51.2116V10.9106H51.2741C51.4902 10.384 51.9954 10.0613 52.5319 10.1079ZM56.1423 14.6978H55.3102V8.43701H56.1423V14.6978ZM81.3717 10.1079C81.7871 10.0745 82.1944 10.245 82.4782 10.5708C82.7619 10.8966 82.8917 11.3425 82.8307 11.7827V14.6978H81.9987V12.0063C81.9987 11.2828 81.7046 10.9224 81.0895 10.9224C80.8078 10.9083 80.5339 11.0263 80.3405 11.2456C80.1471 11.4649 80.0528 11.7643 80.0827 12.064V14.6978H79.2516V10.1948H80.0524V10.9106H80.1139C80.3301 10.384 80.8353 10.0614 81.3717 10.1079ZM90.401 10.9185H90.4665C90.693 10.3872 91.207 10.0646 91.7516 10.1118C92.1647 10.0878 92.5666 10.2618 92.8473 10.5864C93.1279 10.911 93.2579 11.3526 93.2028 11.7905V14.6978H92.3708V12.0093C92.3706 11.2904 92.0569 10.9263 91.4694 10.9263C91.18 10.9009 90.8947 11.0138 90.6901 11.2339C90.4857 11.454 90.3822 11.7591 90.4079 12.0679V14.6978H89.5768V8.43701H90.401V10.9185ZM63.8327 12.7329C63.2525 12.7744 62.9891 12.9857 62.9889 13.3823C62.9889 13.7876 63.3177 14.0239 63.7702 14.0239C64.038 14.0529 64.3057 13.9643 64.5114 13.7788C64.717 13.5933 64.8428 13.3264 64.861 13.0396V12.6636L63.8327 12.7329ZM40.9967 10.8979C40.2738 10.8979 39.8669 11.4687 39.8669 12.4448C39.867 13.4284 40.2739 13.9946 40.9967 13.9946C41.7168 13.9945 42.1276 13.4237 42.1276 12.4438C42.1275 11.4682 41.7167 10.8981 40.9967 10.8979ZM59.2917 10.8979C58.5689 10.8982 58.1628 11.4689 58.1628 12.4448C58.1629 13.4282 58.5691 13.9944 59.2917 13.9946C60.0119 13.9946 60.4225 13.4238 60.4225 12.4438C60.4224 11.4681 60.0118 10.8979 59.2917 10.8979ZM76.1403 10.8979C75.4173 10.8979 75.0104 11.4687 75.0104 12.4448C75.0106 13.4284 75.4175 13.9946 76.1403 13.9946C76.8602 13.9944 77.2702 13.4236 77.2702 12.4438C77.27 11.4683 76.8601 10.8982 76.1403 10.8979ZM68.7653 10.9185C68.0652 10.9185 67.6393 11.4976 67.6393 12.4448C67.6395 13.3996 68.0607 13.9741 68.7653 13.9741C69.4662 13.9741 69.8999 13.3913 69.9001 12.4487C69.9001 11.5103 69.4618 10.9185 68.7653 10.9185ZM34.2507 13.854H35.3034C35.8311 13.8877 36.3455 13.6658 36.7028 13.2495C37.0601 12.8332 37.2222 12.2663 37.1452 11.7075C37.2165 11.1513 37.0521 10.59 36.696 10.1772C36.3841 9.81593 35.9539 9.60083 35.4997 9.57373H34.2507V13.854ZM96.2253 10.8638C95.9346 10.8599 95.6544 10.982 95.4489 11.2017C95.2436 11.4213 95.1297 11.7204 95.1335 12.0308H97.2624C97.2836 11.7252 97.1835 11.4238 96.986 11.2017C96.7885 10.9795 96.512 10.8568 96.2253 10.8638Z",
}

```

## src/imports/MobileFooter/svg-jyd2r.tsx
```tsx
export const imgGroup = "data:image/svg+xml,%3Csvg%20preserveAspectRatio%3D%22none%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20overflow%3D%22visible%22%20style%3D%22display%3A%20block%3B%22%20viewBox%3D%220%200%2014%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20id%3D%22primeTwitter0%22%3E%0A%3Cpath%20id%3D%22Vector%22%20d%3D%22M0%200H14V14H0V0Z%22%20fill%3D%22var(--fill-0%2C%20black)%22%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A";
```

## src/imports/NavigationExtented/index.tsx
```tsx
import svgPaths from "./svg-dc31i35z03";
type HomeProps = {
  className?: string;
  property1?: "Active" | "Default";
};

function Home({ className, property1 = "Active" }: HomeProps) {
  return (
    <div className={className || "overflow-clip relative size-[42px]"}>
      {property1 === "Active" && (
        <div className="absolute inset-[10.73%_14.29%_10.71%_14.29%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 32.9955">
            <path d={svgPaths.p114d9600} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      )}
      {property1 === "Default" && (
        <div className="absolute inset-[10.73%_14.29%_10.71%_14.29%]" data-name="Vector (Stroke)">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 32.9955">
            <path clipRule="evenodd" d={svgPaths.p21fe6800} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector (Stroke)" />
          </svg>
        </div>
      )}
    </div>
  );
}
type NavigationExtentedProps = {
  className?: string;
  property1?: "Default" | "Hover" | "Focus" | "Focused";
};

export default function NavigationExtented({ className, property1 = "Default" }: NavigationExtentedProps) {
  const isDefault = property1 === "Default";
  const isFocus = property1 === "Focus";
  const isFocused = property1 === "Focused";
  const isFocusOrFocused = ["Focus", "Focused"].includes(property1);
  const isHover = property1 === "Hover";
  return (
    <div className={className || "content-stretch flex items-start relative"}>
      {["Default", "Hover"].includes(property1) && (
        <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Menu-item">
          {isDefault && <Home className="overflow-clip relative shrink-0 size-[42px]" property1="Default" />}
          {isHover && (
            <>
              <div className="absolute bg-[rgba(38,49,84,0.1)] left-0 size-[80px] top-0" data-name="background" />
              <Home className="overflow-clip relative shrink-0 size-[42px]" />
            </>
          )}
        </div>
      )}
      <div aria-hidden={isFocusOrFocused ? true : undefined} className={isFocusOrFocused ? "absolute border border-solid border-white inset-0 pointer-events-none" : "bg-[#82479d] content-stretch flex gap-[10px] h-[80px] items-center pr-[10px] py-[10px] relative shrink-0 w-[254px]"}>
        {isDefault && (
          <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            Dashboard
          </p>
        )}
        {isHover && (
          <>
            <div className="absolute bg-[rgba(38,49,84,0.1)] h-[80px] left-0 top-0 w-[254px]" data-name="background" />
            <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Dashboard
            </p>
          </>
        )}
      </div>
      {isFocusOrFocused && (
        <>
          <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Menu-item">
            {isFocus && <Home className="overflow-clip relative shrink-0 size-[42px]" />}
            <div className={`absolute left-0 size-[80px] top-0 ${isFocused ? "bg-[rgba(38,49,84,0.2)]" : ""}`} data-name="background">
              {isFocus && <div aria-hidden className="absolute border-[rgba(255,255,255,0.4)] border-b-2 border-l-2 border-solid border-t-2 inset-0 pointer-events-none" />}
            </div>
            {isFocused && <Home className="overflow-clip relative shrink-0 size-[42px]" />}
          </div>
          <div className="bg-[#82479d] content-stretch flex gap-[10px] h-[80px] items-center pr-[10px] py-[10px] relative shrink-0 w-[254px]">
            {isFocus && (
              <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                Dashboard
              </p>
            )}
            <div className={`absolute h-[80px] left-0 top-0 w-[254px] ${isFocused ? "bg-[rgba(38,49,84,0.2)]" : ""}`} data-name="background">
              {isFocus && <div aria-hidden className="absolute border-[rgba(255,255,255,0.4)] border-b-2 border-r-2 border-solid border-t-2 inset-0 pointer-events-none" />}
            </div>
            {isFocused && (
              <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                Dashboard
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
```

## src/imports/NavigationExtented/svg-dc31i35z03.ts
```ts
export default {
p114d9600: "M12.888 0.742495C13.487 0.261915 14.232 0 15 0C15.768 0 16.513 0.261915 17.112 0.742495L28.737 10.068C29.1312 10.3842 29.4493 10.785 29.6679 11.2406C29.8865 11.6962 30 12.1951 30 12.7005V29.6205C30 30.5156 29.6444 31.374 29.0115 32.007C28.3785 32.6399 27.5201 32.9955 26.625 32.9955H22.875C21.9799 32.9955 21.1215 32.6399 20.4885 32.007C19.8556 31.374 19.5 30.5156 19.5 29.6205V19.8705C19.5 19.5721 19.3815 19.286 19.1705 19.075C18.9595 18.864 18.6734 18.7455 18.375 18.7455H11.625C11.3266 18.7455 11.0405 18.864 10.8295 19.075C10.6185 19.286 10.5 19.5721 10.5 19.8705V29.6205C10.5 30.5156 10.1444 31.374 9.51149 32.007C8.87855 32.6399 8.02011 32.9955 7.125 32.9955H3.375C2.47989 32.9955 1.62145 32.6399 0.988515 32.007C0.35558 31.374 0 30.5156 0 29.6205V12.7005C0 11.676 0.465 10.7085 1.263 10.068L12.888 0.742495V0.742495Z",
p21fe6800: "M15.8604 2.3025C15.6164 2.10671 15.3129 2 15 2C14.6871 2 14.3836 2.10671 14.1396 2.3025L2.51489 11.6277C2.51475 11.6278 2.51503 11.6276 2.51489 11.6277C2.18941 11.8892 2 12.2835 2 12.7005V29.6205C2 29.9852 2.14486 30.3349 2.40273 30.5928C2.66059 30.8506 3.01033 30.9955 3.375 30.9955H7.125C7.48967 30.9955 7.83941 30.8506 8.09727 30.5928C8.35514 30.3349 8.5 29.9852 8.5 29.6205V19.8705C8.5 19.0417 8.82924 18.2468 9.41529 17.6608C10.0013 17.0747 10.7962 16.7455 11.625 16.7455H18.375C19.2038 16.7455 19.9987 17.0747 20.5847 17.6608C21.1708 18.2468 21.5 19.0417 21.5 19.8705V29.6205C21.5 29.9852 21.6449 30.3349 21.9027 30.5928C22.1606 30.8506 22.5103 30.9955 22.875 30.9955H26.625C26.9897 30.9955 27.3394 30.8506 27.5973 30.5928C27.8551 30.3349 28 29.9852 28 29.6205V12.7005C28 12.4946 27.9538 12.2914 27.8647 12.1057C27.7757 11.9201 27.6461 11.7569 27.4855 11.6281C27.4855 11.628 27.4856 11.6281 27.4855 11.6281L15.8604 2.3025ZM28.737 10.068C29.1312 10.3842 29.4493 10.785 29.6679 11.2406C29.8865 11.6962 30 12.1951 30 12.7005V29.6205C30 30.5156 29.6444 31.374 29.0115 32.007C28.3785 32.6399 27.5201 32.9955 26.625 32.9955H22.875C21.9799 32.9955 21.1215 32.6399 20.4885 32.007C19.8556 31.374 19.5 30.5156 19.5 29.6205V19.8705C19.5 19.5721 19.3815 19.286 19.1705 19.075C18.9595 18.864 18.6734 18.7455 18.375 18.7455H11.625C11.3266 18.7455 11.0405 18.864 10.8295 19.075C10.6185 19.286 10.5 19.5721 10.5 19.8705V29.6205C10.5 30.5156 10.1444 31.374 9.51149 32.007C8.87855 32.6399 8.02011 32.9955 7.125 32.9955H3.375C2.47989 32.9955 1.62145 32.6399 0.988515 32.007C0.35558 31.374 0 30.5156 0 29.6205V12.7005C0 11.676 0.465 10.7085 1.263 10.068L12.888 0.742495C13.487 0.261915 14.232 0 15 0C15.768 0 16.513 0.261915 17.112 0.742495L28.737 10.068Z",
}

```

## src/imports/ProfileDropDown/index.tsx
```tsx
type ProfileDropDownProps = {
  className?: string;
  property1?: "Default" | "Focused" | "Hover";
};

export default function ProfileDropDown({ className, property1 = "Default" }: ProfileDropDownProps) {
  return (
    <div className={className || "bg-white content-stretch drop-shadow-[0px_0px_4px_rgba(0,0,0,0.25)] flex flex-col items-start justify-center relative rounded-[4px]"}>
      <div className="content-stretch flex gap-[10px] items-center p-[16px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0">
        <div aria-hidden className="absolute border-[#e7e7e7] border-b border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
        <div className="bg-[#df126c] content-stretch flex items-center justify-center relative rounded-[31px] shrink-0 size-[40px]">
          <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-right text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            SJ
          </p>
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] relative shrink-0 text-[#565962] whitespace-nowrap">
          <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            Dr. Stevenson, Jennifer
          </p>
          <p className="font-['Open_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[12px]" style={{ fontVariationSettings: '"wdth" 100' }}>
            Providers
          </p>
        </div>
      </div>
      <div className={`content-stretch flex items-start px-[16px] py-[10px] relative shrink-0 w-[237px] ${property1 === "Hover" ? "bg-[rgba(38,49,84,0.1)]" : ""}`}>
        <div aria-hidden className={`absolute border-solid inset-0 pointer-events-none ${property1 === "Focused" ? "border-2 border-[rgba(10,117,147,0.3)]" : "border-[#e7e7e7] border-b"}`} />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0a7593] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          My Profile
        </p>
      </div>
      <div className="content-stretch flex items-start px-[16px] py-[10px] relative shrink-0 w-[237px]">
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0a7593] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Logout
        </p>
      </div>
    </div>
  );
}
```

## src/imports/Radio-1/index.tsx
```tsx
type RadioProps = {
  className?: string;
  state?: "Default" | "Focused" | "Disabled" | "Hovered" | "Error";
  status?: boolean;
};

export default function Radio({ className, state = "Default", status = false }: RadioProps) {
  const isDisabledAndNotStatus = state === "Disabled" && !status;
  const isDisabledAndStatus = state === "Disabled" && status;
  const isError = state === "Error";
  const isErrorAndStatus = state === "Error" && status;
  const isHoveredAndStatus = state === "Hovered" && status;
  return (
    <div className={className || "content-stretch flex gap-[8px] items-start relative"}>
      <div className="relative shrink-0 size-[20px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <g id={isError ? "Group 480" : "Group 479"}>
            {((state === "Hovered" && !status) || isError || (state === "Default" && status) || isDisabledAndStatus || (state === "Focused" && status)) && <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 40" r="9.5" stroke={isDisabledAndStatus ? "var(--stroke-0, #999999)" : isError ? "var(--stroke-0, #CC0000)" : "var(--stroke-0, #0A7593)"} />}
            {((state === "Default" && !status) || isDisabledAndNotStatus || (state === "Focused" && !status) || isHoveredAndStatus) && (
              <g id="Ellipse 40">
                <circle cx="10" cy="10" fill={isDisabledAndNotStatus ? "var(--fill-0, #E7E7E7)" : "var(--fill-0, white)"} r={isHoveredAndStatus ? "10" : "9.5"} />
                <circle cx="10" cy="10" r="9.5" stroke={isHoveredAndStatus ? "var(--stroke-0, #0A7593)" : "var(--stroke-0, #6B6F7A)"} strokeOpacity={isHoveredAndStatus ? "0.8" : undefined} />
                {!status && ["Default", "Disabled", "Focused"].includes(state) && <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-1, black)" strokeOpacity="0.2" />}
              </g>
            )}
            {status && ["Default", "Disabled", "Focused", "Error"].includes(state) && <circle cx="10" cy="10" fill={isErrorAndStatus ? "var(--fill-0, #CC0000)" : isDisabledAndStatus ? "var(--fill-0, #999999)" : "var(--fill-0, #0A7593)"} id="Ellipse 41" r="4.5" stroke={isErrorAndStatus ? "var(--stroke-0, #CC0000)" : isDisabledAndStatus ? "var(--stroke-0, #999999)" : "var(--stroke-0, #0A7593)"} />}
            {isHoveredAndStatus && (
              <g id="Ellipse 41">
                <circle cx="10" cy="10" fill="var(--fill-0, #0A7593)" fillOpacity="0.8" r="5" />
                <circle cx="10" cy="10" r="4.5" stroke="var(--stroke-0, #0A7593)" strokeOpacity="0.8" />
              </g>
            )}
          </g>
        </svg>
      </div>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Label
      </p>
      {state === "Focused" && (
        <div className="absolute left-[-2px] size-[24px] top-[-2px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" id="Ellipse 40" r="11.5" stroke="var(--stroke-0, #0A7593)" strokeOpacity="0.4" />
          </svg>
        </div>
      )}
    </div>
  );
}
```

## src/imports/Radio/index.tsx
```tsx
function Header() {
  return (
    <div className="[word-break:break-word] absolute bg-[#82479d] content-stretch drop-shadow-[0px_8px_8px_rgba(0,0,0,0.15)] flex font-['Open_Sans:Light',sans-serif] font-light items-center justify-between left-0 px-[117px] py-[16px] right-0 text-white top-0 whitespace-nowrap" data-name="header">
      <p className="leading-[0] relative shrink-0 text-[36px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        <span className="leading-[normal]">{`Javelina `}</span>
        <span className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Design System
        </span>
      </p>
      <p className="leading-[normal] relative shrink-0 text-[20px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Inputs
      </p>
      <p className="leading-[normal] relative shrink-0 text-[20px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Version 2.0
      </p>
    </div>
  );
}

function Group() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 479">
          <g id="Ellipse 40">
            <circle cx="10" cy="10" fill="var(--fill-0, white)" r="9.5" />
            <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-0, #6B6F7A)" />
            <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-1, black)" strokeOpacity="0.2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 479">
          <g id="Ellipse 40">
            <circle cx="10" cy="10" fill="var(--fill-0, white)" r="9.5" />
            <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-0, #6B6F7A)" />
            <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-1, black)" strokeOpacity="0.2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 479">
          <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 40" r="9.5" stroke="var(--stroke-0, #0A7593)" />
          <circle cx="10" cy="10" fill="var(--fill-0, #0A7593)" id="Ellipse 41" r="4.5" stroke="var(--stroke-0, #0A7593)" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 479">
          <g id="Ellipse 40">
            <circle cx="10" cy="10" fill="var(--fill-0, white)" r="9.5" />
            <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-0, #6B6F7A)" />
            <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-1, black)" strokeOpacity="0.2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 479">
          <g id="Ellipse 40">
            <circle cx="10" cy="10" fill="var(--fill-0, #E7E7E7)" r="9.5" />
            <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-0, #6B6F7A)" />
            <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-1, black)" strokeOpacity="0.2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Radio">
        <Group />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Radio">
        <Group1 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Radio">
        <Group2 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Radio">
        <Group3 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Radio">
        <Group4 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[106px] items-center justify-center relative shrink-0 w-[477px]">
      <Frame1 />
    </div>
  );
}

function Group5() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 479">
          <g id="Ellipse 40">
            <circle cx="10" cy="10" fill="var(--fill-0, white)" r="9.5" />
            <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-0, #6B6F7A)" />
            <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-1, black)" strokeOpacity="0.2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group6() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 479">
          <g id="Ellipse 40">
            <circle cx="10" cy="10" fill="var(--fill-0, white)" r="9.5" />
            <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-0, #6B6F7A)" />
            <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-1, black)" strokeOpacity="0.2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group7() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 479">
          <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 40" r="9.5" stroke="var(--stroke-0, #0A7593)" />
          <circle cx="10" cy="10" fill="var(--fill-0, #0A7593)" id="Ellipse 41" r="4.5" stroke="var(--stroke-0, #0A7593)" />
        </g>
      </svg>
    </div>
  );
}

function Group8() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 479">
          <g id="Ellipse 40">
            <circle cx="10" cy="10" fill="var(--fill-0, white)" r="9.5" />
            <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-0, #6B6F7A)" />
            <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-1, black)" strokeOpacity="0.2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group9() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 479">
          <g id="Ellipse 40">
            <circle cx="10" cy="10" fill="var(--fill-0, #E7E7E7)" r="9.5" />
            <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-0, #6B6F7A)" />
            <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-1, black)" strokeOpacity="0.2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Radio">
        <Group5 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Radio">
        <Group6 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Radio">
        <Group7 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Radio">
        <Group8 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Radio">
        <Group9 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[286px] items-center justify-center relative shrink-0 w-[127px]">
      <Frame2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-['Open_Sans:Regular',sans-serif] font-normal items-start justify-between leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[204px] whitespace-nowrap">
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Unselected
      </p>
      <p className="relative shrink-0" style={{ fontVariationSettings: '"wdth" 100' }}>
        Selected
      </p>
    </div>
  );
}

function Group10() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 479">
          <g id="Ellipse 40">
            <circle cx="10" cy="10" fill="var(--fill-0, white)" r="9.5" />
            <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-0, #6B6F7A)" />
            <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-1, black)" strokeOpacity="0.2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group11() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 479">
          <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 40" r="9.5" stroke="var(--stroke-0, #0A7593)" />
          <circle cx="10" cy="10" fill="var(--fill-0, #0A7593)" id="Ellipse 41" r="4.5" stroke="var(--stroke-0, #0A7593)" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[206px]">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Radio">
        <Group10 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Radio">
        <Group11 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
    </div>
  );
}

function Group12() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 479">
          <g id="Ellipse 40">
            <circle cx="10" cy="10" fill="var(--fill-0, #E7E7E7)" r="9.5" />
            <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-0, #6B6F7A)" />
            <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-1, black)" strokeOpacity="0.2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group13() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 479">
          <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 40" r="9.5" stroke="var(--stroke-0, #999999)" />
          <circle cx="10" cy="10" fill="var(--fill-0, #999999)" id="Ellipse 41" r="4.5" stroke="var(--stroke-0, #999999)" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[206px]">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Radio">
        <Group12 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Radio">
        <Group13 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
    </div>
  );
}

function Group14() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 479">
          <g id="Ellipse 40">
            <circle cx="10" cy="10" fill="var(--fill-0, white)" r="9.5" />
            <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-0, #6B6F7A)" />
            <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-1, black)" strokeOpacity="0.2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group15() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 479">
          <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 40" r="9.5" stroke="var(--stroke-0, #0A7593)" />
          <circle cx="10" cy="10" fill="var(--fill-0, #0A7593)" id="Ellipse 41" r="4.5" stroke="var(--stroke-0, #0A7593)" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[206px]">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Radio">
        <Group14 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
        <div className="absolute left-[-2px] size-[24px] top-[-2px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" id="Ellipse 40" r="11.5" stroke="var(--stroke-0, #0A7593)" strokeOpacity="0.4" />
          </svg>
        </div>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Radio">
        <Group15 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
        <div className="absolute left-[-2px] size-[24px] top-[-2px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" id="Ellipse 40" r="11.5" stroke="var(--stroke-0, #0A7593)" strokeOpacity="0.4" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group16() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 479">
          <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 40" r="9.5" stroke="var(--stroke-0, #0A7593)" />
        </g>
      </svg>
    </div>
  );
}

function Group17() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 479">
          <g id="Ellipse 40">
            <circle cx="10" cy="10" fill="var(--fill-0, white)" r="10" />
            <circle cx="10" cy="10" r="9.5" stroke="var(--stroke-0, #0A7593)" strokeOpacity="0.8" />
          </g>
          <g id="Ellipse 41">
            <circle cx="10" cy="10" fill="var(--fill-0, #0A7593)" fillOpacity="0.8" r="5" />
            <circle cx="10" cy="10" r="4.5" stroke="var(--stroke-0, #0A7593)" strokeOpacity="0.8" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[206px]">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Radio">
        <Group16 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Radio">
        <Group17 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
    </div>
  );
}

function Group18() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 480">
          <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 40" r="9.5" stroke="var(--stroke-0, #CC0000)" />
        </g>
      </svg>
    </div>
  );
}

function Group19() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group 480">
          <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 40" r="9.5" stroke="var(--stroke-0, #CC0000)" />
          <circle cx="10" cy="10" fill="var(--fill-0, #CC0000)" id="Ellipse 41" r="4.5" stroke="var(--stroke-0, #CC0000)" />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[206px]">
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Radio">
        <Group18 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Radio">
        <Group19 />
        <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#263154] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Label
        </p>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0">
      <Frame3 />
      <Frame4 />
      <Frame6 />
      <Frame5 />
      <Frame7 />
      <Frame8 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[286px] items-center justify-center relative shrink-0 w-[282px]">
      <Frame12 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[1160px] items-start left-[114px] top-[139px]">
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Radio
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Radio buttons allow users to make a single selection from a set of options.
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] w-[245px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Orientation
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Radio buttons are always displayed as a part of a group of two or more options. Radio buttons can be grouped one of two ways — horizontally inline or vertically stacked.
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Horizontal
      </p>
      <Frame9 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Vertical
      </p>
      <Frame10 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] w-[245px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        States
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Radio buttons have five states — unselected, selected, disabled, focused or error. Only one button within a group of radio buttons can be selected. For scenarios where the user can select more than one option use Checkbox or Select Multiple.
      </p>
      <Frame11 />
    </div>
  );
}

export default function Radio() {
  return (
    <div className="bg-white relative size-full" data-name="Radio">
      <Header />
      <Frame />
    </div>
  );
}
```

## src/imports/Rectangle1-1/index.tsx
```tsx
export default function Rectangle() {
  return <div className="bg-[#d9d9d9] relative size-full" />;
}
```

## src/imports/Rectangle1/index.tsx
```tsx
export default function Rectangle() {
  return <div className="bg-[#d9d9d9] relative size-full" />;
}
```

## src/imports/ResponsiveNavigation/index.tsx
```tsx
import svgPaths from "./svg-j4um6sxyr7";
type IdCardProps = {
  className?: string;
  property1?: "Active" | "Default";
};

function IdCard({ className, property1 = "Active" }: IdCardProps) {
  const isActive = property1 === "Active";
  const isDefault = property1 === "Default";
  return (
    <div className={className || "relative size-[42px]"}>
      {isActive && (
        <>
          <div className="absolute inset-[18.75%_6.25%]" data-name="Subtract">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.75 26.25">
              <path d={svgPaths.p242e2300} fill="var(--fill-0, white)" id="Subtract" />
            </svg>
          </div>
          <div className="absolute bottom-1/2 left-[28.13%] right-[59.38%] top-[37.5%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.25 5.25">
              <path d={svgPaths.p18ca5100} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </>
      )}
      {isDefault && (
        <>
          <div className="absolute inset-[18.75%_6.25%]" data-name="Vector (Stroke)">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.75 26.25">
              <path clipRule="evenodd" d={svgPaths.p2f1e0bc0} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector (Stroke)" />
            </svg>
          </div>
          <div className="absolute inset-[31.25%_18.75%_34.38%_18.75%]" data-name="Subtract">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.25 14.4375">
              <path d={svgPaths.peb9ddf2} fill="var(--fill-0, white)" id="Subtract" />
            </svg>
          </div>
        </>
      )}
    </div>
  );
}
type ResponsiveNavigationProps = {
  className?: string;
  property1?: "Default" | "hover" | "Variant3" | "Active";
};

export default function ResponsiveNavigation({ className, property1 = "Default" }: ResponsiveNavigationProps) {
  const isVariant3 = property1 === "Variant3";
  return (
    <div className={className || "bg-[#82479d] content-stretch flex gap-[8px] items-center max-w-[375px] px-[16px] py-[4px] relative w-[375px]"}>
      {["hover", "Active", "Variant3"].includes(property1) && <div aria-hidden={isVariant3 ? true : undefined} className={`absolute ${isVariant3 ? "border-2 border-solid border-white inset-0 pointer-events-none" : property1 === "Active" ? "bg-[rgba(38,49,84,0.2)] h-[50px] left-0 top-0 w-[375px]" : "bg-[rgba(38,49,84,0.1)] h-[50px] left-0 top-0 w-[375px]"}`} />}
      <IdCard className="relative shrink-0 size-[42px]" property1={property1 === "Default" ? "Default" : undefined} />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[16px] text-white" style={{ fontVariationSettings: '"wdth" 100' }}>
        ID Cards
      </p>
    </div>
  );
}
```

## src/imports/ResponsiveNavigation/svg-j4um6sxyr7.ts
```ts
export default {
p18ca5100: "M5.25 2.625C5.25 1.15894 4.09106 0 2.625 0C1.15894 0 0 1.15894 0 2.625C0 4.09106 1.15894 5.25 2.625 5.25C4.09106 5.25 5.25 4.09106 5.25 2.625Z",
p242e2300: "M32.8125 0C34.9716 0 36.75 1.77844 36.75 3.9375V22.3125C36.75 24.4716 34.9716 26.25 32.8125 26.25H3.9375C1.77844 26.25 0 24.4716 0 22.3125V3.9375C0 1.77844 1.77844 0 3.9375 0H32.8125ZM11.8125 5.25C8.925 5.25 6.5625 7.6125 6.5625 10.5C6.5625 11.9606 7.18842 13.2783 8.16211 14.2324C7.26877 14.8353 6.53691 15.6479 6.0293 16.5986C5.52167 17.5494 5.25395 18.6097 5.25 19.6875H7.875C7.875 17.4983 9.62325 15.75 11.8125 15.75C14.0017 15.75 15.75 17.4983 15.75 19.6875H18.375C18.3711 18.6097 18.1033 17.5494 17.5957 16.5986C17.0881 15.6479 16.3562 14.8353 15.4629 14.2324C16.4366 13.2783 17.0625 11.962 17.0625 10.5C17.0625 7.6125 14.7 5.25 11.8125 5.25ZM21 17.0625V19.6875H27.5625V17.0625H21ZM21 11.8125V14.4375H31.5V11.8125H21ZM21 6.5625V9.1875H31.5V6.5625H21Z",
p2f1e0bc0: "M3.9375 2C2.88301 2 2 2.88301 2 3.9375V22.3125C2 23.367 2.88301 24.25 3.9375 24.25H32.8125C33.867 24.25 34.75 23.367 34.75 22.3125V3.9375C34.75 2.88301 33.867 2 32.8125 2H3.9375ZM3.9375 0C1.77844 0 0 1.77844 0 3.9375V22.3125C0 24.4716 1.77844 26.25 3.9375 26.25H32.8125C34.9716 26.25 36.75 24.4716 36.75 22.3125V3.9375C36.75 1.77844 34.9716 0 32.8125 0H3.9375Z",
peb9ddf2: "M6.5625 0C9.45 0 11.8125 2.3625 11.8125 5.25C11.8125 6.71196 11.1866 8.02826 10.2129 8.98242C11.1062 9.58528 11.8381 10.3979 12.3457 11.3486C12.8533 12.2994 13.1211 13.3597 13.125 14.4375H10.5C10.5 12.2483 8.75175 10.5 6.5625 10.5C4.37325 10.5 2.625 12.2483 2.625 14.4375H0C0.00394764 13.3597 0.271671 12.2994 0.779297 11.3486C1.28691 10.3979 2.01877 9.58528 2.91211 8.98242C1.93842 8.02826 1.3125 6.71065 1.3125 5.25C1.3125 2.3625 3.675 0 6.5625 0ZM22.3125 13.875H15.75V11.875H22.3125V13.875ZM26.25 8.875H15.75V6.875H26.25V8.875ZM6.5625 2.625C5.09644 2.625 3.9375 3.78394 3.9375 5.25C3.9375 6.71606 5.09644 7.875 6.5625 7.875C8.02856 7.875 9.1875 6.71606 9.1875 5.25C9.1875 3.78394 8.02856 2.625 6.5625 2.625ZM26.25 3.9375H15.75V1.875H26.25V3.9375Z",
}

```

## src/imports/SideNavigation-1/index.tsx
```tsx
import svgPaths from "./svg-uo3p29yi7g";

function Header() {
  return (
    <div className="[word-break:break-word] absolute bg-[#82479d] content-stretch drop-shadow-[0px_8px_8px_rgba(0,0,0,0.15)] flex font-['Open_Sans:Light',sans-serif] font-light items-center justify-between left-0 px-[117px] py-[16px] right-0 text-white top-0 whitespace-nowrap" data-name="header">
      <p className="leading-[0] relative shrink-0 text-[36px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        <span className="leading-[normal]">{`Javelina `}</span>
        <span className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Design System
        </span>
      </p>
      <p className="leading-[normal] relative shrink-0 text-[20px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Inputs
      </p>
      <p className="leading-[normal] relative shrink-0 text-[20px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Version 2.0
      </p>
    </div>
  );
}

function Frame14() {
  return <div className="bg-[rgba(10,117,147,0.1)] col-1 h-[504.104px] ml-[144px] mt-[43.94px] relative row-1 w-[616px]" />;
}

function Frame15() {
  return <div className="bg-[rgba(10,117,147,0.1)] col-1 h-[169.962px] ml-[144px] mt-[585.04px] relative row-1 w-[457px]" />;
}

function Frame16() {
  return <div className="bg-[rgba(10,117,147,0.1)] col-1 h-[169.962px] ml-[623px] mt-[585.04px] relative row-1 w-[137px]" />;
}

function Group() {
  return (
    <div className="absolute inset-[14.29%_17.07%_14.29%_16.67%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.829 29.999">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p24377d00} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Layer() {
  return (
    <div className="absolute inset-[14.29%_16.67%_11.9%_16.67%]" data-name="Layer 1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 31">
        <g id="Layer 1">
          <path d={svgPaths.p3d08be80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p11a918b0} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Layer1() {
  return (
    <div className="absolute inset-[11.9%]" data-name="Layer 1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Layer 1">
          <path d={svgPaths.p9ec2e00} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p170cc400} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p36673700} fill="var(--fill-0, white)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function CollapsedSideNavigation() {
  return (
    <div className="bg-[#82479d] col-1 content-stretch flex flex-col h-[755px] items-start ml-0 mt-0 pl-[8px] relative row-1" data-name="Collapsed Side Navigation">
      <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Navigation-item">
        <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Navigation">
          <Group />
        </div>
      </div>
      <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Navigation-item">
        <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Home">
          <div className="absolute inset-[10.73%_14.29%_10.71%_14.29%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 32.9955">
              <path d={svgPaths.p114d9600} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
        <div className="absolute bg-[rgba(38,49,84,0.2)] left-0 size-[80px] top-0" data-name="background" />
      </div>
      <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Navigation-item">
        <div className="relative shrink-0 size-[42px]" data-name="ID Card">
          <div className="absolute inset-[18.75%_6.25%]" data-name="Vector (Stroke)">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.75 26.25">
              <path clipRule="evenodd" d={svgPaths.p2f1e0bc0} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector (Stroke)" />
            </svg>
          </div>
          <div className="absolute inset-[31.25%_18.75%_34.38%_18.75%]" data-name="Subtract">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.25 14.4375">
              <path d={svgPaths.peb9ddf2} fill="var(--fill-0, white)" id="Subtract" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Navigation-item">
        <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Coverages">
          <div className="absolute inset-[10%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.6 33.6">
              <path d={svgPaths.p3ee32040} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Navigation-item">
        <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Claims">
          <div className="absolute inset-[9.52%_19.05%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 34">
              <path d={svgPaths.p3f76b280} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="2" />
            </svg>
          </div>
          <div className="absolute inset-[47.07%_30.47%_33.4%_30.47%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4062 8.20312">
              <g id="Vector">
                <path d={svgPaths.p30ab6c00} fill="var(--fill-0, white)" />
                <path d={svgPaths.p38964f80} fill="var(--fill-0, white)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Navigation-item">
        <div className="relative shrink-0 size-[42px]" data-name="Spending Account">
          <div className="absolute inset-[30.95%_19.05%_16.67%_21.43%]" data-name="Vector (Stroke)">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 22">
              <path clipRule="evenodd" d={svgPaths.p3aa4ce00} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector (Stroke)" />
            </svg>
          </div>
          <div className="absolute inset-[40.6%_40.25%_26.32%_42.6%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.20068 13.8936">
              <path d={svgPaths.p2918d100} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[14.29%_30.95%_71.43%_33.33%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 6">
              <path d={svgPaths.p1e4c9780} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Navigation-item">
        <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Resources">
          <Layer />
        </div>
      </div>
      <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Navigation-item">
        <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Price Comparison">
          <Layer1 />
        </div>
      </div>
      <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Navigation-item">
        <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Find Provider">
          <div className="absolute inset-[12.43%_22.39%_12.57%_22.62%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.0982 31.4997">
              <path d={svgPaths.pe688a00} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[#f5f5f5] col-1 h-[755px] ml-0 mt-0 relative row-1 w-[760px]" />
      <Frame14 />
      <Frame15 />
      <Frame16 />
      <CollapsedSideNavigation />
    </div>
  );
}

function Frame17() {
  return <div className="bg-[rgba(10,117,147,0.1)] col-1 h-[436px] ml-[373px] mt-[38px] relative row-1 w-[616px]" />;
}

function Frame18() {
  return <div className="bg-[rgba(10,117,147,0.1)] col-1 h-[147px] ml-[144px] mt-[506px] relative row-1 w-[457px]" />;
}

function Frame19() {
  return <div className="bg-[rgba(10,117,147,0.1)] col-1 h-[147px] ml-[623px] mt-[506px] relative row-1 w-[137px]" />;
}

function Group1() {
  return (
    <div className="relative size-full" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.829 29.999">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p24377d00} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function MenuItem() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Menu-item">
      <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Navigation">
        <div className="absolute flex inset-[14.29%_17.07%_14.29%_16.67%] items-center justify-center" style={{ containerType: "size" }}>
          <div className="flex-none h-[100cqh] rotate-180 w-[100cqw]">
            <Group1 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] h-[80px] items-center pr-[10px] py-[10px] relative shrink-0 w-[254px]">
      <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Collapse
      </p>
    </div>
  );
}

function MenuItem1() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Menu-item">
      <div className="absolute bg-[rgba(38,49,84,0.2)] left-0 size-[80px] top-0" data-name="background" />
      <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Home">
        <div className="absolute inset-[10.73%_14.29%_10.71%_14.29%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 32.9955">
            <path d={svgPaths.p114d9600} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] h-[80px] items-center pr-[10px] py-[10px] relative shrink-0 w-[254px]">
      <div className="absolute bg-[rgba(38,49,84,0.2)] h-[80px] left-0 top-0 w-[254px]" data-name="background" />
      <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Dashboard
      </p>
    </div>
  );
}

function MenuItem2() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Menu-item">
      <div className="relative shrink-0 size-[42px]" data-name="ID Card">
        <div className="absolute inset-[18.75%_6.25%]" data-name="Vector (Stroke)">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.75 26.25">
            <path clipRule="evenodd" d={svgPaths.p2f1e0bc0} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector (Stroke)" />
          </svg>
        </div>
        <div className="absolute inset-[31.25%_18.75%_34.38%_18.75%]" data-name="Subtract">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.25 14.4375">
            <path d={svgPaths.peb9ddf2} fill="var(--fill-0, white)" id="Subtract" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] h-[80px] items-center pr-[10px] py-[10px] relative shrink-0 w-[254px]">
      <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        ID Cards
      </p>
    </div>
  );
}

function MenuItem3() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Menu-item">
      <div className="absolute bg-[rgba(38,49,84,0.1)] left-0 size-[80px] top-0" data-name="background" />
      <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Claims">
        <div className="absolute inset-[9.52%_19.05%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 34">
            <path d={svgPaths.pc18170} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] h-[80px] items-center pr-[10px] py-[10px] relative shrink-0 w-[254px]">
      <div className="absolute bg-[rgba(38,49,84,0.1)] h-[80px] left-0 top-0 w-[254px]" data-name="background" />
      <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Claims
      </p>
    </div>
  );
}

function MenuItem4() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Menu-item">
      <div className="relative shrink-0 size-[42px]" data-name="Spending Account">
        <div className="absolute inset-[30.95%_19.05%_16.67%_21.43%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 22">
            <path d={svgPaths.pf55c6c0} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[14.29%_30.95%_71.43%_33.33%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 6">
            <path d={svgPaths.p1e4c9780} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="absolute left-0 size-[80px] top-0" data-name="background">
        <div aria-hidden className="absolute border-[rgba(255,255,255,0.4)] border-b-2 border-l-2 border-solid border-t-2 inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] h-[80px] items-center pr-[10px] py-[10px] relative shrink-0 w-[254px]">
      <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Accounts
      </p>
      <div className="absolute h-[80px] left-0 top-0 w-[254px]" data-name="background">
        <div aria-hidden className="absolute border-[rgba(255,255,255,0.4)] border-b-2 border-r-2 border-solid border-t-2 inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Layer2() {
  return (
    <div className="absolute inset-[14.29%_16.67%_11.9%_16.67%]" data-name="Layer 1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 31">
        <g id="Layer 1">
          <path d={svgPaths.p3d08be80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p11a918b0} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function MenuItem5() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Menu-item">
      <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Resources">
        <Layer2 />
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] h-[80px] items-center pr-[10px] py-[10px] relative shrink-0 w-[254px]">
      <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Resources
      </p>
    </div>
  );
}

function Layer3() {
  return (
    <div className="absolute inset-[11.9%]" data-name="Layer 1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Layer 1">
          <path d={svgPaths.p9ec2e00} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p170cc400} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p36673700} fill="var(--fill-0, white)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function MenuItem6() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Menu-item">
      <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Price Comparison">
        <Layer3 />
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] h-[80px] items-center pr-[10px] py-[10px] relative shrink-0 w-[254px]">
      <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Price Comparison
      </p>
    </div>
  );
}

function MenuItem7() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Menu-item">
      <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Find Provider">
        <div className="absolute inset-[12.43%_22.39%_12.57%_22.62%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.0982 31.4997">
            <path d={svgPaths.pe688a00} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] h-[80px] items-center pr-[10px] py-[10px] relative shrink-0 w-[254px]">
      <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Find Providers
      </p>
    </div>
  );
}

function ExpandedSideNavigation() {
  return (
    <div className="bg-[#82479d] col-1 content-stretch flex flex-col h-[652px] items-start ml-px mt-px pl-[8px] relative row-1" data-name="Expanded Side Navigation">
      <div className="content-stretch flex items-start relative shrink-0" data-name="Navigation Extented">
        <MenuItem />
        <Frame />
      </div>
      <div className="content-stretch flex items-start relative shrink-0" data-name="Navigation Extented">
        <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none" />
        <MenuItem1 />
        <Frame1 />
      </div>
      <div className="content-stretch flex items-start relative shrink-0" data-name="Navigation Extented">
        <MenuItem2 />
        <Frame2 />
      </div>
      <div className="content-stretch flex items-start relative shrink-0" data-name="Navigation Extented">
        <MenuItem3 />
        <Frame3 />
      </div>
      <div className="content-stretch flex items-start relative shrink-0" data-name="Navigation Extented">
        <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none" />
        <MenuItem4 />
        <Frame4 />
      </div>
      <div className="content-stretch flex items-start relative shrink-0" data-name="Navigation Extented">
        <MenuItem5 />
        <Frame5 />
      </div>
      <div className="content-stretch flex items-start relative shrink-0" data-name="Navigation Extented">
        <MenuItem6 />
        <Frame6 />
      </div>
      <div className="content-stretch flex items-start relative shrink-0" data-name="Navigation Extented">
        <MenuItem7 />
        <Frame7 />
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[#f5f5f5] col-1 h-[653px] ml-0 mt-0 relative row-1 w-[760px]" />
      <Frame17 />
      <Frame18 />
      <Frame19 />
      <ExpandedSideNavigation />
    </div>
  );
}

function MenuItem8() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Menu-item">
      <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Home">
        <div className="absolute inset-[10.73%_14.29%_10.71%_14.29%]" data-name="Vector (Stroke)">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 32.9955">
            <path clipRule="evenodd" d={svgPaths.p21fe6800} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] h-[80px] items-center pr-[10px] py-[10px] relative shrink-0 w-[254px]">
      <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Dashboard
      </p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col gap-[10px] h-[268px] items-start justify-center px-[49px] relative shrink-0 w-[481px]">
      <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Navigation-item">
        <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Home">
          <div className="absolute inset-[10.73%_14.29%_10.71%_14.29%]" data-name="Vector (Stroke)">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 32.9955">
              <path clipRule="evenodd" d={svgPaths.p21fe6800} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector (Stroke)" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start relative shrink-0" data-name="Navigation Extented">
        <MenuItem8 />
        <Frame8 />
      </div>
      <div className="bg-[#82479d] content-stretch flex gap-[8px] items-center max-w-[375px] px-[16px] py-[4px] relative shrink-0 w-[375px]" data-name="Responsive Navigation]">
        <div className="relative shrink-0 size-[42px]" data-name="ID Card">
          <div className="absolute inset-[18.75%_6.25%]" data-name="Vector (Stroke)">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.75 26.25">
              <path clipRule="evenodd" d={svgPaths.p2f1e0bc0} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector (Stroke)" />
            </svg>
          </div>
          <div className="absolute inset-[31.25%_18.75%_34.38%_18.75%]" data-name="Subtract">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.25 14.4375">
              <path d={svgPaths.peb9ddf2} fill="var(--fill-0, white)" id="Subtract" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[16px] text-white" style={{ fontVariationSettings: '"wdth" 100' }}>
          ID Cards
        </p>
      </div>
    </div>
  );
}

function MenuItem9() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Menu-item">
      <div className="absolute bg-[rgba(38,49,84,0.1)] left-0 size-[80px] top-0" data-name="background" />
      <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Home">
        <div className="absolute inset-[10.73%_14.29%_10.71%_14.29%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 32.9955">
            <path d={svgPaths.p114d9600} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] h-[80px] items-center pr-[10px] py-[10px] relative shrink-0 w-[254px]">
      <div className="absolute bg-[rgba(38,49,84,0.1)] h-[80px] left-0 top-0 w-[254px]" data-name="background" />
      <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Dashboard
      </p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col gap-[10px] h-[278px] items-start justify-center px-[49px] relative shrink-0 w-[481px]">
      <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Navigation-item">
        <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Home">
          <div className="absolute inset-[10.73%_14.29%_10.71%_14.29%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 32.9955">
              <path d={svgPaths.p114d9600} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start relative shrink-0" data-name="Navigation Extented">
        <MenuItem9 />
        <Frame9 />
      </div>
      <div className="bg-[#82479d] content-stretch flex gap-[8px] items-center max-w-[375px] px-[16px] py-[4px] relative shrink-0 w-[375px]" data-name="Responsive Navigation]">
        <div className="absolute bg-[rgba(38,49,84,0.1)] h-[50px] left-0 top-0 w-[375px]" />
        <div className="relative shrink-0 size-[42px]" data-name="ID Card">
          <div className="absolute inset-[18.75%_6.25%]" data-name="Subtract">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.75 26.25">
              <path d={svgPaths.p242e2300} fill="var(--fill-0, white)" id="Subtract" />
            </svg>
          </div>
          <div className="absolute bottom-1/2 left-[28.13%] right-[59.38%] top-[37.5%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.25 5.25">
              <path d={svgPaths.p18ca5100} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[16px] text-white" style={{ fontVariationSettings: '"wdth" 100' }}>
          ID Cards
        </p>
      </div>
    </div>
  );
}

function MenuItem10() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Menu-item">
      <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Home">
        <div className="absolute inset-[10.73%_14.29%_10.71%_14.29%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 32.9955">
            <path d={svgPaths.p114d9600} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="absolute left-0 size-[80px] top-0" data-name="background">
        <div aria-hidden className="absolute border-[rgba(255,255,255,0.4)] border-b-2 border-l-2 border-solid border-t-2 inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] h-[80px] items-center pr-[10px] py-[10px] relative shrink-0 w-[254px]">
      <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Dashboard
      </p>
      <div className="absolute h-[80px] left-0 top-0 w-[254px]" data-name="background">
        <div aria-hidden className="absolute border-[rgba(255,255,255,0.4)] border-b-2 border-r-2 border-solid border-t-2 inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col gap-[10px] h-[300px] items-start justify-center px-[49px] relative shrink-0 w-[481px]">
      <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Navigation-item">
        <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Home">
          <div className="absolute inset-[10.73%_14.29%_10.71%_14.29%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 32.9955">
              <path d={svgPaths.p114d9600} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
        <div className="absolute left-0 size-[80px] top-0" data-name="background">
          <div aria-hidden className="absolute border-2 border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none" />
        </div>
      </div>
      <div className="content-stretch flex items-start relative shrink-0" data-name="Navigation Extented">
        <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none" />
        <MenuItem10 />
        <Frame10 />
      </div>
      <div className="bg-[#82479d] content-stretch flex gap-[8px] items-center max-w-[375px] px-[16px] py-[4px] relative shrink-0 w-[375px]" data-name="Responsive Navigation]">
        <div aria-hidden className="absolute border-2 border-solid border-white inset-0 pointer-events-none" />
        <div className="relative shrink-0 size-[42px]" data-name="ID Card">
          <div className="absolute inset-[18.75%_6.25%]" data-name="Subtract">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.75 26.25">
              <path d={svgPaths.p242e2300} fill="var(--fill-0, white)" id="Subtract" />
            </svg>
          </div>
          <div className="absolute bottom-1/2 left-[28.13%] right-[59.38%] top-[37.5%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.25 5.25">
              <path d={svgPaths.p18ca5100} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[16px] text-white" style={{ fontVariationSettings: '"wdth" 100' }}>
          ID Cards
        </p>
      </div>
    </div>
  );
}

function MenuItem11() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Menu-item">
      <div className="absolute bg-[rgba(38,49,84,0.2)] left-0 size-[80px] top-0" data-name="background" />
      <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Home">
        <div className="absolute inset-[10.73%_14.29%_10.71%_14.29%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 32.9955">
            <path d={svgPaths.p114d9600} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-[#82479d] content-stretch flex gap-[10px] h-[80px] items-center pr-[10px] py-[10px] relative shrink-0 w-[254px]">
      <div className="absolute bg-[rgba(38,49,84,0.2)] h-[80px] left-0 top-0 w-[254px]" data-name="background" />
      <p className="[word-break:break-word] font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Dashboard
      </p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col gap-[10px] h-[282px] items-start justify-center px-[49px] relative shrink-0 w-[481px]">
      <div className="bg-[#82479d] content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0 size-[80px]" data-name="Navigation-item">
        <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Home">
          <div className="absolute inset-[10.73%_14.29%_10.71%_14.29%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 32.9955">
              <path d={svgPaths.p114d9600} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
        <div className="absolute bg-[rgba(38,49,84,0.2)] left-0 size-[80px] top-0" data-name="background" />
      </div>
      <div className="content-stretch flex items-start relative shrink-0" data-name="Navigation Extented">
        <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none" />
        <MenuItem11 />
        <Frame12 />
      </div>
      <div className="bg-[#82479d] content-stretch flex gap-[8px] items-center max-w-[375px] px-[16px] py-[4px] relative shrink-0 w-[375px]" data-name="Responsive Navigation]">
        <div className="absolute bg-[rgba(38,49,84,0.2)] h-[50px] left-0 top-0 w-[375px]" />
        <div className="relative shrink-0 size-[42px]" data-name="ID Card">
          <div className="absolute inset-[18.75%_6.25%]" data-name="Subtract">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.75 26.25">
              <path d={svgPaths.p242e2300} fill="var(--fill-0, white)" id="Subtract" />
            </svg>
          </div>
          <div className="absolute bottom-1/2 left-[28.13%] right-[59.38%] top-[37.5%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.25 5.25">
              <path d={svgPaths.p18ca5100} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[16px] text-white" style={{ fontVariationSettings: '"wdth" 100' }}>
          ID Cards
        </p>
      </div>
    </div>
  );
}

function Battery() {
  return (
    <div className="absolute inset-[33.33%_4.24%_38.33%_89.42%]" data-name="Battery">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.7578 11.3333">
        <g id="Battery">
          <rect height="10.3333" id="Border" opacity="0.35" rx="2.16667" stroke="var(--stroke-0, white)" width="20.4844" x="0.5" y="0.5" />
          <path d={svgPaths.p1db2a280} fill="var(--fill-0, white)" id="Cap" opacity="0.4" />
          <rect fill="var(--fill-0, white)" height="7.33333" id="Capacity" rx="1.33333" width="17.5781" x="1.95309" y="2" />
        </g>
      </svg>
    </div>
  );
}

function TimeStyle() {
  return (
    <div className="absolute inset-[22.5%_80.8%_17.5%_4.27%]" data-name="Time Style">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Lato:Regular',sans-serif] leading-[0] left-[27px] not-italic text-[#f1f1f1] text-[14px] text-center top-[calc(50%-8px)] tracking-[-0.28px] w-[54px]">
        <span className="leading-[normal]">9:4</span>
        <span className="leading-[normal]">1</span>
      </p>
    </div>
  );
}

function Group4() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 flex h-[17.743px] items-center justify-center ml-0 mt-0 relative row-1 w-[18px]">
        <div className="flex-none rotate-[44.48deg] skew-x-[-0.35deg]">
          <div className="bg-white h-[3.908px] relative w-[21.367px]" />
        </div>
      </div>
      <div className="col-1 flex h-[17.89px] items-center justify-center ml-[0.07px] mt-[0.11px] relative row-1 w-[17.852px]">
        <div className="flex-none rotate-[134.83deg] skew-x-[0.35deg]">
          <div className="bg-white h-[3.909px] relative w-[21.365px]" />
        </div>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-end justify-center leading-[normal] relative shrink-0 text-right text-white whitespace-nowrap">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 text-[16px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        A1M Health Insurance TPA
      </p>
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        For Member
      </p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[31px] shrink-0 size-[32px]">
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[32px]" data-name="icon 32x32">
        <div className="h-[15px] relative shrink-0 w-[10px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 15">
            <path d={svgPaths.p209d5200} fill="var(--fill-0, white)" fillOpacity="0.8" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <Frame25 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[31px] shrink-0 size-[32px]">
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[32px]" data-name="icon 32x32">
        <div className="h-[18px] relative shrink-0 w-[14px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 18">
            <g id="Vector">
              <path d={svgPaths.p3f8ec680} fill="var(--fill-0, white)" />
              <path d={svgPaths.p1d1a0700} fill="var(--fill-0, white)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <Frame26 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0">
      <Frame27 />
      <div className="flex h-[51px] items-center justify-center relative shrink-0 w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[51px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51 1">
                <line id="Line 37" stroke="var(--stroke-0, white)" strokeOpacity="0.2" x2="51" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame23 />
      <Frame29 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.2)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[9px] relative size-full">
          <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[32px]" data-name="icon 32x32">
            <Group4 />
          </div>
          <Frame24 />
        </div>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="bg-[#df126c] content-stretch flex items-center justify-center relative rounded-[31px] shrink-0 size-[32px]">
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-right text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        SJ
      </p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] relative shrink-0 text-white">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold h-[18px] relative shrink-0 text-[14px] w-[101px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Dennis Brown
      </p>
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>{`Member ID: 14234234	`}</p>
    </div>
  );
}

function Frame33() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-end size-full">
        <div className="content-stretch flex gap-[8px] items-end pb-[8px] px-[16px] relative size-full">
          <Frame28 />
          <Frame32 />
        </div>
      </div>
    </div>
  );
}

function Layer4() {
  return (
    <div className="absolute inset-[14.29%_16.67%_11.9%_16.67%]" data-name="Layer 1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 31">
        <g id="Layer 1">
          <path d={svgPaths.p3d08be80} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p11a918b0} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Layer5() {
  return (
    <div className="absolute inset-[11.9%]" data-name="Layer 1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Layer 1">
          <path d={svgPaths.p9ec2e00} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p170cc400} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p36673700} fill="var(--fill-0, white)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col gap-[9px] items-start pb-[8px] relative shrink-0">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.2)] border-b border-solid inset-[0_0_-1px_0] pointer-events-none" />
      <div className="bg-[#82479d] content-stretch flex gap-[8px] items-center max-w-[375px] px-[16px] py-[4px] relative shrink-0 w-[375px]" data-name="Responsive Navigation]">
        <div className="absolute bg-[rgba(38,49,84,0.1)] h-[50px] left-0 top-0 w-[375px]" />
        <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Home">
          <div className="absolute inset-[10.73%_14.29%_10.71%_14.29%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 32.9955">
              <path d={svgPaths.p114d9600} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[16px] text-white" style={{ fontVariationSettings: '"wdth" 100' }}>
          Dashboard
        </p>
      </div>
      <div className="bg-[#82479d] content-stretch flex gap-[8px] items-center max-w-[375px] px-[16px] py-[4px] relative shrink-0 w-[375px]" data-name="Responsive Navigation]">
        <div className="relative shrink-0 size-[42px]" data-name="ID Card">
          <div className="absolute inset-[18.75%_6.25%]" data-name="Vector (Stroke)">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.75 26.25">
              <path clipRule="evenodd" d={svgPaths.p2f1e0bc0} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector (Stroke)" />
            </svg>
          </div>
          <div className="absolute inset-[31.25%_18.75%_34.38%_18.75%]" data-name="Subtract">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.25 14.4375">
              <path d={svgPaths.peb9ddf2} fill="var(--fill-0, white)" id="Subtract" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[16px] text-white" style={{ fontVariationSettings: '"wdth" 100' }}>
          ID Cards
        </p>
      </div>
      <div className="bg-[#82479d] content-stretch flex gap-[8px] items-center max-w-[375px] px-[16px] py-[4px] relative shrink-0 w-[375px]" data-name="Responsive Navigation]">
        <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Claims">
          <div className="absolute inset-[9.52%_19.05%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 34">
              <path d={svgPaths.p3f76b280} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="2" />
            </svg>
          </div>
          <div className="absolute inset-[47.07%_30.47%_33.4%_30.47%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.4062 8.20312">
              <g id="Vector">
                <path d={svgPaths.p30ab6c00} fill="var(--fill-0, white)" />
                <path d={svgPaths.p38964f80} fill="var(--fill-0, white)" />
              </g>
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[16px] text-white" style={{ fontVariationSettings: '"wdth" 100' }}>
          Claims
        </p>
      </div>
      <div className="bg-[#82479d] content-stretch flex gap-[8px] items-center max-w-[375px] px-[16px] py-[4px] relative shrink-0 w-[375px]" data-name="Responsive Navigation]">
        <div className="relative shrink-0 size-[42px]" data-name="Spending Account">
          <div className="absolute inset-[30.95%_19.05%_16.67%_21.43%]" data-name="Vector (Stroke)">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 22">
              <path clipRule="evenodd" d={svgPaths.p3aa4ce00} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector (Stroke)" />
            </svg>
          </div>
          <div className="absolute inset-[40.6%_40.25%_26.32%_42.6%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.20068 13.8936">
              <path d={svgPaths.p2918d100} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
          <div className="absolute inset-[14.29%_30.95%_71.43%_33.33%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 6">
              <path d={svgPaths.p1e4c9780} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[16px] text-white" style={{ fontVariationSettings: '"wdth" 100' }}>
          Accounts
        </p>
      </div>
      <div className="bg-[#82479d] content-stretch flex gap-[8px] items-center max-w-[375px] px-[16px] py-[4px] relative shrink-0 w-[375px]" data-name="Responsive Navigation]">
        <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Resources">
          <Layer4 />
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[16px] text-white" style={{ fontVariationSettings: '"wdth" 100' }}>
          Resources
        </p>
      </div>
      <div className="bg-[#82479d] content-stretch flex gap-[8px] items-center max-w-[375px] px-[16px] py-[4px] relative shrink-0 w-[375px]" data-name="Responsive Navigation]">
        <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Price Comparison">
          <Layer5 />
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[16px] text-white" style={{ fontVariationSettings: '"wdth" 100' }}>
          Price Comparison
        </p>
      </div>
      <div className="bg-[#82479d] content-stretch flex gap-[8px] items-center max-w-[375px] px-[16px] py-[4px] relative shrink-0 w-[375px]" data-name="Responsive Navigation]">
        <div className="overflow-clip relative shrink-0 size-[42px]" data-name="Find Provider">
          <div className="absolute inset-[12.43%_22.39%_12.57%_22.62%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.0982 31.4997">
              <path d={svgPaths.pe688a00} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[16px] text-white" style={{ fontVariationSettings: '"wdth" 100' }}>
          Find Providers
        </p>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[9px] items-start left-0 top-0">
      <div className="h-[40px] relative shrink-0 w-[375px]" data-name="Statusbar">
        <Battery />
        <div className="absolute inset-[33.33%_11.89%_39.26%_84.14%]" data-name="Wifi">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9141 10.966">
            <path d={svgPaths.pa7b180} fill="var(--fill-0, white)" id="Wifi" />
          </svg>
        </div>
        <div className="absolute inset-[34.17%_17.17%_39.17%_78.4%]" data-name="Cellular Connection">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6016 10.667">
            <path d={svgPaths.p34568f7a} fill="var(--fill-0, white)" id="Cellular Connection" />
          </svg>
        </div>
        <TimeStyle />
      </div>
      <Frame30 />
      <Frame33 />
      <Frame34 />
      <div className="bg-[#82479d] content-stretch flex gap-[8px] items-center max-w-[375px] px-[16px] py-[4px] relative shrink-0 w-[375px]" data-name="Responsive Navigation]">
        <p className="[word-break:break-word] flex-[1_0_0] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[16px] text-white" style={{ fontVariationSettings: '"wdth" 100' }}>
          Logout
        </p>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] items-start left-[107px] top-[133px]">
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Navigation Bar
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Side Navigation is a collapsible vertical container used to display related information or navigation.
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] w-[314px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Variations
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Collapse
      </p>
      <Group2 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Expanded
      </p>
      <Group3 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] w-[314px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        States
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Badge has four display options to indicate status — default, hovered, active and disabled.
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Default
      </p>
      <Frame13 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Hovered
      </p>
      <Frame20 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Focus
      </p>
      <Frame21 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Active
      </p>
      <Frame22 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] w-[314px]" style={{ fontVariationSettings: '"wdth" 100' }}>{`Mobile Responsive `}</p>
      <div className="bg-[#82479d] h-[1008px] overflow-clip relative shrink-0 w-[375px]" data-name="Mobile Navigation">
        <Frame31 />
      </div>
    </div>
  );
}

export default function SideNavigation() {
  return (
    <div className="bg-white relative size-full" data-name="Side Navigation">
      <Header />
      <Frame11 />
    </div>
  );
}
```

## src/imports/SideNavigation-1/svg-uo3p29yi7g.ts
```ts
export default {
p114d9600: "M12.888 0.742495C13.487 0.261915 14.232 0 15 0C15.768 0 16.513 0.261915 17.112 0.742495L28.737 10.068C29.1312 10.3842 29.4493 10.785 29.6679 11.2406C29.8865 11.6962 30 12.1951 30 12.7005V29.6205C30 30.5156 29.6444 31.374 29.0115 32.007C28.3785 32.6399 27.5201 32.9955 26.625 32.9955H22.875C21.9799 32.9955 21.1215 32.6399 20.4885 32.007C19.8556 31.374 19.5 30.5156 19.5 29.6205V19.8705C19.5 19.5721 19.3815 19.286 19.1705 19.075C18.9595 18.864 18.6734 18.7455 18.375 18.7455H11.625C11.3266 18.7455 11.0405 18.864 10.8295 19.075C10.6185 19.286 10.5 19.5721 10.5 19.8705V29.6205C10.5 30.5156 10.1444 31.374 9.51149 32.007C8.87855 32.6399 8.02011 32.9955 7.125 32.9955H3.375C2.47989 32.9955 1.62145 32.6399 0.988515 32.007C0.35558 31.374 0 30.5156 0 29.6205V12.7005C0 11.676 0.465 10.7085 1.263 10.068L12.888 0.742495V0.742495Z",
p11a918b0: "M11.6667 2.32471V9.29884C11.6667 11.1485 12.4042 12.9224 13.7169 14.2303C15.0297 15.5382 16.8102 16.273 18.6667 16.273H25.6667V26.3506C25.6667 26.9671 25.4208 27.5584 24.9832 27.9944C24.5457 28.4304 23.9522 28.6753 23.3333 28.6753H4.66667C4.04783 28.6753 3.45434 28.4304 3.01675 27.9944C2.57917 27.5584 2.33333 26.9671 2.33333 26.3506V4.64942C2.33333 4.03287 2.57917 3.44157 3.01675 3.0056C3.45434 2.56963 4.04783 2.32471 4.66667 2.32471H11.6667ZM14 0H4.66667C3.42899 0 2.242 0.489848 1.36684 1.36178C0.491665 2.23372 0 3.41632 0 4.64942L0 26.3506C0 27.5837 0.491665 28.7663 1.36684 29.6382C2.242 30.5102 3.42899 31 4.66667 31H23.3333C24.571 31 25.758 30.5102 26.6332 29.6382C27.5083 28.7663 28 27.5837 28 26.3506V13.9483H18.6667C17.429 13.9483 16.242 13.4584 15.3668 12.5865C14.4917 11.7145 14 10.5319 14 9.29884V0Z",
p170cc400: "M13.6 5.31V26.69H3.60002C3.24005 26.712 2.88445 26.6017 2.60002 26.38C2.47002 26.27 2.44002 26.21 2.44002 26.18V5.79C2.483 5.72441 2.53715 5.66687 2.60002 5.62C2.88445 5.39828 3.24005 5.28804 3.60002 5.31H13.6ZM16 0H12.44V2.91H3.56002C2.63224 2.87625 1.72337 3.17802 1.00002 3.76C0.687153 4.00426 0.434361 4.31691 0.261024 4.67398C0.0876863 5.03106 -0.00159558 5.42308 2.15827e-05 5.82V26.18C-0.00159558 26.5769 0.0876863 26.9689 0.261024 27.326C0.434361 27.6831 0.687153 27.9957 1.00002 28.24C1.71281 28.8129 2.60585 29.1141 3.52002 29.09H12.4V32H16V0Z",
p18ca5100: "M5.25 2.625C5.25 1.15894 4.09106 0 2.625 0C1.15894 0 0 1.15894 0 2.625C0 4.09106 1.15894 5.25 2.625 5.25C4.09106 5.25 5.25 4.09106 5.25 2.625Z",
p1d1a0700: "M12.6132 14.5987C13.3787 14.5987 13.9999 14.5472 13.9999 13.7655L14 13.631C14 13.069 13.6767 12.5884 13.2118 12.3597L12.7718 8.48234C12.7718 5.64401 10.8053 3.27533 8.18721 2.7167L8.18743 1.21142C8.18743 0.542526 7.6559 0 7.00045 0C6.3446 0 5.81302 0.54248 5.81302 1.21142V2.71646C3.19489 3.27532 1.22839 5.64401 1.22839 8.48211L0.7884 12.3588C0.323488 12.5872 0 13.0685 0 13.6308V13.7655C0 14.5472 0.620327 14.5987 1.38602 14.5987H12.6132Z",
p1db2a280: "M22.4609 3.66667V7.66667C23.2468 7.32789 23.7578 6.5398 23.7578 5.66667C23.7578 4.79353 23.2468 4.00544 22.4609 3.66667",
p1e4c9780: "M13.7532 1.19535H10.2965C9.58244 0.434447 8.56638 0 7.50021 0C6.43404 0 5.41798 0.434471 4.7039 1.19535H1.24722C0.833735 1.19695 0.447945 1.39469 0.215887 1.72341C-0.0161712 2.05214 -0.0643861 2.46987 0.0869682 2.83966L1.2472 6H13.7528L14.913 2.83966C15.0644 2.46987 15.0162 2.05216 14.7841 1.72341C14.5521 1.39467 14.1663 1.19696 13.7528 1.19535H13.7532Z",
p209d5200: "M3.75 15H6.25V12.5H3.75V15ZM5 0C2.2375 0 0 2.2375 0 5H2.5C2.5 3.625 3.625 2.5 5 2.5C6.375 2.5 7.5 3.625 7.5 5C7.5 7.5 3.75 7.1875 3.75 11.25H6.25C6.25 8.4375 10 8.125 10 5C10 2.2375 7.7625 0 5 0Z",
p21fe6800: "M15.8604 2.3025C15.6164 2.10671 15.3129 2 15 2C14.6871 2 14.3836 2.10671 14.1396 2.3025L2.51489 11.6277C2.51475 11.6278 2.51503 11.6276 2.51489 11.6277C2.18941 11.8892 2 12.2835 2 12.7005V29.6205C2 29.9852 2.14486 30.3349 2.40273 30.5928C2.66059 30.8506 3.01033 30.9955 3.375 30.9955H7.125C7.48967 30.9955 7.83941 30.8506 8.09727 30.5928C8.35514 30.3349 8.5 29.9852 8.5 29.6205V19.8705C8.5 19.0417 8.82924 18.2468 9.41529 17.6608C10.0013 17.0747 10.7962 16.7455 11.625 16.7455H18.375C19.2038 16.7455 19.9987 17.0747 20.5847 17.6608C21.1708 18.2468 21.5 19.0417 21.5 19.8705V29.6205C21.5 29.9852 21.6449 30.3349 21.9027 30.5928C22.1606 30.8506 22.5103 30.9955 22.875 30.9955H26.625C26.9897 30.9955 27.3394 30.8506 27.5973 30.5928C27.8551 30.3349 28 29.9852 28 29.6205V12.7005C28 12.4946 27.9538 12.2914 27.8647 12.1057C27.7757 11.9201 27.6461 11.7569 27.4855 11.6281C27.4855 11.628 27.4856 11.6281 27.4855 11.6281L15.8604 2.3025ZM28.737 10.068C29.1312 10.3842 29.4493 10.785 29.6679 11.2406C29.8865 11.6962 30 12.1951 30 12.7005V29.6205C30 30.5156 29.6444 31.374 29.0115 32.007C28.3785 32.6399 27.5201 32.9955 26.625 32.9955H22.875C21.9799 32.9955 21.1215 32.6399 20.4885 32.007C19.8556 31.374 19.5 30.5156 19.5 29.6205V19.8705C19.5 19.5721 19.3815 19.286 19.1705 19.075C18.9595 18.864 18.6734 18.7455 18.375 18.7455H11.625C11.3266 18.7455 11.0405 18.864 10.8295 19.075C10.6185 19.286 10.5 19.5721 10.5 19.8705V29.6205C10.5 30.5156 10.1444 31.374 9.51149 32.007C8.87855 32.6399 8.02011 32.9955 7.125 32.9955H3.375C2.47989 32.9955 1.62145 32.6399 0.988515 32.007C0.35558 31.374 0 30.5156 0 29.6205V12.7005C0 11.676 0.465 10.7085 1.263 10.068L12.888 0.742495C13.487 0.261915 14.232 0 15 0C15.768 0 16.513 0.261915 17.112 0.742495L28.737 10.068Z",
p242e2300: "M32.8125 0C34.9716 0 36.75 1.77844 36.75 3.9375V22.3125C36.75 24.4716 34.9716 26.25 32.8125 26.25H3.9375C1.77844 26.25 0 24.4716 0 22.3125V3.9375C0 1.77844 1.77844 0 3.9375 0H32.8125ZM11.8125 5.25C8.925 5.25 6.5625 7.6125 6.5625 10.5C6.5625 11.9606 7.18842 13.2783 8.16211 14.2324C7.26877 14.8353 6.53691 15.6479 6.0293 16.5986C5.52167 17.5494 5.25395 18.6097 5.25 19.6875H7.875C7.875 17.4983 9.62325 15.75 11.8125 15.75C14.0017 15.75 15.75 17.4983 15.75 19.6875H18.375C18.3711 18.6097 18.1033 17.5494 17.5957 16.5986C17.0881 15.6479 16.3562 14.8353 15.4629 14.2324C16.4366 13.2783 17.0625 11.962 17.0625 10.5C17.0625 7.6125 14.7 5.25 11.8125 5.25ZM21 17.0625V19.6875H27.5625V17.0625H21ZM21 11.8125V14.4375H31.5V11.8125H21ZM21 6.5625V9.1875H31.5V6.5625H21Z",
p24377d00: "M23.8295 14.9995L13.5015 26.6745C12.7705 27.5015 12.8475 28.7665 13.6745 29.4975C14.5015 30.2285 15.7665 30.1515 16.4975 29.3245L26.8255 17.6495C28.1635 16.1365 28.1635 13.8625 26.8255 12.3495L16.4975 0.674507C15.7665 -0.152493 14.5015 -0.229493 13.6745 0.501507C12.8475 1.23251 12.7705 2.49751 13.5015 3.32451L23.8295 14.9995ZM10.8295 14.9995L0.501519 26.6745C-0.229481 27.5015 -0.152508 28.7665 0.674492 29.4975C1.50149 30.2285 2.76649 30.1515 3.49749 29.3245L13.8255 17.6495C15.1635 16.1365 15.1635 13.8625 13.8255 12.3495L3.49749 0.674507C2.76649 -0.152493 1.50149 -0.229493 0.674492 0.501507C-0.152508 1.23251 -0.229481 2.49751 0.501519 3.32451L10.8295 14.9995Z",
p2918d100: "M4.64666 13.8936V12.0396C6.24305 11.7005 7.20088 10.5913 7.20068 8.93398C7.20068 7.3841 6.42819 6.53481 4.63516 6.11656L3.5604 5.863C2.51424 5.60325 2.0895 5.26415 2.0895 4.65245C2.0895 3.89818 2.73956 3.41649 3.64033 3.41649C4.54109 3.41649 5.19688 3.93928 5.28517 4.72206L7.02689 4.72184C6.98138 3.28628 6.0434 2.21835 4.63516 1.86973V0H2.55422V1.86685C1.11177 2.22496 0.205198 3.31525 0.205198 4.82687C0.205198 6.33849 1.00339 7.27977 2.62838 7.65691L3.78866 7.93257C4.88331 8.20489 5.32793 8.56634 5.32793 9.20011C5.32793 9.94484 4.64092 10.4676 3.67173 10.4676C2.61983 10.4676 1.89282 9.95102 1.80453 9.14923H0C0.0683655 10.6768 1.0318 11.7288 2.56552 12.0458L2.56571 13.8936H4.64666Z",
p2f1e0bc0: "M3.9375 2C2.88301 2 2 2.88301 2 3.9375V22.3125C2 23.367 2.88301 24.25 3.9375 24.25H32.8125C33.867 24.25 34.75 23.367 34.75 22.3125V3.9375C34.75 2.88301 33.867 2 32.8125 2H3.9375ZM3.9375 0C1.77844 0 0 1.77844 0 3.9375V22.3125C0 24.4716 1.77844 26.25 3.9375 26.25H32.8125C34.9716 26.25 36.75 24.4716 36.75 22.3125V3.9375C36.75 1.77844 34.9716 0 32.8125 0H3.9375Z",
p30ab6c00: "M0.0961056 0.0961056C0.157641 0.0345702 0.241101 0 0.328125 0H16.0781C16.1651 0 16.2486 0.0345702 16.3101 0.0961056C16.3717 0.157641 16.4062 0.241101 16.4062 0.328125V2.29688C16.4062 2.3839 16.3717 2.46736 16.3101 2.52889C16.2486 2.59043 16.1651 2.625 16.0781 2.625H0.328125C0.241101 2.625 0.157641 2.59043 0.0961056 2.52889C0.0345702 2.46736 0 2.3839 0 2.29688V0.328125C0 0.241101 0.0345702 0.157641 0.0961056 0.0961056Z",
p34568f7a: "M1.95312 6.66699C2.49247 6.66699 2.92969 7.11471 2.92969 7.66699V9.66699C2.92952 10.2191 2.49236 10.667 1.95312 10.667H0.976562C0.437328 10.667 0.000171845 10.2191 0 9.66699V7.66699C0 7.11471 0.437222 6.66699 0.976562 6.66699H1.95312ZM6.51074 4.66699C7.04993 4.66718 7.4873 5.11482 7.4873 5.66699V9.66699C7.48713 10.219 7.04982 10.6668 6.51074 10.667H5.53418C4.99495 10.667 4.55779 10.2191 4.55762 9.66699V5.66699C4.55762 5.11471 4.99484 4.66699 5.53418 4.66699H6.51074ZM11.0674 2.33301C11.6066 2.33301 12.0438 2.78087 12.0439 3.33301V9.66699C12.0438 10.2191 11.6066 10.667 11.0674 10.667H10.0908C9.55174 10.6668 9.11443 10.219 9.11426 9.66699V3.33301C9.11443 2.78099 9.55174 2.33319 10.0908 2.33301H11.0674ZM15.625 0C16.1643 0 16.6016 0.447715 16.6016 1V9.66699C16.6014 10.2191 16.1642 10.667 15.625 10.667H14.6484C14.1092 10.667 13.672 10.2191 13.6719 9.66699V1C13.6719 0.447715 14.1091 0 14.6484 0H15.625Z",
p36673700: "M12.44 24.73H3.56L12.44 16V24.73Z",
p38964f80: "M0.0961056 5.67423C0.157641 5.6127 0.241101 5.57812 0.328125 5.57812H7.875C7.96202 5.57812 8.04548 5.6127 8.10702 5.67423C8.16856 5.73577 8.20312 5.81923 8.20312 5.90625V7.875C8.20312 7.96202 8.16856 8.04548 8.10702 8.10702C8.04548 8.16856 7.96202 8.20312 7.875 8.20312H0.328125C0.241101 8.20312 0.157641 8.16856 0.0961056 8.10702C0.0345702 8.04548 0 7.96202 0 7.875V5.90625C0 5.81923 0.0345702 5.73577 0.0961056 5.67423Z",
p3aa4ce00: "M17.7084 0H7.29215C7.29215 0 0 6.94662 0 15.0534C0 19.6835 3.13586 22 5.2081 22H19.7919C21.8729 22 25 19.6833 25 15.0534C25 6.94662 17.7084 0 17.7084 0ZM8.13621 2C7.99693 2.14959 7.83489 2.32771 7.65507 2.53233C7.01678 3.25864 6.1639 4.30826 5.31305 5.59173C3.58349 8.20073 2 11.5693 2 15.0534C2 18.7806 4.43191 20 5.2081 20H19.7919C20.5749 20 23 18.7825 23 15.0534C23 11.5692 21.4166 8.20067 19.6872 5.59168C18.8364 4.30821 17.9836 3.25858 17.3453 2.53227C17.1655 2.32768 17.0035 2.14958 16.8643 2H8.13621Z",
p3d08be80: "M28 10.8448V10.5774C27.9979 9.34798 27.5071 8.16942 26.635 7.29959L20.6733 1.35995C19.8003 0.491086 18.6173 0.00210828 17.3833 0H17.115V9.29884C17.115 9.70884 17.2785 10.1021 17.5695 10.392C17.8605 10.6819 18.2551 10.8448 18.6667 10.8448H28Z",
p3ee32040: "M13.6773 14.973C14.5026 14.2632 15.5799 13.65 16.8 13.65C18.0201 13.65 19.0974 14.2632 19.9227 14.973C20.362 15.351 20.7598 15.7748 21.1092 16.2372L21.1764 16.3338C21.2723 16.4776 21.4022 16.5955 21.5546 16.6771C21.707 16.7586 21.8772 16.8013 22.05 16.8013C22.2228 16.8013 22.393 16.7586 22.5454 16.6771C22.6978 16.5955 22.8277 16.4776 22.9236 16.3338L22.9908 16.2372C23.34 15.774 23.7378 15.3495 24.1773 14.9709C25.0026 14.2632 26.0799 13.65 27.3 13.65C28.5201 13.65 29.5974 14.2632 30.4227 14.973C30.862 15.351 31.2598 15.7748 31.6092 16.2372L31.6764 16.3338C31.8015 16.5214 31.9836 16.6637 32.1959 16.7398C32.4081 16.8158 32.6392 16.8215 32.8549 16.756C33.0707 16.6906 33.2596 16.5574 33.3938 16.3762C33.528 16.195 33.6003 15.9755 33.6 15.75C33.6 7.8204 26.8296 0 16.8 0C6.7704 0 7.88965e-07 7.8204 7.88965e-07 15.75C-0.000275509 15.9755 0.072025 16.195 0.206207 16.3762C0.340389 16.5574 0.529325 16.6906 0.745066 16.756C0.960807 16.8215 1.19189 16.8158 1.40414 16.7398C1.61639 16.6637 1.79852 16.5214 1.9236 16.3338L1.9908 16.2372C2.34006 15.774 2.73782 15.3495 3.1773 14.9709C4.0026 14.2653 5.0799 13.65 6.3 13.65C7.5201 13.65 8.5974 14.2632 9.4227 14.973C9.86207 15.351 10.2598 15.7748 10.6092 16.2372L10.6764 16.3317C10.7723 16.4755 10.9022 16.5934 11.0546 16.675C11.207 16.7565 11.3772 16.7992 11.55 16.7992C11.7228 16.7992 11.893 16.7565 12.0454 16.675C12.1978 16.5934 12.3277 16.4755 12.4236 16.3317L12.4908 16.2372C12.8401 15.774 13.2378 15.3495 13.6773 14.9709V14.973ZM2.4444 12.8814C3.8157 7.1652 9.1896 2.1 16.8 2.1C24.4104 2.1 29.7843 7.1652 31.1556 12.8814C30.1749 12.18 28.8624 11.55 27.3 11.55C25.3701 11.55 23.8224 12.5118 22.8102 13.377C22.5204 13.6269 22.2642 13.8747 22.05 14.1036C21.8094 13.8484 21.5556 13.6058 21.2898 13.377C20.2776 12.5118 18.7299 11.55 16.8 11.55C14.8701 11.55 13.3224 12.5118 12.3102 13.377C12.0204 13.6269 11.7642 13.8747 11.55 14.1036C11.3094 13.8484 11.0556 13.6058 10.7898 13.377C9.7776 12.5118 8.2278 11.55 6.3 11.55C4.7376 11.55 3.423 12.18 2.4444 12.8814ZM16.8 15.75C16.4808 15.75 16.128 15.855 15.75 16.065V28.875C15.75 29.5712 15.4734 30.2389 14.9812 30.7312C14.4889 31.2234 13.8212 31.5 13.125 31.5C12.4288 31.5 11.7611 31.2234 11.2688 30.7312C10.7766 30.2389 10.5 29.5712 10.5 28.875V28.35C10.5 28.0715 10.3894 27.8044 10.1925 27.6075C9.99555 27.4106 9.72848 27.3 9.45 27.3C9.17152 27.3 8.90445 27.4106 8.70754 27.6075C8.51063 27.8044 8.4 28.0715 8.4 28.35V28.875C8.4 30.1281 8.89781 31.33 9.78392 32.2161C10.67 33.1022 11.8719 33.6 13.125 33.6C14.3781 33.6 15.58 33.1022 16.4661 32.2161C17.3522 31.33 17.85 30.1281 17.85 28.875V16.065C17.5325 15.8724 17.1711 15.764 16.8 15.75V15.75Z",
p3f76b280: "M1.18164 1H15.3242V9.67383H25V32.7861C24.9998 32.9308 24.8943 32.9999 24.8184 33H1.18164C1.10569 32.9999 1.0002 32.9308 1 32.7861V1.21387C1.0002 1.06918 1.10569 1.00011 1.18164 1ZM21.7188 7.67383H17.3242V3.57227L21.7188 7.67383Z",
p3f8ec680: "M4.92816 15.8857C4.92816 17.054 5.85589 18 6.99979 18C8.14346 18 9.07124 17.0538 9.07101 15.8857H4.92816Z",
p9ec2e00: "M19.56 29.09V16L28.44 24.73V5.82H19.56V2.91H28.44C29.3678 2.87625 30.2767 3.17802 31 3.76C31.3129 4.00426 31.5657 4.31691 31.739 4.67398C31.9123 5.03106 32.0016 5.42308 32 5.82V26.18C32.0016 26.5769 31.9123 26.9689 31.739 27.326C31.5657 27.6831 31.3129 27.9957 31 28.24C30.2872 28.8129 29.3942 29.1141 28.48 29.09H19.56Z",
pa7b180: "M5.29981 8.40058C6.54546 7.32175 8.36955 7.32183 9.61524 8.40058C9.67791 8.45861 9.71508 8.54063 9.7168 8.62714C9.71849 8.71354 9.6852 8.79705 9.62501 8.85761L7.67383 10.8732C7.61676 10.9323 7.53914 10.9659 7.45801 10.966C7.3767 10.966 7.29839 10.9324 7.24122 10.8732L5.29005 8.85761C5.22988 8.79701 5.19652 8.71353 5.19825 8.62714C5.20004 8.54063 5.23709 8.45856 5.29981 8.40058ZM2.69727 5.71112C5.38102 3.15517 9.53705 3.15502 12.2207 5.71112C12.2812 5.77098 12.3155 5.85352 12.3164 5.93964C12.3173 6.02571 12.2847 6.10895 12.2256 6.17011L11.0977 7.3371C10.9815 7.45615 10.794 7.45868 10.6748 7.34296C9.79359 6.52584 8.64683 6.07345 7.45801 6.07343C6.26985 6.07393 5.1239 6.52629 4.24317 7.34296C4.12402 7.45886 3.93652 7.45607 3.82032 7.3371L2.69239 6.17011C2.63309 6.10903 2.5998 6.02577 2.60059 5.93964C2.60151 5.85351 2.63676 5.77096 2.69727 5.71112ZM0.0937568 3.02948C4.20996 -1.00992 10.704 -1.00974 14.8203 3.02948C14.8798 3.08943 14.9135 3.17154 14.9141 3.25702C14.9146 3.34251 14.882 3.42483 14.8232 3.48554L13.6943 4.65253C13.578 4.77225 13.3896 4.77333 13.2715 4.65546C11.7033 3.12875 9.62183 2.27773 7.45801 2.27753C5.29395 2.27752 3.21204 3.1287 1.64356 4.65546C1.5256 4.77345 1.33696 4.77223 1.22071 4.65253L0.0908271 3.48554C0.032153 3.4248 -0.000542149 3.34246 6.80263e-06 3.25702C0.000608168 3.17151 0.0341759 3.0894 0.0937568 3.02948Z",
pc18170: "M25.6528 8.52656C25.8744 8.75424 26 9.06161 26 9.38415V32.7857C26 33.4574 25.4719 34 24.8182 34H1.18182C0.528125 34 0 33.4574 0 32.7857V1.21429C0 0.542634 0.528125 0 1.18182 0H16.8668C17.1807 0 17.4835 0.129018 17.7051 0.356696L25.6528 8.52656ZM23.2744 9.94196L16.3239 2.80045V9.94196H23.2744ZM5.90909 15.8616C5.83073 15.8616 5.75558 15.8936 5.70017 15.9505C5.64476 16.0075 5.61364 16.0847 5.61364 16.1652V17.9866C5.61364 18.0671 5.64476 18.1443 5.70017 18.2013C5.75558 18.2582 5.83073 18.2902 5.90909 18.2902H20.0909C20.1693 18.2902 20.2444 18.2582 20.2998 18.2013C20.3552 18.1443 20.3864 18.0671 20.3864 17.9866V16.1652C20.3864 16.0847 20.3552 16.0075 20.2998 15.9505C20.2444 15.8936 20.1693 15.8616 20.0909 15.8616H5.90909ZM5.90909 21.0223C5.83073 21.0223 5.75558 21.0543 5.70017 21.1112C5.64476 21.1682 5.61364 21.2454 5.61364 21.3259V23.1473C5.61364 23.2278 5.64476 23.305 5.70017 23.362C5.75558 23.4189 5.83073 23.4509 5.90909 23.4509H12.7045C12.7829 23.4509 12.8581 23.4189 12.9135 23.362C12.9689 23.305 13 23.2278 13 23.1473V21.3259C13 21.2454 12.9689 21.1682 12.9135 21.1112C12.8581 21.0543 12.7829 21.0223 12.7045 21.0223H5.90909Z",
pe688a00: "M11.5494 0C8.07613 0 5.24815 2.82888 5.24815 6.3024C5.24815 7.04676 5.35737 7.83336 5.53831 8.62602C5.08948 8.88946 4.74493 9.36006 4.72524 9.96618C4.72524 11.4847 5.87742 12.4529 7.09081 12.5757C7.35565 13.3376 7.81152 14.0089 8.39814 14.5372V16.8012H6.82501C3.05298 16.8012 4.3797e-06 19.8532 4.3797e-06 23.625V30.9726C-0.00116748 31.2625 0.232972 31.4985 0.522892 31.4997H22.5753C22.8652 31.4985 23.0994 31.2625 23.0982 30.9726V23.625C23.0982 19.853 20.0452 16.8012 16.2732 16.8012H14.7003V14.5381C15.2876 14.0093 15.7437 13.3371 16.0088 12.5744C17.222 12.4512 18.3744 11.4841 18.3744 9.96582C18.3545 9.35994 18.0097 8.88912 17.5613 8.62566C17.7423 7.833 17.8515 7.04646 17.8515 6.30204C17.8515 2.82882 15.0229 0 11.5494 0ZM12.6003 7.302C12.9919 7.84106 13.6039 8.40216 14.6973 8.40216H15.2244V11.0262C15.2244 13.0711 13.5912 14.7002 11.5463 14.7002C9.50138 14.7002 7.87226 13.0714 7.87226 11.0262V8.40216H10.4963C11.5913 8.40216 12.2092 7.84153 12.6003 7.302ZM6.36571 9.43572C6.54102 9.42588 6.7154 9.48306 6.82508 9.6265V11.0262C6.82508 11.1771 6.83376 11.3259 6.84758 11.4734C6.26047 11.3009 5.77904 10.803 5.77904 9.98765C5.77904 9.66304 6.07368 9.45377 6.36571 9.43572ZM16.7517 9.43759C17.0421 9.46127 17.3198 9.67971 17.3198 9.98721C17.3198 10.8028 16.8384 11.3007 16.2513 11.4729C16.2651 11.3257 16.2729 11.1767 16.2729 11.0257V9.62816C16.3987 9.47956 16.5776 9.42353 16.7517 9.43759ZM9.44911 15.2545C10.0815 15.57 10.794 15.7498 11.5491 15.7498C12.3048 15.7498 13.0175 15.5705 13.6501 15.2545V17.1957C13.6501 17.1957 13.216 18.3739 11.5491 18.3739C9.88201 18.3739 9.44911 17.1957 9.44911 17.1957V15.2545ZM6.82507 17.8509H8.50765L11.022 28.9251V30.45L4.72501 30.4502V27.8262C4.73087 27.5283 4.48783 27.285 4.1897 27.2908C3.89931 27.2967 3.66821 27.5358 3.67383 27.8262V30.4502H1.05117V23.6252C1.05117 20.7764 3.0757 18.4389 5.77522 17.9496V22.1486C5.16676 22.3666 4.72522 22.9455 4.72522 23.6251C4.72522 24.4888 5.43442 25.1992 6.29812 25.1992C7.16182 25.1992 7.87522 24.4888 7.87522 23.6251C7.87522 22.9466 7.43295 22.3687 6.82522 22.1495L6.82507 17.8509ZM14.5915 17.8509H16.2731V21.5782C15.0787 21.8236 14.1731 22.8832 14.1731 24.1479V24.6759C14.1572 25.3917 15.2391 25.3917 15.2231 24.6759V24.1479C15.2231 23.2662 15.9194 22.575 16.8012 22.575C17.6829 22.575 18.3741 23.2663 18.3741 24.1479V24.6759C18.3893 25.3605 19.4088 25.3605 19.4241 24.6759V24.1479C19.4241 22.8817 18.5199 21.821 17.3241 21.5772V17.9493C20.0233 18.4387 22.0481 20.7761 22.0481 23.625V30.45H19.4241V27.8259C19.4299 27.5283 19.1873 27.2854 18.8899 27.2906C18.5995 27.2965 18.3684 27.5355 18.3741 27.8259V30.45L12.0723 30.4502V28.9439L14.5915 17.8509ZM6.29827 23.0979C6.59452 23.0979 6.82538 23.3287 6.82538 23.625C6.82538 23.9212 6.59452 24.1479 6.29827 24.1479C6.00202 24.1479 5.77538 23.921 5.77538 23.625C5.77538 23.3287 6.00226 23.0979 6.29827 23.0979Z",
peb9ddf2: "M6.5625 0C9.45 0 11.8125 2.3625 11.8125 5.25C11.8125 6.71196 11.1866 8.02826 10.2129 8.98242C11.1062 9.58528 11.8381 10.3979 12.3457 11.3486C12.8533 12.2994 13.1211 13.3597 13.125 14.4375H10.5C10.5 12.2483 8.75175 10.5 6.5625 10.5C4.37325 10.5 2.625 12.2483 2.625 14.4375H0C0.00394764 13.3597 0.271671 12.2994 0.779297 11.3486C1.28691 10.3979 2.01877 9.58528 2.91211 8.98242C1.93842 8.02826 1.3125 6.71065 1.3125 5.25C1.3125 2.3625 3.675 0 6.5625 0ZM22.3125 13.875H15.75V11.875H22.3125V13.875ZM26.25 8.875H15.75V6.875H26.25V8.875ZM6.5625 2.625C5.09644 2.625 3.9375 3.78394 3.9375 5.25C3.9375 6.71606 5.09644 7.875 6.5625 7.875C8.02856 7.875 9.1875 6.71606 9.1875 5.25C9.1875 3.78394 8.02856 2.625 6.5625 2.625ZM26.25 3.9375H15.75V1.875H26.25V3.9375Z",
pf55c6c0: "M17.7084 0H7.29215C7.29215 0 0 6.94662 0 15.0534C0 19.6835 3.13586 22 5.2081 22H19.7919C21.8728 22 25 19.6833 25 15.0534C25 6.94662 17.7078 0 17.7078 0H17.7084ZM13.5407 16.093V17.947H11.4598L11.4596 16.0992C9.92584 15.7822 8.96241 14.7302 8.89404 13.2026H10.6986C10.7869 14.0044 11.5139 14.521 12.5658 14.521C13.535 14.521 14.222 13.9982 14.222 13.2535C14.222 12.6197 13.7773 12.2583 12.6827 11.9859L11.5224 11.7103C9.89743 11.3331 9.09924 10.3919 9.09924 8.88024C9.09924 7.36862 10.0058 6.27833 11.4483 5.92022V4.05337H13.5292V5.9231C14.9374 6.27172 15.8754 7.33965 15.9209 8.77521L14.1792 8.77543C14.0909 7.99265 13.4351 7.46986 12.5344 7.46986C11.6336 7.46986 10.9835 7.95155 10.9835 8.70582C10.9835 9.31752 11.4083 9.65662 12.4544 9.91637L13.5292 10.1699C15.3222 10.5882 16.0947 11.4375 16.0947 12.9873C16.0949 14.6446 15.1371 15.7539 13.5407 16.093L13.5407 16.093Z",
}

```

## src/imports/SideNavigation/index.tsx
```tsx
import svgPaths from "./svg-f1xrl8hk74";
import imgKeenanLogo1 from "./268260c7c4b29dd81e298ecb1511858d1fbd3c50.png";
import { imgBkgd, imgBkgd1 } from "./svg-dkenc";

function Header() {
  return (
    <div className="[word-break:break-word] absolute bg-[#82479d] content-stretch drop-shadow-[0px_8px_8px_rgba(0,0,0,0.15)] flex font-['Open_Sans:Light',sans-serif] font-light items-center justify-between left-0 px-[117px] py-[16px] right-0 text-white top-0 whitespace-nowrap" data-name="header">
      <p className="leading-[0] relative shrink-0 text-[36px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        <span className="leading-[normal]">{`Javelina `}</span>
        <span className="font-['Open_Sans:SemiBold',sans-serif] font-semibold leading-[normal]" style={{ fontVariationSettings: '"wdth" 100' }}>
          Design System
        </span>
      </p>
      <p className="leading-[normal] relative shrink-0 text-[20px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Inputs
      </p>
      <p className="leading-[normal] relative shrink-0 text-[20px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Version 2.0
      </p>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Mask Group">
      <div className="absolute bg-white h-[110px] left-0 top-0 w-[1440px]" />
    </div>
  );
}

function MaskGroup1() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Mask Group">
      <div className="absolute bg-white h-[110px] left-0 top-0 w-[1440px]" />
    </div>
  );
}

function Group() {
  return (
    <div className="h-[54px] relative shrink-0 w-[240px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 240 54">
        <g id="Group 1">
          <rect fill="var(--fill-0, #82479D)" height="44.0816" id="Rectangle" width="82.33" x="48.7485" />
          <path d={svgPaths.p3cfc9d00} fill="var(--fill-0, #BED34F)" id="Combined Shape" />
          <g id="Health Insurance">
            <path d={svgPaths.pd6a2880} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p15ba9c00} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p3bff9900} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p4f5e480} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p26346b00} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p2f325480} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.pb20da00} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p2de3d800} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p364197c0} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p3ea74670} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p3affbb00} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p21ef200} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p42b2650} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p261f0380} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p2eca6600} fill="var(--fill-0, #263154)" />
          </g>
          <g id="A M">
            <path d={svgPaths.p10761f00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p205881f0} fill="var(--fill-0, white)" />
          </g>
          <path clipRule="evenodd" d={svgPaths.p28b6ee00} fill="var(--fill-0, white)" fillRule="evenodd" id="Path 2" />
        </g>
      </svg>
    </div>
  );
}

function Frame16() {
  return (
    <div className="[word-break:break-word] absolute content-stretch flex flex-col items-end leading-[normal] right-[112px] text-right top-[33px] whitespace-nowrap">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 text-[#82479d] text-[18px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        A1M Health Insurance TPA
      </p>
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[#565962] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Member Portal
      </p>
    </div>
  );
}

function GlobalHeader() {
  return (
    <div className="absolute h-[110px] right-0 top-0 w-[1440px]" data-name="Global Header">
      <MaskGroup />
      <MaskGroup1 />
      <div className="absolute content-stretch flex flex-col h-[86px] items-start justify-center left-[112px] top-[12px]" data-name="Logo">
        <Group />
      </div>
      <Frame16 />
    </div>
  );
}

function Group1() {
  return (
    <div className="h-[40.05px] relative shrink-0 w-[178px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 178 40.0501">
        <g id="Group 1">
          <rect fill="var(--fill-0, #82479D)" height="32.6939" id="Rectangle" width="61.0615" x="36.1552" />
          <path d={svgPaths.p1c04ec0} fill="var(--fill-0, #BED34F)" id="Combined Shape" />
          <g id="Health Insurance">
            <path d={svgPaths.p15562400} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p3bf1f380} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p2b918a30} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p39466b40} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p21bc7e00} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p2f526270} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p2a0ac600} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p3c127600} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p17c607e0} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p24996380} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p18b9eca0} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p1dfac600} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p7a3d8f2} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p3ee2c900} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p37688980} fill="var(--fill-0, #263154)" />
          </g>
          <g id="A M">
            <path d={svgPaths.p29d99100} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2a3d6080} fill="var(--fill-0, white)" />
          </g>
          <path clipRule="evenodd" d={svgPaths.p16ba19c0} fill="var(--fill-0, white)" fillRule="evenodd" id="Path 2" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col gap-[10px] h-[281px] items-center justify-center relative shrink-0 w-[1735px]">
      <div className="h-[110px] relative shrink-0 w-[1440px]" data-name="Global Header">
        <GlobalHeader />
      </div>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] text-center w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Header has center aligned container
      </p>
      <div className="bg-white h-[64px] relative shrink-0 w-[375px]" data-name="Global Header">
        <div className="absolute content-stretch flex flex-col inset-[12.5%_47.73%_12.5%_4.27%] items-start justify-center" data-name="Logo">
          <Group1 />
        </div>
      </div>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] text-center w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Unsecured Mobile Header
      </p>
    </div>
  );
}

function Header1() {
  return (
    <div className="absolute inset-[72.73%_0.28%_27.27%_0]" data-name="Header">
      <div className="absolute inset-[-0.5px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1437 1">
          <g id="Header">
            <path d="M0.5 0.5H1436.5" id="Line 2" stroke="var(--stroke-0, #E2E2E2)" strokeLinecap="square" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="absolute inset-[25.64%_13.33%_59.44%_85.56%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-8px_-8.205px] mask-size-[32px_32.821px]" style={{ maskImage: `url("${imgBkgd}")` }} data-name="avatar">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16.4107">
        <g id="avatar">
          <path clipRule="evenodd" d={svgPaths.p2f6205e8} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 1" />
          <path clipRule="evenodd" d={svgPaths.p283c2600} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 3" />
        </g>
      </svg>
    </div>
  );
}

function CircleImageSmall() {
  return (
    <div className="absolute contents inset-[16.32%_12.64%_50.12%_84.86%]" data-name="circle image small">
      <div className="absolute bg-[#e87823] inset-[16.32%_12.64%_50.12%_84.86%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[2px_2.052px] mask-size-[32px_32.821px] rounded-[100px]" style={{ maskImage: `url("${imgBkgd}")` }} data-name="bkgd" />
      <Avatar />
    </div>
  );
}

function Identity() {
  return (
    <div className="absolute contents inset-[18.18%_12.78%_51.98%_85%]" data-name="Identity">
      <CircleImageSmall />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents left-[1224px] top-[20px]">
      <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[24.55%_7.78%_59.09%_87.78%] leading-[normal] text-[#333] text-[13px] text-right" style={{ fontVariationSettings: '"wdth" 100' }}>
        Hi, Dennis
      </p>
      <div className="absolute left-[1336px] size-[24px] top-[24px]" data-name="arrow main">
        <div className="absolute bottom-[37.48%] left-1/4 right-[25.61%] top-[33.33%]" data-name="Fill 1">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8529 7.00438">
            <path clipRule="evenodd" d={svgPaths.p2be5a800} fill="var(--fill-0, #818285)" fillRule="evenodd" id="Fill 1" />
          </svg>
        </div>
      </div>
      <Identity />
    </div>
  );
}

function Layer() {
  return (
    <div className="absolute inset-[1.92%_5.02%_5.19%_5.08%]" data-name="Layer 1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.09024 7.43104">
        <g id="Layer 1">
          <path d={svgPaths.p2b0ed700} fill="url(#paint0_linear_10_3896)" id="Vector" />
          <path d={svgPaths.p3425f6f0} fill="url(#paint1_linear_10_3896)" id="Vector_2" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10_3896" x1="4.04512" x2="4.04512" y1="0" y2="7.43104">
            <stop stopColor="#5B2540" />
            <stop offset="0.0001" stopColor="#5B2540" />
            <stop offset="1" stopColor="#5B2540" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10_3896" x1="4.24569" x2="4.24569" y1="1.69388" y2="5.72259">
            <stop stopColor="#5B2540" />
            <stop offset="0.0001" stopColor="#5B2540" />
            <stop offset="1" stopColor="#5B2540" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Layer1() {
  return (
    <div className="absolute contents inset-[1.92%_5.02%_5.19%_5.08%]" data-name="Layer 2">
      <Layer />
    </div>
  );
}

function Asset() {
  return (
    <div className="absolute inset-[34.38%_20.83%_53.13%_75.42%] overflow-clip" data-name="Asset 2 1">
      <Layer1 />
    </div>
  );
}

function MaskGroup2() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Mask Group">
      <div className="absolute bg-white h-[110px] left-0 top-0 w-[1440px]" />
    </div>
  );
}

function MaskGroup3() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Mask Group">
      <div className="absolute bg-white h-[110px] left-0 top-0 w-[1440px]" />
    </div>
  );
}

function Avatar1() {
  return (
    <div className="absolute inset-1/4 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-8px_-8px] mask-size-[32px_32px]" style={{ maskImage: `url("${imgBkgd1}")` }} data-name="avatar">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16.0012">
        <g id="avatar">
          <path clipRule="evenodd" d={svgPaths.p211de5d0} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 1" />
          <path clipRule="evenodd" d={svgPaths.paf15100} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 3" />
        </g>
      </svg>
    </div>
  );
}

function CircleImageSmall1() {
  return (
    <div className="absolute contents inset-[-6.25%]" data-name="circle image small">
      <div className="absolute bg-[#df126c] inset-[-6.25%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[2px_2px] mask-size-[32px_32px] rounded-[100px]" style={{ maskImage: `url("${imgBkgd1}")` }} data-name="bkgd" />
      <Avatar1 />
    </div>
  );
}

function Identity1() {
  return (
    <div className="absolute contents inset-0" data-name="Identity">
      <div className="absolute bg-[#df126c] inset-0 rounded-[100px]" data-name="Mask" />
      <CircleImageSmall1 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Open_Sans:Regular',sans-serif] font-normal items-start leading-[normal] relative shrink-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#333] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Hi, Jennifer
      </p>
      <p className="relative shrink-0 text-[#666] text-[12px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Employer
      </p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[32px]" data-name="icon">
        <Identity1 />
      </div>
      <Frame15 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <Frame14 />
      <div className="relative shrink-0 size-[16px]" data-name="icon">
        <div className="absolute inset-[31.25%_13.42%_26.07%_12.5%]" data-name="Fill 1">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8529 6.82927">
            <path clipRule="evenodd" d={svgPaths.p222fb280} fill="var(--fill-0, #999999)" fillRule="evenodd" id="Fill 1" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex items-start px-[10px] py-[4px] relative rounded-[6px] shrink-0">
      <div aria-hidden className="absolute border border-[#666] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#666] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        For Employers
      </p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0">
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[105.87450408935547%] relative shrink-0 text-[#666] text-[18px] tracking-[1.5px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        ADMIN CENTER
      </p>
      <Frame11 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex gap-[24px] items-center left-[990px] top-[29px]">
      <Frame7 />
      <div className="flex h-[51px] items-center justify-center relative shrink-0 w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[51px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51 1">
                <line id="Line 37" stroke="var(--stroke-0, #999999)" x2="51" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame12 />
    </div>
  );
}

function MaskGroup4() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Mask Group">
      <div className="absolute bg-white h-[110px] left-0 top-0 w-[1440px]" />
    </div>
  );
}

function Header2() {
  return (
    <div className="absolute h-[110px] left-0 top-0 w-[1440px]" data-name="Header 2">
      <MaskGroup4 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-end justify-center leading-[normal] relative shrink-0 text-right whitespace-nowrap">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 text-[#82479d] text-[18px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        A1M Health Insurance TPA
      </p>
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[#565962] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        For Member
      </p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="bg-[rgba(10,117,147,0.2)] content-stretch flex items-center justify-center relative rounded-[31px] shrink-0 size-[32px]">
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[32px]" data-name="icon 32x32">
        <div className="h-[15px] relative shrink-0 w-[10px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 15">
            <path d={svgPaths.p209d5200} fill="var(--fill-0, #0A7593)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <Frame19 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="bg-[rgba(10,117,147,0.2)] content-stretch flex items-center justify-center relative rounded-[31px] shrink-0 size-[32px]">
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[32px]" data-name="icon 32x32">
        <div className="h-[18px] relative shrink-0 w-[14px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 18">
            <g id="Vector">
              <path d={svgPaths.p3f8ec680} fill="var(--fill-0, #0A7593)" />
              <path d={svgPaths.p1d1a0700} fill="var(--fill-0, #0A7593)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <Frame21 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="bg-[#df126c] content-stretch flex items-center justify-center relative rounded-[31px] shrink-0 size-[32px]">
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-right text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        SJ
      </p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <Frame23 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[8px] items-center justify-end right-[87px] top-[calc(50%+0.5px)]">
      <Frame18 />
      <div className="flex h-[51px] items-center justify-center relative shrink-0 w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[51px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51 1">
                <line id="Line 37" stroke="var(--stroke-0, #999999)" x2="51" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame8 />
      <Frame20 />
      <Frame22 />
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
        <div className="h-[3px] relative shrink-0 w-[6px]">
          <div className="absolute inset-[-11.79%_-5.89%_-23.57%_-5.89%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.70711 4.06066">
              <g id="Vector 8">
                <path d={svgPaths.p1fd2af40} stroke="var(--stroke-0, #6B6F7A)" />
                <path d={svgPaths.p1fd2af40} stroke="var(--stroke-1, black)" strokeOpacity="0.2" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="h-[54px] relative shrink-0 w-[240px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 240 54">
        <g id="Group 1">
          <rect fill="var(--fill-0, #82479D)" height="44.0816" id="Rectangle" width="82.33" x="48.7485" />
          <path d={svgPaths.p3cfc9d00} fill="var(--fill-0, #BED34F)" id="Combined Shape" />
          <g id="Health Insurance">
            <path d={svgPaths.pd6a2880} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p15ba9c00} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p3bff9900} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p4f5e480} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p26346b00} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p2f325480} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.pb20da00} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p2de3d800} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p364197c0} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p3ea74670} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p3affbb00} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p21ef200} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p42b2650} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p261f0380} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p2eca6600} fill="var(--fill-0, #263154)" />
          </g>
          <g id="A M">
            <path d={svgPaths.p10761f00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p205881f0} fill="var(--fill-0, white)" />
          </g>
          <path clipRule="evenodd" d={svgPaths.p28b6ee00} fill="var(--fill-0, white)" fillRule="evenodd" id="Path 2" />
        </g>
      </svg>
    </div>
  );
}

function Group6() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-white col-1 h-[4px] ml-0 mt-0 relative row-1 w-[30px]" data-name="Rectangle" />
      <div className="bg-white col-1 h-[4px] ml-0 mt-[10px] relative row-1 w-[30px]" data-name="Rectangle Copy 8" />
      <div className="bg-white col-1 h-[4px] ml-0 mt-[20px] relative row-1 w-[30px]" data-name="Rectangle Copy 9" />
    </div>
  );
}

function Group3() {
  return (
    <div className="h-[40.05px] relative shrink-0 w-[178px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 178 40.0501">
        <g id="Group 1">
          <rect fill="var(--fill-0, #82479D)" height="32.6939" id="Rectangle" width="61.0615" x="36.1552" />
          <path d={svgPaths.p1c04ec0} fill="var(--fill-0, #BED34F)" id="Combined Shape" />
          <g id="Health Insurance">
            <path d={svgPaths.p15562400} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p3bf1f380} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p2b918a30} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p39466b40} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p21bc7e00} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p2f526270} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p2a0ac600} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p3c127600} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p17c607e0} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p24996380} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p18b9eca0} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p1dfac600} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p7a3d8f2} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p3ee2c900} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p37688980} fill="var(--fill-0, #263154)" />
          </g>
          <g id="A M">
            <path d={svgPaths.p29d99100} fill="var(--fill-0, white)" />
            <path d={svgPaths.p2a3d6080} fill="var(--fill-0, white)" />
          </g>
          <path clipRule="evenodd" d={svgPaths.p16ba19c0} fill="var(--fill-0, white)" fillRule="evenodd" id="Path 2" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col gap-[10px] h-[265px] items-center justify-center relative shrink-0 w-[1735px]">
      <div className="h-[110px] relative shrink-0 w-[1440px]" data-name="Global Header">
        <Header1 />
        <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] left-[26.81%] right-[62.99%] text-[#333] text-[18px] top-[calc(50%-27px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          MEMBER PORTAL
        </p>
        <Group7 />
        <div className="absolute h-[64px] left-[144px] overflow-clip top-[8px] w-[240px]" data-name="Logo">
          <div className="absolute inset-[9.38%_24.58%_9.38%_-1.67%]" data-name="Keenan-Logo 1">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgKeenanLogo1} />
          </div>
          <Asset />
        </div>
        <div className="absolute h-[110px] left-0 top-0 w-[1440px]" data-name="Global Header">
          <div className="absolute h-[110px] left-0 top-0 w-[1440px]" data-name="Global Header">
            <MaskGroup2 />
            <MaskGroup3 />
            <Frame13 />
            <div className="absolute inset-[21.82%_72.99%_20%_10.35%] overflow-clip" data-name="Logo">
              <div className="absolute inset-[9.38%_24.58%_9.38%_-1.67%]" data-name="Keenan-Logo 1">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgKeenanLogo1} />
              </div>
            </div>
            <Header2 />
          </div>
        </div>
        <Frame17 />
        <div className="absolute content-stretch flex flex-col h-[86px] items-start justify-center left-[146px] top-[12px]" data-name="Logo">
          <Group2 />
        </div>
      </div>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] text-center w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Header has left aligned container with 56px margin away from navigation bar
      </p>
      <div className="bg-white h-[64px] relative shrink-0 w-[375px]" data-name="Global Header">
        <div className="absolute bg-[#82479d] inset-[0_82.93%_0_0]" />
        <div className="absolute content-stretch flex inset-[18.75%_86.13%_18.75%_3.2%] items-center justify-center px-[4px] py-[3px]" data-name="icon 40x40">
          <Group6 />
        </div>
        <div className="absolute content-stretch flex flex-col inset-[12.5%_30.67%_12.5%_21.33%] items-start justify-center" data-name="Logo">
          <Group3 />
        </div>
      </div>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] text-center w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Secured Mobile Header
      </p>
    </div>
  );
}

function Header3() {
  return (
    <div className="absolute inset-[72.73%_0.28%_27.27%_0]" data-name="Header">
      <div className="absolute inset-[-0.5px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1437 1">
          <g id="Header">
            <path d="M0.5 0.5H1436.5" id="Line 2" stroke="var(--stroke-0, #E2E2E2)" strokeLinecap="square" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Avatar2() {
  return (
    <div className="absolute inset-[25.64%_13.33%_59.44%_85.56%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-8px_-8.205px] mask-size-[32px_32.821px]" style={{ maskImage: `url("${imgBkgd}")` }} data-name="avatar">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16.4107">
        <g id="avatar">
          <path clipRule="evenodd" d={svgPaths.p2f6205e8} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 1" />
          <path clipRule="evenodd" d={svgPaths.p283c2600} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 3" />
        </g>
      </svg>
    </div>
  );
}

function CircleImageSmall2() {
  return (
    <div className="absolute contents inset-[16.32%_12.64%_50.12%_84.86%]" data-name="circle image small">
      <div className="absolute bg-[#e87823] inset-[16.32%_12.64%_50.12%_84.86%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[2px_2.052px] mask-size-[32px_32.821px] rounded-[100px]" style={{ maskImage: `url("${imgBkgd}")` }} data-name="bkgd" />
      <Avatar2 />
    </div>
  );
}

function Identity2() {
  return (
    <div className="absolute contents inset-[18.18%_12.78%_51.98%_85%]" data-name="Identity">
      <CircleImageSmall2 />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents left-[1224px] top-[20px]">
      <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[24.55%_7.78%_59.09%_87.78%] leading-[normal] text-[#333] text-[13px] text-right" style={{ fontVariationSettings: '"wdth" 100' }}>
        Hi, Dennis
      </p>
      <div className="absolute left-[1336px] size-[24px] top-[24px]" data-name="arrow main">
        <div className="absolute bottom-[37.48%] left-1/4 right-[25.61%] top-[33.33%]" data-name="Fill 1">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8529 7.00438">
            <path clipRule="evenodd" d={svgPaths.p2be5a800} fill="var(--fill-0, #818285)" fillRule="evenodd" id="Fill 1" />
          </svg>
        </div>
      </div>
      <Identity2 />
    </div>
  );
}

function Layer3() {
  return (
    <div className="absolute inset-[1.92%_5.02%_5.19%_5.08%]" data-name="Layer 1">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.09024 7.43104">
        <g id="Layer 1">
          <path d={svgPaths.p2b0ed700} fill="url(#paint0_linear_10_3896)" id="Vector" />
          <path d={svgPaths.p3425f6f0} fill="url(#paint1_linear_10_3896)" id="Vector_2" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10_3896" x1="4.04512" x2="4.04512" y1="0" y2="7.43104">
            <stop stopColor="#5B2540" />
            <stop offset="0.0001" stopColor="#5B2540" />
            <stop offset="1" stopColor="#5B2540" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10_3896" x1="4.24569" x2="4.24569" y1="1.69388" y2="5.72259">
            <stop stopColor="#5B2540" />
            <stop offset="0.0001" stopColor="#5B2540" />
            <stop offset="1" stopColor="#5B2540" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Layer2() {
  return (
    <div className="absolute contents inset-[1.92%_5.02%_5.19%_5.08%]" data-name="Layer 2">
      <Layer3 />
    </div>
  );
}

function Asset1() {
  return (
    <div className="absolute inset-[34.38%_20.83%_53.13%_75.42%] overflow-clip" data-name="Asset 2 1">
      <Layer2 />
    </div>
  );
}

function MaskGroup5() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Mask Group">
      <div className="absolute bg-white h-[110px] left-0 top-0 w-[1440px]" />
    </div>
  );
}

function MaskGroup6() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Mask Group">
      <div className="absolute bg-white h-[110px] left-0 top-0 w-[1440px]" />
    </div>
  );
}

function Avatar3() {
  return (
    <div className="absolute inset-1/4 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-8px_-8px] mask-size-[32px_32px]" style={{ maskImage: `url("${imgBkgd1}")` }} data-name="avatar">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16.0012">
        <g id="avatar">
          <path clipRule="evenodd" d={svgPaths.p211de5d0} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 1" />
          <path clipRule="evenodd" d={svgPaths.paf15100} fill="var(--fill-0, white)" fillRule="evenodd" id="Fill 3" />
        </g>
      </svg>
    </div>
  );
}

function CircleImageSmall3() {
  return (
    <div className="absolute contents inset-[-6.25%]" data-name="circle image small">
      <div className="absolute bg-[#df126c] inset-[-6.25%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[2px_2px] mask-size-[32px_32px] rounded-[100px]" style={{ maskImage: `url("${imgBkgd1}")` }} data-name="bkgd" />
      <Avatar3 />
    </div>
  );
}

function Identity3() {
  return (
    <div className="absolute contents inset-0" data-name="Identity">
      <div className="absolute bg-[#df126c] inset-0 rounded-[100px]" data-name="Mask" />
      <CircleImageSmall3 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Open_Sans:Regular',sans-serif] font-normal items-start leading-[normal] relative shrink-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#333] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Hi, Jennifer
      </p>
      <p className="relative shrink-0 text-[#666] text-[12px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Employer
      </p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[32px]" data-name="icon">
        <Identity3 />
      </div>
      <Frame26 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <Frame25 />
      <div className="relative shrink-0 size-[16px]" data-name="icon">
        <div className="absolute inset-[31.25%_13.42%_26.07%_12.5%]" data-name="Fill 1">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8529 6.82927">
            <path clipRule="evenodd" d={svgPaths.p222fb280} fill="var(--fill-0, #999999)" fillRule="evenodd" id="Fill 1" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex items-start px-[10px] py-[4px] relative rounded-[6px] shrink-0">
      <div aria-hidden className="absolute border border-[#666] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#666] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        For Employers
      </p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0">
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[105.87450408935547%] relative shrink-0 text-[#666] text-[18px] tracking-[1.5px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        ADMIN CENTER
      </p>
      <Frame28 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="absolute content-stretch flex gap-[24px] items-center left-[990px] top-[29px]">
      <Frame9 />
      <div className="flex h-[51px] items-center justify-center relative shrink-0 w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[51px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51 1">
                <line id="Line 37" stroke="var(--stroke-0, #999999)" x2="51" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame27 />
    </div>
  );
}

function MaskGroup7() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Mask Group">
      <div className="absolute bg-white h-[110px] left-0 top-0 w-[1440px]" />
    </div>
  );
}

function Header4() {
  return (
    <div className="absolute h-[110px] left-0 top-0 w-[1440px]" data-name="Header 2">
      <MaskGroup7 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-end justify-center leading-[normal] relative shrink-0 text-right whitespace-nowrap">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 text-[#82479d] text-[18px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        A1M Health Insurance TPA
      </p>
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[#565962] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Member Portal
      </p>
    </div>
  );
}

function Frame31() {
  return (
    <div className="bg-[rgba(10,117,147,0.2)] content-stretch flex items-center justify-center relative rounded-[31px] shrink-0 size-[32px]">
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[32px]" data-name="icon 32x32">
        <div className="h-[15px] relative shrink-0 w-[10px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 15">
            <path d={svgPaths.p209d5200} fill="var(--fill-0, #0A7593)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <Frame31 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="bg-[rgba(10,117,147,0.2)] content-stretch flex items-center justify-center relative rounded-[31px] shrink-0 size-[32px]">
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[32px]" data-name="icon 32x32">
        <div className="h-[18px] relative shrink-0 w-[14px]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 18">
            <g id="Vector">
              <path d={svgPaths.p3f8ec680} fill="var(--fill-0, #0A7593)" />
              <path d={svgPaths.p1d1a0700} fill="var(--fill-0, #0A7593)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <Frame33 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="bg-[#df126c] content-stretch flex items-center justify-center relative rounded-[31px] shrink-0 size-[32px]">
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-right text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        SJ
      </p>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <Frame35 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[8px] items-center justify-end right-[87px] top-[calc(50%+0.5px)]">
      <Frame30 />
      <div className="flex h-[51px] items-center justify-center relative shrink-0 w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[51px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51 1">
                <line id="Line 37" stroke="var(--stroke-0, #999999)" x2="51" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame10 />
      <Frame32 />
      <Frame34 />
      <div className="content-stretch flex items-center justify-center px-[4px] py-[3px] relative shrink-0 size-[16px]" data-name="icon 16x16">
        <div className="h-[3px] relative shrink-0 w-[6px]">
          <div className="absolute inset-[-11.79%_-5.89%_-23.57%_-5.89%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.70711 4.06066">
              <g id="Vector 8">
                <path d={svgPaths.p1fd2af40} stroke="var(--stroke-0, #6B6F7A)" />
                <path d={svgPaths.p1fd2af40} stroke="var(--stroke-1, black)" strokeOpacity="0.2" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="h-[54px] relative shrink-0 w-[240px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 240 54">
        <g id="Group 1">
          <rect fill="var(--fill-0, #82479D)" height="44.0816" id="Rectangle" width="82.33" x="48.7485" />
          <path d={svgPaths.p3cfc9d00} fill="var(--fill-0, #BED34F)" id="Combined Shape" />
          <g id="Health Insurance">
            <path d={svgPaths.pd6a2880} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p15ba9c00} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p3bff9900} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p4f5e480} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p26346b00} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p2f325480} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.pb20da00} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p2de3d800} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p364197c0} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p3ea74670} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p3affbb00} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p21ef200} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p42b2650} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p261f0380} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p2eca6600} fill="var(--fill-0, #263154)" />
          </g>
          <g id="A M">
            <path d={svgPaths.p10761f00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p205881f0} fill="var(--fill-0, white)" />
          </g>
          <path clipRule="evenodd" d={svgPaths.p28b6ee00} fill="var(--fill-0, white)" fillRule="evenodd" id="Path 2" />
        </g>
      </svg>
    </div>
  );
}

function Frame36() {
  return (
    <div className="bg-[#df126c] content-stretch flex items-center justify-center relative rounded-[31px] shrink-0 size-[40px]">
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-right text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        SJ
      </p>
    </div>
  );
}

function Frame40() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] relative shrink-0 text-[#565962] whitespace-nowrap">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Dr. Stevenson, Jennifer
      </p>
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[12px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Providers
      </p>
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex gap-[10px] items-center p-[16px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0">
      <div aria-hidden className="absolute border-[#e7e7e7] border-b border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      <Frame36 />
      <Frame40 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex items-start px-[16px] py-[10px] relative shrink-0 w-[237px]">
      <div aria-hidden className="absolute border-[#e7e7e7] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0a7593] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        My Profile
      </p>
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex items-start px-[16px] py-[10px] relative shrink-0 w-[237px]">
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0a7593] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Logout
      </p>
    </div>
  );
}

function ProfileDropDown() {
  return (
    <div className="bg-white col-1 content-stretch drop-shadow-[0px_0px_4px_rgba(0,0,0,0.25)] flex flex-col items-start justify-center ml-[1114px] mt-[82.5px] relative rounded-[4px] row-1" data-name="Profile DropDown">
      <Frame42 />
      <Frame43 />
      <Frame44 />
    </div>
  );
}

function Group8() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 h-[110px] ml-0 mt-0 relative row-1 w-[1440px]" data-name="Global Header">
        <Header3 />
        <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] left-[26.81%] right-[62.99%] text-[#333] text-[18px] top-[calc(50%-27px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          MEMBER PORTAL
        </p>
        <Group9 />
        <div className="absolute h-[64px] left-[144px] overflow-clip top-[8px] w-[240px]" data-name="Logo">
          <div className="absolute inset-[9.38%_24.58%_9.38%_-1.67%]" data-name="Keenan-Logo 1">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgKeenanLogo1} />
          </div>
          <Asset1 />
        </div>
        <div className="absolute h-[110px] left-0 top-0 w-[1440px]" data-name="Global Header">
          <div className="absolute h-[110px] left-0 top-0 w-[1440px]" data-name="Global Header">
            <MaskGroup5 />
            <MaskGroup6 />
            <Frame24 />
            <div className="absolute inset-[21.82%_72.99%_20%_10.35%] overflow-clip" data-name="Logo">
              <div className="absolute inset-[9.38%_24.58%_9.38%_-1.67%]" data-name="Keenan-Logo 1">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgKeenanLogo1} />
              </div>
            </div>
            <Header4 />
          </div>
        </div>
        <Frame29 />
        <div className="absolute content-stretch flex flex-col h-[86px] items-start justify-center left-[146px] top-[12px]" data-name="Logo">
          <Group4 />
        </div>
      </div>
      <ProfileDropDown />
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[301px] items-center justify-center relative shrink-0 w-[1735px]">
      <Group8 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="bg-[#df126c] content-stretch flex items-center justify-center relative rounded-[31px] shrink-0 size-[40px]">
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-right text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        SJ
      </p>
    </div>
  );
}

function Frame41() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] relative shrink-0 text-[#565962] whitespace-nowrap">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Dr. Stevenson, Jennifer
      </p>
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[12px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Providers
      </p>
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex gap-[10px] items-center p-[16px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0">
      <div aria-hidden className="absolute border-[#e7e7e7] border-b border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      <Frame37 />
      <Frame41 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex items-start px-[16px] py-[10px] relative shrink-0 w-[237px]">
      <div aria-hidden className="absolute border-[#e7e7e7] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0a7593] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        My Profile
      </p>
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex items-start px-[16px] py-[10px] relative shrink-0 w-[237px]">
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0a7593] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Logout
      </p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[255px] items-center justify-center relative shrink-0 w-[342px]">
      <div className="bg-white content-stretch drop-shadow-[0px_0px_4px_rgba(0,0,0,0.25)] flex flex-col items-start justify-center relative rounded-[4px] shrink-0" data-name="Profile DropDown">
        <Frame45 />
        <Frame46 />
        <Frame47 />
      </div>
    </div>
  );
}

function Frame38() {
  return (
    <div className="bg-[#df126c] content-stretch flex items-center justify-center relative rounded-[31px] shrink-0 size-[40px]">
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-right text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        SJ
      </p>
    </div>
  );
}

function Frame49() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] relative shrink-0 text-[#565962] whitespace-nowrap">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Dr. Stevenson, Jennifer
      </p>
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[12px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Providers
      </p>
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex gap-[10px] items-center p-[16px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0">
      <div aria-hidden className="absolute border-[#e7e7e7] border-b border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      <Frame38 />
      <Frame49 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="bg-[rgba(38,49,84,0.1)] content-stretch flex items-start px-[16px] py-[10px] relative shrink-0 w-[237px]">
      <div aria-hidden className="absolute border-[#e7e7e7] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0a7593] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        My Profile
      </p>
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex items-start px-[16px] py-[10px] relative shrink-0 w-[237px]">
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0a7593] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Logout
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[255px] items-center justify-center relative shrink-0 w-[342px]">
      <div className="bg-white content-stretch drop-shadow-[0px_0px_4px_rgba(0,0,0,0.25)] flex flex-col items-start justify-center relative rounded-[4px] shrink-0" data-name="Profile DropDown">
        <Frame48 />
        <Frame50 />
        <Frame51 />
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="bg-[#df126c] content-stretch flex items-center justify-center relative rounded-[31px] shrink-0 size-[40px]">
      <p className="[word-break:break-word] font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[14px] text-right text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        SJ
      </p>
    </div>
  );
}

function Frame53() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[normal] relative shrink-0 text-[#565962] whitespace-nowrap">
      <p className="font-['Open_Sans:SemiBold',sans-serif] font-semibold relative shrink-0 text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Dr. Stevenson, Jennifer
      </p>
      <p className="font-['Open_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[12px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Providers
      </p>
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex gap-[10px] items-center p-[16px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0">
      <div aria-hidden className="absolute border-[#e7e7e7] border-b border-solid inset-0 pointer-events-none rounded-tl-[4px] rounded-tr-[4px]" />
      <Frame39 />
      <Frame53 />
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex items-start px-[16px] py-[10px] relative shrink-0 w-[237px]">
      <div aria-hidden className="absolute border-2 border-[rgba(10,117,147,0.3)] border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0a7593] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        My Profile
      </p>
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex items-start px-[16px] py-[10px] relative shrink-0 w-[237px]">
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#0a7593] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Logout
      </p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-[rgba(10,117,147,0.1)] content-stretch flex flex-col h-[255px] items-center justify-center relative shrink-0 w-[342px]">
      <div className="bg-white content-stretch drop-shadow-[0px_0px_4px_rgba(0,0,0,0.25)] flex flex-col items-start justify-center relative rounded-[4px] shrink-0" data-name="Profile DropDown">
        <Frame52 />
        <Frame54 />
        <Frame55 />
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="h-[54px] relative shrink-0 w-[240px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 240 54">
        <g id="Group 1">
          <rect fill="var(--fill-0, #82479D)" height="44.0816" id="Rectangle" width="82.33" x="48.7485" />
          <path d={svgPaths.p3cfc9d00} fill="var(--fill-0, #BED34F)" id="Combined Shape" />
          <g id="Health Insurance">
            <path d={svgPaths.pd6a2880} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p15ba9c00} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p3bff9900} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p4f5e480} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p26346b00} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p2f325480} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.pb20da00} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p2de3d800} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p364197c0} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p3ea74670} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p3affbb00} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p21ef200} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p42b2650} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p261f0380} fill="var(--fill-0, #263154)" />
            <path d={svgPaths.p2eca6600} fill="var(--fill-0, #263154)" />
          </g>
          <g id="A M">
            <path d={svgPaths.p10761f00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p205881f0} fill="var(--fill-0, white)" />
          </g>
          <path clipRule="evenodd" d={svgPaths.p28b6ee00} fill="var(--fill-0, white)" fillRule="evenodd" id="Path 2" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[2269px] items-start left-[107px] top-[133px]">
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Header
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Header is a robust component offering standardized branding, navigation, search, notifications and profile utility.
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] w-[314px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Variations
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Unsecured
      </p>
      <Frame1 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Secured
      </p>
      <Frame2 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] w-[314px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Profile DropDown
      </p>
      <Frame3 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] w-[314px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        States
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Default
      </p>
      <Frame4 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Hover
      </p>
      <Frame5 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Focused
      </p>
      <Frame6 />
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[#212529] text-[32px] w-[314px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Logo
      </p>
      <p className="[word-break:break-word] font-['Open_Sans:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[#212529] text-[16px] w-[1211px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        Logo should be configured within Width 240px and Height 86px
      </p>
      <div className="content-stretch flex flex-col h-[86px] items-start justify-center relative shrink-0" data-name="Logo">
        <Group5 />
      </div>
    </div>
  );
}

export default function SideNavigation() {
  return (
    <div className="bg-white relative size-full" data-name="Side Navigation">
      <Header />
      <Frame />
    </div>
  );
}
```

## src/imports/SideNavigation/svg-dkenc.tsx
```tsx
export const imgBkgd = "data:image/svg+xml,%3Csvg%20preserveAspectRatio%3D%22none%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20overflow%3D%22visible%22%20style%3D%22display%3A%20block%3B%22%20viewBox%3D%220%200%2032%2032.8205%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20id%3D%22Mask%22%20width%3D%2232%22%20height%3D%2232.8205%22%20rx%3D%2216%22%20fill%3D%22var(--fill-0%2C%20black)%22%2F%3E%0A%3C%2Fsvg%3E%0A";
export const imgBkgd1 = "data:image/svg+xml,%3Csvg%20preserveAspectRatio%3D%22none%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20overflow%3D%22visible%22%20style%3D%22display%3A%20block%3B%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20id%3D%22Mask%22%20width%3D%2232%22%20height%3D%2232%22%20rx%3D%2216%22%20fill%3D%22var(--fill-0%2C%20black)%22%2F%3E%0A%3C%2Fsvg%3E%0A";
```

## src/imports/SideNavigation/svg-f1xrl8hk74.ts
```ts
export default {
p10761f00: "M68.9508 27.5957L65.9003 18.7441L62.8498 27.5957H68.9508ZM70.7534 32.8503H61.0472L59.4872 37.47H52.2422L62.1911 10.88H69.6095L79.5584 37.47H72.3134L70.7534 32.8503Z",
p15562400: "M112.035 14.7122H110.635V8.9461H104.291V14.7122H102.89V2.45919H104.291V7.67218H110.635V2.45919H112.035V14.7122Z",
p15ba9c00: "M160.389 20.0627C158.59 20.0627 157.168 19.5053 156.124 18.3903C155.087 17.2753 154.568 15.7272 154.568 13.7459C154.568 11.7495 155.05 10.1637 156.012 8.98851C156.983 7.81329 158.282 7.22568 159.911 7.22568C161.437 7.22568 162.644 7.73796 163.533 8.76251C164.421 9.77953 164.866 11.1243 164.866 12.7967V13.9832H156.479C156.516 15.4372 156.875 16.5408 157.556 17.2942C158.245 18.0475 159.212 18.4242 160.456 18.4242C161.766 18.4242 163.062 18.1455 164.343 17.588V19.2604C163.692 19.5467 163.073 19.7501 162.488 19.8706C161.911 19.9987 161.211 20.0627 160.389 20.0627ZM159.889 8.79641C158.912 8.79641 158.13 9.12035 157.545 9.76823C156.968 10.4161 156.627 11.3126 156.523 12.4577H162.888C162.888 11.2749 162.629 10.3709 162.111 9.74563C161.592 9.11282 160.852 8.79641 159.889 8.79641Z",
p16ba19c0: "M56.4672 9.85849C62.0347 7.99285 66.3162 4.79261 70.3369 0.028717C70.4452 -0.0996122 73.8953 0.200557 73.9169 0.961537C73.9514 2.17775 69.4638 7.74109 63.1204 26.601C62.344 28.9092 61.0762 36.144 61.0762 36.144L53.0276 40.0501C53.0276 40.0501 59.1943 20.0272 66.3162 7.76603C66.5459 7.37067 64.5157 8.87335 56.4672 11.5141V9.85849Z",
p17c607e0: "M123.585 26.9186C123.585 27.7734 123.272 28.4327 122.646 28.8965C122.02 29.3602 121.141 29.5921 120.01 29.5921C118.813 29.5921 117.879 29.3994 117.209 29.0138V27.7232C117.643 27.9466 118.107 28.1226 118.601 28.2512C119.101 28.3797 119.581 28.4439 120.043 28.4439C120.757 28.4439 121.306 28.3294 121.691 28.1003C122.075 27.8656 122.267 27.5108 122.267 27.0359C122.267 26.6783 122.113 26.3738 121.806 26.1224C121.504 25.8654 120.911 25.5636 120.026 25.2172C119.186 24.8987 118.587 24.6222 118.23 24.3875C117.879 24.1473 117.615 23.8763 117.439 23.5746C117.269 23.2728 117.184 22.9125 117.184 22.4934C117.184 21.7447 117.483 21.1552 118.082 20.725C118.681 20.2892 119.502 20.0713 120.545 20.0713C121.518 20.0713 122.468 20.2724 123.396 20.6747L122.91 21.8062C122.004 21.4262 121.182 21.2362 120.447 21.2362C119.798 21.2362 119.31 21.3396 118.98 21.5463C118.651 21.7531 118.486 22.038 118.486 22.4012C118.486 22.6471 118.546 22.8566 118.667 23.0298C118.793 23.203 118.994 23.3678 119.268 23.5243C119.543 23.6807 120.07 23.907 120.85 24.2031C121.921 24.5998 122.643 24.9993 123.017 25.4016C123.396 25.8039 123.585 26.3096 123.585 26.9186Z",
p18b9eca0: "M140.301 20.0713C140.702 20.0713 141.062 20.1048 141.38 20.1719L141.191 21.4625C140.817 21.3787 140.488 21.3368 140.202 21.3368C139.472 21.3368 138.846 21.6385 138.324 22.242C137.808 22.8454 137.549 23.5969 137.549 24.4965V29.4245H136.182V20.2389H137.311L137.467 21.9403H137.533C137.868 21.3424 138.272 20.8815 138.744 20.5574C139.216 20.2333 139.735 20.0713 140.301 20.0713Z",
p1c04ec0: "M20.0869 12.2598H32.1377V20.4336H20.0869V32.6943H12.0527V20.4336H0V12.2598H12.0527V0H20.0869V12.2598Z",
p1d1a0700: "M12.6132 14.5987C13.3787 14.5987 13.9999 14.5472 13.9999 13.7655L14 13.631C14 13.069 13.6767 12.5884 13.2118 12.3597L12.7718 8.48234C12.7718 5.64401 10.8053 3.27533 8.18721 2.7167L8.18743 1.21142C8.18743 0.542526 7.6559 0 7.00045 0C6.3446 0 5.81302 0.54248 5.81302 1.21142V2.71646C3.19489 3.27532 1.22839 5.64401 1.22839 8.48211L0.7884 12.3588C0.323488 12.5872 0 13.0685 0 13.6308V13.7655C0 14.5472 0.620327 14.5987 1.38602 14.5987H12.6132Z",
p1dfac600: "M148.622 29.4245L148.35 28.1171H148.284C147.834 28.6926 147.383 29.0837 146.933 29.2904C146.488 29.4915 145.931 29.5921 145.261 29.5921C144.365 29.5921 143.662 29.3574 143.152 28.8881C142.646 28.4188 142.394 27.7511 142.394 26.885C142.394 25.0301 143.852 24.0579 146.768 23.9685L148.301 23.9182V23.3483C148.301 22.6275 148.147 22.0967 147.839 21.7559C147.537 21.4095 147.051 21.2362 146.381 21.2362C145.629 21.2362 144.777 21.4709 143.827 21.9403L143.407 20.8759C143.852 20.63 144.338 20.4373 144.865 20.2976C145.398 20.1579 145.931 20.088 146.463 20.088C147.54 20.088 148.336 20.3311 148.853 20.8172C149.374 21.3033 149.635 22.0827 149.635 23.1555V29.4245H148.622ZM145.532 28.4439C146.384 28.4439 147.051 28.2065 147.534 27.7315C148.023 27.2566 148.268 26.5917 148.268 25.7369V24.9071L146.9 24.9658C145.813 25.0049 145.027 25.1781 144.544 25.4854C144.066 25.7871 143.827 26.2593 143.827 26.9018C143.827 27.4047 143.975 27.7874 144.272 28.05C144.574 28.3126 144.994 28.4439 145.532 28.4439Z",
p1fd2af40: "M0.353553 0.353553L3.35355 3.35355L6.35355 0.353553",
p205881f0: "M93.1334 37.47L97.5705 10.88H104.296L109.53 25.0566L114.73 10.88H121.455L125.892 37.47H119.132L116.879 22.1649L110.709 37.47H108.005L102.146 22.1649L99.8931 37.47H93.1334Z",
p209d5200: "M3.75 15H6.25V12.5H3.75V15ZM5 0C2.2375 0 0 2.2375 0 5H2.5C2.5 3.625 3.625 2.5 5 2.5C6.375 2.5 7.5 3.625 7.5 5C7.5 7.5 3.75 7.1875 3.75 11.25H6.25C6.25 8.4375 10 8.125 10 5C10 2.2375 7.7625 0 5 0Z",
p211de5d0: "M16 13.6545V14.4012C16 15.2812 15.28 16.0012 14.4 16.0012H1.6C0.720001 16.0012 0 15.2812 0 14.4012V13.6545C0 11.7079 2.26667 10.5345 4.4 9.60119C4.48 9.57453 4.53334 9.54786 4.61334 9.49453C4.77334 9.41453 4.96 9.41453 5.12 9.52119C5.97334 10.0812 6.96001 10.4012 8.00001 10.4012C9.04001 10.4012 10.0267 10.0812 10.88 9.54786C11.04 9.44119 11.2267 9.44119 11.3867 9.52119C11.4667 9.54786 11.52 9.57453 11.6 9.62786C13.7333 10.5345 16 11.7079 16 13.6545",
p21bc7e00: "M141.191 13.7317C141.432 13.7317 141.666 13.7149 141.891 13.6814C142.116 13.6423 142.295 13.6031 142.427 13.564V14.6284C142.278 14.7011 142.059 14.7597 141.767 14.8044C141.482 14.8547 141.224 14.8799 140.993 14.8799C139.247 14.8799 138.373 13.944 138.373 12.0722V6.60779H137.08V5.93731L138.373 5.35902L138.95 3.39787H139.741V5.52664H142.361V6.60779H139.741V12.0135C139.741 12.5667 139.87 12.9913 140.128 13.2875C140.386 13.5836 140.74 13.7317 141.191 13.7317Z",
p21ef200: "M200.389 39.6735L200.022 37.9106H199.933C199.326 38.6866 198.719 39.2139 198.112 39.4927C197.512 39.7639 196.76 39.8995 195.857 39.8995C194.65 39.8995 193.702 39.5831 193.013 38.9502C192.332 38.3174 191.991 37.4172 191.991 36.2495C191.991 33.7484 193.957 32.4375 197.889 32.317L199.955 32.2492V31.4808C199.955 30.509 199.748 29.7933 199.333 29.3338C198.926 28.8667 198.271 28.6331 197.367 28.6331C196.353 28.6331 195.205 28.9495 193.924 29.5824L193.357 28.1472C193.957 27.8158 194.613 27.5559 195.323 27.3675C196.042 27.1792 196.76 27.085 197.478 27.085C198.93 27.085 200.004 27.4127 200.7 28.0681C201.403 28.7235 201.755 29.7745 201.755 31.2209V39.6735H200.389ZM196.223 38.3513C197.371 38.3513 198.271 38.0312 198.922 37.3908C199.582 36.7505 199.911 35.854 199.911 34.7014V33.5826L198.067 33.6617C196.601 33.7145 195.542 33.948 194.89 34.3624C194.246 34.7692 193.924 35.4057 193.924 36.2721C193.924 36.9501 194.124 37.4661 194.524 37.8202C194.931 38.1743 195.498 38.3513 196.223 38.3513Z",
p222fb280: "M6.23269 6.71107C6.07115 6.86867 5.80192 6.86867 5.64038 6.71107L0.121154 1.27392C-0.0403846 1.11632 -0.0403846 0.853659 0.121154 0.69606L0.713462 0.118199C0.875269 -0.0393996 1.1445 -0.0393996 1.30577 0.118199L5.64038 4.39962C5.80192 4.55722 6.07115 4.55722 6.23269 4.39962L10.5676 0.144465C10.7288 -0.0131332 10.9981 -0.0131332 11.1599 0.144465L11.7519 0.722326C11.8865 0.879925 11.8865 1.11632 11.7519 1.27392L6.23269 6.71107Z",
p24996380: "M127.103 20.2389V26.1978C127.103 26.9465 127.271 27.5052 127.606 27.874C127.941 28.2428 128.465 28.4272 129.179 28.4272C130.124 28.4272 130.813 28.1646 131.247 27.6393C131.686 27.1141 131.906 26.2565 131.906 25.0664V20.2389H133.274V29.4245H132.145L131.947 28.1925H131.873C131.593 28.6451 131.203 28.9915 130.703 29.2317C130.209 29.472 129.643 29.5921 129.006 29.5921C127.908 29.5921 127.084 29.3267 126.535 28.7959C125.991 28.2651 125.719 27.4158 125.719 26.2481V20.2389H127.103Z",
p261f0380: "M224.404 39.8995C222.642 39.8995 221.275 39.3495 220.305 38.2496C219.343 37.1422 218.861 35.579 218.861 33.56C218.861 31.4883 219.35 29.8875 220.327 28.7574C221.312 27.6274 222.712 27.0624 224.526 27.0624C225.111 27.0624 225.696 27.1264 226.281 27.2545C226.866 27.3826 227.325 27.5333 227.659 27.7065L227.092 29.2999C226.685 29.1341 226.241 28.9985 225.759 28.893C225.278 28.78 224.852 28.7235 224.482 28.7235C222.008 28.7235 220.772 30.3282 220.772 33.5374C220.772 35.0592 221.072 36.2269 221.672 37.0405C222.279 37.8541 223.175 38.2609 224.36 38.2609C225.374 38.2609 226.415 38.0387 227.481 37.5942V39.2553C226.666 39.6848 225.641 39.8995 224.404 39.8995Z",
p26346b00: "M190.369 18.5146C190.695 18.5146 191.01 18.492 191.314 18.4468C191.617 18.3941 191.858 18.3413 192.036 18.2886V19.7237C191.836 19.8217 191.539 19.9008 191.147 19.961C190.762 20.0288 190.414 20.0627 190.103 20.0627C187.748 20.0627 186.57 18.8009 186.57 16.2772V8.90941H184.826V8.00539L186.57 7.22568L187.348 4.58143H188.414V7.45168H191.947V8.90941H188.414V16.1981C188.414 16.9439 188.588 17.5164 188.936 17.9157C189.284 18.315 189.762 18.5146 190.369 18.5146Z",
p283c2600: "M8.00073 0C10.1952 0 11.9741 2.02038 11.9741 4.51282C11.9741 7.00526 10.1952 9.02564 8.00073 9.02564C5.8063 9.02564 4.02734 7.00526 4.02734 4.51282C4.02734 2.02038 5.8063 0 8.00073 0",
p28b6ee00: "M76.1354 13.2923C83.6421 10.7769 89.415 6.46193 94.8361 0.0387195C94.9822 -0.134308 99.6339 0.270414 99.663 1.29645C99.7096 2.93629 93.659 10.4374 85.106 35.8664C84.0592 38.9786 82.3497 48.7334 82.3497 48.7334L71.4978 54C71.4978 54 79.8124 27.0029 89.415 10.471C89.7246 9.93797 86.9873 11.9641 76.1354 15.5246V13.2923Z",
p29d99100: "M51.1386 20.4669L48.8761 13.9019L46.6136 20.4669H51.1386ZM52.4755 24.364H45.2767L44.1198 27.7903H38.7463L46.1251 8.06935H51.6271L59.0059 27.7903H53.6325L52.4755 24.364Z",
p2a0ac600: "M102.89 29.4245V17.1715H104.291V29.4245H102.89Z",
p2a3d6080: "M69.074 27.7903L72.3649 8.06935H77.3527L81.2349 18.5837L85.0914 8.06935H90.0792L93.3701 27.7903H88.3566L86.6854 16.439L82.109 27.7903H80.1037L75.7587 16.439L74.0875 27.7903H69.074Z",
p2b0ed700: "M4.04151 6.72049C3.39375 6.72049 2.76054 6.54406 2.22194 6.2135C1.68334 5.88295 1.26356 5.41312 1.01567 4.86343C0.767785 4.31373 0.702926 3.70887 0.829299 3.12532C0.955671 2.54177 1.2676 2.00574 1.72564 1.58503C2.18367 1.16431 2.76725 0.877801 3.40256 0.761726C4.03788 0.645651 4.6964 0.705225 5.29486 0.932915C5.89331 1.1606 6.40482 1.54618 6.7647 2.04089C7.12458 2.5356 7.31666 3.11722 7.31666 3.71221C7.3159 4.50984 6.97059 5.2746 6.35655 5.83861C5.7425 6.40262 4.9099 6.71979 4.04151 6.72049ZM6.81312 1.17306C6.45608 0.8137 6.02343 0.524557 5.54132 0.323098C5.0592 0.121639 4.53762 0.0120453 4.0081 0.000938218C3.47857 -0.0101688 2.95209 0.0774414 2.46046 0.258476C1.96884 0.43951 1.52227 0.71021 1.14774 1.05422C0.773213 1.39823 0.478499 1.80841 0.281405 2.25998C0.0843112 2.71155 -0.0110709 3.19513 0.00102145 3.68151C0.0131138 4.16789 0.13243 4.64697 0.35176 5.0898C0.57109 5.53264 0.885883 5.93003 1.27712 6.25798C1.63416 6.61734 2.06681 6.90648 2.54892 7.10794C3.03104 7.3094 3.55262 7.41899 4.08214 7.4301C4.61167 7.44121 5.13815 7.3536 5.62978 7.17256C6.1214 6.99153 6.56797 6.72083 6.9425 6.37682C7.31703 6.0328 7.61174 5.62262 7.80884 5.17105C8.00593 4.71949 8.10131 4.2359 8.08922 3.74953C8.07713 3.26315 7.95781 2.78407 7.73848 2.34123C7.51915 1.8984 7.20436 1.501 6.81312 1.17306Z",
p2b918a30: "M130.168 14.7122L129.896 13.4048H129.83C129.38 13.9803 128.929 14.3714 128.479 14.5781C128.034 14.7793 127.477 14.8799 126.807 14.8799C125.911 14.8799 125.208 14.6452 124.698 14.1758C124.192 13.7065 123.94 13.0388 123.94 12.1728C123.94 10.3178 125.398 9.34559 128.314 9.25619L129.847 9.20591V8.636C129.847 7.91523 129.693 7.38443 129.385 7.04361C129.083 6.69719 128.597 6.52398 127.927 6.52398C127.175 6.52398 126.323 6.75865 125.373 7.22799L124.953 6.1636C125.398 5.91776 125.884 5.72499 126.411 5.58531C126.944 5.44563 127.477 5.37578 128.009 5.37578C129.086 5.37578 129.882 5.61883 130.399 6.10493C130.92 6.59103 131.181 7.37047 131.181 8.44323V14.7122H130.168ZM127.078 13.7317C127.93 13.7317 128.597 13.4942 129.08 13.0193C129.569 12.5443 129.814 11.8794 129.814 11.0246V10.1949L128.446 10.2535C127.359 10.2926 126.573 10.4659 126.09 10.7732C125.612 11.0749 125.373 11.547 125.373 12.1895C125.373 12.6924 125.521 13.0751 125.818 13.3377C126.12 13.6003 126.54 13.7317 127.078 13.7317Z",
p2be5a800: "M6.2327 6.88315C6.07116 7.04479 5.80193 7.04479 5.64039 6.88315L0.121154 1.30659C-0.0403847 1.14495 -0.0403847 0.875547 0.121154 0.713908L0.713463 0.12123C0.875271 -0.0404099 1.1445 -0.0404099 1.30577 0.12123L5.64039 4.51244C5.80193 4.67408 6.07116 4.67408 6.2327 4.51244L10.5676 0.14817C10.7289 -0.0134699 10.9981 -0.0134699 11.1599 0.14817L11.7519 0.740848C11.8866 0.902487 11.8866 1.14495 11.7519 1.30659L6.2327 6.88315Z",
p2de3d800: "M153.136 39.6735V31.6616C153.136 30.6521 152.91 29.8988 152.458 29.4016C152.006 28.9043 151.299 28.6557 150.336 28.6557C149.063 28.6557 148.13 29.006 147.537 29.7067C146.945 30.4073 146.648 31.5637 146.648 33.1758V39.6735H144.805V27.2884H146.304L146.604 28.9834H146.693C147.071 28.3732 147.6 27.9024 148.281 27.5709C148.963 27.2319 149.722 27.0624 150.558 27.0624C152.025 27.0624 153.128 27.424 153.869 28.1472C154.609 28.8629 154.979 30.0118 154.979 31.5938V39.6735H153.136Z",
p2eca6600: "M235.523 39.8995C233.724 39.8995 232.302 39.342 231.258 38.227C230.221 37.1121 229.703 35.5639 229.703 33.5826C229.703 31.5863 230.184 30.0005 231.147 28.8252C232.117 27.65 233.416 27.0624 235.045 27.0624C236.571 27.0624 237.778 27.5747 238.667 28.5992C239.555 29.6163 240 30.961 240 32.6334V33.8199H231.613C231.65 35.2739 232.009 36.3776 232.691 37.1309C233.379 37.8843 234.346 38.2609 235.59 38.2609C236.901 38.2609 238.196 37.9822 239.478 37.4247V39.0971C238.826 39.3834 238.208 39.5868 237.623 39.7074C237.045 39.8354 236.345 39.8995 235.523 39.8995ZM235.023 28.6331C234.046 28.6331 233.265 28.9571 232.679 29.605C232.102 30.2528 231.761 31.1493 231.658 32.2944H238.022C238.022 31.1117 237.763 30.2076 237.245 29.5824C236.726 28.9495 235.986 28.6331 235.023 28.6331Z",
p2f325480: "M202.81 19.8367V11.8249C202.81 10.8154 202.584 10.062 202.133 9.56483C201.681 9.06762 200.974 8.81901 200.011 8.81901C198.73 8.81901 197.793 9.17308 197.201 9.88123C196.616 10.5894 196.323 11.7495 196.323 13.3617V19.8367H194.479V2.25358H196.323V7.57599C196.323 8.21633 196.294 8.74744 196.234 9.16932H196.345C196.708 8.57417 197.223 8.1071 197.889 7.76809C198.563 7.42155 199.33 7.24828 200.189 7.24828C201.677 7.24828 202.792 7.60989 203.532 8.3331C204.28 9.04878 204.654 10.1901 204.654 11.7571V19.8367H202.81Z",
p2f526270: "M150.418 14.7122V8.77009C150.418 8.02139 150.25 7.46266 149.915 7.09389C149.58 6.72513 149.056 6.54075 148.342 6.54075C147.392 6.54075 146.697 6.80335 146.257 7.32856C145.824 7.85377 145.607 8.71422 145.607 9.90991V14.7122H144.239V1.67138H145.607V5.61883C145.607 6.09376 145.585 6.48767 145.541 6.80056H145.623C145.892 6.35916 146.274 6.01274 146.768 5.76131C147.268 5.50429 147.836 5.37578 148.474 5.37578C149.578 5.37578 150.404 5.64398 150.953 6.18036C151.508 6.71116 151.785 7.55764 151.785 8.71981V14.7122H150.418Z",
p2f6205e8: "M16 14.0039V14.7697C16 15.6722 15.28 16.4107 14.4 16.4107H1.6C0.72 16.4107 0 15.6722 0 14.7697V14.0039C0 12.0073 2.26667 10.8039 4.4 9.8466C4.48 9.81925 4.53333 9.7919 4.61333 9.7372C4.77333 9.65515 4.96 9.65515 5.12 9.76455C5.97333 10.3389 6.96 10.6671 8 10.6671C9.04 10.6671 10.0267 10.3389 10.88 9.7919C11.04 9.6825 11.2267 9.6825 11.3867 9.76455C11.4667 9.7919 11.52 9.81925 11.6 9.87395C13.7333 10.8039 16 12.0073 16 14.0039",
p3425f6f0: "M4.00114 3.55849H3.24656V2.18024C3.46138 2.16137 3.67714 2.15297 3.89293 2.15506C4.70282 2.15506 5.10728 2.38654 5.10632 2.84948C5.10536 3.31243 4.73696 3.54877 4.00114 3.55849ZM4.9404 3.81028C5.45019 3.60884 5.7046 3.2793 5.70364 2.82166C5.70734 2.65757 5.66412 2.49547 5.5783 2.35153C5.49247 2.20758 5.36704 2.08683 5.21453 2.00133C4.88413 1.7946 4.45129 1.69388 3.89293 1.69388C3.4696 1.69864 3.0474 1.73498 2.63048 1.80255V5.72259H3.24656V3.98919H4.02999C4.66386 3.98919 5.06833 4.56699 5.24338 5.72259H5.8609C5.80066 5.27516 5.68048 4.83628 5.50309 4.41591C5.38536 4.16568 5.18956 3.95309 4.9404 3.80498V3.81028Z",
p364197c0: "M166.632 36.2947C166.632 37.4473 166.21 38.3363 165.365 38.9615C164.521 39.5868 163.336 39.8995 161.811 39.8995C160.196 39.8995 158.938 39.6396 158.034 39.1197V37.3795C158.619 37.6809 159.245 37.9182 159.911 38.0914C160.585 38.2647 161.233 38.3513 161.855 38.3513C162.818 38.3513 163.558 38.1969 164.077 37.888C164.595 37.5716 164.854 37.0932 164.854 36.4529C164.854 35.9708 164.647 35.5602 164.232 35.2212C163.825 34.8746 163.025 34.4678 161.833 34.0007C160.7 33.5713 159.893 33.1984 159.412 32.882C158.938 32.5581 158.582 32.1927 158.345 31.7859C158.116 31.3791 158.001 30.8932 158.001 30.3282C158.001 29.3187 158.404 28.5239 159.212 27.9438C160.019 27.3562 161.126 27.0624 162.533 27.0624C163.844 27.0624 165.125 27.3336 166.376 27.876L165.721 29.4016C164.499 28.8893 163.392 28.6331 162.4 28.6331C161.526 28.6331 160.867 28.7725 160.422 29.0512C159.978 29.33 159.756 29.7142 159.756 30.2039C159.756 30.5353 159.837 30.8179 160 31.0514C160.171 31.2849 160.441 31.5072 160.811 31.7181C161.181 31.929 161.892 32.2341 162.944 32.6334C164.388 33.1683 165.362 33.7069 165.865 34.2494C166.376 34.7918 166.632 35.4735 166.632 36.2947Z",
p37688980: "M174.68 29.5921C173.345 29.5921 172.291 29.1787 171.516 28.3517C170.747 27.5248 170.363 26.3766 170.363 24.9071C170.363 23.4265 170.72 22.2504 171.434 21.3787C172.153 20.5071 173.117 20.0713 174.326 20.0713C175.457 20.0713 176.352 20.4512 177.011 21.2111C177.67 21.9654 178 22.9627 178 24.2031V25.0831H171.78C171.807 26.1615 172.074 26.98 172.579 27.5388C173.09 28.0975 173.807 28.3769 174.729 28.3769C175.701 28.3769 176.663 28.1701 177.613 27.7567V28.9971C177.129 29.2094 176.671 29.3602 176.237 29.4496C175.809 29.5446 175.29 29.5921 174.68 29.5921ZM174.309 21.2362C173.584 21.2362 173.005 21.4765 172.571 21.957C172.142 22.4375 171.89 23.1024 171.813 23.9517H176.534C176.534 23.0745 176.341 22.404 175.957 21.9403C175.572 21.4709 175.023 21.2362 174.309 21.2362Z",
p39466b40: "M135.374 14.7122H134.007V1.67138H135.374V14.7122Z",
p3affbb00: "M189.17 27.0624C189.71 27.0624 190.195 27.1076 190.625 27.198L190.369 28.9382C189.866 28.8252 189.421 28.7687 189.036 28.7687C188.051 28.7687 187.207 29.1756 186.504 29.9892C185.808 30.8028 185.46 31.816 185.46 33.0289V39.6735H183.616V27.2884H185.138L185.349 29.5824H185.437C185.889 28.7763 186.433 28.1548 187.07 27.7178C187.707 27.2809 188.407 27.0624 189.17 27.0624Z",
p3bf1f380: "M118.955 14.8799C117.621 14.8799 116.566 14.4664 115.792 13.6395C115.023 12.8125 114.638 11.6643 114.638 10.1949C114.638 8.71422 114.995 7.53809 115.709 6.66646C116.429 5.79484 117.393 5.35902 118.601 5.35902C119.733 5.35902 120.628 5.73896 121.287 6.49884C121.946 7.25313 122.275 8.25047 122.275 9.49086V10.3709H116.055C116.083 11.4492 116.349 12.2678 116.855 12.8265C117.365 13.3852 118.082 13.6646 119.005 13.6646C119.977 13.6646 120.938 13.4579 121.888 13.0444V14.2848C121.405 14.4971 120.946 14.648 120.512 14.7374C120.084 14.8324 119.565 14.8799 118.955 14.8799ZM118.585 6.52398C117.86 6.52398 117.28 6.76424 116.846 7.24475C116.418 7.72526 116.165 8.39015 116.088 9.23943H120.809C120.809 8.36222 120.617 7.69174 120.232 7.22799C119.848 6.75865 119.299 6.52398 118.585 6.52398Z",
p3bff9900: "M175.507 19.8367L175.14 18.0739H175.051C174.444 18.8498 173.837 19.3772 173.23 19.6559C172.63 19.9271 171.878 20.0627 170.975 20.0627C169.768 20.0627 168.82 19.7463 168.131 19.1135C167.45 18.4807 167.109 17.5804 167.109 16.4128C167.109 13.9116 169.075 12.6008 173.008 12.4803L175.074 12.4125V11.6441C175.074 10.6722 174.866 9.95657 174.452 9.49702C174.044 9.02995 173.389 8.79641 172.486 8.79641C171.471 8.79641 170.323 9.11282 169.042 9.74563L168.476 8.3105C169.075 7.97903 169.731 7.71912 170.442 7.53079C171.16 7.34245 171.878 7.24828 172.597 7.24828C174.048 7.24828 175.122 7.57599 175.818 8.2314C176.521 8.88681 176.873 9.93773 176.873 11.3842V19.8367H175.507ZM171.341 18.5146C172.489 18.5146 173.389 18.1944 174.041 17.5541C174.7 16.9137 175.029 16.0173 175.029 14.8646V13.7459L173.185 13.825C171.719 13.8777 170.66 14.1113 170.008 14.5256C169.364 14.9324 169.042 15.569 169.042 16.4354C169.042 17.1134 169.242 17.6294 169.642 17.9835C170.049 18.3376 170.616 18.5146 171.341 18.5146Z",
p3c127600: "M113.576 29.4245V23.4824C113.576 22.7337 113.408 22.1749 113.073 21.8062C112.738 21.4374 112.214 21.253 111.5 21.253C110.555 21.253 109.863 21.5128 109.424 22.0324C108.984 22.5521 108.764 23.4097 108.764 24.6054V29.4245H107.397V20.2389H108.509L108.732 21.4961H108.797C109.078 21.0435 109.47 20.6943 109.975 20.4484C110.481 20.197 111.044 20.0713 111.664 20.0713C112.752 20.0713 113.57 20.3395 114.119 20.8759C114.669 21.4067 114.943 22.2587 114.943 23.4321V29.4245H113.576Z",
p3cfc9d00: "M27.084 16.5303H43.332V27.5508H27.084V44.082H16.251V27.5508H0V16.5303H16.251V0H27.084V16.5303Z",
p3ea74670: "M171.375 27.2884V35.3229C171.375 36.3324 171.601 37.0857 172.052 37.5829C172.504 38.0801 173.211 38.3287 174.174 38.3287C175.448 38.3287 176.377 37.9747 176.962 37.2665C177.554 36.5584 177.851 35.402 177.851 33.7973V27.2884H179.695V39.6735H178.173L177.906 38.0123H177.806C177.429 38.6225 176.903 39.0896 176.229 39.4136C175.562 39.7375 174.8 39.8995 173.941 39.8995C172.46 39.8995 171.349 39.5416 170.608 38.8259C169.875 38.1103 169.509 36.9652 169.509 35.3907V27.2884H171.375Z",
p3ee2c900: "M166.433 29.5921C165.126 29.5921 164.113 29.1842 163.393 28.3685C162.679 27.5471 162.322 26.3878 162.322 24.8904C162.322 23.3539 162.685 22.1665 163.41 21.3284C164.14 20.4903 165.178 20.0713 166.524 20.0713C166.958 20.0713 167.392 20.1188 167.826 20.2138C168.259 20.3087 168.6 20.4205 168.847 20.549L168.427 21.7307C168.125 21.6078 167.795 21.5072 167.438 21.429C167.081 21.3452 166.766 21.3033 166.491 21.3033C164.657 21.3033 163.739 22.4934 163.739 24.8736C163.739 26.0022 163.962 26.8683 164.407 27.4717C164.857 28.0752 165.522 28.3769 166.4 28.3769C167.153 28.3769 167.924 28.212 168.715 27.8824V29.1144C168.111 29.4329 167.35 29.5921 166.433 29.5921Z",
p3f8ec680: "M4.92816 15.8857C4.92816 17.054 5.85589 18 6.99979 18C8.14346 18 9.07124 17.0538 9.07101 15.8857H4.92816Z",
p42b2650: "M213.896 39.6735V31.6616C213.896 30.6521 213.67 29.8988 213.218 29.4016C212.767 28.9043 212.059 28.6557 211.097 28.6557C209.823 28.6557 208.89 29.006 208.298 29.7067C207.705 30.4073 207.409 31.5637 207.409 33.1758V39.6735H205.565V27.2884H207.065L207.364 28.9834H207.453C207.831 28.3732 208.361 27.9024 209.042 27.5709C209.723 27.2319 210.482 27.0624 211.319 27.0624C212.785 27.0624 213.889 27.424 214.629 28.1472C215.37 28.8629 215.74 30.0118 215.74 31.5938V39.6735H213.896Z",
p4f5e480: "M182.527 19.8367H180.683V2.25358H182.527V19.8367Z",
p7a3d8f2: "M158.64 29.4245V23.4824C158.64 22.7337 158.472 22.1749 158.137 21.8062C157.802 21.4374 157.278 21.253 156.564 21.253C155.619 21.253 154.927 21.5128 154.488 22.0324C154.048 22.5521 153.829 23.4097 153.829 24.6054V29.4245H152.461V20.2389H153.573L153.796 21.4961H153.861C154.142 21.0435 154.534 20.6943 155.04 20.4484C155.545 20.197 156.108 20.0713 156.728 20.0713C157.816 20.0713 158.634 20.3395 159.183 20.8759C159.733 21.4067 160.007 22.2587 160.007 23.4321V29.4245H158.64Z",
paf15100: "M8.00004 6.91414e-05C10.1945 6.91414e-05 11.9734 1.96994 11.9734 4.40007C11.9734 6.83021 10.1945 8.80008 8.00004 8.80008C5.80561 8.80008 4.02665 6.83021 4.02665 4.40007C4.02665 1.96994 5.80561 6.91414e-05 8.00004 6.91414e-05",
pb20da00: "M138.729 39.6735V23.1525H140.617V39.6735H138.729Z",
pd6a2880: "M151.058 19.8367H149.17V12.0622H140.617V19.8367H138.729V3.3158H140.617V10.3445H149.17V3.3158H151.058V19.8367Z",
}

```

## src/imports/WebFooter/index.tsx
```tsx
import svgPaths from "./svg-06har4wwnf";
import imgImage3 from "./fd28a89c95b1b13661178375300912781fa4df5d.png";
import { imgGroup } from "./svg-oapmo";
type WebFooterProps = {
  className?: string;
  property1?: "Placeholder Two" | "Placeholder Four" | "Placeholder Three" | "Placeholder One" | "Unsecured";
};

export default function WebFooter({ className, property1 = "Placeholder One" }: WebFooterProps) {
  const isPlaceholderFour = property1 === "Placeholder Four";
  const isPlaceholderOne = property1 === "Placeholder One";
  const isPlaceholderOneOrUnsecured = ["Placeholder One", "Unsecured"].includes(property1);
  const isPlaceholderThree = property1 === "Placeholder Three";
  const isPlaceholderThreeOrUnsecured = ["Placeholder Three", "Unsecured"].includes(property1);
  const isPlaceholderTwo = property1 === "Placeholder Two";
  const isPlaceholderTwoOrPlaceholderOneOrPlaceholderThree = ["Placeholder Two", "Placeholder One", "Placeholder Three"].includes(property1);
  const isPlaceholderTwoOrPlaceholderOneOrPlaceholderThreeOrUnsecured = ["Placeholder Two", "Placeholder One", "Placeholder Three", "Unsecured"].includes(property1);
  const isPlaceholderTwoOrPlaceholderThree = ["Placeholder Two", "Placeholder Three"].includes(property1);
  const isPlaceholderTwoOrPlaceholderThreeOrUnsecured = ["Placeholder Two", "Placeholder Three", "Unsecured"].includes(property1);
  const isUnsecured = property1 === "Unsecured";
  return (
    <div className={className || `relative w-[1440px] ${isUnsecured ? "h-[266px]" : "h-[265px]"}`}>
      <div className="absolute bg-[#fff2f8] inset-0" data-name="Rectangle Copy" />
      {isPlaceholderTwoOrPlaceholderOneOrPlaceholderThreeOrUnsecured && (
        <>
          <div className={`absolute h-[30px] w-[100px] ${isUnsecured ? "bottom-[11px] left-[1129px]" : "bottom-[10px] left-[1162px]"}`} data-name="image 3">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage3} />
          </div>
          <p className={`[word-break:break-word] absolute font-["Open_Sans:Regular",sans-serif] font-normal leading-[16px] text-[12px] translate-y-full whitespace-nowrap ${isUnsecured ? "bottom-[34px] left-[1048px] text-[#999]" : "bottom-[33px] left-[1081px] text-[#565962]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
            Powered by
          </p>
          <div className={`absolute ${isUnsecured ? "-translate-y-1/2 contents left-[7.78%] right-[66.6%] top-[calc(50%+96.5px)]" : isPlaceholderOne ? "-translate-y-1/2 contents left-[10%] right-[70.9%] top-[calc(50%+97px)]" : '[word-break:break-word] font-["Open_Sans:Regular",sans-serif] font-normal inset-[55.47%_72.16%_29.43%_10%] leading-[0] text-[#263154] text-[14px] whitespace-pre-wrap'}`} style={isPlaceholderTwoOrPlaceholderThree ? { fontVariationSettings: '"wdth" 100' } : undefined}>
            <p className={isUnsecured ? '[word-break:break-word] absolute font-["Open_Sans:Bold",sans-serif] font-bold h-[23px] leading-[20px] left-[7.78%] right-[66.6%] text-[#263154] text-[16px] top-[calc(50%+85px)]' : isPlaceholderOne ? '[word-break:break-word] absolute font-["Open_Sans:Bold",sans-serif] font-bold h-[23px] leading-[20px] left-[10%] right-[70.9%] text-[#263154] text-[16px] top-[calc(50%+85.5px)]' : "leading-[normal] mb-0"} style={isPlaceholderOneOrUnsecured ? { fontVariationSettings: '"wdth" 100' } : undefined}>
              {isUnsecured ? "A1M Health " : isPlaceholderTwoOrPlaceholderThree ? "9025 Smoky Hollow Street " : "A1M Health "}
            </p>
            {isPlaceholderTwoOrPlaceholderThree && <p className="leading-[normal]">Niagara Falls, NY 14304</p>}
          </div>
          <p className={`[word-break:break-word] absolute font-["Open_Sans:Regular",sans-serif] font-normal ${isUnsecured ? "h-[15px] leading-[14px] left-[112px] text-[#565962] text-[12px] top-[calc(50%+110px)] w-[517px] whitespace-pre-wrap" : isPlaceholderOne ? "leading-[14px] left-[144px] text-[#565962] text-[12px] top-[calc(50%+110.5px)] whitespace-pre" : "leading-[0] left-[144px] text-[0px] text-black top-[109px] whitespace-nowrap"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
            {isPlaceholderTwoOrPlaceholderThree && (
              <>
                <span className="leading-[normal] text-[#263154] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>{`Email: `}</span>
                <span className="leading-[normal] text-[#0a7593] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
                  support@eldocomp.com
                </span>
              </>
            )}
            {isPlaceholderOneOrUnsecured && "Copyright © 2022 A1M Health  • CA Insurance License Number 0451271"}
          </p>
          <div className={`absolute ${isPlaceholderOneOrUnsecured ? "h-0 left-0 top-[210px] w-[1440px]" : "-translate-y-1/2 contents left-[10%] right-[70.9%] top-[calc(50%+97px)]"}`}>
            {isPlaceholderTwoOrPlaceholderThree && <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold h-[23px] leading-[20px] left-[10%] right-[70.9%] text-[#263154] text-[16px] top-[calc(50%+85.5px)]" style={{ fontVariationSettings: '"wdth" 100' }}>{`A1M Health `}</p>}
            {isPlaceholderOneOrUnsecured && (
              <div className="absolute inset-[-1px_0_0_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 1">
                  {isPlaceholderOne && <line id="Line 23" stroke="var(--stroke-0, #999999)" x2="1440" y1="0.5" y2="0.5" />}
                  {isUnsecured && (
                    <g id="Line 23">
                      <line stroke="var(--stroke-0, #6B6F7A)" x2="1440" y1="0.5" y2="0.5" />
                      <line stroke="var(--stroke-1, black)" strokeOpacity="0.2" x2="1440" y1="0.5" y2="0.5" />
                    </g>
                  )}
                </svg>
              </div>
            )}
          </div>
        </>
      )}
      {isPlaceholderTwoOrPlaceholderOneOrPlaceholderThree && (
        <p className={`[word-break:break-word] absolute ${isPlaceholderOne ? 'font-["Open_Sans:Bold",sans-serif] font-bold inset-[34.34%_30.14%_58.11%_53.26%] leading-[normal] text-[#263154] text-[16px]' : 'font-["Open_Sans:Regular",sans-serif] font-normal leading-[14px] left-[144px] text-[#565962] text-[12px] top-[calc(50%+110.5px)] whitespace-pre'}`} style={{ fontVariationSettings: '"wdth" 100' }}>
          {isPlaceholderTwoOrPlaceholderThree ? "Copyright © 2022 A1M Health  • CA Insurance License Number 0451271" : "Get the Mobile Application"}
        </p>
      )}
      {isPlaceholderTwoOrPlaceholderThreeOrUnsecured && (
        <>
          <div className={`absolute ${isUnsecured ? "[word-break:break-word] contents left-[7.78%] right-[70.49%] text-[#263154] top-[20px]" : "h-0 left-0 top-[210px] w-[1440px]"}`}>
            <div className={`absolute ${isUnsecured ? 'font-["Open_Sans:Regular",sans-serif] font-normal inset-[18.05%_70.49%_74.44%_7.78%] leading-[0] text-[14px]' : "inset-[-1px_0_0_0]"}`} style={isUnsecured ? { fontVariationSettings: '"wdth" 100' } : undefined}>
              {isPlaceholderTwoOrPlaceholderThree && (
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 1">
                  <line id="Line 23" stroke="var(--stroke-0, #999999)" x2="1440" y1="0.5" y2="0.5" />
                </svg>
              )}
              {isUnsecured && (
                <>
                  <p className="leading-[normal] mb-0">For immediate assistance, please call:</p>
                  <p className="leading-[normal]">​</p>
                </>
              )}
            </div>
            {isUnsecured && (
              <>
                <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold h-[20px] leading-[normal] left-[7.78%] right-[86.18%] text-[16px] top-[calc(50%-113px)]" style={{ fontVariationSettings: '"wdth" 100' }}>
                  Contact Us
                </p>
                <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[26.32%_70.49%_66.92%_7.78%] leading-[0] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                  <p className="leading-[normal] mb-0">1 (800) CALL-NOW | 1 (800) 121-2412</p>
                  <p className="leading-[normal] mb-0">​</p>
                  <p className="leading-[normal]">​</p>
                </div>
              </>
            )}
          </div>
          <div className={`[word-break:break-word] absolute contents top-[20px] ${isUnsecured ? "left-[29.51%] right-[62.92%]" : "left-[10%] right-[68.26%] text-[#263154]"}`}>
            <div className={`absolute font-["Open_Sans:Regular",sans-serif] font-normal leading-[0] text-[14px] ${isUnsecured ? "inset-[18.05%_62.92%_33.08%_29.51%] text-[#0a7593] whitespace-pre-wrap" : "inset-[18.11%_68.26%_74.34%_10%]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className={`mb-0 ${isUnsecured ? "leading-[32px]" : "leading-[normal]"}`}>{isUnsecured ? "Privacy Policy" : isPlaceholderTwoOrPlaceholderThree ? "For immediate assistance, please call:" : ""}</p>
              <p className={isUnsecured ? "leading-[32px] mb-0" : "leading-[normal]"}>{isUnsecured ? "Terms of Use " : isPlaceholderTwoOrPlaceholderThree ? "​" : ""}</p>
              {isUnsecured && (
                <>
                  <p className="leading-[32px] mb-0">Legal</p>
                  <p className="leading-[32px] mb-0">{`Contact Us `}</p>
                  <p className="leading-[32px]">​</p>
                </>
              )}
            </div>
            <p className={`absolute font-["Open_Sans:Bold",sans-serif] font-bold leading-[normal] text-[16px] ${isUnsecured ? "left-[29.51%] right-[66.46%] text-[#263154] top-[calc(50%-113px)] whitespace-nowrap" : "h-[20px] left-[10%] right-[83.96%] top-[calc(50%-112.5px)]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
              {isUnsecured ? "Block 1" : isPlaceholderTwoOrPlaceholderThree ? "Contact Us" : ""}
            </p>
            {isPlaceholderTwoOrPlaceholderThree && (
              <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[26.42%_68.26%_66.42%_10%] leading-[0] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                <p className="leading-[normal] mb-0">1 (800) CALL-NOW | 1 (800) 121-2412</p>
                <p className="leading-[normal] mb-0">​</p>
                <p className="leading-[normal]">​</p>
              </div>
            )}
          </div>
        </>
      )}
      {isPlaceholderThreeOrUnsecured && (
        <>
          <div className={`[word-break:break-word] absolute contents top-[20px] ${isUnsecured ? "left-[43.89%] right-[48.54%]" : "left-[31.74%] right-[60.69%]"}`}>
            <div className={`absolute font-["Open_Sans:Regular",sans-serif] font-normal leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap ${isUnsecured ? "inset-[18.05%_48.54%_33.08%_43.89%]" : "inset-[18.11%_60.69%_32.83%_31.74%]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[32px] mb-0">Privacy Policy</p>
              <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
              <p className="leading-[32px] mb-0">Legal</p>
              <p className="leading-[32px] mb-0">{`Contact Us `}</p>
              <p className="leading-[32px]">​</p>
            </div>
            <p className={`absolute font-["Open_Sans:Bold",sans-serif] font-bold leading-[normal] text-[#263154] text-[16px] whitespace-nowrap ${isUnsecured ? "left-[43.89%] right-[52.08%] top-[calc(50%-113px)]" : "left-[31.74%] right-[64.24%] top-[calc(50%-112.5px)]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
              {isUnsecured ? "Block 2" : isPlaceholderThree ? "Block 1" : ""}
            </p>
          </div>
          <div className={`[word-break:break-word] absolute contents top-[20px] ${isUnsecured ? "left-[58.33%] right-[34.1%]" : "left-[46.11%] right-[46.32%]"}`}>
            <div className={`absolute font-["Open_Sans:Regular",sans-serif] font-normal leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap ${isUnsecured ? "inset-[18.05%_34.1%_33.08%_58.33%]" : "inset-[18.11%_46.32%_32.83%_46.11%]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[32px] mb-0">Privacy Policy</p>
              <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
              <p className="leading-[32px] mb-0">Legal</p>
              <p className="leading-[32px] mb-0">{`Contact Us `}</p>
              <p className="leading-[32px]">​</p>
            </div>
            <p className={`absolute font-["Open_Sans:Bold",sans-serif] font-bold leading-[normal] text-[#263154] text-[16px] whitespace-nowrap ${isUnsecured ? "left-[58.33%] right-[37.64%] top-[calc(50%-113px)]" : "left-[46.11%] right-[49.86%] top-[calc(50%-112.5px)]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
              {isUnsecured ? "Block 3" : isPlaceholderThree ? "Block 2" : ""}
            </p>
          </div>
          <div className={`absolute contents top-[20px] ${isUnsecured ? "left-[1048px]" : "[word-break:break-word] left-[60.56%] right-[31.88%]"}`}>
            {isPlaceholderThree && (
              <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[18.11%_31.88%_32.83%_60.56%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                <p className="leading-[32px] mb-0">Privacy Policy</p>
                <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
                <p className="leading-[32px] mb-0">Legal</p>
                <p className="leading-[32px] mb-0">{`Contact Us `}</p>
                <p className="leading-[32px]">​</p>
              </div>
            )}
            <p className={`absolute font-["Open_Sans:Bold",sans-serif] font-bold leading-[normal] text-[#263154] text-[16px] whitespace-nowrap ${isUnsecured ? "[word-break:break-word] left-[72.78%] right-[18.54%] top-[calc(50%-113px)]" : "left-[60.56%] right-[35.42%] top-[calc(50%-112.5px)]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
              {isUnsecured ? "Stay Connected" : isPlaceholderThree ? "Block 3" : ""}
            </p>
            {isUnsecured && (
              <div className="absolute content-stretch flex gap-[16px] items-center left-[1048px] top-[55px]">
                <div className="h-[15.2px] relative shrink-0 w-[20px]" data-name="📷 facebook">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 15.2">
                    <g id="ð· facebook">
                      <path clipRule="evenodd" d={svgPaths.p3d60a00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="facebook" />
                    </g>
                  </svg>
                </div>
                <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 w-[20px]" data-name="prime:twitter">
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
                    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Clip path group">
                      <div className="col-1 h-[12.688px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.656px] mask-size-[14px_14px] ml-0 mt-[0.66px] relative row-1 w-[14px]" style={{ maskImage: `url("${imgGroup}")` }} data-name="Group">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12.688">
                          <g id="Group">
                            <path d={svgPaths.p1d6b7300} fill="var(--fill-0, #263154)" id="Vector" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[14px] relative shrink-0 w-[20px]" data-name="XMLID_823_">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 14">
                    <path clipRule="evenodd" d={svgPaths.p326bd400} fill="var(--fill-0, #263154)" fillRule="evenodd" id="XMLID_823_" />
                  </svg>
                </div>
                <div className="h-[16px] relative shrink-0 w-[20px]" data-name="linkedin">
                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
                    <g id="linkedin">
                      <path clipRule="evenodd" d={svgPaths.p8b5ce00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="Shape" />
                    </g>
                  </svg>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {isPlaceholderTwoOrPlaceholderThree && (
        <p className={`[word-break:break-word] absolute font-["Open_Sans:Bold",sans-serif] font-bold leading-[normal] text-[#263154] text-[16px] ${isPlaceholderThree ? "inset-[7.55%_8.33%_84.91%_75.07%]" : "inset-[34.34%_51.74%_58.11%_31.67%]"}`} style={{ fontVariationSettings: '"wdth" 100' }}>
          Get the Mobile Application
        </p>
      )}
      {isPlaceholderTwoOrPlaceholderOneOrPlaceholderThree && (
        <>
          <div className={`absolute ${isPlaceholderThree ? "inset-[21.13%_10.49%_66.79%_81.81%]" : isPlaceholderOne ? "inset-[47.92%_32.29%_40%_60%]" : "inset-[47.92%_53.89%_40%_38.4%]"}`} data-name="Google Play Badge US">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 111 32">
              <g id="Google Play Badge US">
                <rect fill="var(--fill-0, #263154)" height="32" id="Background Black" rx="5" width="111" />
                <path d={svgPaths.p2632eb80} fill="var(--fill-0, #999999)" id="Border Gray" />
                <path d={svgPaths.p22529870} fill="var(--fill-0, white)" id="Google Play" />
                <g id="GET IT ON">
                  <path clipRule="evenodd" d={svgPaths.p38f0b0f0} fill="var(--fill-0, white)" fillRule="evenodd" />
                  <path d={svgPaths.pba33300} fill="var(--stroke-0, white)" />
                </g>
                <g id="Icon">
                  <path d={svgPaths.p3247de00} fill="url(#paint0_linear_10_5281)" id="Shape" />
                  <path d={svgPaths.p211ff5c0} fill="url(#paint1_linear_10_5281)" id="Shape_2" />
                  <path d={svgPaths.p34d3eaec} fill="url(#paint2_linear_10_5281)" id="Shape_3" />
                  <path d={svgPaths.p3d90f900} fill="url(#paint3_linear_10_5281)" id="Shape_4" />
                  <path d={svgPaths.p2e74de00} fill="var(--fill-0, #263154)" id="Shape_5" opacity="0.2" />
                  <path d={svgPaths.p5b93500} fill="var(--fill-0, #263154)" id="Shape_6" opacity="0.12" />
                  <path d={svgPaths.p1199ca80} fill="var(--fill-0, white)" id="Shape_7" opacity="0.25" />
                </g>
              </g>
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10_5281" x1="14.3753" x2="-1.87662" y1="-6.04662" y2="-1.60432">
                  <stop stopColor="#00A0FF" />
                  <stop offset="0.01" stopColor="#00A1FF" />
                  <stop offset="0.26" stopColor="#00BEFF" />
                  <stop offset="0.51" stopColor="#00D2FF" />
                  <stop offset="0.76" stopColor="#00DFFF" />
                  <stop offset="1" stopColor="#00E3FF" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10_5281" x1="27.8223" x2="7.9328" y1="7.8409" y2="7.8409">
                  <stop stopColor="#FFE000" />
                  <stop offset="0.41" stopColor="#FFBD00" />
                  <stop offset="0.78" stopColor="#FFA500" />
                  <stop offset="1" stopColor="#FF9C00" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_10_5281" x1="8.29766" x2="-4.2821" y1="10.822" y2="32.5701">
                  <stop stopColor="#FF3A44" />
                  <stop offset="1" stopColor="#C31162" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_10_5281" x1="0.593331" x2="6.20829" y1="3.27743" y2="12.9889">
                  <stop stopColor="#32A071" />
                  <stop offset="0.07" stopColor="#2DA771" />
                  <stop offset="0.48" stopColor="#15CF74" />
                  <stop offset="0.8" stopColor="#06E775" />
                  <stop offset="1" stopColor="#00F076" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className={`absolute ${isPlaceholderThree ? "inset-[21.13%_18.75%_66.79%_75.07%]" : isPlaceholderOne ? "inset-[47.92%_40.56%_40%_53.26%]" : "inset-[47.92%_62.15%_40%_31.67%]"}`} data-name="App Store Badge US Black">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 89 32">
              <g id="App Store Badge US Black">
                <path d={svgPaths.p30285a80} fill="var(--fill-0, #999999)" id="Background Gray" />
                <path d={svgPaths.p2e6c3100} fill="var(--fill-0, #263154)" id="Background Black" />
                <path d={svgPaths.p27462500} fill="var(--fill-0, white)" id="App Store" />
                <path d={svgPaths.p12d66f80} fill="var(--fill-0, white)" id="Download on the" />
                <path d={svgPaths.p355a5900} fill="var(--fill-0, white)" id="Icon" />
              </g>
            </svg>
          </div>
        </>
      )}
      {isPlaceholderTwo && (
        <>
          <div className="-translate-y-1/2 absolute contents left-[31.67%] right-[59.65%] top-[calc(50%-101.5px)]">
            <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[31.67%] right-[59.65%] text-[#263154] text-[16px] top-[calc(50%-112.5px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Stay Connected
            </p>
          </div>
          <div className="absolute content-stretch flex gap-[16px] items-center left-[456px] top-[55px]">
            <div className="h-[15.2px] relative shrink-0 w-[20px]" data-name="📷 facebook">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 15.2">
                <g id="ð· facebook">
                  <path clipRule="evenodd" d={svgPaths.p3d60a00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="facebook" />
                </g>
              </svg>
            </div>
            <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 w-[20px]" data-name="prime:twitter">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
                <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Clip path group">
                  <div className="col-1 h-[12.688px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.656px] mask-size-[14px_14px] ml-0 mt-[0.66px] relative row-1 w-[14px]" style={{ maskImage: `url("${imgGroup}")` }} data-name="Group">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12.688">
                      <g id="Group">
                        <path d={svgPaths.p1d6b7300} fill="var(--fill-0, #263154)" id="Vector" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[14px] relative shrink-0 w-[20px]" data-name="XMLID_823_">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 14">
                <path clipRule="evenodd" d={svgPaths.p326bd400} fill="var(--fill-0, #263154)" fillRule="evenodd" id="XMLID_823_" />
              </svg>
            </div>
            <div className="h-[16px] relative shrink-0 w-[20px]" data-name="linkedin">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
                <g id="linkedin">
                  <path clipRule="evenodd" d={svgPaths.p8b5ce00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="Shape" />
                </g>
              </svg>
            </div>
          </div>
        </>
      )}
      {isPlaceholderOne && (
        <>
          <div className="absolute contents left-[767px] top-[20px]">
            <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[53.26%] right-[38.06%] text-[#263154] text-[16px] top-[calc(50%-112.5px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Stay Connected
            </p>
            <div className="absolute content-stretch flex gap-[16px] items-center left-[767px] top-[55px]">
              <div className="h-[15.2px] relative shrink-0 w-[20px]" data-name="📷 facebook">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 15.2">
                  <g id="ð· facebook">
                    <path clipRule="evenodd" d={svgPaths.p3d60a00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="facebook" />
                  </g>
                </svg>
              </div>
              <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 w-[20px]" data-name="prime:twitter">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
                  <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Clip path group">
                    <div className="col-1 h-[12.688px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.656px] mask-size-[14px_14px] ml-0 mt-[0.66px] relative row-1 w-[14px]" style={{ maskImage: `url("${imgGroup}")` }} data-name="Group">
                      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12.688">
                        <g id="Group">
                          <path d={svgPaths.p1d6b7300} fill="var(--fill-0, #263154)" id="Vector" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[14px] relative shrink-0 w-[20px]" data-name="XMLID_823_">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 14">
                  <path clipRule="evenodd" d={svgPaths.p326bd400} fill="var(--fill-0, #263154)" fillRule="evenodd" id="XMLID_823_" />
                </svg>
              </div>
              <div className="h-[16px] relative shrink-0 w-[20px]" data-name="linkedin">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
                  <g id="linkedin">
                    <path clipRule="evenodd" d={svgPaths.p8b5ce00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="Shape" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] absolute contents left-[10%] right-[82.43%] top-[20px]">
            <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[18.11%_82.43%_32.83%_10%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[32px] mb-0">Privacy Policy</p>
              <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
              <p className="leading-[32px] mb-0">Legal</p>
              <p className="leading-[32px] mb-0">{`Contact Us `}</p>
              <p className="leading-[32px]">​</p>
            </div>
            <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[10%] right-[85.97%] text-[#263154] text-[16px] top-[calc(50%-112.5px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Block 1
            </p>
          </div>
          <div className="[word-break:break-word] absolute contents left-[24.38%] right-[68.06%] top-[20px]">
            <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[18.11%_68.06%_32.83%_24.38%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[32px] mb-0">Privacy Policy</p>
              <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
              <p className="leading-[32px] mb-0">Legal</p>
              <p className="leading-[32px] mb-0">{`Contact Us `}</p>
              <p className="leading-[32px]">​</p>
            </div>
            <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[24.38%] right-[71.6%] text-[#263154] text-[16px] top-[calc(50%-112.5px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Block 2
            </p>
          </div>
          <div className="[word-break:break-word] absolute contents left-[38.82%] right-[53.61%] top-[20px]">
            <div className="absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[18.11%_53.61%_32.83%_38.82%] leading-[0] text-[#0a7593] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[32px] mb-0">Privacy Policy</p>
              <p className="leading-[32px] mb-0">{`Terms of Use `}</p>
              <p className="leading-[32px] mb-0">Legal</p>
              <p className="leading-[32px] mb-0">{`Contact Us `}</p>
              <p className="leading-[32px]">​</p>
            </div>
            <p className="absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[38.82%] right-[57.15%] text-[#263154] text-[16px] top-[calc(50%-112.5px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Block 3
            </p>
          </div>
        </>
      )}
      {isPlaceholderFour && (
        <>
          <div className="absolute bg-[#fff2f8] inset-0" data-name="Rectangle Copy" />
          <div className="absolute content-stretch flex gap-[16px] items-center left-[143px] top-[58px]">
            <div className="h-[15.2px] relative shrink-0 w-[20px]" data-name="📷 facebook">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 15.2">
                <g id="ð· facebook">
                  <path clipRule="evenodd" d={svgPaths.p3d60a00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="facebook" />
                </g>
              </svg>
            </div>
            <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 w-[20px]" data-name="prime:twitter">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Group">
                <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-name="Clip path group">
                  <div className="col-1 h-[12.688px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.656px] mask-size-[14px_14px] ml-0 mt-[0.66px] relative row-1 w-[14px]" style={{ maskImage: `url("${imgGroup}")` }} data-name="Group">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12.688">
                      <g id="Group">
                        <path d={svgPaths.p1d6b7300} fill="var(--fill-0, #263154)" id="Vector" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[14px] relative shrink-0 w-[20px]" data-name="XMLID_823_">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 14">
                <path clipRule="evenodd" d={svgPaths.p326bd400} fill="var(--fill-0, #263154)" fillRule="evenodd" id="XMLID_823_" />
              </svg>
            </div>
            <div className="h-[16px] relative shrink-0 w-[20px]" data-name="linkedin">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
                <g id="linkedin">
                  <path clipRule="evenodd" d={svgPaths.p8b5ce00} fill="var(--fill-0, #263154)" fillRule="evenodd" id="Shape" />
                </g>
              </svg>
            </div>
          </div>
          <div className="absolute bottom-[10px] h-[30px] left-[1162px] w-[100px]" data-name="image 3">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage3} />
          </div>
          <p className="[word-break:break-word] absolute bottom-[33px] font-['Open_Sans:Regular',sans-serif] font-normal leading-[16px] left-[1081px] text-[#565962] text-[12px] translate-y-full whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            Powered by
          </p>
          <div className="-translate-y-1/2 absolute contents left-[10%] right-[70.9%] top-[calc(50%+97px)]">
            <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold h-[23px] leading-[20px] left-[10%] right-[70.9%] text-[#263154] text-[16px] top-[calc(50%+85.5px)]" style={{ fontVariationSettings: '"wdth" 100' }}>{`A1M Health `}</p>
          </div>
          <p className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[14px] left-[144px] text-[#565962] text-[12px] top-[calc(50%+110.5px)] whitespace-pre" style={{ fontVariationSettings: '"wdth" 100' }}>{`Copyright © 2022 A1M Health  • CA Insurance License Number 0451271`}</p>
          <div className="absolute h-0 left-0 top-[210px] w-[1440px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 1">
                <line id="Line 23" stroke="var(--stroke-0, #999999)" x2="1440" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </>
      )}
      {["Placeholder Four", "Unsecured"].includes(property1) && (
        <p className={`[word-break:break-word] absolute text-[#263154] ${isUnsecured ? 'font-["Open_Sans:Regular",sans-serif] font-normal inset-[40.6%_75.28%_52.63%_7.78%] leading-[0] text-[0px]' : 'font-["Open_Sans:Bold",sans-serif] font-bold inset-[34.34%_73.4%_58.11%_10%] leading-[normal] text-[16px]'}`} style={{ fontVariationSettings: '"wdth" 100' }}>
          {isPlaceholderFour && "Get the Mobile Application"}
          {isUnsecured && (
            <>
              <span className="leading-[normal] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>{`Email: `}</span>
              <span className="leading-[normal] text-[#0a7593] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
                support@eldocomp.com
              </span>
            </>
          )}
        </p>
      )}
      {isPlaceholderFour && (
        <>
          <div className="absolute inset-[47.92%_75.56%_40%_16.74%]" data-name="Google Play Badge US">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 111 32">
              <g id="Google Play Badge US">
                <rect fill="var(--fill-0, #263154)" height="32" id="Background Black" rx="5" width="111" />
                <path d={svgPaths.p2632eb80} fill="var(--fill-0, #999999)" id="Border Gray" />
                <path d={svgPaths.p22529870} fill="var(--fill-0, white)" id="Google Play" />
                <g id="GET IT ON">
                  <path clipRule="evenodd" d={svgPaths.p38f0b0f0} fill="var(--fill-0, white)" fillRule="evenodd" />
                  <path d={svgPaths.pba33300} fill="var(--stroke-0, white)" />
                </g>
                <g id="Icon">
                  <path d={svgPaths.p3247de00} fill="url(#paint0_linear_10_5281)" id="Shape" />
                  <path d={svgPaths.p211ff5c0} fill="url(#paint1_linear_10_5281)" id="Shape_2" />
                  <path d={svgPaths.p34d3eaec} fill="url(#paint2_linear_10_5281)" id="Shape_3" />
                  <path d={svgPaths.p3d90f900} fill="url(#paint3_linear_10_5281)" id="Shape_4" />
                  <path d={svgPaths.p2e74de00} fill="var(--fill-0, #263154)" id="Shape_5" opacity="0.2" />
                  <path d={svgPaths.p5b93500} fill="var(--fill-0, #263154)" id="Shape_6" opacity="0.12" />
                  <path d={svgPaths.p1199ca80} fill="var(--fill-0, white)" id="Shape_7" opacity="0.25" />
                </g>
              </g>
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10_5281" x1="14.3753" x2="-1.87662" y1="-6.04662" y2="-1.60432">
                  <stop stopColor="#00A0FF" />
                  <stop offset="0.01" stopColor="#00A1FF" />
                  <stop offset="0.26" stopColor="#00BEFF" />
                  <stop offset="0.51" stopColor="#00D2FF" />
                  <stop offset="0.76" stopColor="#00DFFF" />
                  <stop offset="1" stopColor="#00E3FF" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_10_5281" x1="27.8223" x2="7.9328" y1="7.8409" y2="7.8409">
                  <stop stopColor="#FFE000" />
                  <stop offset="0.41" stopColor="#FFBD00" />
                  <stop offset="0.78" stopColor="#FFA500" />
                  <stop offset="1" stopColor="#FF9C00" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_10_5281" x1="8.29766" x2="-4.2821" y1="10.822" y2="32.5701">
                  <stop stopColor="#FF3A44" />
                  <stop offset="1" stopColor="#C31162" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_10_5281" x1="0.593331" x2="6.20829" y1="3.27743" y2="12.9889">
                  <stop stopColor="#32A071" />
                  <stop offset="0.07" stopColor="#2DA771" />
                  <stop offset="0.48" stopColor="#15CF74" />
                  <stop offset="0.8" stopColor="#06E775" />
                  <stop offset="1" stopColor="#00F076" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute inset-[47.92%_83.82%_40%_10%]" data-name="App Store Badge US Black">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 89 32">
              <g id="App Store Badge US Black">
                <path d={svgPaths.p30285a80} fill="var(--fill-0, #999999)" id="Background Gray" />
                <path d={svgPaths.p2e6c3100} fill="var(--fill-0, #263154)" id="Background Black" />
                <path d={svgPaths.p27462500} fill="var(--fill-0, white)" id="App Store" />
                <path d={svgPaths.p12d66f80} fill="var(--fill-0, white)" id="Download on the" />
                <path d={svgPaths.p355a5900} fill="var(--fill-0, white)" id="Icon" />
              </g>
            </svg>
          </div>
          <div className="-translate-y-1/2 absolute contents left-[10%] right-[81.32%] top-[calc(50%-101.5px)]">
            <p className="[word-break:break-word] absolute font-['Open_Sans:Bold',sans-serif] font-bold leading-[normal] left-[10%] right-[81.32%] text-[#263154] text-[16px] top-[calc(50%-112.5px)] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Stay Connected
            </p>
          </div>
        </>
      )}
      {isUnsecured && (
        <div className="[word-break:break-word] absolute font-['Open_Sans:Regular',sans-serif] font-normal inset-[54.89%_74.39%_30.08%_7.78%] leading-[0] text-[#263154] text-[14px] whitespace-pre-wrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          <p className="leading-[normal] mb-0">{`9025 Smoky Hollow Street `}</p>
          <p className="leading-[normal]">Niagara Falls, NY 14304</p>
        </div>
      )}
    </div>
  );
}
```

## src/imports/WebFooter/svg-06har4wwnf.ts
```ts
export default {
p1199ca80: "M10.2883 6.09693L26.3134 14.9609C26.7382 15.165 27.0419 15.5491 27.1356 16.0009C27.0932 15.5014 26.7796 15.062 26.3134 14.8489L10.2883 5.98493C9.13715 5.35293 8.19982 5.88093 8.19982 7.16093V7.28093C8.22448 5.99293 9.14537 5.46493 10.2883 6.09693V6.09693Z",
p12d66f80: "M76.4588 8.08691C77.3907 8.08691 77.953 8.77212 77.953 9.90332V10.1514H75.5877V10.1904C75.5668 10.4577 75.6523 10.7225 75.8221 10.9189C75.9919 11.1154 76.231 11.2256 76.4803 11.2227C76.8036 11.2643 77.1186 11.092 77.2772 10.7861H77.9129C77.7276 11.4656 77.1163 11.9045 76.4618 11.8281C76.0153 11.8408 75.5858 11.6422 75.2879 11.2842C74.99 10.9261 74.8538 10.4448 74.9149 9.96875C74.8555 9.49154 74.9918 9.01043 75.2879 8.64941C75.5842 8.28836 76.0112 8.08284 76.4588 8.08691ZM31.746 8.34375C32.2583 8.00185 32.9065 8.00178 33.4188 8.34375C33.931 8.6858 34.2184 9.31048 34.161 9.95605C34.2195 10.6024 33.9325 11.2285 33.4198 11.5713C32.907 11.914 32.2578 11.9138 31.745 11.5713C31.2321 11.2285 30.9443 10.6024 31.0028 9.95605C30.9454 9.31036 31.2336 8.68576 31.746 8.34375ZM46.2723 8.34375C46.7848 8.00173 47.4337 8.00173 47.9461 8.34375C48.4584 8.6858 48.7467 9.31046 48.6893 9.95605C48.7477 10.6024 48.4599 11.2285 47.9471 11.5713C47.4344 11.9139 46.7851 11.9138 46.2723 11.5713C45.7594 11.2286 45.4717 10.6025 45.5301 9.95605C45.4728 9.3105 45.7602 8.68583 46.2723 8.34375ZM59.6727 8.34375C60.1851 8.00174 60.8332 8.00174 61.3456 8.34375C61.8579 8.68577 62.1462 9.31039 62.0887 9.95605C62.1472 10.6024 61.8594 11.2286 61.3465 11.5713C60.8337 11.914 60.1846 11.914 59.6717 11.5713C59.1589 11.2286 58.8711 10.6024 58.9295 9.95605C58.8721 9.31038 59.1603 8.68577 59.6727 8.34375ZM50.8885 8.08691C51.7281 8.08695 52.202 8.53694 52.202 9.29785V11.7588H51.5653V11.2529H51.5135C51.2974 11.6226 50.9122 11.8385 50.5067 11.8184C50.2226 11.85 49.939 11.7511 49.7264 11.5459C49.5138 11.3405 49.3917 11.0476 49.3905 10.7402C49.3905 10.0918 49.8398 9.71817 50.6366 9.66504L51.5438 9.6084V9.29785C51.5438 8.91747 51.3098 8.70225 50.8583 8.70215C50.4893 8.70215 50.2334 8.84786 50.16 9.10254H49.5204C49.5879 8.48381 50.1288 8.08691 50.8885 8.08691ZM56.1932 11.7588H55.5594V11.1895H55.5067C55.292 11.5929 54.8868 11.8355 54.4549 11.8184C53.6033 11.8181 53.0653 11.0968 53.0653 9.95605C53.0653 8.81798 53.609 8.09694 54.4549 8.09668C54.8822 8.0755 55.2827 8.32162 55.4823 8.72852H55.5321V6.75H56.1932V11.7588ZM69.5516 8.17285H70.2772V8.77148H69.5516V10.624C69.5516 11.0013 69.6964 11.1669 70.0252 11.167C70.1094 11.1667 70.1937 11.161 70.2772 11.1504V11.7422C70.1586 11.765 70.0383 11.778 69.9178 11.7793C69.1831 11.7792 68.8906 11.5008 68.8905 10.8066V8.77148H68.3583V8.17285H68.8905V7.25977H69.5516V8.17285ZM28.1356 6.98535C28.7224 6.94006 29.2975 7.18019 29.702 7.63965C30.1063 8.099 30.2983 8.72891 30.2245 9.35645C30.2245 10.8814 29.4575 11.7588 28.1356 11.7588H26.5331V6.98535H28.1356ZM35.9032 10.9053H35.953L36.6415 8.15625H37.2752L37.9637 10.9053H38.0155L38.6131 8.15625H39.2743L38.3544 11.7588H37.6688L36.9764 9.10547H36.9247L36.2352 11.7588H35.5555L34.6327 8.15625H35.3036L35.9032 10.9053ZM41.746 8.08691C42.076 8.06022 42.3994 8.19638 42.6249 8.45703C42.8504 8.71768 42.9536 9.07455 42.9051 9.42676V11.7588H42.244V9.60449C42.2439 9.02589 42.01 8.73828 41.5213 8.73828C41.2976 8.72717 41.0803 8.82169 40.9266 8.99707C40.773 9.17252 40.6978 9.41171 40.7215 9.65137V11.7588H40.0614V8.15625H40.6971V8.72852H40.7469C40.9187 8.30722 41.3197 8.0497 41.746 8.08691ZM44.6141 11.7588H43.953V6.75H44.6141V11.7588ZM64.662 8.08691C64.9921 8.06022 65.3154 8.19638 65.5409 8.45703C65.7663 8.71767 65.8696 9.07457 65.8211 9.42676V11.7588H65.16V9.60449C65.1599 9.02589 64.926 8.73828 64.4374 8.73828C64.2135 8.72713 63.9963 8.82166 63.8426 8.99707C63.689 9.17253 63.6138 9.41169 63.6376 9.65137V11.7588H62.9774V8.15625H63.6131V8.72852H63.6629C63.8347 8.30718 64.2357 8.04964 64.662 8.08691ZM71.8368 8.73535H71.8885C72.0685 8.31033 72.4772 8.05207 72.91 8.08984C73.2382 8.07063 73.5571 8.21003 73.7801 8.46973C74.0031 8.72939 74.107 9.08226 74.0633 9.43262V11.7588H73.4022V9.6084C73.4022 9.03301 73.1524 8.74121 72.6854 8.74121C72.4556 8.72102 72.2288 8.81129 72.0663 8.9873C71.9039 9.16328 71.8223 9.40735 71.8426 9.6543V11.7588H71.1815V6.75H71.8368V8.73535ZM50.7245 10.1875C50.2634 10.2207 50.0545 10.3895 50.0545 10.707C50.0548 11.031 50.3162 11.2197 50.6756 11.2197C50.8884 11.2428 51.1011 11.1718 51.2645 11.0234C51.4278 10.875 51.5284 10.6611 51.5428 10.4316V10.1309L50.7245 10.1875ZM32.5799 8.71875C32.0055 8.71875 31.6816 9.17531 31.6815 9.95605C31.6815 10.7432 32.0054 11.1963 32.5799 11.1963C33.1521 11.1961 33.4784 10.7399 33.4784 9.95605C33.4783 9.17544 33.1521 8.71889 32.5799 8.71875ZM47.1161 8.71875C46.5419 8.71897 46.2187 9.1755 46.2186 9.95605C46.2186 10.743 46.5418 11.1961 47.1161 11.1963C47.6884 11.1963 48.0145 10.74 48.0145 9.95605C48.0145 9.17532 47.6884 8.71875 47.1161 8.71875ZM60.5047 8.71875C59.9303 8.71877 59.6073 9.17533 59.6073 9.95605C59.6073 10.7431 59.9303 11.1963 60.5047 11.1963C61.0771 11.1963 61.4032 10.74 61.4032 9.95605C61.4031 9.17532 61.077 8.71875 60.5047 8.71875ZM54.6454 8.73535C54.089 8.73535 53.7499 9.19824 53.7499 9.95605C53.7499 10.7201 54.0854 11.1797 54.6454 11.1797C55.2022 11.1794 55.5467 10.7131 55.5467 9.95898C55.5467 9.20852 55.1985 8.73561 54.6454 8.73535ZM27.2196 11.084H28.0565C28.4758 11.1109 28.8839 10.9335 29.1678 10.6006C29.4517 10.2675 29.5816 9.81422 29.5204 9.36719C29.577 8.92216 29.446 8.47281 29.1629 8.14258C28.915 7.85342 28.5729 7.68173 28.2118 7.66016H27.2196V11.084ZM76.4667 8.69141C76.2357 8.68829 76.0127 8.78621 75.8495 8.96191C75.6864 9.13759 75.5965 9.37673 75.5995 9.625H77.2909C77.3077 9.38052 77.2272 9.13963 77.0702 8.96191C76.9133 8.78441 76.6943 8.68593 76.4667 8.69141Z",
p1d6b7300: "M11.025 0H13.172L8.482 5.374L14 12.688H9.68L6.294 8.253L2.424 12.688H0.275L5.291 6.938L0 0.000999987H4.43L7.486 4.054L11.025 0ZM10.27 11.4H11.46L3.78 1.221H2.504L10.27 11.4Z",
p211ff5c0: "M22.2066 19.4251L18.8355 16.1211V15.8891L22.2066 12.5771L22.2806 12.6171L26.3177 14.8491C27.4688 15.4811 27.4688 16.5211 26.3177 17.1611L22.297 19.3851L22.2066 19.4251Z",
p22529870: "M63.5398 17.3585C64.2428 17.3576 64.9129 17.6485 65.3816 18.1583H65.4392V17.5987H66.8533V23.6544C66.8533 26.1664 65.3649 27.1984 63.5642 27.1984C62.2071 27.2061 60.9807 26.4119 60.4646 25.1905L61.8055 24.6466C62.0856 25.3592 62.7803 25.8366 63.5642 25.8546C64.7153 25.8546 65.4314 25.1585 65.4314 23.8546V23.3663H65.3816C64.9195 23.8849 64.2452 24.1777 63.5398 24.1661C61.6736 24.078 60.207 22.5807 60.2068 20.7628C60.2068 18.9448 61.6735 17.4466 63.5398 17.3585ZM99.9402 21.9357H99.99L101.75 17.5997H103.46L99.2498 27.0314H97.6463L99.2088 23.6642L96.4705 17.5997H98.115L99.9402 21.9357ZM48.3719 17.3985C49.3034 17.3827 50.2016 17.7345 50.8621 18.3741C51.5239 19.015 51.8902 19.8895 51.8767 20.798C51.8767 22.6746 50.3142 24.1967 48.3855 24.1984C46.4568 24.1998 44.8907 22.6804 44.8875 20.8038C44.8845 18.9278 46.4441 17.4042 48.3719 17.3985ZM56.0183 17.3985C56.952 17.3811 57.8535 17.7332 58.5154 18.3741C59.177 19.015 59.5435 19.8897 59.5301 20.798C59.53 22.6736 57.9685 24.1953 56.0408 24.1984C54.113 24.2013 52.5468 22.6844 52.5408 20.8087C52.5348 18.9332 54.0908 17.4076 56.0183 17.3985ZM73.5213 17.3985C74.8845 17.4474 76.0754 18.3099 76.5144 19.5665L76.6873 19.9269L72.0086 21.8067C72.3018 22.4563 72.9733 22.8658 73.7019 22.839C74.4056 22.8407 75.0587 22.4817 75.4207 21.8946L76.6131 22.6944C75.964 23.6396 74.8702 24.2045 73.7019 24.1984C72.7735 24.2115 71.8797 23.8569 71.2254 23.2159C70.5711 22.5748 70.2121 21.7022 70.2322 20.7989C70.1754 19.9162 70.4969 19.0495 71.1199 18.4054C71.7429 17.7613 72.6122 17.3969 73.5213 17.3985ZM39.2556 13.5987C40.6539 13.587 41.9977 14.1268 42.9803 15.0948L41.9363 16.1105C41.2158 15.4337 40.2482 15.0633 39.2469 15.0792C37.0673 15.0794 35.3006 16.7984 35.3006 18.9191C35.3007 21.0396 37.0674 22.7587 39.2469 22.7589C40.2717 22.7986 41.2666 22.4153 41.9851 21.7032C42.4619 21.2055 42.7517 20.5651 42.8074 19.8868H39.2556V18.4464L44.2459 18.4073C44.3032 18.7052 44.3315 19.0076 44.3289 19.3107C44.3676 20.5552 43.9071 21.7658 43.0457 22.6866C42.0613 23.6895 40.6795 24.2296 39.2556 24.1671C37.265 24.2425 35.3912 23.252 34.3728 21.586C33.3545 19.9202 33.3546 17.8457 34.3728 16.1798C35.3912 14.5139 37.265 13.5234 39.2556 13.5987ZM93.2176 17.3585L93.2586 17.3829C95.0099 17.3829 96.3747 18.3986 96.3748 20.1505V23.9982H94.8953V23.1984H94.8455C94.4176 23.8453 93.6614 24.2133 92.8728 24.1583C92.2328 24.2043 91.601 23.9965 91.1209 23.5821C90.6409 23.1679 90.3535 22.5827 90.324 21.9591C90.324 20.5111 91.8122 19.711 93.284 19.711C93.8426 19.7088 94.3937 19.8405 94.8875 20.0948V19.9903C94.8482 19.6061 94.6517 19.253 94.3426 19.0109C94.0335 18.7688 93.6371 18.6576 93.243 18.7023C92.6683 18.6565 92.1195 18.9455 91.8445 19.4386L90.4803 18.8868C90.9988 17.8926 92.0737 17.2921 93.2176 17.3585ZM69.4695 23.9991H67.9324V13.9991H69.4695V23.9991ZM89.4715 13.9991V23.9991H87.9344V13.9991H89.4715ZM83.7078 13.9982C84.9021 13.9148 86.0444 14.4878 86.6678 15.4825C87.291 16.4773 87.2911 17.728 86.6678 18.7228C86.0444 19.7174 84.902 20.2895 83.7078 20.2062H81.5613V23.9982H80.0242V13.9982H83.7078ZM49.0076 18.8819C48.1958 18.5737 47.2728 18.7795 46.6805 19.4015C46.0881 20.0236 45.9471 20.9352 46.325 21.6993C46.7031 22.4635 47.5231 22.9248 48.3924 22.8624H48.3846C48.9299 22.8501 49.4466 22.624 49.8181 22.2355C50.1897 21.8469 50.3849 21.329 50.3582 20.7989C50.3558 19.9508 49.8196 19.1904 49.0076 18.8819ZM56.6502 18.8829C55.8393 18.5738 54.9163 18.7782 54.323 19.3985C53.7298 20.0191 53.5862 20.9297 53.9617 21.6944C54.3372 22.459 55.1554 22.9225 56.0242 22.8634C56.5694 22.851 57.0863 22.6249 57.4578 22.2364C57.8294 21.8478 58.0236 21.3291 57.9969 20.7989C57.9945 19.9518 57.4608 19.1921 56.6502 18.8829ZM63.6697 22.8634H63.6785C63.6773 22.8633 63.6758 22.8625 63.6746 22.8624C63.673 22.8625 63.6713 22.8633 63.6697 22.8634ZM63.6785 18.7355C62.5791 18.8297 61.7351 19.7261 61.7351 20.7999C61.7354 21.8724 62.5771 22.7665 63.6746 22.8624C64.2072 22.8412 64.7082 22.6105 65.0613 22.2218C65.4153 21.832 65.5899 21.3182 65.5447 20.7999C65.5853 20.2839 65.4097 19.7734 65.0584 19.3849C64.7071 18.9964 64.2096 18.7621 63.6785 18.7355ZM93.4334 20.9269C92.6607 20.927 91.7901 21.1908 91.7898 21.9903C91.7898 22.5903 92.4885 22.839 92.99 22.839L93.031 22.8624C93.9572 22.8404 94.7255 22.1583 94.8318 21.2628C94.4052 21.0311 93.9218 20.9151 93.4334 20.9269ZM73.573 18.7189C73.0587 18.7414 72.5746 18.9648 72.2312 19.338C71.8881 19.7112 71.7142 20.2035 71.7478 20.7032L74.8719 19.4386C74.6261 18.9673 74.115 18.6842 73.573 18.7189ZM81.5525 18.7989H83.699L83.7312 18.8224C84.7053 18.8224 85.4949 18.0543 85.4949 17.1066C85.4948 16.1589 84.7052 15.3907 83.7312 15.3907H81.5525V18.7989Z",
p2632eb80: "M106.889 0C109.159 0 111 1.79086 111 4V28C111 30.2091 109.159 32 106.889 32H4.11133C1.84082 32 0 30.2091 0 28V4C3.31081e-08 1.79086 1.84082 0 4.11133 0H106.889ZM4.1084 0.639648C2.20117 0.639648 0.654297 2.14432 0.654297 4V28C0.654492 29.8555 2.20129 31.3594 4.1084 31.3594H106.886C108.793 31.3594 110.339 29.8555 110.339 28V4C110.339 2.14433 108.793 0.639663 106.886 0.639648H4.1084Z",
p27462500: "M38.1852 17.0771C39.8942 17.0772 41.0212 18.5309 41.0212 20.7754C41.0211 23.026 39.9007 24.4717 38.2106 24.4717C37.337 24.5208 36.5136 24.0292 36.0915 23.2051H36.0602V26.792H34.6774V17.1533H36.0153V18.3584H36.0407C36.4816 17.5394 37.3058 17.0466 38.1852 17.0771ZM45.6003 17.0771C47.3092 17.0773 48.4352 18.531 48.4352 20.7754C48.4352 23.026 47.3157 24.4716 45.6257 24.4717C44.7521 24.5208 43.9287 24.0292 43.5065 23.2051H43.4753V26.792H42.0925V17.1533H43.4304V18.3584H43.4557C43.8966 17.5394 44.7209 17.0466 45.6003 17.0771ZM55.529 14.2969C57.4805 14.2969 58.8179 15.4745 58.863 17.1885H57.4684C57.3849 16.1971 56.6228 15.5987 55.5095 15.5986C54.3961 15.5986 53.6336 16.2038 53.6335 17.085C53.6335 17.7873 54.1208 18.2012 55.3112 18.5176L56.3288 18.7861C58.2235 19.2682 59.0104 20.087 59.0104 21.54C59.0103 23.3985 57.634 24.5625 55.445 24.5625C53.397 24.5624 52.0138 23.4257 51.9245 21.6289H53.3395C53.4419 22.614 54.3318 23.2607 55.5475 23.2607C56.7126 23.2607 57.5505 22.6139 57.5505 21.7256C57.5504 20.9546 57.0452 20.4931 55.8483 20.1768L54.6511 19.8662C52.9555 19.4256 52.1687 18.5726 52.1686 17.1885C52.1686 15.4744 53.557 14.2969 55.529 14.2969ZM67.2048 17.0645C69.1571 17.0645 70.3991 18.4965 70.3991 20.7754C70.3991 23.0605 69.1636 24.4863 67.2048 24.4863C65.2467 24.4862 64.0114 23.0604 64.0114 20.7754C64.0114 18.4966 65.2591 17.0646 67.2048 17.0645ZM78.4001 17.0645C80.2628 17.0646 81.4341 18.441 81.4343 20.6367V21.1465H76.6784V21.2363C76.634 21.7755 76.8074 22.3096 77.154 22.7021C77.5005 23.0944 77.9871 23.308 78.4899 23.2881C79.1605 23.3556 79.7926 22.9413 80.0446 22.2695H81.3571C81.171 23.5841 79.9806 24.4863 78.4577 24.4863C76.4989 24.4863 75.2829 23.0744 75.2829 20.8096C75.283 18.5378 76.5059 17.0645 78.4001 17.0645ZM61.987 17.1533H63.2673V18.3311H61.987V22.3242C61.9871 22.9442 62.2436 23.2334 62.8063 23.2334C62.9581 23.2305 63.1097 23.2192 63.2604 23.1992V24.3691C63.0075 24.4199 62.7501 24.4426 62.4929 24.4375C61.1298 24.4374 60.5983 23.887 60.5983 22.4824V18.3311H59.6188V17.1533H60.5983V15.4395H61.987V17.1533ZM33.821 24.3975H32.3044L31.4596 21.7119H27.9391L27.0934 24.3975H25.6022L28.9372 14.4629H30.486L33.821 24.3975ZM74.5104 17.0771C74.6697 17.0766 74.8287 17.0954 74.9841 17.1328V18.5234C74.783 18.4574 74.5731 18.427 74.363 18.4336C73.9568 18.4159 73.5636 18.59 73.2868 18.9102C73.01 19.2304 72.8767 19.6652 72.9225 20.0996V24.3965H71.5407V17.1533H72.8591V18.3857H72.8913C73.0752 17.5924 73.7508 17.0461 74.5104 17.0771ZM67.2009 18.29C66.0811 18.2903 65.4157 19.2203 65.4157 20.7764C65.4158 22.3455 66.0812 23.2605 67.2009 23.2607C68.3207 23.2607 68.9869 22.3456 68.987 20.7764C68.987 19.2131 68.3208 18.29 67.2009 18.29ZM37.8278 18.3457C36.7717 18.3457 36.0612 19.3303 36.0612 20.7764C36.0613 22.2356 36.7718 23.2129 37.8278 23.2129C38.9025 23.2127 39.607 22.2558 39.6071 20.7764C39.6071 19.3101 38.9026 18.3459 37.8278 18.3457ZM45.2311 18.3457C44.1751 18.3457 43.4645 19.3303 43.4645 20.7764C43.4646 22.2356 44.1751 23.2129 45.2311 23.2129C46.3058 23.2126 47.0104 22.2557 47.0104 20.7764C47.0104 19.3102 46.3058 18.346 45.2311 18.3457ZM28.3083 20.4727H31.0993L29.7233 16.1152H29.6852L28.3083 20.4727ZM78.3932 18.2686C77.9386 18.2656 77.5014 18.4586 77.1794 18.8037C76.8574 19.1489 76.6772 19.6184 76.6784 20.1074H80.0446C80.0697 19.623 79.9059 19.1487 79.5925 18.7998C79.279 18.451 78.8441 18.2583 78.3932 18.2686Z",
p2e6c3100: "M6.28145 31.3001C6.05484 31.3001 5.83371 31.297 5.60888 31.2915C5.14314 31.285 4.67847 31.2414 4.21871 31.1611C3.79001 31.0816 3.37471 30.9339 2.98652 30.7227C2.60188 30.5133 2.25106 30.2387 1.9475 29.9095C1.63954 29.5841 1.38315 29.2067 1.1885 28.7923C0.991692 28.3751 0.855492 27.928 0.78464 27.4665C0.708127 26.9706 0.66673 26.4692 0.660806 25.9665C0.656091 25.7978 0.649918 25.236 0.649918 25.236V6.75565C0.649918 6.75565 0.656492 6.20252 0.660843 6.04002C0.666515 5.53817 0.707671 5.0375 0.783956 4.54237C0.854938 4.07958 0.991244 3.63118 1.18815 3.21269C1.3821 2.79854 1.63706 2.42088 1.94316 2.09433C2.24892 1.76469 2.60086 1.48868 2.98615 1.27636C3.37345 1.06587 3.78797 0.919181 4.21581 0.841211C4.67708 0.760064 5.14335 0.716192 5.61071 0.709963L6.28181 0.700195H82.7158L83.3949 0.710355C83.858 0.716275 84.3201 0.759755 84.7771 0.840427C85.2093 0.919375 85.6281 1.06709 86.0198 1.27871C86.7917 1.70658 87.4198 2.38352 87.816 3.21464C88.0097 3.63025 88.1439 4.07499 88.214 4.53377C88.2912 5.03297 88.3344 5.53757 88.3433 6.04354C88.3454 6.2701 88.3454 6.51346 88.3454 6.75565C88.3513 7.05565 88.3513 7.34119 88.3513 7.62908V24.372C88.3513 24.6626 88.3513 24.9462 88.3454 25.2321C88.3454 25.4923 88.3454 25.7306 88.3425 25.9759C88.3339 26.4728 88.2914 26.9684 88.2154 27.4587C88.146 27.9235 88.0106 28.3741 87.8138 28.7947C87.6178 29.2046 87.3629 29.5787 87.0585 29.9032C86.7546 30.2342 86.4032 30.5105 86.0177 30.7212C85.627 30.934 85.2088 31.0823 84.7771 31.1611C84.3174 31.2418 83.8527 31.2854 83.3869 31.2915C83.169 31.297 82.9409 31.3001 82.7194 31.3001L81.9132 31.3017L6.28145 31.3001Z",
p2e74de00: "M22.2147 19.3047L10.3007 25.9047C9.81313 26.2594 9.14378 26.2594 8.65623 25.9047L8.59868 25.9607L8.65623 26.0167C9.14286 26.374 9.81405 26.374 10.3007 26.0167L22.3133 19.3767L22.2147 19.3047Z",
p30285a80: "M81.9126 0.000104H7.09141C6.81867 0.000104 6.54921 0.000104 6.2772 0.00170399C6.0495 0.00330399 5.82362 0.00795197 5.59373 0.011864C5.09432 0.0181854 4.59607 0.0654448 4.10334 0.153232C3.61129 0.242929 3.13466 0.412035 2.68956 0.65483C2.24501 0.899678 1.8388 1.21783 1.48569 1.59775C1.13072 1.97661 0.834831 2.41451 0.609391 2.89462C0.383328 3.37378 0.226576 3.88724 0.144548 4.41727C0.0617393 4.94664 0.0171794 5.4821 0.0112678 6.01887C0.00436581 6.26415 0.00363693 6.51024 0 6.75555V25.2469C0.00363693 25.4953 0.00436581 25.7359 0.0112678 25.9844C0.0171812 26.5212 0.0617411 27.0566 0.144548 27.5859C0.226349 28.1163 0.383111 28.63 0.609391 29.1094C0.834728 29.5879 1.13066 30.0241 1.48569 30.4008C1.83746 30.7824 2.24393 31.1008 2.68956 31.3438C3.13465 31.5872 3.61123 31.7573 4.10334 31.8484C4.59616 31.9355 5.09435 31.9828 5.59373 31.9898C5.82362 31.9953 6.0495 31.9984 6.2772 31.9984C6.54921 32 6.81869 32 7.09141 32H81.9126C82.1799 32 82.4515 32 82.7188 31.9984C82.9454 31.9984 83.1779 31.9953 83.4045 31.9898C83.9029 31.9831 84.4002 31.9359 84.892 31.8484C85.3857 31.7567 85.864 31.5866 86.3112 31.3438C86.7564 31.1006 87.1625 30.7823 87.514 30.4008C87.8681 30.0226 88.1647 29.5868 88.3928 29.1094C88.6174 28.6297 88.7727 28.116 88.8533 27.5859C88.9362 27.0565 88.9823 26.5212 88.9913 25.9844C88.9942 25.7359 88.9942 25.4953 88.9942 25.2469C89 24.9563 89 24.6672 89 24.3719V7.62898C89 7.33602 89 7.04539 88.9942 6.75555C88.9942 6.51024 88.9942 6.26415 88.9913 6.01884C88.9823 5.48202 88.9362 4.94668 88.8533 4.41724C88.7724 3.88752 88.6172 3.3741 88.3928 2.89459C87.9337 1.93225 87.2057 1.14892 86.3112 0.654758C85.864 0.412557 85.3856 0.243496 84.892 0.15316C84.4003 0.064986 83.903 0.0177102 83.4045 0.011752C83.1779 0.00784797 82.9454 0.00315999 82.7188 0.00159999C82.4515 0 82.1799 0 81.9126 0V0.000104Z",
p3247de00: "M8.59244 6.03256C8.32444 6.34545 8.18918 6.746 8.21421 7.15256V24.8486C8.18918 25.2551 8.32444 25.6557 8.59244 25.9686L8.64999 26.0246L18.8373 16.1206V15.8886L8.64999 5.97656L8.59244 6.03256Z",
p326bd400: "M14.6201 0C17.1656 0 18.4985 0.348194 19.2205 1.2018C19.9457 2.05919 20 3.37246 20 5.27803V8.72204C20 10.9057 19.6537 12.1669 18.8422 12.9394C18.0508 13.6927 16.8276 14 14.6201 14H5.37974C0.832 14 0 12.2226 0 8.72204V5.27803C0 3.47109 0 2.16553 0.701226 1.27945C1.42045 0.370654 2.77594 0 5.37974 0H14.6201ZM8.64406 9.65676L12.8401 7.47551C13.0532 7.36475 13.1867 7.14522 13.1865 6.90586C13.1861 6.66669 13.0521 6.44748 12.8386 6.33724L8.64258 4.17004C8.44265 4.06673 8.20297 4.07469 8.01026 4.19109C7.81761 4.3075 7.70006 4.51541 7.70006 4.7395V9.08801C7.70006 9.31248 7.81794 9.52059 8.01097 9.63693C8.11348 9.69866 8.22923 9.72972 8.34523 9.72972C8.44768 9.72972 8.55026 9.70553 8.64406 9.65676Z",
p34d3eaec: "M22.3134 19.376L18.8436 16L8.59868 25.968C9.08274 26.382 9.80112 26.4022 10.3089 26.016L22.3216 19.376",
p355a5900: "M17.2039 11.1934C18.3908 11.2334 19.4905 11.8728 20.1717 12.9189C19.0968 13.6298 18.436 14.8841 18.4198 16.2412C18.4214 17.7765 19.2761 19.1617 20.5907 19.7598C20.3378 20.6433 19.9561 21.4789 19.4608 22.2344C18.7957 23.3044 18.0986 24.3496 16.992 24.3691C15.9165 24.3958 15.5546 23.6886 14.3211 23.6885C13.076 23.6885 12.6904 24.3503 11.659 24.3965C10.6048 24.4385 9.7986 23.2536 9.10922 22.1934C7.73148 20.0282 6.65854 16.0917 8.09652 13.4131C8.77197 12.1075 10.0353 11.2787 11.4237 11.2305C12.4787 11.2071 13.4585 11.9969 14.1073 11.9971C14.7437 11.9971 15.955 11.0524 17.2039 11.1934ZM17.2108 6.97656C17.2828 7.98795 16.9853 8.99017 16.3817 9.76953C15.7961 10.5526 14.9087 11.0035 13.9745 10.9932C13.9151 10.0111 14.2212 9.04403 14.825 8.30469C15.4367 7.55527 16.2887 7.08078 17.2108 6.97656Z",
p38f0b0f0: "M56.9063 9.77617C57.9069 10.7444 59.5234 10.7444 60.524 9.77617C61.4982 8.77876 61.4982 7.21358 60.524 6.21617C60.0455 5.74717 59.3944 5.4834 58.7152 5.4834C58.0359 5.4834 57.3848 5.74717 56.9063 6.21617C55.9363 7.21519 55.9363 8.77716 56.9063 9.77617ZM38.3778 9.7919C38.7998 9.3632 39.0227 8.78489 38.9944 8.1919C38.9945 8.07119 38.9835 7.95071 38.9615 7.8319H36.5689V8.4079H38.3531C38.3409 8.7707 38.195 9.11713 37.942 9.3839C37.3784 9.91394 36.5425 10.062 35.8231 9.75931C35.1037 9.45657 34.6421 8.76245 34.6531 7.9999C34.6352 7.49528 34.8294 7.00533 35.1909 6.64305C35.5523 6.28077 36.0499 6.07742 36.5689 6.0799C37.0851 6.05245 37.5846 6.26284 37.9173 6.6479L38.3531 6.2239C38.1426 5.98835 37.8777 5.80466 37.5802 5.6879C37.2606 5.55484 36.9165 5.48677 36.5689 5.4879C35.8869 5.47311 35.2291 5.73376 34.7518 6.2079C34.0171 6.92736 33.7974 8.00519 34.194 8.94303C34.5907 9.88087 35.5266 10.496 36.5689 10.5039C37.2484 10.5274 37.9062 10.2685 38.3778 9.7919ZM40.5367 6.19161H42.7567V5.59961H39.8789V10.3996H42.7567V9.80761H40.5367V8.28761H42.5594V7.71161H40.5367V6.19161ZM45.4354 10.3996H44.8023V6.19161H43.421V5.59961H46.8496V6.19161H45.4354V10.3996ZM49.2779 5.59961V10.3996H49.911V5.59961H49.2779ZM52.7351 10.3996H52.102V6.19161H50.7207V5.59961H54.1082V6.19161H52.7351V10.3996ZM57.3659 9.3755C58.107 10.0936 59.3052 10.0936 60.0463 9.3755C60.7741 8.59484 60.7741 7.40416 60.0463 6.6235C59.3052 5.90545 58.107 5.90545 57.3659 6.6235C56.638 7.40416 56.638 8.59484 57.3659 9.3755ZM62.1579 5.59961V10.3996H62.7992V6.48761L65.307 10.3996H65.9647V5.59961H65.3316V9.33561L62.9307 5.59961H62.1579Z",
p3d60a00: "M11.148 4.92433V3.34543C11.148 2.7533 11.5471 2.61405 11.8306 2.61405H13.5604V0.00985853L11.1769 0C8.53143 0 7.93012 1.94429 7.93012 3.18584V4.92156H6.4V7.60493H7.93012V15.2H11.148V7.60493H13.319L13.6 4.92433H11.148Z",
p3d90f900: "M22.3082 12.6246L10.2955 5.98463C9.78776 5.59845 9.06938 5.61861 8.58532 6.03263L18.8384 16.0006L22.3082 12.6246Z",
p5b93500: "M8.21212 24.9043C8.22827 25.2519 8.36011 25.5868 8.59103 25.8564L8.64864 25.9199L8.59103 25.9766C8.33358 25.676 8.20014 25.2943 8.21212 24.9043ZM8.2131 24.8564C8.21212 24.8724 8.21261 24.8884 8.21212 24.9043C8.20953 24.8486 8.20964 24.7925 8.2131 24.7363V24.8564ZM27.1135 16C27.0711 16.4995 26.7574 16.9392 26.2912 17.1523L22.2541 19.376L22.1799 19.3037L26.2912 17.04C26.716 16.836 27.0198 16.4518 27.1135 16Z",
p8b5ce00: "M3.85687 0H16.1431C16.8925 0 17.5 0.648 17.5 1.44733V14.5526C17.5 15.352 16.8925 16 16.1431 16H3.85687C3.1075 16 2.5 15.352 2.5 14.5526V1.44733C2.5 0.648 3.1075 0 3.85687 0ZM6.74677 14.2366C6.96486 14.2366 7.14164 14.0481 7.14164 13.8155V6.2996C7.14164 6.06697 6.96486 5.87841 6.74677 5.87841H5.0659C4.84781 5.87841 4.67103 6.06697 4.67103 6.2996V13.8155C4.67103 14.0481 4.84781 14.2366 5.0659 14.2366H6.74677ZM5.90634 5.16993C5.02444 5.16993 4.3095 4.40733 4.3095 3.46664C4.3095 2.52595 5.02444 1.76335 5.90634 1.76335C6.78823 1.76335 7.50317 2.52595 7.50317 3.46664C7.50317 4.40733 6.78827 5.16993 5.90634 5.16993ZM15.5627 14.2366C15.7632 14.2366 15.9258 14.0632 15.9258 13.8494V10.2119L15.9258 10.185C15.9259 8.59811 15.926 5.75229 13.0541 5.75229C11.7499 5.75229 11.1373 6.26157 10.7251 6.92138V6.26568C10.7251 6.05181 10.5626 5.87841 10.3621 5.87841H8.6176C8.41711 5.87841 8.25454 6.05181 8.25454 6.26568V13.8494C8.25454 14.0632 8.41711 14.2366 8.6176 14.2366H10.3621C10.5626 14.2366 10.7251 14.0632 10.7251 13.8494V9.78325C10.7704 9.2369 10.9959 8.01948 12.1075 8.01948C13.435 8.01948 13.4087 9.54571 13.3976 10.1886C13.3968 10.2397 13.396 10.2853 13.396 10.324V13.8494C13.396 14.0632 13.5585 14.2366 13.759 14.2366H15.5627Z",
pba33300: "M60.524 9.77617L60.5936 9.84807L60.5956 9.84604L60.524 9.77617ZM56.9063 9.77617L56.8345 9.84587L56.8367 9.84804L56.9063 9.77617ZM60.524 6.21617L60.5956 6.14628L60.594 6.14475L60.524 6.21617ZM56.9063 6.21617L56.8362 6.14473L56.8345 6.14651L56.9063 6.21617ZM38.9944 8.1919L38.8943 8.19186L38.8945 8.19666L38.9944 8.1919ZM38.3778 9.7919L38.4489 9.86223L38.449 9.86205L38.3778 9.7919ZM38.9615 7.8319L39.0599 7.81375L39.0448 7.7319H38.9615V7.8319ZM36.5689 7.8319V7.7319H36.4689V7.8319H36.5689ZM36.5689 8.4079H36.4689V8.5079H36.5689V8.4079ZM38.3531 8.4079L38.453 8.41126L38.4565 8.3079H38.3531V8.4079ZM37.942 9.3839L38.0106 9.45686L38.0145 9.45272L37.942 9.3839ZM35.8231 9.75931L35.8619 9.66714V9.66714L35.8231 9.75931ZM34.6531 7.9999L34.7532 8.00135L34.753 7.99636L34.6531 7.9999ZM35.1909 6.64305L35.1201 6.57242V6.57242L35.1909 6.64305ZM36.5689 6.0799L36.5684 6.18007L36.5742 6.17976L36.5689 6.0799ZM37.9173 6.6479L37.8417 6.71328L37.911 6.79356L37.9871 6.71957L37.9173 6.6479ZM38.3531 6.2239L38.4228 6.29557L38.4915 6.22873L38.4277 6.15727L38.3531 6.2239ZM37.5802 5.6879L37.5418 5.78024L37.5437 5.78099L37.5802 5.6879ZM36.5689 5.4879L36.5667 5.58791L36.5692 5.5879L36.5689 5.4879ZM34.7518 6.2079L34.8217 6.27935L34.8222 6.27885L34.7518 6.2079ZM34.194 8.94303L34.2861 8.90408L34.194 8.94303ZM36.5689 10.5039L36.5723 10.4039L36.5696 10.4039L36.5689 10.5039ZM42.7567 6.19161V6.29161H42.8567V6.19161H42.7567ZM40.5367 6.19161V6.09161H40.4367V6.19161H40.5367ZM42.7567 5.59961H42.8567V5.49961H42.7567V5.59961ZM39.8789 5.59961V5.49961H39.7789V5.59961H39.8789ZM39.8789 10.3996H39.7789V10.4996H39.8789V10.3996ZM42.7567 10.3996V10.4996H42.8567V10.3996H42.7567ZM42.7567 9.80761H42.8567V9.70761H42.7567V9.80761ZM40.5367 9.80761H40.4367V9.90761H40.5367V9.80761ZM40.5367 8.28761V8.18761H40.4367V8.28761H40.5367ZM42.5594 8.28761V8.38761H42.6594V8.28761H42.5594ZM42.5594 7.71161H42.6594V7.61161H42.5594V7.71161ZM40.5367 7.71161H40.4367V7.81161H40.5367V7.71161ZM44.8023 10.3996H44.7023V10.4996H44.8023V10.3996ZM45.4354 10.3996V10.4996H45.5354V10.3996H45.4354ZM44.8023 6.19161H44.9023V6.09161H44.8023V6.19161ZM43.421 6.19161H43.321V6.29161H43.421V6.19161ZM43.421 5.59961V5.49961H43.321V5.59961H43.421ZM46.8496 5.59961H46.9496V5.49961H46.8496V5.59961ZM46.8496 6.19161V6.29161H46.9496V6.19161H46.8496ZM45.4354 6.19161V6.09161H45.3354V6.19161H45.4354ZM49.2779 10.3996H49.1779V10.4996H49.2779V10.3996ZM49.2779 5.59961V5.49961H49.1779V5.59961H49.2779ZM49.911 10.3996V10.4996H50.011V10.3996H49.911ZM49.911 5.59961H50.011V5.49961H49.911V5.59961ZM52.102 10.3996H52.002V10.4996H52.102V10.3996ZM52.7351 10.3996V10.4996H52.8351V10.3996H52.7351ZM52.102 6.19161H52.202V6.09161H52.102V6.19161ZM50.7207 6.19161H50.6207V6.29161H50.7207V6.19161ZM50.7207 5.59961V5.49961H50.6207V5.59961H50.7207ZM54.1082 5.59961H54.2082V5.49961H54.1082V5.59961ZM54.1082 6.19161V6.29161H54.2082V6.19161H54.1082ZM52.7351 6.19161V6.09161H52.6351V6.19161H52.7351ZM60.0463 9.3755L60.116 9.44741L60.1195 9.44369L60.0463 9.3755ZM57.3659 9.3755L57.2926 9.44378L57.2963 9.44732L57.3659 9.3755ZM60.0463 6.6235L60.1195 6.55522L60.1159 6.55168L60.0463 6.6235ZM57.3659 6.6235L57.2962 6.55159L57.2927 6.55531L57.3659 6.6235ZM62.1579 10.3996H62.0579V10.4996H62.1579V10.3996ZM62.1579 5.59961V5.49961H62.0579V5.59961H62.1579ZM62.7992 10.3996V10.4996H62.8992V10.3996H62.7992ZM62.7992 6.48761L62.8834 6.43364L62.6992 6.14632V6.48761H62.7992ZM65.307 10.3996L65.2228 10.4536L65.2523 10.4996H65.307V10.3996ZM65.9647 10.3996V10.4996H66.0647V10.3996H65.9647ZM65.9647 5.59961H66.0647V5.49961H65.9647V5.59961ZM65.3316 5.59961V5.49961H65.2316V5.59961H65.3316ZM65.3316 9.33561L65.2475 9.38967L65.4316 9.67619V9.33561H65.3316ZM62.9307 5.59961L63.0149 5.54555L62.9853 5.49961H62.9307V5.59961ZM60.524 9.77617L60.4545 9.70431C59.4926 10.635 57.9377 10.635 56.9758 9.70431L56.9063 9.77617L56.8367 9.84804C57.8762 10.8537 59.5542 10.8537 60.5936 9.84804L60.524 9.77617ZM60.524 6.21617L60.4525 6.28604C61.3887 7.2446 61.3887 8.74775 60.4525 9.7063L60.524 9.77617L60.5956 9.84604C61.6077 8.80978 61.6077 7.18256 60.5956 6.1463L60.524 6.21617ZM58.7152 5.4834V5.5834C59.3686 5.5834 59.9945 5.83719 60.454 6.28759L60.524 6.21617L60.594 6.14475C60.0965 5.65715 59.4202 5.3834 58.7152 5.3834V5.4834ZM56.9063 6.21617L56.9763 6.28759C57.4358 5.83719 58.0617 5.5834 58.7152 5.5834V5.4834V5.3834C58.0102 5.3834 57.3338 5.65715 56.8363 6.14475L56.9063 6.21617ZM56.9063 9.77617L56.978 9.70651C56.0457 8.7463 56.0457 7.24605 56.978 6.28583L56.9063 6.21617L56.8345 6.14651C55.8268 7.18432 55.8268 8.80802 56.8345 9.84583L56.9063 9.77617ZM38.9944 8.1919L38.8945 8.19666C38.9214 8.76135 38.7092 9.31263 38.3065 9.72175L38.3778 9.7919L38.449 9.86205C38.8903 9.41377 39.1239 8.80842 39.0943 8.18714L38.9944 8.1919ZM38.9615 7.8319L38.8632 7.85005C38.884 7.96287 38.8945 8.07726 38.8944 8.19186L38.9944 8.1919L39.0944 8.19194C39.0945 8.06512 39.0829 7.93856 39.0599 7.81375L38.9615 7.8319ZM36.5689 7.8319V7.9319H38.9615V7.8319V7.7319H36.5689V7.8319ZM36.5689 8.4079H36.6689V7.8319H36.5689H36.4689V8.4079H36.5689ZM38.3531 8.4079V8.3079H36.5689V8.4079V8.5079H38.3531V8.4079ZM37.942 9.3839L38.0145 9.45272C38.2841 9.16846 38.44 8.79884 38.453 8.41126L38.3531 8.4079L38.2532 8.40455C38.2418 8.74257 38.1058 9.0658 37.8694 9.31509L37.942 9.3839ZM35.8231 9.75931L35.7843 9.85148C36.5397 10.1694 37.4178 10.0142 38.0105 9.45675L37.942 9.3839L37.8735 9.31106C37.339 9.81369 36.5452 9.95471 35.8619 9.66714L35.8231 9.75931ZM34.6531 7.9999L34.5531 7.99846C34.5415 8.80302 35.0285 9.53342 35.7843 9.85148L35.8231 9.75931L35.8619 9.66714C35.1789 9.37972 34.7427 8.72188 34.7531 8.00135L34.6531 7.9999ZM35.1909 6.64305L35.1201 6.57242C34.7393 6.95402 34.5343 7.4707 34.5532 8.00345L34.6531 7.9999L34.753 7.99636C34.7361 7.51985 34.9194 7.05665 35.2616 6.71369L35.1909 6.64305ZM36.5689 6.0799L36.5694 5.9799C36.0241 5.9773 35.5007 6.19092 35.1201 6.57242L35.1909 6.64305L35.2616 6.71369C35.604 6.37062 36.0758 6.17755 36.5684 6.1799L36.5689 6.0799ZM37.9173 6.6479L37.993 6.58252C37.6397 6.17364 37.1101 5.95098 36.5636 5.98004L36.5689 6.0799L36.5742 6.17976C37.0602 6.15392 37.5295 6.35205 37.8417 6.71328L37.9173 6.6479ZM38.3531 6.2239L38.2834 6.15223L37.8476 6.57623L37.9173 6.6479L37.9871 6.71957L38.4228 6.29557L38.3531 6.2239ZM37.5802 5.6879L37.5437 5.78099C37.8268 5.8921 38.0786 6.0668 38.2785 6.29054L38.3531 6.2239L38.4277 6.15727C38.2066 5.9099 37.9287 5.71723 37.6167 5.59481L37.5802 5.6879ZM36.5689 5.4879L36.5692 5.5879C36.9036 5.58682 37.2345 5.65229 37.5418 5.78022L37.5802 5.6879L37.6186 5.59558C37.2867 5.45738 36.9294 5.38673 36.5685 5.3879L36.5689 5.4879ZM34.7518 6.2079L34.8222 6.27885C35.28 5.82415 35.9115 5.57367 36.5667 5.58788L36.5689 5.4879L36.571 5.38792C35.8623 5.37256 35.1782 5.64338 34.6813 6.13695L34.7518 6.2079ZM34.194 8.94303L34.2861 8.90408C33.9057 8.00458 34.1161 6.97042 34.8217 6.27935L34.7518 6.2079L34.6818 6.13646C33.9182 6.8843 33.689 8.0058 34.1019 8.98199L34.194 8.94303ZM36.5689 10.5039L36.5696 10.4039C35.566 10.3963 34.6668 9.80405 34.2861 8.90408L34.194 8.94303L34.1019 8.98199C34.5146 9.9577 35.4871 10.5957 36.5681 10.6039L36.5689 10.5039ZM38.3778 9.7919L38.3067 9.72157C37.855 10.1781 37.2244 10.4266 36.5723 10.404L36.5689 10.5039L36.5654 10.6038C37.2724 10.6283 37.9573 10.359 38.4489 9.86223L38.3778 9.7919ZM42.7567 6.19161V6.09161H40.5367V6.19161V6.29161H42.7567V6.19161ZM42.7567 5.59961H42.6567V6.19161H42.7567H42.8567V5.59961H42.7567ZM39.8789 5.59961V5.69961H42.7567V5.59961V5.49961H39.8789V5.59961ZM39.8789 10.3996H39.9789V5.59961H39.8789H39.7789V10.3996H39.8789ZM42.7567 10.3996V10.2996H39.8789V10.3996V10.4996H42.7567V10.3996ZM42.7567 9.80761H42.6567V10.3996H42.7567H42.8567V9.80761H42.7567ZM40.5367 9.80761V9.90761H42.7567V9.80761V9.70761H40.5367V9.80761ZM40.5367 8.28761H40.4367V9.80761H40.5367H40.6367V8.28761H40.5367ZM42.5594 8.28761V8.18761H40.5367V8.28761V8.38761H42.5594V8.28761ZM42.5594 7.71161H42.4594V8.28761H42.5594H42.6594V7.71161H42.5594ZM40.5367 7.71161V7.81161H42.5594V7.71161V7.61161H40.5367V7.71161ZM40.5367 6.19161H40.4367V7.71161H40.5367H40.6367V6.19161H40.5367ZM44.8023 10.3996V10.4996H45.4354V10.3996V10.2996H44.8023V10.3996ZM44.8023 6.19161H44.7023V10.3996H44.8023H44.9023V6.19161H44.8023ZM43.421 6.19161V6.29161H44.8023V6.19161V6.09161H43.421V6.19161ZM43.421 5.59961H43.321V6.19161H43.421H43.521V5.59961H43.421ZM46.8496 5.59961V5.49961H43.421V5.59961V5.69961H46.8496V5.59961ZM46.8496 6.19161H46.9496V5.59961H46.8496H46.7496V6.19161H46.8496ZM45.4354 6.19161V6.29161H46.8496V6.19161V6.09161H45.4354V6.19161ZM45.4354 10.3996H45.5354V6.19161H45.4354H45.3354V10.3996H45.4354ZM49.2779 10.3996H49.3779V5.59961H49.2779H49.1779V10.3996H49.2779ZM49.911 10.3996V10.2996H49.2779V10.3996V10.4996H49.911V10.3996ZM49.911 5.59961H49.811V10.3996H49.911H50.011V5.59961H49.911ZM49.2779 5.59961V5.69961H49.911V5.59961V5.49961H49.2779V5.59961ZM52.102 10.3996V10.4996H52.7351V10.3996V10.2996H52.102V10.3996ZM52.102 6.19161H52.002V10.3996H52.102H52.202V6.19161H52.102ZM50.7207 6.19161V6.29161H52.102V6.19161V6.09161H50.7207V6.19161ZM50.7207 5.59961H50.6207V6.19161H50.7207H50.8207V5.59961H50.7207ZM54.1082 5.59961V5.49961H50.7207V5.59961V5.69961H54.1082V5.59961ZM54.1082 6.19161H54.2082V5.59961H54.1082H54.0082V6.19161H54.1082ZM52.7351 6.19161V6.29161H54.1082V6.19161V6.09161H52.7351V6.19161ZM52.7351 10.3996H52.8351V6.19161H52.7351H52.6351V10.3996H52.7351ZM60.0463 9.3755L59.9767 9.30368C59.2744 9.98416 58.1378 9.98416 57.4355 9.30368L57.3659 9.3755L57.2963 9.44732C58.0762 10.2029 59.336 10.2029 60.1159 9.44732L60.0463 9.3755ZM60.0463 6.6235L59.9732 6.69169C60.6652 7.43395 60.6652 8.56505 59.9732 9.30731L60.0463 9.3755L60.1195 9.44369C60.8831 8.62462 60.8831 7.37438 60.1195 6.55531L60.0463 6.6235ZM57.3659 6.6235L57.4355 6.69532C58.1378 6.01484 59.2744 6.01484 59.9767 6.69532L60.0463 6.6235L60.1159 6.55168C59.336 5.79605 58.0762 5.79605 57.2963 6.55168L57.3659 6.6235ZM57.3659 9.3755L57.439 9.30731C56.747 8.56505 56.747 7.43395 57.439 6.69169L57.3659 6.6235L57.2927 6.55531C56.5291 7.37438 56.5291 8.62462 57.2927 9.44369L57.3659 9.3755ZM62.1579 10.3996H62.2579V5.59961H62.1579H62.0579V10.3996H62.1579ZM62.7992 10.3996V10.2996H62.1579V10.3996V10.4996H62.7992V10.3996ZM62.7992 6.48761H62.6992V10.3996H62.7992H62.8992V6.48761H62.7992ZM65.307 10.3996L65.3912 10.3456L62.8834 6.43364L62.7992 6.48761L62.715 6.54158L65.2228 10.4536L65.307 10.3996ZM65.9647 10.3996V10.2996H65.307V10.3996V10.4996H65.9647V10.3996ZM65.9647 5.59961H65.8647V10.3996H65.9647H66.0647V5.59961H65.9647ZM65.3316 5.59961V5.69961H65.9647V5.59961V5.49961H65.3316V5.59961ZM65.3316 9.33561H65.4316V5.59961H65.3316H65.2316V9.33561H65.3316ZM62.9307 5.59961L62.8466 5.65367L65.2475 9.38967L65.3316 9.33561L65.4158 9.28155L63.0149 5.54555L62.9307 5.59961ZM62.1579 5.59961V5.69961H62.9307V5.59961V5.49961H62.1579V5.59961Z",
}

```

## src/imports/WebFooter/svg-oapmo.tsx
```tsx
export const imgGroup = "data:image/svg+xml,%3Csvg%20preserveAspectRatio%3D%22none%22%20width%3D%22100%25%22%20height%3D%22100%25%22%20overflow%3D%22visible%22%20style%3D%22display%3A%20block%3B%22%20viewBox%3D%220%200%2014%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20id%3D%22primeTwitter0%22%3E%0A%3Cpath%20id%3D%22Vector%22%20d%3D%22M0%200H14V14H0V0Z%22%20fill%3D%22var(--fill-0%2C%20black)%22%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A";
```

## src/index.ts
```ts
// Auto-generated entrypoint
import './styles/index.css'

```

## src/styles/fonts.css
```css

```

## src/styles/index.css
```css
@import './fonts.css';
@import './typography.css';
@import './spacing.css';
@import './tailwind.css';

```

## src/styles/spacing.css
```css
/* ==========================================================================
   Jevelina Design System — Spacing & Border Radius
   --------------------------------------------------------------------------
   Base unit: 8px. All spacing tokens are multiples or sub-multiples of 8.
   The 4px half-unit exists for tight internal component spacing only.

   RULES:
   - Never hardcode a spacing value in a component. Use var(--space-*).
   - Never hardcode a border-radius value. Use var(--radius-*).
   - Spacing tokens cover padding, margin, and gap between elements.
   ========================================================================== */

:root {
  /* -------------------------------------------------------------------------
     Spacing scale
     ---------------------------------------------------------------------- */
  --space-1:  0.25rem;   /*  4px — tight internal gaps, icon padding */
  --space-2:  0.5rem;    /*  8px — icon-to-label gap, stacked element gap */
  --space-3:  0.75rem;   /* 12px — accordion/compact row vertical padding */
  --space-4:  1rem;      /* 16px — input padding, tab horizontal padding */
  --space-5:  1.25rem;   /* 20px — accordion horizontal padding, small button horizontal */
  --space-6:  1.5rem;    /* 24px — standard card inner spacing */
  --space-8:  2rem;      /* 32px — section separators */
  --space-10: 2.5rem;    /* 40px — large button horizontal padding */
  --space-12: 3rem;      /* 48px — large layout spacing */
  --space-16: 4rem;      /* 64px — major section spacing */
  --space-24: 8rem;      /* 128px — page-level spacing */
  --space-32: 12rem;     /* 192px — maximum layout spacing */

  /* -------------------------------------------------------------------------
     Border radius
     ---------------------------------------------------------------------- */
  --radius-sm:   4px;    /* Buttons, inputs, text areas, cards */
  --radius-md:   8px;    /* Dashboard tiles, modals, larger cards */
  --radius-pill: 20px;   /* Badges, pill-shaped labels */
  --radius-none: 0px;    /* Accordion rows, tabs, table rows, dividers */
}

```

## src/styles/tailwind.css
```css
@import 'tailwindcss' source(none);
@source '../**/*.{js,ts,jsx,tsx}';

@import 'tw-animate-css';

/* ==========================================================================
   Jevelina Design System — Layout Grid (Tailwind v4 @theme)
   --------------------------------------------------------------------------
   12-column grid, 8px gutter base. Container max-widths match Figma breakpoints.
   The nav sidebar (88px) is a fixed layout element — content area sits beside it,
   not inside the container. The container itself stays centered in the content area.

   Breakpoints:
     sm   600px   — 4 columns, 16px gutters, 16px margins
     md   960px   — 8 columns, 16px gutters, 32px margins
     lg   1240px  — 12 columns, 24px gutters, 144px margins (container: 1240px)
     xl   1440px  — 12 columns, 32px gutters, 144px margins (container: 1440px)
   ========================================================================== */

@theme {
  /* Container max-widths per breakpoint */
  --breakpoint-sm: 600px;
  --breakpoint-md: 960px;
  --breakpoint-lg: 1240px;
  --breakpoint-xl: 1440px;

  --container-sm:  100%;      /* fluid below md */
  --container-md:  100%;      /* fluid 600–959 */
  --container-lg:  1240px;    /* fixed 1240–1439 */
  --container-xl:  1440px;    /* fixed 1440+ */

  /* Column counts (used as Tailwind grid-cols-* values) */
  --grid-cols-mobile:  4;
  --grid-cols-tablet:  8;
  --grid-cols-desktop: 12;

  /* Gutters per breakpoint */
  --grid-gutter-sm:  1rem;    /* 16px */
  --grid-gutter-md:  1rem;    /* 16px */
  --grid-gutter-lg:  1.5rem;  /* 24px */
  --grid-gutter-xl:  2rem;    /* 32px */

  /* Margins (horizontal padding on the content wrapper) */
  --grid-margin-sm:  1rem;    /* 16px */
  --grid-margin-md:  2rem;    /* 32px */
  --grid-margin-lg:  9rem;    /* 144px */
  --grid-margin-xl:  9rem;    /* 144px */

  /* Nav sidebar width — fixed, sits outside the content container */
  --nav-sidebar-width: 5.5rem; /* 88px */
}


/* ==========================================================================
   Jevelina Design System — Theme Color Tokens
   --------------------------------------------------------------------------
   All tokens are scoped per [data-theme] block. Every theme defines every
   token — even the ones that are currently identical across clients — so
   any client can override any token without requiring a structural change.

   Apply a theme by setting data-theme on the root element:
     <div data-theme="aptia">...</div>

   RULES:
   - Never use a raw hex value in component code. Always use var(--color-*).
   - All 22 tokens must be present in every theme block.

   ADDING A NEW CLIENT:
   1. Copy any existing [data-theme] block.
   2. Rename the attribute to the new client slug.
   3. Update the 4 brand tokens (primary-1/2, secondary-1/2).
   4. Update table-primary / table-secondary (tinted from brand palette).
   5. Leave all other tokens as-is unless the client specifically requires
      a custom value.
   ========================================================================== */


[data-theme="aptia"] {
  /* Brand — unique per client */
  --color-primary-1:             #113546;  /* nav sidebar, table header borders */
  --color-primary-2:             #00D17C;  /* icons, chart fills, decorative accents */
  --color-secondary-1:           #2A7050;  /* header/logo area, supporting icons */
  --color-secondary-2:           #00205C;  /* primary button fill, links */

  /* Table accent — tinted from brand palette */
  --color-table-primary:         #DEF3EA;
  --color-table-secondary:       #98D7BD;

  /* Text */
  --color-primary-text:          #333333;
  --color-secondary-text:        #666666;

  /* Backgrounds */
  --color-primary-background:    #F6F6F6;  /* page canvas */
  --color-secondary-background:  #FFFFFF;  /* card / panel / modal */
  --color-tertiary-background:   #F1F1F1;  /* subtle sub-section */

  /* Greys */
  --color-primary-grey:          #E2E2E2;  /* borders, dividers */
  --color-secondary-grey:        #999999;  /* disabled, placeholder */

  /* Status — Error */
  --color-error-primary:         #CC0000;
  --color-error-background:      #FFDEDE;

  /* Status — Warning */
  --color-warning-primary:       #A05600;
  --color-warning-background:    #FFF2E3;

  /* Status — Success */
  --color-success-primary:       #007E33;
  --color-success-background:    #E9FFF3;

  /* Status — Info */
  --color-info-primary:          #007399;
  --color-info-background:       #D0F3FF;
}


[data-theme="keenan"] {
  /* Brand — unique per client */
  --color-primary-1:             #5B2540;
  --color-primary-2:             #E87823;
  --color-secondary-1:           #2A7050;
  --color-secondary-2:           #00205C;

  /* Table accent */
  --color-table-primary:         #F5EAE1;
  --color-table-secondary:       #DBD0C7;

  /* Text */
  --color-primary-text:          #333333;
  --color-secondary-text:        #666666;

  /* Backgrounds */
  --color-primary-background:    #F6F6F6;
  --color-secondary-background:  #FFFFFF;
  --color-tertiary-background:   #F1F1F1;

  /* Greys */
  --color-primary-grey:          #E2E2E2;
  --color-secondary-grey:        #999999;

  /* Status — Error */
  --color-error-primary:         #CC0000;
  --color-error-background:      #FFDEDE;

  /* Status — Warning */
  --color-warning-primary:       #A05600;
  --color-warning-background:    #FFF2E3;

  /* Status — Success */
  --color-success-primary:       #007E33;
  --color-success-background:    #E9FFF3;

  /* Status — Info */
  --color-info-primary:          #007399;
  --color-info-background:       #D0F3FF;
}


[data-theme="bywater"] {
  /* Brand — unique per client */
  --color-primary-1:             #263746;
  --color-primary-2:             #59A092;
  --color-secondary-1:           #59A092;
  --color-secondary-2:           #133659;

  /* Table accent */
  --color-table-primary:         #EFF6F5;
  --color-table-secondary:       #B3C8C4;

  /* Text */
  --color-primary-text:          #333333;
  --color-secondary-text:        #666666;

  /* Backgrounds */
  --color-primary-background:    #F6F6F6;
  --color-secondary-background:  #FFFFFF;
  --color-tertiary-background:   #F1F1F1;

  /* Greys */
  --color-primary-grey:          #E2E2E2;
  --color-secondary-grey:        #999999;

  /* Status — Error */
  --color-error-primary:         #CC0000;
  --color-error-background:      #FFDEDE;

  /* Status — Warning */
  --color-warning-primary:       #A05600;
  --color-warning-background:    #FFF2E3;

  /* Status — Success */
  --color-success-primary:       #007E33;
  --color-success-background:    #E9FFF3;

  /* Status — Info */
  --color-info-primary:          #007399;
  --color-info-background:       #D0F3FF;
}


[data-theme="hub"] {
  /* Brand — unique per client */
  --color-primary-1:             #263746;
  --color-primary-2:             #0678D5;
  --color-secondary-1:           #055CA3;
  --color-secondary-2:           #055CA3;

  /* Table accent */
  --color-table-primary:         #EFF6F5;
  --color-table-secondary:       #B3C8C4;

  /* Text */
  --color-primary-text:          #333333;
  --color-secondary-text:        #666666;

  /* Backgrounds */
  --color-primary-background:    #F6F6F6;
  --color-secondary-background:  #FFFFFF;
  --color-tertiary-background:   #F1F1F1;

  /* Greys */
  --color-primary-grey:          #E2E2E2;
  --color-secondary-grey:        #999999;

  /* Status — Error */
  --color-error-primary:         #CC0000;
  --color-error-background:      #FFDEDE;

  /* Status — Warning */
  --color-warning-primary:       #A05600;
  --color-warning-background:    #FFF2E3;

  /* Status — Success */
  --color-success-primary:       #007E33;
  --color-success-background:    #E9FFF3;

  /* Status — Info */
  --color-info-primary:          #007399;
  --color-info-background:       #D0F3FF;
}


/* --------------------------------------------------------------------------
   A1M — sandbox/demo theme. Not a production client.
   Used internally to prototype new tokens before rolling out to real clients.
   Do not use as a reference for production screen design.
   -------------------------------------------------------------------------- */
[data-theme="a1m"] {
  /* Brand — unique per client */
  --color-primary-1:             #82479D;
  --color-primary-2:             #DF126C;
  --color-secondary-1:           #60034C;
  --color-secondary-2:           #0A7593;

  /* Table accent */
  --color-table-primary:         #EAE4ED;
  --color-table-secondary:       #DFD3E4;

  /* Text */
  --color-primary-text:          #333333;
  --color-secondary-text:        #666666;

  /* Backgrounds */
  --color-primary-background:    #F6F6F6;
  --color-secondary-background:  #FFFFFF;
  --color-tertiary-background:   #FFF2F8;  /* A1M-specific — brand-tinted */

  /* Greys */
  --color-primary-grey:          #E2E2E2;
  --color-secondary-grey:        #999999;

  /* Status — Error */
  --color-error-primary:         #CC0000;
  --color-error-background:      #FFDEDE;

  /* Status — Warning */
  --color-warning-primary:       #A05600;
  --color-warning-background:    #FFF2E3;

  /* Status — Success */
  --color-success-primary:       #007E33;
  --color-success-background:    #E9FFF3;

  /* Status — Info */
  --color-info-primary:          #007399;
  --color-info-background:       #D0F3FF;
}

```

## src/styles/typography.css
```css
/* ==========================================================================
   Jevelina Design System — Typography
   --------------------------------------------------------------------------
   Open Sans is the only typeface. Required weights: 300, 400, 600, 700.
   All line heights are AUTO (browser natural) — no explicit values set.
   No letter spacing on any style.

   Two scale sets exist in Figma:
   - Desktop/* — the production scale. All variables here match Desktop styles.
   - Responsive for Figma/* — Figma canvas only, no code equivalent.

   RULES:
   - Never hardcode a font-size, font-weight, or font-family in a component.
   - Always use var(--font-*) custom properties.
   - text-transform: uppercase applies only to button styles.
   ========================================================================== */

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');

:root {
  /* -------------------------------------------------------------------------
     Font family
     ---------------------------------------------------------------------- */
  --font-family-base: 'Open Sans', sans-serif;

  /* -------------------------------------------------------------------------
     Font weights
     ---------------------------------------------------------------------- */
  --font-weight-light:    300;
  --font-weight-regular:  400;
  --font-weight-semibold: 600;
  --font-weight-bold:     700;

  /* -------------------------------------------------------------------------
     Heading scale  (Desktop/H1 – Desktop/H5)
     ---------------------------------------------------------------------- */
  --font-size-h1: 3rem;       /* 48px — Desktop/H1 */
  --font-size-h2: 2rem;       /* 32px — Desktop/H2 */
  --font-size-h3: 1.5rem;     /* 24px — Desktop/H3 */
  --font-size-h4: 1.25rem;    /* 20px — Desktop/H4 */
  --font-size-h5: 1.125rem;   /* 18px — Desktop/H5 */

  /* -------------------------------------------------------------------------
     Paragraph scale  (Desktop/Para/*)
     ---------------------------------------------------------------------- */
  --font-size-para-lg: 1rem;       /* 16px — Paragraph Large */
  --font-size-para:    0.875rem;   /* 14px — Paragraph (default) */
  --font-size-para-sm: 0.75rem;    /* 12px — Paragraph Small */

  /* -------------------------------------------------------------------------
     Interactive scale  (Desktop/Button, Desktop/Link)
     ---------------------------------------------------------------------- */
  --font-size-btn:    0.875rem;   /* 14px — Button / Button Bold */
  --font-size-btn-sm: 0.75rem;    /* 12px — Small Button / Small Button Semibold */
  --font-size-link:   0.875rem;   /* 14px — Link Regular / Link Bold */
}

```

## vite.config.ts
```ts
import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  // Dev server — only active during `pnpm dev`, ignored by Figma Make
  server: {
    port: 5173,
    open: true,
  },

  // Build config — only applied during `pnpm build` (i.e. the Figma Make kit build)
  // During `pnpm dev` this is omitted so Vite runs in app mode with index.html
  ...(command === 'build' ? {
    build: {
      lib: {
        entry: [
          './src/index.ts',
        ],
        formats: [
          'es',
        ],
        cssFileName: 'style',
      },
      rollupOptions: {
        output: {
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].js',
        },
      },
    },
  } : {}),
}))
```

