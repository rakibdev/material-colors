import { Hct } from '@material/material-color-utilities/hct'
import { argbFromHex, hexFromArgb } from '@material/material-color-utilities/utils/string_utils'
import { deepMerge, type DeepPartial, type Entries, type Override } from './utils'

const tones = [80, 40, 20] as const

export type Options<Colors extends Record<string, string> = {}, Tones extends readonly number[] = typeof tones> = {
  darkMode: boolean
  colors: { primary: string } & Colors
  tones: Tones
}

export const defaultOptions: Options = {
  darkMode: true,
  colors: {
    primary: '#00adff'
  },
  tones
}

const hctToHex = (hue: number, chroma: number, tone: number) => hexFromArgb(Hct.from(hue, chroma, tone).toInt())
const hexToHct = (hex: string) => Hct.fromInt(argbFromHex(hex))

const maxLightness = 99
// @internal
export const inverseTone = (tone: number) => {
  const extraLightness = 8
  return Math.min(100 - tone + extraLightness, maxLightness)
}

const createTones = <Tones extends readonly number[]>(hue: number, chroma: number, darkMode: boolean, tones: Tones) => {
  const result = {} as Record<Tones[number], string>
  for (const tone of tones) {
    result[tone as Tones[number]] = hctToHex(hue, chroma, darkMode ? inverseTone(tone) : tone)
  }
  return result
}

const createSurfaces = (hue: number, darkMode: boolean) => ({
  '1': hctToHex(hue, 8, darkMode ? 8 : maxLightness),
  '2': hctToHex(hue, 14, darkMode ? inverseTone(94) : 94),
  '3': hctToHex(hue, 18, darkMode ? inverseTone(88) : 88),
  '4': hctToHex(hue, 20, darkMode ? inverseTone(84) : 84)
})

type ToneVariants<Tones extends readonly number[]> = {
  [Tone in Tones[number]]: string
}

type SurfaceVariants = {
  [K in 1 | 2 | 3 | 4 as `${K}`]: string
}

export type MaterialColors<Colors extends Record<string, string>, Tones extends readonly number[]> = {
  [K in keyof Colors | 'neutral']: ToneVariants<Tones> & (K extends 'neutral' ? {} : { surfaces: SurfaceVariants })
}

export const generate = <Colors extends Record<string, string>, Tones extends readonly number[] = Options['tones']>(
  userOptions?: DeepPartial<Options<Colors, Tones>>
) => {
  // defaultOptions['tones'] is tuple, userOptions['tones'] is number[].
  // Override is used to make types assignable.
  type Target = Override<Options, { tones: readonly number[] }>

  type Merged = Options<Colors, Tones>
  const options = (userOptions ? deepMerge(defaultOptions as Target, userOptions) : defaultOptions) as Merged

  const colors = {} as MaterialColors<Merged['colors'], Merged['tones']>

  for (const [name, value] of Object.entries(options.colors) as Entries<Merged['colors']>) {
    const { hue, chroma } = hexToHct(value)
    colors[name] = {
      ...createTones(hue, chroma, options.darkMode, options.tones),
      surfaces: createSurfaces(hue, options.darkMode)
    }
  }

  const primary = hexToHct(options.colors.primary)
  colors.neutral = createTones(primary.hue, 8, options.darkMode, options.tones)

  return colors
}

export type FlatMaterialColors<Colors extends Record<string, string>, Tones extends readonly number[]> = {
  [K in keyof Colors as `${string & K}_${Tones[number]}`]: string
} & {
  [K in keyof Colors as
    | `${string & K}_surface`
    | `${string & K}_surface_${Exclude<keyof SurfaceVariants, '1'>}`]: string
} & {
  [K in keyof Tones as `neutral_${Tones[number]}`]: string
}

export const flatten = <Colors extends Record<string, string>, Tones extends readonly number[]>(
  colors: MaterialColors<Colors, Tones>
) => {
  const result = {} as Record<string, string>

  for (const [name, variants] of Object.entries(colors) as Entries<typeof colors>) {
    for (const [key, value] of Object.entries(variants) as Entries<typeof variants>) {
      if (key == 'surfaces') {
        for (const [surface, surfaceVariants] of Object.entries(value)) {
          result[`${String(name)}_surface${surface == '1' ? '' : `_${surface}`}`] = surfaceVariants
        }
      }
      // Tones.
      else result[`${String(name)}_${String(key)}`] = value
    }
  }

  return result as FlatMaterialColors<Colors, Tones>
}
