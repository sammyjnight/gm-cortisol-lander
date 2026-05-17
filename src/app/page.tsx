"use client";

import { useEffect, useRef, useState } from "react";

/* ───────── constants ───────── */
const SHOP_URL = "https://justfloow.com/products/genius-mind";
const CDN = "https://cdn.shopify.com/s/files/1/0594/8892/7953/files";

const HERO_IMAGES = [
  { src: `${CDN}/hero-bundle.png`, alt: "Genius Mind 3-bottle bundle" },
  { src: `${CDN}/hero-single.png`, alt: "Genius Mind single bottle" },
  { src: `${CDN}/hero-lifestyle.png`, alt: "Person taking Genius Mind" },
];

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

/* ───────── intersection observer hook ───────── */
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

function RevealSection({
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
  const [heroSlide, setHeroSlide] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<"90" | "30">("90");
  const [stickyVisible, setStickyVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Countdown
  useEffect(() => {
    const id = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(id);
  }, []);

  // Sticky bar
  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-advance hero carousel
  useEffect(() => {
    const id = setInterval(
      () => setHeroSlide((p) => (p + 1) % HERO_IMAGES.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  const price = selectedPlan === "90" ? "19.99" : "22.49";
  const ctaText = `Add to Cart — £${price}/mo`;

  return (
    <>
      {/* ── Announcement Bar ── */}
      <div className="bg-[#054b65] text-white text-center text-xs py-2 px-4 tracking-wide">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-2 pulse-dot" />
        Free UK Shipping Over £40
        <span className="mx-2 opacity-30">|</span>
        90-Day Money Back Guarantee
        <span className="mx-2 opacity-30">|</span>
        Subscribe &amp; Save
      </div>

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href={SHOP_URL}>
            <img
              src={`${CDN}/Branding.png`}
              alt="JustFloow"
              className="h-7"
            />
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-[#a3a3a3]">
            <a href="#science" className="hover:text-white transition-colors">
              Science
            </a>
            <a href="#ingredients" className="hover:text-white transition-colors">
              Ingredients
            </a>
            <a href="#reviews" className="hover:text-white transition-colors">
              Reviews
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
            <a
              href={SHOP_URL}
              className="bg-[#00a6d2] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0090b8] transition-colors"
            >
              Shop Now
            </a>
          </nav>
        </div>
      </header>

      {/* ── Flash Sale Bar ── */}
      <div className="bg-[#141414] border-b border-[#262626] py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-[#ff5600] pulse-dot" />
          <span className="font-semibold text-white">Flash Sale Ends In:</span>
          <div className="flex items-center gap-1">
            <span className="countdown-block text-[#ff5600] font-mono font-bold text-sm">
              {countdown.h}
              <span className="text-[10px] text-[#a3a3a3] ml-0.5">h</span>
            </span>
            <span className="text-[#ff5600]">:</span>
            <span className="countdown-block text-[#ff5600] font-mono font-bold text-sm">
              {countdown.m}
              <span className="text-[10px] text-[#a3a3a3] ml-0.5">m</span>
            </span>
            <span className="text-[#ff5600]">:</span>
            <span className="countdown-block text-[#ff5600] font-mono font-bold text-sm">
              {countdown.s}
              <span className="text-[10px] text-[#a3a3a3] ml-0.5">s</span>
            </span>
          </div>
          <span className="text-[#a3a3a3] text-xs">Save up to £15</span>
          <a
            href={SHOP_URL}
            className="ml-2 bg-[#ff5600] text-white px-4 py-1.5 rounded-md text-xs font-bold hover:bg-[#e64d00] transition-colors hidden sm:inline-block"
          >
            Shop the Sale
          </a>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          HERO — CORTISOL ANGLE
          ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] glow-brand rounded-full -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] glow-accent rounded-full translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Carousel */}
            <div className="order-2 lg:order-1">
              <div className="relative aspect-square bg-[#141414] rounded-2xl overflow-hidden border border-[#262626]">
                {HERO_IMAGES.map((img, i) => (
                  <div
                    key={i}
                    className={`carousel-slide flex items-center justify-center p-8 ${heroSlide === i ? "active" : ""}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-2 mt-4">
                {HERO_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setHeroSlide(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${heroSlide === i ? "bg-[#00a6d2]" : "bg-[#404040]"}`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right: Offer */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-2 text-sm mb-4">
                <span className="text-yellow-400 text-base">★★★★★</span>
                <span className="text-[#a3a3a3]">4.6 from 673 Reviews</span>
                <span className="text-[#404040]">|</span>
                <span className="text-[#a3a3a3]">100K+ customers</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold leading-tight tracking-tight mb-5">
                Every High-Pressure Year You&apos;ve Run This Business,{" "}
                <span className="text-[#ff5600]">
                  Cortisol Has Been Shrinking Your Brain.
                </span>
              </h1>

              <p className="text-[#a3a3a3] text-base md:text-lg leading-relaxed mb-6">
                It&apos;s been shrinking the hippocampus — the region responsible
                for pattern recognition, fast recall, and the sharp instinct
                that tells you which hires are wrong, which pivots are right,
                which opportunities are real before anyone else sees them.{" "}
                <span className="text-white font-medium">
                  16 clinically-dosed ingredients designed to protect it.
                </span>
              </p>

              <div className="flex items-center gap-3 text-xs text-[#a3a3a3] mb-6">
                <span className="bg-[#1a1a1a] border border-[#262626] px-3 py-1.5 rounded-full">
                  16-Ingredient Nootropic Stack
                </span>
                <span className="bg-[#1a1a1a] border border-[#262626] px-3 py-1.5 rounded-full">
                  60 Capsules per Bottle
                </span>
              </div>

              {/* Subscribe & Save */}
              <div className="mb-5">
                <div className="text-xs font-semibold text-[#a3a3a3] uppercase tracking-wider mb-3">
                  Subscribe &amp; Save:
                </div>

                <button
                  onClick={() => setSelectedPlan("90")}
                  className={`sub-card w-full text-left rounded-xl border p-4 mb-3 relative ${
                    selectedPlan === "90"
                      ? "selected border-[#00a6d2] bg-[#00a6d2]/5"
                      : "border-[#262626] bg-[#141414]"
                  }`}
                >
                  {selectedPlan === "90" && (
                    <div className="absolute -top-3 left-4 bg-[#ff5600] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      Save 20% + Free Gifts
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedPlan === "90" ? "border-[#00a6d2]" : "border-[#404040]"}`}
                      >
                        {selectedPlan === "90" && (
                          <span className="w-2 h-2 rounded-full bg-[#00a6d2]" />
                        )}
                      </span>
                      <div>
                        <div className="font-semibold text-white text-sm">
                          90-Day Supply{" "}
                          <span className="text-[#00a6d2] text-xs">(Save 20%)</span>
                        </div>
                        <div className="text-xs text-[#737373] mt-0.5">
                          Billed £59.99 every 12 weeks
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">
                        £19.99
                        <span className="text-xs text-[#737373] font-normal">/mo</span>
                      </div>
                      <div className="text-[10px] text-[#00a6d2]">£0.67 / SERVING</div>
                    </div>
                  </div>
                  {selectedPlan === "90" && (
                    <div className="mt-3 pt-3 border-t border-[#262626] grid grid-cols-2 gap-1.5 text-xs text-[#a3a3a3]">
                      <span>💰 Maximum savings</span>
                      <span>🛡️ 90-Day Money-Back</span>
                      <span>🎁 Free Mystery Gift</span>
                      <span>🚚 Free UK Shipping</span>
                      <span>⏸️ Cancel anytime</span>
                      <span>👨‍👩‍👧‍👦 Share with family</span>
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setSelectedPlan("30")}
                  className={`sub-card w-full text-left rounded-xl border p-4 ${
                    selectedPlan === "30"
                      ? "selected border-[#00a6d2] bg-[#00a6d2]/5"
                      : "border-[#262626] bg-[#141414]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedPlan === "30" ? "border-[#00a6d2]" : "border-[#404040]"}`}
                      >
                        {selectedPlan === "30" && (
                          <span className="w-2 h-2 rounded-full bg-[#00a6d2]" />
                        )}
                      </span>
                      <div>
                        <div className="font-semibold text-white text-sm">
                          30-Day Supply{" "}
                          <span className="text-[#00a6d2] text-xs">(Save 10%)</span>
                        </div>
                        <div className="text-xs text-[#737373] mt-0.5">
                          Billed £22.49 every 4 weeks
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">
                        £22.49
                        <span className="text-xs text-[#737373] font-normal">/mo</span>
                      </div>
                      <div className="text-[10px] text-[#a3a3a3]">£0.75 / SERVING</div>
                    </div>
                  </div>
                </button>

                <div className="text-center mt-2">
                  <a
                    href={SHOP_URL}
                    className="text-xs text-[#737373] hover:text-white transition-colors underline"
                  >
                    One Time Purchase £24.99
                  </a>
                </div>
              </div>

              <a
                href={SHOP_URL}
                className="block w-full text-center bg-[#00a6d2] hover:bg-[#0090b8] text-white font-bold py-4 rounded-xl text-base transition-colors mb-4"
              >
                {ctaText}
              </a>

              <div className="flex flex-wrap justify-center gap-4 text-xs text-[#737373] mb-6">
                <span>🛡️ 90-Day Money Back</span>
                <span>🚚 Free UK Shipping over £40</span>
                <span>⚡ Same-Day Dispatch</span>
              </div>

              <DropdownSection />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="bg-[#141414] border-y border-[#262626] py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-[#a3a3a3]">
          {["🇬🇧 Made in UK", "🌿 100% Natural", "🔬 Nutritionist Formulated", "✅ Non-GMO", "🛡️ 90-Day Guarantee", "🌱 Vegan"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          THE CORTISOL SCIENCE SECTION
          ════════════════════════════════════════════════════════ */}
      <section id="science" className="relative py-20 md:py-28 noise overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f1a1e] to-[#0a0a0a] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <RevealSection className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#00a6d2] mb-4">
              The Cortisol Problem
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              Your Brain Is Paying the Price for{" "}
              <span className="text-[#ff5600]">Every Year of Pressure.</span>
            </h2>
            <p className="text-[#a3a3a3] text-lg max-w-2xl mx-auto leading-relaxed">
              Chronic high-stakes decision making floods your system with cortisol.
              Over time, it physically shrinks the hippocampus — the brain region
              that gives you your edge.
            </p>
          </RevealSection>

          <RevealSection>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: "🧠",
                  title: "Pattern Recognition",
                  desc: "The instinct that tells you which hires are wrong, which pivots are right, which opportunities are real before anyone else sees them.",
                },
                {
                  icon: "⚡",
                  title: "Fast Recall",
                  desc: "Names, numbers, context — the data your brain should surface instantly during high-stakes conversations. Gone by afternoon.",
                },
                {
                  icon: "🎯",
                  title: "Sharp Decision-Making",
                  desc: "The 2-hour morning window where your thinking is actually clean. After that, your brain is choosing on fumes — and the decisions don't stop.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-[#141414] border border-[#262626] rounded-xl p-6 text-center"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-[#a3a3a3] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </RevealSection>

          <RevealSection>
            <div className="bg-[#141414] border border-[#262626] rounded-2xl p-8 md:p-10">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-3">
                  The More Cortisol You&apos;ve Endured,{" "}
                  <span className="text-[#ff5600]">The More Your Hippocampus Shrinks.</span>
                </h3>
                <p className="text-[#a3a3a3] max-w-xl mx-auto">
                  Leading to your business mind becoming slower, less capable, and less
                  motivated. You didn&apos;t build a business that&apos;s outgrowing you.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#262626]">
                  <div className="text-xs uppercase tracking-wider text-[#ff5600] font-semibold mb-3">
                    What Cortisol Takes
                  </div>
                  <ul className="space-y-3 text-sm text-[#a3a3a3]">
                    {[
                      "Afternoon decision quality collapses",
                      "Sprint-crash cycle repeats daily",
                      "The sharp instinct that built your business — dulling",
                      "Memory gaps in high-stakes conversations",
                      "Caffeine dependency just to maintain baseline",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-[#ff5600] mt-0.5">✕</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#262626]">
                  <div className="text-xs uppercase tracking-wider text-[#00a6d2] font-semibold mb-3">
                    What Genius Mind Protects
                  </div>
                  <ul className="space-y-3 text-sm text-[#a3a3a3]">
                    {[
                      "Cerebral blood flow — Ginkgo Biloba 50:1",
                      "Dopamine precursors — L-Tyrosine replenishment",
                      "Cortisol reduction — Phosphatidylserine",
                      "Stress resilience — Panax Ginseng 20:1 adaptogen",
                      "Neural pathway growth — Lion's Mane 4:1",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-[#00a6d2] mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <RevealSection className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#00a6d2] mb-4">
              Cognitive Infrastructure
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold">
              4 Reasons Operators{" "}
              <span className="text-[#00a6d2]">Switch to Genius Mind</span>
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "⏱️", title: "Extends the Decision Window", desc: "Ginkgo Biloba (50:1 extract) supports cerebral blood flow, helping maintain the sharp thinking you have at 9am deep into the afternoon — when the hardest calls actually land." },
              { icon: "🧠", title: "Infrastructure, Not a Patch", desc: "16 ingredients across three mechanisms — blood flow, neurotransmitter precursors, and adaptogens. Not a single-ingredient experiment. A system built for sustained cognitive output." },
              { icon: "🔬", title: "Every Dose Disclosed", desc: "No proprietary blends. No hidden dosages. High-ratio extracts with extraction ratios printed on the label. You read labels — this one is worth reading." },
              { icon: "⚡", title: "Replaces Caffeine Dependence", desc: "Guarana provides sustained energy release without the spike-and-crash cycle. L-Tyrosine replenishes the dopamine precursors that chronic decision-making depletes." },
            ].map((b, i) => (
              <RevealSection key={b.title}>
                <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 h-full hover:border-[#00a6d2]/30 transition-colors">
                  <div className="text-3xl mb-4">{b.icon}</div>
                  <h3 className="font-bold text-white mb-2 text-lg">{b.title}</h3>
                  <p className="text-sm text-[#a3a3a3] leading-relaxed">{b.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative py-20 noise overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f1a1e] to-[#0a0a0a] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <RevealSection className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#00a6d2] mb-4">
              Backed By Results
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold">
              Clinically Researched. <span className="text-[#00a6d2]">Operator Proven.</span>
            </h2>
          </RevealSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "89%", label: "Sustained Clarity", desc: "Sharper decision-making past the 2-hour morning window" },
              { value: "76%", label: "Stronger Recall", desc: "Improved retention and faster recall after 30 days" },
              { value: "82%", label: "Reduced Caffeine", desc: "Cut caffeine intake after switching to sustained energy" },
              { value: "91%", label: "Afternoon Performance", desc: "Clearer thinking during late-day decision windows" },
            ].map((s) => (
              <RevealSection key={s.label}>
                <div className="text-center">
                  <div className="text-xs uppercase tracking-wider text-[#00a6d2] font-semibold mb-2">{s.label}</div>
                  <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">{s.value}</div>
                  <p className="text-xs text-[#737373]">{s.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof Photos ── */}
      <section className="relative py-20 noise overflow-hidden bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <RevealSection className="text-center mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#00a6d2]/60 mb-4">
              Trusted By Operators
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold">
              100,000+ Customers. 1,000+ Amazon Reviews.
              <br />
              <span className="text-[#a3a3a3] text-xl md:text-2xl font-normal">
                The operators thinking clearer, for longer.
              </span>
            </h2>
          </RevealSection>
          <RevealSection>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
              {[1, 2, 3, 4, 5].map((n) => (
                <img
                  key={n}
                  src={`${CDN}/customer-${n}.png`}
                  alt={`Customer ${n}`}
                  className="rounded-xl w-full aspect-square object-cover border border-[#262626]"
                />
              ))}
            </div>
          </RevealSection>
          <RevealSection>
            <div className="flex flex-wrap justify-center items-center gap-8 text-center">
              <div>
                <span className="text-2xl font-extrabold text-white">100K+</span>{" "}
                <span className="text-sm text-[#737373]">customer purchases</span>
              </div>
              <div className="w-px h-6 bg-[#262626]" />
              <div>
                <span className="text-2xl font-extrabold text-white">3M+</span>{" "}
                <span className="text-sm text-[#737373]">servings worldwide</span>
              </div>
              <div className="w-px h-6 bg-[#262626]" />
              <div>
                <span className="text-yellow-400">★★★★★</span>{" "}
                <span className="text-2xl font-extrabold text-white">4.6/5</span>{" "}
                <span className="text-sm text-[#737373]">average rating</span>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section id="reviews" className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <RevealSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
              Real Operators. <span className="text-[#00a6d2]">Real Results.</span>
            </h2>
            <p className="text-[#a3a3a3] max-w-lg mx-auto">
              From founders carrying the full cognitive load of a business to executives making 100+ decisions a day.
            </p>
          </RevealSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <RevealSection key={r.name}>
                <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 h-full hover:border-[#00a6d2]/20 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-yellow-400 text-sm">★★★★★</span>
                    <span className="text-[10px] text-[#00a6d2] bg-[#00a6d2]/10 px-2 py-0.5 rounded-full font-medium">Verified</span>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#00a6d2] mb-2">{r.tag}</div>
                  <p className="text-sm text-[#a3a3a3] leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-[#262626] flex items-center justify-center text-xs font-bold text-[#00a6d2]">
                      {r.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{r.name}</div>
                      <div className="text-[10px] text-[#737373]">{r.date}</div>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ingredients ── */}
      <section id="ingredients" className="py-20 md:py-24 bg-[#0d0d0d] border-y border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-4">
          <RevealSection className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#00a6d2] mb-4">Full Transparency</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
              16 Ingredients. Three Mechanisms. <span className="text-[#00a6d2]">Every Dose Disclosed.</span>
            </h2>
            <p className="text-[#a3a3a3] max-w-xl mx-auto">
              No proprietary blends. No hidden dosages. High-ratio extracts for maximum potency. You read labels — this one is worth reading.
            </p>
          </RevealSection>

          <RevealSection>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#262626]">
                    <th className="py-3 pr-4 text-[#737373] font-medium">Ingredient</th>
                    <th className="py-3 pr-4 text-[#737373] font-medium">Per Serving</th>
                    <th className="py-3 text-[#737373] font-medium">Mechanism</th>
                  </tr>
                </thead>
                <tbody>
                  {INGREDIENTS.map((ing, i) => (
                    <tr key={ing.name} className={`border-b border-[#1a1a1a] ${i % 2 === 0 ? "" : "bg-[#141414]/50"}`}>
                      <td className="py-3 pr-4">
                        <div className="font-semibold text-white">{ing.name}</div>
                        {ing.extract && <div className="text-[10px] text-[#00a6d2]">{ing.extract}</div>}
                      </td>
                      <td className="py-3 pr-4 text-white font-mono text-xs">{ing.dose}</td>
                      <td className="py-3 text-[#a3a3a3] text-xs">{ing.benefit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Mechanism Tabs ── */}
      <section className="py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <RevealSection className="text-center mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#00a6d2] mb-4 bg-[#054b65]/10 border border-[#054b65]/15 px-5 py-2 rounded-full">
              Three Mechanisms. One Capsule.
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-4">
              One capsule. Six brain systems. Every base covered.
            </h2>
            <p className="text-[#a3a3a3] max-w-lg mx-auto mt-3">
              You&apos;ve sorted sleep, training, diet, and morning routines. This is the chemistry layer that makes all that optimisation actually compound.
            </p>
          </RevealSection>

          <RevealSection>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {TABS.map((tab, i) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === i
                      ? "bg-[#00a6d2] text-white"
                      : "bg-[#1a1a1a] text-[#a3a3a3] border border-[#262626] hover:border-[#404040]"
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
            <div className="bg-[#141414] border border-[#262626] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{TABS[activeTab].icon}</span>
                <h3 className="text-xl font-bold text-white">{TABS[activeTab].label}</h3>
              </div>
              <p className="text-[#a3a3a3] leading-relaxed">{TABS[activeTab].content}</p>
            </div>
            <p className="text-center text-sm text-[#737373] mt-6">
              16 clinically-dosed ingredients across 6 cognitive systems. The chemistry layer your stack is missing.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 md:py-24 bg-[#0d0d0d] border-y border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-4">
          <RevealSection className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#00a6d2] mb-4">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-extrabold">
              Simple. <span className="text-[#00a6d2]">Systematic.</span> Daily.
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "1", title: "Take 2 Capsules Each Morning", desc: "First thing, with water. Protect the morning window and extend it. Most operators notice the shift within the first week — cleaner energy, sharper output.", img: `${CDN}/step-1.png` },
              { num: "2", title: "The Afternoon Wall Shifts", desc: "By week 2, the sprint-crash cycle starts to break. Decision quality holds deeper into the day. The 4pm calls stop feeling like roulette.", img: `${CDN}/step-2.png` },
              { num: "3", title: "Sustained Cognitive Output", desc: "After 8+ weeks, the adaptogenic ingredients have built up. This becomes permanent infrastructure — not something you try for a month and quietly abandon.", img: `${CDN}/step-3.png` },
            ].map((step) => (
              <RevealSection key={step.num}>
                <div className="text-center">
                  <img src={step.img} alt={step.title} className="w-full rounded-xl mb-4 border border-[#262626]" />
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#00a6d2] text-white font-bold text-sm mb-3">{step.num}</div>
                  <h3 className="font-bold text-white text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-[#a3a3a3] leading-relaxed">{step.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <RevealSection className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#00a6d2] mb-4">Frequently Asked</span>
            <h2 className="text-3xl md:text-4xl font-extrabold">
              Got Questions? <span className="text-[#00a6d2]">We&apos;ve Got Answers.</span>
            </h2>
          </RevealSection>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <RevealSection key={i}>
                <div className="bg-[#141414] border border-[#262626] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left p-5 flex items-center justify-between text-white font-semibold text-sm hover:bg-[#1a1a1a] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className={`text-[#00a6d2] text-lg transition-transform ${openFaq === i ? "rotate-180" : ""}`}>▾</span>
                  </button>
                  <div className={`faq-answer ${openFaq === i ? "open" : ""}`}>
                    <div className="px-5 pb-5 text-sm text-[#a3a3a3] leading-relaxed">{faq.a}</div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guarantee ── */}
      <section className="relative py-20 md:py-28 noise overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f1a1e] to-[#0a0a0a] pointer-events-none" />
        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <RevealSection>
            <div className="text-5xl mb-4">🛡️</div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#00a6d2] mb-4">Our Promise</span>
            <div className="text-5xl md:text-6xl font-extrabold text-white mb-4">Risk-Free</div>
            <h2 className="text-xl md:text-2xl font-semibold text-[#a3a3a3] mb-6">
              Protect what you&apos;ve built. Try it for 90 days.
            </h2>
            <p className="text-[#737373] mb-8 max-w-md mx-auto">
              Over 100,000 customers. 4.6/5 average rating. If the decision quality doesn&apos;t shift, you get your money back.
              The business depends on you functioning — this is how you protect that.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {["90-day guarantee", "Free UK shipping over £40", "Same-day dispatch", "Cancel anytime", "UK Made"].map((b) => (
                <span key={b} className="text-xs bg-[#1a1a1a] border border-[#262626] text-[#a3a3a3] px-3 py-1.5 rounded-full">
                  ✓ {b}
                </span>
              ))}
            </div>
            <a href={SHOP_URL} className="inline-block bg-[#00a6d2] hover:bg-[#0090b8] text-white font-bold py-4 px-10 rounded-xl text-base transition-colors">
              Try Genius Mind Risk-Free
            </a>
          </RevealSection>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#1a1a1a] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <img src={`${CDN}/Branding.png`} alt="JustFloow" className="h-6 brightness-0 invert" />
            <div className="flex flex-wrap gap-6 text-sm text-[#737373]">
              <a href="https://justfloow.com/collections/all" className="hover:text-white transition-colors">Shop</a>
              <a href="https://justfloow.com/pages/about" className="hover:text-white transition-colors">About</a>
              <a href="https://justfloow.com/pages/contact-us" className="hover:text-white transition-colors">Contact</a>
              <a href="https://justfloow.com/policies/privacy-policy" className="hover:text-white transition-colors">Privacy</a>
              <a href="https://justfloow.com/policies/terms-of-service" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
          <div className="text-center text-xs text-[#404040]">
            &copy; 2026 JustFloow. All rights reserved.<br />
            *These statements have not been evaluated by the MHRA. This product is not intended to diagnose, treat, cure or prevent any disease.
          </div>
        </div>
      </footer>

      <div className="bg-[#0a0a0a] border-t border-[#1a1a1a] py-3 text-center text-[10px] text-[#404040] px-4">
        *Individual results may vary. Genius Mind is a food supplement and should not replace a varied, balanced diet and healthy lifestyle.
      </div>

      {/* ── Sticky Buy Bar ── */}
      <div className={`sticky-buy-bar fixed bottom-0 left-0 right-0 bg-[#141414]/95 backdrop-blur-md border-t border-[#262626] py-3 px-4 z-50 ${stickyVisible ? "visible" : ""}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-white">Genius Mind — Cognitive Infrastructure</div>
            <div className="text-xs text-[#737373]">16 ingredients &bull; 3 mechanisms &bull; 90-day guarantee</div>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-sm font-bold text-white">From £0.67</div>
            <div className="text-xs text-[#737373]">per day (90-day supply)</div>
          </div>
          <a href={SHOP_URL} className="bg-[#00a6d2] hover:bg-[#0090b8] text-white font-bold py-3 px-6 rounded-lg text-sm transition-colors whitespace-nowrap">
            Shop Now — From £0.67/day
          </a>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DROPDOWN SECTION
   ═══════════════════════════════════════════════════════════════ */
function DropdownSection() {
  const [open, setOpen] = useState<number | null>(0);

  const items = [
    { title: "The Stack", body: "16 clinically-dosed ingredients including Ginkgo Biloba (50:1) for cerebral blood flow, L-Tyrosine for dopamine precursor support under pressure, Panax Ginseng (20:1) for stress resilience, Bacopa Monnieri (11:1) for memory consolidation, Lion's Mane (4:1) for neural pathway growth, and B-Vitamins for sustained energy production. Every dose fully disclosed — no proprietary blends." },
    { title: "How to Take", body: "Take 2 capsules daily with water. Most operators take them first thing in the morning to extend the sharp window into the afternoon. Each bottle contains 60 capsules (30-day supply). For sustained results, use consistently for 8+ weeks." },
    { title: "Quality & Testing", body: "Manufactured in a GMP-certified UK facility. Vegan HPMC capsules, gluten-free, non-GMO. No artificial fillers, no hidden dosages. Every batch is third-party tested for purity and potency." },
    { title: "Shipping & Returns", body: "Free UK shipping on orders over £40. Same-day dispatch on orders placed before 2pm. 90-day money-back guarantee — if the decision quality doesn't shift, email hello@justfloow.com for a full refund." },
  ];

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="border border-[#262626] rounded-lg overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-3.5 text-sm font-semibold text-white hover:bg-[#141414] transition-colors"
          >
            <span>{item.title}</span>
            <span className="text-[#737373]">{open === i ? "−" : "+"}</span>
          </button>
          <div className={`faq-answer ${open === i ? "open" : ""}`}>
            <div className="px-3.5 pb-3.5 text-xs text-[#a3a3a3] leading-relaxed">{item.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */
const REVIEWS = [
  { tag: "THE CORTISOL SHIFT", text: "I run a 12-person agency and by 2pm I used to be making decisions on fumes. Pricing calls, hiring decisions, client escalations — all landing when my brain was already spent. Three months on Genius Mind and the afternoon wall has genuinely shifted. I'm making sharper calls later in the day.", name: "James T.", initials: "JT", date: "2 weeks ago" },
  { tag: "PERMANENT STACK", text: "I've tried Lion's Mane on its own. Ashwagandha on its own. Each one felt subtle, couldn't verify the effect, moved on. Genius Mind is the first thing that's become a non-negotiable in my daily stack. The 16-ingredient approach is the difference — it's infrastructure, not a patch.", name: "Sarah M.", initials: "SM", date: "2 weeks ago" },
  { tag: "MECHANISM MATTERS", text: "I'm a GP and I was sceptical. But the ingredient profile is solid — clinical dosages, high-ratio extracts, no proprietary blends. 50:1 Ginkgo for cerebral blood flow. L-Tyrosine as a dopamine precursor. I started taking it myself and now recommend it to patients carrying high cognitive loads.", name: "Dr. Emily R.", initials: "ER", date: "2 weeks ago" },
  { tag: "REPLACED CAFFEINE", text: "Four coffees a day was the only thing standing between me and a fog. Now I'm down to one morning coffee and Genius Mind handles the rest. No spike, no crash, no 3pm wall. Sustained clarity through back-to-back calls.", name: "Mark D.", initials: "MD", date: "2 weeks ago" },
  { tag: "PROTECTING THE MORNING", text: "I guard my mornings fiercely — that's when I do my deepest thinking. Genius Mind has extended that window from 2 hours to closer to 5. The afternoon decisions that used to feel reckless now feel deliberate. That's a material difference when you're operating alone.", name: "Lucy K.", initials: "LK", date: "2 weeks ago" },
  { tag: "COMPETITIVE EDGE", text: "Every founder in my space is dealing with the same cognitive load. I figured if I could think clearer for longer, that's the actual edge. Six weeks in — the sprint-crash cycle has stopped. I'm not borrowing energy anymore. I'm producing it.", name: "Tom C.", initials: "TC", date: "2 weeks ago" },
];

const INGREDIENTS = [
  { name: "Ginkgo Biloba", extract: "50:1 Extract", dose: "120mg", benefit: "Cerebral blood flow — extends the window where decision quality stays high" },
  { name: "Panax Ginseng", extract: "20:1 Extract", dose: "100mg", benefit: "Adaptogen for stress resilience — protects cognition under sustained pressure" },
  { name: "L-Choline", extract: "Bitartrate", dose: "100mg", benefit: "Acetylcholine precursor — the neurotransmitter behind working memory" },
  { name: "L-Tyrosine", extract: null, dose: "100mg", benefit: "Dopamine precursor — replenishes what chronic decision-making depletes" },
  { name: "Guarana Seed", extract: null, dose: "90mg", benefit: "Sustained natural energy — replaces the spike-and-crash caffeine cycle" },
  { name: "Bacopa Monnieri", extract: "11:1 Extract", dose: "80mg", benefit: "Memory consolidation — retention and recall under cognitive load" },
  { name: "Lion's Mane", extract: "4:1 Extract", dose: "80mg", benefit: "NGF stimulation — neural pathway growth for long-term cognitive output" },
  { name: "Sage Leaf", extract: "4:1 Extract", dose: "75mg", benefit: "Memory & cognitive enhancement — sharper recall speed" },
  { name: "Phosphatidylserine", extract: null, dose: "35mg", benefit: "Cell membrane integrity — reduces cortisol, supports stress recovery" },
  { name: "Niacin (B3)", extract: null, dose: "32mg", benefit: "NAD+ production — cellular energy and overnight cognitive recovery" },
  { name: "Rosemary", extract: "5:1 Extract", dose: "20mg", benefit: "Neuroprotective — long-term brain cell protection via carnosic acid" },
  { name: "Vitamin B6", extract: null, dose: "10mg (714% RI)", benefit: "Neurotransmitter synthesis — fuels dopamine and serotonin production" },
  { name: "Zinc", extract: null, dose: "10mg (100% RI)", benefit: "Cognitive function — supports learning, memory, and processing speed" },
  { name: "Vitamin B12", extract: "Methylcobalamin", dose: "500µg", benefit: "Nerve health & neurotransmitter communication" },
];

const TABS = [
  { icon: "🧠", label: "Cognitive Function", content: "Ginkgo Biloba (50:1), Bacopa Monnieri (11:1), and Lion's Mane (4:1) work together to enhance cerebral blood flow, stimulate neural growth factor, and consolidate memory pathways. This is the foundation — the infrastructure that extends your decision window past the 2-hour morning peak." },
  { icon: "⚡", label: "Energy & Alertness", content: "Guarana Seed provides sustained natural energy release — not the spike-and-crash cycle you get from caffeine. B-Vitamins (B6 at 714% RI, B12 at 20,000% RI) fuel cellular energy production. The result: consistent output without borrowing from tomorrow." },
  { icon: "🎯", label: "Focus & Attention", content: "L-Tyrosine (100mg) is a direct dopamine precursor. Chronic high-stakes decision-making depletes it — that's why the afternoon is harder. Not a character flaw. A supply problem with a specific solution. Paired with Choline (100mg) for acetylcholine production." },
  { icon: "🛡️", label: "Stress Resilience", content: "Panax Ginseng (20:1 extract) is a clinically-studied adaptogen that protects cognitive function under sustained pressure. Phosphatidylserine (35mg) reduces cortisol and supports overnight stress recovery — so you're not starting every morning already behind." },
  { icon: "📚", label: "Memory & Recall", content: "Bacopa Monnieri (11:1 extract, 80mg) is one of the most researched memory compounds. Combined with Sage Leaf (4:1 extract) and Zinc (100% RI) for enhanced retention and recall speed — so names, numbers, and context don't slip away mid-conversation." },
  { icon: "🌿", label: "Neuroprotection", content: "Rosemary (5:1 extract) provides carnosic acid for long-term brain cell protection. Niacin (B3, 32mg) drives NAD+ production for cellular repair and cognitive longevity. This is the layer that protects what you've built — not just today's output, but tomorrow's capacity." },
];

const FAQS = [
  { q: "How quickly will I notice the difference?", a: "Most operators notice sustained energy and sharper decision-making within the first week. The full cognitive benefits — including extended afternoon clarity, stronger recall, and a broken sprint-crash cycle — typically develop over 4-8 weeks as the adaptogenic ingredients build up." },
  { q: "Can I take it alongside caffeine?", a: "Yes. Most operators keep one morning coffee and let Genius Mind handle the rest. Guarana provides a slower, sustained energy release that works with your existing routine. Over time, most users naturally reduce their caffeine intake." },
  { q: "Why 16 ingredients instead of one or two?", a: "Cognitive performance isn't one mechanism. Lion's Mane on its own. Ashwagandha on its own. You've tried them — felt something subtle, couldn't verify it, moved on. Genius Mind addresses three mechanisms simultaneously: blood flow (Ginkgo 50:1), neurotransmitter precursors (L-Tyrosine, Choline), and adaptogenic resilience (Ginseng 20:1). That's the difference between a patch and infrastructure." },
  { q: "How does the 90-day money-back guarantee work?", a: "Try Genius Mind for up to 90 days. If the decision quality doesn't shift, email hello@justfloow.com and we'll process a full refund. No questions asked, no returns required." },
  { q: "Can I take it with other supplements or medication?", a: "Genius Mind is compatible with most supplement stacks. If you are taking prescription medication (especially blood thinners, antidepressants, or blood pressure medication), consult your GP before starting. Ginkgo Biloba and Ginseng may interact with certain medications." },
  { q: "Is it designed for long-term daily use?", a: "Yes. No artificial stimulants. No habit-forming compounds. Manufactured in a GMP-certified UK facility. Built to be a permanent part of your stack — cognitive infrastructure, not a short-term experiment." },
];
