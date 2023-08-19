import type { AxiosInterceptorOptions } from 'axios'

import type { FetchinConfig, FetchinResponse } from '../types'

/**
 * A type representing a callback function for a fulfilled request interceptor.
 * @param config - The request configuration object that will be passed to the interceptor.
 * @returns A new request configuration object, or a promise that resolves with the new request configuration object.
 */
export type FetchinRequestInterceptorFulfilled = (
  config: FetchinConfig<any, true>,
) => FetchinConfig | Promise<FetchinConfig>

/**
 * A type representing a callback function for a fulfilled response interceptor.
 * @param response - The response object that will be passed to the interceptor.
 * @returns A new response object, or a promise that resolves with the new response object.
 */
export type FetchinResponseInterceptorFulfilled = (
  response: FetchinResponse,
) => FetchinResponse | Promise<FetchinResponse>

/**
 * A type representing a callback function for a rejected interceptor.
 * @param error - The error that caused the rejection of the interceptor.
 * @returns The modified or new error object, or a promise that rejects with the modified or new error object.
 */
export type FetchinInterceptorRejected = (error: any) => any

export type FetchinInterceptorOptions = AxiosInterceptorOptions

/**
 * An interface representing a Fetchin interceptor.
 *
 * @typedef T - Type of the interceptor's onFulfilled callback function.
 */
export interface FetchinInterceptor<
  T extends FetchinRequestInterceptorFulfilled | FetchinResponseInterceptorFulfilled,
> {
  /**
   * A callback function that will be called if the interceptor fulfills successfully.
   */
  onFulfilled: T
  /**
   * An optional callback function that will be called if the interceptor rejects.
   */
  onRejected?: FetchinInterceptorRejected
  /**
   * An optional object representing the interceptor's options.
   */
  options?: FetchinInterceptorOptions
}

export type FetchinRequestInterceptor = FetchinInterceptor<FetchinRequestInterceptorFulfilled>
export type FetchinResponseInterceptor = FetchinInterceptor<FetchinResponseInterceptorFulfilled>
