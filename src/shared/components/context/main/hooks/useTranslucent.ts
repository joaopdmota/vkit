import { useState, useEffect, useCallback } from 'react'

const UseTranslucent = ({
  isTranslucent,
}: {
  isTranslucent?: boolean
}): { isStyleTranslucent: boolean; useStylesInOvered: object } => {
  const [isStyleTranslucent, setStyleTranslucent] = useState<boolean>(false)
  const [useStylesInOvered, setStylesInOvered] = useState({
    translucent: true,
    active: false,
  })

  const applyStyleTranslucent = useCallback((isActive) => {
    setStylesInOvered((prevState) => ({
      ...prevState,
      active: isActive,
    }))
  }, [])

  const setEffectStyleTranslucent = useCallback(() => {
    if (isTranslucent !== undefined) {
      if (isTranslucent) {
        setStyleTranslucent(true)
        setTimeout(() => {
          applyStyleTranslucent(true)
        })
      } else {
        applyStyleTranslucent(false)
        setTimeout(() => {
          setStyleTranslucent(false)
        }, 1000)
      }
    }
  }, [applyStyleTranslucent, isTranslucent])

  useEffect(() => {
    setEffectStyleTranslucent()
  }, [isTranslucent, setEffectStyleTranslucent])

  return { isStyleTranslucent, useStylesInOvered }
}

export default UseTranslucent
