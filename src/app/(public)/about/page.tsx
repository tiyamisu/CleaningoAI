import Link from 'next/link';
import { MapPin, Target, Microscope, Globe2, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

const ZONES = [
  { id: 'ZONE_02-KK', name: 'Kammasandra / Konanakunte', sites: 20 },
  { id: 'ZONE_03-N_C_G', name: 'Nagarbhavi / Chandralayout', sites: 7 },
  { id: 'ZONE_08-FWP', name: 'Peenya Industrial Area', sites: 5 },
  { id: 'ZONE_10-TF', name: 'Banashankari 6th Stage', sites: 3 },
  { id: 'ZONE_11_NLG-P', name: 'Nalagedaranahalli / Peenya', sites: 5 },
  { id: 'ZONE_12_AG_MAINROAD', name: 'Andhralli / Gangondanahalli', sites: 7 },
  { id: 'ZONE_15_K-M_MR', name: 'Kadabagere / Madanayakanahalli', sites: 5 },
  { id: 'ZONE_16_KSF', name: 'Kammasandra / Sankalpataru', sites: 7 },
  { id: 'ZONE_17_M', name: 'Machohalli School Road', sites: 5 },
  { id: 'ZONE_18_BSKR', name: 'Banashankari Extended', sites: 3 },
  { id: 'ZONE_19_N-M-V', name: 'Nagasandra / Mallathahalli', sites: 3 },
  { id: 'ZONE_20_KA', name: 'Kengeri / Lakshmipura', sites: 5 },
];

const PRINCIPLES = [
  {
    title: 'Scientific Rigour & Provenance',
    body: 'All 71 observation points represent real, GPS-logged ground truth collected in Bengaluru between 2025 and 2026. Synthetic demonstrations and experimental proposals are explicitly separated from empirical data.',
    tag: 'Empirical Foundation',
  },
  {
    title: 'Geospatial Hydrology',
    body: 'Solid waste severity cannot be assessed in a vacuum. Proximity to stormwater drains, arterial canals, and wetlands is essential to prioritize cleanup before flooding and toxic leachate occur.',
    tag: 'Hydraulic Context',
  },
  {
    title: 'Institutional Accountability',
    body: 'Designed to equip municipal corporations (such as BBMP) and ward engineers with structured incident queues, inspector dispatching, and persistent audit logs rather than ephemeral complaint boards.',
    tag: 'Municipal Action',
  },
  {
    title: 'Ethical AI Transparency',
    body: 'We explicitly declare when models run in DEMO MODE versus verified production checkpoints. No false accuracy metrics or invented accuracy claims are ever displayed.',
    tag: 'Zero Hallucination',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#F7F7F0] min-h-screen pt-28 pb-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="max-w-3xl">
          <Badge variant="verified">Academic Research & Municipal Startup</Badge>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#123B2E] mt-3 leading-tight">
            Urban Waste Intelligence Grounded in Ground-Truth Reality
          </h1>
          <p className="text-base sm:text-lg text-[rgba(23,37,31,0.75)] mt-4 leading-relaxed">
            CleaningoAI was initiated to solve a fundamental urban challenge: informal solid waste accumulation in rapidly growing Indian cities. By combining machine vision, spatial clustering, and drainage proximity analysis, we transform reactive municipal maintenance into proactive environmental governance.
          </p>
        </div>
      </section>

      {/* Field Study Details */}
      <section className="bg-white py-16 border-y border-[rgba(18,59,46,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3C9290]">
                The Bengaluru Pilot Study
              </span>
              <h2 className="font-heading font-bold text-3xl text-[#123B2E]">
                71 GPS-Verified Observation Coordinates Across Greater Bengaluru
              </h2>
              <p className="text-sm text-[rgba(23,37,31,0.75)] leading-relaxed">
                Between January 2025 and May 2026, our research team conducted physical field surveys across 14 distinct urban and peri-urban zones in Bengaluru, Karnataka.
              </p>
              <p className="text-sm text-[rgba(23,37,31,0.75)] leading-relaxed">
                Every record captures high-resolution GPS coordinates, waste composition (Mixed municipal, Plastic dominant, or Construction debris), estimated size scale, open burning observations, and immediate site context (roadside verges, open unprotected plots, or river/canal banks).
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[rgba(18,59,46,0.08)]">
                <div>
                  <span className="text-2xl font-bold font-heading text-[#123B2E]">71</span>
                  <p className="text-xs font-mono text-[rgba(23,37,31,0.6)] mt-0.5">Physical Sites</p>
                </div>
                <div>
                  <span className="text-2xl font-bold font-heading text-[#123B2E]">14</span>
                  <p className="text-xs font-mono text-[rgba(23,37,31,0.6)] mt-0.5">Wards & Zones</p>
                </div>
                <div>
                  <span className="text-2xl font-bold font-heading text-[#123B2E]">3</span>
                  <p className="text-xs font-mono text-[rgba(23,37,31,0.6)] mt-0.5">Waste Types</p>
                </div>
              </div>
            </div>

            {/* Zone Grid */}
            <div className="lg:col-span-6 bg-[#F7F7F0] p-6 rounded-2xl border border-[rgba(18,59,46,0.1)]">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#123B2E] mb-4">
                Surveyed Zones & Field Density
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ZONES.map((zone) => (
                  <div
                    key={zone.id}
                    className="bg-white p-3 rounded-lg border border-[rgba(18,59,46,0.08)] flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-mono font-bold text-[#123B2E]">{zone.id}</span>
                      <p className="text-[11px] text-[rgba(23,37,31,0.6)] truncate max-w-[150px]">{zone.name}</p>
                    </div>
                    <span className="font-mono text-[#3C9290] font-bold shrink-0">{zone.sites} sites</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3C9290]">
            Research Values
          </span>
          <h2 className="font-heading font-bold text-3xl text-[#123B2E] mt-2">
            The Principles Guiding Our Engineering
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="editorial-card p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#3C9290] bg-[#3C9290]/10 px-2.5 py-1 rounded">
                  {p.tag}
                </span>
                <h3 className="font-heading font-bold text-lg text-[#123B2E] mt-4">{p.title}</h3>
                <p className="text-xs text-[rgba(23,37,31,0.7)] mt-2 leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#123B2E] text-white rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl">Explore the Live Bengaluru Map</h2>
            <p className="text-sm text-[#DCE8DA]/80 mt-1">See all 71 observation points, risk scores, and site context.</p>
          </div>
          <Link href="/app/map">
            <Button variant="lime" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Open GeoIntel Map
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
