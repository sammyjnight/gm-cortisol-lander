"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import {
  AlertTriangle, X, Zap, Lightbulb, Shield, Target, Rocket,
  TrendingUp, Brain, ChevronDown, ChevronLeft, ChevronRight, Check, HelpCircle,
  Dumbbell, Heart, Moon, Sun, Leaf, BookOpen,
  Award, ArrowRight, Eye, Factory, FlaskConical,
  Package, ShieldCheck, Truck, Star,
} from "lucide-react";

const SHOP = "https://justfloow.com/products/genius-mind";

/* ═══════ COMPONENTS ═══════ */

function SN({ n, label, mode = "light" }: { n: string; label: string; mode?: "light" | "dark" }) {
  return <p className={`label-mono ${mode === "light" ? "text-[var(--color-cyan)]" : "text-[var(--color-cyan-bright)]"} mb-4 text-xs`}>{n} &mdash; {label}</p>;
}

function BL({ children, mode = "light" }: { children: React.ReactNode; mode?: "light" | "dark" }) {
  return <p className={`breakout-line ${mode === "light" ? "breakout-light" : "breakout-dark"}`}>{children}</p>;
}

function Skel({ label, mode = "light", className = "" }: { label: string; mode?: "light" | "dark"; className?: string }) {
  return <div className={`${mode === "light" ? "skel-light" : "skel-dark"} ${className}`}><p className={`label-mono ${mode === "light" ? "text-[var(--color-cyan)]" : "text-[var(--color-cyan-bright)]"} opacity-60 text-[10px] z-10 text-center px-4`}>Asset TODO: {label}</p></div>;
}

function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut", delay }} className={className}>{children}</motion.div>;
}

function Stagger({ children, className = "", s = 0.08 }: { children: React.ReactNode; className?: string; s?: number }) {
  return <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={{ visible: { transition: { staggerChildren: s } } }} className={className}>{children}</motion.div>;
}

const cF = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } } };

