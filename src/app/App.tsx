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