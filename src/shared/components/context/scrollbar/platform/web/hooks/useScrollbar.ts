import { useRef, useCallback, useEffect } from 'react'

import { ContentElementCustomEventsType } from '../types/content.type'

import { addScroll, removeScroll } from '../builders/setScroll'
interface UseScrollbarInterface {
  useRefScrollbar: {
    current: HTMLDivElement | null
  }
  useRefScrollContent: {
    current: HTMLDivElement | null
  }
}
interface UseRefScrollContentInterface extends ContentElementCustomEventsType, HTMLDivElement {}

const UseScrollbar = (onScroll?: Function, stopPropagation?: boolean): UseScrollbarInterface => {
  const useRefScrollbar = useRef<HTMLDivElement | null>(null)
  const useRefScrollContent = useRef<UseRefScrollContentInterface | null>(null)

  const setScrollContent = useCallback(() => {
    const { current: scrollbarElement } = useRefScrollbar
    const { current: contentElement } = useRefScrollContent

    if (scrollbarElement && contentElement) {
      removeScroll({
        scrollbarElement,
        contentElement,
      })
      addScroll(
        {
          scrollbarElement,
          contentElement,
        },
        onScroll,
        stopPropagation,
      )
    }
  }, [onScroll, stopPropagation])

  const removeScrollContent = useCallback(() => {
    const { current: scrollbarElement } = useRefScrollbar
    const { current: contentElement } = useRefScrollContent

    if (scrollbarElement && contentElement) {
      removeScroll({
        scrollbarElement,
        contentElement,
      })
    }
  }, [])

  useEffect(() => {
    setScrollContent()
    return () => removeScrollContent()
  }, [removeScrollContent, setScrollContent, stopPropagation])

  return {
    useRefScrollbar,
    useRefScrollContent,
  }
}

export default UseScrollbar
