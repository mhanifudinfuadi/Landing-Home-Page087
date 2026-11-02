import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { QUESTIONS, OPTION_MAP, DIMENSION_LABELS } from "@/data/quiz";
import { PLANETS, TYPE_TO_PLANET, PERSPECTIVES } from "@/data/planets";
import { PlanetOrb } from "@/components/Planets";
import { useMissions } from "@/context/MissionContext";
import { Reveal } from "@/components/Reveal";

const LETTERS = ["A", "B", "C", "D", "E"];

const ResultPanel = ({ answers, onReset }) => {
    const counts = useMemo(() => {
        const c = { T: 0, F: 0, S: 0, N: 0, I: 0 };
        answers.forEach((a) => c[a]++);
        return c;
    }, [answers]);

    const sorted = useMemo(() => Object.entries(counts).sort((a, b) => b[1] - a[1]), [counts]);
    const topType = sorted[0][0];
    const overlap = sorted[0][1] - sorted[1][1] <= 1;
    const planet = PLANETS.find((p) => p.id === TYPE_TO_PLANET[topType]);

    const copySummary = () => {
        const text = `Planetku: ${planet.name} (${planet.type}) — ${planet.identity}. "${planet.quote}" Cahayaku: ${planet.strengths.join(", ")}.`;
        navigator.clipboard.writeText(text);
        toast.success("Kisahmu tersalin — siap dibagikan");
    };

    const viewProfile = () => {
        document.getElementById("planets")?.scrollIntoView({ behavior: "smooth" });
        toast.info(`Temukan kartu ${planet.name} dan dengarkan kisahnya`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card mt-10 overflow-hidden rounded-3xl p-8 sm:p-10"
            data-testid="quiz-result"
        >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <PlanetOrb grad={planet.grad} size={96} />
                <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-cyan-300">Planetmu</p>
                    <h3 className="mt-2 font-display text-3xl sm:text-4xl font-800 text-slate-100">
                        {planet.name} <span className="text-white/30 text-2xl">{planet.jp}</span>
                    </h3>
                    <p className="mt-1 font-mono text-xs text-[#BCAEFF]">Jiwa · {planet.type} — {planet.identity}</p>
                </div>
            </div>

            {overlap && (
                <p className="mt-6 rounded-xl border border-[#E8C68E]/25 bg-[#E8C68E]/8 px-4 py-3 font-mono text-[11px] leading-relaxed text-[#E8C68E]" data-testid="quiz-overlap-note">
                    Catatan: dua cahaya di dadamu hampir sama terang — wajar, jiwa jarang hanya satu orbit.
                </p>
            )}

            <p className="mt-6 text-sm sm:text-base leading-relaxed text-slate-300">{planet.narrative}</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300">Cahayamu</p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-300">
                        {planet.strengths.map((s) => <li key={s}>· {s}</li>)}
                    </ul>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300">Caramu Mencintai</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{planet.pattern}</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300">Perjalananmu</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{planet.growth}</p>
                </div>
            </div>

            <div className="mt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300">Grafik Lima Dimensi</p>
                <div className="mt-4 space-y-3" data-testid="quiz-chart">
                    {Object.entries(DIMENSION_LABELS).map(([k, label]) => (
                        <div key={k} className="flex items-center gap-4">
                            <span className={`w-24 font-mono text-[10px] uppercase tracking-[0.16em] ${k === topType ? "text-slate-100" : "text-slate-500"}`}>{label}</span>
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/8">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(counts[k] / QUESTIONS.length) * 100}%` }}
                                    transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                    className={`h-full rounded-full ${k === topType ? "bg-gradient-to-r from-[#8EDCF4] to-[#BCAEFF]" : "bg-[#8277D9]/50"}`}
                                />
                            </div>
                            <span className="w-8 text-right font-mono text-[11px] text-slate-400">{counts[k]}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8 space-y-3 border-t border-white/8 pt-6">
                {PERSPECTIVES.map((p) => (
                    <p key={p.planet} className="text-xs leading-relaxed text-slate-500">
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#BCAEFF]">{p.planet} · </span>
                        {p.text}
                    </p>
                ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button onClick={onReset} data-testid="quiz-retry-button" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-display text-xs font-700 uppercase tracking-[0.16em] text-slate-300 transition-colors hover:border-white/40 hover:text-white">
                    <RotateCcw className="h-4 w-4" /> Ulangi Perjalanan
                </button>
                <button onClick={viewProfile} data-testid="quiz-profile-button" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#BCAEFF]/40 bg-[#BCAEFF]/10 px-6 py-3.5 font-display text-xs font-700 uppercase tracking-[0.16em] text-[#BCAEFF] transition-all hover:bg-[#BCAEFF] hover:text-slate-950">
                    <Sparkles className="h-4 w-4" /> Lihat Planetmu
                </button>
                <button onClick={copySummary} data-testid="quiz-copy-button" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#BCAEFF] to-[#8EDCF4] px-6 py-3.5 font-display text-xs font-700 uppercase tracking-[0.16em] text-slate-950 transition-all hover:shadow-[0_0_28px_rgba(188,174,255,0.45)]">
                    <Copy className="h-4 w-4" /> Abadikan Kisah
                </button>
            </div>
        </motion.div>
    );
};

export default function Quiz() {
    const { setQuizResult } = useMissions();
    const [answers, setAnswers] = useState([]);
    const step = answers.length;
    const done = step >= QUESTIONS.length;

    const pick = (letter) => {
        const type = OPTION_MAP[LETTERS.indexOf(letter)];
        const next = [...answers, type];
        setAnswers(next);
        if (next.length === QUESTIONS.length) {
            setQuizResult({ top: type });
            toast.success("Planetmu ditemukan — misi kedua tuntas!");
        }
    };

    const reset = () => {
        setAnswers([]);
        setQuizResult(null);
    };

    const current = QUESTIONS[step];

    return (
        <section id="kuis" className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8 py-24 sm:py-28">
            <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-300">03 — Temukan Planetmu 発見</p>
                <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-800 tracking-tight text-slate-100">
                    Lima belas pertanyaan, <br /><span className="aurora-text">satu jawaban di dadamu.</span>
                </h2>
                <p className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-slate-400">
                    Jawablah dengan jujur — bukan yang paling baik, melainkan yang paling kamu.
                    Tidak ada jawaban yang salah di langit ini.
                </p>
            </Reveal>

            {!done ? (
                <div className="glass-card mt-10 rounded-3xl p-7 sm:p-9" data-testid="quiz-panel">
                    <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400" data-testid="quiz-progress">
                            Pertanyaan {step + 1} / {QUESTIONS.length}
                        </span>
                        <div className="h-1.5 w-36 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full rounded-full bg-gradient-to-r from-[#8EDCF4] to-[#BCAEFF] transition-all duration-500" style={{ width: `${(step / QUESTIONS.length) * 100}%` }} />
                        </div>
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -24 }}
                            transition={{ duration: 0.35 }}
                        >
                            <h3 className="mt-7 font-display text-lg sm:text-2xl font-700 leading-snug text-slate-100">{current.q}</h3>
                            <div className="mt-7 space-y-3">
                                {current.o.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => pick(LETTERS[i])}
                                        data-testid={`quiz-option-${LETTERS[i].toLowerCase()}`}
                                        className="liquid-border group flex w-full items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-4 text-left transition-all duration-300 hover:border-[#BCAEFF]/50 hover:bg-[#BCAEFF]/8 hover:-translate-y-0.5 active:scale-[0.99] outline-none focus-visible:ring-2 focus-visible:ring-[#BCAEFF]"
                                    >
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#172344] to-[#10162B] font-mono text-xs text-[#BCAEFF] transition-colors group-hover:from-[#BCAEFF] group-hover:to-[#8EDCF4] group-hover:text-slate-950">
                                            {LETTERS[i]}
                                        </span>
                                        <span className="text-sm sm:text-base text-slate-300 group-hover:text-slate-100">{opt}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            ) : (
                <ResultPanel answers={answers} onReset={reset} />
            )}

            <p className="mt-6 font-mono text-[10px] leading-relaxed tracking-wide text-slate-600">
                Ini cermin puisi, bukan vonis — kamu selalu lebih luas dari jawaban mana pun.
            </p>
        </section>
    );
}
