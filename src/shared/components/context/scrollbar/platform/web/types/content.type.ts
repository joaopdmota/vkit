export type ContentElementCustomEventsType = {
  onCustomEvents: {
    add: Function
    del: Function
    observeContentMutation: MutationObserver
  }
}

export type ContentElementType = {
  contentElement: HTMLDivElement & ContentElementCustomEventsType
}
