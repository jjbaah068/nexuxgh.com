import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import Navbar from "./navbar";
import Footer from "./footer";

const STYLES = `
  @keyframes legalFadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  .legal-anim-1 { animation: legalFadeUp .6s .05s both; }
  .legal-anim-2 { animation: legalFadeUp .6s .15s both; }
  .legal-anim-3 { animation: legalFadeUp .6s .25s both; }
  .legal-section { scroll-margin-top: 110px; }

  @keyframes legalHeroZoom { from { transform: scale(1.12); opacity: 0; } to { transform: scale(1.02); opacity: 1; } }
  .legal-hero-img { animation: legalHeroZoom 1.6s cubic-bezier(.2,.7,.2,1) both; }
  @media (prefers-reduced-motion: reduce) { .legal-hero-img { animation: none; } }
`;

const EMAIL = "info@nexuxgh.com";

// Turns the email address and "Privacy Policy" mentions into links.
function richText(text, { linkPrivacy }) {
    const pattern = linkPrivacy ? /(info@nexuxgh\.com|Privacy Policy)/g : /(info@nexuxgh\.com)/g;
    return text.split(pattern).map((part, i) => {
        if (part === EMAIL) {
            return (
                <a key={i} href={`mailto:${EMAIL}`} className="text-[#00BFA6] font-semibold hover:underline">
                    {part}
                </a>
            );
        }
        if (linkPrivacy && part === "Privacy Policy") {
            return (
                <Link key={i} to="/privacy-policy" className="text-[#00BFA6] font-semibold hover:underline">
                    {part}
                </Link>
            );
        }
        return part;
    });
}

// Highlights the table-of-contents entry for the section currently on screen.
function useActiveSection(ids) {
    const [active, setActive] = useState(ids[0]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting);
                if (visible.length) {
                    visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                    setActive(visible[0].target.id);
                }
            },
            { rootMargin: "-120px 0px -60% 0px" }
        );
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [ids]);

    return active;
}

