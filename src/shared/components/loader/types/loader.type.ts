
type colors = 'danger' | 'info' | 'light' | 'success' | 'warning' | 'default'

export type LoaderType = {
  label?: string
  type?: string
  full?: boolean
  color?: colors
}

export type LoaderSchemaType = {
  full?: boolean
  color?: colors
}
