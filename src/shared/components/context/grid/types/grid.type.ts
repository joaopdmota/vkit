import { ReactNode } from 'react'

type GridType = {
  alignContent?: 'left' | 'right' | 'center' | 'justify' | 'justifyCenter'
  alignItems?: 'top' | 'bottom' | 'center'
  children: ReactNode
  column?: boolean
  columnReverse?: boolean
  growing?: boolean
  row?: boolean
  rowReverse?: boolean
  stretch?: boolean
  wrap?: boolean
}

export default GridType
