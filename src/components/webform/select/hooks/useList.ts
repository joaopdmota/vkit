import { useState, useEffect } from 'react'
import useListSize from './useListSize'
import useNextPage from './useNextPage'
import useSearch from './useSearch'
import useAutoRequest from './useAutoRequest'

import DataType from 'components/webform/select/types/data.type'

type requestType = {
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

type useListType = requestType & {
  autoRequest?: boolean
  onRequestFinish?: Function
  data?: DataType[] | null
  useSelecteds?: DataType[] | null
  listItemHeight: number
  value?: string | string[]
  setSelecteds: Function
}

const useList = ({
  autoRequest,
  onRequestFinish,
  data,
  listItemHeight,
  value,
  requestHeaders,
  requestPageParam,
  requestParams,
  requestResponseRootPath,
  requestResponseText,
  requestResponseValue,
  requestRouter,
  requestSearchParam,
  requestUri,
  useSelecteds,
  setSelecteds,
}: useListType): {
  getElement: Function
  isChecked: Function
  isFinished: boolean
  isRequestable: boolean
  onSearch: (...item: any) => void
  onSearchSelecteds: (...item: any) => void
  setListIndex: Function
  setPage: Function
  setTerm?: Function
  setTermSelecteds?: Function
  useContentList?: DataType[] | null
  useContentListSelecteds?: DataType[] | null
  useListIndex: number
  useSize: number
  useTerm: string
  useTermSelecteds: string
} => {
  const [useContentList, setContentList] = useState<DataType[] | null>()
  const [useContentListSelecteds, setContentListSelecteds] = useState<DataType[] | null>()
  const [useListIndex, setListIndex] = useState<number>(0)
  const [usePage, setPage] = useState<number>(1)
  const [useOptions, setOptions] = useState<requestType>({
    requestHeaders: undefined,
    requestPageParam: undefined,
    requestParams: undefined,
    requestResponseRootPath: undefined,
    requestResponseText: undefined,
    requestResponseValue: undefined,
    requestRouter: '/',
    requestSearchParam: undefined,
    requestUri: undefined,
  })

  const isChecked = (valueCheckbox: string): boolean => {
    if (Array.isArray(value)) {
      return value.includes(valueCheckbox)
    }

    return value === valueCheckbox
  }

  const listSize = useListSize(listItemHeight)

  useAutoRequest({
    autoRequest,
    options: useOptions,
    setContentList,
    onRequestFinish,
  })

  const { useTerm, setTerm, onSearch } = useSearch({
    data,
    setContentList,
    options: useOptions,
  })

  const {
    useTerm: useTermSelecteds,
    setTerm: setTermSelecteds,
    onSearch: onSearchSelecteds,
  } = useSearch({
    data: useSelecteds,
    setContentList: setContentListSelecteds,
  })

  const { isFinished } = useNextPage({
    options: useOptions,
    setContentList,
    usePage,
  })

  useEffect(() => {
    setOptions({
      requestHeaders,
      requestPageParam,
      requestParams: {
        ...requestParams,
        ...(requestSearchParam && useTerm !== '' ? { [requestSearchParam]: useTerm } : {}),
      },
      requestResponseRootPath,
      requestResponseText,
      requestResponseValue,
      requestRouter,
      requestSearchParam,
      requestUri,
    })
  }, [
    requestHeaders,
    requestPageParam,
    requestParams,
    requestResponseRootPath,
    requestResponseText,
    requestResponseValue,
    requestRouter,
    requestSearchParam,
    requestUri,
    useTerm,
  ])

  useEffect(() => {
    if (useSelecteds?.length || !value) {
      return
    }
    const selecteds = (useContentList || []).filter((item) =>
      (value || []).includes(item.value as string),
    )
    setSelecteds(selecteds)
  }, [value, useContentList, setSelecteds, useSelecteds?.length])

  return {
    ...listSize,
    isFinished,
    isChecked,
    onSearch,
    useTerm,
    onSearchSelecteds,
    useTermSelecteds,
    useContentList,
    useContentListSelecteds,
    setPage,
    useListIndex,
    setListIndex,
    setTerm,
    setTermSelecteds,
    isRequestable: !data && !!(requestResponseText && requestResponseValue && requestRouter),
  }
}

export default useList
