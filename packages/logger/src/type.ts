declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    export interface ProcessEnv {
      /**
       * 日志等级
       */
      LOGGER_LEVEL: 'verbose' | 'info' | 'notice' | 'warn' | 'error' | 'silent'
    }
  }
}
export {}
