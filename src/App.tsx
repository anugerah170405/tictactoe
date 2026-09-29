import { useState, useCallback, useEffect } from "react"
import { AnimatePresence } from "motion/react"
import { playSound } from "./sound/PlaySound"
import { getResult } from "./game_logic/GameLogic"
import { MenuScreen } from "./screens/MenuScreen"
import { GameScreen } from "./screens/GameScreen"
import { SettingsScreen } from "./screens/SettingsScreen"
import { LearnScreen } from "./screens/LearnScreen"

type Screen = "menu" | "game" | "learn" | "settings"

export default function App() {
  const [screen, setScreen] = useState<Screen>("menu")
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null))
  const [current, setCurrent] = useState<"X" | "O">("X")
  const [winState, setWinState] = useState<{ winner: string | null; line: number[] | null }>({ winner: null, line: null })
  const [dark, setDark] = useState(false)
  const [sound, setSound] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  const go = useCallback((s: Screen) => {
    playSound("click", sound)
    setScreen(s)
  }, [sound])

  const startGame = useCallback(() => {
    setBoard(Array(9).fill(null))
    setCurrent("X")
    setWinState({ winner: null, line: null })
    go("game")
  }, [go])

  const handleClick = useCallback((i: number) => {
    if (board[i] || winState.winner) return
    const next = [...board]
    next[i] = current
    const result = getResult(next)
    setBoard(next)
    setWinState(result)
    if (result.winner === "draw") playSound("draw", sound)
    else if (result.winner) playSound("win", sound)
    else {
      playSound("place", sound)
      setCurrent(current === "X" ? "O" : "X")
    }
  }, [board, current, winState, sound])

  const restart = useCallback(() => {
    playSound("click", sound)
    setBoard(Array(9).fill(null))
    setCurrent("X")
    setWinState({ winner: null, line: null })
  }, [sound])

    const [font, setFont] = useState(
    localStorage.getItem("app-font") || "Outfit"
  );

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-sans",
      `'${font}', sans-serif`
    );

    localStorage.setItem("app-font", font);
  }, [font]);

  return (
    <div className="min-h-screen bg-[#f2f1ee] dark:bg-[#111111] flex items-center justify-center p-5 transition-colors duration-300">
      <AnimatePresence mode="wait">
        {screen === "menu" && (
          <MenuScreen key="menu" onPlay={startGame} onLearn={() => go("learn")} onSettings={() => go("settings")} />
        )}
        {screen === "game" && (
          <GameScreen
            key="game"
            board={board}
            current={current}
            winState={winState}
            onClick={handleClick}
            onRestart={restart}
            onBack={() => go("menu")}
          />
        )}
        {screen === "learn" && < LearnScreen key="learn" onBack={() => go("menu")} />}
        {screen === "settings" && (
          <SettingsScreen
            key="settings"
            dark={dark}
            sound={sound}
            font={font}
            onToggleDark={() => { playSound("click", sound); setDark(d => !d) }}
            onToggleSound={() => setSound(s => !s)}
            onChangeFont={setFont}
            onBack={() => go("menu")}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
