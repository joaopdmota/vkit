import { apiService } from 'services'
import { getByPath } from 'shared/utils'
import findArray from './findArray'

import DataType from 'components/webform/select/types/data.type'

interface requestDataInterface {
  headers?: Headers
  params?: { [key: string]: string | number }
  prevData?: DataType[]
  responseText: string | Function
  responseValue: string
  rootPath?: string
  router: string
  uri?: string
}

export const requestData = async ({
  headers,
  params,
  prevData = [],
  rootPath,
  responseText,
  responseValue,
  router,
  uri,
}: requestDataInterface): Promise<DataType[] | null> => {
  let result: DataType[] = []

  try {
    const api = Object.create(apiService)

    if (uri) {
      api.config({
        uri,
        headers,
        timeout: 300000,
      })
    }

    const response = await api.request({
      router,
      params,
    })

    const { array: items = [], path: pathFound } = findArray(response, rootPath || '') || {}

    const valuePath = responseValue.replace(`${pathFound}.`, '')

    const content = items.map((item: Object) => ({
      text:
        typeof responseText === 'function'
          ? responseText(item)
          : getByPath(item, responseText.replace(`${pathFound}.`, '')),
      value: getByPath(item, valuePath),
    }))

    result = [...prevData, ...content]
  } catch (error) {
    // TO DO: criar um serviço de log
  } finally {
    return result
  }
}

export default requestData
