import { LocaleManager } from '@ombro/fetchin-locale'
import axios, { type AxiosInstance } from 'axios'

import { serializeConfig } from './config'
import type {
  FetchinConfig,
  FetchinMeta,
  FetchinRequestConfig,
  FetchinRequestInterceptor,
  FetchinResponse,
  FetchinResponseInterceptor,
} from './types'

export class Fetchin {
  private localeManager: LocaleManager

  private _inst!: AxiosInstance

  get inst(): AxiosInstance {
    return this._inst
  }

  private config: FetchinConfig<any, true>

  constructor(config: FetchinConfig = {}) {
    this.localeManager = new LocaleManager(config.locales)

    const meta: FetchinMeta = {
      localeManager: this.localeManager,
    }

    // merge config and inject meta
    this.config = { ...serializeConfig(config), ...{ meta } }

    this.createInstance()
  }

  private createInstance() {
    this._inst = axios.create(this.config)

    // bind interceptors
    const { requestInterceptors, responseInterceptors } = this.config
    if (requestInterceptors)
      requestInterceptors.forEach((interceptor) => this.addRequestInterceptor(interceptor))
    if (responseInterceptors)
      responseInterceptors.forEach((interceptor) => this.addResponseInterceptor(interceptor))
  }

  /**
   * get request
   */
  get<T = any, R = FetchinResponse<T>, D = any>(
    url: string,
    config?: FetchinRequestConfig<D>,
  ): Promise<R> {
    return this._inst.get(url, config)
  }

  /**
   * post request
   */
  post<T = any, R = FetchinResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: FetchinRequestConfig<D>,
  ): Promise<R> {
    return this._inst.post(url, data, config)
  }

  /**
   * put request
   */
  put<T = any, R = FetchinResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: FetchinRequestConfig<D>,
  ): Promise<R> {
    return this._inst.put(url, data, config)
  }

  /**
   * patch request
   */
  patch<T = any, R = FetchinResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: FetchinRequestConfig<D>,
  ): Promise<R> {
    return this._inst.patch(url, data, config)
  }

  /**
   * delete request
   */
  delete<T = any, R = FetchinResponse<T>, D = any>(
    url: string,
    config?: FetchinRequestConfig<D>,
  ): Promise<R> {
    return this._inst.delete(url, config)
  }

  /**
   * post form request
   */
  postForm<T = any, R = FetchinResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: FetchinRequestConfig<D>,
  ): Promise<R> {
    return this._inst.postForm(url, data, config)
  }

  /**
   * put form request
   */
  putForm<T = any, R = FetchinResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: FetchinRequestConfig<D>,
  ): Promise<R> {
    return this._inst.putForm(url, data, config)
  }

  /**
   * patch form request
   */
  patchForm<T = any, R = FetchinResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: FetchinRequestConfig<D>,
  ): Promise<R> {
    return this._inst.patchForm(url, data, config)
  }

  request<T = any, R = FetchinResponse<T>, D = any>(config: FetchinRequestConfig<D>): Promise<R> {
    return this._inst.request(config)
  }

  /**
   * get full request uri
   */
  getUri(config?: FetchinConfig): string {
    return this._inst.getUri(config)
  }

  /**
   * add request interceptor
   */
  addRequestInterceptor(interceptor: FetchinRequestInterceptor) {
    return this._inst.interceptors.request.use(
      interceptor.onFulfilled as any,
      interceptor.onRejected,
      interceptor.options,
    )
  }

  /**
   * add response interceptor
   */
  addResponseInterceptor(interceptor: FetchinResponseInterceptor) {
    return this._inst.interceptors.response.use(
      interceptor.onFulfilled as any,
      interceptor.onRejected,
      interceptor.options,
    )
  }

  /**
   * remove request interceptor
   */
  removeRequestInterceptor(id: number) {
    this._inst.interceptors.request.eject(id)
  }

  /**
   * remove response interceptor
   */
  removeResponseInterceptor(id: number) {
    this._inst.interceptors.response.eject(id)
  }
}

export function createFetchin(config?: FetchinConfig) {
  return new Fetchin(config)
}
