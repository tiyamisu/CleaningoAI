'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ClipboardCheck,
  AlertTriangle,
  ScrollText,
  Radio,
  FlaskConical,
  Cpu,
  Wrench,
  Recycle,
  Droplets,
  CheckSquare,
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface Analytics {
  incidents?: { total: number; byStatus: { status: string; count: number }[] };
}

const OPS_MODULES = [
  {
    href: '/operations/field',
    icon: ClipboardCheck,
    label: 'Field Inspections',
    desc: 'Assign and track inspector field visits. Review inspection reports from Bengaluru urban zones.',
    badge: 'Active',
    hasData: true,
  },
  {
    href: '/operations/incidents',
    icon: AlertTriangle,
    label: 'Incident Management',
    desc: 'Full incident lifecycle from submission through assignment, inspection, and resolution.',
    badge: 'Active',
    hasData: true,
  },
  {
    href: '/operations/audit',
    icon: ScrollText,
    label: 'Audit Trail',
    desc: 'Complete audit log of all platform actions, user operations, and data modifications.',
    badge: 'Active',
    hasData: true,
  },
  {
    href: '/operations/sensors',
    icon: Radio,
    label: 'Sensor & IoT Monitoring',
    desc: 'Environmental sensor networks, real-time telemetry ingestion, threshold alerts.',
    badge: 'Coming Soon',
    hasData: false,
  },
  {
    href: '/operations/laboratory',
    icon: FlaskConical,
    label: 'Laboratory Workflows',
    desc: 'Sample tracking, lab analysis request management, results interpretation and storage.',
    badge: 'Coming Soon',
    hasData: false,
  },
  {
    href: '/operations/industrial',
    icon: Cpu,
    label: 'Industrial Process Monitoring',
    desc: 'Industrial facility environmental compliance, emission monitoring, process audit integration.',
    badge: 'Coming Soon',
    hasData: false,
  },
  {
    href: '/operations/equipment',
    icon: Wrench,
    label: 'Equipment & Prototypes',
    desc: 'Field equipment registry, maintenance scheduling, prototype tracking for environmental tools.',
    badge: 'Coming Soon',
    hasData: false,
  },
  {
    href: '/operations/recovery',
    icon: Recycle,
    label: 'Waste Recovery Operations',
    desc: 'Recovery programme planning, contractor management, material diversion tracking.',
    badge: 'Coming Soon',
    hasData: false,
  },
  {
    href: '/operations/treatment',
    icon: Droplets,
    label: 'Treatment & Remediation',
    desc: 'Site remediation project management, treatment pathway design, efficacy monitoring.',
    badge: 'Coming Soon',
    hasData: false,
  },
  {
    href: '/operations/verification',
    icon: CheckSquare,
    label: 'Restoration Verification',
    desc: 'Post-intervention verification, environmental outcome assessment, before/after documentation.',
    badge: 'Coming Soon',
    hasData: false,
  },
];

export default function OperationsCommandPage() {
  const [analytics, setAnalytics] = useState<Analytics>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then((r) => r.json())
      .then((d) => { setAnalytics(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const totalInc = analytics.incidents?.total ?? 0;
  const byStatus = analytics.incidents?.byStatus ?? [];
  const resolved = byStatus.find(s => s.status === 'resolved')?.count ?? 0;
  const submitted = byStatus.find(s => s.status === 'submitted')?.count ?? 0;
  const assigned = byStatus.find(s => s.status === 'assigned')?.count ?? 0;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-[rgba(18,59,46,0.08)]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#B6D957] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3C9290]">
              Engineering & Operations
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-[#123B2E]">
            Operations Command
          </h1>
          <p className="text-sm text-[rgba(23,37,31,0.65)] mt-2 max-w-2xl leading-relaxed">
            Field inspection coordination, incident lifecycle management, audit governance, and environmental
            engineering workflows. Bengaluru pilot is the operational centre.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/operations/incidents">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4 text-[#B6D957]" />}>
              Manage Incidents
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Incidents', value: loading ? '—' : totalInc, icon: AlertTriangle, color: 'text-[#123B2E]' },
          { label: 'Submitted', value: loading ? '—' : submitted, icon: Clock, color: 'text-amber-600' },
          { label: 'Assigned', value: loading ? '—' : assigned, icon: MapPin, color: 'text-[#3C9290]' },
          { label: 'Resolved', value: loading ? '—' : resolved, icon: CheckCircle2, color: 'text-green-600' },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="editorial-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 ${kpi.color}`} />
                <span className="text-xs font-mono text-[rgba(23,37,31,0.55)]">{kpi.label}</span>
              </div>
              <div className={`text-2xl font-heading font-extrabold ${kpi.color}`}>{kpi.value}</div>
            </div>
          );
        })}
      </div>

      {/* Ops Module Grid */}
      <div>
        <div className="flex items-end justify-between mb-5">
          <h2 className="font-heading font-bold text-xl text-[#123B2E]">Operations Modules</h2>
          <Badge variant="neutral">3 active · 7 in development</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {OPS_MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.href}
                href={mod.href}
                className="editorial-card p-6 flex flex-col justify-between group hover:border-[#123B2E]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#123B2E] text-[#B6D957] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant={mod.hasData ? 'verified' : 'neutral'}>{mod.badge}</Badge>
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#123B2E] group-hover:text-[#3C9290] transition-colors leading-tight">
                    {mod.label}
                  </h3>
                  <p className="text-xs text-[rgba(23,37,31,0.65)] mt-2 leading-relaxed">{mod.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-[rgba(18,59,46,0.06)] flex items-center justify-between text-xs font-mono text-[#123B2E]">
                  <span>{mod.hasData ? 'Open module' : 'View roadmap'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick links to legacy portals */}
      <div className="p-5 bg-[#F7F7F0] border border-[rgba(18,59,46,0.1)] rounded-xl">
        <p className="text-xs font-mono font-bold uppercase tracking-wider text-[rgba(23,37,31,0.5)] mb-3">
          Legacy Portals (Still Active)
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { href: '/ops', label: 'Ops Command (v1)' },
            { href: '/ops/queue', label: 'Queue Manager' },
            { href: '/ops/assign', label: 'Assignment Tool' },
            { href: '/ops/inspect', label: 'Inspection Form' },
            { href: '/ops/audit', label: 'Audit Log (v1)' },
            { href: '/ops/admin', label: 'Admin Console' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-1.5 bg-white border border-[rgba(18,59,46,0.12)] rounded-lg text-xs font-mono text-[rgba(23,37,31,0.7)] hover:border-[#123B2E] hover:text-[#123B2E] transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
