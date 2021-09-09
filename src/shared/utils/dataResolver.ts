type dataResolverProps = {
  data: Array<any> | Object
  target: string
  childNode?: number
}

export default function dataResolver(props: dataResolverProps): Array<any> {
  const { data, target, childNode = 0 } = props

  const payload: Array<any> = []

  JSON.stringify(data, (_, nestedValues) => {
    const nestedTarget = nestedValues[target]

    if (nestedTarget) {
      payload.push(nestedTarget)
    }

    return nestedValues
  })

  return payload[childNode]
}
