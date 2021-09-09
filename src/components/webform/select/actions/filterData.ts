import DataType from 'components/webform/select/types/data.type'

export const filterData = (list: DataType[] | null = [], term: string): DataType[] | null => {
  if (!list) {
    return list
  }
  const filtereds = list.filter((item: DataType) => RegExp(term, 'i').test(item.text))
  return filtereds.length ? filtereds : null
}

export default filterData
