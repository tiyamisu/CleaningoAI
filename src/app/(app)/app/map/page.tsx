'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Search,
  Download,
  RefreshCw,
  MapPin,
  Flame,
  X,
  FileText,
  SlidersHorizontal,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

// Leaflet dynamic import for Next.js App Router
const ObservationMap = dynamic(() => import('@/components/map/ObservationMap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-[#F7F7F0] rounded-xl border border-[rgba(18,59,46,0.1)]">
      <div className="text-center text-[#123B2E]/70 space-y-3">
        <div className="animate-spin w-8 h-8 border-3 border-[#123B2E] border-t-transparent rounded-full mx-auto" />
        <p className="text-xs font-mono font-medium">Initializing Bengaluru Spatial Engine…</p>
      </div>
    </div>
  ),
});

interface Observation {
  id: string;
  zone_id: string;
  latitude: number;
  longitude: number;
  area_label: string;
  waste_type: string;
  risk_level: string;
  risk_score: number;
  site_type: string;
  management_status: string;
  date_captured: string;
  burning_observed: string;
}

const ZONES = [
  { id: 'ZONE_02-KK', name: 'Kanakapura / Konanakunte' },
  { id: 'ZONE_03-N_C_G', name: 'Nagarbhavi / Chandralayout' },
  { id: 'ZONE_04_HC', name: 'Hesaraghatta / Chikkabanavara' },
  { id: 'ZONE_08-FWP', name: 'Peenya Industrial / FWP' },
  { id: 'ZONE_10-TF', name: 'T.Dasarahalli / Banashankari' },
  { id: 'ZONE_11_NLG-P', name: 'Nalaghatta / Peenya' },
  { id: 'ZONE_12_AG_MAINROAD', name: 'Tippenahalli / Gangondanahalli' },
  { id: 'ZONE_14_KN', name: 'Kengeri Satellite / Kengeri' },
  { id: 'ZONE_15_K-M_MR', name: 'Kadabagere / Madanayakanahalli' },
  { id: 'ZONE_16_KSF', name: 'Kengeri / Someshwarapura' },
  { id: 'ZONE_17_M', name: 'Majestic Central Hub' },
  { id: 'ZONE_18_BSKR', name: 'Banashankari Road' },
  { id: 'ZONE_19_N-M-V', name: 'Nagasandra / Mallathahalli' },
  { id: 'ZONE_20_KA', name: 'Kammanahalli / Agara' },
];

