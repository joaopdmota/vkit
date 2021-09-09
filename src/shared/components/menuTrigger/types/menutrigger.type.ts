import { MouseEventHandler } from 'react'

type MenuTriggerType = {
  collapsed?: boolean
  onClick: MouseEventHandler<HTMLDivElement>
}

export default MenuTriggerType
