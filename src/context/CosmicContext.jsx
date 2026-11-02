import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

export const PALETTES = {
    borealis: {
        key: "borealis",
        name: "Borealis Green",
        a: "#10B981",
        b: "#06B6D4",
        c: "#22D3EE",
    },
    violet: {
        key: "violet",
        name: "Cosmic Violet",
        a: "#8B5CF6",
        b: "#EC4899",
        c: "#06B6D4",
    },
    sakura: {
        key: "sakura",
        name: "Sakura Bloom 桜",
        a: "#EC4899",
        b: "#F472B6",
        c: "#FDA4AF",
    },
};

const CosmicContext = createContext(null);

export const CosmicProvider = ({ children }) => {
    const [paletteKey, setPaletteKey] = useState("violet");
    const [intensity, setIntensity] = useState(1);
    const [starDensity, setStarDensity] = useState(0.85);
    const [meteorSpeed, setMeteorSpeed] = useState(1);

    const settingsRef = useRef({ intensity, starDensity, meteorSpeed, palette: PALETTES.violet });
    const meteorLogRef = useRef([]);

    useEffect(() => {
        settingsRef.current = { intensity, starDensity, meteorSpeed, palette: PALETTES[paletteKey] };
    }, [intensity, starDensity, meteorSpeed, paletteKey]);

    const value = useMemo(
        () => ({
            paletteKey,
            setPaletteKey,
            palette: PALETTES[paletteKey],
            intensity,
            setIntensity,
            starDensity,
            setStarDensity,
            meteorSpeed,
            setMeteorSpeed,
            settingsRef,
            meteorLogRef,
        }),
        [paletteKey, intensity, starDensity, meteorSpeed],
    );

    return <CosmicContext.Provider value={value}>{children}</CosmicContext.Provider>;
};

export const useCosmic = () => useContext(CosmicContext);
