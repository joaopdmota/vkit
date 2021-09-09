import CheckboxClasses from './checkboxClasses.type'

type CheckboxType = CheckboxClasses & {
  onChange?: Function
  label?: string
}

export default CheckboxType
