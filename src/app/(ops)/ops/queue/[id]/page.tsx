'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, ChevronRight, Clock, UserCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

type TimelineEntry = { id: number; from_status: string; to_status: string; changed_by: string; note: string; changed_at: string };
type Incident = {
  id: string; inc_id: string; title: string; description: string; location_text: string;
  lat: number; lng: number; status: string; risk_level: string; waste_type: string;
  reporter_name: string; reporter_email: string; reporter_phone: string;
  assigned_to: string | null; created_at: string; timeline: TimelineEntry[];
};

const STATUS_FLOW = ['submitted', 'verified', 'assigned', 'inspecting', 'resolved', 'closed'];
const STATUS_COLORS: Record<string, string> = {
  submitted: 'bg-blue-100 text-blue-800', verified: 'bg-purple-100 text-purple-800',
  assigned: 'bg-amber-100 text-amber-800', inspecting: 'bg-orange-100 text-orange-800',
  resolved: 'bg-emerald-100 text-emerald-800', closed: 'bg-gray-100 text-gray-700',
};

const INSPECTORS = [
  'Ravi Kumar', 'Deepa Nair', 'Suresh Babu', 'Ananya Sharma', 'Manju Reddy'
];

export default function OpsQueueDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [assignTo, setAssignTo] = useState('');
  const [note, setNote] = useState('');

  async function load() {
    const res = await fetch(`/api/incidents/${params.id}`);
    if (!res.ok) return;
    const d = await res.json();
    // API returns { incident, timeline } — flatten into one object for convenience
    setIncident(d.incident ? { ...d.incident, timeline: d.timeline ?? [] } : { ...d, timeline: d.timeline ?? [] });
    setLoading(false);
  }

  useEffect(() => { load(); }, [params.id]);

  async function advance() {
    if (!incident) return;
    const nextIdx = STATUS_FLOW.indexOf(incident.status) + 1;
    if (nextIdx >= STATUS_FLOW.length) return;
    setUpdating(true);
    await fetch(`/api/incidents/${incident.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: STATUS_FLOW[nextIdx],
        assigned_to: assignTo || incident.assigned_to,
        note: note || undefined,
        changed_by: 'officer@cleaningoai.in',
      }),
    });
    setNote('');
    await load();
    setUpdating(false);
  }

  if (loading) return <div className="p-8 text-gray-500 text-sm">Loading…</div>;
  if (!incident) return <div className="p-8 text-gray-500 text-sm">Incident not found.</div>;

  const nextStatus = STATUS_FLOW[STATUS_FLOW.indexOf(incident.status) + 1];
  const isClosed = incident.status === 'closed';

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/ops/queue" className="text-gray-500 hover:text-gray-700 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <span className="font-mono text-xs text-[#4a7c59] font-semibold">{incident.inc_id}</span>
          <h1 className="text-xl font-bold text-[#0f1f17]">{incident.title}</h1>
        </div>
        <span className={`ml-auto text-xs px-3 py-1 rounded-full font-medium capitalize ${STATUS_COLORS[incident.status] ?? 'bg-gray-100'}`}>
          {incident.status}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main details */}
        <div className="lg:col-span-2 space-y-5">
          {/* Info card */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-[#0f1f17] mb-4">Incident details</h2>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div><dt className="text-gray-500 text-xs">Location</dt><dd className="text-[#0f1f17] font-medium mt-0.5">{incident.location_text}</dd></div>
              <div><dt className="text-gray-500 text-xs">Risk Level</dt><dd className={`mt-0.5 font-semibold ${incident.risk_level === 'HIGH' ? 'text-red-600' : incident.risk_level === 'MEDIUM' ? 'text-amber-600' : 'text-emerald-600'}`}>{incident.risk_level || '—'}</dd></div>
              <div><dt className="text-gray-500 text-xs">Waste Type</dt><dd className="text-[#0f1f17] font-medium mt-0.5">{incident.waste_type || '—'}</dd></div>
              <div><dt className="text-gray-500 text-xs">Reported</dt><dd className="text-[#0f1f17] font-medium mt-0.5">{formatDate(incident.created_at)}</dd></div>
              <div className="col-span-2"><dt className="text-gray-500 text-xs">Coordinates</dt><dd className="text-[#0f1f17] font-mono text-xs mt-0.5">{incident.lat?.toFixed(6)}, {incident.lng?.toFixed(6)}</dd></div>
              {incident.description && <div className="col-span-2"><dt className="text-gray-500 text-xs">Description</dt><dd className="text-[#0f1f17] mt-0.5 leading-relaxed">{incident.description}</dd></div>}
            </dl>
          </div>

          {/* Reporter */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-[#0f1f17] mb-4">Reporter</h2>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div><dt className="text-gray-500 text-xs">Name</dt><dd className="text-[#0f1f17] font-medium mt-0.5">{incident.reporter_name || '—'}</dd></div>
              <div><dt className="text-gray-500 text-xs">Email</dt><dd className="text-[#0f1f17] font-medium mt-0.5">{incident.reporter_email || '—'}</dd></div>
              {incident.reporter_phone && <div><dt className="text-gray-500 text-xs">Phone</dt><dd className="text-[#0f1f17] font-medium mt-0.5">{incident.reporter_phone}</dd></div>}
            </dl>
          </div>

          {/* Timeline */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-[#0f1f17] mb-4">Status timeline</h2>
            {incident.timeline.length === 0 ? (
              <p className="text-xs text-gray-400">No status changes recorded yet.</p>
            ) : (
              <div className="space-y-3">
                {incident.timeline.map((t, idx) => (
                  <div key={t.id} className="flex gap-4 items-start">
                    <div className="w-7 h-7 rounded-full bg-[#4a7c59]/10 border border-[#4a7c59]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#4a7c59] text-xs font-bold">{idx + 1}</span>
                    </div>
                    <div className="flex-1 pb-3 border-b border-gray-100 last:border-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[t.from_status] ?? 'bg-gray-100'}`}>{t.from_status}</span>
                        <ChevronRight size={12} className="text-gray-400" />
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[t.to_status] ?? 'bg-gray-100'}`}>{t.to_status}</span>
                        <span className="text-xs text-gray-400 ml-auto">{new Date(t.changed_at).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">by {t.changed_by}</div>
                      {t.note && <div className="text-xs text-gray-600 mt-1 italic">"{t.note}"</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions sidebar */}
        <div className="space-y-5">
          {/* Advance status */}
          {!isClosed && (
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-[#0f1f17] mb-4 flex items-center gap-2">
                <ChevronRight size={15} className="text-[#4a7c59]" /> Advance Status
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Assign to inspector</label>
                  <select
                    value={assignTo}
                    onChange={e => setAssignTo(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#0f1f17] focus:outline-none focus:border-[#4a7c59]"
                  >
                    <option value="">— keep current —</option>
                    {INSPECTORS.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Note (optional)</label>
                  <textarea
                    rows={3}
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    placeholder="Add a note for this status change…"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#0f1f17] resize-none focus:outline-none focus:border-[#4a7c59]"
                  />
                </div>
                <button
                  onClick={advance}
                  disabled={updating}
                  className="w-full py-2.5 bg-[#4a7c59] hover:bg-[#3d6b4b] text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {updating ? 'Updating…' : <><ChevronRight size={15} /> Advance to {nextStatus}</>}
                </button>
              </div>
            </div>
          )}

          {/* Status indicator */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-[#0f1f17] mb-3">Status flow</h2>
            <div className="space-y-2">
              {STATUS_FLOW.map((s, i) => {
                const idx = STATUS_FLOW.indexOf(incident.status);
                const done = i < idx;
                const current = i === idx;
                return (
                  <div key={s} className={`flex items-center gap-2 text-xs ${current ? 'text-[#4a7c59] font-semibold' : done ? 'text-gray-400' : 'text-gray-300'}`}>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${current ? 'border-[#4a7c59] bg-[#4a7c59]/10' : done ? 'border-gray-300 bg-gray-50' : 'border-gray-200'}`}>
                      {done ? <CheckCircle2 size={12} className="text-gray-400" /> : current ? <Clock size={11} className="text-[#4a7c59]" /> : <span className="text-[9px] text-gray-300">{i + 1}</span>}
                    </div>
                    <span className="capitalize">{s}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {incident.assigned_to && (
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-[#0f1f17] mb-2 flex items-center gap-2"><UserCheck size={14} className="text-[#4a7c59]" /> Assigned Inspector</h2>
              <p className="text-sm text-[#0f1f17] font-medium">{incident.assigned_to}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

