'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Observation {
  id: string;
  zone_id: string;
  area_label: string;
  latitude: number;
  longitude: number;
  waste_type: string;
  risk_level: string;
  risk_score: number;
  site_type: string;
  burning_observed: string;
  management_status: string;
  date_captured: string;
}

export default function DatasetsPage() {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterRisk, setFilterRisk] = useState<string>('ALL');

  useEffect(() => {
    fetch('/api/observations?limit=100')
      .then((r) => r.json())
      .then((d) => {
        setObservations(d.observations ?? d ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filterRisk === 'ALL'
    ? observations
    : observations.filter((o) => o.risk_level === filterRisk);

  const riskCounts = {
    HIGH: observations.filter(o => o.risk_level === 'HIGH').length,
    MEDIUM: observations.filter(o => o.risk_level === 'MEDIUM').length,
    LOW: observations.filter(o => o.risk_level === 'LOW').length,
  };

  const riskColor: Record<string, string> = {
    HIGH: 'text-red-700 bg-red-50 border-red-200',
    MEDIUM: 'text-amber-700 bg-amber-50 border-amber-200',
    LOW: 'text-green-700 bg-green-50 border-green-200',
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[rgba(18,59,46,0.08)]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3C9290]">Research Platform</span>
            <span className="text-[rgba(23,37,31,0.3)]">/</span>
            <span className="text-xs font-mono text-[rgba(23,37,31,0.5)]">Datasets</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl text-[#123B2E]">Dataset Repository</h1>
          <p className="text-sm text-[rgba(23,37,31,0.65)] mt-1 max-w-2xl">
            71 verified GPS field observations from the Bengaluru Urban Waste Pilot Study (2025–2026).
            All coordinates use WGS-84 (EPSG:4326). Dataset is real and field-logged.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/app/map">
            <Button variant="secondary" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
              View on Map
            </Button>
          </Link>
        </div>
      </div>

      {/* Dataset Metadata */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Records', value: observations.length || '71', verified: true },
          { label: 'High Risk', value: riskCounts.HIGH, color: 'text-red-700' },
          { label: 'Medium Risk', value: riskCounts.MEDIUM, color: 'text-amber-700' },
          { label: 'Low Risk', value: riskCounts.LOW, color: 'text-green-700' },
        ].map((s: { label: string; value: string | number; verified?: boolean; color?: string }) => (
          <div key={s.label} className="editorial-card p-4">
            <div className={`text-2xl font-heading font-extrabold ${s.color ?? 'text-[#123B2E]'}`}>{s.value}</div>
            <div className="text-xs font-mono text-[rgba(23,37,31,0.6)] mt-1">{s.label}</div>
            {s.verified && (
              <div className="flex items-center gap-1 mt-1.5 text-[10px] font-mono text-[#3C9290]">
                <CheckCircle2 className="w-3 h-3" /> GPS verified
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Provenance Note */}
      <div className="p-4 bg-[#DCE8DA] border border-[rgba(18,59,46,0.15)] rounded-xl flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-[#123B2E] shrink-0 mt-0.5" />
        <div className="text-sm text-[#17251F]">
          <strong>Data Provenance:</strong> All 71 observations were collected through direct field inspection across 14 Greater Bengaluru zones.
          Each record includes GPS coordinates (WGS-84), waste type classification, site context, risk scoring, and management status.
          Severity annotations (human rubric) are pending for most records.
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-mono font-bold text-[rgba(23,37,31,0.6)] uppercase tracking-wider">Filter:</span>
        {(['ALL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((level) => (
          <button
            key={level}
            onClick={() => setFilterRisk(level)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold border transition-all ${
              filterRisk === level
                ? 'bg-[#123B2E] text-white border-[#123B2E]'
                : 'bg-white text-[rgba(23,37,31,0.6)] border-[rgba(18,59,46,0.15)] hover:border-[#123B2E]'
            }`}
          >
            {level === 'ALL' ? `All (${observations.length})` : `${level} (${riskCounts[level as keyof typeof riskCounts]})`}
          </button>
        ))}
        <span className="ml-auto text-xs font-mono text-[rgba(23,37,31,0.4)]">
          Showing {filtered.length} record{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Data Table */}
      <div className="editorial-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F7F7F0] border-b border-[rgba(18,59,46,0.08)]">
                {['ID', 'Zone', 'Area', 'Coordinates', 'Waste Type', 'Risk', 'Site Type', 'Burning'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-mono font-bold uppercase tracking-wider text-[rgba(23,37,31,0.55)] whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(18,59,46,0.05)]">
              {loading ? (
                <tr><td colSpan={8} className="px-4 py-8 text-center font-mono text-[rgba(23,37,31,0.4)]">Loading dataset…</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-8 text-center font-mono text-[rgba(23,37,31,0.4)]">No records found</td></tr>
              ) : filtered.map((obs) => (
                <tr key={obs.id} className="hover:bg-[#F7F7F0] transition-colors">
                  <td className="px-4 py-2.5 font-mono font-bold text-[#123B2E] whitespace-nowrap">{obs.id}</td>
                  <td className="px-4 py-2.5 font-mono text-[rgba(23,37,31,0.6)] whitespace-nowrap text-[11px]">{obs.zone_id}</td>
                  <td className="px-4 py-2.5 text-[rgba(23,37,31,0.8)] max-w-[180px] truncate">{obs.area_label || '—'}</td>
                  <td className="px-4 py-2.5 font-mono text-[rgba(23,37,31,0.55)] whitespace-nowrap text-[11px]">
                    {obs.latitude?.toFixed(5)}, {obs.longitude?.toFixed(5)}
                  </td>
                  <td className="px-4 py-2.5 font-mono whitespace-nowrap">{obs.waste_type || '—'}</td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded font-mono font-bold uppercase text-[10px] border ${riskColor[obs.risk_level] ?? 'text-gray-600 bg-gray-50 border-gray-200'}`}>
                      {obs.risk_level}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-[rgba(23,37,31,0.6)] max-w-[140px] truncate">{obs.site_type || '—'}</td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    {obs.burning_observed === 'YES'
                      ? <span className="flex items-center gap-1 text-red-600 font-mono font-bold"><AlertTriangle className="w-3 h-3" /> YES</span>
                      : <span className="font-mono text-[rgba(23,37,31,0.4)]">NO</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs font-mono text-[rgba(23,37,31,0.4)] text-center">
        Bengaluru Urban Waste Pilot Dataset v1.0 · 71 observations · WGS-84 · CleaningoAI Research Team
      </p>
    </div>
  );
}
