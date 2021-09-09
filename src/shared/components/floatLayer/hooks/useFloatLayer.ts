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
  useHeight: number
  useOpen: boolean
  useShow: boolean
  wrapperRef: { current: HTMLDivElement | null }
} => {
  const { useOpen, useShow } = useShowOpen({ canShow })

  const { ref: wrapperRef } = useClickOnOutside(() => closeClickOutside && onClose())

  const { getElementHeight, useHeight } = useFloatLayerHeight(height)

  return {
    getElementHeight,
    useHeight,
    useOpen,
    useShow,
    wrapperRef,
  }
}

export default useFloatLayer
