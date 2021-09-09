import { useEffect, useState } from 'react'

const UseLayer = (
  expanded: boolean,
): {
  getAccordionContent: ({}: HTMLDivElement) => void
  useAccordion: boolean
  useAccordionHeight: number
  setAccordion: Function
} => {
  const [useAccordionHeight, setAccordionHeight] = useState(0)
  const [useAccordion, setAccordion] = useState(false)

  useEffect(() => {
    setAccordion(!!expanded)
  }, [expanded])

  const getAccordionContent = (children: HTMLDivElement): void => {
    if (children) {
      const accordionCurrentHeight = useAccordion ? children.scrollHeight : 0

      setAccordionHeight(accordionCurrentHeight)
    }
  }

  return {
    getAccordionContent,
    useAccordion,
    useAccordionHeight,
    setAccordion,
  }
}

export default UseLayer
