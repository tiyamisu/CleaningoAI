'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Map,
  Eye,
  Waves,
  AlertTriangle,
  TrendingUp,
  FlaskConical,
  FileText,
  BarChart3,
  ChevronRight,
  Database,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  Flame,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface Analytics {
  observations?: {
    total: number;
    annotated: number;
    byRisk: { risk_level: string; count: number }[];
    byZone?: { zone_id: string; count: number }[];
  };
  incidents?: {
    total: number;
    byStatus: { status: string; count: number }[];
  };
}

const MODULES = [
  {
    href: '/app/map',
    icon: Map,
    label: 'GeoIntel Explorer',
    desc: 'Interactive Leaflet map with 71 verified Bengaluru points and zone filtering.',
    badge: 'Geospatial',
    accent: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  {
    href: '/app/vision',
    icon: Eye,
    label: 'Vision AI Lab',
    desc: 'Simulated YOLOv8 detection and waste classification with confidence scoring.',
    badge: 'Demo AI',
    accent: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  {
    href: '/app/severity',
    icon: BarChart3,
    label: 'Severity Engine',
    desc: 'Review the study rubric and add human severity annotations to field observations.',
    badge: 'Scoring',
    accent: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  {
    href: '/app/hydrorisk',
    icon: Waves,
    label: 'HydroRisk Engine',
    desc: 'Explore a demo proximity score against illustrative waterway points. Connectivity is unverified.',
    badge: 'Hydrology',
    accent: 'bg-cyan-50 text-cyan-800 border-cyan-200',
  },
  {
    href: '/app/incidents',
    icon: AlertTriangle,
    label: 'Incident Queue',
    desc: 'Full lifecycle incident queue with inspector dispatch and status tracking.',
    badge: 'Operations',
    accent: 'bg-rose-50 text-rose-800 border-rose-200',
  },
  {
    href: '/app/analytics',
    icon: TrendingUp,
    label: 'Spatial Analytics',
    desc: 'Recharts visualizations on zone densities, waste types, and severity.',
    badge: 'Analytics',
    accent: 'bg-purple-50 text-purple-800 border-purple-200',
  },
];

export default function AppOverview() {
  const [analytics, setAnalytics] = useState<Analytics>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then((r) => r.json())
      .then((d) => {
        setAnalytics(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalObs = analytics.observations?.total ?? 0;
  const highRisk = analytics.observations?.byRisk?.find((r) => r.risk_level === 'HIGH')?.count ?? 0;
  const medRisk = analytics.observations?.byRisk?.find((r) => r.risk_level === 'MEDIUM')?.count ?? 0;
  const lowRisk = analytics.observations?.byRisk?.find((r) => r.risk_level === 'LOW')?.count ?? 0;
  const totalInc = analytics.incidents?.total ?? 0;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[rgba(18,59,46,0.08)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3C9290]">
              Operational Intelligence
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#123B2E]">
            Platform Overview
          </h1>
          <p className="text-xs text-[rgba(23,37,31,0.6)] font-mono mt-0.5">
            Bengaluru field dataset · Local workspace
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/app/reports">
            <Button variant="secondary" size="sm" leftIcon={<FileText className="w-4 h-4" />}>
              Submit Observation
            </Button>
          </Link>
          <Link href="/app/map">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4 text-[#B6D957]" />}>
              Open Map Explorer
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Field Observations"
          value={totalObs}
          subtext="GPS coordinates in the pilot dataset"
          icon={<Map className="w-5 h-5" />}
        />
        <StatCard
          label="Recorded High Risk"
          value={highRisk}
          subtext="Field risk category · not a severity annotation"
          icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
        />
        <StatCard
          label="Incidents"
          value={totalInc}
          subtext="Logged in operations queue"
          icon={<FileText className="w-5 h-5 text-blue-600" />}
        />
        <StatCard
          label="Illustrative Waterway Points"
          value={10}
          subtext="Demo references · no verified network"
          icon={<Waves className="w-5 h-5 text-teal-600" />}
        />
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Severity Breakdown Bar */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading font-bold text-base text-[#123B2E]">
                  Recorded Field Risk Levels
                </h3>
                <p className="text-xs text-[rgba(23,37,31,0.6)] font-mono">
                  Original field classifications · human severity annotations pending
                </p>
              </div>
              <Badge variant="neutral">{analytics.observations?.annotated ?? 0} / {totalObs} ANNOTATED</Badge>
            </div>

            {/* Proportion Bar */}
            <div className="h-6 bg-[#F0F2EE] rounded-full overflow-hidden flex shadow-inner">
              <div
                className="bg-[#DC2626] h-full flex items-center justify-center text-[10px] font-mono text-white font-bold"
                style={{ width: `${(highRisk / totalObs) * 100}%` }}
                title={`High: ${highRisk}`}
              >
                {highRisk} High
              </div>
              <div
                className="bg-[#D97706] h-full flex items-center justify-center text-[10px] font-mono text-white font-bold"
                style={{ width: `${(medRisk / totalObs) * 100}%` }}
                title={`Medium: ${medRisk}`}
              >
                {medRisk} Med
              </div>
              <div
                className="bg-[#16A34A] h-full flex items-center justify-center text-[10px] font-mono text-white font-bold"
                style={{ width: `${(lowRisk / totalObs) * 100}%` }}
                title={`Low: ${lowRisk}`}
              >
                {lowRisk} Low
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-[rgba(18,59,46,0.06)] text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#DC2626]" />
                <span className="text-[rgba(23,37,31,0.7)]">High field risk: <strong>{highRisk}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#D97706]" />
                <span className="text-[rgba(23,37,31,0.7)]">Medium field risk: <strong>{medRisk}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#16A34A]" />
                <span className="text-[rgba(23,37,31,0.7)]">Low field risk: <strong>{lowRisk}</strong></span>
              </div>
            </div>
          </Card>

          {/* Quick-Launch Module Grid */}
          <div>
            <h3 className="font-heading font-bold text-lg text-[#123B2E] mb-4">
              Intelligence Modules
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MODULES.map((m) => {
                const Icon = m.icon;
                return (
                  <Link
                    key={m.href}
                    href={m.href}
                    className="editorial-card p-5 group flex flex-col justify-between hover:border-[#123B2E]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`p-2 rounded-lg border ${m.accent}`}>
                          <Icon className="w-4 h-4" />
                        </span>
                        <Badge variant="neutral">{m.badge}</Badge>
                      </div>
                      <h4 className="font-heading font-bold text-base text-[#123B2E] group-hover:text-[#3C9290] transition-colors">
                        {m.label}
                      </h4>
                      <p className="text-xs text-[rgba(23,37,31,0.65)] mt-1 leading-relaxed">
                        {m.desc}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[rgba(18,59,46,0.06)] flex items-center justify-between text-xs font-mono text-[#123B2E]">
                      <span>Launch Tool</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Active Incidents Feed */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-[#123B2E]">
                Operational Incidents
              </h3>
              <Link href="/app/incidents" className="text-xs font-mono font-semibold text-[#3C9290] hover:underline">
                View All →
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { id: 'INC-2026-00001', area: 'Delhi Public School Road', status: 'assigned', risk: 'HIGH' },
                { id: 'INC-2026-00002', area: 'Hosahalli Dumping Overflow', status: 'submitted', risk: 'HIGH' },
                { id: 'INC-2026-00003', area: 'Govindrajnagar Ward Verges', status: 'under_review', risk: 'HIGH' },
                { id: 'INC-2026-00004', area: 'Sankalpataru Forest Road', status: 'inspected', risk: 'HIGH' },
                { id: 'INC-2026-00005', area: 'Kachohalli River Bank', status: 'resolved', risk: 'MEDIUM' },
              ].map((inc) => (
                <Link
                  key={inc.id}
                  href={`/app/incidents/${inc.id}`}
                  className="block p-3 rounded-lg bg-[#F7F7F0] border border-[rgba(18,59,46,0.08)] hover:bg-white transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-[#123B2E]">{inc.id}</span>
                    <Badge variant={inc.risk === 'HIGH' ? 'high' : 'medium'}>{inc.risk}</Badge>
                  </div>
                  <p className="text-xs font-medium text-[#17251F] mt-1 truncate">{inc.area}</p>
                  <span className="text-[10px] font-mono uppercase text-[rgba(23,37,31,0.5)] mt-0.5 block">
                    Status: {inc.status}
                  </span>
                </Link>
              ))}
            </div>

            <Link href="/ops/queue" className="block pt-2">
              <Button variant="secondary" size="sm" className="w-full justify-center text-xs">
                Open Full Municipal Queue
              </Button>
            </Link>
          </Card>

          {/* Research Telemetry Box */}
          <Card className="p-6 bg-[#123B2E] text-white border-[#0B2922] space-y-3">
            <span className="text-xs font-mono font-bold text-[#B6D957] uppercase tracking-wider block">
              Pilot Telemetry
            </span>
            <div className="space-y-2 text-xs font-mono text-[#DCE8DA]/80">
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span>Database:</span>
                <span className="text-white font-bold">SQLite WAL</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span>Spatial Reference:</span>
                <span className="text-white font-bold">EPSG:4326 (WGS-84)</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1.5">
                <span>Vision Checkpoint:</span>
                <span className="text-amber-400 font-bold">DEMO_v1.0 (Adapter)</span>
              </div>
              <div className="flex justify-between">
                <span>Hydrology Mesh:</span>
                <span className="text-[#B6D957] font-bold">10 Water Bodies</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
