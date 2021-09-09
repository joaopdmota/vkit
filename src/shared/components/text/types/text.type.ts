type colors = 'danger' | 'info' | 'light' | 'success' | 'warning' | 'default'

type TextType = {
  applyBaseColor?: boolean
  async?: boolean
  color?: colors
  fontWeight?: 'normal' | 'bold' | number
  icon?: string
  iconColor?: colors
  iconDir?: 'left' | 'right'
  iconSize?: number
  lines?: number
  margin?: string
  padding?: string
  rounded?: boolean
  size?: 'minor' | 'small' | 'medium' | 'larger' | 'xLarger'
  textAlign?: 'left' | 'right' | 'center' | 'justify'
  title?: boolean
  value: string
}

export default TextType
