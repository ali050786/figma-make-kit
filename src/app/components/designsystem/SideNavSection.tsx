import { useState } from 'react';
import { SideNav, DEFAULT_NAV_ITEMS } from '../SideNav';
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

const NAV_HEIGHT = 480;

export function SideNavSection() {
  const [activeId, setActiveId] = useState('dashboard');

  return (
    <SectionBlock title="Side Navigation">

      {/* Orientation: Collapsed vs Expanded */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <GroupLabel>Orientation — Collapsed &amp; Expanded</GroupLabel>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* Collapsed */}
          <div>
            <p style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-para-sm)',
              color: 'var(--color-secondary-text)',
              margin: '0 0 var(--space-2) 0',
            }}>
              Collapsed (80px)
            </p>
            <div style={{
              border: '1px solid var(--color-primary-grey)',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              height: NAV_HEIGHT,
            }}>
              <SideNav
                collapsed={true}
                activeId="dashboard"
              />
            </div>
          </div>

          {/* Expanded */}
          <div>
            <p style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-para-sm)',
              color: 'var(--color-secondary-text)',
              margin: '0 0 var(--space-2) 0',
            }}>
              Expanded (334px)
            </p>
            <div style={{
              border: '1px solid var(--color-primary-grey)',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              height: NAV_HEIGHT,
            }}>
              <SideNav
                collapsed={false}
                activeId="id-cards"
              />
            </div>
          </div>
        </div>
      </div>

      {/* States */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <GroupLabel>States — Default, Active, Hover</GroupLabel>
        </div>
        <p style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-para-sm)',
          color: 'var(--color-secondary-text)',
          margin: '0 0 var(--space-3) 0',
        }}>
          Each item shows: default (unselected), active (selected with left accent + overlay), hover (lighter overlay on mouse-over). The active left border uses <code style={{ background: 'var(--color-tertiary-background)', padding: '1px 4px', borderRadius: 2 }}>--color-primary-2</code>.
        </p>
        <div style={{
          border: '1px solid var(--color-primary-grey)',
          borderRadius: 'var(--radius-sm)',
          overflow: 'hidden',
          display: 'inline-block',
        }}>
          <SideNav
            collapsed={false}
            activeId={activeId}
            onItemClick={setActiveId}
          />
        </div>
        <p style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-para-sm)',
          color: 'var(--color-secondary-text)',
          marginTop: 'var(--space-2)',
        }}>
          ↑ Interactive — click items to change active state
        </p>
      </div>

      {/* Nav items list */}
      <div>
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <GroupLabel>Navigation Items</GroupLabel>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', minWidth: 400 }}>
            <thead>
              <tr>
                {['ID', 'Label', 'Icon Preview'].map(h => (
                  <th key={h} style={{
                    padding: 'var(--space-3) var(--space-4)',
                    textAlign: 'left',
                    borderBottom: '1px solid var(--color-primary-grey)',
                  }}>
                    <GroupLabel>{h}</GroupLabel>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DEFAULT_NAV_ITEMS.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--color-primary-grey)' }}>
                  <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                    <code style={{
                      fontFamily: 'monospace', fontSize: 'var(--font-size-para-sm)',
                      background: 'var(--color-tertiary-background)',
                      padding: '2px 6px', borderRadius: 2,
                      color: 'var(--color-primary-text)',
                    }}>
                      {item.id}
                    </code>
                  </td>
                  <td style={{
                    padding: 'var(--space-3) var(--space-4)',
                    fontFamily: 'var(--font-family-base)',
                    fontSize: 'var(--font-size-para)',
                    color: 'var(--color-primary-text)',
                  }}>
                    {item.label}
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                    <div style={{
                      width: 42, height: 42,
                      background: 'var(--color-primary-1)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {item.icon}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </SectionBlock>
  );
}
