type Action = {
  onClick: Function
  label: string
  icon?: string
}

export type PopoverType = {
  actions: Action[]
  align?: 'left' | 'center' | 'right' | 'top' | 'bottom'
  position?: 'top' | 'right' | 'bottom' | 'left'
  iconDir?: 'left' | 'right'
  vertical?: boolean
}

export type PositionsType = {
  top: string[]
  right: string[]
  bottom: string[]
  left: string[]
}
