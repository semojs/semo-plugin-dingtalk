import fs from 'fs'
import path from 'path'
import { Utils } from '@semo/core'

import { getToken, getSecret } from '../../common/utils'
import { DingBot } from '../../common/dingbot'

export const disabled = false // Set to true to disable this command temporarily
export const plugin = 'dingtalk' // Set this for importing plugin config
export const command = 'markdown [text]'
export const desc = 'Send markdown type bot message'
export const aliases = 'md'
// export const middleware = (argv) => {}

export const builder = function (yargs: any) {
  yargs.option('at', { describe: '@PHONE_NUMBER' })
  yargs.option('at-all', { describe: '@ALL', alias: 'all' })
  yargs.option('file', { describe: 'If set, text will be used as markdown file path in current directory.' })
  yargs.option('title', { default: 'Markdown Message', describe: 'Title will be used in stream.' })
  // yargs.option('option', { default, describe, alias })
  // yargs.commandDir('markdown')
}

export const handler = async function (argv: any) {
  argv.at = Utils._.castArray(argv.at)

  let text = argv.text
  if (argv.file) {
    if (fs.existsSync(path.resolve(process.cwd(), argv.file))) {
      text = fs.readFileSync(path.resolve(process.cwd(), argv.file), { encoding: 'utf8' })
    } else {
      Utils.error('Markdown file not exist')
    }
  }

  const token = await getToken(argv)
  const secret = await getSecret(argv)
  const dingbot = new DingBot(token, secret, !!argv.dryRun)

  await dingbot.sendMarkdown({
    title: argv.title,
    text,
    at: argv.at,
    atAll: argv.atAll
  })
}
