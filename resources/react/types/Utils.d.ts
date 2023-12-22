export type ExcludeKey<P, T> = {
  [K in keyof P as K extends T ? never : K]: P[K]
}
