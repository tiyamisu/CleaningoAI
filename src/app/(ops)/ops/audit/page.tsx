'use client';

import { useEffect, useState } from 'react';
import {
  BookOpen,
  ChevronRight,
  RefreshCw,
  Clock,
  Shield,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDateTime } from '@/lib/utils';

interface AuditEvent {
  id: number;
  event_type: string;
  entity_type: string;
  entity_id: string;
  actor: string;
  description: string;
  created_at: string;
}

interface AuditResponse {
  events: AuditEvent[];
  total: number;
  page: number;
  pages: number;
}

export default function OpsAuditPage() {
  const [data, setData] = useState<AuditResponse | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');

  async function loadData(p: number) {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(p), limit: '25' });
      if (filterType !== 'all') params.set('type', filterType);
      const res = await fetch(`/api/audit?${params}`);
      const d = await res.json();
      setData(d);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData(page);
  }, [page, filterType]);

  const EVENT_TYPES = ['all', 'created', 'updated', 'seed'];

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-wider text-[#3C9290] uppercase">
              Operations Portal · Governance & Accountability
            </span>
            <Badge variant="verified">Activity Log</Badge>
          </div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#123B2E] tracking-tight mt-1">
            System Audit Trail
          </h1>
          <p className="text-sm text-[#17251F]/70 mt-1">
            Chronological record of incident submissions, updates, and database seeding events stored in the local database.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => loadData(page)}
          disabled={loading}
          icon={RefreshCw}
        >
          {loading ? 'Refreshing…' : 'Sync Log'}
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[rgba(18,59,46,0.08)] pb-3">
        {EVENT_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => {
              setFilterType(type);
              setPage(1);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold capitalize transition-all ${
              filterType === type
                ? 'bg-[#123B2E] text-white shadow-xs'
                : 'bg-white text-[#17251F]/70 border border-[rgba(18,59,46,0.1)] hover:bg-[#F7F7F0]'
            }`}
          >
            {type.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Audit Log Table */}
      <Card variant="editorial">
        <CardContent className="p-0 overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-xs font-mono text-gray-500">
              Retrieving audit records from SQLite…
            </div>
          ) : !data || data.events.length === 0 ? (
            <div className="p-12 text-center text-xs text-[#17251F]/50">
              No audit events found matching current criteria.
            </div>
          ) : (
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-[#F7F7F0]/60 border-b border-[rgba(18,59,46,0.06)] font-mono font-bold text-[#123B2E]/70 uppercase text-[10px]">
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Event Type</th>
                  <th className="px-4 py-3">Target Entity</th>
                  <th className="px-4 py-3">Actor Identity</th>
                  <th className="px-4 py-3">Description / Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(18,59,46,0.05)]">
                {data.events.map((evt) => (
                  <tr key={evt.id} className="hover:bg-[#F7F7F0]/40 transition-colors">
                    <td className="px-4 py-3 font-mono text-[11px] text-[#17251F]/60 whitespace-nowrap">
                      {formatDateTime(evt.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#123B2E]/10 text-[#123B2E] uppercase">
                        {evt.event_type.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-[#3C9290]">
                      {evt.entity_id}
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-[#123B2E]">
                      {evt.actor}
                    </td>
                    <td className="px-4 py-3 text-[11px] text-[#17251F]/80">
                      {evt.description}
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
