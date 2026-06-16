import { SectionBlock } from './SectionBlock';

const SPACING_TOKENS = [
  { token: '--space-1',  px: '4px' },
  { token: '--space-2',  px: '8px' },
  { token: '--space-3',  px: '12px' },
  { token: '--space-4',  px: '16px' },
  { token: '--space-5',  px: '20px' },
  { token: '--space-6',  px: '24px' },
  { token: '--space-8',  px: '32px' },
  { token: '--space-10', px: '40px' },
];

export function SpacingSection() {
  return (
    <SectionBlock title="Spacing">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {SPACING_TOKENS.map((item, i) => (
          <div
            key={item.token}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-6)',
              padding: 'var(--space-3) 0',
              borderBottom: i < SPACING_TOKENS.length - 1 ? '1px solid var(--color-primary-grey)' : 'none',
            }}
          >
            {/* Token name */}
            <span style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-para-sm)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-primary-text)',
              width: 90,
              flexShrink: 0,
            }}>
              {item.token}
            </span>

            {/* Bar — width equals the token value */}
            <div style={{
              width: `var(${item.token})`,
              height: 8,
              background: 'var(--color-primary-2)',
              borderRadius: '2px',
              flexShrink: 0,
            }} />

            {/* Pixel value */}
            <span style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-para-sm)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-secondary-text)',
            }}>
              {item.px}
            </span>
          </div>
        ))}
      </div>
    </SectionBlock>
  );
}
