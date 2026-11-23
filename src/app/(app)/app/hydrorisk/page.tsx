'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowUpDown,
  Download,
  Filter,
  Search,
  Droplet,
  Waves,
  MapPin,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface HydroResult {
  id: string;
  area_label: string;
  zone_id: string;
  waste_type: string;
  risk_level: string;
  nearest_waterway: string;
  distance_to_waterway_m: number;
  e1_score: number;
  e2_score: number;
  e3_score: number;
  e4_score: number;
  e4_connectivity: string;
  is_demo: boolean;
}

const EXPERIMENTS = [
  {
    id: 'E1',
    name: 'Euclidean Proximity',
    desc: 'Inverse straight-line distance to the nearest illustrative waterway point.',
    status: 'Demo calculation',
    formula: '1.0 - (d / d_max)',
  },
  {
    id: 'E2',
    name: 'Recorded Field Risk',
    desc: 'Uses the recorded field risk category as a severity proxy; no human annotation is available yet.',
    status: 'Field risk proxy',
    formula: 'Severity(High=1.0, Med=0.5, Low=0.2)',
  },
  {
    id: 'E3',
    name: 'Linear Combination',
    desc: 'Demo blend of the field risk proxy and illustrative waterway proximity.',
    status: 'Synthetic demo',
    formula: '0.5 × E1 + 0.5 × E2',
  },
  {
    id: 'E4',
    name: 'Drainage-Aware (Target)',
    desc: 'Drainage connectivity is unknown. This score currently matches E3 and is not a network result.',
    status: 'Not implemented',
    formula: 'E4 = E3 (demo)',
  },
];

function ScoreBar({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  const color = pct >= 70 ? '#b91c1c' : pct >= 40 ? '#d97706' : '#123B2E';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-[rgba(18,59,46,0.08)] rounded-full h-1.5 min-w-[50px] overflow-hidden">
        <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-xs font-mono font-bold min-w-[32px] text-right" style={{ color }}>
        {pct}%
      </span>
    </div>
  );
}

