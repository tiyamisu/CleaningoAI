'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Eye,
  Waves,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Layers,
  Sparkles,
  BarChart3,
  Flame,
  AlertTriangle,
  Compass,
  ChevronRight,
  Database,
  Cpu,
  FileCheck2,
  Workflow,
  Building2,
  GraduationCap,
  Users2,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

/* ─── Verified Observation Demo Points for Hero Preview ───────────────────── */
const HERO_OBSERVATIONS = [
  {
    id: 'CLN_0001',
    zone: 'ZONE_10-TF',
    area: 'Banashankari 6th Stage',
    coords: '12.891694, 77.531202',
    wasteType: 'MIXED',
    riskScore: 5,
    riskLevel: 'HIGH',
    drainDist: 'Not verified',
    burning: 'YES',
    siteType: 'Roadside',
  },
  {
    id: 'CLN_0005',
    zone: 'ZONE_03-N_C_G',
    area: 'Nagarbhavi Chandralayout',
    coords: '12.959502, 77.515458',
    wasteType: 'MIXED',
    riskScore: 5,
    riskLevel: 'HIGH',
    drainDist: 'Not verified',
    burning: 'NO',
    siteType: 'River Bank',
  },
  {
    id: 'CLN_0011',
    zone: 'ZONE_02-KK',
    area: 'Kammasandra Main Road',
    coords: '13.025615, 77.449135',
    wasteType: 'PLASTIC',
    riskScore: 4,
    riskLevel: 'MEDIUM',
    drainDist: 'Not verified',
    burning: 'NO',
    siteType: 'Open Unprotected Land',
  },
];

