import {motion} from 'motion/react'

export function BentoCard({
  children, onClick, className = "",
}: {
  children: React.ReactNode; onClick?: () => void; className?: string
}) {
  const base = "bg-white dark:bg-white/[0.06] border border-gray-200/80 dark:border-white/[0.08] rounded-2xl shadow-sm"
  if (!onClick) return <div className={`${base} ${className}`}>{children}</div>
  return (
    <motion.button
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`${base} text-left w-full cursor-pointer focus:outline-none ${className}`}
    >
      {children}
    </motion.button>
  )
}