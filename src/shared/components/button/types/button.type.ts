import { ReactNode } from 'react'

type colors = 'danger' | 'info' | 'light' | 'success' | 'warning' | 'default'

type ButtonClassType = {
  color?: colors
  full?: boolean
  bold?: boolean
  disabled?: boolean
  invertColor?: boolean
  outlined?: boolean
  rounded?: boolean
  upperCase?: boolean
  shadow?: boolean
  ripple?: boolean
  loading?: boolean
  solo?: boolean
  size?: 'minor' | 'small' | 'medium' | 'larger' | 'xLarger'
}

type ButtonType = ButtonClassType & {
  children?: ReactNode
  icon?: string
  iconColor?: colors
  iconDir?: 'left' | 'right'
  label?: string
  loaderType?:
    | 'dot'
    | 'dotSpinner'
    | 'dotSpinnerProgress'
    | 'spinnerProgress'
    | 'spinnerProgressFade'
  onClick?: () => void
  submit?: boolean
}

export default ButtonType