export default function HomePage() {
  const [activeHeroObs, setActiveHeroObs] = useState(HERO_OBSERVATIONS[0]);
  const [activeLayer, setActiveLayer] = useState<'severity' | 'detection' | 'drainage'>('severity');

  return (
    <div className="bg-[#F7F7F0] min-h-screen">
      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO SECTION — Split Layout with Live GIS Panel
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-[rgba(18,59,46,0.08)] bg-gradient-to-b from-white via-[#F7F7F0] to-[#F7F7F0]">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-grid-dots opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#123B2E]/5 border border-[#123B2E]/15 text-xs font-mono font-semibold text-[#123B2E] tracking-tight">
                <span className="w-2 h-2 rounded-full bg-[#B6D957] animate-pulse" />
                <span>URBAN ENVIRONMENTAL INTELLIGENCE · BENGALURU PILOT</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#123B2E] leading-[1.08] tracking-tight">
                See Waste.<br />
                <span className="text-[#3C9290]">Understand Risk.</span><br />
                Enable Action.
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[rgba(23,37,31,0.75)] max-w-xl leading-relaxed">
                An intelligent environmental platform combining computer vision, geospatial analytics, and drainage-network context to transform unstructured field observations into prioritized municipal intervention.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto">
                <Link href="/app" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-4 h-4 text-[#B6D957]" />}
                    className="w-full sm:w-auto shadow-md"
                  >
                    Explore the Platform
                  </Button>
                </Link>
                <Link href="/research" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Discover the Research
                  </Button>
                </Link>
              </div>

              {/* Trust & Pilot Context */}
              <div className="pt-6 border-t border-[rgba(18,59,46,0.1)] grid grid-cols-3 gap-6 w-full max-w-lg">
                <div>
                  <div className="text-2xl font-bold font-heading text-[#123B2E]">71</div>
                  <div className="text-xs text-[rgba(23,37,31,0.6)] font-mono mt-0.5">Verified GPS Sites</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-heading text-[#123B2E]">14</div>
                  <div className="text-xs text-[rgba(23,37,31,0.6)] font-mono mt-0.5">Bengaluru Zones</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-heading text-[#123B2E]">100%</div>
                  <div className="text-xs text-[rgba(23,37,31,0.6)] font-mono mt-0.5">Field-Logged Provenance</div>
                </div>
              </div>
            </div>

            {/* Right Interactive GIS Product Simulation (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="bg-[#123B2E] rounded-2xl p-5 border border-[#0B2922] shadow-xl text-[#F7F7F0] relative overflow-hidden">
                {/* Decorative map background grid */}
                <div className="absolute inset-0 bg-grid-dots-light opacity-30 pointer-events-none" />

                {/* Panel Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B6D957]" />
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#B6D957]">
                      Field Observation Preview
                    </span>
                  </div>
                  <Badge variant="verified">PILOT STUDY DATA</Badge>
                </div>

                {/* Simulated Map Viewport */}
                <div className="mt-4 rounded-xl bg-[#0B2922] border border-white/10 p-4 relative overflow-hidden min-h-[200px] flex flex-col justify-between">
                  {/* Layer Selector */}
                  <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-lg w-fit text-[11px] font-mono">
                    <button
                      onClick={() => setActiveLayer('severity')}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        activeLayer === 'severity' ? 'bg-[#123B2E] text-[#B6D957] font-semibold' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Severity Layer
                    </button>
                    <button
                      onClick={() => setActiveLayer('drainage')}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        activeLayer === 'drainage' ? 'bg-[#123B2E] text-[#B6D957] font-semibold' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Drainage Context
                    </button>
                  </div>

                  {/* Interactive Site Dots */}
                  <div className="py-6 flex items-center justify-around relative">
                    {HERO_OBSERVATIONS.map((obs) => {
                      const isSelected = obs.id === activeHeroObs.id;
                      return (
                        <button
                          key={obs.id}
                          onClick={() => setActiveHeroObs(obs)}
                          className={`group relative flex flex-col items-center gap-1.5 focus:outline-none transition-transform ${
                            isSelected ? 'scale-110' : 'opacity-70 hover:opacity-100'
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border-2 transition-all ${
                              obs.riskLevel === 'HIGH'
                                ? 'bg-[#DC2626] border-white text-white shadow-lg shadow-red-500/50'
                                : 'bg-[#D97706] border-white text-white shadow-lg shadow-amber-500/50'
                            } ${isSelected ? 'ring-4 ring-[#B6D957]/50' : ''}`}
                          >
                            !
                          </div>
                          <span className="text-[10px] font-mono text-white/90 bg-black/50 px-1.5 py-0.5 rounded">
                            {obs.id}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Location label */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#DCE8DA]/70 pt-2 border-t border-white/5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#B6D957]" /> Bengaluru Core Grid
                    </span>
                    <span>WGS-84 Coordinate Mesh</span>
                  </div>
                </div>

                {/* Selected Site Telemetry Card */}
                <div className="mt-4 bg-[#0F2A22] rounded-xl p-4 border border-white/10 space-y-3 relative z-10">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-mono font-bold text-[#B6D957]">{activeHeroObs.id} · {activeHeroObs.zone}</div>
                      <div className="text-sm font-bold text-white mt-0.5">{activeHeroObs.area}</div>
                      <div className="text-[11px] font-mono text-[#DCE8DA]/60">{activeHeroObs.coords}</div>
                    </div>
                    <Badge variant={activeHeroObs.riskLevel === 'HIGH' ? 'high' : 'medium'}>
                      {activeHeroObs.riskLevel} (Score {activeHeroObs.riskScore}/7)
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-white/10">
                    <div>
                      <span className="text-[#DCE8DA]/60 block text-[10px]">Site Context</span>
                      <span className="text-white font-medium">{activeHeroObs.siteType}</span>
                    </div>
                    <div>
                      <span className="text-[#DCE8DA]/60 block text-[10px]">Drainage Context · Unverified</span>
                      <span className="text-[#B6D957] font-medium">{activeHeroObs.drainDist === 'Not verified' ? 'Connectivity unavailable' : activeHeroObs.drainDist}</span>
                    </div>
                  </div>

                  <Link href="/app/map" className="block pt-1">
                    <Button variant="lime" size="sm" className="w-full text-xs font-bold py-2 justify-center">
                      Inspect in Full GeoIntel Explorer
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. RESEARCH-BACKED STATISTICS BAR
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-12 border-b border-[rgba(18,59,46,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col border-l-2 border-[#123B2E] pl-4">
              <span className="font-heading font-extrabold text-3xl md:text-4xl text-[#123B2E]">71</span>
              <span className="text-xs font-semibold uppercase font-mono tracking-wider text-[rgba(23,37,31,0.6)] mt-1">
                Verified Field Observations
              </span>
              <span className="text-[11px] text-[rgba(23,37,31,0.45)] mt-0.5">All with WGS-84 coordinates</span>
            </div>

            <div className="flex flex-col border-l-2 border-[#3C9290] pl-4">
              <span className="font-heading font-extrabold text-3xl md:text-4xl text-[#123B2E]">14</span>
              <span className="text-xs font-semibold uppercase font-mono tracking-wider text-[rgba(23,37,31,0.6)] mt-1">
                Urban Survey Zones
              </span>
              <span className="text-[11px] text-[rgba(23,37,31,0.45)] mt-0.5">Across Greater Bengaluru</span>
            </div>

            <div className="flex flex-col border-l-2 border-[#B6D957] pl-4">
              <span className="font-heading font-extrabold text-3xl md:text-4xl text-[#123B2E]">3</span>
              <span className="text-xs font-semibold uppercase font-mono tracking-wider text-[rgba(23,37,31,0.6)] mt-1">
                Waste Classifications
              </span>
              <span className="text-[11px] text-[rgba(23,37,31,0.45)] mt-0.5">Mixed, Plastic & Construction</span>
            </div>

            <div className="flex flex-col border-l-2 border-[#D97706] pl-4">
              <span className="font-heading font-extrabold text-3xl md:text-4xl text-[#123B2E]">10</span>
              <span className="text-xs font-semibold uppercase font-mono tracking-wider text-[rgba(23,37,31,0.6)] mt-1">
                Reference Waterways & Lakes
              </span>
              <span className="text-[11px] text-[rgba(23,37,31,0.45)] mt-0.5">Illustrative proximity inputs</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. THE ENVIRONMENTAL CHALLENGE (Editorial Storytelling)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#F7F7F0] border-b border-[rgba(18,59,46,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#3C9290]">
              The Urban Waste Crisis
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#123B2E] mt-2 leading-tight">
              India generates 62 million tonnes of municipal solid waste annually — yet urban intervention remains blind to geospatial hydrology.
            </h2>
            <p className="text-base text-[rgba(23,37,31,0.7)] mt-4 leading-relaxed">
              In rapidly expanding metropolises like Bengaluru, solid waste does not accumulate uniformly. It clusters at arterial road verges, storm drainage junctions, and open lands. Conventional municipal systems rely on delayed citizen grievances with zero spatial risk awareness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="editorial-card p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 mb-6">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#123B2E]">1. Reactive Waste Management</h3>
                <p className="text-sm text-[rgba(23,37,31,0.7)] mt-3 leading-relaxed">
                  Municipal trucks clear waste only after overflow complaints escalate. There is no predictive scoring, no severity grading, and no automated verification of illegal dump re-emergence.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[rgba(18,59,46,0.08)] text-xs font-mono text-red-700 font-semibold">
                Challenge: response begins after an issue is reported
              </div>
            </div>

            <div className="editorial-card p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-6">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#123B2E]">2. Unstandardized Field Vision</h3>
                <p className="text-sm text-[rgba(23,37,31,0.7)] mt-3 leading-relaxed">
                  Field photographs submitted by inspectors or residents lack automated classification. Mixed trash, hazardous burning, and plastic accumulations cannot be quantified or compared across wards.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[rgba(18,59,46,0.08)] text-xs font-mono text-amber-700 font-semibold">
                Impact: Zero objective severity baseline
              </div>
            </div>

            <div className="editorial-card p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 mb-6">
                  <Waves className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#123B2E]">3. Ignored Drainage Linkages</h3>
                <p className="text-sm text-[rgba(23,37,31,0.7)] mt-3 leading-relaxed">
                  Waste near waterways can warrant closer inspection. The current prototype explores proximity as context; it does not measure flood risk or verified drainage connectivity.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[rgba(18,59,46,0.08)] text-xs font-mono text-sky-700 font-semibold">
                Impact: Flash flooding & toxic leachate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4. WHAT CLEANINGOAI ADDRESSES (4 Capability Cards)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white border-b border-[rgba(18,59,46,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#123B2E]">
              Core Capabilities
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#123B2E] mt-2">
              How CleaningoAI Closes the Loop
            </h2>
            <p className="text-base text-[rgba(23,37,31,0.7)] mt-3">
              Four scientifically grounded modules transforming raw field observations into prioritized municipal action.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="editorial-card p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#123B2E] text-[#B6D957] flex items-center justify-center mb-5">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#123B2E]">Systematic Detection</h3>
                <p className="text-xs text-[rgba(23,37,31,0.7)] mt-2 leading-relaxed">
                  The research plan covers mixed, plastic, and construction waste detection. The current Vision page returns simulated demo results; no trained model is connected.
                </p>
              </div>
              <span className="text-xs font-mono text-[#3C9290] font-semibold mt-4">Module: Cleaningo Vision</span>
            </div>

            <div className="editorial-card p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#123B2E] text-[#B6D957] flex items-center justify-center mb-5">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#123B2E]">Severity Assessment</h3>
                <p className="text-xs text-[rgba(23,37,31,0.7)] mt-2 leading-relaxed">
                  A recorded field risk score sits alongside a four-tier annotation rubric. Human severity annotation is still pending for the study observations.
                </p>
              </div>
              <span className="text-xs font-mono text-[#3C9290] font-semibold mt-4">Module: Severity Engine</span>
            </div>

            <div className="editorial-card p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#123B2E] text-[#B6D957] flex items-center justify-center mb-5">
                  <Waves className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#123B2E]">Drainage Context</h3>
                <p className="text-xs text-[rgba(23,37,31,0.7)] mt-2 leading-relaxed">
                  The current demo estimates proximity to illustrative waterway points. Drainage-network connectivity and downstream impact have not been verified.
                </p>
              </div>
              <span className="text-xs font-mono text-[#3C9290] font-semibold mt-4">Module: HydroRisk</span>
            </div>

            <div className="editorial-card p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#123B2E] text-[#B6D957] flex items-center justify-center mb-5">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#123B2E]">Geospatial Intelligence</h3>
                <p className="text-xs text-[rgba(23,37,31,0.7)] mt-2 leading-relaxed">
                  Dynamic Leaflet mapping, density clustering, and zone aggregation enabling BBMP ward officers to direct cleanup resources where impact is greatest.
                </p>
              </div>
              <span className="text-xs font-mono text-[#3C9290] font-semibold mt-4">Module: GeoIntel Map</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5. THREE INTEGRATED INTELLIGENCE LENSES (Interactive Tabs)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#F7F7F0] border-b border-[rgba(18,59,46,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#3C9290]">
                Platform Deep Dive
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#123B2E] mt-2">
                Three Analytical Lenses
              </h2>
            </div>
            <p className="text-sm text-[rgba(23,37,31,0.7)] max-w-md">
              Switch between the three primary operational lenses to see how field imagery, spatial mapping, and drainage graphs integrate into unified intelligence.
            </p>
          </div>

          <Tabs defaultValue="geointel" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="geointel" icon={<MapPin className="w-4 h-4" />}>
                1. GeoIntel Map Explorer
              </TabsTrigger>
              <TabsTrigger value="vision" icon={<Eye className="w-4 h-4" />}>
                2. Vision AI Laboratory
              </TabsTrigger>
              <TabsTrigger value="hydrorisk" icon={<Waves className="w-4 h-4" />}>
                3. HydroRisk NetworkX
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: GeoIntel */}
            <TabsContent value="geointel">
              <div className="editorial-card p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <Badge variant="verified">GEOSPATIAL ENGINE</Badge>
                  <h3 className="font-heading font-bold text-2xl text-[#123B2E]">
                    Spatial Mapping Across 14 Bengaluru Zones
                  </h3>
                  <p className="text-sm text-[rgba(23,37,31,0.7)] leading-relaxed">
                    Interactive visualization of all 71 GPS coordinates. Filter by zone identifier, waste class, risk score, and management status with instant site-level inspections.
                  </p>
                  <ul className="space-y-2 text-xs font-mono text-[rgba(23,37,31,0.8)]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#123B2E]" /> Complete WGS-84 coordinate validation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#123B2E]" /> Risk level color grading (High, Med, Low)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#123B2E]" /> Zone density clustering and filtering
                    </li>
                  </ul>
                  <div className="pt-4">
                    <Link href="/app/map">
                      <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                        Launch Live Map Explorer
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-[#0B2922] rounded-xl p-6 border border-white/10 text-white relative overflow-hidden">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                    <span className="text-[#B6D957] font-semibold">Map Viewport: Bengaluru Urban District</span>
                    <span className="text-white/60">Zoom Level: 12 · 71 Pins</span>
                  </div>
                  <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-[#123B2E] border border-[#B6D957]/30 flex items-center justify-center text-[#B6D957]">
                      <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '20s' }} />
                    </div>
                    <p className="font-mono text-sm text-[#DCE8DA]">Interactive Leaflet Map Active</p>
                    <p className="text-xs text-white/50 max-w-sm">
                      Full-page interactive canvas available in the Intelligence App with layer switches and inspector details.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* TAB 2: Vision AI */}
            <TabsContent value="vision">
              <div className="editorial-card p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <Badge variant="demo">COMPUTER VISION (DEMO MODE)</Badge>
                  <h3 className="font-heading font-bold text-2xl text-[#123B2E]">
                    Automated Waste Classification Laboratory
                  </h3>
                  <p className="text-sm text-[rgba(23,37,31,0.7)] leading-relaxed">
                    Upload mobile field photographs for automated object detection. The system detects waste boundaries and classifies instances into Mixed, Plastic, or Construction debris with confidence metrics.
                  </p>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
                    <strong>Honest Research Status:</strong> AI bounding box detection runs in DEMO MODE adapter until model fine-tuning experiments E1–E2 are conducted.
                  </div>
                  <div className="pt-2">
                    <Link href="/app/vision">
                      <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                        Open Vision AI Lab
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-[#123B2E] rounded-xl p-6 border border-white/10 text-white space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#DCE8DA]">
                    <span>Inference Result Preview</span>
                    <Badge variant="verified">YOLOv8 ARCHITECTURE</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-[#0B2922] p-4 rounded-lg border border-white/10">
                      <span className="text-[10px] font-mono text-[#DCE8DA]/60 uppercase">Primary Class</span>
                      <p className="text-base font-bold text-[#B6D957] mt-1">mixed_waste</p>
                      <span className="text-xs text-white/60">Confidence: 87.4%</span>
                    </div>
                    <div className="bg-[#0B2922] p-4 rounded-lg border border-white/10">
                      <span className="text-[10px] font-mono text-[#DCE8DA]/60 uppercase">Severity Estimate</span>
                      <p className="text-base font-bold text-[#EA580C] mt-1">HIGH (Risk Score: 5)</p>
                      <span className="text-xs text-white/60">Burning Observed: YES</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* TAB 3: HydroRisk */}
            <TabsContent value="hydrorisk">
              <div className="editorial-card p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <Badge variant="teal">HYDROLOGICAL RISK</Badge>
                  <h3 className="font-heading font-bold text-2xl text-[#123B2E]">
                    Downstream Drainage Network Proximity
                  </h3>
                  <p className="text-sm text-[rgba(23,37,31,0.7)] leading-relaxed">
                    Combines dump severity scores with Euclidean distance to 10 major water bodies across Bengaluru to prioritize cleanup before monsoon flooding.
                  </p>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
                    <strong>Synthetic Demo Disclaimer:</strong> Drainage topology uses distance heuristics and reference coordinate points. Full hydraulic mesh validation is in progress.
                  </div>
                  <div className="pt-2">
                    <Link href="/app/hydrorisk">
                      <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                        Explore HydroRisk Matrix
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-[#0B2922] rounded-xl p-6 border border-white/10 text-white space-y-3">
                  <span className="text-xs font-mono text-[#B6D957]">Top Hydrological Priorities</span>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between p-2.5 rounded bg-[#123B2E]">
                      <span>CLN_0005 (Nagarbhavi River Bank)</span>
                      <span className="text-red-400 font-bold">48m to Drain · Risk 5.0</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-[#123B2E]">
                      <span>CLN_0018 (Nalagedaranahalli River Bank)</span>
                      <span className="text-red-400 font-bold">62m to Drain · Risk 4.5</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-[#123B2E]">
                      <span>CLN_0063 (Kachohalli River Bank)</span>
                      <span className="text-amber-400 font-bold">95m to Drain · Risk 4.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          6. RESEARCH & INNOVATION (Four Experiments. One Research Question.)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white border-b border-[rgba(18,59,46,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#123B2E]">
              Academic Research Foundation
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#123B2E] mt-2">
              Four Experiments. One Research Question.
            </h2>
            <p className="text-base text-[rgba(23,37,31,0.7)] mt-3">
              Can machine vision and spatial network analysis systematically predict and prioritize informal solid waste intervention across dense Indian urban environments?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="editorial-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-[#123B2E] bg-[#DCE8DA] px-2.5 py-1 rounded">
                    EXPERIMENT E1
                  </span>
                  <Badge variant="demo">Pending Execution</Badge>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#123B2E]">Zero-Shot YOLOv8 Detection Baseline</h3>
                <p className="text-xs text-[rgba(23,37,31,0.7)] mt-2 leading-relaxed">
                  Evaluate out-of-the-box pretrained YOLOv8/v11 on raw Indian urban field photos across Mixed, Plastic, and Construction categories without domain fine-tuning.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[rgba(18,59,46,0.08)] text-[11px] font-mono text-[rgba(23,37,31,0.6)]">
                Focus: Baseline mAP@50 and recall on unstructured street scenes
              </div>
            </div>

            <div className="editorial-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-[#123B2E] bg-[#DCE8DA] px-2.5 py-1 rounded">
                    EXPERIMENT E2
                  </span>
                  <Badge variant="demo">Pending Execution</Badge>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#123B2E]">Domain Fine-Tuning on Bengaluru Dataset</h3>
                <p className="text-xs text-[rgba(23,37,31,0.7)] mt-2 leading-relaxed">
                  Fine-tune model weights using annotated field photos from the 14 Bengaluru pilot zones. Measure detection delta over E1 zero-shot baseline.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[rgba(18,59,46,0.08)] text-[11px] font-mono text-[rgba(23,37,31,0.6)]">
                Focus: Context-specific feature extraction & false positive reduction
              </div>
            </div>

            <div className="editorial-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-[#123B2E] bg-[#DCE8DA] px-2.5 py-1 rounded">
                    EXPERIMENT E3
                  </span>
                  <Badge variant="demo">Pending Execution</Badge>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#123B2E]">DBSCAN Geospatial Clustering</h3>
                <p className="text-xs text-[rgba(23,37,31,0.7)] mt-2 leading-relaxed">
                  Apply density-based spatial clustering of applications with noise (DBSCAN) across 71 coordinates to identify statistically valid chronic accumulation hotspots.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[rgba(18,59,46,0.08)] text-[11px] font-mono text-[rgba(23,37,31,0.6)]">
                Focus: Cluster cohesion, zone boundaries, and spatial persistence
              </div>
            </div>

            <div className="editorial-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-[#123B2E] bg-[#DCE8DA] px-2.5 py-1 rounded">
                    EXPERIMENT E4
                  </span>
                  <Badge variant="demo">Synthetic Demo</Badge>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#123B2E]">Drainage Connectivity Risk Modeling</h3>
                <p className="text-xs text-[rgba(23,37,31,0.7)] mt-2 leading-relaxed">
                  Compute composite environmental priority scores combining dump size, burning status, and topological drainage distance to Bengaluru waterways.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[rgba(18,59,46,0.08)] text-[11px] font-mono text-[rgba(23,37,31,0.6)]">
                Focus: Multi-variable risk ranking for municipal resource dispatch
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          7. TECHNOLOGY ARCHITECTURE (6-Stage Pipeline)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#F7F7F0] border-b border-[rgba(18,59,46,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#3C9290]">
              System Architecture
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#123B2E] mt-2">
              From Field Observation to Municipal Action
            </h2>
            <p className="text-base text-[rgba(23,37,31,0.7)] mt-3">
              An end-to-end data pipeline linking ground-truth capture with institutional resolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Field Observation Capture',
                desc: 'Inspectors & citizens log geotagged photographs, GPS coordinates, area tags, and immediate hazards.',
                badge: 'WGS-84 / Mobile',
              },
              {
                step: '02',
                title: 'Computer Vision Inference',
                desc: 'YOLO model identifies bounding boxes, estimates waste composition (Mixed, Plastic, C&D), and assesses confidence.',
                badge: 'YOLOv8 / PyTorch',
              },
              {
                step: '03',
                title: 'Severity Grading Rubric',
                desc: 'Heuristic engine calculates vulnerability score (0–7) factoring waste area, hazardous burning, and open land access.',
                badge: 'Validated Rubric',
              },
              {
                step: '04',
                title: 'Drainage Network Modeling',
                desc: 'Graph algorithms calculate proximity to primary storm water channels and downstream water bodies.',
                badge: 'NetworkX / GIS',
              },
              {
                step: '05',
                title: 'Composite Priority Scoring',
                desc: 'Integrates severity and drainage risk to rank all citywide incidents in a unified operational queue.',
                badge: 'Priority Index',
              },
              {
                step: '06',
                title: 'Operations & Audit Trail',
                desc: 'BBMP officers assign field inspectors, track remediation states, and preserve auditable resolution evidence.',
                badge: 'SQLite Audit Trail',
              },
            ].map((stage) => (
              <div key={stage.step} className="editorial-card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-heading font-extrabold text-[#B6D957] bg-[#123B2E] w-10 h-10 rounded-lg flex items-center justify-center">
                      {stage.step}
                    </span>
                    <Badge variant="neutral">{stage.badge}</Badge>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#123B2E]">{stage.title}</h3>
                  <p className="text-xs text-[rgba(23,37,31,0.7)] mt-2 leading-relaxed">{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          8. INSTITUTIONAL CALL TO ACTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#123B2E] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <Badge variant="verified">ENTERPRISE & ACADEMIC EVALUATION</Badge>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl mt-4 max-w-3xl leading-tight">
            Deploy Scalable Environmental Intelligence in Your City
          </h2>
          <p className="text-base text-[#DCE8DA]/80 max-w-2xl mt-4 leading-relaxed">
            Whether you are evaluating the platform for municipal pilot integration, academic research co-authorship, or environmental NGO tracking, CleaningoAI is built for scale.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="/app">
              <Button variant="lime" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Launch Full Platform Demo
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="text-white border-white/30 hover:bg-white/10">
                Contact Research Consortium
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
