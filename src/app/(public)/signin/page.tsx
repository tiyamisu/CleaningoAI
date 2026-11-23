'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogIn, Eye, EyeOff, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import { CleaningoEmblem } from '@/components/layout/PublicNav';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

const DEMO_CREDENTIALS = [
  {
    role: 'Municipal Officer',
    badge: 'BBMP Operations',
    email: 'officer@cleaningoai.in',
    password: 'officer123',
    dest: '/ops',
    desc: 'Verify incoming reports, assign field inspectors, and review audit history.',
  },
  {
    role: 'Field Inspector',
    badge: 'Sanitary Inspector',
    email: 'inspector@cleaningoai.in',
    password: 'inspector123',
    dest: '/ops/inspect',
    desc: 'Conduct on-site inspections, document evidence, and resolve incidents.',
  },
  {
    role: 'Platform Administrator',
    badge: 'System Admin',
    email: 'admin@cleaningoai.in',
    password: 'admin123',
    dest: '/ops/admin',
    desc: 'Full platform management, telemetry, and database seed controls.',
  },
  {
    role: 'Academic Researcher',
    badge: 'Research Consortium',
    email: 'researcher@cleaningoai.in',
    password: 'researcher123',
    dest: '/app/research',
    desc: 'Access experimental datasets, models, and spatial analytics.',
  },
  {
    role: 'Citizen Reporter',
    badge: 'Civic Volunteer',
    email: 'reporter@cleaningoai.in',
    password: 'reporter123',
    dest: '/app/reports',
    desc: 'Submit new geotagged waste observations with 4-step wizard.',
  },
];

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function fillCred(c: typeof DEMO_CREDENTIALS[0]) {
    setEmail(c.email);
    setPassword(c.password);
    setError('');
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const match = DEMO_CREDENTIALS.find(
      (c) => c.email.toLowerCase() === email.toLowerCase() && c.password === password
    );

    setTimeout(() => {
      setLoading(false);
      if (match) {
        router.push(match.dest);
      } else {
        setError('Invalid credentials. Please click any demo account on the right to auto-fill.');
      }
    }, 400);
  }

  return (
    <div className="bg-[#F7F7F0] min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Sign In Form (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="editorial-card p-8 bg-white space-y-6">
              <div className="flex items-center gap-3">
                <CleaningoEmblem size={38} />
                <div>
                  <h1 className="font-heading font-extrabold text-2xl text-[#123B2E] tracking-tight">
                    Sign In to Platform
                  </h1>
                  <p className="text-xs text-[rgba(23,37,31,0.6)] font-mono">
                    Select a role to access the workspace
                  </p>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 pt-2">
                <Input
                  label="Email Address"
                  type="email"
                  required
                  placeholder="officer@cleaningoai.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#17251F] uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white border border-[rgba(18,59,46,0.16)] text-[#17251F] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#123B2E] focus:ring-2 focus:ring-[#123B2E]/10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={loading}
                  rightIcon={<ArrowRight className="w-4 h-4 text-[#B6D957]" />}
                  className="w-full justify-center mt-2"
                >
                  Enter Workspace
                </Button>
              </form>

              <div className="pt-4 border-t border-[rgba(18,59,46,0.08)] flex items-center justify-between text-xs text-[rgba(23,37,31,0.6)]">
                <Link href="/" className="hover:text-[#123B2E] underline">
                  ← Back to Public Website
                </Link>
                <Link href="/app" className="hover:text-[#123B2E] font-medium">
                  Direct Guest Access →
                </Link>
              </div>
            </div>
          </div>

          {/* Right: 1-Click Role Selector (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3C9290]">
                  Instant Role Evaluation
                </span>
                <h2 className="font-heading font-bold text-xl text-[#123B2E]">
                  Click Any Profile to Auto-Fill Credentials
                </h2>
              </div>
              <Badge variant="verified">Demo System</Badge>
            </div>

            <div className="space-y-3 pt-2">
              {DEMO_CREDENTIALS.map((c) => (
                <button
                  key={c.email}
                  type="button"
                  onClick={() => fillCred(c)}
                  className={`w-full text-left editorial-card p-4 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    email === c.email ? 'border-[#123B2E] ring-2 ring-[#123B2E]/10 bg-white' : 'hover:bg-white'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#123B2E]">{c.role}</span>
                      <Badge variant="neutral">{c.badge}</Badge>
                    </div>
                    <p className="text-xs text-[rgba(23,37,31,0.65)]">{c.desc}</p>
                    <div className="text-[11px] font-mono text-[rgba(23,37,31,0.5)]">
                      {c.email}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-[#F7F7F0] border border-[rgba(18,59,46,0.08)] text-[#123B2E]">
                      Auto-Fill
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-white border border-[rgba(18,59,46,0.08)] text-xs text-[rgba(23,37,31,0.65)] flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#3C9290] shrink-0 mt-0.5" />
              <span>
                Demonstration platform provided for academic and faculty evaluation. All pre-configured roles are fully unlocked and connected to persistent SQLite data.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
