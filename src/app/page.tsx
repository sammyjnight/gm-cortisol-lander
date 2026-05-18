"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  AlertTriangle, X, Zap, Lightbulb, Shield, Target, Rocket,
  TrendingUp, Brain, ChevronDown, Check, HelpCircle, Minus,
  Dumbbell, Heart, Moon, Sun, Leaf, BookOpen, Microscope,
  Award, ArrowRight, Eye, BatteryFull, Factory, FlaskConical,
  Package, ShieldCheck, Truck, ExternalLink,
} from "lucide-react";

/* ───────── constants ───────── */
const SHOP_URL = "https://justfloow.com/products/genius-mind";

/* ───────── reusable components ───────── */

function SectionNumber({ num, label }: { num: string; label: string }) {
  return (
    <p className="label-mono text-[var(--color-brand)] mb-4 text-xs">
      {num} &mdash; {label}
    </p>
  );
}

function BreakoutLine({ children }: { children: React.ReactNode }) {
  return <p className="breakout-line">{children}</p>;
}

function Skeleton({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`skeleton-placeholder ${className}`}>
      <p className="label-mono text-[var(--color-brand)] opacity-50 text-[10px] z-10 text-center px-4">
        Asset TODO: {label}
      </p>
    </div>
  );
}

function FadeUp({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerChildren({
  children,
  className = "",
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const childFade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function AnimatedBar({ value, max, delay = 0 }: { value: number; max: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const pct = (value / max) * 100;
  return (
    <div ref={ref} className="w-full bg-[var(--color-surface)] rounded-full h-3 overflow-hidden">
      <motion.div
        className="h-3 rounded-full"
        style={{ background: "linear-gradient(90deg, var(--color-brand), #33BBE0)" }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : { width: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay }}
      />
    </div>
  );
}

function CountUp({ target, delay = 0 }: { target: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start - delay * 1000;
      if (elapsed < 0) { requestAnimationFrame(tick); return; }
      const progress = Math.min(elapsed / dur, 1);
      setVal(Math.round(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, delay]);
  return <span ref={ref}>{val}</span>;
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function CognitiveLander() {
  const [stickyVisible, setStickyVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ══════════════ HEADER ══════════════ */}
      <header className="bg-[var(--color-background)] border-b border-[var(--color-border)] py-4 sticky top-0 z-40 backdrop-blur-md bg-opacity-90">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <a href={SHOP_URL} className="text-white font-black text-lg tracking-[0.12em]">
            GENIUS MIND
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-[var(--color-text-secondary)]">
            <a href={SHOP_URL} className="hover:text-white transition-colors">Shop Now</a>
            <a href="#formula" className="hover:text-white transition-colors">Science</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>
        </div>
      </header>

      {/* ══════════════ §1 HERO ══════════════ */}
      <section className="section-gradient py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <p className="label-mono text-[var(--color-brand)] mb-5">
                16 Ingredients. One Formula. Zero BS.
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-black leading-[1.06] mb-6 tracking-tight">
                Your Brain Isn&apos;t Tired. It&apos;s Running On What{" "}
                <span className="text-[var(--color-brand)]">Cortisol Left Behind.</span>
              </h1>
              <p className="text-white font-semibold text-lg mb-4 leading-snug">
                Every high-pressure year you&apos;ve run this business, cortisol has been
                wearing down the chemistry your brain needs to think clearly. This is
                how you restore it.
              </p>
              <p className="text-[var(--color-text-secondary)] mb-3 leading-relaxed">
                The stress hormone that spikes every time a deadline lands, a hire blows
                up, or a pivot has to be made under pressure &mdash; it&apos;s the same one
                quietly depleting the precursors your brain uses to build focus, recall,
                and drive.
              </p>
              <p className="text-[var(--color-text-secondary)] mb-3 leading-relaxed">
                It&apos;s why the second coffee stopped working. Why the calls that used to
                feel obvious now take three drafts. Why you finish the day with output
                you wouldn&apos;t have signed off on three years ago.
              </p>
              <p className="text-white font-semibold mb-2">
                Replenish what cortisol depleted. Restore the chemistry.
              </p>
              <p className="text-white font-semibold mb-8">
                The chaos isn&apos;t going anywhere &mdash; but your brain doesn&apos;t have to
                keep paying for it.
              </p>
              <a href="#mechanism" className="cta-btn-secondary inline-flex items-center gap-2">
                See How It Works <ArrowRight size={16} />
              </a>
            </FadeUp>

            <FadeUp delay={0.15}>
              <Skeleton label="High Cortisol Brain vs Low Cortisol Brain split visual with Genius Mind bottle centred" className="aspect-square" />
            </FadeUp>
          </div>
        </div>
        {/* Scroll cue */}
        <motion.div
          className="flex justify-center mt-12"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-[var(--color-text-tertiary)]" />
        </motion.div>
      </section>

      <div className="section-divider" />

      {/* ══════════════ §2 SYMPTOMS ══════════════ */}
      <section className="section-primary py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <FadeUp>
              <Skeleton label="Founder at desk / lifestyle image" className="aspect-[4/5]" />
            </FadeUp>

            <FadeUp delay={0.1}>
              <SectionNumber num="01" label="THE SYMPTOMS" />
              <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
                It&apos;s Not Just Burnout
              </h2>
              <p className="text-white font-semibold mb-5">Many high-output operators in their 30s and 40s end up...</p>

              <StaggerChildren className="space-y-2 mb-6">
                {SYMPTOMS.map((s) => (
                  <motion.div key={s.bold} variants={childFade} className="card card-warn flex items-start gap-3 !py-3 !px-4">
                    <AlertTriangle size={16} className="text-[var(--color-warn)] mt-0.5 shrink-0" />
                    <p className="text-sm">
                      <strong className="text-white">{s.bold}</strong>{" "}
                      <span className="text-[var(--color-text-secondary)]">{s.rest}</span>
                    </p>
                  </motion.div>
                ))}
              </StaggerChildren>

              <p className="text-white leading-relaxed mb-4">
                Your father at 50 probably had sharper recall than you have at 38.
                This isn&apos;t aging. This is what chronic cortisol does to the chemistry
                your brain runs on &mdash; and the longer it goes unaddressed, the more
                it compounds.
              </p>
              <BreakoutLine>
                Your hormones control your brain&apos;s chemistry. Fix the chemistry. Restore the function.
              </BreakoutLine>
            </FadeUp>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════ §3 WHY EVERYTHING FAILED ══════════════ */}
      <section className="section-elevated py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <FadeUp>
            <SectionNumber num="02" label="THE CAUSE" />
            <h2 className="text-3xl md:text-4xl font-black text-center mb-8 leading-tight">
              Why Everything You&apos;ve Tried Made Logical Sense &mdash; And Still Didn&apos;t Work
            </h2>
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
            <FadeUp>
              <p className="font-semibold text-lg mb-4">
                You didn&apos;t fail. The strategy failed you.
              </p>
              <p className="text-[var(--color-text-secondary)] mb-4">
                Every caffeine protocol, productivity hack, and supplement you&apos;ve tried
                attacked the symptom. None of them went after the cause.
              </p>
              <BreakoutLine>The cause is cortisol.</BreakoutLine>
              <p className="text-[var(--color-text-secondary)] mb-4">And the reason is simple:</p>
              <BreakoutLine>
                Your stress response was built for a world that no longer exists.
              </BreakoutLine>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="text-[var(--color-text-secondary)] mb-4">
                For most of human history, stress was short.
              </p>
              <p className="text-[var(--color-text-secondary)] mb-4">
                <strong className="text-white">A threat appeared, cortisol spiked to get you through it,
                the threat passed, cortisol dropped. Clean cycle. Worked perfectly.</strong>
              </p>
              <p className="text-[var(--color-text-secondary)] mb-4">
                <strong className="text-white">But now the threat never passes.</strong>
              </p>
              <p className="text-[var(--color-text-secondary)] mb-4">
                The Slack message at 10pm. The funding round. The hire that isn&apos;t
                working out. The product launch. The kid who&apos;s sick the day of the
                board meeting. None of it is life or death. But your nervous system
                can&apos;t tell the difference.
              </p>
            </FadeUp>
          </div>

          <FadeUp>
            <p className="text-[var(--color-text-secondary)] text-center mb-8">
              And the harder you try to think your way out of cortisol-driven cognitive
              depletion without addressing the chemistry first, the more you&apos;re working
              against yourself:
            </p>
          </FadeUp>

          <StaggerChildren className="grid md:grid-cols-3 gap-5">
            {FAILURE_BOXES.map((item, i) => (
              <motion.div key={item.title} variants={childFade} className="card card-warn">
                <p className="label-mono text-[var(--color-warn)] text-[10px] mb-2">0{i + 1}</p>
                <p className="font-bold text-sm text-white mb-2">{item.title}</p>
                <p className="text-[var(--color-text-secondary)] text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════ §5 TRANSITION ══════════════ */}
      <section className="section-primary py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <Skeleton label="Before/After: Depleted vs restored operator" className="aspect-[4/3]" />
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-white text-lg leading-relaxed mb-4">
                The operators who finally break through the ceiling &mdash; who sustain
                sharp output instead of watching it erode year on year &mdash; are the
                ones who get the chemistry right first.
              </p>
              <BreakoutLine>Restore the chemistry. Get the brain back.</BreakoutLine>
              <p className="text-white font-bold text-xl">
                That&apos;s exactly what Genius Mind is built to do.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════ §6 ENEMY BLOCK ══════════════ */}
      <section className="section-elevated py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <FadeUp>
            <SectionNumber num="03" label="THE FAILURES" />
          </FadeUp>
          <div className="grid lg:grid-cols-2 gap-12">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-black mb-8 leading-tight">
                Say No to Caffeine Dependency &amp; Nootropic Snake Oil
              </h2>

              <h3 className="text-white font-bold mb-3">Caffeine &amp; Stimulant Stacks:</h3>
              {ENEMY_CAFFEINE.map((item) => (
                <div key={item.bold} className="card card-warn flex items-start gap-3 !py-3 !px-4 mb-2">
                  <X size={14} className="text-[var(--color-warn)] mt-0.5 shrink-0" />
                  <p className="text-sm">
                    <strong className="text-white">{item.bold}</strong>{" "}
                    <span className="text-[var(--color-text-secondary)]">{item.rest}</span>
                  </p>
                </div>
              ))}

              <h3 className="text-white font-bold mt-6 mb-3">Generic &ldquo;Nootropic&rdquo; Supplements:</h3>
              {ENEMY_GENERIC.map((item) => (
                <div key={item.bold} className="card card-warn flex items-start gap-3 !py-3 !px-4 mb-2">
                  <X size={14} className="text-[var(--color-warn)] mt-0.5 shrink-0" />
                  <p className="text-sm">
                    <strong className="text-white">{item.bold}</strong>{" "}
                    <span className="text-[var(--color-text-secondary)]">{item.rest}</span>
                  </p>
                </div>
              ))}
            </FadeUp>

            <FadeUp delay={0.1}>
              <Skeleton label="Operator workspace photo" className="aspect-square mb-6" />
              <p className="text-[var(--color-text-secondary)] text-sm">
                You deserve better than frying your nervous system with stimulants
                OR wasting money on underdosed single-ingredient pills that don&apos;t
                address the ROOT of sustained cognitive performance.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════ §7 PRODUCT REVEAL – COGNISYNC TRI-FACTOR ══════════════ */}
      <section id="mechanism" className="section-gradient py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <FadeUp>
            <SectionNumber num="04" label="THE SOLUTION" />
            <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
              Cognitive Chemistry Restored.{" "}
              <span className="text-[var(--color-brand)]">Sustained Focus, Replenished.</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-10 max-w-3xl mx-auto">
              Genius Mind isn&apos;t another nootropic &mdash; it&apos;s a complete cognitive stack
              engineered around the Cognisync Tri-Factor, working on three mechanisms
              simultaneously:
            </p>
          </FadeUp>

          <StaggerChildren className="grid md:grid-cols-3 gap-5 mb-12">
            {MECHANISMS.map((m, i) => (
              <motion.div key={m.title} variants={childFade} className="card card-featured text-left">
                <p className="label-mono text-[var(--color-brand)] text-[10px] mb-3">0{i + 1} &mdash; {m.label}</p>
                <motion.div
                  className="text-[var(--color-brand)] mb-3"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {m.icon}
                </motion.div>
                <h3 className="text-white font-bold text-lg mb-2">{m.title}</h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </StaggerChildren>

          <FadeUp>
            <div className="max-w-2xl mx-auto">
              <p className="text-white text-sm mb-4 leading-relaxed">
                Genius Mind is a precision-formulated stack of 16 clinically studied
                ingredients &mdash; high-ratio botanical extracts, amino acid precursors,
                and essential cofactors &mdash; designed to support sustained focus
                throughout the working day. No proprietary blends. No fillers. Every
                dose transparent and clinically backed.
              </p>
              <BreakoutLine>No prescription. No crashes. No tolerance. Daily use, safely.</BreakoutLine>
            </div>

            <Skeleton label="Genius Mind product bottle image" className="max-w-sm mx-auto aspect-[3/4] mt-8 mb-8" />

            <a href={SHOP_URL} className="cta-btn inline-block">
              TRY IT NOW <ArrowRight size={16} className="inline ml-1 -mt-0.5" />
            </a>
          </FadeUp>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════ §8 BENEFIT TILES ══════════════ */}
      <section className="section-primary py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <FadeUp>
            <SectionNumber num="05" label="THE OUTCOMES" />
          </FadeUp>
          <StaggerChildren className="grid md:grid-cols-3 gap-5">
            {BENEFITS.map((b) => (
              <motion.div key={b.title} variants={childFade} className="card text-center">
                <div className="text-[var(--color-brand)] mb-3 flex justify-center">{b.icon}</div>
                <h3 className="text-white font-bold mb-2">{b.title}</h3>
                <p className="text-[var(--color-text-secondary)] text-sm">{b.desc}</p>
                {b.survey && (
                  <p className="label-mono text-[var(--color-text-tertiary)] text-[9px] mt-3">{b.survey}</p>
                )}
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════ §9 COMBINED INGREDIENTS (16 deep dive) ══════════════ */}
      <section id="formula" className="section-elevated py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <FadeUp>
            <SectionNumber num="06" label="THE FORMULA" />
            <h2 className="text-3xl md:text-4xl font-black mb-3 leading-tight">
              16 Ingredients in 1 Powerful Formula
            </h2>
            <p className="label-mono text-[var(--color-brand)] mb-6">
              Clinically Studied + High-Ratio Extracts
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {["No proprietary blends", "No fillers", "No synthetic stimulants", "No BS", "No cheap powders"].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-[var(--color-text-secondary)] text-xs">
                  <X size={12} className="text-[var(--color-warn)]" />
                  {item}
                </span>
              ))}
            </div>
          </FadeUp>

          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-4" stagger={0.05}>
            {INGREDIENTS_DETAIL.map((ing) => (
              <motion.div key={ing.name} variants={childFade} className="ingredient-card text-left">
                <h4 className="text-white font-bold text-base mb-1">{ing.name}</h4>
                <span className="label-mono text-[var(--color-brand)] text-[11px] mb-2 inline-block">
                  {ing.dose}
                </span>
                <p className="text-[var(--color-text-secondary)] text-xs leading-relaxed">{ing.desc}</p>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="section-primary border-y border-[var(--color-border)] py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-x-10 gap-y-4 text-center">
          {TRUST_BADGES.map((b) => (
            <div key={b.label} className="flex items-center gap-2">
              <span className="text-[var(--color-text-secondary)]">{b.icon}</span>
              <p className="label-mono text-[var(--color-text-secondary)] text-[10px]">{b.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════ §10 OPERATOR STACK ══════════════ */}
      <section className="section-primary py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <FadeUp>
            <SectionNumber num="07" label="THE INTEGRATION" />
            <h2 className="text-3xl md:text-4xl font-black text-center mb-6 leading-tight">
              How Genius Mind Fits Into A Serious Operator Stack
            </h2>
            <p className="text-[var(--color-text-secondary)] text-center max-w-3xl mx-auto mb-10">
              You already take creatine. Probably omega-3. Maybe AG1 or a multi.
              Magnesium at night. Genius Mind is the chemistry layer &mdash; the missing
              piece between the lifestyle work you&apos;ve already done and the cognitive
              output you&apos;re trying to protect.
            </p>
          </FadeUp>

          <StaggerChildren className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-10">
            {OPERATOR_STACK.map((item) => (
              <motion.div
                key={item.label}
                variants={childFade}
                className={`card text-center !p-4 ${item.highlight ? "card-featured !border-[var(--color-brand)] !bg-[rgba(0,166,210,0.08)]" : ""}`}
              >
                <span className={`mb-2 block ${item.highlight ? "text-[var(--color-brand)]" : "text-[var(--color-text-secondary)]"}`}>
                  {item.icon}
                </span>
                <p className={`text-xs font-bold ${item.highlight ? "text-[var(--color-brand)]" : "text-[var(--color-text-secondary)]"}`}>
                  {item.label}
                </p>
                <p className="text-[var(--color-text-tertiary)] text-[10px] mt-0.5">{item.target}</p>
              </motion.div>
            ))}
          </StaggerChildren>

          <FadeUp>
            <BreakoutLine>
              The lifestyle layer is dialled. The body layer is supported. The brain layer was the missing piece.
            </BreakoutLine>
          </FadeUp>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════ §11 SURVEY OUTCOMES ══════════════ */}
      <section className="section-elevated py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeUp>
            <SectionNumber num="08" label="THE EVIDENCE" />
            <h2 className="text-3xl md:text-4xl font-black mb-8 leading-tight">
              What Long-Term Customers Actually Report
            </h2>
          </FadeUp>

          <div className="max-w-2xl mx-auto space-y-5 mb-6">
            {SURVEY_OUTCOMES.map((item, i) => (
              <FadeUp key={item.label} delay={i * 0.1}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white text-sm font-semibold">{item.label}</span>
                  <span className="text-[var(--color-brand)] text-sm font-bold label-mono">
                    <CountUp target={item.count} delay={i * 0.15} />/33
                  </span>
                </div>
                <AnimatedBar value={item.count} max={33} delay={i * 0.15} />
              </FadeUp>
            ))}
          </div>

          <p className="label-mono text-[var(--color-text-tertiary)] text-[10px] mb-1">Source</p>
          <p className="text-[var(--color-text-tertiary)] text-xs">
            Post-purchase subscriber survey, 33 respondents using 3+ months.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════ §12 VIDEO TESTIMONIALS ══════════════ */}
      <section className="section-primary py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-black mb-10 leading-tight">
              What Operators Are Saying
            </h2>
          </FadeUp>
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {VIDEO_TESTIMONIALS.map((v) => (
              <motion.div
                key={v.label}
                variants={childFade}
                className="skeleton-placeholder aspect-[9/16] relative"
              >
                <div className="absolute top-3 left-3 right-3 z-10">
                  <span className="label-mono bg-[var(--color-brand)] text-white px-3 py-1 rounded text-[10px] font-bold">
                    {v.label}
                  </span>
                </div>
                <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold z-10">
                  {v.caption}
                </p>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════ §13 COMPARISON TABLE ══════════════ */}
      <section className="section-elevated py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <FadeUp>
            <SectionNumber num="09" label="THE COMPARISON" />
            <h2 className="text-3xl md:text-4xl font-black text-center mb-3 leading-tight">
              How Genius Mind Compares
            </h2>
            <p className="text-[var(--color-text-secondary)] text-center mb-10 max-w-xl mx-auto">
              Cognitive infrastructure, not a stimulant hit.
            </p>
          </FadeUp>

          <FadeUp>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="py-3 text-left text-[var(--color-text-tertiary)] label-mono text-[10px]"></th>
                    <th className="py-3 text-center text-[var(--color-brand)] font-bold">Genius Mind</th>
                    <th className="py-3 text-center text-[var(--color-text-secondary)]">Caffeine Stacks</th>
                    <th className="py-3 text-center text-[var(--color-text-secondary)]">Generic Nootropics</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.label} className="border-b border-[var(--color-border)]">
                      <td className="py-4 pr-4 label-mono text-[10px] text-[var(--color-text-secondary)]">{row.label}</td>
                      <td className="py-4 text-center bg-[rgba(0,166,210,0.04)]">
                        <Check size={18} className="text-[var(--color-brand)] mx-auto" />
                      </td>
                      <td className="py-4 text-center">
                        {row.caff === "x"
                          ? <X size={18} className="text-[var(--color-warn)] mx-auto" />
                          : <HelpCircle size={16} className="text-[var(--color-text-tertiary)] mx-auto" />}
                      </td>
                      <td className="py-4 text-center">
                        {row.generic === "x"
                          ? <X size={18} className="text-[var(--color-warn)] mx-auto" />
                          : <HelpCircle size={16} className="text-[var(--color-text-tertiary)] mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center mt-10">
              <a href={SHOP_URL} className="cta-btn inline-block">
                TRY IT NOW <ArrowRight size={16} className="inline ml-1 -mt-0.5" />
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════ §14 PRODUCT PURCHASE BLOCK ══════════════ */}
      <section className="section-gradient py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <FadeUp>
            <SectionNumber num="10" label="THE OFFER" />
          </FadeUp>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <FadeUp>
              <Skeleton label="Product shot on dark background with benefit callouts" className="aspect-square" />
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2 className="text-3xl font-black mb-4 leading-tight">Cognitive Infrastructure for Operators</h2>
              <p className="text-white font-semibold mb-4">
                Genius Mind is a complete cognitive stack engineered around the
                Cognisync Tri-Factor &mdash; supporting dopamine pathways,
                cerebral blood flow, and synaptic signalling with 16 clinically
                studied ingredients.*
              </p>
              <ul className="space-y-2 mb-6">
                {PRODUCT_BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <Check size={16} className="text-[var(--color-brand)] mt-0.5 shrink-0" />
                    <span className="text-white">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-black text-white">&pound;24.99</span>
                <span className="text-[var(--color-text-tertiary)] line-through text-lg">&pound;34.99</span>
                <span className="label-mono text-[var(--color-brand)] font-bold text-xs border border-[var(--color-brand)] rounded px-2 py-0.5">
                  Save 28%
                </span>
              </div>

              <a href={SHOP_URL} className="cta-btn mb-6">
                TRY IT NOW <ArrowRight size={16} className="inline ml-1 -mt-0.5" />
              </a>

              <div className="flex justify-center gap-6 text-center text-xs text-[var(--color-text-secondary)] mb-6">
                <div className="flex flex-col items-center gap-1">
                  <Package size={18} className="text-[var(--color-text-secondary)]" />
                  <p>3-Month Supply<br />Save 43%</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck size={18} className="text-[var(--color-text-secondary)]" />
                  <p>Try Risk-Free 90 Days<br />or 100% Money Back</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck size={18} className="text-[var(--color-text-secondary)]" />
                  <p>Free UK Shipping<br />Same-Day Dispatch</p>
                </div>
              </div>

              <div className="card card-featured !p-4">
                <p className="label-mono text-[var(--color-brand)] text-[10px] mb-2">Best Value: 3-Month Supply</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold">3 Bottles (90-Day Supply)</p>
                    <p className="text-[var(--color-text-tertiary)] text-xs">Just &pound;0.67/day</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[var(--color-text-tertiary)] line-through text-sm">&pound;74.97</p>
                    <p className="text-[var(--color-brand)] font-bold text-xl">&pound;59.99</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════ §15 DAY 1 / 30 / 90 ══════════════ */}
      <section className="section-elevated py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <FadeUp>
            <SectionNumber num="11" label="THE TIMELINE" />
            <h2 className="text-3xl md:text-4xl font-black text-center mb-10 leading-tight">
              What Happens After You Start Restoring Cognitive Chemistry
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6">
            {TIMELINE.map((t, i) => (
              <FadeUp key={t.day} delay={i * 0.2}>
                <div className="card text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                    <span className="text-[var(--color-brand)]">{t.icon}</span>
                    <span className="label-mono text-[var(--color-brand)] font-bold">Day {t.day}</span>
                    <span className="text-white font-bold">{t.title}</span>
                  </div>
                  <ul className="space-y-2">
                    {t.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                        <span className="w-1 h-1 rounded-full bg-[var(--color-brand)] mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════ §16 RESEARCH ══════════════ */}
      <section className="section-primary py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <FadeUp>
            <SectionNumber num="12" label="THE SCIENCE" />
            <h2 className="text-3xl md:text-4xl font-black text-center mb-10 leading-tight">
              The Research Behind The Formula
            </h2>
          </FadeUp>

          <StaggerChildren className="grid md:grid-cols-3 gap-5">
            {RESEARCH_CITATIONS.map((cite) => (
              <motion.div key={cite.ingredient} variants={childFade} className="card relative">
                <BookOpen size={14} className="absolute top-4 right-4 text-[var(--color-text-tertiary)]" />
                <p className="label-mono text-[var(--color-brand)] text-xs mb-2">{cite.ingredient}</p>
                <p className="text-white font-bold text-sm mb-2">{cite.finding}</p>
                <p className="text-[var(--color-text-tertiary)] text-xs mb-3">{cite.citation}</p>
                <p className="text-[var(--color-text-tertiary)] text-xs italic">{cite.relevance}</p>
              </motion.div>
            ))}
          </StaggerChildren>

          <p className="text-[var(--color-text-tertiary)] text-xs text-center mt-6">
            Citations are for individual ingredients, not product claims. Individual results may vary.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════ §17 GUARANTEE ══════════════ */}
      <section className="section-elevated py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <FadeUp>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="shrink-0">
                <div className="w-28 h-28 rounded-full border-2 border-[var(--color-brand)] flex items-center justify-center bg-[rgba(0,166,210,0.06)]">
                  <div className="text-center text-white label-mono text-[10px] leading-tight">
                    <div>100%</div>
                    <div>Money</div>
                    <div>Back</div>
                    <div className="text-[8px] mt-1 text-[var(--color-text-tertiary)]">Guarantee</div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black mb-3 leading-tight">
                  Feel a Massive Difference in 90 Days{" "}
                  <span className="text-[var(--color-brand)]">Or Your Money Back</span>
                </h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  We make sure every customer actually gets results or we refund you
                  100% of your investment. No questions asked.
                </p>
                <a href={SHOP_URL} className="cta-btn inline-block">
                  TRY IT NOW <ArrowRight size={16} className="inline ml-1 -mt-0.5" />
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════ §18 FAQ ══════════════ */}
      <section id="faq" className="section-primary py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <FadeUp>
            <SectionNumber num="13" label="QUESTIONS" />
            <h2 className="text-3xl md:text-4xl font-black text-center mb-10 leading-tight">
              Frequently Asked Questions
            </h2>
          </FadeUp>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className={`card overflow-hidden transition-all ${openFaq === i ? "!border-l-2 !border-l-[var(--color-brand)]" : ""}`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left p-5 flex items-center justify-between text-white font-semibold text-sm hover:text-[var(--color-brand)] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown size={18} className="text-[var(--color-text-secondary)]" />
                    </motion.span>
                  </button>
                  <div className={`faq-answer ${openFaq === i ? "open" : ""}`}>
                    <div className="px-5 pb-5 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════════ §19 STARTER KIT ══════════════ */}
      <section className="section-elevated py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <FadeUp>
            <SectionNumber num="14" label="WHAT YOU GET" />
            <h2 className="text-3xl md:text-4xl font-black mb-12 leading-tight">
              Your Starter Kit <span className="text-[var(--color-brand)]">Includes:</span>
            </h2>
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <Skeleton label="Starter Kit bundle image" className="aspect-square" />
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="text-left space-y-4">
                {LAUNCH_KIT.map((item) => (
                  <div key={item.name} className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
                    <span className="text-white font-semibold text-sm">{item.name}</span>
                    <div className="flex items-center gap-2">
                      {item.was && <span className="text-[var(--color-text-tertiary)] line-through text-xs">{item.was}</span>}
                      <span className="text-[var(--color-brand)] font-bold text-sm">{item.now}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <a href={SHOP_URL} className="cta-btn">
                  TRY IT NOW <ArrowRight size={16} className="inline ml-1 -mt-0.5" />
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="border-t border-[var(--color-border)] py-10 bg-[var(--color-background)]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white font-black text-lg tracking-[0.12em] mb-2">GENIUS MIND</p>
          <p className="text-[var(--color-text-secondary)] text-xs mb-4 font-serif italic">For Those Who Demand More.</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--color-text-secondary)] mb-6">
            <a href={SHOP_URL} className="hover:text-white transition-colors">Shop</a>
            <a href="#formula" className="hover:text-white transition-colors">Science</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="mailto:support@justfloow.com" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-[var(--color-text-tertiary)] text-[10px] max-w-xl mx-auto">
            *These statements have not been evaluated by the MHRA. This product is
            not intended to diagnose, treat, cure or prevent any disease. Individual
            results may vary.
          </p>
        </div>
      </footer>

      {/* ══════════════ STICKY CTA BAR ══════════════ */}
      <div
        className={`sticky-buy-bar fixed bottom-0 left-0 right-0 bg-[var(--color-surface)]/95 backdrop-blur-md border-t border-[var(--color-border)] py-3 px-4 z-50 ${
          stickyVisible ? "visible" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-white">Genius Mind Cognitive Stack</p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              16 ingredients &bull; 90-day guarantee &bull; Save up to 43%
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <span className="text-white font-bold">&pound;24.99</span>
              <span className="text-[var(--color-text-tertiary)] line-through text-xs ml-1">&pound;34.99</span>
            </div>
            <a
              href={SHOP_URL}
              className="bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white font-bold py-3 px-6 rounded-lg text-sm transition-all whitespace-nowrap hover:scale-[1.02] active:scale-[0.98]"
            >
              TRY IT NOW &rarr;
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const SYMPTOMS = [
  { bold: "Re-reading the same email three times", rest: "before the meaning lands" },
  { bold: "Decision quality dropping by 2pm", rest: "\u2014 and the hardest calls always land later" },
  { bold: "The second coffee not doing what it used to", rest: "\u2014 and the third one giving you the jitters without the focus" },
  { bold: "Word-finding gaps in important conversations", rest: "\u2014 names, terms, the right word for a Slack message that should take 30 seconds" },
  { bold: "Brain output flatlining", rest: "even after you\u2019ve sorted sleep, training, and diet" },
];

const FAILURE_BOXES = [
  {
    title: "More caffeine builds tolerance and depletes the system underneath.",
    desc: "Caffeine doesn\u2019t produce dopamine \u2014 it borrows against the dopamine you already have. The dose that worked in January barely works by March.",
  },
  {
    title: "Single-ingredient nootropics solve one thing. Focus isn\u2019t one thing.",
    desc: "Lion\u2019s Mane alone addresses neurogenesis. It doesn\u2019t touch blood flow, dopamine depletion, or synaptic signal. Focus is a multi-mechanism problem treated with a one-mechanism solution.",
  },
  {
    title: "Sorting sleep, training, and diet won\u2019t fix chemistry depletion.",
    desc: "You\u2019ve done the work. The lifestyle is dialled. And the cognitive output still plateaus \u2014 because the chemistry layer was never addressed.",
  },
];

const ENEMY_CAFFEINE = [
  { bold: "Tolerance builds within weeks", rest: "\u2014 you need more for less" },
  { bold: "90-minute spike then a crash", rest: "\u2014 your best hours get shorter" },
  { bold: "Disrupts sleep", rest: "\u2014 which compounds next-day cognitive load" },
];

const ENEMY_GENERIC = [
  { bold: "Proprietary blends hide", rest: "worthless micro-doses" },
  { bold: "Single-ingredient formulas", rest: "that can\u2019t address multiple pathways" },
  { bold: "Raw powders instead of extracts", rest: "\u2014 no bioavailability, no results" },
];

const MECHANISMS = [
  {
    label: "BLOOD FLOW",
    title: "Blood Flow Activation",
    icon: <Zap size={28} />,
    desc: "Ginkgo Biloba 50:1, Rosemary 5:1, Panax Ginseng 20:1. Researched for cerebral blood flow, oxygen and nutrient delivery to the brain.",
  },
  {
    label: "NEURON STIMULATION",
    title: "Neuron Stimulation",
    icon: <Lightbulb size={28} />,
    desc: "Lion\u2019s Mane 4:1, L-Tyrosine, Guarana. Studied for nerve growth factor, dopamine precursor support, and clean sustained energy via slow-release caffeine.",
  },
  {
    label: "NEURON STRENGTHENING",
    title: "Neuron Strengthening",
    icon: <Shield size={28} />,
    desc: "Bacopa Monnieri 11:1, Phosphatidylserine, B-Complex, Zinc. Studied for synaptic communication, memory consolidation, and cellular brain energy.",
  },
];

const BENEFITS = [
  { icon: <Target size={28} />, title: "Sustained Focus", desc: "Focus that lasts. Lock in for hours, not bursts.", survey: "23 of 33 long-term customers report this as #1 outcome" },
  { icon: <Eye size={28} />, title: "Mental Clarity", desc: "Clearer thinking. The fog cuts through.", survey: "22 of 33 long-term customers report this" },
  { icon: <Zap size={28} />, title: "Mental Energy", desc: "All-day cognitive stamina. No afternoon collapse. Clean energy, not borrowed.", survey: null },
  { icon: <Rocket size={28} />, title: "Easier to Take Action", desc: "Close the knowing-doing gap. Start what you\u2019ve been putting off.", survey: "20 of 33 long-term customers report this" },
  { icon: <TrendingUp size={28} />, title: "Peak Performance", desc: "Sharper thinking under pressure. The mental edge that holds when the stakes are highest.", survey: null },
  { icon: <Brain size={28} />, title: "Memory & Recall", desc: "Faster recall. Word-finding restored. Pattern recognition back online.", survey: null },
];

const TRUST_BADGES = [
  { icon: <Factory size={16} />, label: "GMP Certified Facility" },
  { icon: <FlaskConical size={16} />, label: "Lab Tested" },
  { icon: "\uD83C\uDDEC\uD83C\uDDE7", label: "Made in UK" },
  { icon: <Leaf size={16} />, label: "100% Vegan" },
  { icon: <X size={14} />, label: "Non-GMO" },
];

const OPERATOR_STACK = [
  { icon: <Dumbbell size={22} />, label: "Creatine", target: "Muscle", highlight: false },
  { icon: <Heart size={22} />, label: "Omega-3", target: "Heart", highlight: false },
  { icon: <Brain size={22} />, label: "Genius Mind", target: "Brain", highlight: true },
  { icon: <Moon size={22} />, label: "Magnesium", target: "Sleep", highlight: false },
  { icon: <Sun size={22} />, label: "Vitamin D", target: "Immune", highlight: false },
  { icon: <Leaf size={22} />, label: "AG1 / Multi", target: "General", highlight: false },
];

const SURVEY_OUTCOMES = [
  { label: "Sustained Focus", count: 23 },
  { label: "Mental Clarity", count: 22 },
  { label: "Easier to Take Action", count: 20 },
  { label: "Sharper Under Pressure", count: 17 },
];

const VIDEO_TESTIMONIALS = [
  { label: "Fog Has Lifted", caption: "THE 3PM SLUMP IS COMPLETELY GONE." },
  { label: "Sharper Recall", caption: "WORD-FINDING IS BACK TO WHERE IT WAS." },
  { label: "6 Months Strong", caption: "MY DECISION QUALITY HAS TRANSFORMED." },
  { label: "First Thing That Worked", caption: "TRIED EVERYTHING. THIS IS THE ONE." },
];

const PRODUCT_BULLETS = [
  "16 clinically studied ingredients with high-ratio botanical extracts",
  'Zero fillers or "proprietary" blends \u2014 every dose transparent',
  "Made in UK, GMP certified, and lab tested",
  "Cognisync Tri-Factor: Blood Flow, Neuron Stimulation, Neuron Strengthening",
  "90-day 100% money-back guarantee, no questions asked*",
];

const COMPARISON = [
  { label: "Supports Dopamine Pathways", caff: "x", generic: "?" },
  { label: "No Crash or Withdrawal", caff: "x", generic: "?" },
  { label: "Supports Sustained Focus", caff: "x", generic: "x" },
  { label: "Multi-Mechanism Neural Support", caff: "x", generic: "?" },
  { label: "Tolerance Doesn\u2019t Build", caff: "x", generic: "?" },
  { label: "Clinically Dosed Extracts", caff: "x", generic: "x" },
  { label: "16 Synergistic Ingredients", caff: "x", generic: "x" },
];

const TIMELINE = [
  {
    day: "1", title: "Activation", icon: <Zap size={20} />,
    items: [
      "Guarana and B vitamins may provide an immediate lift",
      "L-Tyrosine begins supporting dopamine pathways",
      "Some users report subtly cleaner clarity from day one",
      "The cognitive foundation starts building",
    ],
  },
  {
    day: "30", title: "The Hold", icon: <TrendingUp size={20} />,
    items: [
      "Some users report the afternoon crash flattening",
      "Bacopa and Lion\u2019s Mane may reach effective levels",
      "Focus may extend naturally, less forced",
      "Some users report others noticing sharper presence",
    ],
  },
  {
    day: "90", title: "Lock-In", icon: <Award size={20} />,
    items: [
      "All 16 ingredients may be working synergistically",
      "Decision stamina may extend across the full day",
      "For many users, it\u2019s no longer a supplement effect \u2014 it\u2019s the new baseline",
      "Cognitive infrastructure, fully built",
    ],
  },
];

const INGREDIENTS_DETAIL = [
  { name: "L-Tyrosine", dose: "100 mg", desc: "Studied as a dopamine precursor for focus and drive under stress." },
  { name: "Ginkgo Biloba", dose: "120 mg (50:1)", desc: "Researched for cerebral blood flow and oxygen delivery to the brain." },
  { name: "Bacopa Monnieri", dose: "80 mg (11:1)", desc: "Studied for memory consolidation and recall support." },
  { name: "Lion\u2019s Mane", dose: "80 mg (4:1)", desc: "Studied for its role in stimulating nerve growth factor." },
  { name: "Phosphatidylserine", dose: "35 mg", desc: "Studied for brain cell membrane integrity and signal transmission." },
  { name: "B12 (Methylcobalamin)", dose: "500\u03BCg", desc: "Studied for its role in neurotransmitter synthesis." },
  { name: "Panax Ginseng", dose: "100 mg (20:1)", desc: "Researched for focus, endurance, and stress response support." },
  { name: "L-Choline", dose: "100 mg", desc: "Studied as an acetylcholine precursor for memory and learning." },
  { name: "Guarana Seed", dose: "90 mg", desc: "Slow-release caffeine via tannin binding \u2014 researched for sustained energy." },
  { name: "Sage Leaf", dose: "75 mg (4:1)", desc: "Studied for memory retention and cognitive support." },
  { name: "Rosemary", dose: "20 mg (5:1)", desc: "Researched for neuroprotective properties and long-term brain health." },
  { name: "Vitamin B6", dose: "10 mg", desc: "Studied for its role as a cofactor in neurotransmitter synthesis." },
  { name: "Zinc", dose: "10 mg", desc: "Studied for cognitive function, learning, and synaptic signalling." },
  { name: "Niacin (B3)", dose: "32 mg", desc: "Studied for NAD+ production and cellular brain energy." },
  { name: "Thiamine (B1)", dose: "2.2 mg", desc: "Studied for neural communication and energy metabolism." },
  { name: "Pantothenic Acid (B5)", dose: "12 mg", desc: "Studied for neurotransmitter synthesis and stress resilience." },
];

const RESEARCH_CITATIONS = [
  {
    ingredient: "Bacopa Monnieri",
    finding: "Measurable memory improvements after 12 weeks of supplementation.",
    citation: "Stough et al., Psychopharmacology, 2001; Calabrese et al., J. Alt. Comp. Med., 2008.",
    relevance: "Genius Mind contains Bacopa Monnieri 11:1 at 80mg \u2014 studied for memory consolidation.",
  },
  {
    ingredient: "Ginkgo Biloba",
    finding: "Measurable increases in cerebral blood flow following administration.",
    citation: "Mashayekh et al., Neuroradiology, 2011.",
    relevance: "Genius Mind contains Ginkgo Biloba 50:1 at 120mg \u2014 researched for cerebral blood flow.",
  },
  {
    ingredient: "L-Tyrosine",
    finding: "Supports cognitive performance during demanding tasks and stressful conditions.",
    citation: "Deijen & Orlebeke, Brain Research Bulletin, 1994.",
    relevance: "Genius Mind contains L-Tyrosine at 100mg \u2014 studied as a dopamine precursor under stress.",
  },
];

const FAQS = [
  { q: "What is Genius Mind?", a: "Genius Mind is a cognitive stack with 16 clinically studied ingredients \u2014 including high-ratio botanical extracts, amino acid precursors, and essential cofactors \u2014 designed to support sustained focus throughout the working day. No stimulant dependency, no crashes." },
  { q: "Who is Genius Mind for?", a: "Genius Mind is built for operators, founders, and high-performers who need sustained cognitive output across long working days. If you\u2019re hitting a wall by mid-afternoon, building caffeine tolerance, or making worse decisions later in the day, this is designed for you." },
  { q: "How do I take Genius Mind?", a: "Take 2 capsules daily with breakfast or 30-60 minutes before your most demanding work. Each bottle contains 60 capsules (30 servings). For best results, use consistently for at least 90 days." },
  { q: "How long until I see results?", a: "Some users report a subtle lift in clarity within the first 1-2 weeks as Guarana and B vitamins take effect. Research suggests Bacopa and Lion\u2019s Mane may reach optimal levels around weeks 4-8. Month 3 is typically when long-term customers report the most significant changes." },
  { q: "Can Genius Mind replace my coffee?", a: "Many customers reduce or eliminate their coffee intake after starting Genius Mind. The Guarana provides clean, sustained energy without the tolerance-building and crash cycle of caffeine. However, Genius Mind is designed to work alongside moderate coffee intake too." },
  { q: "Can I stack Genius Mind with creatine, omega-3, magnesium, or my existing supplements?", a: "Yes. Genius Mind is designed as the cognitive chemistry layer on top of an existing operator stack. It doesn\u2019t replace creatine, omega-3, or magnesium \u2014 those address different systems. Common stacks include all four taken at appropriate times." },
  { q: "What happens if I stop taking it?", a: "Genius Mind isn\u2019t habit-forming and doesn\u2019t create withdrawal. The supportive effect on dopamine pathways and synaptic signalling depends on consistent intake \u2014 stop, and the cognitive chemistry support stops. Many long-term customers run it as a permanent part of their stack." },
  { q: "Is Genius Mind safe for daily, long-term use?", a: "Yes. The formula is non-stimulant-dependent, made in a GMP-certified UK facility, third-party tested, and designed for daily intake. The ingredients are at clinical doses with no tolerance pathway." },
];

const LAUNCH_KIT = [
  { name: "Genius Mind Cognitive Stack (30-day)", was: "\u00A334.99", now: "\u00A324.99" },
  { name: "90-Day Cognitive Blueprint Guide", was: "\u00A319.99", now: "FREE" },
  { name: "Operator Performance Tracker", was: "\u00A314.99", now: "FREE" },
  { name: "Free UK Shipping", was: "\u00A34.99", now: "FREE" },
  { name: "90-Day Money-Back Guarantee", was: null, now: "INCLUDED" },
];
