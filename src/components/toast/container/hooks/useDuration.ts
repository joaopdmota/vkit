import { useRef, useState, useCallback, useEffect } from 'react'

interface UseDurationInterface {
  duration?: number
  useShowLayer: boolean
  onCloseLayer: () => void
}

const UseDuration = ({ duration, useShowLayer, onCloseLayer }: UseDurationInterface): number => {
  const useRefTimeout = useRef(0)
  const useRefInterval = useRef(0)
  const useRefLastTimeDuration = useRef(0)
  const [useRestDuration, setRestDuration] = useState(100)

  const destroyTimeLapse = (): void => {
    clearTimeout(useRefTimeout.current)
    clearInterval(useRefInterval.current)
  }

  const setTimeLapse = useCallback(() => {
    if (duration && useShowLayer) {
      useRefLastTimeDuration.current = duration * 1000

      useRefTimeout.current = window.setTimeout(() => {
        useRefInterval.current = window.setInterval(() => {
          const { current: lastTime } = useRefLastTimeDuration
          useRefLastTimeDuration.current = lastTime - 100

          if (lastTime <= 0) {
            destroyTimeLapse()
            onCloseLayer()
          }
        }, 100)
        setRestDuration(0)
      }, 100)
    }
  }, [duration, onCloseLayer, useShowLayer])

  useEffect(() => {
    if (!useShowLayer) {
      destroyTimeLapse()
    } else {
      setTimeLapse()
    }
  }, [setTimeLapse, useShowLayer])

  useEffect(() => {
    return () => destroyTimeLapse()
  }, [])

  return useRestDuration
}

export default UseDuration
