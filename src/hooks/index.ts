import { DingBot } from '../common/dingbot'
import { getToken, getSecret } from '../common/utils'

export = async (Utils) => {
  const token = await getToken(Utils.getInternalCache().get('argv'))
  const secret = await getSecret(Utils.getInternalCache().get('argv'))
  const dingbot = new DingBot(token, secret)

  return {
    hook_hook: new Utils.Hook('semo', {
      token: 'Set Dingtalk token',
      secret: 'Set Dingtalk secret',
    }),
    hook_repl: new Utils.Hook('semo', { dingbot }),
    hook_component: new Utils.Hook('semo', { dingbot }),
  }
}