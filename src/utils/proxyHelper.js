const addProxy = (url) => {
  const proxyUrl = new URL('/get', 'https://allorigins.hexlet.app')
  proxyUrl.searchParams.set('url', url)
  proxyUrl.searchParams.set('disableCache', 'true')
  return proxyUrl.toString()
}

export default addProxy
