import { ItemsViewportRulerType } from '../../types/virtualScroll/itemsViewportRuler.type'

const getItemsViewportRuler = ({
  contentElement,
  scrollHeight,
  scrollTop,
  items,
  itemInnerHeight,
  countItemsInViewport,
}: ItemsViewportRulerType): Array<any> => {
  let pullingTop = 0
  let pullingIndex = 0

  while (pullingTop <= scrollTop) {
    pullingIndex += 1
    pullingTop += itemInnerHeight
  }

  const tolerance = 1
  const start = pullingIndex - tolerance
  const end = pullingIndex + countItemsInViewport + tolerance

  const itemsVirtualized = items.filter((_, i: number) => i >= start && i <= end)

  if (contentElement && scrollHeight) {
    const valPixelsToScroll = pullingTop - itemInnerHeight
    const scrollElementStyle = contentElement.style

    scrollElementStyle.marginTop = `${valPixelsToScroll}px`
    scrollElementStyle.maxHeight = `${scrollHeight - valPixelsToScroll}px`
  }

  return itemsVirtualized
}

export default getItemsViewportRuler
