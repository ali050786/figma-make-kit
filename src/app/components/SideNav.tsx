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