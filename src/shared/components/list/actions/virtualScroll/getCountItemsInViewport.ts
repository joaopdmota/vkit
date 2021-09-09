import CountItemsInViewPortType from '../../types/virtualScroll/countItemsInViewport.type'
interface GetCountItemsInViewportInterface {
  height: number
  countItemsInViewport: number
}

const getCountItemsInViewport = ({
  itemInnerHeight,
  size,
}: CountItemsInViewPortType): GetCountItemsInViewportInterface => {
  let countItemsInViewport = 0
  let height = 0

  if (size) {
    if (typeof size === 'string') {
      const intOffsetHeight = parseInt(size, 10)
      let pullingHeight = itemInnerHeight

      while (pullingHeight <= intOffsetHeight) {
        countItemsInViewport += 1
        pullingHeight += itemInnerHeight + countItemsInViewport
      }
      height = intOffsetHeight
    } else {
      countItemsInViewport = size
      height = size * itemInnerHeight
    }
  } else {
    height = itemInnerHeight
  }

  return { height, countItemsInViewport }
}

export default getCountItemsInViewport
