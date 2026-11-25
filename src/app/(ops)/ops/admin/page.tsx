'use client';

import { useEffect, useState } from 'react';
import {
  RefreshCw,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface Analytics {
  observations?: { total: number };
  incidents?: { total: number };
}

const DEMO_USERS = [
  { email: 'admin@cleaningo.ai', role: 'System Administrator', status: 'Active' },
  { email: 'officer@cleaningo.ai', role: 'Municipal Officer', status: 'Active' },
  { email: 'inspector@cleaningo.ai', role: 'Field Inspector', status: 'Active' },
  { email: 'researcher@cleaningo.ai', role: 'Academic Researcher', status: 'Active' },
  { email: 'citizen@cleaningo.ai', role: 'Citizen Reporter', status: 'Active' },
];

export default function OpsAdminPage() {
  const [analytics, setAnalytics] = useState<Analytics>({});
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState('');

  useEffect(() => {
    fetch('/api/analytics')
      .then((r) => r.json())
      .then(setAnalytics)
      .catch(() => {});
  }, []);

  async function triggerSeed() {
    setSeeding(true);
    setSeedResult('');
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const d = await res.json();
      setSeedResult(d.message ?? 'Database successfully re-seeded.');
      // Refresh analytics
      fetch('/api/analytics').then((r) => r.json()).then(setAnalytics);
    } finally {
      setSeeding(false);
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold tracking-wider text-[#3C9290] uppercase">
            Operations Portal · Administration
          </span>
          <Badge variant="verified">Superuser Mode</Badge>
        </div>
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#123B2E] tracking-tight mt-1">
          Municipal Platform Administration
        </h1>
        <p className="text-sm text-[#17251F]/70 mt-1 max-w-2xl">
          Database seeding controls, system health monitoring, and municipal officer permission scopes.
        </p>
      </div>

      {/* System Status Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Field Observations', value: analytics.observations?.total ?? '—', note: 'SQLite registry' },
          { label: 'Incidents', value: analytics.incidents?.total ?? '—', note: 'SQLite registry' },
          { label: 'Primary DB', value: 'SQLite3', note: 'Local file' },
          { label: 'Engine Stack', value: 'Next.js 16', note: 'App Router' },
        ].map((s) => (
          <div
            key={s.label}
            className="p-4 bg-white rounded-xl border border-[rgba(18,59,46,0.1)] shadow-2xs space-y-1"
          >
            <span className="text-[10px] font-mono font-bold uppercase text-[#123B2E]/60 block">
              {s.label}
            </span>
            <p className="font-heading font-extrabold text-xl text-[#123B2E]">{s.value}</p>
            <span className="text-[10px] font-mono text-[#17251F]/50 block">{s.note}</span>
          </div>
        ))}
      </div>

      {/* Database Seeding Control */}
      <Card variant="editorial">
        <CardHeader className="pb-3 border-b border-[rgba(18,59,46,0.06)]">
          <CardTitle className="text-base font-heading">
            Starter Data Control
          </CardTitle>
          <p className="text-xs text-[#17251F]/60">
            Ensure the local database has its starter research records
          </p>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <p className="text-xs text-[#17251F]/80 leading-relaxed">
            This idempotent action adds starter records only when the database is empty. Existing observations, incidents, and audit history are preserved.
          </p>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={triggerSeed}
              disabled={seeding}
              icon={seeding ? Loader2 : RefreshCw}
            >
              {seeding ? 'Checking database…' : 'Ensure starter records'}
            </Button>
            {seedResult && (
              <span className="text-xs font-mono text-emerald-700 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {seedResult}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* User Roster */}
      <Card variant="editorial">
        <CardHeader className="pb-3 border-b border-[rgba(18,59,46,0.06)]">
          <CardTitle className="text-base font-heading">Platform Role Access Roster</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#F7F7F0]/60 border-b border-[rgba(18,59,46,0.06)] font-mono font-bold text-[#123B2E]/70 uppercase text-[10px]">
                <th className="px-4 py-3">Account Email</th>
                <th className="px-4 py-3">Assigned Role</th>
                <th className="px-4 py-3">Access State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(18,59,46,0.05)]">
              {DEMO_USERS.map((u) => (
                <tr key={u.email} className="hover:bg-[#F7F7F0]/40 transition-colors">
                  <td className="px-4 py-3 font-mono text-[11px] text-[#123B2E] font-semibold">
                    {u.email}
                  </td>
                  <td className="px-4 py-3 font-heading font-medium text-[#17251F]">
                    {u.role}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
