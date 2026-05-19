"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import {
  AlertTriangle, X, Zap, Lightbulb, Shield, Target, Rocket,
  TrendingUp, Brain, ChevronDown, ChevronLeft, ChevronRight, Check, CheckCircle2, HelpCircle,
  Leaf, BookOpen, Award, ArrowRight, Eye, Factory, FlaskConical,
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

/* Primary CTA — mint green, centred text+arrow as single unit */
function PrimaryCTA({ children, href = SHOP, block = false }: { children: React.ReactNode; href?: string; block?: boolean }) {
  return (
    <a href={href} className={`btn-primary${block ? " btn-block" : ""}`}>
      <span>{children}</span>
      <ArrowRight size={20} strokeWidth={2.5} />
    </a>
  );
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

/* ═══════ PRODUCT CAROUSEL (no autoplay) ═══════ */
const CAROUSEL_SLIDES = [
  { src: "/assets/carousel_1.webp", alt: "Genius Mind product hero shot" },
  { src: "/assets/carousel_2.webp", alt: "Genius Mind ingredients and dosage detail" },
  { src: "/assets/carousel_3.webp", alt: "Genius Mind benefits overview" },
  { src: "/assets/carousel_4.webp", alt: "Genius Mind supplement facts" },
  { src: "/assets/carousel_6.webp", alt: "Genius Mind customer results" },
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
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {CAROUSEL_SLIDES.map((slide, i) => (
            <div key={slide.src} className="flex-[0_0_100%] min-w-0">
              <img src={slide.src} alt={slide.alt} width={800} height={800} loading={i === 0 ? "eager" : "lazy"} className="w-full aspect-square object-cover" />
            </div>
          ))}
        </div>
      </div>
      <button onClick={scrollPrev} aria-label="Previous slide" className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors z-10"><ChevronLeft size={18} className="text-[var(--color-ink-secondary)]" /></button>
      <button onClick={scrollNext} aria-label="Next slide" className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors z-10"><ChevronRight size={18} className="text-[var(--color-ink-secondary)]" /></button>
      <div className="flex justify-center gap-2 mt-4">
        {CAROUSEL_SLIDES.map((_, i) => (
          <button key={i} aria-label={`Go to slide ${i + 1}`} onClick={() => emblaApi?.scrollTo(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === selectedIndex ? "bg-[var(--color-cyan)] scale-110" : "bg-[var(--color-ink-tertiary)]/40 hover:bg-[var(--color-ink-tertiary)]"}`} />
        ))}
      </div>
    </div>
  );
}

/* ═══════ PRICING CARD ═══════ */
function PricingCard({ highlighted = false, header, price, period, strikethrough, subtext, savePill, benefits, cta }: { highlighted?: boolean; header: string; price: string; period: string; strikethrough: string; subtext: string; savePill: string; benefits: string[]; cta: "primary" | "secondary" }) {
  const [kitOpen, setKitOpen] = useState(false);
  return (
    <div className={`card-light relative mb-4 ${highlighted ? "card-light-featured !border-[var(--color-cyan)] ring-1 ring-[var(--color-cyan)]/20" : ""}`}>
      <div className="flex items-start justify-between mb-3">
        <h3 className={`font-bold text-lg ${h2L}`}>{header}</h3>
        <span className="sticker sticker-cyan !text-[10px] !py-1">{savePill}</span>
      </div>
      <div className="flex items-baseline gap-2 mb-1">
        <span className={`text-3xl font-[800] ${h2L}`}>&pound;{price}</span>
        <span className={`${capL} text-sm`}>{period}</span>
        <span className={`${capL} line-through text-sm ml-2`}>{strikethrough}</span>
      </div>
      <p className={`${capL} text-xs mb-4`}>{subtext}</p>
      {benefits.length > 0 && (
        <ul className="space-y-2 mb-4">
          {benefits.map((b) => (<li key={b} className={`flex items-start gap-2 text-sm ${bodyL}`}><Check size={16} className="text-[var(--color-cyan)] mt-0.5 shrink-0" />{b}</li>))}
        </ul>
      )}
      {highlighted && (
        <div className="mb-4">
          <button onClick={() => setKitOpen(!kitOpen)} className="w-full text-left bg-[rgba(8,145,178,0.06)] rounded-lg px-4 py-3 flex items-center justify-between">
            <span className={`label-mono text-[11px] ${cyanL}`}>Welcome Kit &mdash; Arrives With First Order</span>
            <motion.span animate={{ rotate: kitOpen ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={16} className={cyanL} /></motion.span>
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
      {cta === "primary" ? (
        <PrimaryCTA block>ADD TO CART</PrimaryCTA>
      ) : (
        <a href={SHOP} className="btn-secondary" style={{ width: "100%", maxWidth: 500, margin: "0 auto", justifyContent: "center" }}><span>Add to Cart</span> <ArrowRight size={16} /></a>
      )}
    </div>
  );
}

/* ═══════ TIMELINE GRAPH ═══════ */
function TimelineGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const curvePath = "M 40 180 C 80 170, 120 140, 180 120 S 300 80, 380 55 S 480 30, 560 25";
  const markers = [
    { cx: 40, cy: 180, day: "1", title: "Activation", items: ["Guarana and B vitamins may provide an immediate lift", "L-Tyrosine begins supporting dopamine pathways", "The cognitive foundation starts building"], delay: 0 },
    { cx: 300, cy: 70, day: "30", title: "The Hold", items: ["The afternoon crash may flatten", "Bacopa and Lion\u2019s Mane may reach effective levels", "Focus may extend naturally"], delay: 0.6 },
    { cx: 560, cy: 25, day: "90", title: "Lock-In", items: ["All 16 ingredients may be working synergistically", "Decision stamina may extend across the full day", "Cognitive infrastructure, fully built"], delay: 1.2 },
  ];

  return (
    <div ref={ref} className="relative">
      {/* Milestone cards on TOP */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {markers.map((m) => (
          <motion.div key={m.day} initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: m.delay + 0.3 }} className="card-light !p-6 !shadow-none">
            <p className={`label-mono ${cyanL} font-bold text-xs mb-1`}>Day {m.day}</p>
            <p className={`font-bold text-base ${h2L} mb-3`}>{m.title}</p>
            <ul className="space-y-1.5">
              {m.items.map((item) => (<li key={item} className={`flex items-start gap-2 text-xs ${bodyL}`}><span className="w-1 h-1 rounded-full bg-[var(--color-cyan)] mt-1.5 shrink-0" />{item}</li>))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Graph BELOW the cards */}
      <svg viewBox="0 0 600 200" className="w-full" preserveAspectRatio="xMidYMid meet">
        {[40, 80, 120, 160].map((y) => (<line key={y} x1="30" y1={y} x2="580" y2={y} stroke="#e5e7eb" strokeWidth="0.5" />))}
        <text x="8" y="100" fill="var(--color-ink-tertiary)" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle" transform="rotate(-90,8,100)" style={{ textTransform: "uppercase", letterSpacing: "0.1em" }}>Cognitive Capacity</text>
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-cyan)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--color-cyan)" stopOpacity="0" />
          </linearGradient>
          <clipPath id="curveClip"><rect x="0" y="0" width={inView ? "100%" : "0%"} height="200" style={{ transition: "width 1.5s ease-out" }} /></clipPath>
        </defs>
        <path d={`${curvePath} L 560 180 L 40 180 Z`} fill="url(#areaFill)" clipPath="url(#curveClip)" />
        <path d={curvePath} fill="none" stroke="var(--color-cyan)" strokeWidth="3" strokeLinecap="round" clipPath="url(#curveClip)" />
        <line x1="30" y1="180" x2="580" y2="180" stroke="#e5e7eb" strokeWidth="1" />
        {markers.map((m) => (
          <g key={m.day}>
            <circle cx={m.cx} cy={m.cy} r="8" fill="var(--color-cyan)" opacity={inView ? 1 : 0} style={{ transition: `opacity 0.4s ease-out ${m.delay + 0.8}s` }} />
            <circle cx={m.cx} cy={m.cy} r="3" fill="white" opacity={inView ? 1 : 0} style={{ transition: `opacity 0.4s ease-out ${m.delay + 0.8}s` }} />
          </g>
        ))}
        <text x="40" y="195" fill="var(--color-ink-secondary)" fontSize="10" textAnchor="middle" fontFamily="var(--font-mono)">Day 1</text>
        <text x="300" y="195" fill="var(--color-ink-secondary)" fontSize="10" textAnchor="middle" fontFamily="var(--font-mono)">Day 30</text>
        <text x="560" y="195" fill="var(--color-ink-secondary)" fontSize="10" textAnchor="middle" fontFamily="var(--font-mono)">Day 90</text>
      </svg>
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
      <section className="sec-light py-10 md:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <FadeUp>
              <p className={`label-mono ${cyanL} mb-4`}>16 Ingredients. One Formula. Zero BS.</p>
              <h1 className={`text-3xl md:text-4xl lg:text-[2.75rem] font-[800] leading-[1.05] mb-4 tracking-tight ${h2L}`}>
                Your Brain Isn&apos;t Tired. It&apos;s Running On What{" "}
                <span className={cyanL}>Cortisol Left Behind.</span>
              </h1>
              <p className={`${h2L} font-semibold text-base mb-3 leading-snug`}>Every high-pressure year you&apos;ve run this business, cortisol has been wearing down the chemistry your brain needs to think clearly. This is how you restore it.</p>
              <p className={`${bodyL} mb-2 leading-relaxed text-sm`}>The stress hormone that spikes every time a deadline lands, a hire blows up, or a pivot has to be made under pressure &mdash; it&apos;s the same one quietly depleting the precursors your brain uses to build focus, recall, and drive.</p>
              <p className={`${bodyL} mb-2 leading-relaxed text-sm`}>It&apos;s why the second coffee stopped working. Why the calls that used to feel obvious now take three drafts. Why you finish the day with output you wouldn&apos;t have signed off on three years ago.</p>
              <p className={`${h2L} font-semibold mb-1 text-sm`}>Replenish what cortisol depleted. Restore the chemistry.</p>
              <p className={`${h2L} font-semibold mb-6 text-sm`}>The chaos isn&apos;t going anywhere &mdash; but your brain doesn&apos;t have to keep paying for it.</p>
              <PrimaryCTA href="#mechanism">See How It Works</PrimaryCTA>
            </FadeUp>
            <FadeUp delay={0.15}>
              <img src="/assets/gm-hero-brain-comparison.png" alt="Anatomical illustration showing a brain split between high-cortisol and low-cortisol states" width={800} height={1000} loading="eager" className="w-full max-h-[420px] object-contain drop-shadow-2xl" />
            </FadeUp>
          </div>
        </div>
        <motion.div className="flex justify-center mt-14" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}><ChevronDown size={24} className={capL} /></motion.div>
      </section>

      {/* ═══ §2 SYMPTOMS — DARK ═══ */}
      <section className="sec-dark py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <FadeUp><img src="/assets/gm-symptoms-desk.png" alt="Overhead view of operator at desk showing signs of cognitive fatigue" width={800} height={1000} loading="lazy" className="w-full rounded-xl object-cover aspect-[4/5]" /></FadeUp>
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
              <p className={bodyD}>The Slack message at 10pm. The funding round. The hire that isn&apos;t working out. The kid who&apos;s sick the day of the board meeting. None of it is life or death. But your nervous system can&apos;t tell the difference.</p>
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
            <FadeUp><img src="/assets/gm-transition-before-after.png" alt="Before and after comparison showing an operator in depleted and restored cognitive states" width={800} height={600} loading="lazy" className="w-full rounded-xl object-cover aspect-[4/3]" /></FadeUp>
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
          <Stagger className="grid md:grid-cols-3 gap-12 mb-12">
            {MECHS.map((m, i) => (
              <motion.div key={m.title} variants={cF} className="text-left border-l-[3px] border-[var(--color-cyan)] pl-6">
                <p className={`label-mono ${cyanL} text-[10px] mb-3`}>0{i + 1} &mdash; {m.label}</p>
                <div className={`${cyanL} mb-4`}>{m.iconLg}</div>
                <h3 className={`font-bold text-2xl mb-3 ${h2L}`}>{m.title}</h3>
                <p className={`${bodyL} text-sm leading-relaxed`}>{m.desc}</p>
              </motion.div>
            ))}
          </Stagger>
          <FadeUp>
            <div className="max-w-2xl mx-auto">
              <p className={`${bodyL} text-sm mb-4 leading-relaxed`}>Genius Mind is a precision-formulated stack of 16 clinically studied ingredients &mdash; high-ratio botanical extracts, amino acid precursors, and essential cofactors &mdash; designed to support sustained focus throughout the working day.</p>
              <BL mode="light">No prescription. No crashes. No tolerance. Daily use, safely.</BL>
            </div>
            <div className="max-w-sm mx-auto mt-8 mb-8 bg-[#f5f0eb] rounded-2xl p-8">
              <img src="/assets/hero-single.png" alt="Genius Mind product bottle on cream background" width={810} height={773} loading="lazy" className="w-full object-contain drop-shadow-xl" />
            </div>
            <PrimaryCTA block>TRY IT NOW</PrimaryCTA>
          </FadeUp>
        </div>
      </section>

      {/* ═══ §5 OUTCOMES (4 tiles) — LIGHT ═══ */}
      <section className="sec-light-alt py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4">
          <FadeUp><SN n="05" label="THE OUTCOMES" /></FadeUp>
          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BENEFITS.map((b) => (
              <motion.div key={b.title} variants={cF} className="card-light text-center !p-8">
                <div className="icon-box">{b.icon}</div>
                <h3 className={`font-bold text-[22px] mb-3 ${h2L}`}>{b.title}</h3>
                <p className={`${bodyL} text-sm mb-4`}>{b.desc}</p>
                <p className={`label-mono ${cyanL} text-[10px] border-t border-[rgba(15,23,42,0.08)] pt-4`}>{b.survey}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══ §6 INGREDIENTS — DARK (photo-backed) ═══ */}
      <section id="formula" className="sec-dark py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <FadeUp>
            <SN n="06" label="THE FORMULA" mode="dark" />
            <h2 className={`text-[clamp(32px,5vw,52px)] font-[800] leading-[1.05] mb-3 ${h2D}`}>16 Ingredients in 1 Powerful Formula</h2>
            <div className="mb-4"><span className="sticker sticker-cyan">Clinically Studied + High-Ratio Extracts</span></div>
            <div className="flex flex-wrap justify-center items-center gap-x-1 gap-y-2 mb-10">
              {["No Proprietary Blends", "No Fillers", "No Synthetic Stimulants", "No Cheap Powders"].map((item, i) => (
                <span key={item} className="flex items-center gap-1">
                  {i > 0 && <span className={`mx-2 ${bodyD} opacity-30`}>|</span>}
                  <CheckCircle2 size={12} className={cyanD} />
                  <span className={`${bodyD} text-xs tracking-wide`}>{item}</span>
                </span>
              ))}
            </div>
          </FadeUp>
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-3" s={0.04}>
            {INGS.map((ing) => (
              <motion.div key={ing.name} variants={cF} className="ing-card" style={{ backgroundImage: `url(/assets/${ing.img})` }}>
                {/* Dose pill top-right */}
                <span className="absolute top-3 right-3 z-[2] bg-white/90 text-[var(--color-ink-primary)] font-mono font-semibold text-[10px] px-2 py-1 rounded">{ing.dose}</span>
                <div className="ing-inner !justify-end">
                  <h4 className="text-white font-bold text-lg mb-0.5">{ing.name}</h4>
                  <p className="text-white/80 text-[11px] leading-relaxed">{ing.desc}</p>
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

      {/* ═══ §7 SURVEY — BIG NUMBER PANELS — LIGHT ═══ */}
      <section className="sec-light-alt py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <FadeUp>
            <SN n="07" label="THE EVIDENCE" />
            <h2 className={`text-[clamp(32px,5vw,52px)] font-[800] leading-[1.05] mb-10 ${h2L}`}>What Long-Term Customers Actually Report</h2>
          </FadeUp>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SURVEY.map((s, i) => (
              <motion.div key={s.label} variants={cF} className="card-light text-center !p-6">
                <p className="text-5xl md:text-6xl font-[800] leading-none mb-1">
                  <span className={cyanL}><CountUp target={s.count} delay={i * 0.1} /></span>
                  <span className={`text-2xl ${capL}`}>/33</span>
                </p>
                <div className="w-8 h-0.5 bg-[var(--color-cyan)] mx-auto my-3" />
                <p className={`${bodyL} text-sm`}>{s.subtitle}</p>
              </motion.div>
            ))}
          </Stagger>
          <p className={`${capL} text-xs mt-6`}>Post-purchase subscriber survey &middot; 33 respondents using 3+ months</p>
        </div>
      </section>

      {/* ═══ §8 VIDEO TESTIMONIALS — DARK ═══ */}
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

      {/* ═══ §9 COMPARISON TABLE — LIGHT ═══ */}
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
            <div className="text-center mt-10"><PrimaryCTA block>TRY IT NOW</PrimaryCTA></div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ §10 THE OFFER — LIGHT ═══ */}
      <section className="sec-light-alt py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4">
          <FadeUp><SN n="10" label="THE OFFER" /></FadeUp>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <FadeUp><ProductCarousel /></FadeUp>
            <FadeUp delay={0.1}>
              <h2 className={`text-[clamp(28px,4vw,44px)] font-[800] leading-[1.05] mb-4 ${h2L}`}>Cognitive Infrastructure for Operators</h2>
              <p className={`${bodyL} mb-6`}>Genius Mind is a complete cognitive stack engineered around the Cognisync Tri-Factor &mdash; 16 clinically studied ingredients designed to support sustained focus throughout the working day.*</p>
              <PricingCard highlighted header="90-Day Supply" price="16.99" period="/mo" strikethrough="£74.97" subtext="Billed £50.99 every 3 months · £0.57 per serving" savePill="Save 41%" benefits={["90 servings, only £0.57 per day", "NO CONTRACT — pause, skip & cancel anytime", "Fast & free shipping", "90-day money back guarantee"]} cta="primary" />
              <PricingCard header="30-Day Supply" price="21.24" period="/mo" strikethrough="£24.99" subtext="Billed £21.24 every 4 weeks · £0.71 per serving" savePill="Save 29%" benefits={[]} cta="secondary" />
              <div className="text-center mt-3 mb-8">
                <a href={SHOP} className={`${bodyL} underline text-sm transition-colors`}>One Time Purchase &pound;24.99</a>
              </div>
              <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px]">
                {[[ShieldCheck, "90-day money back guarantee"], [Factory, "GMP certified"], [FlaskConical, "Made in UK"], [Star, "1000+ five-star reviews"]].map(([Icon, label]) => (
                  <div key={label as string} className={`flex items-center gap-1.5 ${capL}`}><Icon size={14} className={capL} /><span>{label as string}</span></div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ §11 TIMELINE — SVG GRAPH — LIGHT ═══ */}
      <section className="sec-light py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4">
          <FadeUp>
            <SN n="11" label="THE TIMELINE" />
            <h2 className={`text-[clamp(32px,5vw,52px)] font-[800] leading-[1.05] text-center mb-12 ${h2L}`}>What Happens After You Start Restoring Cognitive Chemistry</h2>
          </FadeUp>
          <TimelineGraph />
        </div>
      </section>

      {/* ═══ §12 RESEARCH — LIGHT ═══ */}
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

      {/* ═══ §13 GUARANTEE — LIGHT ═══ */}
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
                <PrimaryCTA>TRY IT NOW</PrimaryCTA>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ §14 FAQ — LIGHT ═══ */}
      <section id="faq" className="sec-light-alt py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4">
          <FadeUp>
            <SN n="14" label="QUESTIONS" />
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

      {/* ═══ §15 STARTER KIT — LIGHT ═══ */}
      <section className="sec-light py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <FadeUp>
            <SN n="15" label="WHAT YOU GET" />
            <h2 className={`text-[clamp(32px,5vw,52px)] font-[800] leading-[1.05] mb-12 ${h2L}`}>Your Starter Kit <span className={cyanL}>Includes:</span></h2>
          </FadeUp>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeUp><Skel label="gm-welcome-offer.png — Welcome kit composite" mode="light" className="aspect-square" /></FadeUp>
            <FadeUp delay={0.1}>
              <div className="text-left space-y-3">
                {KIT_REAL.map((k) => (
                  <div key={k.name} className="flex items-center justify-between border-b border-[#e5e7eb] pb-3">
                    <span className={`font-semibold text-sm ${h2L}`}>{k.name}</span>
                    <div className="flex items-center gap-2">
                      {k.was && <span className={`${capL} line-through text-xs`}>{k.was}</span>}
                      <span className={`${cyanL} font-bold text-sm`}>{k.now}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-left mt-6 space-y-2">
                <div className="flex items-center justify-between"><span className={`font-semibold text-sm ${bodyL}`}>Total Value</span><span className={`${capL} line-through text-sm`}>&pound;104.96</span></div>
                <div className="flex items-center justify-between"><span className={`font-bold text-lg ${h2L}`}>You Pay Today</span><span className={`font-bold text-lg ${h2L}`}>&pound;50.99</span></div>
                <p className={`${capL} text-xs`}>Equivalent to &pound;16.99/mo &middot; 60-Day+ subscribers only</p>
              </div>
              <div className="mt-6"><PrimaryCTA block>TRY IT NOW</PrimaryCTA></div>
              <p className={`${capL} text-xs text-center mt-4`}>90-Day Money Back &middot; Free UK Shipping &middot; Cancel Anytime</p>
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
            <div className="hidden sm:block"><p className="text-sm font-bold text-white">Genius Mind</p><p className={`text-xs ${capD}`}>From &pound;16.99/mo &bull; 90-day guarantee</p></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right"><span className="text-white font-bold">From &pound;16.99/mo</span></div>
            <a href={SHOP} className="btn-primary !py-3 !px-6 !text-sm whitespace-nowrap">
              <span>ADD TO CART</span> <ArrowRight size={16} strokeWidth={2.5} />
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
  { label: "BLOOD FLOW", title: "Blood Flow Activation", icon: <Zap size={32} />, iconLg: <Zap size={40} />, desc: "Ginkgo Biloba 50:1, Rosemary 5:1, Panax Ginseng 20:1. Researched for cerebral blood flow, oxygen and nutrient delivery." },
  { label: "NEURON STIMULATION", title: "Neuron Stimulation", icon: <Lightbulb size={32} />, iconLg: <Lightbulb size={40} />, desc: "Lion\u2019s Mane 4:1, L-Tyrosine, Guarana. Studied for nerve growth factor, dopamine precursor support, and clean sustained energy." },
  { label: "NEURON STRENGTHENING", title: "Neuron Strengthening", icon: <Shield size={32} />, iconLg: <Shield size={40} />, desc: "Bacopa Monnieri 11:1, Phosphatidylserine, B-Complex, Zinc. Studied for synaptic communication, memory consolidation, and cellular brain energy." },
];
const BENEFITS = [
  { icon: <Target size={28} className="text-[var(--color-cyan)]" />, title: "Sustained Focus", desc: "Focus that lasts. Lock in for hours, not bursts.", survey: "23 of 33 long-term customers report this as #1 outcome" },
  { icon: <Eye size={28} className="text-[var(--color-cyan)]" />, title: "Mental Clarity", desc: "Clearer thinking. The fog cuts through.", survey: "22 of 33 long-term customers report this" },
  { icon: <Rocket size={28} className="text-[var(--color-cyan)]" />, title: "Easier to Take Action", desc: "Close the knowing-doing gap. Start what you\u2019ve been putting off.", survey: "20 of 33 long-term customers report this" },
  { icon: <TrendingUp size={28} className="text-[var(--color-cyan)]" />, title: "Sharper Under Pressure", desc: "The mental edge that holds when the stakes are highest.", survey: "17 of 33 long-term customers report this" },
];
const TRUST = [
  { icon: <Factory size={16} />, label: "GMP Certified" },
  { icon: <FlaskConical size={16} />, label: "Lab Tested" },
  { icon: "\uD83C\uDDEC\uD83C\uDDE7", label: "Made in UK" },
  { icon: <Leaf size={16} />, label: "Vegan" },
];
const SURVEY = [
  { label: "Sustained Focus", count: 23, subtitle: "long-term customers report sustained focus" },
  { label: "Mental Clarity", count: 22, subtitle: "report sharper mental clarity" },
  { label: "Easier to Take Action", count: 20, subtitle: "report it\u2019s easier to take action" },
  { label: "Sharper Under Pressure", count: 17, subtitle: "report sharper thinking under pressure" },
];
const VIDS = [
  { label: "Fog Has Lifted", caption: "THE 3PM SLUMP IS COMPLETELY GONE.", img: "/assets/gm-testimonial-1.png" },
  { label: "Sharper Recall", caption: "WORD-FINDING IS BACK TO WHERE IT WAS.", img: "/assets/gm-testimonial-2.png" },
  { label: "6 Months Strong", caption: "MY DECISION QUALITY HAS TRANSFORMED.", img: "/assets/gm-testimonial-3.png" },
  { label: "First Thing That Worked", caption: "TRIED EVERYTHING. THIS IS THE ONE.", img: "/assets/gm-testimonial-4.png" },
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
const KIT_REAL = [
  { name: "Genius Mind Cognitive Stack (90-day)", was: "\u00A374.97", now: "\u00A350.99" },
  { name: "Brain Performance Digital Guide", was: "\u00A310", now: "FREE" },
  { name: "Magnesium 3-in-1", was: "\u00A315", now: "FREE" },
  { name: "Free UK Shipping", was: "\u00A34.99", now: "FREE" },
  { name: "90-Day Money-Back Guarantee", was: null, now: "INCLUDED" },
];
