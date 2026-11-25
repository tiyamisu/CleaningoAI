'use client';

import Link from 'next/link';
import {
  ExternalLink,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const DEMO_ACCOUNTS = [
  { role: 'Municipal Officer', email: 'officer@cleaningo.ai', pass: 'demo123', scope: 'Incident Queue & Dispatch' },
  { role: 'Field Inspector', email: 'inspector@cleaningo.ai', pass: 'demo123', scope: 'On-Site Verification & Photos' },
  { role: 'Platform Admin', email: 'admin@cleaningo.ai', pass: 'demo123', scope: 'Full Access & Audit Logs' },
  { role: 'Academic Researcher', email: 'researcher@cleaningo.ai', pass: 'demo123', scope: 'Model Registry & Experiments' },
  { role: 'Citizen Reporter', email: 'citizen@cleaningo.ai', pass: 'demo123', scope: 'Public Incident Submissions' },
];

const SYSTEM_CONFIG = [
  { label: 'Core Platform', value: 'CleaningoAI Environmental Intelligence Engine v1.0.0' },
  { label: 'Framework Stack', value: 'Next.js 16.4.6 App Router + React 19 + TypeScript 5' },
  { label: 'Styling Engine', value: 'Tailwind CSS v4 + Plus Jakarta Sans + Inter + IBM Plex Mono' },
  { label: 'Primary Database', value: 'SQLite3 (better-sqlite3) Local Engine' },
  { label: 'Spatial Visualization', value: 'Leaflet.js + OpenStreetMap tiles' },
  { label: 'Computer Vision Mode', value: 'DEMO MODE Adapter (Synthetic Bounding Boxes & Confidence)' },
  { label: 'Hydrological Modeling', value: 'Demo proximity to illustrative waterway points; no verified drainage graph' },
  { label: 'Active Dataset', value: '71 field observations across 14 Bengaluru zones' },
];

export default function AppSettingsPage() {
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold tracking-wider text-[#3C9290] uppercase">
            Module 08 · System & Configuration
          </span>
          <Badge variant="verified">Local Environment</Badge>
        </div>
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#123B2E] tracking-tight mt-1">
          Platform Configuration & Telemetry
        </h1>
        <p className="text-sm text-[#17251F]/70 mt-1 max-w-2xl">
          Review operational parameters, simulated authorization roles, database health, and environmental system variables.
        </p>
      </div>

      {/* Demo Credentials Table */}
      <Card variant="editorial">
        <CardHeader className="pb-3 border-b border-[rgba(18,59,46,0.06)] flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-heading">
              Demonstration Role Accounts
            </CardTitle>
            <p className="text-xs text-[#17251F]/60">
              Pre-configured mock credentials for faculty and institutional evaluations
            </p>
          </div>
          <Link href="/signin">
            <Button variant="outline" size="sm" icon={ExternalLink}>
              Open Sign In
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#F7F7F0]/60 border-b border-[rgba(18,59,46,0.06)] font-mono font-bold text-[#123B2E]/70 uppercase text-[10px]">
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Demo Email</th>
                <th className="px-4 py-3">Password</th>
                <th className="px-4 py-3">Permissions Scope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(18,59,46,0.05)]">
              {DEMO_ACCOUNTS.map((acc) => (
                <tr key={acc.role} className="hover:bg-[#F7F7F0]/40 transition-colors">
                  <td className="px-4 py-3 font-heading font-semibold text-[#123B2E]">
                    {acc.role}
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[#3C9290]">
                    {acc.email}
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-gray-500">
                    {acc.pass}
                  </td>
                  <td className="px-4 py-3 text-[11px] text-[#17251F]/70">
                    {acc.scope}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* System Technical Telemetry Table */}
      <Card variant="editorial">
        <CardHeader className="pb-3 border-b border-[rgba(18,59,46,0.06)]">
          <CardTitle className="text-base font-heading">
            Technical Architecture Telemetry
          </CardTitle>
          <p className="text-xs text-[#17251F]/60">
            Runtime environment and active system parameters
          </p>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="divide-y divide-[rgba(18,59,46,0.06)] text-xs">
            {SYSTEM_CONFIG.map((cfg) => (
              <div key={cfg.label} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-mono text-[11px] text-[#17251F]/60 font-semibold w-56 shrink-0">
                  {cfg.label}
                </span>
                <span className="font-heading font-medium text-[#123B2E] text-right sm:text-left">
                  {cfg.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
