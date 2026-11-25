'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  List,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Shield,
  BookOpen,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/ui/StatCard';

interface AnalyticsData {
  incidents?: {
    total: number;
    byStatus: { status: string; count: number }[];
  };
}

export default function OpsOverviewPage() {
  const [data, setData] = useState<AnalyticsData>({});

  useEffect(() => {
    fetch('/api/analytics')
      .then((r) => r.json())
      .then((d) => {
        setData(d);
      })
      .catch(() => {});
  }, []);

  const inc = data.incidents;
  const submitted = inc?.byStatus?.find((s) => s.status === 'submitted')?.count ?? 0;
  const assigned = inc?.byStatus?.find((s) => s.status === 'assigned')?.count ?? 0;
  const inspected = inc?.byStatus?.find((s) => s.status === 'inspected')?.count ?? 0;
  const resolved = inc?.byStatus?.find((s) => s.status === 'resolved')?.count ?? 0;
  const total = inc?.total ?? 0;

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold tracking-wider text-[#3C9290] uppercase">
            Operations Portal · Municipal Control Room
          </span>
          <Badge variant="demo">Demo workspace</Badge>
        </div>
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#123B2E] tracking-tight mt-1">
          Municipal Operations Desk
        </h1>
        <p className="text-sm text-[#17251F]/70 mt-1 max-w-2xl">
          Coordinate field inspectors, triage reported informal dump sites, and advance municipal cleanup workflows across Bengaluru wards.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Incidents"
          value={total}
          trend={{ value: 'In Registry', positive: true }}
          icon={List}
        />
        <StatCard
          label="Awaiting Review"
          value={submitted}
          description="Unassigned reports"
          icon={AlertTriangle}
        />
        <StatCard
          label="In Field Verification"
          value={assigned + inspected}
          description="Active inspector routes"
          icon={UserCheck}
        />
        <StatCard
          label="Remediated / Closed"
          value={resolved}
          trend={{ value: 'Cleared', positive: true }}
          icon={CheckCircle2}
        />
      </div>

      {/* Core Operational Workflows */}
      <div>
        <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-3">
          Remediation Workflows
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card variant="editorial" className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#123B2E]/10 flex items-center justify-center text-[#123B2E]">
                <List className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-[#123B2E]">Incident Queue</h3>
                <p className="text-xs text-[#17251F]/70 mt-1 leading-relaxed">
                  Review submitted citizen reports and advance remediation statuses.
                </p>
              </div>
              <Link href="/ops/queue" className="block pt-2">
                <Button variant="outline" size="sm" className="w-full" icon={ArrowRight}>
                  Open Queue
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card variant="editorial" className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#3C9290]/15 flex items-center justify-center text-[#3C9290]">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-[#123B2E]">
                  Inspector Dispatch
                </h3>
                <p className="text-xs text-[#17251F]/70 mt-1 leading-relaxed">
                  Assign open dump sites to ward sanitation officers and monitor workload.
                </p>
              </div>
              <Link href="/ops/assign" className="block pt-2">
                <Button variant="outline" size="sm" className="w-full" icon={ArrowRight}>
                  Dispatch Inspectors
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card variant="editorial" className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#B6D957]/30 flex items-center justify-center text-[#0B2922]">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-[#123B2E]">
                  Audit Trail
                </h3>
                <p className="text-xs text-[#17251F]/70 mt-1 leading-relaxed">
                  Review incident submissions and updates recorded in the local database.
                </p>
              </div>
              <Link href="/ops/audit" className="block pt-2">
                <Button variant="outline" size="sm" className="w-full" icon={ArrowRight}>
                  View Audit Trail
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Operational Protocol Callout */}
      <div className="p-4 rounded-xl bg-[#F7F7F0] border border-[rgba(18,59,46,0.1)] text-xs text-[#17251F]/80 flex items-start gap-3">
        <Shield className="w-4 h-4 text-[#123B2E] shrink-0 mt-0.5" />
        <div>
          <strong className="font-heading font-bold text-[#123B2E]">
            Operations note:
          </strong>{' '}
          Use the queue to record review, assignment, inspection, and resolution updates. Field risk categories do not represent verified drainage risk.
        </div>
      </div>
    </div>
  );
}
