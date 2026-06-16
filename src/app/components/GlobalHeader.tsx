import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Bell, Menu } from 'lucide-react';

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

export interface GlobalHeaderProps {
  secured?: boolean;
  companyName?: string;
  portalName?: string;
  userName?: string;
  userRole?: string;
  userInitials?: string;
  avatarBg?: string;
  logo?: React.ReactNode;
  onMenuClick?: () => void;
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
  onMenuClick,
  onMyProfile,
  onLogout,
}: GlobalHeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const effectiveAvatarBg = avatarBg ?? 'var(--color-primary-2)';

  return (
    <header style={{
      background: 'var(--color-secondary-background)',
      borderBottom: '1px solid var(--color-primary-grey)',
      height: 110,
      flexShrink: 0,
      position: 'relative',
    }}>
      {/* Main row */}
      <div style={{
        display: 'flex', alignItems: 'center',
        height: secured ? 80 : '100%',
        padding: '0 var(--space-16)',
        gap: 'var(--space-6)',
      }}>
        {/* Logo */}
        <div style={{ width: 240, height: 64, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {logo}
        </div>

        <div style={{ flex: 1 }} />

        {/* Brand name + portal */}
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

      {/* Secured: divider + portal label row */}
      {secured && (
        <div style={{
          height: 30,
          borderTop: '1px solid var(--color-primary-grey)',
          display: 'flex', alignItems: 'center',
          padding: '0 var(--space-16)',
          gap: 'var(--space-4)',
        }}>
          {/* Mobile hamburger toggle (shows at smaller widths) */}
          <button
            onClick={onMenuClick}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: 'var(--color-secondary-text)' }}
            aria-label="Toggle menu"
          >
            <Menu size={18} />
          </button>
          <span style={{
            fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para)',
            fontWeight: 'var(--font-weight-regular)', color: 'var(--color-primary-text)',
            letterSpacing: '0.5px',
          }}>
            MEMBER PORTAL
          </span>
        </div>
      )}
    </header>
  );
}

export default GlobalHeader;
