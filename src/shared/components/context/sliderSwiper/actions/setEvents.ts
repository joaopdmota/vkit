import { EventsType, SliderSwiperType, SliderElementType } from '../types/sliderSwiper.type'

const setEvents = ({
  contentElement,
  startElement,
  onClickSlider,
  onClose,
  onOpen,
  onTouchStart,
  onTouchEnd,
  onTouchMove,
}: SliderSwiperType & SliderElementType & EventsType): Function => {
  const moveElement = contentElement

  const resolveEvents = (typeEventListener: 'addEventListener' | 'removeEventListener'): void => {
    ;(startElement || moveElement)?.[typeEventListener]('touchstart', onTouchStart, {
      passive: true,
    })
    moveElement?.[typeEventListener]('touchmove', onTouchMove, false)
    moveElement?.[typeEventListener]('touchend', onTouchEnd, {
      passive: true,
    })
  }

  const setPropertiesEvents = (): void => {
    Object.defineProperty(moveElement, 'onTouchEvents', {
      value: {
        add: () => resolveEvents('addEventListener'),
        del: () => resolveEvents('removeEventListener'),
        close: onClose,
        open: onOpen,
        goSlider: (index: number) => onClickSlider(index),
      },
    })
  }

  return setPropertiesEvents
}

export default setEvents
