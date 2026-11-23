'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  User,
  ChevronRight,
  Search,
  Filter,
  Plus,
  ArrowRight,
  ShieldAlert,
  Loader2,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface Incident {
  id: string;
  title: string;
  area_label: string;
  latitude: number;
  longitude: number;
  waste_type: string;
  severity: string;
  status: string;
  reporter_name: string;
  reporter_email: string;
  assigned_inspector: string;
  created_at: string;
  notes: string;
}

const STATUS_ORDER = ['submitted', 'under_review', 'assigned', 'inspected', 'resolved'];

const STATUS_LABELS: Record<string, string> = {
  submitted: 'Submitted',
  under_review: 'Under Review',
  assigned: 'Assigned',
  inspected: 'Inspected',
  resolved: 'Resolved',
};

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/incidents?limit=100');
      const data = await res.json();
      setIncidents(data.incidents || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const advanceStatus = async (inc: Incident) => {
    const currentIdx = STATUS_ORDER.indexOf(inc.status);
    if (currentIdx === -1 || currentIdx >= STATUS_ORDER.length - 1) return;
    const nextStatus = STATUS_ORDER[currentIdx + 1];

    setUpdatingId(inc.id);
    try {
      await fetch(`/api/incidents/${inc.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: nextStatus,
          actor: 'officer@cleaningo.ai',
          notes: `Status advanced to ${nextStatus} via Operations Queue.`,
        }),
      });
      await loadData();
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = useMemo(() => {
    let result = incidents;
    if (activeTab !== 'all') {
      result = result.filter((i) => i.status === activeTab);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.title?.toLowerCase().includes(q) ||
          i.id?.toLowerCase().includes(q) ||
          i.area_label?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [incidents, activeTab, search]);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-wider text-[#3C9290] uppercase">
              Module 05 · Incident Operations
            </span>
            <Badge variant="verified">Live Database</Badge>
          </div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#123B2E] tracking-tight mt-1">
            Incident Management Queue
          </h1>
          <p className="text-sm text-[#17251F]/70 mt-1">
            Track and advance reported informal dumps through the 5-stage municipal resolution lifecycle.
          </p>
        </div>

        <Link href="/app/reports">
          <Button variant="primary" size="md" icon={Plus}>
            Log New Incident
          </Button>
        </Link>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[rgba(18,59,46,0.08)] pb-3">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-[#123B2E] text-white shadow-xs'
              : 'bg-white text-[#17251F]/70 border border-[rgba(18,59,46,0.1)] hover:bg-[#F7F7F0]'
          }`}
        >
          All Records ({incidents.length})
        </button>
        {STATUS_ORDER.map((status) => {
          const count = incidents.filter((i) => i.status === status).length;
          const isActive = activeTab === status;
          return (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
                isActive
                  ? 'bg-[#123B2E] text-white shadow-xs'
                  : 'bg-white text-[#17251F]/70 border border-[rgba(18,59,46,0.1)] hover:bg-[#F7F7F0]'
              }`}
            >
              {STATUS_LABELS[status]} ({count})
            </button>
          );
        })}
      </div>

      {/* Main Table Card */}
      <Card variant="editorial">
        <CardHeader className="pb-3 border-b border-[rgba(18,59,46,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter incidents by title or ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-[rgba(18,59,46,0.15)] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#123B2E]"
            />
          </div>
          <p className="text-xs font-mono text-[#17251F]/60">
            Showing {filtered.length} incidents
          </p>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-xs font-mono text-gray-500">
              Loading incident records…
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-xs text-[#17251F]/50">
              No incidents found matching current status filter.
            </div>
          ) : (
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-[#F7F7F0]/60 border-b border-[rgba(18,59,46,0.06)] font-mono font-bold text-[#123B2E]/70 uppercase text-[10px]">
                  <th className="px-4 py-3">Incident ID</th>
                  <th className="px-4 py-3">Title & Area</th>
                  <th className="px-4 py-3">Waste Stream</th>
                  <th className="px-4 py-3">Severity</th>
                  <th className="px-4 py-3">Workflow Status</th>
                  <th className="px-4 py-3">Inspector</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(18,59,46,0.05)]">
                {filtered.map((inc) => {
                  const currentIdx = STATUS_ORDER.indexOf(inc.status);
                  const canAdvance = currentIdx < STATUS_ORDER.length - 1;
                  const nextStatus = canAdvance ? STATUS_ORDER[currentIdx + 1] : null;

                  return (
                    <tr key={inc.id} className="hover:bg-[#F7F7F0]/40 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-[#123B2E]">
                        <Link
                          href={`/app/incidents/${inc.id}`}
                          className="hover:underline hover:text-[#3C9290]"
                        >
                          {inc.id}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-heading font-semibold text-[#17251F]">
                          {inc.title}
                        </div>
                        <span className="text-[11px] text-[#17251F]/60 font-mono">
                          {inc.area_label}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-[#123B2E]">
                        {inc.waste_type}
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
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                            inc.status === 'resolved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : inc.status === 'inspected'
                              ? 'bg-teal-100 text-teal-800'
                              : inc.status === 'assigned'
                              ? 'bg-purple-100 text-purple-800'
                              : inc.status === 'under_review'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {STATUS_LABELS[inc.status] || inc.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[11px] text-[#17251F]/70">
                        {inc.assigned_inspector || 'Unassigned'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {canAdvance && nextStatus && (
                            <button
                              onClick={() => advanceStatus(inc)}
                              disabled={updatingId === inc.id}
                              className="px-2.5 py-1 rounded bg-[#123B2E] text-white hover:bg-[#0B2922] text-[10px] font-mono font-semibold transition-colors flex items-center gap-1 disabled:opacity-50"
                            >
                              {updatingId === inc.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <>
                                  <span>Advance to {STATUS_LABELS[nextStatus]}</span>
                                  <ArrowRight className="w-3 h-3" />
                                </>
                              )}
                            </button>
                          )}
                          <Link
                            href={`/app/incidents/${inc.id}`}
                            className="p-1.5 rounded hover:bg-[#F7F7F0] text-[#123B2E]"
                            title="View Incident Details"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
