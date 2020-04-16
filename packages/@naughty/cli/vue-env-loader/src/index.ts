/*
 * @Author: Cphayim
 * @Date: 2020-04-10 11:05:47
 * @LastEditTime: 2020-04-15 14:45:14
 * @Description: Vue 项目 env 文件扫描注入环境变量
 */
import path from 'path'
import { argv } from 'yargs'
import { config } from 'dotenv'

interface VueEnvLoaderOptions {
  envPath?: string
  customName?: string
}

export class VueEnvLoader {
  private path: string = process.cwd()
  private mode: string[] = []
  private files: string[] = []

  private customName = 'custom-env'

  constructor({ envPath, customName }: VueEnvLoaderOptions = {}) {
    this.path = envPath || this.path
    this.mode = this.parseMode()
    this.files = this.parseFiles()
    this.customName = customName || this.customName
  }

  private parseMode(): Array<string> {
    /**
     * 从命令行参数中获取 --env-mode 参数的值，可能是一个或用 ',' 分隔的多个值
     */
    const envMode = (argv.envMode as string) || ''
    return envMode.split(',').filter((item) => item /* 过滤掉 ',a,,b,' 类似这样写法产生的空字符串 */)
  }

  private parseFiles(): Array<string> {
    /**
     * 从 mode 数组中解析出文件路径
     * 注意：无论任何模式（--env-mode）, .env 文件始终加载，但优先级最低
     * 应当包含 .local 后缀的文件
     */
    const files = []
    files.push(path.join(this.path, `.env`))
    files.push(path.join(this.path, `.env.local`))
    this.mode.forEach((item) => {
      files.push(path.join(this.path, `.env.${item}`))
      files.push(path.join(this.path, `.env.${item}.local`))
    })
    return files
  }

  private getInjectHandle(envs: any, originHandle: any): Function {
    return (config: any) => {
      // 如果配置项中存在 chainWebpack 处理回调，先调用
      if (typeof originHandle === 'function') {
        originHandle(config)
      }
      config.plugin('define').tap((definitions: [any]) => {
        // process.env
        Object.entries(envs).map(([key, value]) => {
          definitions[0]['process.env'][key] = JSON.stringify(value)
        })
        return definitions
      })
    }
  }

  /**
   * 注入
   * @param vueConfig
   */
  inject(vueConfig: any = {}) {
    /**
     * 1.加载所有有效的 .env 文件中的环境变量
     *   例如命令行指定 --env-mode=dev 则加载 .env 和 .env.dev 两个文件，同名变量后者覆盖前者
     *   不指定则只加载 .env 文件
     *   允许文件不存在
     * 2.将环境变量对象注入函数合并到 vueConfig 配置项中
     */
    const envObjs = this.files.map((file) => {
      return config({ path: file, encoding: 'utf-8' }).parsed || {}
    })
    const mergeEnv = Object.assign({}, ...envObjs)
    // 若存在 CUSTOM_ENV 则加入
    mergeEnv[this.customName] = argv[this.customName]
    vueConfig.chainWebpack = this.getInjectHandle(mergeEnv, vueConfig.chainWebpack)
    return vueConfig
  }
}
