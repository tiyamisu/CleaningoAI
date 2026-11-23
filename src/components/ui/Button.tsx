'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'lime' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ComponentType<{ className?: string }> | React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      icon: IconProp,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.99]';

    const variants = {
      primary:
        'bg-[#123B2E] text-white hover:bg-[#0B2922] focus:ring-[#123B2E] shadow-sm hover:shadow-md border border-[#123B2E]',
      secondary:
        'bg-white text-[#17251F] hover:bg-[#F7F7F0] border border-[rgba(18,59,46,0.14)] focus:ring-[#123B2E] shadow-2xs hover:shadow-xs',
      lime:
        'bg-[#B6D957] text-[#123B2E] hover:bg-[#a5c748] font-semibold focus:ring-[#B6D957] shadow-sm hover:shadow-md border border-[#a5c748]',
      outline:
        'bg-transparent text-[#123B2E] border border-[rgba(18,59,46,0.24)] hover:bg-[rgba(18,59,46,0.04)] focus:ring-[#123B2E]',
      ghost:
        'bg-transparent text-[#17251F] hover:bg-[rgba(18,59,46,0.06)] hover:text-[#123B2E] focus:ring-[#123B2E]',
      danger:
        'bg-[#DC2626] text-white hover:bg-[#B91C1C] focus:ring-[#DC2626] shadow-sm border border-[#DC2626]',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
      md: 'text-sm px-4 py-2 gap-2 h-10',
      lg: 'text-sm px-6 py-3 gap-2.5 min-h-12',
    };

    const renderIcon = () => {
      if (loading) return <Loader2 className="w-4 h-4 animate-spin shrink-0" />;
      if (leftIcon) return leftIcon;
      if (IconProp) {
        if (React.isValidElement(IconProp)) return IconProp;
        const IconComp = IconProp as React.ComponentType<{ className?: string }>;
        return <IconComp className="w-4 h-4 shrink-0" />;
      }
      return null;
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {renderIcon()}
        {children}
        {rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
