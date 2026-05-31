import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { ARTICLES } from "../content/articles";
import arhinImg from "../assets/images/arhin.JPG";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;

const STYLES = `
  body { font-family: 'Plus Jakarta Sans', sans-serif; }
  h1,h2,h3,h4 { font-family: 'Plus Jakarta Sans', sans-serif; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  .anim-1 { animation: fadeUp .65s .05s both; }
  .anim-2 { animation: fadeUp .65s .18s both; }
  .anim-3 { animation: fadeUp .65s .30s both; }

  /* Article body typography */
  .article-body { max-width: 680px; margin: 0 auto; }

  .article-h2 {
    font-size: clamp(20px, 2.5vw, 28px);
    font-weight: 800;
    color: #0B1F3A;
    letter-spacing: -0.02em;
    line-height: 1.3;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }

  .article-p {
    font-size: 16px;
    line-height: 1.85;
    color: #334455;
    margin-bottom: 1.25rem;
  }

  .article-li {
    font-size: 15px;
    line-height: 1.75;
    color: #334455;
    padding-left: 0.25rem;
  }

  /* Pull quote */
  .pull-quote {
    background: linear-gradient(135deg, #f0f7ff, #e8f4f0);
    border-left: 4px solid #00BFA6;
    border-radius: 0 12px 12px 0;
    padding: 20px 24px;
    margin: 2rem 0;
  }
  .pull-quote p {
    font-size: clamp(17px, 2vw, 22px);
    font-weight: 700;
    color: #0B1F3A;
    line-height: 1.5;
    margin: 0;
    font-style: italic;
  }

  /* Table */
  .article-table { width: 100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; margin: 1.5rem 0; }
  .article-table th { background: #f0f4f8; color: #0B1F3A; font-weight: 700; font-size: 13px; padding: 12px 16px; text-align: left; border-bottom: 1px solid #e2e8f0; }
  .article-table td { background: white; color: #334455; font-size: 14px; padding: 11px 16px; border-bottom: 1px solid #f0f4f8; line-height: 1.6; }
  .article-table tr:last-child td { border-bottom: none; }

  /* Steps */
  .step-line-inner {
    position: absolute;
    left: 19px;
    top: 44px;
    bottom: -16px;
    width: 1.5px;
    background: linear-gradient(to bottom, #00BFA6, transparent);
  }

  /* Service cards inside article */
  .svc-inline-card { transition: border-color .2s, transform .2s; }
  .svc-inline-card:hover { border-color: rgba(0,191,166,0.35); transform: translateY(-2px); }
`;

