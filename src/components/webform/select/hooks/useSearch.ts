import { useState, ChangeEvent, useCallback, useEffect, useRef } from 'react'
import { filterData, requestData, debounce, deepCopy } from '../actions'

import DataType from 'components/webform/select/types/data.type'

interface useListInterface {
  data?: DataType[] | null
  setContentList: Function
  options?: {
    requestHeaders?: { [key: string]: string }
    requestPageParam?: string
    requestParams?: { [key: string]: string | number }
    requestResponseRootPath?: string
    requestResponseText?: string
    requestResponseValue?: string
    requestRouter?: string
    requestSearchParam?: string
    requestUri?: string
  }
}

const useList = ({
  data,
  setContentList,
  options,
}: useListInterface): {
  onSearch: (...item: any) => void
  setTerm: Function
  useTerm: string
} => {
  const [useTerm, setTerm] = useState<string>('')
  const termHelperRef = useRef<string>('')

  const request = useCallback(
    async ({ term, page }: { term?: string; page?: number }): Promise<any> => {
      const {
        requestPageParam,
        requestParams,
        requestResponseRootPath,
        requestResponseText,
        requestResponseValue,
        requestSearchParam,
        requestRouter,
        requestUri,
        requestHeaders,
      } = options || {}

      if (!data && requestResponseText && requestResponseValue && requestRouter) {
        const params = deepCopy(requestParams) || {}

        if (requestSearchParam && typeof term === 'string') {
          params[requestSearchParam] = term
        }

        if (requestPageParam && page) {
          params[requestPageParam] = page
        }

        return requestData({
          headers: new Headers(requestHeaders),
          params,
          responseText: requestResponseText,
          responseValue: requestResponseValue,
          rootPath: requestResponseRootPath,
          router: requestRouter,
          uri: requestUri,
        })
      }
    },
    [options, data],
  )

  const loadRequestData = useCallback(
    async ({ term, page }: { term?: string; page?: number }): Promise<void> => {
      if (!page || page === 1) {
        setContentList([])
      }

      const contentList = await request({ term, page })

      setContentList(contentList.length > 0 ? contentList : null)
    },
    [request, setContentList],
  )

  const requestOrFilter = useCallback(
    async (term: string): Promise<void> => {
      if (typeof term === 'string' && (term.length >= 2 || term.length === 0)) {
        const { requestResponseText, requestResponseValue, requestRouter } = options || {}

        if (!data && requestResponseText && requestResponseValue && requestRouter) {
          loadRequestData({ term })
        } else {
          const contentList = filterData(data, term)
          setContentList(contentList)
        }
      } else {
        setContentList(data || null)
      }
    },
    [data, options, loadRequestData, setContentList],
  )

  const onSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    const term = event?.target?.value ?? ''
    termHelperRef.current = term
    setTerm(term)
    debounce(() => requestOrFilter(term))
  }

  useEffect(() => {
    if (data) {
      const contentList = termHelperRef.current ? filterData(data, termHelperRef.current) : data
      setContentList(contentList || null)
    }
  }, [data, setContentList])

  return {
    onSearch,
    setTerm,
    useTerm,
  }
}

export default useList
