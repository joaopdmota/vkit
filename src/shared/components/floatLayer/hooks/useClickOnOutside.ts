import { useCallback, useEffect, useRef } from 'react'

const useClickOnOutside = (
  fnCallback: Function,
): {
  ref: { current: HTMLDivElement | null }
} => {
  const ref = useRef<HTMLDivElement>(null)

  const onClickOutside = useCallback(
    (event: MouseEvent): void => {
      if (ref.current && ref.current.contains(event.target as Node)) {
        return
      }
      fnCallback()
    },
    [fnCallback, ref],
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
