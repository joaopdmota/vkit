import { ContentElementType } from '../types/content.type'

import setEvents from '../actions/setEvents'

export const addEvents = ({ contentElement }: ContentElementType, onScroll?: Function): void => {
  setEvents({ contentElement }, onScroll).addEvents()
}

export const removeEvents = ({ contentElement }: ContentElementType): void => {
  setEvents({ contentElement }).removeEvents()
}
