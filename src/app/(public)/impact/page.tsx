import { MapPin, Flame, AlertTriangle, Waves } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

const ZONE_DATA = [
  { zone: 'ZONE_02-KK', name: 'Kammasandra / Konanakunte', count: 20, high: 5, med: 15, low: 0 },
  { zone: 'ZONE_03-N_C_G', name: 'Nagarbhavi / Chandralayout', count: 7, high: 5, med: 1, low: 1 },
  { zone: 'ZONE_08-FWP', name: 'Peenya Industrial Area', count: 5, high: 3, med: 2, low: 0 },
  { zone: 'ZONE_10-TF', name: 'Banashankari 6th Stage', count: 3, high: 3, med: 0, low: 0 },
  { zone: 'ZONE_11_NLG-P', name: 'Nalagedaranahalli / Peenya', count: 5, high: 2, med: 2, low: 1 },
  { zone: 'ZONE_12_AG_MAINROAD', name: 'Andhralli / Gangondanahalli', count: 7, high: 2, med: 5, low: 0 },
  { zone: 'ZONE_15_K-M_MR', name: 'Kadabagere / Madanayakanahalli', count: 5, high: 4, med: 1, low: 0 },
  { zone: 'ZONE_16_KSF', name: 'Kammasandra / Sankalpataru', count: 7, high: 3, med: 4, low: 0 },
  { zone: 'ZONE_17_M', name: 'Machohalli School Road', count: 5, high: 3, med: 2, low: 0 },
  { zone: 'ZONE_18_BSKR', name: 'Banashankari Extended', count: 3, high: 0, med: 1, low: 2 },
  { zone: 'ZONE_19_N-M-V', name: 'Nagasandra / Mallathahalli', count: 3, high: 1, med: 1, low: 1 },
  { zone: 'ZONE_20_KA', name: 'Kengeri / Lakshmipura', count: 5, high: 2, med: 2, low: 1 },
];

const FINDINGS = [
  {
    icon: Flame,
    title: 'Open Burning Observed at ~45% of Sites',
    stat: '32 Sites',
    desc: 'Illegal open waste burning is heavily prevalent along arterial road verges and vacant industrial borders, generating particulate matter and localized toxic smoke.',
  },
  {
    icon: Waves,
    title: 'Direct Drainage & Waterway Exposure',
    stat: '12 Riverbank Dumps',
    desc: 'Sites identified on canal verges or river banks in Nagarbhavi, Peenya, and Kachohalli pose extreme leachate and stormwater clogging hazards.',
  },
  {
    icon: AlertTriangle,
    title: 'Predominance of Mixed Waste',
    stat: '78.9% Composition',
    desc: 'The overwhelming majority of surveyed informal dumps consist of unsegregated municipal trash mixed with single-use plastics and packaging debris.',
  },
  {
    icon: MapPin,
    title: 'High Severity Dominance',
    stat: '42.3% High Risk',
    desc: 'Over 30 of the 71 field-surveyed coordinates scored in the High Risk category (Scores 5 to 7), requiring immediate institutional remediation.',
  },
];

