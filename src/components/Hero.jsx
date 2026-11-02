import { motion } from "framer-motion";
import { ArrowDown, Heart, Sparkles } from "lucide-react";

const LINES = [
    { text: "EVERY HEART HAS AN ORBIT.", cls: "text-slate-100" },
    { text: "EVERY SOUL HAS A LIGHT.", cls: "aurora-text" },
    { text: "DISCOVER WHO YOU ARE.", cls: "text-slate-100" },
];

export default function Hero() {
    return (
        <section id="hero" data-testid="hero-section" className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 sm:px-8 pt-28 pb-20">
            <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="mb-8 inline-flex items-center gap-2.5 rounded-full glass-card px-4 py-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-cyan-300"
                data-testid="hero-badge"
            >
                <Heart className="h-3.5 w-3.5" />
                Dua Bintang · Satu Langit — Eksplorasi Diri
            </motion.div>

            <h1 className="text-center font-display font-extrabold leading-[1.02] tracking-tight text-3xl sm:text-5xl lg:text-6xl max-w-5xl">
                {LINES.map((line, i) => (
                    <span key={line.text} className="block overflow-hidden pb-1">
                        <motion.span
                            className={`block ${line.cls}`}
                            initial={{ y: "115%" }}
                            animate={{ y: "0%" }}
                            transition={{ duration: 1.05, delay: 0.45 + i * 0.16, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {line.text}
                        </motion.span>
                    </span>
                ))}
            </h1>

            <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.15 }}
                className="mt-8 max-w-2xl text-center text-sm sm:text-base leading-relaxed text-slate-400"
            >
                Di antara sembilan cahaya ini ada satu yang berdenyut dengan ritmemu. Mars dan Venus —
                sang pejuang dan sang kekasih — akan menunjukkan jalan.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.35 }}
                className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            >
                <a
                    href="#planets"
                    data-testid="hero-explore-button"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#BCAEFF] to-[#8EDCF4] px-8 py-4 font-display text-xs sm:text-sm font-600 uppercase tracking-[0.14em] text-slate-950 transition-all duration-300 hover:shadow-[0_0_44px_rgba(188,174,255,0.5)] hover:-translate-y-0.5"
                >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    Mulai Perjalanan
                    <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                </a>
                <a
                    href="#kuis"
                    data-testid="hero-quiz-button"
                    className="inline-flex items-center gap-3 rounded-full glass-card px-8 py-4 font-display text-xs sm:text-sm font-600 uppercase tracking-[0.14em] text-slate-200 transition-all duration-300 hover:border-[#BCAEFF]/60 hover:text-white hover:shadow-[0_0_32px_rgba(188,174,255,0.35)]"
                >
                    <Sparkles className="h-4 w-4 text-[#BCAEFF]" />
                    Temukan Planetmu
                </a>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 lg:block font-display text-lg tracking-[0.5em] text-slate-600"
                style={{ writingMode: "vertical-rl" }}
                aria-hidden="true"
            >
                内なる宇宙 — INNER UNIVERSE
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                data-testid="hero-scroll-indicator"
            >
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">Gulir ke bawah</span>
                <span className="relative h-10 w-px overflow-hidden bg-white/10">
                    <motion.span
                        className="absolute left-0 top-0 h-4 w-px bg-cyan-300"
                        animate={{ y: [-16, 44] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    />
                </span>
            </motion.div>
        </section>
    );
}