export default function HydroRiskPage() {
  const [results, setResults] = useState<HydroResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'e4_score' | 'e3_score' | 'e2_score' | 'e1_score'>('e4_score');
  const [filterZone, setFilterZone] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/hydrorisk')
      .then((r) => r.json())
      .then((d) => {
        setResults(d.results || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const zones = useMemo(() => {
    return Array.from(new Set(results.map((r) => r.zone_id))).filter(Boolean);
  }, [results]);

  const filtered = useMemo(() => {
    let r = results;
    if (filterZone) r = r.filter((item) => item.zone_id === filterZone);
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(
        (item) =>
          item.area_label.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q) ||
          item.nearest_waterway.toLowerCase().includes(q)
      );
    }
    return [...r].sort((a, b) => b[sortBy] - a[sortBy]);
  }, [results, filterZone, search, sortBy]);

  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Area',
      'Zone',
      'Risk_Level',
      'Nearest_Waterway',
      'Distance_m',
      'E1_Score',
      'E2_Score',
      'E3_Score',
      'E4_Score',
    ];
    const rows = filtered.map((r) => [
      r.id,
      `"${r.area_label}"`,
      r.zone_id,
      r.risk_level,
      `"${r.nearest_waterway}"`,
      r.distance_to_waterway_m,
      r.e1_score,
      r.e2_score,
      r.e3_score,
      r.e4_score,
    ]);
    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cleaningoai_hydrorisk_priority_${sortBy}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-wider text-[#3C9290] uppercase">
              Module 03 · HydroRisk Intelligence
            </span>
            <Badge variant="demo">Illustrative Proximity Demo</Badge>
          </div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#123B2E] tracking-tight mt-1">
            HydroRisk Priority Analysis
          </h1>
          <p className="text-sm text-[#17251F]/70 mt-1 max-w-3xl">
            Ranks field observations using recorded risk levels and distance to illustrative reference coordinates. No verified drainage network is modeled.
          </p>
        </div>

        <Button variant="lime" size="sm" onClick={handleExportCSV} icon={Download}>
          Export Priority CSV
        </Button>
      </div>

      {/* Synthetic Network Scientific Disclosure */}
      <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-4.5 flex items-start gap-3.5 shadow-2xs">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <strong className="font-bold text-amber-950 uppercase tracking-wide block mb-0.5">
            Demo Method Notice
          </strong>
          The reference coordinates are approximate demo inputs in the application; no municipal drainage layer is imported or validated here. E4 currently equals E3 because drainage connectivity is unknown. Scores are illustrative inspection rankings, not measurements of contamination or environmental risk.
        </div>
      </div>

      {/* 4 Experiment Method Cards */}
      <div>
        <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-3">
          Methodology Progression (Experiments E1 – E4)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXPERIMENTS.map((exp) => {
            const isTarget = exp.id === 'E4';
            return (
              <div
                key={exp.id}
                className={`p-4 rounded-xl border transition-all ${
                  isTarget
                    ? 'bg-[#123B2E] text-white border-[#0B2922] shadow-sm'
                    : 'bg-white text-[#17251F] border-[rgba(18,59,46,0.1)] hover:border-[#123B2E]/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      isTarget ? 'bg-[#B6D957] text-[#0B2922]' : 'bg-[#F7F7F0] text-[#123B2E]'
                    }`}
                  >
                    {exp.id}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-semibold ${
                      isTarget ? 'text-[#B6D957]' : 'text-[#3C9290]'
                    }`}
                  >
                    {exp.status}
                  </span>
                </div>
                <h4
                  className={`font-heading font-bold text-sm ${
                    isTarget ? 'text-white' : 'text-[#123B2E]'
                  }`}
                >
                  {exp.name}
                </h4>
                <p
                  className={`text-xs mt-1 leading-relaxed ${
                    isTarget ? 'text-[#DCE8DA]/80' : 'text-[#17251F]/70'
                  }`}
                >
                  {exp.desc}
                </p>
                <div
                  className={`mt-3 pt-2 text-[10px] font-mono border-t ${
                    isTarget
                      ? 'border-white/10 text-[#B6D957]'
                      : 'border-[rgba(18,59,46,0.08)] text-[#123B2E]/70'
                  }`}
                >
                  {exp.formula}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Ranking Table Card */}
      <Card variant="editorial">
        <CardHeader className="pb-4 border-b border-[rgba(18,59,46,0.06)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base font-heading">
                Prioritized Observation Ledger ({filtered.length} Sites)
              </CardTitle>
              <p className="text-xs text-[#17251F]/60 mt-0.5">
                Sorted by {sortBy.toUpperCase()} composite priority score.
              </p>
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search site or waterway…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-white border border-[rgba(18,59,46,0.15)] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#123B2E]"
                />
              </div>

              <select
                value={filterZone}
                onChange={(e) => setFilterZone(e.target.value)}
                className="bg-white border border-[rgba(18,59,46,0.15)] rounded-lg px-2.5 py-1.5 text-xs text-[#17251F] focus:outline-none focus:ring-1 focus:ring-[#123B2E]"
              >
                <option value="">All Zones</option>
                {zones.map((z) => (
                  <option key={z} value={z}>
                    {z}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-1 bg-[#F7F7F0] p-1 rounded-lg border border-[rgba(18,59,46,0.1)]">
                <span className="text-[10px] font-mono text-[#123B2E]/60 px-1 font-semibold">SORT:</span>
                {(['e4_score', 'e3_score', 'e1_score'] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSortBy(key)}
                    className={`px-2 py-1 rounded text-xs font-mono font-bold transition-colors ${
                      sortBy === key
                        ? 'bg-[#123B2E] text-white shadow-2xs'
                        : 'text-[#17251F]/70 hover:text-[#123B2E]'
                    }`}
                  >
                    {key.replace('_score', '').toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-xs font-mono text-gray-500">
              Computing hydrological distances across 71 coordinates…
            </div>
          ) : (
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-[#F7F7F0]/60 border-b border-[rgba(18,59,46,0.06)] font-mono font-bold text-[#123B2E]/70 uppercase text-[10px]">
                  <th className="px-4 py-3">Rank</th>
                  <th className="px-4 py-3">Site ID / Location</th>
                  <th className="px-4 py-3">Zone</th>
                  <th className="px-4 py-3">Nearest Waterway</th>
                  <th className="px-4 py-3">Distance</th>
                  <th className="px-4 py-3">E1 (Euclid)</th>
                  <th className="px-4 py-3">E3 (Blend)</th>
                  <th className="px-4 py-3">E4 (Network)</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(18,59,46,0.05)]">
                {filtered.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-[#F7F7F0]/40 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-[#123B2E]">
                      #{idx + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-heading font-semibold text-[#17251F]">
                        {row.area_label || row.zone_id}
                      </div>
                      <span className="font-mono text-[10px] text-[#17251F]/50">{row.id}</span>
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-[#123B2E]">
                      {row.zone_id}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 font-semibold text-[#3C9290]">
                        <Waves className="w-3 h-3 shrink-0" />
                        <span>{row.nearest_waterway}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] font-semibold text-[#17251F]">
                      {Math.round(row.distance_to_waterway_m)} m
                    </td>
                    <td className="px-4 py-3">
                      <ScoreBar score={row.e1_score} />
                    </td>
                    <td className="px-4 py-3">
                      <ScoreBar score={row.e3_score} />
                    </td>
                    <td className="px-4 py-3">
                      <ScoreBar score={row.e4_score} />
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/app/map`}
                        className="text-[11px] font-mono text-[#123B2E] hover:text-[#3C9290] underline font-semibold flex items-center gap-1"
                      >
                        Inspect Map →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
