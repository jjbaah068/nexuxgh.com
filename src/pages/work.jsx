import { useState, useEffect } from "react";
import { Link } from "react-router";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import workHero from "../assets/images/workshero.jpeg";
import nexuxVideo from "../assets/videos/nexuxvid.mp4";
import philgoodImg from "../assets/images/philgoodmockup1.png";
import melanuImg from "../assets/images/melanumockup.png";
import { Helmet } from 'react-helmet-async';





const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;

const STYLES = `
  body { font-family: 'Plus Jakarta Sans', sans-serif; }
  h1,h2,h3,h4 { font-family: 'Plus Jakarta Sans', sans-serif; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }

  .anim-1 { animation: fadeUp .65s .05s both; }
  .anim-2 { animation: fadeUp .65s .18s both; }
  .anim-3 { animation: fadeUp .65s .30s both; }
  .anim-4 { animation: fadeUp .65s .42s both; }

  .reveal { opacity:0; transform:translateY(22px); transition: opacity .55s ease, transform .55s ease; }
  .reveal.in { opacity:1; transform:translateY(0); }

  /* Project card hover */
  .proj-card { transition: transform .3s ease, box-shadow .3s ease; }
  .proj-card:hover { transform: translateY(-6px); box-shadow: 0 24px 56px rgba(11,31,58,0.12); }
  .proj-card:hover .proj-img { transform: scale(1.04); }
  .proj-img { transition: transform .5s ease; }
  /* Float animation for phone mockup */
@keyframes floatUp {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
@keyframes fadeScale {
  from { opacity: 0; transform: scale(0.92) translateY(16px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.mockup-float {
  animation: floatUp 4s ease-in-out 0.7s infinite;
}
.mockup-enter {
  animation: fadeScale 0.7s ease both;
}
  .proj-card:hover .proj-tag { background: #00BFA6; color: white; }

  /* Filter pill */
  .filter-pill { transition: background .2s, color .2s, border-color .2s; cursor: pointer; }
  .filter-pill.active { background: #0B1F3A; color: white; border-color: #0B1F3A; }

  /* Testimonial card */
  .testi-card { transition: border-color .2s, transform .2s; }
  .testi-card:hover { border-color: rgba(0,191,166,0.35); transform: translateY(-3px); }
`;

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

/* ── DATA ───────────────────────────────────────────────────────── */
const PROJECTS = [
    {
        id: 1,
        client: "PhilGood Homes",
        category: "Web Design & Development",
        tag: "web",
        headline: "An apartment booking platform built for PhilGood Homes designed to convert visitors into guests.",
        result: "Live booking system launched",
        img: philgoodImg,
        accent: "#F59F00",
        featured: true,
        isMockup: true,
        mockupBg: "#f0f4f8",
    },
    {
        id: 2,
        client: "Melanu",
        category: "Web Design & Development",
        tag: "web",
        headline: "A skincare brand website built to celebrate African beauty and convert browsers into buyers.",
        result: "Brand presence launched online",
        img: melanuImg,
        accent: "#C8860A",
        featured: true,
        isMockup: true,
        mockupBg: "#f5ede0",
    },
];

const FILTERS = [
    { label: "All Work", value: "all" },
    { label: "Web Design", value: "web" },
    { label: "Brand Strategy", value: "brand" },
    { label: "Digital Marketing", value: "marketing" },
    { label: "Growth Systems", value: "growth" },
];

const TESTIMONIALS = [
    {
        quote: "Working with the Nexux team was a smooth experience from start to finish. They were calm, attentive, and really took time to understand exactly what we wanted for PhilGood Homes. Instead of rushing the process, they listened carefully, presented us with multiple creative options, and guided us through the best direction for our apartment booking website.When the final product was presented, my immediate reaction was simple ‘This is solid.’ The website truly captured our vision and elevated our brand online",
        name: "Nana Kwame",
        role: "Founder, PhilGood Homes",
        initials: "NK",
    },
    {
        quote: "From the very first meeting, it was clear that James and the Nexux team genuinely cared about bringing the MelAnu vision to life. They didn’t just build a website — they took time to understand our brand identity, target audience, and the feeling we wanted customers to experience online.The process was thoughtful and stress-free. Every idea we shared was received with attention, and we were presented with creative options that made decision-making easy.",
        name: "Anita Asige",
        role: "CEO, Melanu Skincare",
        initials: "AA",
    },
];