export default function ImpactPage() {
  const maxCount = Math.max(...ZONE_DATA.map((z) => z.count));

  return (
    <div className="bg-[#F7F7F0] min-h-screen pt-28 pb-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14">
        <div className="max-w-3xl">
          <Badge variant="verified">Empirical Findings</Badge>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#123B2E] mt-3 leading-tight">
            What 71 GPS Observations Reveal About Greater Bengaluru
          </h1>
          <p className="text-base sm:text-lg text-[rgba(23,37,31,0.75)] mt-4 leading-relaxed">
            Derived entirely from verified field research data. No synthetic figures or fabricated metrics.
          </p>
        </div>
      </section>

      {/* Summary Stat Cards */}
      <section className="bg-white py-12 border-y border-[rgba(18,59,46,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="editorial-card p-5">
              <span className="text-3xl font-heading font-extrabold text-[#123B2E]">71</span>
              <p className="text-xs font-mono font-semibold uppercase text-[rgba(23,37,31,0.6)] mt-1">Verified Sites</p>
              <p className="text-[11px] text-[rgba(23,37,31,0.5)] mt-0.5">Physical GPS points</p>
            </div>
            <div className="editorial-card p-5">
              <span className="text-3xl font-heading font-extrabold text-[#DC2626]">30</span>
              <p className="text-xs font-mono font-semibold uppercase text-[rgba(23,37,31,0.6)] mt-1">High Severity</p>
              <p className="text-[11px] text-[rgba(23,37,31,0.5)] mt-0.5">Score 5 to 7</p>
            </div>
            <div className="editorial-card p-5">
              <span className="text-3xl font-heading font-extrabold text-[#D97706]">33</span>
              <p className="text-xs font-mono font-semibold uppercase text-[rgba(23,37,31,0.6)] mt-1">Medium Severity</p>
              <p className="text-[11px] text-[rgba(23,37,31,0.5)] mt-0.5">Score 3 to 4</p>
            </div>
            <div className="editorial-card p-5">
              <span className="text-3xl font-heading font-extrabold text-[#16A34A]">8</span>
              <p className="text-xs font-mono font-semibold uppercase text-[rgba(23,37,31,0.6)] mt-1">Low Severity</p>
              <p className="text-[11px] text-[rgba(23,37,31,0.5)] mt-0.5">Score 0 to 2</p>
            </div>
          </div>
        </div>
      </section>

      {/* Zone Chart */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3C9290]">
            Spatial Distribution
          </span>
          <h2 className="font-heading font-bold text-3xl text-[#123B2E] mt-2">
            Observation Density by Bengaluru Zone
          </h2>
        </div>

        <div className="editorial-card p-6 space-y-4">
          {ZONE_DATA.map((z) => (
            <div key={z.zone} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs font-mono">
              <div className="w-56 shrink-0">
                <span className="font-bold text-[#123B2E]">{z.name}</span>
                <span className="text-[10px] text-[rgba(23,37,31,0.5)] block">{z.zone}</span>
              </div>

              <div className="flex-1 h-5 bg-[#F0F2EE] rounded-full overflow-hidden flex">
                <div
                  className="bg-[#DC2626] h-full"
                  style={{ width: `${(z.high / maxCount) * 100}%` }}
                  title={`High: ${z.high}`}
                />
                <div
                  className="bg-[#D97706] h-full"
                  style={{ width: `${(z.med / maxCount) * 100}%` }}
                  title={`Medium: ${z.med}`}
                />
                <div
                  className="bg-[#16A34A] h-full"
                  style={{ width: `${(z.low / maxCount) * 100}%` }}
                  title={`Low: ${z.low}`}
                />
              </div>

              <span className="text-[#123B2E] font-bold shrink-0 w-20 text-right">{z.count} sites</span>
            </div>
          ))}

          <div className="pt-4 border-t border-[rgba(18,59,46,0.08)] flex items-center justify-end gap-6 text-xs font-mono">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" /> High Severity</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" /> Medium Severity</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" /> Low Severity</span>
          </div>
        </div>
      </section>

      {/* Key Findings */}
      <section className="bg-white py-16 border-t border-[rgba(18,59,46,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3C9290]">
              Field Insights
            </span>
            <h2 className="font-heading font-bold text-3xl text-[#123B2E] mt-2">
              Key Insights from Ground-Truth Inspection
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FINDINGS.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="editorial-card p-6 flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#F7F7F0] border border-[rgba(18,59,46,0.1)] flex items-center justify-center shrink-0 text-[#123B2E]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#3C9290]">{f.stat}</span>
                    <h3 className="font-heading font-bold text-lg text-[#123B2E] mt-0.5">{f.title}</h3>
                    <p className="text-xs text-[rgba(23,37,31,0.7)] mt-2 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
