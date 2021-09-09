function getIsUserAgent(device: string): boolean {
  const exp = `.*${device}.*`
  const reg = new RegExp(exp, 'i')

  return !!reg.test(navigator.userAgent)
}

export default getIsUserAgent
