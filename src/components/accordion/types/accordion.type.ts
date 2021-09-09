import { ReactNode } from 'react'

export type AccordionItemType = {
  body?: ReactNode | boolean
  full?: boolean
  title?: string
  height?: number
  expanded?: boolean
  children?: ReactNode
  disabled?: boolean
  cellSpacing?: boolean
  props?: AccordionItemType
  accordionItem?: number
}

export type LayerType = AccordionItemType & {
  handleChange?: Function
  group?: boolean
}

export type AccordionType = AccordionItemType & {
  expandAll?: boolean
  collapse?: boolean
  group?: AccordionType[]
}
