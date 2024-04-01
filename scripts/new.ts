import path from 'node:path'
import { fileURLToPath } from 'node:url'

import fs from 'fs-extra'
import inquirer from 'inquirer'

const _REPO_ = path.resolve(__dirname, '..')
const _TPL_ = path.join(_REPO_, '.tpl')

type Answers = {
  folderName: string
  packageName: string
  description: string
}

/**
 * interactive create new preset package
 */
export async function createPresetPackage() {
  const { folderName, packageName, description } = await inquirer.prompt<Answers>([
    {
      name: 'folderName',
      message: 'What is package folder name?',
      validate: (input: string) => !!input || 'Folder name is required',
    },
    {
      name: 'packageName',
      message: 'What is package name?',
      default: ({ folderName }: Answers) => `@ombro/${folderName}`,
      validate: (input: string) => !!input || 'Package name is required',
      filter: (input: string) => (input.includes('/') ? input : `@ombro/${input}`),
    },
    {
      name: 'description',
      message: 'What is package description?',
    },
  ])

  const targetDir = path.join(_REPO_, 'packages', folderName)
  fs.copySync(_TPL_, targetDir)

  // overwrite package.json fields
  const packageJson = path.join(targetDir, 'package.json')
  const packageJsonData = fs.readJsonSync(packageJson)
  packageJsonData.name = packageName
  packageJsonData.description = description
  packageJsonData.repository.directory = `packages/${folderName}`
  fs.writeJsonSync(packageJson, packageJsonData, { spaces: 2 })

  // overwrite README.md
  const readmeFiles = [path.join(targetDir, 'README.md'), path.join(targetDir, 'README_zh.md')]
  readmeFiles.forEach((readmeFile) => {
    fs.writeFileSync(
      readmeFile,
      fs.readFileSync(readmeFile, 'utf8').replace(/{{PACKAGE_NAME}}/g, packageName),
      'utf8',
    )
  })

  console.log(`${packageName} created: presets/${folderName}`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  createPresetPackage()
}
