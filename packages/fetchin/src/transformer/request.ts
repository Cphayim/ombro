import axios from 'axios'

import type {
  FetchinRequestConfig,
  FetchinRequestHeaders,
  FetchinRequestTransformer,
} from '../types'

export const originalRequestTransformers: FetchinRequestTransformer[] = [
  // keep the original transform
  ...(axios.defaults.transformRequest as FetchinRequestTransformer[]),
]

export type FetchinRequestExtendTransformer = (
  data: any,
  headers: FetchinRequestHeaders,
  config: FetchinRequestConfig,
) => any

/**
 * Create a response transformer
 *
 * By default, axios only passes `data` and `headers` parameters to the `transformRequest` function.
 *
 * Use this creator, you can also obtain the `requestConfig` object
 */
export const createRequestTransformer = (
  extendTransformer: FetchinRequestExtendTransformer,
): FetchinRequestTransformer => {
  // return a normal function that obtains `this`, which is equivalent to `config`.
  return function (this: FetchinRequestConfig, data: any, headers?: FetchinRequestHeaders) {
    return extendTransformer(data, headers ?? {}, this)
  }
}
