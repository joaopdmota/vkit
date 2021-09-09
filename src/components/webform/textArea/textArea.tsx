import React, { FocusEvent, useEffect, useState } from 'react'

import { EventFieldType } from '../builder/types'
import Field from './container/field'
import { StatusEnum } from '../builder/enums'
import TextAreaType from './types/textArea.type'
import { WrapField } from '../builder/container/field'
import { classesBuilder } from 'shared/utils'
import style from 'theme/components/webform/textArea.module.scss'

const TextArea: React.FC<TextAreaType> = ({
  clearable,
  disabled,
  icon,
  label,
  large,
  medium,
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
  value,
}) => {
  const [ttfTextHelper, setTtfTextHelper] = useState<string>()
  const [ttfValue, setTtfValue] = useState<string>('')
  const [isTtfFocus, setTtfFocus] = useState<boolean>(false)
  const [ttfStatus, setTtfStatus] = useState<StatusEnum>()

  useEffect(() => {
    setTtfTextHelper(textHelper)
    setTtfStatus(status)
    if (value) setTtfValue(value as string)
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
    multiline: 'multiline',
    shadow,
    small,
    status: ttfStatus,
    textArea: 'textArea',
    textHelperTop,
  }

  return (
    <WrapField
      className={classesBuilder(style, ttfProps)}
      label={label}
      required={required}
      style={style}
      textHelper={ttfTextHelper}
      textHelperTop={textHelperTop}
    >
      <Field
        {...handles}
        clearable={clearable}
        disabled={disabled}
        icon={icon}
        placeholder={placeholder}
        required={required}
        setTtfStatus={setTtfStatus}
        setTtfTextHelper={setTtfTextHelper}
        setTtfValue={setTtfValue}
        status={ttfStatus}
        statusOrigin={status}
        value={ttfValue}
      />
    </WrapField>
  )
}

export default TextArea
