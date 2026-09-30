import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";

const LINKS = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/work", label: "Work" },
    { to: "/insight", label: "Insights" },
];

/**
 * <Navbar transparent />  → see-through over a hero image, white after scrolling
 * <Navbar />              → always white (use on pages without a dark hero)
 */
export default function Navbar({ transparent = false }) {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // lock page scroll while the mobile menu is open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const solid = !transparent || scrolled || open;

    const linkClass = ({ isActive }) =>
        [
            "relative text-sm font-medium transition-colors duration-300 py-1",
            "after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:bg-[#00BFA6] after:transition-all after:duration-300",
            isActive ? "after:w-full" : "after:w-0 hover:after:w-full",
            solid
                ? isActive ? "text-[#0B1F3A]" : "text-[#0B1F3A]/60 hover:text-[#0B1F3A]"
                : isActive ? "text-white" : "text-white/75 hover:text-white",
        ].join(" ");

    return (
        <header
            className={[
                "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
                solid
                    ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(11,31,58,.08),0_8px_30px_rgba(11,31,58,.06)]"
                    : "bg-transparent",
            ].join(" ")}
        >
            <nav className={`max-w-6xl mx-auto px-6 flex items-center justify-between transition-all duration-500 ${solid ? "h-20" : "h-24 md:h-28"}`}>
                <Link to="/" onClick={() => setOpen(false)} className="shrink-0">
                    {/* white version over the hero, original colours once solid */}
                    <img
                        src={logo}
                        alt="Nexux"
                        className={`w-auto max-w-[320px] md:max-w-[420px] object-contain object-left transition-all duration-500 ${solid ? "h-16 md:h-20" : "h-20 md:h-28 brightness-0 invert"
                            }`}
                    />
                </Link>

                {/* Desktop links */}
                <ul className="hidden md:flex items-center gap-8">
                    {LINKS.map(({ to, label }) => (
                        <li key={to}>
                            <NavLink to={to} end={to === "/"} className={linkClass}>{label}</NavLink>
                        </li>
                    ))}
                </ul>

                <Link
                    to="/contact"
                    className="hidden md:inline-flex bg-[#00BFA6] hover:bg-[#00a892] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors duration-200"
                >
                    Start a project
                </Link>

                {/* Mobile toggle */}
                <button
                    type="button"
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    onClick={() => setOpen((o) => !o)}
                    className="md:hidden relative w-10 h-10 -mr-2 flex items-center justify-center"
                >
                    <span className={`absolute h-[2px] w-6 rounded transition-all duration-300 ${solid ? "bg-[#0B1F3A]" : "bg-white"} ${open ? "rotate-45" : "-translate-y-[5px]"}`} />
                    <span className={`absolute h-[2px] w-6 rounded transition-all duration-300 ${solid ? "bg-[#0B1F3A]" : "bg-white"} ${open ? "-rotate-45" : "translate-y-[5px]"}`} />
                </button>
            </nav>

            {/* Mobile menu */}
            <div
                className={`md:hidden overflow-hidden bg-white transition-[max-height,opacity] duration-500 ease-out ${open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"}`}
            >
                <ul className="px-6 pb-6 pt-2 flex flex-col">
                    {LINKS.map(({ to, label }) => (
                        <li key={to} className="border-b border-[#0B1F3A]/[.06]">
                            <NavLink
                                to={to}
                                end={to === "/"}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `block py-4 text-lg font-semibold ${isActive ? "text-[#00BFA6]" : "text-[#0B1F3A]"}`
                                }
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                    <li className="pt-5">
                        <Link
                            to="/contact"
                            onClick={() => setOpen(false)}
                            className="block text-center bg-[#00BFA6] text-white font-semibold py-4 rounded-lg"
                        >
                            Start a project
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}