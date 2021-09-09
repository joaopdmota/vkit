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
    const body = (options.method !== 'GET' && JSON.stringify(params)) || null

    if (options.method === 'GET') {
      const args = Object.keys(params).map((key) => `${key}=${params[key]}`)
      const queryString = `?${args.join('&')}`
      router += queryString
    }

    const fetchWithTimeout = setTimeout(() => {
      clearTimeout(fetchWithTimeout)
      window.stop()
    }, this.timeout)

    const fetchOnError = (response: Response): {} => {
      onError?.(response)
      return {}
    }

    try {
      const response = await fetch(`${this.uri}${router}`, {
        headers: this.headers,
        ...options,
        body,
      })
      const data = response?.ok ? (await response?.json()) || {} : fetchOnError(response)

      return data
    } catch (error) {
      this.onError?.(error)
    }
  },
}

export default apiService
