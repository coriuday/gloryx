'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Cpu, GitMerge, TrendingUp, BarChart3, Server, Layers, ArrowLeft, ArrowRight, CheckCircle, AlertCircle, Download, CalendarCheck, Sparkles } from 'lucide-react';

// ── Types ────────────────────────────────────────────────
interface Solution {
  id: string;
  icon: React.ElementType;
  name: string;
  description: string;
}

interface ContactInfo {
  name: string;
  company: string;
  email: string;
  website: string;
  brief: string;
}

interface BlueprintResult {
  projectRef: string;
  status: string;
  blueprint: string;
}

// ── Data ─────────────────────────────────────────────────
const SOLUTIONS: Solution[] = [
  { id: 'ai-systems',     icon: Cpu,        name: 'AI Systems',             description: 'Custom AI pipelines, agents, and model integrations.' },
  { id: 'saas-dev',       icon: Layers,     name: 'SaaS Development',       description: 'Full-stack web platforms engineered for scale.' },
  { id: 'crm',            icon: GitMerge,   name: 'CRM Automation',         description: 'Intelligent lead workflows and WhatsApp automation.' },
  { id: 'growth',         icon: TrendingUp, name: 'Growth Engineering',     description: 'SEO, acquisition systems, and conversion optimization.' },
  { id: 'dashboards',     icon: BarChart3,  name: 'Enterprise Dashboards',  description: 'Real-time analytics and business intelligence platforms.' },
  { id: 'infrastructure', icon: Server,     name: 'Infrastructure & DevOps',description: 'Cloud architecture, CI/CD, and API gateway engineering.' },
];

const TIMELINES = ['1 Month', '2 Months', '3 Months', '6 Months', 'Ongoing'];
const BUDGETS  = [
  { label: '$5K – $10K',  value: 7500 },
  { label: '$10K – $25K', value: 17500 },
  { label: '$25K – $50K', value: 37500 },
  { label: '$50K+',       value: 75000 },
];

const STEPS = [
  { num: 1, label: 'Solutions' },
  { num: 2, label: 'Parameters' },
  { num: 3, label: 'Your Info' },
];

