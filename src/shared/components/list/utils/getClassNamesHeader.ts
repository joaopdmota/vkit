import { classesBuilder, getTextCapitalize } from 'shared/utils'

import { DataType } from '../types/list.type'
interface ClassNamesHeaderInterface {
  header: DataType
  isSortable: boolean
  style: any
  useItemSortable: {
    itemName: string
    sort: string
  }
}

function getClassNamesHeader({
  header,
  isSortable,
  style,
  useItemSortable,
}: ClassNamesHeaderInterface): string {
  const { align, value } = header
  const { itemName, sort } = useItemSortable

  const classNamesBuilder = {
    alignRight: align === 'right',
    line: true,
    sort: isSortable,
    [`sort${getTextCapitalize(sort)}`]: isSortable && itemName === value,
  }

  return classesBuilder(style, classNamesBuilder)
}

export default getClassNamesHeader
