import { ReactNode } from 'react'

type colors = 'danger' | 'info' | 'light' | 'success' | 'warning' | 'default'
type sizes = 'minor' | 'small' | 'medium' | 'larger' | 'xLarger'

type ButtonType = {
  color?: colors
  outlined?: boolean
  icon?: string
  iconColor?: colors
  invertColor?: boolean
  label?: string
  size?: sizes
  solo?: boolean
  shadow?: boolean
  onClick?: () => void
}

type ImageType = {
  alt?: string
  size?: sizes
  src?: string
  shadow?: boolean
  onClick?: () => void
}

type ChipClassType = {
  bold?: boolean
  color?: colors
  full?: boolean
  invertColor?: boolean
  reverse?: boolean
  rounded?: boolean
  outlined?: boolean
  upperCase?: boolean
  shadow?: boolean
  solo?: boolean
  size?: sizes
}

type ChipType = ChipClassType & {
  button?: ButtonType
  children?: ReactNode
  icon?: string
  iconColor?: colors
  image?: ImageType
  label?: string
}

export default ChipType
