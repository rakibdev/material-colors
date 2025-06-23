import { Hct } from '@material/material-color-utilities/hct/hct'
import { argbFromHex, hexFromArgb } from '@material/material-color-utilities/utils/string_utils'

export const hctToHex = (hue: number, chroma: number, tone: number) => hexFromArgb(Hct.from(hue, chroma, tone).toInt())
export const hexToHct = (hex: string) => Hct.fromInt(argbFromHex(hex))

export const primary = '#00bfff'
export const error = '#ff0062'

const isPhone = typeof window != 'undefined' && /Android|iPhone/i.test(window.navigator.userAgent)

export const isBlue = (hue: number): boolean => hue >= 200 && hue <= 260

export const getNeutralChroma = (hue: number): number => {
  // Other colors (e.g. Red) look too colorful at same chroma as blue.
  if (isPhone) return isBlue(hue) ? 4 : 1
  return isBlue(hue) ? 8 : 2
}

export const createPrimaryVariants = (sourceColor: Hct, dark?: boolean) => {
  const { hue } = sourceColor
  // Soft color. Inspired by `DynamicSchemePalettesDelegateImpl2025` from material-color-utilities
  const chroma = isPhone ? (dark ? 36 : 48) : 40
  return {
    color: hctToHex(hue, chroma, dark ? 80 : 40),
    foreground: hctToHex(hue, chroma, dark ? 20 : 98)
  }
}

export const createSecondaryVariants = (sourceColor: Hct, dark?: boolean, chroma?: number) => {
  const { hue } = sourceColor
  chroma ??= dark ? 26 : 32
  return {
    color: hctToHex(hue, chroma, dark ? 20 : 80),
    foreground: hctToHex(hue, chroma, dark ? 80 : 20)
  }
}

export const createBorderColor = (sourceColor: Hct, dark?: boolean) => {
  const { hue } = sourceColor
  const chroma = getNeutralChroma(hue)
  return hctToHex(hue, chroma, dark ? 20 : 80)
}

export const createSurfaceVariants = (sourceColor: Hct, dark?: boolean, chroma?: number) => {
  // In `material-color-utilities` source code you might see `new ContrastCurve(12, 12, 16, 20)`.
  // It's just tone = [low, normal, medium, high]. I'm using normal.
  // Normal values can also be found here: https://material-web.dev/theming/color
  const { hue } = sourceColor
  chroma ??= getNeutralChroma(hue)

  return {
    '1': hctToHex(hue, chroma, dark ? 6 : 98),
    '2': hctToHex(hue, chroma + 2, dark ? 10 : 94),
    '3': hctToHex(hue, chroma + 2, dark ? 12 : 92),
    '4': hctToHex(hue, chroma + 2, dark ? 14 : 90)
  }
}

export const createTextVariants = (sourceColor: Hct, dark?: boolean) => {
  const { hue } = sourceColor
  const chroma = getNeutralChroma(hue)
  return {
    foreground: hctToHex(hue, chroma, dark ? 85 : 15),
    mutedForeground: hctToHex(hue, chroma, dark ? 60 : 45)
  }
}

export type MaterialPalette = {
  foreground: string
  mutedForeground: string

  background: string

  /** Elevated panel */
  card: string

  /** Dialog, dropdown */
  popover: string

  /** Hover, selected */
  hover: string

  /** Input border, divider */
  border: string

  /** Button, link */
  primary: string
  primaryForeground: string

  /** Tonal button, tooltip */
  secondary: string
  secondaryForeground: string
}

export const createDynamicPalette = (sourceColor: Hct, dark?: boolean): MaterialPalette => {
  const primary = createPrimaryVariants(sourceColor, dark)
  const secondary = createSecondaryVariants(sourceColor, dark)
  const surfaces = createSurfaceVariants(sourceColor, dark)
  const text = createTextVariants(sourceColor, dark)

  return {
    foreground: text.foreground,
    mutedForeground: text.mutedForeground,

    background: surfaces['1'],
    card: surfaces['2'],
    popover: surfaces['3'],
    hover: surfaces['4'],

    border: createBorderColor(sourceColor, dark),

    primary: primary.color,
    primaryForeground: primary.foreground,

    secondary: secondary.color,
    secondaryForeground: secondary.foreground
  }
}
