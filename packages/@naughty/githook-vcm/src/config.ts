/*
 * @Author: Cphayim
 * @Date: 2019-05-25 11:08:26
 * @LastEditTime: 2019-05-25 12:26:53
 * @Description:
 */

export interface VCMOptions {
  // 允许合并
  allowMerge: boolean
  // 强制 type
  type: boolean
  // 强制 scope
  scope: boolean
  // 最大消息长度
  max: number
}

export const defaultOptions: VCMOptions = {
  allowMerge: false,
  type: true,
  scope: true,
  max: 50
}
