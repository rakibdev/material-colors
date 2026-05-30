// OKLCH color space implementation.
const srgbLinearize = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)

const srgbDelinearize = (v: number) => (v <= 0.0031308 ? v * 12.92 : 1.055 * v ** (1.0 / 2.4) - 0.055)

const linearSrgbToOklab = (r: number, g: number, b: number) => {
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
  const lc = l ** (1 / 3),
    mc = m ** (1 / 3),
    sc = s ** (1 / 3)
  return [
    0.2104542553 * lc + 0.793617785 * mc - 0.0040720468 * sc,
    1.9779984951 * lc - 2.428592205 * mc + 0.4505937099 * sc,
    0.0259040371 * lc + 0.7827717662 * mc - 0.808675766 * sc
  ]
}

const oklabToLinearSrgb = (L: number, a: number, b: number) => {
  const lc = L + 0.3963377774 * a + 0.2158037573 * b
  const mc = L - 0.1055613458 * a - 0.0638541728 * b
  const sc = L - 0.0894841775 * a - 1.291485548 * b
  const l = lc ** 3,
    m = mc ** 3,
    s = sc ** 3
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
  ]
}

const inSrgbGamut = (r: number, g: number, b: number) => {
  const eps = 1e-4
  return r >= -eps && r <= 1 + eps && g >= -eps && g <= 1 + eps && b >= -eps && b <= 1 + eps
}

const toHex = (v: number) =>
  Math.floor(srgbDelinearize(Math.max(0, Math.min(1, v))) * 255 + 0.5)
    .toString(16)
    .padStart(2, '0')

export const oklchToHex = (hue: number, chroma: number, L: number) => {
  const hRad = (hue * Math.PI) / 180
  let lo = 0,
    hi = chroma
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2
    const [r, g, b] = oklabToLinearSrgb(L, mid * Math.cos(hRad), mid * Math.sin(hRad))
    if (inSrgbGamut(r, g, b)) lo = mid
    else hi = mid
  }
  const [r, g, b] = oklabToLinearSrgb(L, lo * Math.cos(hRad), lo * Math.sin(hRad))
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export const hexToOklch = (hex: string) => {
  hex = hex.replace('#', '')
  let r: number, g: number, b: number
  if (hex.length == 3) {
    r = parseInt(hex[0] + hex[0], 16) / 255
    g = parseInt(hex[1] + hex[1], 16) / 255
    b = parseInt(hex[2] + hex[2], 16) / 255
  } else {
    r = parseInt(hex.slice(0, 2), 16) / 255
    g = parseInt(hex.slice(2, 4), 16) / 255
    b = parseInt(hex.slice(4, 6), 16) / 255
  }
  const [L, a, bv] = linearSrgbToOklab(srgbLinearize(r), srgbLinearize(g), srgbLinearize(b))
  const chroma = Math.sqrt(a * a + bv * bv)
  let hue = (Math.atan2(bv, a) * 180) / Math.PI
  if (hue < 0) hue += 360
  return { hue, chroma, L }
}
