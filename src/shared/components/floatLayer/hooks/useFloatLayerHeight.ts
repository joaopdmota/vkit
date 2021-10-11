import { useState, useCallback } from 'react'

const useFloatLayerHeight = (
  height?: number,
): {
  getElementHeight: ({}: HTMLDivElement) => void
  useHeight: number
  useWidth: number
  useBottom: number | 'auto'
} => {
  const [useHeight, setHeight] = useState(0)
  const [useWidth, setWidth] = useState(0)
  const [useBottom, setBottom] = useState<number | 'auto'>('auto')

  const getDetailsHeight = (divElement: HTMLDivElement): number => {
    const headerIndex = 0
    const titleIndex = 1
    const footerIndex = 3

    const { childNodes } = divElement

    return [headerIndex, titleIndex, footerIndex].reduce((acc, detailIndex) => {
      const { height } = (childNodes?.[detailIndex] as HTMLDivElement).getBoundingClientRect()
      return acc + height
    }, 0)
  }

  const defineHeight = useCallback((divElement: HTMLDivElement): number => {
    const bottomWindow = 50
    const minHeight = 150

    const detailsHeight = getDetailsHeight(divElement)

    const { height: floatLayerHeight } = divElement.getBoundingClientRect()

    const { top: floatLayerParentTop = 0 } = divElement.parentElement?.getBoundingClientRect() || {}

    const floatLayerTop = Math.max(floatLayerParentTop, 0)

    const contentHeight =
      floatLayerHeight + floatLayerTop > window.innerHeight
        ? window.innerHeight - floatLayerTop
        : floatLayerHeight

    return Math.max(contentHeight - bottomWindow, minHeight) - detailsHeight
  }, [])

  const getElementHeight = useCallback(
    (divElement: HTMLDivElement): void => {
      if (divElement) {
        const contentHeight = height ?? defineHeight(divElement)
        setHeight(contentHeight)

        const { width } = divElement.parentElement?.parentElement?.getBoundingClientRect() || {}
        setWidth(width || 0)

        setBottom('auto')
        setTimeout(() => {
          const floatLayerBox = divElement.getBoundingClientRect()

          if (floatLayerBox.top + floatLayerBox.height >= window.innerHeight) {
            setBottom(10)
          }
        }, 300)
      } else {
        setHeight(0)
      }
    },
    [height, defineHeight],
  )

  return {
    getElementHeight,
    useHeight,
    useWidth,
    useBottom,
  }
}

export default useFloatLayerHeight
