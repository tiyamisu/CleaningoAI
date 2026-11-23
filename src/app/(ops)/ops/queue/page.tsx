'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  List,
  ChevronRight,
  AlertCircle,
  Clock,
  UserCheck,
  CheckCircle2,
  XCircle,
  Eye,
  ArrowRight,
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
  waste_type: string;
  created_at: string;
  assigned_inspector: string | null;
}

const STATUS_TABS = ['all', 'submitted', 'under_review', 'assigned', 'inspected', 'resolved'];

const STATUS_LABELS: Record<string, string> = {
  submitted: 'Submitted',
  under_review: 'Under Review',
  assigned: 'Assigned',
  inspected: 'Inspecting',
  resolved: 'Resolved',
};

const NEXT_STATUS: Record<string, string> = {
  submitted: 'under_review',
  under_review: 'assigned',
  assigned: 'inspected',
  inspected: 'resolved',
};

export default function OpsQueuePage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [advancingId, setAdvancingId] = useState<string | null>(null);

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
    loadData();
  }, []);

  const filtered = activeTab === 'all' ? incidents : incidents.filter((i) => i.status === activeTab);

  async function advanceStatus(inc: Incident) {
    const next = NEXT_STATUS[inc.status];
    if (!next) return;
    setAdvancingId(inc.id);
    try {
      await fetch(`/api/incidents/${inc.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: next,
          actor: 'officer@cleaningo.ai',
          notes: `Advanced to ${next} in Operations Queue.`,
        }),
      });
      await loadData();
    } finally {
      setAdvancingId(null);
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold tracking-wider text-[#3C9290] uppercase">
            Operations Portal · Active Remediation
          </span>
          <Badge variant="verified">Live Dispatch</Badge>
        </div>
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#123B2E] tracking-tight mt-1">
          Municipal Incident Queue
        </h1>
        <p className="text-sm text-[#17251F]/70 mt-1 max-w-2xl">
          Review reported waste dumps, verify severity classifications, and transition incidents along the remediation pipeline.
        </p>
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
          All Items ({incidents.length})
        </button>
        {STATUS_TABS.filter((s) => s !== 'all').map((status) => {
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
              {STATUS_LABELS[status] || status} ({count})
            </button>
          );
        })}
      </div>

      {/* Incident Queue Table */}
      <Card variant="editorial">
        <CardContent className="p-0 overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-xs font-mono text-gray-500">
              Loading operations queue…
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-xs text-[#17251F]/50">
              No items in this queue category.
            </div>
          ) : (
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-[#F7F7F0]/60 border-b border-[rgba(18,59,46,0.06)] font-mono font-bold text-[#123B2E]/70 uppercase text-[10px]">
                  <th className="px-4 py-3">Incident ID</th>
                  <th className="px-4 py-3">Description & Area</th>
                  <th className="px-4 py-3">Waste Type</th>
                  <th className="px-4 py-3">Severity</th>
                  <th className="px-4 py-3">Current Status</th>
                  <th className="px-4 py-3">Assigned Inspector</th>
                  <th className="px-4 py-3 text-right">Workflow Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(18,59,46,0.05)]">
                {filtered.map((inc) => {
                  const next = NEXT_STATUS[inc.status];
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
                        <div className="font-heading font-semibold text-[#17251F]">{inc.title}</div>
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
                        {next ? (
                          <button
                            onClick={() => advanceStatus(inc)}
                            disabled={advancingId === inc.id}
                            className="px-3 py-1 rounded bg-[#123B2E] text-white hover:bg-[#0B2922] text-[10px] font-mono font-semibold transition-colors inline-flex items-center gap-1 disabled:opacity-50"
                          >
                            {advancingId === inc.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <>
                                <span>Move to {STATUS_LABELS[next]}</span>
                                <ArrowRight className="w-3 h-3" />
                              </>
                            )}
                          </button>
                        ) : (
                          <span className="text-[11px] font-mono text-emerald-700 font-semibold flex items-center justify-end gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                          </span>
                        )}
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
