import getIsUserAgent from 'shared/utils/getIsUserAgent'

import { ScrollbarElementType } from '../types/scrollbar.type'

import { ContentElementType } from '../types/content.type'

import convertToNumber from '../../../utils/convertToNumber'

import getScrollbarContext from './getScrollbarContext'
import setSizeScrollbar from './setSizeScrollbar'
import setDraggableScrollbar from './setDraggableScrollbar'
interface SetEventsInterface {
  addEvents: Function
  removeEvents: Function
}

const setEvents = (
  { contentElement, scrollbarElement }: ContentElementType & ScrollbarElementType,
  onScroll?: Function,
  stopPropagation?: boolean,
): SetEventsInterface => {
  let scrollRange = 0
  let lastScrollHeight = 0
  let lastScrollOffsetHeight = 0
  let positionPointer = 0

  const getContentScrollTop = (): number => {
    const { childNodes } = contentElement
    const contentPositionScroll = (childNodes[0] as HTMLElement).style.top
    const contentScrollTop = convertToNumber(contentPositionScroll, true)

    return contentScrollTop
  }

  const onContentMutation = (mutations: Array<MutationRecord>): void => {
    mutations.forEach(() => {
      const { thumbDragInStyle, offsetThumb, scrollHeight, offsetHeight } = getScrollbarContext({
        scrollbarElement,
        contentElement,
      })

      if (lastScrollHeight !== scrollHeight || lastScrollOffsetHeight !== offsetHeight) {
        const contentScrollTop = getContentScrollTop()
        scrollRange = contentScrollTop / offsetThumb

        setSizeScrollbar({
          scrollbarElement,
          contentElement,
        })

        setDraggableScrollbar(
          {
            scrollRange,
            scrollbarElement,
            contentElement,
          },
          onScroll,
        )

        lastScrollHeight = scrollHeight
        lastScrollOffsetHeight = offsetHeight

        if (thumbDragInStyle) {
          thumbDragInStyle.top = `${scrollRange}px`
        }
      }
    })
  }

  const onMouseMoveEvent = (event: Event): void => {
    positionPointer = (event as MouseEvent).offsetY
  }

  const onDragEvent = (event: DragEvent | Event): void => {
    const { clientY, offsetY, target } = event as DragEvent
    const { offsetTop } = target as HTMLElement

    if (clientY > 0) {
      const scrollTo = offsetY + offsetTop - positionPointer

      setDraggableScrollbar(
        {
          scrollRange: scrollTo,
          scrollbarElement,
          contentElement,
        },
        onScroll,
      )
    }

    if (getIsUserAgent('firefox')) {
      const { previousSibling } = contentElement
      const scrollbar = previousSibling as HTMLDivElement

      scrollbar.removeAttribute('style')
      scrollbar.style.width = '100%'
    }
  }

  const onDragEndEvent = (): void => {
    const { thumbDragInStyle, thumbDraggableStyle, offsetThumb } = getScrollbarContext({
      scrollbarElement,
      contentElement,
    })

    const contentScrollTop = getContentScrollTop()
    scrollRange = contentScrollTop / offsetThumb

    if (thumbDragInStyle) {
      thumbDragInStyle.top = thumbDraggableStyle.top
    }

    if (getIsUserAgent('firefox')) {
      const { previousSibling } = contentElement
      ;(previousSibling as HTMLDivElement).removeAttribute('style')
    }
  }

  const onWheelEvent = (event: Event): void => {
    const { deltaY } = event as WheelEvent

    const { thumbDragInStyle, thumbDraggableStyle, offsetThumb, scrollHeight, offsetHeight } =
      getScrollbarContext({
        scrollbarElement,
        contentElement,
      })

    const limitScroll = scrollHeight - offsetHeight
    const scrollTop = scrollRange * offsetThumb

    const isContentScrollable = scrollTop < limitScroll

    const isRollUp = !!(Math.sign(deltaY) <= 0)

    const forceRange = deltaY / offsetThumb

    if (deltaY > 0 && isContentScrollable) {
      scrollRange += forceRange
    } else if (scrollRange > 0 && isRollUp) {
      scrollRange -= forceRange * -1
    }

    setDraggableScrollbar(
      {
        scrollRange,
        scrollbarElement,
        contentElement,
      },
      onScroll,
    )

    if (thumbDragInStyle) {
      thumbDragInStyle.top = thumbDraggableStyle.top
    }

    if (stopPropagation) {
      event.stopPropagation()
    } else if ((isContentScrollable && !isRollUp) || (scrollRange > 0 && isRollUp)) {
      event.stopImmediatePropagation()
    }
  }

  const resolveEvents = (typeEventListener: 'addEventListener' | 'removeEventListener'): void => {
    const { previousSibling: previousContent } = contentElement

    if (getIsUserAgent('firefox')) {
      previousContent?.[typeEventListener]('dragover', onDragEvent, {
        passive: true,
      })
    } else {
      scrollbarElement[typeEventListener]('drag', onDragEvent, {
        passive: true,
      })
    }
    scrollbarElement[typeEventListener]('mousemove', onMouseMoveEvent, {
      passive: true,
    })
    scrollbarElement[typeEventListener]('dragend', onDragEndEvent, {
      passive: true,
    })
    contentElement[typeEventListener]('wheel', onWheelEvent, { passive: true })
    previousContent?.[typeEventListener]('wheel', onWheelEvent, {
      passive: true,
    })
  }

  const definePropertiesEvents = (): void => {
    Object.defineProperty(contentElement, 'onCustomEvents', {
      value: {
        add: () => resolveEvents('addEventListener'),
        del: () => resolveEvents('removeEventListener'),
        observeContentMutation: new MutationObserver(onContentMutation),
      },
    })
  }

  const addEvents = (): void => {
    if (!contentElement.onCustomEvents) {
      definePropertiesEvents()
      onScroll?.({ screenTop: 0 })
    }

    const {
      onCustomEvents,
      onCustomEvents: { observeContentMutation },
    } = contentElement

    onCustomEvents.add()

    const { childNodes } = contentElement

    observeContentMutation.observe(childNodes[0], {
      attributes: true,
    })

    scrollbarElement.draggable = true
  }

  const removeEvents = (): void => {
    if (contentElement.onCustomEvents) {
      const {
        onCustomEvents,
        onCustomEvents: { observeContentMutation },
      } = contentElement

      onCustomEvents.del()

      observeContentMutation.disconnect()
      observeContentMutation.takeRecords()

      scrollbarElement.draggable = false

      const scrollBar = contentElement.previousSibling as HTMLElement
      scrollBar.style.display = 'none'
    }
  }

  return {
    addEvents,
    removeEvents,
  }
}

export default setEvents
