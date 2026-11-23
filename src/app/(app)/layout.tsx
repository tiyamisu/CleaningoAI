import { AppNav } from '@/components/layout/AppNav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="workspace-frame flex overflow-hidden">
      <AppNav />
      <main className="workspace-main flex-1">
        {children}
      </main>
    </div>
  );
}
