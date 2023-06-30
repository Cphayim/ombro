import type { FetchinRequestInterceptor } from '../types/interceptor'

type Token = string | undefined

export type BearerAuthRequestInterceptorOptions = {
  /**
   * A function that returns the bearer token.
   */
  getBearerToken?: () => Token | Promise<Token>
  /**
   * The header key of the bearer token.
   * @default 'Authorization'
   */
  headerKey?: string
}

export const createBearerAuthRequestInterceptor = ({
  getBearerToken,
  headerKey = 'Authorization',
}: BearerAuthRequestInterceptorOptions = {}): FetchinRequestInterceptor => {
  return {
    onFulfilled: async (config) => {
      // if not passed `getBearerToken`, skip this interceptor
      if (!getBearerToken) return config

      const token = await getBearerToken()
      if (token) {
        !config.headers && (config.headers = {})
        config.headers[headerKey] = `Bearer ${token}`
      }
      return config
    },
  }
}
