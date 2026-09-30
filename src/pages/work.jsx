import { useEffect } from "react";
import { Link } from "react-router";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import workHero from "../assets/images/workshero.jpeg";
import nexuxVideo from "../assets/videos/nexux1.mp4";
import philgoodImg from "../assets/images/philgoodmockup1.png";
import melanuImg from "../assets/images/melanumockup.png";
import { Helmet } from "react-helmet-async";
import workCta from '../assets/images/img6.png'

/* ── Page styles (fonts now live globally in index.css) ─────────── */
const STYLES = `
  /* ---------- Cinematic hero ---------- */
  @keyframes heroZoom {
    from { transform: scale(1.12); filter: brightness(.35) blur(6px); }
    to   { transform: scale(1);    filter: brightness(1) blur(0); }
  }
  .hero-media { animation: heroZoom 2.4s cubic-bezier(.16,1,.3,1) both; }

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

  /* ---------- Scroll reveal ---------- */
  .reveal { opacity:0; transform:translateY(22px); transition: opacity .55s ease, transform .55s ease; }
  .reveal.in { opacity:1; transform:translateY(0); }

  /* ---------- Project cards: curtain reveal on scroll ---------- */
  .proj-card {
    opacity: 0;
    clip-path: inset(18% 0 0 0 round 1.25rem);
    transform: translateY(40px);
    transition:
      clip-path 1.1s cubic-bezier(.16,1,.3,1),
      transform 1.1s cubic-bezier(.16,1,.3,1),
      opacity .6s ease,
      box-shadow .4s ease;
  }
  .proj-card.in {
    opacity: 1;
    clip-path: inset(0 0 0 0 round 1.25rem);
    transform: translateY(0);
  }
  .proj-card:hover { box-shadow: 0 30px 70px rgba(11,31,58,0.14); }

  .proj-stage img { transition: transform 1.2s cubic-bezier(.16,1,.3,1); }
  .proj-card:hover .proj-stage img { transform: scale(1.05) translateY(-6px); }

  @keyframes floatUp {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-10px); }
  }
  .mockup-float { animation: floatUp 5s ease-in-out infinite; }

  .proj-card .proj-tag { transition: background .25s, color .25s; }
  .proj-card:hover .proj-tag { background: #00BFA6; color: white; }

  /* ---------- Testimonials ---------- */
  .testi-card { transition: border-color .2s, transform .2s; }
  .testi-card:hover { border-color: rgba(0,191,166,0.35); transform: translateY(-3px); }

  @media (prefers-reduced-motion: reduce) {
    .hero-media, .hero-line > span, .hero-rule, .hero-soft, .mockup-float { animation: none !important; }
    .proj-card { clip-path: none; transform: none; opacity: 1; transition: none; }
  }
`;

/* ── Scroll reveal (handles .reveal and .proj-card) ─────────────── */
function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll(".reveal, .proj-card");
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
            { threshold: 0.15 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);
}

/* ── DATA ───────────────────────────────────────────────────────── */
const WORK_HERO_LINES = ["Work that moves", "the needle for", "growing brands."];

const PROJECTS = [
    {
        id: 1,
        client: "PhilGood Homes",
        category: "Web Design & Development",
        headline: "An apartment booking platform designed to turn visitors into guests.",
        result: "Live booking system launched",
        img: philgoodImg,
        accent: "#F59F00",
        stageBg: "linear-gradient(160deg, #f4f7fb 0%, #e3eaf3 100%)",
    },
    {
        id: 2,
        client: "Melanu",
        category: "Web Design & Development",
        headline: "A skincare website that celebrates African beauty and turns browsers into buyers.",
        result: "Brand presence launched online",
        img: melanuImg,
        accent: "#C8860A",
        stageBg: "linear-gradient(160deg, #faf3ea 0%, #efe0cc 100%)",
    },
];

const TESTIMONIALS = [
    {
        quote: "Working with the Nexux team was a smooth experience from start to finish. They were calm, attentive, and really took time to understand exactly what we wanted for PhilGood Homes. Instead of rushing the process, they listened carefully, presented us with multiple creative options, and guided us through the best direction for our apartment booking website. When the final product was presented, my immediate reaction was simple: ‘This is solid.’ The website truly captured our vision and elevated our brand online.",
        name: "Nana Kwame",
        role: "Founder, PhilGood Homes",
        initials: "NK",
    },
    {
        quote: "From the very first meeting, it was clear that James and the Nexux team genuinely cared about bringing the MelAnu vision to life. They didn’t just build a website — they took time to understand our brand identity, target audience, and the feeling we wanted customers to experience online. The process was thoughtful and stress-free. Every idea we shared was received with attention, and we were presented with creative options that made decision-making easy.",
        name: "Anita Asige",
        role: "CEO, Melanu Skincare",
        initials: "AA",
    },
];

