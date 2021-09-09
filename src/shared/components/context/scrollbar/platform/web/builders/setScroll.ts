import { ScrollbarElementType } from '../types/scrollbar.type'

import { ContentElementType } from '../types/content.type'

import { setSizeScrollbar, setEvents } from '../actions'

export const addScroll = (
  { scrollbarElement, contentElement }: ScrollbarElementType & ContentElementType,
  onScroll?: Function,
  stopPropagation?: boolean,
): void => {
  setSizeScrollbar({
    scrollbarElement,
    contentElement,
  })

  setEvents(
    {
      scrollbarElement,
      contentElement,
    },
    onScroll,
    stopPropagation,
  ).addEvents()
}

export const removeScroll = ({
  scrollbarElement,
  contentElement,
}: ScrollbarElementType & ContentElementType): void => {
  setEvents({
    scrollbarElement,
    contentElement,
  }).removeEvents()
}
