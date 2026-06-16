import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonType = 'primary' | 'secondary' | 'link';
export type ButtonSize = 'large' | 'small';
export type ButtonIcon = 'none' | 'with-icon' | 'only-icon' | 'split';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis level */
  variant?: ButtonType;
  /** Large (43px) or Small (32px) */
  size?: ButtonSize;
  /** Icon configuration */
  icon?: ButtonIcon;
  /** Icon element — required when icon is 'with-icon', 'only-icon', or 'split' */
  iconElement?: React.ReactNode;
  /** Secondary action element for Split variant (chevron or icon) */
  splitAction?: React.ReactNode;
  /** Accessible label — required when icon is 'only-icon' */
  'aria-label'?: string;
  /** Disabled state */
  disabled?: boolean;
  children?: React.ReactNode;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const base = `
  inline-flex items-center justify-center
  font-['Open_Sans'] uppercase tracking-normal
  rounded-[4px] cursor-pointer
  transition-opacity duration-150
  focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-1
  focus-visible:outline-[var(--color-secondary-2)]
  disabled:cursor-not-allowed
`.trim().replace(/\s+/g, ' ');

const variants: Record<ButtonType, string> = {
  primary: `
    bg-[var(--color-secondary-2)]
    text-[var(--color-secondary-background)]
    border-0
    hover:opacity-90
    disabled:bg-[#6B6F7A] disabled:opacity-100
  `.trim().replace(/\s+/g, ' '),

  secondary: `
    bg-transparent
    text-[var(--color-secondary-2)]
    border border-[var(--color-secondary-2)]
    hover:bg-[var(--color-primary-background)]
    disabled:border-[var(--color-secondary-grey)]
    disabled:text-[var(--color-secondary-grey)]
  `.trim().replace(/\s+/g, ' '),

  link: `
    bg-transparent
    text-[var(--color-secondary-2)]
    border-0
    font-semibold
    !normal-case
    hover:underline
    disabled:text-[var(--color-secondary-grey)]
    disabled:no-underline
  `.trim().replace(/\s+/g, ' '),
};

const sizes: Record<ButtonSize, Record<ButtonIcon, string>> = {
  large: {
    'none':      'px-[40px] py-[12px] text-[14px] font-bold',
    'with-icon': 'px-[30px] py-[12px] text-[14px] font-bold gap-[8px]',
    'only-icon': 'p-[12px] text-[14px] font-bold',
    'split':     'text-[14px] font-bold',
  },
  small: {
    'none':      'px-[20px] py-[8px] text-[12px] font-semibold',
    'with-icon': 'px-[16px] py-[8px] text-[12px] font-semibold gap-[8px]',
    'only-icon': 'p-[8px] text-[12px] font-semibold',
    'split':     'text-[12px] font-semibold',
  },
};

// ─── Split Button ─────────────────────────────────────────────────────────────

interface SplitButtonProps {
  variant: 'primary' | 'secondary';
  size: ButtonSize;
  children: React.ReactNode;
  splitAction?: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function SplitButton({ variant, size, children, splitAction, disabled, onClick }: SplitButtonProps) {
  const isLarge = size === 'large';
  const height = isLarge ? 'h-[43px]' : 'h-[32px]';
  const textSize = isLarge ? 'text-[14px]' : 'text-[12px]';
  const labelPad = isLarge ? 'px-[24px]' : 'px-[16px]';
  const iconPad  = isLarge ? 'px-[12px]' : 'px-[8px]';

  const isPrimary = variant === 'primary';
  const fillClass = isPrimary
    ? 'bg-[var(--color-secondary-2)] text-[var(--color-secondary-background)] disabled:bg-[#6B6F7A]'
    : 'bg-transparent text-[var(--color-secondary-2)] border border-[var(--color-secondary-2)] disabled:border-[var(--color-secondary-grey)] disabled:text-[var(--color-secondary-grey)]';

  return (
    <div
      className={`inline-flex items-stretch rounded-[5px] overflow-hidden gap-[1px] ${disabled ? 'opacity-60 pointer-events-none' : ''}`}
      role="group"
    >
      {/* Primary action */}
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          inline-flex items-center justify-center font-['Open_Sans'] uppercase
          font-bold ${textSize} ${height} ${labelPad} ${fillClass}
          focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-1
          focus-visible:outline-[var(--color-secondary-2)]
          cursor-pointer disabled:cursor-not-allowed transition-opacity hover:opacity-90
        `.trim().replace(/\s+/g, ' ')}
      >
        {children}
      </button>

      {/* Split action */}
      <button
        disabled={disabled}
        aria-label="More options"
        className={`
          inline-flex items-center justify-center font-['Open_Sans']
          ${height} ${iconPad} ${fillClass}
          focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-1
          focus-visible:outline-[var(--color-secondary-2)]
          cursor-pointer disabled:cursor-not-allowed transition-opacity hover:opacity-90
        `.trim().replace(/\s+/g, ' ')}
      >
        {splitAction ?? (
          // Default chevron icon
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </div>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────

export function Button({
  variant = 'primary',
  size = 'large',
  icon = 'none',
  iconElement,
  splitAction,
  disabled = false,
  children,
  className = '',
  ...rest
}: ButtonProps) {

  // Split is a structural variant — render separately
  if (icon === 'split') {
    if (variant === 'link') {
      console.warn('Button: Split variant is not available for Link type. Falling back to Primary.');
    }
    return (
      <SplitButton
        variant={variant === 'link' ? 'primary' : variant}
        size={size}
        splitAction={splitAction}
        disabled={disabled}
        onClick={rest.onClick}
      >
        {children}
      </SplitButton>
    );
  }

  const classes = [
    base,
    variants[variant],
    sizes[size][icon],
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      disabled={disabled}
      className={classes}
      {...rest}
    >
      {icon === 'with-icon' && iconElement && (
        <span className="shrink-0 w-4 h-4" aria-hidden="true">{iconElement}</span>
      )}

      {icon === 'only-icon' ? (
        <span className="shrink-0 w-4 h-4" aria-hidden="true">{iconElement}</span>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
}

export default Button;
