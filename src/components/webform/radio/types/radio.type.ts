import RadioClasses from './radioClasses.type'

type RadioType = RadioClasses & {
  onChange: Function
  label?: string
  name?: string
  value: string | number
}

export default RadioType
