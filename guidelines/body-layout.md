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
