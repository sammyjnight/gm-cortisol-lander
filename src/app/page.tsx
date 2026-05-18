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

      {/* ══════════════ HERO ══════════════ */}
      <section className="rock-bg py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div>
              <p className="label-mono text-[#7A9BAD] mb-4">
                16 Clinically Studied Ingredients. One Formula.{" "}
                <span className="text-[#00A6D2]">Zero BS.</span>
              </p>
              <h1 className="font-mono text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight mb-6">
                End The 3PM Cognitive Crash With This{" "}
                <span className="text-[#00A6D2]">Natural Brain Upgrade</span>
              </h1>
              <p className="text-white font-bold text-lg mb-4">
                Your brain isn&apos;t broken &mdash; your neurochemistry is just running on empty.
              </p>
              <p className="text-[#7A9BAD] mb-4 leading-relaxed">
                The neurotransmitters that power your decisions, focus, and clarity
                are the same ones being drained by modern cognitive load &mdash; and never
                replenished.
              </p>
              <p className="text-[#7A9BAD] mb-4 leading-relaxed">
                It&apos;s why you&apos;re sharp at 9am but foggy by 2pm, why the ideas stop
                flowing, and why every decision feels heavier than it should.
              </p>
              <p className="text-white font-semibold mb-2">
                Rebuild your cognitive substrates. Extend your decision window.
              </p>
              <p className="text-white font-semibold mb-8">
                Do that and the fog lifts, while output compounds.
              </p>
              <a href={SHOP_URL} className="cta-btn inline-block">
                TRY IT NOW &rarr;
              </a>
            </div>

            {/* Right: Cognitive comparison image placeholder */}
            <div className="bg-[#0C2A3A] rounded-xl border border-[#1A4459] aspect-square flex items-center justify-center">
              <div className="text-center text-[#7A9BAD] p-8">
                <div className="text-6xl mb-4">&#129504;</div>
                <p className="text-sm">[Depleted Brain vs Optimised Brain comparison image]</p>
                <p className="text-xs mt-2">Replace with your cognitive performance comparison image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ IT'S NOT "JUST BEING BUSY" ══════════════ */}
      <section className="bg-[#041E2B] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Image placeholder */}
            <div className="bg-[#0C2A3A] rounded-xl border border-[#1A4459] aspect-[4/5] flex items-center justify-center">
              <div className="text-center text-[#7A9BAD] p-8">
                <div className="text-6xl mb-4">&#128248;</div>
                <p className="text-sm">[Founder at desk / lifestyle image]</p>
              </div>
            </div>

            {/* Right: Copy */}
            <div>
              <p className="label-mono text-[#00A6D2] mb-2">
                &#9888; Here&apos;s the truth about cognitive decline for operators
              </p>
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                It&apos;s Not &ldquo;Just Being Busy&rdquo;
              </h2>
              <p className="text-white font-bold mb-4">Many operators 30+ end up...</p>
              <div className="space-y-2 mb-6">
                {[
                  { bold: "Losing their sharpest hours", rest: "by early afternoon every single day" },
                  { bold: "Running on caffeine tolerance", rest: "that stopped working months ago" },
                  { bold: "Making worse decisions by 3pm", rest: "than they did at 9am" },
                  { bold: "Sprinting for 3 days, crashing for 2,", rest: "stuck in a boom-bust cycle" },
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
              <p className="text-white mb-4">
                <span className="text-xl">&#128073;</span>{" "}
                <strong>Your sharpest competitor isn&apos;t working harder. They&apos;re operating on better chemistry.</strong>
              </p>
              <p className="text-[#7A9BAD] mb-4">
                This isn&apos;t about willpower &mdash; it&apos;s what happens when dopamine depletes,
                acetylcholine runs dry, and your brain STOPS sustaining the output you
                need.
              </p>
              <p className="text-[#00A6D2] font-bold">
                Your neurochemistry controls your performance.<br />
                Fix the substrate, unlock the output.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ WHY EVERYTHING YOU'VE TRIED DIDN'T WORK ══════════════ */}
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
                <p className="font-bold text-lg mb-4">The cause is substrate depletion.</p>
                <p className="text-gray-700 mb-4">And the reason is simple:</p>
                <p className="font-mono text-[#00A6D2] font-black text-xl uppercase mb-4">
                  Your brain was built for a world that no longer exists.
                </p>
              </div>

              <div>
                <p className="text-gray-700 mb-4">
                  For most of human history, cognitive demand was intermittent.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>A challenge appeared, your brain focused intensely,
                  the challenge passed, neurotransmitters replenished. Clean cycle.
                  Worked perfectly.</strong>
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>But now the demand never stops.</strong>
                </p>
                <p className="text-gray-700 mb-4">
                  Slack notifications. Investor updates. Team decisions. Client calls at
                  5pm. Another Zoom. Then another.
                </p>
                <p className="font-bold mb-4">
                  None of it is life or death. But your neurotransmitters can&apos;t tell
                  the difference...
                </p>
              </div>
            </div>

            <p className="text-gray-700 text-center mb-8">
              And the harder you try to push through without fixing the substrate,
              the more you&apos;re working against yourself:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "More caffeine just builds tolerance faster.",
                  desc: "Your body adapts to stimulants by downregulating adenosine receptors. You need more to feel the same, and the crashes get worse. It's a losing game.",
                },
                {
                  title: "Grinding harder depletes you faster.",
                  desc: "Pushing through cognitive fatigue burns through dopamine and acetylcholine reserves. Operators who go harder during depleted periods make worse decisions, not better ones.",
                },
                {
                  title: "Single-ingredient nootropics can't keep up.",
                  desc: "Taking one compound addresses one pathway. Your brain runs on multiple neurotransmitter systems simultaneously. One ingredient is a band-aid, not a solution.",
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

      {/* ══════════════ FIX THE SUBSTRATE. FREE YOUR COGNITION ══════════════ */}
      <Reveal>
        <section className="bg-[#041E2B] py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Before/After placeholder */}
              <div className="bg-[#0C2A3A] rounded-xl border border-[#1A4459] aspect-[4/3] flex items-center justify-center">
                <div className="text-center text-[#7A9BAD] p-8">
                  <div className="text-6xl mb-4">&#129504;</div>
                  <p className="text-sm">[Before/After: Depleted vs Optimised operator]</p>
                </div>
              </div>
              <div>
                <p className="text-white text-lg leading-relaxed mb-4">
                  The operators who finally break through the ceiling &mdash; who sustain
                  elite output all day instead of crashing by 3pm &mdash; are the ones who
                  fix the neurochemical foundation first.
                </p>
                <p className="text-[#00A6D2] font-bold text-xl mb-2">
                  Fix the substrate. Free your cognition.
                </p>
                <p className="text-white font-bold text-xl">
                  That&apos;s exactly what Genius Mind is built to do.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ SAY NO TO STIMULANT CRASHES ══════════════ */}
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
                  { bold: "Tolerance builds within weeks", rest: "- you need more for less" },
                  { bold: "90-minute spike then a crash", rest: "- your best hours get shorter" },
                  { bold: "Disrupts sleep architecture", rest: "which destroys next-day cognition" },
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
                  { bold: "Single-ingredient formulas", rest: "that can't address multiple pathways" },
                  { bold: "Raw powders instead of extracts", rest: "- no bioavailability, no results" },
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
                <div className="bg-[#0C2A3A] rounded-xl border border-[#1A4459] aspect-square flex items-center justify-center">
                  <div className="text-center text-[#7A9BAD] p-8">
                    <div className="text-6xl mb-4">&#128248;</div>
                    <p className="text-sm">[Operator at desk / workspace image]</p>
                  </div>
                </div>
                <p className="text-[#7A9BAD] text-sm">
                  <span className="text-xl">&#128073;</span> You deserve better than frying your
                  nervous system with stimulants OR wasting money on underdosed single-ingredient
                  pills that don&apos;t address the ROOT of sustained cognitive performance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ COGNITIVE INFRASTRUCTURE ══════════════ */}
      <Reveal>
        <section className="bg-[#041E2B] py-16 md:py-24 border-t border-[#1A4459]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="label-mono text-[#7A9BAD] mb-3">Make the smart choice</p>
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              Cognitive Infrastructure + Real Sustained Output
            </h2>
            <p className="text-[#7A9BAD] mb-6 max-w-2xl mx-auto">
              <span className="text-xl">&#128073;</span> Genius Mind isn&apos;t just another
              nootropic &mdash; it&apos;s a complete cognitive stack that works on FOUR levels:{" "}
              <span className="underline">regulate dopamine at the source</span>,{" "}
              <span className="underline">support acetylcholine for memory</span>,{" "}
              <span className="underline">protect neural architecture</span>, and{" "}
              <span className="underline">sustain blood flow to the brain</span>.
            </p>
            <p className="text-[#7A9BAD] mb-8">
              No crashes, no tolerance, no dependency.
            </p>

            {/* Product image placeholder */}
            <div className="bg-[#0C2A3A] rounded-xl border border-[#1A4459] max-w-md mx-auto aspect-[3/4] flex items-center justify-center mb-8">
              <div className="text-center text-[#7A9BAD] p-8">
                <div className="text-6xl mb-4">&#129514;</div>
                <p className="text-sm">[Genius Mind product bottle image]</p>
              </div>
            </div>

            <p className="text-white text-sm max-w-3xl mx-auto mb-8">
              Genius Mind is a precision-engineered stack of 16 clinically studied
              ingredients &mdash; high-ratio botanical extracts, amino acid precursors,
              and essential cofactors &mdash; designed for 8-12 hours of sustained
              cognitive output. No proprietary blends. No fillers. Every dose
              transparent and clinically backed.
            </p>

            <a href={SHOP_URL} className="cta-btn inline-block">
              TRY IT NOW &rarr;
            </a>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ BENEFITS GRID ══════════════ */}
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

      {/* ══════════════ INGREDIENTS ══════════════ */}
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

      {/* ══════════════ VIDEO TESTIMONIALS ══════════════ */}
      <Reveal>
        <section className="bg-[#041E2B] py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="label-mono text-[#00A6D2] mb-3">
              100,000+ Operators Got Their Edge Back
            </p>
            <h2 className="text-3xl md:text-4xl font-black mb-10">
              What Operators Love About Genius Mind
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {VIDEO_TESTIMONIALS.map((v) => (
                <div
                  key={v.label}
                  className="bg-[#0C2A3A] rounded-xl border border-[#1A4459] aspect-[9/16] flex flex-col items-center justify-center relative overflow-hidden"
                >
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

      {/* ══════════════ PRODUCT SECTION ══════════════ */}
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
                    <p className="text-xs mt-2">Sharpen Focus / Sustain Energy / Boost Memory / Extend Output</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[#00A6D2] text-4xl font-black">4.6/5</div>
                  <p className="text-white text-sm font-bold">from 2,655+ Verified Reviews</p>
                  <p className="text-[#7A9BAD] text-[10px]">
                    *Results may vary. Based on verified customer reviews.
                  </p>
                </div>
              </div>

              {/* Right: Purchase info */}
              <div>
                <h2 className="text-3xl font-black mb-4">Cognitive Infrastructure for Operators</h2>
                <p className="text-white font-bold mb-4">
                  Genius Mind is the most comprehensive natural cognitive stack available.
                  It works four ways: regulates dopamine, supports acetylcholine,
                  protects neural architecture &amp; sustains cerebral blood flow.*
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

      {/* ══════════════ FEATURED IN ══════════════ */}
      <section className="bg-[#041E2B] py-10 border-y border-[#1A4459]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="label-mono text-[#7A9BAD] mb-4">Trusted By Operators At</p>
          <div className="flex justify-center items-center gap-12">
            {["Founders", "CEOs", "Builders"].map((pub) => (
              <span key={pub} className="text-[#7A9BAD] text-xl font-bold italic">
                {pub}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ REVIEW CARDS ══════════════ */}
      <Reveal>
        <section className="bg-[#041E2B] py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-4">
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

      {/* ══════════════ TESTIMONIALS + REVIEWS ══════════════ */}
      <Reveal>
        <section className="rock-bg py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-2">
              See How 100,000+ Operators Are Extending Their Decision Window,{" "}
              <span className="text-[#00A6D2]">and Getting Results That Compound</span>
            </h2>
          </div>

          <div className="max-w-6xl mx-auto px-4 mt-12">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Before/After placeholder */}
              <div className="bg-[#0C2A3A] rounded-xl border border-[#1A4459] aspect-[3/4] flex items-center justify-center">
                <div className="text-center text-[#7A9BAD] p-8">
                  <div className="text-4xl mb-3">&#128248;</div>
                  <p className="text-sm">[BEFORE / AFTER: Cognitive performance improvement]</p>
                </div>
              </div>

              {/* Review cards */}
              <div className="space-y-4">
                {DETAILED_REVIEWS.map((r) => (
                  <div key={r.name} className="bg-[#0F3347] border border-[#1A4459] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white font-semibold text-sm">{r.name}</span>
                      <span className="text-green-500 text-xs">&#10004;</span>
                      <span className="text-[10px] bg-[#00A6D2]/20 text-[#00A6D2] px-2 py-0.5 rounded-full">
                        Verified buyer
                      </span>
                    </div>
                    <div className="text-[#FFD700] text-sm mb-1">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                    <p className="text-white font-bold text-sm mb-1">{r.title}</p>
                    <p className="text-[#7A9BAD] text-sm leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ COMPARISON TABLE ══════════════ */}
      <Reveal>
        <section className="bg-[#041E2B] py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4">
            <p className="label-mono text-[#7A9BAD] text-center mb-3">
              Genius Mind vs Caffeine Stacks vs Generic Nootropics
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-center mb-3">
              How Genius Mind Compares
            </h2>
            <p className="text-[#7A9BAD] text-center mb-10 max-w-xl mx-auto">
              Cognitive infrastructure, not a stimulant hit &mdash; Genius Mind does what others can&apos;t.
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
          </div>
        </section>
      </Reveal>

      {/* ══════════════ GENIUS MIND vs PRESCRIPTION STIMS ══════════════ */}
      <Reveal>
        <section className="rock-bg py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-4">
                  The Genius Mind Difference
                </h2>
                <p className="text-[#7A9BAD] leading-relaxed">
                  Genius Mind is not your typical nootropic.
                  It&apos;s a next-generation, 16-ingredient cognitive stack designed to
                  sustain peak output without the risks, tolerance, or dependency
                  of pharmaceutical stimulants.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1A4459]">
                      <th className="py-3 text-left font-mono uppercase text-xs text-[#7A9BAD]"></th>
                      <th className="py-3 text-center bg-[#00A6D2] text-white font-bold rounded-t-lg">Genius Mind</th>
                      <th className="py-3 text-center text-[#7A9BAD]">Rx Stimulants</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RX_COMPARISON.map((row) => (
                      <tr key={row.label} className="border-b border-[#0F3347]">
                        <td className="py-3 pr-4 font-mono uppercase text-[10px] text-[#7A9BAD] tracking-wider">
                          {row.label}
                        </td>
                        <td className="py-3 text-center bg-[#00A6D2]/10">
                          <span className="text-white text-sm font-semibold flex items-center justify-center gap-1">
                            <span className="text-blue-400">&#10004;</span> {row.gm}
                          </span>
                        </td>
                        <td className="py-3 text-center">
                          <span className="text-[#7A9BAD] text-sm flex items-center justify-center gap-1">
                            <span className="text-red-400">&#10005;</span> {row.rx}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-center mt-10">
              <a href={SHOP_URL} className="cta-btn inline-block">
                TRY IT NOW &rarr;
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ COGNITIVE PERFORMANCE CHART ══════════════ */}
      <Reveal>
        <section className="rock-bg py-16 md:py-24 border-t border-[#1A4459]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-2">
              Genius Mind Extends Your Decision Window{" "}
              <span className="text-[#00A6D2] italic">Naturally</span>
            </h2>

            {/* Chart placeholder */}
            <div className="bg-[#0C2A3A] rounded-xl border border-[#1A4459] p-8 mt-8 mb-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="bg-white rounded-full w-32 h-32 flex flex-col items-center justify-center">
                  <span className="text-[#00A6D2] text-3xl font-black">8-12h</span>
                  <span className="text-black text-xs font-bold">SUSTAINED OUTPUT</span>
                </div>
              </div>
              <p className="text-[#7A9BAD] text-xs">
                [Cognitive performance chart: sustained output across full working day vs caffeine crash curve]
              </p>
            </div>

            <p className="text-white text-sm max-w-3xl mx-auto mb-2">
              Genius Mind supports dopamine regulation, acetylcholine production,
              cerebral blood flow and neural protection across the full working day.
              Most users report feeling a noticeable lift in clarity and sustained
              focus within the first 1-2 weeks.*
            </p>
            <p className="text-[#7A9BAD] text-xs">
              *Based on 2,655+ verified customer reviews.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ WEEKLY TIMELINE ══════════════ */}
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
                  <p className="label-mono text-[#00A6D2] mb-3">Benefits</p>
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
                  <p className="text-[#7A9BAD] text-sm">[{WEEKS[activeWeek].label} illustration + performance chart]</p>
                </div>
              </div>
            </div>

            <p className="text-center text-[#7A9BAD] text-xs mt-4">
              *Based on 2,655+ verified customer reviews.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ DAY 1 / 30 / 90 TIMELINE ══════════════ */}
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
              What Happens After You Start Building Cognitive Infrastructure
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

      {/* ══════════════ 16 INGREDIENTS DETAIL ══════════════ */}
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

      {/* ══════════════ SCIENCE & FORMULATION ══════════════ */}
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

      {/* ══════════════ MONEY BACK GUARANTEE ══════════════ */}
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

      {/* ══════════════ FAQ ══════════════ */}
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

      {/* ══════════════ LAUNCH KIT ══════════════ */}
      <Reveal>
        <section className="rock-bg py-16 md:py-24 border-t border-[#1A4459]">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-12">
              Your Starter Kit <span className="text-[#00A6D2] underline">Includes:</span>
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Bundle image placeholder */}
              <div className="bg-[#0C2A3A] rounded-xl border border-[#1A4459] aspect-square flex items-center justify-center">
                <div className="text-center text-[#7A9BAD] p-8">
                  <div className="text-6xl mb-4">&#127873;</div>
                  <p className="text-sm">[Starter Kit bundle image]</p>
                </div>
              </div>

              {/* Right: Pricing list */}
              <div className="text-left">
                <div className="space-y-4">
                  {LAUNCH_KIT.map((item) => (
                    <div key={item.name} className="flex items-center justify-between border-b border-[#1A4459] pb-3">
                      <span className="text-white font-bold">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[#7A9BAD] line-through text-sm">{item.was}</span>
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
const BENEFITS = [
  { icon: "\u26A1", title: "Sustained Energy", desc: "No more 2pm crash. 8-12 hours of clean output without stimulant spikes." },
  { icon: "\uD83E\uDDE0", title: "Focus & Clarity", desc: "Brain fog gone. Deep work sessions become effortless and consistent." },
  { icon: "\uD83D\uDCA1", title: "Decision Quality", desc: "Sharper calls at 5pm as at 9am. Extend your decision window all day." },
  { icon: "\uD83D\uDCAA", title: "Memory & Recall", desc: "Names, details, strategy. Access what you need, when you need it." },
  { icon: "\uD83D\uDE34", title: "Recovery & Sleep", desc: "No stimulant debt. Wake up restored, cognitively primed for the next day." },
  { icon: "\uD83D\uDEE1\uFE0F", title: "Stress Resilience", desc: "Adaptogens buffer cortisol. Stay composed when pressure peaks." },
];

const INGREDIENTS = [
  { name: "L-Tyrosine", dose: "100 mg", desc: "Dopamine precursor. Sustains motivation, focus, and drive under pressure." },
  { name: "Ginkgo Biloba", dose: "120 mg (50:1)", desc: "Drives cerebral blood flow and oxygen delivery to the brain." },
  { name: "Bacopa Monnieri", dose: "80 mg (11:1)", desc: "Supports memory consolidation, retention, and learning speed." },
  { name: "Lion's Mane", dose: "80 mg (4:1)", desc: "NGF support. Builds and repairs neural pathways over time." },
  { name: "Panax Ginseng", dose: "100 mg (20:1)", desc: "Adaptogen for stress resilience and sustained mental stamina." },
  { name: "L-Choline", dose: "100 mg", desc: "Acetylcholine precursor. Powers memory, learning, and mental clarity." },
  { name: "Guarana Seed", dose: "90 mg", desc: "Natural sustained energy without jitters or crash." },
  { name: "Fenugreek", dose: "675 mg", desc: "Supports hormonal balance and cognitive endurance." },
];

const TRUST_BADGES = [
  { icon: "\uD83C\uDFED", label: "GMP Certified Facility" },
  { icon: "\uD83D\uDD2C", label: "Lab Tested" },
  { icon: "\uD83C\uDDEC\uD83C\uDDE7", label: "Made in UK" },
  { icon: "\uD83C\uDF3F", label: "100% Vegan" },
  { icon: "\uD83D\uDEAB", label: "Non-GMO" },
  { icon: "\uD83C\uDF3E", label: "Gluten Free" },
];

const VIDEO_TESTIMONIALS = [
  { label: "Fog Has Lifted", caption: "THE 3PM SLUMP IS COMPLETELY GONE." },
  { label: "Better Than Coffee", caption: "REDUCED FROM 4 COFFEES TO ZERO." },
  { label: "6 Months Strong", caption: "MY DECISION QUALITY HAS TRANSFORMED." },
  { label: "First Thing That Worked", caption: "TRIED EVERYTHING. THIS IS THE ONE." },
];

const PRODUCT_BULLETS = [
  "16 clinically studied ingredients with high-ratio botanical extracts",
  "78% of customers rated 5 stars from 2,655+ verified reviews",
  'Zero fillers or "proprietary" blends - every dose transparent',
  "Made in UK, GMP certified, and lab tested",
  "90-day 100% money-back guarantee, no questions asked*",
];

const MINI_REVIEWS = [
  "The fog has lifted completely. I used to hit a wall at 2pm every day, now I'm sharp right through to 6pm. My team has noticed the difference in my decision-making.",
  "Better than coffee, better than modafinil, and no crash. I'm 3 months in and my output has never been more consistent. Game changer.",
  "I was skeptical about another nootropic but this one actually works. My recall is sharper, I'm sleeping better, and the compound effect is real.",
  "Dropped from 4 coffees a day to one. My mornings are cleaner, my afternoons don't collapse, and I genuinely feel like I'm operating at a higher level.",
];

const DETAILED_REVIEWS = [
  {
    name: "Mark D.",
    title: "Fog Has Lifted. Output is Consistent.",
    text: "I've tried L-Theanine, individual nootropics, caffeine protocols - nothing stuck. After 6 weeks on Genius Mind the difference is undeniable. I'm making better calls at 5pm than I used to at 10am. My team has started commenting on it. This isn't a hack, it's infrastructure.",
  },
  {
    name: "Sarah K.",
    title: "The 3pm Slump Is Gone",
    text: "As a founder running a 12-person agency, I can't afford brain fog. Genius Mind eliminated my afternoon crash completely. I'm 4 months in and the compound effect is real - my memory, focus, and stress tolerance are all noticeably better.",
  },
  {
    name: "James T.",
    title: "First Thing That Actually Worked",
    text: "I've spent thousands on productivity tools, coaches, and supplements. This is the first thing that actually shifted the underlying issue. My decision stamina has extended by hours, not minutes.",
  },
];

const COMPARISON = [
  { label: "Supports Dopamine Regulation", caff: "x", generic: "?" },
  { label: "No Crash or Withdrawal", caff: "x", generic: "?" },
  { label: "Sustains Full-Day Output", caff: "x", generic: "x" },
  { label: "Supports Neural Architecture", caff: "x", generic: "?" },
  { label: "Tolerance Doesn't Build", caff: "x", generic: "?" },
  { label: "Clinically Dosed Extracts", caff: "x", generic: "x" },
  { label: "16 Synergistic Ingredients", caff: "x", generic: "x" },
];

const RX_COMPARISON = [
  { label: "Approach", gm: "Natural Support", rx: "Synthetic Stimulation" },
  { label: "Dependency Risk", gm: "None", rx: "High" },
  { label: "Side Effects", gm: "Minimal", rx: "Significant" },
  { label: "Cost", gm: "From £0.48/day", rx: "£100+/month" },
  { label: "Prescription", gm: "Not Required", rx: "Required" },
  { label: "Tolerance", gm: "Doesn't Build", rx: "Builds Rapidly" },
  { label: "Sleep Impact", gm: "Supports Sleep", rx: "Disrupts Sleep" },
  { label: "Reversibility", gm: "Stop Anytime", rx: "Withdrawal Effects" },
];

const WEEKS = [
  {
    label: "Week 1-2",
    title: "Activation",
    subtitle: "Guarana and B vitamins are active from day one. Your body begins processing the stack.",
    benefits: [
      "Subtle lift in daily clarity and alertness",
      "Slight improvements in mood and motivation as pathways activate",
      "Some users notice cleaner energy without caffeine dependency",
      "Your brain is beginning to build the foundation for sustained output",
    ],
  },
  {
    label: "Week 3-4",
    title: "Foundation",
    subtitle: "L-Tyrosine and Bacopa reach effective levels. The afternoon starts to hold.",
    benefits: [
      "The 3pm drop begins to flatten noticeably",
      "Focus sessions extend without forcing them",
      "Memory recall starts improving",
      "Decision quality stays more consistent throughout the day",
    ],
  },
  {
    label: "Week 5-6",
    title: "Momentum",
    subtitle: "Lion's Mane neural maintenance kicks in. Sprint-crash cycles start breaking.",
    benefits: [
      "Consistent baseline replaces boom-bust output",
      "Deep work becomes more accessible and natural",
      "Stress resilience noticeably improved",
      "Others start noticing your sustained sharpness",
    ],
  },
  {
    label: "Week 7-8",
    title: "Acceleration",
    subtitle: "Full synergistic effect engaging. Output becoming reliably high.",
    benefits: [
      "Major improvements in sustained concentration",
      "Executive function and planning sharper",
      "Energy consistent from morning to evening",
      "Confidence in cognitive endurance at peak",
    ],
  },
  {
    label: "Week 9-10",
    title: "Compound Effect",
    subtitle: "Memory, executive function, and decision stamina strengthening together.",
    benefits: [
      "Dramatic improvement in recall and working memory",
      "Creative problem-solving noticeably enhanced",
      "Recovery between demanding sessions faster",
      "Colleagues and team members notice the difference",
    ],
  },
  {
    label: "Week 11-12",
    title: "Breakthrough",
    subtitle: "This is the breakthrough month. Full cognitive infrastructure established.",
    benefits: [
      "All 16 ingredients operating synergistically",
      "Cognitive output optimised across full day",
      "Not temporary - this is becoming your new baseline",
      "Welcome to how your brain was meant to perform",
    ],
  },
  {
    label: "Month 6+",
    title: "New Baseline",
    subtitle: "Sustained results. Cognition is no longer something you manage - it just works.",
    benefits: [
      "New cognitive baseline fully established",
      "Neural architecture strengthened long-term",
      "Performance feels natural and effortless",
      "Ongoing protection and optimisation with continued use",
    ],
  },
];

const TIMELINE = [
  {
    day: "1",
    title: "Activation",
    emoji: "\u26A1",
    items: [
      "Guarana and B vitamins provide immediate lift",
      "L-Tyrosine begins supporting dopamine pathways",
      "Clarity feels subtly cleaner from day one",
      "The cognitive foundation starts building",
    ],
  },
  {
    day: "30",
    title: "The Hold",
    emoji: "\uD83D\uDCA5",
    items: [
      "The 3pm crash starts flattening",
      "Bacopa and Lion's Mane reach effective levels",
      "Focus extends naturally, less forced",
      "People notice you're sharper, more present",
    ],
  },
  {
    day: "90",
    title: "Breakthrough",
    emoji: "\uD83D\uDE80",
    items: [
      "All 16 ingredients working synergistically",
      "Decision stamina extends across the full day",
      "Not a supplement effect - it's your new baseline",
      "Cognitive infrastructure, fully built",
    ],
  },
];

const INGREDIENTS_DETAIL = [
  { name: "L-Tyrosine", dose: "100 mg", desc: "Dopamine precursor that sustains motivation, focus, and drive under cognitive pressure." },
  { name: "Ginkgo Biloba", dose: "120 mg (50:1)", desc: "High-ratio extract that drives cerebral blood flow and oxygen delivery to the brain." },
  { name: "Bacopa Monnieri", dose: "80 mg (11:1)", desc: "Supports memory consolidation, retention, and accelerated learning." },
  { name: "Lion's Mane", dose: "80 mg (4:1)", desc: "NGF (Nerve Growth Factor) support for neural pathway growth and maintenance." },
  { name: "Phosphatidylserine", dose: "35 mg", desc: "Maintains brain cell membrane integrity for optimal signal transmission." },
  { name: "B12 (Methylcobalamin)", dose: "500\u03BCg", desc: "Essential for neurotransmitter synthesis. Most adults are deficient." },
  { name: "Panax Ginseng", dose: "100 mg (20:1)", desc: "Adaptogen that buffers stress and sustains mental stamina under pressure." },
  { name: "L-Choline", dose: "100 mg", desc: "Acetylcholine precursor powering memory, learning, and mental clarity." },
  { name: "Guarana Seed", dose: "90 mg", desc: "Natural sustained energy release without jitters or afternoon crash." },
  { name: "Sage Leaf", dose: "75 mg (4:1)", desc: "Supports memory retention and cognitive enhancement across the day." },
  { name: "Rosemary", dose: "20 mg (5:1)", desc: "Neuroprotective compound that supports long-term brain health." },
  { name: "Vitamin B6", dose: "10 mg", desc: "Critical cofactor for neurotransmitter synthesis including serotonin and dopamine." },
  { name: "Zinc", dose: "10 mg", desc: "Supports cognitive function, learning, and synaptic signalling." },
  { name: "Niacin (B3)", dose: "32 mg", desc: "Supports NAD+ production for cellular energy and mitochondrial function." },
  { name: "Fenugreek", dose: "675 mg", desc: "Supports hormonal balance, cognitive endurance, and metabolic function." },
  { name: "Taurine", dose: "675 mg", desc: "Reduces oxidative stress and supports healthy neural function during demanding work." },
];

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
    desc: "Your brain runs on multiple neurotransmitter systems simultaneously. Single-ingredient supplements are a band-aid. Genius Mind addresses dopamine, acetylcholine, blood flow, and neural protection together.",
  },
  {
    icon: "\uD83D\uDCCA",
    title: "Full Dose Transparency",
    subtitle: "Zero Proprietary Blends",
    desc: "Every ingredient, every dose, clearly listed. No proprietary blends hiding micro-doses behind marketing. You know exactly what you're putting in your body and why.",
  },
];

const FAQS = [
  { q: "What is Genius Mind?", a: "Genius Mind is a premium cognitive stack with 16 clinically studied ingredients - including high-ratio botanical extracts, amino acid precursors, and essential cofactors - designed to sustain peak mental output for 8-12 hours. No stimulant dependency, no crashes." },
  { q: "Who is Genius Mind for?", a: "Genius Mind is built for operators, founders, and high-performers who need sustained cognitive output across long working days. If you're hitting a 3pm wall, building caffeine tolerance, or making worse decisions by late afternoon, this is designed for you." },
  { q: "How do I take Genius Mind?", a: "Take 2 capsules daily with breakfast or 30-60 minutes before your most demanding work. Each bottle contains 60 capsules (30 servings). For best results, use consistently for at least 90 days to allow the compound effect to build." },
  { q: "How long until I see results?", a: "Most users report a subtle lift in clarity within the first 1-2 weeks as Guarana and B vitamins take effect. The real transformation happens around weeks 4-8 as Bacopa, Lion's Mane, and the full synergistic stack reaches optimal levels. Month 3 is typically the breakthrough month." },
  { q: "Can Genius Mind replace my coffee?", a: "Many customers reduce or eliminate their coffee intake after starting Genius Mind. The Guarana provides clean, sustained energy without the tolerance-building and crash cycle of caffeine. However, Genius Mind is designed to work alongside moderate coffee intake too." },
];

const LAUNCH_KIT = [
  { name: "Genius Mind Cognitive Stack (30-day)", was: "\u00A334.99", now: "\u00A324.99" },
  { name: "90-Day Cognitive Blueprint Guide", was: "\u00A319.99", now: "FREE" },
  { name: "Operator Performance Tracker", was: "\u00A314.99", now: "FREE" },
  { name: "Free UK Shipping", was: "\u00A34.99", now: "FREE" },
  { name: "90-Day Money-Back Guarantee", was: "\u2014", now: "INCLUDED" },
];
