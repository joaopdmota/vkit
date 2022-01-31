import { useEffect, useRef } from 'react'
import { requestData, deepCopy } from '../actions'

interface useListInterface {
  autoRequest?: boolean
  onRequestFinish?: Function
  setContentList: Function
  options: {
    requestPageParam?: string
    requestHeaders?: { [key: string]: string }
    requestParams?: { [key: string]: string | number }
    requestResponseRootPath?: string
    requestResponseText?: string
    requestResponseValue?: string
    requestRouter?: string
    requestSearchParam?: string
    requestUri?: string
  }
}

const useAutoRequest = ({
  autoRequest,
  onRequestFinish,
  setContentList,
  options,
}: useListInterface): void => {
  const started = useRef<boolean>(false)

  useEffect((): void => {
    const {
      requestHeaders,
      requestPageParam,
      requestParams,
      requestResponseRootPath,
      requestResponseText,
      requestResponseValue,
      requestRouter,
      requestUri,
    } = options

    const loadPage = async (): Promise<void> => {
      try {
        started.current = true

        setContentList([])

        const params = deepCopy(requestParams) || {}

        if (requestPageParam) {
          params[requestPageParam] = 1
        }

        const content = await requestData({
          headers: new Headers(requestHeaders),
          params,
          responseText: requestResponseText ?? '',
          responseValue: requestResponseValue ?? '',
          rootPath: requestResponseRootPath,
          router: requestRouter ?? '/',
          uri: requestUri,
        })

        const listContent = content?.length ? content : null

        setContentList(listContent)
        onRequestFinish?.(listContent, params)
      } catch (error) {
        setContentList(null)
      }
    }

    if (
      requestResponseText &&
      requestResponseValue &&
      requestRouter &&
      !started.current &&
      autoRequest
    ) {
      loadPage()
    }
  }, [autoRequest, options, setContentList, onRequestFinish])
}

export default useAutoRequest
