import { Footer } from '../Footer';
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

function PreviewFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 'var(--space-8)' }}>
      <div style={{ marginBottom: 'var(--space-3)' }}>
        <GroupLabel>{label}</GroupLabel>
      </div>
      <div style={{
        border: '1px solid var(--color-primary-grey)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
      }}>
        {children}
      </div>
    </div>
  );
}

const COLUMNS_3 = [
  { title: 'Block 1', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Use' }, { label: 'Legal' }, { label: 'Contact Us' }] },
  { title: 'Block 2', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Use' }, { label: 'Legal' }, { label: 'Contact Us' }] },
  { title: 'Block 3', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Use' }, { label: 'Legal' }, { label: 'Contact Us' }] },
];

const COLUMNS_1 = [
  { title: 'Block 1', links: [{ label: 'Privacy Policy' }, { label: 'Terms of Use' }, { label: 'Legal' }, { label: 'Contact Us' }] },
];

export function FooterSection() {
  return (
    <SectionBlock title="Footer">

      {/* Variant 1: Full footer — Contact + 3 columns + Social */}
      <PreviewFrame label="Full footer — Contact, 3 Link Columns, Social">
        <Footer
          companyName="A1M Health"
          copyrightText="Copyright © 2022 A1M Health  •  CA Insurance License Number 0451271"
          contact={{
            phone: '1 (800) CALL-NOW | 1 (800) 121-2412',
            email: 'support@eldocomp.com',
            address: '9025 Smoky Hollow Street, Niagara Falls, NY 14304',
          }}
          columns={COLUMNS_3}
          showSocial
          poweredBy="Mphasis"
        />
      </PreviewFrame>

      {/* Variant 2: Minimal — social + 1 column, no contact */}
      <PreviewFrame label="Minimal — 1 link column + Social, no contact">
        <Footer
          companyName="A1M Health"
          contact={undefined}
          columns={COLUMNS_1}
          showSocial
        />
      </PreviewFrame>

      {/* Variant 3: Contact + Social + App badges */}
      <PreviewFrame label="With App Badges">
        <Footer
          companyName="A1M Health"
          contact={{
            phone: '1 (800) CALL-NOW | 1 (800) 121-2412',
            email: 'support@eldocomp.com',
            address: '9025 Smoky Hollow Street, Niagara Falls, NY 14304',
          }}
          columns={COLUMNS_1}
          showSocial
          showAppBadges
          poweredBy="Mphasis"
        />
      </PreviewFrame>

      {/* Props reference */}
      <div>
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <GroupLabel>Component Props</GroupLabel>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', minWidth: 500 }}>
            <thead>
              <tr>
                {['Prop', 'Type', 'Default', 'Description'].map(h => (
                  <th key={h} style={{
                    padding: 'var(--space-3) var(--space-4)', textAlign: 'left',
                    borderBottom: '1px solid var(--color-primary-grey)',
                  }}>
                    <GroupLabel>{h}</GroupLabel>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['companyName', 'string', '"A1M Health"', 'Name shown in the bottom bar'],
                ['copyrightText', 'string', 'Built-in', 'Full copyright line in the bottom bar'],
                ['contact', 'FooterContactInfo', 'Built-in', 'phone, email, address fields'],
                ['columns', 'FooterColumn[]', '3 default blocks', 'Array of { title, links[] } columns'],
                ['showSocial', 'boolean', 'true', 'Show Stay Connected section with social icons'],
                ['showAppBadges', 'boolean', 'false', 'Show App Store + Google Play badges'],
                ['poweredBy', 'string', 'undefined', 'Text after "Powered by" in bottom bar'],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop} style={{ borderBottom: '1px solid var(--color-primary-grey)' }}>
                  <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                    <code style={{ fontFamily: 'monospace', fontSize: 'var(--font-size-para-sm)', background: 'var(--color-tertiary-background)', padding: '2px 6px', borderRadius: 2, color: 'var(--color-primary-text)' }}>
                      {prop}
                    </code>
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', fontFamily: 'monospace', fontSize: 'var(--font-size-para-sm)', color: 'var(--color-secondary-text)' }}>
                    {type}
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para-sm)', color: 'var(--color-secondary-text)' }}>
                    {def}
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para)', color: 'var(--color-primary-text)' }}>
                    {desc}
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
