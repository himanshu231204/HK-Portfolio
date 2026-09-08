import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60';

const sizes = {
  md: 'px-4 py-2.5',
  lg: 'px-5 py-3',
} as const;

// primary/secondary get the tactile hard-shadow press (see .btn-hard) — a
// solid fill and a bordered fill both read as "pressable" that way; ghost
// stays a plain text-style control, so it keeps the quieter hover-only feel.
const variants: Record<Variant, string> = {
  primary:
    'btn-hard border border-[var(--border)] bg-[var(--accent)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)]',
  secondary:
    'btn-hard border border-[var(--border)] bg-[var(--surface)] text-ink hover:bg-[var(--surface-hover)]',
  ghost:
    'text-ink-muted hover:text-ink hover:bg-[var(--surface)]',
};

export function buttonClass(variant: Variant = 'secondary', size: keyof typeof sizes = 'md') {
  return `${base} ${sizes[size]} ${variants[variant]}`;
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: keyof typeof sizes;
  children: ReactNode;
}

export function ButtonLink({
  variant = 'secondary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={`${buttonClass(variant, size)} ${className}`} {...props}>
      {children}
    </a>
  );
}