function ABar({ value, max, delay = 0 }: { value: number; max: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const iv = useInView(ref, { once: true, margin: "-60px" });
  return <div ref={ref} className="w-full rounded-full h-3 overflow-hidden bg-[#e5e7eb]"><motion.div className="h-3 rounded-full bg-[var(--color-cyan)]" initial={{ width: 0 }} animate={iv ? { width: `${(value / max) * 100}%` } : { width: 0 }} transition={{ duration: 1.2, ease: "easeOut", delay }} /></div>;
}

function CountUp({ target, delay = 0 }: { target: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const iv = useInView(ref, { once: true, margin: "-60px" });
  const [v, setV] = useState(0);
  useEffect(() => { if (!iv) return; const d = 1200, st = performance.now(); const t = (n: number) => { const e = n - st - delay * 1000; if (e < 0) { requestAnimationFrame(t); return; } const p = Math.min(e / d, 1); setV(Math.round(p * target)); if (p < 1) requestAnimationFrame(t); }; requestAnimationFrame(t); }, [iv, target, delay]);
  return <span ref={ref}>{v}</span>;
}

function Badge({ type }: { type: "check" | "x" | "q" }) {
  if (type === "check") return <div className="badge badge-check"><Check size={18} strokeWidth={3} className="text-white" /></div>;
  if (type === "x") return <div className="badge badge-x"><X size={18} strokeWidth={3} className="text-white" /></div>;
  return <div className="badge badge-q"><span className="text-[#dc2626] font-bold text-lg">?</span></div>;
}

/* mode-aware text helpers */
const h2L = "text-[var(--color-ink-primary)]";
const bodyL = "text-[var(--color-ink-secondary)]";
const capL = "text-[var(--color-ink-tertiary)]";
const cyanL = "text-[var(--color-cyan)]";
const h2D = "text-[var(--color-dink-primary)]";
const bodyD = "text-[var(--color-dink-secondary)]";
const capD = "text-[var(--color-dink-tertiary)]";
const cyanD = "text-[var(--color-cyan-bright)]";
const coralD = "text-[var(--color-coral)]";
const coralL = "text-[var(--color-coral-deep)]";

/* ═══════ PRODUCT CAROUSEL ═══════ */
const CAROUSEL_SLIDES = [
  { src: "/assets/carousel_1.webp", alt: "Genius Mind product hero shot" },
  { src: "/assets/carousel_2.webp", alt: "Genius Mind ingredients and dosage detail" },
  { src: "/assets/carousel_3.webp", alt: "Genius Mind benefits overview" },
  { src: "/assets/carousel_6.webp", alt: "Genius Mind customer results" },
  { src: "/assets/carousel_4.webp", alt: "Genius Mind supplement facts" },
  { src: "/assets/carousel_5.webp", alt: "Genius Mind usage instructions" },
];

function ProductCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    // auto-advance
    const interval = setInterval(() => {
      if (emblaApi.canScrollNext()) emblaApi.scrollNext();
      else emblaApi.scrollTo(0);
    }, 5000);
    // pause on hover
    const root = emblaApi.rootNode();
    const pause = () => clearInterval(interval);
    root.addEventListener("mouseenter", pause);
    root.addEventListener("focusin", pause);
    return () => {
      clearInterval(interval);
      root.removeEventListener("mouseenter", pause);
      root.removeEventListener("focusin", pause);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {CAROUSEL_SLIDES.map((slide, i) => (
            <div key={slide.src} className="flex-[0_0_100%] min-w-0">
              <img
                src={slide.src}
                alt={slide.alt}
                width={800}
                height={800}
                loading={i === 0 ? "eager" : "lazy"}
                className="w-full aspect-square object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Arrows */}
      <button onClick={scrollPrev} aria-label="Previous slide" className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors z-10">
        <ChevronLeft size={18} className="text-[var(--color-ink-secondary)]" />
      </button>
      <button onClick={scrollNext} aria-label="Next slide" className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors z-10">
        <ChevronRight size={18} className="text-[var(--color-ink-secondary)]" />
      </button>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {CAROUSEL_SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === selectedIndex ? "bg-[var(--color-cyan)] scale-110" : "bg-[var(--color-ink-tertiary)]/40 hover:bg-[var(--color-ink-tertiary)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════ PRICING CARD ═══════ */
function PricingCard({
  highlighted = false,
  header,
  price,
  period,
  strikethrough,
  subtext,
  savePill,
  benefits,
  cta,
}: {
  highlighted?: boolean;
  header: string;
  price: string;
  period: string;
  strikethrough: string;
  subtext: string;
  savePill: string;
  benefits: string[];
  cta: "primary" | "secondary";
}) {
  const [kitOpen, setKitOpen] = useState(false);
  return (
    <div className={`card-light relative mb-4 ${highlighted ? "card-light-featured !border-[var(--color-cyan)] ring-1 ring-[var(--color-cyan)]/20" : ""}`}>
      {/* Header row */}
      <div className="flex items-start justify-between mb-3">
        <h3 className={`font-bold text-lg ${h2L}`}>{header}</h3>
        <span className="sticker sticker-cyan !text-[10px] !py-1">{savePill}</span>
      </div>
      {/* Price */}
      <div className="flex items-baseline gap-2 mb-1">
        <span className={`text-3xl font-[800] ${h2L}`}>&pound;{price}</span>
        <span className={`${capL} text-sm`}>{period}</span>
        <span className={`${capL} line-through text-sm ml-2`}>{strikethrough}</span>
      </div>
      <p className={`${capL} text-xs mb-4`}>{subtext}</p>

      {/* Benefits (only for highlighted) */}
      {benefits.length > 0 && (
        <ul className="space-y-2 mb-4">
          {benefits.map((b) => (
            <li key={b} className={`flex items-start gap-2 text-sm ${bodyL}`}>
              <Check size={16} className="text-[var(--color-cyan)] mt-0.5 shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      )}

      {/* Welcome Kit expandable (only for highlighted) */}
      {highlighted && (
        <div className="mb-4">
          <button
            onClick={() => setKitOpen(!kitOpen)}
            className="w-full text-left bg-[rgba(8,145,178,0.06)] rounded-lg px-4 py-3 flex items-center justify-between"
          >
            <span className={`label-mono text-[11px] ${cyanL}`}>Welcome Kit &mdash; Arrives With First Order</span>
            <motion.span animate={{ rotate: kitOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={16} className={cyanL} />
            </motion.span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${kitOpen ? "max-h-40 mt-2" : "max-h-0"}`}>
            <div className="px-4 space-y-1.5">
              <p className={`text-sm ${bodyL}`}><Check size={14} className="text-[var(--color-cyan)] inline mr-1.5" />Brain Performance Digital Guide <span className={capL}>(&pound;10 value)</span> &mdash; <span className={cyanL}>FREE</span></p>
              <p className={`text-sm ${bodyL}`}><Check size={14} className="text-[var(--color-cyan)] inline mr-1.5" />Magnesium 3-in-1 <span className={capL}>(&pound;15 value)</span> &mdash; <span className={cyanL}>FREE</span></p>
              <p className={`${capL} text-[10px] mt-2`}>*60-Day+ Subscribers Only</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      {cta === "primary" ? (
        <a href={SHOP} className="block w-full text-center bg-[var(--color-coral)] hover:bg-[var(--color-coral-deep)] text-white font-bold py-3.5 px-6 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
          ADD TO CART <ArrowRight size={16} className="inline ml-1 -mt-0.5" />
        </a>
      ) : (
        <a href={SHOP} className="btn-secondary btn-block !py-3">
          Add to Cart <ArrowRight size={16} />
        </a>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function Page() {
  const [sticky, setSticky] = useState(false);
  const [faq, setFaq] = useState<number | null>(null);
  useEffect(() => { const fn = () => setSticky(window.scrollY > 800); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);

  return (
    <>
      {/* ═══ HEADER ═══ */}
      <header className="sec-light border-b border-[#e5e7eb] py-4 sticky top-0 z-40 bg-[var(--color-light-primary)]/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <a href={SHOP} className={`${h2L} font-black text-lg tracking-[0.12em]`}>GENIUS MIND</a>
          <nav className={`hidden md:flex items-center gap-6 text-sm ${bodyL}`}>
            <a href={SHOP} className="hover:text-[var(--color-cyan)] transition-colors">Shop Now</a>
            <a href="#formula" className="hover:text-[var(--color-cyan)] transition-colors">Science</a>
            <a href="#faq" className="hover:text-[var(--color-cyan)] transition-colors">FAQ</a>
          </nav>
        </div>
      </header>

      {/* ═══ §1 HERO — LIGHT ═══ */}
      <section className="sec-light py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <p className={`label-mono ${cyanL} mb-5`}>16 Ingredients. One Formula. Zero BS.</p>
              <h1 className={`text-[clamp(42px,7vw,80px)] font-[800] leading-[1.0] mb-6 tracking-tight ${h2L}`}>
                Your Brain Isn&apos;t Tired. It&apos;s Running On What{" "}
                <span className={cyanL}>Cortisol Left Behind.</span>
              </h1>
              <p className={`${h2L} font-semibold text-lg mb-4 leading-snug`}>Every high-pressure year you&apos;ve run this business, cortisol has been wearing down the chemistry your brain needs to think clearly. This is how you restore it.</p>
              <p className={`${bodyL} mb-3 leading-relaxed`}>The stress hormone that spikes every time a deadline lands, a hire blows up, or a pivot has to be made under pressure &mdash; it&apos;s the same one quietly depleting the precursors your brain uses to build focus, recall, and drive.</p>
              <p className={`${bodyL} mb-3 leading-relaxed`}>It&apos;s why the second coffee stopped working. Why the calls that used to feel obvious now take three drafts. Why you finish the day with output you wouldn&apos;t have signed off on three years ago.</p>
              <p className={`${h2L} font-semibold mb-2`}>Replenish what cortisol depleted. Restore the chemistry.</p>
              <p className={`${h2L} font-semibold mb-8`}>The chaos isn&apos;t going anywhere &mdash; but your brain doesn&apos;t have to keep paying for it.</p>
              <a href="#mechanism" className="btn-secondary">See How It Works <ArrowRight size={16} /></a>
            </FadeUp>
            <FadeUp delay={0.15}>
              <img src="/assets/gm-hero-brain-comparison.png" alt="Anatomical illustration showing a brain split between high-cortisol and low-cortisol states" width={800} height={1000} loading="eager" className="w-full max-h-[480px] object-contain drop-shadow-2xl" />
            </FadeUp>
          </div>
        </div>
        <motion.div className="flex justify-center mt-14" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}><ChevronDown size={24} className={capL} /></motion.div>
      </section>

      {/* ═══ §2 SYMPTOMS — DARK ═══ */}
      <section className="sec-dark py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <FadeUp>
              <img src="/assets/gm-symptoms-desk.png" alt="Overhead view of operator at desk showing signs of cognitive fatigue" width={800} height={1000} loading="lazy" className="w-full rounded-xl object-cover aspect-[4/5]" />
            </FadeUp>
            <FadeUp delay={0.1}>
              <SN n="01" label="THE SYMPTOMS" mode="dark" />
              <h2 className={`text-[clamp(32px,5vw,52px)] font-[800] leading-[1.05] mb-6 ${h2D}`}>It&apos;s Not Just Burnout</h2>
              <p className="text-white font-semibold mb-5">Many high-output operators in their 30s and 40s end up...</p>
              <Stagger className="space-y-2 mb-6">
                {SYMPTOMS.map((s) => (
                  <motion.div key={s.bold} variants={cF} className="card-dark card-dark-warn flex items-start gap-3 !py-3 !px-4">
                    <AlertTriangle size={15} className={`${coralD} mt-0.5 shrink-0`} />
                    <p className="text-sm"><strong className="text-white">{s.bold}</strong> <span className={bodyD}>{s.rest}</span></p>
                  </motion.div>
                ))}
              </Stagger>
              <p className={`${bodyD} leading-relaxed mb-4`}>Your father at 50 probably had sharper recall than you have at 38. This isn&apos;t aging. This is what chronic cortisol does to the chemistry your brain runs on &mdash; and the longer it goes unaddressed, the more it compounds.</p>
              <BL mode="dark">Your hormones control your brain&apos;s chemistry. Fix the chemistry. Restore the function.</BL>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ §3+4 WHY EVERYTHING FAILED — DARK ═══ */}
      <section className="sec-dark py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4">
          <FadeUp>
            <SN n="02" label="THE CAUSE" mode="dark" />
            <h2 className={`text-[clamp(32px,5vw,52px)] font-[800] leading-[1.05] text-center mb-8 ${h2D}`}>Why Everything You&apos;ve Tried Made Logical Sense &mdash; And Still Didn&apos;t Work</h2>
          </FadeUp>
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
            <FadeUp>
              <p className="font-semibold text-lg text-white mb-4">You didn&apos;t fail. The strategy failed you.</p>
              <p className={`${bodyD} mb-4`}>Every caffeine protocol, productivity hack, and supplement you&apos;ve tried attacked the symptom. None of them went after the cause.</p>
              <BL mode="dark">The cause is cortisol.</BL>
              <BL mode="dark">Your stress response was built for a world that no longer exists.</BL>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className={`${bodyD} mb-4`}>For most of human history, stress was short.</p>
              <p className={`${bodyD} mb-4`}><strong className="text-white">A threat appeared, cortisol spiked to get you through it, the threat passed, cortisol dropped. Clean cycle. Worked perfectly.</strong></p>
              <p className={`${bodyD} mb-4`}><strong className="text-white">But now the threat never passes.</strong></p>
              <p className={`${bodyD}`}>The Slack message at 10pm. The funding round. The hire that isn&apos;t working out. The kid who&apos;s sick the day of the board meeting. None of it is life or death. But your nervous system can&apos;t tell the difference.</p>
            </FadeUp>
          </div>
          <Stagger className="grid md:grid-cols-3 gap-6">
            {FAILURES.map((f, i) => (
              <motion.div key={f.title} variants={cF} className="card-dark card-dark-warn">
                <p className={`label-mono ${coralD} text-[10px] mb-2`}>0{i + 1}</p>
                <p className="font-bold text-sm text-white mb-2">{f.title}</p>
                <p className={`${bodyD} text-sm`}>{f.desc}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══ §5 TRANSITION — LIGHT ═══ */}
      <section className="sec-light py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <img src="/assets/gm-transition-before-after.png" alt="Before and after comparison showing an operator in depleted and restored cognitive states" width={800} height={600} loading="lazy" className="w-full rounded-xl object-cover aspect-[4/3]" />
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className={`${bodyL} text-lg leading-relaxed mb-4`}>The operators who finally break through the ceiling &mdash; who sustain sharp output instead of watching it erode year on year &mdash; are the ones who get the chemistry right first.</p>
              <BL mode="light">Restore the chemistry. Get the brain back.</BL>
              <p className={`${h2L} font-bold text-xl`}>That&apos;s exactly what Genius Mind is built to do.</p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ §6 ENEMY BLOCK — DARK ═══ */}
      <section className="sec-dark py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4">
          <FadeUp><SN n="03" label="THE FAILURES" mode="dark" /></FadeUp>
          <div className="grid lg:grid-cols-2 gap-12">
            <FadeUp>
              <h2 className={`text-[clamp(32px,5vw,52px)] font-[800] leading-[1.05] mb-8 ${h2D}`}>Say No to Caffeine Dependency &amp; Nootropic Snake Oil</h2>
              <h3 className="text-white font-bold mb-3">Caffeine &amp; Stimulant Stacks:</h3>
              {ENEMY_CAFF.map((e) => (
                <div key={e.bold} className="card-dark card-dark-warn flex items-start gap-3 !py-3 !px-4 mb-2">
                  <X size={14} className={`${coralD} mt-0.5 shrink-0`} /><p className="text-sm"><strong className="text-white">{e.bold}</strong> <span className={bodyD}>{e.rest}</span></p>
                </div>
              ))}
              <h3 className="text-white font-bold mt-6 mb-3">Generic &ldquo;Nootropic&rdquo; Supplements:</h3>
              {ENEMY_GEN.map((e) => (
                <div key={e.bold} className="card-dark card-dark-warn flex items-start gap-3 !py-3 !px-4 mb-2">
                  <X size={14} className={`${coralD} mt-0.5 shrink-0`} /><p className="text-sm"><strong className="text-white">{e.bold}</strong> <span className={bodyD}>{e.rest}</span></p>
                </div>
              ))}
            </FadeUp>
            <FadeUp delay={0.1}>
              <img src="/assets/gm-enemy-workspace.png" alt="Chaotic workspace showing empty coffee cups, supplement bottles, and energy drinks" width={800} height={800} loading="lazy" className="w-full rounded-xl object-cover aspect-square mb-6" />
              <p className={`${bodyD} text-sm`}>You deserve better than frying your nervous system with stimulants OR wasting money on underdosed single-ingredient pills that don&apos;t address the ROOT of sustained cognitive performance.</p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ §7 PRODUCT REVEAL — LIGHT ═══ */}
      <section id="mechanism" className="sec-light py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <FadeUp>
            <SN n="04" label="THE SOLUTION" />
            <h2 className={`text-[clamp(32px,5vw,52px)] font-[800] leading-[1.05] mb-6 ${h2L}`}>Cognitive Chemistry Restored.<br /><span className={cyanL}>Sustained Focus, Replenished.</span></h2>
            <p className={`${bodyL} mb-10 max-w-3xl mx-auto`}>Genius Mind isn&apos;t another nootropic &mdash; it&apos;s a complete cognitive stack engineered around the Cognisync Tri-Factor, working on three mechanisms simultaneously:</p>
          </FadeUp>
          <Stagger className="grid md:grid-cols-3 gap-6 mb-12">
            {MECHS.map((m, i) => (
              <motion.div key={m.title} variants={cF} className="card-light card-light-featured text-left !p-8">
                <p className={`label-mono ${cyanL} text-[10px] mb-3`}>0{i + 1} &mdash; {m.label}</p>
                <motion.div className={`${cyanL} mb-4`} animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>{m.icon}</motion.div>
                <h3 className={`font-bold text-[22px] mb-3 ${h2L}`}>{m.title}</h3>
                <p className={`${bodyL} text-sm leading-relaxed`}>{m.desc}</p>
              </motion.div>
            ))}
          </Stagger>
          <FadeUp>
            <div className="max-w-2xl mx-auto">
              <p className={`${bodyL} text-sm mb-4 leading-relaxed`}>Genius Mind is a precision-formulated stack of 16 clinically studied ingredients &mdash; high-ratio botanical extracts, amino acid precursors, and essential cofactors &mdash; designed to support sustained focus throughout the working day.</p>
              <BL mode="light">No prescription. No crashes. No tolerance. Daily use, safely.</BL>
            </div>
            <img src="/assets/hero-single.png" alt="Genius Mind product bottle" width={810} height={773} loading="lazy" className="max-w-sm mx-auto mt-8 mb-8 drop-shadow-2xl" />
            <a href={SHOP} className="btn-primary btn-block">TRY IT NOW <ArrowRight size={16} /></a>
          </FadeUp>
        </div>
      </section>

      {/* ═══ §8 BENEFIT TILES — LIGHT ═══ */}
      <section className="sec-light-alt py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4">
          <FadeUp><SN n="05" label="THE OUTCOMES" /></FadeUp>
          <Stagger className="grid md:grid-cols-3 gap-6">
            {BENEFITS.map((b) => (
              <motion.div key={b.title} variants={cF} className="card-light text-center !p-8">
                <div className="icon-box">{b.icon}</div>
                <h3 className={`font-bold text-[22px] mb-3 ${h2L}`}>{b.title}</h3>
                <p className={`${bodyL} text-sm mb-4`}>{b.desc}</p>
                {b.survey && <p className={`label-mono ${cyanL} text-[10px] border-t border-[rgba(15,23,42,0.08)] pt-4`}>{b.survey}</p>}
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══ §9 16 INGREDIENTS — DARK (photo-backed cards) ═══ */}
      <section id="formula" className="sec-dark py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <FadeUp>
            <SN n="06" label="THE FORMULA" mode="dark" />
            <h2 className={`text-[clamp(32px,5vw,52px)] font-[800] leading-[1.05] mb-3 ${h2D}`}>16 Ingredients in 1 Powerful Formula</h2>
            <div className="mb-6"><span className="sticker sticker-cyan">Clinically Studied + High-Ratio Extracts</span></div>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {["No proprietary blends", "No fillers", "No synthetic stimulants", "No BS", "No cheap powders"].map((t) => (
                <span key={t} className={`flex items-center gap-1.5 ${bodyD} text-xs`}><X size={12} className={coralD} />{t}</span>
              ))}
            </div>
          </FadeUp>
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-5" s={0.04}>
            {INGS.map((ing) => (
              <motion.div key={ing.name} variants={cF} className="ing-card" style={{ backgroundImage: `url(/assets/${ing.img})` }}>
                <div className="ing-inner">
                  <div>
                    <h4 className="text-white font-bold text-xl mb-1">{ing.name}</h4>
                    <p className="text-white/80 text-xs leading-relaxed mb-3">{ing.desc}</p>
                  </div>
                  <span className="dose-pill">{ing.dose}</span>
                </div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Trust badges */}
      <div className="sec-light-alt border-y border-[#e5e7eb] py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-x-10 gap-y-3 text-center">
          {TRUST.map((b) => <div key={b.label} className={`flex items-center gap-2 ${capL}`}><span>{b.icon}</span><p className="label-mono text-[10px]">{b.label}</p></div>)}
        </div>
      </div>

      {/* ═══ §10 OPERATOR STACK — LIGHT ═══ */}
      <section className="sec-light py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4">
          <FadeUp>
            <SN n="07" label="THE INTEGRATION" />
            <h2 className={`text-[clamp(32px,5vw,52px)] font-[800] leading-[1.05] text-center mb-6 ${h2L}`}>How Genius Mind Fits Into A Serious Operator Stack</h2>
            <p className={`${bodyL} text-center max-w-3xl mx-auto mb-10`}>You already take creatine. Probably omega-3. Maybe AG1 or a multi. Magnesium at night. Genius Mind is the chemistry layer &mdash; the missing piece.</p>
          </FadeUp>
          <Stagger className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-10">
            {STACK.map((s) => (
              <motion.div key={s.label} variants={cF} className={`card-light text-center !p-5 ${s.hl ? "card-light-featured !bg-[rgba(8,145,178,0.06)] !border-[var(--color-cyan)]" : ""}`}>
                <span className={`mb-2 block ${s.hl ? cyanL : bodyL}`}>{s.icon}</span>
                <p className={`text-xs font-bold ${s.hl ? cyanL : bodyL}`}>{s.label}</p>
                <p className={`${capL} text-[10px] mt-0.5`}>{s.target}</p>
              </motion.div>
            ))}
          </Stagger>
          <FadeUp><BL mode="light">The lifestyle layer is dialled. The body layer is supported. The brain layer was the missing piece.</BL></FadeUp>
        </div>
      </section>

      {/* ═══ §11 SURVEY — LIGHT ═══ */}
      <section className="sec-light-alt py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeUp>
            <SN n="08" label="THE EVIDENCE" />
            <h2 className={`text-[clamp(32px,5vw,52px)] font-[800] leading-[1.05] mb-8 ${h2L}`}>What Long-Term Customers Actually Report</h2>
          </FadeUp>
          <div className="max-w-2xl mx-auto space-y-5 mb-6">
            {SURVEY.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.1}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-sm font-semibold ${h2L}`}>{s.label}</span>
                  <span className={`text-sm font-bold label-mono ${cyanL}`}><CountUp target={s.count} delay={i * 0.15} />/33</span>
                </div>
                <ABar value={s.count} max={33} delay={i * 0.15} />
              </FadeUp>
            ))}
          </div>
          <p className={`label-mono ${capL} text-[10px] mb-1`}>Source</p>
          <p className={`${capL} text-xs`}>Post-purchase subscriber survey, 33 respondents using 3+ months.</p>
        </div>
      </section>

      {/* ═══ §12 VIDEO TESTIMONIALS — DARK ═══ */}
      <section className="sec-dark py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <FadeUp><h2 className={`text-[clamp(32px,5vw,52px)] font-[800] leading-[1.05] mb-10 ${h2D}`}>What Operators Are Saying</h2></FadeUp>
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {VIDS.map((v) => (
              <motion.div key={v.label} variants={cF} className="aspect-[9/16] relative rounded-xl overflow-hidden">
                <img src={v.img} alt={`Video testimonial: ${v.label}`} width={360} height={640} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 z-[1]" />
                <div className="absolute top-3 left-3 right-3 z-[2]"><span className="sticker sticker-cyan !text-[10px] !py-1 !px-3">{v.label}</span></div>
                <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold z-[2]">{v.caption}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══ §13 COMPARISON TABLE — LIGHT ═══ */}
      <section className="sec-light py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4">
          <FadeUp>
            <SN n="09" label="THE COMPARISON" />
            <h2 className={`text-[clamp(32px,5vw,52px)] font-[800] leading-[1.05] text-center mb-3 ${h2L}`}>How Genius Mind Compares</h2>
            <p className={`${bodyL} text-center mb-10`}>Cognitive infrastructure, not a stimulant hit.</p>
          </FadeUp>
          <FadeUp>
            <div className="card-light !p-0 overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr className="border-b border-[#e5e7eb]">
                    <th className={`py-4 px-5 text-left label-mono text-[10px] ${capL}`}></th>
                    <th className={`py-4 px-5 text-center font-[800] text-lg ${cyanL} bg-[rgba(8,145,178,0.12)] border-x border-[rgba(8,145,178,0.2)]`}>Genius Mind</th>
                    <th className={`py-4 px-5 text-center ${bodyL}`}>Caffeine Stacks</th>
                    <th className={`py-4 px-5 text-center ${bodyL}`}>Generic Nootropics</th>
                  </tr>
                </thead>
                <tbody>
                  {COMP.map((r, i) => (
                    <tr key={r.label} className={i % 2 === 1 ? "bg-[var(--color-light-secondary)]" : ""}>
                      <td className={`py-5 px-5 label-mono text-[11px] font-medium ${bodyL}`}>{r.label}</td>
                      <td className="py-5 px-5 text-center bg-[rgba(8,145,178,0.06)] border-x border-[rgba(8,145,178,0.1)]"><Badge type="check" /></td>
                      <td className="py-5 px-5 text-center"><Badge type={r.caff === "x" ? "x" : "q"} /></td>
                      <td className="py-5 px-5 text-center"><Badge type={r.generic === "x" ? "x" : "q"} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center mt-10"><a href={SHOP} className="btn-primary btn-block">TRY IT NOW <ArrowRight size={16} /></a></div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ §10 THE OFFER — LIGHT (carousel + real pricing) ═══ */}
      <section className="sec-light-alt py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4">
          <FadeUp><SN n="10" label="THE OFFER" /></FadeUp>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Carousel */}
            <FadeUp>
              <ProductCarousel />
            </FadeUp>

            {/* Right: Pricing tiers */}
            <FadeUp delay={0.1}>
              <h2 className={`text-[clamp(28px,4vw,44px)] font-[800] leading-[1.05] mb-4 ${h2L}`}>Cognitive Infrastructure for Operators</h2>
              <p className={`${bodyL} mb-6`}>Genius Mind is a complete cognitive stack engineered around the Cognisync Tri-Factor &mdash; 16 clinically studied ingredients designed to support sustained focus throughout the working day.*</p>

              {/* OPTION 1 — 90-Day (highlighted) */}
              <PricingCard
                highlighted
                header="90-Day Supply"
                price="16.99"
                period="/mo"
                strikethrough="£74.97"
                subtext="Billed £50.99 every 3 months · £0.57 per serving"
                savePill="Save 41%"
                benefits={[
                  "90 servings, only £0.57 per day",
                  "NO CONTRACT — pause, skip & cancel anytime",
                  "Fast & free shipping",
                  "90-day money back guarantee",
                ]}
                cta="primary"
              />

              {/* OPTION 2 — 30-Day */}
              <PricingCard
                header="30-Day Supply"
                price="21.24"
                period="/mo"
                strikethrough="£24.99"
                subtext="Billed £21.24 every 4 weeks · £0.71 per serving"
                savePill="Save 29%"
                benefits={[]}
                cta="secondary"
              />

              {/* OPTION 3 — One-time */}
              <div className="text-center mt-3 mb-8">
                <a href={SHOP} className={`${bodyL} underline text-sm hover:${cyanL} transition-colors`}>One Time Purchase &pound;24.99</a>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px]">
                {[
                  [ShieldCheck, "90-day money back guarantee"],
                  [Factory, "GMP certified"],
                  [FlaskConical, "Made in UK"],
                  [Star, "1000+ five-star reviews"],
                ].map(([Icon, label]) => (
                  <div key={label as string} className={`flex items-center gap-1.5 ${capL}`}>
                    <Icon size={14} className={capL} />
                    <span>{label as string}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ §15 DAY 1/30/90 — LIGHT (connector line) ═══ */}
      <section className="sec-light py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4">
          <FadeUp>
            <SN n="11" label="THE TIMELINE" />
            <h2 className={`text-[clamp(32px,5vw,52px)] font-[800] leading-[1.05] text-center mb-12 ${h2L}`}>What Happens After You Start Restoring Cognitive Chemistry</h2>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-6 tl-grid">
            {TL.map((t, i) => (
              <FadeUp key={t.day} delay={i * 0.2}>
                <div className="tl-card">
                  <div className="tl-dot" />
                  <div className="card-light !p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={cyanL}>{t.icon}</span>
                      <span className={`label-mono ${cyanL} font-bold`}>Day {t.day}</span>
                      <span className={`font-bold ${h2L}`}>{t.title}</span>
                    </div>
                    <ul className="space-y-2">
                      {t.items.map((item) => <li key={item} className={`flex items-start gap-2 text-sm ${bodyL}`}><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] mt-2 shrink-0" />{item}</li>)}
                    </ul>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ §16 RESEARCH — LIGHT ═══ */}
      <section className="sec-light-alt py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4">
          <FadeUp>
            <SN n="12" label="THE SCIENCE" />
            <h2 className={`text-[clamp(32px,5vw,52px)] font-[800] leading-[1.05] text-center mb-10 ${h2L}`}>The Research Behind The Formula</h2>
          </FadeUp>
          <Stagger className="grid md:grid-cols-3 gap-6">
            {RESEARCH.map((c) => (
              <motion.div key={c.ingredient} variants={cF} className="card-light relative !p-7">
                <BookOpen size={14} className={`absolute top-5 right-5 ${capL}`} />
                <p className={`label-mono ${cyanL} text-xs mb-2`}>{c.ingredient}</p>
                <p className={`font-bold text-sm mb-2 ${h2L}`}>{c.finding}</p>
                <p className={`${capL} text-xs mb-3`}>{c.citation}</p>
                <p className={`${capL} text-xs italic`}>{c.relevance}</p>
              </motion.div>
            ))}
          </Stagger>
          <p className={`${capL} text-xs text-center mt-6`}>Citations are for individual ingredients, not product claims. Individual results may vary.</p>
        </div>
      </section>

      {/* ═══ §17 GUARANTEE — LIGHT ═══ */}
      <section className="sec-light py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4">
          <FadeUp>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="shrink-0 w-28 h-28 rounded-full border-2 border-[var(--color-cyan)] flex items-center justify-center bg-[rgba(8,145,178,0.04)]">
                <div className={`text-center label-mono text-[10px] leading-tight ${h2L}`}><div>100%</div><div>Money</div><div>Back</div><div className={`text-[8px] mt-1 ${capL}`}>Guarantee</div></div>
              </div>
              <div>
                <h2 className={`text-2xl md:text-3xl font-[800] mb-3 leading-tight ${h2L}`}>Feel a Massive Difference in 90 Days <span className={cyanL}>Or Your Money Back</span></h2>
                <p className={`${bodyL} leading-relaxed mb-6`}>We make sure every customer actually gets results or we refund you 100% of your investment. No questions asked.</p>
                <a href={SHOP} className="btn-primary inline-flex items-center gap-2">TRY IT NOW <ArrowRight size={16} /></a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ §18 FAQ — LIGHT ═══ */}
      <section id="faq" className="sec-light-alt py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4">
          <FadeUp>
            <SN n="13" label="QUESTIONS" />
            <h2 className={`text-[clamp(32px,5vw,52px)] font-[800] leading-[1.05] text-center mb-10 ${h2L}`}>Frequently Asked Questions</h2>
          </FadeUp>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <FadeUp key={i} delay={i * 0.04}>
                <div className={`card-light overflow-hidden ${faq === i ? "!border-l-[3px] !border-l-[var(--color-cyan)]" : ""}`}>
                  <button onClick={() => setFaq(faq === i ? null : i)} className={`w-full text-left p-5 flex items-center justify-between font-semibold text-sm ${h2L} transition-colors`}>
                    <span>{f.q}</span>
                    <motion.span animate={{ rotate: faq === i ? 180 : 0 }} transition={{ duration: 0.25 }}><ChevronDown size={18} className={cyanL} /></motion.span>
                  </button>
                  <div className={`faq-body ${faq === i ? "open" : ""}`}><div className={`px-5 pb-5 text-sm ${bodyL} leading-relaxed`}>{f.a}</div></div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ §19 STARTER KIT — LIGHT ═══ */}
      <section className="sec-light py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <FadeUp>
            <SN n="14" label="WHAT YOU GET" />
            <h2 className={`text-[clamp(32px,5vw,52px)] font-[800] leading-[1.05] mb-12 ${h2L}`}>Your Starter Kit <span className={cyanL}>Includes:</span></h2>
          </FadeUp>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <img src="/assets/hero-bundle.png" alt="Genius Mind Starter Kit bundle with Blueprint Guide and Performance Tracker" width={1024} height={1024} loading="lazy" className="w-full rounded-xl object-contain aspect-square" />
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="text-left space-y-4">
                {KIT.map((k) => (
                  <div key={k.name} className="flex items-center justify-between border-b border-[#e5e7eb] pb-3">
                    <span className={`font-semibold text-sm ${h2L}`}>{k.name}</span>
                    <div className="flex items-center gap-2">
                      {k.was && <span className={`${capL} line-through text-xs`}>{k.was}</span>}
                      <span className={`${cyanL} font-bold text-sm`}>{k.now}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8"><a href={SHOP} className="btn-primary btn-block">TRY IT NOW <ArrowRight size={16} /></a></div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER — DARK ═══ */}
      <footer className="sec-dark py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white font-black text-lg tracking-[0.12em] mb-2">GENIUS MIND</p>
          <p className={`${capD} text-xs mb-4 font-serif italic`}>For Those Who Demand More.</p>
          <div className={`flex flex-wrap justify-center gap-6 text-sm ${bodyD} mb-6`}>
            <a href={SHOP} className="hover:text-white transition-colors">Shop</a>
            <a href="#formula" className="hover:text-white transition-colors">Science</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="mailto:support@justfloow.com" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className={`${capD} text-[10px] max-w-xl mx-auto`}>*These statements have not been evaluated by the MHRA. This product is not intended to diagnose, treat, cure or prevent any disease. Individual results may vary.</p>
        </div>
      </footer>

      {/* ═══ STICKY CTA — DARK ═══ */}
      <div className={`sticky-bar fixed bottom-0 left-0 right-0 bg-[var(--color-dark-primary)]/95 backdrop-blur-md border-t border-[rgba(255,255,255,0.08)] py-3 px-4 z-50 ${sticky ? "visible" : ""}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/assets/hero-single.png" alt="Genius Mind bottle" width={40} height={38} className="hidden sm:block w-10 h-10 object-contain" />
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-white">Genius Mind</p>
              <p className={`text-xs ${capD}`}>From &pound;16.99/mo &bull; 90-day guarantee</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right"><span className="text-white font-bold">From &pound;16.99/mo</span></div>
            <a href={SHOP} className="bg-[var(--color-coral)] hover:bg-[var(--color-coral-deep)] text-white font-bold py-3 px-6 rounded-lg text-sm transition-all whitespace-nowrap hover:scale-[1.02] active:scale-[0.98]">ADD TO CART &rarr;</a>
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
  { bold: "The second coffee not doing what it used to", rest: "\u2014 and the third giving you jitters without focus" },
  { bold: "Word-finding gaps in important conversations", rest: "\u2014 names, terms, the right word for a Slack message that should take 30 seconds" },
  { bold: "Brain output flatlining", rest: "even after you\u2019ve sorted sleep, training, and diet" },
];
const FAILURES = [
  { title: "More caffeine builds tolerance and depletes the system underneath.", desc: "Caffeine doesn\u2019t produce dopamine \u2014 it borrows against the dopamine you already have. The dose that worked in January barely works by March." },
  { title: "Single-ingredient nootropics solve one thing. Focus isn\u2019t one thing.", desc: "Lion\u2019s Mane alone addresses neurogenesis. It doesn\u2019t touch blood flow, dopamine depletion, or synaptic signal." },
  { title: "Sorting sleep, training, and diet won\u2019t fix chemistry depletion.", desc: "You\u2019ve done the work. The lifestyle is dialled. And the cognitive output still plateaus \u2014 because the chemistry layer was never addressed." },
];
const ENEMY_CAFF = [
  { bold: "Tolerance builds within weeks", rest: "\u2014 you need more for less" },
  { bold: "90-minute spike then a crash", rest: "\u2014 your best hours get shorter" },
  { bold: "Disrupts sleep", rest: "\u2014 which compounds next-day cognitive load" },
];
const ENEMY_GEN = [
  { bold: "Proprietary blends hide", rest: "worthless micro-doses" },
  { bold: "Single-ingredient formulas", rest: "that can\u2019t address multiple pathways" },
  { bold: "Raw powders instead of extracts", rest: "\u2014 no bioavailability, no results" },
];
const MECHS = [
  { label: "BLOOD FLOW", title: "Blood Flow Activation", icon: <Zap size={32} />, desc: "Ginkgo Biloba 50:1, Rosemary 5:1, Panax Ginseng 20:1. Researched for cerebral blood flow, oxygen and nutrient delivery." },
  { label: "NEURON STIMULATION", title: "Neuron Stimulation", icon: <Lightbulb size={32} />, desc: "Lion\u2019s Mane 4:1, L-Tyrosine, Guarana. Studied for nerve growth factor, dopamine precursor support, and clean sustained energy." },
  { label: "NEURON STRENGTHENING", title: "Neuron Strengthening", icon: <Shield size={32} />, desc: "Bacopa Monnieri 11:1, Phosphatidylserine, B-Complex, Zinc. Studied for synaptic communication, memory consolidation, and cellular brain energy." },
];
const BENEFITS = [
  { icon: <Target size={28} className="text-[var(--color-cyan)]" />, title: "Sustained Focus", desc: "Focus that lasts. Lock in for hours, not bursts.", survey: "23 of 33 long-term customers report this as #1 outcome" },
  { icon: <Eye size={28} className="text-[var(--color-cyan)]" />, title: "Mental Clarity", desc: "Clearer thinking. The fog cuts through.", survey: "22 of 33 long-term customers report this" },
  { icon: <Zap size={28} className="text-[var(--color-cyan)]" />, title: "Mental Energy", desc: "All-day cognitive stamina. No afternoon collapse. Clean energy, not borrowed.", survey: null },
  { icon: <Rocket size={28} className="text-[var(--color-cyan)]" />, title: "Easier to Take Action", desc: "Close the knowing-doing gap. Start what you\u2019ve been putting off.", survey: "20 of 33 long-term customers report this" },
  { icon: <TrendingUp size={28} className="text-[var(--color-cyan)]" />, title: "Peak Performance", desc: "Sharper thinking under pressure. The mental edge that holds when the stakes are highest.", survey: null },
  { icon: <Brain size={28} className="text-[var(--color-cyan)]" />, title: "Memory & Recall", desc: "Faster recall. Word-finding restored. Pattern recognition back online.", survey: null },
];
const TRUST = [
  { icon: <Factory size={16} />, label: "GMP Certified" },
  { icon: <FlaskConical size={16} />, label: "Lab Tested" },
  { icon: "\uD83C\uDDEC\uD83C\uDDE7", label: "Made in UK" },
  { icon: <Leaf size={16} />, label: "Vegan" },
];
const STACK = [
  { icon: <Dumbbell size={22} />, label: "Creatine", target: "Muscle", hl: false },
  { icon: <Heart size={22} />, label: "Omega-3", target: "Heart", hl: false },
  { icon: <Brain size={22} />, label: "Genius Mind", target: "Brain", hl: true },
  { icon: <Moon size={22} />, label: "Magnesium", target: "Sleep", hl: false },
  { icon: <Sun size={22} />, label: "Vitamin D", target: "Immune", hl: false },
  { icon: <Leaf size={22} />, label: "AG1 / Multi", target: "General", hl: false },
];
const SURVEY = [
  { label: "Sustained Focus", count: 23 },
  { label: "Mental Clarity", count: 22 },
  { label: "Easier to Take Action", count: 20 },
  { label: "Sharper Under Pressure", count: 17 },
];
const VIDS = [
  { label: "Fog Has Lifted", caption: "THE 3PM SLUMP IS COMPLETELY GONE.", img: "/assets/gm-testimonial-1.png" },
  { label: "Sharper Recall", caption: "WORD-FINDING IS BACK TO WHERE IT WAS.", img: "/assets/gm-testimonial-2.png" },
  { label: "6 Months Strong", caption: "MY DECISION QUALITY HAS TRANSFORMED.", img: "/assets/gm-testimonial-3.png" },
  { label: "First Thing That Worked", caption: "TRIED EVERYTHING. THIS IS THE ONE.", img: "/assets/gm-testimonial-4.png" },
];
const BULLETS = [
  "16 clinically studied ingredients with high-ratio botanical extracts",
  'Zero fillers or "proprietary" blends \u2014 every dose transparent',
  "Made in UK, GMP certified, and lab tested",
  "Cognisync Tri-Factor: Blood Flow, Neuron Stimulation, Neuron Strengthening",
  "90-day 100% money-back guarantee, no questions asked*",
];
const COMP = [
  { label: "Supports Dopamine Pathways", caff: "x", generic: "?" },
  { label: "No Crash or Withdrawal", caff: "x", generic: "?" },
  { label: "Supports Sustained Focus", caff: "x", generic: "x" },
  { label: "Multi-Mechanism Neural Support", caff: "x", generic: "?" },
  { label: "Tolerance Doesn\u2019t Build", caff: "x", generic: "?" },
  { label: "Clinically Dosed Extracts", caff: "x", generic: "x" },
  { label: "16 Synergistic Ingredients", caff: "x", generic: "x" },
];
const TL = [
  { day: "1", title: "Activation", icon: <Zap size={20} />, items: ["Guarana and B vitamins may provide an immediate lift", "L-Tyrosine begins supporting dopamine pathways", "Some users report subtly cleaner clarity from day one", "The cognitive foundation starts building"] },
  { day: "30", title: "The Hold", icon: <TrendingUp size={20} />, items: ["Some users report the afternoon crash flattening", "Bacopa and Lion\u2019s Mane may reach effective levels", "Focus may extend naturally, less forced", "Some users report others noticing sharper presence"] },
  { day: "90", title: "Lock-In", icon: <Award size={20} />, items: ["All 16 ingredients may be working synergistically", "Decision stamina may extend across the full day", "For many users, it\u2019s no longer a supplement effect \u2014 it\u2019s the new baseline", "Cognitive infrastructure, fully built"] },
];
const INGS = [
  { name: "L-Tyrosine", dose: "100 mg", desc: "Studied as a dopamine precursor for focus and drive under stress.", img: "gm-ingredient-ltyrosine.png" },
  { name: "Ginkgo Biloba", dose: "120 mg (50:1)", desc: "Researched for cerebral blood flow and oxygen delivery.", img: "gm-ingredient-ginkgo.png" },
  { name: "Bacopa Monnieri", dose: "80 mg (11:1)", desc: "Studied for memory consolidation and recall support.", img: "gm-ingredient-bacopa.png" },
  { name: "Lion\u2019s Mane", dose: "80 mg (4:1)", desc: "Studied for its role in stimulating nerve growth factor.", img: "gm-ingredient-lionsmane.png" },
  { name: "Phosphatidylserine", dose: "35 mg", desc: "Studied for brain cell membrane integrity.", img: "gm-ingredient-phosphatidylserine.png" },
  { name: "B12", dose: "500\u03BCg", desc: "Studied for neurotransmitter synthesis.", img: "gm-ingredient-b12.png" },
  { name: "Panax Ginseng", dose: "100 mg (20:1)", desc: "Researched for focus, endurance, and stress response.", img: "gm-ingredient-ginseng.png" },
  { name: "L-Choline", dose: "100 mg", desc: "Studied as an acetylcholine precursor for memory.", img: "gm-ingredient-lcholine.png" },
  { name: "Guarana Seed", dose: "90 mg", desc: "Slow-release caffeine \u2014 researched for sustained energy.", img: "gm-ingredient-guarana.png" },
  { name: "Sage Leaf", dose: "75 mg (4:1)", desc: "Studied for memory retention and cognitive support.", img: "gm-ingredient-sage.png" },
  { name: "Rosemary", dose: "20 mg (5:1)", desc: "Researched for neuroprotective properties.", img: "gm-ingredient-rosemary.png" },
  { name: "Vitamin B6", dose: "10 mg", desc: "Studied as a cofactor in neurotransmitter synthesis.", img: "gm-ingredient-b6.png" },
  { name: "Zinc", dose: "10 mg", desc: "Studied for cognitive function and synaptic signalling.", img: "gm-ingredient-zinc.png" },
  { name: "Niacin (B3)", dose: "32 mg", desc: "Studied for NAD+ production and cellular brain energy.", img: "gm-ingredients-niacin.png" },
  { name: "Thiamine (B1)", dose: "2.2 mg", desc: "Studied for neural communication and energy metabolism.", img: "gm-ingredients-thiamine.png" },
  { name: "Pantothenic Acid (B5)", dose: "12 mg", desc: "Studied for neurotransmitter synthesis and stress resilience.", img: "gm-ingredients-pantothenic.png" },
];
const RESEARCH = [
  { ingredient: "Bacopa Monnieri", finding: "Measurable memory improvements after 12 weeks.", citation: "Stough et al., Psychopharmacology, 2001; Calabrese et al., J. Alt. Comp. Med., 2008.", relevance: "Genius Mind contains Bacopa 11:1 at 80mg \u2014 studied for memory consolidation." },
  { ingredient: "Ginkgo Biloba", finding: "Measurable increases in cerebral blood flow.", citation: "Mashayekh et al., Neuroradiology, 2011.", relevance: "Genius Mind contains Ginkgo 50:1 at 120mg \u2014 researched for cerebral blood flow." },
  { ingredient: "L-Tyrosine", finding: "Supports cognitive performance under stress.", citation: "Deijen & Orlebeke, Brain Research Bulletin, 1994.", relevance: "Genius Mind contains L-Tyrosine at 100mg \u2014 studied as a dopamine precursor." },
];
const FAQS = [
  { q: "What is Genius Mind?", a: "Genius Mind is a cognitive stack with 16 clinically studied ingredients \u2014 including high-ratio botanical extracts, amino acid precursors, and essential cofactors \u2014 designed to support sustained focus throughout the working day. No stimulant dependency, no crashes." },
  { q: "Who is Genius Mind for?", a: "Genius Mind is built for operators, founders, and high-performers who need sustained cognitive output across long working days. If you\u2019re hitting a wall by mid-afternoon, building caffeine tolerance, or making worse decisions later in the day, this is designed for you." },
  { q: "How do I take Genius Mind?", a: "Take 2 capsules daily with breakfast or 30-60 minutes before your most demanding work. Each bottle contains 60 capsules (30 servings). For best results, use consistently for at least 90 days." },
  { q: "How long until I see results?", a: "Some users report a subtle lift in clarity within the first 1-2 weeks. Research suggests Bacopa and Lion\u2019s Mane may reach optimal levels around weeks 4-8. Month 3 is typically when long-term customers report the most significant changes." },
  { q: "Can Genius Mind replace my coffee?", a: "Many customers reduce or eliminate their coffee intake. The Guarana provides clean, sustained energy without the tolerance-building and crash cycle of caffeine. However, Genius Mind is designed to work alongside moderate coffee intake too." },
  { q: "Can I stack it with creatine, omega-3, magnesium?", a: "Yes. Genius Mind is the cognitive chemistry layer on top of an existing operator stack. It doesn\u2019t replace creatine, omega-3, or magnesium \u2014 those address different systems." },
  { q: "What happens if I stop taking it?", a: "Genius Mind isn\u2019t habit-forming and doesn\u2019t create withdrawal. The supportive effect depends on consistent intake \u2014 stop, and the cognitive chemistry support stops. Many long-term customers run it as a permanent part of their stack." },
  { q: "Is it safe for daily, long-term use?", a: "Yes. The formula is non-stimulant-dependent, made in a GMP-certified UK facility, third-party tested, and designed for daily intake. The ingredients are at clinical doses with no tolerance pathway." },
];
const KIT = [
  { name: "Genius Mind Cognitive Stack (30-day)", was: "\u00A334.99", now: "\u00A324.99" },
  { name: "90-Day Cognitive Blueprint Guide", was: "\u00A319.99", now: "FREE" },
  { name: "Operator Performance Tracker", was: "\u00A314.99", now: "FREE" },
  { name: "Free UK Shipping", was: "\u00A34.99", now: "FREE" },
  { name: "90-Day Money-Back Guarantee", was: null, now: "INCLUDED" },
];
