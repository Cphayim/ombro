import type { AxiosResponse, AxiosResponseHeaders } from 'axios'

import type { FetchinConfig } from './config'

/**
 * Fetchin response headers
 */
export type FetchinResponseHeaders = AxiosResponseHeaders

/**
 * Fetchin response
 */
export interface FetchinResponse<T = any, D = any> extends AxiosResponse<T, D> {
  /**
   * this config includes `meta` field
   */
  config: FetchinConfig<D, true>

  /**
   * extra data
   */
  [extraKey: string | symbol]: any
}

/**
 * Fetchin response body entity
 * This is a fixed structure of the response body, used to constrain the structure of the response body.
 * If the response body returned by your backend is not in this structure, you can use `responseTransformer` to convert it.
 */
export interface FetchinResponseBody<T = any> {
  /**
   * the status code of the response
   */
  code: number | string
  /**
   * the data of the response
   */
  data: T
  /**
   * the message of the response
   */
  message: string
}
