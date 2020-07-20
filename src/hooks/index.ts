import { DingBot } from '../common/dingbot'
import { getToken, getSecret } from '../common/utils'

export = async (Utils, argv) => {
  return {
    hook_hook: new Utils.Hook('semo', {
      token: 'Set Dingtalk token',
      secret: 'Set Dingtalk secret',
    }),
    hook_repl: new Utils.Hook('semo', async () => {
      const token = await getToken(argv)
      const secret = await getSecret(argv)
      const dingbot = new DingBot(token, secret)
      return { dingbot }
    }),
    hook_component: new Utils.Hook('semo', async () => {
      const token = await getToken(argv)
      const secret = await getSecret(argv)
      const dingbot = new DingBot(token, secret)
      return { dingbot }
    }),
  }
}