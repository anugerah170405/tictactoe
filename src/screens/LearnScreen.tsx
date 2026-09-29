import { page } from "../animation/Page"
import { SimpleButton } from "../components/SimpleButton"
import {motion} from "motion/react"

export function LearnScreen({ onBack }: { onBack: () => void }) {
  const rules = [
    "Two players take turns placing marks on the board",
    "X always goes first",
    "Get 3 of your symbols in a row to win",
    "Rows, columns, and diagonals all count",
    "Fill the board with no winner and it's a draw",
  ]
  return (
    <motion.div {...page} className="w-full max-w-85">
      <SimpleButton onClick={onBack} />
      <h2 className="text-xl font-black text-gray-900 dark:text-white mb-5">How to Play</h2>
      <div className="space-y-3.5">
        {rules.map((rule, i) => (
          <div key={i} className="flex gap-3">
            <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{rule}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}