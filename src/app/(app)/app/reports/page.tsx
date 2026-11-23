'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  MapPin,
  User,
  CheckCircle2,
  Loader2,
  ChevronRight,
  ChevronLeft,
  Navigation,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const STEPS = [
  { id: 'location', label: '1. Location' },
  { id: 'details', label: '2. Incident Details' },
  { id: 'contact', label: '3. Reporter Info' },
  { id: 'review', label: '4. Verification' },
];

const BENGALURU_PRESETS = [
  { label: 'Kanakapura Road (Zone 02)', lat: '12.8982', lng: '77.5621' },
  { label: 'Peenya Industrial (Zone 08)', lat: '13.0285', lng: '77.5195' },
  { label: 'Nagarbhavi Ring Road (Zone 03)', lat: '12.9610', lng: '77.5120' },
  { label: 'Majestic Central Hub (Zone 17)', lat: '12.9772', lng: '77.5728' },
  { label: 'Banashankari Stage II (Zone 18)', lat: '12.9255', lng: '77.5468' },
];

const WASTE_TYPES = [
  { value: 'MIXED', label: 'Mixed Municipal Solid Waste' },
  { value: 'PLASTIC', label: 'Plastic-Dominant Accumulation' },
  { value: 'CONSTRUCTION', label: 'Construction & Demolition Debris' },
  { value: 'ORGANIC', label: 'Organic / Market Waste' },
];

const SEVERITIES = [
  { value: 'low', label: 'Low (< 10 m², minor roadside litter)', badge: 'low' as const },
  { value: 'medium', label: 'Medium (10–50 m², potential drain obstruction)', badge: 'medium' as const },
  { value: 'high', label: 'High (> 50 m², severe dump, waterway hazard)', badge: 'high' as const },
];

interface FormData {
  latitude: string;
  longitude: string;
  area_label: string;
  title: string;
  description: string;
  waste_type: string;
  severity: string;
  reporter_name: string;
  reporter_email: string;
  reporter_phone: string;
}

