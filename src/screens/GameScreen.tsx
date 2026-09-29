import { page } from "../animation/Page";
import { motion, AnimatePresence } from "motion/react"
import {
    RotateCcw, ArrowLeft,
} from "lucide-react"

export function GameScreen({ board, current, winState, onClick, onRestart, onBack }: {
    board: (string | null)[]
    current: "X" | "O"
    winState: { winner: string | null; line: number[] | null }
    onClick: (i: number) => void
    onRestart: () => void
    onBack: () => void
}) {
    const { winner, line } = winState

    const statusText = !winner
        ? `${current}'s turn`
        : winner === "draw"
            ? "Draw!"
            : `${winner} wins!`

    const statusClass =
        winner === "draw"
            ? "text-gray-500 dark:text-gray-400"
            : winner === "X" || (!winner && current === "X")
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-rose-500 dark:text-rose-400"

    return (
        <motion.div {...page} className="w-full max-w-[320px]">
            <div className="flex items-center justify-between mb-6">
                <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors cursor-pointer">
                    <ArrowLeft size={14} /> Menu
                </button>
                <button onClick={onRestart} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors cursor-pointer">
                    <RotateCcw size={13} /> Restart
                </button>
            </div>

            <div className="h-10 flex items-center justify-center mb-4">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={statusText}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.16 } }}
                        exit={{ opacity: 0, y: -5, transition: { duration: 0.1 } }}
                        className={`text-xl font-black ${statusClass}`}
                    >
                        {statusText}
                    </motion.p>
                </AnimatePresence>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
                {board.map((cell, i) => {
                    const isWin = line?.includes(i) ?? false
                    const isX = cell === "X"
                    const empty = !cell && !winner
                    return (
                        <motion.button
                            key={i}
                            whileHover={empty ? { scale: 1.04 } : {}}
                            whileTap={empty ? { scale: 0.92 } : {}}
                            onClick={() => onClick(i)}
                            className={[
                                "aspect-square rounded-2xl border-2 flex items-center justify-center transition-colors",
                                isWin
                                    ? isX
                                        ? "bg-indigo-50 dark:bg-indigo-500/25 border-indigo-300 dark:border-indigo-400"
                                        : "bg-rose-50 dark:bg-rose-500/25 border-rose-300 dark:border-rose-400"
                                    : "bg-white dark:bg-white/6 border-gray-200/80 dark:border-white/8",
                                empty
                                    ? "hover:bg-gray-50 dark:hover:bg-white/10 cursor-pointer"
                                    : "cursor-default",
                            ].join(" ")}
                        >
                            <AnimatePresence>
                                {cell && (
                                    <motion.span
                                        initial={{ scale: 0, rotate: -12 }}
                                        animate={
                                            isWin
                                                ? {
                                                    scale: [1, 1.25, 1],
                                                    rotate: 0,
                                                    transition: { delay: 0.08, duration: 0.35, times: [0, 0.5, 1] },
                                                }
                                                : {
                                                    scale: 1,
                                                    rotate: 0,
                                                    transition: { type: "spring", stiffness: 400, damping: 18 },
                                                }
                                        }
                                        className={`text-4xl font-black select-none leading-none ${isX ? "text-indigo-500" : "text-rose-500"}`}
                                    >
                                        {cell}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    )
                })}
            </div>

            <div className="h-16 flex items-center justify-center mt-2">
                <AnimatePresence>
                    {winner && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1, transition: { delay: 0.35, type: "spring", stiffness: 280, damping: 20 } }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={onRestart}
                                className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-6 py-2.5 rounded-xl shadow-[0_3px_0_#4338ca] active:shadow-none active:translate-y-0.5 transition-colors cursor-pointer"
                            >
                                <RotateCcw size={15} /> Play Again
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}