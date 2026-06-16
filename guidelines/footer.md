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
