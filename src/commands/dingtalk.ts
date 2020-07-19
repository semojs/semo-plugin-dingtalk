import { Utils } from '@semo/core'

export const disabled = false // Set to true to disable this command temporarily
// export const plugin = '' // Set this for importing plugin config

export const plugin = 'dingtalk'
export const command = 'dingtalk'
export const desc = 'Send message to Dingtalk'
export const aliases = 'ding'
// export const middleware = (argv) => {}

export const builder = function (yargs: any) {
  yargs.option('token', { describe: 'Set Dingtalk token' })
  yargs.option('secret', { describe: 'Set Dingtalk secret' })
  yargs.option('dry-run', { describe: 'Dry run, not sent to DingTalk' })
  Utils.extendSubCommand('dingtalk', 'semo-plugin-dingtalk', yargs, __dirname)
}

export const handler = async function (argv: any) {
}
