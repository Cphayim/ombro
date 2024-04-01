/*
 * @Author: Cphayim
 * @Date: 2021-01-28 17:12:41
 * @Description:
 */
import { injectManifest } from './init.js'
import { syncManifest } from './sync.js'
import { updateVersion } from './update-version.js'
import { buildWgt } from './wgt.js'

if (process.argv.includes('init')) {
  injectManifest()
} else if (process.argv.includes('sync')) {
  syncManifest()
} else if (process.argv.includes('update-version')) {
  updateVersion()
} else if (process.argv.includes('wgt')) {
  buildWgt()
}
