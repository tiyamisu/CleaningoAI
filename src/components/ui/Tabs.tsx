'use client';

import React, { createContext, useContext, useState } from 'react';
import { cn } from '@/lib/utils';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
}: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (val: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const [internalTab, setInternalTab] = useState(defaultValue || '');
  const activeTab = value !== undefined ? value : internalTab;

  const setActiveTab = (id: string) => {
    if (value === undefined) setInternalTab(id);
    onValueChange?.(id);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn('w-full flex flex-col', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center p-1 bg-[#F0F2EE] border border-[rgba(18,59,46,0.08)] rounded-xl gap-1 overflow-x-auto max-w-full',
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
  icon,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('TabsTrigger must be used inside Tabs');
  const isActive = ctx.activeTab === value;

  return (
    <button
      type="button"
      onClick={() => ctx.setActiveTab(value)}
      className={cn(
        'inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 select-none whitespace-nowrap',
        isActive
          ? 'bg-white text-[#123B2E] shadow-xs border border-[rgba(18,59,46,0.1)]'
          : 'text-[rgba(23,37,31,0.65)] hover:text-[#123B2E] hover:bg-white/40',
        className
      )}
    >
      {icon && <span className="w-3.5 h-3.5 shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('TabsContent must be used inside Tabs');
  if (ctx.activeTab !== value) return null;

  return <div className={cn('mt-4 animate-in fade-in-50 duration-200', className)}>{children}</div>;
}

