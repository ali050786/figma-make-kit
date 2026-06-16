import { useState } from 'react';
import checkboxSvg from '../../imports/Checkbox/svg-ya5yqn2omj';

// ─── Types ────────────────────────────────────────────────────────────────────

export type CheckboxState  = 'default' | 'hovered' | 'focused' | 'disabled' | 'error';
export type CheckboxStatus = 'unchecked' | 'checked' | 'indeterminate';

export interface CheckboxProps {
  label?: string;
  status?: CheckboxStatus;
  defaultStatus?: CheckboxStatus;
  state?: CheckboxState;
  onChange?: (next: CheckboxStatus) => void;
  className?: string;
}

// ─── Visual box ───────────────────────────────────────────────────────────────

function CheckboxBox({ state, status }: { state: CheckboxState; status: CheckboxStatus }) {
  const isChecked   = status === 'checked';
  const isIndet     = status === 'indeterminate';
  const isDisabled  = state === 'disabled';
  const isError     = state === 'error';
  const isActive    = state === 'hovered' || state === 'focused';

  // Disabled checked
  if (isDisabled && isChecked) {
    return (
      <div className="relative shrink-0 size-[20px]" style={{ background: '#999999' }}>
        <div className="absolute" style={{ bottom: '30%', left: 4, top: '30%', width: 12 }}>
          <svg className="absolute block size-full" fill="none" viewBox="0 0 12 8">
            <path d={checkboxSvg.p11aab0c0} fill="white" />
          </svg>
        </div>
      </div>
    );
  }

  // Disabled indeterminate
  if (isDisabled && isIndet) {
    return (
      <div className="relative shrink-0 size-[20px]" style={{ background: '#999999' }}>
        <div className="absolute bg-white" style={{ height: 2, width: 10, top: 9, left: 5 }} />
      </div>
    );
  }

  // Disabled unchecked
  if (isDisabled) {
    return (
      <div className="relative shrink-0 size-[20px] bg-[#E7E7E7]">
        <div aria-hidden className="absolute inset-0 border border-solid pointer-events-none border-[#999999]" />
      </div>
    );
  }

  // Checked (enabled)
  if (isChecked) {
    return (
      <div className="relative shrink-0 size-[20px]">
        <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 20 20">
          <rect
            fill={isError ? 'var(--color-error-primary)' : 'var(--color-secondary-2)'}
            fillOpacity={isActive ? 0.8 : 1}
            height="20" width="20"
          />
          <path d={checkboxSvg.p236b3ac0} fill="white" />
        </svg>
      </div>
    );
  }

  // Indeterminate (enabled)
  if (isIndet) {
    return (
      <div className="relative shrink-0 size-[20px]" style={{
        background: isError ? 'var(--color-error-primary)' : `var(--color-secondary-2)`,
        opacity: isActive ? 0.8 : 1,
      }}>
        <div className="absolute bg-white" style={{ height: 2, width: 10, top: 9, left: 5 }} />
      </div>
    );
  }

  // Unchecked
  const borderColor = isError   ? 'var(--color-error-primary)'
    : isActive  ? 'var(--color-secondary-2)'
    : '#565962';

  return (
    <div className="relative shrink-0 size-[20px] bg-white">
      <div aria-hidden className="absolute inset-0 border border-solid pointer-events-none" style={{ borderColor }} />
    </div>
  );
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

export function Checkbox({
  label,
  status: controlledStatus,
  defaultStatus = 'unchecked',
  state: forcedState,
  onChange,
  className = '',
}: CheckboxProps) {
  const [internalStatus, setInternalStatus] = useState<CheckboxStatus>(defaultStatus);
  const [hover, setHover]     = useState(false);
  const [focused, setFocused] = useState(false);

  const status = controlledStatus ?? internalStatus;

  const effectiveState: CheckboxState = forcedState ?? (
    status === 'unchecked' || status === 'checked' || status === 'indeterminate'
      ? (focused ? 'focused' : hover ? 'hovered' : 'default')
      : 'default'
  );

  const isDisabled = effectiveState === 'disabled';

  function handleClick() {
    if (isDisabled) return;
    const next: CheckboxStatus = status === 'unchecked' ? 'checked'
      : status === 'checked' ? 'unchecked'
      : 'unchecked';
    setInternalStatus(next);
    onChange?.(next);
  }

  return (
    <div
      className={`relative inline-flex gap-[8px] items-start cursor-pointer select-none ${isDisabled ? 'cursor-not-allowed' : ''} ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      tabIndex={isDisabled ? -1 : 0}
      role="checkbox"
      aria-checked={status === 'indeterminate' ? 'mixed' : status === 'checked'}
      aria-disabled={isDisabled}
      onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handleClick(); } }}
    >
      <CheckboxBox state={effectiveState} status={status} />

      {/* Focus ring */}
      {effectiveState === 'focused' && (
        <div className="absolute size-[24px]" style={{ left: -2, top: -2, pointerEvents: 'none' }}>
          <div aria-hidden className="absolute inset-0 border border-solid pointer-events-none border-[rgba(10,117,147,0.4)]" />
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

export default Checkbox;
