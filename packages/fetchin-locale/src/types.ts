/**
 * The locale of key-value
 */
export type LocaleContent = Record<string, string>

/**
 * The locale config
 */
export interface Locale {
  /**
   * The locale name, such as `en_US`
   */
  name: string
  /**
   * The locale region, such as `US`
   */
  region?: string
  /**
   * The locale content of key-value
   */
  content: LocaleContent
}
