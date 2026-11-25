'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  UserCheck,
  Loader2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface Incident {
  id: string;
  title: string;
  area_label: string;
  status: string;
  severity: string;
  assigned_inspector: string | null;
  created_at: string;
}

const INSPECTORS = [
  { name: 'Ravi Kumar', ward: 'South Ward (Kanakapura / BSK)', active: 2 },
  { name: 'Deepa Nair', ward: 'West Ward (Peenya / Dasarahalli)', active: 1 },
  { name: 'Suresh Babu', ward: 'Central Ward (Majestic / City)', active: 3 },
  { name: 'Ananya Sharma', ward: 'East Ward (Indiranagar / CV Raman)', active: 1 },
  { name: 'Manju Reddy', ward: 'North Ward (Hebbal / Yelahanka)', active: 0 },
];

export default function OpsAssignPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [selections, setSelections] = useState<Record<string, string>>({});

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/incidents?limit=100');
      const data = await res.json();
      setIncidents(data.incidents ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [loadData]);

  async function handleAssign(id: string) {
    const inspector = selections[id];
    if (!inspector) return;
    setAssigningId(id);
    try {
      await fetch(`/api/incidents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assigned_inspector: inspector,
          status: 'assigned',
          actor: 'officer@cleaningo.ai',
          notes: `Assigned to ward inspector ${inspector} for verification.`,
        }),
      });
      await loadData();
    } finally {
      setAssigningId(null);
    }
  }

  const unassigned = incidents.filter(
    (i) => !i.assigned_inspector && !['resolved', 'closed'].includes(i.status)
  );

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold tracking-wider text-[#3C9290] uppercase">
            Operations Portal · Workforce Dispatch
          </span>
          <Badge variant="verified">Officer Roster</Badge>
        </div>
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#123B2E] tracking-tight mt-1">
          Inspector Workload & Dispatch
        </h1>
        <p className="text-sm text-[#17251F]/70 mt-1 max-w-2xl">
          Balance field inspection routes across municipal sanitation officers and assign unverified solid waste reports.
        </p>
      </div>

      {/* Inspector Roster Grid */}
      <div>
        <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-3">
          Ward Field Personnel Roster
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {INSPECTORS.map((insp) => (
            <div
              key={insp.name}
              className="p-4 bg-white rounded-xl border border-[rgba(18,59,46,0.1)] shadow-2xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-xs text-[#123B2E]">{insp.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#123B2E]/10 text-[#123B2E] font-semibold">
                  {insp.active} active
                </span>
              </div>
              <p className="text-[11px] text-[#17251F]/60 leading-tight">{insp.ward}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Unassigned Incidents Table */}
      <Card variant="editorial">
        <CardHeader className="pb-3 border-b border-[rgba(18,59,46,0.06)]">
          <CardTitle className="text-base font-heading">
            Unassigned Incident Queue ({unassigned.length} Pending)
          </CardTitle>
          <p className="text-xs text-[#17251F]/60">
            Citizen reports awaiting field inspector assignment
          </p>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-xs font-mono text-gray-500">
              Loading incident assignments…
            </div>
          ) : unassigned.length === 0 ? (
            <div className="p-12 text-center text-xs text-emerald-800 font-semibold bg-emerald-50/50">
              ✓ All active incidents are currently assigned to field personnel.
            </div>
          ) : (
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-[#F7F7F0]/60 border-b border-[rgba(18,59,46,0.06)] font-mono font-bold text-[#123B2E]/70 uppercase text-[10px]">
                  <th className="px-4 py-3">Incident ID</th>
                  <th className="px-4 py-3">Title & Area</th>
                  <th className="px-4 py-3">Severity</th>
                  <th className="px-4 py-3">Select Ward Inspector</th>
                  <th className="px-4 py-3 text-right">Dispatch Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(18,59,46,0.05)]">
                {unassigned.map((inc) => (
                  <tr key={inc.id} className="hover:bg-[#F7F7F0]/40 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-[#123B2E]">
                      {inc.id}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-heading font-semibold text-[#17251F]">{inc.title}</div>
                      <span className="text-[11px] text-[#17251F]/60 font-mono">
                        {inc.area_label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          inc.severity === 'high'
                            ? 'high'
                            : inc.severity === 'medium'
                            ? 'medium'
                            : 'low'
                        }
                      >
                        {inc.severity.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={selections[inc.id] || ''}
                        onChange={(e) =>
                          setSelections((prev) => ({ ...prev, [inc.id]: e.target.value }))
                        }
                        className="bg-white border border-[rgba(18,59,46,0.15)] rounded-lg px-2.5 py-1 text-xs text-[#17251F] focus:outline-none focus:ring-1 focus:ring-[#123B2E]"
                      >
                        <option value="">Choose Inspector…</option>
                        {INSPECTORS.map((insp) => (
                          <option key={insp.name} value={insp.name}>
                            {insp.name} ({insp.ward.split('(')[0]})
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="primary"
                        size="sm"
                        disabled={!selections[inc.id] || assigningId === inc.id}
                        onClick={() => handleAssign(inc.id)}
                        icon={assigningId === inc.id ? Loader2 : UserCheck}
                      >
                        {assigningId === inc.id ? 'Assigning…' : 'Dispatch'}
                      </Button>
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
