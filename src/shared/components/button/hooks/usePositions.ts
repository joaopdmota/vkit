import { useRef, useState, useEffect, useCallback } from 'react'

interface UsePositionsInterface {
  coords: {
    x: number
    y: number
  }
  isRippling: boolean
  setCoords: Function
  setIsRippling: Function
  rippleEffectTimeRef: {
    current: number
  }
}

const UsePositions = (): UsePositionsInterface => {
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isRippling, setIsRippling] = useState(false)
  const rippleEffectTimeRef = useRef(0)

  const cleanupTime = useCallback(() => window.clearTimeout(rippleEffectTimeRef.current), [])
  useEffect(() => {
    return cleanupTime
  }, [cleanupTime])

  return {
    coords,
    isRippling,
    setCoords,
    setIsRippling,
    rippleEffectTimeRef,
  }
}

export default UsePositions
