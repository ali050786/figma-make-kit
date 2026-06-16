import { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type RadioState = 'default' | 'hovered' | 'focused' | 'disabled' | 'error';

export interface RadioProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  state?: RadioState;
  onChange?: (checked: boolean) => void;
  name?: string;
  className?: string;
}

// ─── Radio circle SVG ─────────────────────────────────────────────────────────

function RadioCircle({ state, checked }: { state: RadioState; checked: boolean }) {
  const isDisabled = state === 'disabled';
  const isError    = state === 'error';
  const isActive   = state === 'hovered' || state === 'focused';

  if (checked) {
    // Selected
    const outerStroke = isDisabled ? '#999999'
      : isError     ? 'var(--color-error-primary)'
      : isActive    ? 'var(--color-secondary-2)'
      : 'var(--color-secondary-2)';

    const innerFill  = isDisabled ? '#999999'
      : isError     ? 'var(--color-error-primary)'
      : 'var(--color-secondary-2)';

    const opacity = isActive ? 0.8 : 1;

    return (
      <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 20 20">
        <circle cx="10" cy="10" fill="white"  r="9.5" stroke={outerStroke} strokeOpacity={opacity} />
        <circle cx="10" cy="10" fill={innerFill} fillOpacity={opacity} r="4.5" stroke={innerFill} strokeOpacity={opacity} />
      </svg>
    );
  }

  // Unselected
  const stroke = isActive ? 'var(--color-secondary-2)' : 'var(--color-secondary-2)';
  const defaultStroke = '#6B6F7A';
  const bg = isDisabled ? '#E7E7E7' : 'white';

  if (isError) {
    return (
      <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 20 20">
        <circle cx="10" cy="10" fill="white" r="9.5" stroke="var(--color-error-primary)" />
      </svg>
    );
  }

  if (isActive) {
    return (
      <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 20 20">
        <g>
          <circle cx="10" cy="10" fill="white" r="10" />
          <circle cx="10" cy="10" r="9.5" stroke={stroke} strokeOpacity="0.8" />
        </g>
      </svg>
    );
  }

  return (
    <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 20 20">
      <g>
        <circle cx="10" cy="10" fill={bg} r="9.5" />
        <circle cx="10" cy="10" r="9.5" stroke={defaultStroke} />
        {!isDisabled && <circle cx="10" cy="10" r="9.5" stroke="black" strokeOpacity="0.2" />}
      </g>
    </svg>
  );
}

// ─── Radio ────────────────────────────────────────────────────────────────────

export function Radio({
  label,
  checked: controlledChecked,
  defaultChecked = false,
  state: forcedState,
  onChange,
  className = '',
}: RadioProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const [hover, setHover]     = useState(false);
  const [focused, setFocused] = useState(false);

  const checked = controlledChecked ?? internalChecked;

  const effectiveState: RadioState = forcedState ?? (
    focused ? 'focused' : hover ? 'hovered' : 'default'
  );

  const isDisabled = effectiveState === 'disabled';

  function handleClick() {
    if (isDisabled) return;
    setInternalChecked(true);
    onChange?.(true);
  }

  return (
    <div
      className={`relative inline-flex gap-[8px] items-start select-none ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      tabIndex={isDisabled ? -1 : 0}
      role="radio"
      aria-checked={checked}
      aria-disabled={isDisabled}
      onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handleClick(); } }}
    >
      {/* Radio circle */}
      <div className="relative shrink-0 size-[20px]">
        <RadioCircle state={effectiveState} checked={checked} />
      </div>

      {/* Focus ring */}
      {effectiveState === 'focused' && (
        <div className="absolute pointer-events-none" style={{ left: -2, top: -2, width: 24, height: 24 }}>
          <svg className="absolute block size-full" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="11.5" stroke="var(--color-secondary-2)" strokeOpacity="0.4" />
          </svg>
        </div>
      )}

      {label && (
        <span style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-para)',
          fontWeight: 'var(--font-weight-regular)',
          color: isDisabled ? '#565962' : 'var(--color-primary-text)',
          lineHeight: 'normal',
        }}>
          {label}
        </span>
      )}
    </div>
  );
}

export default Radio;
