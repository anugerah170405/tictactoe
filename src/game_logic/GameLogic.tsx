const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

export function getResult(b: (string | null)[]) {
  for (const line of LINES) {
    const [a, m, c] = line
    if (b[a] && b[a] === b[m] && b[a] === b[c]) return { winner: b[a]!, line }
  }
  return { winner: b.every(Boolean) ? "draw" : null, line: null }
}