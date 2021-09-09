import { useRef, useState, useCallback, useEffect } from 'react'

import setKey from '../builders/setKey'

import { SliderType } from '../types/slider.type'

interface UseSliderElementInterface {
  useCountSliders: number
  useIndexSlider: number
  useRefContentElement: {
    current: HTMLDivElement | null
  }
  setSlider: ({}: number) => void
}

const UseSlider = ({
  axisX,
  axisY,
  indicators,
  infinite,
  slider,
  sliding,
  onSliding,
}: SliderType): UseSliderElementInterface => {
  const useRefTimeoutSliders = useRef(0)
  const [useCountSliders, setCountSliders] = useState(0)
  const useRefContentElement = useRef<HTMLDivElement | null>(null)
  const [useIndexSlider, setIndexSlider] = useState(0)

  const getCountSliders = useCallback(() => {
    const { current: contentElement } = useRefContentElement

    let countSliders = 0
    let countOffset = 0

    if (contentElement) {
      const { offsetWidth, offsetHeight, scrollWidth, scrollHeight } = contentElement

      const axisOffset = axisX ? offsetWidth : offsetHeight
      const scrollOffset = axisX ? scrollWidth : scrollHeight

      while (countOffset < scrollOffset) {
        countSliders += 1
        countOffset += axisOffset
      }
    }
    return countSliders
  }, [axisX])

  const setSlider = useCallback(
    (index) => {
      const { current: contentElement } = useRefContentElement

      if (contentElement) {
        const { offsetWidth, offsetHeight, scrollWidth, scrollHeight } = contentElement

        const axisOffsetX = axisX ? offsetWidth * index : 0
        const axisOffsetY = axisY ? offsetHeight * index : 0

        const isLimitAxisOffsetX = axisOffsetX >= 0 && axisOffsetX < scrollWidth
        const isLimitAxisOffsetY = axisOffsetY >= 0 && axisOffsetY < scrollHeight

        if ((axisX && isLimitAxisOffsetX) || (axisY && isLimitAxisOffsetY)) {
          setIndexSlider(index)

          onSliding?.({
            index,
            slided: axisOffsetX || axisOffsetY,
          })

          if (indicators) {
            setCountSliders(getCountSliders())
          }

          contentElement.style.transform = `translate(-${axisOffsetX}px, -${axisOffsetY}px)`
        } else if (infinite) {
          setSlider(index < 0 ? getCountSliders() - 1 : 0)
        }
      }
    },
    [axisX, axisY, getCountSliders, indicators, infinite, onSliding],
  )

  const getKey = useCallback(() => {
    const { current: contentElement } = useRefContentElement

    const { addKey, removeKey } = setKey({
      axisX,
      axisY,
      contentElement,
      setSlider,
    })
    return { addKey, removeKey }
  }, [axisX, axisY, setSlider])

  useEffect(() => {
    const { addKey, removeKey } = getKey()

    removeKey()

    if (sliding) {
      addKey()
    }

    return () => removeKey()
  }, [getKey, sliding])

  useEffect(() => {
    if (sliding) {
      useRefTimeoutSliders.current = window.setTimeout(
        () => setCountSliders(getCountSliders()),
        1500,
      )

      if (slider) {
        setSlider(slider - 1)
      }
    }
    return () => clearTimeout(useRefTimeoutSliders.current)
  }, [getCountSliders, setSlider, slider, sliding])

  return {
    useCountSliders,
    useIndexSlider,
    useRefContentElement,
    setSlider,
  }
}

export default UseSlider
