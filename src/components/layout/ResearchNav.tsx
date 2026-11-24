'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  BookOpen,
  FlaskConical,
  Layers,
  Atom,
  Cpu,
  Database,
  FileText,
  Globe,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ArrowUpRight,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CleaningoEmblem } from '@/components/layout/PublicNav';

interface NavSection {
  title: string;
  items: {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    exact?: boolean;
  }[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { href: '/research-platform', label: 'Research Explorer', icon: Globe, exact: true },
    ],
  },
  {
    title: 'Discovery',
    items: [
      { href: '/research-platform/literature', label: 'Scientific Literature', icon: BookOpen },
      { href: '/research-platform/materials', label: 'Material Discovery', icon: Layers },
      { href: '/research-platform/chemical', label: 'Chemical Research', icon: Atom },
    ],
  },
  {
    title: 'Experimentation',
    items: [
      { href: '/research-platform/experiments', label: 'AI Experiment Studio', icon: FlaskConical },
      { href: '/research-platform/simulation', label: 'Simulation Workspace', icon: Cpu },
    ],
  },
  {
    title: 'Data & Publication',
    items: [
      { href: '/research-platform/datasets', label: 'Dataset Repository', icon: Database },
      { href: '/research-platform/publications', label: 'Publication Centre', icon: FileText },
    ],
  },
];

function NavContent({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-[#17251F] text-white select-none border-r border-[#0B2922]">
      {/* Brand */}
      <div className={cn('px-4 py-5 border-b border-white/10 flex items-center gap-3', collapsed && 'justify-center px-3')}>
        <CleaningoEmblem size={34} />
        {!collapsed && (
          <div>
            <div className="text-xs font-heading font-bold text-white leading-tight">CleaningoAI</div>
            <div className="text-[10px] font-mono text-[#B6D957]/70 tracking-wider uppercase">Research</div>
          </div>
        )}
      </div>

      {/* Nav Sections */}
      <div className="flex-1 py-4 px-2 space-y-5 overflow-y-auto overflow-x-hidden">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="space-y-1">
            {!collapsed && (
              <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-[#B6D957]/50 mb-1">
                {section.title}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map(({ href, label, icon: Icon, exact, badge }) => {
                const isActive = exact ? pathname === href : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all group',
                      isActive
                        ? 'bg-[#B6D957] text-[#123B2E] font-bold'
                        : 'text-[#DCE8DA]/70 hover:bg-white/10 hover:text-white',
                      collapsed && 'justify-center px-2'
                    )}
                    title={collapsed ? label : undefined}
                  >
                    <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-[#123B2E]' : 'text-[#B6D957]/60 group-hover:text-[#B6D957]')} />
                    {!collapsed && <span className="flex-1 truncate">{label}</span>}
                    {!collapsed && badge && (
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-bold bg-black/30 text-[#B6D957]">
                        {badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Links */}
      <div className="p-3 border-t border-white/10 space-y-1.5 bg-[#0D1A14]">
        {[
          { href: '/intelligence', label: 'Environmental Observatory', icon: BarChart3 },
          { href: '/operations', label: 'Engineering & Ops', icon: FlaskConical },
        ].map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] text-[#DCE8DA]/50 hover:bg-white/5 hover:text-white/80 transition-colors',
              collapsed && 'justify-center px-2'
            )}
            title={collapsed ? label : undefined}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
            {!collapsed && <ArrowUpRight className="w-3 h-3 ml-auto opacity-50" />}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ResearchNav() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-5 right-5 z-50 w-12 h-12 bg-[#17251F] text-white rounded-full flex items-center justify-center shadow-lg border border-[#B6D957]/30"
        aria-label="Toggle navigation"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={cn(
        'lg:hidden fixed left-0 top-0 h-full w-64 z-50 transform transition-transform duration-300 shadow-2xl',
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <NavContent collapsed={false} />
      </aside>

      <aside className={cn(
        'hidden lg:flex flex-col h-screen sticky top-0 shrink-0 transition-all duration-300 z-30',
        collapsed ? 'w-16' : 'w-60'
      )}>
        <NavContent collapsed={collapsed} />
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-[#17251F] border border-[#B6D957]/30 rounded-full items-center justify-center text-[#B6D957] hover:bg-[#123B2E] transition-colors z-10 shadow-md"
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </aside>
    </>
  );
}
