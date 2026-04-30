import logo from "../assets/images/logo.jpeg"

const SERVICES = ["Brand Strategy & Identity", "Social Media Marketing", "Web Design & Dev", "Growth Systems"];
const COMPANY = ["About Us", "Our Work", "Case Studies", "Contact"];
const SOCIALS = [{ name: "LinkedIn", href: "#" }, { name: "Instagram", href: "#" }, { name: "Twitter / X", href: "#" }];

export default function Footer() {
    return (
        <footer className="bg-[#060F1D] text-white pt-16 pb-8 px-6">
            <div className="max-w-6xl mx-auto">

                {/* Top divider */}
                <div className="h-px w-full mb-14" style={{ background: "linear-gradient(90deg, transparent, #00BFA6, transparent)" }} />

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <img
                            src={logo}
                            alt="Nexux"
                            className="h-9 w-9 object-contain rounded-full ring-1 ring-white/10"
                            style={{ mixBlendMode: "screen" }}
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
                                <li key={s}>
                                    <a href="#services" className="text-white/55 hover:text-[#00BFA6] text-sm transition-colors duration-200">
                                        {s}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <p className="text-white/30 text-[11px] font-bold tracking-widest uppercase mb-5">Company</p>
                        <ul className="flex flex-col gap-3">
                            {COMPANY.map((c) => (
                                <li key={c}>
                                    <a href="#" className="text-white/55 hover:text-[#00BFA6] text-sm transition-colors duration-200">
                                        {c}
                                    </a>
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
                                    <a href={s.href} className="text-white/55 hover:text-[#00BFA6] text-sm transition-colors duration-200">
                                        {s.name}
                                    </a>
                                </li>
                            ))}
                            <li className="mt-1">
                                <a href="mailto:hello@nexux.co" className="text-[#00BFA6] text-sm font-medium hover:underline">
                                    hello@nexux.co
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-white/25 text-xs">© {new Date().getFullYear()} Nexux. All rights reserved.</p>
                    <div className="flex gap-5">
                        {SOCIALS.map((s) => (
                            <a key={s.name} href={s.href} className="text-white/25 hover:text-white/50 text-xs transition-colors">
                                {s.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}