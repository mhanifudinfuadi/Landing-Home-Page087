import { Logo } from "@/components/DockNav";

const NAV = [
    { label: "Planet", href: "#planets", testid: "footer-link-planets" },
    { label: "Orbit Scanner", href: "#scanner", testid: "footer-link-scanner" },
    { label: "Kuis", href: "#kuis", testid: "footer-link-kuis" },
    { label: "Bandingkan", href: "#bandingkan", testid: "footer-link-bandingkan" },
    { label: "Destinasi MADU", href: "#destinasi", testid: "footer-link-destinasi" },
];

export default function Footer() {
    return (
        <footer className="relative z-10 overflow-hidden border-t border-white/8 bg-slate-950/70 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    <div className="md:col-span-6">
                        <div className="flex items-center gap-3">
                            <Logo size={30} />
                            <span className="font-display text-sm font-800 tracking-[0.18em] text-slate-100">
                                MADU<span className="text-cyan-300">·記録</span>
                            </span>
                        </div>
                        <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
                            Setiap hati punya orbitnya. Temukan cahayamu — lalu lanjutkan perjalanan ke empat kanal MADU.
                        </p>
                        <p className="mt-5 max-w-sm font-mono text-[10px] leading-relaxed tracking-wide text-slate-600">
                            Kisah planet di laman ini adalah metafora puitis, bukan asesmen psikologis.
                        </p>
                    </div>
                    <div className="md:col-span-6">
                        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">Navigasi</p>
                        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-400">
                            {NAV.map((n) => (
                                <a key={n.href} href={n.href} data-testid={n.testid} className="hover:text-cyan-300 transition-colors">
                                    {n.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-14 select-none text-center font-display font-900 leading-none text-outline text-[19vw] md:text-[12rem] tracking-tight" aria-hidden="true">
                    MADU記録
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/8 pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600">
                    <p>© 2026 MADU Archive — Cosmic Identity</p>
                    <p>内なる宇宙 Tidak ada jiwa yang tersesat di langit ini</p>
                </div>
            </div>
        </footer>
    );
}
