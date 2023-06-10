import { type UserConfigExport, defineConfig } from 'vite'

import { createBuild } from '../../scripts/vite.base.config'

export default defineConfig(({ mode }) => {
  const build = createBuild({ mode, root: __dirname })

  const config: UserConfigExport = {
    build,
    plugins: [],
  }

  return config
})
