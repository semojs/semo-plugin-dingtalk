import { getToken, getSecret } from '../../common/utils'
import { DingBot } from '../../common/dingbot'

export const disabled = false // Set to true to disable this command temporarily
export const plugin = 'dingtalk' // Set this for importing plugin config
export const command = 'link <title> <text> <messageUrl>'
export const desc = 'Send link type bot message'
// export const aliases = ''
// export const middleware = (argv) => {}

export const builder = function (yargs: any) {
  yargs.option('pic-url', { describe: 'Link picture url', alias: 'pic' })
  // yargs.commandDir('link')
}

export const handler = async function (argv: any) {
  const token = await getToken(argv)
  const secret = await getSecret(argv)
  const dingbot = new DingBot(token, secret, !!argv.dryRun)

  await dingbot.sendLink({
    title: argv.title,
    text: argv.text,
    messageUrl: argv.messageUrl,
    picUrl: argv.picUrl
  })
}
