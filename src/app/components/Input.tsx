import React, { useState } from 'react';
import svgPaths from '../../imports/Input/svg-xqeqd5rtrv';

// ─── Types ────────────────────────────────────────────────────────────────────

export type InputState = 'default' | 'error' | 'disabled';
export type InputTrailingIcon = 'none' | 'dropdown' | 'stepper' | 'eye';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'disabled'> {
  label?: string;
  state?: InputState;
  errorMessage?: string;
  trailingIcon?: InputTrailingIcon;
}

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'disabled'> {
  label?: string;
  state?: InputState;
  errorMessage?: string;
}

// ─── Trailing icons (SVGs from Figma import) ──────────────────────────────────

function DropdownIcon() {
  return (
    <div className="flex items-center justify-center shrink-0 size-[24px] px-[4px] py-[3px]" aria-hidden>
      <div className="relative w-[10px] h-[6px]">
        <svg className="absolute block size-full" fill="none" viewBox="0 0 10 6">
          <path clipRule="evenodd" d={svgPaths.p1a656c80} fill="#6B6F7A" fillRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}

function StepperIcon() {
  return (
    <div className="flex items-center justify-center shrink-0 size-[24px] px-[4px] py-[3px]" aria-hidden>
      <div className="relative w-[17px] h-[22px]">
        <svg className="block size-full" fill="none" viewBox="0 0 17 23.4142">
          <path d={svgPaths.pe07b180} stroke="#6B6F7A" />
          <path d={svgPaths.pc56eac0} stroke="#6B6F7A" />
          <line stroke="#999999" x2="17" y1="11.2071" y2="11.2071" />
        </svg>
      </div>
    </div>
  );
}

function EyeIcon({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={-1}
      aria-label="Toggle password visibility"
      className="flex items-center justify-center shrink-0 size-[24px] px-[4px] py-[3px] bg-transparent border-none cursor-pointer"
    >
      <div className="relative w-[14.286px] h-[10px]">
        <svg className="absolute block size-full" fill="none" viewBox="0 0 14.2857 10">
          <path clipRule="evenodd" d={svgPaths.pa055800} fill="#6B6F7A" fillRule="evenodd" />
        </svg>
      </div>
    </button>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getBorderClass(state: InputState): string {
  if (state === 'error')    return 'border-[var(--color-error-primary)]';
  if (state === 'disabled') return 'border-[var(--color-secondary-grey)]';
  // peer-focus: activates when the <input>/.peer sibling gains focus
  return 'border-[var(--color-secondary-grey)] peer-focus:border-[var(--color-secondary-2)]';
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-para-sm)',
  fontWeight: 'var(--font-weight-regular)',
  lineHeight: 'normal',
};

const errorStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-para-sm)',
  fontWeight: 'var(--font-weight-regular)',
  color: 'var(--color-error-primary)',
  marginTop: 'var(--space-1)',
};

// ─── Input ────────────────────────────────────────────────────────────────────

export function Input({
  label,
  state = 'default',
  errorMessage,
  trailingIcon = 'none',
  type,
  className = '',
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isDisabled = state === 'disabled';
  const hasIcon = trailingIcon !== 'none';

  const effectiveType = trailingIcon === 'eye' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`flex flex-col gap-[4px] ${className}`}>
      {label && (
        <span
          style={{
            ...labelStyle,
            color: isDisabled ? '#565962' : 'var(--color-primary-text)',
          }}
        >
          {label}
        </span>
      )}

      {/* Input wrapper — peer-focus: relies on the <input class="peer"> inside */}
      <div
        className={`relative flex items-center h-[40px] rounded-[4px] min-w-[100px]
          ${isDisabled ? 'bg-[#E7E7E7]' : 'bg-[var(--color-secondary-background)]'}
          ${hasIcon ? 'pl-[16px] pr-[8px]' : 'px-[16px]'}
        `}
      >
        <input
          type={effectiveType}
          disabled={isDisabled}
          className={`
            peer flex-1 h-full bg-transparent border-none outline-none
            font-['Open_Sans'] text-[14px] font-normal leading-normal
            placeholder:text-[#565962]
            ${isDisabled ? 'text-[#565962] cursor-not-allowed' : 'text-[var(--color-primary-text)]'}
          `.trim().replace(/\s+/g, ' ')}
          {...rest}
        />

        {trailingIcon === 'dropdown' && <DropdownIcon />}
        {trailingIcon === 'stepper'  && <StepperIcon />}
        {trailingIcon === 'eye'      && <EyeIcon onClick={() => setShowPassword(v => !v)} />}

        {/* Border overlay — uses peer-focus to react to input focus */}
        <div
          aria-hidden
          className={`absolute inset-0 rounded-[4px] border border-solid pointer-events-none ${getBorderClass(state)}`}
        />
      </div>

      {state === 'error' && errorMessage && (
        <span style={errorStyle}>{errorMessage}</span>
      )}
    </div>
  );
}

// ─── Textarea ─────────────────────────────────────────────────────────────────

export function Textarea({
  label,
  state = 'default',
  errorMessage,
  className = '',
  ...rest
}: TextareaProps) {
  const isDisabled = state === 'disabled';

  return (
    <div className={`flex flex-col gap-[4px] ${className}`}>
      {label && (
        <span
          style={{
            ...labelStyle,
            color: isDisabled ? '#565962' : 'var(--color-primary-text)',
          }}
        >
          {label}
        </span>
      )}

      <div className={`relative rounded-[4px] min-w-[100px] ${isDisabled ? 'bg-[#E7E7E7]' : 'bg-[var(--color-secondary-background)]'}`}>
        <textarea
          disabled={isDisabled}
          className={`
            peer w-full px-[16px] py-[16px] bg-transparent border-none outline-none resize-y
            font-['Open_Sans'] text-[14px] font-normal leading-[20px]
            min-h-[72px] placeholder:text-[#565962] rounded-[4px]
            ${isDisabled ? 'text-[#565962] cursor-not-allowed resize-none' : 'text-[var(--color-primary-text)]'}
          `.trim().replace(/\s+/g, ' ')}
          {...rest}
        />

        {/* Border overlay */}
        <div
          aria-hidden
          className={`absolute inset-0 rounded-[4px] border border-solid pointer-events-none ${getBorderClass(state)}`}
        />
      </div>

      {state === 'error' && errorMessage && (
        <span style={errorStyle}>{errorMessage}</span>
      )}
    </div>
  );
}

export default Input;
