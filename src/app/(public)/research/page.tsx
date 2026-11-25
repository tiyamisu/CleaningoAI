import { AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

const EXPERIMENTS = [
  {
    id: 'E1',
    title: 'Zero-Shot YOLOv8 Detection Baseline',
    rq: 'RQ1: Can pretrained general-domain object detectors accurately detect mixed, plastic, and construction waste on raw Indian urban street verges without domain-specific training?',
    method: 'Apply zero-shot YOLOv8-S on field photographs and benchmark against manual bounding-box annotations using mAP@50 and recall.',
    status: 'Pending',
    note: 'Experimental protocol defined. Pending execution.',
  },
  {
    id: 'E2',
    title: 'Domain Fine-Tuning on Bengaluru Dataset',
    rq: 'RQ2: To what extent does fine-tuning on a localized dataset of Indian street photos improve classification accuracy over zero-shot baselines?',
    method: 'Annotate field images with standard Roboflow bounding boxes. Fine-tune YOLO weights with geometric augmentation. Measure precision/recall delta.',
    status: 'Pending',
    note: 'Annotation pipeline established. Training pending.',
  },
  {
    id: 'E3',
    title: 'DBSCAN Geospatial Clustering',
    rq: 'RQ3: Can density-based clustering of GPS observations isolate chronic accumulation hotspots and distinguish isolated litter from systemic illegal dump points?',
    method: 'Tune epsilon and minPts parameters on 71 WGS-84 coordinates. Validate cluster cohesion and cross-zone variance.',
    status: 'Pending',
    note: 'Coordinates validated. Algorithmic benchmark pending.',
  },
  {
    id: 'E4',
    title: 'Hydrological Drainage Connectivity',
    rq: 'RQ4: How can proximity to primary storm drainage networks and urban water bodies be systematically combined with visual severity to compute flood-risk priority scores?',
    method: 'Calculate Euclidean and network distance to 10 major water bodies in Bengaluru. Synthesize multi-variable environmental priority index.',
    status: 'Synthetic Demo',
    note: 'Synthetic distance heuristics operational in platform.',
  },
];

const RUBRIC = [
  { level: 'Low (1–2)', desc: 'Small-scale accumulation (<10 m²), managed collection site, no burning observed, dry location far from waterways.' },
  { level: 'Medium (3–4)', desc: 'Moderate dump (10–50 m²), unmanaged roadside verge, mixed plastics, possible burning observed, moderate drainage proximity.' },
  { level: 'High (5–6)', desc: 'Large unmanaged dump (>50 m²), direct water body/canal proximity, active or observed open burning, hazardous materials.' },
  { level: 'Critical (7+)', desc: 'Persistent chronic accumulation blocking primary drainage channels, active leachate generation, severe public health crisis.' },
];

export default function ResearchPage() {
  return (
    <div className="bg-[#F7F7F0] min-h-screen pt-28 pb-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14">
        <div className="max-w-3xl">
          <Badge variant="verified">Academic Research Framework</Badge>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#123B2E] mt-3 leading-tight">
            Research Design, Experimental Ledger & Dataset Provenance
          </h1>
          <p className="text-base sm:text-lg text-[rgba(23,37,31,0.75)] mt-4 leading-relaxed">
            CleaningoAI operates on an academically rigorous research foundation. The experimental design and four core research questions (RQ1–RQ4) are fully articulated, with experimental execution actively underway.
          </p>

          <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Scientific Disclosure:</strong> All AI inference shown in the platform is currently simulated via a DEMO MODE adapter until experiments E1–E2 complete. No false accuracy or recall metrics are presented.
            </div>
          </div>
        </div>
      </section>

      {/* Research Paper Abstract Card */}
      <section className="bg-white py-16 border-y border-[rgba(18,59,46,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="editorial-card p-8 bg-[#123B2E] text-white">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B6D957]">
              Working Title & Proposal
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl mt-2 text-white leading-snug">
              Automated Detection, Classification and Environmental Prioritisation of Informal Solid Waste Accumulation in Urban India Using Computer Vision and Geospatial Intelligence: A Bengaluru Pilot Study
            </h2>
            <div className="mt-6 pt-6 border-t border-white/10 text-xs text-[#DCE8DA]/85 space-y-3 leading-relaxed">
              <p>
                <strong>Abstract:</strong> Rapidly expanding metropolitan areas in the Global South face acute solid waste governance challenges characterized by informal accumulation along transportation corridors, open vacant plots, and vulnerable drainage channels. Existing municipal reporting mechanisms lack the spatial granularity and hydrological context required to prioritize intervention.
              </p>
              <p>
                This study introduces a multi-tier framework integrating street-level object detection (YOLO architecture), multi-factor severity grading, and graph-theoretic proximity analysis to major drainage waterways. Using a primary field dataset of 71 GPS-verified observation points across 14 urban zones in Bengaluru, Karnataka, we demonstrate how objective environmental priority scoring can direct municipal cleanup resources to mitigate flood risk and environmental degradation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experiments E1–E4 */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3C9290]">
            The Four Experiments
          </span>
          <h2 className="font-heading font-bold text-3xl text-[#123B2E] mt-2">
            Structured Experimental Protocol
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EXPERIMENTS.map((exp) => (
            <div key={exp.id} className="editorial-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-[#123B2E] bg-[#DCE8DA] px-2.5 py-1 rounded">
                    {exp.id}
                  </span>
                  <Badge variant={exp.status === 'Synthetic Demo' ? 'teal' : 'demo'}>
                    {exp.status}
                  </Badge>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#123B2E]">{exp.title}</h3>
                <p className="text-xs font-mono text-[#3C9290] mt-1 font-semibold">{exp.rq}</p>
                <p className="text-xs text-[rgba(23,37,31,0.7)] mt-3 leading-relaxed">{exp.method}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-[rgba(18,59,46,0.08)] text-[11px] font-mono text-[rgba(23,37,31,0.55)]">
                Status: {exp.note}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Severity Rubric */}
      <section className="bg-white py-16 border-t border-[rgba(18,59,46,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3C9290]">
              Standardized Rubric
            </span>
            <h2 className="font-heading font-bold text-3xl text-[#123B2E] mt-2">
              Multi-Factor Severity Annotation Protocol
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RUBRIC.map((item) => (
              <div key={item.level} className="editorial-card p-5">
                <span className="text-xs font-mono font-bold text-[#123B2E] bg-[#F7F7F0] px-2.5 py-1 rounded inline-block mb-3 border border-[rgba(18,59,46,0.08)]">
                  {item.level}
                </span>
                <p className="text-xs text-[rgba(23,37,31,0.7)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
