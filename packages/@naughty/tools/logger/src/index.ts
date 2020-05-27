/*
 * @Author: Cphayim
 * @Date: 2020-05-27 13:39:17
 * @LastEditTime: 2020-05-27 13:53:46
 * @Description: 命令行标准输出打印 logger
 */
import chalk from 'chalk'

export class Logger {
  static info(message: string, { tip = '信息' } = {}) {
    Logger.print(chalk.blue(`[${tip}]: ${message}`))
  }
  static exec(message: string, { tip = '执行' } = {}) {
    Logger.print(chalk.cyan(`[${tip}]: ${message}`))
  }
  static success(message: string, { tip = '完成' } = {}) {
    Logger.print(chalk.green(`[${tip}]: ${message}`))
  }
  static error(message: string, { tip = '错误' } = {}) {
    Logger.print(chalk.red(`[${tip}]: ${message}`))
  }
  static debug(message: string, { tip = '调试', devOnly = true } = {}) {
    if (!devOnly) {
      Logger.print(chalk.yellow(`[${tip}]: ${message}`))
    } else if (process.env.NODE_ENV === 'devlopment') {
      Logger.print(chalk.yellow(`[${tip}]: ${message}`))
    }
  }
  static print(message: string) {
    process.stdout.write(message + '\n')
  }
}
