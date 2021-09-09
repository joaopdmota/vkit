import { ScrollbarElementType, DraggableScrollbarType } from '../types/scrollbar.type'

import { ContentElementType } from '../types/content.type'

import convertToNumber from '../../../utils/convertToNumber'

import { DEFAULT_MIN_SIZE_THUMB } from '../../../constants'

import getScrollbarContext from './getScrollbarContext'

const setDraggableScrollbar = (
  {
    scrollRange,
    scrollbarElement,
    contentElement,
  }: DraggableScrollbarType & ScrollbarElementType & ContentElementType,
  onScroll?: Function,
): void => {
  const { thumbDraggableStyle, thumbHeight, offsetThumb, scrollHeight, offsetHeight } =
    getScrollbarContext({
      scrollbarElement,
      contentElement,
    })

  const { childNodes } = contentElement

  const contentScrollable = childNodes[0] as HTMLElement
  const contentScrollableStyle = contentScrollable.style

  const scrollTop = scrollRange * offsetThumb

  const limit = scrollHeight - offsetHeight

  const isScrolling = !!(scrollRange >= 0 && scrollTop <= limit)
  const isScrollEnd = !!(scrollTop >= limit)

  if (isScrolling) {
    const sizeThumb = thumbHeight < DEFAULT_MIN_SIZE_THUMB ? DEFAULT_MIN_SIZE_THUMB : thumbHeight

    const sizeRange = offsetHeight - sizeThumb
    const limitedRange = scrollRange < sizeRange ? scrollRange : sizeRange

    thumbDraggableStyle.top = `${limitedRange}px`
    contentScrollableStyle.top = `-${scrollTop}px`
  }

  if (scrollRange < 0) {
    thumbDraggableStyle.top = '0'
    contentScrollableStyle.top = '0'
  }

  if (isScrollEnd) {
    const endScroll = scrollHeight - offsetHeight
    contentScrollableStyle.top = `-${endScroll}px`
  }

  onScroll?.({
    contentElement: contentScrollable,
    scrollRange: convertToNumber(thumbDraggableStyle.top),
    scrollTop: convertToNumber(contentScrollableStyle.top, true),
    scrollHeight,
    offsetHeight,
    isScrollEnd,
  })
}

export default setDraggableScrollbar
