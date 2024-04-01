/**
 * 调试日志打印
 */
export function debugPrint(label: string, message: any, debug?: boolean) {
  if (debug) {
    console.log(`[@ombro/h5plus] ${label}:`)
    console.log(message)
  }
}
