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
  Package, ShieldCheck, Truck, Star, RotateCw, Layers, Anchor, Waves, BatteryFull,
} from "lucide-react";

const SHOP = "https://justfloow.com/products/genius-mind";

/* ═══════ COMPONENTS ═══════ */

function SN({ n, label, mode = "light" }: { n: string; label: string; mode?: "light" | "dark" }) {
  return <p className={`label-mono ${mode === "light" ? "text-[var(--color-cyan)]" : "text-[var(--color-cyan-bright)]"} mb-4 text-xs`}>{n} &ndash; {label}</p>;
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

function CompIcon({ type, size = "lg" }: { type: "check" | "x" | "q"; size?: "sm" | "lg" }) {
  const s = size === "sm" ? "text-2xl" : "text-3xl";
  if (type === "check") return <span className={`${s} leading-none`} aria-label="Yes">&#x2705;</span>;
  if (type === "x") return <span className={`${s} leading-none text-[#dc2626] font-[900]`} aria-label="No">&#x274C;</span>;
  return <span className={`${s} leading-none text-[#dc2626] font-[900]`} aria-label="Maybe">&#x2753;</span>;
}

/* ═══════ ANIMATED BENEFIT ICON ═══════ */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AnimatedIcon({ icon, variants }: { icon: React.ReactNode; variants: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });
  const [reduced, setReduced] = useState(false);
  useEffect(() => { setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);
  return (
    <motion.div ref={ref} animate={reduced ? "initial" : inView ? "animate" : "initial"} variants={variants} className="flex justify-center mb-4">
      {icon}
    </motion.div>
  );
}

const OUTCOME_ICONS = [
  { icon: <Zap size={48} strokeWidth={2} color="#00A6D2" />, title: "SUSTAINED FOCUS", desc: "The 4-6hr decision window high-output work demands. No 2pm cliff.", variants: { initial: { scale: 1, opacity: 0.7 }, animate: { scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const } } } },
  { icon: <Brain size={48} strokeWidth={2} color="#00A6D2" />, title: "MENTAL CLARITY", desc: "Brain fog gone. Reading and writing land cleanly first time.", variants: { initial: { filter: "drop-shadow(0 0 0px rgba(0,166,210,0))" }, animate: { filter: ["drop-shadow(0 0 0px rgba(0,166,210,0))", "drop-shadow(0 0 12px rgba(0,166,210,0.8))", "drop-shadow(0 0 0px rgba(0,166,210,0))"], transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" as const } } } },
  { icon: <Target size={48} strokeWidth={2} color="#00A6D2" />, title: "EASIER TO TAKE ACTION", desc: "The hard calls stop stalling. Decisions get made.", variants: { initial: { scale: 1.15, opacity: 0.6 }, animate: { scale: [1.15, 1, 1.15], opacity: [0.6, 1, 0.6], transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" as const } } } },
  { icon: <Waves size={48} strokeWidth={2} color="#00A6D2" />, title: "REDUCED OVERWHELM", desc: "Cognitive load handled. Calm under pressure, not flooded by it.", variants: { initial: { x: 0 }, animate: { x: [-3, 3, -3], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const } } } },
  { icon: <BatteryFull size={48} strokeWidth={2} color="#00A6D2" />, title: "STAMINA & RECOVERY", desc: "Brain output sustained across the working day. Sleep restores you.", variants: { initial: { opacity: 0.6 }, animate: { opacity: [0.6, 1, 0.6], transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" as const } } } },
  { icon: <Shield size={48} strokeWidth={2} color="#00A6D2" />, title: "STRESS RESILIENCE", desc: "Cortisol-aware formulation. Built for the operator's chemistry.", variants: { initial: { scale: 1 }, animate: { scale: [1, 1.06, 1], transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" as const } } } },
];

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

/* ═══════ TRUSTPILOT REVIEW CAROUSEL ═══════ */
const TRUSTPILOT_REVIEWS = [
  { name: "Mark D.", time: "2 days ago", title: "Fog has completely lifted", body: "I run a small business on my own. I was putting everything off... Since taking Genius Mind the fog has lifted. I'm actually getting through decisions instead of circling them. Genuinely impressed." },
  { name: "Sarah K.", time: "4 days ago", title: "The 3pm slump is gone", body: "The 3pm slump was killing my output. I'd make solid calls in the morning and then spend the afternoon second-guessing them. Two months in and I'm making the same quality decisions at 4pm." },
  { name: "James T.", time: "1 week ago", title: "First thing that actually worked", body: "I've tried the usual stack — AG1, caffeine protocols, the whole thing. This is the first supplement that's actually moved the needle on how long I can sustain focus in a day." },
  { name: "Lucy W.", time: "1 week ago", title: "Noticed a difference within days", body: "Was sceptical but gave it a go. Within the first week my energy was more consistent and I wasn't reaching for coffee by 2pm. Really good product." },
  { name: "Tom R.", time: "2 weeks ago", title: "Best nootropic I've tried", body: "I've tried a lot of nootropics over the years. This is the first one where I actually feel a sustained difference rather than a short spike. The ingredient quality is clearly a step above." },
  { name: "Emma H.", time: "2 weeks ago", title: "Great product, great company", body: "Ordered the 90-day supply and haven't looked back. Focus is sharper, I'm sleeping better, and the customer service when I had a question was brilliant." },
  { name: "Dan P.", time: "3 weeks ago", title: "Exactly what I needed", body: "Running two businesses and my brain was fried by midweek. Genius Mind has noticeably extended how long I can think clearly each day. The compound effect is real." },
  { name: "Rachel M.", time: "3 weeks ago", title: "Impressed with the transparency", body: "Love that every ingredient and dosage is on the label. No proprietary blends. I can actually see what I'm taking and research it myself. Brilliant for focus and mood." },
];

function ReviewCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const [sel, setSel] = useState(0);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSel(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <div className="mt-6">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {TRUSTPILOT_REVIEWS.map((r) => (
            <div key={r.name} className="flex-[0_0_100%] min-w-0 bg-white rounded-xl p-4 border border-[rgba(0,0,0,0.06)] overflow-hidden">
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-[#00b67a] text-[#00b67a]" />)}
              </div>
              <p className={`text-xs ${capL} mb-1`}>{r.name} &middot; {r.time}</p>
              <p className={`font-bold text-sm ${h2L} mb-1.5`}>{r.title}</p>
              <p className={`text-[13px] leading-relaxed ${bodyL} line-clamp-3 break-words`}>&ldquo;{r.body}&rdquo;</p>
              <p className="text-[11px] text-[#00b67a] font-semibold mt-2 flex items-center gap-1"><Check size={11} strokeWidth={3} />Verified</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 mt-3">
        <button onClick={scrollPrev} aria-label="Previous review" className="w-7 h-7 rounded-full bg-white shadow-sm border border-[rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-gray-50 transition-colors shrink-0"><ChevronLeft size={14} /></button>
        <div className="flex gap-1.5">
          {TRUSTPILOT_REVIEWS.map((_, i) => (
            <button key={i} onClick={() => emblaApi?.scrollTo(i)} className={`w-2 h-2 rounded-full transition-all ${i === sel ? "bg-[var(--color-cyan)]" : "bg-[var(--color-ink-tertiary)]/30"}`} />
          ))}
        </div>
        <button onClick={scrollNext} aria-label="Next review" className="w-7 h-7 rounded-full bg-white shadow-sm border border-[rgba(0,0,0,0.08)] flex items-center justify-center hover:bg-gray-50 transition-colors shrink-0"><ChevronRight size={14} /></button>
      </div>
    </div>
  );
}

/* ═══════ TRUSTPILOT REVIEW GRID ═══════ */
function TrustpilotStars({ count = 5, size = 18 }: { count?: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" width={size} height={size} className="fill-[#00b67a]"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      ))}
    </div>
  );
}

function TrustpilotReviewCarousel() {
  const [emblaRef2, emblaApi2] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const [selRev, setSelRev] = useState(0);
  const scrollPrevR = useCallback(() => emblaApi2?.scrollPrev(), [emblaApi2]);
  const scrollNextR = useCallback(() => emblaApi2?.scrollNext(), [emblaApi2]);
  useEffect(() => {
    if (!emblaApi2) return;
    const onSelect = () => setSelRev(emblaApi2.selectedScrollSnap());
    emblaApi2.on("select", onSelect);
    onSelect();
    return () => { emblaApi2.off("select", onSelect); };
  }, [emblaApi2]);

  return (
    <section className="sec-light-alt py-14 md:py-20">
      <div className="max-w-3xl mx-auto px-4">
        {/* Trustpilot eyebrow */}
        <FadeUp>
          <div className="flex justify-center mb-8"><TrustpilotEyebrow mode="light" /></div>
        </FadeUp>

        {/* Review carousel */}
        <div className="overflow-hidden rounded-2xl" ref={emblaRef2}>
          <div className="flex">
            {TP_REVIEWS.map((r) => (
              <div key={r.name} className="flex-[0_0_100%] min-w-0 px-1">
                <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-xl p-5 md:p-6 shadow-sm">
                  <div className="flex gap-0.5 mb-2"><TrustpilotStars count={5} size={16} /></div>
                  <p className={`${capL} text-xs mb-1`}>{r.name} &middot; {r.time}</p>
                  <p className={`font-bold text-[15px] ${h2L} mb-1.5`}>{r.title}</p>
                  <p className={`text-[13px] leading-relaxed ${bodyL} mb-2`}>&ldquo;{r.body}&rdquo;</p>
                  <p className="text-[11px] text-[#00b67a] font-semibold flex items-center gap-1"><Check size={11} strokeWidth={3} />Verified</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {TP_REVIEWS.map((_, i) => (
            <button key={i} onClick={() => emblaApi2?.scrollTo(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === selRev ? "bg-[var(--color-ink-primary)]" : "bg-[var(--color-ink-tertiary)]/30"}`} />
          ))}
        </div>

        {/* Swipe nav */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <button onClick={scrollPrevR} aria-label="Previous review" className="w-10 h-10 rounded-full border border-[var(--color-ink-tertiary)]/30 flex items-center justify-center hover:border-[var(--color-ink-tertiary)] transition-colors">
            <ChevronLeft size={20} className={capL} />
          </button>
          <span className={`label-mono ${capL} text-[11px] tracking-[0.15em]`}>SWIPE TO SEE MORE</span>
          <button onClick={scrollNextR} aria-label="Next review" className="w-10 h-10 rounded-full border border-[var(--color-ink-tertiary)]/30 flex items-center justify-center hover:border-[var(--color-ink-tertiary)] transition-colors">
            <ChevronRight size={20} className={capL} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═══════ MINI REVIEW SCROLLER (below CTA) ═══════ */
const MINI_REVIEWS = [
  { title: "Fog Has Lifted", body: "I run a record label pretty much on my own. I was putting everything off \u2014 the little things, the big things. Since taking Genius Mind the fog has lifted. I\u2019m actually getting through decisions instead of circling them.", name: "Mark D." },
  { title: "The 3pm slump is gone", body: "The 3pm slump was killing my output. Two months in and I\u2019m making the same quality decisions at 4pm that I was making at 9.", name: "Sarah K." },
  { title: "First thing that actually worked", body: "I\u2019ve tried the usual stack \u2014 AG1, caffeine protocols, the whole thing. This is the first supplement that\u2019s actually moved the needle.", name: "James T." },
  { title: "Replaced my coffee habit", body: "Replaced my 4-coffees-a-day habit. Cleaner energy, no jitters, no crash. My afternoon slump has disappeared entirely.", name: "Mark D." },
  { title: "Sharper than I\u2019ve been in years", body: "At 55, I was worried about my memory declining. After 6 weeks on Genius Mind, I\u2019m sharper than I\u2019ve been in years.", name: "Lucy K." },
];

function TrustpilotEyebrow({ mode = "dark" }: { mode?: "dark" | "light" }) {
  const textCol = mode === "dark" ? "text-white" : h2L;
  const subCol = mode === "dark" ? "text-white/50" : capL;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`${textCol} font-bold text-sm`}>Excellent</span>
      <TrustpilotStars count={5} size={16} />
      <span className={`${subCol} text-xs`}>|</span>
      <div className="flex items-center gap-1 text-[#00b67a] text-xs font-semibold">
        <svg viewBox="0 0 24 24" width={14} height={14} className="fill-[#00b67a]"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        Trustpilot
      </div>
      <span className={`${subCol} text-xs`}>127 reviews</span>
    </div>
  );
}

function MiniReviewScroller() {
  const [ref, api] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const [sel, setSel] = useState(0);
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSel(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => { api.off("select", onSelect); };
  }, [api]);

  return (
    <div className="mt-6 text-left">
      <div className="mb-3"><TrustpilotEyebrow mode="dark" /></div>

      {/* Carousel */}
      <div className="overflow-hidden rounded-xl" ref={ref}>
        <div className="flex">
          {MINI_REVIEWS.map((r) => (
            <div key={r.name + r.title} className="flex-[0_0_100%] min-w-0 pr-2">
              <div className="bg-white rounded-xl p-5 text-left">
                <div className="flex gap-0.5 mb-1.5"><TrustpilotStars count={5} size={14} /></div>
                <p className={`font-bold text-sm ${h2L} mb-1.5`}>{r.title}</p>
                <p className={`text-[13px] leading-relaxed ${bodyL} mb-2`}>&ldquo;{r.body}&rdquo;</p>
                <p className="text-xs"><strong className={h2L}>{r.name}</strong> <span className={capL}>&ndash; Verified Buyer</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {MINI_REVIEWS.map((_, i) => (
          <button key={i} onClick={() => api?.scrollTo(i)} className={`w-2 h-2 rounded-full transition-all ${i === sel ? "bg-[var(--color-cyan)]" : "bg-white/20"}`} />
        ))}
      </div>
    </div>
  );
}

/* ═══════ STANDALONE FAQ ACCORDION ═══════ */
function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {FAQS.map((f, i) => (
        <div key={i} className="bg-white border border-[rgba(0,0,0,0.08)] rounded-xl overflow-hidden shadow-sm">
          <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full text-left px-6 py-5 flex items-center justify-between">
            <span className={`font-[900] text-[15px] md:text-[17px] uppercase tracking-wide ${h2L}`}>{f.q}</span>
            <motion.span animate={{ rotate: openIdx === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={22} strokeWidth={2.5} className={capL} />
            </motion.span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? "max-h-[400px]" : "max-h-0"}`}>
            <div className={`px-6 pb-5 text-[15px] ${bodyL} leading-relaxed`}>{f.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════ NUTRITION LABEL MODAL ═══════ */
function NutritionModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="relative max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center z-10 hover:bg-gray-100 transition-colors"><X size={18} /></button>
        <img src="/assets/nutrition-label.png" alt="Genius Mind Nutritional Information" className="w-full rounded-xl" />
      </div>
    </div>
  );
}

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
      <div className="flex justify-center gap-1 sm:gap-2 mt-3 flex-wrap">
        {CAROUSEL_SLIDES.map((slide, i) => (
          <button key={i} aria-label={`Go to slide ${i + 1}`} onClick={() => emblaApi?.scrollTo(i)} className={`w-10 h-10 sm:w-[52px] sm:h-[52px] rounded-lg overflow-hidden border-2 transition-all ${i === selectedIndex ? "border-[var(--color-cyan)]" : "border-transparent hover:border-[#c0c5cc]"}`}>
            <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════ ACCORDION PLAN CARD (Primal Brain FM style) ═══════ */
function PlanCard({ active, onSelect, featured, title, price, period, was, billing, perServing, savePill, perks, welcomeKit, cta }: {
  active: boolean; onSelect: () => void; featured?: boolean; title: string; price: string; period: string; was: string; billing: string; perServing: string; savePill: string; perks: string[]; welcomeKit?: boolean; cta: string;
}) {
  return (
    <div onClick={onSelect} className={`relative rounded-xl border-2 bg-white cursor-pointer transition-all duration-200 mb-3 ${active ? "border-[var(--color-ink-primary)]" : "border-[#e5e7eb] hover:border-[#c0c5cc]"}`}>
      {featured && <span className="absolute -top-2.5 right-4 bg-[#1bb88a] text-white text-[9px] font-bold uppercase tracking-wide px-3 py-1 rounded">Best Value</span>}

      {/* Header — always visible */}
      <div className="px-4 sm:px-5 py-4">
        <div className="flex items-center flex-wrap gap-x-2.5 gap-y-1 mb-2">
          <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center shrink-0 ${active ? "border-[var(--color-ink-primary)]" : "border-[#d0d0d0]"}`}>
            {active && <div className="w-[10px] h-[10px] rounded-full bg-[var(--color-ink-primary)]" />}
          </div>
          <span className={`font-bold text-[15px] ${h2L}`}>{title}</span>
          <span className="bg-[#1bb88a] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">{savePill}</span>
        </div>
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className={`text-[24px] sm:text-[28px] font-[800] leading-none ${h2L}`}>&pound;{price}</span>
          <span className={`text-sm sm:text-base ${capL}`}>{period}</span>
          <span className={`text-xs sm:text-sm ${capL} line-through`}>&pound;{was}</span>
        </div>
        <div className="flex flex-wrap justify-between items-center mt-1 gap-x-2">
          <span className={`text-[11px] ${capL}`}>{billing}</span>
          <span className={`text-[11px] font-semibold ${capL}`}>{perServing}</span>
        </div>
      </div>

      {/* Body — expands when active */}
      <div className={`overflow-hidden transition-all duration-400 ${active ? "max-h-[800px]" : "max-h-0"}`}>
        <div className="px-4 sm:px-5 pb-5 pt-3 border-t border-[rgba(0,0,0,0.06)]">
          <ul className={`grid ${perks.length > 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"} gap-x-5 gap-y-1.5 mb-4`}>
            {perks.map((p) => <li key={p} className={`flex items-center gap-2 text-[13px] font-medium ${bodyL}`}><Check size={13} className="text-[var(--color-cyan)] shrink-0" strokeWidth={3} />{p}</li>)}
          </ul>

          {welcomeKit && (
            <>
              <div className="border-t border-[rgba(0,0,0,0.06)] pt-3 mb-3">
                <p className={`text-center text-[10px] font-bold uppercase tracking-wider ${h2L} mb-3`}>Welcome Kit &ndash; Arrives With First Order</p>
                <div className="flex justify-center gap-3 sm:gap-4">
                  {[{ img: "/assets/gift-magnesium.png", name: "Magnesium 3-in-1", price: "15" }, { img: "/assets/gift-welcome-pack.png", name: "Brain Performance Guide", price: "10" }].map((g) => (
                    <div key={g.name} className="text-center w-[75px] sm:w-[90px]">
                      <div className="w-[75px] h-[75px] sm:w-[90px] sm:h-[90px] bg-[rgba(0,166,210,0.06)] rounded-lg overflow-hidden mb-1.5 flex items-center justify-center">
                        <img src={g.img} alt={g.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[12px] font-bold text-[var(--color-cyan)]"><s className={`${capL} font-normal mr-1`}>&pound;{g.price}</s>FREE</p>
                      <p className={`text-[11px] font-semibold ${h2L}`}>{g.name}</p>
                    </div>
                  ))}
                </div>
              </div>

            </>
          )}

          <PrimaryCTA block>{cta}</PrimaryCTA>
        </div>
      </div>
    </div>
  );
}

/* ═══════ PDP INFO BLOCK ═══════ */
function PdpInfo({ onViewLabel }: { onViewLabel: () => void }) {
  return (
    <div className="text-left">
      <div className="flex items-center gap-1.5 mb-3 pb-3 border-b border-[rgba(0,0,0,0.08)]">
        <span className="text-[#f5a623] text-base tracking-wider">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
        <span className={`font-bold text-sm ${h2L}`}>4.8</span>
        <span className={`text-[13px] ${capL}`}>from 127 Reviews</span>
      </div>
      <p className={`text-[11px] font-bold uppercase tracking-wider ${cyanL} mb-1.5`}>All-In-One Cognitive Supplement</p>
      <h3 className={`text-[clamp(22px,3vw,28px)] font-bold ${h2L} mb-2.5`}>Genius Mind</h3>
      <p className={`text-sm ${bodyL} leading-relaxed mb-4 break-words`}>16 clinically-dosed ingredients in one daily capsule. Formulated by leading UK nutritionist Shona Wilkinson for operators who demand more.</p>
      <button onClick={onViewLabel} className={`inline-flex items-center gap-2 px-4 py-2.5 bg-[rgba(0,166,210,0.06)] border border-[rgba(0,166,210,0.15)] rounded-full text-[13px] font-semibold ${h2L} hover:bg-[rgba(0,166,210,0.12)] transition-colors mb-5`}>
        <BookOpen size={14} className={capL} /> View Nutrition Label
      </button>
      <div className="flex flex-col gap-2 mb-6">
        {["16 researched ingredients in one capsule", "89% felt sharper focus. 76% better recall.", "Made in the UK to GMP standard", "90 days to feel it. Or your money back."].map((pill) => (
          <div key={pill} className={`inline-flex items-center gap-2 px-4 py-2.5 bg-[rgba(0,0,0,0.03)] border border-[rgba(0,0,0,0.06)] rounded-full text-[13px] font-medium ${h2L} max-w-full`}>
            <Check size={14} className="text-[var(--color-cyan)] shrink-0" strokeWidth={2.5} />{pill}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════ OFFER PRICING ACCORDION ═══════ */
function OfferAccordion() {
  const [activePlan, setActivePlan] = useState(0);
  return (
    <div>
      <p className={`text-[11px] font-bold uppercase tracking-wider ${capL} mb-3`}>Subscribe &amp; Save:</p>
      <PlanCard
        active={activePlan === 0}
        onSelect={() => setActivePlan(0)}
        featured
        title="90-Day Supply"
        price="16.99"
        period="/mo"
        was="74.97"
        billing="Billed £50.99 every 3 months"
        perServing="£0.57 per serving"
        savePill="Save 41%"
        perks={["90 servings, only £0.57 per day", "Fast & free shipping", "NO CONTRACT – pause, skip & cancel anytime", "90-day money back guarantee"]}
        welcomeKit
        cta="SAVE 41% + FREE GIFTS"
      />
      <PlanCard
        active={activePlan === 1}
        onSelect={() => setActivePlan(1)}
        title="30-Day Supply"
        price="21.24"
        period="/mo"
        was="29.99"
        billing="Billed £21.24 every month"
        perServing="£0.71 per serving"
        savePill="Save 29%"
        perks={["30 servings, only £0.71 per day", "Fast & free shipping", "NO CONTRACT – pause, skip & cancel anytime", "90-day money back guarantee"]}
        cta="TRY FOR 30 DAYS"
      />
      <div className="text-center mt-3">
        <a href={SHOP} className={`${bodyL} underline text-sm font-semibold transition-colors`}>One Time Purchase &pound;24.99</a>
      </div>
    </div>
  );
}

/* ═══════ OFFER SECTION (wraps carousel, reviews, PDP, pricing) ═══════ */
function OfferSection() {
  const [labelOpen, setLabelOpen] = useState(false);
  return (
    <>
      <NutritionModal open={labelOpen} onClose={() => setLabelOpen(false)} />
      <section id="offer" className="sec-light-alt py-14 md:py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Left: Carousel + Review carousel */}
            <FadeUp className="min-w-0 overflow-hidden">
              <ProductCarousel />
              <ReviewCarousel />
            </FadeUp>

            {/* Right: PDP info + Accordion pricing */}
            <FadeUp delay={0.1} className="min-w-0 overflow-hidden">
              <PdpInfo onViewLabel={() => setLabelOpen(true)} />
              <OfferAccordion />
              <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] mt-6">
                {[[ShieldCheck, "90-day money back guarantee"], [Factory, "GMP certified"], [FlaskConical, "Made in UK"], [Star, "1000+ five-star reviews"]].map(([Icon, label]) => (
                  <div key={label as string} className={`flex items-center gap-1.5 ${capL}`}><Icon size={14} className={capL} /><span>{label as string}</span></div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
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
  { id: "day_30", tab: "Day 30", num: "04", title: "The Momentum", clipPct: 50, icon: <TrendingUp size={48} />,
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
    <div className="bg-[var(--color-dark-secondary)] border border-[var(--color-dark-tertiary)] rounded-2xl p-4 md:p-10">
      {/* Tab strip */}
      <div className="flex flex-wrap gap-1.5 md:gap-2 pb-3 md:pb-4 mb-4 md:mb-8">
        {TL_STAGES.map((st, i) => (
          <button key={st.id} onClick={() => setActive(i)} className={`label-mono text-[10px] px-3 py-2 md:px-5 md:py-3 md:text-[11px] rounded-lg whitespace-nowrap transition-all shrink-0 ${i === active ? "bg-[var(--color-cyan)] text-white" : "bg-[var(--color-dark-tertiary)] text-[var(--color-dink-secondary)] hover:text-white hover:translate-y-[-1px]"}`}>
            {st.tab}
          </button>
        ))}
      </div>

      {/* Stage content — fixed min-height to prevent layout shift */}
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4 md:gap-8 mb-4 md:mb-8 min-h-[280px] md:min-h-[320px]">
        <div>
          <h3 className="text-white font-bold text-xl md:text-2xl mb-2 relative">{s.title}</h3>
          <p className="text-[var(--color-dink-secondary)] text-xs md:text-sm leading-relaxed mb-4">{s.sub}</p>
          <ul className="space-y-1.5">
            {s.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-xs md:text-sm text-[var(--color-dink-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] mt-1.5 shrink-0" />{b}
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

/* ═══════ COMBINED TABBED SECTION (Mars Men style) ═══════ */
const TABBED_REVIEWS = [
  { title: "Fog has completely lifted", body: "I run a small business on my own. I was putting everything off... Since taking Genius Mind the fog has lifted. I'm actually getting through decisions instead of circling them.", name: "Mark D." },
  { title: "The 3pm slump is gone", body: "The 3pm slump was killing my output. Two months in and I'm making the same quality decisions at 4pm that I was making at 9.", name: "Sarah K." },
  { title: "First thing that actually worked", body: "I've tried the usual stack — AG1, caffeine protocols, the whole thing. This is the first supplement that's actually moved the needle on how long I can sustain focus.", name: "James T." },
  { title: "Best nootropic I've tried", body: "This is the first one where I actually feel a sustained difference rather than a short spike. The ingredient quality is clearly a step above.", name: "Tom R." },
  { title: "Great product, great company", body: "Ordered the 90-day supply and haven't looked back. Focus is sharper, I'm sleeping better, and the customer service was brilliant.", name: "Emma H." },
];

function CombinedTabbedSection() {
  const [tab, setTab] = useState<"expect" | "faq" | "reviews">("expect");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openReview, setOpenReview] = useState<number | null>(null);
  const tabs = [
    { id: "expect" as const, label: "What to Expect" },
    { id: "faq" as const, label: "FAQs" },
    { id: "reviews" as const, label: "Reviews" },
  ];

  return (
    <div className="bg-[var(--color-dark-secondary)] border border-[var(--color-dark-tertiary)] rounded-2xl p-4 md:p-10">
      {/* Tab strip */}
      <div className="flex mb-6 md:mb-8 bg-[#2a3040] rounded-xl p-1.5 gap-1.5">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 py-3 md:py-4 text-center text-[15px] md:text-lg font-[800] tracking-wide rounded-lg transition-all ${tab === t.id ? "bg-white text-[var(--color-ink-primary)] shadow-md" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* What to Expect tab */}
      {tab === "expect" && (
        <div>
          <h3 className={`text-[clamp(24px,4vw,36px)] font-[900] ${h2D} mb-4`}>What Happens After You Start Restoring Cognitive Chemistry</h3>

          {/* Progress line */}
          <div className="relative flex items-center justify-between mb-6 mx-4 md:mx-8">
            <div className="absolute left-0 right-0 top-1/2 h-[3px] bg-[var(--color-cyan)]" />
            {[0, 1, 2].map((i) => (
              <div key={i} className="relative w-3 h-3 rounded-full bg-[var(--color-cyan)] border-2 border-[var(--color-cyan)] z-[1]" />
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { day: "DAY", num: "1", title: "Activation", icon: <Zap size={36} strokeWidth={2.5} className="text-[var(--color-cyan)]" />, points: ["Guarana and B vitamins provide an initial lift", "L-Tyrosine begins supporting dopamine pathways", "Most users feel slightly more present", "The cognitive foundation starts building"] },
              { day: "DAY", num: "30", title: "The Momentum", icon: <TrendingUp size={36} strokeWidth={2.5} className="text-[var(--color-cyan)]" />, points: ["Bacopa and Lion\u2019s Mane reach effective levels", "The afternoon crash flattens", "Focus extends naturally, less forced", "Word-finding and recall feel sharper"] },
              { day: "DAY", num: "90", title: "Lock-In", icon: <Rocket size={36} strokeWidth={2.5} className="text-[var(--color-cyan)]" />, points: ["All 16 ingredients working synergistically", "Cognitive infrastructure, fully built", "Decision stamina across the full working day", "This is your new cognitive baseline"] },
            ].map((stage) => (
              <div key={stage.num} className="bg-[var(--color-dark-tertiary)] rounded-xl p-5 md:p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  {stage.icon}
                  <span className="font-mono text-[var(--color-cyan)] text-sm font-[900] tracking-[0.1em] uppercase">{stage.day}</span>
                  <span className="font-mono text-[var(--color-cyan)] text-[28px] md:text-[32px] font-[900] leading-none">{stage.num}</span>
                  <span className={`font-[900] text-xl md:text-2xl ${h2D}`}>{stage.title}</span>
                </div>
                <ul className="space-y-2">
                  {stage.points.map((p) => (
                    <li key={p} className={`flex items-start gap-2.5 text-[14px] md:text-[15px] font-semibold text-white/85`}>
                      <span className="w-2 h-2 rounded-full bg-[var(--color-cyan)] mt-1.5 shrink-0" />{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className={`${capD} text-xs text-center mt-4`}>*Individual results may vary.</p>
        </div>
      )}

      {/* FAQs tab */}
      {tab === "faq" && (
        <div className="space-y-2">
          {FAQS.map((f, i) => (
            <div key={i} className="bg-[var(--color-dark-tertiary)] rounded-xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left px-5 py-4 flex items-center justify-between">
                <span className={`font-[900] text-base md:text-xl uppercase tracking-wide text-white`}>{f.q}</span>
                <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={24} strokeWidth={3} className="text-white/60" /></motion.span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-[300px]" : "max-h-0"}`}>
                <div className={`px-5 pb-4 text-sm ${bodyD} leading-relaxed`}>{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reviews tab */}
      {tab === "reviews" && (
        <div>
          <div className="space-y-2 mb-6">
            {TABBED_REVIEWS.map((r, i) => (
              <div key={i} className="bg-[var(--color-dark-tertiary)] rounded-xl overflow-hidden">
                <button onClick={() => setOpenReview(openReview === i ? null : i)} className="w-full text-left px-5 py-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex gap-0.5 mb-1.5">{[...Array(5)].map((_, j) => <Star key={j} size={18} className="fill-[#f5a623] text-[#f5a623]" />)}</div>
                    <span className={`font-[900] text-base md:text-xl uppercase tracking-wide text-white`}>&ldquo;{r.title}&rdquo;</span>
                  </div>
                  <motion.span animate={{ rotate: openReview === i ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0"><ChevronDown size={24} strokeWidth={3} className="text-white/60" /></motion.span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openReview === i ? "max-h-[300px]" : "max-h-0"}`}>
                  <div className={`px-5 pb-4 text-sm ${bodyD} leading-relaxed`}>&ldquo;{r.body}&rdquo;<br /><span className="text-xs text-[var(--color-cyan)] font-bold mt-2 inline-block">&mdash; {r.name}, Verified Buyer</span></div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <PrimaryCTA>READ MORE</PrimaryCTA>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function Page() {
  const [sticky, setSticky] = useState(false);
  useEffect(() => { const fn = () => setSticky(window.scrollY > 800); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);

  return (
    <>
      {/* ═══ HEADER — thin brand bar like Mars Men ═══ */}
      <header className="bg-[var(--color-dark-primary)] border-b border-[rgba(255,255,255,0.08)] py-3">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <a href={SHOP} className="text-white font-black text-base tracking-[0.2em]">GENIUS MIND</a>
        </div>
      </header>

      {/* ═══ §01 HERO + §02 SYMPTOMS — UNIFIED DARK CANVAS ═══ */}
      <div className="sec-dark">
        {/* §01 HERO */}
        <div className="sec-pad !pb-16">
          <div className="sec-container">
            <div className="flex flex-col lg:grid grid-mm" style={{ alignItems: 'center' }}>
              {/* Eyebrow + headline (order 1 on mobile) */}
              <FadeUp className="order-1 lg:order-none lg:row-span-1 col-text-mm">
                <p className="eyebrow-mm mb-3 lg:mb-6">
                  <span className="text-white/70">16 Ingredients. One Formula. </span>
                  <span className="text-[var(--color-cyan)]">Zero BS.</span>
                </p>
                <h1 className="h1-mm mb-1 lg:mb-4">
                  <span className="text-white">Fix Your Cortisol Brain With This </span>
                  <span className="text-[var(--color-cyan)]">Natural Upgrade</span>
                </h1>
                {/* Body copy — hidden on mobile, shown on desktop below headline */}
                <div className="hidden lg:block">
                  <p className="text-white font-bold text-[22px] leading-[1.3] mb-5">Your brain&apos;s not broken &ndash; your cortisol&apos;s just running the show.</p>
                  <p className="text-[#B0B0B0] text-[18px] leading-[1.5] mb-5">The stress hormone that spikes whenever modern life hits you is the same one depleting the precursors your brain runs on and never letting go.</p>
                  <p className="text-[#B0B0B0] text-[18px] leading-[1.5] mb-5">It&apos;s why the focus window keeps shrinking, the second coffee stops working, and the operator in the mirror feels slower than the effort you&apos;re putting in.</p>
                  <p className="text-[var(--color-cyan)] font-bold text-[18px] leading-[1.3]">Restore the chemistry. Replenish the precursors.<br />Do that and the brain comes back, while focus skyrockets.</p>
                </div>
              </FadeUp>

              {/* Image (order 2 on mobile — between headline and body) */}
              <FadeUp delay={0.15} className="order-2 lg:order-none img-bleed lg:[all:unset] lg:flex">
                <img src="/assets/gm-hero-cortisol-transformation-new.png" alt="High-cortisol brain on the left, Genius Mind product bottle in the centre, low-cortisol brain on the right" width={600} height={600} loading="eager" className="w-full rounded-xl object-cover" style={{ maxWidth: 'none', maxHeight: 'none' }} />
              </FadeUp>

              {/* Body copy — mobile only (order 3), hidden on desktop */}
              <div className="order-3 lg:hidden">
                <p className="text-white font-bold text-[18px] leading-[1.3] mb-4">Your brain&apos;s not broken &ndash; your cortisol&apos;s just running the show.</p>
                <p className="text-[#B0B0B0] text-[16px] leading-[1.5] mb-4">The stress hormone that spikes whenever modern life hits you is the same one depleting the precursors your brain runs on and never letting go.</p>
                <p className="text-[#B0B0B0] text-[16px] leading-[1.5] mb-4">It&apos;s why the focus window keeps shrinking, the second coffee stops working, and the operator in the mirror feels slower than the effort you&apos;re putting in.</p>
                <p className="text-[var(--color-cyan)] font-bold text-[16px] leading-[1.3]">Restore the chemistry. Replenish the precursors.<br />Do that and the brain comes back, while focus skyrockets.</p>
              </div>
            </div>
          </div>
        </div>

        {/* §02 SYMPTOMS */}
        <div className="sec-pad !pt-0">
        <div className="sec-container">
          <div className="flex flex-col lg:grid grid-mm lg:items-stretch">
            {/* Eyebrow + headline (mobile order 1) */}
            <div className="order-1 lg:hidden">
              <p className="eyebrow-mm mb-3 text-center leading-snug">
                <span className="text-[#FFD700]">&#9888;&#65039;</span>{" "}
                <span className="text-[var(--color-coral)]">The Truth About Cognitive Decline</span>
              </p>
              <h2 className="h2-mm mb-4 text-white text-center">It&apos;s Not Just Burnout</h2>
            </div>

            {/* Image (mobile order 2, desktop left column) */}
            <FadeUp className="flex order-2 lg:order-none img-bleed lg:[all:unset] lg:flex">
              <video src="/assets/section-2-operator-at-desk.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="High-output operator at desk, exhausted late at night" className="w-full rounded-xl object-cover" />
            </FadeUp>

            {/* Copy (mobile order 3, desktop right column) */}
            <FadeUp delay={0.1} className="flex flex-col justify-center order-3 lg:order-none col-text-mm">
              {/* Desktop-only eyebrow+headline */}
              <div className="hidden lg:block">
                <p className="eyebrow-mm mb-3 text-left leading-snug">
                  <span className="text-[#FFD700]">&#9888;&#65039;</span>{" "}
                  <span className="text-[var(--color-coral)]">The Truth About Cognitive Decline</span>
                </p>
                <h2 className="h2-mm mb-6 text-white text-left">It&apos;s Not Just Burnout</h2>
              </div>
              <p className="text-white font-bold body-mm mb-8">Many operators 30+ are quietly experiencing...</p>
              <div className="space-y-2 mb-4">
                {SYMPTOMS_ALERT.map((s) => (
                  <div key={s.bold} className="warn-box flex items-start gap-2">
                    <span className="text-sm mt-px shrink-0">&#9888;&#65039;</span>
                    <p className="leading-snug"><strong className="text-white">{s.bold}</strong> <span className="text-white/60">{s.rest}</span></p>
                  </div>
                ))}
              </div>
              <p className="body-mm text-white/80 mb-6">&#128073; This isn&apos;t aging &ndash; this is what chronic cortisol does to the chemistry your brain runs on.</p>
              <p className="text-[var(--color-cyan)] font-[800] text-[16px] md:text-[18px] leading-[1.3]">Your cortisol controls your chemistry.<br />Fix the chemistry, get the brain back.</p>
            </FadeUp>
          </div>
        </div>
        </div>
      </div>

      {/* ═══ §03 WHY EVERYTHING FAILED — WHITE, CENTRED ═══ */}
      <section className="bg-white sec-pad-tight">
        <div className="sec-container">
          <FadeUp>
            <h2 className="h2-mm text-black text-center mb-10">Why Everything You&apos;ve Tried Made Logical Sense &ndash; And Still Didn&apos;t Work</h2>
          </FadeUp>

          {/* Desktop: text left, image right */}
          <div className="desktop-only grid-mm">
            <FadeUp className="col-text-mm">
              <p className="text-black font-bold body-mm mb-5">You didn&apos;t fail. The strategy failed you.</p>
              <p className="text-black/70 body-mm mb-6">Every nootropic stack, every focus app, every &ldquo;discipline&rdquo; hack you&apos;ve tried attacked the symptom. None of them went after the cause.</p>
              <p className="text-black font-bold body-mm mb-5">The cause is cortisol.</p>
              <p className="text-black/50 body-mm mb-5">And the reason is simple:</p>
              <p className="breakout-line text-[var(--color-cyan)]">Your Brain Was Built for a World That No Longer Exists.</p>
            </FadeUp>
            <FadeUp>
              <img src="/assets/gm-illustration-1.png" alt="Operator collapsed on floor of home office" width={380} height={340} loading="lazy" className="rounded-xl" />
            </FadeUp>
          </div>
          {/* Mobile: text wraps around floated image */}
          <div className="mobile-only">
            <FadeUp>
              <p className="text-black font-bold body-mm mb-4">You didn&apos;t fail. The strategy failed you.</p>
              <div>
                <img src="/assets/gm-illustration-1.png" alt="Operator collapsed on floor of home office" width={150} height={150} loading="lazy" className="float-right ml-4 mb-2 w-[150px] h-auto rounded-lg" />
                <p className="text-black/70 body-mm mb-4">Every nootropic stack, every focus app, every &ldquo;discipline&rdquo; hack you&apos;ve tried attacked the symptom. None of them went after the cause.</p>
                <p className="text-black font-bold body-mm mb-2">The cause is cortisol.</p>
                <p className="text-black/50 body-mm mb-1">And the reason is simple:</p>
              </div>
              <div style={{ clear: 'both' }} />
              <p className="breakout-line text-[var(--color-cyan)] mt-2 mb-2">Your Brain Was Built for a World That No Longer Exists.</p>
            </FadeUp>
          </div>

          {/* §04 STRESS WAS SHORT — continues in same section */}
          {/* Desktop: image left, text right */}
          <div className="desktop-only grid-mm mb-10">
            <FadeUp>
              <img src="/assets/gm-illustration-2.png" alt="Operator slumped on couch" width={380} height={340} loading="lazy" className="rounded-xl" />
            </FadeUp>
            <FadeUp delay={0.1} className="col-text-mm">
              <p className="text-black body-mm mb-4">For most of human history, stress was short. A threat appeared, cortisol spiked to get you through it, the threat passed, cortisol dropped. Clean cycle. Worked perfectly.</p>
              <p className="text-black font-bold body-mm mb-4">But now the threat never passes.</p>
              <p className="text-black body-mm mb-4">Investor updates. Cash-flow projections. The Slack ping at 10pm. The decision you&apos;ve been putting off. Another notification. Then another.</p>
              <p className="text-black font-bold body-mm">None of it is life or death. But your nervous system can&apos;t tell the difference...</p>
            </FadeUp>
          </div>
          {/* Mobile: text then small inline image next to closing line */}
          <div className="mobile-only mb-10">
            <FadeUp>
              <p className="text-black body-mm mb-4">For most of human history, stress was short. A threat appeared, cortisol spiked to get you through it, the threat passed, cortisol dropped. Clean cycle. Worked perfectly.</p>
              <p className="text-black font-bold body-mm mb-4">But now the threat never passes.</p>
              <p className="text-black body-mm mb-4">Investor updates. Cash-flow projections. The Slack ping at 10pm. The decision you&apos;ve been putting off. Another notification. Then another.</p>
              <div className="flex items-end gap-4">
                <p className="text-black font-bold body-mm flex-1">None of it is life or death. But your nervous system can&apos;t tell the difference...</p>
                <img src="/assets/gm-illustration-2.png" alt="Operator slumped on couch" width={120} height={120} loading="lazy" className="w-[120px] h-auto shrink-0 rounded-lg" />
              </div>
            </FadeUp>
          </div>

          <FadeUp>
            <p className="text-black body-mm mb-8">And the harder you push your brain without addressing cortisol first, the more you&apos;re working against yourself:</p>
          </FadeUp>
          <Stagger className="grid md:grid-cols-3 gap-6">
            {STRESS_BOXES_V2.map((b) => (
              <motion.div key={b.headline} variants={cF} className="bg-[#E8F5F8] border border-[rgba(0,166,210,0.25)] rounded-lg p-6">
                <p className="text-black body-mm leading-relaxed"><strong><u>{b.headline}</u></strong>{b.body}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══ §05 OPERATORS WHO CRACK THE CODE — WHITE ═══ */}
      <section className="bg-white sec-pad-tight">
        <div className="sec-container">
          {/* Desktop: text left, image right */}
          <div className="desktop-only grid-mm" style={{ alignItems: 'center' }}>
            <FadeUp className="col-text-mm">
              <p className="text-black body-mm mb-6">The operators who crack the code are the ones who fix the chemistry first.</p>
              <p className="text-black font-[800] text-2xl md:text-[26px] leading-tight mb-5">Restore the chemistry. Get the brain back.</p>
              <p className="text-black body-mm">That&apos;s exactly what Genius Mind is built to do.</p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <img src="/assets/gm-operator-compare2.png" alt="Before and after comparison of operator – tired vs restored" width={380} height={340} loading="lazy" className="rounded-xl" />
            </FadeUp>
          </div>
          {/* Mobile: image first, then text */}
          <div className="mobile-only">
            <FadeUp>
              <img src="/assets/gm-operator-compare2.png" alt="Before and after comparison of operator – tired vs restored" width={380} height={280} loading="lazy" className="rounded-xl mx-auto mb-6" style={{ maxWidth: '90%' }} />
              <p className="text-black body-mm mb-6">The operators who crack the code are the ones who fix the chemistry first.</p>
              <p className="text-black font-[800] text-2xl leading-tight mb-5">Restore the chemistry. Get the brain back.</p>
              <p className="text-black body-mm">That&apos;s exactly what Genius Mind is built to do.</p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ §06 SAY NO TO CAFFEINE — DARK ═══ */}
      <section className="sec-dark sec-pad">
        <div className="sec-container">
          {/* Desktop: text+boxes LEFT, video+caption RIGHT */}
          <div className="desktop-only grid-mm" style={{ alignItems: 'start' }}>
            <div>
              <p className="eyebrow-mm mb-4 text-left">
                <span className="text-[var(--color-coral)]">&#10067;</span>{" "}
                <span className="text-white">And What About Other Options?</span>
              </p>
              <h2 className="h2-mm mb-6 text-white text-left">
                Say No to Caffeine Loops &amp;{" "}
                <span className="inline-block bg-[#00A6D2] text-white px-[0.2em] py-[0.05em] leading-[0.95]">Underdosed</span>{" "}
                Nootropic Stacks
              </h2>
              <h3 className="h3-mm text-white font-[800] mb-3">Caffeine &amp; Stimulant Stacks:</h3>
              <div className="space-y-1.5 mb-6">
                {CAFFEINE_FAILS.map((item) => (
                  <div key={item} className="border border-[#E8283B] rounded-[4px] py-[7px] px-[9px] flex items-start gap-2">
                    <span className="text-xs mt-px shrink-0">&#10060;</span>
                    <p className="text-[15px] leading-snug"><strong className="text-white">{item.split("\u2014")[0]}</strong>{item.includes("\u2014") && <span className="text-[#B0B0B0]"> &ndash; {item.split("\u2014").slice(1).join("\u2014")}</span>}</p>
                  </div>
                ))}
              </div>
              <h3 className="h3-mm text-white font-[800] mb-3">Underdosed Nootropic Stacks:</h3>
              <div className="space-y-1.5">
                {NOOTROPIC_FAILS.map((item) => (
                  <div key={item} className="border border-[#E8283B] rounded-[4px] py-[7px] px-[9px] flex items-start gap-2">
                    <span className="text-xs mt-px shrink-0">&#10060;</span>
                    <p className="text-[15px] leading-snug"><strong className="text-white">{item.split("\u2014")[0]}</strong>{item.includes("\u2014") && <span className="text-[#B0B0B0]"> &ndash; {item.split("\u2014").slice(1).join("\u2014")}</span>}</p>
                  </div>
                ))}
              </div>
            </div>
            <FadeUp delay={0.1}>
              <video src="/assets/section-6-coffee-loop-operator.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="Operator reaching for a fourth coffee, defeated" className="w-full rounded-xl object-cover mb-4" />
              <p className="text-white body-mm text-sm">&#128073; You deserve better than frying your nervous system with caffeine or wasting money on underdosed stacks.</p>
            </FadeUp>
          </div>

          {/* Mobile: headline → video → boxes */}
          <div className="mobile-only">
            <p className="eyebrow-mm mb-4 text-center">
              <span className="text-[var(--color-coral)]">&#10067;</span>{" "}
              <span className="text-white">And What About Other Options?</span>
            </p>
            <h2 className="h2-mm mb-6 text-white text-center">
              Say No to Caffeine Loops &amp;{" "}
              <span className="inline-block bg-[#00A6D2] text-white px-[0.2em] py-[0.05em] leading-[0.95]">Underdosed</span>{" "}
              Nootropic Stacks
            </h2>
            <div className="img-bleed mb-6">
              <video src="/assets/section-6-coffee-loop-operator.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="Operator reaching for a fourth coffee, defeated" className="w-full object-cover" />
            </div>
            <h3 className="h3-mm text-white font-[800] mb-3">Caffeine &amp; Stimulant Stacks:</h3>
            <div className="space-y-1.5 mb-6">
              {CAFFEINE_FAILS.map((item) => (
                <div key={item} className="border border-[#E8283B] rounded-[4px] py-[7px] px-[9px] flex items-start gap-2">
                  <span className="text-xs mt-px shrink-0">&#10060;</span>
                  <p className="text-[15px] leading-snug"><strong className="text-white">{item.split("\u2014")[0]}</strong>{item.includes("\u2014") && <span className="text-[#B0B0B0]"> &ndash; {item.split("\u2014").slice(1).join("\u2014")}</span>}</p>
                </div>
              ))}
            </div>
            <h3 className="h3-mm text-white font-[800] mb-3">Underdosed Nootropic Stacks:</h3>
            <div className="space-y-1.5 mb-6">
              {NOOTROPIC_FAILS.map((item) => (
                <div key={item} className="border border-[#E8283B] rounded-[4px] py-[7px] px-[9px] flex items-start gap-2">
                  <span className="text-xs mt-px shrink-0">&#10060;</span>
                  <p className="text-[15px] leading-snug"><strong className="text-white">{item.split("\u2014")[0]}</strong>{item.includes("\u2014") && <span className="text-[#B0B0B0]"> &ndash; {item.split("\u2014").slice(1).join("\u2014")}</span>}</p>
                </div>
              ))}
            </div>
            <p className="text-white body-mm text-sm text-center px-4">&#128073; You deserve better than frying your nervous system with caffeine or wasting money on underdosed stacks.</p>
          </div>
        </div>
      </section>

      {/* ═══ §07 PRODUCT REVEAL — DARK, MARS MEN STYLE ═══ */}
      <section id="mechanism" className="sec-dark overflow-hidden" style={{ background: '#000' }}>
        {/* Text block */}
        <div className="max-w-[1200px] mx-auto px-4 text-center pt-16 md:pt-20 pb-0">
          <FadeUp>
            <p className="label-mono text-[var(--color-cyan)] text-[14px] mb-4">Make The Smart Choice</p>
            <h2 className={`text-[clamp(32px,5vw,52px)] font-[800] leading-[1.05] mb-5 text-white`}>Natural Cognitive Support<br />+ Real Output</h2>
            <p className="text-white text-[17px] leading-[1.5] max-w-[700px] mx-auto mb-3">&#128073; Genius Mind isn&apos;t another nootropic stack &ndash; it&apos;s a complete cortisol-aware formula that works on FOUR levels: <u>clear the chemistry, restore the precursors, sustain the focus, and protect the output.</u></p>
            <p className="text-white/70 italic text-[14px] mb-0">No needles, prescriptions, or dependency.</p>
          </FadeUp>
        </div>

        {/* Image as CSS background — benefit icons flow naturally on top */}
        <div className="relative bg-black bg-[url('/assets/gm-hand-product.png')] bg-[length:120%_auto] md:bg-[length:60%_auto] bg-[position:center_top] bg-no-repeat pt-[75vw] md:pt-[30vw]">
          {/* Gradient — lighter on desktop so image stays vibrant */}
          <div className="absolute inset-0 bg-gradient-to-t from-black from-25% via-black/50 via-50% to-transparent md:from-black md:from-20% md:via-black/30 md:via-45% md:to-transparent pointer-events-none" />
          {/* Benefit grid in normal flow */}
          <div className="relative z-[2] max-w-[900px] mx-auto px-6 pb-14 md:pb-20">
            <Stagger className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 md:gap-x-12 md:gap-y-10">
              {OUTCOME_ICONS.map((o) => (
                <motion.div key={o.title} variants={cF} className="text-center">
                  <div className="flex justify-center mb-2">
                    <AnimatedIcon icon={o.icon} variants={o.variants} />
                  </div>
                  <h3 className="text-white font-[800] text-[14px] md:text-[16px] tracking-[0.05em] uppercase mb-1">{o.title}</h3>
                  <p className="text-white/80 text-[12px] md:text-[14px] leading-[1.4]">{o.desc}</p>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ═══ §6 INGREDIENTS — DARK (photo-backed) ═══ */}
      <section id="formula" className="sec-dark py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <FadeUp>
            <p className="font-mono text-[var(--color-cyan)] tracking-[0.25em] uppercase text-[13px] font-semibold mb-4">Ingredients</p>
            <h2 className={`text-[clamp(32px,6vw,56px)] font-[900] leading-[1.0] mb-8 text-white`}>Fuel Your Body the<br className="hidden md:block" /> Clean Way</h2>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mb-10">
              {["No proprietary\nblends", "No fillers", "No synthetic\nhormones", "No BS", "No cheap\npowders"].map((item) => (
                <span key={item} className="flex flex-col items-center gap-2">
                  <span className="text-red-600 text-3xl md:text-4xl font-[900] leading-none">✕</span>
                  <span className="text-white/90 text-[13px] md:text-[14px] font-semibold tracking-wide whitespace-pre-line text-center">{item}</span>
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
                  <h4 className="text-white font-[900] text-lg md:text-xl uppercase tracking-wide mb-0.5">{ing.name}</h4>
                  <p className="text-white/85 text-[12px] md:text-[13px] leading-snug font-medium">{ing.desc}</p>
                </div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Trust badges */}
      <div className="bg-[var(--color-dark-primary)] py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-x-10 md:gap-x-16 gap-y-6 text-center">
          {TRUST.map((b) => (
            <div key={b.label} className="flex flex-col items-center gap-2 min-w-[80px]">
              <span className="text-white opacity-80">{b.icon}</span>
              <p className="font-mono text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-white whitespace-pre-line leading-tight">{b.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ §8 VIDEO TESTIMONIALS — DARK (Mars Men style) ═══ */}
      <section className="sec-dark py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <FadeUp>
            <p className="font-mono text-[var(--color-cyan)] tracking-[0.25em] uppercase text-[13px] font-semibold mb-4">Real Results</p>
            <h2 className="text-[clamp(32px,6vw,56px)] font-[900] leading-[1.0] mb-10 text-white">What Operators Are Saying</h2>
          </FadeUp>
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {VIDS.map((v) => (
              <motion.div key={v.label} variants={cF} className="aspect-[9/16] relative rounded-2xl overflow-hidden bg-[var(--color-dark-tertiary)] group cursor-pointer">
                {/* Placeholder background */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a2030] to-[#0d1117]" />
                {/* Label tag */}
                <div className="absolute top-3 left-3 z-[2]">
                  <span className="inline-block bg-[var(--color-cyan)] text-white font-mono font-bold text-[10px] md:text-[11px] tracking-[0.1em] uppercase px-3 py-1.5 rounded-sm">{v.label}</span>
                </div>
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center z-[2]">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                    <svg viewBox="0 0 24 24" fill="var(--color-dark-primary)" className="w-6 h-6 md:w-7 md:h-7 ml-1"><polygon points="5,3 19,12 5,21" /></svg>
                  </div>
                </div>
                {/* Bottom caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-[2]">
                  <p className="text-white text-[11px] md:text-xs font-bold uppercase tracking-wide">{v.caption}</p>
                </div>
                {/* Bottom controls */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center z-[3]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5 opacity-70"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.08"/></svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5 opacity-70"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                </div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══ §8b PRODUCT CTA + REVIEW + FEATURED IN ═══ */}
      <section className="sec-dark py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">

          {/* Mobile: heading → image → CTA → reviews */}
          <div className="md:hidden text-center">
            <FadeUp>
              <h2 className="text-[clamp(28px,8vw,40px)] font-[900] leading-[1.05] text-white mb-6">Try Genius Mind Risk-Free</h2>
            </FadeUp>
            <FadeUp>
              <img src="/assets/gm-static-stack-v2.png" alt="Genius Mind product stack" className="w-full h-auto mb-6" />
            </FadeUp>
            <FadeUp>
              <PrimaryCTA block>SHOP NOW</PrimaryCTA>
              <MiniReviewScroller />
            </FadeUp>
          </div>

          {/* Desktop: image left, CTA + reviews right */}
          <div className="hidden md:grid md:grid-cols-2 gap-10 items-center">
            <FadeUp>
              <img src="/assets/gm-static-stack-v2.png" alt="Genius Mind product stack" className="w-full h-auto max-w-[500px] mx-auto" />
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2 className="text-[clamp(32px,4vw,48px)] font-[900] leading-[1.05] text-white mb-3">Try Genius Mind Risk-Free</h2>
              <p className="text-white/60 text-sm mb-6">90-day money back guarantee. No questions asked.</p>
              <PrimaryCTA block>SHOP NOW</PrimaryCTA>
              <MiniReviewScroller />
            </FadeUp>
          </div>

          {/* Featured In */}
          <div className="mt-16 text-center">
            <p className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 mb-6">Featured In</p>
            <div className="flex flex-wrap justify-center items-center gap-x-10 md:gap-x-14 gap-y-4">
              <img src="https://justfloow.com/cdn/shop/files/Forbes_logo_1_medium.svg?v=1729155439" alt="Forbes" className="h-6 md:h-7 opacity-50 brightness-200" />
              <img src="https://justfloow.com/cdn/shop/files/BBC_Logo_2021_1_medium.svg?v=1729155438" alt="BBC" className="h-6 md:h-7 opacity-50 brightness-200" />
              <img src="https://justfloow.com/cdn/shop/files/Wired_logo_1_medium.svg?v=1729155439" alt="Wired" className="h-6 md:h-7 opacity-50 brightness-200" />
              <img src="https://justfloow.com/cdn/shop/files/Fast_Company_logo_1_medium.svg?v=1729155439" alt="Fast Company" className="h-6 md:h-7 opacity-50 brightness-200" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ §9 COMPARISON TABLE — DARK (Mars Men style) ═══ */}
      <section className="sec-dark pt-4 md:pt-8 pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto px-4">
          <FadeUp>
            <p className={`label-mono text-[11px] tracking-[0.2em] text-center mb-4 ${capD}`}>GENIUS MIND VS CAFFEINE STACKS VS GENERIC NOOTROPICS</p>
            <h2 className={`text-[clamp(32px,5vw,52px)] font-[800] leading-[1.05] text-center mb-3 ${h2D}`}>How Genius Mind Compares</h2>
            <p className={`${bodyD} text-center mb-12`}>Cognitive infrastructure, not a stimulant hit.</p>
          </FadeUp>
          <FadeUp>
            {/* Desktop table */}
            <div className="hidden md:block">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-white/20">
                    <th className="py-5 px-6 text-left" style={{ width: "44%" }}></th>
                    <th className="py-3 px-4 text-center bg-[rgba(0,166,210,0.12)]" style={{ width: "18%" }}>
                      <img src="/assets/gm-bottle-cutout.png" alt="Genius Mind" width={90} height={120} className="mx-auto object-contain" style={{ maxHeight: 120 }} />
                    </th>
                    <th className={`py-5 px-4 text-center font-[800] text-base ${h2D}`} style={{ width: "19%" }}>Caffeine Stacks</th>
                    <th className={`py-5 px-4 text-center font-[800] text-base ${h2D}`} style={{ width: "19%" }}>Generic Nootropics</th>
                  </tr>
                </thead>
                <tbody>
                  {COMP.map((r) => (
                    <tr key={r.label} className="border-b border-white/15">
                      <td className={`py-5 px-6 font-[800] text-[15px] tracking-wide ${h2D}`}>{r.label.toUpperCase()}</td>
                      <td className="py-5 px-4 text-center bg-[rgba(0,166,210,0.06)]"><CompIcon type="check" /></td>
                      <td className="py-5 px-4 text-center"><CompIcon type={r.caff === "x" ? "x" : "q"} /></td>
                      <td className="py-5 px-4 text-center"><CompIcon type={r.generic === "x" ? "x" : "q"} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile table — no scroll, fits in viewport */}
            <div className="md:hidden">
              <table className="w-full border-collapse table-fixed">
                <thead>
                  <tr className="border-b-2 border-white/20">
                    <th className="py-3 px-2 text-left" style={{ width: "40%" }}></th>
                    <th className="py-2 px-1 text-center bg-[rgba(0,166,210,0.12)]" style={{ width: "20%" }}>
                      <img src="/assets/gm-bottle-cutout.png" alt="Genius Mind" width={56} height={75} className="mx-auto object-contain" style={{ maxHeight: 75 }} />
                    </th>
                    <th className={`py-3 px-1 text-center font-[800] text-[11px] leading-tight ${h2D}`} style={{ width: "20%" }}>Caffeine Stacks</th>
                    <th className={`py-3 px-1 text-center font-[800] text-[11px] leading-tight ${h2D}`} style={{ width: "20%" }}>Generic Nootropics</th>
                  </tr>
                </thead>
                <tbody>
                  {COMP.map((r) => (
                    <tr key={r.label} className="border-b border-white/15">
                      <td className={`py-4 px-2 font-[800] text-[11px] leading-snug tracking-wide ${h2D}`}>{r.label.toUpperCase()}</td>
                      <td className="py-4 px-1 text-center bg-[rgba(0,166,210,0.06)]"><CompIcon type="check" size="sm" /></td>
                      <td className="py-4 px-1 text-center"><CompIcon type={r.caff === "x" ? "x" : "q"} size="sm" /></td>
                      <td className="py-4 px-1 text-center"><CompIcon type={r.generic === "x" ? "x" : "q"} size="sm" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className={`${h2D} text-[clamp(16px,2.5vw,20px)] font-[700] leading-relaxed text-center mt-10 max-w-2xl mx-auto`}>
              Bottom Line: Genius Mind delivers real cognitive support through clinically dosed ingredients &ndash; without the crashes, jitters, or underdosed proprietary blend nonsense.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ §10 THE OFFER — LIGHT (PDP style) ═══ */}
      <OfferSection />

      {/* ═══ §11 COMBINED TABS — DARK (Mars Men style) ═══ */}
      <section className="sec-dark py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-4">
          <FadeUp>
            <CombinedTabbedSection />
          </FadeUp>
        </div>
      </section>

      {/* ═══ §11b INGREDIENTS GRID (repeat) — DARK ═══ */}
      <section className="sec-dark pt-4 md:pt-6 pb-14 md:pb-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <FadeUp>
            <p className="font-mono text-[var(--color-cyan)] tracking-[0.25em] uppercase text-[13px] font-semibold mb-4">16 Clinically Dosed Ingredients</p>
            <h2 className={`text-[clamp(28px,5vw,48px)] font-[900] leading-[1.0] mb-8 text-white`}>What&rsquo;s Inside Genius Mind</h2>
          </FadeUp>
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-3" s={0.04}>
            {INGS.map((ing) => (
              <motion.div key={ing.name} variants={cF} className="ing-card" style={{ backgroundImage: `url(/assets/${ing.img})` }}>
                <span className="absolute top-3 right-3 z-[2] bg-white/90 text-[var(--color-ink-primary)] font-mono font-semibold text-[10px] px-2 py-1 rounded">{ing.dose}</span>
                <div className="ing-inner !justify-end">
                  <h4 className="text-white font-[900] text-lg md:text-xl uppercase tracking-wide mb-0.5">{ing.name}</h4>
                  <p className="text-white/85 text-[12px] md:text-[13px] leading-snug font-medium">{ing.desc}</p>
                </div>
              </motion.div>
            ))}
          </Stagger>
          <FadeUp>
            <p className={`${bodyD} text-[15px] md:text-[17px] leading-relaxed max-w-3xl mx-auto mt-8 md:mt-10`}>
              Genius Mind is a unique blend of natural, clinically-studied ingredients designed to support sustained cognitive performance. Most nootropic supplements don&rsquo;t contain proper dosages. We use clinical doses of each ingredient to deliver real, measurable results.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ TRUSTPILOT REVIEWS ═══ */}
      <TrustpilotReviewCarousel />

      {/* ═══ §10 MEET OUR NUTRITIONIST — LIGHT ═══ */}
      <section className="sec-light py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeUp>
            <h2 className={`text-[clamp(32px,5vw,52px)] font-[900] leading-[1.05] mb-12 ${h2L}`}>Meet Our Nutritionist</h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            {/* Circular headshot */}
            <div className="flex justify-center mb-6">
              <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden border-[5px] border-[rgba(0,166,210,0.15)] shadow-lg">
                <img src="/assets/shona-wilkinson.png" alt="Shona Wilkinson, Registered Nutritionist" width={220} height={220} loading="lazy" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Name */}
            <h3 className={`${h2L} font-[900] text-[28px] md:text-[36px] mb-2`}>Shona Wilkinson, RNutr</h3>

            {/* Subtitle */}
            <p className="font-mono text-[var(--color-cyan)] tracking-[0.15em] uppercase text-[13px] md:text-[14px] font-bold mb-8">Lead Nutritionist at JustFloow</p>

            {/* Bio */}
            <p className={`${bodyL} text-[16px] md:text-[18px] leading-relaxed max-w-2xl mx-auto mb-0`}>
              Shona is a registered nutritionist with over 15 years of experience in clinical nutrition and supplement formulation. She has worked with elite athletes, executives, and health brands to develop evidence-based solutions for cognitive performance.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ §13 GUARANTEE — LIGHT with subtle background ═══ */}
      <section className="sec-light-alt py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <FadeUp>
            <div className="relative overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.06)] p-8 md:p-14 shadow-md" style={{ background: "linear-gradient(135deg, #0d1117 0%, #141c28 40%, #1a2436 100%)" }}>
              {/* Decorative elements */}
              <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-[rgba(245,166,35,0.06)]" />
              <div className="absolute -left-20 -bottom-20 w-56 h-56 rounded-full bg-[rgba(0,166,210,0.05)]" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(245,166,35,0.3)] to-transparent" />

              <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {/* Gold guarantee badge */}
                <div className="shrink-0 w-[150px] h-[150px] md:w-[170px] md:h-[170px] rounded-full border-[3px] border-[#f5a623] flex items-center justify-center bg-gradient-to-br from-[rgba(245,166,35,0.12)] to-[rgba(245,166,35,0.03)] shadow-[0_0_40px_rgba(245,166,35,0.15)]">
                  <div className="text-center px-2">
                    <div className="text-[#f5a623] text-3xl mb-1">&#x1F3C6;</div>
                    <div className="font-mono text-white text-[13px] md:text-[14px] leading-snug font-[800] tracking-wide uppercase">90-Day<br />Money Back</div>
                    <div className="text-[#f5a623] font-mono text-[10px] md:text-[11px] mt-1 font-bold uppercase tracking-[0.15em]">Guarantee</div>
                  </div>
                </div>

                <div>
                  <h2 className="text-[clamp(24px,4vw,36px)] font-[900] mb-3 leading-tight text-white">Feel a Massive Difference in 90 Days <span className="text-[var(--color-cyan)]">Or Your Money Back</span></h2>
                  <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed mb-6">We make sure every customer actually gets results or we refund you 100% of your investment. We&rsquo;re so confident you&rsquo;ll feel the difference with Genius Mind that we bear all the risk.</p>
                  <PrimaryCTA>TRY IT NOW</PrimaryCTA>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ §14 FAQ — LIGHT ═══ */}
      <section className="sec-light py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <FadeUp>
            <h2 className={`text-[clamp(32px,5vw,52px)] font-[900] leading-[1.05] text-center mb-10 ${h2L}`}>Frequently Asked Questions</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <FaqAccordion />
          </FadeUp>
        </div>
      </section>

      {/* Mobile bottom spacer — prevents sticky CTA from hiding last content */}
      <div className="mobile-cta-spacer" />

      {/* ═══ FOOTER — DARK ═══ */}
      <footer className="sec-dark py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-white font-black text-lg tracking-[0.12em] mb-2">GENIUS MIND</p>
          <p className={`${capD} text-xs mb-4 font-serif italic`}>For Those Who Demand More.</p>
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
          Get Genius Mind &ndash; From &pound;20/bottle <ArrowRight size={16} strokeWidth={2.5} />
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
  { headline: "More coffee spikes cortisol further.", body: " Caffeine triggers the stress response \u2014 the same system that\u2019s already overloaded." },
  { headline: "Pushing harder adds fuel to the fire.", body: " Grinding through elevated cortisol means worse output the following day, not better." },
  { headline: "Stimulant nootropics trigger cortisol.", body: " You feel sharp for an hour. Then the chemistry your brain needs is depleted further." },
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
  { icon: <Factory size={28} />, label: "GMP Certified" },
  { icon: <FlaskConical size={28} />, label: "Third Party\nTested" },
  { icon: <ShieldCheck size={28} />, label: "Hormone-\nFree" },
  { icon: <span className="text-2xl">🇬🇧</span>, label: "Made in UK" },
  { icon: <Leaf size={28} />, label: "Vegan" },
  { icon: <Package size={28} />, label: "Non-GMO" },
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
const TP_REVIEWS = [
  { name: "Mark D.", time: "2 days ago", title: "Fog has completely lifted", body: "I run a small business and the mental demands are relentless. Within a week of taking Genius Mind, the brain fog I\u2019d been battling for months completely lifted. I\u2019m sharper in meetings, quicker with decisions, and I actually feel like myself again.", reply: "Thanks so much for sharing this, Mark. Running a business takes serious mental stamina and we\u2019re glad Genius Mind is helping you stay sharp when it matters most.", replyTime: "1 day ago" },
  { name: "Sarah K.", time: "4 days ago", title: "The 3pm slump is gone", body: "I used to hit a wall every afternoon and reach for another coffee. Since starting Genius Mind, my energy and focus stay consistent throughout the entire day. The quality of my decisions in the afternoon is noticeably better. This stuff actually works.", reply: "Love hearing this, Sarah! That afternoon consistency is exactly what the formula is designed for. No crashes, no jitters, just sustained clarity.", replyTime: "3 days ago" },
  { name: "James T.", time: "1 week ago", title: "First thing that actually worked", body: "I\u2019ve tried AG1, excessive caffeine, all sorts of nootropic stacks. Nothing ever made a real difference until Genius Mind. It\u2019s subtle but unmistakable \u2014 my recall is better, I can focus for longer, and I don\u2019t feel wired or anxious. Just clean, steady mental performance.", reply: "James, we hear this a lot from people who\u2019ve tried everything else. The difference is in the research-backed dosing and the quality of ingredients. Glad you\u2019re feeling the benefits!", replyTime: "6 days ago" },
  { name: "Lucy W.", time: "1 week ago", title: "Noticed a difference within days", body: "I was sceptical but gave it a shot. By day three I noticed my energy levels were more stable and I wasn\u2019t reaching for sugar to get through the afternoon. A month in and I genuinely feel like a sharper version of myself. Really impressed.", reply: "Thanks Lucy! We love hearing from the initial sceptics turned believers. The early results you noticed tend to compound over time, so it only gets better from here.", replyTime: "6 days ago" },
  { name: "Tom R.", time: "2 weeks ago", title: "Best nootropic I've tried", body: "I\u2019ve been through a fair few brain supplements over the years and most of them are overhyped nonsense. Genius Mind is the first one where I\u2019ve noticed a sustained, genuine difference. My focus is sharper, my memory feels more reliable, and I just feel more switched on day to day." },
  { name: "Emma H.", time: "2 weeks ago", title: "Great product, great company", body: "Ordered the 90-day supply and it arrived quickly with lovely packaging. The product itself has been brilliant \u2014 I feel more focused at work and my mood has genuinely improved. Customer service was also really helpful when I had a question. Will definitely be reordering." },
  { name: "Dan P.", time: "3 weeks ago", title: "Exactly what I needed", body: "Running two businesses meant I was mentally drained by midday. A friend recommended Genius Mind and I\u2019m so glad I listened. I can work deeper for longer and I\u2019m making better decisions under pressure. It\u2019s become a non-negotiable part of my morning routine." },
  { name: "Rachel M.", time: "3 weeks ago", title: "Impressed with the transparency", body: "What sold me on Genius Mind was the transparency around ingredients and dosing. No proprietary blends, no hidden fillers. And the results have matched the claims \u2014 better focus, more mental clarity, and I sleep well too. It\u2019s refreshing to find a supplement company that actually delivers." },
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
