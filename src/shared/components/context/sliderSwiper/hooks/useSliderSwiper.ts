import { useRef, useState, useCallback, useEffect } from 'react'

import getCountSliders from '../actions/getCountSliders'
import setTouch from '../builders/setTouch'

import {
  ControllerType,
  SliderSwiperType,
  SliderElementType,
  TouchEventsType,
} from '../types/sliderSwiper.type'

interface UseSliderSwiperElementInterface {
  useCountSliders: number
  useIndexSlider: number
  useRefContentElement: {
    current: HTMLDivElement | null
  }
  setSlider: ({}: number) => void
}

const UseSliderSwiper = ({
  axisX,
  axisY,
  closed,
  elastic,
  indicators,
  infinite,
  instanceEmitter,
  parentMove,
  preventDefault,
  slider,
  sliders,
  sliding,
  startElement,
  onSliding,
}: SliderSwiperType): UseSliderSwiperElementInterface => {
  const useRefTimeoutSliders = useRef(0)
  const [useCountSliders, setCountSliders] = useState(0)
  const useRefContentElement = useRef<HTMLDivElement | null>(null)
  const [useIndexSlider, setIndexSlider] = useState(0)

  const getCountIndicators = useCallback(() => {
    const { current: contentElement } = useRefContentElement
    return getCountSliders({ axisX, contentElement })
  }, [axisX])

  const setSlider = useCallback(
    (index: number) => {
      const { current: contentElement } = useRefContentElement

      ;(contentElement as SliderElementType & TouchEventsType)?.onTouchEvents?.goSlider(index)
      setIndexSlider(index)
      setCountSliders(getCountIndicators())
    },
    [getCountIndicators],
  )

  const setSliding = useCallback(
    (controller: ControllerType) => {
      const { index, isStart, isClosed, slided, sliding } = controller

      onSliding?.({
        index,
        isStart,
        isClosed,
        slided,
        sliding,
      })

      if (sliders && indicators) {
        setIndexSlider(index)
        setCountSliders(getCountIndicators())
      }
    },
    [getCountIndicators, indicators, onSliding, sliders],
  )

  const getTouch = useCallback(() => {
    const { current: contentElement } = useRefContentElement
    const { addTouch, removeTouch } = setTouch({
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
    })
    return { addTouch, removeTouch }
  }, [
    axisX,
    axisY,
    closed,
    elastic,
    infinite,
    instanceEmitter,
    parentMove,
    preventDefault,
    setSliding,
    sliders,
    startElement,
  ])

  useEffect(() => {
    const { addTouch, removeTouch } = getTouch()

    removeTouch()

    if (sliding) {
      addTouch()
    }

    return () => removeTouch()
  }, [getTouch, sliding])

  useEffect(() => {
    if (sliding && sliders) {
      useRefTimeoutSliders.current = window.setTimeout(
        () => setCountSliders(getCountIndicators()),
        1500,
      )

      if (slider) {
        setSlider(slider - 1)
      }
    }
    return () => clearTimeout(useRefTimeoutSliders.current)
  }, [getCountIndicators, setSlider, indicators, slider, sliders, sliding])

  return {
    useCountSliders,
    useIndexSlider,
    useRefContentElement,
    setSlider,
  }
}

export default UseSliderSwiper
