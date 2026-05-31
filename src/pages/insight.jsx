import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Helmet } from 'react-helmet-async';
import { ARTICLES } from "../content/articles";

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
    opacity: 0;
    transition: opacity 1.2s ease-in-out;
    background-size: cover;
    background-position: center;
  }
  .hero-slide.active { opacity: 1; }

  /* Slide dots */
  .slide-dot { transition: background .3s, width .3s; }
  .slide-dot.active { background: #00BFA6; width: 24px; }

  /* Article card */
  .art-card { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
  .art-card:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(11,31,58,0.10); border-color: rgba(0,191,166,0.30) !important; }
  .art-img { transition: transform .5s ease; }
  .art-card:hover .art-img { transform: scale(1.04); }
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

const HERO_SLIDES = [
    {
        bg: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=80",
        category: "Brand Strategy",
        title: "Why most brands fail in the first year and what to do instead",
        excerpt: "It's rarely about the product. It's almost always about positioning, clarity, and consistency.",
        readTime: "5 min read",
    },
    {
        bg: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1400&q=80",
        category: "Digital Marketing",
        title: "The social media strategy that actually compounds results over time",
        excerpt: "Chasing virality is a trap. Here's the framework we use to build audiences that stay.",
        readTime: "7 min read",
    },
    {
        bg: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1400&q=80",
        category: "Web Design",
        title: "What makes a website convert and what most agencies get wrong",
        excerpt: "Beautiful isn't enough. Every decision on your site should be moving someone toward action.",
        readTime: "6 min read",
    },
];

function ArticleCard({ article, delay = 0 }) {
    return (
        <div
            className="art-card reveal bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col"
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="w-full h-48 overflow-hidden shrink-0">
                {article.img ? (
                    <img
                        src={article.img}
                        alt={article.title}
                        className="art-img w-full h-full object-cover"
                    />
                ) : (
                    <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ background: `${article.accent}08` }}
                    >
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: `${article.accent}18`, border: `1.5px solid ${article.accent}30` }}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <rect x="1.5" y="2.5" width="15" height="12" rx="2" stroke={article.accent} strokeWidth="1.3" />
                                <path d="M1.5 11.5l3.5-3.5 2.5 2.5 3-3.5 4 4.5" stroke={article.accent} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="6" r="1.2" fill={article.accent} />
                            </svg>
                        </div>
                    </div>
                )}
            </div>

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
                    {article.slug ? (
                        <Link
                            to={`/insight/${article.slug}`}
                            className="text-sm font-bold transition-colors"
                            style={{ color: article.accent }}
                        >
                            Read more →
                        </Link>
                    ) : (
                        <span className="text-sm font-medium text-[#0B1F3A]/25">Coming soon</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Insight() {
    useReveal();

    const [currentSlide, setCurrentSlide] = useState(0);
    const timerRef = useRef(null);

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

    const featured = ARTICLES.find((a) => a.featured);
    const rest = ARTICLES.filter((a) => !a.featured);

    return (
        <>
            <Helmet>
                <title>Insights | Marketing Tips & Business Growth — Nexux Ghana</title>
                <meta name="description" content="Read Nexux's insights on brand strategy, digital marketing, web design, and business growth for SMEs in Ghana." />
            </Helmet>

            <style>{FONTS + STYLES}</style>
            <Navbar />

            {/* ── HERO ────────────────────────────────────────────── */}
            <section className="relative min-h-[600px] flex items-end overflow-hidden">

                {/* Background slides */}
                {HERO_SLIDES.map((slide, i) => (
                    <div
                        key={i}
                        className={`hero-slide ${i === currentSlide ? "active" : ""}`}
                        style={{ backgroundImage: `url(${slide.bg})` }}
                    />
                ))}

                {/* Dark overlay */}
                <div
                    className="absolute inset-0 z-10"
                    style={{ background: "linear-gradient(to top, rgba(11,31,58,0.96) 0%, rgba(11,31,58,0.6) 50%, rgba(11,31,58,0.25) 100%)" }}
                />

                {/* Content */}
                <div className="relative z-20 w-full max-w-6xl mx-auto px-6 pb-14 pt-40">
                    <div className="anim-1 mb-4">
                        <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/20 text-white/70">
                            {HERO_SLIDES[currentSlide].category}
                        </span>
                    </div>

                    <h1
                        className="anim-2 text-white font-extrabold leading-[1.06] tracking-tight mb-4"
                        style={{ fontSize: "clamp(28px, 4vw, 56px)", maxWidth: 680 }}
                    >
                        {HERO_SLIDES[currentSlide].title}
                    </h1>

                    <p
                        className="anim-3 text-white/65 leading-relaxed mb-8"
                        style={{ fontSize: "clamp(14px, 1.4vw, 17px)", maxWidth: 480 }}
                    >
                        {HERO_SLIDES[currentSlide].excerpt}
                    </p>

                    <div className="anim-4 flex items-center gap-6">
                        <span className="text-white/35 text-xs font-medium">{HERO_SLIDES[currentSlide].readTime}</span>
                    </div>

                    {/* Dots */}
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

            {/* ── FEATURED ARTICLE ────────────────────────────────── */}
            {featured && (
                <section className="bg-white px-6 py-20">
                    <div className="max-w-6xl mx-auto">
                        <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-8">
                            Featured Insight
                        </span>
                        <Link
                            to={`/insight/${featured.slug}`}
                            className="reveal art-card block bg-white border border-gray-100 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2"
                        >
                            {/* Image */}
                            <div className="h-72 lg:h-auto min-h-[280px] overflow-hidden">
                                <img
                                    src={featured.featuredImage || featured.img}
                                    alt={featured.title}
                                    className="art-img w-full h-full object-cover"
                                />
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
                                    style={{ fontSize: "clamp(22px, 2.5vw, 34px)" }}
                                >
                                    {featured.title}
                                </h2>
                                <p className="text-[#556677] text-base leading-relaxed">{featured.excerpt}</p>
                                <div className="flex items-center gap-4 pt-2">
                                    <span
                                        className="inline-flex items-center gap-2 font-bold text-sm"
                                        style={{ color: featured.accent }}
                                    >
                                        Read full article →
                                    </span>
                                    <span className="text-[#0B1F3A]/30 text-xs">{featured.readTime}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            {/* ── ALL INSIGHTS GRID ───────────────────────────────── */}
            <section className="bg-[#F5F7FA] px-6 py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-12">
                        <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-3">All Insights</span>
                        <h2
                            className="reveal text-[#0B1F3A] font-extrabold leading-tight tracking-tight"
                            style={{ fontSize: "clamp(24px, 3vw, 40px)" }}
                        >
                            Ideas worth thinking about.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rest.map((article, i) => (
                            <ArticleCard key={article.id} article={article} delay={i * 60} />
                        ))}
                    </div>

                    {rest.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-[#0B1F3A]/30 text-base">More insights coming soon.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ── CTA ─────────────────────────────────────────────── */}
            <section className="bg-white px-6 py-20 text-center">
                <div className="max-w-xl mx-auto">
                    <span className="reveal block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-4">Work With Us</span>
                    <h2
                        className="reveal text-[#0B1F3A] font-extrabold leading-tight tracking-tight mb-5"
                        style={{ fontSize: "clamp(26px, 3.5vw, 44px)" }}
                    >
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