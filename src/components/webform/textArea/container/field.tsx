import { FieldBaseType, TagNameEnum } from '../types/field.type'
import React, { ChangeEvent, FocusEvent, useState } from 'react'

import { BaseField } from '../../builder/container/field'
import { EventFieldType } from '../../builder/types'
import { createValidation } from '../../builder/validates'
import style from 'theme/components/webform/textArea.module.scss'

const Field: React.FC<FieldBaseType> = ({
  clearable,
  disabled,
  handleBeforeChange,
  icon,
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  onKeyPress,
  onKeyUp,
  placeholder,
  required,
  setTtfTextHelper,
  setTtfStatus,
  setTtfValue,
  textHelper,
  status,
  statusOrigin,
  value,
}) => {
  const [isTtfValidated, setTtfValidated] = useState<boolean>(false)

  const validateTextField = createValidation({
    setHelperState: setTtfTextHelper,
    setStatusState: setTtfStatus,
    setValidatedState: setTtfValidated,
    status: statusOrigin,
    textHelper,
    required,
  })

  const treatValue = (value?: string, isValidated = false): void => {
    const text: string = handleBeforeChange?.(value) ?? value
    if (isValidated) validateTextField(text)
    setTtfValue(text)
  }

  const handles: EventFieldType = {
    onBlur: (event: FocusEvent<HTMLInputElement>): void => {
      validateTextField(event.target.value)
      onBlur?.(event)
    },
    onChange: (event: ChangeEvent<HTMLInputElement>): void => {
      treatValue(event.target.value, isTtfValidated)
      onChange?.(event)
    },
    onFocus,
    onKeyDown,
    onKeyPress,
    onKeyUp,
  }

  return (
    <BaseField
      {...handles}
      clearable={clearable}
      disabled={disabled}
      icon={icon}
      placeholder={placeholder}
      status={status}
      tagName={TagNameEnum.textarea}
      value={value}
      setValueState={setTtfValue}
      style={style}
    />
  )
}

export default Field
