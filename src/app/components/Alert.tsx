import { X } from 'lucide-react';
import alertSvg from '../../imports/AlertsToasts/svg-p1t2lt1k6m';

// ─── Types ────────────────────────────────────────────────────────────────────

export type AlertIndication = 'success' | 'error' | 'warning' | 'info';
export type AlertType = 'floating' | 'in-page';

export interface AlertProps {
  indication?: AlertIndication;
  type?: AlertType;
  multiline?: boolean;
  title?: string;
  message?: string;
  onDismiss?: () => void;
  className?: string;
}

// ─── Color map (design tokens) ────────────────────────────────────────────────

const COLORS: Record<AlertIndication, { bg: string; border: string; text: string }> = {
  success: { bg: 'var(--color-success-background)', border: 'var(--color-success-primary)', text: 'var(--color-success-primary)' },
  error:   { bg: 'var(--color-error-background)',   border: 'var(--color-error-primary)',   text: 'var(--color-error-primary)'   },
  warning: { bg: 'var(--color-warning-background)', border: 'var(--color-warning-primary)', text: 'var(--color-warning-primary)' },
  info:    { bg: 'var(--color-info-background)',    border: 'var(--color-info-primary)',    text: 'var(--color-info-primary)'    },
};

// ─── Status icon ──────────────────────────────────────────────────────────────

function StatusIcon({ indication }: { indication: AlertIndication }) {
  if (indication === 'warning') {
    return (
      <div className="flex items-center justify-center shrink-0 size-[20px] px-[4px] py-[3px]">
        <div className="relative h-[14px] w-[16px]">
          <svg className="absolute block size-full" fill="none" viewBox="0 0 16 14">
            <path d={alertSvg.p1180e700} fill="var(--color-warning-primary)" />
          </svg>
        </div>
      </div>
    );
  }
  if (indication === 'error') {
    return (
      <div className="flex items-center justify-center shrink-0 size-[20px] px-[4px] py-[3px]">
        <div className="relative size-[16px]">
          <svg className="absolute block size-full" fill="none" viewBox="0 0 16 16">
            <path d={alertSvg.pa4eed00} fill="var(--color-error-primary)" />
          </svg>
        </div>
      </div>
    );
  }
  if (indication === 'success') {
    return (
      <div className="flex items-center justify-center shrink-0 size-[20px] px-[4px] py-[3px]">
        <div className="relative size-[16px]">
          <svg className="absolute block size-full" fill="none" viewBox="0 0 16 16">
            <path d={alertSvg.p19807400} fill="var(--color-success-primary)" />
          </svg>
        </div>
      </div>
    );
  }
  // Info (rotated 180°)
  return (
    <div className="flex items-center justify-center shrink-0 size-[20px] px-[4px] py-[3px]">
      <div className="rotate-180 size-[16px] relative">
        <svg className="absolute block size-full" fill="none" viewBox="0 0 16 16">
          <path d={alertSvg.p147c2c00} fill="var(--color-info-primary)" />
        </svg>
      </div>
    </div>
  );
}

// ─── Alert ────────────────────────────────────────────────────────────────────

export function Alert({
  indication = 'success',
  type = 'floating',
  multiline = false,
  title = 'A Request Completed Successfully.',
  message = 'Registration Setup has been changed successfully',
  onDismiss,
  className = '',
}: AlertProps) {
  const colors  = COLORS[indication];
  const isFloat = type === 'floating';

  return (
    <div
      className={`relative flex gap-[8px] items-start pl-[20px] pr-[60px] py-[8px] ${isFloat ? 'drop-shadow-[0px_0px_5px_rgba(0,0,0,0.25)]' : ''} ${className}`}
      style={{ background: colors.bg }}
      role="alert"
    >
      {/* Border overlay */}
      <div aria-hidden className="absolute inset-0 border border-solid pointer-events-none" style={{ borderColor: colors.border }} />

      {/* Icon */}
      <StatusIcon indication={indication} />

      {/* Content */}
      {multiline ? (
        <div className="flex flex-col gap-[4px] flex-1 min-w-0 self-stretch" style={{ color: colors.text }}>
          <p style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-para)',
            fontWeight: 'var(--font-weight-semibold)',
          }}>
            {title}
          </p>
          <p style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-para)',
            fontWeight: 'var(--font-weight-regular)',
          }}>
            {message}
          </p>
        </div>
      ) : (
        <p className="self-stretch shrink-0 flex-1" style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-para)',
          fontWeight: 'var(--font-weight-regular)',
          color: colors.text,
        }}>
          {message}
        </p>
      )}

      {/* Dismiss button (floating only) */}
      {isFloat && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="absolute right-[14px] top-[8px] flex items-center justify-center size-[20px] bg-transparent border-none cursor-pointer"
          style={{ color: 'var(--color-secondary-grey)' }}
        >
          <X size={12} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}

export default Alert;
