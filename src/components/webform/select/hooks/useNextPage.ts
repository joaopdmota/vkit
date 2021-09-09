import { useEffect, useRef } from 'react'
import { requestData, deepCopy } from '../actions'

import DataType from 'components/webform/select/types/data.type'

interface useListInterface {
  usePage: number
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

const useNextPAge = ({
  usePage,
  setContentList,
  options,
}: useListInterface): {
  isFinished: boolean
} => {
  const pageRef = useRef<number>(1)
  const finishedRef = useRef<boolean>(false)

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

    const loadNextPage = async (): Promise<void> => {
      try {
        pageRef.current = usePage

        if (!usePage || usePage === 1) {
          setContentList([])
        }

        const params = deepCopy(requestParams) || {}

        if (requestPageParam && usePage) {
          params[requestPageParam] = usePage
        }

        const nexPage =
          (await requestData({
            headers: new Headers(requestHeaders),
            params,
            responseText: requestResponseText ?? '',
            responseValue: requestResponseValue ?? '',
            rootPath: requestResponseRootPath,
            router: requestRouter ?? '/',
            uri: requestUri,
          })) || []

        if (nexPage.length === 0) {
          finishedRef.current = true
        }

        setContentList((prevData: DataType[]): DataType[] | null => {
          if (prevData?.length > 0 || nexPage.length > 0) {
            return [...prevData, ...nexPage]
          }

          return null
        })
      } catch (error) {
        setContentList(null)
      }
    }

    if (
      requestResponseText &&
      requestResponseValue &&
      requestRouter &&
      pageRef.current !== usePage &&
      !finishedRef.current
    ) {
      loadNextPage()
    }
  }, [usePage, options, setContentList])

  return {
    isFinished: finishedRef.current,
  }
}

export default useNextPAge
