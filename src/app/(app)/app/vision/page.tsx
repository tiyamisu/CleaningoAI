'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  Upload,
  Eye,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Loader2,
  X,
  RotateCcw,
  Sparkles,
  Download,
  FileText,
  Scan,
  Layers,
  Activity,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface BoundingBox {
  x: number;
  y: number;
  w: number;
  h: number;
  class: string;
  confidence: number;
}

interface AnalysisResult {
  is_demo: boolean;
  demo_disclaimer: string;
  model_version: string;
  analysis_id: string;
  image_name: string;
  processing_ms: number;
  waste_detected: boolean;
  waste_classes: string[];
  confidence: number;
  severity_estimate: string;
  bounding_boxes: BoundingBox[];
  timestamp?: string;
}

const SAMPLE_IMAGES = [
  {
    name: 'kanakapura_rd_mixed.jpg',
    label: 'Kanakapura Road Mixed Pile',
    type: 'MIXED',
    preview: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'peenya_industrial_plastics.jpg',
    label: 'Peenya Industrial Plastics',
    type: 'PLASTICS',
    preview: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'majestic_debris_stormdrain.jpg',
    label: 'Majestic Debris & Drain',
    type: 'DEBRIS',
    preview: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=600&q=80',
  },
];

const CLASS_FORMAT: Record<string, string> = {
  mixed_waste: 'Mixed Solid Waste',
  plastic_dominant_waste: 'Plastic-Dominant Waste',
  construction_debris: 'Construction & Demolition Debris',
  organic_waste: 'Organic / Biodegradable Waste',
};

