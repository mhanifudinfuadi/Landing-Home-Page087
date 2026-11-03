import { ArrowUpRight, CheckCircle2, Lock } from "lucide-react";
import { toast } from "sonner";
import { useMissions } from "@/context/MissionContext";
import { Reveal } from "@/components/Reveal";

const CHANNELS = [
    { name: "MADU SPORT", jp: "スポーツ", url: "https://madusport087.vercel.app/", desc: "Dokumentasi olahraga & pertandingan.", testid: "channel-card-sport" },
    { name: "MADU LAYANAN", jp: "奉仕", url: "https://kegiatan-pelayanan-madu.vercel.app/", desc: "Kegiatan Pelayanan dan Penyuluhan.", testid: "channel-card-layanan" },
    { name: "MADU ACTIVITY", jp: "活動", url: "https://kegiatan-internal-kantor087.vercel.app/", desc: "Dokumentasi aktivitas & acara.", testid: "channel-card-activity" },
    { name: "MADU INFO", jp: "情報", url: "https://info-pelayanan087.vercel.app/", desc: "Informasi & pengumuman pelayanan terbaru.", testid: "channel-card-info" },
];

export default function MaduGate() {
    const { missions, gateOpen, doneCount } = useMissions();

    const lockedClick = () => {
        toast.error(`Pintunya masih tertutup — selesaikan ${3 - doneCount} perjalanan lagi.`);
        document.getElementById("planets")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section id="destinasi" className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-28">
            <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-300">05 — Gerbang Cahaya 目的地</p>
                <h2 className="mt-4 max-w-2xl font-display text-2xl sm:text-3xl lg:text-4xl font-800 tracking-tight text-slate-100">
                    Selesaikan tiga perjalanan, <span className="aurora-text">empat pintu terbuka.</span>
                </h2>
                <p className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-slate-400">
                    Cahaya menyambut jiwa yang tekun — selesaikan misimu, dan keempat kanal MADU akan menyala untukmu.
                </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
                <Reveal className="lg:col-span-4">
                    <div className="glass-card flex h-full flex-col gap-4 rounded-3xl p-7" data-testid="mission-list">
                        <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-slate-400 border-b border-white/8 pb-4">
                            Tiga Perjalanan — {doneCount}/3 selesai
                        </p>
                        {missions.map((m, i) => (
<div
                                key={m.id}
                                data-testid={`mission-row-${m.id}`}
                                onClick={() => {
                                    const targetId = m.id === "quiz" ? "kuis" : m.id;
                                    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className={`liquid-border flex items-center gap-4 rounded-2xl border px-5 py-4 transition-all duration-300 cursor-pointer ${
                                    m.done ? "border-emerald-400/30 bg-emerald-400/6" : "border-white/8 bg-white/[0.02]"
                                }`}
                            >
                                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-mono text-xs ${
                                    m.done ? "bg-emerald-400/15 text-emerald-300" : "bg-gradient-to-br from-[#172344] to-[#10162B] text-[#BCAEFF]"
                                }`}>
                                    {m.done ? <CheckCircle2 className="h-4 w-4" /> : `0${i + 1}`}
                                </span>
                                <div className="flex-1">
                                    <p className={`text-sm font-medium ${m.done ? "text-emerald-200" : "text-slate-200"}`}>{m.label}</p>
                                    <p className="font-mono text-[10px] text-slate-500">{m.progress}</p>
                                </div>
                                {!m.done && <Lock className="h-3.5 w-3.5 text-slate-600" />}
                            </div>
                        ))}
                        <div className={`mt-auto rounded-xl border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-500 ${
                            gateOpen ? "border-emerald-400/30 bg-emerald-400/8 text-emerald-300" : "border-white/8 text-slate-500"
                        }`} data-testid="gate-status">
                            {gateOpen ? "Gerbang menyala — selamat datang, penjelajah." : "Gerbang menunggu ketekunanmu"}
                        </div>
                    </div>
                </Reveal>

                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {CHANNELS.map((c, i) => {
                        const locked = !gateOpen;
                        const inner = (
                            <>
                                <span className="absolute top-5 right-6 font-display text-3xl font-800 text-white/12" aria-hidden="true">{c.jp}</span>
                                {locked && (
                                    <span className="absolute top-5 left-6 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-slate-950/70 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">
                                        <Lock className="h-3 w-3" /> Menunggu
                                    </span>
                                )}
                                <div className="mt-10">
                                    <h3 className="font-display text-xl sm:text-2xl font-800 tracking-tight text-pink-400">{c.name}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-blue-400">{c.desc}</p>
                                </div>
                                <span className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#BCAEFF]">
                                    {locked ? "Selesaikan misi" : "Masuk Kanal"}
                                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </span>
                            </>
                        );
                        const cls = `group glass-card relative h-full rounded-3xl p-6 text-left transition-all duration-300 ${
                            locked
                                ? "opacity-45 grayscale cursor-not-allowed"
                                : "hover:-translate-y-[5px] hover:border-[#BCAEFF]/40 hover:shadow-[0_18px_50px_rgba(130,119,217,0.18)]"
                        }`;
                        return (
                            <Reveal key={c.name} delay={0.08 + i * 0.06}>
                                {locked ? (
                                    <button onClick={lockedClick} data-testid={c.testid} className={`${cls} w-full`}>{inner}</button>
                                ) : (
                                    <a href={c.url} target="_blank" rel="noopener noreferrer" data-testid={c.testid} className={`${cls} block`}>{inner}</a>
                                )}
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
