export type DataItemValueType = string | object | (({}: object) => any)

export type DataType = {
  align?: 'left' | 'center' | 'right' | 'justify'
  darken?: boolean
  fontWeight?: 'normal' | 'bold' | number
  sort?: boolean
  title?: string
  value: DataItemValueType
  width?: string
}

export type ListType = {
  data?: Array<any> | object | null
  dataList: DataType[]
  dataResolve?: string
  hideHeader?: boolean
  innerHeight?: number
  itemPushed?: boolean
  onClick?: Function
  onHover?: Function | boolean
  onPage?: Function
  onRefresher?: Function
  size: string | number
  scrollTo?: number
  textToEmpty?: string
}
