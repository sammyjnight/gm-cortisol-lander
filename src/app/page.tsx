/* TODO (pass-two, not yet):
   - Premium design system tightening pass (CTA conflicts, generic card treatments, cyan accent overuse, mixed card treatments across sections)
   - Section-by-section review against Mars Men benchmark
*/
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import {
  AlertTriangle, X, Zap, Lightbulb, Shield, Target, Rocket,
  TrendingUp, Brain, ChevronDown, ChevronLeft, ChevronRight, Check, CheckCircle2, HelpCircle,
  Leaf, BookOpen, Award, ArrowRight, Eye, Factory, FlaskConical,
  Package, ShieldCheck, Truck, Star, RotateCw, Layers, Anchor,
} from "lucide-react";

const SHOP = "https://justfloow.com/products/genius-mind";

/* ═══════ COMPONENTS ═══════ */

function SN({ n, label, mode = "light" }: { n: string; label: string; mode?: "light" | "dark" }) {
  return <p className={`label-mono ${mode === "light" ? "text-[var(--color-cyan)]" : "text-[var(--color-cyan-bright)]"} mb-4 text-xs`}>{n} &mdash; {label}</p>;
}

function BL({ children, mode = "light" }: { children: React.ReactNode; mode?: "light" | "dark" }) {
  return <p className={`breakout-line ${mode === "light" ? "text-[var(--color-ink-primary)]" : "text-white"}`}>{children}</p>;
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

/* ═══════ INTERACTIVE TABBED TIMELINE ═══════ */
const TL_STAGES = [
  { id: "day_1", tab: "Day 1", num: "01", title: "Activation", clipPct: 8, icon: <RotateCw size={48} />,
    sub: "Your brain is taking in the first signals. The compounds are absorbing, but the changes are still building beneath the surface.",
    benefits: ["Guarana and B vitamins may provide an immediate lift", "Initial absorption of L-Tyrosine begins supporting dopamine pathways", "Most users feel slightly more present, not yet transformed", "The cognitive foundation starts building"] },
  { id: "day_7", tab: "Day 7", num: "02", title: "First Signals", clipPct: 16, icon: <Zap size={48} />,
    sub: "Early shifts start to show. Mornings feel slightly cleaner, afternoons less foggy. Subtle but real.",
    benefits: ["Cleaner morning starts for many users", "The 3pm crash may feel slightly softer", "Bacopa begins building in the system", "Focus may hold for longer stretches without forcing it"] },
  { id: "day_14", tab: "Day 14", num: "03", title: "Foundation", clipPct: 25, icon: <Layers size={48} />,
    sub: "Two weeks in, the supporting compounds reach effective levels. The chemistry your brain runs on is being rebuilt.",
    benefits: ["Lion\u2019s Mane begins supporting nerve growth factor activity", "Sustained focus reported by many users for the first time", "Mental fatigue may feel less compounding day-to-day", "Cognitive endurance begins to lengthen"] },
  { id: "day_30", tab: "Day 30", num: "04", title: "The Hold", clipPct: 50, icon: <Anchor size={48} />,
    sub: "One month in. The afternoon crash flattens for many users. The focus that used to require effort becomes the baseline.",
    benefits: ["Bacopa and Lion\u2019s Mane may reach effective levels", "The afternoon crash may flatten", "Focus may extend naturally, less forced", "Word-finding and recall may feel sharper"] },
  { id: "day_60", tab: "Day 60", num: "05", title: "Compounding", clipPct: 80, icon: <TrendingUp size={48} />,
    sub: "Two months in. The ingredients are now working in concert. Most users report this as the point things really click.",
    benefits: ["All 16 ingredients working synergistically for many users", "Decision stamina extending across the full day", "Sharper thinking under pressure becomes more consistent", "Many users report others noticing the change"] },
  { id: "day_90", tab: "Day 90", num: "06", title: "Lock-In", clipPct: 100, icon: <ShieldCheck size={48} />,
    sub: "Three months in. For many users this stops feeling like a supplement effect \u2014 it\u2019s the new cognitive baseline.",
    benefits: ["For many users, it\u2019s no longer a supplement effect \u2014 it\u2019s the new baseline", "Cognitive infrastructure, fully built", "Decision stamina extends across the full working day", "Sustained focus reported as the #1 outcome by 23 of 33 long-term customers"] },
];
const TL_CURVE = "M 30 155 C 60 148, 80 138, 110 125 S 180 100, 240 82 S 340 52, 420 35 S 500 18, 570 15";
const TL_DOTS = [
  { cx: 30, cy: 155 }, { cx: 110, cy: 125 }, { cx: 240, cy: 82 }, { cx: 420, cy: 35 }, { cx: 570, cy: 15 },
];

function TabbedTimeline() {
  const [active, setActive] = useState(0);
  const s = TL_STAGES[active];
  return (
    <div className="bg-[var(--color-dark-secondary)] border border-[var(--color-dark-tertiary)] rounded-2xl p-6 md:p-10">
      {/* Tab strip */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 -mx-2 px-2 scrollbar-none">
        {TL_STAGES.map((st, i) => (
          <button key={st.id} onClick={() => setActive(i)} className={`label-mono text-[11px] px-5 py-3 rounded-lg whitespace-nowrap transition-all shrink-0 ${i === active ? "bg-[var(--color-cyan)] text-white" : "bg-[var(--color-dark-tertiary)] text-[var(--color-dink-secondary)] hover:text-white hover:translate-y-[-1px]"}`}>
            {st.tab}
          </button>
        ))}
      </div>

      {/* Stage content + icon banner side by side */}
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 mb-8">
        <div>
          <p className="text-[var(--color-cyan)] font-[800] text-[100px] leading-none opacity-10 select-none mb-[-40px]">{s.num}</p>
          <h3 className="text-white font-bold text-2xl mb-3 relative">{s.title}</h3>
          <p className="text-[var(--color-dink-secondary)] text-sm leading-relaxed mb-6">{s.sub}</p>
          <p className="label-mono text-[var(--color-cyan-bright)] text-[10px] mb-3">Benefits</p>
          <ul className="space-y-2">
            {s.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-[var(--color-dink-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] mt-2 shrink-0" />{b}
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:flex items-start">
          <div className="rounded-xl w-full h-40 flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--color-cyan) 0%, #065f73 100%)" }}>
            <span className="text-white opacity-90">{s.icon}</span>
          </div>
        </div>
      </div>

      {/* Graph — FULL WIDTH below content */}
      <div className="bg-[var(--color-dark-tertiary)] rounded-xl p-4 md:p-6">
        <p className="md:hidden label-mono text-[var(--color-dink-tertiary)] text-[9px] mb-2">Cognitive Capacity</p>

        {/* Desktop graph — full width, readable */}
        <svg viewBox="0 0 800 200" className="w-full hidden md:block" preserveAspectRatio="xMidYMid meet">
          {[25, 55, 85, 115, 145, 175].map((y) => (<line key={y} x1="35" y1={y} x2="780" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />))}
          <text x="12" y="100" fill="var(--color-dink-tertiary)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle" transform="rotate(-90,12,100)" style={{ textTransform: "uppercase", letterSpacing: "0.12em" }}>Cognitive Capacity</text>
          <defs>
            <linearGradient id="tlFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-cyan)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--color-cyan)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {(() => {
            const curve = "M 40 165 C 80 158, 120 145, 180 128 S 300 90, 420 55 S 600 20, 760 15";
            const dots = [{ cx: 40, cy: 165 }, { cx: 180, cy: 128 }, { cx: 350, cy: 78 }, { cx: 560, cy: 32 }, { cx: 760, cy: 15 }];
            return (
              <>
                <g style={{ clipPath: `inset(0 ${100 - s.clipPct}% 0 0)`, transition: "clip-path 0.3s ease-out" }}>
                  <path d={`${curve} L 760 180 L 40 180 Z`} fill="url(#tlFill)" />
                  <path d={curve} fill="none" stroke="var(--color-cyan)" strokeWidth="3" strokeLinecap="round" />
                </g>
                {dots.map((d, i) => {
                  const dotPct = [8, 25, 50, 80, 100][i];
                  const show = s.clipPct >= dotPct;
                  return (<g key={i} style={{ opacity: show ? 1 : 0, transition: "opacity 0.3s ease-out" }}><circle cx={d.cx} cy={d.cy} r="7" fill="var(--color-cyan)" /><circle cx={d.cx} cy={d.cy} r="3" fill="white" /></g>);
                })}
              </>
            );
          })()}
          <line x1="35" y1="180" x2="780" y2="180" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((w, i) => (
            <text key={w} x={40 + i * 65.5} y="195" fill="var(--color-dink-tertiary)" fontSize="9" textAnchor="middle" fontFamily="var(--font-mono)">{w}</text>
          ))}
          <text x="410" y="195" fill="var(--color-dink-tertiary)" fontSize="9" textAnchor="middle" fontFamily="var(--font-mono)" dy="12">Weeks</text>
        </svg>

        {/* Mobile graph — compact */}
        <svg viewBox="0 0 300 120" className="w-full md:hidden" preserveAspectRatio="xMidYMid meet">
          {[20, 40, 60, 80, 100].map((y) => (<line key={y} x1="10" y1={y} x2="290" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />))}
          <defs>
            <linearGradient id="tlFillM" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-cyan)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--color-cyan)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g style={{ clipPath: `inset(0 ${100 - s.clipPct}% 0 0)`, transition: "clip-path 0.3s ease-out" }}>
            <path d="M 15 95 C 40 90, 60 80, 80 70 S 130 50, 170 38 S 230 18, 285 12 L 285 108 L 15 108 Z" fill="url(#tlFillM)" />
            <path d="M 15 95 C 40 90, 60 80, 80 70 S 130 50, 170 38 S 230 18, 285 12" fill="none" stroke="var(--color-cyan)" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          {[{ cx: 15, cy: 95 }, { cx: 80, cy: 70 }, { cx: 170, cy: 38 }, { cx: 240, cy: 20 }, { cx: 285, cy: 12 }].map((d, i) => {
            const dotPct = [8, 25, 50, 80, 100][i];
            const show = s.clipPct >= dotPct;
            return (<g key={i} style={{ opacity: show ? 1 : 0, transition: "opacity 0.3s ease-out" }}><circle cx={d.cx} cy={d.cy} r="4" fill="var(--color-cyan)" /><circle cx={d.cx} cy={d.cy} r="1.5" fill="white" /></g>);
          })}
          <line x1="10" y1="108" x2="290" y2="108" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <text x="15" y="118" fill="var(--color-dink-tertiary)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="start">Week 1</text>
          <text x="150" y="118" fill="var(--color-dink-tertiary)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="middle">Week 6</text>
          <text x="285" y="118" fill="var(--color-dink-tertiary)" fontSize="8" fontFamily="var(--font-mono)" textAnchor="end">Week 12</text>
        </svg>
      </div>
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

      {/* ═══ §01 HERO + §02 SYMPTOMS — UNIFIED DARK CANVAS ═══ */}
      <div className="sec-dark">
        {/* §01 HERO */}
        <div className="pt-16 pb-10 md:pt-20 md:pb-10 lg:pt-24 lg:pb-10 px-8 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
              {/* Eyebrow + headline (order 1 on mobile) */}
              <FadeUp className="order-1 lg:order-none lg:row-span-1">
                <p className="font-mono text-sm tracking-[0.1em] uppercase mb-6">
                  <span className="text-white/70">16 Ingredients. One Formula. </span>
                  <span className="text-[var(--color-cyan)]">Zero BS.</span>
                </p>
                <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-[900] leading-[1.02] tracking-tight mb-0 lg:mb-8">
                  <span className="text-white">Fix Your Cortisol Brain With This Natural </span>
                  <span className="text-[var(--color-cyan)]">Upgrade</span>
                </h1>
                {/* Body copy — hidden on mobile, shown on desktop below headline */}
                <div className="hidden lg:block mt-8">
                  <p className="text-white font-bold text-lg md:text-xl mb-6">Your brain&apos;s not broken &mdash; your cortisol&apos;s just running the show.</p>
                  <p className="text-[#B0B0B0] text-base leading-[1.5] mb-5">The stress hormone that spikes every time a deadline lands, a hire blows up, or a pivot has to be made under pressure is the same one quietly depleting the precursors your brain runs on.</p>
                  <p className="text-[#B0B0B0] text-base leading-[1.5] mb-6">It&apos;s why the focus window keeps shrinking, why the second coffee stops working, and why the operator in the mirror feels slower than the effort you&apos;re putting in.</p>
                  <p className="text-white font-semibold text-base leading-relaxed">Restore the chemistry. Replenish the precursors.<br />Do that and the brain comes back, while focus skyrockets.</p>
                </div>
              </FadeUp>

              {/* Image (order 2 on mobile — between headline and body) */}
              <FadeUp delay={0.15} className="order-2 lg:order-none img-bleed lg:[all:unset]">
                <img src="/assets/gm-hero-cortisol-transformation.png" alt="High-cortisol brain on the left, Genius Mind product bottle in the centre, low-cortisol brain on the right" width={1200} height={600} loading="eager" className="w-full lg:max-w-[600px] lg:mx-auto lg:rounded-xl" />
              </FadeUp>

              {/* Body copy — mobile only (order 3), hidden on desktop */}
              <div className="order-3 lg:hidden">
                <p className="text-white font-bold text-lg mb-5">Your brain&apos;s not broken &mdash; your cortisol&apos;s just running the show.</p>
                <p className="text-[#B0B0B0] text-base leading-[1.5] mb-4">The stress hormone that spikes every time a deadline lands, a hire blows up, or a pivot has to be made under pressure is the same one quietly depleting the precursors your brain runs on.</p>
                <p className="text-[#B0B0B0] text-base leading-[1.5] mb-5">It&apos;s why the focus window keeps shrinking, why the second coffee stops working, and why the operator in the mirror feels slower than the effort you&apos;re putting in.</p>
                <p className="text-white font-semibold text-base leading-relaxed">Restore the chemistry. Replenish the precursors.<br />Do that and the brain comes back, while focus skyrockets.</p>
              </div>
            </div>
          </div>
        </div>

        {/* §02 SYMPTOMS */}
        <div className="pt-10 pb-16 md:pb-20 lg:pb-24 px-4 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-10 lg:items-stretch lg:max-h-[720px]">
            {/* Eyebrow + headline (mobile order 1) */}
            <div className="order-1 lg:hidden">
              <p className="font-mono text-[13px] tracking-[0.08em] uppercase mb-3 text-center leading-snug">
                <span className="text-[#FFD700]">&#9888;&#65039;</span>{" "}
                <span className="text-[var(--color-coral)]">Here&apos;s the Truth About Cognitive Decline in High-Output Operators</span>
              </p>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[900] leading-[1.02] mb-0 text-white text-center">It&apos;s Not Just Burnout</h2>
            </div>

            {/* Image (mobile order 2, desktop left column) */}
            <FadeUp className="flex order-2 lg:order-none img-bleed lg:[all:unset] lg:flex">
              <video src="/assets/section-2-operator-at-desk.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="High-output operator at desk, exhausted late at night" className="w-full h-full lg:rounded-xl object-cover" />
            </FadeUp>

            {/* Copy (mobile order 3, desktop right column) */}
            <FadeUp delay={0.1} className="flex flex-col justify-center order-3 lg:order-none">
              {/* Desktop-only eyebrow+headline (hidden on mobile since shown above) */}
              <div className="hidden lg:block">
                <p className="font-mono text-[13px] tracking-[0.08em] uppercase mb-3 text-left leading-snug">
                  <span className="text-[#FFD700]">&#9888;&#65039;</span>{" "}
                  <span className="text-[var(--color-coral)]">Here&apos;s the Truth About Cognitive Decline in High-Output Operators</span>
                </p>
                <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-[900] leading-[1.02] mb-4 text-white text-left">It&apos;s Not Just Burnout</h2>
              </div>
              <p className="text-white/80 mb-4 text-center lg:text-left text-[15px]">Many high-output operators in their 30s and 40s end up...</p>
              <div className="space-y-2 mb-4">
                {SYMPTOMS_ALERT.map((s) => (
                  <div key={s.bold} className="border border-[var(--color-coral)] rounded-lg py-2.5 px-3 flex items-start gap-2">
                    <span className="text-sm mt-px shrink-0">&#9888;&#65039;</span>
                    <p className="text-[14px] leading-snug"><strong className="text-white">{s.bold}</strong> <span className="text-white/60">{s.rest}</span></p>
                  </div>
                ))}
              </div>
              <p className="text-white/80 text-[14px] leading-[1.5]">&#128073; Your father at 50 probably had sharper recall than you have at 38. This isn&apos;t aging &mdash; this is what chronic cortisol does to the chemistry your brain runs on.</p>
            </FadeUp>
          </div>
        </div>
        </div>
      </div>

      {/* ═══ §03 WHY EVERYTHING FAILED — WHITE ═══ */}
      <section className="bg-white" style={{ padding: "80px 60px" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center lg:max-h-[700px]">
            {/* Headline + body (mobile order 1) — no eyebrow */}
            <div className="order-1 lg:order-none">
              <h2 className="text-[clamp(2.8rem,5.5vw,4.8rem)] font-[900] leading-[1.0] tracking-[-0.025em] mb-0 lg:mb-6 text-black text-center lg:text-left">Why Everything You&apos;ve Tried Made Logical Sense &mdash; And Still Didn&apos;t Work</h2>
              {/* Desktop body copy */}
              <div className="hidden lg:block mt-6">
                <p className="text-black font-bold text-lg md:text-xl mb-6">You didn&apos;t fail. The strategy failed you.</p>
                <p className="text-[#333] text-base leading-[1.5] mb-8">Every nootropic stack, every focus app, every &ldquo;discipline&rdquo; hack you&apos;ve tried attacked the symptom. None of them went after the cause.</p>
                <p className="text-black font-bold text-lg mb-6">The cause is cortisol.</p>
                <p className="text-[#666] mb-5">And the reason is simple:</p>
                <p className="font-mono text-[clamp(1.6rem,3vw,2.8rem)] font-[900] leading-[1.05] tracking-[0.01em] text-[#00A6D2] uppercase">Your Brain Was Built for a World That No Longer Exists.</p>
              </div>
            </div>

            {/* Image (mobile order 2) */}
            <FadeUp delay={0.15} className="flex justify-center order-2 lg:order-none img-bleed lg:[all:unset] lg:flex lg:justify-center">
              <img src="/assets/gm-illustration-1.png" alt="Operator collapsed on floor of home office" width={500} height={500} loading="lazy" className="lg:max-w-[500px] w-full h-auto" />
            </FadeUp>

            {/* Mobile body copy (order 3, hidden on desktop) */}
            <div className="order-3 lg:hidden">
              <p className="text-black font-bold text-lg mb-5">You didn&apos;t fail. The strategy failed you.</p>
              <p className="text-[#333] text-base leading-[1.5] mb-6">Every nootropic stack, every focus app, every &ldquo;discipline&rdquo; hack you&apos;ve tried attacked the symptom. None of them went after the cause.</p>
              <p className="text-black font-bold text-lg mb-5">The cause is cortisol.</p>
              <p className="text-[#666] mb-4">And the reason is simple:</p>
              <p className="font-mono text-[clamp(1.6rem,3vw,2.8rem)] font-[900] leading-[1.05] tracking-[0.01em] text-[#00A6D2] uppercase">Your Brain Was Built for a World That No Longer Exists.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ §04 STRESS WAS SHORT — WHITE (flush with §03) ═══ */}
      <section className="bg-white" style={{ padding: "60px 60px 80px" }}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Top: illustration + body */}
          <div className="flex flex-col lg:grid lg:grid-cols-[0.3fr_0.7fr] gap-6 lg:gap-10 items-center mb-10">
            {/* Opening text — mobile order 1 */}
            <div className="order-1 lg:hidden">
              <p className="text-black text-[17px] leading-[1.5] mb-4">For most of human history, stress was short.</p>
              <p className="text-black text-[17px] leading-[1.5] mb-4">A threat appeared, cortisol spiked to get you through it, the threat passed, cortisol dropped. Clean cycle. Worked perfectly.</p>
              <p className="text-black font-bold text-[18px] mb-0">But now the threat never passes.</p>
            </div>

            {/* Image — mobile order 2, desktop left column */}
            <FadeUp className="flex justify-center order-2 lg:order-none img-bleed lg:[all:unset] lg:flex lg:justify-center">
              <img src="/assets/gm-illustration-2.png" alt="Operator slumped on couch" width={280} height={280} loading="lazy" className="max-w-[70%] mx-auto lg:max-w-[280px] w-full h-auto" />
            </FadeUp>

            {/* Full body — desktop only (order none) */}
            <FadeUp delay={0.1} className="hidden lg:block">
              <p className="text-black text-[17px] leading-[1.5] mb-4">For most of human history, stress was short.</p>
              <p className="text-black text-[17px] leading-[1.5] mb-4">A threat appeared, cortisol spiked to get you through it, the threat passed, cortisol dropped. Clean cycle. Worked perfectly.</p>
              <p className="text-black font-bold text-[18px] mb-4">But now the threat never passes.</p>
              <p className="text-black text-[17px] leading-[1.5] mb-4">Investor updates. Cash-flow projections. The Slack ping at 10pm. The decision you&apos;ve been putting off. Another notification. Then another.</p>
              <p className="text-black font-bold text-[17px]">None of it is life or death. But your nervous system can&apos;t tell the difference...</p>
            </FadeUp>

            {/* Continuing body — mobile order 3 */}
            <div className="order-3 lg:hidden">
              <p className="text-black text-[17px] leading-[1.5] mb-4">Investor updates. Cash-flow projections. The Slack ping at 10pm. The decision you&apos;ve been putting off. Another notification. Then another.</p>
              <p className="text-black font-bold text-[17px]">None of it is life or death. But your nervous system can&apos;t tell the difference...</p>
            </div>
          </div>

          {/* Bridge */}
          <FadeUp>
            <p className="text-black text-[17px] mb-8 mt-10">And the harder you push your brain without addressing cortisol first, the more you&apos;re working against yourself:</p>
          </FadeUp>

          {/* 3 teal boxes */}
          <Stagger className="grid md:grid-cols-3 gap-6">
            {STRESS_BOXES_V2.map((b) => (
              <motion.div key={b.headline} variants={cF} className="bg-[#E8F5F8] rounded-xl p-6">
                <p className="text-black text-[15px] leading-relaxed"><strong><u>{b.headline}</u></strong> {b.body}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══ §05 OPERATORS WHO CRACK THE CODE — WHITE (flush with §04) ═══ */}
      <section className="bg-white" style={{ padding: "60px 60px 80px" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:max-h-[600px]">
            {/* Image — first on mobile (order 1), desktop left column */}
            <FadeUp className="flex justify-center order-1 lg:order-none img-bleed lg:[all:unset] lg:flex lg:justify-center">
              <img src="/assets/gm-operator-compare.png" alt="Before and after comparison of operator — tired vs restored" width={600} height={450} loading="lazy" className="lg:max-w-[600px] w-full h-auto" />
            </FadeUp>
            {/* Copy — order 2 on mobile */}
            <FadeUp delay={0.1} className="order-2 lg:order-none">
              <p className="text-black text-lg md:text-xl leading-[1.5] mb-8">The operators who finally crack the code &mdash; who get their brain back after years of stacks and apps and hacks not working &mdash; are the ones who fix the chemistry first.</p>
              <p className="text-black font-[800] text-2xl md:text-[26px] leading-tight mb-5">Restore the chemistry. Get the brain back.</p>
              <p className="text-black text-[17px]">That&apos;s exactly what Genius Mind is built to do.</p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ §06 SAY NO TO CAFFEINE — DARK ═══ */}
      <section className="sec-dark py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-10 lg:items-start">
            {/* Left column: eyebrow + headline + bullets */}
            <div className="order-1 lg:order-none">
              <p className="label-mono text-[var(--color-coral)] text-xs mb-4 text-center lg:text-left">&#10067; And What About Other Options?</p>
              <h2 className="text-[clamp(2rem,3.2vw,2.8rem)] font-[900] leading-[1.05] tracking-[-0.02em] mb-0 lg:mb-6 text-white text-center lg:text-left">
                Say No to Caffeine Loops &amp;{" "}
                <span className="inline-block bg-[#00A6D2] text-white px-[0.2em] py-[0.05em] leading-[0.95]">Underdosed</span>{" "}
                Nootropic Stacks
              </h2>

              {/* Desktop: bullets below headline */}
              <div className="hidden lg:block mt-8">
                <h3 className="text-white font-[800] text-[clamp(1.5rem,2.5vw,2rem)] tracking-tight leading-[1.1] mb-4">Caffeine &amp; Stimulant Stacks:</h3>
                <div className="space-y-2.5 mb-8">
                  {CAFFEINE_FAILS.map((item) => (
                    <div key={item} className="border-2 border-[#E8283B] rounded-lg bg-black py-3.5 px-4 flex items-start gap-2.5">
                      <span className="text-sm mt-px shrink-0">&#10060;</span>
                      <p className="text-[14px] leading-snug"><strong className="text-white">{item.split("\u2014")[0]}</strong>{item.includes("\u2014") && <span className="text-[#B0B0B0]"> &mdash;{item.split("\u2014").slice(1).join("\u2014")}</span>}</p>
                    </div>
                  ))}
                </div>
                <h3 className="text-white font-[800] text-[clamp(1.5rem,2.5vw,2rem)] tracking-tight leading-[1.1] mb-4">Underdosed Nootropic Stacks:</h3>
                <div className="space-y-2.5">
                  {NOOTROPIC_FAILS.map((item) => (
                    <div key={item} className="border-2 border-[#E8283B] rounded-lg bg-black py-3.5 px-4 flex items-start gap-2.5">
                      <span className="text-sm mt-px shrink-0">&#10060;</span>
                      <p className="text-[14px] leading-snug"><strong className="text-white">{item.split("\u2014")[0]}</strong>{item.includes("\u2014") && <span className="text-[#B0B0B0]"> &mdash;{item.split("\u2014").slice(1).join("\u2014")}</span>}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column: image + closer (order 2 on mobile) */}
            <FadeUp delay={0.1} className="order-2 lg:order-none img-bleed lg:[all:unset] lg:flex lg:flex-col lg:sticky lg:top-24">
              <video src="/assets/section-6-coffee-loop-operator.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="Operator reaching for a fourth coffee, defeated" className="w-full lg:rounded-xl object-cover aspect-[4/5] lg:max-h-[600px] mb-6" />
              <p className="hidden lg:block text-white text-[15px] leading-[1.5]">&#128073; You deserve better than frying your nervous system with caffeine OR wasting money on underdosed stacks that don&apos;t address the ROOT of why your brain isn&apos;t delivering.</p>
            </FadeUp>

            {/* Mobile: bullets + closer (order 3, hidden on desktop) */}
            <div className="order-3 lg:hidden">
              <h3 className="text-white font-[800] text-[22px] tracking-tight leading-[1.1] mb-4">Caffeine &amp; Stimulant Stacks:</h3>
              <div className="space-y-2.5 mb-6">
                {CAFFEINE_FAILS.map((item) => (
                  <div key={item} className="border-2 border-[#E8283B] rounded-lg bg-black py-3.5 px-4 flex items-start gap-2.5">
                    <span className="text-sm mt-px shrink-0">&#10060;</span>
                    <p className="text-[14px] leading-snug"><strong className="text-white">{item.split("\u2014")[0]}</strong>{item.includes("\u2014") && <span className="text-[#B0B0B0]"> &mdash;{item.split("\u2014").slice(1).join("\u2014")}</span>}</p>
                  </div>
                ))}
              </div>
              <h3 className="text-white font-[800] text-[22px] tracking-tight leading-[1.1] mb-4">Underdosed Nootropic Stacks:</h3>
              <div className="space-y-2.5 mb-6">
                {NOOTROPIC_FAILS.map((item) => (
                  <div key={item} className="border-2 border-[#E8283B] rounded-lg bg-black py-3.5 px-4 flex items-start gap-2.5">
                    <span className="text-sm mt-px shrink-0">&#10060;</span>
                    <p className="text-[14px] leading-snug"><strong className="text-white">{item.split("\u2014")[0]}</strong>{item.includes("\u2014") && <span className="text-[#B0B0B0]"> &mdash;{item.split("\u2014").slice(1).join("\u2014")}</span>}</p>
                  </div>
                ))}
              </div>
              <p className="text-white text-[15px] leading-[1.5]">&#128073; You deserve better than frying your nervous system with caffeine OR wasting money on underdosed stacks that don&apos;t address the ROOT of why your brain isn&apos;t delivering.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ §07 PRODUCT REVEAL — LIGHT ═══ */}
      <section id="mechanism" className="sec-light py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <FadeUp>
            <SN n="07" label="THE SOLUTION" />
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
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ §5 OUTCOMES (4 tiles) — LIGHT ═══ */}
      <section className="sec-light-alt py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4">
          <FadeUp><SN n="08" label="THE OUTCOMES" /></FadeUp>
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
            <SN n="09" label="THE FORMULA" mode="dark" />
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
            <SN n="10" label="THE EVIDENCE" />
            <h2 className={`text-[clamp(32px,5vw,52px)] font-[800] leading-[1.05] mb-10 ${h2L}`}>What Long-Term Customers Actually Report</h2>
          </FadeUp>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SURVEY.map((s, i) => (
              <motion.div key={s.label} variants={cF} className="card-light text-center !p-6">
                <p className="text-5xl md:text-6xl font-[800] leading-none mb-1">
                  <span className={cyanL}><CountUp target={s.pct} delay={i * 0.1} /></span>
                  <span className={`text-2xl ${capL}`}>%</span>
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
            <SN n="11" label="THE COMPARISON" />
            <h2 className={`text-[clamp(32px,5vw,52px)] font-[800] leading-[1.05] text-center mb-3 ${h2L}`}>How Genius Mind Compares</h2>
            <p className={`${bodyL} text-center mb-10`}>Cognitive infrastructure, not a stimulant hit.</p>
          </FadeUp>
          <FadeUp>
            {/* Desktop: 3-column table */}
            <div className="hidden md:block card-light !p-0 overflow-x-auto">
              <table className="w-full text-sm">
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

            {/* Mobile: stacked feature cards */}
            <div className="md:hidden space-y-3">
              {COMP.map((r) => (
                <div key={r.label} className="card-light !p-4">
                  <p className={`label-mono text-[11px] font-bold ${h2L} mb-3`}>{r.label}</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${cyanL} font-semibold`}>Genius Mind</span>
                      <CheckCircle2 size={18} className={cyanL} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${bodyL}`}>Caffeine Stacks</span>
                      {r.caff === "x" ? <X size={18} className="text-[var(--color-coral-deep)]" /> : <HelpCircle size={16} className={capL} />}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${bodyL}`}>Generic Nootropics</span>
                      {r.generic === "x" ? <X size={18} className="text-[var(--color-coral-deep)]" /> : <HelpCircle size={16} className={capL} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10"><PrimaryCTA block>TRY IT NOW</PrimaryCTA></div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ §10 THE OFFER — LIGHT ═══ */}
      <section id="offer" className="sec-light-alt py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4">
          <FadeUp><SN n="12" label="THE OFFER" /></FadeUp>
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

      {/* ═══ §11 TIMELINE — INTERACTIVE TABBED — DARK ═══ */}
      <section className="sec-dark py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4">
          <FadeUp>
            <SN n="13" label="THE TIMELINE" mode="dark" />
            <h2 className={`text-[clamp(32px,5vw,52px)] font-[800] leading-[1.05] text-center mb-12 ${h2D}`}>What Happens After You Start Restoring Cognitive Chemistry</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <TabbedTimeline />
          </FadeUp>
          <p className={`${capD} text-xs text-center mt-6`}>*Individual results may vary. Based on customer reports and ingredient research timelines.</p>
        </div>
      </section>

      {/* ═══ §10 NUTRITIONIST FORMULATED — LIGHT ═══ */}
      <section className="sec-light-alt py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4">
          <FadeUp>
            <SN n="14" label="NUTRITIONIST FORMULATED" />
            <h2 className={`text-[clamp(28px,4.5vw,44px)] font-[800] leading-[1.05] text-center mb-10 ${h2L}`}>Nutritionist Formulated, Operator Tested.</h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="card-light !p-8 md:!p-10">
              {/* Expert verified pill */}
              <div className="flex justify-center mb-6">
                <span className="inline-flex items-center gap-1.5 bg-[var(--color-cyan)] text-white label-mono text-[11px] px-3 py-1.5 rounded-full">
                  <Check size={12} strokeWidth={3} /> Expert Verified
                </span>
              </div>

              {/* Headshot + name row */}
              <div className="flex items-center gap-5 mb-6">
                <img src="/assets/shona-wilkinson.png" alt="Shona Wilkinson, Registered Nutritionist" width={140} height={140} loading="lazy" className="w-[100px] h-[100px] md:w-[140px] md:h-[140px] rounded-full object-cover border border-[#e5e7eb] shrink-0" />
                <div>
                  <p className={`font-bold text-lg ${h2L}`}>Shona Wilkinson, RNutr</p>
                  <p className={`${bodyL} text-sm`}>Lead Nutritionist at JustFloow</p>
                  <p className={`label-mono ${capL} text-[10px] mt-1`}>BANT &middot; CNHC &middot; Royal Society for Medicine</p>
                </div>
              </div>

              {/* Quote */}
              <div className="border-l-[3px] border-[var(--color-cyan)] pl-5">
                <p className={`${bodyL} italic text-base leading-relaxed`}>&ldquo;Genius Mind is built around the science of cognitive chemistry &mdash; a blend of clinically-studied, naturally-sourced ingredients designed to support focus, recall, and steady mental energy. Every dose is at the level the research actually requires.&rdquo;</p>
              </div>
            </div>
          </FadeUp>
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
            <SN n="15" label="QUESTIONS" />
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

      {/* Mobile bottom spacer — prevents sticky CTA from hiding last content */}
      <div className="mobile-cta-spacer" />

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

      {/* ═══ STICKY CTA — DESKTOP (scroll-based) ═══ */}
      <div className={`hidden md:block sticky-bar fixed bottom-0 left-0 right-0 bg-[var(--color-dark-primary)]/95 backdrop-blur-md border-t border-[rgba(255,255,255,0.08)] py-3 px-4 z-50 ${sticky ? "visible" : ""}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/assets/hero-single.png" alt="Genius Mind bottle" width={40} height={38} className="w-10 h-10 object-contain" />
            <div><p className="text-sm font-bold text-white">Genius Mind</p><p className={`text-xs ${capD}`}>From &pound;16.99/mo &bull; 90-day guarantee</p></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right"><span className="text-white font-bold">From &pound;16.99/mo</span></div>
            <a href={SHOP} className="btn-primary !py-3 !px-6 !text-sm whitespace-nowrap">
              <span>ADD TO CART</span> <ArrowRight size={16} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>

      {/* ═══ STICKY CTA — MOBILE (always visible) ═══ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-[#0a0a0f] border-t border-[rgba(0,166,210,0.3)]" style={{ padding: "12px 16px", paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))", boxShadow: "0 -4px 12px rgba(0,0,0,0.3)" }} role="complementary" aria-label="Buy Genius Mind">
        <p className="text-[#999] text-[12px] text-center mb-2">90-day money back guarantee</p>
        <a href="#offer" className="flex items-center justify-center gap-2 w-full bg-[#00A6D2] text-white font-bold text-base py-3.5 px-4 rounded-lg">
          Get Genius Mind &mdash; From &pound;20/bottle <ArrowRight size={16} strokeWidth={2.5} />
        </a>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */
const SYMPTOMS_ALERT = [
  { bold: "Re-reading the same email three times", rest: "before the meaning lands" },
  { bold: "Decision quality dropping by 2pm", rest: "\u2014 hardest calls always land later" },
  { bold: "The second coffee not doing what it used to", rest: "\u2014 third gives jitters without focus" },
  { bold: "Word-finding gaps in important conversations", rest: "\u2014 names, terms, the right word for a Slack message" },
  { bold: "Brain output flatlining", rest: "even after sleep, training, and diet are sorted" },
];
const STRESS_BOXES_V2 = [
  { headline: "More coffee spikes cortisol further.", body: " Caffeine works by triggering the stress response \u2014 the same system that\u2019s already overloaded. Your brain reads it as another threat and elevates cortisol on top of what\u2019s already there." },
  { headline: "Pushing harder adds fuel to the fire.", body: " Long, high-pressure deep work sessions done while cortisol is already elevated push it higher. Operators who grind through it end up with worse output the following day, not better." },
  { headline: "Stimulant nootropics work by triggering cortisol.", body: " The temporary energy and focus they deliver comes from spiking your stress hormones. You feel sharp for an hour. Then the chemistry your brain actually needs is depleted further." },
];
const CAFFEINE_FAILS = [
  "Heart racing, jitters, anxiety \u2014 then a brutal crash by 3pm",
  "Only work while you\u2019re taking them \u2014 stop and the brain fog comes back worse",
  "Spike cortisol with every dose \u2014 the exact thing destroying your chemistry",
];
const NOOTROPIC_FAILS = [
  "Proprietary blends hide worthless dosages",
  "Dated formulas with single ingredients that don\u2019t reach therapeutic levels",
  "Just expensive pee \u2014 no actual mechanism, no real cognitive impact",
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
  { label: "Sustained Focus", pct: 70, subtitle: "long-term customers report sustained focus" },
  { label: "Mental Clarity", pct: 67, subtitle: "report sharper mental clarity" },
  { label: "Easier to Take Action", pct: 61, subtitle: "report it\u2019s easier to take action" },
  { label: "Sharper Under Pressure", pct: 52, subtitle: "report sharper thinking under pressure" },
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
