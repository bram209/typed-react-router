import { generatePath, useNavigate } from 'react-router'

import { CheckParamReq, ExtractParams, To } from './types'

export interface TypedNavigateFunction<T extends string> {
  <Pattern extends T>(
    to: To<Pattern>,
    options: CheckParamReq<{
      params: ExtractParams<Pattern, string>
      state?: unknown
    }>,
  ): void
}

export const useTypedNavigate = <T extends string>(): TypedNavigateFunction<T> => {
  const navigate = useNavigate()
  return (to, state) => {
    if (!state.params) {
      return navigate(to, { replace: true, state })
    }

    if (typeof to === 'string')
      return navigate(generatePath(to, state.params), { replace: true, state })

    return navigate(
      {
        ...to,
        pathname: to.pathname && generatePath(to.pathname, state.params),
      },
      { replace: true, state },
    )
  }
}
