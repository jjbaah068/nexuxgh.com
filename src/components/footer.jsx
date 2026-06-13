import { Link } from "react-router";

const SERVICES = [
    { name: "Brand Strategy & Identity", path: "/services" },
    { name: "Social & Content Marketing", path: "/services" },
    { name: "Web Design & Dev", path: "/services" },
    { name: "Growth Systems & Auto", path: "/services" },
];

const COMPANY = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Work", path: "/work" },
    { name: "Contact", path: "/contact" },
    { name: "Insight", path: "/insight" },
];

export default function Footer() {
    return (
        <footer className="bg-[#F4F7FA] text-[#08172D] pt-16 pb-0 px-6 overflow-hidden font-sans border-t border-[#08172D]/10">
            <div className="max-w-7xl mx-auto">

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-16 items-start border-b border-[#08172D]/10">

                    {/* Column 1: Contact Info */}
                    <div className="md:col-span-3 space-y-5 text-xs lg:text-sm">
                        {/* <div>
                            {/* <span className="text-[#08172D]/40 block font-semibold uppercase tracking-wider text-[10px] mb-1">Address</span> */}
                        {/* <p className="text-[#08172D]/80 font-normal leading-relaxed max-w-[200px]">
                                19 Kofi Annan Street Airport Residential Area
                            </p> */}
                        {/* </div>  */}
                        <div>
                            <span className="text-[#08172D]/40 block font-semibold uppercase tracking-wider text-[10px] mb-1">Email</span>
                            <a href="mailto:info@nexuxgh.com" className="text-[#08172D]/80 hover:text-[#15D4C4] hover:underline transition-all duration-200">
                                info@nexuxgh.com
                            </a>
                        </div>
                        <div>
                            <span className="text-[#08172D]/40 block font-semibold uppercase tracking-wider text-[10px] mb-1">Phone</span>
                            <a href="tel:+233502713141" className="text-[#08172D]/80 hover:text-[#15D4C4] hover:underline transition-all duration-200">
                                +233 502 713 141
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Services Links */}
                    <div className="md:col-span-3">
                        <span className="text-xs lg:text-sm font-bold tracking-tight block mb-4 text-[#08172D]">Services</span>
                        <ul className="space-y-3">
                            {SERVICES.map((s) => (
                                <li key={s.name}>
                                    <Link to={s.path} className="group inline-flex items-center gap-1.5 text-xs lg:text-sm text-[#08172D]/60 hover:text-[#08172D] transition-colors duration-200">
                                        <span>{s.name}</span>
                                        <span className="text-[#08172D]/30 group-hover:text-[#15D4C4] transition-colors text-[10px] transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-200">
                                            &#8599;
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Company Links */}
                    <div className="md:col-span-2">
                        <span className="text-xs lg:text-sm font-bold tracking-tight block mb-4 text-[#08172D]">Company</span>
                        <ul className="space-y-3">
                            {COMPANY.map((c) => (
                                <li key={c.name}>
                                    <Link to={c.path} className="group inline-flex items-center gap-1.5 text-xs lg:text-sm text-[#08172D]/60 hover:text-[#08172D] transition-colors duration-200">
                                        <span>{c.name}</span>
                                        <span className="text-[#08172D]/30 group-hover:text-[#15D4C4] transition-colors text-[10px] transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-200">
                                            &#8599;
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Vertical Divider for Desktop */}
                    <div className="hidden md:block md:col-span-1 h-full w-px bg-[#08172D]/10 self-stretch justify-self-center" />

                    {/* Column 4: CTA & Socials Block */}
                    <div className="md:col-span-3 space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-[#08172D] leading-tight">
                                Every brand deserves a system that grows with it.
                            </h3>
                            <p className="text-xs text-[#08172D]/60 leading-relaxed">
                                Strategy, design and technology, connected and working together to drive real business growth.
                            </p>
                        </div>

                        <Link
                            to="/contact"
                            className="inline-block bg-[#08172D] text-[#15D4C4] font-semibold text-xs px-6 py-2.5 rounded-full hover:bg-[#08172D]/90 transition-colors duration-200 shadow-sm"
                        >
                            Book Demo
                        </Link>

                        {/* Social Icons Row */}
                        <div className="flex items-center gap-5 pt-4 border-t border-[#08172D]/10">
                            {/* X / Twitter */}
                            {/* <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-[#08172D]/70 hover:text-[#15D4C4] transition-colors">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                                </svg>
                            </a> */}

                            {/* YouTube */}
                            {/* <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-[#08172D]/70 hover:text-[#15D4C4] transition-colors">
                                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19c1.71.46 8.59.46 8.59.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" className="fill-current stroke-none"></polygon>
                                </svg>
                            </a> */}

                            {/* Instagram */}
                            <a href="https://instagram.com/nexuxgh" target="_blank" rel="noreferrer" className="text-[#08172D]/70 hover:text-[#15D4C4] transition-colors">
                                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>

                            {/* LinkedIn */}
                            <a href="https://www.linkedin.com/company/nexux-martech/" target="_blank" rel="noreferrer" className="text-[#08172D]/70 hover:text-[#15D4C4] transition-colors">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                                </svg>
                            </a>

                            {/* Facebook */}
                            <a href="https://web.facebook.com/profile.php?id=61565329845637" target="_blank" rel="noreferrer" className="text-[#08172D]/70 hover:text-[#15D4C4] transition-colors">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Metadata Bar */}
                <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#08172D]/40 font-medium">
                    <p>Copyright & Legal . Copyright © {new Date().getFullYear()}</p>
                </div>

                {/* Massive Brand Watermark Anchor Text */}
                <div className="relative w-full select-none pointer-events-none">
                    <h1 className="text-[14vw] md:text-[16vw] font-black tracking-tighter leading-none text-center transform translate-y-[15%]">
                        <span className="text-[#08172D]">Nex</span><span className="text-[#00BFA6]">ux</span>
                    </h1>
                </div>
            </div>
        </footer>
    );
}