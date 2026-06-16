import svgPaths from '../../imports/MobileFooter/svg-8vrbzbfzhc';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FooterLink {
  label: string;
  href?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterContactInfo {
  phone?: string;
  email?: string;
  address?: string;
}

export interface FooterProps {
  companyName?: string;
  copyrightText?: string;
  contact?: FooterContactInfo;
  columns?: FooterColumn[];
  showSocial?: boolean;
  showAppBadges?: boolean;
  poweredBy?: string;
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: 'Block 1',
    links: [
      { label: 'Privacy Policy' },
      { label: 'Terms of Use' },
      { label: 'Legal' },
      { label: 'Contact Us' },
    ],
  },
  {
    title: 'Block 2',
    links: [
      { label: 'Privacy Policy' },
      { label: 'Terms of Use' },
      { label: 'Legal' },
      { label: 'Contact Us' },
    ],
  },
  {
    title: 'Block 3',
    links: [
      { label: 'Privacy Policy' },
      { label: 'Terms of Use' },
      { label: 'Legal' },
      { label: 'Contact Us' },
    ],
  },
];

const DEFAULT_CONTACT: FooterContactInfo = {
  phone: '1 (800) CALL-NOW | 1 (800) 121-2412',
  email: 'support@eldocomp.com',
  address: '9025 Smoky Hollow Street, Niagara Falls, NY 14304',
};

// ─── Social icons (SVG from Figma import) ─────────────────────────────────────

function SocialIcons() {
  const iconStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', color: 'var(--color-primary-text)',
  };

  return (
    <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
      {/* Facebook */}
      <div style={iconStyle}>
        <svg width="20" height="15.2" fill="none" viewBox="0 0 20 15.2">
          <path clipRule="evenodd" d={svgPaths.p3d60a00} fill="var(--color-primary-text)" fillRule="evenodd" />
        </svg>
      </div>
      {/* Twitter/X */}
      <div style={iconStyle}>
        <svg width="14" height="12.688" fill="none" viewBox="0 0 14 12.688">
          <path d={svgPaths.p1d6b7300} fill="var(--color-primary-text)" />
        </svg>
      </div>
      {/* YouTube */}
      <div style={iconStyle}>
        <svg width="20" height="14" fill="none" viewBox="0 0 20 14">
          <path clipRule="evenodd" d={svgPaths.p326bd400} fill="var(--color-primary-text)" fillRule="evenodd" />
        </svg>
      </div>
      {/* LinkedIn */}
      <div style={iconStyle}>
        <svg width="20" height="16" fill="none" viewBox="0 0 20 16">
          <path clipRule="evenodd" d={svgPaths.p8b5ce00} fill="var(--color-primary-text)" fillRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}

// ─── Text styles ──────────────────────────────────────────────────────────────

const headingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-para-lg)',
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-primary-text)',
  marginBottom: 'var(--space-3)',
};

const bodyStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-para)',
  fontWeight: 'var(--font-weight-regular)',
  color: 'var(--color-primary-text)',
  lineHeight: 1.6,
};

const linkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-para)',
  fontWeight: 'var(--font-weight-regular)',
  color: 'var(--color-secondary-2)',
  display: 'block',
  padding: '4px 0',
  textDecoration: 'none',
  cursor: 'pointer',
  lineHeight: 2,
};

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer({
  companyName = 'A1M Health',
  copyrightText = 'Copyright © 2022 A1M Health  •  CA Insurance License Number 0451271',
  contact = DEFAULT_CONTACT,
  columns = DEFAULT_COLUMNS,
  showSocial = true,
  showAppBadges = false,
  poweredBy,
}: FooterProps) {
  return (
    <footer>
      {/* Main content area */}
      <div style={{
        background: 'var(--color-tertiary-background)',
        padding: 'var(--space-8) var(--space-16)',
      }}>
        <div style={{ display: 'flex', gap: 'var(--space-10)', flexWrap: 'wrap', justifyContent: 'space-between' }}>

          {/* Contact Us */}
          <div style={{ minWidth: 200 }}>
            <h3 style={headingStyle}>Contact Us</h3>
            {contact.phone && (
              <p style={{ ...bodyStyle, marginBottom: 'var(--space-2)' }}>
                For immediate assistance, please call:<br />
                <strong>{contact.phone}</strong>
              </p>
            )}
            {contact.email && (
              <p style={{ ...bodyStyle, marginBottom: 'var(--space-2)' }}>
                Email:{' '}
                <a href={`mailto:${contact.email}`} style={{ color: 'var(--color-secondary-2)', textDecoration: 'none' }}>
                  {contact.email}
                </a>
              </p>
            )}
            {contact.address && (
              <p style={{ ...bodyStyle }}>{contact.address}</p>
            )}
          </div>

          {/* Link columns */}
          {columns.map(col => (
            <div key={col.title} style={{ minWidth: 120 }}>
              <h3 style={headingStyle}>{col.title}</h3>
              {col.links.map(link => (
                <a key={link.label} href={link.href ?? '#'} style={linkStyle}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}

          {/* Stay Connected */}
          {showSocial && (
            <div style={{ minWidth: 150 }}>
              <h3 style={headingStyle}>Stay Connected</h3>
              <SocialIcons />
              {showAppBadges && (
                <div style={{ marginTop: 'var(--space-4)' }}>
                  <h3 style={{ ...headingStyle, marginTop: 'var(--space-4)' }}>Get the Mobile App</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    <div style={{
                      background: '#263154', borderRadius: 5, padding: '8px 12px',
                      display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                    }}>
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83" />
                        <path d="M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                      <span style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para-sm)', color: 'white', fontWeight: 'var(--font-weight-regular)' }}>
                        Download on the App Store
                      </span>
                    </div>
                    <div style={{
                      background: '#263154', borderRadius: 5, padding: '8px 12px',
                      display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                    }}>
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                        <path d="M3.18 23.18L13.41 12 3.18.82C2.85 1.19 2.64 1.67 2.64 2.23v19.54c0 .56.21 1.04.54 1.41z" fill="#EA4335" />
                        <path d="M17.5 8.14l2.58-1.49-2.22-3.85L3.18.82l10.23 11.18 4.09-3.86z" fill="#FBBC04" />
                        <path d="M20.08 16.35l-2.58-1.49-4.09-3.86 2.38-2.6 4.29 2.48c.74.43 1.24 1.22 1.24 2.12s-.5 1.69-1.24 2.35z" fill="#4285F4" />
                        <path d="M13.41 12L3.18 23.18l14.68-5.32 2.22-3.85-2.38-2.6-4.29 5.59z" fill="#34A853" />
                      </svg>
                      <span style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para-sm)', color: 'white', fontWeight: 'var(--font-weight-regular)' }}>
                        Get it on Google Play
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        background: 'var(--color-secondary-background)',
        borderTop: '1px solid var(--color-primary-grey)',
        padding: 'var(--space-4) var(--space-16)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)',
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para-lg)',
            fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary-text)', margin: 0,
          }}>
            {companyName}
          </p>
          <p style={{
            fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para-sm)',
            fontWeight: 'var(--font-weight-regular)', color: 'var(--color-secondary-text)', margin: 0,
          }}>
            {copyrightText}
          </p>
        </div>
        {poweredBy && (
          <p style={{
            fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para-sm)',
            fontWeight: 'var(--font-weight-regular)', color: 'var(--color-secondary-text)', margin: 0,
          }}>
            Powered by {poweredBy}
          </p>
        )}
      </div>
    </footer>
  );
}

export default Footer;
