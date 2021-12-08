import React from 'react'
import { generatePath, Link, LinkProps, matchPath, useMatch } from 'react-router-dom'

import {
  CheckParamReq,
  ExtractParams,
  Pattern,
  RoutePattern,
  To,
  TypedPathMatch,
  TypedPathPattern,
} from './types'
import { TypedNavigateFunction, useTypedNavigate } from './useTypedNavigate'

export interface TypedLinkProps<RoutePattern extends string>
  extends Omit<LinkProps, 'to'> {
  to: To<RoutePattern>
  params: ExtractParams<RoutePattern>
}

interface TypedRouter<RoutesType extends string> {
  Link<Pattern extends RoutesType>(
    props: CheckParamReq<TypedLinkProps<Pattern>>,
  ): React.ReactElement

  useMatch: (
    pattern: Pattern<RoutesType>,
  ) => TypedPathMatch<RoutePattern<RoutesType>, ExtractParams<RoutePattern<RoutesType>>>

  useNavigate: () => TypedNavigateFunction<RoutesType>

  matchPath: (
    pattern: TypedPathPattern<RoutesType>,
    pathname: string,
  ) => TypedPathMatch<RoutesType, ExtractParams<RoutesType>>

  generatePath<Pattern extends RoutesType>(
    path: Pattern,
    params: ExtractParams<Pattern>,
  ): string
}

export const constructTypedRouter = <T,>(routes: T) => {
  type TypedRoutePattern = RoutePattern<typeof routes> & string

  return {
    Link<Pattern extends TypedRoutePattern>(
      props: CheckParamReq<TypedLinkProps<Pattern>>,
    ) {
      const path = typeof props.to === 'string' ? props.to : props.to.pathname
      return <Link {...props} replace to={path ? generatePath(path, props.params) : {}} />
    },

    useMatch: (pattern: Pattern<TypedRoutePattern>) =>
      useMatch(pattern) as TypedPathMatch<
        TypedRoutePattern,
        ExtractParams<TypedRoutePattern>
      >,

    useNavigate: () => useTypedNavigate<TypedRoutePattern>(),

    matchPath: (pattern: TypedPathPattern<TypedRoutePattern>, pathname: string) =>
      matchPath(pattern, pathname) as TypedPathMatch<
        TypedRoutePattern,
        ExtractParams<TypedRoutePattern>
      >,

    generatePath<Pattern extends TypedRoutePattern>(
      path: Pattern,
      params: ExtractParams<Pattern>,
    ): string {
      return generatePath(path, params)
    },
  } as TypedRouter<TypedRoutePattern>
}
