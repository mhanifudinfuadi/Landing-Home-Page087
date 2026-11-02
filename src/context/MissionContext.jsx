import { createContext, useCallback, useContext, useMemo, useState } from "react";

const MissionContext = createContext(null);

export const MissionProvider = ({ children }) => {
    const [visited, setVisited] = useState([]);
    const [quizResult, setQuizResult] = useState(null);
    const [scannerWin, setScannerWin] = useState(false);

    const visitPlanet = useCallback((id) => {
        setVisited((v) => (v.includes(id) ? v : [...v, id]));
    }, []);

    const missions = useMemo(
        () => [
            { id: "planets", label: "Dengarkan 3 kisah planet", done: visited.length >= 3, progress: `${Math.min(visited.length, 3)}/3` },
            { id: "scanner", label: "Taklukkan Orbit Scanner", done: scannerWin, progress: scannerWin ? "1/1" : "0/1" },
            { id: "quiz", label: "Temukan planetmu (kuis)", done: !!quizResult, progress: quizResult ? "1/1" : "0/1" },
        ],
        [visited, quizResult, scannerWin],
    );

    const doneCount = missions.filter((m) => m.done).length;
    const gateOpen = doneCount === missions.length;

    const value = useMemo(
        () => ({ visited, visitPlanet, quizResult, setQuizResult, scannerWin, setScannerWin, missions, doneCount, gateOpen }),
        [visited, visitPlanet, quizResult, scannerWin, missions, doneCount, gateOpen],
    );

    return <MissionContext.Provider value={value}>{children}</MissionContext.Provider>;
};

export const useMissions = () => useContext(MissionContext);
