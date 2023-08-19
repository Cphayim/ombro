import { originalRequestTransformers, originalResponseTransformers } from './transformer'
import type { FetchinConfig } from './types'

export function createDefaultFetchinConfig(): FetchinConfig {
  return {
    requestTransformers: originalRequestTransformers,
    responseTransformers: originalResponseTransformers,
    keepDefaultTransformers: true,

    requestInterceptors: [],
    responseInterceptors: [],
    keepDefaultInterceptors: true,

    // The responseType is used in the interceptor to determine if the response is json,
    // so the default value is given, unless manually modified by the user
    responseType: 'json',
  }
}

export function serializeConfig(
  config: FetchinConfig,
  defaultConfig?: FetchinConfig,
): FetchinConfig {
  if (!defaultConfig) {
    defaultConfig = createDefaultFetchinConfig()
  }

  const merged = { ...defaultConfig, ...config }

  if (merged.keepDefaultTransformers) {
    merged.requestTransformers = mergeArray(
      defaultConfig.requestTransformers,
      config.requestTransformers,
    )
    merged.responseTransformers = mergeArray(
      defaultConfig.responseTransformers,
      config.responseTransformers,
    )
  }
  // axios uses `transformRequest` and `transformResponse`
  merged.transformRequest = merged.requestTransformers
  merged.transformResponse = merged.responseTransformers

  if (merged.keepDefaultInterceptors) {
    merged.requestInterceptors = mergeArray(
      defaultConfig.requestInterceptors,
      config.requestInterceptors,
    )
    merged.responseInterceptors = mergeArray(
      defaultConfig.responseInterceptors,
      config.responseInterceptors,
    )
  }

  return merged
}

function mergeArray<T>(a: T[] | undefined, b: T[] | undefined): T[] {
  return [...(a ?? []), ...(b ?? [])]
}
