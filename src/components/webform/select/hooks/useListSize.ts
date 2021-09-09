import { useCallback, useState } from 'react'

const useListSize = (
  innerHeight: number,
): {
  getElement: ({}: HTMLDivElement) => void
  useSize: number
} => {
  const [useSize, setSize] = useState(0)

  const defineSize = useCallback(
    (divElement: HTMLDivElement): number => {
      const bottomWindow = 50
      const minSize = 4
      const tabsHeight = 50
      const detailsHeight = 56

      const { top: listTop = 0 } = divElement?.getBoundingClientRect() || {}

      const listHeight = window.innerHeight - listTop - bottomWindow - detailsHeight - tabsHeight

      const listSize = Math.floor(listHeight / innerHeight)

      return Math.max(listSize, minSize)
    },
    [innerHeight],
  )

  const getElement = useCallback(
    (divElement: HTMLDivElement): void => {
      if (divElement) {
        const contentSize = defineSize(divElement)
        setSize(contentSize)
      }
    },
    [defineSize],
  )

  return {
    useSize,
    getElement,
  }
}

export default useListSize
