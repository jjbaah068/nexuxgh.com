import { useState, useEffect, useRef } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import PhoneHero from "../assets/images/phonehero.png";

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
const SERVICES = [
    {
        id: "brand",
        icon: "🧠",
        label: "Brand Strategy",
        title: "Brand Strategy & Identity",
        tagline: "Stand for something real.",
        desc: "Most brands blend in. We build ones that stand out — with sharp positioning, clear messaging, and a visual identity that actually means something to your audience.",
        deliverables: ["Brand positioning framework", "Messaging & tone of voice", "Logo & visual identity system", "Brand style guide"],
        color: "#3B5BDB",
    },
    {
        id: "social",
        icon: "📣",
        label: "Social & Marketing",
        title: "Digital & Social Media Marketing",
        tagline: "Grow your audience. Own the feed.",
        desc: "Scroll-stopping content, intentional strategy, and data-backed campaigns that build real audiences — not just vanity metrics. Consistent presence that compounds.",
        deliverables: ["Content strategy & calendar", "Platform management", "Ad campaign creation", "Monthly performance reports"],
        color: "#00BFA6",
    },
    {
        id: "web",
        icon: "💻",
        label: "Web Design & Dev",
        title: "Web Design & Development",
        tagline: "Fast. Beautiful. Built to convert.",
        desc: "Clean, responsive websites engineered to turn visitors into customers. Every layout decision is intentional. Every interaction is polished. No fluff, just results.",
        deliverables: ["UI/UX design & prototyping", "Responsive development", "CMS integration", "Performance & SEO optimisation"],
        color: "#F59F00",
    },
    {
        id: "growth",
        icon: "⚙️",
        label: "Growth Systems",
        title: "Growth Systems & Automation",
        tagline: "Compound your results over time.",
        desc: "Lead funnels, automation flows, and CRM systems that work while you sleep. We build the infrastructure that turns a trickle of leads into a predictable pipeline.",
        deliverables: ["Lead funnel architecture", "Email automation setup", "CRM configuration", "Conversion rate optimisation"],
        color: "#E64980",
    },
];

const PROCESS = [
    { n: "01", title: "Discovery Call", desc: "We learn your business, goals, and challenges in a focused 45-minute session. No fluff — just real clarity." },
    { n: "02", title: "Strategy & Proposal", desc: "We map out a tailored plan and present a clear scope, timeline, and investment — before any work begins." },
    { n: "03", title: "Design & Build", desc: "Our team executes with precision. You get regular updates and feedback checkpoints throughout." },
    { n: "04", title: "Launch & Optimise", desc: "We go live, monitor performance, and keep improving. Your growth doesn't stop at launch — neither do we." },
];

const FAQS = [
    { q: "How long does a typical project take?", a: "It depends on scope. A brand identity project usually takes 3–4 weeks. A full website is typically 4–6 weeks. We'll give you a clear timeline before we start." },
    { q: "Do you work with early-stage startups?", a: "Absolutely. Some of our best work has been with founders who are just getting started. We love helping new brands build a strong foundation from day one." },
    { q: "Can I hire you for just one service?", a: "Yes. You can engage us for a single service or a full-stack package. We'll recommend what makes the most sense for your goals." },
    { q: "What does the pricing look like?", a: "Every project is scoped individually. After your discovery call, we'll send a transparent proposal with a clear breakdown. No hidden fees." },
    { q: "Do you work with clients outside Ghana?", a: "Yes — we work with clients across Africa and internationally. Most of our process is remote-friendly." },
];

/* ── Sub-components ─────────────────────────────────────────────── */

