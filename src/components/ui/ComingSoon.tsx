import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  domain: string;
  description: string;
  backHref: string;
  backLabel: string;
  plannedFeatures?: string[];
}

export function ComingSoon({ title, domain, description, backHref, backLabel, plannedFeatures }: ComingSoonProps) {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[rgba(23,37,31,0.55)] hover:text-[#123B2E] transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> {backLabel}
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3C9290]">{domain}</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-[#123B2E]">{title}</h1>
        <p className="text-sm text-[rgba(23,37,31,0.65)] mt-3 max-w-2xl leading-relaxed">{description}</p>
      </div>

      <div className="editorial-card p-8 flex flex-col items-center text-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-[#F7F7F0] border border-[rgba(18,59,46,0.1)] flex items-center justify-center">
          <Clock className="w-8 h-8 text-[#3C9290]" />
        </div>
        <div>
          <h2 className="font-heading font-bold text-xl text-[#123B2E]">Module Under Development</h2>
          <p className="text-sm text-[rgba(23,37,31,0.65)] mt-2 max-w-lg">
            This module is part of the CleaningoAI V2.0 platform roadmap.
            It will be built and activated as the platform expands beyond the Bengaluru pilot.
          </p>
        </div>

        {plannedFeatures && plannedFeatures.length > 0 && (
          <div className="w-full max-w-md text-left">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[rgba(23,37,31,0.5)] mb-3">
              Planned Features
            </p>
            <ul className="space-y-2">
              {plannedFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[rgba(23,37,31,0.7)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B6D957] mt-2 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-4 border-t border-[rgba(18,59,46,0.08)] w-full text-xs font-mono text-[rgba(23,37,31,0.4)] text-center">
          No synthetic data or placeholder statistics are shown here. This module will display real data when activated.
        </div>
      </div>
    </div>
  );
}
