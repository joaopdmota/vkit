import { useCallback, useEffect, useRef } from 'react'

const useClickOnOutside = (
  fnCallback: Function,
  canCallFnCallback: boolean
): {
  ref: { current: HTMLDivElement | null }
} => {
  const ref = useRef<HTMLDivElement>(null)

  const onClickOutside = useCallback(
    (event: MouseEvent): void => {
      if (!(ref.current && ref.current.contains(event.target as Node)) && canCallFnCallback) {
        fnCallback()
      }
    },
    [fnCallback, ref, canCallFnCallback],
  )

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [onClickOutside])

  return {
    ref,
  }
}

export default useClickOnOutside
