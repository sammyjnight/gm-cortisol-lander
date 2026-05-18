"use client";

import { useEffect, useRef, useState } from "react";

/* ───────── constants ───────── */
const SHOP_URL = "https://justfloow.com/products/genius-mind";

/* ───────── countdown helper ───────── */
function getCountdown() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const diff = Math.max(0, end.getTime() - now.getTime());
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return {
    h: String(h).padStart(2, "0"),
    m: String(m).padStart(2, "0"),
    s: String(s).padStart(2, "0"),
  };
}

/* ───────── scroll reveal hook ───────── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`animate-in ${className}`}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function CognitiveLander() {
  const [countdown, setCountdown] = useState(getCountdown());
  const [stickyVisible, setStickyVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeWeek, setActiveWeek] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ══════════════ HEADER ══════════════ */}
      <header className="bg-[#041E2B] border-b border-[#1A4459] py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <a href={SHOP_URL} className="flex items-center gap-2">
            <span className="text-white font-black text-xl tracking-[0.15em]">
              GENIUS MIND
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-[#7A9BAD]">
            <a href={SHOP_URL} className="hover:text-white transition-colors">
              Shop Now
            </a>
            <a href="#ingredients" className="hover:text-white transition-colors">
              Science
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      {/* ══════════════ §1 HERO ══════════════ */}
      <section className="rock-bg py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div>
              <p className="label-mono text-[#7A9BAD] mb-4">
                16 Ingredients. One Formula. Zero BS.
              </p>
              <h1 className="font-mono text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight mb-6">
                Your Brain Isn&apos;t Tired. It&apos;s Running On What Cortisol Left Behind.
              </h1>
              <p className="text-white font-bold text-lg mb-4">
                Every high-pressure year you&apos;ve run this business, cortisol has been
                wearing down the chemistry your brain needs to think clearly. This is
                how you restore it.
              </p>
              <p className="text-[#7A9BAD] mb-4 leading-relaxed">
                The stress hormone that spikes every time a deadline lands, a hire blows
                up, or a pivot has to be made under pressure &mdash; it&apos;s the same one
                quietly depleting the precursors your brain uses to build focus, recall,
                and drive.
              </p>
              <p className="text-[#7A9BAD] mb-4 leading-relaxed">
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
              <a href="#mechanism" className="cta-btn inline-block">
                See How It Works &rarr;
              </a>
            </div>

            {/* Right: High/Low Cortisol Brain visual */}
            {/* <!-- ASSET TODO: Split image – "HIGH CORTISOL BRAIN" (depleted, dim) vs "LOW CORTISOL BRAIN" (lit, replenished) – Genius Mind bottle centred between them --> */}
            <div className="bg-[#0C2A3A] rounded-xl border border-[#1A4459] aspect-square flex items-center justify-center">
              <div className="text-center text-[#7A9BAD] p-8">
                <div className="text-6xl mb-4">&#129504;</div>
                <p className="text-sm">[High Cortisol Brain vs Low Cortisol Brain comparison]</p>
                <p className="text-xs mt-2">Genius Mind bottle centred between them</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ §2 SYMPTOMS LIST ══════════════ */}
      <section className="bg-[#041E2B] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Image placeholder */}
            {/* <!-- ASSET TODO: Founder portrait depleted/sharp comparison --> */}
            <div className="bg-[#0C2A3A] rounded-xl border border-[#1A4459] aspect-[4/5] flex items-center justify-center">
              <div className="text-center text-[#7A9BAD] p-8">
                <div className="text-6xl mb-4">&#128248;</div>
                <p className="text-sm">[Founder at desk / lifestyle image]</p>
              </div>
            </div>

            {/* Right: Copy */}
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                It&apos;s Not Just Burnout
              </h2>
              <p className="text-white font-bold mb-4">Many high-output operators in their 30s and 40s end up...</p>
              <div className="space-y-2 mb-6">
                {[
                  { bold: "Re-reading the same email three times", rest: "before the meaning lands" },
                  { bold: "Decision quality dropping by 2pm", rest: "\u2014 and the hardest calls always land later" },
                  { bold: "The second coffee not doing what it used to", rest: "\u2014 and the third one giving you the jitters without the focus" },
                  { bold: "Word-finding gaps in important conversations", rest: "\u2014 names, terms, the right word for a Slack message that should take 30 seconds" },
                  { bold: "Brain output flatlining", rest: "even after you\u2019ve sorted sleep, training, and diet" },
                ].map((item) => (
                  <div key={item.bold} className="warning-box flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">&#9888;</span>
                    <p className="text-white text-sm">
                      <strong>{item.bold}</strong>{" "}
                      <span className="text-[#7A9BAD]">{item.rest}</span>
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-white mb-4 leading-relaxed">
                Your father at 50 probably had sharper recall than you have at 38.
                This isn&apos;t aging. This is what chronic cortisol does to the chemistry
                your brain runs on &mdash; and the longer it goes unaddressed, the more
                it compounds.
              </p>
              <p className="text-[#00A6D2] font-bold">
                Your hormones control your brain&apos;s chemistry.<br />
                Fix the chemistry. Restore the function.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ §3 WHY EVERYTHING YOU'VE TRIED FAILED ══════════════ */}
      <Reveal>
        <section className="bg-white text-black py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-8">
              Why Everything You&apos;ve Tried Made Logical Sense &mdash; And Still Didn&apos;t Work
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
              <div>
                <p className="font-bold text-lg mb-4">
                  You didn&apos;t fail. The strategy failed you.
                </p>
                <p className="text-gray-700 mb-4">
                  Every caffeine protocol, productivity hack, and supplement you&apos;ve tried
                  attacked the symptom. None of them went after the cause.
                </p>
                <p className="font-bold text-lg mb-4">The cause is cortisol.</p>
                <p className="text-gray-700 mb-4">And the reason is simple:</p>
                <p className="font-mono text-[#00A6D2] font-black text-xl uppercase mb-4">
                  Your stress response was built for a world that no longer exists.
                </p>
              </div>

              <div>
                <p className="text-gray-700 mb-4">
                  For most of human history, stress was short.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>A threat appeared, cortisol spiked to get you through it,
                  the threat passed, cortisol dropped. Clean cycle. Worked perfectly.</strong>
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>But now the threat never passes.</strong>
                </p>
                <p className="text-gray-700 mb-4">
                  The Slack message at 10pm. The funding round. The hire that isn&apos;t
                  working out. The product launch. The kid who&apos;s sick the day of the
                  board meeting. None of it is life or death. But your nervous system
                  can&apos;t tell the difference.
                </p>
              </div>
            </div>

            <p className="text-gray-700 text-center mb-8">
              And the harder you try to think your way out of cortisol-driven cognitive
              depletion without addressing the chemistry first, the more you&apos;re working
              against yourself:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "More caffeine builds tolerance and depletes the system underneath.",
                  desc: "Caffeine doesn\u2019t produce dopamine \u2014 it borrows against the dopamine you already have. The dose that worked in January barely works by March. The system gets worse, not better.",
                },
                {
                  title: "Single-ingredient nootropics solve one thing. Focus isn\u2019t one thing.",
                  desc: "Lion\u2019s Mane alone addresses neurogenesis. It doesn\u2019t touch blood flow, dopamine depletion, or synaptic signal. The reason your last stack didn\u2019t move the needle isn\u2019t that nootropics don\u2019t work \u2014 it\u2019s that focus is a multi-mechanism problem treated with a one-mechanism solution.",
                },
                {
                  title: "Sorting sleep, training, and diet won\u2019t fix chemistry depletion.",
                  desc: "You\u2019ve done the work. The lifestyle is dialled. And the cognitive output still plateaus \u2014 because the chemistry layer was never addressed.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-[#EDF3F7] rounded-lg p-6 border border-[#D0E0E8]"
                >
                  <p className="font-bold text-sm mb-2">{item.title}</p>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ §5 TRANSITION ══════════════ */}
      <Reveal>
        <section className="bg-[#041E2B] py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Before/After placeholder */}
              {/* <!-- ASSET TODO: Founder portrait depleted/sharp comparison --> */}
              <div className="bg-[#0C2A3A] rounded-xl border border-[#1A4459] aspect-[4/3] flex items-center justify-center">
                <div className="text-center text-[#7A9BAD] p-8">
                  <div className="text-6xl mb-4">&#129504;</div>
                  <p className="text-sm">[Before/After: Depleted vs restored operator]</p>
                </div>
              </div>
              <div>
                <p className="text-white text-lg leading-relaxed mb-4">
                  The operators who finally break through the ceiling &mdash; who sustain
                  sharp output instead of watching it erode year on year &mdash; are the
                  ones who get the chemistry right first.
                </p>
                <p className="text-[#00A6D2] font-bold text-xl mb-2">
                  Restore the chemistry. Get the brain back.
                </p>
                <p className="text-white font-bold text-xl">
                  That&apos;s exactly what Genius Mind is built to do.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ §6 ENEMY BLOCK ══════════════ */}
      <Reveal>
        <section className="bg-[#041E2B] py-16 md:py-24 border-t border-[#1A4459]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <p className="label-mono text-[#00A6D2] mb-2">
                  &#10067; And what about other options?
                </p>
                <h2 className="text-3xl md:text-4xl font-black mb-8">
                  Say No to Caffeine Dependency &amp; Nootropic Snake Oil
                </h2>

                <h3 className="text-white font-bold mb-3">
                  Caffeine &amp; Stimulant Stacks:
                </h3>
                {[
                  { bold: "Tolerance builds within weeks", rest: "\u2014 you need more for less" },
                  { bold: "90-minute spike then a crash", rest: "\u2014 your best hours get shorter" },
                  { bold: "Disrupts sleep", rest: "\u2014 which compounds next-day cognitive load" },
                ].map((item) => (
                  <div key={item.bold} className="red-x-item">
                    <span className="text-red-500 font-bold">&#10005;</span>
                    <p className="text-white text-sm">
                      <strong>{item.bold}</strong>{" "}
                      <span className="text-[#7A9BAD]">{item.rest}</span>
                    </p>
                  </div>
                ))}

                <h3 className="text-white font-bold mt-6 mb-3">
                  Generic &ldquo;Nootropic&rdquo; Supplements:
                </h3>
                {[
                  { bold: "Proprietary blends hide", rest: "worthless micro-doses" },
                  { bold: "Single-ingredient formulas", rest: "that can\u2019t address multiple pathways" },
                  { bold: "Raw powders instead of extracts", rest: "\u2014 no bioavailability, no results" },
                ].map((item) => (
                  <div key={item.bold} className="red-x-item">
                    <span className="text-red-500 font-bold">&#10005;</span>
                    <p className="text-white text-sm">
                      <strong>{item.bold}</strong>{" "}
                      <span className="text-[#7A9BAD]">{item.rest}</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Right: Image placeholder */}
              <div className="flex flex-col gap-6">
                {/* <!-- ASSET TODO: Operator workspace photo --> */}
                <div className="bg-[#0C2A3A] rounded-xl border border-[#1A4459] aspect-square flex items-center justify-center">
                  <div className="text-center text-[#7A9BAD] p-8">
                    <div className="text-6xl mb-4">&#128248;</div>
                    <p className="text-sm">[Operator at desk / workspace image]</p>
                  </div>
                </div>
                <p className="text-[#7A9BAD] text-sm">
                  You deserve better than frying your nervous system with stimulants
                  OR wasting money on underdosed single-ingredient pills that don&apos;t
                  address the ROOT of sustained cognitive performance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ §7 PRODUCT REVEAL – COGNISYNC TRI-FACTOR ══════════════ */}
      <Reveal>
        <section id="mechanism" className="bg-[#041E2B] py-16 md:py-24 border-t border-[#1A4459]">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <p className="label-mono text-[#7A9BAD] mb-3">Make the infrastructure decision</p>
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              Cognitive Chemistry Restored. Sustained Focus, Replenished.
            </h2>
            <p className="text-[#7A9BAD] mb-10 max-w-3xl mx-auto">
              Genius Mind isn&apos;t another nootropic &mdash; it&apos;s a complete cognitive stack
              engineered around the Cognisync Tri-Factor, working on three mechanisms
              simultaneously:
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-[#0C2A3A] rounded-xl border border-[#1A4459] p-6 text-left">
                <div className="text-[#00A6D2] text-2xl mb-3">&#9889;</div>
                <h3 className="label-mono text-white font-bold mb-2">Blood Flow Activation</h3>
                <p className="text-[#7A9BAD] text-sm leading-relaxed">
                  Ginkgo Biloba 50:1, Rosemary 5:1, Panax Ginseng 20:1.
                  Researched for cerebral blood flow, oxygen and nutrient delivery
                  to the brain.
                </p>
              </div>
              <div className="bg-[#0C2A3A] rounded-xl border border-[#1A4459] p-6 text-left">
                <div className="text-[#00A6D2] text-2xl mb-3">&#128161;</div>
                <h3 className="label-mono text-white font-bold mb-2">Neuron Stimulation</h3>
                <p className="text-[#7A9BAD] text-sm leading-relaxed">
                  Lion&apos;s Mane 4:1, L-Tyrosine, Guarana. Studied for nerve growth
                  factor, dopamine precursor support, and clean sustained energy via
                  slow-release caffeine.
                </p>
              </div>
              <div className="bg-[#0C2A3A] rounded-xl border border-[#1A4459] p-6 text-left">
                <div className="text-[#00A6D2] text-2xl mb-3">&#128737;&#65039;</div>
                <h3 className="label-mono text-white font-bold mb-2">Neuron Strengthening</h3>
                <p className="text-[#7A9BAD] text-sm leading-relaxed">
                  Bacopa Monnieri 11:1, Phosphatidylserine, B-Complex, Zinc.
                  Studied for synaptic communication, memory consolidation, and
                  cellular brain energy.
                </p>
              </div>
            </div>

            <p className="text-white text-sm max-w-3xl mx-auto mb-4">
              Genius Mind is a precision-formulated stack of 16 clinically studied
              ingredients &mdash; high-ratio botanical extracts, amino acid precursors,
              and essential cofactors &mdash; designed to support sustained focus
              throughout the working day. No proprietary blends. No fillers. Every
              dose transparent and clinically backed.
            </p>
            <p className="text-white font-semibold mb-8">
              No prescription. No crashes. No tolerance. Daily use, safely.
            </p>

            {/* Product image placeholder */}
            {/* <!-- ASSET TODO: Genius Mind product hero image --> */}
            <div className="bg-[#0C2A3A] rounded-xl border border-[#1A4459] max-w-md mx-auto aspect-[3/4] flex items-center justify-center mb-8">
              <div className="text-center text-[#7A9BAD] p-8">
                <div className="text-6xl mb-4">&#129514;</div>
                <p className="text-sm">[Genius Mind product bottle image]</p>
              </div>
            </div>

            <a href={SHOP_URL} className="cta-btn inline-block">
              TRY IT NOW &rarr;
            </a>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ §8 BENEFIT TILES ══════════════ */}
      <Reveal>
        <section className="rock-bg py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {BENEFITS.map((b) => (
                <div key={b.title} className="text-center">
                  <div className="text-[#00A6D2] text-3xl mb-3">{b.icon}</div>
                  <h3 className="label-mono text-white font-bold mb-2">{b.title}</h3>
                  <p className="text-[#7A9BAD] text-sm">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ §9 INGREDIENTS (8 HERO) ══════════════ */}
      <Reveal>
        <section id="ingredients" className="bg-[#041E2B] py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="label-mono text-[#7A9BAD] mb-3">Ingredients</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Fuel Your Brain the Clean Way
            </h2>
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {["No proprietary blends", "No fillers", "No synthetic stimulants", "No BS", "No cheap powders"].map((item) => (
                <div key={item} className="text-center">
                  <div className="text-[#00A6D2] text-xl mb-1">&#10005;</div>
                  <p className="text-[#7A9BAD] text-xs">{item}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {INGREDIENTS.map((ing) => (
                <div key={ing.name} className="ingredient-card text-left">
                  <h4 className="font-mono text-white font-bold text-lg uppercase tracking-wider mb-1">
                    {ing.name}
                  </h4>
                  <div className="inline-block border border-[#7A9BAD] rounded px-2 py-0.5 text-xs text-[#7A9BAD] font-mono mb-2">
                    {ing.dose}
                  </div>
                  <p className="text-[#7A9BAD] text-xs leading-relaxed">{ing.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ TRUST BADGES ══════════════ */}
      <section className="bg-[#041E2B] border-y border-[#1A4459] py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-x-10 gap-y-4 text-center">
          {TRUST_BADGES.map((b) => (
            <div key={b.label}>
              <div className="text-2xl mb-1">{b.icon}</div>
              <p className="label-mono text-[#7A9BAD] text-[10px]">{b.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ NEW §A – THE OPERATOR STACK ══════════════ */}
      <Reveal>
        <section className="bg-[#041E2B] py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-6">
              How Genius Mind Fits Into A Serious Operator Stack
            </h2>
            <p className="text-[#7A9BAD] text-center max-w-3xl mx-auto mb-10">
              You already take creatine. Probably omega-3. Maybe AG1 or a multi.
              Magnesium at night. Genius Mind is the chemistry layer &mdash; the missing
              piece between the lifestyle work you&apos;ve already done and the cognitive
              output you&apos;re trying to protect. It doesn&apos;t replace your stack.
              It completes it.
            </p>

            {/* <!-- ASSET TODO: Operator Stack grid visual --> */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-10">
              {OPERATOR_STACK.map((item) => (
                <div
                  key={item.label}
                  className={`rounded-xl p-4 text-center ${
                    item.highlight
                      ? "bg-[#00A6D2] border-2 border-[#00A6D2]"
                      : "bg-[#0C2A3A] border border-[#1A4459]"
                  }`}
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className={`text-xs font-bold ${item.highlight ? "text-white" : "text-[#7A9BAD]"}`}>
                    {item.label}
                  </p>
                  <p className={`text-[10px] mt-1 ${item.highlight ? "text-white/80" : "text-[#7A9BAD]/60"}`}>
                    {item.target}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-white text-center font-semibold">
              The lifestyle layer is dialled. The body layer is supported.
              The brain layer was the missing piece.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ §10 VIDEO TESTIMONIALS ══════════════ */}
      <Reveal>
        <section className="bg-[#041E2B] py-16 md:py-24 border-t border-[#1A4459]">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-10">
              What Operators Are Saying
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {VIDEO_TESTIMONIALS.map((v) => (
                <div
                  key={v.label}
                  className="bg-[#0C2A3A] rounded-xl border border-[#1A4459] aspect-[9/16] flex flex-col items-center justify-center relative overflow-hidden"
                >
                  {/* <!-- ASSET TODO: Operator video testimonial - {v.label} --> */}
                  <div className="absolute top-3 left-3 right-3">
                    <span className="label-mono bg-[#00A6D2] text-white px-3 py-1 rounded text-[10px] font-bold">
                      {v.label}
                    </span>
                  </div>
                  <div className="text-5xl text-[#7A9BAD]">&#9654;</div>
                  <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">
                    {v.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ §11 PRODUCT SECTION ══════════════ */}
      <Reveal>
        <section className="rock-bg py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left: Product display */}
              <div className="bg-[#0C2A3A] rounded-2xl border border-[#1A4459] p-8 flex flex-col items-center">
                <div className="bg-[#0F3347] rounded-xl w-full aspect-square flex items-center justify-center mb-6">
                  <div className="text-center text-[#7A9BAD]">
                    <div className="text-6xl mb-4">&#129514;</div>
                    <p className="text-sm">[Product image with benefits callouts]</p>
                    <p className="text-xs mt-2">Sharpen Focus / Sustain Energy / Support Memory / Extend Output</p>
                  </div>
                </div>
                <div className="text-center">
                  {/* <!-- TODO: Verify rating and count against Trustpilot/Amazon UK --> */}
                  <div className="text-[#FFD700] text-sm mb-1">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <p className="text-white text-sm font-bold">Verified Customer Reviews</p>
                  <p className="text-[#7A9BAD] text-[10px]">
                    *Results may vary. Based on verified customer reviews.
                  </p>
                </div>
              </div>

              {/* Right: Purchase info */}
              <div>
                <h2 className="text-3xl font-black mb-4">Cognitive Infrastructure for Operators</h2>
                <p className="text-white font-bold mb-4">
                  Genius Mind is a complete cognitive stack engineered around the
                  Cognisync Tri-Factor &mdash; supporting dopamine pathways,
                  cerebral blood flow, and synaptic signalling with 16 clinically
                  studied ingredients.*
                </p>
                <ul className="space-y-2 mb-6">
                  {PRODUCT_BULLETS.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500 mt-0.5">&#10004;</span>
                      <span className="text-white">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-black text-white">&pound;24.99</span>
                  <span className="text-[#7A9BAD] line-through text-lg">&pound;34.99</span>
                  <span className="label-mono text-[#00A6D2] font-bold">Save 28%</span>
                </div>

                <a href={SHOP_URL} className="cta-btn mb-4">
                  TRY IT NOW &rarr;
                </a>

                <div className="flex justify-center gap-8 text-center text-xs text-[#7A9BAD] mb-6">
                  <div>
                    <div className="text-lg mb-1">&#128230;</div>
                    <p>3-Month Supply<br />Save 43%</p>
                  </div>
                  <div>
                    <div className="text-lg mb-1">&#128640;</div>
                    <p>Try Risk-Free for 90 Days<br />or 100% Money Back</p>
                  </div>
                  <div>
                    <div className="text-lg mb-1">&#128666;</div>
                    <p>Free UK Shipping<br />Same-Day Dispatch</p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="label-mono text-[#00A6D2] font-bold mb-3">Best Value: 3-Month Supply</p>
                  <div className="bg-[#0C2A3A] rounded-xl border border-[#1A4459] p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-bold">3 Bottles (90-Day Supply)</p>
                        <p className="text-[#7A9BAD] text-xs">Just &pound;0.48/serving</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#7A9BAD] line-through text-sm">&pound;74.97</p>
                        <p className="text-[#00A6D2] font-bold text-xl">&pound;42.99</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ §11 REVIEW CARDS ══════════════ */}
      {/* <!-- TODO: Replace with real verbatim Trustpilot reviews. Reduce carousel if insufficient real reviews. --> */}
      <Reveal>
        <section className="bg-[#041E2B] py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-4">
              {MINI_REVIEWS.map((r, i) => (
                <div key={i} className="bg-[#0F3347] border border-[#1A4459] rounded-xl p-5">
                  <div className="text-[#FFD700] text-sm mb-2">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <p className="text-white text-sm leading-relaxed">&ldquo;{r}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ §12 COMPARISON TABLE ══════════════ */}
      <Reveal>
        <section className="bg-[#041E2B] py-16 md:py-24 border-t border-[#1A4459]">
          <div className="max-w-4xl mx-auto px-4">
            <p className="label-mono text-[#7A9BAD] text-center mb-3">
              Genius Mind vs Caffeine Stacks vs Generic Nootropics
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-center mb-3">
              How Genius Mind Compares
            </h2>
            <p className="text-[#7A9BAD] text-center mb-10 max-w-xl mx-auto">
              Cognitive infrastructure, not a stimulant hit &mdash; Genius Mind does
              what others can&apos;t.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1A4459]">
                    <th className="py-3 text-left text-[#7A9BAD] font-mono uppercase text-xs"></th>
                    <th className="py-3 text-center text-white font-bold">Genius Mind</th>
                    <th className="py-3 text-center text-[#7A9BAD]">Caffeine Stacks</th>
                    <th className="py-3 text-center text-[#7A9BAD]">Generic Nootropics</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.label} className="border-b border-[#0F3347]">
                      <td className="py-4 pr-4 font-mono uppercase text-xs text-[#7A9BAD] tracking-wider">
                        {row.label}
                      </td>
                      <td className="py-4 text-center text-2xl text-green-500">&#9989;</td>
                      <td className="py-4 text-center text-2xl">
                        {row.caff === "x" ? <span className="text-red-500">&#10060;</span> : <span className="text-red-400">&#10067;</span>}
                      </td>
                      <td className="py-4 text-center text-2xl">
                        {row.generic === "x" ? <span className="text-red-500">&#10060;</span> : <span className="text-red-400">&#10067;</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-10">
              <a href={SHOP_URL} className="cta-btn inline-block">
                TRY IT NOW &rarr;
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ §14 SURVEY OUTCOMES CHART ══════════════ */}
      <Reveal>
        <section className="rock-bg py-16 md:py-24 border-t border-[#1A4459]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-8">
              What Long-Term Customers Actually Report
            </h2>

            {/* <!-- ASSET TODO: PPS survey outcome chart from 33-respondent data --> */}
            <div className="max-w-2xl mx-auto space-y-4 mb-8">
              {SURVEY_OUTCOMES.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm font-semibold">{item.label}</span>
                    <span className="text-[#00A6D2] text-sm font-bold">{item.count}/33</span>
                  </div>
                  <div className="w-full bg-[#0C2A3A] rounded-full h-3">
                    <div
                      className="bg-[#00A6D2] h-3 rounded-full"
                      style={{ width: `${(item.count / 33) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[#7A9BAD] text-xs">
              Source: post-purchase subscriber survey, 33 respondents using 3+ months.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ §15 WEEKLY TIMELINE ══════════════ */}
      <Reveal>
        <section className="rock-bg py-16 md:py-24 border-t border-[#1A4459]">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-10">
              What You Might Expect from Daily Use of Genius Mind
            </h2>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {WEEKS.map((w, i) => (
                <button
                  key={w.label}
                  onClick={() => setActiveWeek(i)}
                  className={`tab-btn ${activeWeek === i ? "active" : ""}`}
                >
                  {w.label}
                </button>
              ))}
            </div>

            <div className="bg-[#0C2A3A] border border-[#1A4459] rounded-2xl p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[#00A6D2] font-mono text-4xl font-black">
                      0{activeWeek + 1}
                    </span>
                    <h3 className="text-2xl font-black text-white">
                      {WEEKS[activeWeek].title}
                    </h3>
                  </div>
                  <p className="text-white font-bold mb-4">
                    {WEEKS[activeWeek].subtitle}
                  </p>
                  <ul className="space-y-2">
                    {WEEKS[activeWeek].benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-[#7A9BAD]">
                        <span className="text-[#00A6D2] mt-1">&#8226;</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#0F3347] rounded-xl flex items-center justify-center aspect-video">
                  <p className="text-[#7A9BAD] text-sm">[{WEEKS[activeWeek].label} illustration]</p>
                </div>
              </div>
            </div>

            <p className="text-center text-[#7A9BAD] text-xs mt-4">
              *Individual results may vary. Based on customer reports and ingredient research timelines.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ §16 DAY 1 / 30 / 90 TIMELINE ══════════════ */}
      <Reveal>
        <section className="bg-[#0F3347] py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex justify-center gap-4 mb-8">
              {["What to Expect", "Frequently Asked Questions", "Reviews"].map((tab) => (
                <a
                  key={tab}
                  href={tab === "Frequently Asked Questions" ? "#faq" : tab === "Reviews" ? "#reviews-section" : "#"}
                  className="bg-[#1A4459] text-white px-5 py-3 rounded-lg text-sm font-semibold hover:bg-[#1F5570] transition-colors"
                >
                  {tab}
                </a>
              ))}
            </div>

            <h3 className="text-white font-bold text-lg mb-6">
              What Happens After You Start Restoring Cognitive Chemistry
            </h3>
            <div className="w-full h-0.5 bg-[#00A6D2] mb-8" />

            <div className="grid md:grid-cols-3 gap-8">
              {TIMELINE.map((t) => (
                <div key={t.day}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{t.emoji}</span>
                    <span className="label-mono text-[#00A6D2] font-bold">Day {t.day}</span>
                    <span className="text-white font-bold">{t.title}</span>
                  </div>
                  <ul className="space-y-2">
                    {t.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[#7A9BAD]">
                        <span className="text-[#00A6D2] mt-1">&#8226;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ §17 16-INGREDIENT DEEP DIVE ══════════════ */}
      <Reveal>
        <section className="bg-[#041E2B] py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              16 Ingredients in 1 Powerful Formula
            </h2>
            <p className="label-mono text-[#00A6D2] mb-10">
              Clinically Studied + High-Ratio Extracts
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {INGREDIENTS_DETAIL.map((ing) => (
                <div key={ing.name} className="ingredient-card text-left">
                  <h4 className="text-white font-bold text-lg mb-1">{ing.name}</h4>
                  <p className="text-[#7A9BAD] text-xs leading-relaxed mb-2">{ing.desc}</p>
                  <div className="inline-block border border-[#7A9BAD] rounded px-2 py-0.5 text-xs text-[#7A9BAD] font-mono">
                    {ing.dose}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ NEW §B – THE RESEARCH ══════════════ */}
      <Reveal>
        <section className="bg-[#041E2B] py-16 md:py-24 border-t border-[#1A4459]">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-10">
              The Research Behind The Formula
            </h2>

            {/* <!-- ASSET TODO: Verify each citation against original source before publishing --> */}
            <div className="grid md:grid-cols-3 gap-6">
              {RESEARCH_CITATIONS.map((cite) => (
                <div key={cite.ingredient} className="bg-[#0C2A3A] rounded-xl border border-[#1A4459] p-6">
                  <p className="label-mono text-[#00A6D2] text-xs mb-2">{cite.ingredient}</p>
                  <p className="text-white font-bold text-sm mb-2">{cite.finding}</p>
                  <p className="text-[#7A9BAD] text-xs mb-3">{cite.citation}</p>
                  <p className="text-[#7A9BAD] text-xs italic">{cite.relevance}</p>
                </div>
              ))}
            </div>

            <p className="text-[#7A9BAD] text-xs text-center mt-6">
              Citations are for individual ingredients, not product claims. Genius Mind
              contains these ingredients at the doses listed. Individual results may vary.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ §18 BUILT BY OPERATORS ══════════════ */}
      <Reveal>
        <section className="rock-bg py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-12">
              Built by Operators, for Operators
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {FORMULATION_POINTS.map((point) => (
                <div key={point.title} className="text-center">
                  <div className="advisory-circle flex items-center justify-center mx-auto">
                    <span className="text-3xl">{point.icon}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">{point.title}</h3>
                  <p className="label-mono text-[#00A6D2] text-[10px] mb-3">{point.subtitle}</p>
                  <p className="text-[#7A9BAD] text-sm leading-relaxed">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ §19 MONEY BACK GUARANTEE ══════════════ */}
      <Reveal>
        <section className="rock-bg py-16 md:py-24 border-t border-[#1A4459]">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="shrink-0">
                <div className="w-32 h-32 bg-[#00A6D2] rounded-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-xs font-bold">100%</div>
                    <div className="text-xs font-bold">MONEY</div>
                    <div className="text-xs font-bold">BACK</div>
                    <div className="text-[8px] mt-1">GUARANTEE</div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black mb-2">
                  Feel a Massive Difference in 90 Days{" "}
                  <span className="text-[#00A6D2] italic">Or Your Money Back</span>
                </h2>
                <p className="text-[#7A9BAD] leading-relaxed mb-6">
                  We make sure every customer actually gets results or we refund you
                  100% of your investment. We&apos;re so confident you&apos;ll feel the
                  difference with Genius Mind that we bear all the risk. No questions
                  asked.
                </p>
                <a href={SHOP_URL} className="cta-btn inline-block">
                  TRY IT NOW &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ §20 FAQ ══════════════ */}
      <section id="faq" className="rock-bg py-16 md:py-24 border-t border-[#1A4459]">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <Reveal key={i}>
                <div className="bg-[#0F3347] border border-[#1A4459] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left p-5 flex items-center justify-between text-white font-bold text-sm uppercase tracking-wider hover:bg-[#1A4459] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-[#7A9BAD] text-lg transition-transform">
                      {openFaq === i ? "\u2212" : "\u2228"}
                    </span>
                  </button>
                  <div className={`faq-answer ${openFaq === i ? "open" : ""}`}>
                    <div className="px-5 pb-5 text-sm text-[#7A9BAD] leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ §21 STARTER KIT ══════════════ */}
      <Reveal>
        <section className="rock-bg py-16 md:py-24 border-t border-[#1A4459]">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-12">
              Your Starter Kit <span className="text-[#00A6D2] underline">Includes:</span>
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-[#0C2A3A] rounded-xl border border-[#1A4459] aspect-square flex items-center justify-center">
                <div className="text-center text-[#7A9BAD] p-8">
                  <div className="text-6xl mb-4">&#127873;</div>
                  <p className="text-sm">[Starter Kit bundle image]</p>
                </div>
              </div>

              <div className="text-left">
                <div className="space-y-4">
                  {LAUNCH_KIT.map((item) => (
                    <div key={item.name} className="flex items-center justify-between border-b border-[#1A4459] pb-3">
                      <span className="text-white font-bold">{item.name}</span>
                      <div className="flex items-center gap-2">
                        {item.was && <span className="text-[#7A9BAD] line-through text-sm">{item.was}</span>}
                        <span className="text-[#00A6D2] font-bold">{item.now}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <a href={SHOP_URL} className="cta-btn">
                    TRY IT NOW &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="border-t border-[#1A4459] py-10 bg-[#041E2B]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-white font-black text-lg tracking-[0.15em]">
              GENIUS MIND
            </span>
          </div>
          <p className="text-[#7A9BAD] text-xs mb-4">For Those Who Demand More.</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#7A9BAD] mb-6">
            <a href={SHOP_URL} className="hover:text-white transition-colors">Shop</a>
            <a href="#ingredients" className="hover:text-white transition-colors">Science</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="mailto:support@justfloow.com" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-[10px] text-[#1A4459] max-w-xl mx-auto">
            *These statements have not been evaluated by the MHRA. This product is
            not intended to diagnose, treat, cure or prevent any disease. Individual
            results may vary.
          </p>
        </div>
      </footer>

      {/* ══════════════ STICKY BUY BAR ══════════════ */}
      <div
        className={`sticky-buy-bar fixed bottom-0 left-0 right-0 bg-[#0C2A3A]/95 backdrop-blur-md border-t border-[#1A4459] py-3 px-4 z-50 ${
          stickyVisible ? "visible" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <div className="text-sm font-bold text-white">
              Genius Mind Cognitive Stack
            </div>
            <div className="text-xs text-[#7A9BAD]">
              16 ingredients &bull; 90-day guarantee &bull; Save up to 43%
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <span className="text-white font-bold">&pound;24.99</span>
              <span className="text-[#7A9BAD] line-through text-xs ml-1">&pound;34.99</span>
            </div>
            <a
              href={SHOP_URL}
              className="bg-[#00A6D2] hover:bg-[#008AB0] text-white font-bold py-3 px-6 rounded-lg text-sm transition-colors whitespace-nowrap"
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

/* §8 – BENEFIT TILES (survey-validated angles) */
const BENEFITS = [
  { icon: "\uD83C\uDFAF", title: "Sustained Focus", desc: "Focus that lasts. Lock in for hours, not bursts." },
  { icon: "\uD83D\uDCA1", title: "Mental Clarity", desc: "Clearer thinking. The fog cuts through." },
  { icon: "\u26A1", title: "Mental Energy", desc: "All-day cognitive stamina. No afternoon collapse. Clean energy, not borrowed." },
  { icon: "\uD83D\uDE80", title: "Easier to Take Action", desc: "Close the knowing-doing gap. Start what you\u2019ve been putting off." },
  { icon: "\uD83D\uDCC8", title: "Peak Performance", desc: "Sharper thinking under pressure. The mental edge that holds when the stakes are highest." },
  { icon: "\uD83E\uDDE0", title: "Memory & Recall", desc: "Faster recall. Word-finding restored. Pattern recognition back online." },
];

/* §9 – HERO INGREDIENTS (8, hedged) – Fenugreek swapped for Sage Leaf */
const INGREDIENTS = [
  { name: "L-Tyrosine", dose: "100 mg", desc: "Studied as a dopamine precursor for focus under stress." },
  { name: "Ginkgo Biloba", dose: "120 mg (50:1)", desc: "Researched for cerebral blood flow and oxygen delivery." },
  { name: "Bacopa Monnieri", dose: "80 mg (11:1)", desc: "Studied for memory consolidation and recall." },
  { name: "Lion\u2019s Mane", dose: "80 mg (4:1)", desc: "Studied for its role in stimulating nerve growth factor." },
  { name: "Panax Ginseng", dose: "100 mg (20:1)", desc: "Researched for focus, endurance, and stress response." },
  { name: "L-Choline", dose: "100 mg", desc: "Studied as an acetylcholine precursor for memory and learning." },
  { name: "Guarana Seed", dose: "90 mg", desc: "Slow-release caffeine via tannin binding \u2014 researched for sustained energy." },
  { name: "Sage Leaf", dose: "75 mg (4:1)", desc: "Studied for memory retention and cognitive support." },
];

const TRUST_BADGES = [
  { icon: "\uD83C\uDFED", label: "GMP Certified Facility" },
  { icon: "\uD83D\uDD2C", label: "Lab Tested" },
  { icon: "\uD83C\uDDEC\uD83C\uDDE7", label: "Made in UK" },
  { icon: "\uD83C\uDF3F", label: "100% Vegan" },
  { icon: "\uD83D\uDEAB", label: "Non-GMO" },
  { icon: "\uD83C\uDF3E", label: "Gluten Free" },
];

/* NEW §A – OPERATOR STACK */
const OPERATOR_STACK = [
  { icon: "\uD83D\uDCAA", label: "Creatine", target: "Muscle", highlight: false },
  { icon: "\uD83D\uDC9B", label: "Omega-3", target: "Heart", highlight: false },
  { icon: "\uD83E\uDDE0", label: "Genius Mind", target: "Brain", highlight: true },
  { icon: "\uD83C\uDF19", label: "Magnesium", target: "Sleep", highlight: false },
  { icon: "\u2600\uFE0F", label: "Vitamin D", target: "Immune", highlight: false },
  { icon: "\uD83E\uDD57", label: "AG1 / Multi", target: "General", highlight: false },
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

/* §11 – MINI REVIEWS */
/* <!-- TODO: Replace with real verbatim Trustpilot reviews --> */
const MINI_REVIEWS = [
  "The fog has lifted completely. I used to hit a wall at 2pm every day, now I\u2019m sharp right through to the end of the working day. My team has noticed the difference in my decision-making.",
  "I was skeptical about another nootropic but this one actually works. My recall is sharper, I\u2019m sleeping better, and the compound effect is real. Three months in.",
  "Dropped from 4 coffees a day to one. My mornings are cleaner, my afternoons don\u2019t collapse, and I genuinely feel like I\u2019m operating at a higher level.",
];

/* §12 – COMPARISON TABLE */
const COMPARISON = [
  { label: "Supports Dopamine Pathways", caff: "x", generic: "?" },
  { label: "No Crash or Withdrawal", caff: "x", generic: "?" },
  { label: "Supports Sustained Focus", caff: "x", generic: "x" },
  { label: "Multi-Mechanism Neural Support", caff: "x", generic: "?" },
  { label: "Tolerance Doesn\u2019t Build", caff: "x", generic: "?" },
  { label: "Clinically Dosed Extracts", caff: "x", generic: "x" },
  { label: "16 Synergistic Ingredients", caff: "x", generic: "x" },
];

/* §14 – SURVEY OUTCOMES */
const SURVEY_OUTCOMES = [
  { label: "Sustained Focus", count: 23 },
  { label: "Mental Clarity", count: 22 },
  { label: "Easier to Take Action", count: 20 },
  { label: "Sharper Under Pressure", count: 17 },
];

/* §15 – WEEK-BY-WEEK (all hedged) */
const WEEKS = [
  {
    label: "Week 1-2",
    title: "Adjustment",
    subtitle: "Your body is getting used to the new stack, gradually absorbing and processing its ingredients.",
    benefits: [
      "Some users may notice a subtle lift in daily clarity and alertness.",
      "Slight improvements in mood and drive as pathways begin activating.",
      "Guarana and B vitamins may provide an early energy lift.",
      "Your brain is beginning to build the foundation for sustained output.",
    ],
  },
  {
    label: "Week 3-4",
    title: "Activation",
    subtitle: "Key ingredients are building up in your system. Some users report mild improvements.",
    benefits: [
      "Some users report less reliance on afternoon caffeine.",
      "Focus sessions may begin extending naturally.",
      "Memory recall may start improving.",
      "Decision quality may stay more consistent later in the day.",
    ],
  },
  {
    label: "Week 5-6",
    title: "Momentum",
    subtitle: "Research suggests Bacopa effects may begin around 4-6 weeks of consistent use.",
    benefits: [
      "More noticeable improvements in sustained focus.",
      "Deep work may become more accessible and natural.",
      "Stress response may feel more manageable.",
      "Others may start noticing sustained sharpness.",
    ],
  },
  {
    label: "Week 7-8",
    title: "Sharper Output",
    subtitle: "Sustained focus may become more reliable with continued daily use.",
    benefits: [
      "Some users report consistent concentration throughout the day.",
      "Executive function and planning may feel sharper.",
      "Energy may stay more consistent from morning to evening.",
      "Cognitive endurance under pressure may improve.",
    ],
  },
  {
    label: "Week 9-10",
    title: "Compound Effect",
    subtitle: "Research suggests Lion\u2019s Mane effects may accumulate over this period.",
    benefits: [
      "Some users report improvements in recall and working memory.",
      "Creative problem-solving may feel more accessible.",
      "Recovery between demanding sessions may be faster.",
      "Colleagues and team members may notice the difference.",
    ],
  },
  {
    label: "Week 11-12",
    title: "New Baseline",
    subtitle: "This may become the operating state with consistent use.",
    benefits: [
      "All 16 ingredients may be operating synergistically.",
      "Cognitive output may feel consistently supported across the full day.",
      "For many users, this is no longer a supplement effect \u2014 it\u2019s the new normal.",
      "Research-backed ingredients continue supporting cognitive function.",
    ],
  },
  {
    label: "Month 6+",
    title: "Sustained Cognitive Floor",
    subtitle: "New baseline may hold with consistent daily use.",
    benefits: [
      "Cognitive baseline may be fully established.",
      "Neural support continues with ongoing use.",
      "Performance may feel natural and sustained.",
      "Ongoing protection with continued daily intake.",
    ],
  },
];

/* §16 – DAY TIMELINE */
const TIMELINE = [
  {
    day: "1",
    title: "Activation",
    emoji: "\u26A1",
    items: [
      "Guarana and B vitamins may provide an immediate lift",
      "L-Tyrosine begins supporting dopamine pathways",
      "Some users report subtly cleaner clarity from day one",
      "The cognitive foundation starts building",
    ],
  },
  {
    day: "30",
    title: "The Hold",
    emoji: "\uD83D\uDCA5",
    items: [
      "Some users report the afternoon crash flattening",
      "Bacopa and Lion\u2019s Mane may reach effective levels",
      "Focus may extend naturally, less forced",
      "Some users report others noticing sharper presence",
    ],
  },
  {
    day: "90",
    title: "Lock-In",
    emoji: "\uD83D\uDE80",
    items: [
      "All 16 ingredients may be working synergistically",
      "Decision stamina may extend across the full day",
      "For many users, it\u2019s no longer a supplement effect \u2014 it\u2019s the new baseline",
      "Cognitive infrastructure, fully built",
    ],
  },
];

/* §17 – ALL 16 INGREDIENTS (hedged) */
const INGREDIENTS_DETAIL = [
  { name: "L-Tyrosine", dose: "100 mg", desc: "Studied as a dopamine precursor for focus and drive under stress." },
  { name: "Ginkgo Biloba", dose: "120 mg (50:1)", desc: "Researched for cerebral blood flow and oxygen delivery to the brain." },
  { name: "Bacopa Monnieri", dose: "80 mg (11:1)", desc: "Studied for memory consolidation and recall support." },
  { name: "Lion\u2019s Mane", dose: "80 mg (4:1)", desc: "Studied for its role in stimulating nerve growth factor." },
  { name: "Phosphatidylserine", dose: "35 mg", desc: "Studied for brain cell membrane integrity and signal transmission." },
  { name: "B12 (Methylcobalamin)", dose: "500\u03BCg", desc: "Studied for its role in neurotransmitter synthesis. Most adults may be deficient." },
  { name: "Panax Ginseng", dose: "100 mg (20:1)", desc: "Researched for focus, endurance, and stress response support." },
  { name: "L-Choline", dose: "100 mg", desc: "Studied as an acetylcholine precursor for memory and learning." },
  { name: "Guarana Seed", dose: "90 mg", desc: "Slow-release caffeine via tannin binding \u2014 researched for sustained energy without spikes." },
  { name: "Sage Leaf", dose: "75 mg (4:1)", desc: "Studied for memory retention and cognitive support." },
  { name: "Rosemary", dose: "20 mg (5:1)", desc: "Researched for neuroprotective properties and long-term brain health." },
  { name: "Vitamin B6", dose: "10 mg", desc: "Studied for its role as a cofactor in neurotransmitter synthesis." },
  { name: "Zinc", dose: "10 mg", desc: "Studied for cognitive function, learning, and synaptic signalling." },
  { name: "Niacin (B3)", dose: "32 mg", desc: "Studied for NAD+ production and cellular brain energy." },
  { name: "Fenugreek", dose: "675 mg", desc: "Researched for hormonal support and cognitive endurance." },
  { name: "Taurine", dose: "675 mg", desc: "Studied for reducing oxidative stress and supporting neural function." },
];

/* NEW §B – RESEARCH CITATIONS */
/* <!-- ASSET TODO: Verify each citation against original source before publishing --> */
const RESEARCH_CITATIONS = [
  {
    ingredient: "Bacopa Monnieri",
    finding: "Measurable memory improvements after 12 weeks of supplementation.",
    citation: "Stough et al., Psychopharmacology, 2001; Calabrese et al., Journal of Alternative and Complementary Medicine, 2008.",
    relevance: "Genius Mind contains Bacopa Monnieri 11:1 at 80mg \u2014 a high-ratio extract studied for memory consolidation.",
  },
  {
    ingredient: "Ginkgo Biloba",
    finding: "Measurable increases in cerebral blood flow following administration.",
    citation: "Mashayekh et al., Neuroradiology, 2011.",
    relevance: "Genius Mind contains Ginkgo Biloba 50:1 at 120mg \u2014 researched for cerebral blood flow and oxygen delivery.",
  },
  {
    ingredient: "L-Tyrosine",
    finding: "Supports cognitive performance during demanding tasks and stressful conditions.",
    citation: "Deijen & Orlebeke, Brain Research Bulletin, 1994; multiple subsequent studies.",
    relevance: "Genius Mind contains L-Tyrosine at 100mg \u2014 studied as a dopamine precursor for focus under stress.",
  },
];

/* §18 – FORMULATION POINTS */
const FORMULATION_POINTS = [
  {
    icon: "\uD83E\uDDEA",
    title: "High-Ratio Extracts",
    subtitle: "Not Cheap Powders",
    desc: "50:1 Ginkgo, 11:1 Bacopa, 20:1 Ginseng. Concentrated botanical extracts for maximum bioavailability and efficacy, not the raw powder fillers found in generic supplements.",
  },
  {
    icon: "\uD83D\uDD2C",
    title: "16 Synergistic Ingredients",
    subtitle: "Full-Spectrum Stack",
    desc: "Your brain runs on multiple neurotransmitter systems simultaneously. Single-ingredient supplements are a band-aid. Genius Mind addresses blood flow, neuron stimulation, and neuron strengthening together.",
  },
  {
    icon: "\uD83D\uDCCA",
    title: "Full Dose Transparency",
    subtitle: "Zero Proprietary Blends",
    desc: "Every ingredient, every dose, clearly listed. No proprietary blends hiding micro-doses behind marketing. You know exactly what you\u2019re putting in your body and why.",
  },
];

/* §20 – FAQS (original 5 + 3 new per brief) */
const FAQS = [
  { q: "What is Genius Mind?", a: "Genius Mind is a cognitive stack with 16 clinically studied ingredients \u2014 including high-ratio botanical extracts, amino acid precursors, and essential cofactors \u2014 designed to support sustained focus throughout the working day. No stimulant dependency, no crashes." },
  { q: "Who is Genius Mind for?", a: "Genius Mind is built for operators, founders, and high-performers who need sustained cognitive output across long working days. If you\u2019re hitting a wall by mid-afternoon, building caffeine tolerance, or making worse decisions later in the day, this is designed for you." },
  { q: "How do I take Genius Mind?", a: "Take 2 capsules daily with breakfast or 30-60 minutes before your most demanding work. Each bottle contains 60 capsules (30 servings). For best results, use consistently for at least 90 days to allow the compound effect to build." },
  { q: "How long until I see results?", a: "Some users report a subtle lift in clarity within the first 1-2 weeks as Guarana and B vitamins take effect. Research suggests the full synergistic stack \u2014 particularly Bacopa and Lion\u2019s Mane \u2014 may reach optimal levels around weeks 4-8. Month 3 is typically when long-term customers report the most significant changes." },
  { q: "Can Genius Mind replace my coffee?", a: "Many customers reduce or eliminate their coffee intake after starting Genius Mind. The Guarana provides clean, sustained energy without the tolerance-building and crash cycle of caffeine. However, Genius Mind is designed to work alongside moderate coffee intake too." },
  { q: "Can I stack Genius Mind with creatine, omega-3, magnesium, or my existing supplement routine?", a: "Yes. Genius Mind is designed as the cognitive chemistry layer on top of an existing operator stack. It doesn\u2019t replace creatine, omega-3, or magnesium \u2014 those address different systems. Common stacks include all four taken at appropriate times." },
  { q: "What happens if I stop taking it?", a: "Genius Mind isn\u2019t habit-forming and doesn\u2019t create withdrawal. The supportive effect on dopamine pathways and synaptic signalling depends on consistent intake \u2014 stop, and the cognitive chemistry support stops. Many long-term customers run it as a permanent part of their stack for that reason." },
  { q: "Is Genius Mind safe for daily, long-term use?", a: "Yes. The formula is non-stimulant-dependent, made in a GMP-certified UK facility, third-party tested, and designed for daily intake. The ingredients are at clinical doses with no tolerance pathway." },
];

/* §21 – STARTER KIT */
/* <!-- TODO: Verify 90-Day Cognitive Blueprint Guide and Operator Performance Tracker exist. If not, mark TO BUILD or remove. --> */
const LAUNCH_KIT = [
  { name: "Genius Mind Cognitive Stack (30-day)", was: "\u00A334.99", now: "\u00A324.99" },
  { name: "90-Day Cognitive Blueprint Guide", was: "\u00A319.99", now: "FREE" },
  { name: "Operator Performance Tracker", was: "\u00A314.99", now: "FREE" },
  { name: "Free UK Shipping", was: "\u00A34.99", now: "FREE" },
  { name: "90-Day Money-Back Guarantee", was: null, now: "INCLUDED" },
];
