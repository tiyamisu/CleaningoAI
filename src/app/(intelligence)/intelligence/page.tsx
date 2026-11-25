'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Globe,
  Trash2,
  Droplets,
  Wind,
  Layers,
  FlaskConical,
  Factory,
  Zap,
  Satellite,
  Target,
  ArrowRight,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface Analytics {
  observations?: {
    total: number;
    byRisk: { risk_level: string; count: number }[];
    byZone?: { zone_id: string; count: number }[];
  };
  incidents?: { total: number; byStatus: { status: string; count: number }[] };
}

const INTELLIGENCE_DOMAINS = [
  {
    href: '/intelligence/waste',
    icon: Trash2,
    label: 'Waste & Resource Intelligence',
    desc: 'Waste classification, severity scoring, geospatial analysis. 71 verified Bengaluru field observations.',
    hasData: true,
    badge: 'Live Data',
    color: 'text-orange-600',
    bg: 'bg-orange-50 border-orange-200',
  },
  {
    href: '/intelligence/water',
    icon: Droplets,
    label: 'Water & Ocean Intelligence',
    desc: 'Hydrological risk mapping, drainage connectivity, water quality monitoring infrastructure.',
    hasData: false,
    badge: 'Coming Soon',
    color: 'text-sky-600',
    bg: 'bg-sky-50 border-sky-200',
  },
  {
    href: '/intelligence/air',
    icon: Wind,
    label: 'Air, Soil & Ecosystem',
    desc: 'Air quality indices, soil contamination analysis, ecosystem health indicators.',
    hasData: false,
    badge: 'Coming Soon',
    color: 'text-teal-600',
    bg: 'bg-teal-50 border-teal-200',
  },
  {
    href: '/intelligence/materials',
    icon: Layers,
    label: 'Material Intelligence',
    desc: 'Material lifecycle tracking, recyclability assessments, circular economy pathways.',
    hasData: false,
    badge: 'Coming Soon',
    color: 'text-purple-600',
    bg: 'bg-purple-50 border-purple-200',
  },
  {
    href: '/intelligence/chemical',
    icon: FlaskConical,
    label: 'Chemical Intelligence',
    desc: 'Hazardous substance identification, chemical risk matrices, regulatory compliance.',
    hasData: false,
    badge: 'Coming Soon',
    color: 'text-rose-600',
    bg: 'bg-rose-50 border-rose-200',
  },
  {
    href: '/intelligence/industrial',
    icon: Factory,
    label: 'Industrial Intelligence',
    desc: 'Industrial process monitoring, emission tracking, compliance and audit intelligence.',
    hasData: false,
    badge: 'Coming Soon',
    color: 'text-slate-600',
    bg: 'bg-slate-50 border-slate-200',
  },
  {
    href: '/intelligence/energy',
    icon: Zap,
    label: 'Energy Intelligence',
    desc: 'Renewable transition tracking, energy efficiency analysis, carbon footprint monitoring.',
    hasData: false,
    badge: 'Coming Soon',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50 border-yellow-200',
  },
  {
    href: '/intelligence/space',
    icon: Satellite,
    label: 'Space Sustainability',
    desc: 'Orbital debris tracking, satellite environmental monitoring, space resource management.',
    hasData: false,
    badge: 'Coming Soon',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50 border-indigo-200',
  },
  {
    href: '/intelligence/intervention',
    icon: Target,
    label: 'Intervention Intelligence',
    desc: 'Remediation planning, intervention efficacy tracking, environmental outcome assessment.',
    hasData: false,
    badge: 'Coming Soon',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 border-emerald-200',
  },
];

