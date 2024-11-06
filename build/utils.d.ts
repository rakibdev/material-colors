export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
export declare const deepMerge: <T>(target: T, source: DeepPartial<T>) => T;
export type Override<Target, Source extends Partial<Record<keyof Target, any>>> = Omit<Target, keyof Source> & Source;
export type Entries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T][];
