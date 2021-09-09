import { useState, useEffect } from 'react'

import { AccordionType, AccordionItemType } from '../types/accordion.type'

interface UseAccordionInterface {
  useAccordions: Array<any>
  setAccordions: Function
  handleChange: Function
}

const UseAccordion = (props: AccordionType): UseAccordionInterface => {
  const {
    body,
    cellSpacing,
    children,
    collapse,
    disabled,
    expanded,
    expandAll,
    full,
    group,
    height,
    title,
  } = props

  const [useAccordions, setAccordions] = useState<AccordionItemType[]>([])

  useEffect(() => {
    const accordions = group?.map((item: AccordionItemType, index: number) => {
      const {
        body: bodyInstance,
        children: childrenInstance,
        expanded: expandedInstance,
        disabled: disabledInstance,
        ...instance
      } = item.props || item

      return {
        ...instance,
        accordionItem: index,
        full,
        body: bodyInstance || childrenInstance,
        height,
        cellSpacing,
        expanded: expandAll || expandedInstance,
        disabled: disabledInstance,
      }
    }) || [
      {
        expanded,
        disabled,
        height,
        cellSpacing,
        body: body || children,
        title,
        full,
      },
    ]

    setAccordions(accordions)
  }, [
    cellSpacing,
    group,
    children,
    title,
    expanded,
    body,
    collapse,
    disabled,
    expandAll,
    full,
    height,
  ])

  const handleChange = (accItem: number): void => {
    setAccordions(
      useAccordions.map((item, index) => {
        const currentAccordion = index === accItem

        if (expandAll) {
          return {
            ...item,
            expanded: currentAccordion ? true : item.expanded,
          }
        }

        if (!expanded) {
          if (collapse) {
            return {
              ...item,
              expanded: currentAccordion ? !item.expanded : false,
            }
          }

          return {
            ...item,
            expanded: currentAccordion ? !item.expanded : item.expanded,
          }
        }

        return { ...item }
      }),
    )
  }

  return {
    useAccordions,
    setAccordions,
    handleChange,
  }
}

export default UseAccordion
