import { EventsType, SliderType, SliderElementType } from '../types/slider.type'

const getActions = ({
  axisX,
  axisY,
  contentElement,
  setSlider,
}: SliderType & SliderElementType & { setSlider: Function }): EventsType => {
  const controller = {
    isPresent: false,
    isThrottle: false,
    lastThrottle: 0,
    transitionTime: 300,
    throttleTime: 0,
    timeout: 0,
  }

  const getHasThrottle = (): boolean => {
    const { lastThrottle, transitionTime, throttleTime } = controller
    const date = new Date()
    const diff = +date - lastThrottle

    if (throttleTime > diff) {
      controller.throttleTime = transitionTime * 2
      controller.isThrottle = true
      return true
    }

    controller.throttleTime = transitionTime
    controller.lastThrottle = +date
    return false
  }

  const onMouseEnter = (): void => {
    controller.isPresent = true
  }

  const onMouseOut = (): void => {
    controller.isPresent = false
  }

  const onKeyDown = (event: Event): void => {
    const { key } = event as KeyboardEvent
    const { isPresent } = controller
    let lastIndex = parseInt(contentElement?.getAttribute('data-slider') || '0', 10)

    if (isPresent) {
      getHasThrottle()

      controller.timeout = window.setTimeout(() => {
        clearTimeout(controller.timeout)
        if (axisX) {
          if (key === 'ArrowRight') {
            lastIndex += 1
          } else if (key === 'ArrowLeft') {
            lastIndex -= 1
          }
        } else if (axisY) {
          if (key === 'ArrowUp') {
            lastIndex -= 1
          } else if (key === 'ArrowDown') {
            lastIndex += 1
          }
        }
        setSlider(lastIndex)
      }, controller.throttleTime)
    }
  }

  const onKeyUp = (): void => {
    if (controller.isThrottle) {
      controller.isThrottle = false
      clearTimeout(controller.timeout)
    }
  }

  return {
    onMouseEnter,
    onMouseOut,
    onKeyDown,
    onKeyUp,
  }
}

export default getActions
