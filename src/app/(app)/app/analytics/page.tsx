'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  Database,
  AlertTriangle,
  Flame,
  Activity,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';

interface AnalyticsData {
  observations?: {
    total: number;
    byRisk: { risk_level: string; count: number }[];
    byWaste: { waste_type: string; count: number }[];
    byZone: { zone_id: string; count: number }[];
    byManagement: { management_status: string; count: number }[];
    burningObserved: number;
    annotated: number;
    annotationProgress: number;
  };
  incidents?: { total: number; byStatus: { status: string; count: number }[] };
  research?: { datasetSize: number; zones: number; annotationComplete: number };
}

const RISK_COLORS: Record<string, string> = {
  HIGH: '#b91c1c',
  MEDIUM: '#d97706',
  LOW: '#16a34a',
};

const WASTE_PALETTE = ['#123B2E', '#3C9290', '#B6D957', '#0B2922'];

const SHORT_ZONES: Record<string, string> = {
  'ZONE_02-KK': 'Kanakapura',
  'ZONE_03-N_C_G': 'Nagarbhavi',
  'ZONE_04_HC': 'Hesaraghatta',
  'ZONE_08-FWP': 'Peenya Ind.',
  'ZONE_10-TF': 'Dasarahalli',
  'ZONE_11_NLG-P': 'Nalaghatta',
  'ZONE_12_AG_MAINROAD': 'Tippenahalli',
  'ZONE_14_KN': 'Kengeri Sat.',
  'ZONE_15_K-M_MR': 'Kadabagere',
  'ZONE_16_KSF': 'Someshwara',
  'ZONE_17_M': 'Majestic',
  'ZONE_18_BSKR': 'Banashankari',
  'ZONE_19_N-M-V': 'Nagasandra',
  'ZONE_20_KA': 'Kammanahalli',
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>({});

  useEffect(() => {
    fetch('/api/analytics')
      .then((r) => r.json())
      .then((d) => {
        setData(d);
      })
      .catch(() => {});
  }, []);

  const obs = data.observations;
  const inc = data.incidents;

  const riskData = (obs?.byRisk || []).map((r) => ({
    name: r.risk_level,
    count: r.count,
    fill: RISK_COLORS[r.risk_level] || '#6b7280',
  }));

  const wasteData = (obs?.byWaste || []).map((w, idx) => ({
    name: w.waste_type,
    count: w.count,
    fill: WASTE_PALETTE[idx % WASTE_PALETTE.length],
  }));

  const zoneData = (obs?.byZone || []).slice(0, 8).map((z) => ({
    name: SHORT_ZONES[z.zone_id] || z.zone_id,
    count: z.count,
  }));

  const incidentStatusData = (inc?.byStatus || []).map((s) => ({
    name: s.status.replace(/_/g, ' ').toUpperCase(),
    count: s.count,
  }));

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold tracking-wider text-[#3C9290] uppercase">
            Module 06 · Spatial Analytics
          </span>
            <Badge variant="neutral">Dataset Summaries</Badge>
        </div>
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#123B2E] tracking-tight mt-1">
          Spatial Analytics & Environmental Insights
        </h1>
        <p className="text-sm text-[#17251F]/70 mt-1 max-w-3xl">
          Counts and distributions calculated from the local Bengaluru pilot dataset and incident registry.
        </p>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Field Observations"
          value={obs?.total ?? 0}
          description={`${obs?.byZone?.length ?? 0} zones in dataset`}
          icon={Database}
        />
        <StatCard
          label="High-Risk Accumulations"
          value={obs?.byRisk?.find((r) => r.risk_level === 'HIGH')?.count ?? 0}
          description="Recorded field risk category"
          icon={AlertTriangle}
        />
        <StatCard
          label="Thermal Activity Logged"
          value={obs?.burningObserved ?? 0}
          description="Observations marked YES"
          icon={Flame}
        />
        <StatCard
          label="Incidents"
          value={inc?.total ?? 0}
          description="All statuses in local registry"
          icon={Activity}
        />
      </div>

      {/* 2x2 Grid of Analytical Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Risk Level Distribution */}
        <Card variant="editorial">
          <CardHeader className="pb-2 border-b border-[rgba(18,59,46,0.06)]">
            <CardTitle className="text-base font-heading">
              Environmental Risk Classification
            </CardTitle>
            <p className="text-xs text-[#17251F]/60">
              Distribution across High, Medium, and Low risk thresholds
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{ fill: '#17251F', fontSize: 11, fontFamily: 'monospace' }} />
                  <YAxis tick={{ fill: '#17251F', fontSize: 11, fontFamily: 'monospace' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#123B2E',
                      color: '#fff',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chart 2: Dominant Waste Streams */}
        <Card variant="editorial">
          <CardHeader className="pb-2 border-b border-[rgba(18,59,46,0.06)]">
            <CardTitle className="text-base font-heading">Dominant Waste Streams</CardTitle>
            <p className="text-xs text-[#17251F]/60">
              Material composition categorized during ground-truth survey
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={wasteData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{ fill: '#17251F', fontSize: 10, fontFamily: 'monospace' }} />
                  <YAxis tick={{ fill: '#17251F', fontSize: 11, fontFamily: 'monospace' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#123B2E',
                      color: '#fff',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {wasteData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chart 3: Top Zone Spatial Frequencies */}
        <Card variant="editorial">
          <CardHeader className="pb-2 border-b border-[rgba(18,59,46,0.06)]">
            <CardTitle className="text-base font-heading">
              Observation Density by Urban Zone
            </CardTitle>
            <p className="text-xs text-[#17251F]/60">
              Top 8 surveyed clusters ranked by number of mapped informal dump sites
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={zoneData}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                  <XAxis type="number" tick={{ fill: '#17251F', fontSize: 11, fontFamily: 'monospace' }} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fill: '#123B2E', fontSize: 11, fontFamily: 'sans-serif', fontWeight: 600 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#123B2E',
                      color: '#fff',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="count" fill="#123B2E" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chart 4: Incident Resolution Workflow Funnel */}
        <Card variant="editorial">
          <CardHeader className="pb-2 border-b border-[rgba(18,59,46,0.06)]">
            <CardTitle className="text-base font-heading">
              Incident Resolution Pipeline
            </CardTitle>
            <p className="text-xs text-[#17251F]/60">
              Live status counts across the 5 municipal remediation phases
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incidentStatusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" tick={{ fill: '#17251F', fontSize: 9, fontFamily: 'monospace' }} />
                  <YAxis tick={{ fill: '#17251F', fontSize: 11, fontFamily: 'monospace' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#123B2E',
                      color: '#fff',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="count" fill="#3C9290" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
