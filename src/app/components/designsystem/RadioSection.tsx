import { Radio } from '../Radio';
import type { RadioState } from '../Radio';
import { SectionBlock } from './SectionBlock';

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

const STATES: { id: RadioState; label: string }[] = [
  { id: 'default',  label: 'Default'  },
  { id: 'hovered',  label: 'Hovered'  },
  { id: 'focused',  label: 'Focused'  },
  { id: 'disabled', label: 'Disabled' },
  { id: 'error',    label: 'Error'    },
];

const cellPad: React.CSSProperties = { padding: 'var(--space-4)', verticalAlign: 'middle' };

export function RadioSection() {
  return (
    <SectionBlock title="Radio">

      {/* Interactive examples */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        Interactive
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
        <Radio label="Option A" name="demo" />
        <Radio label="Option B" name="demo" />
        <Radio label="Option C" name="demo" />
      </div>

      {/* States matrix */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        States
      </p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', minWidth: 550 }}>
          <thead>
            <tr>
              <th style={{ width: 110, ...cellPad, textAlign: 'left' }} />
              {STATES.map(s => (
                <th key={s.id} style={{ width: 130, ...cellPad, textAlign: 'left' }}>
                  <GroupLabel>{s.label}</GroupLabel>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: 'Unselected', checked: false },
              { label: 'Selected',   checked: true  },
            ].map(row => (
              <tr key={row.label} style={{ borderTop: '1px solid var(--color-primary-grey)' }}>
                <td style={{ ...cellPad }}><GroupLabel>{row.label}</GroupLabel></td>
                {STATES.map(s => (
                  <td key={s.id} style={{ ...cellPad }}>
                    <Radio
                      label="Label"
                      checked={row.checked}
                      state={s.id}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionBlock>
  );
}
