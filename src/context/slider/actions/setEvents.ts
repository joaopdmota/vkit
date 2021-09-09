import { EventsType, SliderElementType } from '../types/slider.type'

const setEvents = ({
  contentElement,
  onMouseEnter,
  onMouseOut,
  onKeyDown,
  onKeyUp,
}: EventsType & SliderElementType): Function => {
  const resolveEvents = (typeEventListener: 'addEventListener' | 'removeEventListener'): void => {
    document[typeEventListener]('keydown', onKeyDown, {
      passive: true,
    })
    document[typeEventListener]('keyup', onKeyUp, {
      passive: true,
    })
    contentElement?.parentElement?.[typeEventListener]('mouseover', onMouseEnter, false)
    contentElement?.parentElement?.[typeEventListener]('mouseout', onMouseOut, false)
  }

  const setPropertiesEvents = (): void => {
    Object.defineProperty(contentElement, 'onKeyEvents', {
      value: {
        add: () => resolveEvents('addEventListener'),
        del: () => resolveEvents('removeEventListener'),
      },
    })
  }

  return setPropertiesEvents
}

export default setEvents
