import { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ab from "../assets/images/image2.png"
import { Player } from '@lottiefiles/react-lottie-player';

/* ── Google Fonts ───────────────────────────────────────────────── */
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;

/* ── Keyframes & styles ─────────────────────────────────────────── */
const ANIM_STYLES = `
  @keyframes fadeUp   { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse    { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:.4;transform:scale(1.6);} }

  /* Headline cycling animation */
  @keyframes headlineIn  { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes headlineOut { from { opacity:1; transform:translateY(0); }    to { opacity:0; transform:translateY(-28px); } }

  .headline-enter { animation: headlineIn 0.55s cubic-bezier(0.22,1,0.36,1) forwards; }
  .headline-exit  { animation: headlineOut 0.4s ease-in forwards; }

  .anim-fade-1 { animation: fadeUp .7s .1s both; }
  .anim-fade-2 { animation: fadeUp .7s .25s both; }
  .anim-fade-3 { animation: fadeUp .7s .4s both; }
  .anim-fade-4 { animation: fadeUp .7s .55s both; }
  .anim-fade-5 { animation: fadeUp .7s .7s both; }

  .reveal { opacity:0; transform:translateY(20px); transition: opacity .6s ease, transform .6s ease; }
  .reveal.in { opacity:1; transform:translateY(0); }

  .svc-card { transition: transform .25s, box-shadow .25s, border-color .25s; }
  .svc-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,.08); border-color: rgba(0,191,166,.3) !important; }

  .ind-card { transition: transform .2s, border-color .2s; }
  .ind-card:hover { transform:translateY(-4px); border-color:rgba(0,191,166,.3) !important; }

  .proc-step { transition: padding-left .2s; }
  .proc-step:hover { padding-left: 8px; }

  /* Geometric background shapes */
  .geo-shape {
    position: absolute;
    opacity: 0.06;
  }

  body { font-family: 'Plus Jakarta Sans', sans-serif; }
  h1, h2, h3, h4 { font-family: 'Plus Jakarta Sans', sans-serif; }
`;

/* ── Scroll-reveal hook ─────────────────────────────────────────── */
function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll(".reveal");
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
            { threshold: 0.1 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);
}

/* ── Animated counter ───────────────────────────────────────────── */
function Counter({ to, suffix }) {
    const [n, setN] = useState(0);
    const ref = useRef(null);
    useEffect(() => {
        const io = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting) return;
            let v = 0;
            const step = () => { v += Math.ceil(to / 50); if (v >= to) { setN(to); return; } setN(v); requestAnimationFrame(step); };
            requestAnimationFrame(step); io.disconnect();
        }, { threshold: .5 });
        if (ref.current) io.observe(ref.current);
        return () => io.disconnect();
    }, [to]);
    return <span ref={ref}>{n}{suffix}</span>;
}

/* ── Service card ───────────────────────────────────────────────── */
function ServiceCard({ icon, title, desc }) {
    return (
        <div className="svc-card flex flex-col gap-4 p-7 rounded-xl bg-white border border-gray-100 cursor-default shadow-sm">
            <div className="w-11 h-11 rounded-lg bg-[#00BFA6]/10 flex items-center justify-center text-xl">{icon}</div>
            <div>
                <h3 className="text-[#0B1F3A] text-base font-bold mb-2 leading-snug">{title}</h3>
                <p className="text-[#0B1F3A]/45 text-sm leading-relaxed">{desc}</p>
            </div>
            <span className="text-[#00BFA6] text-sm font-semibold mt-auto">Learn more →</span>
        </div>
    );
}

