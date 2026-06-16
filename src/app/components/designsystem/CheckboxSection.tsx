import { Checkbox } from '../Checkbox';
import type { CheckboxState, CheckboxStatus } from '../Checkbox';
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

const STATES: { id: CheckboxState; label: string }[] = [
  { id: 'default',  label: 'Default'  },
  { id: 'hovered',  label: 'Hovered'  },
  { id: 'focused',  label: 'Focused'  },
  { id: 'disabled', label: 'Disabled' },
  { id: 'error',    label: 'Error'    },
];

const STATUSES: { id: CheckboxStatus; label: string }[] = [
  { id: 'unchecked',     label: 'Unchecked'     },
  { id: 'checked',       label: 'Checked'       },
  { id: 'indeterminate', label: 'Indeterminate' },
];

const cellPad: React.CSSProperties = { padding: 'var(--space-4)', verticalAlign: 'middle' };

export function CheckboxSection() {
  return (
    <SectionBlock title="Checkbox">

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
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" defaultStatus="checked" />
        <Checkbox label="Indeterminate" defaultStatus="indeterminate" />
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
        <table style={{ borderCollapse: 'collapse', minWidth: 600 }}>
          <thead>
            <tr>
              <th style={{ width: 100, ...cellPad, textAlign: 'left' }} />
              {STATES.map(s => (
                <th key={s.id} style={{ width: 130, ...cellPad, textAlign: 'left' }}>
                  <GroupLabel>{s.label}</GroupLabel>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STATUSES.map(st => (
              <tr key={st.id} style={{ borderTop: '1px solid var(--color-primary-grey)' }}>
                <td style={{ ...cellPad }}>
                  <GroupLabel>{st.label}</GroupLabel>
                </td>
                {STATES.map(s => (
                  <td key={s.id} style={{ ...cellPad }}>
                    <Checkbox
                      label="Label"
                      status={st.id}
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
