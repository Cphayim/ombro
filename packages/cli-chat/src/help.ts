import { colors } from '@ombro/logger'

export function printHelp() {
  const content = `
OChat is a command line interface chat tool. With the help of OpenAI services, it can answer any question you have.

> start chatting with GPT-3.5:
  ${colors.bold('ochat')}

> start chatting with GPT-4:
  ${colors.bold('ochat --gpt-4')}

> read configuration:
  ${colors.bold('ochat config')}

> setup configuration:
  ${colors.bold('ochat config set')}

> view version
  ${colors.bold('ochat --version')}
  `.trim()

  console.log(content)
}
