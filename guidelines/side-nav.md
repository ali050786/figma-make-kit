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