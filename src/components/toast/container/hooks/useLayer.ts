import { useState, useCallback, useEffect } from 'react'

const UseLayer = (): {
  useOpenLayer: boolean
  useShowLayer: boolean
  onOpenLayer: () => void
  onCloseLayer: () => void
} => {
  const [useOpenLayer, setOpenLayer] = useState(false)
  const [useShowLayer, setShowLayer] = useState(false)

  const onOpenLayer = useCallback(() => {
    setOpenLayer(true)
    setTimeout(() => {
      setShowLayer(true)
    })
  }, [])

  const onCloseLayer = useCallback(() => {
    setShowLayer(false)
    setTimeout(() => {
      setOpenLayer(false)
    }, 500)
  }, [])

  useEffect(() => {
    onOpenLayer()
  }, [onOpenLayer])

  return { useOpenLayer, useShowLayer, onOpenLayer, onCloseLayer }
}

export default UseLayer
