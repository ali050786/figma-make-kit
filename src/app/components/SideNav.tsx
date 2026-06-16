import React, { useState } from 'react';
import svgPaths from '../../imports/SideNavigation-1/svg-uo3p29yi7g';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface SideNavProps {
  collapsed?: boolean;
  activeId?: string;
  items?: NavItem[];
  onToggle?: () => void;
  onItemClick?: (id: string) => void;
  onLogout?: () => void;
}

// ─── SVG icon wrapper ─────────────────────────────────────────────────────────

function NavSvgIcon({ d, viewBox, d2 }: { d: string; viewBox: string; d2?: string }) {
  return (
    <div style={{ position: 'relative', width: 42, height: 42, flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg style={{ width: '100%', height: '100%' }} fill="none" viewBox={viewBox}>
          <path fill="white" d={d} clipRule="evenodd" fillRule="evenodd" />
          {d2 && <path fill="white" d={d2} />}
        </svg>
      </div>
    </div>
  );
}

// ─── Default nav items (Jevelina) ─────────────────────────────────────────────

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <NavSvgIcon d={svgPaths.p114d9600} viewBox="0 0 30 32.9955" />,
  },
  {
    id: 'id-cards',
    label: 'ID Cards',
    icon: <NavSvgIcon d={svgPaths.p242e2300} viewBox="0 0 36.75 26.25" d2={svgPaths.peb9ddf2} />,
  },
  {
    id: 'claims',
    label: 'Claims',
    icon: <NavSvgIcon d={svgPaths.pc18170} viewBox="0 0 26 34" />,
  },
  {
    id: 'accounts',
    label: 'Accounts',
    icon: <NavSvgIcon d={svgPaths.pe688a00} viewBox="0 0 23.0982 31.4997" />,
  },
  {
    id: 'resources',
    label: 'Resources',
    icon: <NavSvgIcon d={svgPaths.p3f76b280} viewBox="0 0 26 34" />,
  },
  {
    id: 'price-comparison',
    label: 'Price Comparison',
    icon: <NavSvgIcon d={svgPaths.p34568f7a} viewBox="0 0 16.6016 10.667" />,
  },
  {
    id: 'find-providers',
    label: 'Find Providers',
    icon: <NavSvgIcon d={svgPaths.p3aa4ce00} viewBox="0 0 25 22" />,
  },
];

// ─── Nav item row ─────────────────────────────────────────────────────────────

interface NavItemRowProps {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}

function NavItemRow({ item, active, collapsed, onClick }: NavItemRowProps) {
  const [hovered, setHovered] = useState(false);
  const highlight = active || hovered;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={item.label}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        width: '100%', height: 80,
        padding: 10,
        background: active ? 'rgba(38,49,84,0.2)' : hovered ? 'rgba(38,49,84,0.1)' : 'transparent',
        border: 'none', cursor: 'pointer',
        position: 'relative', flexShrink: 0,
        transition: 'background 0.15s',
      }}
    >
      {/* Active indicator — left border */}
      {active && (
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
          background: 'var(--color-primary-2)',
        }} />
      )}
      {item.icon}
      {!collapsed && (
        <span style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-para-lg)',
          fontWeight: 'var(--font-weight-semibold)',
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

export function SideNav({
  collapsed: controlledCollapsed,
  activeId = 'dashboard',
  items = DEFAULT_NAV_ITEMS,
  onToggle,
  onItemClick,
  onLogout,
}: SideNavProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(true);
  const collapsed = controlledCollapsed ?? internalCollapsed;

  function handleToggle() {
    setInternalCollapsed(v => !v);
    onToggle?.();
  }

  const width = collapsed ? 80 : 334;

  return (
    <nav
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
      {/* Collapse/expand toggle */}
      <button
        onClick={handleToggle}
        aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: 80, width: 80, flexShrink: 0,
          background: 'transparent', border: 'none', cursor: 'pointer',
          alignSelf: 'flex-start',
        }}
      >
        <div style={{ position: 'relative', width: 42, height: 42 }}>
          <div style={{ position: 'absolute', inset: '10%' }}>
            <svg style={{ width: '100%', height: '100%', transform: collapsed ? 'none' : 'rotate(180deg)', transition: 'transform 0.2s' }} fill="none" viewBox="0 0 27.829 29.999">
              <path fill="white" d={svgPaths.p24377d00} />
            </svg>
          </div>
        </div>
        {!collapsed && (
          <span style={{
            fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para-lg)',
            fontWeight: 'var(--font-weight-semibold)', color: 'white',
            marginLeft: 10, whiteSpace: 'nowrap',
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

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.2)', margin: '0 16px' }} />

      {/* Logout */}
      <button
        onClick={onLogout}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          height: 60, padding: 10,
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: 'white', width: '100%', flexShrink: 0,
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(38,49,84,0.1)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        <div style={{ width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="16 17 21 12 16 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="21" y1="12" x2="9" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        {!collapsed && (
          <span style={{
            fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para-lg)',
            fontWeight: 'var(--font-weight-semibold)', color: 'white', whiteSpace: 'nowrap',
          }}>
            Logout
          </span>
        )}
      </button>
    </nav>
  );
}

export default SideNav;
