import axios from 'axios'

import type {
  FetchinRequestConfig,
  FetchinResponseHeaders,
  FetchinResponseTransformer,
} from '../types'

export const originalResponseTransformers: FetchinResponseTransformer[] = [
  // keep the original transform
  ...(axios.defaults.transformResponse as FetchinResponseTransformer[]),
]

export type FetchinResponseExtendTransformer = (
  data: any,
  headers: FetchinResponseHeaders,
  config: FetchinRequestConfig,
) => any

/**
 * Create a response transformer
 *
 * By default, axios only passes `data` and `headers` parameters to the `transformResponse` function.
 *
 * Use this creator, you can also obtain the `requestConfig` object, which can be useful,
 * for example, to determine whether to process the conversion based on `responseType === 'json '`.
 */
export const createResponseTransformer = (
  extendTransformer: FetchinResponseExtendTransformer,
): FetchinResponseTransformer => {
  // return a normal function that obtains `this`, which is equivalent to `config`.
  return function (this: FetchinRequestConfig, data: any, headers?: FetchinResponseHeaders) {
    return extendTransformer(data, headers ?? {}, this)
  }
}
