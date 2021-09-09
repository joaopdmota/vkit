import { SliderSwiperType, SliderElementType, TouchEventsType } from '../types/sliderSwiper.type'

import { getActions, getCountSliders, setEvents } from '../actions'

interface SetTouchInterface {
  addTouch: Function
  removeTouch: Function
}

export const setTouch = ({
  axisX,
  axisY,
  contentElement,
  closed,
  elastic,
  infinite,
  instanceEmitter,
  parentMove,
  preventDefault,
  sliders,
  startElement,
  setSliding,
}: SliderElementType & SliderSwiperType & { setSliding: Function }): SetTouchInterface => {
  const moveElement = parentMove
    ? (contentElement?.parentElement?.parentElement as HTMLDivElement | null)
    : contentElement
  const moveElementEvents = moveElement as SliderSwiperType & TouchEventsType

  const removeTouch = (): void => {
    moveElementEvents?.onTouchEvents?.del()
  }

  const addTouch = (): void => {
    if (moveElementEvents) {
      removeTouch()

      const { onClickSlider, onClose, onOpen, onTouchStart, onTouchEnd, onTouchMove } = getActions({
        axisX,
        axisY,
        contentElement: moveElement,
        elastic,
        infinite,
        preventDefault,
        sliders,
        setSliding,
        getCountSliders,
      })

      const setPropertiesEvents = setEvents({
        contentElement: moveElement,
        startElement,
        onClickSlider,
        onClose,
        onOpen,
        onTouchStart,
        onTouchEnd,
        onTouchMove,
      })

      if (!moveElementEvents?.onTouchEvents) {
        setPropertiesEvents()
      }

      const { add, close, open, goSlider } = moveElementEvents.onTouchEvents

      if (instanceEmitter instanceof Object) {
        Object.assign(instanceEmitter, {
          ...(!sliders ? { close, open } : null),
          goSlider,
        })
      }
      if (!sliders) {
        if (closed) {
          onClose?.()
        }
      }
      add()
    }
  }

  return {
    addTouch,
    removeTouch,
  }
}

export default setTouch
