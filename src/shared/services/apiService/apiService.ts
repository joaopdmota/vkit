import { ApiServiceType, RequestType } from './types/apiService.type'

const options: ApiServiceType = {
  headers: new Headers({}),
  onError: ({}) => {},
  uri: '',
  timeout: 10000,
}

const apiService = {
  ...options,
  config(options: ApiServiceType): void {
    Object.assign(this, options)
  },
  async request({
    router = '',
    options = {
      cache: 'default',
      method: 'GET',
      mode: 'cors',
    },
    params = {},
    onError = () => {},
  }: RequestType): Promise<any> {
    const mountQuery = (
      paramsFilter: { [key: string]: string | string[] },
      key: string,
    ): string => {
      if (Array.isArray(paramsFilter[key])) {
        const querys = (paramsFilter[key] as string[]).map((item: string) => `${key}[]=${item}`, '')

        return querys.join('&')
      } else {
        return `${key}=${params[key]}`
      }
    }

    const body =
      params instanceof FormData
        ? params
        : (options.method !== 'GET' && JSON.stringify(params)) || null

    if (options.method === 'GET') {
      const args = Object.keys(params).map((key) => mountQuery(params, key))
      const queryString = `?${args.join('&')}`
      router += queryString
    }

    const fetchWithTimeout = setTimeout(() => {
      clearTimeout(fetchWithTimeout)
      window.stop()
    }, this.timeout)

    const fetchOnError = (response: Response): void => {
      onError?.(response)
    }

    const response = await fetch(`${this.uri}${router}`, {
      headers: this.headers,
      ...options,
      body,
    })

    const responseClone = response.clone()
    const hasData = await responseClone.text()
    const responseData = hasData ? await response.json() : {}

    const data = response.ok ? responseData : fetchOnError(response)

    return data
  },
}

export default apiService
