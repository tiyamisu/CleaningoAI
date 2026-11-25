'use client';

import Link from 'next/link';
import {
  Globe,
  FlaskConical,
  Layers,
  Database,
  ArrowRight,
  BookOpen,
  FileText,
  Cpu,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const RESEARCH_AREAS = [
  {
    href: '/research-platform/literature',
    icon: BookOpen,
    label: 'Scientific Literature & Patent Intelligence',
    desc: 'Search and synthesize environmental science literature, patents, and grey literature across waste, water, air, and chemical domains.',
    badge: 'Coming Soon',
  },
  {
    href: '/research-platform/materials',
    icon: Layers,
    label: 'Material Discovery',
    desc: 'Discover and characterise novel materials for environmental remediation, circular economy, and sustainable manufacturing.',
    badge: 'Coming Soon',
  },
  {
    href: '/research-platform/chemical',
    icon: FlaskConical,
    label: 'Chemical Research',
    desc: 'Chemical substance profiling, reaction pathway analysis, and toxicological assessment for environmental applications.',
    badge: 'Coming Soon',
  },
  {
    href: '/research-platform/experiments',
    icon: Cpu,
    label: 'AI Experiment Studio',
    desc: 'Design, track, and analyse machine learning experiments. Current focus: waste detection, severity classification, geospatial clustering.',
    badge: 'Active',
  },
  {
    href: '/research-platform/simulation',
    icon: Globe,
    label: 'Simulation Workspace',
    desc: 'Environmental system simulation including drainage network modelling, contaminant transport, and ecosystem dynamics.',
    badge: 'Coming Soon',
  },
  {
    href: '/research-platform/datasets',
    icon: Database,
    label: 'Dataset Repository',
    desc: '71 verified Bengaluru field observations with GPS coordinates, waste classification, severity scores, and site metadata.',
    badge: 'Live Data',
  },
  {
    href: '/research-platform/publications',
    icon: FileText,
    label: 'Research Publication Centre',
    desc: 'Manage, review, and publish research findings from CleaningoAI field studies and AI experiments.',
    badge: 'Coming Soon',
  },
];

const CURRENT_EXPERIMENTS = [
  { id: 'E1', title: 'Zero-Shot YOLOv8 Detection Baseline', status: 'pending', focus: 'Baseline mAP@50 on urban waste images' },
  { id: 'E2', title: 'Domain Fine-Tuning on Bengaluru Dataset', status: 'pending', focus: 'Context-specific feature extraction' },
  { id: 'E3', title: 'DBSCAN Geospatial Clustering', status: 'pending', focus: 'Chronic accumulation hotspot identification' },
  { id: 'E4', title: 'Drainage Connectivity Risk Modeling', status: 'demo', focus: 'Multi-variable composite risk ranking' },
];

export default function ResearchPlatformPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-[rgba(18,59,46,0.08)]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#B6D957]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3C9290]">
              Research & Innovation Platform
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-[#123B2E]">
            Global Research Explorer
          </h1>
          <p className="text-sm text-[rgba(23,37,31,0.65)] mt-2 max-w-2xl leading-relaxed">
            Scientific discovery, AI experimentation, and environmental data publication.
            Anchored by four active research experiments and 71 verified Bengaluru field observations.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/research-platform/experiments">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4 text-[#B6D957]" />}>
              Open Experiment Studio
            </Button>
          </Link>
        </div>
      </div>

      {/* Research Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { label: 'Active Experiments', value: '4', sub: 'E1 – E4 research agenda', icon: Cpu, color: 'text-[#3C9290]' },
          { label: 'Dataset Records', value: '71', sub: 'Bengaluru GPS observations', icon: Database, color: 'text-[#123B2E]' },
          { label: 'Publication Status', value: 'Draft', sub: 'Academic paper in preparation', icon: FileText, color: 'text-amber-600' },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="editorial-card p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#F7F7F0] border border-[rgba(18,59,46,0.1)] flex items-center justify-center shrink-0">
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <div className="text-2xl font-heading font-extrabold text-[#123B2E]">{s.value}</div>
                <div className="text-xs font-mono font-semibold text-[rgba(23,37,31,0.65)]">{s.label}</div>
                <div className="text-[11px] text-[rgba(23,37,31,0.45)] mt-0.5">{s.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Core Research Question */}
      <div className="bg-[#123B2E] rounded-2xl p-7 text-white">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B6D957]">
          Primary Research Question
        </span>
        <p className="mt-3 font-heading font-semibold text-xl leading-relaxed text-white">
          Can machine vision and spatial network analysis systematically predict and prioritize informal solid waste
          intervention across dense Indian urban environments?
        </p>
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
          {CURRENT_EXPERIMENTS.map((exp) => (
            <div key={exp.id} className="bg-[#0B2922] rounded-lg p-3 border border-white/10">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-bold text-[#B6D957] uppercase">{exp.id}</span>
                <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-bold ${
                  exp.status === 'demo' ? 'bg-amber-500/20 text-amber-400' : 'bg-white/10 text-white/50'
                }`}>
                  {exp.status === 'demo' ? 'Synth Demo' : 'Pending'}
                </span>
              </div>
              <p className="text-xs text-white/90 font-medium leading-tight">{exp.title}</p>
              <p className="text-[10px] text-white/50 mt-1">{exp.focus}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Research Area Grid */}
      <div>
        <h2 className="font-heading font-bold text-xl text-[#123B2E] mb-5">Research Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {RESEARCH_AREAS.map((area) => {
            const Icon = area.icon;
            return (
              <Link
                key={area.href}
                href={area.href}
                className="editorial-card p-6 flex flex-col justify-between group hover:border-[#123B2E]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#123B2E] text-[#B6D957] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant={area.badge === 'Active' || area.badge === 'Live Data' ? 'verified' : 'neutral'}>
                      {area.badge}
                    </Badge>
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#123B2E] group-hover:text-[#3C9290] transition-colors leading-tight">
                    {area.label}
                  </h3>
                  <p className="text-xs text-[rgba(23,37,31,0.65)] mt-2 leading-relaxed">{area.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-[rgba(18,59,46,0.06)] flex items-center justify-between text-xs font-mono text-[#123B2E]">
                  <span>{area.badge === 'Coming Soon' ? 'View roadmap' : 'Open module'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
