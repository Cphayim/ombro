import { en_US } from './locales'
import type { Locale } from './types'

const DEFAULT_LOCALE = en_US

export class LocaleManager {
  /**
   * save all enabled locales
   */
  private _map: Map<string, Locale> = new Map()

  private _currentLang: string = DEFAULT_LOCALE.name
  get currentLang() {
    return this._currentLang
  }
  set currentLang(name: string) {
    if (this._map.has(name)) {
      this._currentLang = name
    } else {
      console.warn(`can not found locale: ${name}`)
    }
  }

  get currentLocale(): Locale {
    return this._map.get(this.currentLang) ?? DEFAULT_LOCALE
  }

  constructor(locales?: Locale[]) {
    this._init(locales)
  }

  private _init(locales: Locale[] = []) {
    /**
     * set default locale
     */
    this._map.set(DEFAULT_LOCALE.name, DEFAULT_LOCALE)

    /**
     * set user locales
     */
    locales.forEach((locale) => {
      this._map.set(locale.name, locale)
    })

    /**
     * set the current locale to the first locale passed by the user
     */
    this.currentLang = locales[0]?.name ?? DEFAULT_LOCALE.name
  }

  /**
   * finds the specified translation result
   *
   * - when name is passed in, the locale corresponding to name is used
   * - when name is not passed in, the current locale is used
   * - when the specified locale does not exist, the default locale is used
   */
  $t(key: string, name?: string): string {
    const locale = name ? this._map.get(name) : this.currentLocale
    const translateText = locale?.content[key] ?? DEFAULT_LOCALE.content[key]

    if (!translateText) {
      console.warn(`can not found key text in current locale: ${key}]`)
    }

    return translateText
  }
}
