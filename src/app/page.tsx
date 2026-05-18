"use client";

import { useEffect, useRef, useState } from "react";

/* ───────── constants ───────── */
const SHOP_URL = "https://mengotomars.com/products/natural-testosterone-support";

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
export default function CortisolLander() {
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
      <header className="bg-[#0a0a0a] border-b border-[#262626] py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <a href={SHOP_URL} className="flex items-center gap-2">
            <span className="text-white font-black text-xl tracking-[0.3em] font-mono">
              MARS MEN
            </span>
            <span className="w-3 h-3 rounded-full bg-[#ff5600] inline-block" />
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-[#a3a3a3]">
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
              <p className="label-mono text-[#a3a3a3] mb-4">
                8 Ingredients. One Formula.{" "}
                <span className="text-[#ff5600]">Zero BS.</span>
              </p>
              <h1 className="font-mono text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight mb-6">
                Crush Cortisol Belly With This{" "}
                <span className="text-[#ff5600]">Natural T Upgrade</span>
              </h1>
              <p className="text-white font-bold text-lg mb-4">
                Your metabolism&apos;s not broken &mdash; your cortisol&apos;s just running
                the show.
              </p>
              <p className="text-[#a3a3a3] mb-4 leading-relaxed">
                The stress hormone that spikes whenever modern life hits you is the
                same one telling your body to lock belly fat down and never let go.
              </p>
              <p className="text-[#a3a3a3] mb-4 leading-relaxed">
                It&apos;s why the scale won&apos;t move, the diets &ldquo;fail&rdquo;, and why the man
                in the mirror looks softer than the effort you&apos;re putting in.
              </p>
              <p className="text-white font-semibold mb-2">
                Drop your cortisol. Free your testosterone.
              </p>
              <p className="text-white font-semibold mb-8">
                Do that and the belly disappears, while energy skyrockets.
              </p>
              <a href={SHOP_URL} className="cta-btn inline-block">
                TRY IT NOW &rarr;
              </a>
            </div>

            {/* Right: High/Low Cortisol Image placeholder */}
            <div className="bg-[#141414] rounded-xl border border-[#262626] aspect-square flex items-center justify-center">
              <div className="text-center text-[#737373] p-8">
                <div className="text-6xl mb-4">🧬</div>
                <p className="text-sm">[High Cortisol vs Low Cortisol comparison image]</p>
                <p className="text-xs mt-2">Replace with your product/body comparison image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ IT'S NOT JUST GETTING OLDER ══════════════ */}
      <section className="bg-[#0a0a0a] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Image placeholder */}
            <div className="bg-[#141414] rounded-xl border border-[#262626] aspect-[4/5] flex items-center justify-center">
              <div className="text-center text-[#737373] p-8">
                <div className="text-6xl mb-4">📸</div>
                <p className="text-sm">[Lifestyle image]</p>
              </div>
            </div>

            {/* Right: Copy */}
            <div>
              <p className="label-mono text-[#ff5600] mb-2">
                &#9888; Here&apos;s the truth about weight loss for men over 30
              </p>
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                It&apos;s Not &ldquo;Just Getting Older&rdquo;
              </h2>
              <p className="text-white font-bold mb-4">Many guys 30+ end up...</p>
              <div className="space-y-2 mb-6">
                {[
                  { bold: "Unable to lose belly fat", rest: "no matter how clean they eat" },
                  { bold: "With a metabolism that's shut down", rest: "from years of crash diets" },
                  { bold: "Carrying 20-40 extra pounds", rest: "they can't seem to shake" },
                  { bold: "Exhausted from 2pm onward,", rest: "no energy to work out" },
                ].map((item) => (
                  <div key={item.bold} className="warning-box flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">&#9888;</span>
                    <p className="text-white text-sm">
                      <strong>{item.bold}</strong>{" "}
                      <span className="text-[#a3a3a3]">{item.rest}</span>
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-white mb-4">
                <span className="text-xl">&#128073;</span>{" "}
                <strong>Your grandfather likely had higher T at 60 than you do at 40.</strong>
              </p>
              <p className="text-[#a3a3a3] mb-4">
                This isn&apos;t aging &mdash; it&apos;s what happens when plastics mimic estrogen,
                stress spikes cortisol, and your body STOPS burning fat efficiently.
              </p>
              <p className="text-[#ff5600] font-bold">
                Your hormones control your metabolism.<br />
                Fix the hormone, burn the fat.
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
                  Every diet and training program you&apos;ve tried attacked the symptom.
                  None of them went after the cause.
                </p>
                <p className="font-bold text-lg mb-4">The cause is cortisol.</p>
                <p className="text-gray-700 mb-4">And the reason is simple:</p>
                <p className="font-mono text-[#ff5600] font-black text-xl uppercase mb-4">
                  Your body was built for a world that no longer exists.
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
                  Deadlines. The mortgage. The kids&apos; schedules. Your boss at 10pm.
                  Another notification. Then another.
                </p>
                <p className="font-bold mb-4">
                  None of it is life or death. But your nervous system can&apos;t tell
                  the difference...
                </p>
              </div>
            </div>

            <p className="text-gray-700 text-center mb-8">
              And the harder you try to lose weight without addressing cortisol first,
              the more you&apos;re working against yourself:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Aggressive calorie restriction spikes cortisol further.",
                  desc: 'Your body reads a severe calorie deficit as a threat and responds by elevating cortisol and locking abdominal fat down as a to "make sure you survive".',
                },
                {
                  title: "Hard training without addressing cortisol adds fuel to the fire.",
                  desc: "High-intensity exercise done while cortisol is already elevated pushes it even higher. Men who go harder during stressful periods often look worse, not better.",
                },
                {
                  title: "Stimulant fat burners work by triggering cortisol.",
                  desc: "The temporary energy and appetite suppression come from spiking your stress hormones.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-[#fff5f0] rounded-lg p-6 border border-[#ffe0d0]"
                >
                  <p className="font-bold text-sm mb-2">{item.title}</p>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ FIX CORTISOL. FREE TESTOSTERONE ══════════════ */}
      <Reveal>
        <section className="bg-[#0a0a0a] py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Before/After placeholder */}
              <div className="bg-[#141414] rounded-xl border border-[#262626] aspect-[4/3] flex items-center justify-center">
                <div className="text-center text-[#737373] p-8">
                  <div className="text-6xl mb-4">👤</div>
                  <p className="text-sm">[Before/After transformation image]</p>
                </div>
              </div>
              <div>
                <p className="text-white text-lg leading-relaxed mb-4">
                  The men who finally crack the code &mdash; who lose the belly after years
                  of nothing working &mdash; are the ones who get the hormonal environment
                  right first.
                </p>
                <p className="text-[#ff5600] font-bold text-xl mb-2">
                  Fix cortisol. Free testosterone.
                </p>
                <p className="text-white font-bold text-xl">
                  That&apos;s exactly what Mars Men is built to do.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ SAY NO TO STIMULANTS ══════════════ */}
      <Reveal>
        <section className="bg-[#0a0a0a] py-16 md:py-24 border-t border-[#262626]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <p className="label-mono text-[#ff5600] mb-2">
                  &#10067; And what about other options?
                </p>
                <h2 className="text-3xl md:text-4xl font-black mb-8">
                  Say No to Stimulant Crashes &amp; Fat Burner Snake Oil
                </h2>

                <h3 className="text-white font-bold mb-3">
                  Stimulant-Based Fat Burners:
                </h3>
                {[
                  { bold: "Heart racing, jitters, anxiety", rest: "- then a brutal crash" },
                  { bold: "Only work while you're taking them", rest: "- stop and rebound fast" },
                  { bold: "Damage your metabolism long-term", rest: "with constant stimulation" },
                ].map((item) => (
                  <div key={item.bold} className="red-x-item">
                    <span className="text-red-500 font-bold">&#10005;</span>
                    <p className="text-white text-sm">
                      <strong>{item.bold}</strong>{" "}
                      <span className="text-[#a3a3a3]">{item.rest}</span>
                    </p>
                  </div>
                ))}

                <h3 className="text-white font-bold mt-6 mb-3">
                  Legacy &ldquo;Testosterone Boosters&rdquo;:
                </h3>
                {[
                  { bold: "Proprietary blends hide", rest: "worthless dosages" },
                  { bold: "Dated formulas", rest: "with ingredients that don't work" },
                  { bold: "Just expensive pee", rest: "- no actual hormonal impact" },
                ].map((item) => (
                  <div key={item.bold} className="red-x-item">
                    <span className="text-red-500 font-bold">&#10005;</span>
                    <p className="text-white text-sm">
                      <strong>{item.bold}</strong>{" "}
                      <span className="text-[#a3a3a3]">{item.rest}</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Right: Image placeholder */}
              <div className="flex flex-col gap-6">
                <div className="bg-[#141414] rounded-xl border border-[#262626] aspect-square flex items-center justify-center">
                  <div className="text-center text-[#737373] p-8">
                    <div className="text-6xl mb-4">📸</div>
                    <p className="text-sm">[Lifestyle/kitchen image]</p>
                  </div>
                </div>
                <p className="text-[#a3a3a3] text-sm">
                  <span className="text-xl">&#128073;</span> You deserve better than frying your nervous
                  system with stimulants OR wasting money on underdosed garbage that
                  doesn&apos;t address the ROOT of optimal fat burning.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ NATURAL HORMONE SUPPORT ══════════════ */}
      <Reveal>
        <section className="bg-[#0a0a0a] py-16 md:py-24 border-t border-[#262626]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="label-mono text-[#a3a3a3] mb-3">Make the smart choice</p>
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              Natural Hormone Support + Real Fat Loss
            </h2>
            <p className="text-[#a3a3a3] mb-6 max-w-2xl mx-auto">
              <span className="text-xl">&#128073;</span> Mars Men isn&apos;t just another fat burner &mdash;
              it&apos;s a complete hormonal stack that works on FOUR levels:{" "}
              <span className="underline">make more testosterone</span>,{" "}
              <span className="underline">free the T you already have</span>,{" "}
              <span className="underline">protect it</span>, and{" "}
              <span className="underline">optimize it for optimal fat-burning</span>.
            </p>
            <p className="text-[#a3a3a3] mb-8">
              No needles, prescriptions, or dependency.
            </p>

            {/* Product image placeholder */}
            <div className="bg-[#141414] rounded-xl border border-[#262626] max-w-md mx-auto aspect-[3/4] flex items-center justify-center mb-8">
              <div className="text-center text-[#737373] p-8">
                <div className="text-6xl mb-4">🧴</div>
                <p className="text-sm">[Mars Men product bottle image]</p>
              </div>
            </div>

            <p className="text-white text-sm max-w-3xl mx-auto mb-8">
              Natural Testosterone Support is a unique blend of natural herbs and minerals
              that are scientifically proven to support healthy testosterone levels and
              overall well-being. Most testosterone-enhancing supplements do not contain
              proper dosages. At Mars Men, we utilize clinical doses of each ingredient
              to support powerful results.
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
                  <div className="text-[#ff5600] text-3xl mb-3">{b.icon}</div>
                  <h3 className="label-mono text-white font-bold mb-2">{b.title}</h3>
                  <p className="text-[#a3a3a3] text-sm">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ INGREDIENTS ══════════════ */}
      <Reveal>
        <section id="ingredients" className="bg-[#0a0a0a] py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="label-mono text-[#a3a3a3] mb-3">Ingredients</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Fuel Your Body the Clean Way
            </h2>
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {["No proprietary blends", "No fillers", "No synthetic hormones", "No BS", "No cheap powders"].map((item) => (
                <div key={item} className="text-center">
                  <div className="text-[#ff5600] text-xl mb-1">&#10005;</div>
                  <p className="text-[#a3a3a3] text-xs">{item}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {INGREDIENTS.map((ing) => (
                <div key={ing.name} className="ingredient-card text-left">
                  <h4 className="font-mono text-white font-bold text-lg uppercase tracking-wider mb-1">
                    {ing.name}
                  </h4>
                  <div className="inline-block border border-[#737373] rounded px-2 py-0.5 text-xs text-[#a3a3a3] font-mono mb-2">
                    {ing.dose}
                  </div>
                  <p className="text-[#a3a3a3] text-xs leading-relaxed">{ing.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ TRUST BADGES ══════════════ */}
      <section className="bg-[#0a0a0a] border-y border-[#262626] py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-x-10 gap-y-4 text-center">
          {TRUST_BADGES.map((b) => (
            <div key={b.label}>
              <div className="text-2xl mb-1">{b.icon}</div>
              <p className="label-mono text-[#a3a3a3] text-[10px]">{b.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ VIDEO TESTIMONIALS ══════════════ */}
      <Reveal>
        <section className="bg-[#0a0a0a] py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="label-mono text-[#ff5600] mb-3">
              429,576+ Men Got Their Edge Back
            </p>
            <h2 className="text-3xl md:text-4xl font-black mb-10">
              What Guys Love about Mars Men
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {VIDEO_TESTIMONIALS.map((v) => (
                <div
                  key={v.label}
                  className="bg-[#141414] rounded-xl border border-[#262626] aspect-[9/16] flex flex-col items-center justify-center relative overflow-hidden"
                >
                  <div className="absolute top-3 left-3 right-3">
                    <span className="label-mono bg-[#ff5600] text-white px-3 py-1 rounded text-[10px] font-bold">
                      {v.label}
                    </span>
                  </div>
                  <div className="text-5xl text-[#737373]">&#9654;</div>
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
              <div className="bg-[#141414] rounded-2xl border border-[#262626] p-8 flex flex-col items-center">
                <div className="bg-[#1a1a1a] rounded-xl w-full aspect-square flex items-center justify-center mb-6">
                  <div className="text-center text-[#737373]">
                    <div className="text-6xl mb-4">🧴</div>
                    <p className="text-sm">[Product image with benefits callouts]</p>
                    <p className="text-xs mt-2">Skyrocket Energy / Supercharge Strength / Enhance Focus / Amplify Passion</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[#ff5600] text-4xl font-black">91%</div>
                  <p className="text-white text-sm font-bold">of Users Reported Higher Energy Levels*</p>
                  <p className="text-[#737373] text-[10px]">
                    *Results may vary. Based on survey of 1,000 Actual Mars Men customers.
                  </p>
                </div>
              </div>

              {/* Right: Purchase info */}
              <div>
                <h2 className="text-3xl font-black mb-4">Natural Testosterone Support</h2>
                <p className="text-white font-bold mb-4">
                  Mars Men is the most potent and natural testosterone stack on earth.
                  It works four ways: produces, frees, protects &amp; optimizes testosterone.*
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
                  <span className="text-3xl font-black text-white">&pound;54</span>
                  <span className="text-[#737373] line-through text-lg">&pound;107</span>
                  <span className="label-mono text-[#ff5600] font-bold">50% Off For Life</span>
                </div>

                <a href={SHOP_URL} className="cta-btn mb-4">
                  TRY IT NOW &rarr;
                </a>

                <div className="flex justify-center gap-8 text-center text-xs text-[#a3a3a3] mb-6">
                  <div>
                    <div className="text-lg mb-1">&#128230;</div>
                    <p>$59 Refill Ships<br />in 30 Days</p>
                  </div>
                  <div>
                    <div className="text-lg mb-1">&#128640;</div>
                    <p>Try Risk-Free for 90 Days<br />or 100% Money Back</p>
                  </div>
                  <div>
                    <div className="text-lg mb-1">&#128666;</div>
                    <p>Fast &amp; Free Shipping<br />with 1st Order</p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="label-mono text-[#ff5600] font-bold mb-3">Your Free Gifts</p>
                  <div className="flex justify-center gap-4">
                    {["Travel Tin", "Testosterone E-Book", "Month of Ladder Workout App", "Apple Watch Ultra 3.0"].map((gift, i) => (
                      <div key={gift} className="text-center">
                        <div className="w-16 h-16 bg-[#1a1a1a] rounded-lg border border-[#262626] flex items-center justify-center mb-1">
                          <span className="text-[10px] text-[#ff5600] font-bold">
                            {i < 3 ? `FREE $${[10, 20, 30][i]}` : "CHANCE TO WIN"}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#ff5600]">{gift}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ FEATURED IN ══════════════ */}
      <section className="bg-[#0a0a0a] py-10 border-y border-[#262626]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="label-mono text-[#a3a3a3] mb-4">Featured In</p>
          <div className="flex justify-center items-center gap-12">
            {["GQ", "Men's Health", "Forbes"].map((pub) => (
              <span key={pub} className="text-[#737373] text-xl font-bold italic">
                {pub}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ REVIEW CARDS ══════════════ */}
      <Reveal>
        <section className="bg-[#0a0a0a] py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-4">
              {MINI_REVIEWS.map((r, i) => (
                <div key={i} className="bg-[#1a1a1a] border border-[#262626] rounded-xl p-5">
                  <div className="text-[#ff5600] text-sm mb-2">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <p className="text-white text-sm leading-relaxed">&ldquo;{r}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ BEFORE/AFTER + REVIEWS ══════════════ */}
      <Reveal>
        <section className="rock-bg py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-2">
              See How 429,576+ Men Over 30 are Burning Fat, Building Strength,{" "}
              <span className="text-[#ff5600]">and Getting Results That Show</span>
            </h2>
          </div>

          <div className="max-w-6xl mx-auto px-4 mt-12">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Before/After placeholder */}
              <div className="bg-[#141414] rounded-xl border border-[#262626] aspect-[3/4] flex items-center justify-center">
                <div className="text-center text-[#737373] p-8">
                  <div className="text-4xl mb-3">📸</div>
                  <p className="text-sm">[BEFORE / AFTER transformation photo]</p>
                </div>
              </div>

              {/* Review cards */}
              <div className="space-y-4">
                {DETAILED_REVIEWS.map((r) => (
                  <div key={r.name} className="bg-[#1a1a1a] border border-[#262626] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white font-semibold text-sm">{r.name}</span>
                      <span className="text-green-500 text-xs">&#10004;</span>
                      <span className="text-[10px] bg-[#ff5600]/20 text-[#ff5600] px-2 py-0.5 rounded-full">
                        Verified buyer
                      </span>
                    </div>
                    <div className="text-[#ff5600] text-sm mb-1">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                    <p className="text-white font-bold text-sm mb-1">{r.title}</p>
                    <p className="text-[#a3a3a3] text-sm leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ COMPARISON TABLE ══════════════ */}
      <Reveal>
        <section className="bg-[#0a0a0a] py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4">
            <p className="label-mono text-[#a3a3a3] text-center mb-3">
              Mars Men vs Stimulant Fat Burners vs Legacy Boosters
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-center mb-3">
              How Mars Men Compares
            </h2>
            <p className="text-[#a3a3a3] text-center mb-10 max-w-xl mx-auto">
              Natural support, no shutdown, no dependency &mdash; Mars Men does what others can&apos;t.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#262626]">
                    <th className="py-3 text-left text-[#737373] font-mono uppercase text-xs"></th>
                    <th className="py-3 text-center text-white font-bold">Mars Men</th>
                    <th className="py-3 text-center text-[#a3a3a3]">Stimulant Fat Burners</th>
                    <th className="py-3 text-center text-[#a3a3a3]">Legacy Boosters</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.label} className="border-b border-[#1a1a1a]">
                      <td className="py-4 pr-4 font-mono uppercase text-xs text-[#a3a3a3] tracking-wider">
                        {row.label}
                      </td>
                      <td className="py-4 text-center text-2xl text-green-500">&#9989;</td>
                      <td className="py-4 text-center text-2xl">
                        {row.stim === "x" ? <span className="text-red-500">&#10060;</span> : <span className="text-red-400">&#10067;</span>}
                      </td>
                      <td className="py-4 text-center text-2xl">
                        {row.legacy === "x" ? <span className="text-red-500">&#10060;</span> : <span className="text-red-400">&#10067;</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ MARS MEN vs TRT ══════════════ */}
      <Reveal>
        <section className="rock-bg py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-4">
                  The Mars Men Difference
                </h2>
                <p className="text-[#a3a3a3] leading-relaxed">
                  Natural Testosterone Support is not your typical T Booster.
                  It&apos;s a next-generation and natural formula designed to support
                  hormone optimization without the risks and commitment of TRT.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#262626]">
                      <th className="py-3 text-left font-mono uppercase text-xs text-[#737373]"></th>
                      <th className="py-3 text-center bg-[#ff5600] text-white font-bold rounded-t-lg">Mars Men</th>
                      <th className="py-3 text-center text-[#a3a3a3]">TRT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRT_COMPARISON.map((row) => (
                      <tr key={row.label} className="border-b border-[#1a1a1a]">
                        <td className="py-3 pr-4 font-mono uppercase text-[10px] text-[#a3a3a3] tracking-wider">
                          {row.label}
                        </td>
                        <td className="py-3 text-center bg-[#ff5600]/10">
                          <span className="text-white text-sm font-semibold flex items-center justify-center gap-1">
                            <span className="text-blue-400">&#10004;</span> {row.mars}
                          </span>
                        </td>
                        <td className="py-3 text-center">
                          <span className="text-[#a3a3a3] text-sm flex items-center justify-center gap-1">
                            <span className="text-red-400">&#10005;</span> {row.trt}
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

      {/* ══════════════ T CHART ══════════════ */}
      <Reveal>
        <section className="rock-bg py-16 md:py-24 border-t border-[#262626]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-2">
              Mars Men Increases Testosterone Production{" "}
              <span className="text-[#ff5600] italic">Naturally</span>
            </h2>

            {/* Chart placeholder */}
            <div className="bg-[#141414] rounded-xl border border-[#262626] p-8 mt-8 mb-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="bg-white rounded-full w-32 h-32 flex flex-col items-center justify-center">
                  <span className="text-[#ff5600] text-3xl font-black">+60%</span>
                  <span className="text-black text-xs font-bold">INCREASE IN T</span>
                </div>
              </div>
              <p className="text-[#a3a3a3] text-xs">
                [Testosterone increase chart: 500 ng/dL at Week 1 rising to 800 ng/dL by Week 12]
              </p>
            </div>

            <p className="text-white text-sm max-w-3xl mx-auto mb-2">
              Mars Men Natural T supports the optimization of male sex hormones, including
              Total Testosterone, Free Testosterone, Sex Hormone Binding Globulin and more.
              Most users report feeling a difference in energy levels after just a few days
              of taking Natural T Support.*
            </p>
            <p className="text-[#737373] text-xs">
              *Based on 1000 person survey of actual customers.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ WEEKLY TIMELINE ══════════════ */}
      <Reveal>
        <section className="rock-bg py-16 md:py-24 border-t border-[#262626]">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-10">
              What You Might Expect from Daily Use of Mars Men
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

            <div className="bg-[#141414] border border-[#262626] rounded-2xl p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[#ff5600] font-mono text-4xl font-black">
                      0{activeWeek + 1}
                    </span>
                    <h3 className="text-2xl font-black text-white">
                      {WEEKS[activeWeek].title}
                    </h3>
                  </div>
                  <p className="text-white font-bold mb-4">
                    {WEEKS[activeWeek].subtitle}
                  </p>
                  <p className="label-mono text-[#ff5600] mb-3">Benefits</p>
                  <ul className="space-y-2">
                    {WEEKS[activeWeek].benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-[#a3a3a3]">
                        <span className="text-[#ff5600] mt-1">&#8226;</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#1a1a1a] rounded-xl flex items-center justify-center aspect-video">
                  <p className="text-[#737373] text-sm">[Week {WEEKS[activeWeek].label} illustration + T chart]</p>
                </div>
              </div>
            </div>

            <p className="text-center text-[#737373] text-xs mt-4">
              *Based on 1000 person survey of actual customers.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ DAY 1 / 30 / 90 TIMELINE ══════════════ */}
      <Reveal>
        <section className="bg-[#1a1a1a] py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex justify-center gap-4 mb-8">
              {["What to Expect", "Frequently Asked Questions", "Reviews"].map((tab) => (
                <a
                  key={tab}
                  href={tab === "Frequently Asked Questions" ? "#faq" : tab === "Reviews" ? "#reviews-section" : "#"}
                  className="bg-[#262626] text-white px-5 py-3 rounded-lg text-sm font-semibold hover:bg-[#333] transition-colors"
                >
                  {tab}
                </a>
              ))}
            </div>

            <h3 className="text-white font-bold text-lg mb-6">
              What Happens After You Boost Testosterone With Mars Men
            </h3>
            <div className="w-full h-0.5 bg-[#ff5600] mb-8" />

            <div className="grid md:grid-cols-3 gap-8">
              {TIMELINE.map((t) => (
                <div key={t.day}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{t.emoji}</span>
                    <span className="label-mono text-[#ff5600] font-bold">Day {t.day}</span>
                    <span className="text-white font-bold">{t.title}</span>
                  </div>
                  <ul className="space-y-2">
                    {t.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-[#a3a3a3]">
                        <span className="text-[#ff5600] mt-1">&#8226;</span>
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

      {/* ══════════════ 8 INGREDIENTS DETAIL ══════════════ */}
      <Reveal>
        <section className="bg-[#0a0a0a] py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              8 Ingredients in 1 Powerful Formula
            </h2>
            <p className="label-mono text-[#ff5600] mb-10">
              Clinically Dosed + Effective
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {INGREDIENTS_DETAIL.map((ing) => (
                <div key={ing.name} className="ingredient-card text-left">
                  <h4 className="text-white font-bold text-lg mb-1">{ing.name}</h4>
                  <p className="text-[#a3a3a3] text-xs leading-relaxed mb-2">{ing.desc}</p>
                  <div className="inline-block border border-[#737373] rounded px-2 py-0.5 text-xs text-[#a3a3a3] font-mono">
                    {ing.dose}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ MEDICAL ADVISORY BOARD ══════════════ */}
      <Reveal>
        <section className="rock-bg py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-12">
              Meet Our Medical Advisory Board
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {DOCTORS.map((doc) => (
                <div key={doc.name} className="text-center">
                  <div className="advisory-circle flex items-center justify-center mx-auto">
                    <span className="text-3xl">&#129464;</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">{doc.name}</h3>
                  <p className="label-mono text-[#ff5600] text-[10px] mb-3">{doc.title}</p>
                  <p className="text-[#a3a3a3] text-sm leading-relaxed">{doc.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ══════════════ MONEY BACK GUARANTEE ══════════════ */}
      <Reveal>
        <section className="rock-bg py-16 md:py-24 border-t border-[#262626]">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="shrink-0">
                <div className="w-32 h-32 bg-[#ff5600] rounded-full flex items-center justify-center">
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
                  <span className="text-[#ff5600] italic">Or Your Money Back</span>
                </h2>
                <p className="text-[#a3a3a3] leading-relaxed mb-6">
                  We make sure every customer actually gets results or we refund you
                  100% of your investment. We&apos;re so confident you&apos;ll feel the
                  difference with Mars Men that we bear all the risk.
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
      <section id="faq" className="rock-bg py-16 md:py-24 border-t border-[#262626]">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <Reveal key={i}>
                <div className="bg-[#1a1a1a] border border-[#262626] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left p-5 flex items-center justify-between text-white font-bold text-sm uppercase tracking-wider hover:bg-[#262626] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-[#a3a3a3] text-lg transition-transform">
                      {openFaq === i ? "−" : "∨"}
                    </span>
                  </button>
                  <div className={`faq-answer ${openFaq === i ? "open" : ""}`}>
                    <div className="px-5 pb-5 text-sm text-[#a3a3a3] leading-relaxed">
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
        <section className="rock-bg py-16 md:py-24 border-t border-[#262626]">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-12">
              Your Launch Kit <span className="text-[#ff5600] underline">Includes:</span>
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Bundle image placeholder */}
              <div className="bg-[#141414] rounded-xl border border-[#262626] aspect-square flex items-center justify-center">
                <div className="text-center text-[#737373] p-8">
                  <div className="text-6xl mb-4">&#127873;</div>
                  <p className="text-sm">[Launch Kit bundle image]</p>
                </div>
              </div>

              {/* Right: Pricing list */}
              <div className="text-left">
                <div className="space-y-4">
                  {LAUNCH_KIT.map((item) => (
                    <div key={item.name} className="flex items-center justify-between border-b border-[#262626] pb-3">
                      <span className="text-white font-bold">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[#737373] line-through text-sm">{item.was}</span>
                        <span className="text-[#ff5600] font-bold">{item.now}</span>
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
      <footer className="border-t border-[#262626] py-10 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-white font-black text-lg tracking-[0.3em] font-mono">
              MARS MEN
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5600] inline-block" />
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#737373] mb-6">
            <a href={SHOP_URL} className="hover:text-white transition-colors">Shop</a>
            <a href="#ingredients" className="hover:text-white transition-colors">Science</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="mailto:support@mengotomars.com" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-[10px] text-[#404040] max-w-xl mx-auto">
            *These statements have not been evaluated by the FDA/MHRA. This product is
            not intended to diagnose, treat, cure or prevent any disease. Individual
            results may vary.
          </p>
        </div>
      </footer>

      {/* ══════════════ STICKY BUY BAR ══════════════ */}
      <div
        className={`sticky-buy-bar fixed bottom-0 left-0 right-0 bg-[#141414]/95 backdrop-blur-md border-t border-[#262626] py-3 px-4 z-50 ${
          stickyVisible ? "visible" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <div className="text-sm font-bold text-white">
              Mars Men Natural T Support
            </div>
            <div className="text-xs text-[#737373]">
              8 ingredients &bull; 90-day guarantee &bull; 50% off
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <span className="text-white font-bold">&pound;54</span>
              <span className="text-[#737373] line-through text-xs ml-1">&pound;107</span>
            </div>
            <a
              href={SHOP_URL}
              className="bg-[#ff5600] hover:bg-[#e64d00] text-white font-bold py-3 px-6 rounded-lg text-sm transition-colors whitespace-nowrap"
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
  { icon: "⚡", title: "Support Fat Burning", desc: "Helps target belly fat at the hormonal level." },
  { icon: "🔥", title: "Energy & Stamina", desc: "No more 2pm crash. Burn fat AND feel energized." },
  { icon: "💪", title: "Strength & Muscle", desc: "Lose fat, keep (or build) muscle. Look HARD, not skinny." },
  { icon: "🧠", title: "Focus & Clarity", desc: "Brain fog gone. Disciplined eating becomes EASY." },
  { icon: "😴", title: "Recovery & Sleep", desc: "Deep sleep = fat loss. Wake up rested, metabolism-primed." },
  { icon: "🛡️", title: "Stress Resilience", desc: "Lower cortisol = less belly fat storage. Stress gets handled." },
];

const INGREDIENTS = [
  { name: "Tongkat Ali", dose: "1000 mg", desc: "Blocks cortisol (the belly fat storage hormone), supports natural T production" },
  { name: "Shilajit", dose: "400 mg", desc: "Supports testosterone levels & mitochondrial fat-burning" },
  { name: "Boron", dose: "4 mg", desc: "Frees locked testosterone, regulates estrogen" },
  { name: "Fenugreek", dose: "675 mg", desc: "Helps increase T & free T, supports lean muscle retention during fat loss" },
  { name: "Vitamin D3", dose: "4,000 IU", desc: "Promotes cellular health & T regulation" },
  { name: "Taurine", dose: "675 mg", desc: "Reduces oxidative stress, supports healthy metabolic function w/ exercise" },
  { name: "Zinc", dose: "30 mg", desc: "Essential for T synthesis & metabolism - most men are deficient" },
  { name: "Vitamin K1+K2", dose: "100 mcg", desc: "Supports bone density & metabolic health" },
];

const TRUST_BADGES = [
  { icon: "🏭", label: "Made in a CGMP Facility" },
  { icon: "🔬", label: "Third Party Tested" },
  { icon: "🧪", label: "Hormone-Free" },
  { icon: "🇺🇸", label: "Made in USA" },
  { icon: "🌿", label: "Vegan" },
  { icon: "🚫", label: "Non-GMO" },
];

const VIDEO_TESTIMONIALS = [
  { label: "My Energy Is High", caption: "BUT I'VE HELD ON TO 600 FOR MANY YEARS." },
  { label: "Ultra Potent", caption: "a better alternative natural way..." },
  { label: "Taken It For Months", caption: "YOU ARE BLUNTING YOUR BODY'S INTERNAL ABILITIES" },
  { label: "Feel Like Yourself", caption: "HEY, HERE'S HOW TO FEEL LIKE YOURSELF AGAIN" },
];

const PRODUCT_BULLETS = [
  "8 ingredients at full clinical doses, not the under-dosed blends that failed you before",
  "91% of customers reported higher energy within 90 days*",
  'Zero fillers or "proprietary" blends',
  "Made in USA and third-party tested",
  "90-day 100% money-back guarantee, because it works*",
];

const MINI_REVIEWS = [
  "I swear to God I feel like I'm 25 again! Lost 30 pounds of fat, gained muscle, and my wife can't keep her hands off me now. If you're on the fence, stop wasting time and buy this NOW. This saved my marriage and probably my life.",
  "So far have lost about 15 pounds and feel stronger and a lot more energy. I'm 2.5 months into the program.",
  "This product is the real deal and many others just do not work. My levels were 620 before taking this product for 3 months and now my T count is 879, which is a significant increase. The longer you take it the better it works.",
  "I love it, dropped 15lbs, retaining good muscle mass, and the Mrs. Likes it too. I look forward to buying my third bottle!",
];

const DETAILED_REVIEWS = [
  {
    name: "Zach R.",
    title: "Better than TRT. Lab confirmed.",
    text: "I got off TRT months ago to do something more natural. This boosted my total T by 225% since being off TRT. My levels went back down to 330ng/dl after cycling off; now I am up to 742ng/dl. I just confirmed with labs as of 4/16. This is higher than my total T has been on actual TRT. Amazing!",
  },
  {
    name: "Jay S.",
    title: 'Was a skeptic but not now after 30 days"',
    text: "I was able to drop almost 20lbs in 30 days. My energy levels are through the roof and I'm sleeping better than I have in years.",
  },
];

const COMPARISON = [
  { label: "Addresses T Levels", stim: "x", legacy: "?" },
  { label: "Helps Preserve Muscle", stim: "?", legacy: "x" },
  { label: "Convenience", stim: "x", legacy: "?" },
  { label: "Little to No Side Effects", stim: "x", legacy: "?" },
  { label: "Non Habit-Forming", stim: "x", legacy: "?" },
  { label: "Proven Ingredients", stim: "x", legacy: "x" },
];

const TRT_COMPARISON = [
  { label: "Approach", mars: "Natural Support", trt: "Synthetic Replacement" },
  { label: "Commitment", mars: "Flexible Use", trt: "Lifelong Dependency" },
  { label: "Side Effects", mars: "Minimal Risk", trt: "Significant Risks" },
  { label: "Cost", mars: "£54/month", trt: "$250+/month" },
  { label: "Convenience", mars: "Take at Home", trt: "Doctor Visits Required" },
  { label: "Body's Production", mars: "Supports Natural Production", trt: "Shuts Down Natural Production" },
  { label: "Monitoring", mars: "Optional Testing", trt: "Required Blood Work" },
  { label: "Reversibility", mars: "Easily Reversible", trt: "Difficult to Stop" },
];

const WEEKS = [
  {
    label: "Week 1-2",
    title: "Adjustment",
    subtitle: "Your body is getting used to the new supplement, gradually absorbing and processing its ingredients.",
    benefits: [
      "Noticable increases in daily energy, but no drastic changes yet.",
      "Slight improvements in mood and focus as your system adapts",
      "Some users may notice early signs of improved sleep quality.",
      "Your body is laying the foundation for the benefits to come in the following weeks.",
    ],
  },
  {
    label: "Week 3-4",
    title: "Foundation",
    subtitle: "Key ingredients are building up in your system. Hormonal optimization is beginning.",
    benefits: [
      "Consistent energy throughout the day",
      "Improved workout performance and recovery",
      "Better sleep quality and morning alertness",
      "First signs of body composition changes",
    ],
  },
  {
    label: "Week 5-6",
    title: "Momentum",
    subtitle: "Testosterone levels climbing. Fat-burning mechanisms fully engaged.",
    benefits: [
      "Visible changes in body composition",
      "Significant increase in strength and stamina",
      "Mental clarity and focus noticeably sharper",
      "Belly fat starting to reduce",
    ],
  },
  {
    label: "Week 7-8",
    title: "Acceleration",
    subtitle: "Full hormonal optimization in effect. Results becoming undeniable.",
    benefits: [
      "Major improvements in muscle tone",
      "Fat loss accelerating, especially around midsection",
      "Energy levels consistently high all day",
      "Confidence and drive at peak levels",
    ],
  },
  {
    label: "Week 9-10",
    title: "Transformation",
    subtitle: "Your body is now operating at a higher hormonal baseline.",
    benefits: [
      "Dramatic changes in physique",
      "T levels approaching optimal range",
      "Recovery time significantly reduced",
      "People start noticing and commenting",
    ],
  },
  {
    label: "Week 11-12",
    title: "Peak Performance",
    subtitle: "Full benefits realized. This is your new normal.",
    benefits: [
      "All 8 ingredients working like a tuned engine",
      "T-production optimized fully",
      "Not temporary, this is your new normal",
      "Welcome to the man you're supposed to be",
    ],
  },
  {
    label: "Week 13 + Beyond",
    title: "Maintenance",
    subtitle: "Sustained results with continued daily use.",
    benefits: [
      "Maintain peak testosterone levels",
      "Continue building lean muscle",
      "Long-term metabolic optimization",
      "Ongoing hormonal protection",
    ],
  },
];

const TIMELINE = [
  {
    day: "1",
    title: "Ignition",
    emoji: "⚡",
    items: [
      "Tongkat Ali blocks stress hormones",
      "Shilajit feeds starving testosterone cells",
      "Workouts feel intense again",
      "Start to feel that all-day energy",
    ],
  },
  {
    day: "30",
    title: "Spark",
    emoji: "💥",
    items: [
      "Boron helps free stuck T",
      "Zinc gives your balls T-making materials",
      "Body looks leaner, stronger, more masculine",
      "People ask what you're doing differently",
    ],
  },
  {
    day: "90",
    title: "Liftoff",
    emoji: "🚀",
    items: [
      "All 8 ingredients working like a tuned engine",
      "T-production optimized fully",
      "Not temporary, this is your new normal",
      "Welcome to the man you're supposed to be",
    ],
  },
];

const INGREDIENTS_DETAIL = [
  { name: "Tongkat Ali", dose: "1,000 mg", desc: "Boosts testosterone, enhances libido, improves fertility, and supports muscle growth." },
  { name: "Shilajit", dose: "400 mg", desc: "Improves fertility and boosts testosterone levels." },
  { name: "K1 & K2", dose: "100 mcg", desc: "Supports bone health and density, improves mood, and encourages testosterone production." },
  { name: "Vitamin D", dose: "4,000 iu", desc: "Essential for maintaining cellular health and helping regulate testosterone production." },
  { name: "Zinc", dose: "30 mg", desc: "An essential trace mineral that plays a role in testosterone metabolism and immune function." },
  { name: "Taurine", dose: "675 mg", desc: "Reduces oxidative stress, improve blood flow, and support increased testosterone levels." },
  { name: "Fenugreek", dose: "675 mg", desc: "Supports testosterone production, DHT levels, and male vitality." },
  { name: "Boron", dose: "4 mg", desc: "A trace mineral with the potential to increase free testosterone and regulate estrogen levels." },
];

const DOCTORS = [
  {
    name: "Dr. Latt Mansor",
    title: "Research Lead at H.V.M.N. Biography",
    bio: "Dr. Latt Mansor holds a PhD in Physiology, Anatomy and Genetics from the University of Oxford, where his research focused on the metabolism of the type 2 diabetic heart in hypoxia. He is a world expert in physiology and metabolism, and consults with elite sport, military, clinical and research organizations.",
  },
  {
    name: "Dr. Jesse Ropat",
    title: "Biochemist in Human Kinetics",
    bio: "Dr. Jesse Ropat is a licensed pharmacist with a deep interest in natural medicine and over a decade of clinical experience. His background in biochemistry and human kinetics, combined with published research on natural compounds in cancer care, has shaped a holistic, evidence-based approach to health.",
  },
  {
    name: "Dr. Jeff Vogel",
    title: "Board-Certified Medicine Physician",
    bio: "Jeffrey E. Vogel, MD, MPH is a board-certified occupational and preventive medicine physician with deep expertise in men's health and hormone optimization. He serves as Medical Director for multiple testosterone and longevity clinics, overseeing advanced treatment protocols for performance, vitality, and metabolic health.",
  },
];

const FAQS = [
  { q: "What is Mars Men?", a: "Mars Men Natural Testosterone Support is a premium supplement with 8 clinically-dosed ingredients designed to naturally boost testosterone, reduce cortisol, and support fat loss, energy, and overall male vitality." },
  { q: "Who is Mars Men for?", a: "Mars Men is designed for men over 30 who are struggling with low energy, stubborn belly fat, declining testosterone, and the effects of chronic stress. Whether you're looking to optimize your hormones naturally or replace TRT with a safer alternative." },
  { q: "How do I take Mars Men?", a: "Take 2 capsules daily with water, preferably in the morning. Each bottle contains a 30-day supply. For best results, use consistently for at least 90 days." },
  { q: "How long until I see results?", a: "Most users report feeling a difference in energy levels within the first 1-2 weeks. Full hormonal optimization and visible body composition changes typically develop over 8-12 weeks of consistent use." },
  { q: "Can Mars Men help increase my energy?", a: "Yes. 91% of customers reported higher energy levels within 90 days. The combination of Tongkat Ali, Shilajit, and Taurine works synergistically to support sustained energy without stimulants or crashes." },
];

const LAUNCH_KIT = [
  { name: "Mars Men Natural T Support", was: "£107", now: "£54" },
  { name: "Mars Men Travel Tin", was: "$10", now: "FREE" },
  { name: "Galactic Testosterone Guide", was: "$20", now: "FREE" },
  { name: "Ladder Workout App (30 Day Program)", was: "$30", now: "FREE" },
  { name: "Shipping On First Order", was: "$10", now: "FREE" },
  { name: "Chance to Win Apple Watch Ultra 3.0", was: "$799", now: "FREE" },
];
