import { SliderType, SliderElementType, KeyEventsType } from '../types/slider.type'

import { getActions, setEvents } from '../actions'

interface SetKeyInterface {
  addKey: Function
  removeKey: Function
}

export const setKey = ({
  axisX,
  axisY,
  contentElement,
  setSlider,
}: SliderElementType & SliderType & { setSlider: Function }): SetKeyInterface => {
  const contentElementEvents = contentElement as SliderType & KeyEventsType

  const removeKey = (): void => {
    contentElementEvents?.onKeyEvents?.del()
  }

  const addKey = (): void => {
    if (contentElement) {
      removeKey()

      const { onMouseEnter, onMouseOut, onKeyDown, onKeyUp } = getActions({
        axisX,
        axisY,
        contentElement,
        setSlider,
      })

      const setPropertiesEvents = setEvents({
        contentElement,
        onMouseEnter,
        onMouseOut,
        onKeyDown,
        onKeyUp,
      })

      if (!contentElementEvents?.onKeyEvents) {
        setPropertiesEvents()
      }

      contentElementEvents.onKeyEvents.add()
    }
  }

  return {
    addKey,
    removeKey,
  }
}

export default setKey