/* ── Process step ───────────────────────────────────────────────── */
function Step({ n, title, desc }) {
    return (
        <div className="proc-step reveal flex gap-6 py-6 border-b border-[#0B1F3A]/[.06]">
            <span className="text-[#00BFA6] text-xs font-bold tracking-widest mt-1 shrink-0 w-6">{String(n).padStart(2, "0")}</span>
            <div>
                <h4 className="text-[#0B1F3A] text-base font-bold mb-1.5">{title}</h4>
                <p className="text-[#0B1F3A]/45 text-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

/* ── Rotating Headline ──────────────────────────────────────────── */
const HEADLINES = [
    { line1: "We connect strategy,", line2: "design & technology", line3: "to drive", highlight: "real business growth." },
    { line1: "We build brands", line2: "that convert,", line3: "systems that", highlight: "compound results." },
    { line1: "From confusion", line2: "to clarity —", line3: "strategy built for", highlight: "SMEs." },
];

function RotatingHeadline() {
    const [index, setIndex] = useState(0);
    const [phase, setPhase] = useState("enter"); // "enter" | "exit"

    useEffect(() => {
        const cycle = () => {
            // After 3s visible, start exit
            const exitTimer = setTimeout(() => {
                setPhase("exit");
                // After exit anim (400ms), switch text and re-enter
                const switchTimer = setTimeout(() => {
                    setIndex((i) => (i + 1) % HEADLINES.length);
                    setPhase("enter");
                }, 420);
                return () => clearTimeout(switchTimer);
            }, 3000);
            return () => clearTimeout(exitTimer);
        };

        const cleanup = cycle();
        return cleanup;
    }, [index]);

    const h = HEADLINES[index];

    return (
        <div
            key={index}
            className={`${phase === "enter" ? "headline-enter" : "headline-exit"}`}
            style={{ minHeight: "clamp(180px, 22vw, 320px)" }}
        >
            <h1
                className="text-[#0B1F3A] font-extrabold leading-[1.06] tracking-tight mb-5"
                style={{ fontSize: "clamp(36px, 5.5vw, 72px)", maxWidth: 720 }}
            >
                {h.line1}<br />
                {h.line2}<br />
                {h.line3}{" "}
                <span className="text-[#00BFA6]">{h.highlight}</span>
            </h1>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════════
   HOME
══════════════════════════════════════════════════════════════════ */
export default function Home() {
    useReveal();

    return (
        <>
            <style>{FONTS + ANIM_STYLES}</style>

            <Navbar />

            {/* ── 1. HERO ────────────────────────────────────────────── */}
            <section
                id="home"
                className="relative min-h-screen flex flex-col justify-center px-6 pt-28 pb-16 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #f0f4f8 0%, #e8f0f7 50%, #f5f9fc 100%)" }}
            >
                {/* Geometric background shapes (matching screenshot) */}
                <svg className="geo-shape" style={{ right: "-60px", top: "10%", width: "420px", height: "420px" }} viewBox="0 0 420 420">
                    <rect x="60" y="60" width="300" height="300" rx="40" fill="none" stroke="#0B1F3A" strokeWidth="2" transform="rotate(15 210 210)" />
                    <rect x="100" y="100" width="220" height="220" rx="30" fill="none" stroke="#0B1F3A" strokeWidth="1.5" transform="rotate(30 210 210)" />
                </svg>
                <svg className="geo-shape" style={{ right: "5%", top: "55%", width: "140px", height: "140px" }} viewBox="0 0 140 140">
                    {[0,1,2,3,4].map(row => [0,1,2,3,4].map(col => (
                        <circle key={`${row}-${col}`} cx={col * 28 + 14} cy={row * 28 + 14} r="2.5" fill="#00BFA6" opacity="0.6" />
                    )))}
                </svg>

                {/* Subtle teal glow top-right */}
                <div className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at top right, rgba(0,191,166,0.08) 0%, transparent 65%)" }} />

                <div className="max-w-6xl mx-auto w-full">
                    {/* Badge */}
                    {/* <div className="anim-fade-1 inline-flex items-center gap-2 bg-white/80 border border-[#00BFA6]/20 rounded-full px-4 py-1.5 mb-8 w-fit">
                        <span className="w-2 h-2 rounded-full bg-[#00BFA6]" />
                        <span className="text-[#0B1F3A]/70 text-xs font-semibold tracking-wide">Marketing Technology Agency · Accra, Ghana</span>
                    </div> */}

                    {/* Rotating headline */}
                    <div className="anim-fade-2">
                        <RotatingHeadline />
                    </div>

                    {/* Sub */}
                    <p className="anim-fade-3 text-[#0B1F3A]/55 font-normal leading-relaxed mb-10"
                        style={{ fontSize: "clamp(15px,1.6vw,18px)", maxWidth: 460 }}>
                        Built for SMEs ready to move from confusion to clarity.
                    </p>

                    {/* CTAs */}
                    <div className="anim-fade-4 flex flex-wrap gap-3 mb-0">
                        <a href="#contact"
                            className="bg-[#00BFA6] hover:bg-[#00a892] text-white font-bold text-sm px-8 py-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
                            style={{ boxShadow: "0 4px 24px rgba(0,191,166,.25)" }}>
                            Start a Project →
                        </a>
                        <a href="#work"
                            className="border border-[#0B1F3A]/15 hover:border-[#0B1F3A]/30 bg-white hover:bg-gray-50 text-[#0B1F3A]/70 hover:text-[#0B1F3A] font-medium text-sm px-8 py-4 rounded-lg transition-all duration-200 flex items-center gap-2">
                            See our work →
                        </a>
                    </div>
                </div>
            </section>

            {/* ── 2. STATS ───────────────────────────────────────────── */}
            <section className="bg-white px-6 py-12 border-y border-gray-100">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100 divide-y md:divide-y-0">
                    {[
                        { n: 50, s: "+", label: "Brands Served" },
                        { n: 98, s: "%", label: "Client Satisfaction" },
                        { n: 3, s: "×", label: "Avg Growth Multiplier" },
                        { n: 5, s: "+", label: "Years Experience" },
                    ].map(({ n, s, label }) => (
                        <div key={label} className="flex flex-col items-center py-8 px-4 text-center">
                            <span className="text-[#0B1F3A] font-black leading-none mb-1.5"
                                style={{ fontSize: "clamp(36px,4vw,52px)" }}>
                                <Counter to={n} suffix={s} />
                            </span>
                            <span className="text-[#8899AA] text-[11px] font-semibold tracking-wider uppercase">{label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── 3. SERVICES ────────────────────────────────────────── */}
            <section id="services" className="bg-[#F5F7FA] px-6 py-24">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-12">
                        <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-3">What We Do</span>
                        <h2 className="reveal text-[#0B1F3A] font-black leading-tight tracking-tight"
                            style={{ fontSize: "clamp(28px,4vw,48px)", maxWidth: 480 }}>
                            Everything your brand needs to grow
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        <div className="reveal"><ServiceCard icon="🧠" title="Brand Strategy & Identity"
                            desc="Positioning, messaging, and visual direction that make your brand stand for something real." /></div>
                        <div className="reveal" style={{ transitionDelay: "80ms" }}><ServiceCard icon="📣" title="Digital & Social Media Marketing"
                            desc="Campaigns and content strategies that grow your audience and drive consistent engagement." /></div>
                        <div className="reveal" style={{ transitionDelay: "160ms" }}><ServiceCard icon="💻" title="Web Design & Development"
                            desc="Clean, fast, responsive websites engineered to convert visitors into customers." /></div>
                        <div className="reveal" style={{ transitionDelay: "240ms" }}><ServiceCard icon="⚙️" title="Growth Systems"
                            desc="Lead funnels, automation, and conversion flows built to compound your results over time." /></div>
                    </div>
                </div>
            </section>

            {/* ── 4. ABOUT ───────────────────────────────────────────── */}
            <section id="about" className="bg-white px-6 py-24">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                    <div className="reveal w-full h-80 lg:h-[420px] rounded-2xl overflow-hidden">
                        <img src={ab} className="w-full h-full object-cover rounded-2xl" alt="About Nexux" />
                    </div>
                    <div className="reveal">
                        <span className="block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-3">Why Nexux</span>
                        <h2 className="text-[#0B1F3A] font-black leading-tight tracking-tight mb-4"
                            style={{ fontSize: "clamp(26px,3.5vw,42px)" }}>
                            We don't just build — we grow your business
                        </h2>
                        <p className="text-[#556677] text-base leading-relaxed mb-7">
                            Nexux is built for businesses serious about growth. We combine brand thinking,
                            digital strategy, and precise execution to deliver results that compound — not
                            just one-off deliverables.
                        </p>
                        <ul className="flex flex-col gap-3 mb-8">
                            {[
                                "Strategy-first on every project",
                                "Design that converts, not just impresses",
                                "Data-driven at every stage",
                                "Transparent process, real accountability",
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-[#334455] text-sm font-medium">
                                    <span className="w-5 h-5 rounded-full bg-[#00BFA6]/10 border-2 border-[#00BFA6] flex items-center justify-center shrink-0">
                                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                                            <path d="M1 3l2 2 4-4" stroke="#00BFA6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <a href="#contact"
                            className="inline-flex items-center gap-2 bg-[#0B1F3A] hover:bg-[#0d2545] text-white font-bold text-sm px-6 py-3 rounded-lg transition-colors duration-200">
                            Work With Us →
                        </a>
                    </div>
                </div>
            </section>

            {/* ── 5. PROCESS ─────────────────────────────────────────── */}
            <section id="work" className="bg-[#F5F7FA] px-6 py-24">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-3">How We Work</span>
                        <h2 className="reveal text-[#0B1F3A] font-black leading-tight tracking-tight mb-1"
                            style={{ fontSize: "clamp(26px,3.8vw,46px)" }}>
                            Our four-step process
                        </h2>
                        <div className="mt-4">
                            <Step n={1} title="Discovery & Strategy"
                                desc="We study your business, audience, and market to set a clear direction before anything else." />
                            <Step n={2} title="Design & Creative Direction"
                                desc="We craft brand systems, visuals, and messaging that resonate with the right people." />
                            <Step n={3} title="Build & Launch"
                                desc="We execute fast and precisely — websites, campaigns, funnels — clean and on spec." />
                            <Step n={4} title="Optimize & Grow"
                                desc="We measure results and keep improving, turning early wins into compounding growth." />
                        </div>
                    </div>
                    <div className="reveal lg:sticky lg:top-24">
                        <div
                            className="w-full h-80 lg:h-96 rounded-2xl border border-gray-200 flex items-center justify-center bg-white overflow-hidden"
                        >
                            {/* Lottie player — keep existing import if you have it */}
                            <Player autoplay loop src="https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json" style={{ width: "100%", height: "100%" }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 6. WHO WE SERVE ────────────────────────────────────── */}
            <section className="bg-white px-6 py-24 text-center">
                <div className="max-w-5xl mx-auto">
                    <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-3">Who We Serve</span>
                    <h2 className="reveal text-[#0B1F3A] font-black leading-tight tracking-tight mb-14 mx-auto"
                        style={{ fontSize: "clamp(26px,4vw,48px)", maxWidth: 540 }}>
                        Built for businesses that mean business
                    </h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { icon: "🏢", title: "SMEs & Startups", desc: "Early-stage brands ready to scale" },
                            { icon: "🏠", title: "Short-Stay & Airbnb", desc: "Hospitality brands needing to stand out" },
                            { icon: "🍽️", title: "Restaurants", desc: "Food & beverage growing their presence" },
                            { icon: "🛠️", title: "Service Businesses", desc: "Local & professional brands needing leads" },
                        ].map(({ icon, title, desc }, i) => (
                            <div key={title}
                                className="ind-card reveal border border-gray-100 rounded-xl px-5 py-7 cursor-default bg-[#F5F7FA]"
                                style={{ transitionDelay: `${i * 60}ms` }}>
                                <div className="text-3xl mb-3">{icon}</div>
                                <h4 className="text-[#0B1F3A] font-bold text-sm mb-1.5 leading-snug">{title}</h4>
                                <p className="text-[#0B1F3A]/40 text-[13px] leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 7. CTA ─────────────────────────────────────────────── */}
            <section id="contact" className="relative bg-[#0B1F3A] px-6 py-28 text-white text-center overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[600px] h-[300px] opacity-20 rounded-full"
                        style={{ background: "radial-gradient(ellipse,#00BFA6,transparent 65%)", filter: "blur(50px)" }} />
                </div>
                <div className="relative z-10 max-w-2xl mx-auto">
                    <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-4">Let's Talk</span>
                    <h2 className="reveal font-black leading-tight tracking-tight mb-5"
                        style={{ fontSize: "clamp(32px,5.5vw,64px)" }}>
                        Ready to grow<br />
                        your <span className="text-[#00BFA6]">brand?</span>
                    </h2>
                    <p className="reveal text-white/50 text-base leading-relaxed mb-10 mx-auto" style={{ maxWidth: 400 }}>
                        No pitch, no pressure — just a real conversation about where you are
                        and where you want to be.
                    </p>
                    <div className="reveal flex flex-wrap gap-3 justify-center">
                        <a href="mailto:hello@nexux.co"
                            className="bg-[#00BFA6] hover:bg-[#00a892] text-white font-bold text-[15px] px-9 py-4 rounded-lg transition-colors duration-200"
                            style={{ boxShadow: "0 0 32px rgba(0,191,166,.3)" }}>
                            Start a Conversation →
                        </a>
                        <a href="#work"
                            className="border border-white/20 hover:border-white/40 text-white/65 hover:text-white font-medium text-[15px] px-9 py-4 rounded-lg transition-all duration-200">
                            See Our Work
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}