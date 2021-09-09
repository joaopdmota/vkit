import getTextCapitalize from 'shared/utils/getTextCapitalize'

import {
  ControllerType,
  EventsType,
  SliderSwiperType,
  SliderElementType,
} from '../types/sliderSwiper.type'

const getActions = ({
  axisX,
  axisY,
  contentElement,
  elastic,
  infinite,
  preventDefault,
  sliders,
  setSliding,
  getCountSliders,
}: SliderSwiperType &
  SliderElementType & {
    getCountSliders: Function
    setSliding: Function
  }): EventsType => {
  const moveElement = contentElement
  const moveElementStyle = moveElement?.style as CSSStyleDeclaration

  const controller: ControllerType = {
    index: 0,
    isStart: false,
    isClosed: false,
    lastPosition: { x: 0, y: 0 },
    slided: 0,
    sliding: 0,
    startCords: { startX: 0, startY: 0 },
    timeoutStart: 0,
  }

  const getClient = (event: Event): { clientX: number; clientY: number } => {
    const { changedTouches } = event as TouchEvent
    const { clientX, clientY } = changedTouches[0]

    return { clientX, clientY }
  }

  const setPadding = (): void => {
    const toleranceSliding = '5px'
    const padding = Array.from(Array(4)).map(() => '0px')

    switch (axisX || axisY) {
      case 'top':
        padding[2] = toleranceSliding
        break
      case 'right':
        padding[3] = toleranceSliding
        break
      case 'bottom':
        padding[0] = toleranceSliding
        break
      case 'left':
        padding[1] = toleranceSliding
        break
      default:
        break
    }

    moveElementStyle.padding = padding.join(' ')
  }

  const setTouchSlider = ({
    axis,
    axisOffset = 0,
    client,
    lastPosition,
    scrollOffset,
    start,
  }: {
    axis?: string | boolean
    axisOffset?: number
    client: number
    lastPosition: number
    scrollOffset?: number
    start: number
  }): { defineSliding: number; defineSlided: number } => {
    const verticeA = axis === 'left' || axis === 'top' || (axis === true && start > client)
    const verticeB = axis === 'right' || axis === 'bottom' || (axis === true && start < client)

    if (sliders && axisOffset && scrollOffset) {
      const countSliders = scrollOffset > axisOffset ? scrollOffset - axisOffset : 0

      if (verticeA && controller.index * axisOffset < countSliders) {
        controller.index += 1
      } else if (verticeB && controller.index > 0) {
        controller.index -= 1
      }
    }

    const currentSliding = start - client
    const axisSlider = sliders ? controller.index * axisOffset || axisOffset : axisOffset
    const sliding = sliders ? axisSlider + currentSliding : currentSliding

    const slidingA = lastPosition ? lastPosition - sliding * -1 : sliding
    const slidingB = lastPosition ? lastPosition * -1 + sliding : sliding

    let defineSliding = 0
    let defineSlided = 0

    if (!sliders) {
      if (verticeA && Math.sign(slidingA) > 0) {
        if (axisSlider) {
          defineSlided = Math.abs(slidingA) > axisSlider / 2 ? axisSlider : 0
          defineSliding = defineSlided * -1
        } else {
          defineSliding = slidingA * -1
        }
      } else if (verticeB && Math.sign(slidingB) < 0) {
        if (axisSlider) {
          defineSlided = Math.abs(slidingB) > axisSlider / 2 ? axisSlider : 0
          defineSliding = defineSlided
        } else {
          defineSliding = slidingB * -1
        }
      } else if (elastic && !axisSlider && typeof axis === 'string') {
        const padding =
          <T extends object, U extends keyof T>(key: U) =>
          (obj: T) =>
            obj[key]
        const name = `padding${getTextCapitalize(axis)}` as keyof typeof padding

        moveElementStyle[name] = `${(Math.sign(slidingB) < 0 ? slidingB * -1 : slidingB) / 10}px`
      }
    } else {
      if (axisSlider) {
        defineSlided = Math.abs(slidingA) > axisSlider / 2 ? axisSlider : 0

        if (infinite) {
          const countSliders = getCountSliders({ axisX, contentElement })

          if (controller.slided < -50) {
            defineSlided = (countSliders - 1) * axisSlider
            controller.index = countSliders - 1
          } else if (controller.slided > (scrollOffset as number) - axisOffset / 2) {
            defineSlided = 0
            controller.index = 0
          } else if (!controller.index) {
            defineSlided = 0
          }
        } else if (!controller.index) {
          defineSlided = 0
        }
        defineSliding = defineSlided * -1
      } else {
        defineSlided = slidingA
        defineSliding = defineSlided * -1
      }
    }

    controller.slided = defineSlided
    controller.sliding = defineSliding

    setSliding(controller)

    return { defineSliding, defineSlided }
  }

  const onTouchStart = (event: Event): void => {
    const { clientX, clientY } = getClient(event)

    controller.startCords = {
      startX: clientX,
      startY: clientY,
    }

    moveElementStyle.transition = ''

    controller.timeoutStart = window.setTimeout(() => {
      controller.isStart = true
    }, 300)
  }

  const onTouchEnd = (event: Event): void => {
    const { isStart, lastPosition, startCords } = controller

    if (!isStart) {
      clearTimeout(controller.timeoutStart)
      return
    }

    moveElementStyle.padding = ''
    moveElementStyle.transition = 'transform 0.2s linear, padding 0.2s linear'

    const { clientX, clientY } = getClient(event)
    const { startX, startY } = startCords
    const { offsetWidth, offsetHeight, scrollWidth, scrollHeight } = moveElement || {}

    let defineSlidingX = 0
    let defineSlidedX = 0

    let defineSlidingY = 0
    let defineSlidedY = 0

    if (axisX) {
      const { defineSliding, defineSlided } = setTouchSlider({
        axis: axisX,
        axisOffset: offsetWidth,
        client: clientX,
        lastPosition: lastPosition.x,
        scrollOffset: scrollWidth,
        start: startX,
      })
      defineSlidingX = defineSliding
      defineSlidedX = defineSlided
    } else if (axisY) {
      const { defineSliding, defineSlided } = setTouchSlider({
        axis: axisY,
        axisOffset: offsetHeight,
        client: clientY,
        lastPosition: lastPosition.y,
        scrollOffset: scrollHeight,
        start: startY,
      })
      defineSlidingY = defineSliding
      defineSlidedY = defineSlided
    }

    controller.lastPosition = {
      x: defineSlidedX,
      y: defineSlidedY,
    }

    controller.isStart = false

    const isClosed = !!controller.slided
    controller.isClosed = isClosed

    if (!sliders && isClosed) {
      setPadding()
    }

    moveElementStyle.transform = `translate(${defineSlidingX}px, ${defineSlidingY}px)`

    setSliding(controller)
  }

  const onTouchMove = (event: Event): void => {
    const { isStart, lastPosition, startCords } = controller

    if (isStart) {
      if (!elastic && !sliders) {
        moveElementStyle.padding = ''
      }

      const { clientX, clientY } = getClient(event)
      const { startX, startY } = startCords

      let defineSlidingX = 0
      let defineSlidingY = 0

      if (axisX) {
        const { defineSliding } = setTouchSlider({
          axis: axisX,
          client: clientX,
          lastPosition: lastPosition.x,
          start: startX,
        })
        defineSlidingX = defineSliding
      } else if (axisY) {
        const { defineSliding } = setTouchSlider({
          axis: axisY,
          client: clientY,
          lastPosition: lastPosition.y,
          start: startY,
        })
        defineSlidingY = defineSliding
      }

      moveElementStyle.transform = `translate(${defineSlidingX}px, ${defineSlidingY}px)`
    }

    if (preventDefault) {
      event.preventDefault()
    }
  }

  const onClickSlider = (index: number): void => {
    if (moveElement) {
      const { offsetWidth, offsetHeight } = moveElement

      const defineSlidedX = axisX ? offsetWidth * index : 0
      const defineSlidedY = axisY ? offsetHeight * index : 0

      controller.lastPosition = {
        x: defineSlidedX,
        y: defineSlidedY,
      }

      if (sliders) {
        controller.index = index
      }

      setSliding(controller)

      moveElementStyle.transition = 'transform 0.4s linear'
      moveElementStyle.transform = `translate(-${defineSlidedX}px, -${defineSlidedY}px)`
    }
  }

  const collapse = (hasExpand?: boolean): void => {
    const { offsetWidth, offsetHeight } = moveElement || {}

    const defineSlidingX = axisX ? (!hasExpand && offsetWidth) || 0 : 0
    const defineSlidingY = axisY ? (!hasExpand && offsetHeight) || 0 : 0

    controller.lastPosition = {
      x: defineSlidingX,
      y: defineSlidingY,
    }

    controller.slided = defineSlidingX || defineSlidingY
    controller.sliding = (defineSlidingX || defineSlidingY) * -1
    controller.isClosed = !!hasExpand

    const translateX = axisX === 'left' ? defineSlidingX * -1 : defineSlidingX
    const translateY = axisY === 'top' ? defineSlidingY * -1 : defineSlidingY

    moveElementStyle.transition = 'transform 0.2s linear'
    moveElementStyle.transform = `translate(${translateX}px, ${translateY}px)`

    if (!sliders) {
      setPadding()
    }
    setSliding(controller)
  }

  const onClose = (): void => {
    collapse()
  }

  const onOpen = (): void => {
    collapse(true)
  }

  return {
    onClickSlider,
    onClose,
    onOpen,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
  }
}

export default getActions
