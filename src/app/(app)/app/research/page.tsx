'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface ResearchData {
  dataset?: {
    total: number;
    annotated: number;
    pending: number;
    zones: string[];
    split_strategy: string;
  };
  experiments?: {
    id: string;
    name: string;
    approach: string;
    description: string;
    status: string;
    notes: string;
  }[];
  model_registry?: {
    id: string;
    name: string;
    version: string;
    status: string;
    note: string;
  }[];
}

const RESEARCH_QUESTIONS = [
  {
    id: 'RQ1',
    question: 'How accurately can deep learning vision models localize and classify informal solid waste in complex urban Indian environments?',
    metric: 'mAP@0.5, Precision, Recall on custom Bengaluru dataset',
    status: 'Planned · not run',
  },
  {
    id: 'RQ2',
    question: 'Does integrating drainage network connectivity alter waste clearance prioritization compared to Euclidean distance alone?',
    metric: 'Spearman rank correlation between E1 (Euclidean) and E4 (Network)',
    status: 'Proposed · no benchmark',
  },
  {
    id: 'RQ3',
    question: 'Can multi-modal geospatial telemetry reduce municipal response latency for high-risk monsoon flood choke points?',
    metric: 'Simulated dispatch MTTR (Mean Time to Remediation)',
    status: 'Not evaluated',
  },
];

export default function ResearchWorkspacePage() {
  const [data, setData] = useState<ResearchData>({});

  useEffect(() => {
    fetch('/api/research')
      .then((r) => r.json())
      .then((d) => {
        setData(d);
      })
      .catch(() => {});
  }, []);

  const ds = data.dataset;
  const exps = data.experiments || [];
  const models = data.model_registry || [];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold tracking-wider text-[#3C9290] uppercase">
            Module 07 · Academic Science
          </span>
          <Badge variant="neutral">Proposal Stage</Badge>
        </div>
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#123B2E] tracking-tight mt-1">
          Research Workspace & Experiment Ledger
        </h1>
        <p className="text-sm text-[#17251F]/70 mt-1 max-w-3xl">
          A workspace for the proposed study. Experiments are pending, the model is not integrated, and human severity annotations have not yet been collected.
        </p>
      </div>

      {/* Dataset Stratification Overview */}
      <Card variant="editorial">
        <CardHeader className="pb-3 border-b border-[rgba(18,59,46,0.06)]">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-heading">
              Bengaluru Field Dataset
            </CardTitle>
            <Badge variant="verified">{ds?.total ?? 0} GPS Observations</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-[#F7F7F0] rounded-xl border border-[rgba(18,59,46,0.08)]">
              <span className="text-[10px] font-mono font-bold uppercase text-[#123B2E]/60 block">OBSERVATIONS</span>
              <p className="font-heading font-extrabold text-2xl text-[#123B2E] mt-1">{ds?.total ?? 0}</p>
              <p className="text-xs text-[#17251F]/60 mt-0.5">GPS-referenced field records</p>
            </div>
            <div className="p-4 bg-[#F7F7F0] rounded-xl border border-[rgba(18,59,46,0.08)]">
              <span className="text-[10px] font-mono font-bold uppercase text-[#123B2E]/60 block">HUMAN ANNOTATIONS</span>
              <p className="font-heading font-extrabold text-2xl text-[#123B2E] mt-1">{ds?.annotated ?? 0} / {ds?.total ?? 0}</p>
              <p className="text-xs text-[#17251F]/60 mt-0.5">Severity labels recorded</p>
            </div>
            <div className="p-4 bg-[#F7F7F0] rounded-xl border border-[rgba(18,59,46,0.08)]">
              <span className="text-[10px] font-mono font-bold uppercase text-[#123B2E]/60 block">EXPERIMENT SPLIT</span>
              <p className="font-heading font-extrabold text-2xl text-[#123B2E] mt-1">Not run</p>
              <p className="text-xs text-[#17251F]/60 mt-0.5">Site-level spatial holdout proposed</p>
            </div>
          </div>
          <p className="text-xs text-[#17251F]/70 leading-relaxed">{ds?.split_strategy}</p>
        </CardContent>
      </Card>

      {/* Core Research Questions (RQ1–RQ3) */}
      <div>
        <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-3">
          Research Questions & Hypotheses
        </p>
        <div className="space-y-3">
          {RESEARCH_QUESTIONS.map((rq) => (
            <div
              key={rq.id}
              className="p-4 bg-white rounded-xl border border-[rgba(18,59,46,0.1)] flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#123B2E] text-white">
                    {rq.id}
                  </span>
                  <span className="text-xs font-mono text-[#3C9290] font-semibold">
                    {rq.status}
                  </span>
                </div>
                <h4 className="font-heading font-bold text-sm text-[#123B2E] mt-1">
                  {rq.question}
                </h4>
                <p className="text-xs text-[#17251F]/60">
                  <strong className="font-mono text-[#123B2E]/80">Primary Metric:</strong> {rq.metric}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experiment Progression Ledger (E1–E4) */}
      <Card variant="editorial">
        <CardHeader className="pb-3 border-b border-[rgba(18,59,46,0.06)]">
          <CardTitle className="text-base font-heading">
            Formal Experiment Ledger (E1 – E4)
          </CardTitle>
          <p className="text-xs text-[#17251F]/60">
            Proposed methods and current status. No experiment results are available yet.
          </p>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#F7F7F0]/60 border-b border-[rgba(18,59,46,0.06)] font-mono font-bold text-[#123B2E]/70 uppercase text-[10px]">
                <th className="px-4 py-3">Experiment</th>
                <th className="px-4 py-3">Approach & Hypothesis</th>
                <th className="px-4 py-3">Methodology</th>
                <th className="px-4 py-3">Current Status</th>
                <th className="px-4 py-3">Notes & Output</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(18,59,46,0.05)]">
              {exps.map((e) => (
                <tr key={e.id} className="hover:bg-[#F7F7F0]/40 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-[#123B2E]">
                    {e.id}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-heading font-semibold text-[#17251F]">{e.name}</div>
                    <span className="text-[11px] text-[#17251F]/60">{e.approach}</span>
                  </td>
                  <td className="px-4 py-3 text-[11px] text-[#17251F]/80">
                    {e.description}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                        e.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : e.status === 'demo'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {e.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[11px] font-mono text-[#17251F]/60">
                    {e.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Model Registry Table */}
      <Card variant="editorial">
        <CardHeader className="pb-3 border-b border-[rgba(18,59,46,0.06)]">
          <CardTitle className="text-base font-heading">
            Computer Vision Model Registry
          </CardTitle>
          <p className="text-xs text-[#17251F]/60">
            Registered model weights, evaluation checkpoints, and active inference adapters
          </p>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#F7F7F0]/60 border-b border-[rgba(18,59,46,0.06)] font-mono font-bold text-[#123B2E]/70 uppercase text-[10px]">
                <th className="px-4 py-3">Model Tag</th>
                <th className="px-4 py-3">Architecture</th>
                <th className="px-4 py-3">Version</th>
                <th className="px-4 py-3">Deployment Status</th>
                <th className="px-4 py-3">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(18,59,46,0.05)]">
              {models.map((m) => (
                <tr key={m.id} className="hover:bg-[#F7F7F0]/40 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-[#123B2E]">
                    {m.id}
                  </td>
                  <td className="px-4 py-3 font-heading font-semibold text-[#17251F]">
                    {m.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[#3C9290]">
                    {m.version}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                        m.status === 'active_demo'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {m.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[11px] text-[#17251F]/70">
                    {m.note}
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
