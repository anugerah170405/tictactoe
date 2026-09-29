import { beep } from "./Beep"

export function playSound(type: "place" | "win" | "draw" | "click", on: boolean) {
  if (!on) return
  if (type === "click") beep(640, 0.05)
  else if (type === "place") beep(440, 0.08)
  else if (type === "draw") beep(260, 0.28, "triangle")
  else if (type === "win") {
    beep(523, 0.1)
    setTimeout(() => beep(659, 0.1), 110)
    setTimeout(() => beep(784, 0.2), 220)
  }
}