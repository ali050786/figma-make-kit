import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router';
import { DesignSystemPage } from './components/DesignSystemPage';
import { GlobalHeader } from './components/GlobalHeader';
import { SideNav } from './components/SideNav';
import { Footer } from './components/Footer';
import keenanLogo from '../imports/GlobalHeader/268260c7c4b29dd81e298ecb1511858d1fbd3c50.png';

// ─── Logo component (Keenan theme demo) ───────────────────────────────────────

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

// ─── App shell (full layout demo) ────────────────────────────────────────────

function AppShell() {
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <div data-theme="keenan" style={{
      fontFamily: 'var(--font-family-base)',
      display: 'flex', flexDirection: 'column', minHeight: '100vh',
      background: 'var(--color-primary-background)',
    }}>
      {/* MARKER-MAKE-KIT-INVOKED */}
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

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <SideNav
          activeId={activeNav}
          onItemClick={setActiveNav}
        />

        {/* Main content area */}
        <main style={{
          flex: 1, overflow: 'auto',
          padding: 'var(--space-8)',
          display: 'flex', flexDirection: 'column', gap: 'var(--space-6)',
        }}>
          {/* Breadcrumb / page title */}
          <div>
            <h1 style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-h3)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-primary-text)',
              margin: 0,
            }}>
              {activeNav.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </h1>
            <p style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-para)',
              color: 'var(--color-secondary-text)',
              margin: 'var(--space-1) 0 0',
            }}>
              Select a navigation item to preview the active state
            </p>
          </div>

          {/* Sample content cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
            {['Overview', 'Recent Activity', 'Quick Actions', 'Notifications'].map(card => (
              <div key={card} style={{
                background: 'var(--color-secondary-background)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-primary-grey)',
                padding: 'var(--space-6)',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-h5)',
                  fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary-text)',
                  margin: '0 0 var(--space-3) 0',
                }}>
                  {card}
                </h3>
                <div style={{ height: 80, background: 'var(--color-tertiary-background)', borderRadius: 'var(--radius-sm)' }} />
              </div>
            ))}
          </div>

          {/* Link to design system */}
          <div style={{
            background: 'var(--color-secondary-background)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-primary-grey)',
            padding: 'var(--space-6)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-h5)',
                fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary-text)', margin: 0,
              }}>
                Jevelina Design System
              </h3>
              <p style={{
                fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para)',
                color: 'var(--color-secondary-text)', margin: 'var(--space-1) 0 0',
              }}>
                View all tokens, typography, components and patterns
              </p>
            </div>
            <Link
              to="/designsystem"
              style={{
                fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-para)',
                fontWeight: 'var(--font-weight-bold)', color: 'var(--color-secondary-2)',
                textDecoration: 'none',
              }}
            >
              Open Design System →
            </Link>
          </div>
        </main>
      </div>

      <Footer
        companyName="A1M Health"
        contact={{
          phone: '1 (800) CALL-NOW | 1 (800) 121-2412',
          email: 'support@eldocomp.com',
          address: '9025 Smoky Hollow Street, Niagara Falls, NY 14304',
        }}
        showSocial
        poweredBy="Mphasis"
      />
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      {/* MARKER-MAKE-KIT-DISCOVERY-READ */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppShell />} />
          <Route path="/designsystem" element={<DesignSystemPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
