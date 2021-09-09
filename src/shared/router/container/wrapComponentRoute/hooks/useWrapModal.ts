import { useState, useCallback } from 'react'
import useHistoryNavigation from '../../../hooks/useHistoryNavigation'
import useShowOpen from './useShowOpen'

const useWrapModal = (
  canShow: boolean,
): {
  getElementHeight: ({}: HTMLDivElement) => void
  onClose: Function
  setHeaderElement: ({}: HTMLDivElement) => void
  useHeaderElement: HTMLDivElement | null
  useHeight: number
  useOpen: boolean
  useShow: boolean
} => {
  const [useHeight, setHeight] = useState(0)
  const [useHeaderElement, setHeaderElement] = useState<HTMLDivElement | null>(null)

  const navigation = useHistoryNavigation()

  const onClose = useCallback(
    (pathParent: string) => {
      pathParent ? navigation.push(pathParent) : navigation.goBack()
    },
    [navigation],
  )

  const { useOpen, useShow } = useShowOpen({ canShow })

  const getElementHeight = useCallback(
    (divElement: HTMLDivElement): void => {
      if (divElement && useHeaderElement) {
        const modalHeight = divElement.offsetHeight
        const headerHeight = useHeaderElement.offsetHeight

        setHeight(modalHeight - headerHeight)
      }
    },
    [useHeaderElement],
  )

  return {
    getElementHeight,
    onClose,
    setHeaderElement,
    useHeaderElement,
    useHeight,
    useOpen,
    useShow,
  }
}

export default useWrapModal
