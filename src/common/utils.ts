export const getToken = async (argv) => {
  const { Utils } = argv.$semo

  let token = Utils.config('$plugin.dingtalk.token')

  if (!token) {
    token = await Utils.invokeHook('dingtalk:token', { mode: 'replace' })
  }

  if (!token) {
    throw new Error('Invalid token.')
  }

  return token
}

export const getSecret = async (argv) => {
  const { Utils } = argv.$semo

  let secret = Utils.config('$plugin.dingtalk.secret')

  if (!secret) {
    secret = await Utils.invokeHook('dingtalk:secret', { mode: 'replace' })
  }

  if (!secret) {
    throw new Error('Invalid secret.')
  }

  return secret
}