export default function GeoIntelMapPage() {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterZone, setFilterZone] = useState('');
  const [filterRisk, setFilterRisk] = useState('');
  const [filterWaste, setFilterWaste] = useState('');
  const [selected, setSelected] = useState<Observation | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/observations?limit=500');
      const data = await res.json();
      setObservations(data.observations || []);
    } catch (err) {
      console.error('Failed to load observations', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [loadData]);

  const filtered = useMemo(() => {
    let result = observations;
    if (filterZone) result = result.filter((o) => o.zone_id === filterZone);
    if (filterRisk) result = result.filter((o) => o.risk_level === filterRisk);
    if (filterWaste) result = result.filter((o) => o.waste_type === filterWaste);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.area_label?.toLowerCase().includes(q) ||
          o.id?.toLowerCase().includes(q) ||
          o.zone_id?.toLowerCase().includes(q) ||
          o.waste_type?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [observations, filterZone, filterRisk, filterWaste, search]);

  const stats = useMemo(() => {
    const high = filtered.filter((o) => o.risk_level === 'HIGH').length;
    const med = filtered.filter((o) => o.risk_level === 'MEDIUM').length;
    const low = filtered.filter((o) => o.risk_level === 'LOW').length;
    const burning = filtered.filter((o) => o.burning_observed === 'YES').length;
    return { high, med, low, burning };
  }, [filtered]);

  const handleExport = () => {
    const geo = {
      type: 'FeatureCollection',
      name: 'CleaningoAI_Observations',
      crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
      features: filtered.map((o) => ({
        type: 'Feature',
        properties: {
          id: o.id,
          zone: o.zone_id,
          waste_type: o.waste_type,
          risk_level: o.risk_level,
          risk_score: o.risk_score,
          site_type: o.site_type,
          management: o.management_status,
          label: o.area_label,
          burning: o.burning_observed,
        },
        geometry: { type: 'Point', coordinates: [o.longitude, o.latitude] },
      })),
    };
    const blob = new Blob([JSON.stringify(geo, null, 2)], { type: 'application/geo+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cleaningoai_bengaluru_${filtered.length}_records.geojson`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-0px)] bg-[#F7F7F0] overflow-hidden">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-[rgba(18,59,46,0.08)] px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 shrink-0 shadow-2xs z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg border border-[rgba(18,59,46,0.15)] text-[#123B2E] hover:bg-[#F7F7F0] transition-colors"
            title="Toggle Filters Panel"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-extrabold text-lg text-[#123B2E] tracking-tight">
                GeoIntel Map Explorer
              </h1>
              <Badge variant="verified">{observations.length} Observation Sites</Badge>
            </div>
            <p className="text-[11px] font-mono text-[#17251F]/60">
              Bengaluru Municipal Pilot · Displaying {filtered.length} of {observations.length} spatial records
            </p>
          </div>
        </div>

        {/* Counter Pills */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
            {stats.high} High Risk
          </span>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            {stats.med} Medium
          </span>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            {stats.low} Low
          </span>
          {stats.burning > 0 && (
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-300 flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-600" />
              {stats.burning} Burning Observed
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            disabled={loading}
            icon={RefreshCw}
          >
            {loading ? 'Refreshing…' : 'Sync'}
          </Button>
          <Button
            variant="lime"
            size="sm"
            onClick={handleExport}
            icon={Download}
          >
            Export GeoJSON
          </Button>
        </div>
      </header>

      {/* Main Workspace Split Layout */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Drawer: Filters & Site Index */}
        {sidebarOpen && (
          <aside className="w-80 md:w-88 bg-white border-r border-[rgba(18,59,46,0.08)] flex flex-col shrink-0 z-10 shadow-xs">
            {/* Filter Controls Header */}
            <div className="p-4 border-b border-[rgba(18,59,46,0.06)] space-y-3 bg-[#F7F7F0]/40">
              <div className="relative">
                <Search className="w-4 h-4 text-[#123B2E]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by label, zone, waste…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[rgba(18,59,46,0.15)] rounded-lg text-xs font-sans text-[#17251F] placeholder:text-[#17251F]/40 focus:outline-none focus:ring-2 focus:ring-[#123B2E]/20"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Zone Filter */}
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-1">
                  Bengaluru Zone
                </label>
                <select
                  value={filterZone}
                  onChange={(e) => setFilterZone(e.target.value)}
                  className="w-full bg-white border border-[rgba(18,59,46,0.15)] rounded-lg px-2.5 py-1.5 text-xs text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#123B2E]/20"
                >
                  <option value="">All Zones</option>
                  {ZONES.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.name} ({z.id})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick Selectors for Risk & Waste */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-1">
                    Risk Severity
                  </label>
                  <select
                    value={filterRisk}
                    onChange={(e) => setFilterRisk(e.target.value)}
                    className="w-full bg-white border border-[rgba(18,59,46,0.15)] rounded-lg px-2 py-1.5 text-xs text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#123B2E]/20"
                  >
                    <option value="">All Levels</option>
                    <option value="HIGH">High Risk</option>
                    <option value="MEDIUM">Medium Risk</option>
                    <option value="LOW">Low Risk</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-1">
                    Waste Type
                  </label>
                  <select
                    value={filterWaste}
                    onChange={(e) => setFilterWaste(e.target.value)}
                    className="w-full bg-white border border-[rgba(18,59,46,0.15)] rounded-lg px-2 py-1.5 text-xs text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#123B2E]/20"
                  >
                    <option value="">All Types</option>
                    <option value="MIXED">Mixed Waste</option>
                    <option value="PLASTIC">Plastic-Dominant</option>
                    <option value="CONSTRUCTION">Construction Debris</option>
                  </select>
                </div>
              </div>

              {(filterZone || filterRisk || filterWaste || search) && (
                <div className="flex justify-between items-center pt-1">
                  <span className="text-[10px] font-mono text-[#17251F]/60">
                    Active filters: {filtered.length} matched
                  </span>
                  <button
                    onClick={() => {
                      setFilterZone('');
                      setFilterRisk('');
                      setFilterWaste('');
                      setSearch('');
                    }}
                    className="text-[10px] font-mono text-[#3C9290] hover:underline font-semibold"
                  >
                    Reset All
                  </button>
                </div>
              )}
            </div>

            {/* List of Sites */}
            <div className="flex-1 overflow-y-auto divide-y divide-[rgba(18,59,46,0.05)]">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#17251F]/50">
                  No spatial observations match your criteria.
                </div>
              ) : (
                filtered.map((obs) => {
                  const isSelected = selected?.id === obs.id;
                  return (
                    <div
                      key={obs.id}
                      onClick={() => setSelected(obs)}
                      className={`p-3.5 cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#123B2E]/10 border-l-4 border-[#123B2E]'
                          : 'hover:bg-[#F7F7F0]/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono text-[10px] font-bold text-[#123B2E]/70">
                          {obs.id}
                        </span>
                        <Badge
                          variant={
                            obs.risk_level === 'HIGH'
                              ? 'high'
                              : obs.risk_level === 'MEDIUM'
                              ? 'medium'
                              : 'low'
                          }
                        >
                          {obs.risk_level}
                        </Badge>
                      </div>
                      <p className="font-heading font-semibold text-xs text-[#17251F] mt-1 line-clamp-1">
                        {obs.area_label || obs.zone_id}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5 text-[10px] font-mono text-[#17251F]/60">
                        <span>{obs.zone_id}</span>
                        <span>•</span>
                        <span>{obs.waste_type}</span>
                        {obs.burning_observed === 'YES' && (
                          <span className="text-orange-600 font-bold ml-auto flex items-center gap-0.5">
                            <Flame className="w-2.5 h-2.5" /> Burning
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </aside>
        )}

        {/* Center: Live GIS Canvas */}
        <div className="flex-1 relative h-full">
          <ObservationMap
            observations={filtered}
            selectedId={selected?.id}
            onSelect={(obs) => setSelected(obs)}
          />

          {/* Map Legend Overlay */}
          <div className="absolute bottom-6 left-6 z-[1000] bg-white/95 backdrop-blur-xs p-3.5 rounded-xl border border-[rgba(18,59,46,0.1)] shadow-md text-xs font-sans max-w-xs space-y-2 pointer-events-auto">
            <p className="font-mono font-bold text-[10px] uppercase text-[#123B2E] tracking-wider">
              Observation Legend
            </p>
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-600 inline-block shadow-2xs" />
                <span className="font-medium text-[#17251F]">High</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shadow-2xs" />
                <span className="font-medium text-[#17251F]">Medium</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block shadow-2xs" />
                <span className="font-medium text-[#17251F]">Low</span>
              </div>
            </div>
            <p className="text-[10px] text-[#17251F]/60 border-t border-[rgba(18,59,46,0.06)] pt-1.5">
              Click any coordinate pin to inspect field telemetry.
            </p>
          </div>
        </div>

        {/* Right Drawer: Observation Detail Inspector */}
        {selected && (
          <aside className="w-88 md:w-96 bg-white border-l border-[rgba(18,59,46,0.08)] flex flex-col shrink-0 z-20 shadow-lg">
            <div className="p-4 border-b border-[rgba(18,59,46,0.08)] flex items-center justify-between bg-[#123B2E] text-white">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#B6D957]" />
                <span className="font-mono text-xs font-bold text-[#B6D957]">{selected.id}</span>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1 rounded text-white/70 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-5 flex-1">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <Badge
                    variant={
                      selected.risk_level === 'HIGH'
                        ? 'high'
                        : selected.risk_level === 'MEDIUM'
                        ? 'medium'
                        : 'low'
                    }
                  >
                    {selected.risk_level} ENVIRONMENTAL RISK
                  </Badge>
                  <span className="text-[10px] font-mono text-[#17251F]/60">
                    Score: {Math.round(selected.risk_score * 100)}%
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-base text-[#123B2E] mt-2">
                  {selected.area_label || selected.zone_id}
                </h3>
                <p className="text-xs text-[#17251F]/70 font-mono mt-0.5">
                  Cluster: {selected.zone_id}
                </p>
              </div>

              {/* Coordinates Box */}
              <div className="bg-[#F7F7F0] p-3 rounded-lg border border-[rgba(18,59,46,0.08)] space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70">
                  Geographic Coordinates
                </span>
                <p className="font-mono text-xs text-[#123B2E] font-semibold">
                  {selected.latitude.toFixed(6)}° N, {selected.longitude.toFixed(6)}° E
                </p>
                <p className="text-[10px] text-[#17251F]/50">WGS84 Reference System</p>
              </div>

              {/* Metadata Attributes Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg border border-[rgba(18,59,46,0.08)] bg-white">
                  <span className="text-[10px] text-[#17251F]/60 block font-mono">Waste Type</span>
                  <span className="font-semibold text-[#123B2E]">{selected.waste_type}</span>
                </div>
                <div className="p-2.5 rounded-lg border border-[rgba(18,59,46,0.08)] bg-white">
                  <span className="text-[10px] text-[#17251F]/60 block font-mono">Site Type</span>
                  <span className="font-semibold text-[#123B2E]">
                    {(selected.site_type || 'Unspecified').split(',')[0]}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg border border-[rgba(18,59,46,0.08)] bg-white">
                  <span className="text-[10px] text-[#17251F]/60 block font-mono">Management</span>
                  <span className="font-semibold text-[#123B2E]">
                    {(selected.management_status || 'UNKNOWN').replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg border border-[rgba(18,59,46,0.08)] bg-white">
                  <span className="text-[10px] text-[#17251F]/60 block font-mono">Capture Date</span>
                  <span className="font-semibold text-[#123B2E]">
                    {selected.date_captured || '2026-02-28'}
                  </span>
                </div>
              </div>

              {/* Burning Alert */}
              {selected.burning_observed === 'YES' && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-800">
                  <Flame className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold">Thermal Activity Detected:</strong> Active or recent burning of informal solid waste was logged at this location during the field survey.
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2 border-t border-[rgba(18,59,46,0.08)]">
                <Link
                  href={`/app/reports?lat=${selected.latitude}&lng=${selected.longitude}&label=${encodeURIComponent(selected.area_label || selected.zone_id)}`}
                  className="w-full"
                >
                  <Button variant="primary" size="md" className="w-full" icon={FileText}>
                    File Municipal Incident
                  </Button>
                </Link>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
