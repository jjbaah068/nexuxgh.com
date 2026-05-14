import { Link } from "react-router";
import logo from "../assets/images/footerlogo.png"

const SERVICES = [
    { name: "Brand Strategy & Identity", path: "/services" },
    { name: "Social Media Marketing", path: "/services" },
    { name: "Web Design & Dev", path: "/services" },
    { name: "Growth Systems", path: "/services" },
];

const COMPANY = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Work", path: "/work" },
    { name: "Contact", path: "/contact" },
    { name: "Insight", path: "/insight" },
    // { name: "Contact", path: "/contact" },
];

const SOCIALS = [
    { name: "LinkedIn", href: "#", target: "_blank" },
    { name: "Instagram", href: "https://instagram.com/nexuxgh", target: "_blank" },
    { name: "Facebook", href: "https://web.facebook.com/profile.php?id=61565329845637", target: "_blank" },
];

export default function Footer() {
    return (
        <footer className="bg-[#060F1D] text-white pt-16 pb-8 px-6">
            <div className="max-w-6xl mx-auto">

                {/* Top divider */}
                <div className="h-px w-full mb-14" style={{ background: "linear-gradient(90deg, transparent, #00BFA6, transparent)" }} />

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12 items-start">

                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <img
                            src={logo}
                            alt="Nexux"
                            className="h-20 w-auto object-contain mb-4"
                            style={{ maxWidth: "180px" }}
                        />
                        <p className="text-white/45 text-sm leading-relaxed max-w-[220px] mb-5">
                            We connect strategy, design & technology to drive real business growth.
                        </p>
                        <span className="text-[#00BFA6] text-[11px] font-semibold tracking-widest uppercase">
                            Marketing Technology Agency
                        </span>
                    </div>

                    {/* Services */}
                    <div>
                        <p className="text-white/30 text-[11px] font-bold tracking-widest uppercase mb-5">Services</p>
                        <ul className="flex flex-col gap-3">
                            {SERVICES.map((s) => (
                                <li key={s.name}>
                                    <Link to={s.path} className="text-white/55 hover:text-[#00BFA6] text-sm transition-colors duration-200">
                                        {s.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <p className="text-white/30 text-[11px] font-bold tracking-widest uppercase mb-5">Company</p>
                        <ul className="flex flex-col gap-3">
                            {COMPANY.map((c) => (
                                <li key={c.name}>
                                    <Link to={c.path} className="text-white/55 hover:text-[#00BFA6] text-sm transition-colors duration-200">
                                        {c.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <p className="text-white/30 text-[11px] font-bold tracking-widest uppercase mb-5">Connect</p>
                        <ul className="flex flex-col gap-3">
                            {SOCIALS.map((s) => (
                                <li key={s.name}>
                                    <a
                                        href={s.href}
                                        target={s.target || "_self"}
                                        rel={s.target === "_blank" ? "noopener noreferrer" : undefined}
                                        className="text-white/55 hover:text-[#00BFA6] text-sm transition-colors duration-200"
                                    >
                                        {s.name}
                                    </a>
                                </li>
                            ))}
                            <li className="mt-1">
                                <a href="mailto:info@nexuxgh.com" className="text-[#00BFA6] text-sm font-medium hover:underline">
                                    info@nexuxgh.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-white/25 text-xs">© {new Date().getFullYear()} Nexux. All rights reserved.</p>
                    <div className="flex gap-5">
                        <a
                            href="#"
                            className="text-xs text-white/25">Terms & Conditions</a>

                        <a href="#"
                            className="text-xs text-white/25">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}