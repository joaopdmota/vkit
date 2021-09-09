import { MouseEventHandler, ReactElement } from 'react'

export type TabType = {
  label?: string
  icon?: string
  body: ReactElement
  active?: boolean
  disabled?: boolean
}

export type TabsType = {
  activeElement: number
  iconDir?: string
  center?: boolean
  full?: boolean
  rounded?: boolean
  solo?: boolean
  outlined?: boolean
  onChange?: MouseEventHandler<HTMLButtonElement>
  actions: TabType[] | []
}
