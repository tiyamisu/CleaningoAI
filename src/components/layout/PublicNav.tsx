'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X, Sparkles, Compass } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const NAV_LINKS = [
  { label: 'Overview', href: '/' },
  { label: 'Technology', href: '/technology' },
  { label: 'Research', href: '/research' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Impact', href: '/impact' },
  { label: 'Contact', href: '/contact' },
];

export function CleaningoEmblem({ size = 32 }: { size?: number }) {
  return (
    <div
      className="relative rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-white shadow-xs border border-[rgba(18,59,46,0.1)]"
      style={{ width: size, height: size }}
    >
      {/* Official emblem representation */}
      <svg
        width={size * 0.75}
        height={size * 0.75}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 10C27.5 4 17 4 11 9.5C5 15 5 25 11 30.5C17 36 27.5 36 32 30"
          stroke="#123B2E"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M20 7C22 13 28 16 35 15C32 23 25 25 20 22C16 19 17 11 20 7Z"
          fill="#B6D957"
        />
        <path
          d="M12 26C16 23 24 23 28 26C32 29 36 28 38 27"
          stroke="#3C9290"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function PublicNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-[rgba(18,59,46,0.08)] py-3'
          : 'bg-[#F7F7F0]/90 backdrop-blur-xs border-b border-[rgba(18,59,46,0.05)] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-auto flex items-center">
              <Image
                src="/logo.svg"
                alt="CleaningoAI"
                width={200}
                height={50}
                priority
                className="h-10 w-auto object-contain transition-opacity hover:opacity-90"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/70 p-1.5 rounded-full border border-[rgba(18,59,46,0.08)] shadow-2xs">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 select-none ${
                    isActive
                      ? 'bg-[#123B2E] text-white shadow-xs'
                      : 'text-[#17251F]/75 hover:text-[#123B2E] hover:bg-[#F7F7F0]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/signin"
              className="text-xs font-semibold text-[#17251F]/80 hover:text-[#123B2E] px-3 py-2 rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <Link href="/app">
              <Button
                variant="primary"
                size="sm"
                rightIcon={<ArrowUpRight className="w-3.5 h-3.5 text-[#B6D957]" />}
                className="shadow-sm"
              >
                Launch Intelligence App
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-[#123B2E] hover:bg-[rgba(18,59,46,0.06)] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-[rgba(18,59,46,0.1)] px-4 pt-4 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#123B2E] text-white'
                      : 'text-[#17251F] hover:bg-[#F7F7F0]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[rgba(18,59,46,0.08)] flex flex-col gap-2">
            <Link href="/signin" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" size="sm" className="w-full justify-center">
                Sign In to Platform
              </Button>
            </Link>
            <Link href="/app" onClick={() => setMobileOpen(false)}>
              <Button variant="primary" size="sm" className="w-full justify-center">
                Launch Intelligence App
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
