import React, { useState, useCallback } from 'react'

import ToastType from '../types/toast.type'

const UseToast = (
  Layer: React.FC<ToastType>,
): {
  useProps: {
    align: string
    position: string
    isStatic: boolean
  }
  useToast: React.ReactElement[]
  openLayer: ({}: ToastType) => void
} => {
  const [useToast, setToast] = useState<React.ReactElement[]>([])
  const [useProps, setProps] = useState({
    align: '',
    position: '',
    isStatic: false,
  })

  const openLayer = useCallback(
    (props: ToastType) => {
      const { align, position, static: isLayerStatic } = props
      const toastView = <Layer {...props} />

      setProps({
        align: align || 'left',
        position: position || 'top',
        isStatic: !!isLayerStatic,
      })
      setToast((prevState) => [...prevState, ...[toastView]])
    },
    [Layer],
  )

  return { useToast, useProps, openLayer }
}

export default UseToast