/* ── CONTENT BLOCK RENDERER ─────────────────────────────────────── */
function renderBlock(block, i, article) {
    switch (block.type) {

        case "intro":
            return (
                <p key={i} className="article-p" style={{ fontSize: "17px", color: "#0B1F3A", fontWeight: 500 }}>
                    {block.text}
                </p>
            );

        case "paragraph":
            return <p key={i} className="article-p">{block.text}</p>;

        case "h2":
            return <h2 key={i} className="article-h2">{block.text}</h2>;

        case "bullets":
            return (
                <ul key={i} className="my-5 flex flex-col gap-2.5" style={{ paddingLeft: "0", listStyle: "none" }}>
                    {block.items.map((item, j) => (
                        <li key={j} className="article-li flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                                style={{ background: "#00BFA615", minWidth: "20px" }}>
                                <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                                    <path d="M1 3l2 2 4-4" stroke="#00BFA6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            {item}
                        </li>
                    ))}
                </ul>
            );

        case "pullquote":
            return (
                <div key={i} className="pull-quote">
                    <p>{block.text}</p>
                </div>
            );

        case "table":
            return (
                <div key={i} className="my-6 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                    <table className="article-table">
                        <thead>
                            <tr>
                                {block.headers.map((h, j) => <th key={j}>{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {block.rows.map((row, j) => (
                                <tr key={j}>
                                    {row.map((cell, k) => <td key={k}>{cell}</td>)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );

        case "steps":
            return (
                <div key={i} className="my-8 flex flex-col gap-0">
                    {block.items.map((step, j) => (
                        <div key={j} className="relative flex gap-5 pb-6 last:pb-0">
                            {j < block.items.length - 1 && <div className="step-line-inner" />}
                            <div className="w-10 h-10 rounded-full bg-[#00BFA6]/10 border-2 border-[#00BFA6] flex items-center justify-center shrink-0 z-10">
                                <span className="text-[#00BFA6] text-[11px] font-black">{step.n}</span>
                            </div>
                            <div className="pt-1.5">
                                <p className="text-[#0B1F3A] font-bold text-base mb-1">{step.title}</p>
                                <p className="text-[#556677] text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            );

        case "infographic":
            return (
                <div key={i} className="my-8 rounded-2xl overflow-hidden">
                    <img
                        src={article.infographicImage}
                        alt={article.infographicAlt}
                        className="w-full h-auto rounded-2xl"
                        style={{ maxHeight: "480px", objectFit: "cover" }}
                    />
                    <p className="text-[#0B1F3A]/35 text-xs text-center mt-2 italic">{article.infographicAlt}</p>
                </div>
            );

        case "services":
            return (
                <div key={i} className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {block.items.map((svc, j) => (
                        <Link
                            key={j}
                            to={svc.link}
                            className="svc-inline-card bg-white border border-gray-100 rounded-xl p-5 flex flex-col gap-2 no-underline"
                        >
                            <p className="text-[#0B1F3A] font-bold text-sm">{svc.title}</p>
                            <p className="text-[#556677] text-xs leading-relaxed">{svc.desc}</p>
                            <span className="text-[#00BFA6] text-xs font-bold mt-1">Learn more →</span>
                        </Link>
                    ))}
                </div>
            );

        case "closing":
            return (
                <p key={i} className="article-p" style={{ fontSize: "17px", fontWeight: 500, color: "#0B1F3A" }}>
                    {block.text}
                </p>
            );

        default:
            return null;
    }
}

/* ══════════════════════════════════════════════════════════════════
   INSIGHT ARTICLE PAGE
══════════════════════════════════════════════════════════════════ */
export default function InsightArticle() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const article = ARTICLES.find((a) => a.slug === slug);

    useEffect(() => {
        if (!article) navigate("/insight");
        window.scrollTo(0, 0);
    }, [article, navigate]);

    if (!article) return null;

    return (
        <>
            <Helmet>
                <title>{article.seoTitle}</title>
                <meta name="description" content={article.metaDescription} />
                <meta property="og:title" content={article.seoTitle} />
                <meta property="og:description" content={article.metaDescription} />
                <meta property="og:image" content={article.featuredImage} />
                <meta property="og:type" content="article" />
            </Helmet>

            <style>{FONTS + STYLES}</style>
            <Navbar />

            {/* ── HERO ────────────────────────────────────────────── */}
            <section
                className="relative pt-36 pb-16 px-6 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #f0f4f8 0%, #e8f0f7 50%, #f5f9fc 100%)" }}
            >
                <div className="max-w-3xl mx-auto">

                    {/* Breadcrumb */}
                    <div className="anim-1 flex items-center gap-2 mb-6">
                        <Link to="/" className="text-[#0B1F3A]/35 text-xs font-medium hover:text-[#0B1F3A]/60 transition-colors">Home</Link>
                        <span className="text-[#0B1F3A]/20 text-xs">/</span>
                        <Link to="/insight" className="text-[#0B1F3A]/35 text-xs font-medium hover:text-[#0B1F3A]/60 transition-colors">Insights</Link>
                        <span className="text-[#0B1F3A]/20 text-xs">/</span>
                        <span className="text-[#00BFA6] text-xs font-semibold truncate max-w-[200px]">{article.category}</span>
                    </div>

                    {/* Category label */}
                    <div className="anim-1 mb-4">
                        <span
                            className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
                            style={{ background: "#00BFA615", color: "#00BFA6" }}
                        >
                            {article.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h1
                        className="anim-2 text-[#0B1F3A] font-extrabold leading-tight tracking-tight mb-6"
                        style={{ fontSize: "clamp(26px, 4vw, 48px)" }}
                    >
                        {article.title}
                    </h1>

                    {/* Author + meta row */}
                    <div className="anim-3 flex flex-wrap items-center gap-4 pb-6 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <img
                                src={arhinImg}
                                alt="Owuraku Arhin"
                                className="w-9 h-9 rounded-full object-cover shrink-0"
                                style={{ objectPosition: "center top" }}
                            />
                            <div>
                                <p className="text-[#0B1F3A] font-bold text-sm leading-none mb-0.5">{article.author}</p>
                                <p className="text-[#0B1F3A]/40 text-xs">{article.authorRole}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-[#0B1F3A]/35 text-xs">
                            <span>{article.date}</span>
                            <span>·</span>
                            <span>{article.readTime}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FEATURED IMAGE ──────────────────────────────────── */}
            <div className="bg-white px-6 pt-10 pb-2">
                <div className="max-w-3xl mx-auto">
                    <div className="rounded-2xl overflow-hidden shadow-sm">
                        <img
                            src={article.featuredImage}
                            alt={article.featuredImageAlt}
                            className="w-full object-cover"
                            style={{ maxHeight: "480px" }}
                        />
                    </div>
                    <p className="text-[#0B1F3A]/30 text-xs text-center mt-3 italic">{article.featuredImageAlt}</p>
                </div>
            </div>

            {/* ── ARTICLE BODY ────────────────────────────────────── */}
            <article className="bg-white px-6 py-12">
                <div className="article-body">
                    {article.content.map((block, i) => renderBlock(block, i, article))}
                </div>
            </article>

            {/* ── SOURCES ─────────────────────────────────────────── */}
            <section className="bg-[#F5F7FA] px-6 py-10">
                <div className="max-w-3xl mx-auto">
                    <p className="text-[#0B1F3A]/35 text-[11px] font-bold tracking-widest uppercase mb-4">Sources</p>
                    <ol className="flex flex-col gap-2">
                        {article.sources.map((src, i) => (
                            <li key={i} className="text-[#0B1F3A]/45 text-xs leading-relaxed">
                                {i + 1}. {src}
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* ── CTA ─────────────────────────────────────────────── */}
            <section className="relative bg-[#0B1F3A] px-6 py-20 text-center overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[500px] h-[260px] opacity-20 rounded-full"
                        style={{ background: "radial-gradient(ellipse,#00BFA6,transparent 65%)", filter: "blur(50px)" }} />
                </div>
                <div className="relative z-10 max-w-xl mx-auto">
                    <span className="block text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase mb-4">Work With Nexux</span>
                    <h2 className="text-white font-extrabold leading-tight tracking-tight mb-5"
                        style={{ fontSize: "clamp(26px,3.5vw,44px)" }}>
                        Ready to apply these ideas<br />to your brand?
                    </h2>
                    <p className="text-white/45 text-base leading-relaxed mb-10 mx-auto" style={{ maxWidth: 380 }}>
                        Whether you need stronger brand clarity, a better website, or smarter systems — let's find your clearest next step.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Link
                            to="/contact"
                            className="bg-[#00BFA6] hover:bg-[#00a892] text-white font-bold text-[15px] px-9 py-4 rounded-lg transition-colors"
                            style={{ boxShadow: "0 0 32px rgba(0,191,166,.3)" }}
                        >
                            Start a Project →
                        </Link>
                        <Link
                            to="/services"
                            className="border border-white/20 hover:border-white/40 text-white/65 hover:text-white font-medium text-[15px] px-9 py-4 rounded-lg transition-all"
                        >
                            Explore Our Services
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}