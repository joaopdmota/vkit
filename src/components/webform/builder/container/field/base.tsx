import React from 'react'
import Icon from 'shared/components/icon'
import { StatusEnum } from '../../enums'
import { BaseFieldType } from './types/field.type'
import classesBuilder from 'shared/utils/classesBuilder'

type IconStatusType = { status?: StatusEnum; className: string }

const IconStatus: React.FC<IconStatusType> = ({ status, className }) => (
  <div className={className}>
    {status === StatusEnum.success && <Icon name="checkmark-circle-2-outline" size={20} />}
    {status === StatusEnum.error && <Icon name="close-circle-outline" size={20} />}
  </div>
)

const BaseField: React.FC<BaseFieldType> = ({
  clearable,
  contentRight,
  disabled,
  icon,
  iconDir = 'left',
  inputType = 'text',
  onBlur,
  onChange,
  onClear,
  onClick,
  onFocus,
  onKeyDown,
  onKeyPress,
  onKeyUp,
  placeholder,
  readOnly,
  setValueState,
  status,
  style,
  tagName = 'input',
  value,
}) => {
  const handles = {
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    onKeyPress,
    onKeyUp,
  }

  const atrributesField = {
    ...handles,
    className: style?.input,
    disabled,
    placeholder,
    readOnly,
    value: (value || '') as string,
  }

  return (
    <div className={style?.field}>
      {icon && iconDir !== 'right' && (
        <div className={style?.iconCustom}>
          <Icon name={icon} size={20} />
        </div>
      )}

      <div
        className={classesBuilder(style, {
          inputContent: true,
          readOnly,
        })}
        data-replicated-value={value}
      >
        {tagName === 'input' ? (
          <input {...atrributesField} type={inputType} />
        ) : (
          <textarea {...atrributesField} rows={1} />
        )}
      </div>

      {clearable && !disabled && (
        <div
          className={style?.iconClerable}
          onClick={() => {
            setValueState?.('')
            onClear?.()
          }}
        >
          <Icon name="close-outline" />
        </div>
      )}

      <IconStatus status={status} className={style?.iconStatus ?? ''} />

      {icon && iconDir === 'right' && (
        <div className={style?.iconCustom}>
          <Icon name={icon} size={20} />
        </div>
      )}

      {contentRight}
    </div>
  )
}

export default BaseField
