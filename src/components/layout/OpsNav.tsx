'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  List,
  UserCheck,
  FileSearch,
  BookOpen,
  Settings,
  ChevronLeft,
  Shield,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CleaningoEmblem } from '@/components/layout/PublicNav';
import { Badge } from '@/components/ui/Badge';

const NAV_ITEMS = [
  { href: '/ops', label: 'Operations Desk', icon: LayoutDashboard, exact: true },
  { href: '/ops/queue', label: 'Incident Queue', icon: List },
  { href: '/ops/assign', label: 'Officer Assignments', icon: UserCheck },
  { href: '/ops/inspect', label: 'Field Verification', icon: FileSearch },
  { href: '/ops/audit', label: 'Audit Trail', icon: BookOpen },
  { href: '/ops/admin', label: 'Administration', icon: Settings },
];

export function OpsNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
    <button
      type="button"
      aria-label={mobileOpen ? 'Close operations navigation' : 'Open operations navigation'}
      aria-expanded={mobileOpen}
      onClick={() => setMobileOpen((open) => !open)}
      className="lg:hidden fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#B6D957]/30 bg-[#0B2922] text-white shadow-xl"
    >
      {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
    {mobileOpen && <button type="button" aria-label="Close navigation" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-40 bg-[#0B2922]/55 backdrop-blur-sm lg:hidden" />}
    <aside className={cn(
      'fixed left-0 top-0 z-50 flex h-dvh w-[264px] shrink-0 flex-col border-r border-white/10 bg-[#0B2922] text-white shadow-2xl transition-transform duration-200 lg:sticky lg:z-30 lg:translate-x-0 lg:shadow-none',
      mobileOpen ? 'translate-x-0' : '-translate-x-full'
    )}>
      {/* Brand Header */}
      <div className="px-5 py-5 border-b border-white/10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="rounded-md overflow-hidden bg-black/30 border border-white/10 p-1">
            <Image src="/logo-dark.svg" alt="CleaningoAI" width={180} height={45} priority className="h-7 w-auto object-contain" />
          </div>
        </Link>
      </div>

      {/* Role Indicator Banner */}
      <div className="px-5 py-3 bg-[#123B2E]/60 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-[#B6D957]" />
          <span className="text-[11px] font-mono text-[#DCE8DA]">DEMO WORKSPACE</span>
        </div>
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-[#B6D957]/20 text-[#B6D957]">
          DEMO
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <p className="px-3 pb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-[#B6D957]/60">
          Operations Workflow
        </p>
        {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact
            ? pathname === href
            : pathname.startsWith(href) && href !== '/ops' || (exact && pathname === href);

          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150',
                isActive
                  ? 'bg-[#123B2E] text-white shadow-xs border-l-2 border-[#B6D957]'
                  : 'text-[#DCE8DA]/70 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-[#B6D957]' : 'text-[#DCE8DA]/50')} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Switch Portal Footer */}
      <div className="p-4 border-t border-white/10 space-y-2 bg-[#081F1A]">
        <Link
          href="/app"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-[#DCE8DA]/80 hover:text-white hover:bg-white/5 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ChevronLeft className="w-3.5 h-3.5" /> Intelligence App
          </span>
          <span className="text-[10px] text-[#B6D957]">Switch →</span>
        </Link>
      </div>
    </aside>
    </>
  );
}

export default OpsNav;
