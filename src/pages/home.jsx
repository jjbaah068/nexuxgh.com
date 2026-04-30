import { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import cubes from "../assets/images/image1.jpg"
import ab from "../assets/images/image2.png"
import Spline from '@splinetool/react-spline';
import { Player } from '@lottiefiles/react-lottie-player';

/* ── Google Fonts ───────────────────────────────────────────────── */
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');`;

/* ── Minimal keyframes only (can't do in Tailwind) ──────────────── */
const ANIM_STYLES = `
  @keyframes fadeUp   { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse    { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:.4;transform:scale(1.6);} }
  @keyframes scrollY  { 0%,100%{opacity:1;transform:scaleY(1);} 50%{opacity:.3;transform:scaleY(.5);} }
  @keyframes glow     { 0%,100%{box-shadow:0 0 0 0 rgba(0,191,166,0);} 50%{box-shadow:0 0 28px 6px rgba(0,191,166,.12);} }

  @keyframes floatRotate {
  0%   { transform: translateY(0px) rotate(0deg) scale(1); }
  50%  { transform: translateY(-12px) rotate(1.5deg) scale(1.02); }
  100% { transform: translateY(0px) rotate(0deg) scale(1); }
}

.floating-img {
  animation: floatRotate 6s ease-in-out infinite;
}

  .anim-fade-1 { animation: fadeUp .7s .1s both; }
  .anim-fade-2 { animation: fadeUp .7s .25s both; }
  .anim-fade-3 { animation: fadeUp .7s .4s both; }
  .anim-fade-4 { animation: fadeUp .7s .55s both; }
  .anim-fade-5 { animation: fadeUp .7s .7s both; }

  .pulse-dot   { animation: pulse 2s infinite; }
  .scroll-bar  { animation: scrollY 2s infinite; }
  

  .reveal { opacity:0; transform:translateY(20px); transition: opacity .6s ease, transform .6s ease; }
  .reveal.in { opacity:1; transform:translateY(0); }

  /* service card bottom sweep */
  .svc-card { transition: transform .25s, box-shadow .25s, border-color .25s; }
  .svc-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,.25); border-color: rgba(0,191,166,.25) !important; }

  /* ind card */
  .ind-card { transition: transform .2s, border-color .2s; }
  .ind-card:hover { transform:translateY(-4px); border-color:rgba(0,191,166,.3) !important; }

  /* process step */
  .proc-step { transition: padding-left .2s; }
  .proc-step:hover { padding-left: 8px; }

  body { font-family:'DM Sans',sans-serif; }
  h1,h2,h3,h4 { font-family:'Syne',sans-serif; }
`;

/* ── Animated dot canvas background ────────────────────────────── */
function DotCanvas() {
    const ref = useRef(null);
    useEffect(() => {
        const c = ref.current;
        const ctx = c.getContext("2d");
        let raf, t = 0;
        const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
        resize();
        window.addEventListener("resize", resize);
        const draw = () => {
            ctx.clearRect(0, 0, c.width, c.height);
            const gap = 40, cols = Math.ceil(c.width / gap) + 1, rows = Math.ceil(c.height / gap) + 1;
            const cx = c.width / 2, cy = c.height / 2;
            for (let r = 0; r < rows; r++) {
                for (let col = 0; col < cols; col++) {
                    const x = col * gap, y = r * gap;
                    const d = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
                    const a = (Math.sin(d / 60 - t) * .5 + .5) * .15 + .025;
                    ctx.beginPath(); ctx.arc(x, y, 1.2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(0,191,166,${a})`; ctx.fill();
                }
            }
            t += .016; raf = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
    }, []);
    return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none opacity-80" />;
}

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
        <div className="svc-card flex flex-col gap-4 p-7 rounded-xl bg-white/[.03] border border-white/[.07] cursor-default">
            <div className="w-11 h-11 rounded-lg bg-[#00BFA6]/10 flex items-center justify-center text-xl">{icon}</div>
            <div>
                <h3 className="text-white text-base font-bold mb-2 leading-snug">{title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
            </div>
            <span className="text-[#00BFA6] text-sm font-semibold mt-auto">Learn more →</span>
        </div>
    );
}

/* ── Process step ───────────────────────────────────────────────── */
function Step({ n, title, desc }) {
    return (
        <div className="proc-step reveal flex gap-6 py-6 border-b border-white/[.06]">
            <span className="text-[#00BFA6] text-xs font-bold tracking-widest mt-1 shrink-0 w-6">{String(n).padStart(2, "0")}</span>
            <div>
                <h4 className="text-white text-base font-bold mb-1.5">{title}</h4>
                <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
            </div>
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
                className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 overflow-hidden"
                style={{ background: "linear-gradient(150deg,#060F1D 0%,#0B1F3A 60%,#0D2645 100%)" }}
            >
                <DotCanvas />

                {/* Soft centre glow */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-[700px] h-[500px] rounded-full opacity-20"
                        style={{ background: "radial-gradient(ellipse,#00BFA6 0%,transparent 65%)", filter: "blur(60px)" }} />
                </div>

                {/* Badge */}
                <div className="anim-fade-1 relative z-10 inline-flex items-center gap-2 bg-[#00BFA6]/10 border border-[#00BFA6]/25 rounded-full px-4 py-1.5 mb-7">
                    <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[#00BFA6] block" />
                    <span className="text-[#00BFA6] text-[11px] font-semibold tracking-[.12em] uppercase">
                        Marketing Technology Agency
                    </span>
                </div>

                {/* Headline */}
                <h1 className="anim-fade-2 relative z-10 text-white font-black leading-[1.08] tracking-tight mb-5"
                    style={{ fontSize: "clamp(40px,7vw,88px)", maxWidth: 860 }}>
                    Strategy. Design.{" "}
                    <span className="text-[#00BFA6]">Technology.</span>
                    <br />
                    <span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.28)", color: "transparent" }}>
                        Built to grow your brand.
                    </span>
                </h1>

                {/* Sub */}
                <p className="anim-fade-3 relative z-10 text-white/55 font-light leading-relaxed mb-10"
                    style={{ fontSize: "clamp(15px,1.8vw,18px)", maxWidth: 480 }}>
                    We help SMEs, startups, and service brands grow with clear positioning,
                    sharp design, and digital systems that convert.
                </p>

                {/* CTAs */}
                <div className="anim-fade-4 relative z-10 flex flex-wrap gap-3 justify-center mb-16">
                    <a href="#contact"
                        className="bg-[#00BFA6] hover:bg-[#00a892] text-[#0B1F3A] font-bold text-sm px-7 py-3.5 rounded-lg transition-colors duration-200"
                        style={{ boxShadow: "0 0 28px rgba(0,191,166,.3)" }}>
                        Start a Project →
                    </a>
                    <a href="#services"
                        className="border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-medium text-sm px-7 py-3.5 rounded-lg transition-all duration-200">
                        See Our Services
                    </a>
                </div>
                <div className="anim-fade-5 relative z-10 w-full max-w-5xl h-80 md:h-[480px] flex items-center justify-center">

                    {/* Glow behind Spline */}
                    <div
                        className="absolute w-[500px] h-[300px] rounded-full opacity-30"
                        style={{
                            background: "radial-gradient(ellipse, rgba(0,191,166,0.35), transparent 70%)",
                            filter: "blur(60px)"
                        }}
                    />

                    {/* Spline iframe */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden">
                        <div className="anim-fade-5 relative z-10 w-full max-w-5xl h-80 md:h-[480px] flex items-center justify-center">

                            {/* Glow behind */}
                            <div
                                className="absolute w-[500px] h-[300px] rounded-full opacity-30"
                                style={{
                                    background: "radial-gradient(ellipse, rgba(0,191,166,0.35), transparent 70%)",
                                    filter: "blur(60px)"
                                }}
                            />

                            {/* Floating Image */}
                            <div
                                className="floating-img"
                                onMouseMove={(e) => {
                                    const x = (e.clientX / window.innerWidth - 0.5) * 10;
                                    const y = (e.clientY / window.innerHeight - 0.5) * 10;
                                    e.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
                                }}
                            >
                                <img
                                    src={cubes}
                                    alt="3D cubes"
                                    className="w-full max-w-3xl object-contain opacity-95"
                                    style={{ mixBlendMode: "screen" }}
                                />
                            </div>

                        </div>
                    </div>

                </div>

                {/* Scroll cue */}
                <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
                    <div className="scroll-bar w-px h-8" style={{ background: "linear-gradient(to bottom,rgba(0,191,166,.6),transparent)" }} />
                    <span className="text-white/25 text-[9px] tracking-[.2em] uppercase">Scroll</span>
                </div>
            </section>

            {/* ── 2. STATS ───────────────────────────────────────────── */}
            <section className="bg-[#F5F7FA] px-6 py-12">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[#0B1F3A]/10 divide-y md:divide-y-0">
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
            <section id="services" className="bg-[#0B1F3A] px-6 py-24">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-12">
                        <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-3">What We Do</span>
                        <h2 className="reveal text-white font-black leading-tight tracking-tight"
                            style={{ fontSize: "clamp(28px,4vw,48px)", maxWidth: 480 }}>
                            Everything your brand needs to grow
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        <div className="reveal"><ServiceCard icon="🧠" title="Brand Strategy & Identity"
                            desc="Positioning, messaging, and visual direction that make your brand stand for something real." /></div>
                        <div className="reveal" style={{ transitionDelay: "80ms" }}><ServiceCard icon="📣" title="Social Media & Digital Marketing"
                            desc="Campaigns and content strategies that grow your audience and drive consistent engagement." /></div>
                        <div className="reveal" style={{ transitionDelay: "160ms" }}><ServiceCard icon="💻" title="Web Design & Development"
                            desc="Clean, fast, responsive websites engineered to convert visitors into customers." /></div>
                        <div className="reveal" style={{ transitionDelay: "240ms" }}><ServiceCard icon="⚙️" title="Growth Systems"
                            desc="Lead funnels, automation, and conversion flows built to compound your results over time." /></div>
                    </div>
                </div>
            </section>

            {/* ── 4. ABOUT ───────────────────────────────────────────── */}
            <section id="about" className="bg-[#F5F7FA] px-6 py-24">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

                    {/* Image slot
              ───────────────────────────────────────────────────────
              REPLACE with a real photo. Good options on unsplash.com:
              Search "digital agency team", "brand strategy desk", or
              "startup team macbook". Download and place in /public/images/
              Then use: <img src="/images/about.jpg" className="w-full h-full object-cover rounded-2xl" />
              ─────────────────────────────────────────────────────── */}
                    <div className="reveal w-full h-80 lg:h-[420px] rounded-2xl flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg,#0B1F3A,#0D2E4A)" }}>
                        {/* <div className="text-center">
                            <p className="text-white/15 text-xs tracking-widest uppercase mb-1">[ Team / Studio Photo ]</p>
                            <p className="text-[#00BFA6]/30 text-xs italic">Replace with a real image from Unsplash</p>
                        </div> */}
                        <img src={ab}
                            className="w-full h-full object-cover rounded-2xl" />
                    </div>

                    {/* Copy */}
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
            <section id="work" className="bg-[#060F1D] px-6 py-24 text-white">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    <div>
                        <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-3">How We Work</span>
                        <h2 className="reveal font-black leading-tight tracking-tight mb-1"
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
                            className="w-full h-80 lg:h-96 rounded-2xl border border-[#00BFA6]/10 flex items-center justify-center overflow-hidden"
                            style={{
                                background: "linear-gradient(135deg,rgba(0,191,166,.04),rgba(0,191,166,.01))"
                            }}
                        >
                            <Player
                                autoplay
                                loop
                                src="https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json"
                                style={{ width: "100%", height: "100%" }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. WHO WE SERVE  */}
            <section className="bg-[#0B1F3A] px-6 py-24 text-white text-center">
                <div className="max-w-5xl mx-auto">
                    <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-3">Who We Serve</span>
                    <h2 className="reveal font-black leading-tight tracking-tight mb-14 mx-auto"
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
                                className="ind-card reveal border border-white/[.07] rounded-xl px-5 py-7 cursor-default"
                                style={{ transitionDelay: `${i * 60}ms` }}>
                                <div className="text-3xl mb-3">{icon}</div>
                                <h4 className="text-white font-bold text-sm mb-1.5 leading-snug">{title}</h4>
                                <p className="text-white/40 text-[13px] leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 7. CTA ─────────────────────────────────────────────── */}
            <section id="contact" className="relative bg-[#0B1F3A] px-6 py-28 text-white text-center overflow-hidden">
                {/* Background glow */}
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
                            className="bg-[#00BFA6] hover:bg-[#00a892] text-[#0B1F3A] font-bold text-[15px] px-9 py-4 rounded-lg transition-colors duration-200"
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