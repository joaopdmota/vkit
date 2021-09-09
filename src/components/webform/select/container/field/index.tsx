import React, { ChangeEvent, FocusEvent, useEffect, useState } from 'react'

import FieldType from 'components/webform/select/types/field.type'
import DataType from 'components/webform/select/types/data.type'

import { BaseField } from 'components/webform/builder/container/field'
import { EventFieldType } from 'components/webform/builder/types'
import { createValidation } from 'components/webform/builder/validates'

import style from 'theme/components/webform/select/select.module.scss'

type FieldSelectedType = FieldType & {
  selected?: DataType | DataType[] | null
  autocomplete?: boolean
  onSearch?: Function
  onClear?: Function
}

const Field: React.FC<FieldSelectedType> = ({
  autocomplete,
  clearable,
  contentRight,
  disabled,
  icon,
  onBlur,
  onClear,
  onChange,
  onClick,
  onSearch,
  onFocus,
  onKeyDown,
  onKeyPress,
  onKeyUp,
  placeholder,
  required,
  setStatus,
  setTextHelper,
  status,
  statusOrigin,
  textHelper,
  selected,
  value,
}) => {
  const [useValidated, setValidated] = useState<boolean>(false)
  const [useValue, setValue] = useState<string>('')

  const validateTextField = createValidation({
    setHelperState: setTextHelper,
    setStatusState: setStatus,
    setValidatedState: setValidated,
    status: statusOrigin,
    textHelper,
    required,
  })

  const handleBeforeChange = (selected?: DataType | DataType[] | null): string => {
    if (!selected) {
      return ''
    }

    if (Array.isArray(selected)) {
      if (selected.length > 1) {
        return `${selected.length} Selecionados`
      }

      if (selected.length === 1) {
        return selected[0].text
      }

      return ''
    }

    return selected.text
  }

  useEffect(() => {
    const text = (value as string) ?? handleBeforeChange(selected)
    if (useValidated) validateTextField(text)
    setValue(text)
  }, [selected, validateTextField, useValidated, value])

  const handles: EventFieldType = {
    onBlur: (event: FocusEvent<HTMLInputElement>): void => {
      validateTextField(event.target.value)
      onBlur?.(event)
    },
    onChange: (event: ChangeEvent<HTMLInputElement>): void => {
      validateTextField(event.target.value)
      onChange?.(event.target.value)

      if (event.target.value !== value) {
        onSearch?.(event)
      }
    },
    onClick,
    onFocus,
    onKeyDown,
    onKeyPress,
    onKeyUp,
  }

  return (
    <BaseField
      clearable={clearable}
      contentRight={contentRight}
      disabled={disabled}
      icon={icon}
      onClear={onClear}
      placeholder={placeholder}
      readOnly={!autocomplete}
      status={status}
      style={style}
      value={useValue}
      {...handles}
    />
  )
}

export default Field
