export const getByPath = (data: { [key: string]: any }, path: string): any => {
  const pathSplited = path
    .replace(/\[(\w+)\]/g, '.$1')
    .replace(/^\./, '')
    .split('.')

  let result = JSON.parse(JSON.stringify(data))

  for (const key of pathSplited) {
    result = result[key] || null
  }

  return result
}

export default getByPath
