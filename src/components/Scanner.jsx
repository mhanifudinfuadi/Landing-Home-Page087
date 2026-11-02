import { useEffect, useRef, useState } from "react";
import { Crosshair, Play, RotateCcw, Trophy } from "lucide-react";
import { toast } from "sonner";
import { PLANETS } from "@/data/planets";
import { PlanetOrb } from "@/components/Planets";
import { useMissions } from "@/context/MissionContext";
import { Reveal } from "@/components/Reveal";

const ORBIT_PLANETS = PLANETS.slice(0, 8);
const SPEEDS = [0, 0.25, 0.5, 1, 2, 4];
const ROUND_TIME = 7;
const TOTAL_ROUNDS = 8;
const WIN_TARGET = 5;

export default function Scanner() {
    const { scannerWin, setScannerWin } = useMissions();
    const [status, setStatus] = useState("idle");
    const [round, setRound] = useState(0);
    const [target, setTarget] = useState(null);
    const [targetsPool, setTargetsPool] = useState([]);
    const [scanned, setScanned] = useState([]);
    const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
    const [speedIdx, setSpeedIdx] = useState(3);
    const [hovered, setHovered] = useState(null);
    const [flash, setFlash] = useState(null);
    const angles = useRef(ORBIT_PLANETS.map(() => Math.random() * Math.PI * 2));
    const [, setTick] = useState(0);

    const speed = SPEEDS[speedIdx];

    useEffect(() => {
        if (speed === 0) return;
        let raf;
        let last = performance.now();
        const loop = (now) => {
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now;
            ORBIT_PLANETS.forEach((p, i) => {
                angles.current[i] += p.orbit.spd * speed * dt;
            });
            setTick((t) => t + 1);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
    }, [speed]);

    useEffect(() => {
        if (status !== "playing") return;
        const id = setInterval(() => {
            setTimeLeft((t) => {
                if (t <= 0.1) {
                    nextRound(targetsPool.filter((x) => x !== target), scanned);
                    return ROUND_TIME;
                }
                return +(t - 0.1).toFixed(1);
            });
        }, 100);
        return () => clearInterval(id);
    }, [status, target, targetsPool, scanned]);

    const nextRound = (pool, done) => {
        if (round + 1 >= TOTAL_ROUNDS || pool.length === 0) {
            setStatus("done");
            if (done.length >= WIN_TARGET) {
                setScannerWin(true);
                toast.success("Kamu menangkap cahayanya — misi ketiga selesai!");
            }
            return;
        }
        const next = pool[Math.floor(Math.random() * pool.length)];
        setTargetsPool(pool);
        setTarget(next);
        setRound((r) => r + 1);
        setTimeLeft(ROUND_TIME);
    };

    const start = () => {
        const pool = ORBIT_PLANETS.map((p) => p.id);
        setScanned([]);
        setRound(0);
        setStatus("playing");
        setFlash(null);
        const first = pool[Math.floor(Math.random() * pool.length)];
        setTargetsPool(pool);
        setTarget(first);
        setTimeLeft(ROUND_TIME);
    };

    const pick = (id) => {
        if (status !== "playing") return;
        if (id === target) {
            const done = [...scanned, id];
            setScanned(done);
            const p = PLANETS.find((x) => x.id === id);
            setFlash(p);
            nextRound(targetsPool.filter((x) => x !== id), done);
        } else {
            setTimeLeft((t) => Math.max(0.5, t - 1.5));
        }
    };

    const targetPlanet = PLANETS.find((p) => p.id === target);
    const won = status === "done" && scanned.length >= WIN_TARGET;

    const cx = 380, cy = 220;
    const positions = ORBIT_PLANETS.map((p, i) => {
        const a = angles.current[i];
        return { ...p, x: cx + p.orbit.rx * Math.cos(a), y: cy + p.orbit.rx * 0.44 * Math.sin(a) };
    });

    return (
        <section id="scanner" className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-28">
            <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-300">02 — Orbit Scanner 走査</p>
                <h2 className="mt-4 max-w-2xl font-display text-2xl sm:text-3xl lg:text-4xl font-800 tracking-tight text-slate-100">
                    Tangkap cahayanya <br /><span className="aurora-text">sebelum ia berlalu.</span>
                </h2>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
                <Reveal className="lg:col-span-8">
                    <div className="glass-card relative overflow-hidden rounded-3xl p-2 sm:p-4" data-testid="scanner-canvas">
                        <svg viewBox="0 0 760 440" className="w-full">
                            {ORBIT_PLANETS.map((p) => (
                                <ellipse key={p.id} cx={cx} cy={cy} rx={p.orbit.rx} ry={p.orbit.rx * 0.44} fill="none" stroke="rgba(190,198,255,0.12)" strokeWidth="1" />
                            ))}
                            <circle cx={cx} cy={cy} r="10" fill="url(#sun-g)" />
                            <defs>
                                <radialGradient id="sun-g">
                                    <stop offset="0" stopColor="#F4F5FF" />
                                    <stop offset="1" stopColor="#8277D9" />
                                </radialGradient>
                            </defs>
                            {positions.map((p) => (
                                <g key={p.id} onClick={() => pick(p.id)} onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)} style={{ cursor: status === "playing" ? "pointer" : "default" }} data-testid={`scanner-planet-${p.id}`}>
                                    <circle cx={p.x} cy={p.y} r={p.orbit.size + 10} fill="transparent" />
                                    <circle cx={p.x} cy={p.y} r={p.orbit.size} fill={p.grad[1]} stroke={p.grad[0]} strokeWidth="1" opacity={scanned.includes(p.id) ? 1 : 0.85} />
                                    {hovered === p.id && <circle cx={p.x} cy={p.y} r={p.orbit.size + 5} fill="none" stroke="#F4F5FF" strokeWidth="1.4" />}
                                    {status === "playing" && target === p.id && <circle cx={p.x} cy={p.y} r={p.orbit.size + 8} fill="none" stroke="#8EDCF4" strokeWidth="1" strokeDasharray="3 4" />}
                                    <text x={p.x} y={p.y - p.orbit.size - 9} textAnchor="middle" fill="#A6AEC9" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5">
                                        {p.name.toUpperCase()}
                                    </text>
                                </g>
                            ))}
                        </svg>
                        {status === "playing" && targetPlanet && (
                            <div className="absolute top-5 left-5 right-5 flex items-center justify-between gap-4 rounded-2xl glass-card px-5 py-3">
                                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-300" data-testid="scanner-target">
                                    Tangkap: <span className="text-slate-100">{targetPlanet.name} {targetPlanet.jp}</span>
                                </span>
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-[11px] text-slate-400" data-testid="scanner-round">Putaran {round + 1}/{TOTAL_ROUNDS}</span>
                                    <div className="h-1.5 w-28 overflow-hidden rounded-full bg-white/10">
                                        <div className="h-full rounded-full bg-gradient-to-r from-[#8EDCF4] to-[#BCAEFF] transition-all duration-100" style={{ width: `${(timeLeft / ROUND_TIME) * 100}%` }} />
                                    </div>
                                    <span className="font-mono text-[11px] text-slate-200 w-10 text-right" data-testid="scanner-timer">{timeLeft.toFixed(1)}s</span>
                                </div>
                            </div>
                        )}
                        {status !== "playing" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-[#03050C]/60 backdrop-blur-[2px]">
                                <div className="text-center px-6">
                                    {status === "done" && (
                                        <p className={`mb-4 font-display text-xl sm:text-2xl font-800 ${won ? "text-emerald-300" : "text-slate-200"}`} data-testid="scanner-result">
                                            {won ? "Langit mengakuimu — kamu menang!" : `Tertangkap ${scanned.length}/${TOTAL_ROUNDS} — cahaya masih menunggu.`}
                                        </p>
                                    )}
                                    <button
                                        onClick={start}
                                        data-testid="scanner-start-button"
                                        className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#BCAEFF] to-[#8EDCF4] px-8 py-3.5 font-display text-xs font-700 uppercase tracking-[0.16em] text-slate-950 transition-all duration-300 hover:shadow-[0_0_32px_rgba(142,220,244,0.5)] hover:-translate-y-0.5"
                                    >
                                        {status === "done" ? <RotateCcw className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                        {status === "done" ? "Tangkap Lagi" : "Mulai Menangkap"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </Reveal>

                <Reveal className="lg:col-span-4" delay={0.1}>
                    <div className="glass-card flex h-full flex-col gap-6 rounded-3xl p-6">
                        <div className="flex items-center gap-2.5 border-b border-white/8 pb-4 font-mono text-[10px] uppercase tracking-[0.26em] text-slate-400">
                            <Crosshair className="h-4 w-4 text-[#BCAEFF]" />
                            Cara Menangkap Cahaya
                        </div>
                        <ul className="space-y-2.5 text-sm text-slate-400 leading-relaxed">
                            <li>· {TOTAL_ROUNDS} putaran — tangkap <span className="text-slate-200">{WIN_TARGET} cahaya</span> untuk menang</li>
                            <li>· Setiap cahaya hanya singgah {ROUND_TIME} detik; salah sentuh memangkas waktu</li>
                            <li>· Menangkan, dan satu pintu langit terbuka</li>
                        </ul>
                        <div>
                            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Kecepatan orbit — <span className="text-cyan-300">{speed === 0 ? "berhenti" : `${speed}x`}</span></p>
                            <div className="flex gap-1.5" data-testid="scanner-speed-slider">
                                {SPEEDS.map((s, i) => (
                                    <button
                                        key={s}
                                        onClick={() => setSpeedIdx(i)}
                                        aria-label={`Kecepatan ${s}x`}
                                        className={`flex-1 rounded-lg border py-2 font-mono text-[10px] transition-all duration-200 ${
                                            i === speedIdx ? "border-cyan-300/60 bg-cyan-300/10 text-cyan-200" : "border-white/8 text-slate-500 hover:border-white/25"
                                        }`}
                                    >
                                        {s === 0 ? "■" : `${s}x`}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Cahaya tertangkap — {scanned.length}</p>
                            <div className="flex flex-wrap gap-2" data-testid="scanner-chips">
                                {ORBIT_PLANETS.map((p) => (
                                    <span
                                        key={p.id}
                                        className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-300 ${
                                            scanned.includes(p.id) ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-300" : "border-white/10 text-slate-500"
                                        }`}
                                    >
                                        {p.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {flash && (
                            <div className="rounded-2xl border border-[#BCAEFF]/25 bg-[#BCAEFF]/8 p-4">
                                <div className="flex items-center gap-3">
                                    <PlanetOrb grad={flash.grad} size={34} />
                                    <div>
                                        <p className="font-display text-sm font-700 text-slate-100">{flash.name} — {flash.identity}</p>
                                        <p className="mt-0.5 text-xs italic text-slate-400">“{flash.quote}”</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {scannerWin && (
                            <div className="mt-auto inline-flex items-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-400/8 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300" data-testid="scanner-win-badge">
                                <Trophy className="h-3.5 w-3.5" />
                                Satu pintu langit terbuka
                            </div>
                        )}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
