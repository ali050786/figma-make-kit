import type { ReactNode } from 'react';

interface SectionBlockProps {
  title: string;
  children: ReactNode;
}

export function SectionBlock({ title, children }: SectionBlockProps) {
  return (
    <section style={{ marginBottom: 'var(--space-12)' }}>
      <h2 style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-h2)',
        fontWeight: 'var(--font-weight-bold)',
        color: 'var(--color-primary-text)',
        margin: '0 0 var(--space-4) 0',
        lineHeight: 1,
      }}>
        {title}
      </h2>
      <hr style={{
        border: 'none',
        borderTop: '1px solid var(--color-primary-grey)',
        margin: '0 0 var(--space-6) 0',
      }} />
      {children}
    </section>
  );
}
