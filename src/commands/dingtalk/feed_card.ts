import { Utils } from '@semo/core'

import { getToken, getSecret } from '../../common/utils'
import { DingBot } from '../../common/dingbot'

export const disabled = false // Set to true to disable this command temporarily
export const plugin = 'dingtalk' // Set this for importing plugin config
export const command = 'feed-card'
export const desc = 'Send FeedCard type bot message'
export const aliases = 'feed'
// export const middleware = (argv) => {}

export const builder = function (yargs: any) {
  yargs.option('links', { describe: 'Can be multiple will format like: TITLE|MESSAGE_URL|PIC_URL' })
  // yargs.commandDir('feed_card')
}

export const handler = async function (argv: any) {
  argv.links = !argv.links || Utils._.castArray(argv.links)
  const token = await getToken(argv)
  const secret = await getSecret(argv)
  const dingbot = new DingBot(token, secret, !!argv.dryRun)

  await dingbot.sendFeedCard({
    links: argv.links
  })
}
