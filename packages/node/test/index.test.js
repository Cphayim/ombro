/* eslint-disable no-undef */
import path from 'path'
import execa from 'execa'

describe('@ombro/node', () => {
  test('can be successfully compiled and executed a test script', () => {
    const bin = path.resolve(__dirname, '../bin/ombro-node.js')
    const script = path.resolve(__dirname, './script.js')
    let exitCode
    try {
      const result = execa.commandSync(`node ${bin} ${script}`, { stdio: 'ignore' })
      exitCode = result.exitCode
    } catch (error) {
      console.error(error)
      exitCode = error.exitCode
    }
    expect(exitCode).toBe(0)
  })
})
