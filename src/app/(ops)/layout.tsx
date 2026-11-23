import { OpsNav } from '@/components/layout/OpsNav';

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ops-frame flex min-h-dvh overflow-hidden">
      <OpsNav />
      <main className="ops-main flex-1">
        {children}
      </main>
    </div>
  );
}

