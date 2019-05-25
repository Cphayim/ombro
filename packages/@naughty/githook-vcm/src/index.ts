/*
 * @Author: Cphayim
 * @Date: 2019-05-25 11:04:53
 * @LastEditTime: 2019-05-25 12:42:14
 * @Description: GIT_COMMIT_MESSAGE HOOK
 */

import yargs from 'yargs'

import { defaultOptions } from './config'
import { mergeOptions, getCommitMessage, verify } from './util'

const argv = yargs.argv

const options = mergeOptions(argv, defaultOptions)
const messge = getCommitMessage()
const isValid = verify(messge, options)

if (!isValid) process.exit(1)
