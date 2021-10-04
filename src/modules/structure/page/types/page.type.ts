import { ReactNode } from 'react'
import { RoutesGroupType } from './routesGroup.type'

type StructureAuthType = {
  children?: ReactNode
  routesGroups: RoutesGroupType[]
  options: {
    user: {
      name: string
      photo?: string
    }
    description: {
      portal: string
      general: string
      version: string
    }
  }
  translucent?: boolean
  baseUrl?: string
}

export default StructureAuthType
