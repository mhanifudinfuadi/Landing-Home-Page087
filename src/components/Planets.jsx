import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, X } from "lucide-react";
import { PLANETS } from "@/data/planets";
import { useMissions } from "@/context/MissionContext";
import { Reveal } from "@/components/Reveal";

export const PlanetOrb = ({ grad, size = 56 }) => (
    <span
        className="inline-block shrink-0 rounded-full"
        style={{
            width: size,
            height: size,
            background: `radial-gradient(circle at 32% 30%, ${grad[0]}, ${grad[1]} 68%, #080B19 120%)`,
            boxShadow: `0 0 ${size / 2}px ${grad[1]}55, inset -${size / 6}px -${size / 6}px ${size / 3}px rgba(3,5,12,0.55)`,
        }}
        aria-hidden="true"
    />
);

const typeLabel = (p) =>
    p.kind === "stifin" ? `Jiwa · ${p.type}` : p.kind === "dimension" ? `Penjaga · ${p.type}` : "Rahasia · 冥王星";

const PlanetCard = ({ planet, onOpen, delay }) => {
    const isBig = planet.big;
    const isBonus = planet.kind === "bonus";
    return (
        <button
            onClick={() => onOpen(planet.id)}
            data-testid={`planet-card-${planet.id}`}
            className={`group glass-card relative overflow-hidden rounded-3xl p-6 text-left transition-all duration-300 hover:-translate-y-[5px] hover:border-[#BCAEFF]/40 hover:shadow-[0_18px_50px_rgba(130,119,217,0.18)] active:translate-y-px active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#BCAEFF] outline-none ${
                isBig ? "col-span-12 sm:col-span-6" : "col-span-12 sm:col-span-6 lg:col-span-4"
            } ${isBonus ? "lg:col-span-12 border-dashed !border-white/20 flex items-center gap-6" : ""} ${
                planet.star ? "!border-[#BCAEFF]/30 shadow-[0_0_50px_rgba(188,174,255,0.16)]" : ""
            }`}
        >
            {planet.star && (
                <span className="absolute top-5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full border border-[#BCAEFF]/40 bg-[#BCAEFF]/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[#BCAEFF]" data-testid={`star-badge-${planet.id}`}>
                    <Star className="h-3 w-3 fill-current" />
                    Bintang Utama
                </span>
            )}
            <span className="absolute top-5 right-6 font-display text-2xl sm:text-3xl font-800 text-white/12 transition-colors duration-500 group-hover:text-white/25" aria-hidden="true">
                {planet.jp}
            </span>
            <div className={isBonus ? "contents" : "flex h-full flex-col"}>
                <PlanetOrb grad={planet.grad} size={isBig ? 84 : 60} />
                <div className={`${planet.star ? "mt-10" : "mt-5"} flex-1`}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-300">{typeLabel(planet)}</p>
                    <h3 className={`mt-2 font-display font-800 tracking-tight text-slate-100 ${isBig ? "text-2xl sm:text-3xl" : "text-xl"}`}>
                        {planet.name}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] text-slate-500">{planet.identity}</p>
                    {isBig && <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">{planet.narrative}</p>}
                </div>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#BCAEFF] opacity-70 transition-opacity group-hover:opacity-100">
                    Dengar Kisahnya
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
            </div>
        </button>
    );
};

const PlanetModal = ({ planet, onClose, onNext }) => {
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[#03050C]/80 backdrop-blur-md p-5"
            onClick={onClose}
            data-testid="planet-modal"
        >
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-lg rounded-3xl border border-white/12 bg-[#10162B]/95 p-8 shadow-[0_0_80px_rgba(130,119,217,0.25)]"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Tutup"
                    data-testid="planet-modal-close"
                    className="absolute top-5 right-5 rounded-full border border-white/10 p-2 text-slate-400 transition-colors hover:text-white hover:border-white/30 outline-none focus-visible:ring-2 focus-visible:ring-[#BCAEFF]"
                >
                    <X className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-6">
                    <PlanetOrb grad={planet.grad} size={92} />
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-300">{typeLabel(planet)}</p>
                        <h3 className="mt-1.5 font-display text-2xl sm:text-3xl font-800 text-slate-100">
                            {planet.name} <span className="text-white/30 text-xl">{planet.jp}</span>
                        </h3>
                        <p className="mt-1 font-mono text-[11px] text-[#BCAEFF]">{planet.identity}</p>
                    </div>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-slate-300">{planet.narrative}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                    {planet.chips.map((c) => (
                        <span key={c} className="rounded-full border border-[#BCAEFF]/25 bg-[#BCAEFF]/8 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#BCAEFF]">
                            {c}
                        </span>
                    ))}
                </div>
                <blockquote className="mt-6 border-l-2 border-cyan-300/50 pl-4 text-sm italic text-slate-400">
                    “{planet.quote}”
                </blockquote>
                <div className="mt-7 flex gap-3">
                    <button
                        onClick={onNext}
                        data-testid="planet-modal-next"
                        className="flex-1 rounded-full bg-gradient-to-r from-[#BCAEFF] to-[#8EDCF4] py-3 font-display text-xs font-700 uppercase tracking-[0.16em] text-slate-950 transition-all duration-300 hover:shadow-[0_0_28px_rgba(188,174,255,0.45)]"
                    >
                        Kisah Berikutnya
                    </button>
                    <button
                        onClick={onClose}
                        data-testid="planet-modal-close-btn"
                        className="rounded-full border border-white/15 px-6 py-3 font-display text-xs font-700 uppercase tracking-[0.16em] text-slate-300 transition-colors hover:border-white/40 hover:text-white"
                    >
                        Tutup
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default function Planets() {
    const { visitPlanet } = useMissions();
    const [openId, setOpenId] = useState(null);
    const openPlanet = PLANETS.find((p) => p.id === openId);

    const open = (id) => {
        setOpenId(id);
        visitPlanet(id);
    };
    const next = () => {
        const i = PLANETS.findIndex((p) => p.id === openId);
        const nxt = PLANETS[(i + 1) % PLANETS.length];
        open(nxt.id);
    };

    return (
        <section id="planets" className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-28">
            <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-300">01 — Sembilan Cahaya 惑星</p>
                <h2 className="mt-4 max-w-2xl font-display text-2xl sm:text-3xl lg:text-4xl font-800 tracking-tight text-slate-100">
                    Setiap planet adalah <span className="aurora-text">cara jiwa mencintai dunia.</span>
                </h2>
                <p className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-slate-400">
                    Klik cahaya mana pun untuk mendengar kisahnya. Mars dan Venus menunggumu paling depan — dua bintang utama langit ini.
                </p>
                <p className="mt-3 inline-block rounded-lg border border-[#E8C68E]/25 bg-[#E8C68E]/8 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#E8C68E]">
                    Kisah-kisah ini puisi, bukan diagnosis — cermin untuk berkaca, bukan kotak untuk membatasi.
                </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-12 gap-5 md:gap-6">
                {PLANETS.map((p, i) => (
                    <PlanetCard key={p.id} planet={p} onOpen={open} delay={i * 0.06} />
                ))}
            </div>

            <AnimatePresence>
                {openPlanet && <PlanetModal planet={openPlanet} onClose={() => setOpenId(null)} onNext={next} />}
            </AnimatePresence>
        </section>
    );
}
