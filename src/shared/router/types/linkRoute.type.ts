import { ReactNode } from 'react'

type LinkRouteType = {
  children: ReactNode
  to: string
  transition?: 'fade' | 'slideToRight' | 'slideToLeft' | 'modal'
}

export default LinkRouteType
