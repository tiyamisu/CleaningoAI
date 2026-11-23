import Link from 'next/link';
import { Building2, FlaskConical, Users, Globe2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const SOLUTIONS = [
  {
    icon: Building2,
    audience: 'For Municipal Corporations (BBMP)',
    title: 'Ward-Level Environmental Priority Intelligence',
    desc: 'Empower municipal solid waste engineers and ward officers to transition from reactive grievance handling to proactive, data-driven intervention based on dump severity and flood-risk proximity.',
    features: [
      'Interactive GIS map with zone-level risk distribution',
      'Automated incident queues with standard INC-YYYY-NNNNN identifiers',
      'Inspector dispatching with active workload balancing',
      'Persistent status transitions with verifiable audit trails',
      'Ward-by-ward historical accumulation analytics',
    ],
    cta: 'Open Operations Portal',
    href: '/ops',
  },
  {
    icon: FlaskConical,
    audience: 'For Academic & Environmental Researchers',
    title: 'Open Empirical Datasets & Experimental Workspace',
    desc: 'A dedicated research environment supporting ground-truth validation, model benchmarking, spatial clustering experiments, and publication-ready data export.',
    features: [
      'Access to 71 GPS-verified Bengaluru coordinates',
      'Formal E1–E4 experiment tracking ledger',
      'Model registry with transparent version checkpoints',
      'Documented multi-factor severity annotation rubric',
      'CSV / JSON research data export capabilities',
    ],
    cta: 'Explore Research Workspace',
    href: '/app/research',
  },
  {
    icon: Users,
    audience: 'For Field Inspection Teams & Citizens',
    title: 'Mobile Geotagged Reporting & Field Audit Workflow',
    desc: 'Equip field sanitary inspectors and civic volunteers with a simple 4-step wizard to document ground observations, log immediate hazards, and track remediation progress.',
    features: [
      'Mobile-optimized 4-step observation wizard',
      'Automated GPS coordinate capture and reverse geocoding',
      'Hazard tagging (open burning, hazardous materials, drain blockage)',
      'Real-time incident tracking from submission to resolution',
      'Photo upload and evidence documentation',
    ],
    cta: 'Submit Incident Report',
    href: '/app/reports',
  },
  {
    icon: Globe2,
    audience: 'For Multi-City Climate Resilience',
    title: 'Scalable Framework for Indian Metropolitan Areas',
    desc: 'Designed as a modular, city-agnostic architecture easily adaptable to Hyderabad, Chennai, Mumbai, or Pune with localized spatial layers and municipal boundaries.',
    features: [
      'Portable coordinate schema and severity rubric',
      'Configurable drainage network and hydrological reference points',
      'Standardized REST APIs for smart city platform integration',
      'Modular architecture ready for PostGIS and microservice scaling',
      'Open science methodology for reproducible municipal AI',
    ],
    cta: 'Contact for Municipal Pilots',
    href: '/contact',
  },
];

export default function SolutionsPage() {
  return (
    <div className="bg-[#F7F7F0] min-h-screen pt-28 pb-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14">
        <div className="max-w-3xl">
          <Badge variant="verified">Tailored Capabilities</Badge>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#123B2E] mt-3 leading-tight">
            Engineered for Every Stakeholder in the Urban Ecosystem
          </h1>
          <p className="text-base sm:text-lg text-[rgba(23,37,31,0.75)] mt-4 leading-relaxed">
            CleaningoAI unites municipal governance, academic research, and field inspection into a single connected operational fabric.
          </p>
        </div>
      </section>

      {/* Solutions Cards */}
      <section className="bg-white py-16 border-y border-[rgba(18,59,46,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {SOLUTIONS.map((sol) => {
            const Icon = sol.icon;
            return (
              <div
                key={sol.title}
                className="editorial-card p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-[#123B2E] text-[#B6D957]">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3C9290]">
                      {sol.audience}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-2xl text-[#123B2E]">{sol.title}</h3>
                  <p className="text-sm text-[rgba(23,37,31,0.7)] leading-relaxed">{sol.desc}</p>

                  <div className="pt-2">
                    <Link href={sol.href}>
                      <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                        {sol.cta}
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#F7F7F0] p-6 rounded-xl border border-[rgba(18,59,46,0.08)]">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#123B2E] block mb-3">
                    Key Features Included
                  </span>
                  <ul className="space-y-2">
                    {sol.features.map((f) => (
                      <li key={f} className="text-xs text-[rgba(23,37,31,0.75)] flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#123B2E] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
