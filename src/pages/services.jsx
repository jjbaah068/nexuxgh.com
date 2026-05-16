import { useState, useEffect, useRef } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import PhoneHero from "../assets/images/phonehero.png";
import servicesHero from "../assets/images/servicehero.jpeg";
import brandImg from "../assets/images/brandImg.png";
import socialImg from "../assets/images/socialImg.png";
import wbdev1 from "../assets/images/wbdev1.png";
import wbdev2 from "../assets/images/wbdev2.png";
import growthImg from "../assets/images/growthImg.png";

/* ── Fonts & Animations ─────────────────────────────────────────── */
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;

const STYLES = `
  body { font-family: 'Plus Jakarta Sans', sans-serif; }
  h1,h2,h3,h4 { font-family: 'Plus Jakarta Sans', sans-serif; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

  .anim-1 { animation: fadeUp .65s .05s both; }
  .anim-2 { animation: fadeUp .65s .18s both; }
  .anim-3 { animation: fadeUp .65s .30s both; }
  .anim-4 { animation: fadeUp .65s .42s both; }

  .reveal { opacity:0; transform:translateY(22px); transition: opacity .55s ease, transform .55s ease; }
  .reveal.in { opacity:1; transform:translateY(0); }

  /* Service card */
  .srv { 
    transition: box-shadow .25s, border-color .25s, transform .25s;
    cursor: default;
  }
  .srv:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.09);
    border-color: rgba(0,191,166,0.35) !important;
  }
  .srv:hover .srv-icon {
    background: #00BFA6;
    color: white;
    transform: scale(1.08) rotate(-4deg);
  }
  .srv-icon {
    transition: background .25s, color .25s, transform .25s;
  }

  /* Card flip */
.flip-container { perspective: 1000px; }
.flip-inner { 
  position: relative; 
  width: 100%; 
  height: 100%;
  transition: transform 0.55s cubic-bezier(0.4,0.2,0.2,1);
  transform-style: preserve-3d;
}
.flip-inner.flipped { transform: rotateY(180deg); }
.flip-front, .flip-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 1rem;
  overflow: hidden;
}
.flip-back { transform: rotateY(180deg); }

/* Tab pill */
.tab-pill {
    transition: background .2s, color .2s, box-shadow .2s;
  }
  .tab-pill.active {
    background: #0B1F3A;
    color: white;
    box-shadow: 0 4px 16px rgba(11,31,58,0.18);
  }

  /* Step connector line */
  .step-line {
    position: absolute;
    left: 20px;
    top: 44px;
    bottom: -24px;
    width: 1.5px;
    background: linear-gradient(to bottom, #00BFA6, transparent);
  }

  /* FAQ accordion */
  .faq-item { transition: background .2s; }
  .faq-item:hover { background: rgba(0,191,166,0.03); }
  .faq-chevron { transition: transform .3s ease; }
  .faq-chevron.open { transform: rotate(180deg); }
  .faq-body { 
    overflow: hidden;
    transition: max-height .35s ease, opacity .25s ease;
    max-height: 0;
    opacity: 0;
  }
  .faq-body.open { max-height: 300px; opacity: 1; }
`;

/* ── Scroll reveal hook ─────────────────────────────────────────── */
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

/* ── Data ───────────────────────────────────────────────────────── */
// const SERVICES = [
//     {
//         id: "brand",
//         label: "Brand Strategy & Identity",
//         title: "Build a brand that stands out.",
//         desc: "We help you define who you are, what you stand for, and how you show up in the market.",
//         tags: ["Positioning", "Messaging", "Identity"],
//         color: "#3B5BDB",
//         icon: (
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                 <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
//                 <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
//                 <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
//             </svg>
//         ),
//     },
//     {
//         id: "social",
//         label: "Social & Content Marketing",
//         title: "Content that attracts and converts.",
//         desc: "We create and manage content that builds your presence, engages your audience, and drives results.",
//         tags: ["Strategy", "Content", "Campaigns"],
//         color: "#00BFA6",
//         icon: (
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                 <path d="M22 4L11 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
//                 <path d="M22 4L15 21L11 15L5 11L22 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//         ),
//     },
//     {
//         id: "web",
//         label: "Web Design & Development",
//         title: "Websites built to convert.",
//         desc: "We design fast, responsive, and user-friendly websites that turn visitors into customers.",
//         tags: ["UI/UX Design", "Development", "CMS"],
//         color: "#F59F00",
//         icon: (
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                 <rect x="2" y="4" width="20" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
//                 <path d="M8 20h8M12 19v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
//                 <path d="M8 10l2 2-2 2M12 14h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//         ),
//     },
//     {
//         id: "growth",
//         label: "Growth Systems & Automation",
//         title: "Systems that drive consistent growth.",
//         desc: "We build marketing systems, automations, and funnels that help you generate leads and scale.",
//         tags: ["Automation", "CRM", "Funnels"],
//         color: "#E64980",
//         icon: (
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                 <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
//                 <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//                 <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//         ),
//     },
// ];

