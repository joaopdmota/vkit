import { FieldBaseType, InputEnum, TagNameEnum } from '../types/fieldBase.type'
import React, { ChangeEvent, FocusEvent, useEffect, useState, useCallback, useRef } from 'react'

import { BaseField } from '../../builder/container/field'
import { EventFieldType } from '../../builder/types'
import { createValidation } from '../../builder/validates'
import style from 'theme/components/webform/textField.module.scss'

const FieldBase: React.FC<FieldBaseType> = ({
  clearable,
  contentRight,
  disabled,
  handleBeforeChange,
  icon,
  inputType = 'text',
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
  tagName: TagName = 'input',
  type = 'text',
  value,
}) => {
  const [isTtfValidated, setTtfValidated] = useState<boolean>(false)
  const inputTypeRef = useRef<string>()

  const validateTextField = createValidation({
    setHelperState: setTtfTextHelper,
    setStatusState: setTtfStatus,
    setValidatedState: setTtfValidated,
    status: statusOrigin,
    textHelper,
    type,
    required,
  })

  const treatValue = useCallback(
    (newValue?: string, isValidated = false): void => {
      const text: string = handleBeforeChange?.(newValue) ?? newValue
      if (isValidated) validateTextField(text)
      setTtfValue(text)
    },
    [handleBeforeChange, validateTextField, setTtfValue],
  )

  const retreatValue = useCallback(() => treatValue(value as string, true), [value, treatValue])

  const handles: EventFieldType = {
    onBlur: (event: FocusEvent<HTMLInputElement>): void => {
      validateTextField(event.target.value)
      onBlur?.(event.target.value, event)
    },
    onChange: (event: ChangeEvent<HTMLInputElement>): void => {
      treatValue(event.target.value, isTtfValidated)
      onChange?.(event.target.value, event)
    },
    onFocus,
    onKeyDown,
    onKeyPress,
    onKeyUp,
  }

  useEffect(() => {
    if (type !== inputTypeRef.current) {
      retreatValue()
      inputTypeRef.current = type
    }
  }, [type, retreatValue])

  return (
    <BaseField
      clearable={clearable}
      contentRight={contentRight}
      disabled={disabled}
      icon={icon}
      inputType={inputType as InputEnum}
      placeholder={placeholder}
      setValueState={setTtfValue}
      status={status}
      style={style}
      tagName={TagName as TagNameEnum}
      value={value}
      {...handles}
    />
  )
}

export default FieldBase
