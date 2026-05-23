'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'destructive' | 'secondary';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface GlowButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id?: string;
  'aria-label'?: string;
  'aria-checked'?: boolean | 'true' | 'false';
  role?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#34d399] text-[#080f0d] font-semibold hover:bg-[#10b981] shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_30px_rgba(52,211,153,0.5)]',
  outline:
    'border border-[#34d399] text-[#34d399] hover:bg-[#34d399]/10 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]',
  ghost: 'text-[#d1fae5] hover:bg-[#122a22] hover:text-[#34d399]',
  destructive:
    'bg-[#fb7185]/10 border border-[#fb7185] text-[#fb7185] hover:bg-[#fb7185]/20',
  secondary:
    'bg-[#122a22] text-[#d1fae5] border border-[#1a3a2e] hover:border-[#34d399]/50 hover:bg-[#1a3a2e]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm rounded-lg',
  md: 'h-10 px-5 text-sm rounded-xl',
  lg: 'h-12 px-7 text-base rounded-xl',
  xl: 'h-14 px-8 text-lg rounded-xl',
};

const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  (
    {
      className,
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      type = 'button',
      onClick,
      id,
      ...ariaProps
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        whileTap={{ scale: 0.97 }}
        whileHover={{ y: -1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || loading}
        onClick={onClick}
        id={id}
        aria-label={(ariaProps as Record<string, string | boolean | undefined>)['aria-label'] as string}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>
        )}
        {children}
        {!loading && icon && iconPosition === 'right' && (
          <span className="shrink-0">{icon}</span>
        )}
      </motion.button>
    );
  }
);

GlowButton.displayName = 'GlowButton';
export default GlowButton;
