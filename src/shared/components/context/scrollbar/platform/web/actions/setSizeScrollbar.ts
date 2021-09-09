import convertToNumber from '../../../utils/convertToNumber'

import { ScrollbarElementType } from '../types/scrollbar.type'
import { ContentElementType } from '../types/content.type'

import getScrollbarContext from './getScrollbarContext'

export const setSizeScrollbar = ({
  scrollbarElement,
  contentElement,
}: ScrollbarElementType & ContentElementType): void => {
  const { thumbDragInStyle, thumbDraggableStyle, thumbHeight, scrollHeight } = getScrollbarContext({
    scrollbarElement,
    contentElement,
  })

  const { childNodes, previousSibling, offsetHeight } = contentElement

  const scrollBar = previousSibling as HTMLElement

  const contentElementScrollHeight = (childNodes[0] as HTMLElement).style.height
  const innerScrollHeight = convertToNumber(contentElementScrollHeight) || scrollHeight

  if (innerScrollHeight > offsetHeight) {
    scrollBar.style.display = 'block'
  } else {
    scrollBar.style.display = 'none'
  }

  if (thumbDragInStyle && thumbDraggableStyle && thumbHeight) {
    thumbDragInStyle.height = `${thumbHeight}px`
    thumbDraggableStyle.height = `${thumbHeight}px`
  }
}

export default setSizeScrollbar
