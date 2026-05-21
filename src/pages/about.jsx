import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Player } from "@lottiefiles/react-lottie-player";
import abouthero from "../assets/images/abouthero.jpg"
import arhin from "../assets/images/arhin.JPG"
import james from "../assets/images/james1.jpg"
import operateImg from "../assets/images/operateImg.jpeg";
import { Helmet } from 'react-helmet-async';

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;

const STYLES = `
  body { font-family: 'Plus Jakarta Sans', sans-serif; }
  h1,h2,h3,h4 { font-family: 'Plus Jakarta Sans', sans-serif; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes countUp { from { opacity:0; } to { opacity:1; } }

  .anim-1 { animation: fadeUp .65s .05s both; }
  .anim-2 { animation: fadeUp .65s .18s both; }
  .anim-3 { animation: fadeUp .65s .30s both; }
  .anim-4 { animation: fadeUp .65s .42s both; }

  .reveal { opacity:0; transform:translateY(22px); transition: opacity .55s ease, transform .55s ease; }
  .reveal.in { opacity:1; transform:translateY(0); }

  .val-card { transition: border-color .2s, transform .2s; }
  .val-card:hover { border-color: rgba(0,191,166,0.35) !important; transform: translateY(-4px); }
`;

/* ── Scroll reveal ──────────────────────────────────────────────── */
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
            requestAnimationFrame(step);
            io.disconnect();
        }, { threshold: .5 });
        if (ref.current) io.observe(ref.current);
        return () => io.disconnect();
    }, [to]);
    return <span ref={ref}>{n}{suffix}</span>;
}

/* ── Data ───────────────────────────────────────────────────────── */
const VALUES = [
    { icon: "◆", title: "Strategy first, always", desc: "Every project starts with clear strategic thinking." },
    { icon: "◇", title: "Clarity over cleverness", desc: "If people don’t understand it quickly, it’s not ready yet." },
    { icon: "◈", title: "Built to compound", desc: " We build systems designed to generate long-term growth." },
    { icon: "◉", title: "Data-honest", desc: " We focus on real performance, not vanity metrics." },
];

const TEAM = [
    { role: "Co-Founder & Strategy Lead", name: "Arhin Owuraku Agyeman", img: arhin, linkedin: "https://www.linkedin.com/in/owuraku-arhin-oz/" },
    { role: "Co-Founder & Lead Engineer", name: "James Junior Baah", img: james, linkedin: "https://www.linkedin.com/in/james-kojo-junior-baah/" },
];

const HOW_WE_OPERATE = [
    "Senior-led on every engagement",
    "Weekly checkpoints & transparent timelines",
    "One Slack channel, real humans on the other side",
    "Outcome-tied KPIs from kickoff to launch",
];