/* ── PROJECT CARD ───────────────────────────────────────────────── */
function ProjectCard({ project, delay = 0 }) {
    return (
        <article
            className="proj-card group bg-white rounded-[1.25rem] overflow-hidden flex flex-col border border-gray-100"
            style={{ transitionDelay: `${delay}ms` }}
        >
            {/* Stage — the mockup gets the spotlight */}
            <div
                className="proj-stage relative aspect-[4/3] flex items-center justify-center overflow-hidden"
                style={{ background: project.stageBg }}
            >
                {/* soft spotlight behind the mockup */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(255,255,255,.85), transparent 70%)" }}
                />
                <div className="mockup-float relative w-[82%] h-[82%] flex items-center justify-center">
                    <img
                        src={project.img}
                        alt={`${project.client} website mockup`}
                        loading="lazy"
                        className="max-w-full max-h-full object-contain"
                        style={{ filter: "drop-shadow(0 24px 40px rgba(11,31,58,.18))" }}
                    />
                </div>

                {/* Client name, bottom-left like a title card */}
                <span className="absolute left-6 bottom-5 text-[#0B1F3A]/55 text-xs font-semibold tracking-wide">
                    {project.client}
                </span>
            </div>

            {/* Content */}
            <div className="p-7 md:p-8 flex flex-col gap-4 flex-1">
                <span
                    className="proj-tag self-start text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                    style={{ background: `${project.accent}14`, color: project.accent }}
                >
                    {project.category}
                </span>

                <h3
                    className="text-[#0B1F3A] font-bold leading-snug tracking-tight flex-1"
                    style={{ fontSize: "clamp(18px,1.7vw,22px)" }}
                >
                    {project.headline}
                </h3>

                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00BFA6]" />
                    <span className="text-[#00BFA6] text-xs font-bold">{project.result}</span>
                </div>
            </div>
        </article>
    );
}

