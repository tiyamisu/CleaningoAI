'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Map,
  Waves,
  BarChart3,
  Layers,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface Analytics {
  observations?: {
    total: number;
    byRisk: { risk_level: string; count: number }[];
    byZone?: { zone_id: string; count: number }[];
    byWasteType?: { waste_type: string; count: number }[];
  };
}

const WASTE_TOOLS = [
  {
    href: '/app/map',
    icon: Map,
    label: 'GeoIntel Map Explorer',
    desc: 'Interactive Leaflet map with all 71 verified Bengaluru GPS coordinates. Filter by zone, risk level, and waste type.',
    badge: 'Live Data',
    external: true,
  },
  {
    href: '/app/hydrorisk',
    icon: Waves,
    label: 'HydroRisk Analysis',
    desc: 'Proximity scoring against 10 illustrative waterway reference points. Synthetic demo — hydraulic connectivity not verified.',
    badge: 'Synthetic Demo',
    external: true,
  },
  {
    href: '/app/severity',
    icon: BarChart3,
    label: 'Severity Engine',
    desc: 'Four-tier severity rubric. Review human annotation workflow and add severity labels to field observations.',
    badge: 'Real Data',
    external: true,
  },
  {
    href: '/app/analytics',
    icon: Layers,
    label: 'Spatial Analytics',
    desc: 'Zone density charts, waste type distributions, and risk level breakdowns across all 14 Bengaluru survey zones.',
    badge: 'Real Data',
    external: true,
  },
];

export default function WasteIntelligencePage() {
  const [analytics, setAnalytics] = useState<Analytics>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then((r) => r.json())
      .then((d) => { setAnalytics(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const total = analytics.observations?.total ?? 0;
  const byRisk = analytics.observations?.byRisk ?? [];
  const high = byRisk.find(r => r.risk_level === 'HIGH')?.count ?? 0;
  const med = byRisk.find(r => r.risk_level === 'MEDIUM')?.count ?? 0;
  const low = byRisk.find(r => r.risk_level === 'LOW')?.count ?? 0;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[rgba(18,59,46,0.08)]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3C9290]">
              Environmental Intelligence
            </span>
            <span className="text-[rgba(23,37,31,0.3)]">/</span>
            <span className="text-xs font-mono font-semibold text-[rgba(23,37,31,0.5)]">Waste</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-[#123B2E]">
            Waste & Resource Intelligence
          </h1>
          <p className="text-sm text-[rgba(23,37,31,0.65)] mt-2 max-w-2xl leading-relaxed">
            Geospatial waste analysis, severity classification, and drainage risk assessment.
            Based on 71 verified GPS field observations across 14 Bengaluru urban zones.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/app/map">
            <Button variant="primary" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5 text-[#B6D957]" />}>
              Open Live Map
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Observations', value: loading ? '—' : total, color: '#123B2E' },
          { label: 'High Risk', value: loading ? '—' : high, color: '#DC2626' },
          { label: 'Medium Risk', value: loading ? '—' : med, color: '#D97706' },
          { label: 'Low Risk', value: loading ? '—' : low, color: '#16A34A' },
        ].map((kpi) => (
          <div key={kpi.label} className="editorial-card p-5">
            <div className="text-3xl font-heading font-extrabold" style={{ color: kpi.color }}>{kpi.value}</div>
            <div className="text-xs font-mono text-[rgba(23,37,31,0.6)] mt-1">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Risk Distribution Bar */}
      {!loading && total > 0 && (
        <div className="editorial-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-base text-[#123B2E]">Field Risk Distribution</h3>
            <Badge variant="neutral">Original field classifications</Badge>
          </div>
          <div className="h-7 bg-[#F0F2EE] rounded-full overflow-hidden flex shadow-inner">
            {high > 0 && (
              <div
                className="bg-[#DC2626] h-full flex items-center justify-center text-[11px] font-mono text-white font-bold transition-all"
                style={{ width: `${(high / total) * 100}%` }}
              >
                {high} High
              </div>
            )}
            {med > 0 && (
              <div
                className="bg-[#D97706] h-full flex items-center justify-center text-[11px] font-mono text-white font-bold transition-all"
                style={{ width: `${(med / total) * 100}%` }}
              >
                {med} Med
              </div>
            )}
            {low > 0 && (
              <div
                className="bg-[#16A34A] h-full flex items-center justify-center text-[11px] font-mono text-white font-bold transition-all"
                style={{ width: `${(low / total) * 100}%` }}
              >
                {low} Low
              </div>
            )}
          </div>
          <p className="text-xs font-mono text-[rgba(23,37,31,0.5)] mt-2">
            Human severity annotations are pending. Bars show original field risk scores.
          </p>
        </div>
      )}

      {/* Intelligence Tools */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading font-bold text-xl text-[#123B2E]">Intelligence Modules</h2>
          <span className="text-xs font-mono text-[rgba(23,37,31,0.5)]">Bengaluru Pilot · 2025–2026</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {WASTE_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="editorial-card p-6 flex flex-col justify-between group hover:border-[#123B2E]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#123B2E] text-[#B6D957] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant={tool.badge === 'Live Data' || tool.badge === 'Real Data' ? 'verified' : tool.badge === 'Synthetic Demo' ? 'demo' : 'neutral'}>
                      {tool.badge}
                    </Badge>
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#123B2E] group-hover:text-[#3C9290] transition-colors">
                    {tool.label}
                  </h3>
                  <p className="text-xs text-[rgba(23,37,31,0.65)] mt-2 leading-relaxed">{tool.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-[rgba(18,59,46,0.06)] flex items-center justify-between text-xs font-mono text-[#123B2E]">
                  <span>Open module</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Zone Coverage */}
      <div className="editorial-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-[#3C9290]" />
          <h3 className="font-heading font-bold text-base text-[#123B2E]">Bengaluru Survey Coverage</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs font-mono">
          {[
            'Kanakapura / Konanakunte', 'Nagarbhavi / Chandralayout', 'Hesaraghatta / Chikkabanavara',
            'Fruit Market / Waste Processing', 'T.Dasarahalli / Banashankari 6th', 'Nalaghatta / Peenya',
            'Arekere / Gottigere Main Road', 'Kothnur / Nyanappanahalli', 'Krishnarajapura / Mahadevapura',
            'Kengeri / Someshwarapura', 'Majestic Area', 'Banashankari Road',
            'Nagasandra / Mallathahalli', 'Kammanahalli / Agara',
          ].map((zone) => (
            <div key={zone} className="p-2.5 bg-[#F7F7F0] rounded-lg border border-[rgba(18,59,46,0.08)] text-[rgba(23,37,31,0.75)]">
              {zone}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