// ── Main Component ────────────────────────────────────────
export default function PlannerPage() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [budget, setBudget] = useState<number | null>(null);
  const [timeline, setTimeline] = useState('3 Months');
  const [contact, setContact] = useState<ContactInfo>({
    name: '', company: '', email: '', website: '', brief: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BlueprintResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ── Validation ─────────────────────────────────────────
  const step1Valid = selected.length > 0;
  const step2Valid = budget !== null;
  const step3Valid = contact.name.trim() && contact.email.trim() && contact.email.includes('@');

  // ── Handlers ───────────────────────────────────────────
  const toggleSolution = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const submitBlueprint = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/heist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codeName: contact.name,
          corporation: contact.company,
          email: contact.email,
          channel: contact.website,
          brief: contact.brief,
          targets: selected,
          budget,
          timeline,
        }),
      });

      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      setResult({
        projectRef: data.heistCode || `BS-${Date.now().toString(36).toUpperCase()}`,
        status: data.status || 'BLUEPRINT READY',
        blueprint: data.blueprint || 'Your system blueprint is being prepared by our team.',
      });
    } catch {
      setError('Failed to generate your blueprint. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  // ── Slide animation ────────────────────────────────────
  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -40 }),
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">

          {/* ── Page header ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: 'var(--accent-light)', border: '1px solid var(--border-default)' }}
            >
              <Sparkles size={14} style={{ color: 'var(--accent)' }} />
              <span className="font-sans text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                Free Strategy Session
              </span>
            </div>
            <h1
              className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Strategy <span className="gradient-text">Configurator</span>
            </h1>
            <p className="font-sans text-lg" style={{ color: 'var(--text-secondary)' }}>
              Tell us what you need. We&apos;ll generate a tailored system blueprint for your business — at no cost.
            </p>
          </motion.div>

          {/* ── Stepper ─────────────────────────────────── */}
          {!result && (
            <div className="flex items-center justify-center gap-3 mb-10">
              {STEPS.map((s, i) => (
                <React.Fragment key={s.num}>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm transition-all duration-300"
                      style={{
                        background: step >= s.num ? 'var(--gradient-primary)' : 'var(--glass-2)',
                        color: step >= s.num ? '#fff' : 'var(--text-muted)',
                        border: step === s.num ? '2px solid var(--accent)' : '2px solid var(--glass-border-1)',
                        boxShadow: step === s.num ? 'var(--shadow-brand)' : 'none',
                      }}
                    >
                      {step > s.num ? <CheckCircle size={14} /> : s.num}
                    </div>
                    <span
                      className="font-sans text-sm font-medium hidden sm:block transition-colors duration-300"
                      style={{ color: step >= s.num ? 'var(--text-primary)' : 'var(--text-muted)' }}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className="flex-1 h-px transition-all duration-500 max-w-20"
                      style={{ backgroundColor: step > s.num ? 'var(--accent)' : 'var(--border-subtle)' }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* ── Card ────────────────────────────────────── */}
          <div className="glass-card rounded-3xl overflow-hidden">
            <AnimatePresence mode="wait" custom={1}>

              {/* ── Step 1: Solutions ────────────────────── */}
              {!result && step === 1 && (
                <motion.div
                  key="step1" custom={1}
                  variants={slideVariants} initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="p-8"
                >
                  <h2 className="font-display font-bold text-2xl mb-2" style={{ color: 'var(--text-primary)' }}>
                    Choose Your Solutions
                  </h2>
                  <p className="font-sans text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
                    Select all that apply — you can choose multiple.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {SOLUTIONS.map((sol) => {
                      const isActive = selected.includes(sol.id);
                      return (
                        <button
                          key={sol.id}
                          onClick={() => toggleSolution(sol.id)}
                          className="text-left p-5 rounded-xl transition-all duration-200 group"
                          style={{
                            backgroundColor: isActive ? 'var(--accent-light)' : 'var(--bg-secondary)',
                            border: `1.5px solid ${isActive ? 'var(--accent)' : 'var(--border-subtle)'}`,
                            boxShadow: isActive ? 'var(--shadow-brand)' : 'none',
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200"
                              style={{
                                background: isActive ? 'linear-gradient(135deg, #6366f1, #06b6d4)' : 'var(--bg-tertiary)',
                              }}
                            >
                              <sol.icon size={18} style={{ color: isActive ? '#fff' : 'var(--text-muted)' }} />
                            </div>
                            <div>
                              <p
                                className="font-display font-bold text-sm mb-1 transition-colors duration-200"
                                style={{ color: isActive ? 'var(--accent)' : 'var(--text-primary)' }}
                              >
                                {sol.name}
                              </p>
                              <p className="font-sans text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                {sol.description}
                              </p>
                            </div>
                            {isActive && <CheckCircle size={16} style={{ color: 'var(--accent)', marginLeft: 'auto', flexShrink: 0 }} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {selected.length > 0 && (
                    <p className="text-sm mb-4 font-medium" style={{ color: 'var(--accent)' }}>
                      {selected.length} solution{selected.length !== 1 ? 's' : ''} selected
                    </p>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={() => step1Valid && setStep(2)}
                      disabled={!step1Valid}
                      className="btn-primary px-7 py-3 text-sm"
                      style={{ opacity: step1Valid ? 1 : 0.45, cursor: step1Valid ? 'pointer' : 'not-allowed' }}
                    >
                      Continue
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Step 2: Parameters ───────────────────── */}
              {!result && step === 2 && (
                <motion.div
                  key="step2" custom={1}
                  variants={slideVariants} initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="p-8"
                >
                  <h2 className="font-display font-bold text-2xl mb-2" style={{ color: 'var(--text-primary)' }}>
                    Set Your Parameters
                  </h2>
                  <p className="font-sans text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
                    Help us scope your project accurately.
                  </p>

                  {/* Budget */}
                  <div className="mb-8">
                    <label className="block font-display font-bold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
                      Investment Range
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {BUDGETS.map((b) => (
                        <button
                          key={b.label}
                          onClick={() => setBudget(b.value)}
                          className="py-4 px-5 rounded-xl font-display font-semibold text-sm transition-all duration-200"
                          style={{
                            backgroundColor: budget === b.value ? 'var(--accent-light)' : 'var(--bg-secondary)',
                            border: `1.5px solid ${budget === b.value ? 'var(--accent)' : 'var(--border-subtle)'}`,
                            color: budget === b.value ? 'var(--accent)' : 'var(--text-primary)',
                            boxShadow: budget === b.value ? 'var(--shadow-brand)' : 'none',
                          }}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mb-8">
                    <label className="block font-display font-bold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
                      Desired Timeline
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TIMELINES.map((t) => (
                        <button
                          key={t}
                          onClick={() => setTimeline(t)}
                          className="px-5 py-2.5 rounded-xl font-sans font-medium text-sm transition-all duration-200"
                          style={{
                            backgroundColor: timeline === t ? 'var(--accent-light)' : 'var(--bg-secondary)',
                            border: `1.5px solid ${timeline === t ? 'var(--accent)' : 'var(--border-subtle)'}`,
                            color: timeline === t ? 'var(--accent)' : 'var(--text-secondary)',
                          }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button onClick={() => setStep(1)} className="btn-secondary px-6 py-3 text-sm">
                      <ArrowLeft size={15} />
                      Back
                    </button>
                    <button
                      onClick={() => step2Valid && setStep(3)}
                      disabled={!step2Valid}
                      className="btn-primary px-7 py-3 text-sm"
                      style={{ opacity: step2Valid ? 1 : 0.45, cursor: step2Valid ? 'pointer' : 'not-allowed' }}
                    >
                      Continue
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Step 3: Your Info ────────────────────── */}
              {!result && step === 3 && (
                <motion.div
                  key="step3" custom={1}
                  variants={slideVariants} initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="p-8"
                >
                  <h2 className="font-display font-bold text-2xl mb-2" style={{ color: 'var(--text-primary)' }}>
                    Your Information
                  </h2>
                  <p className="font-sans text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
                    We&apos;ll use this to personalise your system blueprint and follow up with next steps.
                  </p>

                  <div className="space-y-4 mb-8">
                    {[
                      { key: 'name', label: 'Your Name', placeholder: 'Alex Johnson', required: true },
                      { key: 'company', label: 'Company / Organisation', placeholder: 'Acme Corp', required: false },
                      { key: 'email', label: 'Email Address', placeholder: 'you@yourcompany.com', required: true, type: 'email' },
                      { key: 'website', label: 'Current Website', placeholder: 'https://yourcompany.com', required: false },
                    ].map(({ key, label, placeholder, required, type }) => (
                      <div key={key}>
                        <label className="block font-sans font-semibold text-xs mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                          {label}{required && <span style={{ color: 'var(--accent)' }}> *</span>}
                        </label>
                        <input
                          type={type || 'text'}
                          value={(contact as unknown as Record<string, string>)[key]}
                          onChange={(e) => setContact((prev) => ({ ...prev, [key]: e.target.value }))}
                          placeholder={placeholder}
                          className="input-cinematic text-sm"
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block font-sans font-semibold text-xs mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                        Project Brief <span className="normal-case">(optional)</span>
                      </label>
                      <textarea
                        value={contact.brief}
                        onChange={(e) => setContact((prev) => ({ ...prev, brief: e.target.value }))}
                        placeholder="Briefly describe your project goals, challenges, or anything else we should know..."
                        rows={4}
                        className="input-cinematic text-sm"
                        style={{ resize: 'vertical' }}
                      />
                    </div>
                  </div>

                  {error && (
                    <div
                      className="flex items-center gap-2 px-4 py-3 rounded-xl mb-6 text-sm"
                      style={{ backgroundColor: 'rgba(251,113,133,0.1)', border: '1px solid rgba(251,113,133,0.3)', color: '#fb7185' }}
                    >
                      <AlertCircle size={15} />
                      {error}
                    </div>
                  )}

                  <div className="flex justify-between">
                    <button onClick={() => setStep(2)} className="btn-secondary px-6 py-3 text-sm">
                      <ArrowLeft size={15} />
                      Back
                    </button>
                    <button
                      onClick={() => step3Valid && submitBlueprint()}
                      disabled={!step3Valid || loading}
                      className="btn-primary px-7 py-3 text-sm"
                      style={{ opacity: (step3Valid && !loading) ? 1 : 0.55, cursor: (step3Valid && !loading) ? 'pointer' : 'not-allowed' }}
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Generating Blueprint...
                        </>
                      ) : (
                        <>
                          <Sparkles size={15} />
                          Generate Blueprint
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Blueprint Result ─────────────────────── */}
              {result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="p-8"
                >
                  {/* Success header */}
                  <div className="text-center mb-8">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                      style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', boxShadow: 'var(--shadow-brand)' }}
                    >
                      <CheckCircle size={28} className="text-white" />
                    </div>
                    <h2 className="font-display font-bold text-3xl mb-2" style={{ color: 'var(--text-primary)' }}>
                      Your Blueprint is Ready
                    </h2>
                    <p className="font-sans text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Project Reference: <span className="font-mono font-bold" style={{ color: 'var(--accent)' }}>{result.projectRef}</span>
                    </p>
                  </div>

                  {/* Blueprint content */}
                  <div
                    className="rounded-xl p-6 mb-6 whitespace-pre-wrap font-sans text-sm leading-relaxed"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-default)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {result.blueprint}
                  </div>

                  {/* Selected solutions summary */}
                  <div className="mb-6">
                    <p className="font-sans font-semibold text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                      Scoped Solutions
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selected.map((id) => {
                        const sol = SOLUTIONS.find((s) => s.id === id);
                        return sol ? (
                          <span
                            key={id}
                            className="px-3 py-1.5 rounded-full font-sans text-xs font-medium"
                            style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)', border: '1px solid var(--border-default)' }}
                          >
                            {sol.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button className="btn-primary flex-1 justify-center text-sm py-3">
                      <CalendarCheck size={16} />
                      Start a Conversation
                    </button>
                    <button
                      onClick={() => {
                        const blob = new Blob([`PROJECT REF: ${result.projectRef}\n\n${result.blueprint}`], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a'); a.href = url; a.download = `BinaryScouts-Blueprint-${result.projectRef}.txt`; a.click(); URL.revokeObjectURL(url);
                      }}
                      className="btn-secondary text-sm py-3 px-5"
                    >
                      <Download size={15} />
                      Download
                    </button>
                    <button
                      onClick={() => { setResult(null); setStep(1); setSelected([]); setBudget(null); setTimeline('3 Months'); setContact({ name: '', company: '', email: '', website: '', brief: '' }); }}
                      className="btn-secondary text-sm py-3 px-5"
                    >
                      Start Over
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* ── Summary strip ───────────────────────────── */}
          {!result && step > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 px-5 py-4 rounded-xl flex flex-wrap gap-4 text-xs"
              style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}
            >
              {selected.length > 0 && (
                <span style={{ color: 'var(--text-muted)' }}>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Solutions: </span>
                  {selected.map((id) => SOLUTIONS.find((s) => s.id === id)?.name).filter(Boolean).join(', ')}
                </span>
              )}
              {budget && (
                <span style={{ color: 'var(--text-muted)' }}>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Budget: </span>
                  {BUDGETS.find((b) => b.value === budget)?.label}
                </span>
              )}
              <span style={{ color: 'var(--text-muted)' }}>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Timeline: </span>
                {timeline}
              </span>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
