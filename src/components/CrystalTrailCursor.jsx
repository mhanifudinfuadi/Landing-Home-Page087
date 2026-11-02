import { useEffect, useRef } from "react";

export default function CrystalTrailCursor({ maxCrystals = 500 }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
        const canvas = canvasRef.current;
        if (!canvas) return undefined;
        const ctx = canvas.getContext("2d");
        const max = window.innerWidth < 768 ? 200 : maxCrystals;
        let crystals = [];
        let raf = 0;
        let last = null;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const spawn = (x, y, dist) => {
            const n = Math.min(Math.floor(dist / 5), 5);
            for (let i = 0; i < n; i++) {
                crystals.push({
                    x: x + (Math.random() - 0.5) * 10,
                    y: y + (Math.random() - 0.5) * 10,
                    size: 4 + Math.random() * 8,
                    sides: 3 + Math.floor(Math.random() * 3),
                    radii: Array.from({ length: 5 }, () => 0.6 + Math.random() * 0.9),
                    rot: Math.random() * Math.PI * 2,
                    vr: (Math.random() - 0.5) * 0.1,
                    life: 1,
                });
            }
            if (crystals.length > max) crystals.splice(0, crystals.length - max);
        };

        const onMove = (e) => {
            const dist = last ? Math.hypot(e.clientX - last.x, e.clientY - last.y) : 0;
            last = { x: e.clientX, y: e.clientY };
            if (dist > 4) spawn(e.clientX, e.clientY, dist);
        };
        window.addEventListener("mousemove", onMove);

        const loop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            crystals = crystals.filter((c) => (c.life -= 0.01) > 0);
            for (const c of crystals) {
                c.rot += c.vr;
                ctx.beginPath();
                for (let i = 0; i < c.sides; i++) {
                    const a = c.rot + (i / c.sides) * Math.PI * 2;
                    const r = c.size * c.radii[i];
                    const px = c.x + Math.cos(a) * r;
                    const py = c.y + Math.sin(a) * r;
                    if (i === 0) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.closePath();
                ctx.fillStyle = `rgba(180, 120, 255, ${c.life * 0.1})`;
                ctx.strokeStyle = `rgba(180, 120, 255, ${c.life * 0.8})`;
                ctx.lineWidth = 1;
                ctx.fill();
                ctx.stroke();
            }
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("resize", resize);
        };
    }, [maxCrystals]);

    return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[6]" aria-hidden="true" data-testid="crystal-cursor" />;
}