export default function IncidentReportingWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    latitude: '12.8982',
    longitude: '77.5621',
    area_label: 'Kanakapura Road Near Metro Pillar',
    title: 'Illegal Solid Waste Accumulation Adjacent to Drain',
    description: 'Significant plastic and municipal debris accumulation near stormwater drain opening.',
    waste_type: 'MIXED',
    severity: 'medium',
    reporter_name: 'Dr. Ramesh Kumar',
    reporter_email: 'ramesh.k@bengaluru-env.org',
    reporter_phone: '+91 98450 12345',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState<{ id: string } | null>(null);
  const [error, setError] = useState('');

  const setField = (key: keyof FormData, val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const detectLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setField('latitude', pos.coords.latitude.toFixed(6));
        setField('longitude', pos.coords.longitude.toFixed(6));
        setField('area_label', 'Current GPS Location (Field Survey)');
      },
      () => {
        setError('Unable to fetch device location. Please enter coordinates manually.');
      }
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          latitude: parseFloat(form.latitude) || 12.9716,
          longitude: parseFloat(form.longitude) || 77.5946,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to submit incident report');
        return;
      }
      setSubmitted({ id: data.id });
    } catch {
      setError('Network communication failed. Please verify API server.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-6 md:p-12 max-w-2xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-9 h-9 text-emerald-600" />
        </div>
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-[#123B2E]">
            Incident Successfully Registered
          </h2>
          <p className="text-sm text-[#17251F]/70 mt-1">
            Your report has been written to the municipal SQLite database and assigned to the operations queue.
          </p>
        </div>

        <div className="p-6 bg-[#F7F7F0] rounded-2xl border border-[rgba(18,59,46,0.1)] text-center space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/60">
            Official Tracking ID
          </span>
          <p className="font-mono font-extrabold text-2xl text-[#123B2E]">{submitted.id}</p>
          <p className="text-xs text-[#17251F]/50">Status: SUBMITTED · Awaiting Ward Review</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button
            variant="outline"
            size="md"
            onClick={() => {
              setSubmitted(null);
              setStep(0);
            }}
          >
            Submit Another Report
          </Button>
          <Link href={`/app/incidents/${submitted.id}`}>
            <Button variant="primary" size="md" icon={ChevronRight}>
              Track Live Incident Status
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold tracking-wider text-[#3C9290] uppercase">
            Module 05 · Incident Operations
          </span>
          <Badge variant="verified">Municipal Pipeline</Badge>
        </div>
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#123B2E] tracking-tight mt-1">
          Submit Environmental Incident
        </h1>
        <p className="text-sm text-[#17251F]/70 mt-1">
          Log an informal solid waste accumulation site with GPS coordinates for review by municipal officers.
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="grid grid-cols-4 gap-2">
        {STEPS.map((s, idx) => (
          <div
            key={s.id}
            className={`py-2 px-3 rounded-lg border text-xs font-mono font-bold transition-all ${
              step === idx
                ? 'bg-[#123B2E] text-white border-[#0B2922]'
                : step > idx
                ? 'bg-[#123B2E]/10 text-[#123B2E] border-[#123B2E]/20'
                : 'bg-white text-[#17251F]/40 border-[rgba(18,59,46,0.08)]'
            }`}
          >
            {s.label}
          </div>
        ))}
      </div>

      {/* Step Content Card */}
      <Card variant="editorial">
        <CardContent className="pt-6 space-y-6">
          {/* STEP 0: LOCATION */}
          {step === 0 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-heading font-bold text-base text-[#123B2E]">
                  Geographic Location & Coordinates
                </h3>
                <p className="text-xs text-[#17251F]/60 mt-0.5">
                  Choose a verified Bengaluru field zone or enter exact WGS84 coordinates.
                </p>
              </div>

              {/* Bengaluru Quick Presets */}
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 block mb-2">
                  Quick-Pick Bengaluru Pilot Locations
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {BENGALURU_PRESETS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => {
                        setField('area_label', p.label);
                        setField('latitude', p.lat);
                        setField('longitude', p.lng);
                      }}
                      className="text-left p-2.5 rounded-lg border border-[rgba(18,59,46,0.12)] bg-[#F7F7F0]/50 hover:bg-white hover:border-[#123B2E] text-xs font-mono transition-colors flex items-center justify-between"
                    >
                      <span className="truncate">{p.label}</span>
                      <MapPin className="w-3.5 h-3.5 text-[#3C9290] shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Area Label Input */}
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-1">
                  Location / Landmark Name
                </label>
                <input
                  type="text"
                  value={form.area_label}
                  onChange={(e) => setField('area_label', e.target.value)}
                  placeholder="e.g. Beside Kanakapura Metro Pillar 140"
                  className="w-full bg-white border border-[rgba(18,59,46,0.15)] rounded-lg p-2.5 text-xs text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#123B2E]/20"
                />
              </div>

              {/* Coordinates Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-1">
                    Latitude (°N)
                  </label>
                  <input
                    type="text"
                    value={form.latitude}
                    onChange={(e) => setField('latitude', e.target.value)}
                    className="w-full bg-white border border-[rgba(18,59,46,0.15)] rounded-lg p-2.5 text-xs font-mono text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#123B2E]/20"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-1">
                    Longitude (°E)
                  </label>
                  <input
                    type="text"
                    value={form.longitude}
                    onChange={(e) => setField('longitude', e.target.value)}
                    className="w-full bg-white border border-[rgba(18,59,46,0.15)] rounded-lg p-2.5 text-xs font-mono text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#123B2E]/20"
                  />
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={detectLocation}
                icon={Navigation}
              >
                Use Device GPS Geolocation
              </Button>
            </div>
          )}

          {/* STEP 1: DETAILS */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-heading font-bold text-base text-[#123B2E]">
                  Incident Description & Material Composition
                </h3>
                <p className="text-xs text-[#17251F]/60 mt-0.5">
                  Classify the dominant solid waste stream and estimated severity level.
                </p>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-1">
                  Incident Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setField('title', e.target.value)}
                  className="w-full bg-white border border-[rgba(18,59,46,0.15)] rounded-lg p-2.5 text-xs text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#123B2E]/20"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-1">
                  Detailed Field Observations
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setField('description', e.target.value)}
                  className="w-full bg-white border border-[rgba(18,59,46,0.15)] rounded-lg p-2.5 text-xs text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#123B2E]/20"
                />
              </div>

              {/* Waste Type Selector */}
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-1.5">
                  Dominant Waste Stream
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {WASTE_TYPES.map((w) => (
                    <button
                      key={w.value}
                      type="button"
                      onClick={() => setField('waste_type', w.value)}
                      className={`p-3 rounded-lg border text-left text-xs transition-all ${
                        form.waste_type === w.value
                          ? 'bg-[#123B2E] text-white border-[#0B2922] font-semibold'
                          : 'bg-white text-[#17251F] border-[rgba(18,59,46,0.15)] hover:bg-[#F7F7F0]'
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Severity Selector */}
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-1.5">
                  Estimated Accumulation Severity
                </label>
                <div className="space-y-2">
                  {SEVERITIES.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setField('severity', s.value)}
                      className={`w-full p-3 rounded-lg border text-left text-xs flex items-center justify-between transition-all ${
                        form.severity === s.value
                          ? 'bg-[#123B2E] text-white border-[#0B2922] font-semibold'
                          : 'bg-white text-[#17251F] border-[rgba(18,59,46,0.15)] hover:bg-[#F7F7F0]'
                      }`}
                    >
                      <span>{s.label}</span>
                      <Badge variant={s.badge}>{s.value.toUpperCase()}</Badge>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: CONTACT */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-heading font-bold text-base text-[#123B2E]">
                  Reporter Contact Information
                </h3>
                <p className="text-xs text-[#17251F]/60 mt-0.5">
                  Used by ward officers to confirm location details and provide status updates.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-1">
                    Full Name / Designation
                  </label>
                  <input
                    type="text"
                    value={form.reporter_name}
                    onChange={(e) => setField('reporter_name', e.target.value)}
                    className="w-full bg-white border border-[rgba(18,59,46,0.15)] rounded-lg p-2.5 text-xs text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#123B2E]/20"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={form.reporter_email}
                    onChange={(e) => setField('reporter_email', e.target.value)}
                    className="w-full bg-white border border-[rgba(18,59,46,0.15)] rounded-lg p-2.5 text-xs text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#123B2E]/20"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-1">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    value={form.reporter_phone}
                    onChange={(e) => setField('reporter_phone', e.target.value)}
                    className="w-full bg-white border border-[rgba(18,59,46,0.15)] rounded-lg p-2.5 text-xs text-[#17251F] focus:outline-none focus:ring-2 focus:ring-[#123B2E]/20"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-heading font-bold text-base text-[#123B2E]">
                  Verify Submission Summary
                </h3>
                <p className="text-xs text-[#17251F]/60 mt-0.5">
                  Confirm all details before committing the record to the municipal registry.
                </p>
              </div>

              <div className="bg-[#F7F7F0] p-5 rounded-xl border border-[rgba(18,59,46,0.08)] space-y-4 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-[#17251F]/50 block">TITLE & LOCATION</span>
                  <p className="font-heading font-bold text-sm text-[#123B2E] mt-0.5">{form.title}</p>
                  <p className="text-[#17251F]/70">{form.area_label}</p>
                  <p className="font-mono text-[11px] text-[#3C9290] mt-0.5">
                    {form.latitude}° N, {form.longitude}° E
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[rgba(18,59,46,0.06)]">
                  <div>
                    <span className="text-[10px] font-mono text-[#17251F]/50 block">WASTE STREAM</span>
                    <span className="font-semibold text-[#123B2E]">{form.waste_type}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#17251F]/50 block">SEVERITY LEVEL</span>
                    <span className="font-semibold uppercase text-[#123B2E]">{form.severity}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[rgba(18,59,46,0.06)]">
                  <span className="text-[10px] font-mono text-[#17251F]/50 block">REPORTER</span>
                  <span className="font-semibold text-[#123B2E]">
                    {form.reporter_name} ({form.reporter_email})
                  </span>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                  {error}
                </div>
              )}
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="pt-4 border-t border-[rgba(18,59,46,0.08)] flex items-center justify-between">
            <Button
              variant="outline"
              size="md"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              icon={ChevronLeft}
            >
              Back
            </Button>

            {step < STEPS.length - 1 ? (
              <Button
                variant="primary"
                size="md"
                onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                icon={ChevronRight}
              >
                Continue
              </Button>
            ) : (
              <Button
                variant="lime"
                size="md"
                onClick={handleSubmit}
                disabled={loading}
                icon={loading ? Loader2 : CheckCircle2}
              >
                {loading ? 'Submitting to Database…' : 'Submit Incident Report'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
