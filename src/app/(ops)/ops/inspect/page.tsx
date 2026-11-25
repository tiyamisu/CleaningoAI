'use client';

import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Loader2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
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
  description: string;
}

export default function OpsInspectPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingId, setMarkingId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch('/api/incidents?limit=100');
      const data = await res.json();
      setIncidents(data.incidents ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, []);

  const activeInspections = incidents.filter((i) =>
    ['assigned', 'inspected', 'under_review'].includes(i.status)
  );

  async function markStatus(id: string, newStatus: string, defaultNote: string) {
    setMarkingId(id);
    try {
      await fetch(`/api/incidents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          notes: notes[id] || defaultNote,
          actor: 'inspector@cleaningo.ai',
        }),
      });
      await loadData();
    } finally {
      setMarkingId(null);
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold tracking-wider text-[#3C9290] uppercase">
            Operations Portal · Field Verification
          </span>
          <Badge variant="verified">Inspector Role</Badge>
        </div>
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#123B2E] tracking-tight mt-1">
          Field Inspection & Verification
        </h1>
        <p className="text-sm text-[#17251F]/70 mt-1 max-w-2xl">
          On-site verification queue for assigned ward inspectors. Validate photographic evidence and certify municipal waste clearance.
        </p>
      </div>

      {/* Active Inspection Cards List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-gray-500">
            Loading field inspection route…
          </div>
        ) : activeInspections.length === 0 ? (
          <div className="p-12 bg-white rounded-2xl border border-[rgba(18,59,46,0.1)] text-center text-xs text-emerald-800 font-semibold shadow-2xs">
            ✓ No sites currently pending field verification. All assigned tasks are resolved!
          </div>
        ) : (
          activeInspections.map((inc) => (
            <Card key={inc.id} variant="editorial">
              <CardContent className="pt-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(18,59,46,0.06)] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#123B2E]">{inc.id}</span>
                    <Badge
                      variant={
                        inc.severity === 'high'
                          ? 'high'
                          : inc.severity === 'medium'
                          ? 'medium'
                          : 'low'
                      }
                    >
                      {inc.severity.toUpperCase()} PRIORITY
                    </Badge>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F7F7F0] text-[#123B2E] font-semibold uppercase">
                      Status: {inc.status}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#3C9290] font-semibold">
                    Assigned: {inc.assigned_inspector || 'Dr. Ramesh Kumar'}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-base text-[#123B2E]">{inc.title}</h3>
                  <p className="text-xs text-[#17251F]/70">{inc.area_label}</p>
                  {inc.description && (
                    <p className="text-xs text-[#17251F]/80 leading-relaxed pt-1">
                      {inc.description}
                    </p>
                  )}
                </div>

                {/* Field Notes Input */}
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-1">
                    On-Site Inspector Remarks
                  </label>
                  <input
                    type="text"
                    value={notes[inc.id] || ''}
                    onChange={(e) =>
                      setNotes((prev) => ({ ...prev, [inc.id]: e.target.value }))
                    }
                    placeholder="e.g. Ground survey completed. Waste removed by BBMP compactor unit."
                    className="w-full bg-white border border-[rgba(18,59,46,0.15)] rounded-lg px-3 py-2 text-xs text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#123B2E]/20"
                  />
                </div>

                {/* Inspector Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {inc.status !== 'inspected' && (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={markingId === inc.id}
                      onClick={() =>
                        markStatus(inc.id, 'inspected', 'Physical on-site inspection conducted.')
                      }
                      icon={markingId === inc.id ? Loader2 : Clock}
                    >
                      Certify Inspected
                    </Button>
                  )}
                  <Button
                    variant="lime"
                    size="sm"
                    disabled={markingId === inc.id}
                    onClick={() =>
                      markStatus(
                        inc.id,
                        'resolved',
                        'Site cleared and confirmed remediated by field inspector.'
                      )
                    }
                    icon={markingId === inc.id ? Loader2 : CheckCircle2}
                  >
                    Confirm Remediation & Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
