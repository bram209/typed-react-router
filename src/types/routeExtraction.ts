type RouteSegment<K extends string, T> = `${K}/${RoutePaths<T> & string}`

type RoutePaths<T> = T extends Record<string, unknown>
  ? {
      [K in keyof T & ('path' | 'children')]: K extends 'path' & string
        ? T[K]
        : T[K] extends ReadonlyArray<infer V>
        ? RouteSegment<T['path' & keyof T] & string, V>
        : never
    }[keyof T & ('path' | 'children')]
  : never

type FixAbsolutePaths<T extends string> = T extends `${infer _}//${infer Rest}`
  ? `${FixAbsolutePaths<Rest>}`
  : T extends '/'
  ? ''
  : T

type PrefixWith<T extends string, Prefix extends string> = `${Prefix}${T}`

type AsPaths<T> = T extends ReadonlyArray<infer V>
  ? PrefixWith<FixAbsolutePaths<RoutePaths<V> & string>, '/'> & string
  : never

type ExtractParams<Pattern extends string> =
  Pattern extends `:${infer Param}/${infer Rest}`
    ? Param | ExtractParams<Rest>
    : Pattern extends `${infer _}/:${infer Param}/${infer Rest}`
    ? Param | ExtractParams<Rest>
    : Pattern extends `${infer _}/:${infer Param}`
    ? Param
    : never

type ExtractParamsType<RoutePath extends string, ValueT = string> = [RoutePath] extends [
  ValueT,
]
  ? { [name in ExtractParams<RoutePath>]: ValueT }
  : undefined

export type { ExtractParamsType as ExtractParams, AsPaths as RoutePattern }
