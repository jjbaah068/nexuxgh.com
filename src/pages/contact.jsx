import { useState, useEffect } from "react";
import { Link } from "react-router";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`;

const STYLES = `
  body { font-family: 'Plus Jakarta Sans', sans-serif; }
  h1,h2,h3,h4 { font-family: 'Plus Jakarta Sans', sans-serif; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }

  .anim-1 { animation: fadeUp .65s .05s both; }
  .anim-2 { animation: fadeUp .65s .18s both; }
  .anim-3 { animation: fadeUp .65s .30s both; }
  .anim-4 { animation: fadeUp .65s .42s both; }
  .anim-5 { animation: fadeUp .65s .52s both; }

  .reveal { opacity:0; transform:translateY(22px); transition: opacity .55s ease, transform .55s ease; }
  .reveal.in { opacity:1; transform:translateY(0); }

  /* Form inputs */
  .form-input {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid #e2e8f0;
    border-radius: 10px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    color: #0B1F3A;
    background: white;
    outline: none;
    transition: border-color .2s, box-shadow .2s;
  }
  .form-input::placeholder { color: rgba(11,31,58,0.3); }
  .form-input:focus { border-color: #00BFA6; box-shadow: 0 0 0 3px rgba(0,191,166,0.08); }
  .form-input:hover:not(:focus) { border-color: #cbd5e1; }

  textarea.form-input { resize: none; }

  /* Service select chips */
  .svc-chip { 
    transition: background .2s, border-color .2s, color .2s; 
    cursor: pointer;
    user-select: none;
  }
  .svc-chip.selected { 
    background: #0B1F3A; 
    border-color: #0B1F3A; 
    color: white; 
  }
  .svc-chip.selected .chip-dot { background: #00BFA6; }

  /* Submit button */
  .submit-btn { transition: background .2s, transform .15s, box-shadow .2s; }
  .submit-btn:hover { background: #00a892; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,191,166,.3); }
  .submit-btn:active { transform: translateY(0); }

  /* Contact info card */
  .info-card { transition: border-color .2s, transform .2s; }
  .info-card:hover { border-color: rgba(0,191,166,0.3); transform: translateY(-3px); }
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

const SERVICES = [
    "Brand Strategy & Identity",
    "Digital & Social Media Marketing",
    "Web Design & Development",
    "Growth Systems & Automation",
    "Not sure yet",
];

const BUDGETS = [
    "Under GHc1,000",
    "GHc1,000 – Ghc3,000",
    "GHc3,000 – Ghc7,000",
    "GHc7,000+",
    "Let's discuss",
];

const CONTACT_INFO = [
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2.5 5.833C2.5 5.373 2.873 5 3.333 5h13.334C17.127 5 17.5 5.373 17.5 5.833v8.334c0 .46-.373.833-.833.833H3.333A.833.833 0 012.5 14.167V5.833z" stroke="#00BFA6" strokeWidth="1.5"/>
                <path d="M2.5 6.25l7.5 5 7.5-5" stroke="#00BFA6" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        ),
        label: "Email us",
        value: "info@nexuxgh.com",
        href: "mailto:info@nexuxgh.com",
    },
   
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="#00BFA6" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="4" stroke="#00BFA6" strokeWidth="1.5"/>
                <circle cx="17" cy="7" r="1" fill="#00BFA6"/>
            </svg>
        ),
        target: "_blank",
        label: "Instagram",
        value: "@nexuxgh",
        href: "https://instagram.com/nexuxgh",
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" stroke="#00BFA6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        ),
        target: "_blank",
        label: "Facebook",
        value: "@nexux",
        href: "https://web.facebook.com/profile.php?id=61565329845637",
    },
    {
    icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#00BFA6"/>
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.413A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="#00BFA6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    target: "_blank",
    label: "WhatsApp",
    value: "+233 502 713 141",
    href: "https://wa.me/233502713141?text=Hi%20Nexux%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20you.",
},
     {
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C7.239 2 5 4.239 5 7c0 4.418 5 11 5 11s5-6.582 5-11c0-2.761-2.239-5-5-5z" stroke="#00BFA6" strokeWidth="1.5"/>
                <circle cx="10" cy="7" r="1.5" stroke="#00BFA6" strokeWidth="1.5"/>
            </svg>
        ),
        label: "Based in",
        value: "Accra, Ghana",
        href: null,
    },
];