const SERVICES = [
    {
        id: "brand",
        label: "Brand Strategy & Identity",
        title: "Build a brand people remember.",
        desc: "We create strategic brand identities that communicate who you are, connect with your audience, and stand the test of time.",
        tags: ["Positioning", "Messaging", "Identity"],
        color: "#3B5BDB",
        cardImg: brandImg,
        cardImgLabel: "Brand identity visuals — bags, packaging, logo",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
        details: {
            heading: "What's included",
            cols: [
                ["Brand strategy & positioning", "Messaging & tone of voice", "Visual identity design", "Logo & identity system"],
                ["Brand guidelines", "Packaging design", "Campaign look & feel", "Brand rollout support"],
            ],
            outcome: "Strong brands aren't built by accident. They're designed intentionally.",
        },
    },
    {
        id: "social",
        label: "Social & Content Marketing",
        title: "Content that attracts and converts.",
        desc: "We create and manage content that builds your presence, engages your audience, and drives measurable results.",
        tags: ["Strategy", "Content", "Campaigns"],
        color: "#00BFA6",
        cardImg: socialImg,
        cardImgLabel: "Social media content calendar dashboard",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M22 4L11 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M22 4L15 21L11 15L5 11L22 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        details: {
            heading: "What's included",
            cols: [
                ["Content strategy & planning", "Platform management", "Social media content creation", "Community engagement"],
                ["Campaign creation & management", "Monthly content calendar", "Analytics & performance reports"],
            ],
            outcome: "A consistent content engine builds visibility today and compounding growth tomorrow.",
        },
    },
    {
        id: "web",
        label: "Web Design & Development",
        title: "Websites built to convert.",
        desc: "We design fast, responsive, and user-friendly websites that not only look great but are built to convert, perform, and scale with your business.",
        tags: ["UI/UX Design", "Development", "CMS"],
        color: "#F59F00",
        cardImg: wbdev1,
        cardImg2: wbdev2,
        cardImgLabel: "Laptop and phone showing Nexux web design",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="20" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <path d="M8 20h8M12 19v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M8 10l2 2-2 2M12 14h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        details: {
            heading: "What's included",
            cols: [
                ["UI/UX design & prototyping", "Responsive frontend development", "CMS integration (Webflow, WordPress)", "E-commerce development", "Performance & SEO optimisation"],
                ["Website maintenance & support", "Analytics & conversion tracking", "Speed & security optimisation", "Post-launch support & training"],
            ],
            outcome: "A fast, seamless website experience turns visitors into paying customers.",
        },
    },
    {
        id: "growth",
        label: "Growth & Automation Systems",
        title: "Systems that drive consistent growth.",
        desc: "We design and implement automated marketing systems that help you attract the right leads, nurture them, and convert them — automatically.",
        tags: ["Automation", "CRM", "Funnels"],
        color: "#E64980",
        cardImg: growthImg,
        cardImgLabel: "Growth funnel dashboard with lead metrics",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        details: {
            heading: "What's included",
            cols: [
                ["Lead funnel architecture & setup", "Email automation sequences", "CRM configuration & integration", "Workflow automation", "Lead scoring & segmentation"],
                ["Landing pages & opt-in funnels", "Conversion rate optimisation", "Analytics & performance tracking", "Reporting & insights", "Ongoing optimisation & support"],
            ],
            outcome: "Great growth isn't random. It's built on systems that work while you focus.",
        },
    },
];


const PROCESS = [
    { n: "01", title: "Discovery Call", desc: "We learn about your business, goals, and current challenges so we can understand where you are and where you want to go." },
    { n: "02", title: "Strategy & Proposal", desc: "We create a clear roadmap, timeline, and scope before execution begins." },
    { n: "03", title: "Design & Execution", desc: "We design, build, and refine with regular updates throughout the project. " },
    { n: "04", title: "Launch & Optimise", desc: "Once everything goes live, we monitor performance, improve continuously, and support long-term growth." },
];

