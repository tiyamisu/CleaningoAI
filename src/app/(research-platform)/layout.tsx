import { ResearchNav } from '@/components/layout/ResearchNav';

export default function ResearchPlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="workspace-frame flex overflow-hidden">
      <ResearchNav />
      <main className="workspace-main flex-1">
        {children}
      </main>
    </div>
  );
}
