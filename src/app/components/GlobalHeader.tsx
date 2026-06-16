import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Bell } from 'lucide-react';

// ─── Profile dropdown ─────────────────────────────────────────────────────────

interface ProfileDropdownProps {
  userName: string;
  userRole: string;
  userInitials: string;
  avatarBg: string;
  onMyProfile?: () => void;
  onLogout?: () => void;
  onClose: () => void;
}

function ProfileDropdown({ userName, userRole, userInitials, avatarBg, onMyProfile, onLogout, onClose }: ProfileDropdownProps) {
  return (
    <div
      className="absolute right-0 top-full mt-[4px] z-50"
      style={{
        background: 'var(--color-secondary-background)',
        boxShadow: '0 0 4px rgba(0,0,0,0.25)',
        borderRadius: 'var(--radius-sm)',
        minWidth: 237,
      }}
    >
      {/* User info header */}
      <div style={{
        display: 'flex', gap: 10, alignItems: 'center',
        padding: 16,
        borderBottom: '1px solid var(--color-primary-grey)',
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: avatarBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <span style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para)', fontWeight: 'var(--font-weight-bold)', color: 'white' }}>
            {userInitials}
          </span>
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para)', fontWeight: 'var(--font-weight-semibold)', color: '#565962', margin: 0 }}>
            {userName}
          </p>
          <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para-sm)', fontWeight: 'var(--font-weight-regular)', color: '#565962', margin: 0 }}>
            {userRole}
          </p>
        </div>
      </div>
      {[
        { label: 'My Profile', action: onMyProfile },
        { label: 'Logout', action: onLogout },
      ].map(item => (
        <button
          key={item.label}
          onClick={() => { item.action?.(); onClose(); }}
          style={{
            display: 'block', width: '100%', textAlign: 'left',
            padding: '10px 16px',
            fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para)',
            fontWeight: 'var(--font-weight-regular)', color: 'var(--color-secondary-2)',
            background: 'transparent', border: 'none', borderBottom: '1px solid var(--color-primary-grey)',
            cursor: 'pointer',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(38,49,84,0.1)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

// ─── Action icon button ───────────────────────────────────────────────────────

function ActionIcon({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: 32, height: 32, borderRadius: '50%',
      background: 'var(--color-info-background)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', flexShrink: 0,
      color: 'var(--color-info-primary)',
    }}>
      {children}
    </div>
  );
}

// ─── GlobalHeader ─────────────────────────────────────────────────────────────
//
// Layout contract (must match Figma design system spec):
//
// UNSECURED header
//   The inner content wrapper is 1216px wide and horizontally centered
//   within the 1440px header using `margin: 0 auto`. This aligns with
//   the 12-column grid. Do NOT use fixed left offsets here.
//
// SECURED header
//   The inner content wrapper is also 1216px wide but LEFT-PINNED with
//   a fixed `margin-left: 112px`. This offsets the content to clear the
//   left navigation bar. The wrapper does NOT center — it is always
//   anchored to the left at 112px.

export interface GlobalHeaderProps {
  secured?: boolean;
  companyName?: string;
  portalName?: string;
  userName?: string;
  userRole?: string;
  userInitials?: string;
  avatarBg?: string;
  logo?: React.ReactNode;
  onMyProfile?: () => void;
  onLogout?: () => void;
}

export function GlobalHeader({
  secured = false,
  companyName = 'A1M Health Insurance TPA',
  portalName = 'Member Portal',
  userName = 'Dr. Stevenson, Jennifer',
  userRole = 'Providers',
  userInitials = 'SJ',
  avatarBg,
  logo,
  onMyProfile,
  onLogout,
}: GlobalHeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const effectiveAvatarBg = avatarBg ?? 'var(--color-primary-2)';

  // Wrapper styles implement the layout contract described above:
  // - Unsecured: 1216px centered via margin auto (12-col grid alignment)
  // - Secured:   1216px left-pinned at margin-left 112px (clears left nav)
  const wrapperStyle: React.CSSProperties = secured
    ? {
      width: 1216,
      marginLeft: 112,
      // no marginRight — intentionally left-pinned, not centered
    }
    : {
      width: 1216,
      marginLeft: 'auto',
      marginRight: 'auto',
    };

  return (
    <header style={{
      background: 'var(--color-secondary-background)',
      borderBottom: '1px solid var(--color-primary-grey)',
      height: 110,
      flexShrink: 0,
      position: 'relative',
    }}>
      {/* Content wrapper — see layout contract above */}
      <div style={{ ...wrapperStyle, height: '100%' }}>

        {/* Main row */}
        <div style={{
          display: 'flex', alignItems: 'center',
          height: '100%',
          gap: 'var(--space-6)',
        }}>
          {/* Logo */}
          <div style={{ width: 240, height: 64, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            {logo}
          </div>

          <div style={{ flex: 1 }} />

          {/* Brand name + portal label */}
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <p style={{
              fontFamily: 'var(--font-family-base)', fontSize: 18, fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-secondary-1)', letterSpacing: '1.5px', textTransform: 'uppercase', margin: 0,
            }}>
              {companyName}
            </p>
            <p style={{
              fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para)',
              fontWeight: 'var(--font-weight-regular)', color: 'var(--color-secondary-text)', margin: 0,
            }}>
              {portalName}
            </p>
          </div>

          {secured && (
            <>
              <div style={{ width: 1, height: 51, background: 'var(--color-secondary-grey)', flexShrink: 0 }} />

              {/* Help & Bell */}
              <ActionIcon><HelpCircle size={16} /></ActionIcon>
              <ActionIcon><Bell size={16} /></ActionIcon>

              {/* Avatar + dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowDropdown(v => !v)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                    background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
                  }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: effectiveAvatarBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para-sm)', fontWeight: 'var(--font-weight-bold)', color: 'white' }}>
                      {userInitials}
                    </span>
                  </div>
                  <ChevronDown size={14} color="var(--color-secondary-grey)" />
                </button>

                {showDropdown && (
                  <ProfileDropdown
                    userName={userName} userRole={userRole}
                    userInitials={userInitials} avatarBg={effectiveAvatarBg}
                    onMyProfile={onMyProfile} onLogout={onLogout}
                    onClose={() => setShowDropdown(false)}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>


    </header>
  );
}

export default GlobalHeader;