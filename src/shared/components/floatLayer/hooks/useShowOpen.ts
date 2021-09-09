import { useState, useEffect, useCallback, useRef } from 'react'

interface useShowOpenInterface {
  canShow?: boolean
  timeEffect?: number
}

const useShowOpen = ({
  canShow,
  timeEffect = 300,
}: useShowOpenInterface): {
  useOpen: boolean
  useShow: boolean
  setShow: Function
  setOpen: Function
} => {
  const [useShow, setShow] = useState(false)
  const [useOpen, setOpen] = useState(false)
  const useTimeoutRef = useRef(0)

  useEffect(() => {
    return () => clearTimeout(useTimeoutRef.current)
  }, [])

  const onShowOpen = useCallback(() => {
    setOpen(true)
    clearTimeout(useTimeoutRef.current)
    setTimeout(() => {
      setShow(true)
    })
  }, [])

  const offShowOpen = useCallback(() => {
    setShow(false)
    useTimeoutRef.current = window.setTimeout(() => {
      setOpen(false)
    }, timeEffect)
  }, [timeEffect])

  useEffect(() => {
    canShow ? onShowOpen() : offShowOpen()
  }, [onShowOpen, offShowOpen, canShow])

  return {
    useOpen,
    useShow,
    setShow,
    setOpen,
  }
}

export default useShowOpen
