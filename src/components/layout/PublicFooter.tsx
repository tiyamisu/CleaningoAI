import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, MapPin, ArrowRight } from 'lucide-react';

const FOOTER_SECTIONS = [
  {
    title: 'Platform Capabilities',
    links: [
      { label: 'Intelligence Overview', href: '/app' },
      { label: 'GeoIntel Map Explorer', href: '/app/map' },
      { label: 'Vision AI Laboratory', href: '/app/vision' },
      { label: 'Severity Engine', href: '/app/severity' },
      { label: 'HydroRisk Analysis', href: '/app/hydrorisk' },
      { label: 'Incident Operations', href: '/ops' },
    ],
  },
  {
    title: 'Research & Science',
    links: [
      { label: 'Proposal & Methodology', href: '/research' },
      { label: 'Bengaluru Field Study', href: '/impact' },
      { label: 'Technical Pipeline', href: '/technology' },
      { label: 'Experiment Ledger (E1–E4)', href: '/app/research' },
      { label: 'Severity Rubric', href: '/app/severity' },
    ],
  },
  {
    title: 'Solutions & Roles',
    links: [
      { label: 'For Municipal Corporations', href: '/solutions' },
      { label: 'For Academic Institutions', href: '/solutions' },
      { label: 'For Field Inspection Teams', href: '/ops/inspect' },
      { label: 'Partnership Program', href: '/partnerships' },
      { label: 'Contact Research Team', href: '/contact' },
    ],
  },
];

export default function PublicFooter() {
  return (
    <footer className="bg-[#0B2922] text-[#F7F7F0] border-t border-[rgba(182,217,87,0.15)] relative overflow-hidden">
      {/* Background ambient gradient */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #B6D957 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="rounded-lg overflow-hidden border border-white/10 bg-black/20 p-1">
                <Image src="/logo-dark.svg" alt="CleaningoAI" width={210} height={53} className="h-12 w-auto object-contain" />
              </div>
            </Link>

            <p className="text-sm text-[#DCE8DA]/80 leading-relaxed max-w-sm mt-1">
              An enterprise-grade environmental intelligence platform integrating computer vision, geospatial mapping, and drainage-network connectivity to transform informal solid waste observations into prioritized municipal action.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#B6D957] bg-[#123B2E] border border-[rgba(182,217,87,0.2)] rounded-lg px-3 py-2 w-fit mt-1">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>Bengaluru Pilot · 71 Verified Observation Coordinates</span>
            </div>
          </div>

          {/* Links Columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#B6D957]">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-[#DCE8DA]/70 hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#B6D957]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#DCE8DA]/60">
          <p>© 2026 CleaningoAI Research Consortium. Developed for Academic Research and Municipal Pilot Deployment.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-[#B6D957]">
              <ShieldCheck className="w-4 h-4" /> Academic Research Prototype
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
