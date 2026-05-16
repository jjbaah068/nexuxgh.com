import { useState, useEffect } from "react";
import { Link } from "react-router";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import workHero from "../assets/images/workshero.jpeg";

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
        client: "Finova",
        category: "Web Design & Development",
        tag: "web",
        headline: "A fintech dashboard built to handle complexity without losing clarity.",
        result: "40% faster user onboarding",
        // IMAGE: import and replace `null` with your imported image
        // e.g. import finova from "../assets/images/work/finova.jpg"  → img: finova
        img: null,
        imgLabel: "Finova — Dashboard screenshot",
        accent: "#3B5BDB",
        featured: true,
    },
    {
        id: 2,
        client: "Elevate Brand Co.",
        category: "Brand Strategy & Identity",
        tag: "brand",
        headline: "Full brand identity system for a lifestyle brand entering the Ghanaian market.",
        result: "Brand launched in 6 weeks",
        img: null,
        imgLabel: "Elevate — Brand identity visuals",
        accent: "#E64980",
        featured: true,
    },
    {
        id: 3,
        client: "StayNest",
        category: "Digital Marketing",
        tag: "marketing",
        headline: "Social strategy and ad campaigns for a short-stay property brand in Accra.",
        result: "3× booking rate in 90 days",
        img: null,
        imgLabel: "StayNest — Campaign creatives",
        accent: "#00BFA6",
        featured: false,
    },
    {
        id: 4,
        client: "Kairos Kitchen",
        category: "Web Design & Development",
        tag: "web",
        headline: "Restaurant website with online reservation and menu management system.",
        result: "60% increase in reservations",
        img: null,
        imgLabel: "Kairos Kitchen — Website screenshot",
        accent: "#F59F00",
        featured: false,
    },
    {
        id: 5,
        client: "Meridian Logistics",
        category: "Growth Systems",
        tag: "growth",
        headline: "Lead funnel and CRM automation for a B2B logistics company.",
        result: "2× qualified leads per month",
        img: null,
        imgLabel: "Meridian — Funnel diagram",
        accent: "#3B5BDB",
        featured: false,
    },
    {
        id: 6,
        client: "Osei & Partners",
        category: "Brand Strategy & Identity",
        tag: "brand",
        headline: "Repositioning and visual identity for an established legal firm.",
        result: "New client enquiries up 45%",
        img: null,
        imgLabel: "Osei & Partners — Brand visuals",
        accent: "#0B1F3A",
        featured: false,
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
        quote: "Nexux didn't just build us a website — they built us a system. The results spoke for themselves within the first month.",
        name: "Kwame A.",
        role: "Founder, Finova",
        initials: "KA",
    },
    {
        quote: "The brand identity they created was exactly what we needed to stand out. Clean, intentional, and completely on-brief.",
        name: "Ama S.",
        role: "CEO, Elevate Brand Co.",
        initials: "AS",
    },
    {
        quote: "Our bookings tripled in 90 days. I didn't think digital marketing could move that fast — Nexux proved me wrong.",
        name: "David O.",
        role: "Director, StayNest",
        initials: "DO",
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
                    <img
                        src={project.img}
                        alt={project.client}
                        className="proj-img w-full h-full object-cover"
                    />
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

                <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-sm font-bold mt-auto transition-colors duration-200"
                    style={{ color: project.accent }}
                >
                    View case study →
                </a>
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

            {/* ── FILTER + GRID ────────────────────────────────────── */}
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