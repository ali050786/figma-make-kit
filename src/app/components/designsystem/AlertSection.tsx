import { useState } from 'react';
import { Alert } from '../Alert';
import type { AlertIndication } from '../Alert';
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

const INDICATIONS: AlertIndication[] = ['success', 'warning', 'error', 'info'];

function DismissableAlert({ indication }: { indication: AlertIndication }) {
  const [visible, setVisible] = useState(true);
  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-para-sm)',
          color: 'var(--color-secondary-2)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        Show again
      </button>
    );
  }
  return (
    <Alert
      indication={indication}
      type="floating"
      onDismiss={() => setVisible(false)}
      style={{ width: 445 } as React.CSSProperties}
    />
  );
}

export function AlertSection() {
  return (
    <SectionBlock title="Alerts / Toasts">

      {/* Floating — all types */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        Floating — Single line (dismissible)
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
        {INDICATIONS.map(ind => (
          <DismissableAlert key={ind} indication={ind} />
        ))}
      </div>

      {/* In-page — all types */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        In-Page — Single line
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
        {INDICATIONS.map(ind => (
          <Alert
            key={ind}
            indication={ind}
            type="in-page"
            style={{ width: 445 } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Multiline floating */}
      <p style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-para-sm)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-secondary-text)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 var(--space-4) 0',
      }}>
        Floating — Multiline
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {INDICATIONS.map(ind => (
          <Alert
            key={ind}
            indication={ind}
            type="floating"
            multiline
            title="A Request Completed Successfully."
            style={{ width: 445 } as React.CSSProperties}
          />
        ))}
      </div>

    </SectionBlock>
  );
}
