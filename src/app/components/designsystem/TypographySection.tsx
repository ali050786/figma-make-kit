import { SectionBlock } from './SectionBlock';

interface TypeStyle {
  name: string;
  fontSize: string;
  fontWeight: string;
  textTransform: 'none' | 'uppercase';
  color?: string;
}

const TYPE_STYLES: TypeStyle[] = [
  { name: 'H1 Bold',                fontSize: 'var(--font-size-h1)',      fontWeight: 'var(--font-weight-bold)',     textTransform: 'none' },
  { name: 'H2 Bold',                fontSize: 'var(--font-size-h2)',      fontWeight: 'var(--font-weight-bold)',     textTransform: 'none' },
  { name: 'H3 Bold',                fontSize: 'var(--font-size-h3)',      fontWeight: 'var(--font-weight-bold)',     textTransform: 'none' },
  { name: 'H4 Bold',                fontSize: 'var(--font-size-h4)',      fontWeight: 'var(--font-weight-bold)',     textTransform: 'none' },
  { name: 'H5 Bold',                fontSize: 'var(--font-size-h5)',      fontWeight: 'var(--font-weight-bold)',     textTransform: 'none' },
  { name: 'Paragraph Large Regular', fontSize: 'var(--font-size-para-lg)', fontWeight: 'var(--font-weight-regular)', textTransform: 'none' },
  { name: 'Paragraph Regular',      fontSize: 'var(--font-size-para)',    fontWeight: 'var(--font-weight-regular)', textTransform: 'none' },
  { name: 'Paragraph Small Regular', fontSize: 'var(--font-size-para-sm)', fontWeight: 'var(--font-weight-regular)', textTransform: 'none' },
  { name: 'Link Bold',              fontSize: 'var(--font-size-link)',    fontWeight: 'var(--font-weight-bold)',     textTransform: 'none', color: 'var(--color-secondary-2)' },
  { name: 'Button',                 fontSize: 'var(--font-size-btn)',     fontWeight: 'var(--font-weight-regular)', textTransform: 'uppercase' },
  { name: 'Small Button',           fontSize: 'var(--font-size-btn-sm)',  fontWeight: 'var(--font-weight-regular)', textTransform: 'uppercase' },
];

export function TypographySection() {
  return (
    <SectionBlock title="Typography">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {TYPE_STYLES.map((style, i) => (
          <div
            key={style.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-6)',
              padding: 'var(--space-4) 0',
              borderBottom: i < TYPE_STYLES.length - 1 ? '1px solid var(--color-primary-grey)' : 'none',
            }}
          >
            {/* Style label — Paragraph Small SemiBold, 120px wide */}
            <span style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-para-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-secondary-text)',
              width: 120,
              flexShrink: 0,
              lineHeight: 1.4,
            }}>
              {style.name}
            </span>

            {/* Live sample */}
            <span style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: style.fontSize,
              fontWeight: style.fontWeight,
              textTransform: style.textTransform,
              color: style.color ?? 'var(--color-primary-text)',
              lineHeight: 1,
            }}>
              The quick brown fox
            </span>
          </div>
        ))}
      </div>
    </SectionBlock>
  );
}
