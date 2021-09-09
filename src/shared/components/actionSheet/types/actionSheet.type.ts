import { MouseEventHandler } from 'react'

type ActionType = {
  label?: string
  icon?: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

type ActionSheetType = {
  actions: ActionType[]
  iconDir?: string
  title?: string
  vertical?: boolean
}

export default ActionSheetType