/* ── IMAGE PLACEHOLDER ──────────────────────────────────────────── */
function ProjectImgSlot({ label, accent }) {
    return (
        <div
            className="w-full h-full flex flex-col items-center justify-center gap-3"
            style={{ background: `${accent}08` }}
        >
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${accent}18`, border: `1.5px solid ${accent}30` }}
            >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="3" width="16" height="13" rx="2" stroke={accent} strokeWidth="1.5" />
                    <path d="M2 13l4-4 3 3 3-3 4 4" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="13.5" cy="7.5" r="1.5" fill={accent} />
                </svg>
            </div>
            <p className="text-[11px] font-medium text-center px-4" style={{ color: `${accent}80` }}>{label}</p>
        </div>
    );
}

/* ── PROJECT CARD ───────────────────────────────────────────────── */
function ProjectCard({ project, delay = 0 }) {
    const isFeatured = project.featured;

    return (
        <div
            className={`proj-card reveal bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col ${isFeatured ? "lg:col-span-2" : ""}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {/* Image area */}
            <div className={`w-full overflow-hidden ${isFeatured ? "h-72" : "h-52"}`}>
                {project.img ? (
                    <div
                        className="w-full h-full flex items-center justify-center py-3"
                        style={{
                            background: project.isMockup
                                ? project.mockupBg || "#f5ede0"
                                : "#f8f9fb"
                        }}
                    >
                        {project.isMockup ? (
                            <div className="mockup-enter" style={{ maxHeight: "240px" }}>
                                <img
                                    src={project.img}
                                    alt={project.client}
                                    className="proj-img mockup-float object-contain"
                                    style={{ maxHeight: "240px", width: "auto" }}
                                />
                            </div>
                        ) : (
                            <img
                                src={project.img}
                                alt={project.client}
                                className="proj-img w-full h-full object-contain"
                            />
                        )}
                    </div>
                ) : (
                    <ProjectImgSlot label={project.imgLabel} accent={project.accent} />
                )}
            </div>

            {/* Content */}
            <div className="p-7 flex flex-col gap-4 flex-1">
                <div className="flex items-center justify-between gap-3">
                    <span
                        className="proj-tag text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full transition-colors duration-200"
                        style={{ background: `${project.accent}12`, color: project.accent }}
                    >
                        {project.category}
                    </span>
                    <span className="text-[#0B1F3A]/25 text-xs font-medium">{project.client}</span>
                </div>

                <h3
                    className="text-[#0B1F3A] font-extrabold leading-snug tracking-tight flex-1"
                    style={{ fontSize: isFeatured ? "clamp(18px,1.8vw,22px)" : "16px" }}
                >
                    {project.headline}
                </h3>

                {/* Result pill */}
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00BFA6]" />
                    <span className="text-[#00BFA6] text-xs font-bold">{project.result}</span>
                </div>

                {/* <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-sm font-bold mt-auto transition-colors duration-200"
                    style={{ color: project.accent }}
                >
                    View case study →
                </a> */}
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════════
   WORK PAGE
══════════════════════════════════════════════════════════════════ */
export default function Work() {
    useReveal();
    const [activeFilter, setActiveFilter] = useState("all");

    const filtered = activeFilter === "all"
        ? PROJECTS
        : PROJECTS.filter((p) => p.tag === activeFilter);

    return (
        <>
            <Helmet>
                <title>Our Work</title>
                <meta name="description" content="See how Nexux has helped brands in Ghana grow through web design, brand strategy, digital marketing, and growth systems." />
            </Helmet>
            <style>{FONTS + STYLES}</style>
            <Navbar />

            {/* ── HERO ────────────────────────────────────────────── */}
            <section className="relative overflow-hidden min-h-[520px] flex items-center">

                {/* Background image */}
                <img
                    src={workHero}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />

                {/* Light overlay — image is bright so use a soft white fade on the left */}
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(90deg, rgba(240,244,248,0.92) 0%, rgba(240,244,248,0.75) 50%, rgba(240,244,248,0.2) 100%)" }}
                />

                <div className="relative z-10 max-w-6xl mx-auto px-6 py-36 w-full">
                    <div className="max-w-2xl">
                        <h1
                            className="anim-2 text-[#0B1F3A] font-extrabold leading-[1.06] tracking-tight mb-5"
                            style={{ fontSize: "clamp(38px, 5.5vw, 68px)" }}
                        >
                            Work that moves{" "}
                            <span className="text-[#00BFA6]">the needle.</span>
                        </h1>
                        <p
                            className="anim-3 text-[#0B1F3A]/60 leading-relaxed"
                            style={{ fontSize: "clamp(15px,1.6vw,18px)", maxWidth: 500 }}
                        >
                            Real projects. Real results. Every engagement is built around one measurable growth for our clients.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── VIDEO SECTION ───────────────────────────────────── */}
            <section className="bg-[#0B1F3A] px-6 py-20">
                <div className="max-w-5xl mx-auto">
                    <div className="reveal text-center mb-10">
                        {/* <span className="block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-3">Showreel</span> */}
                        <h2 className="text-white font-extrabold leading-tight tracking-tight"
                            style={{ fontSize: "clamp(24px,3vw,40px)" }}>
                            See the work in motion.
                        </h2>
                    </div>
                    <div className="reveal rounded-2xl overflow-hidden shadow-2xl"
                        style={{ boxShadow: "0 0 80px rgba(0,191,166,0.15)" }}>
                        <video
                            src={nexuxVideo}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full aspect-video object-contain"
                        />
                    </div>
                </div>
            </section>

            {/* ── PROJECTS GRID ───────────────────────────────────── */}
            <section className="bg-[#F5F7FA] px-6 py-20">
                <div className="max-w-6xl mx-auto">

                    {/* Project grid — all projects, no filter */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {PROJECTS.map((project, i) => (
                            <ProjectCard key={project.id} project={project} delay={i * 60} />
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className="text-center py-24">
                            <p className="text-[#0B1F3A]/30 text-base">No projects in this category yet.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ── TESTIMONIALS ─────────────────────────────────────── */}
            <section className="bg-white px-6 py-24">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-12">
                        <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-3">Client Feedback</span>
                        <h2 className="reveal text-[#0B1F3A] font-extrabold leading-tight tracking-tight"
                            style={{ fontSize: "clamp(26px,3.5vw,44px)", maxWidth: 460 }}>
                            What clients say after working with us.
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {TESTIMONIALS.map((t, i) => (
                            <div
                                key={t.name}
                                className="testi-card reveal bg-white border border-gray-100 rounded-2xl p-7 flex flex-col gap-5"
                                style={{ transitionDelay: `${i * 70}ms` }}
                            >
                                {/* Quote mark */}
                                <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                                    <path d="M0 20V12C0 8.667 .733 6 2.2 4.4 3.667 2.667 5.8 1.467 8.6.8L9.8 3.2C8.2 3.6 6.933 4.333 6 5.4 5.067 6.333 4.6 7.667 4.6 9.4H8.6V20H0ZM16 20V12c0-3.333.733-6 2.2-7.6 1.467-1.733 3.6-2.933 6.4-3.6L25.8 3.2c-1.6.4-2.867 1.133-3.8 2.2-.933.933-1.4 2.267-1.4 4H24.6V20H16Z" fill="#00BFA6" opacity="0.25" />
                                </svg>

                                <p className="text-[#334455] text-sm leading-relaxed flex-1">"{t.quote}"</p>

                                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                                    <div
                                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                                        style={{ background: "linear-gradient(135deg, #0B1F3A, #1a3d6e)" }}
                                    >
                                        {t.initials}
                                    </div>
                                    <div>
                                        <p className="text-[#0B1F3A] font-bold text-sm leading-none mb-0.5">{t.name}</p>
                                        <p className="text-[#0B1F3A]/40 text-xs">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ─────────────────────────────────────────────── */}
            <section className="relative bg-[#0B1F3A] px-6 py-24 text-white text-center overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[500px] h-[260px] opacity-20 rounded-full"
                        style={{ background: "radial-gradient(ellipse,#00BFA6,transparent 65%)", filter: "blur(50px)" }} />
                </div>
                <div className="relative z-10 max-w-xl mx-auto">
                    <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-4">Start a Project</span>
                    <h2 className="reveal font-extrabold leading-tight tracking-tight mb-5"
                        style={{ fontSize: "clamp(30px,4.5vw,52px)" }}>
                        Ready to be our<br />
                        <span className="text-[#00BFA6]">next success story?</span>
                    </h2>
                    <p className="reveal text-white/45 text-base leading-relaxed mb-10 mx-auto" style={{ maxWidth: 380, margin: "0 auto 2.5rem" }}>
                        Let's talk about what you're building and how we can help you grow it.
                    </p>
                    <div className="reveal flex flex-wrap gap-3 justify-center">
                        <a
                            href="mailto:info@nexuxgh.com"
                            className="bg-[#00BFA6] hover:bg-[#00a892] text-white font-bold text-[15px] px-9 py-4 rounded-lg transition-colors"
                            style={{ boxShadow: "0 0 32px rgba(0,191,166,.3)" }}
                        >
                            Start a conversation →
                        </a>
                        <Link
                            to="/services"
                            className="border border-white/20 hover:border-white/40 text-white/65 hover:text-white font-medium text-[15px] px-9 py-4 rounded-lg transition-all"
                        >
                            Our Services
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}