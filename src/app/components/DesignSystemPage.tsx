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