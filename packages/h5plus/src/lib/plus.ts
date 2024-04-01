declare const plus: any

export type ExecPlusCallback<T = any> = (plus: any) => T | Promise<T>

export function execPlus<T = any>(cb: ExecPlusCallback<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const run = async () => {
      try {
        const result = await cb(plus)
        resolve(result)
      } catch (error) {
        reject(error)
      }
    }

    if (typeof plus !== 'undefined') {
      run()
    } else {
      document.addEventListener('plusready', run)
    }
  })
}
