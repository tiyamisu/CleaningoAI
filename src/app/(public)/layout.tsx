import PublicNav from '@/components/layout/PublicNav';
import PublicFooter from '@/components/layout/PublicFooter';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf8]">
      <PublicNav />
      <main className="public-main flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