/* ══════════════════════════════════════════════════════════════════
   CONTACT PAGE
══════════════════════════════════════════════════════════════════ */
export default function Contact() {
    useReveal();

    const [form, setForm] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
        budget: "",
    });
    const [selectedServices, setSelectedServices] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleService = (svc) => {
        setSelectedServices((prev) =>
            prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]
        );
    };

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Replace this with your actual form submission logic
        // e.g. EmailJS, Formspree, or your own API endpoint
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    return (
        <>
            <style>{FONTS + STYLES}</style>
            <Navbar />

            {/* ── HERO ────────────────────────────────────────────── */}
            <section
                className="relative pt-36 pb-16 px-6 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #f0f4f8 0%, #e8f0f7 50%, #f5f9fc 100%)" }}
            >
                {/* Deco */}
                <svg className="absolute pointer-events-none opacity-[0.06]" style={{ right: "-40px", top: "5%", width: "340px" }} viewBox="0 0 380 380">
                    <rect x="50" y="50" width="280" height="280" rx="36" fill="none" stroke="#0B1F3A" strokeWidth="2" transform="rotate(12 190 190)" />
                    <rect x="90" y="90" width="200" height="200" rx="24" fill="none" stroke="#0B1F3A" strokeWidth="1.5" transform="rotate(28 190 190)" />
                </svg>

                <div className="max-w-6xl mx-auto">
                    <h1
                        className="anim-2 text-[#0B1F3A] font-extrabold leading-[1.06] tracking-tight mb-5"
                        style={{ fontSize: "clamp(38px, 5.5vw, 68px)", maxWidth: 640 }}
                    >
                        Let's build something{" "}
                        <span className="text-[#00BFA6]">worth talking about.</span>
                    </h1>
                    <p
                        className="anim-3 text-[#0B1F3A]/55 leading-relaxed"
                        style={{ fontSize: "clamp(15px,1.6vw,18px)", maxWidth: 480 }}
                    >
                       Whether you need strategy, design, or a smarter digital system, we’ll help you find the clearest next step.
                    </p>
                </div>
            </section>

            {/* ── MAIN CONTENT ────────────────────────────────────── */}
            <section className="bg-[#F5F7FA] px-6 py-16">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

                    {/* ── LEFT: contact info + what to expect ─────── */}
                    <div className="flex flex-col gap-6 lg:sticky lg:top-28">

                        {/* Info cards */}
                        {CONTACT_INFO.map((item) => (
                            <div
                                key={item.label}
                                className="info-card reveal bg-white border border-gray-100 rounded-2xl px-5 py-4 flex items-center gap-4"
                            >
                                <div className="w-10 h-10 rounded-xl bg-[#00BFA6]/10 border border-[#00BFA6]/15 flex items-center justify-center shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-[#0B1F3A]/40 text-[11px] font-semibold tracking-wider uppercase mb-0.5">{item.label}</p>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            target={item.target || "_self"}
                                            rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                                            className="text-[#0B1F3A] font-bold text-sm hover:text-[#00BFA6] transition-colors"
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p className="text-[#0B1F3A] font-bold text-sm">{item.value}</p>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* What to expect */}
                        <div className="reveal bg-[#0B1F3A] rounded-2xl p-7 flex flex-col gap-5">
                            <p className="text-[#00BFA6] text-[11px] font-bold tracking-widest uppercase">What happens next</p>
                            <div className="flex flex-col gap-4">
                                {[
                                    { n: "01", text: "We review your message and get back within 24 hours." },
                                    { n: "02", text: "We schedule a free 45-minute discovery call." },
                                    { n: "03", text: "We send a tailored proposal with scope and pricing." },
                                ].map(({ n, text }) => (
                                    <div key={n} className="flex gap-4 items-start">
                                        <span className="text-[#00BFA6] text-xs font-black shrink-0 mt-0.5">{n}</span>
                                        <p className="text-white/60 text-sm leading-relaxed">{text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Response time badge */}
                        <div className="reveal flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-5 py-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#00BFA6] shrink-0" style={{ boxShadow: "0 0 0 4px rgba(0,191,166,0.15)" }} />
                            <p className="text-[#0B1F3A]/60 text-sm">
                                Average response time: <span className="text-[#0B1F3A] font-bold">under 24 hours</span>
                            </p>
                        </div>
                    </div>

                    {/* ── RIGHT: form ──────────────────────────────── */}
                    <div className="lg:col-span-2 reveal">
                        {submitted ? (
                            /* Success state */
                            <div className="bg-white border border-gray-100 rounded-2xl p-12 flex flex-col items-center text-center gap-6">
                                <div className="w-16 h-16 rounded-full bg-[#00BFA6]/10 border-2 border-[#00BFA6] flex items-center justify-center">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                        <path d="M6 14l5 5 11-11" stroke="#00BFA6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-[#0B1F3A] font-extrabold text-2xl mb-2">Message sent!</h3>
                                    <p className="text-[#556677] text-base leading-relaxed" style={{ maxWidth: 360 }}>
                                        Thanks for reaching out. We'll review your message and get back to you within 24 hours.
                                    </p>
                                </div>
                                <button
                                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", message: "", budget: "" }); setSelectedServices([]); }}
                                    className="text-[#00BFA6] text-sm font-bold hover:underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-8 flex flex-col gap-7">

                                {/* Name + Email row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[#0B1F3A] text-xs font-bold tracking-wide uppercase">
                                            Your Name <span className="text-[#00BFA6]">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="e.g. Kwame Mensah"
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[#0B1F3A] text-xs font-bold tracking-wide uppercase">
                                            Email Address <span className="text-[#00BFA6]">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="you@company.com"
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Company */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-[#0B1F3A] text-xs font-bold tracking-wide uppercase">
                                        Company / Brand Name
                                        <span className="text-[#0B1F3A]/30 font-normal normal-case ml-1">(optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={form.company}
                                        onChange={handleChange}
                                        placeholder="e.g. Finova Ltd."
                                        className="form-input"
                                    />
                                </div>

                                {/* Service chips */}
                                <div className="flex flex-col gap-3">
                                    <label className="text-[#0B1F3A] text-xs font-bold tracking-wide uppercase">
                                        What do you need help with? <span className="text-[#00BFA6]">*</span>
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {SERVICES.map((svc) => (
                                            <button
                                                key={svc}
                                                type="button"
                                                onClick={() => toggleService(svc)}
                                                className={`svc-chip text-sm font-semibold px-4 py-2 rounded-full border transition-all ${selectedServices.includes(svc)
                                                    ? "selected"
                                                    : "border-gray-200 bg-white text-[#0B1F3A]/60 hover:border-[#0B1F3A]/30 hover:text-[#0B1F3A]"
                                                    }`}
                                            >
                                                {svc}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Budget */}
                                <div className="flex flex-col gap-3">
                                    <label className="text-[#0B1F3A] text-xs font-bold tracking-wide uppercase">
                                        Project Budget
                                        <span className="text-[#0B1F3A]/30 font-normal normal-case ml-1">(optional)</span>
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {BUDGETS.map((b) => (
                                            <button
                                                key={b}
                                                type="button"
                                                onClick={() => setForm((prev) => ({ ...prev, budget: prev.budget === b ? "" : b }))}
                                                className={`svc-chip text-sm font-semibold px-4 py-2 rounded-full border transition-all ${form.budget === b
                                                    ? "selected"
                                                    : "border-gray-200 bg-white text-[#0B1F3A]/60 hover:border-[#0B1F3A]/30 hover:text-[#0B1F3A]"
                                                    }`}
                                            >
                                                {b}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-[#0B1F3A] text-xs font-bold tracking-wide uppercase">
                                        What are you trying to achieve? <span className="text-[#00BFA6]">*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="What are you working on? What results are you looking for? Any timeline or context that would help us understand your needs..."
                                        className="form-input"
                                        required
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="submit-btn w-full bg-[#00BFA6] text-white font-bold text-[15px] py-4 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                    style={{ boxShadow: "0 4px 20px rgba(0,191,166,.25)" }}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="2" strokeDasharray="28 14" strokeLinecap="round" />
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : "Send Message →"}
                                </button>

                                <p className="text-[#0B1F3A]/30 text-xs text-center">
                                  We respect your privacy. No spams
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </section >

            <Footer />
        </>
    );
}