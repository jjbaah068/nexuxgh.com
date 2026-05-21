import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
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

  /* Hero crossfade */
  .hero-slide {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 1.2s ease-in-out;
  }
  .hero-slide.active { opacity: 1; }

  /* Slide indicator dots */
  .slide-dot { transition: background .3s, width .3s; }
  .slide-dot.active { background: #00BFA6; width: 24px; }

  /* Article card */
  .art-card { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
  .art-card:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(11,31,58,0.10); border-color: rgba(0,191,166,0.30) !important; }
  .art-card:hover .art-img { transform: scale(1.04); }
  .art-img { transition: transform .5s ease; }

  /* Category pill */
  .cat-pill { transition: background .2s, color .2s, border-color .2s; cursor: pointer; }
  .cat-pill.active { background: #0B1F3A; color: white; border-color: #0B1F3A; }

  /* Newsletter input */
  .nl-input {
    flex: 1;
    padding: 13px 18px;
    border: 1.5px solid #e2e8f0;
    border-radius: 10px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    color: #0B1F3A;
    outline: none;
    transition: border-color .2s, box-shadow .2s;
  }
  .nl-input::placeholder { color: rgba(11,31,58,0.3); }
  .nl-input:focus { border-color: #00BFA6; box-shadow: 0 0 0 3px rgba(0,191,166,0.08); }
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

// Hero slides — add your own images by importing them and replacing null
// e.g: import insight1 from "../assets/images/insight1.jpg"  → img: insight1
const HERO_SLIDES = [
    {
        img: null,
        imgLabel: "Strategy & Growth",
        category: "Brand Strategy",
        title: "Why most brands fail in the first year and what to do instead",
        excerpt: "It's rarely about the product. It's almost always about positioning, clarity, and consistency.",
        readTime: "5 min read",
        accent: "#3B5BDB",
    },
    {
        img: null,
        imgLabel: "Digital Marketing",
        category: "Digital Marketing",
        title: "The social media strategy that actually compounds results over time",
        excerpt: "Chasing virality is a trap. Here's the framework we use to build audiences that stay.",
        readTime: "7 min read",
        accent: "#00BFA6",
    },
    {
        img: null,
        imgLabel: "Web Design",
        category: "Web Design",
        title: "What makes a website convert — and what most agencies get wrong",
        excerpt: "Beautiful isn't enough. Every decision on your site should be moving someone toward action.",
        readTime: "6 min read",
        accent: "#E64980",
    },
];

const CATEGORIES = ["All", "Brand Strategy", "Digital Marketing", "Web Design", "Growth Systems", "Business"];

const ARTICLES = [
    {
        id: 1,
        category: "Brand Strategy",
        tag: "brand",
        title: "How to build a brand identity that actually stands for something",
        excerpt: "Most brand identities are cosmetic. Here's how to build one that's strategic from the ground up.",
        readTime: "5 min read",
        date: "May 2025",
        img: null,
        imgLabel: "Brand identity article cover",
        accent: "#3B5BDB",
        featured: true,
    },
    {
        id: 2,
        category: "Digital Marketing",
        tag: "marketing",
        title: "The content calendar framework we use for every client",
        excerpt: "Consistency beats creativity in the long run. Here's how we keep it structured without losing the spark.",
        readTime: "4 min read",
        date: "Apr 2025",
        img: null,
        imgLabel: "Content calendar article cover",
        accent: "#00BFA6",
        featured: false,
    },
    {
        id: 3,
        category: "Growth Systems",
        tag: "growth",
        title: "Lead funnels that actually work for African SMEs",
        excerpt: "Most funnel templates are built for Western markets. Here's what we've learned building them for Accra.",
        readTime: "6 min read",
        date: "Apr 2025",
        img: null,
        imgLabel: "Lead funnel article cover",
        accent: "#F59F00",
        featured: false,
    },
    {
        id: 4,
        category: "Web Design",
        tag: "web",
        title: "5 website mistakes that are costing you customers",
        excerpt: "Slow load times, weak CTAs, and unclear messaging — we see these on almost every site we audit.",
        readTime: "4 min read",
        date: "Mar 2025",
        img: null,
        imgLabel: "Website mistakes article cover",
        accent: "#E64980",
        featured: false,
    },
    {
        id: 5,
        category: "Business",
        tag: "business",
        title: "Why Ghanaian businesses need to think differently about digital",
        excerpt: "The context is different. The customer behavior is different. Your strategy should be too.",
        readTime: "7 min read",
        date: "Mar 2025",
        img: null,
        imgLabel: "Ghana digital business article cover",
        accent: "#3B5BDB",
        featured: false,
    },
    {
        id: 6,
        category: "Brand Strategy",
        tag: "brand",
        title: "Messaging clarity: the one thing that separates growing brands",
        excerpt: "If you can't explain what you do in one sentence, your customers can't either. Here's how to fix that.",
        readTime: "5 min read",
        date: "Feb 2025",
        img: null,
        imgLabel: "Messaging clarity article cover",
        accent: "#00BFA6",
        featured: false,
    },
];

/* ── COMPONENTS ─────────────────────────────────────────────────── */

function ImgSlot({ label, accent, className = "" }) {
    return (
        <div
            className={`w-full h-full flex flex-col items-center justify-center gap-2 ${className}`}
            style={{ background: `${accent}08` }}
        >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${accent}18`, border: `1.5px solid ${accent}30` }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="1.5" y="2.5" width="15" height="12" rx="2" stroke={accent} strokeWidth="1.3" />
                    <path d="M1.5 11.5l3.5-3.5 2.5 2.5 3-3.5 4 4.5" stroke={accent} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="6" r="1.2" fill={accent} />
                </svg>
            </div>
            <p className="text-[10px] font-medium text-center px-4" style={{ color: `${accent}70` }}>{label}</p>
        </div>
    );
}

function ArticleCard({ article, delay = 0 }) {
    return (
        <div
            className="art-card reveal bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col"
            style={{ transitionDelay: `${delay}ms` }}
        >
            {/* Image */}
            <div className="w-full h-48 overflow-hidden shrink-0">
                {article.img ? (
                    <img src={article.img} alt={article.title} className="art-img w-full h-full object-cover" />
                ) : (
                    <ImgSlot label={article.imgLabel} accent={article.accent} />
                )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between">
                    <span
                        className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                        style={{ background: `${article.accent}12`, color: article.accent }}
                    >
                        {article.category}
                    </span>
                    <span className="text-[#0B1F3A]/30 text-xs">{article.date}</span>
                </div>

                <h3 className="text-[#0B1F3A] font-extrabold text-base leading-snug flex-1">{article.title}</h3>
                <p className="text-[#556677] text-sm leading-relaxed">{article.excerpt}</p>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
                    <span className="text-[#0B1F3A]/35 text-xs font-medium">{article.readTime}</span>
                    <a
                        href="#"
                        className="text-sm font-bold transition-colors"
                        style={{ color: article.accent }}
                    >
                        Read more →
                    </a>
                </div>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════════
   INSIGHT PAGE
══════════════════════════════════════════════════════════════════ */
export default function Insight() {
    useReveal();

    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeCategory, setActiveCategory] = useState("All");
    const [nlEmail, setNlEmail] = useState("");
    const [nlDone, setNlDone] = useState(false);
    const timerRef = useRef(null);

    // Auto-advance slides every 5s
    useEffect(() => {
        timerRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 5000);
        return () => clearInterval(timerRef.current);
    }, []);

    const goToSlide = (i) => {
        clearInterval(timerRef.current);
        setCurrentSlide(i);
        timerRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 5000);
    };

    const filteredArticles = activeCategory === "All"
        ? ARTICLES
        : ARTICLES.filter((a) => a.category === activeCategory);

    const featured = ARTICLES.find((a) => a.featured);
    const rest = filteredArticles.filter((a) => !a.featured || activeCategory !== "All");

    return (
        <>
            <Helmet>
                <title>Insights</title>
                <meta name="description" content="Read Nexux's insights on brand strategy, digital marketing, web design, and business growth for SMEs in Ghana." />
            </Helmet>

            <style>{FONTS + STYLES}</style>
            <Navbar />

            {/* ── HERO — crossfading background ───────────────────── */}
            <section className="relative min-h-[600px] flex items-end overflow-hidden">

                {/* Crossfading images */}
                {HERO_SLIDES.map((slide, i) => (
                    slide.img ? (
                        <img
                            key={i}
                            src={slide.img}
                            alt={slide.imgLabel}
                            className={`hero-slide ${i === currentSlide ? "active" : ""}`}
                        />
                    ) : (
                        /* Placeholder gradient when no image */
                        <div
                            key={i}
                            className={`hero-slide ${i === currentSlide ? "active" : ""}`}
                            style={{
                                background: i === 0
                                    ? "linear-gradient(135deg, #0B1F3A 0%, #1a3d6e 100%)"
                                    : i === 1
                                        ? "linear-gradient(135deg, #0d2848 0%, #0B1F3A 100%)"
                                        : "linear-gradient(135deg, #1a1040 0%, #0B1F3A 100%)",
                            }}
                        />
                    )
                ))}

                {/* Overlay */}
                <div
                    className="absolute inset-0 z-10"
                    style={{ background: "linear-gradient(to top, rgba(11,31,58,0.95) 0%, rgba(11,31,58,0.55) 50%, rgba(11,31,58,0.25) 100%)" }}
                />

                {/* Content */}
                <div className="relative z-20 w-full max-w-6xl mx-auto px-6 pb-14 pt-40">

                    {/* Category tag */}
                    <div className="anim-1 mb-4">
                        <span
                            className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/20 text-white/70"
                        >
                            {HERO_SLIDES[currentSlide].category}
                        </span>
                    </div>

                    {/* Headline */}
                    <h1
                        className="anim-2 text-white font-extrabold leading-[1.06] tracking-tight mb-4"
                        style={{ fontSize: "clamp(28px, 4vw, 56px)", maxWidth: 680 }}
                    >
                        {HERO_SLIDES[currentSlide].title}
                    </h1>

                    <p
                        className="anim-3 text-white/65 leading-relaxed mb-8"
                        style={{ fontSize: "clamp(14px,1.4vw,17px)", maxWidth: 480 }}
                    >
                        {HERO_SLIDES[currentSlide].excerpt}
                    </p>

                    <div className="anim-4 flex items-center gap-6">
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 bg-[#00BFA6] hover:bg-[#00a892] text-white font-bold text-sm px-6 py-3 rounded-lg transition-colors"
                            style={{ boxShadow: "0 4px 20px rgba(0,191,166,.35)" }}
                        >
                            Read article →
                        </a>
                        <span className="text-white/35 text-xs font-medium">{HERO_SLIDES[currentSlide].readTime}</span>
                    </div>

                    {/* Slide indicators */}
                    <div className="flex items-center gap-2 mt-10">
                        {HERO_SLIDES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goToSlide(i)}
                                className={`slide-dot h-2 rounded-full bg-white/30 transition-all ${i === currentSlide ? "active" : "w-2"}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURED ARTICLE ─────────────────────────────────── */}
            {featured && activeCategory === "All" && (
                <section className="bg-white px-6 py-20">
                    <div className="max-w-6xl mx-auto">
                        <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-8">
                            Featured Insight
                        </span>
                        <div className="reveal art-card bg-white border border-gray-100 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                            {/* Image */}
                            <div className="h-72 lg:h-auto overflow-hidden">
                                {featured.img ? (
                                    <img src={featured.img} alt={featured.title} className="art-img w-full h-full object-cover" />
                                ) : (
                                    <ImgSlot label={featured.imgLabel} accent={featured.accent} className="min-h-[280px]" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-10 flex flex-col justify-center gap-5">
                                <div className="flex items-center gap-3">
                                    <span
                                        className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
                                        style={{ background: `${featured.accent}12`, color: featured.accent }}
                                    >
                                        {featured.category}
                                    </span>
                                    <span className="text-[#0B1F3A]/30 text-xs">{featured.date}</span>
                                </div>
                                <h2
                                    className="text-[#0B1F3A] font-extrabold leading-tight tracking-tight"
                                    style={{ fontSize: "clamp(22px,2.5vw,34px)" }}
                                >
                                    {featured.title}
                                </h2>
                                <p className="text-[#556677] text-base leading-relaxed">{featured.excerpt}</p>
                                <div className="flex items-center gap-4 pt-2">
                                    <a
                                        href="#"
                                        className="inline-flex items-center gap-2 font-bold text-sm transition-colors"
                                        style={{ color: featured.accent }}
                                    >
                                        Read full article →
                                    </a>
                                    <span className="text-[#0B1F3A]/30 text-xs">{featured.readTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ── ALL ARTICLES ─────────────────────────────────────── */}
            <section className="bg-[#F5F7FA] px-6 py-20">
                <div className="max-w-6xl mx-auto">

                    {/* Header + filters */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
                        <div>
                            <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-2">All Insights</span>
                            <h2 className="reveal text-[#0B1F3A] font-extrabold leading-tight tracking-tight"
                                style={{ fontSize: "clamp(24px,3vw,40px)" }}>
                                Ideas worth thinking about.
                            </h2>
                        </div>
                    </div>

                    {/* Category filter pills */}
                    <div className="reveal flex flex-wrap gap-2 mb-10">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`cat-pill text-sm font-semibold px-4 py-2 rounded-full border transition-all ${activeCategory === cat
                                        ? "active"
                                        : "border-gray-200 bg-white text-[#0B1F3A]/55 hover:border-[#0B1F3A]/25 hover:text-[#0B1F3A]"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Articles grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(activeCategory === "All" ? ARTICLES.filter(a => !a.featured) : filteredArticles).map((article, i) => (
                            <ArticleCard key={article.id} article={article} delay={i * 60} />
                        ))}
                    </div>

                    {filteredArticles.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-[#0B1F3A]/30 text-base">No articles in this category yet.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ── NEWSLETTER ───────────────────────────────────────── */}
            {/* <section className="bg-[#0B1F3A] px-6 py-20 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(0,191,166,0.10), transparent 60%)" }} />

                <div className="relative max-w-2xl mx-auto text-center">
                    <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-4">Stay Sharp</span>
                    <h2 className="reveal text-white font-extrabold leading-tight tracking-tight mb-4"
                        style={{ fontSize: "clamp(26px,3.5vw,44px)" }}>
                        Get insights delivered to your inbox.
                    </h2>
                    <p className="reveal text-white/45 text-base leading-relaxed mb-10" style={{ maxWidth: 400, margin: "0 auto 2.5rem" }}>
                        No fluff, no spam. Just practical thinking on brand, marketing, and growth — straight to you.
                    </p>

                    {nlDone ? (
                        <div className="reveal flex items-center justify-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#00BFA6]/15 border border-[#00BFA6]/30 flex items-center justify-center">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M2.5 7l3 3 6-6" stroke="#00BFA6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <p className="text-white font-bold text-sm">You're in! We'll be in touch.</p>
                        </div>
                    ) : (
                        <div className="reveal flex gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                value={nlEmail}
                                onChange={(e) => setNlEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="nl-input bg-white"
                            />
                            <button
                                onClick={() => { if (nlEmail) setNlDone(true); }}
                                className="bg-[#00BFA6] hover:bg-[#00a892] text-white font-bold text-sm px-6 py-3 rounded-lg transition-colors shrink-0"
                                style={{ boxShadow: "0 4px 20px rgba(0,191,166,.25)" }}
                            >
                                Subscribe →
                            </button>
                        </div>
                    )}
                </div>
            </section> */}

            {/* ── CTA ──────────────────────────────────────────────── */}
            <section className="bg-white px-6 py-20 text-center">
                <div className="max-w-xl mx-auto">
                    <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-4">Work With Us</span>
                    <h2 className="reveal text-[#0B1F3A] font-extrabold leading-tight tracking-tight mb-5"
                        style={{ fontSize: "clamp(26px,3.5vw,44px)" }}>
                        Ready to apply these ideas to your brand?
                    </h2>
                    <p className="reveal text-[#556677] text-base leading-relaxed mb-10 mx-auto" style={{ maxWidth: 380 }}>
                        Let's talk about what you're building and how we can help it grow.
                    </p>
                    <div className="reveal flex flex-wrap gap-3 justify-center">
                        <Link
                            to="/contact"
                            className="bg-[#00BFA6] hover:bg-[#00a892] text-white font-bold text-[15px] px-9 py-4 rounded-lg transition-colors"
                            style={{ boxShadow: "0 4px 20px rgba(0,191,166,.25)" }}
                        >
                            Start a Project →
                        </Link>
                        <Link
                            to="/services"
                            className="border border-[#0B1F3A]/15 hover:border-[#0B1F3A]/30 bg-white text-[#0B1F3A]/60 hover:text-[#0B1F3A] font-medium text-[15px] px-9 py-4 rounded-lg transition-all"
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