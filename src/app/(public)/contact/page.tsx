'use client';

import { useState } from 'react';
import { MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

const SUBJECTS = [
  'Academic / University Collaboration',
  'Municipal Pilot Deployment (BBMP)',
  'NGO / Community Partnership',
  'Dataset Access Request',
  'Technical Query / Contribution',
  'General Inquiry',
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    org: '',
    subject: SUBJECTS[0],
    message: '',
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-[#F7F7F0] min-h-screen pt-28 pb-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14">
        <div className="max-w-3xl">
          <Badge variant="verified">Communication Portal</Badge>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#123B2E] mt-3 leading-tight">
            Connect with the CleaningoAI Research & Engineering Team
          </h1>
          <p className="text-base sm:text-lg text-[rgba(23,37,31,0.75)] mt-4 leading-relaxed">
            Whether you represent a municipal corporation, university research lab, or environmental civic organization, we welcome dialogue.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="bg-white py-16 border-y border-[rgba(18,59,46,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3C9290]">
                Headquarters & Lab
              </span>
              <div className="mt-3 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#123B2E] shrink-0 mt-0.5" />
                <div className="text-sm text-[rgba(23,37,31,0.8)] leading-relaxed">
                  <strong>CleaningoAI Urban Environmental Intelligence Lab</strong><br />
                  Bengaluru Urban District, Karnataka 560001<br />
                  India
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3C9290]">
                Direct Contacts
              </span>
              <div className="mt-3 space-y-2 text-xs font-mono text-[rgba(23,37,31,0.75)]">
                <div>
                  <span className="text-[rgba(23,37,31,0.45)]">Research Consortium: </span>
                  <a href="mailto:research@cleaningoai.in" className="text-[#123B2E] font-bold hover:underline">
                    research@cleaningoai.in
                  </a>
                </div>
                <div>
                  <span className="text-[rgba(23,37,31,0.45)]">Municipal Deployments: </span>
                  <a href="mailto:municipal@cleaningoai.in" className="text-[#123B2E] font-bold hover:underline">
                    municipal@cleaningoai.in
                  </a>
                </div>
                <div>
                  <span className="text-[rgba(23,37,31,0.45)]">General Desk: </span>
                  <a href="mailto:hello@cleaningoai.in" className="text-[#123B2E] font-bold hover:underline">
                    hello@cleaningoai.in
                  </a>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#F7F7F0] border border-[rgba(18,59,46,0.08)] space-y-2">
              <span className="text-xs font-mono font-bold text-[#123B2E] uppercase tracking-wider">
                SLA & Turnaround
              </span>
              <p className="text-xs text-[rgba(23,37,31,0.7)] leading-relaxed">
                Academic and municipal inquiries are acknowledged within 48 business hours. For urgent field pilot demos, please note in the subject line.
              </p>
            </div>
          </div>

          {/* Form / Confirmation */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="editorial-card p-10 text-center flex flex-col items-center justify-center min-h-[350px]">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-[#123B2E]">Message Received</h3>
                <p className="text-sm text-[rgba(23,37,31,0.7)] max-w-sm mt-2">
                  Thank you, <strong>{form.name}</strong>. A researcher will review your note regarding &ldquo;{form.subject}&rdquo; and reply to <strong>{form.email}</strong> shortly.
                </p>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', org: '', subject: SUBJECTS[0], message: '' });
                    }}
                  >
                    Send Another Note
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="editorial-card p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Full Name"
                    required
                    placeholder="Dr. Ananya Krishnan"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <Input
                    label="Institutional Email"
                    type="email"
                    required
                    placeholder="ananya@iisc.ac.in"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Organization / University"
                    placeholder="IISc / BBMP / NGO"
                    value={form.org}
                    onChange={(e) => setForm({ ...form, org: e.target.value })}
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#17251F] uppercase tracking-wider">
                      Subject Area
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-white border border-[rgba(18,59,46,0.16)] text-[#17251F] rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#123B2E] focus:ring-2 focus:ring-[#123B2E]/10"
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#17251F] uppercase tracking-wider">
                    Inquiry Details
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Please outline your proposed study, municipal ward scope, or data collaboration question..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white border border-[rgba(18,59,46,0.16)] text-[#17251F] placeholder-[rgba(23,37,31,0.4)] rounded-lg p-3.5 text-sm focus:outline-none focus:border-[#123B2E] focus:ring-2 focus:ring-[#123B2E]/10 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  rightIcon={<Send className="w-4 h-4 text-[#B6D957]" />}
                  className="w-full sm:w-auto"
                >
                  Transmit Inquiry
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
