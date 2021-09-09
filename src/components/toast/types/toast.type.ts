type colors = 'danger' | 'info' | 'success' | 'warning' | 'default'

type ToastType = {
  action?: {
    label?: string
    icon?: string
    solo?: boolean
    onClick?: Function
  }
  align?: 'left' | 'center' | 'right'
  duration?: number
  elevation?: number
  icon?: string
  iconDir?: 'left' | 'right'
  instanceEmitter?: {
    open: () => void
    dismiss: () => void
  }
  position?: 'top' | 'center' | 'bottom'
  outlined?: boolean
  rounded?: boolean
  shadow?: boolean
  static?: boolean
  text: string
  title?: string
  titleColor?: colors
  type?: colors
}

export default ToastType