export default function VisionAILabPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedSample, setSelectedSample] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(f.type)) {
      setError('Invalid file type. Please upload JPEG, PNG, or WebP.');
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError('File too large. Maximum size is 10 MB.');
      return;
    }
    setError('');
    setFile(f);
    setSelectedSample(null);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const selectSample = (sample: (typeof SAMPLE_IMAGES)[0]) => {
    setFile(null);
    setSelectedSample(sample.name);
    setPreview(sample.preview);
    setResult(null);
    setError('');
  };

  const runAnalysis = async () => {
    if (!file && !selectedSample) return;
    setLoading(true);
    setError('');

    try {
      let res: Response;
      if (file) {
        const form = new FormData();
        form.append('image', file);
        res = await fetch('/api/vision/analyze', { method: 'POST', body: form });
      } else {
        res = await fetch('/api/vision/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image_name: selectedSample, file_size: 1024 * 128 }),
        });
      }

      const data: AnalysisResult = await res.json();
      if (!res.ok) {
        setError((data as unknown as { error: string }).error || 'Computer vision analysis failed.');
        return;
      }
      setResult(data);
      setHistory((prev) => [data, ...prev.slice(0, 9)]);
    } catch {
      setError('Network communication error. Please check backend API status.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setSelectedSample(null);
    setPreview(null);
    setResult(null);
    setError('');
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-wider text-[#3C9290] uppercase">
              Module 02 · Computer Vision
            </span>
            <Badge variant="demo">Demo Mode Adapter</Badge>
          </div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#123B2E] tracking-tight mt-1">
            Vision AI Laboratory
          </h1>
          <p className="text-sm text-[#17251F]/70 mt-1 max-w-2xl">
            Automated solid waste bounding box localization, debris categorization, and photographic severity estimation.
          </p>
        </div>

        {preview && (
          <Button variant="outline" size="sm" onClick={reset} icon={RotateCcw}>
            Clear Workspace
          </Button>
        )}
      </div>

      {/* Honest Scientific Disclosure Banner */}
      <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-4.5 flex items-start gap-3.5 shadow-2xs">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <strong className="font-bold text-amber-950 uppercase tracking-wide block mb-0.5">
            Academic Research Integrity Disclosure
          </strong>
          This interface demonstrates the planned computer vision workflow using a mock inference adapter.
          A custom trained YOLOv8/v11 checkpoint is currently pending full training dataset annotation (Experiment E2).
          All class scores, bounding coordinates, and confidence metrics presented below are simulated demonstrator responses.
        </div>
      </div>

      {/* Main Grid: Upload/Preview + Inference Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Upload & Sample Selector */}
        <div className="lg:col-span-7 space-y-6">
          {/* Preset Sample Picker */}
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 mb-2.5">
              1-Click Benchmark Test Photos
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SAMPLE_IMAGES.map((sample) => {
                const isActive = selectedSample === sample.name;
                return (
                  <button
                    key={sample.name}
                    type="button"
                    onClick={() => selectSample(sample)}
                    className={`text-left p-2.5 rounded-xl border transition-all text-xs ${
                      isActive
                        ? 'border-[#123B2E] bg-white ring-2 ring-[#123B2E]/20 shadow-xs'
                        : 'border-[rgba(18,59,46,0.12)] bg-white/70 hover:bg-white hover:border-[#123B2E]/40'
                    }`}
                  >
                    <div className="h-20 w-full rounded-lg overflow-hidden bg-gray-100 mb-2 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={sample.preview}
                        alt={sample.label}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-black/60 text-white">
                        {sample.type}
                      </span>
                    </div>
                    <span className="font-heading font-semibold text-[#17251F] block truncate">
                      {sample.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Drag & Drop Area / Canvas Preview */}
          {!preview ? (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-[rgba(18,59,46,0.2)] hover:border-[#123B2E] rounded-2xl p-12 text-center cursor-pointer bg-white transition-all duration-200 group shadow-2xs hover:shadow-xs"
            >
              <div className="w-14 h-14 rounded-full bg-[#123B2E]/5 border border-[#123B2E]/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Upload className="w-6 h-6 text-[#123B2E]" />
              </div>
              <p className="font-heading font-bold text-base text-[#123B2E]">
                Drop field photograph here, or browse files
              </p>
              <p className="text-xs text-[#17251F]/60 mt-1 max-w-sm mx-auto">
                Supports JPEG, PNG, and WebP images up to 10 MB. High-resolution GPS survey photos supported.
              </p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[rgba(18,59,46,0.12)] overflow-hidden shadow-xs">
              {/* Canvas Header */}
              <div className="px-4 py-3 border-b border-[rgba(18,59,46,0.08)] bg-[#F7F7F0]/60 flex items-center justify-between text-xs font-mono">
                <span className="text-[#123B2E] font-semibold truncate max-w-xs">
                  {file ? file.name : selectedSample}
                </span>
                <span className="text-[#17251F]/50">
                  {file ? `${(file.size / 1024).toFixed(1)} KB` : 'Preset Benchmark'}
                </span>
              </div>

              {/* Viewport with Bounding Boxes */}
              <div className="relative w-full aspect-[4/3] bg-black/5 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Inspection target"
                  className="w-full h-full object-contain"
                />

                {/* SVG Bounding Boxes Overlay */}
                {result && result.bounding_boxes && result.bounding_boxes.length > 0 && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                    {result.bounding_boxes.map((box, idx) => (
                      <g key={idx}>
                        <rect
                          x={box.x}
                          y={box.y}
                          width={box.w}
                          height={box.h}
                          fill="rgba(182, 217, 87, 0.15)"
                          stroke="#B6D957"
                          strokeWidth="1.2"
                          strokeDasharray="2,1"
                        />
                        <rect
                          x={box.x}
                          y={Math.max(0, box.y - 6)}
                          width={Math.min(40, box.w + 10)}
                          height="5.5"
                          fill="#123B2E"
                          rx="0.8"
                        />
                        <text
                          x={box.x + 1}
                          y={Math.max(0, box.y - 2)}
                          fill="#FFFFFF"
                          fontSize="3.2"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          {box.class} ({Math.round(box.confidence * 100)}%)
                        </text>
                      </g>
                    ))}
                  </svg>
                )}
              </div>

              {/* Action Bar */}
              <div className="p-4 bg-white border-t border-[rgba(18,59,46,0.08)] flex items-center justify-between gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={runAnalysis}
                  disabled={loading}
                  icon={loading ? Loader2 : Sparkles}
                  className="w-full sm:w-auto"
                >
                  {loading ? 'Executing AI Inference…' : 'Run Waste Detection'}
                </Button>
                <Button variant="outline" size="md" onClick={reset} icon={X}>
                  Remove Photo
                </Button>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <XCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Right Column: Telemetry & Results Card */}
        <div className="lg:col-span-5 space-y-6">
          <Card variant="editorial">
            <CardHeader className="pb-3 border-b border-[rgba(18,59,46,0.06)]">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-heading">Inference Telemetry</CardTitle>
                {result ? (
                  <Badge variant={result.waste_detected ? 'high' : 'neutral'}>
                    {result.waste_detected ? 'Accumulation Detected' : 'Clear / Clean'}
                  </Badge>
                ) : (
                  <Badge variant="neutral">Awaiting Input</Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="pt-4 space-y-5">
              {!result ? (
                <div className="py-12 text-center text-xs text-[#17251F]/50 space-y-2">
                  <Scan className="w-8 h-8 mx-auto text-[#123B2E]/30 animate-pulse" />
                  <p className="font-semibold text-[#123B2E]">No inference executed yet</p>
                  <p className="max-w-xs mx-auto">
                    Select a benchmark sample photo on the left or upload your own field image, then click &quot;Run Waste Detection&quot;.
                  </p>
                </div>
              ) : (
                <>
                  {/* Confidence Meter */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                      <span className="text-[#17251F]/70 font-semibold">Model Confidence</span>
                      <span className="text-[#123B2E] font-bold">
                        {Math.round(result.confidence * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-[#123B2E]/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full transition-all duration-500 bg-[#3C9290]"
                        style={{ width: `${Math.round(result.confidence * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Classification Details */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-[#F7F7F0] rounded-xl border border-[rgba(18,59,46,0.06)]">
                      <span className="text-[10px] font-mono text-[#17251F]/50 block">Severity Level</span>
                      <span className="font-heading font-bold text-sm uppercase text-[#123B2E]">
                        {result.severity_estimate}
                      </span>
                    </div>
                    <div className="p-3 bg-[#F7F7F0] rounded-xl border border-[rgba(18,59,46,0.06)]">
                      <span className="text-[10px] font-mono text-[#17251F]/50 block">Inference Latency</span>
                      <span className="font-heading font-bold text-sm text-[#123B2E]">
                        {result.processing_ms} ms
                      </span>
                    </div>
                  </div>

                  {/* Detected Classes */}
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 block mb-2">
                      Detected Material Classes
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.waste_classes && result.waste_classes.length > 0 ? (
                        result.waste_classes.map((cls) => (
                          <span
                            key={cls}
                            className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-[#123B2E] text-white"
                          >
                            {CLASS_FORMAT[cls] || cls}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400">None detected</span>
                      )}
                    </div>
                  </div>

                  {/* Bounding Box Coordinates List */}
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#123B2E]/70 block mb-2">
                      Bounding Box Geometry ({result.bounding_boxes.length})
                    </span>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto">
                      {result.bounding_boxes.map((b, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2 rounded-lg bg-[#F7F7F0] text-[11px] font-mono text-[#123B2E]"
                        >
                          <span>{b.class}</span>
                          <span className="text-[#17251F]/60">
                            [{b.x}%, {b.y}%, {b.w}×{b.h}%]
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-[rgba(18,59,46,0.08)] flex flex-col gap-2">
                    <Link
                      href={`/app/reports?waste=${result.waste_classes[0] || 'MIXED'}&severity=${result.severity_estimate}`}
                      className="w-full"
                    >
                      <Button variant="primary" size="md" className="w-full" icon={FileText}>
                        Convert into Incident Report
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
