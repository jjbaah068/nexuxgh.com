import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Player } from "@lottiefiles/react-lottie-player";
import abouthero from "../assets/images/abouthero.jpg"
import arhin from "../assets/images/arhin.JPG"
import james from "../assets/images/image3.jpeg"

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
    { icon: "◆", title: "Strategy first, always", desc: "We never skip the thinking. Every visual, every line of copy, every system starts from a clear plan." },
    { icon: "◇", title: "Clarity over cleverness", desc: "If your audience can't grasp it in five seconds, it's not done. We strip until the message lands." },
    { icon: "◈", title: "Built to compound", desc: "Our work doesn't end at delivery. We build systems that keep generating returns long after launch." },
    { icon: "◉", title: "Data-honest", desc: "We measure what matters and tell you the truth about what's working — even when it's not flattering." },
];

const TEAM = [
    { role: "Co-Founder, CEO & Strategy Lead", name: "Arhin Owuraku Agyemang", img: arhin },
    { role: "Co-Founder, CEO & Lead Engineer", name: "James Junior Baah", img: james },
    // { role: "Lead Developer", name: "Kwame Asante" },
    // { role: "Growth & Performance", name: "Ama Mensah"},
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
                        A marketing technology agency built for the way{" "}
                        <span className="text-[#00BFA6]">brands actually grow.</span>
                    </h1>
                    <p
                        className="anim-3 text-white/70 leading-relaxed mb-10"
                        style={{ fontSize: "clamp(15px,1.6vw,18px)", maxWidth: 560 }}
                    >
                        We combine strategy, design, and digital technology to help small
                        and medium businesses move from confusion to clarity — and from
                        clarity to compounding results.
                    </p>
                    <div className="anim-4 flex flex-wrap gap-3">
                        <Link
                            to="/contact"
                            className="bg-[#00BFA6] hover:bg-[#00a892] text-white font-bold text-sm px-7 py-3.5 rounded-lg transition-colors duration-200"
                            style={{ boxShadow: "0 4px 20px rgba(0,191,166,.25)" }}
                        >
                            Work with us →
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

            {/* ── MISSION ─────────────────────────────────────────── */}
            <section className="bg-white px-6 py-28">
                <div className="max-w-5xl mx-auto">
                    <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-5">
                        Our Mission
                    </span>
                    <p
                        className="reveal text-[#0B1F3A] font-extrabold leading-[1.18] tracking-tight"
                        style={{ fontSize: "clamp(28px, 3.6vw, 46px)" }}
                    >
                        We exist to give serious businesses a{" "}
                        <span className="text-[#00BFA6]">smarter way to grow</span> —
                        turning fragmented marketing efforts into one clean, measurable
                        system that compounds month after month.
                    </p>
                </div>
            </section>

            {/* ── STORY ───────────────────────────────────────────── */}
            <section className="bg-[#F5F7FA] px-6 py-24">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
                    <div className="reveal lg:col-span-5">
                        <span className="block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-4">
                            Why Nexux Exists
                        </span>
                        <h2
                            className="text-[#0B1F3A] font-extrabold leading-tight tracking-tight"
                            style={{ fontSize: "clamp(26px,3.4vw,42px)" }}
                        >
                            Most brands don't fail at marketing — they fail at the system behind it.
                        </h2>
                    </div>
                    <div className="reveal lg:col-span-7 flex flex-col gap-5">
                        <p className="text-[#556677] text-base leading-relaxed">
                            We watched too many founders pour money into one-off campaigns,
                            freelance designers, and disconnected tools — only to end up
                            busier without being bigger. The thinking was always missing.
                        </p>
                        <p className="text-[#556677] text-base leading-relaxed">
                            Nexux was built to fix that. We bring strategy, design and
                            technology under one roof, so every asset you ship is part of a
                            system pulling in the same direction. No noise. No vanity
                            metrics. Just structure that pays you back.
                        </p>
                        <p className="text-[#556677] text-base leading-relaxed">
                            Today we partner with SMEs, startups, restaurants, short-stay
                            hosts and service brands across Africa — helping them look
                            sharper, sell smarter, and grow with intention.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── HOW WE OPERATE ──────────────────────────────────── */}
            <section className="bg-white px-6 py-24">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
                    <div className="reveal relative">
                        <div className="w-full min-h-[380px] rounded-2xl bg-[#f0f4f8] border border-gray-100 flex items-center justify-center overflow-hidden">
                            <Player
                                autoplay
                                loop
                                src="https://assets4.lottiefiles.com/packages/lf20_kkflmtur.json"
                                style={{ width: "100%", height: "380px" }}
                            />
                        </div>
                        <svg className="absolute -bottom-5 -right-5 pointer-events-none" style={{ width: 140, height: 140 }} viewBox="0 0 140 140">
                            {[0, 1, 2, 3, 4].map(r => [0, 1, 2, 3, 4].map(c => (
                                <circle key={`${r}${c}`} cx={c * 28 + 14} cy={r * 28 + 14} r="2.5" fill="#00BFA6" opacity="0.6" />
                            )))}
                        </svg>
                    </div>
                    <div className="reveal flex flex-col justify-center">
                        <span className="block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-4">
                            How We Operate
                        </span>
                        <h3
                            className="text-[#0B1F3A] font-extrabold leading-tight tracking-tight mb-5"
                            style={{ fontSize: "clamp(24px,3vw,38px)" }}
                        >
                            A small team, a sharp process, no bloat.
                        </h3>
                        <p className="text-[#556677] text-base leading-relaxed mb-6">
                            We stay small on purpose. Every project is led by senior people
                            who actually do the work — no juniors hidden in the back, no
                            account-manager middlemen. You talk to the people building it.
                        </p>
                        <ul className="flex flex-col gap-3">
                            {HOW_WE_OPERATE.map((item) => (
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
                    </div>
                </div>
            </section>

            {/* ── STATS STRIP ─────────────────────────────────────── */}
            {/* <section className="bg-[#0B1F3A] px-6 py-16 text-white relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-30"
                    style={{ background: "radial-gradient(circle at 80% 50%, rgba(0,191,166,0.18), transparent 55%)" }} />
                <div className="relative max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { n: 50, s: "+", label: "Brands Served" },
                        { n: 98, s: "%", label: "Client Satisfaction" },
                        { n: 3, s: "×", label: "Avg Growth Multiplier" },
                        { n: 5, s: "+", label: "Years Building" },
                    ].map(({ n, s, label }) => (
                        <div key={label} className="reveal text-center">
                            <span className="block text-white font-black leading-none mb-2" style={{ fontSize: "clamp(36px,4vw,52px)" }}>
                                <Counter to={n} suffix={s} />
                            </span>
                            <span className="text-[#00BFA6]/80 text-[11px] font-semibold tracking-widest uppercase">{label}</span>
                        </div>
                    ))}
                </div>
            </section> */}

            {/* ── VALUES ──────────────────────────────────────────── */}
            <section className="bg-[#F5F7FA] px-6 py-24">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-14 max-w-2xl">
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
                        {/* <p className="reveal text-[#556677] text-sm leading-relaxed" style={{ maxWidth: 320 }}>
                            No agency hierarchy. No handoffs. The people you meet on the
                            first call are the same ones doing the work.
                        </p> */}
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
                                <p className="text-[#0B1F3A] font-bold text-sm leading-tight mb-1">{m.name}</p>
                                <p className="text-[#0B1F3A]/45 text-xs tracking-wide">{m.role}</p>
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
                        Think we'd be a fit?{" "}
                        <span className="text-[#00BFA6]">Let's find out.</span>
                    </h2>
                    <p className="reveal text-white/55 text-base leading-relaxed mb-9 mx-auto" style={{ maxWidth: 420 }}>
                        One call. No pitch deck. Just a real conversation about where you
                        are and where you want to go next.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block bg-[#00BFA6] hover:bg-[#00a892] text-white font-bold text-[15px] px-9 py-4 rounded-lg transition-colors"
                        style={{ boxShadow: "0 0 32px rgba(0,191,166,.3)" }}
                    >
                        Start a conversation →
                    </Link>
                </div>
            </section>

            <Footer />
        </>
    );
}