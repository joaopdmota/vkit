import { ReactNode } from 'react'

type BoxType = {
  elevation?: number
  children: ReactNode
  outlined?: boolean
  rounded?: boolean
  type?: 'sheet' | 'card'
}

export default BoxType
