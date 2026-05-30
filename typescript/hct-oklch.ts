import { oklchToHex, hexToOklch } from './oklch.ts'

// HCT Tone (0-100) → OKLab L (0-1)
// It's not simple value / 100. K1/2/3 values from https://gist.github.com/facelessuser/0235cb0fecc35c4e06a8195d5e18947b
const K1 = 0.173
const K2 = 0.004
const K3 = (1.0 + K1) / (1.0 + K2)
const toneToL = (tone: number) => {
  const x = tone / 100
  return (x * x + K1 * x) / (K3 * (x + K2))
}
const lToTone = (L: number) => (100 * (K3 * L - K1 + Math.sqrt((K3 * L - K1) ** 2 + 4 * K2 * K3 * L))) / (2 * K3)

// HCT chroma (CAM16) → OKLCH chroma
// HCT C comes from the CAM16. We're avoiding CAM16 solver. Instead we use a flat scale derived empirically:
// oklchChroma = hctChroma / CHROMA_RATIO
// We sampled the sRGB gamut boundary in both spaces across 13 hues — computing
// hctMax (max CAM16 chroma at tone=50) and oklchMax (max OKLCH chroma at L_50).
// Despite both values varying ~3x across hues, their ratio hctMax/oklchMax stays
// remarkably stable at 283–434, mean ~379.
const CHROMA_RATIO = 379

export const hctToOklchChroma = (hctChroma: number) => hctChroma / CHROMA_RATIO

export const hctToHex = (hue: number, chroma: number, tone: number) =>
  oklchToHex(hue, hctToOklchChroma(chroma), toneToL(tone))

export const hexToHct = (hex: string) => {
  const { hue, chroma, L } = hexToOklch(hex)
  return { hue, chroma: chroma * CHROMA_RATIO, tone: lToTone(L) }
}
