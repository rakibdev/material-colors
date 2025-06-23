import { Hct } from '@material/material-color-utilities/hct/hct'
import { argbFromHex, hexFromArgb } from '@material/material-color-utilities/utils/string_utils'

export const hctToHex = (hue: number, chroma: number, tone: number) => hexFromArgb(Hct.from(hue, chroma, tone).toInt())
export const hexToHct = (hex: string) => Hct.fromInt(argbFromHex(hex))

export const neutralChroma = 6
export const secondaryChroma = 20

export const createBaseColors = (sourceColor: Hct, dark?: boolean) => {
  const { hue, chroma } = sourceColor
  return {
    color: hctToHex(hue, chroma, dark ? 80 : 40),
    foreground: hctToHex(hue, chroma, dark ? 20 : 98)
  }
}

/**
 * Tonal button, toast, tooltip
 */
export const createSecondaryColors = (sourceColor: Hct, dark?: boolean, chroma: number = secondaryChroma) => {
  const { hue } = sourceColor
  return {
    color: hctToHex(hue, chroma, dark ? 20 : 90),
    foreground: hctToHex(hue, chroma, dark ? 80 : 20)
  }
}

export const createBorderColor = (sourceColor: Hct, dark?: boolean) => {
  const { hue } = sourceColor
  return hctToHex(hue, neutralChroma, dark ? 20 : 80)
}

export const createSurfaceColors = (sourceColor: Hct, dark?: boolean, chroma: number = neutralChroma) => {
  // In `material-color-utilities` source code you might see `new ContrastCurve(12, 12, 16, 20)`.
  // It's just tone = [low, normal, medium, high]. I'm using `normal` to skip average calculation.
  // Normal values can also be found here: https://material-web.dev/theming/color
  const { hue } = sourceColor
  return {
    '1': hctToHex(hue, chroma, dark ? 6 : 99),
    '2': hctToHex(hue, chroma, dark ? 10 : 94),
    '3': hctToHex(hue, chroma + 1, dark ? 12 : 92),
    '4': hctToHex(hue, chroma + 2, dark ? 14 : 90),

    foreground: hctToHex(hue, chroma, dark ? 85 : 15)
  }
}

type Options = {
  neutralChroma: number
}

export type MaterialPalette = {
  /** Body */
  background: string
  foreground: string

  /** Button, link */
  primary: string
  primaryForeground: string

  /** Tonal button, tooltip, inactive element, secondary text */
  secondary: string
  secondaryForeground: string

  /** Hover, selected */
  hover: string

  /** Input border, divider */
  border: string

  /** Elevated panel */
  card: string

  /** Dialog, dropdown */
  popover: string
}

export const createDynamicPalette = (sourceColor: Hct, dark?: boolean, options?: Options): MaterialPalette => {
  const primary = createBaseColors(sourceColor, dark)
  const secondary = createSecondaryColors(sourceColor, dark)
  const surfaces = createSurfaceColors(sourceColor, dark, options?.neutralChroma)

  return {
    foreground: surfaces.foreground,
    background: surfaces['1'],
    card: surfaces['2'],
    popover: surfaces['3'],
    hover: surfaces['4'],

    primary: primary.color,
    primaryForeground: primary.foreground,

    secondary: secondary.color,
    secondaryForeground: secondary.foreground,

    border: createBorderColor(sourceColor, dark)
  }
}
