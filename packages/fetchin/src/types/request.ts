import type { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

/**
 * Fetchin request headers
 */
export type FetchinRequestHeaders = AxiosRequestHeaders

/**
 * Fetchin request config
 */
export type FetchinRequestConfig<D = any> = AxiosRequestConfig<D>
