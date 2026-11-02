import { useEffect, useRef, useState } from "react";
import { Globe, ListChecks, Rocket, Scale, ScanLine } from "lucide-react";
import { motion } from "framer-motion";
import { useMissions } from "@/context/MissionContext";

export const Logo = ({ size = 34 }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" data-testid="nav-brand-logo" aria-label="MADU Archive">
        <defs>
            <linearGradient id="lg-brand" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#8EDCF4" />
                <stop offset="0.55" stopColor="#8277D9" />
                <stop offset="1" stopColor="#BCAEFF" />
            </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="13" fill="url(#lg-brand)" />
        <ellipse cx="32" cy="32" rx="24" ry="7.5" fill="none" stroke="#8EDCF4" strokeWidth="2.4" transform="rotate(-18 32 32)" opacity="0.9" />
        <circle cx="52" cy="14" r="2.4" fill="#F4F5FF" />
    </svg>
);

const TILES = [
    { id: "planets", label: "Planet", icon: Globe, testid: "dock-planets" },
    { id: "scanner", label: "Scanner", icon: ScanLine, testid: "dock-scanner" },
    { id: "kuis", label: "Kuis", icon: ListChecks, testid: "dock-kuis" },
    { id: "bandingkan", label: "Bandingkan", icon: Scale, testid: "dock-bandingkan" },
    { id: "destinasi", label: "Destinasi MADU", icon: Rocket, testid: "dock-destinasi" },
];

export default function DockNav() {
    const { doneCount } = useMissions();
    const [scrolled, setScrolled] = useState(false);
    const [mouseX, setMouseX] = useState(null);
    const [hovered, setHovered] = useState(null);
    const [active, setActive] = useState("planets");
    const centers = useRef([]);
    const tileRefs = useRef([]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const measure = () => {
            centers.current = tileRefs.current.map((el) => {
                if (!el) return 0;
                const r = el.getBoundingClientRect();
                return r.left + r.width / 2;
            });
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: "-40% 0px -55% 0px" },
        );
        TILES.forEach((t) => {
            const el = document.getElementById(t.id);
            if (el) obs.observe(el);
        });
        return () => obs.disconnect();
    }, []);

    return (
        <motion.header
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={`liquid-header fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 ${
                scrolled ? "bg-slate-950/80 border-white/10" : "bg-slate-950/40 border-white/5"
            }`}
        >
            <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 py-3.5">
                <a href="#hero" className="flex shrink-0 items-center gap-3 group" data-testid="nav-home-link">
                    <span className="transition-transform duration-500 group-hover:rotate-[18deg]">
                        <Logo />
                    </span>
                    <span className="hidden sm:block font-display text-sm sm:text-base font-800 tracking-[0.18em] text-slate-100">
                        MADU<span className="text-cyan-300">·記録</span>
                    </span>
                </a>

                <div
                    className="relative flex items-end gap-1.5 sm:gap-2.5"
                    onMouseMove={(e) => setMouseX(e.clientX)}
                    onMouseLeave={() => { setMouseX(null); setHovered(null); }}
                    data-testid="dock-nav"
                >
                    {TILES.map((t, i) => {
                        const c = centers.current[i] || 0;
                        const g = mouseX == null ? 0 : Math.exp(-((mouseX - c) ** 2) / (2 * 55 * 55));
                        const Icon = t.icon;
                        return (
                            <a
                                key={t.id}
                                href={`#${t.id}`}
                                ref={(el) => (tileRefs.current[i] = el)}
                                aria-label={t.label}
                                data-testid={t.testid}
                                onMouseEnter={() => setHovered(t.label)}
                                onFocus={() => setHovered(t.label)}
                                onBlur={() => setHovered(null)}
                                className="relative flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-[#172344] to-[#10162B] text-[#BCAEFF] outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[#BCAEFF] hover:border-[#BCAEFF]/50"
                                style={{
                                    transform: `translateY(${-12 * g}px) scale(${1 + 0.35 * g})`,
                                    transition: mouseX == null ? "transform 0.45s cubic-bezier(.34,1.56,.64,1)" : "transform 0.12s ease-out",
                                    boxShadow: g > 0.5 ? "0 0 24px rgba(188,174,255,0.35)" : undefined,
                                }}
                            >
                                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span
                                    className={`absolute -bottom-1.5 h-1 w-1 rounded-full transition-opacity duration-300 ${
                                        active === t.id ? "bg-cyan-300 opacity-100" : "opacity-0"
                                    }`}
                                />
                            </a>
                        );
                    })}
                    <span
                        className={`pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full glass-card px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#BCAEFF] transition-opacity duration-200 ${
                            hovered ? "opacity-100" : "opacity-0"
                        }`}
                        data-testid="dock-tooltip"
                    >
                        {hovered || " "}
                    </span>
                </div>

                <a
                    href="#destinasi"
                    data-testid="mission-pill"
                    className="shrink-0 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-400/10 px-4 py-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-cyan-200 transition-all duration-300 hover:bg-cyan-300 hover:text-slate-950"
                >
                    <span className={`h-1.5 w-1.5 rounded-full ${doneCount === 3 ? "bg-emerald-400 pulse-dot" : "bg-cyan-300"}`} />
                    Misi {doneCount}/3
                </a>
            </nav>
        </motion.header>
    );
}
