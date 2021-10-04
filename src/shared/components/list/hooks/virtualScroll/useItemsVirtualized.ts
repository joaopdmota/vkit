import { useCallback, useState, useRef, useEffect } from 'react'

import getIsUserAgent from 'shared/utils/getIsUserAgent'

import {
  UseItemsVirtualizedType,
  ScrollCallbackType,
} from '../../types/virtualScroll/itemsViewportRuler.type'

import { getItemsViewportRuler, getCountItemsInViewport } from '../../actions/virtualScroll'

import { DEFAULT_ITEM_INNER_HEIGHT } from '../../constants'

interface UseItemsVirtualizedInterface {
  useHasProgressLoader: boolean
  useHasItemsLoader: boolean
  useItemsVirtualized: Array<any>
  useItemSortable: {
    itemName: string
    sort: string
  }
  height: number
  scrollHeight: number
  setScroll: Function
  setSortable: Function
}

const UseItemsVirtualized = ({
  items,
  size,
  innerHeight,
  onPage,
  scrollTo,
}: UseItemsVirtualizedType): UseItemsVirtualizedInterface => {
  const useRefScrollTop = useRef(0)
  const useRefPage = useRef(1)
  const useRefHasPaginated = useRef(!!onPage)
  const useRefContentScrollElement = useRef<HTMLElement>()

  const [useScrollHeight, setScrollHeight] = useState<number>(0)

  const [useItemsViewportRuler, setItemsViewportRuler] = useState<Array<any>>([])
  const [useItemSortable, setItemSortable] = useState({
    itemName: '',
    sort: 'az',
  })

  const [useHasProgressLoader, setHasProgressLoader] = useState(false)
  const [useHasItemsLoader, setHasItemsLoader] = useState(false)

  const itemInnerHeight = innerHeight || DEFAULT_ITEM_INNER_HEIGHT

  const { height, countItemsInViewport } = getCountItemsInViewport({
    itemInnerHeight,
    size,
  })

  const useRefProps = useRef<UseItemsVirtualizedType>({
    items,
    size: countItemsInViewport,
    innerHeight: itemInnerHeight,
  })

  const setItemsLoader = useCallback(() => {
    const {
      current: { size, innerHeight },
    } = useRefProps

    const itemsPushed = Array.from(Array(size)).map(() => new Object())

    const scrollHeight = itemsPushed.length * (innerHeight as number)

    setScrollHeight(scrollHeight)
    setItemsViewportRuler(itemsPushed)
    setHasItemsLoader(true)
  }, [])

  const setScroll = useCallback(
    (useScroll: ScrollCallbackType): void => {
      const {
        current: { items, size, innerHeight },
      } = useRefProps

      if (items?.length) {
        if (useScroll) {
          const countItemsInViewport = size as number
          const itemInnerHeight = innerHeight as number

          const { current: hasPaginated } = useRefHasPaginated

          const { contentElement, scrollTop, scrollHeight, isScrollEnd } = useScroll

          const itemsVirtualized = getItemsViewportRuler({
            contentElement,
            scrollHeight,
            scrollTop,
            items,
            itemInnerHeight,
            countItemsInViewport,
          })

          setItemsViewportRuler(itemsVirtualized)

          if (isScrollEnd && hasPaginated && items.length > countItemsInViewport * 2) {
            useRefHasPaginated.current = false
            useRefPage.current += 1

            setHasProgressLoader(true)
            onPage?.(useRefPage.current)
          }

          useRefScrollTop.current = scrollTop
          useRefContentScrollElement.current = contentElement
        }
      } else if (Array.isArray(items)) {
        setItemsLoader()
      }
    },
    [onPage, setItemsLoader],
  )

  const setOrderItems = useCallback((): void => {
    const { current: scrollTop } = useRefScrollTop
    const { itemName, sort } = useItemSortable

    if (itemName && typeof itemName === 'string') {
      items?.sort((prev: any, next: any) => {
        const preName = String(prev[itemName])
        const nextName = String(next[itemName])

        return sort === 'az'
          ? preName.localeCompare(nextName, 'en-u-kn-true')
          : nextName.localeCompare(preName, 'en-u-kn-true')
      })
    }

    setScroll({ scrollTop })
  }, [items, setScroll, useItemSortable])

  const setSortable = (headerValue: string): void => {
    const { itemName, sort } = useItemSortable
    let newSort = 'az'

    if (itemName === headerValue) {
      newSort = sort === 'za' ? 'az' : 'za'
    }

    setItemSortable({
      itemName: headerValue,
      sort: newSort,
    })

    setOrderItems()
  }

  useEffect(() => {
    const {
      current: { items: refItems },
    } = useRefProps

    const scrollHeight = items ? items.length * itemInnerHeight : height
    const prevScrollHeight = refItems ? refItems.length * itemInnerHeight : scrollHeight

    if (!items?.length) {
      useRefPage.current = 1
    }

    if (typeof scrollTo !== 'undefined' && scrollTo >= 0) {
      if (getIsUserAgent('mobile')) {
        const scrollElement = useRefContentScrollElement.current?.parentElement as HTMLElement
        scrollElement?.scrollTo(0, scrollTo)
      } else {
        const scrollStyle = useRefContentScrollElement.current?.style
        if (scrollStyle && scrollStyle.top) {
          scrollStyle.top = `${scrollTo}px`
        }
      }
    }

    useRefHasPaginated.current =
      scrollHeight === prevScrollHeight && useRefPage.current > 1 ? false : !!onPage

    useRefProps.current = {
      items,
      size: countItemsInViewport,
      innerHeight: itemInnerHeight,
    }

    setHasProgressLoader(false)
    setHasItemsLoader(false)

    setScrollHeight(scrollHeight)
    setOrderItems()
  }, [countItemsInViewport, height, itemInnerHeight, items, onPage, scrollTo, setOrderItems])

  return {
    useHasProgressLoader,
    useHasItemsLoader,
    useItemsVirtualized: useItemsViewportRuler,
    useItemSortable,
    height,
    scrollHeight: useScrollHeight,
    setScroll,
    setSortable,
  }
}

export default UseItemsVirtualized