/* ══════════════════════════════════════════════════════════════════
   WORK PAGE
══════════════════════════════════════════════════════════════════ */
export default function Work() {
    useReveal();

    return (
        <>
            <Helmet>
                <title>Our Work</title>
                <meta name="description" content="See how Nexux has helped brands in Ghana grow through web design, brand strategy, digital marketing, and growth systems." />
            </Helmet>

            <style>{STYLES}</style>

            {/* transparent = see-through over the hero, white once you scroll */}
            <Navbar transparent />

            {/* ── HERO (showreel video) ────────────────────────────── */}
            <section className="relative min-h-[88svh] flex flex-col justify-end overflow-hidden bg-[#0B1F3A]">
                <video
                    src={nexuxVideo}
                    // poster={workHero}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    className="hero-media absolute inset-0 w-full h-full object-cover"
                />

                {/* Light overlays: top for the navbar, bottom for the text band */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(180deg, rgba(11,31,58,.55) 0%, rgba(11,31,58,0) 22%)" }} />
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(0deg, rgba(11,31,58,.92) 0%, rgba(11,31,58,.6) 30%, rgba(11,31,58,0) 60%)" }} />

                {/* Lower-third text band */}
                <div className="relative z-10 max-w-6xl mx-auto w-full px-6 pb-12 md:pb-16">
                    {/* <div className="hero-rule relative h-px w-full bg-white/25 mb-8 md:mb-10">
                        <span className="absolute left-0 top-[-1px] h-[3px] w-16 bg-[#00BFA6] rounded-full" />
                    </div> */}

                    {/* <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-16 items-end">
                        <div>
                            <span className="hero-soft block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-4"
                                style={{ animationDelay: ".6s" }}>
                                Our Work
                            </span>
                            <h1
                                className="text-white font-semibold leading-[1.06]"
                                style={{ fontSize: "clamp(30px, 3.6vw, 52px)", letterSpacing: "-0.03em" }}
                            >
                                {WORK_HERO_LINES.map((line, i) => (
                                    <span key={line} className="hero-line">
                                        <span style={{ animationDelay: `${0.7 + i * 0.14}s` }}>{line}</span>
                                    </span>
                                ))}
                            </h1>
                        </div>

                        <div className="lg:pb-2">
                            <p className="hero-soft text-white/80 leading-relaxed mb-6"
                                style={{ fontSize: "clamp(15px,1.3vw,17px)", maxWidth: 400, animationDelay: "1.5s" }}>
                                Real projects, real results. Every engagement is built around measurable growth.
                            </p>
                            <div className="hero-soft flex flex-wrap gap-3" style={{ animationDelay: "1.7s" }}>
                                <a
                                    href="#projects"
                                    className="bg-[#00BFA6] hover:bg-[#00a892] text-white font-semibold text-sm px-7 py-3.5 rounded-lg transition-colors duration-200"
                                    style={{ boxShadow: "0 8px 30px rgba(0,191,166,.3)" }}
                                >
                                    See the projects
                                </a>
                                <Link
                                    to="/contact"
                                    className="border border-white/35 hover:border-white hover:bg-white/10 backdrop-blur-sm text-white font-medium text-sm px-7 py-3.5 rounded-lg transition-all duration-200"
                                >
                                    Start a project
                                </Link>
                            </div>
                        </div>
                    </div> */}
                </div>
            </section>

            {/* ── PROJECTS ─────────────────────────────────────────── */}
            <section id="projects" className="bg-[#F5F7FA] px-6 py-24 scroll-mt-20">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
                        <div>
                            <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-3">Selected Work</span>
                            <h2 className="reveal text-[#0B1F3A] font-extrabold leading-tight tracking-tight"
                                style={{ fontSize: "clamp(26px,3.5vw,44px)", maxWidth: 480 }}>
                                Brands we’ve helped launch and grow.
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {PROJECTS.map((project, i) => (
                            <ProjectCard key={project.id} project={project} delay={i * 150} />
                        ))}
                    </div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {TESTIMONIALS.map((t, i) => (
                            <div
                                key={t.name}
                                className="testi-card reveal bg-white border border-gray-100 rounded-2xl p-7 flex flex-col gap-5"
                                style={{ transitionDelay: `${i * 70}ms` }}
                            >
                                <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                                    <path d="M0 20V12C0 8.667 .733 6 2.2 4.4 3.667 2.667 5.8 1.467 8.6.8L9.8 3.2C8.2 3.6 6.933 4.333 6 5.4 5.067 6.333 4.6 7.667 4.6 9.4H8.6V20H0ZM16 20V12c0-3.333.733-6 2.2-7.6 1.467-1.733 3.6-2.933 6.4-3.6L25.8 3.2c-1.6.4-2.867 1.133-3.8 2.2-.933.933-1.4 2.267-1.4 4H24.6V20H16Z" fill="#00BFA6" opacity="0.25" />
                                </svg>

                                <p className="text-[#334455] text-sm leading-relaxed flex-1">“{t.quote}”</p>

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

            <section className="relative overflow-hidden bg-[#F6F7FB] border-t border-[#0B1F3A]/[.06]">

                {/* Desktop: full photo anchored right, its blank board blends into the section */}
                <img
                    src={workCta}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="hidden md:block absolute right-0 bottom-0 h-full w-auto max-w-none"
                    style={{
                        maskImage: "linear-gradient(90deg, transparent 0%, #000 12%)",
                        WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 12%)",
                    }}
                />

                <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 md:py-28 lg:py-32">
                    <div className="max-w-md lg:max-w-lg">
                        <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-4">
                            Start a Project
                        </span>
                        <h2
                            className="reveal text-[#0B1F3A] font-extrabold leading-[1.05] tracking-tight mb-5"
                            style={{ fontSize: "clamp(30px,4.2vw,52px)" }}
                        >
                            Ready to be our<br />
                            <span className="text-[#00BFA6]">next success story?</span>
                        </h2>
                        <p className="reveal text-[#0B1F3A]/60 text-base leading-relaxed mb-9" style={{ maxWidth: 380 }}>
                            Let's talk about what you're building and how we can help you grow it.
                        </p>
                        <div className="reveal flex flex-wrap gap-3">
                            <a
                                href="mailto:info@nexuxgh.com"
                                className="bg-[#00BFA6] hover:bg-[#00a892] text-white font-bold text-[15px] px-8 py-4 rounded-lg transition-colors"
                                style={{ boxShadow: "0 10px 30px rgba(0,191,166,.3)" }}
                            >
                                Start a conversation
                            </a>
                            <Link
                                to="/services"
                                className="border border-[#0B1F3A]/20 hover:border-[#0B1F3A] text-[#0B1F3A] font-semibold text-[15px] px-8 py-4 rounded-lg transition-all"
                            >
                                Our services
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile: show just her side of the photo below the text */}
                {/* Mobile: full-height photo pinned right; the blank board crops off to the left */}
                {/* <div className="md:hidden flex justify-end overflow-hidden mt-10">
                    <img
                        src={workCta}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="block h-80 w-auto max-w-none"
                    />
                </div> */}
            </section>

            <Footer />
        </>
    );
}