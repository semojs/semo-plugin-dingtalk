import fs from 'fs'
import path from 'path'
import { Utils } from '@semo/core'

import { getToken, getSecret } from '../../common/utils'
import { DingBot } from '../../common/dingbot'

export const disabled = false // Set to true to disable this command temporarily
export const plugin = 'dingtalk' // Set this for importing plugin config
export const command = 'action-card [text]'
export const desc = 'Send ActionCard type bot message'
export const aliases = 'action'
// export const middleware = (argv) => {}

export const builder = function (yargs: any) {
  yargs.option('file', { describe: 'if set, text will be used as markdown file path in current directory.' })
  yargs.option('btn-orientation', { describe: 'if set, btns will be horizontal!' })
  yargs.option('btns', { describe: 'Multiple buttons, format like: TITLE|LINK' })
  yargs.option('title', { default: 'ActionCard Message', describe: 'Title will be used in stream.' })
  yargs.option('single', { describe: 'Single button, format: TITLE|LINK, if set, btns will be ignored.' })
  // yargs.commandDir('action_card')
}

export const handler = async function (argv: any) {
  argv.btns = argv.btns ? Utils._.castArray(argv.btns) : false

  let text = argv.text
  if (argv.file) {
    if (fs.existsSync(path.resolve(process.cwd(), argv.file))) {
      text = fs.readFileSync(path.resolve(process.cwd(), argv.file), { encoding: 'utf8' })
    } else {
      Utils.error('Markdown file not exist')
    }
  }

  if (argv.single) {
    let split = argv.single.split('|')
    argv.singleTitle = split[0] || ''
    argv.singleUrl = split[1] || ''
  }

  const token = await getToken(argv)
  const secret = await getSecret(argv)
  const dingbot = new DingBot(token, secret, !!argv.dryRun)

  await dingbot.sendActionCard({
    title: argv.title,
    text,
    btnOrientation: argv.btnOrientation,
    btns: argv.btns,
    singleTitle: argv.singleTitle,
    singleUrl: argv.singleUrl
  })
}
