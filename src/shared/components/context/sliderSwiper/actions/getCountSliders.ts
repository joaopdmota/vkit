import { SliderSwiperType, SliderElementType } from '../types/sliderSwiper.type'

const getCountSliders = ({
  axisX,
  contentElement,
}: SliderSwiperType & SliderElementType): number => {
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
}

export default getCountSliders
