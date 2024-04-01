/**
 * 版本更新检查和自动增量更新
 */
import { execPlus } from './plus'
import { debugPrint } from './utils'

/**
 * 版本检查选项
 */
export type CheckVersionOptions = {
  /**
   * manifest http url
   */
  manifestUrl: string
  /**
   * 静默（将不弹出 toast）
   */
  silent?: boolean
  /**
   * 将在控制台输出日志
   */
  debug?: boolean
}

/**
 * 版本检查结果
 */
export type CheckVersionResult = {
  /**
   * 是否有新版本
   */
  hasNewVersion: boolean
  /**
   * 应用 id
   */
  appid: string
  /**
   * 最新版本号
   */
  version: string
  /**
   * 最新版本 code
   */
  versionCode: number
  /**
   * manifest url
   */
  manifestUrl: string
  /**
   * manifest 信息
   */
  manifest: any
}

/**
 * 检查版本号，返回检查结果
 */
export async function checkVersion(options: CheckVersionOptions) {
  return execPlus<CheckVersionResult>(async () => {
    debugPrint('检查更新选项', options, options.debug)
    // nativeToast('检查更新中...', options.silent)

    // 当前 APPID 和 versionCode
    const { appid, versionCode } = await getAppInfo()
    debugPrint('appid 和 versionCode', `${appid} ${versionCode}`, options.debug)

    const manifest = await fetch(options.manifestUrl).then((res) => res.json())
    debugPrint('manifest', manifest, options.debug)
    // 确保是同一个 appid
    if (manifest.id !== appid) {
      throw new Error('manifest 对应的 id 和 appid 不匹配')
    }

    const result: CheckVersionResult = {
      hasNewVersion: manifest.version.code > parseInt(versionCode),
      appid: manifest.id,
      version: manifest.version.name,
      versionCode: manifest.version.code,
      manifestUrl: options.manifestUrl,
      manifest,
    }
    debugPrint(`更新检查结果`, result, options.debug)
    return result
  })
}

export type UpgradeOptions = CheckVersionOptions & {
  /**
   * wgt 下载地址或返回 wgt 下载地址的函数
   */
  wgtUrl?: string | ((result: CheckVersionResult) => string)
  /**
   * 安装后行为
   * - `restart`: 弹窗提示立即重启应用
   * - `none`: 不做处理，安装的更新将在下次启动 app 时生效
   */
  behavior?: 'restart' | 'none'
}

/**
 * 检查版本号，如果有新版本则自动更新
 */
export async function upgrade(options: UpgradeOptions) {
  const checkResult = await checkVersion(options)

  // 没有新版本
  if (!checkResult.hasNewVersion) {
    debugPrint('当前版本已经是最新版本', '', options.debug)
    return nativeToast('当前版本已经是最新版本', options.silent)
  }

  const wgtUrl =
    typeof options.wgtUrl === 'function'
      ? options.wgtUrl(checkResult)
      : options.wgtUrl ?? defaultGetWgtUrl(checkResult)
  debugPrint('wgtUrl', wgtUrl, options.debug)

  // 开始下载和安装
  return execPlus((plus) => {
    const downTask = plus.downloader.createDownload(wgtUrl, {}, (result: any, status: number) => {
      if (status === 200) {
        debugPrint('下载更新包成功', result, options.debug)
        // 安装下载的文件
        plus.runtime.install(
          result.filename,
          {},
          () => {
            debugPrint('安装更新包成功', '', options.debug)
            // 可选行为，直接重启或提示
            if (options.behavior === 'restart') {
              plus.nativeUI.alert(
                `应用已更新到 ${checkResult.version}, 需要重启应用生效`,
                () => {
                  plus.runtime.restart()
                },
                '新版本提示',
                '立即重启应用',
              )
            } else {
              // 这里始终提示 toast
              nativeToast('更新完毕，新版本将在下次启动后应用')
            }
          },
          (e: any) => {
            debugPrint('安装更新包失败', e, options.debug)
            nativeToast('安装更新包失败', options.silent)
          },
        )
      } else {
        debugPrint('下载更新包失败', result, options.debug)
        nativeToast('下载更新包失败', options.silent)
      }
    })

    downTask.start()
  })
}

const defaultGetWgtUrl = (checkResult: CheckVersionResult): string => {
  const wgtPath = `/unpackage/release/${checkResult.appid}.wgt`
  return checkResult.manifestUrl.replace('/manifest.json', wgtPath)
}

function nativeToast(message: string, silent = false) {
  return execPlus((plus) => {
    !silent && plus.nativeUI.toast(message)
  })
}

/**
 * 注意，直接通过 plus.runtime.version 获取的版本号是本地客户端的版本号，后续的增量更新不会更新该值
 * 需要通过 plus.runtime.getProperty 获取
 */
function getAppInfo() {
  return execPlus<any>(
    (plus) => new Promise((resolve) => plus.runtime.getProperty(plus.runtime.appid, resolve)),
  )
}
