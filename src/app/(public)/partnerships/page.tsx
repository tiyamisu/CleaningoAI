import { GraduationCap, Building, Heart, Globe, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const PARTNERSHIPS = [
  {
    icon: GraduationCap,
    type: 'Academic & University Research',
    title: 'Research Consortium & Data Sharing',
    desc: 'Collaborate on joint peer-reviewed publications, student research theses, and grant applications in machine vision, urban hydrology, and waste informatics.',
    deliverables: [
      'Access to full 71-site Bengaluru WGS-84 coordinate dataset',
      'Shared YOLO model benchmarking framework',
      'Joint academic authorship on journal submissions',
      'Open-source research tooling and code repositories',
    ],
    contact: 'research@cleaningoai.in',
  },
  {
    icon: Building,
    type: 'Municipal Corporations (BBMP / BDA)',
    title: 'Municipal Pilot Deployment & Policy Support',
    desc: 'Deploy CleaningoAI for live ward-level waste tracking, operational inspector dispatching, and evidence-based decision support in Greater Bengaluru.',
    deliverables: [
      'Dedicated operations portal instance with role-based logins',
      'Customized ward boundary and drainage layer integration',
      'Inspector workload management and SLA compliance tracking',
      'Quarterly waste severity audit and policy briefs',
    ],
    contact: 'municipal@cleaningoai.in',
  },
  {
    icon: Heart,
    type: 'Environmental NGOs & Civic Groups',
    title: 'Community Ground-Truthing & Incident Reporting',
    desc: 'Empower volunteer ward clean-up groups, resident welfare associations, and environmental non-profits with mobile-ready geotagged reporting.',
    deliverables: [
      'Structured 4-step mobile reporting workflow',
      'Permanent incident tracking IDs for municipal follow-up',
      'Community training on severity annotation rubrics',
      'Aggregated ward cleanup transparency dashboards',
    ],
    contact: 'community@cleaningoai.in',
  },
  {
    icon: Globe,
    type: 'International Climate-Tech Funds',
    title: 'Startup Incubation & Multi-City Replication',
    desc: 'Scale CleaningoAI across other high-growth Indian urban corridors facing acute solid waste and drainage vulnerability (Hyderabad, Chennai, Mumbai).',
    deliverables: [
      'Standardized deployment blueprint for new municipal zones',
      'Modular cloud architecture ready for high-volume ingest',
      'Commercial SaaS business model for smart city contracts',
      'ESG and environmental impact measurement metrics',
    ],
    contact: 'partnerships@cleaningoai.in',
  },
];

export default function PartnershipsPage() {
  return (
    <div className="bg-[#F7F7F0] min-h-screen pt-28 pb-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14">
        <div className="max-w-3xl">
          <Badge variant="verified">Collaborative Deployment</Badge>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#123B2E] mt-3 leading-tight">
            Partner With Us to Scale Urban Environmental Intelligence
          </h1>
          <p className="text-base sm:text-lg text-[rgba(23,37,31,0.75)] mt-4 leading-relaxed">
            CleaningoAI actively seeks research, municipal, and institutional partners to validate, extend, and deploy environmental technology where impact is highest.
          </p>
        </div>
      </section>

      {/* Partnership Cards */}
      <section className="bg-white py-16 border-y border-[rgba(18,59,46,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {PARTNERSHIPS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.type}
                className="editorial-card p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-[#123B2E] text-[#B6D957]">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3C9290]">
                      {p.type}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-2xl text-[#123B2E]">{p.title}</h3>
                  <p className="text-sm text-[rgba(23,37,31,0.7)] leading-relaxed">{p.desc}</p>

                  <div className="pt-2">
                    <a href={`mailto:${p.contact}`}>
                      <Button variant="primary" size="md" rightIcon={<Mail className="w-4 h-4" />}>
                        Connect via {p.contact}
                      </Button>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#F7F7F0] p-6 rounded-xl border border-[rgba(18,59,46,0.08)]">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#123B2E] block mb-3">
                    Partnership Focus Areas
                  </span>
                  <ul className="space-y-2">
                    {p.deliverables.map((item) => (
                      <li key={item} className="text-xs text-[rgba(23,37,31,0.75)] flex items-start gap-2">
                        <span className="text-[#3C9290] font-bold">›</span>
                        <span>{item}</span>
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
