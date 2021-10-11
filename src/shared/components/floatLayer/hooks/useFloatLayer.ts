import useClickOnOutside from './useClickOnOutside'
import useFloatLayerHeight from './useFloatLayerHeight'
import useShowOpen from './useShowOpen'

interface useFloatLayerInterface {
  canShow: boolean
  height?: number
  onClose: Function
  closeClickOutside: boolean
}

const useFloatLayer = ({
  canShow,
  height,
  onClose,
  closeClickOutside,
}: useFloatLayerInterface): {
  getElementHeight: ({}: HTMLDivElement) => void
  useBottom: number | 'auto'
  useHeight: number
  useOpen: boolean
  useShow: boolean
  useWidth: number
  wrapperRef: { current: HTMLDivElement | null }
} => {
  const { useOpen, useShow } = useShowOpen({ canShow })

  const { ref: wrapperRef } = useClickOnOutside(() => closeClickOutside && onClose(), useShow)

  const { getElementHeight, useHeight, useWidth, useBottom } = useFloatLayerHeight(height)

  return {
    getElementHeight,
    useBottom,
    useHeight,
    useOpen,
    useShow,
    useWidth,
    wrapperRef,
  }
}

export default useFloatLayer
