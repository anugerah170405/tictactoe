import {motion} from 'motion/react'

export function Toggle({ on, toggle }: { on: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer ${on ? "bg-indigo-500" : "bg-gray-200 dark:bg-white/20"}`}
    >
      <motion.span
        animate={{ x: on ? 18 : 4 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm block"
      />
    </button>
  )
}