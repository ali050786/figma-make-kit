import badgeSvg from '../../imports/Badge/svg-mu4a9k8nju';

// ─── Types ────────────────────────────────────────────────────────────────────

export type BadgeEmphasis   = 'bold' | 'subtle' | 'minimal';
export type BadgeIndication = 'success' | 'info' | 'warning' | 'error';

export interface BadgeProps {
  emphasis?:   BadgeEmphasis;
  indication?: BadgeIndication;
  withIcon?:   boolean;
  label?:      string;
  className?:  string;
}

// ─── Color + shape map (design tokens) ───────────────────────────────────────

const COLORS: Record<BadgeIndication, { bg: string; border: string; text: string }> = {
  success: { bg: 'var(--color-success-background)', border: 'var(--color-success-primary)', text: 'var(--color-success-primary)' },
  info:    { bg: 'var(--color-info-background)',    border: 'var(--color-info-primary)',    text: 'var(--color-info-primary)'    },
  warning: { bg: 'var(--color-warning-background)', border: 'var(--color-warning-primary)', text: 'var(--color-warning-primary)' },
  error:   { bg: 'var(--color-error-background)',   border: 'var(--color-error-primary)',   text: 'var(--color-error-primary)'   },
};

const DEFAULT_LABELS: Record<BadgeIndication, string> = {
  success: 'Green Indication',
  info:    'Blue Indication',
  warning: 'Orange Indication',
  error:   'Red Indication',
};

// ─── Status icon ──────────────────────────────────────────────────────────────

function BadgeIcon({ indication }: { indication: BadgeIndication }) {
  const color = COLORS[indication].text;

  if (indication === 'warning') {
    return (
      <div className="flex items-center justify-center size-[16px] px-[4px] py-[3px] shrink-0">
        <div className="relative h-[14px] w-[16px]">
          <svg className="absolute block size-full" fill="none" viewBox="0 0 16 14">
            <path d={badgeSvg.p1180e700} fill={color} />
          </svg>
        </div>
      </div>
    );
  }
  if (indication === 'error') {
    return (
      <div className="flex items-center justify-center size-[16px] px-[4px] py-[3px] shrink-0">
        <div className="relative size-[16px]">
          <svg className="absolute block size-full" fill="none" viewBox="0 0 16 16">
            <path d={badgeSvg.p2ce08100} fill={color} />
          </svg>
        </div>
      </div>
    );
  }
  if (indication === 'success') {
    return (
      <div className="flex items-center justify-center size-[16px] px-[4px] py-[3px] shrink-0">
        <div className="relative size-[16px]">
          <svg className="absolute block size-full" fill="none" viewBox="0 0 16 16">
            <path d={badgeSvg.p19807400} fill={color} />
          </svg>
        </div>
      </div>
    );
  }
  // Info (rotated)
  return (
    <div className="flex items-center justify-center size-[16px] px-[4px] py-[3px] shrink-0">
      <div className="rotate-180 size-[16px] relative">
        <svg className="absolute block size-full" fill="none" viewBox="0 0 16 16">
          <path d={badgeSvg.p147c2c00} fill={color} />
        </svg>
      </div>
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────

export function Badge({
  emphasis   = 'bold',
  indication = 'success',
  withIcon   = false,
  label,
  className  = '',
}: BadgeProps) {
  const colors     = COLORS[indication];
  const displayLabel = label ?? DEFAULT_LABELS[indication];

  // Layout by emphasis
  const isBold    = emphasis === 'bold';
  const isSubtle  = emphasis === 'subtle';
  const isMinimal = emphasis === 'minimal';

  const padding = isBold
    ? (withIcon ? 'px-[12px] pb-[5px] pt-[4px]' : 'px-[12px] pb-[5px] pt-[4px]')
    : isSubtle
      ? (withIcon ? 'px-[8px] py-[4px]' : 'px-[12px] py-[4px]')
      : (withIcon ? 'px-[6px] py-[2px]' : 'px-[6px] py-[2px]');

  const radius  = isBold ? 'rounded-[20px]' : 'rounded-[12px]';
  const gap     = withIcon ? (isBold ? 'gap-[8px]' : 'gap-[4px]') : '';

  // Text style
  const textStyle: React.CSSProperties = isBold ? {
    fontFamily:  'var(--font-family-base)',
    fontSize:    'var(--font-size-para)',
    fontWeight:  'var(--font-weight-regular)',
    color:       'var(--color-primary-text)',
    whiteSpace:  'nowrap',
  } : {
    fontFamily:  'var(--font-family-base)',
    fontSize:    'var(--font-size-para-sm)',
    fontWeight:  'var(--font-weight-semibold)',
    color:       colors.text,
    textTransform: 'uppercase' as const,
    whiteSpace:  'nowrap',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center ${padding} ${radius} ${gap} ${className}`}
      style={{ background: isMinimal ? 'transparent' : colors.bg }}
    >
      {/* Border */}
      {(isBold || isMinimal) && (
        <div
          aria-hidden
          className={`absolute inset-0 border border-solid pointer-events-none ${radius}`}
          style={{ borderColor: isMinimal ? '#E7E7E7' : colors.border }}
        />
      )}

      {/* Icon */}
      {withIcon && <BadgeIcon indication={indication} />}

      {/* Label */}
      <span style={textStyle}>{displayLabel}</span>
    </div>
  );
}

export default Badge;
