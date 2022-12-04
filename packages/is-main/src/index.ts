import { createRequire } from 'node:module'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

export function isMain(meta: ImportMeta) {
  if (!meta?.url || !process.argv[1]) {
    return false
  }

  /**
   * check `process.argv[1] === fileURLToPath(meta.url)`
   *
   * process.argv[1]:
   * - node index.js -> /a/b/index.js
   * - node index -> /a/b/index
   */

  // /a/b/index -> /a/b/index.js
  const require = createRequire(meta.url)
  const scriptPath = require.resolve(process.argv[1])

  // file:///a/b/index.js -> /a/b/index.js
  const modulePath = fileURLToPath(meta.url)

  return scriptPath === modulePath
}
