import convertToNumber from '../../../utils/convertToNumber'

import { ContentElementType } from '../types/content.type'

interface SetEventsInterface {
  addEvents: Function
  removeEvents: Function
}

const setEvents = (
  { contentElement }: ContentElementType,
  onScroll?: Function,
): SetEventsInterface => {
  const onScrollEvent = (event: Event): void => {
    const { target } = event
    const deltaY = (target as HTMLElement).scrollTop

    const { childNodes: children, scrollHeight: scrollHeightContent, offsetHeight } = contentElement

    const scrollHeight =
      convertToNumber((contentElement.childNodes[0] as HTMLElement).style.height) ||
      scrollHeightContent

    const offsetThumb = scrollHeight / offsetHeight
    const forceRange = deltaY / offsetThumb

    const scrollRange = forceRange

    const scrollTop = scrollRange * offsetThumb

    const limit = scrollHeight - offsetHeight

    const isScrollEnd = !!(scrollTop >= limit)

    onScroll?.({
      contentElement: children[0],
      scrollRange,
      scrollHeight,
      scrollTop,
      offsetHeight,
      isScrollEnd,
    })

    event.preventDefault()
    event.stopImmediatePropagation()
  }

  const resolveEvents = (typeEventListener: 'addEventListener' | 'removeEventListener'): void => {
    contentElement[typeEventListener]('scroll', onScrollEvent, false)
  }

  const definePropertiesEvents = (): void => {
    Object.defineProperty(contentElement, 'onCustomEvents', {
      value: {
        add: () => resolveEvents('addEventListener'),
        del: () => resolveEvents('removeEventListener'),
      },
    })
  }

  const addEvents = (): void => {
    if (!contentElement.onCustomEvents) {
      definePropertiesEvents()
    }
    const { onCustomEvents } = contentElement
    onCustomEvents.add()
  }

  const removeEvents = (): void => {
    const { onCustomEvents } = contentElement
    onCustomEvents?.del()
  }

  return {
    addEvents,
    removeEvents,
  }
}

export default setEvents
