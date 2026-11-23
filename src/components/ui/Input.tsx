import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-[#17251F] uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3.5 text-[rgba(23,37,31,0.45)] pointer-events-none shrink-0">
              {leftIcon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full bg-white border border-[rgba(18,59,46,0.16)] text-[#17251F] placeholder-[rgba(23,37,31,0.4)] rounded-lg px-3.5 py-2.5 text-sm transition-all duration-200',
              'focus:outline-none focus:border-[#123B2E] focus:ring-2 focus:ring-[#123B2E]/10',
              'disabled:bg-[#F7F7F0] disabled:text-[rgba(23,37,31,0.4)] disabled:cursor-not-allowed',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/10',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3.5 text-[rgba(23,37,31,0.45)] shrink-0">
              {rightIcon}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-[#DC2626] font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-[rgba(23,37,31,0.55)]">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

