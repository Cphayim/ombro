import { type UserConfigExport, defineConfig } from 'vite'

import { addDTSPlugin, createBuild } from '../../scripts/vite.base.config'

export default defineConfig(({ mode }) => {
  const build = createBuild({ mode, root: __dirname })
  build.rollupOptions = {
    external: ['vue'],
  }

  const config: UserConfigExport = {
    build,
    plugins: [],
  }

  // generate dts file
  addDTSPlugin(config, { mode, root: __dirname })

  return config
})
