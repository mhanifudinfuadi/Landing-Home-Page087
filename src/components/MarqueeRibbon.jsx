import { Sparkles } from "lucide-react";

const ITEMS = [
    "MARS 火星 SANG PEJUANG",
    "VENUS 金星 SANG KEKASIH",
    "EVERY HEART HAS AN ORBIT",
    "内なる宇宙 INNER UNIVERSE",
    "SEMBILAN CAHAYA 惑星",
    "MERCURY · EARTH · JUPITER · SATURN · URANUS · NEPTUNE · PLUTO",
];

export default function MarqueeRibbon() {
    const row = [...ITEMS, ...ITEMS];
    return (
        <div className="relative z-10 border-y border-white/8 bg-slate-950/55 backdrop-blur-md py-5 overflow-hidden" data-testid="cosmic-marquee">
            <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
                {row.map((item, i) => (
                    <span key={i} className="flex items-center gap-10 font-display text-xs sm:text-sm font-600 uppercase tracking-[0.3em] text-slate-500">
                        {item}
                        <Sparkles className="h-4 w-4 text-[#BCAEFF]/70" />
                    </span>
                ))}
            </div>
        </div>
    );
}
