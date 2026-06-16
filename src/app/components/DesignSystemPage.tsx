import { useState } from 'react';
import { Palette, Type, Ruler, MousePointer, TextCursor, CheckSquare, Bell, Tag, Monitor, PanelLeft, AlignLeft } from 'lucide-react';
import { Button } from './Button';
import { GlobalHeader } from './GlobalHeader';
import { SideNav } from './SideNav';
import type { NavItem } from './SideNav';
import { Footer } from './Footer';
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
  { id: 'aptia',   label: 'Aptia' },
  { id: 'keenan',  label: 'Keenan' },
  { id: 'bywater', label: 'Bywater' },
  { id: 'hub',     label: 'Hub International' },
];

// ─── Design system nav items (lucide icons) ───────────────────────────────────

function LucideIcon({ icon: Icon }: { icon: React.ComponentType<{ size?: number; color?: string }> }) {
  return (
    <div style={{ width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon size={22} color="white" />
    </div>
  );
}

const DS_NAV_ITEMS: NavItem[] = [
  { id: 'colors',     label: 'Colors',      icon: <LucideIcon icon={Palette} /> },
  { id: 'typography', label: 'Typography',  icon: <LucideIcon icon={Type} /> },
  { id: 'spacing',    label: 'Spacing',     icon: <LucideIcon icon={Ruler} /> },
  { id: 'buttons',    label: 'Buttons',     icon: <LucideIcon icon={MousePointer} /> },
  { id: 'inputs',     label: 'Inputs',      icon: <LucideIcon icon={TextCursor} /> },
  { id: 'selection',  label: 'Selection',   icon: <LucideIcon icon={CheckSquare} /> },
  { id: 'alerts',     label: 'Alerts',      icon: <LucideIcon icon={Bell} /> },
  { id: 'badges',     label: 'Badges',      icon: <LucideIcon icon={Tag} /> },
  { id: 'header',     label: 'Header',      icon: <LucideIcon icon={Monitor} /> },
  { id: 'sidenav',    label: 'Side Nav',    icon: <LucideIcon icon={PanelLeft} /> },
  { id: 'footer',     label: 'Footer',      icon: <LucideIcon icon={AlignLeft} /> },
];

// ─── Theme-aware logo for the header ─────────────────────────────────────────

function DSLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 64 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 6, flexShrink: 0,
        background: 'var(--color-primary-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{
          color: 'var(--color-primary-1)', fontWeight: 700, fontSize: 16,
          fontFamily: 'var(--font-family-base)',
        }}>J</span>
      </div>
      <span style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-lg)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-primary-text)',
        whiteSpace: 'nowrap',
      }}>
        Jevelina
      </span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function DesignSystemPage() {
  const [activeTheme, setActiveTheme] = useState<Theme>('aptia');
  const [activeSection, setActiveSection] = useState('colors');

  function handleNavClick(id: string) {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div
      data-theme={activeTheme}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'var(--color-primary-background)',
        fontFamily: 'var(--font-family-base)',
      }}
    >
      {/* ── Global Header ── */}
      <GlobalHeader
        secured
        companyName="Jevelina Design System"
        portalName="Component Library v2.0"
        userName="Design Team"
        userRole="Developer"
        userInitials="JD"
        logo={<DSLogo />}
      />

      {/* ── Middle: SideNav + Content ── */}
      <div style={{ display: 'flex', flex: 1 }}>

        {/* SideNav — sticky, full viewport height offset by header */}
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          flexShrink: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}>
          <SideNav
            items={DS_NAV_ITEMS}
            activeId={activeSection}
            onItemClick={handleNavClick}
          />
        </div>

        {/* Main content */}
        <main style={{ flex: 1, minWidth: 0 }}>
          <div style={{ padding: 'var(--space-8) var(--space-10)' }}>

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
        </main>
      </div>

      {/* ── Footer ── */}
      <Footer
        companyName="Jevelina Design System"
        copyrightText="© 2024 Jevelina — Multi-brand white-label component library"
        columns={[
          { title: 'Components', links: [{ label: 'Tokens' }, { label: 'Typography' }, { label: 'Buttons' }, { label: 'Inputs' }] },
          { title: 'Patterns', links: [{ label: 'Header' }, { label: 'Navigation' }, { label: 'Footer' }] },
        ]}
        showSocial={false}
        contact={undefined}
      />
    </div>
  );
}
