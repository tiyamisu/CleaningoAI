'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Clock,
  User,
  CheckCircle2,
  Loader2,
  MapPin,
  FileText,
  Shield,
  ArrowRight,
  MessageSquare,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatTime } from '@/lib/utils';

interface Incident {
  id: string;
  title: string;
  description: string;
  area_label: string;
  latitude: number;
  longitude: number;
  waste_type: string;
  severity: string;
  status: string;
  reporter_name: string;
  reporter_email: string;
  reporter_phone: string;
  assigned_inspector: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

interface TimelineEvent {
  id: string;
  action: string;
  actor: string;
  notes: string;
  status_from: string;
  status_to: string;
  created_at: string;
}

const STATUS_STEPS = ['submitted', 'under_review', 'assigned', 'inspected', 'resolved'];
const STATUS_LABELS: Record<string, string> = {
  submitted: 'Submitted',
  under_review: 'Under Review',
  assigned: 'Assigned',
  inspected: 'Inspected',
  resolved: 'Resolved',
};

export default function IncidentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const router = useRouter();

  const [incident, setIncident] = useState<Incident | null>(null);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [inspector, setInspector] = useState('');
  const [notes, setNotes] = useState('');
  const [feedback, setFeedback] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/incidents/${id}`);
      const data = await res.json();
      if (res.ok) {
        setIncident(data.incident);
        setTimeline(data.timeline || []);
        setInspector(data.incident.assigned_inspector || '');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleUpdate = async () => {
    if (!newStatus && !inspector && !notes) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/incidents/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus || undefined,
          assigned_inspector: inspector || undefined,
          notes: notes || undefined,
          actor: 'officer@cleaningo.ai',
        }),
      });
      if (res.ok) {
        setFeedback('Incident record updated successfully.');
        setNotes('');
        setNewStatus('');
        await loadData();
        setTimeout(() => setFeedback(''), 3000);
      }
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 flex items-center justify-center">
        <div className="text-center space-y-3 font-mono text-xs text-[#123B2E]">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#123B2E]" />
          <p>Retrieving incident dossier #{id}…</p>
        </div>
      </div>
    );
  }

  if (!incident) {
    return (
      <div className="p-12 text-center space-y-4">
        <p className="font-heading font-bold text-lg text-[#123B2E]">Incident record not found</p>
        <Link href="/app/incidents">
          <Button variant="outline" size="sm" icon={ChevronLeft}>
            Return to Incidents Queue
          </Button>
        </Link>
      </div>
    );
  }

  const currentIdx = STATUS_STEPS.indexOf(incident.status);

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/app/incidents"
            className="p-2 rounded-lg border border-[rgba(18,59,46,0.15)] text-[#123B2E] hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#123B2E]">{incident.id}</span>
              <Badge
                variant={
                  incident.severity === 'high'
                    ? 'high'
                    : incident.severity === 'medium'
                    ? 'medium'
                    : 'low'
                }
              >
                {incident.severity.toUpperCase()} PRIORITY
              </Badge>
            </div>
            <h1 className="font-heading font-extrabold text-xl md:text-2xl text-[#123B2E] tracking-tight mt-0.5">
              {incident.title}
            </h1>
          </div>
        </div>

        <Link
          href={`/app/map`}
          className="text-xs font-mono font-semibold text-[#3C9290] hover:underline flex items-center gap-1"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Locate in GeoIntel Map</span>
        </Link>
      </div>

      {/* Visual Resolution Stepper */}
      <div className="bg-white p-5 rounded-2xl border border-[rgba(18,59,46,0.1)] shadow-2xs space-y-3">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/60 block">
          Lifecycle Progression
        </span>
        <div className="grid grid-cols-5 gap-2">
          {STATUS_STEPS.map((step, idx) => {
            const isCompleted = currentIdx > idx;
            const isCurrent = currentIdx === idx;
            return (
              <div
                key={step}
                className={`py-2 px-2.5 rounded-lg border text-center transition-all ${
                  isCurrent
                    ? 'bg-[#123B2E] text-white border-[#0B2922] font-bold shadow-xs'
                    : isCompleted
                    ? 'bg-[#123B2E]/10 text-[#123B2E] border-[#123B2E]/20'
                    : 'bg-[#F7F7F0]/60 text-[#17251F]/40 border-[rgba(18,59,46,0.06)]'
                }`}
              >
                <span className="text-[10px] font-mono block">Step 0{idx + 1}</span>
                <span className="text-xs font-heading capitalize font-semibold block truncate">
                  {STATUS_LABELS[step]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Details + Audit/Action Bench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Dossier Information */}
        <div className="lg:col-span-7 space-y-6">
          <Card variant="editorial">
            <CardHeader className="pb-3 border-b border-[rgba(18,59,46,0.06)]">
              <CardTitle className="text-base font-heading">Field Dossier Attributes</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4 text-xs">
              <div>
                <span className="text-[10px] font-mono text-[#17251F]/50 block">DESCRIPTION</span>
                <p className="text-[#17251F] leading-relaxed mt-1">
                  {incident.description || 'No detailed field remarks provided.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[rgba(18,59,46,0.06)]">
                <div>
                  <span className="text-[10px] font-mono text-[#17251F]/50 block">AREA LABEL</span>
                  <span className="font-semibold text-[#123B2E]">{incident.area_label}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#17251F]/50 block">GPS COORDINATES</span>
                  <span className="font-mono font-semibold text-[#3C9290]">
                    {incident.latitude.toFixed(5)}° N, {incident.longitude.toFixed(5)}° E
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[rgba(18,59,46,0.06)]">
                <div>
                  <span className="text-[10px] font-mono text-[#17251F]/50 block">WASTE STREAM</span>
                  <span className="font-semibold text-[#123B2E]">{incident.waste_type}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#17251F]/50 block">LOGGED TIMESTAMP</span>
                  <span className="font-mono text-[#17251F]/70">
                    {incident.created_at ? new Date(incident.created_at).toLocaleString() : 'Recent'}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[rgba(18,59,46,0.06)]">
                <span className="text-[10px] font-mono text-[#17251F]/50 block">REPORTER IDENTITY</span>
                <span className="font-semibold text-[#123B2E]">
                  {incident.reporter_name || 'Anonymous Citizen'}
                </span>
                <span className="text-[#17251F]/60 ml-1">
                  ({incident.reporter_email || 'No email provided'})
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Audit Trail Timeline */}
          <Card variant="editorial">
            <CardHeader className="pb-3 border-b border-[rgba(18,59,46,0.06)]">
              <CardTitle className="text-base font-heading">
                Operational Audit History ({timeline.length} Entries)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {timeline.length === 0 ? (
                <p className="text-xs text-[#17251F]/50 italic">
                  Initial submission recorded. No status transitions logged yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {timeline.map((evt, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs">
                      <div className="w-6 h-6 rounded-full bg-[#123B2E]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-3 h-3 text-[#123B2E]" />
                      </div>
                      <div className="flex-1 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="font-heading font-semibold text-[#123B2E]">
                            {evt.action.replace(/_/g, ' ').toUpperCase()}
                          </span>
                          <span className="text-[10px] font-mono text-[#17251F]/50">
                            {evt.created_at ? formatTime(evt.created_at) : ''}
                          </span>
                        </div>
                        <p className="text-[#17251F]/70">{evt.notes || 'Routine status update'}</p>
                        <span className="text-[10px] font-mono text-[#3C9290] block">
                          Actor: {evt.actor}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Municipal Action Control Panel */}
        <div className="lg:col-span-5 space-y-6">
          <Card variant="editorial">
            <CardHeader className="pb-3 border-b border-[rgba(18,59,46,0.06)]">
              <CardTitle className="text-base font-heading">Officer Action Bench</CardTitle>
              <p className="text-xs text-[#17251F]/60">
                Advance workflow stage and assign field personnel
              </p>
            </CardHeader>

            <CardContent className="pt-4 space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-1.5">
                  Update Resolution Stage
                </label>
                <select
                  value={newStatus || incident.status}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full bg-white border border-[rgba(18,59,46,0.15)] rounded-lg px-3 py-2 text-xs text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#123B2E]/20"
                >
                  {STATUS_STEPS.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-1.5">
                  Assigned Field Inspector
                </label>
                <input
                  type="text"
                  value={inspector}
                  onChange={(e) => setInspector(e.target.value)}
                  placeholder="e.g. Officer K. V. Gowda (South Ward)"
                  className="w-full bg-white border border-[rgba(18,59,46,0.15)] rounded-lg px-3 py-2 text-xs text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#123B2E]/20"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-1.5">
                  Action Log Remarks
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record dispatch instructions, clearance equipment, or field inspection notes…"
                  className="w-full bg-white border border-[rgba(18,59,46,0.15)] rounded-lg p-2.5 text-xs text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#123B2E]/20"
                />
              </div>

              {feedback && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {feedback}
                </div>
              )}

              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={handleUpdate}
                disabled={updating}
                icon={updating ? Loader2 : ArrowRight}
              >
                {updating ? 'Committing Update…' : 'Apply Operational Change'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
