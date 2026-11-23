'use client';

import { useState, useEffect } from 'react';
import {
  BarChart3,
  Info,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Flame,
  Save,
  Check,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface Observation {
  id: string;
  zone_id: string;
  latitude: number;
  longitude: number;
  area_label: string;
  risk_level: string;
  risk_score: number;
  severity_label: string | null;
  waste_type: string;
  management_status: string;
  burning_observed: string;
}

const RUBRIC_TIERS = [
  {
    level: 'High',
    badge: 'high' as const,
    color: '#b91c1c',
    criteria:
      'Large-scale informal dump (>50 m²), unmanaged open accumulation, immediate proximity to natural drain/lake/wetland, active or visible burning observed, severe biological or vector breeding hazard.',
    action: 'Priority 1: Immediate Municipal Dispatch (< 24 Hours)',
  },
  {
    level: 'Medium',
    badge: 'medium' as const,
    color: '#d97706',
    criteria:
      'Moderate accumulation (10–50 m²), roadside or vacant plot accumulation, partial periodic management, proximity to residential stormwater gutter, potential for overflow during monsoon runoff.',
    action: 'Priority 2: Scheduled Route Clearance (< 72 Hours)',
  },
  {
    level: 'Low',
    badge: 'low' as const,
    color: '#16a34a',
    criteria:
      'Small scattered litter accumulation (<10 m²), managed commercial site with regular municipal bins, no direct drainage exposure, no burning observed.',
    action: 'Priority 3: Standard Ward Sweeping Schedule',
  },
  {
    level: 'Not Assessable',
    badge: 'neutral' as const,
    color: '#6b7280',
    criteria:
      'Obstructed photographic field view, incomplete GPS capture, inaccessible private compound, or night-time survey photography with insufficient visual lighting.',
    action: 'Re-survey Required: Flagged for Inspector Verification',
  },
];

export default function SeverityEnginePage() {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedObs, setSelectedObs] = useState<Observation | null>(null);
  const [annotatedRating, setAnnotatedRating] = useState<string>('');
  const [annotatedNotes, setAnnotatedNotes] = useState<string>('');
  const [savedCount, setSavedCount] = useState<number>(0);
  const [successMsg, setSuccessMsg] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    fetch('/api/observations?limit=100')
      .then((r) => r.json())
      .then((data) => {
        const obs = data.observations || [];
        setObservations(obs);
        if (obs.length > 0) setSelectedObs(obs[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const distribution = [
    { label: 'High', count: observations.filter((o) => (o.severity_label?.toUpperCase() || o.risk_level) === 'HIGH').length, fill: '#b91c1c' },
    { label: 'Medium', count: observations.filter((o) => (o.severity_label?.toUpperCase() || o.risk_level) === 'MEDIUM').length, fill: '#d97706' },
    { label: 'Low', count: observations.filter((o) => (o.severity_label?.toUpperCase() || o.risk_level) === 'LOW').length, fill: '#16a34a' },
  ];

  const handleSaveAnnotation = async () => {
    if (!selectedObs || !annotatedRating) return;
    setSaving(true);
    setSaveError('');
    setSuccessMsg(false);
    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'annotation',
          observation_id: selectedObs.id,
          severity_label: annotatedRating,
          notes: annotatedNotes,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not save annotation.');

      setObservations((items) => items.map((item) => item.id === selectedObs.id
        ? { ...item, severity_label: annotatedRating }
        : item));
      setSelectedObs((item) => item ? { ...item, severity_label: annotatedRating } : item);
      setSavedCount((count) => count + 1);
      setSuccessMsg(true);
      setAnnotatedRating('');
      setAnnotatedNotes('');
      setTimeout(() => setSuccessMsg(false), 3000);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Could not save annotation.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold tracking-wider text-[#3C9290] uppercase">
            Module 04 · Severity Rubric & Ground Truth
          </span>
          <Badge variant="verified">Standardized Rubric</Badge>
        </div>
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#123B2E] tracking-tight mt-1">
          Severity Classification Engine
        </h1>
        <p className="text-sm text-[#17251F]/70 mt-1 max-w-3xl">
          Standardized four-tier photographic accumulation rubric utilized to annotate ground-truth training datasets and calculate multi-criteria environmental risk.
        </p>
      </div>

      {/* 4 Rubric Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {RUBRIC_TIERS.map((tier) => (
          <div
            key={tier.level}
            className="p-5 rounded-2xl bg-white border border-[rgba(18,59,46,0.1)] shadow-2xs hover:shadow-xs transition-shadow space-y-3"
          >
            <div className="flex items-center justify-between">
              <Badge variant={tier.badge}>{tier.level} Risk</Badge>
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: tier.color }}
              />
            </div>
            <p className="text-xs text-[#17251F]/80 leading-relaxed min-h-[90px]">
              {tier.criteria}
            </p>
            <div className="pt-2 border-t border-[rgba(18,59,46,0.06)] text-[10px] font-mono text-[#123B2E] font-semibold">
              {tier.action}
            </div>
          </div>
        ))}
      </div>

      {/* Distribution Chart + Annotation Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Recharts Distribution Bar Chart */}
        <div className="lg:col-span-5">
          <Card variant="editorial">
            <CardHeader className="pb-2 border-b border-[rgba(18,59,46,0.06)]">
              <CardTitle className="text-base font-heading">
                Ground-Truth Severity Distribution
              </CardTitle>
              <p className="text-xs text-[#17251F]/60">
                Baseline classification across 71 field survey coordinates
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={distribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis
                      dataKey="label"
                      tick={{ fill: '#17251F', fontSize: 11, fontFamily: 'monospace' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: '#17251F', fontSize: 11, fontFamily: 'monospace' }}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#123B2E',
                        color: '#fff',
                        borderRadius: '8px',
                        fontSize: '12px',
                        border: 'none',
                      }}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {distribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 pt-4 border-t border-[rgba(18,59,46,0.06)] grid grid-cols-3 gap-2 text-center text-xs">
                {distribution.map((d) => (
                  <div key={d.label} className="p-2 bg-[#F7F7F0] rounded-lg">
                    <span className="font-mono text-[10px] text-[#17251F]/60 block">{d.label}</span>
                    <span className="font-heading font-extrabold text-lg text-[#123B2E]">{d.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Interactive Annotation Verification Bench */}
        <div className="lg:col-span-7">
          <Card variant="editorial">
            <CardHeader className="pb-3 border-b border-[rgba(18,59,46,0.06)] flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-heading">
                  Field Annotation Workbench
                </CardTitle>
                <p className="text-xs text-[#17251F]/60">
                  Inspect observation metadata and verify ground-truth labels
                </p>
              </div>
              {savedCount > 0 && (
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {savedCount} verified
                </span>
              )}
            </CardHeader>

            <CardContent className="pt-5 space-y-5">
              {/* Observation Selector */}
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-1.5">
                  Select Observation to Inspect
                </label>
                <select
                  value={selectedObs?.id || ''}
                  onChange={(e) => {
                    const found = observations.find((o) => o.id === e.target.value);
                    if (found) {
                      setSelectedObs(found);
                      setAnnotatedRating(found.risk_level);
                    }
                  }}
                  className="w-full bg-white border border-[rgba(18,59,46,0.15)] rounded-lg px-3 py-2 text-xs text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#123B2E]/20"
                >
                  {observations.map((o) => (
                    <option key={o.id} value={o.id}>
                      [{o.id}] {o.area_label || o.zone_id} ({o.risk_level} Risk)
                    </option>
                  ))}
                </select>
              </div>

              {selectedObs && (
                <div className="space-y-4">
                  {/* Observation Quick Card */}
                  <div className="bg-[#F7F7F0] p-4 rounded-xl border border-[rgba(18,59,46,0.08)] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#123B2E]">
                        {selectedObs.id} · {selectedObs.zone_id}
                      </span>
                      <Badge
                        variant={
                          selectedObs.risk_level === 'HIGH'
                            ? 'high'
                            : selectedObs.risk_level === 'MEDIUM'
                            ? 'medium'
                            : 'low'
                        }
                      >
                        Current: {selectedObs.risk_level}
                      </Badge>
                    </div>
                    <p className="font-heading font-bold text-sm text-[#123B2E]">
                      {selectedObs.area_label || selectedObs.zone_id}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-mono text-[#17251F]/70">
                      <div>
                        <span className="text-[#17251F]/40 block text-[9px]">COORDINATES</span>
                        {selectedObs.latitude.toFixed(4)}, {selectedObs.longitude.toFixed(4)}
                      </div>
                      <div>
                        <span className="text-[#17251F]/40 block text-[9px]">WASTE TYPE</span>
                        {selectedObs.waste_type}
                      </div>
                      <div>
                        <span className="text-[#17251F]/40 block text-[9px]">MANAGEMENT</span>
                        {selectedObs.management_status}
                      </div>
                      <div>
                        <span className="text-[#17251F]/40 block text-[9px]">BURNING</span>
                        {selectedObs.burning_observed === 'YES' ? '🔥 YES' : 'NO'}
                      </div>
                    </div>
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-2">
                      Assign Verified Ground-Truth Severity
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['HIGH', 'MEDIUM', 'LOW'].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setAnnotatedRating(lvl)}
                          className={`py-2 px-3 rounded-lg border text-xs font-mono font-bold transition-all ${
                            annotatedRating === lvl
                              ? 'bg-[#123B2E] text-white border-[#0B2922] shadow-xs'
                              : 'bg-white text-[#17251F] border-[rgba(18,59,46,0.15)] hover:bg-[#F7F7F0]'
                          }`}
                        >
                          {lvl} RISK
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Annotation Notes */}
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-1.5">
                      Expert Verification Notes
                    </label>
                    <textarea
                      rows={2}
                      value={annotatedNotes}
                      onChange={(e) => setAnnotatedNotes(e.target.value)}
                      placeholder="Add research rubric rationale or site accessibility notes…"
                      className="w-full bg-white border border-[rgba(18,59,46,0.15)] rounded-lg p-2.5 text-xs text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#123B2E]/20"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleSaveAnnotation}
                      disabled={!annotatedRating || saving}
                      loading={saving}
                      icon={Save}
                    >
                      {saving ? 'Saving annotation…' : 'Save Annotation Decision'}
                    </Button>
                    {successMsg && (
                      <span className="text-xs font-mono text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-4 h-4 text-emerald-600" />
                        Annotation logged into experiment ledger!
                      </span>
                    )}
                  </div>
                  {saveError && <p role="alert" className="text-xs font-medium text-red-700">{saveError}</p>}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
