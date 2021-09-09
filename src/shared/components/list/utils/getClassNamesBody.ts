import classesBuilder from 'shared/utils/classesBuilder'

import { DataType } from '../types/list.type'
interface ClassNamesBodyInterface {
  dataItem: DataType
  style: any
}

function getClassNamesBody({ dataItem, style }: ClassNamesBodyInterface): string {
  const { darken } = dataItem

  const classNamesBuilder = {
    line: true,
    darken,
  }

  return classesBuilder(style, classNamesBuilder)
}

export default getClassNamesBody
