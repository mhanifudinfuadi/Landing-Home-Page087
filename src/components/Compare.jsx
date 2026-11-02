import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { STIFIN_PLANETS, GIFTS } from "@/data/planets";
import { PlanetOrb } from "@/components/Planets";
import { Reveal } from "@/components/Reveal";

const Select = ({ value, onChange, testid, accent }) => (
    <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid={testid}
        aria-label="Pilih planet"
        className={`liquid-border w-full appearance-none rounded-xl border border-white/12 bg-[#10162B] px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-slate-200 outline-none transition-colors focus:border-[#BCAEFF]/60 cursor-pointer ${accent}`}
    >
        {STIFIN_PLANETS.map((p) => (
            <option key={p.id} value={p.id}>
                {p.name} — {p.type}
            </option>
        ))}
    </select>
);

export default function Compare() {
    const [aId, setAId] = useState("venus");
    const [bId, setBId] = useState("mars");

    const a = STIFIN_PLANETS.find((p) => p.id === aId);
    const b = STIFIN_PLANETS.find((p) => p.id === bId);

    const Column = ({ p }) => (
        <div className="glass-card flex-1 rounded-3xl p-6" data-testid={`compare-col-${p.id}`}>
            <div className="flex items-center gap-4">
                <PlanetOrb grad={p.grad} size={52} />
                <div>
                    <h3 className="font-display text-xl font-800 text-slate-100">{p.name} <span className="text-white/25 text-base">{p.jp}</span></h3>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300">Jiwa · {p.type} · {p.identity}</p>
                </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
                {p.chips.map((c) => (
                    <span key={c} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-300">
                        {c}
                    </span>
                ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-400">{p.pattern}</p>
            <blockquote className="mt-4 border-l-2 border-cyan-300/40 pl-4 text-xs italic text-slate-500">“{p.quote}”</blockquote>
        </div>
    );

    return (
        <section id="bandingkan" className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 py-24 sm:py-28">
            <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-300">04 — Dua Orbit 比較</p>
                <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-800 tracking-tight text-slate-100">
                    Dua orbit tak pernah bertabrakan — <span className="aurora-text">mereka saling menunggu.</span>
                </h2>
                <p className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-slate-400">
                    Tidak ada cahaya yang lebih tinggi. Hanya cara mencintai yang berbeda, saling menggenapkan.
                </p>
            </Reveal>

            <Reveal delay={0.1}>
                <div className="glass-card mt-10 rounded-3xl p-6 sm:p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-4">
                        <Select value={aId} onChange={setAId} testid="compare-select-a" accent="" />
                        <ArrowLeftRight className="mx-auto h-5 w-5 text-[#BCAEFF]" />
                        <Select value={bId} onChange={setBId} testid="compare-select-b" accent="" />
                    </div>
                    <div className="mt-7 flex flex-col md:flex-row gap-5">
                        <Column p={a} />
                        <Column p={b} />
                    </div>
                    <div className="mt-6 rounded-2xl border border-[#BCAEFF]/20 bg-[#BCAEFF]/6 p-6" data-testid="compare-complement">
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-300">Cara mereka saling menggenapkan</p>
                        <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300">
                            {a.name} membawa {GIFTS[a.id].gift}; {b.name} membawa {GIFTS[b.id].gift}.
                            Saat keduanya berbagi langit, satu melihat lewat {GIFTS[a.id].lensa},
                            satu lagi lewat {GIFTS[b.id].lensa} — dan cinta menjadi utuh.
                        </p>
                    </div>
                </div>
            </Reveal>
        </section>
    );
}
