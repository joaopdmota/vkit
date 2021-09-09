export default function classesBuilder(styles: any, props: any): string {
  const generatedClasses: string[] = []
  const { ...rest } = props

  Object.keys(rest).forEach((key) => {
    const propValue = rest[key]

    if (propValue && styles[key]) {
      generatedClasses.push(styles[key])
    }
  })

  const classes = generatedClasses.join(' ')

  return classes
}
