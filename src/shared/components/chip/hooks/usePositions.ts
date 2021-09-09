import { useRef, useState } from 'react'

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
  const rippleEffectTimeRef = useRef(0)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isRippling, setIsRippling] = useState(false)

  return {
    coords,
    isRippling,
    setCoords,
    setIsRippling,
    rippleEffectTimeRef,
  }
}

export default UsePositions
