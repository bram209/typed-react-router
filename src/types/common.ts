import { Path, PathMatch, PathPattern } from 'react-router'

import { RoutePattern } from '.'

export interface TypedPath<T extends string> extends Omit<Path, 'pathname'> {
  pathname: T
}

export declare type To<T extends string> = T | Partial<TypedPath<T>>

export interface TypedPathPattern<TPattern> extends Omit<PathPattern, 'path'> {
  path: TPattern
}

export interface TypedPathMatch<TPattern, TParam>
  extends Omit<PathMatch<any>, 'params' | 'pattern'> {
  pattern: RoutePattern<TPattern>
  params: TParam
}

export declare type Pattern<T> = T | TypedPathPattern<T>

export declare type Optional<T, Keys extends keyof T> = Partial<Pick<T, Keys>> &
  Omit<T, Keys>

export declare type CheckParamReq<T> = T extends {
  params: Record<string, never>
}
  ? Optional<T, 'params'>
  : T