export default function LegalPage({ doc, related, heroImage, heroPosition = "center" }) {
    const ids = useMemo(() => doc.sections.map((s) => s.id), [doc]);
    const active = useActiveSection(ids);
    const linkPrivacy = doc.slug !== "privacy-policy";

    const scrollTo = (id) => (e) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <>
            <Helmet>
                <title>{doc.seoTitle}</title>
                <meta name="description" content={doc.metaDescription} />
                <meta property="og:title" content={doc.seoTitle} />
                <meta property="og:description" content={doc.metaDescription} />
            </Helmet>

            <style>{STYLES}</style>
            <Navbar transparent />

            {/* ── HERO ─────────────────────────────────────────────── */}
            <section className="relative bg-[#0B1F3A] min-h-[72svh] flex items-end pt-40 pb-20 md:pt-48 md:pb-24 px-6 overflow-hidden">
                {/* Background photo */}
                {heroImage && (
                    <img
                        src={heroImage}
                        alt=""
                        aria-hidden="true"
                        fetchPriority="high"
                        className="legal-hero-img absolute inset-0 w-full h-full object-cover"
                        style={{ objectPosition: heroPosition }}
                    />
                )}

                {/* Navy overlays: keep the navbar and text readable */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(90deg, rgba(11,31,58,.92) 0%, rgba(11,31,58,.75) 45%, rgba(11,31,58,.35) 100%)" }} />
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(180deg, rgba(11,31,58,.6) 0%, rgba(11,31,58,0) 25%, rgba(11,31,58,0) 70%, rgba(11,31,58,.7) 100%)" }} />

                {/* soft teal glow */}
                <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-[#00BFA6]/20 blur-[120px] pointer-events-none" />

                <div className="relative w-full max-w-6xl mx-auto">
                    <div className="legal-anim-1 flex items-center gap-2 mb-6 text-xs">
                        <Link to="/" className="text-white/40 font-medium hover:text-white/70 transition-colors">Home</Link>
                        <span className="text-white/20">/</span>
                        <span className="text-[#00BFA6] font-semibold">{doc.title}</span>
                    </div>

                    <span className="legal-anim-1 inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-[#00BFA6]/15 text-[#00BFA6] mb-5">
                        {doc.eyebrow}
                    </span>

                    <h1
                        className="legal-anim-2 text-white font-extrabold tracking-tight leading-[1.05] mb-6"
                        style={{ fontSize: "clamp(36px, 6vw, 72px)" }}
                    >
                        {doc.title}
                    </h1>

                    <p className="legal-anim-3 text-white/65 text-base md:text-lg leading-relaxed max-w-2xl">
                        {doc.intro}
                    </p>

                    <div className="legal-anim-3 flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-xs text-white/45">
                        <span>
                            Last updated: <span className="text-white/80 font-semibold">{doc.effectiveDate}</span>
                        </span>
                        <span className="hidden sm:inline text-white/20">|</span>
                        <span>{doc.sections.length} sections</span>
                    </div>
                </div>
            </section>

            {/* ── BODY ─────────────────────────────────────────────── */}
            <section className="bg-white px-6 py-16 md:py-20">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

                    {/* Table of contents */}
                    <aside className="lg:col-span-4">
                        <div className="lg:sticky lg:top-28">
                            <p className="text-[11px] font-bold tracking-widest uppercase text-[#0B1F3A]/40 mb-4">On this page</p>

                            {/* Mobile: compact dropdown-style list */}
                            <details className="lg:hidden rounded-xl border border-[#0B1F3A]/10 bg-[#F5F7FA]">
                                <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-[#0B1F3A] flex items-center justify-between">
                                    Jump to a section
                                    <span className="text-[#00BFA6]">+</span>
                                </summary>
                                <ol className="px-4 pb-4 space-y-2">
                                    {doc.sections.map((s, i) => (
                                        <li key={s.id}>
                                            <a href={`#${s.id}`} onClick={scrollTo(s.id)} className="text-sm text-[#0B1F3A]/65 hover:text-[#0B1F3A]">
                                                <span className="text-[#00BFA6] font-semibold mr-2">{String(i + 1).padStart(2, "0")}</span>
                                                {s.title}
                                            </a>
                                        </li>
                                    ))}
                                </ol>
                            </details>

                            {/* Desktop: sticky list with active marker */}
                            <ol className="hidden lg:block border-l border-[#0B1F3A]/10">
                                {doc.sections.map((s, i) => {
                                    const isActive = active === s.id;
                                    return (
                                        <li key={s.id}>
                                            <a
                                                href={`#${s.id}`}
                                                onClick={scrollTo(s.id)}
                                                className={[
                                                    "flex gap-3 -ml-px pl-4 py-1.5 text-[13px] leading-snug border-l-2 transition-colors duration-200",
                                                    isActive
                                                        ? "border-[#00BFA6] text-[#0B1F3A] font-semibold"
                                                        : "border-transparent text-[#0B1F3A]/50 hover:text-[#0B1F3A]",
                                                ].join(" ")}
                                            >
                                                <span className={isActive ? "text-[#00BFA6]" : "text-[#0B1F3A]/30"}>
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                                {s.title}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ol>

                            {/* Contact card */}
                            <div className="hidden lg:block mt-10 rounded-2xl bg-[#F5F7FA] border border-[#0B1F3A]/5 p-5">
                                <p className="text-sm font-bold text-[#0B1F3A] mb-1">Questions?</p>
                                <p className="text-xs text-[#0B1F3A]/55 leading-relaxed mb-3">
                                    Reach out and our team will get back to you.
                                </p>
                                <a href={`mailto:${EMAIL}`} className="text-sm font-semibold text-[#00BFA6] hover:underline">
                                    {EMAIL}
                                </a>
                            </div>
                        </div>
                    </aside>

                    {/* Sections */}
                    <article className="lg:col-span-8 max-w-[720px]">
                        {doc.sections.map((s, i) => (
                            <div
                                key={s.id}
                                id={s.id}
                                className="legal-section pb-10 mb-10 border-b border-[#0B1F3A]/[0.07] last:border-0 last:mb-0 last:pb-0"
                            >
                                <div className="flex items-baseline gap-4 mb-4">
                                    <span className="text-[#00BFA6] font-extrabold text-sm tabular-nums">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h2
                                        className="text-[#0B1F3A] font-extrabold tracking-tight leading-snug"
                                        style={{ fontSize: "clamp(20px, 2.2vw, 26px)" }}
                                    >
                                        {s.title}
                                    </h2>
                                </div>

                                <div className="md:pl-9 space-y-4">
                                    {s.blocks.map((b, j) =>
                                        typeof b === "string" ? (
                                            <p key={j} className="text-[15px] md:text-base leading-[1.85] text-[#334455]">
                                                {richText(b, { linkPrivacy })}
                                            </p>
                                        ) : (
                                            <div key={j} className="rounded-xl bg-[#F5F7FA] border-l-[3px] border-[#00BFA6] px-5 py-4">
                                                <p className="text-sm font-bold text-[#0B1F3A] mb-1">{b.label}</p>
                                                <p className="text-[15px] leading-[1.75] text-[#334455]">
                                                    {richText(b.text, { linkPrivacy })}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    </article>
                </div>
            </section>

            {/* ── RELATED DOC + CONTACT ───────────────────────────── */}
            <section className="bg-[#F5F7FA] px-6 py-14">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Link
                        to={related.path}
                        className="group rounded-2xl bg-white border border-[#0B1F3A]/[0.07] p-7 hover:border-[#00BFA6]/40 hover:-translate-y-0.5 transition-all duration-200"
                    >
                        <p className="text-[11px] font-bold tracking-widest uppercase text-[#0B1F3A]/40 mb-2">Also read</p>
                        <p className="text-xl font-extrabold text-[#0B1F3A] tracking-tight flex items-center gap-2">
                            {related.title}
                            <span className="text-[#00BFA6] transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                        </p>
                    </Link>

                    <div className="rounded-2xl bg-[#0B1F3A] p-7">
                        <p className="text-[11px] font-bold tracking-widest uppercase text-white/40 mb-2">Need help?</p>
                        <p className="text-xl font-extrabold text-white tracking-tight mb-1">Talk to the Nexux team</p>
                        <a href={`mailto:${EMAIL}`} className="text-sm font-semibold text-[#00BFA6] hover:underline">
                            {EMAIL}
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
