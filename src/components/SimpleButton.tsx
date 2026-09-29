import { ArrowLeft } from "lucide-react"

export function SimpleButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-5 transition-colors cursor-pointer"
    >
      <ArrowLeft size={14} /> Back
    </button>
  )
}