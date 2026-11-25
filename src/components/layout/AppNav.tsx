'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  Map,
  Eye,
  BarChart3,
  Waves,
  FileText,
  AlertTriangle,
  TrendingUp,
  FlaskConical,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CleaningoEmblem } from '@/components/layout/PublicNav';

interface NavSection {
  title: string;
  items: {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    exact?: boolean;
    badge?: string;
  }[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { href: '/app', label: 'Intelligence Overview', icon: LayoutDashboard, exact: true },
    ],
  },
  {
    title: 'Geospatial',
    items: [
      { href: '/app/map', label: 'GeoIntel Explorer', icon: Map },
      { href: '/app/hydrorisk', label: 'HydroRisk Analysis', icon: Waves, badge: 'Demo' },
    ],
  },
  {
    title: 'Computer Vision',
    items: [
      { href: '/app/vision', label: 'Vision AI Lab', icon: Eye, badge: 'Demo' },
      { href: '/app/severity', label: 'Severity Engine', icon: BarChart3 },
    ],
  },
  {
    title: 'Operations',
    items: [
      { href: '/app/reports', label: 'Submit Report', icon: FileText },
      { href: '/app/incidents', label: 'Incident Queue', icon: AlertTriangle },
    ],
  },
  {
    title: 'Research & Insights',
    items: [
      { href: '/app/analytics', label: 'Spatial Analytics', icon: TrendingUp },
      { href: '/app/research', label: 'Research Workspace', icon: FlaskConical },
    ],
  },
  {
    title: 'System',
    items: [
      { href: '/app/settings', label: 'Platform Settings', icon: Settings },
    ],
  },
];

interface AppNavContentProps {
  collapsed: boolean;
  pathname: string;
  onCloseMobile: () => void;
  onToggleCollapse: () => void;
}

function AppNavContent({
  collapsed,
  pathname,
  onCloseMobile,
  onToggleCollapse,
}: AppNavContentProps) {
  return (
    <div className="flex flex-col h-full bg-[#123B2E] text-white select-none border-r border-[#0B2922]">
      {/* Brand Header */}
      <div className={cn(
        'px-4 py-5 border-b border-white/10 flex items-center justify-between',
        collapsed ? 'justify-center px-2' : ''
      )}>
        <Link href="/" className="flex items-center gap-3 group">
          {collapsed ? (
            <CleaningoEmblem size={34} />
          ) : (
            <div className="rounded-md overflow-hidden bg-black/20 border border-white/10 p-1">
              <Image src="/logo-dark.svg" alt="CleaningoAI" width={180} height={45} priority className="h-7 w-auto object-contain" />
            </div>
          )}
        </Link>
      </div>

      {/* Nav Groups */}
      <div className="flex-1 py-4 px-2 space-y-5 overflow-y-auto overflow-x-hidden">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="space-y-1">
            {!collapsed && (
              <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-[#B6D957]/60">
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
                    onClick={onCloseMobile}
                    className={cn(
                      'flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all group relative',
                      isActive
                        ? 'bg-[#B6D957] text-[#123B2E] font-bold shadow-xs'
                        : 'text-[#DCE8DA]/75 hover:bg-white/10 hover:text-white',
                      collapsed && 'justify-center px-2'
                    )}
                    title={collapsed ? label : undefined}
                  >
                    <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-[#123B2E]' : 'text-[#B6D957]/70 group-hover:text-[#B6D957]')} />
                    {!collapsed && (
                      <span className="flex-1 truncate">{label}</span>
                    )}
                    {!collapsed && badge && (
                      <span className={cn(
                        'text-[9px] font-mono uppercase px-1.5 py-0.2 rounded font-bold',
                        isActive ? 'bg-[#123B2E] text-white' : 'bg-black/30 text-[#B6D957]'
                      )}>
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

      {/* Footer / Portals */}
      <div className="p-3 border-t border-white/10 space-y-2 bg-[#0B2922]">
        <Link
          href="/ops"
          className={cn(
            'flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#B6D957] hover:bg-white/5 transition-colors border border-[rgba(182,217,87,0.2)]',
            collapsed && 'justify-center px-2'
          )}
          title={collapsed ? 'Operations Portal' : undefined}
        >
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          {!collapsed && <span>Operations Portal</span>}
        </Link>

        {/* Collapse Trigger (Desktop) */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden lg:flex w-full items-center justify-center gap-2 px-3 py-1.5 text-[11px] font-mono text-[#DCE8DA]/50 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <><ChevronLeft className="w-3.5 h-3.5" /><span>Collapse Sidebar</span></>}
        </button>
      </div>
    </div>
  );
}

export function AppNav() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-5 right-5 z-50 w-12 h-12 bg-[#123B2E] text-white rounded-full flex items-center justify-center shadow-lg border border-[#B6D957]/30"
        aria-label="Toggle navigation"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-xs animate-in fade-in-50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={cn(
          'lg:hidden fixed left-0 top-0 h-full w-64 z-50 transform transition-transform duration-300 shadow-2xl',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <AppNavContent
          collapsed={collapsed}
          pathname={pathname}
          onCloseMobile={() => setMobileOpen(false)}
          onToggleCollapse={() => setCollapsed(!collapsed)}
        />
      </aside>

      {/* Desktop Sticky Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col h-screen sticky top-0 shrink-0 transition-all duration-300 z-30',
          collapsed ? 'w-16' : 'w-60'
        )}
      >
        <AppNavContent
          collapsed={collapsed}
          pathname={pathname}
          onCloseMobile={() => setMobileOpen(false)}
          onToggleCollapse={() => setCollapsed(!collapsed)}
        />
      </aside>
    </>
  );
}
