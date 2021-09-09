export type ContentElementCustomEventsType = {
  onCustomEvents: {
    add: Function
    del: Function
  }
}

export type ContentElementType = {
  contentElement: HTMLDivElement & ContentElementCustomEventsType
}
