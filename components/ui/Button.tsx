import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60';

const sizes = {
  md: 'px-4 py-2.5',
  lg: 'px-5 py-3',
} as const;

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--accent)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)]',
  secondary:
    'border border-[var(--border)] bg-[var(--surface)] text-ink hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]',
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