const FAQS = [
    { q: "What timelines should I expect?", a: "It depends on scope. A brand identity project usually takes 3–4 weeks. A full website is typically 4–6 weeks. We'll give you a clear timeline before we start." },
    { q: "Who do you typically work with?", a: "We primarily work with SMEs, startups, and growing brands that want clearer positioning, stronger digital presence, and marketing that drives real business results." },
    { q: "Can we start with a single service?", a: "Yes. You can engage us for a single service or a full-stack package. We'll recommend what makes the most sense for your goals." },
    { q: "What does the pricing look like?", a: "Every project is scoped individually. After your discovery call, we'll send a transparent proposal with a clear breakdown. No hidden fees." },
    { q: "Do you work with clients outside Ghana?", a: "Yes — we work with clients across Africa and internationally. Most of our process is remote-friendly." },
    { q: "What makes Nexux different from other agencies?", a: "We combine strategy, design, and technology under one roof to build marketing systems that create long-term business growth, not just short-term activity." },
];

/* ── Sub-components ─────────────────────────────────────────────── */

function ServiceCard({ svc, index }) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            className="srv reveal flip-container"
            style={{ transitionDelay: `${index * 70}ms`, height: "320px" }}
        >
            <div className={`flip-inner ${flipped ? "flipped" : ""}`}>

                {/* ── FRONT ── */}

                <div className="flip-front bg-white border border-gray-100 flex flex-col">

                    {/* TOP — icon + label */}
                    <div className="px-6 pt-6 pb-3 shrink-0">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                            style={{ background: `${svc.color}12`, color: svc.color, border: `1.5px solid ${svc.color}20` }}
                        >
                            <div style={{ transform: "scale(0.85)" }}>{svc.icon}</div>
                        </div>
                        <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: svc.color }}>
                            {svc.label}
                        </p>
                    </div>

                    {/* MIDDLE — text left, image right side by side */}
                    <div className="flex flex-row flex-1 overflow-hidden">

                        {/* Left: text + cta */}
                        <div className="flex flex-col px-6 pb-6 pt-0 gap-3 flex-1 min-w-0 justify-between">
                            <div className="flex flex-col gap-3">
                                <h3
                                    className="text-[#0B1F3A] font-extrabold leading-tight tracking-tight"
                                    style={{ fontSize: "clamp(16px, 1.3vw, 19px)" }}
                                >
                                    {svc.title}
                                </h3>
                                <p className="text-[#556677] text-[11px] leading-relaxed">{svc.desc}</p>
                            </div>
                            <button
                                onClick={() => setFlipped(true)}
                                className="inline-flex items-center gap-1.5 text-sm font-bold cursor-pointer w-fit"
                                style={{ color: svc.color }}
                            >
                                Learn more →
                            </button>
                        </div>

                        {/* Right: image panel */}
                        <div
                            className="relative shrink-0 overflow-hidden rounded-r-2xl"
                            style={{ width: "44%" }}
                        >
                            {svc.id === "web" && svc.cardImg && svc.cardImg2 ? (
                                <>
                                    <img
                                        src={svc.cardImg}
                                        alt="Laptop"
                                        className="absolute object-contain"
                                        style={{ width: "105%", height: "auto", bottom: "0", left: "-8%", zIndex: 1, filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.12))" }}
                                    />
                                    <img
                                        src={svc.cardImg2}
                                        alt="Phone"
                                        className="absolute object-contain"
                                        style={{ width: "52%", height: "auto", bottom: "0", right: "0%", zIndex: 2, filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.15))" }}
                                    />
                                </>
                            ) : svc.cardImg ? (
                                <img
                                    src={svc.cardImg}
                                    alt={svc.cardImgLabel}
                                    className="absolute object-contain"
                                    style={{ width: "110%", height: "110%", bottom: "-5%", left: "50%", transform: "translateX(-50%)", filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.10))" }}
                                />
                            ) : null}
                        </div>
                    </div>
                </div>

                {/* ── BACK ── */}
                <div
                    className="flip-back p-6 flex flex-col gap-4"
                    style={{ background: "linear-gradient(145deg, #0B1F3A, #0d2848)" }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                style={{ background: `${svc.color}25`, color: svc.color }}
                            >
                                {svc.icon}
                            </div>
                            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: svc.color }}>
                                {svc.label}
                            </p>
                        </div>
                        <button
                            onClick={() => setFlipped(false)}
                            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors shrink-0"
                        >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M9 3L3 9M3 3l6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>

                    <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase">
                        {svc.details.heading}
                    </p>

                    {/* 2-column checklist */}
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 flex-1">
                        {svc.details.cols.flat().map((point) => (
                            <div key={point} className="flex items-start gap-1.5">
                                <span
                                    className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                                    style={{ background: `${svc.color}30` }}
                                >
                                    <svg width="6" height="4" viewBox="0 0 6 4" fill="none">
                                        <path d="M1 2l1.2 1.2L5 1" stroke={svc.color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                <span className="text-white/70 text-[11px] leading-snug">{point}</span>
                            </div>
                        ))}
                    </div>

                    {/* Quote */}
                    <div
                        className="rounded-xl p-3"
                        style={{ background: `${svc.color}12`, border: `1px solid ${svc.color}20` }}
                    >
                        <p className="text-white/55 text-[11px] leading-relaxed italic">
                            ❝ {svc.details.outcome} ❞
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
function FaqItem({ q, a }) {
    const [open, setOpen] = useState(false);
    return (
        <div
            className="faq-item border-b border-gray-100 last:border-0 px-1 py-5 rounded-lg cursor-pointer"
            onClick={() => setOpen(!open)}
        >
            <div className="flex items-center justify-between gap-4">
                <span className="text-[#0B1F3A] font-semibold text-[15px]">{q}</span>
                <span className={`faq-chevron shrink-0 text-[#00BFA6] ${open ? "open" : ""}`}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </div>
            <div className={`faq-body ${open ? "open" : ""}`}>
                <p className="text-[#556677] text-sm leading-relaxed pt-3">{a}</p>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════════
   SERVICES PAGE
══════════════════════════════════════════════════════════════════ */
export default function Services() {
    useReveal();

    return (
        <>
            <style>{FONTS + STYLES}</style>
            <Navbar />

            {/* ── HERO ────────────────────────────────────────────── */}
            {/* <section
                className="relative pt-36 pb-24 px-6 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #f0f4f8 0%, #e8f0f7 50%, #f5f9fc 100%)" }}
            > */}
            <section
                className="relative overflow-hidden min-h-[600px] flex items-center"
            >
                {/* Background image */}
                <img
                    src={servicesHero}
                    alt="Nexux mobile experience"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark overlay so text stays readable */}
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(90deg, rgba(11,31,58,0.82) 0%, rgba(11,31,58,0.55) 60%, rgba(11,31,58,0.2) 100%)" }}
                />

                {/* Text content */}
                <div className="relative z-10 max-w-6xl mx-auto px-6 py-36 w-full">
                    <h1
                        className="anim-2 text-white font-extrabold leading-[1.06] tracking-tight mb-5"
                        style={{ fontSize: "clamp(38px, 5.5vw, 72px)", maxWidth: 700 }}
                    >
                        Strategy, design & systems that{" "}
                        <span className="text-[#00BFA6]">grow your business</span>
                    </h1>
                    <p
                        className="anim-3 text-white/70 leading-relaxed mb-10"
                        style={{ fontSize: "clamp(15px,1.6vw,18px)", maxWidth: 480 }}
                    >
                        We combine strategy, design, and technology to help brands grow with clarity and consistency.
                    </p>
                    <div className="anim-4 flex flex-wrap gap-3">
                        <a
                            href="/contact"
                            className="bg-[#00BFA6] hover:bg-[#00a892] text-white font-bold text-sm px-7 py-3.5 rounded-lg transition-colors duration-200"
                            style={{ boxShadow: "0 4px 20px rgba(0,191,166,.35)" }}
                        >
                            Start a Project →
                        </a>
                        <a
                            href="#services-grid"
                            className="border border-white/30 hover:border-white/60 text-white/75 hover:text-white font-medium text-sm px-7 py-3.5 rounded-lg transition-all duration-200"
                        >
                            Explore Services
                        </a>
                    </div>
                </div>
            </section>

            {/* ── SERVICES GRID ───────────────────────────────────── */}
            <section id="services-grid" className="bg-[#F5F7FA] px-6 py-24">
                <div className="max-w-6xl mx-auto">

                    {/* Header */}
                    <div className="mb-14 text-center">
                        <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-4">Our Services</span>
                        <h2 className="reveal text-[#0B1F3A] font-extrabold leading-tight tracking-tight mb-4"
                            style={{ fontSize: "clamp(32px,4.5vw,56px)" }}>
                            Everything under one roof.
                        </h2>
                        <p className="reveal text-[#556677] text-base leading-relaxed mx-auto" style={{ maxWidth: 420 }}>
                            Strategic thinking. Creative execution. Powerful systems.<br />
                            All working together to grow your business.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {SERVICES.map((svc, i) => (
                            <ServiceCard key={svc.id} svc={svc} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── DIFFERENTIATOR BAND ─────────────────────────────── */}
            < section className="bg-[#0B1F3A] px-6 py-16" >
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: "🎯", title: "Strategy First", desc: "We never skip the thinking. Every project starts with a clear plan before we touch design or code." },
                            { icon: "🔁", title: "Built to Compound", desc: "Our work doesn't stop at delivery. We build systems that keep generating results over time." },
                            { icon: "🗣️", title: "Clear Communication", desc: "No confusing jargon, hidden processes, or unclear timelines. You always know what’s happening" },
                        ].map(({ icon, title, desc }, i) => (
                            <div
                                key={title}
                                className="reveal flex gap-5 items-start"
                                style={{ transitionDelay: `${i * 80}ms` }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-white/[.06] border border-white/[.08] flex items-center justify-center text-xl shrink-0">
                                    {icon}
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-base mb-1.5">{title}</h4>
                                    <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* ── PROCESS ─────────────────────────────────────────── */}
            < section className="bg-white px-6 py-24" >
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left: copy */}
                    <div>
                        <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-3">How It Works</span>
                        <h2 className="reveal text-[#0B1F3A] font-extrabold leading-tight mb-4"
                            style={{ fontSize: "clamp(26px,3.5vw,44px)", maxWidth: 400 }}>
                            From first call to lasting results
                        </h2>
                        <p className="reveal text-[#556677] text-base leading-relaxed" style={{ maxWidth: 380 }}>
                            A focused process built for clarity and steady execution.
                        </p>
                    </div>

                    {/* Right: steps */}
                    <div className="flex flex-col">
                        {PROCESS.map((step, i) => (
                            <div
                                key={step.n}
                                className="reveal relative flex gap-6 pb-10 last:pb-0"
                                style={{ transitionDelay: `${i * 80}ms` }}
                            >
                                {/* Connector line */}
                                {i < PROCESS.length - 1 && <div className="step-line" />}

                                {/* Number bubble */}
                                <div className="w-10 h-10 rounded-full bg-[#00BFA6]/10 border-2 border-[#00BFA6] flex items-center justify-center shrink-0 z-10">
                                    <span className="text-[#00BFA6] text-xs font-black">{step.n}</span>
                                </div>

                                {/* Content */}
                                <div className="pt-1.5">
                                    <h4 className="text-[#0B1F3A] font-bold text-base mb-1.5">{step.title}</h4>
                                    <p className="text-[#556677] text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* ── FAQ ─────────────────────────────────────────────── */}
            < section className="bg-[#F5F7FA] px-6 py-24" >
                <div className="max-w-3xl mx-auto">
                    <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-3 text-center">FAQ</span>
                    <h2 className="reveal text-[#0B1F3A] font-extrabold leading-tight mb-12 text-center"
                        style={{ fontSize: "clamp(26px,3.5vw,44px)" }}>
                        Questions we get asked a lot
                    </h2>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-2 reveal">
                        {FAQS.map((faq) => (
                            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                        ))}
                    </div>
                </div>
            </section >

            {/* ── CTA BAND ────────────────────────────────────────── */}
            < section className="relative bg-[#0B1F3A] px-6 py-24 text-center overflow-hidden" >
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[500px] h-[260px] opacity-20 rounded-full"
                        style={{ background: "radial-gradient(ellipse,#00BFA6,transparent 65%)", filter: "blur(50px)" }} />
                </div>
                <div className="relative z-10 mx-auto">
                    <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-4">Ready to Start?</span>
                    <h2 className="reveal text-white font-extrabold leading-tight mb-5"
                        style={{ fontSize: "clamp(30px,4.5vw,56px)" }}>
                        Let's build something<br />
                        <span className="text-[#00BFA6]">worth talking about.</span>
                    </h2>
                    <p className="reveal text-white/45 text-base leading-relaxed mb-10" style={{ maxWidth: 380, margin: "0 auto 2.5rem" }}>
                        Let’s explore the right strategy, systems, and next steps for your business.
                    </p>
                    <div className="reveal flex flex-wrap gap-3 justify-center">
                        <a
                            href="/contact"
                            className="bg-[#00BFA6] hover:bg-[#00a892] text-white font-bold text-[15px] px-9 py-4 rounded-lg transition-colors"
                            style={{ boxShadow: "0 0 32px rgba(0,191,166,.3)" }}
                        >
                            Start a Project →
                        </a>
                    </div>
                </div>
            </section >

            <Footer />
        </>
    );
}