/* ── Image placeholder slot ─────────────────────────────────────── */
function ImgSlot({ label, className = "" }) {
    return (
        <div
            className={`bg-[#e8eef4] flex items-center justify-center ${className}`}
            style={{ border: "1.5px dashed #c5d0dc" }}
        >
            <span className="text-[#0B1F3A]/25 text-xs font-medium text-center px-3">{label}</span>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════════
   ABOUT PAGE
══════════════════════════════════════════════════════════════════ */
export default function About() {
    useReveal();

    return (

        <>
            <Helmet>
                <title>About Nexux</title>
                <meta name="description" content="Learn about Nexux — a marketing technology agency in Accra built to help Ghanaian SMEs and startups grow with clarity and strategy." />
            </Helmet>

            <style>{FONTS + STYLES}</style>
            <Navbar />

            {/* ── HERO ────────────────────────────────────────────── */}
            <section className="relative pt-36 pb-24 px-6 overflow-hidden">

                {/* Background image */}
                <img
                    src={abouthero}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark overlay */}
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(90deg, rgba(11,31,58,0.85) 0%, rgba(11,31,58,0.60) 55%, rgba(11,31,58,0.20) 100%)" }}
                />

                <div className="relative max-w-6xl mx-auto">
                    <span className="anim-1 block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-4">
                        About Nexux
                    </span>
                    <h1
                        className="anim-2 text-white font-extrabold leading-[1.06] tracking-tight mb-6"
                        style={{ fontSize: "clamp(38px, 5.5vw, 72px)", maxWidth: 820 }}
                    >
                        A marketing technology agency built for how{" "}
                        <span className="text-[#00BFA6]">modern brands actually grow.</span>
                    </h1>
                    <p
                        className="anim-3 text-white/70 leading-relaxed mb-10"
                        style={{ fontSize: "clamp(15px,1.6vw,18px)", maxWidth: 560 }}
                    >
                        We combine strategy, design, and digital technology to help ambitious businesses grow with clarity, consistency, and measurable results.
                    </p>
                    <div className="anim-4 flex flex-wrap gap-3">
                        <Link
                            to="/contact"
                            className="bg-[#00BFA6] hover:bg-[#00a892] text-white font-bold text-sm px-7 py-3.5 rounded-lg transition-colors duration-200"
                            style={{ boxShadow: "0 4px 20px rgba(0,191,166,.25)" }}
                        >
                            Start a Project →
                        </Link>
                        <Link
                            to="/work"
                            className="border border-white/30 hover:border-white/60 text-white/75 hover:text-white hover:bg-gray-50 font-medium text-sm px-7 py-3.5 rounded-lg transition-all duration-200"
                        >
                            See our work
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── MISSION & VISION ────────────────────────────────── */}
            <section className="bg-white px-6 py-24">
                <div className="max-w-6xl mx-auto">

                    {/* Section label */}
                    <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-12">
                        Mission & Vision
                    </span>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Mission card */}
                        <div
                            className="reveal rounded-2xl p-10 flex flex-col gap-6"
                            style={{ background: "linear-gradient(135deg, #0B1F3A 0%, #0d2848 100%)" }}
                        >
                            {/* Icon */}
                            <div className="w-12 h-12 rounded-xl bg-[#00BFA6]/15 border border-[#00BFA6]/25 flex items-center justify-center shrink-0">
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                    <circle cx="11" cy="11" r="4" fill="#00BFA6" />
                                    <circle cx="11" cy="11" r="9" stroke="#00BFA6" strokeWidth="1.5" strokeDasharray="4 2" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[#00BFA6] text-[11px] font-bold tracking-widest uppercase mb-3">
                                    Mission Statement
                                </p>
                                <p className="text-white font-extrabold leading-snug tracking-tight"
                                    style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}>
                                    To connect strategy and technology to build marketing systems that help ambitious brands grow consistently.
                                </p>
                            </div>
                        </div>

                        {/* Vision card */}
                        <div
                            className="reveal rounded-2xl p-10 flex flex-col gap-6 border border-[#00BFA6]/20"
                            style={{ background: "linear-gradient(135deg, #f0f9f7 0%, #e8f7f4 100%)", transitionDelay: "80ms" }}
                        >
                            {/* Icon */}
                            <div className="w-12 h-12 rounded-xl bg-[#0B1F3A]/08 border border-[#0B1F3A]/10 flex items-center justify-center shrink-0">
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                    <path d="M2 11C2 11 5 5 11 5C17 5 20 11 20 11C20 11 17 17 11 17C5 17 2 11 2 11Z" stroke="#0B1F3A" strokeWidth="1.5" />
                                    <circle cx="11" cy="11" r="3" fill="#00BFA6" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[#0B1F3A] text-[11px] font-bold tracking-widest uppercase mb-3">
                                    Vision Statement
                                </p>
                                <p className="text-[#0B1F3A] font-extrabold leading-snug tracking-tight"
                                    style={{ fontSize: "clamp(20px, 2.2vw, 28px)" }}>
                                    To become a leading marketing technology agency that helps brands grow through clarity, systems, and innovation across Africa and beyond.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── STORY ───────────────────────────────────────────── */}
            <section className="bg-[#F5F7FA] px-6 py-24">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

                    {/* LEFT */}
                    <div className="reveal">
                        <span className="block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-4">
                            Why Nexux Exists
                        </span>
                        <h2
                            className="text-[#0B1F3A] font-extrabold leading-tight tracking-tight mb-6"
                            style={{ fontSize: "clamp(26px,3.4vw,42px)" }}
                        >
                            Most brands don't fail at marketing they fail at the{" "}
                            <span className="text-[#00BFA6]">system behind it.</span>
                        </h2>
                        <div className="w-10 h-[3px] rounded-full bg-[#00BFA6] mb-6" />
                    </div>

                    {/* RIGHT — 3 reason cards */}
                    <div className="reveal flex flex-col gap-4" style={{ transitionDelay: "80ms" }}>
                        {[
                            {
                                icon: (
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#00BFA6" strokeWidth="1.5" />
                                        <rect x="12" y="3" width="7" height="7" rx="1.5" stroke="#00BFA6" strokeWidth="1.5" />
                                        <rect x="3" y="12" width="7" height="7" rx="1.5" stroke="#00BFA6" strokeWidth="1.5" />
                                        <path d="M15.5 12v7M12 15.5h7" stroke="#00BFA6" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                ),
                                title: "Businesses are stuck in disconnected efforts.",
                                desc: "Random campaigns, scattered tools and freelancers with no clear direction.",
                            },
                            {
                                icon: (
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <circle cx="11" cy="11" r="8" stroke="#00BFA6" strokeWidth="1.5" />
                                        <path d="M7 11l3 3 5-5" stroke="#00BFA6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ),
                                title: "We create one unified system.",
                                desc: "Strategy, design and technology aligned to drive consistent growth.",
                            },
                            {
                                icon: (
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <path d="M4 16l4-4 3 3 4-5 3 3" stroke="#00BFA6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4 19h14" stroke="#00BFA6" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                ),
                                title: "We help ambitious brands grow.",
                                desc: "More clarity, better consistency and stronger results.",
                            },
                        ].map(({ icon, title, desc }, i) => (
                            <div
                                key={title}
                                className="flex gap-4 items-start bg-white border border-gray-100 rounded-2xl p-6"
                                style={{ transitionDelay: `${i * 80}ms` }}
                            >
                                <div className="w-11 h-11 rounded-xl bg-[#00BFA6]/10 border border-[#00BFA6]/20 flex items-center justify-center shrink-0">
                                    {icon}
                                </div>
                                <div>
                                    <p className="text-[#0B1F3A] font-bold text-sm mb-1">{title}</p>
                                    <p className="text-[#556677] text-sm leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ── HOW WE OPERATE ──────────────────────────────────── */}
            <section className="bg-white px-6 py-24">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

                    {/* LEFT — photo */}
                    <div className="reveal relative">
                        <div className="w-full h-[460px] rounded-2xl overflow-hidden">
                            <img
                                src={operateImg}
                                alt="Nexux team at work"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* teal dot grid deco */}
                        <svg className="absolute -bottom-5 -right-5 pointer-events-none" style={{ width: 120, height: 120 }} viewBox="0 0 120 120">
                            {[0, 1, 2, 3].map(r => [0, 1, 2, 3].map(c => (
                                <circle key={`${r}${c}`} cx={c * 30 + 15} cy={r * 30 + 15} r="2.5" fill="#00BFA6" opacity="0.5" />
                            )))}
                        </svg>
                    </div>

                    {/* RIGHT — copy */}
                    <div className="reveal flex flex-col justify-center" style={{ transitionDelay: "80ms" }}>
                        <span className="block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-4">
                            How We Operate
                        </span>
                        <h3
                            className="text-[#0B1F3A] font-extrabold leading-tight tracking-tight mb-4"
                            style={{ fontSize: "clamp(28px,3.5vw,44px)" }}
                        >
                            A small team, a sharp process,{" "}
                            <span className="text-[#00BFA6]">no bloat.</span>
                        </h3>
                        <p className="text-[#556677] text-base leading-relaxed mb-8">
                            We stay intentionally lean so every project gets senior-level
                            thinking, faster execution, and direct collaboration.
                        </p>

                        <div className="flex flex-col gap-5">
                            {[
                                {
                                    icon: (
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM4 18c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#00BFA6" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    ),
                                    title: "You work directly with experts",
                                    desc: "No layers. Just experienced people who care about outcomes.",
                                },
                                {
                                    icon: (
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <rect x="2" y="4" width="16" height="13" rx="2" stroke="#00BFA6" strokeWidth="1.5" />
                                            <path d="M6 2v4M14 2v4M2 9h16" stroke="#00BFA6" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    ),
                                    title: "You always know what's happening and when",
                                    desc: "We set expectations early and keep you updated at every step.",
                                },
                                {
                                    icon: (
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M3 14l4-4 3 3 4-5 3 2" stroke="#00BFA6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M3 17h14" stroke="#00BFA6" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    ),
                                    title: "Strategy connected to measurable outcomes",
                                    desc: "We focus on results that move your business forward.",
                                },
                            ].map(({ icon, title, desc }) => (
                                <div key={title} className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-lg bg-[#00BFA6]/10 border border-[#00BFA6]/20 flex items-center justify-center shrink-0">
                                        {icon}
                                    </div>
                                    <div>
                                        <p className="text-[#0B1F3A] font-bold text-sm mb-0.5">{title}</p>
                                        <p className="text-[#556677] text-sm leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* ── VALUES ──────────────────────────────────────────── */}
            <section className="bg-[#F5F7FA] px-6 py-24">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-14">
                        <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-3">
                            What We Believe
                        </span>
                        <h2
                            className="reveal text-[#0B1F3A] font-extrabold leading-tight tracking-tight"
                            style={{ fontSize: "clamp(28px,4vw,48px)" }}
                        >
                            Four principles we don't bend on.
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {VALUES.map((v, i) => (
                            <div
                                key={v.title}
                                className="val-card reveal bg-white border border-gray-100 rounded-2xl p-7"
                                style={{ transitionDelay: `${i * 70}ms` }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#00BFA6]/10 flex items-center justify-center text-[#00BFA6] text-xl font-bold mb-5">
                                    {v.icon}
                                </div>
                                <h4 className="text-[#0B1F3A] font-extrabold text-base mb-2 leading-snug">{v.title}</h4>
                                <p className="text-[#0B1F3A]/50 text-sm leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TEAM ────────────────────────────────────────────── */}
            <section className="bg-white px-6 py-24">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
                        <div>
                            <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-3">
                                The Team
                            </span>
                            <h2
                                className="reveal text-[#0B1F3A] font-extrabold leading-tight tracking-tight"
                                style={{ fontSize: "clamp(26px,3.5vw,44px)", maxWidth: 480 }}
                            >
                                A small group of senior operators.
                            </h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                        {TEAM.map((m, i) => (
                            <div key={m.role} className="reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                                <div className="w-full aspect-[4/5] rounded-2xl mb-4 overflow-hidden">
                                    <img
                                        src={m.img}
                                        alt={m.name}
                                        className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                                <p className="text-[#0B1F3A] font-bold text-sm leading-tight mb-0.5">{m.name}</p>
                                <p className="text-[#0B1F3A]/45 text-xs tracking-wide mb-3">{m.role}</p>
                                <a
                                    href={m.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-[#0B1F3A]/40 hover:text-[#0077B5] transition-colors duration-200"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    {/* <span className="text-xs font-medium">LinkedIn</span> */}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ─────────────────────────────────────────────── */}
            <section className="relative bg-[#0B1F3A] px-6 py-24 text-white text-center overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[600px] h-[300px] opacity-20 rounded-full"
                        style={{ background: "radial-gradient(ellipse,#00BFA6,transparent 65%)", filter: "blur(50px)" }} />
                </div>
                <div className="relative z-10 max-w-2xl mx-auto">
                    <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-4">
                        Let's Talk
                    </span>
                    <h2
                        className="reveal font-extrabold leading-tight tracking-tight mb-5"
                        style={{ fontSize: "clamp(30px,5vw,56px)" }}
                    >
                        Let’s build something that{" "}
                        <span className="text-[#00BFA6]">grows.</span>
                    </h2>
                    <p className="reveal text-white/55 text-base leading-relaxed mb-9 mx-auto" style={{ maxWidth: 420 }}>
                        Let’s talk about where your business is and where it could be.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block bg-[#00BFA6] hover:bg-[#00a892] text-white font-bold text-[15px] px-9 py-4 rounded-lg transition-colors"
                        style={{ boxShadow: "0 0 32px rgba(0,191,166,.3)" }}
                    >
                        Start a Project →
                    </Link>
                </div>
            </section>

            <Footer />
        </>
    );
}