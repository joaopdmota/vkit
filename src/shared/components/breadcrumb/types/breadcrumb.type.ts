type HistoryType = {
  onClick?: () => {}
  name: string
}

type BreadcrumbType = { historys: HistoryType[] }

export default BreadcrumbType
