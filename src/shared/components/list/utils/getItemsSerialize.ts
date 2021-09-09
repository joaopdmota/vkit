import { DataItemValueType } from '../types/list.type'

interface ItemsSerializeInterface {
  dataItemValue: DataItemValueType
  item: object
}

function getItemsSerialize({ dataItemValue, item }: ItemsSerializeInterface): DataItemValueType {
  const typeValue = typeof dataItemValue

  switch (typeValue) {
    case 'string':
      const name = dataItemValue as keyof typeof item
      return item[name]
    case 'function':
      return (dataItemValue as Function)(item)
    default:
      return dataItemValue
  }
}

export default getItemsSerialize
