import { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ab from "../assets/images/image2.png";
import { Player } from "@lottiefiles/react-lottie-player";
import hero from "../assets/images/img4.png";
import { Helmet } from "react-helmet-async";
import ctaImg from '../assets/images/img8.png'

/* ── Page styles (fonts now live globally in index.css) ─────────── */
const ANIM_STYLES = `
  /* ---------- Cinematic hero ---------- */
  @keyframes heroZoom {
    from { transform: scale(1.18); filter: brightness(.35) blur(6px); }
    to   { transform: scale(1.02); filter: brightness(1) blur(0); }
  }
  @keyframes heroDrift {
    from { transform: scale(1.02); }
    to   { transform: scale(1.08); }
  }
  .hero-img {
    animation:
      heroZoom 2.4s cubic-bezier(.16,1,.3,1) both,
      heroDrift 22s ease-in-out 2.4s infinite alternate;
    will-change: transform;
  }

  @keyframes lineRise {
    from { transform: translateY(115%) rotate(4deg); opacity: 0; filter: blur(10px); }
    to   { transform: translateY(0) rotate(0);       opacity: 1; filter: blur(0); }
  }
  .hero-line        { display: block; overflow: hidden; padding-bottom: .1em; }
  .hero-line > span { display: inline-block; transform-origin: left bottom;
                      animation: lineRise 1.2s cubic-bezier(.16,1,.3,1) both; }

  @keyframes ruleDraw { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  .hero-rule { transform-origin: left; animation: ruleDraw 1.4s cubic-bezier(.65,0,.35,1) .5s both; }

  @keyframes softIn {
    from { opacity: 0; transform: translateY(14px); filter: blur(4px); }
    to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
  }
  .hero-soft { animation: softIn .9s cubic-bezier(.16,1,.3,1) both; }

  @media (prefers-reduced-motion: reduce) {
    .hero-img, .hero-line > span, .hero-rule, .hero-soft { animation: none !important; }
  }

  /* ---------- Rest of page ---------- */
  .reveal { opacity:0; transform:translateY(20px); transition: opacity .6s ease, transform .6s ease; }
  .reveal.in { opacity:1; transform:translateY(0); }

  .svc-card { transition: transform .25s, box-shadow .25s, border-color .25s; }
  .svc-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,0,0,.08); border-color: rgba(0,191,166,.3) !important; }

  .ind-card { transition: transform .2s, border-color .2s; }
  .ind-card:hover { transform:translateY(-4px); border-color:rgba(0,191,166,.3) !important; }

  .proc-step { transition: padding-left .2s; }
  .proc-step:hover { padding-left: 8px; }
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

/* ── Hero ───────────────────────────────────────────────────────── */
const HERO_LINES = ["Strategy, design", "and technology that", "grow your business."];

function Hero() {
    return (
        <section id="home" className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-[#0B1F3A]">
            {/* Full-bleed photo */}
            <img
                src={hero}
                alt="Smiling woman working on a laptop"
                fetchPriority="high"
                className="hero-img absolute inset-0 w-full h-full object-cover object-center lg:object-[center_35%]"
            />

            {/* Light overlays: top for the navbar, bottom for the text band. The middle stays clear. */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(180deg, rgba(11,31,58,.5) 0%, rgba(11,31,58,0) 20%)" }} />
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(0deg, rgba(11,31,58,.92) 0%, rgba(11,31,58,.6) 28%, rgba(11,31,58,0) 58%)" }} />

            {/* Lower-third text band */}
            <div className="relative z-10 max-w-6xl mx-auto w-full px-6 pb-12 md:pb-16">
                {/* Hairline that draws across, with a teal lead segment */}
                {/* <div className="hero-rule relative h-px w-full bg-white/25 mb-8 md:mb-10">
                    <span className="absolute left-0 top-[-1px] h-[3px] w-16 bg-[#00BFA6] rounded-full" />
                </div> */}

                <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-16 items-end">
                    <h1
                        className="text-white font-semibold leading-[1.06]"
                        style={{ fontSize: "clamp(30px, 3.6vw, 52px)", letterSpacing: "-0.03em" }}
                    >
                        {HERO_LINES.map((line, i) => (
                            <span key={line} className="hero-line">
                                <span style={{ animationDelay: `${0.7 + i * 0.14}s` }}>{line}</span>
                            </span>
                        ))}
                    </h1>

                    <div className="lg:pb-2">
                        <p className="hero-soft text-white/80 leading-relaxed mb-6"
                            style={{ fontSize: "clamp(15px,1.3vw,17px)", maxWidth: 380, animationDelay: "1.5s" }}>
                            For SMEs ready to move from confusion to clarity.
                        </p>

                        <div className="hero-soft flex flex-wrap gap-3" style={{ animationDelay: "1.7s" }}>
                            {/* <a href="/contact"
                                className="bg-[#00BFA6] hover:bg-[#00a892] text-white font-semibold text-sm px-7 py-3.5 rounded-lg transition-colors duration-200 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
                                style={{ boxShadow: "0 8px 30px rgba(0,191,166,.3)" }}>
                                Start a project
                            </a> */}
                            <a href="/work"
                                className="border border-white/35 hover:border-white hover:bg-white/10 backdrop-blur-sm text-white font-medium text-sm px-7 py-3.5 rounded-lg transition-all duration-200 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white">
                                See our work
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════════
   HOME
══════════════════════════════════════════════════════════════════ */
export default function Home() {
    useReveal();

    return (
        <>
            <Helmet>
                <title>Home - Nexux</title>
                <meta name="description" content="Nexux is a marketing technology agency in Accra, Ghana helping SMEs grow through brand strategy, digital marketing, website design, and growth systems." />
            </Helmet>

            <style>{ANIM_STYLES}</style>

            {/* transparent = see-through over the hero, white once you scroll */}
            <Navbar transparent />

            {/* ── 1. HERO */}
            <Hero />

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
                            desc="We help brands find clarity through positioning, messaging, and identity systems that create recognition and trust." /></div>
                        <div className="reveal" style={{ transitionDelay: "80ms" }}><ServiceCard icon="📣" title="Digital & Social Media Marketing"
                            desc="Strategic content and digital campaigns designed to attract attention, build trust, and drive measurable growth." /></div>
                        <div className="reveal" style={{ transitionDelay: "160ms" }}><ServiceCard icon="💻" title="Web Design & Development"
                            desc="High-performing websites built to communicate clearly, build credibility, and convert visitors into customers." /></div>
                        <div className="reveal" style={{ transitionDelay: "240ms" }}><ServiceCard icon="⚙️" title="Growth & Automation Systems"
                            desc="Funnels, automation, and structured workflows that help your business grow more efficiently." /></div>
                    </div>
                </div>
            </section>

            {/* ── 4. ABOUT */}
            <section id="about" className="bg-white px-6 py-24">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                    <div className="reveal w-full h-80 lg:h-[420px] rounded-2xl overflow-hidden">
                        <img src={ab} className="w-full h-full object-cover rounded-2xl" alt="About Nexux" />
                    </div>
                    <div className="reveal">
                        <span className="block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-3">Why Nexux</span>
                        <h2 className="text-[#0B1F3A] font-black leading-tight tracking-tight mb-4"
                            style={{ fontSize: "clamp(26px,3.5vw,42px)" }}>
                            We don't just build, we grow with your business
                        </h2>
                        <p className="text-[#556677] text-base leading-relaxed mb-7">
                            Nexux is built for businesses serious about growth. We combine brand thinking,
                            digital strategy, and precise execution to deliver results that compound  not
                            just one-off deliverables.
                        </p>
                        <ul className="flex flex-col gap-3 mb-8">
                            {[
                                "Strategy before execution",
                                "Design that converts, not just impresses",
                                "Marketing tied to real business outcomes",
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
                        <a href="/contact"
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
                            <Step n={1} title="Discovery"
                                desc="We learn about your business, audience, and goals before making any decisions." />
                            <Step n={2} title="Strategize"
                                desc="We create a clear direction for your brand, content, and growth." />
                            <Step n={3} title="Build"
                                desc="We execute the right assets — websites, campaigns, and systems built to perform." />
                            <Step n={4} title="Optimize"
                                desc="We measure, refine, and improve continuously for better results over time." />
                        </div>
                    </div>
                    <div className="reveal lg:sticky lg:top-24">
                        <div className="w-full h-80 lg:h-96 rounded-2xl border border-gray-200 flex items-center justify-center bg-white overflow-hidden">
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
            <section id="contact" className="relative overflow-hidden bg-[#86D3E7]">
                {/* Desktop: full photo pinned left at section height; its sky-blue background IS the section */}
                <img
                    src={ctaImg}
                    alt="Excited woman shouting out of a smartphone screen"
                    loading="lazy"
                    className="hidden lg:block absolute left-0 bottom-0 h-full w-auto max-w-none"
                    style={{
                        maskImage: "linear-gradient(90deg, #000 85%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(90deg, #000 85%, transparent 100%)",
                    }}
                />

                {/* Mobile: photo on top, full width */}
                {/* <img
                    src={ctaImg}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="lg:hidden block w-full h-auto"
                /> */}

                <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 lg:py-28 lg:min-h-[560px] flex items-center lg:justify-end">
                    <div className="max-w-md">
                        {/* "Sound lines" — the shout lands on the headline */}
                        <div className="reveal flex items-center gap-3 mb-4">
                            <svg width="26" height="22" viewBox="0 0 26 22" fill="none" aria-hidden="true">
                                <path d="M2 4l7 4M1 11h9M2 18l7-4" stroke="#0B1F3A" strokeWidth="2.2" strokeLinecap="round" />
                            </svg>
                            <span className="text-[#0B1F3A] text-[11px] font-bold tracking-widest uppercase">Let's Talk</span>
                        </div>

                        <h2 className="reveal text-[#0B1F3A] font-extrabold leading-[1.02] tracking-tight mb-5"
                            style={{ fontSize: "clamp(34px,4.8vw,60px)" }}>
                            Ready to grow<br />
                            your{" "}
                            <span className="inline-block bg-white px-3 rounded-xl -rotate-2 shadow-[0_8px_24px_rgba(11,31,58,.15)]">
                                brand?
                            </span>
                        </h2>

                        <p className="reveal text-[#0B1F3A]/75 text-base leading-relaxed mb-9" style={{ maxWidth: 380 }}>
                            One message is all it takes. Tell us where your business is, and we’ll show you where it could be.
                        </p>

                        <div className="reveal flex flex-wrap gap-3">
                            <a href="mailto:info@nexuxgh.com"
                                className="bg-[#0B1F3A] hover:bg-[#132d52] text-white font-semibold text-[15px] px-8 py-4 rounded-lg transition-colors duration-200"
                                style={{ boxShadow: "0 12px 30px rgba(11,31,58,.25)" }}>
                                Start a conversation
                            </a>
                            <a href="/work"
                                className="bg-white/70 hover:bg-white text-[#0B1F3A] font-semibold text-[15px] px-7 py-4 rounded-lg transition-colors duration-200">
                                See our Work
                            </a>
                        </div>
                    </div>
                </div>
            </section>


            <Footer />
        </>
    );
}