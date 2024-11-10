import { type DeepPartial } from './utils';
declare const tones: readonly [80, 40, 20];
export type Options<Colors extends Record<string, string> = {}, Tones extends readonly number[] = typeof tones> = {
    darkMode: boolean;
    colors: {
        primary: string;
    } & Colors;
    tones: Tones;
};
export declare const defaultOptions: Options;
type ToneVariants<Tones extends readonly number[]> = {
    [Tone in Tones[number]]: string;
};
type SurfaceVariants = {
    [K in 1 | 2 | 3 | 4 as `${K}`]: string;
};
export type MaterialColors<Colors extends Record<string, string>, Tones extends readonly number[]> = {
    [K in keyof Colors | 'neutral']: ToneVariants<Tones> & (K extends 'neutral' ? {} : {
        surfaces: SurfaceVariants;
    });
};
export declare const generate: <Colors extends Record<string, string>, Tones extends readonly number[] = readonly [80, 40, 20]>(userOptions?: DeepPartial<Options<Colors, Tones>>) => MaterialColors<{
    primary: string;
} & Colors, Tones>;
export type FlatMaterialColors<Colors extends Record<string, string>, Tones extends readonly number[]> = {
    [K in keyof Colors as `${string & K}_${Tones[number]}`]: string;
} & {
    [K in keyof Colors as `${string & K}_surface` | `${string & K}_surface_${Exclude<keyof SurfaceVariants, '1'>}`]: string;
} & {
    [K in keyof Tones as `neutral_${Tones[number]}`]: string;
};
export declare const flatten: <Colors extends Record<string, string>, Tones extends readonly number[]>(colors: MaterialColors<Colors, Tones>) => FlatMaterialColors<Colors, Tones>;
export {};
