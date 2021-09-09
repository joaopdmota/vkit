export type ItemsViewportRulerType = {
  contentElement?: HTMLDivElement
  scrollHeight?: number
  scrollTop: number
  items: Array<any>
  itemInnerHeight: number
  countItemsInViewport: number
}

export type UseItemsVirtualizedType = {
  items?: Array<any> | null
  size: string | number
  innerHeight?: number
  onPage?: Function
}

export type ScrollCallbackType = {
  contentElement?: HTMLDivElement
  scrollRange?: number
  scrollHeight?: number
  scrollTop: number
  offsetHeight?: number
  isScrollEnd?: boolean
}
