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
