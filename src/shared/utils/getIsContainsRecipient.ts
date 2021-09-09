function getIsContainsRecipient(element: HTMLDivElement): boolean {
  if (element) {
    const body = document.body
    const { clientWidth: rootX, clientHeight: rootY } = body

    const clientContains = element.getBoundingClientRect()
    const { left, top, right: innerClientX, bottom: innerClientY } = clientContains

    const isInnerClientX = left > 0 && innerClientX <= rootX
    const isInnerClientY = top > 0 && innerClientY <= rootY

    return !!(isInnerClientX && isInnerClientY)
  }
  return false
}

export default getIsContainsRecipient
