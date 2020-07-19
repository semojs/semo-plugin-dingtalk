import { getToken, getSecret } from '../../common/utils'
import { DingBot } from '../../common/dingbot'
import { Utils } from '@semo/core'

export const disabled = false // Set to true to disable this command temporarily
export const plugin = 'dingtalk' // Set this for importing plugin config
export const command = 'text <content>'
export const desc = 'Send text type bot message'
// export const aliases = ''
// export const middleware = (argv) => {}

export const builder = function (yargs: any) {
  yargs.option('at', { describe: '@PHONE_NUMBER' })
  yargs.option('at-all', { describe: '@ALL', alias: 'all' })
}

export const handler = async function (argv: any) {
  argv.at = Utils._.castArray(argv.at)
  const token = await getToken(argv)
  const secret = await getSecret(argv)
  const dingbot = new DingBot(token, secret, !!argv.dryRun)

  await dingbot.sendText({
    content: argv.content,
    at: argv.at,
    atAll: argv.atAll
  })
}
