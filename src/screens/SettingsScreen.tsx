import { CaseSensitive, ChevronDown, Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { motion } from "motion/react"
import { page } from "../animation/Page";
import { SimpleButton } from "../components/SimpleButton";
import { Toggle } from "../components/Toggle";



export function SettingsScreen({ dark, sound, font, onToggleDark, onToggleSound, onChangeFont, onBack }: {
  dark: boolean; sound: boolean; font: string;
  onToggleDark: () => void; onToggleSound: () => void; onBack: () => void; onChangeFont: (font: string) => void;
}) {
  const rows = [
    { type: 'toggle', icon: dark ? <Moon size={16} className="text-indigo-400" /> : <Sun size={16} className="text-amber-400" />, label: "Dark Mode", checked: dark, toggle: onToggleDark },
    { type: 'toggle', icon: sound ? <Volume2 size={16} className="text-green-500" /> : <VolumeX size={16} className="text-gray-400" />, label: "Sound Effects", checked: sound, toggle: onToggleSound },
    { type: 'select', icon: <CaseSensitive size={16} className="text-blue-500" />, label: "Font Family", font: font },
  ]


  return (
    <motion.div {...page} className="w-full max-w-85">
      <SimpleButton onClick={onBack} />
      <h2 className="text-xl font-black text-gray-900 dark:text-white mb-5">Settings</h2>
      <div className="space-y-2">
        {rows.map(({ type, icon, label, checked, font, toggle }) => (
          <div key={label} className="flex items-center justify-between bg-white dark:bg-white/6 border border-gray-200/80 dark:border-white/8 rounded-xl px-4 py-3.5">
            <div className="flex items-center gap-3">
              {icon}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
            </div>
            {type === "toggle" && checked !== undefined && toggle && (<Toggle on={checked} toggle={toggle} />)}
            {type === "select" && (
              <div className="relative">
                <select
                  value={font}
                  onChange={(e) => onChangeFont(e.target.value)}
                  className="bg-gray-100 outline-none appearance-none rounded-lg text-gray-700 dark:text-gray-200 dark:bg-white/10 px-2 pr-7">
                  <option value="Outfit">Outfit</option>
                  <option value="Baloo 2">Baloo 2</option>
                  <option value="Fredoka">Fredoka</option>
                  <option value="Press Start 2P">Pixel</option>
                  <option value="Bungee">Bungee</option>

                </select>
                <ChevronDown
                  size={14} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500dark:text-gray-400"
                />
              </div>

            )}
          </div>
        ))}

      </div>
    </motion.div>
  )
}