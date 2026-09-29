import { page } from "../animation/Page";
import { motion } from "motion/react"
import { BentoCard } from "../components/BentoCard";
import { BookOpen, Settings2 } from "lucide-react";
import logo from '../assets/tictac.svg'

export function MenuScreen({ onPlay, onLearn, onSettings }: {
  onPlay: () => void; onLearn: () => void; onSettings: () => void
}) {
  return (
    <motion.div {...page} className="w-full max-w-85">
      <div className="mb-7 text-center">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">Tic Tac Toe</h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Classic two-player game</p>
      </div>
      <div className="flex flex-col gap-3">
        <BentoCard onClick={onPlay} className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-widest mb-1">1 vs 1</p>
              <p className="text-xl font-black text-gray-900 dark:text-white">Play</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Two players, one device</p>
            </div>
            <img src={logo} alt="" width={64}/>
            {/* <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-[0_3px_0_#4338ca]">
              <Users size={22} className="text-white" />
            </div> */}
          </div>
        </BentoCard>
        <div className="grid grid-cols-2 gap-3">
          <BentoCard onClick={onLearn} className="p-4">
            <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-500/15 flex items-center justify-center mb-2.5">
              <BookOpen size={15} className="text-rose-500" />
            </div>
            <p className="font-bold text-sm text-gray-900 dark:text-white">Learn</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">How to play</p>
          </BentoCard>
          <BentoCard onClick={onSettings} className="p-4">
            <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center mb-2.5">
              <Settings2 size={15} className="text-gray-500 dark:text-gray-400" />
            </div>
            <p className="font-bold text-sm text-gray-900 dark:text-white">Settings</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Theme & sound</p>
          </BentoCard>
        </div>
      </div>
    </motion.div>
  )
}
