import { IntelligenceNav } from '@/components/layout/IntelligenceNav';

export default function IntelligenceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="workspace-frame flex overflow-hidden">
      <IntelligenceNav />
      <main className="workspace-main flex-1">
        {children}
      </main>
    </div>
  );
}