export default function IntelligencePage() {
  const [analytics, setAnalytics] = useState<Analytics>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then((r) => r.json())
      .then((d) => { setAnalytics(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const totalObs = analytics.observations?.total ?? 0;
  const highRisk = analytics.observations?.byRisk?.find(r => r.risk_level === 'HIGH')?.count ?? 0;
  const totalInc = analytics.incidents?.total ?? 0;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-10">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-[rgba(18,59,46,0.08)]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#B6D957] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3C9290]">
              Environmental Intelligence Platform
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-[#123B2E]">
            Global Environmental Observatory
          </h1>
          <p className="text-sm text-[rgba(23,37,31,0.65)] mt-2 max-w-2xl leading-relaxed">
            An integrated platform monitoring waste, water, air, materials, chemical, industrial, and energy systems.
            Currently anchored by a verified Bengaluru urban pilot study. Global modules are under active development.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/intelligence/waste">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4 text-[#B6D957]" />}>
              Explore Waste Intelligence
            </Button>
          </Link>
        </div>
      </div>

      {/* Pilot Study KPI Banner */}
      <div className="bg-[#123B2E] rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dots-light opacity-20 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[#B6D957]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B6D957]">
              Bengaluru Urban Pilot — Real Field Data
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Verified GPS Sites', value: loading ? '—' : totalObs, sub: 'Field-logged provenance' },
              { label: 'Survey Zones', value: '14', sub: 'Greater Bengaluru' },
              { label: 'High Risk Sites', value: loading ? '—' : highRisk, sub: 'Field risk category' },
              { label: 'Active Incidents', value: loading ? '—' : totalInc, sub: 'In operations queue' },
            ].map((kpi) => (
              <div key={kpi.label}>
                <div className="text-3xl font-heading font-extrabold text-white">{kpi.value}</div>
                <div className="text-xs font-mono font-semibold text-[#B6D957] mt-0.5">{kpi.label}</div>
                <div className="text-[11px] text-white/50 mt-0.5">{kpi.sub}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap gap-4 text-xs font-mono text-white/60">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#B6D957]" /> WGS-84 coordinate validated</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#B6D957]" /> EPSG:4326 spatial reference</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#B6D957]" /> Multi-zone field study: 2025–2026</span>
          </div>
        </div>
      </div>

      {/* Domain Grid */}
      <div>
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#3C9290]">
              Intelligence Domains
            </span>
            <h2 className="font-heading font-extrabold text-2xl text-[#123B2E] mt-1">
              9 Environmental Domains
            </h2>
          </div>
          <Badge variant="neutral">1 live · 8 in development</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {INTELLIGENCE_DOMAINS.map((domain) => {
            const Icon = domain.icon;
            return (
              <Link
                key={domain.href}
                href={domain.href}
                className="editorial-card p-6 flex flex-col justify-between group hover:border-[#123B2E]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${domain.bg}`}>
                      <Icon className={`w-5 h-5 ${domain.color}`} />
                    </div>
                    <Badge variant={domain.hasData ? 'verified' : 'neutral'}>
                      {domain.badge}
                    </Badge>
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#123B2E] group-hover:text-[#3C9290] transition-colors leading-tight">
                    {domain.label}
                  </h3>
                  <p className="text-xs text-[rgba(23,37,31,0.65)] mt-2 leading-relaxed">
                    {domain.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[rgba(18,59,46,0.06)] flex items-center justify-between text-xs font-mono text-[#123B2E]">
                  <span>{domain.hasData ? 'Explore data' : 'View roadmap'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Platform scope notice */}
      <div className="p-5 bg-[#F7F7F0] border border-[rgba(18,59,46,0.1)] rounded-xl text-sm text-[rgba(23,37,31,0.7)] flex items-start gap-3">
        <Globe className="w-5 h-5 text-[#3C9290] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#123B2E]">Global Platform Vision:</strong> CleaningoAI is building an integrated environmental intelligence network.
          The Bengaluru urban waste pilot is the first real-world deployment. All other domains display their scope and development roadmap.
          No synthetic data or invented statistics are presented as real measurements.
        </div>
      </div>
    </div>
  );
}
