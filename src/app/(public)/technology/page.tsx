import { CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

const PIPELINE = [
  {
    step: '01',
    title: 'Field Geodata Acquisition',
    desc: 'GPS-logged field photographs captured across 14 Bengaluru zones. Each observation is tagged with WGS-84 coordinates, area labels, waste composition, size scale, and observed burning.',
    tech: 'Mobile Geotagging · WGS-84 GPS · JPEG imagery',
    status: 'Completed',
    statusVariant: 'low' as const,
  },
  {
    step: '02',
    title: 'Computer Vision Waste Detection',
    desc: 'Deep learning models (YOLOv8 and YOLOv11) detect and segment waste instances in street-level imagery across mixed municipal, plastic dominant, and construction categories.',
    tech: 'YOLOv8 · PyTorch · OpenCV · Zero-shot baseline',
    status: 'Demo Mode (Experiments Pending)',
    statusVariant: 'demo' as const,
  },
  {
    step: '03',
    title: 'Severity Scoring Engine',
    desc: 'Multi-factor severity scoring maps observation features into an objective 0–7 index factoring waste accumulation volume, burning status, and site vulnerability.',
    tech: 'Rule-Based Rubric · Multi-Variable Model · Field Verified',
    status: 'Completed (71 Sites Graded)',
    statusVariant: 'low' as const,
  },
  {
    step: '04',
    title: 'DBSCAN Spatial Clustering',
    desc: 'Density-based spatial algorithms cluster observations into statistically valid waste accumulation hotspots across municipal ward boundaries.',
    tech: 'DBSCAN · GeoPandas · Shapely · PostGIS',
    status: 'Demo Mode (E3 Pending)',
    statusVariant: 'demo' as const,
  },
  {
    step: '05',
    title: 'HydroRisk Drainage Network Analysis',
    desc: 'Graph-theoretic modeling measuring topological and Euclidean proximity from waste sites to major Bengaluru storm drains and lakes to calculate flash flood risk.',
    tech: 'NetworkX · Graph Theory · 10 Bengaluru Water Reference Points',
    status: 'Synthetic Demo (Topology Unverified)',
    statusVariant: 'demo' as const,
  },
  {
    step: '06',
    title: 'Municipal Incident Management',
    desc: 'Enterprise operations portal generating standard INC-YYYY-NNNNN identifiers, dispatching field inspectors, and maintaining an auditable status transition timeline.',
    tech: 'SQLite (Dev) / PostgreSQL (Target) · Next.js Server Actions · REST APIs',
    status: 'Functional',
    statusVariant: 'low' as const,
  },
];

const TECH_STACK = [
  { layer: 'Frontend SaaS', items: ['Next.js 16 App Router', 'React 19 & TypeScript', 'Tailwind CSS v4', 'Plus Jakarta Sans & Inter', 'Lucide Icon System'] },
  { layer: 'Mapping & Visuals', items: ['Leaflet & React-Leaflet', 'Recharts Analytics', 'Custom Tile Layers', 'Interactive Marker Clustering'] },
  { layer: 'Machine Vision (Planned)', items: ['YOLOv8 / YOLOv11 Checkpoints', 'PyTorch 2.x Inference Runtime', 'Roboflow Annotation Schema'] },
  { layer: 'Geospatial Analytics', items: ['GeoPandas & Shapely', 'NetworkX Graph Algorithms', 'WGS-84 Coordinate Transform'] },
  { layer: 'Data & Persistence', items: ['better-sqlite3 (Local Dev)', 'PostgreSQL / PostGIS (Target)', 'Relational Schema & Audit Trails'] },
];

export default function TechnologyPage() {
  return (
    <div className="bg-[#F7F7F0] min-h-screen pt-28 pb-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14">
        <div className="max-w-3xl">
          <Badge variant="verified">Technical Architecture</Badge>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#123B2E] mt-3 leading-tight">
            The Analytical Pipeline: From Street Photograph to Municipal Action
          </h1>
          <p className="text-base sm:text-lg text-[rgba(23,37,31,0.75)] mt-4 leading-relaxed">
            CleaningoAI unites computer vision, spatial clustering, and drainage graph algorithms into a structured 6-stage pipeline. Every component has its operational status transparently documented.
          </p>
        </div>
      </section>

      {/* 6-Stage Pipeline */}
      <section className="bg-white py-16 border-y border-[rgba(18,59,46,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3C9290]">
              End-to-End Processing
            </span>
            <h2 className="font-heading font-bold text-3xl text-[#123B2E] mt-2">
              Six-Stage Analytical Pipeline
            </h2>
          </div>

          <div className="space-y-4">
            {PIPELINE.map((stage) => (
              <div
                key={stage.step}
                className="editorial-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-5">
                  <span className="text-2xl font-heading font-extrabold text-[#B6D957] bg-[#123B2E] w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                    {stage.step}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="font-heading font-bold text-lg text-[#123B2E]">{stage.title}</h3>
                      <Badge variant={stage.statusVariant}>{stage.status}</Badge>
                    </div>
                    <p className="text-xs text-[rgba(23,37,31,0.7)] mt-1.5 max-w-3xl leading-relaxed">
                      {stage.desc}
                    </p>
                    <div className="mt-2 text-[11px] font-mono text-[rgba(18,59,46,0.7)] bg-[#F7F7F0] px-2.5 py-1 rounded w-fit border border-[rgba(18,59,46,0.06)]">
                      {stage.tech}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3C9290]">
            System Specifications
          </span>
          <h2 className="font-heading font-bold text-3xl text-[#123B2E] mt-2">
            Enterprise Technology Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_STACK.map((layer) => (
            <div key={layer.layer} className="editorial-card p-6">
              <span className="text-xs font-mono font-bold text-[#123B2E] uppercase tracking-wider block mb-4 border-b border-[rgba(18,59,46,0.08)] pb-2">
                {layer.layer}
              </span>
              <ul className="space-y-2">
                {layer.items.map((item) => (
                  <li key={item} className="text-xs text-[rgba(23,37,31,0.75)] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3C9290] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
