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
