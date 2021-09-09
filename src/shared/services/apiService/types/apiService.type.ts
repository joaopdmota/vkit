export type ApiServiceType = {
  headers?: Headers
  uri: any
  timeout?: number
  onError?: ({}: Error) => any
}

export type RequestType = {
  router: string
  options?: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    [key: string]: any
  }
  params?: {
    [key: string]: any
  }
  onError?: ({}: Response) => any
}
