import type { FetchinResponse, FetchinResponseBody, FetchinResponseInterceptor } from '../types'
import { createErrorMessage, hasOwnProperty, logger } from '../utils'

const VERIFY_RESPONSE_BODY_META_KEY = Symbol('verifyResponseBodyInterceptor')

const verifyResponseBodyStructure = (data: FetchinResponseBody) => {
  const required: (keyof FetchinResponseBody)[] = ['code', 'message', 'data']
  const missing = required.filter((i) => !hasOwnProperty(data, i))
  if (missing.length) {
    logger.warn(`Unavailable response body data:`, data)
    logger.warn(`Missing properties:`, missing)
    logger.warn(
      `Please check the response data structure, if it is not json response, please set correct 'config.responseType'`,
    )
    throw new Error(createErrorMessage(`verifyResponseDataStructure: verify failed`))
  }
}

export const verifyResponseBodyInterceptor: FetchinResponseInterceptor = {
  onFulfilled: (response: FetchinResponse<FetchinResponseBody<any>>) => {
    const { status, data, config } = response

    // if responseType is not json, skip this interceptor
    if (config.responseType === 'json') {
      verifyResponseBodyStructure(data)
      // if message is '' or null, use default message
      response.data.message ||= config.meta.localeManager.$t(status.toString())
    }

    // passed flag
    response[VERIFY_RESPONSE_BODY_META_KEY] = true
    return response
  },
}

export type MatchResponseBodyCodeHandler =
  | boolean
  | ((response: FetchinResponse<FetchinResponseBody<any>>) => boolean | Promise<boolean>)

export type MatchResponseBodyCodeRules = Record<
  FetchinResponseBody['code'],
  MatchResponseBodyCodeHandler
>

export type MatchResponseBodyCodeInterceptorOptions = {
  /**
   * Match rules
   */
  matchRules: MatchResponseBodyCodeRules
  /**
   * Skip unmatched response
   * - `true`: skip unmatched response code
   * - `false`: throw error when unmatched response code
   * @default false
   */
  skipUnmatched?: boolean
}

const MISSING_VERIFY_RESPONSE_ERROR_MESSAGE =
  'matchResponseBodyCodeInterceptor: verifyResponseBodyInterceptor should be used before'
const UNMATCHED_RESPONSE_ERROR_MESSAGE = (code: string | number) =>
  `matchResponseBodyCodeInterceptor: Unmatched response code -> ${code}`
const BLOCKED_RESPONSE_ERROR_MESSAGE = (code: string | number) =>
  `matchResponseBodyCodeInterceptor: Blocked response code: ${code}`

export const createMatchResponseBodyCodeInterceptor = ({
  matchRules,
  skipUnmatched = false,
}: MatchResponseBodyCodeInterceptorOptions): FetchinResponseInterceptor => {
  return {
    onFulfilled: async (response) => {
      const { data, config } = response

      // if responseType is not json, skip this interceptor
      if (config.responseType !== 'json') return response

      // required verifyResponseBodyInterceptor to be used before
      if (!response[VERIFY_RESPONSE_BODY_META_KEY]) {
        throw new Error(createErrorMessage(MISSING_VERIFY_RESPONSE_ERROR_MESSAGE))
      }

      const matchHandler = matchRules[data.code]

      if (typeof matchHandler === 'undefined') {
        if (skipUnmatched) return response
        throw new Error(createErrorMessage(UNMATCHED_RESPONSE_ERROR_MESSAGE(data.code)))
      }

      let matchResult = false

      if (typeof matchHandler === 'function') {
        try {
          matchResult = await matchHandler(response)
        } catch (error) {
          logger.error(error)
        }
      }
      if (!matchResult) {
        throw new Error(createErrorMessage(BLOCKED_RESPONSE_ERROR_MESSAGE(data.code)))
      }

      return response
    },
  }
}
