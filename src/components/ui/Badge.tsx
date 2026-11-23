import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'high' | 'medium' | 'low' | 'verified' | 'demo' | 'teal' | 'neutral' | 'outline';
  dot?: boolean;
}

export function Badge({
  children,
  variant = 'default',
  dot = false,
  className,
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-[#DCE8DA] text-[#123B2E] border-[rgba(18,59,46,0.15)]',
    high: 'bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]',
    medium: 'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]',
    low: 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC]',
    verified: 'bg-[#123B2E] text-[#B6D957] border-[#0B2922]',
    demo: 'bg-[#FFF7ED] text-[#C2410C] border-[#FDBA74]',
    teal: 'bg-[#E0F2FE] text-[#0369A1] border-[#7DD3FC]',
    neutral: 'bg-[#F1F5F9] text-[#475569] border-[#CBD5E1]',
    outline: 'bg-transparent text-[#123B2E] border-[rgba(18,59,46,0.25)]',
  };

  const dots = {
    default: 'bg-[#123B2E]',
    high: 'bg-[#DC2626]',
    medium: 'bg-[#D97706]',
    low: 'bg-[#16A34A]',
    verified: 'bg-[#B6D957]',
    demo: 'bg-[#EA580C]',
    teal: 'bg-[#0284C7]',
    neutral: 'bg-[#64748B]',
    outline: 'bg-[#123B2E]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold border rounded-full font-mono transition-colors tracking-tight',
        variants[variant],
        className
      )}
      {...props}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dots[variant])} />}
      {children}
    </span>
  );
}
