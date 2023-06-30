import type { Locale, LocaleManager } from '@ombro/fetchin-locale'
import type { AxiosRequestConfig } from 'axios'

import type { FetchinRequestInterceptor, FetchinResponseInterceptor } from './interceptor'
import type { FetchinRequestTransformer, FetchinResponseTransformer } from './transformer'

export interface FetchBaseConfig {
  /**
   * request interceptors
   */
  requestInterceptors?: FetchinRequestInterceptor[]
  /**
   * response interceptors
   */
  responseInterceptors?: FetchinResponseInterceptor[]
  /**
   * whether to keep the default interceptors
   * - `true`: The `requestInterceptors` and `responseInterceptors` passed in will be push to the default interceptor list
   * - `false`: The `requestInterceptors` and `responseInterceptors` passed in will override the default interceptor list
   * @default true
   */
  keepDefaultInterceptors?: boolean

  /**
   * request transformers
   */
  requestTransformers?: FetchinRequestTransformer[]
  /**
   * response transformers
   */
  responseTransformers?: FetchinResponseTransformer[]
  /**
   * whether to keep the default interceptors
   * - `true`: The `requestTransformers` and `responseTransformers` passed in will be push to the default transformer list
   * - `false`: The `requestTransformers` and `responseTransformers` passed in will override the default transformer list
   * @default true
   */
  keepDefaultTransformers?: boolean

  /**
   * locale config
   */
  locales?: Locale[]
}

export type FetchinMeta = {
  localeManager: LocaleManager
  [key: string]: any
}

export type FetchinMetaConfig<M = false> = M extends true
  ? {
      /**
       * fetchin meta, will be injected at initialization
       */
      meta: FetchinMeta
    }
  : unknown

/**
 * Fetchin configuration
 */
export type FetchinConfig<D = any, M = false> = AxiosRequestConfig<D> &
  FetchBaseConfig &
  FetchinMetaConfig<M>
