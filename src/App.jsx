import { useEffect } from "react";
import "@/App.css";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { CosmicProvider } from "@/context/CosmicContext";
import { MissionProvider } from "@/context/MissionContext";
import CosmicCanvas from "@/components/three/CosmicCanvas";
import CrystalTrailCursor from "@/components/CrystalTrailCursor";
import DockNav from "@/components/DockNav";
import Hero from "@/components/Hero";
import MarqueeRibbon from "@/components/MarqueeRibbon";
import Planets from "@/components/Planets";
import Scanner from "@/components/Scanner";
import Quiz from "@/components/Quiz";
import Compare from "@/components/Compare";
import MaduGate from "@/components/MaduGate";
import Footer from "@/components/Footer";

const useLenis = () => {
    useEffect(() => {
        const lenis = new Lenis({ duration: 1.25, smoothWheel: true });
        let rafId;
        const raf = (time) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);
};

function App() {
    useLenis();
    return (
        <CosmicProvider>
            <MissionProvider>
                <div className="relative min-h-screen bg-[#03050C]" data-testid="madu-app">
                    <CosmicCanvas />
                    <CrystalTrailCursor />
                    <DockNav />
                    <main className="relative">
                        <Hero />
                        <MarqueeRibbon />
                        <Planets />
                        <Scanner />
                        <Quiz />
                        <Compare />
                        <MaduGate />
                    </main>
                    <Footer />
                    <Toaster theme="dark" position="bottom-center" toastOptions={{ style: { background: "#10162B", border: "1px solid rgba(190,198,255,0.2)", color: "#F4F5FF" } }} />
                </div>
            </MissionProvider>
        </CosmicProvider>
    );
}

export default App;
