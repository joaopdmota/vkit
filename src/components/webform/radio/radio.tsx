import React, { ChangeEvent, useEffect, useState } from 'react'

import RadioType from './types/radio.type'
import classesBuilder from 'shared/utils/classesBuilder'
import style from 'theme/components/webform/radio.module.scss'

const Radio: React.FC<RadioType> = ({
  checked,
  disabled,
  error,
  label,
  large,
  medium,
  name,
  onChange,
  small,
  textLeft,
  value,
}) => {
  const [isRdoDisabled, setRdoDisabled] = useState<boolean>(false)
  const [isRdoChecked, setRdoChecked] = useState<boolean>(false)

  useEffect(() => {
    setRdoChecked(!!checked)
    setRdoDisabled(!!disabled)
  }, [disabled, checked])

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => onChange?.(value, event)

  const rdoProps = {
    error,
    large,
    medium,
    small,
    textLeft,
  }

  return (
    <label className={`${style.radio} ${classesBuilder(style, rdoProps)}`}>
      <input
        checked={isRdoChecked}
        className={style.input}
        disabled={isRdoDisabled}
        name={name}
        onChange={handleChange}
        type="radio"
      />

      <div className={style.content}>
        <div className={style.box} />
        {label && <span className={style.label}>{label}</span>}
      </div>
    </label>
  )
}

export default Radio
