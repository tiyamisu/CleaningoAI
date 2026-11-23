import React from 'react';
import { cn } from '@/lib/utils';

export function Card({
  children,
  className,
  variant = 'default',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'flat' | 'dark' | 'editorial' }) {
  const styles = {
    default: 'editorial-card',
    editorial: 'editorial-card',
    flat: 'editorial-card-flat',
    dark: 'dark-card text-[#F7F7F0]',
  };

  return (
    <div className={cn(styles[variant], className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('px-6 py-5 border-b border-[rgba(18,59,46,0.08)] flex flex-col gap-1', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-lg font-bold text-[#17251F] tracking-tight leading-snug', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-xs text-[rgba(23,37,31,0.65)] leading-relaxed', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'px-6 py-4 bg-[rgba(18,59,46,0.02)] border-t border-[rgba(18,59,46,0.06)] rounded-b-2xl flex items-center justify-between',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
