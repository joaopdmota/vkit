import DataType from 'components/webform/select/types/data.type'

const dataValue = (item: DataType, selecteds: string | string[]): string | string[] => {
  if (Array.isArray(selecteds)) {
    const newValue = JSON.parse(JSON.stringify(selecteds))
    const indexFound = selecteds.findIndex((selected) => item.value === selected)

    if (indexFound >= 0) {
      newValue.splice(indexFound, 1)
    } else {
      newValue.push(item.value)
    }

    return newValue
  }

  return selecteds
}

const data = (item: DataType, selecteds: DataType[]): DataType[] => {
  if (Array.isArray(selecteds)) {
    const newValue = JSON.parse(JSON.stringify(selecteds))
    const indexFound = selecteds.findIndex(({ value }) => item.value === value)

    if (indexFound >= 0) {
      newValue.splice(indexFound, 1)
    } else {
      newValue.push(item)
    }

    return newValue
  }

  return selecteds
}

export default {
  data,
  dataValue,
}
