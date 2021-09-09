export const findArray = (data: { [key: string]: any }, path: string): any => {
  if (!data || Array.isArray(data)) {
    return {
      array: data,
      path: '',
    }
  }

  const pathSplited = path
    .replace(/\[(\w+)\]/g, '.$1')
    .replace(/^\./, '')
    .split('.')

  let result = JSON.parse(JSON.stringify(data))
  const pathFound = []

  for (const key of pathSplited) {
    if (result[key]) {
      result = result[key]
      pathFound.push(isNaN(+key) ? `${key}` : `[${key}]`)
    } else if (Array.isArray(result)) {
      break
    } else {
      return null
    }
  }

  return {
    array: Array.isArray(result) ? result : null,
    path: pathFound.join('.'),
  }
}

export default findArray
