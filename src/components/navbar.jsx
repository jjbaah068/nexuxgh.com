import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import logo from "../assets/images/logo.png";

const LINKS = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Work", path: "/work" },
    { name: "Contact", path: "/contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    const isActive = (path) =>
        path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-white/98 backdrop-blur-md shadow-sm shadow-black/5 border-b border-gray-100"
                    : "bg-white/95 backdrop-blur-sm"
            }`}
        >
            <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 shrink-0">
                    <img
                        src={logo}
                        alt="NexUX"
                        className="h-full w-full object-contain bg"
                        style={{ filter: "none", maxWidth: "160px" }}
                    />
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-1 ml-auto mr-6">
                    {LINKS.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setOpen(false)}
                            className={`relative text-sm px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                                isActive(link.path)
                                    ? "text-[#0B1F3A]"
                                    : "text-[#0B1F3A]/50 hover:text-[#0B1F3A]"
                            }`}
                        >
                            {link.name}
                            {isActive(link.path) && (
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[2.5px] rounded-full bg-[#00BFA6]" />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <Link
                    to="/contact"
                    className="hidden md:inline-flex items-center gap-2 bg-[#00BFA6] hover:bg-[#00a892] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors duration-200 shrink-0"
                >
                    Start a Project →
                </Link>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer bg-transparent border-none"
                    aria-label="Toggle menu"
                >
                    <span className={`block w-5 h-0.5 bg-[#0B1F3A] rounded transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
                    <span className={`block w-5 h-0.5 bg-[#0B1F3A] rounded transition-all duration-300 ${open ? "opacity-0" : ""}`} />
                    <span className={`block w-5 h-0.5 bg-[#0B1F3A] rounded transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-5">
                    {LINKS.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setOpen(false)}
                            className={`text-base font-medium transition-colors ${
                                isActive(link.path)
                                    ? "text-[#0B1F3A]"
                                    : "text-[#0B1F3A]/70 hover:text-[#0B1F3A]"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        to="/contact"
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center justify-center bg-[#00BFA6] text-white text-sm font-bold px-5 py-3 rounded-lg mt-2"
                    >
                        Start a Project →
                    </Link>
                </div>
            )}
        </header>
    );
}