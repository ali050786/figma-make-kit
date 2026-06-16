import { Badge } from '../Badge';
import type { BadgeEmphasis, BadgeIndication } from '../Badge';
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

const INDICATIONS: BadgeIndication[] = ['success', 'info', 'warning', 'error'];
const EMPHASES: { id: BadgeEmphasis; label: string }[] = [
  { id: 'bold',    label: 'Bold'    },
  { id: 'subtle',  label: 'Subtle'  },
  { id: 'minimal', label: 'Minimal' },
];

const cellPad: React.CSSProperties = { padding: 'var(--space-4)', verticalAlign: 'middle' };

export function BadgeSection() {
  return (
    <SectionBlock title="Badges">

      {/* Without icon matrix */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        Without Icon
      </p>
      <div style={{ overflowX: 'auto', marginBottom: 'var(--space-8)' }}>
        <table style={{ borderCollapse: 'collapse', minWidth: 500 }}>
          <thead>
            <tr>
              <th style={{ width: 100, ...cellPad, textAlign: 'left' }} />
              {EMPHASES.map(e => (
                <th key={e.id} style={{ width: 180, ...cellPad, textAlign: 'left' }}>
                  <GroupLabel>{e.label}</GroupLabel>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INDICATIONS.map(ind => (
              <tr key={ind} style={{ borderTop: '1px solid var(--color-primary-grey)' }}>
                <td style={{ ...cellPad }}><GroupLabel>{ind}</GroupLabel></td>
                {EMPHASES.map(e => (
                  <td key={e.id} style={{ ...cellPad }}>
                    <Badge emphasis={e.id} indication={ind} withIcon={false} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* With icon matrix */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        With Icon
      </p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', minWidth: 500 }}>
          <thead>
            <tr>
              <th style={{ width: 100, ...cellPad, textAlign: 'left' }} />
              {EMPHASES.map(e => (
                <th key={e.id} style={{ width: 180, ...cellPad, textAlign: 'left' }}>
                  <GroupLabel>{e.label}</GroupLabel>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INDICATIONS.map(ind => (
              <tr key={ind} style={{ borderTop: '1px solid var(--color-primary-grey)' }}>
                <td style={{ ...cellPad }}><GroupLabel>{ind}</GroupLabel></td>
                {EMPHASES.map(e => (
                  <td key={e.id} style={{ ...cellPad }}>
                    <Badge emphasis={e.id} indication={ind} withIcon />
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
