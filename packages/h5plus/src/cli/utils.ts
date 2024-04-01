import consola from 'consola'
import fs from 'fs-extra'
import path from 'path'
import { packageDirectory } from 'pkg-dir'

/**
 * 根据当前 cwd 向上寻找最近的 package.json 所在目录作为项目根目录
 */
export async function findProjectRoot(): Promise<string> {
  const root = await packageDirectory()
  if (!root) {
    consola.error('当前位置没有找到 package.json')
    process.exit(1)
  }
  return root
}

export function findManifestPath(root: string): string {
  if (fs.existsSync(path.join(root, 'public/manifest.json'))) {
    return path.join(root, 'public/manifest.json')
  } else if (fs.existsSync(path.join(root, 'manifest.json'))) {
    return path.join(root, 'manifest.json')
  } else {
    return ''
  }
}
