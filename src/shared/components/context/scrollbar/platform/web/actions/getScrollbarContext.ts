import convertToNumber from '../../../utils/convertToNumber'

import { ScrollbarElementType, ThumbScrollbarType } from '../types/scrollbar.type'

import { ContentElementType } from '../types/content.type'

const getScrollbarContext = ({
  scrollbarElement,
  contentElement,
}: ScrollbarElementType & ContentElementType): ThumbScrollbarType => {
  const { scrollHeight: scrollHeightContent, offsetHeight } = contentElement
  const scrollHeight =
    convertToNumber((contentElement.childNodes[0] as HTMLElement).style.height) ||
    scrollHeightContent

  const thumbHeight = offsetHeight * (offsetHeight / scrollHeight)

  const offsetThumb = scrollHeight / offsetHeight

  const thumbDragInStyle = scrollbarElement?.style as CSSStyleDeclaration
  const thumbDraggableStyle = (scrollbarElement?.nextSibling as HTMLElement)?.style

  return {
    thumbDragInStyle,
    thumbDraggableStyle,
    thumbHeight,
    offsetThumb,
    scrollHeight,
    offsetHeight,
  }
}

export default getScrollbarContext
