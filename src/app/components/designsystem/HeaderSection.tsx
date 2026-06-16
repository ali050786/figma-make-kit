import { useState } from 'react';
import { GlobalHeader } from '../GlobalHeader';
import { SectionBlock } from './SectionBlock';
import keenanLogo from '../../../imports/GlobalHeader/268260c7c4b29dd81e298ecb1511858d1fbd3c50.png';

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

function PreviewFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div style={{ marginBottom: 'var(--space-6)' }}>
      <div style={{ marginBottom: 'var(--space-3)' }}>
        <GroupLabel>{label}</GroupLabel>
      </div>
      <div style={{
        border: '1px solid var(--color-primary-grey)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        background: 'var(--color-primary-background)',
      }}>
        {children}
      </div>
    </div>
  );
}

// Theme-aware logo placeholder that responds to data-theme
function ThemeLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 64 }}>
      <div style={{
        width: 42, height: 42, borderRadius: 4,
        background: 'var(--color-primary-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <span style={{
          color: 'var(--color-primary-1)', fontWeight: 700, fontSize: 18,
          fontFamily: 'var(--font-family-base)',
        }}>J</span>
      </div>
      <div>
        <p style={{
          margin: 0, fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-para)', fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-primary-1)',
        }}>
          Jevelina
        </p>
        <p style={{
          margin: 0, fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-para-sm)', fontWeight: 'var(--font-weight-regular)',
          color: 'var(--color-secondary-text)',
        }}>
          Health Insurance
        </p>
      </div>
    </div>
  );
}

function KeenanLogo() {
  return (
    <div style={{ height: 64, width: 240, overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: '9.38% 24.58% 9.38% -1.67%' }}>
        <img
          alt="Keenan Logo"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          src={keenanLogo}
        />
      </div>
    </div>
  );
}

export function HeaderSection() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <SectionBlock title="Global Header">

      {/* Unsecured */}
      <PreviewFrame label="Unsecured (pre-login)">
        <GlobalHeader
          secured={false}
          companyName="A1M Health Insurance TPA"
          portalName="Member Portal"
          logo={<ThemeLogo />}
        />
      </PreviewFrame>

      {/* Secured */}
      <PreviewFrame label="Secured (logged in) — Keenan theme">
        <GlobalHeader
          secured
          companyName="ADMIN CENTER"
          portalName="For Employers"
          userName="Dr. Stevenson, Jennifer"
          userRole="Providers"
          userInitials="SJ"
          avatarBg="#df126c"
          logo={<KeenanLogo />}
        />
      </PreviewFrame>

      {/* Secured — theme-aware */}
      <PreviewFrame label="Secured — theme-aware logo">
        <GlobalHeader
          secured
          companyName="A1M Health Insurance TPA"
          portalName="Member Portal"
          userName="Hi, Jennifer"
          userRole="Employer"
          userInitials="JH"
          logo={<ThemeLogo />}
        />
      </PreviewFrame>

      {/* Profile dropdown */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <div style={{ marginBottom: 'var(--space-3)' }}><GroupLabel>Profile Dropdown States</GroupLabel></div>
        <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
          {['Default', 'Hover', 'Focused'].map(state => (
            <div key={state}>
              <p style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-para-sm)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-secondary-text)',
                margin: '0 0 var(--space-2) 0',
              }}>
                {state}
              </p>
              <div style={{
                background: 'var(--color-secondary-background)',
                boxShadow: '0 0 4px rgba(0,0,0,0.25)',
                borderRadius: 'var(--radius-sm)',
                minWidth: 237,
              }}>
                {/* User info */}
                <div style={{
                  display: 'flex', gap: 10, alignItems: 'center',
                  padding: 16,
                  borderBottom: '1px solid var(--color-primary-grey)',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: '#df126c',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <span style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para)', fontWeight: 'var(--font-weight-bold)', color: 'white' }}>SJ</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para)', fontWeight: 'var(--font-weight-semibold)', color: '#565962', margin: 0 }}>
                      Dr. Stevenson, Jennifer
                    </p>
                    <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para-sm)', color: '#565962', margin: 0 }}>
                      Providers
                    </p>
                  </div>
                </div>
                {/* Menu items */}
                {['My Profile', 'Logout'].map((item, i) => (
                  <div key={item} style={{
                    padding: '10px 16px',
                    background: state === 'Hover' && i === 0 ? 'rgba(38,49,84,0.1)' : 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--color-primary-grey)',
                    outline: state === 'Focused' && i === 0 ? '2px solid rgba(10,117,147,0.3)' : 'none',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-family-base)',
                      fontSize: 'var(--font-size-para)',
                      color: 'var(--color-secondary-2)',
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionBlock>
  );
}