function ServiceCard({ svc, index }) {
    return (
        <div
            className="srv reveal bg-white border border-gray-100 rounded-2xl p-8 flex flex-col gap-5"
            style={{ transitionDelay: `${index * 70}ms` }}
        >
            {/* Icon */}
            <div
                className="srv-icon w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: `${svc.color}14`, border: `1.5px solid ${svc.color}25` }}
            >
                {svc.icon}
            </div>

            {/* Text */}
            <div className="flex-1">
                <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: svc.color }}>
                    {svc.label}
                </p>
                <h3 className="text-[#0B1F3A] font-extrabold text-lg leading-snug mb-2">{svc.title}</h3>
                <p className="text-[#0B1F3A]/50 text-sm leading-relaxed">{svc.desc}</p>
            </div>

            {/* Deliverables */}
            <ul className="flex flex-col gap-2 border-t border-gray-100 pt-5 mt-1">
                {svc.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2.5 text-[#334455] text-sm">
                        <span
                            className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: `${svc.color}18` }}
                        >
                            <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
                                <path d="M1 2.5l1.5 1.5L6 1" stroke={svc.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        {d}
                    </li>
                ))}
            </ul>

            {/* CTA */}
            <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors duration-200 mt-1"
                style={{ color: svc.color }}
            >
                Get started →
            </a>
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
                    src={PhoneHero}
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
                        Services built to{" "}
                        <span className="text-[#00BFA6]">move your business</span>{" "}
                        forward.
                    </h1>
                    <p
                        className="anim-3 text-white/70 leading-relaxed mb-10"
                        style={{ fontSize: "clamp(15px,1.6vw,18px)", maxWidth: 480 }}
                    >
                        From brand foundation to digital growth — we handle the strategy,
                        design, and systems so you can focus on what you do best.
                    </p>
                    <div className="anim-4 flex flex-wrap gap-3">
                        <a
                            href="#contact"
                            className="bg-[#00BFA6] hover:bg-[#00a892] text-white font-bold text-sm px-7 py-3.5 rounded-lg transition-colors duration-200"
                            style={{ boxShadow: "0 4px 20px rgba(0,191,166,.35)" }}
                        >
                            Book a free call →
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
            < section id="services-grid" className="bg-[#F5F7FA] px-6 py-24" >
                <div className="max-w-6xl mx-auto">
                    <div className="mb-12">
                        <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-3">Our Services</span>
                        <h2 className="reveal text-[#0B1F3A] font-extrabold leading-tight"
                            style={{ fontSize: "clamp(26px,3.5vw,44px)", maxWidth: 460 }}>
                            Everything under one roof
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                        {SERVICES.map((svc, i) => (
                            <ServiceCard key={svc.id} svc={svc} index={i} />
                        ))}
                    </div>
                </div>
            </section >

            {/* ── DIFFERENTIATOR BAND ─────────────────────────────── */}
            < section className="bg-[#0B1F3A] px-6 py-16" >
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: "🎯", title: "Strategy First", desc: "We never skip the thinking. Every project starts with a clear plan before we touch design or code." },
                            { icon: "🔁", title: "Built to Compound", desc: "Our work doesn't stop at delivery. We build systems that keep generating results over time." },
                            { icon: "📍", title: "Africa-Focused", desc: "We understand the local market, the local customer, and the context your brand lives in." },
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
                            A clear, collaborative process — no confusion, no surprises.
                            Just momentum from day one.
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
                <div className="relative z-10 max-w-xl mx-auto">
                    <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-4">Ready to Start?</span>
                    <h2 className="reveal text-white font-extrabold leading-tight mb-5"
                        style={{ fontSize: "clamp(30px,4.5vw,56px)" }}>
                        Let's build something<br />
                        <span className="text-[#00BFA6]">worth talking about.</span>
                    </h2>
                    <p className="reveal text-white/45 text-base leading-relaxed mb-10" style={{ maxWidth: 380, margin: "0 auto 2.5rem" }}>
                        Book a free discovery call — no commitment, just clarity on what's possible for your business.
                    </p>
                    <div className="reveal flex flex-wrap gap-3 justify-center">
                        <a
                            href="mailto:info@nexuxgh.com"
                            className="bg-[#00BFA6] hover:bg-[#00a892] text-white font-bold text-[15px] px-9 py-4 rounded-lg transition-colors"
                            style={{ boxShadow: "0 0 32px rgba(0,191,166,.3)" }}
                        >
                            Start a Conversation →
                        </a>
                    </div>
                </div>
            </section >

            <Footer />
        </>
    );
}