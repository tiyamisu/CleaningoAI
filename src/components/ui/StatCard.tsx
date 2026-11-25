import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  icon?: React.ComponentType<{ className?: string }> | React.ReactNode;
  trend?: string | { value: string; positive?: boolean };
  trendUp?: boolean;
  subtext?: string;
  description?: string;
  variant?: 'default' | 'forest' | 'highlight';
}

export function StatCard({
  label,
  value,
  icon: IconProp,
  trend,
  trendUp,
  subtext,
  description,
  variant = 'default',
  className,
  ...props
}: StatCardProps) {
  const isForest = variant === 'forest';

  const trendText = typeof trend === 'object' ? trend.value : trend;
  const isPositive = typeof trend === 'object' ? trend.positive !== false : trendUp ?? true;

  const renderIcon = () => {
    if (!IconProp) return null;
    if (React.isValidElement(IconProp)) return IconProp;
    const IconComp = IconProp as React.ComponentType<{ className?: string }>;
    return <IconComp className={cn('w-5 h-5', isForest ? 'text-[#B6D957]' : 'text-[#123B2E]')} />;
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden p-6 rounded-2xl border transition-all duration-200',
        isForest
          ? 'bg-[#123B2E] border-[#0B2922] text-[#F7F7F0] shadow-md'
          : variant === 'highlight'
          ? 'bg-white border-[#B6D957] ring-1 ring-[#B6D957]/30 shadow-sm'
          : 'bg-white border-[rgba(18,59,46,0.08)] shadow-xs hover:border-[rgba(18,59,46,0.18)]',
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              'text-xs font-semibold uppercase tracking-wider',
              isForest ? 'text-[#B6D957]' : 'text-[rgba(23,37,31,0.65)]'
            )}
          >
            {label}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span
              className={cn(
                'text-3xl font-bold tracking-tight font-heading',
                isForest ? 'text-white' : 'text-[#123B2E]'
              )}
            >
              {value}
            </span>
            {trendText && (
              <span
                className={cn(
                  'inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full',
                  isPositive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-rose-50 text-rose-700'
                )}
              >
                {trendText}
              </span>
            )}
          </div>
          {(subtext || description) && (
            <p
              className={cn(
                'mt-1 text-xs truncate',
                isForest ? 'text-[#F7F7F0]/60' : 'text-[rgba(23,37,31,0.5)]'
              )}
            >
              {subtext || description}
            </p>
          )}
        </div>
        {IconProp && (
          <div
            className={cn(
              'p-2.5 rounded-xl shrink-0',
              isForest ? 'bg-white/10 text-[#B6D957]' : 'bg-[#123B2E]/5 text-[#123B2E]'
            )}
          >
            {renderIcon()}
          </div>
        )}
      </div>
    </div>
  );
}
