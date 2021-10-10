import * as Field from './container'

import React, { FocusEvent, useEffect, useState } from 'react'

import { EventFieldType } from '../builder/types'
import { StatusEnum } from '../builder/enums'
import TextFieldType from './types/textField.type'
import { WrapField } from '../builder/container/field'
import { classesBuilder } from 'shared/utils'
import style from 'theme/components/webform/textField.module.scss'

const TextField: React.FC<TextFieldType> = ({
  clearable,
  disabled,
  icon,
  label,
  large,
  medium,
  multiline,
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  onKeyPress,
  onKeyUp,
  placeholder,
  required,
  shadow,
  small,
  status,
  textHelper,
  textHelperTop,
  type = 'text',
  value,
  double,
  step,
  min,
  max,
  mask,
  iconDir = 'left',
}) => {
  const [ttfTextHelper, setTtfTextHelper] = useState<string>()
  const [ttfValue, setTtfValue] = useState<number | string | { min: number; max: number } | null>(
    value || null,
  )
  const [isTtfFocus, setTtfFocus] = useState<boolean>(false)
  const [ttfStatus, setTtfStatus] = useState<StatusEnum>()

  useEffect(() => {
    setTtfTextHelper(textHelper)
    setTtfStatus(status)
    if (value || value === '') setTtfValue(value)
  }, [value, textHelper, status])

  const handles: EventFieldType = {
    onBlur: (event: FocusEvent<HTMLInputElement>): void => {
      setTtfFocus(false)
      onBlur?.(event)
    },
    onChange,
    onFocus: (event: FocusEvent<HTMLInputElement>): void => {
      setTtfFocus(true)
      onFocus?.(event)
    },
    onKeyDown,
    onKeyPress,
    onKeyUp,
  }

  const ttfProps = {
    [ttfStatus as string]: ttfStatus,
    clearable: ttfValue && clearable,
    disabled,
    focus: isTtfFocus,
    icon,
    large,
    medium,
    multiline,
    shadow,
    small,
    status: ttfStatus,
    textField: 'textField',
    textHelperTop,
    type,
  }

  const ComponentField =
    {
      cep: Field.Cep,
      cnpj: Field.Cnpj,
      cpf: Field.Cpf,
      date: Field.Date,
      number: Field.Number,
      password: Field.Password,
      range: Field.Range,
      text: Field.Text,
    }[type] || Field.Text

  return (
    <WrapField
      className={classesBuilder(style, ttfProps)}
      label={label}
      required={required}
      style={style}
      textHelper={ttfTextHelper}
      textHelperTop={textHelperTop}
    >
      <ComponentField
        clearable={clearable}
        disabled={disabled}
        double={double}
        icon={icon}
        iconDir={iconDir}
        large={large}
        mask={mask}
        max={max}
        medium={medium}
        min={min}
        multiline={multiline}
        placeholder={placeholder}
        required={required}
        setTtfStatus={setTtfStatus}
        setTtfTextHelper={setTtfTextHelper}
        setTtfValue={setTtfValue}
        small={small}
        status={ttfStatus}
        statusOrigin={status}
        step={step}
        value={ttfValue}
        textHelper={ttfTextHelper}
        {...handles}
      />
    </WrapField>
  )
}

export default TextField
