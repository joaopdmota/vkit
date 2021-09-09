import { useRef, useState, useCallback, useEffect } from 'react'

interface UseDurationInterface {
  duration?: number
  isSliding?: boolean
  useIndexSlider: number
  finishDuration: () => void
}

const UseDuration = ({ duration, isSliding, finishDuration }: UseDurationInterface): number => {
  const useRefTimeout = useRef(0)
  const useRefInterval = useRef(0)
  const useRefLastTimeDuration = useRef(0)
  const [useDuration, setDuration] = useState(100)

  const destroyTimeLapse = (): void => {
    clearTimeout(useRefTimeout.current)
    clearInterval(useRefInterval.current)
  }

  const setTimeLapse = useCallback(() => {
    if (duration && isSliding) {
      useRefLastTimeDuration.current = duration * 1000

      useRefTimeout.current = window.setTimeout(() => {
        useRefInterval.current = window.setInterval(() => {
          const { current: lastTime } = useRefLastTimeDuration
          useRefLastTimeDuration.current = lastTime - 100

          if (lastTime <= 0) {
            destroyTimeLapse()
            finishDuration()
          }
        }, 100)
        setDuration(0)
      }, 100)
    }
  }, [duration, finishDuration, isSliding])

  useEffect(() => {
    destroyTimeLapse()
    setTimeLapse()
    return () => destroyTimeLapse()
  }, [setTimeLapse])

  return useDuration
}

export default UseDuration
