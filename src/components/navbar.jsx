import { useState, useEffect } from "react";
import logo from "../assets/images/logo.jpeg"

const LINKS = [
    { name: "Home", path: "/" },
    { name: "Services", path: "#services" },
    { name: "About", path: "#about" },
    { name: "Work", path: "#work" },
    { name: "Contact", path: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-[#0B1F3A]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/5"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo */}
                <a href="#" className="flex items-center gap-2">
                    <img
                        src={logo}
                        alt="Nexux"
                        className="h-9 w-9 object-contain rounded-full ring-1 ring-white/10"
                        style={{ mixBlendMode: "screen" }}
                    />
                </a>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {LINKS.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            className="text-sm text-white/60 hover:text-white transition-colors duration-200 font-medium"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <a
                    href="#contact"
                    className="hidden md:inline-flex items-center gap-2 bg-[#00BFA6] hover:bg-[#00a892] text-[#0B1F3A] text-sm font-bold px-5 py-2.5 rounded-lg transition-colors duration-200"
                >
                    Start a Project
                </a>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer bg-transparent border-none"
                    aria-label="Toggle menu"
                >
                    <span
                        className={`block w-5 h-0.5 bg-white rounded transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""
                            }`}
                    />
                    <span
                        className={`block w-5 h-0.5 bg-white rounded transition-all duration-300 ${open ? "opacity-0" : ""
                            }`}
                    />
                    <span
                        className={`block w-5 h-0.5 bg-white rounded transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""
                            }`}
                    />
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden bg-[#0B1F3A] border-t border-white/5 px-6 py-6 flex flex-col gap-5">
                    {LINKS.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            onClick={() => setOpen(false)}
                            className="text-white/70 hover:text-white text-base font-medium transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center justify-center bg-[#00BFA6] text-[#0B1F3A] text-sm font-bold px-5 py-3 rounded-lg mt-2"
                    >
                        Start a Project
                    </a>
                </div>
            )}
        </header>
    );
}