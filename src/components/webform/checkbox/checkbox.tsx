import React, { ChangeEvent, useEffect, useState } from 'react'

import CheckboxType from './types/checkbox.type'
import classesBuilder from 'shared/utils/classesBuilder'
import style from 'theme/components/webform/checkbox.module.scss'

const Checkbox: React.FC<CheckboxType> = ({
  checked,
  disabled,
  error,
  label,
  large,
  medium,
  noAnimation,
  onChange,
  rounded,
  small,
  textLeft,
}) => {
  const [isChbDisabled, setChbDisabled] = useState<boolean>(false)
  const [isChbChecked, setChbChecked] = useState<boolean>(false)

  useEffect(() => {
    setChbChecked(!!checked)
    setChbDisabled(!!disabled)
  }, [disabled, checked])

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void =>
    onChange?.(!isChbChecked, event)

  const chbProps = {
    error,
    large,
    medium,
    noAnimation,
    rounded,
    small,
    textLeft,
  }

  return (
    <label className={`${style.checkbox} ${classesBuilder(style, chbProps)}`}>
      <input
        type="checkbox"
        disabled={isChbDisabled}
        checked={isChbChecked}
        onChange={handleChange}
        className={style.input}
      />

      <div className={style.content}>
        <div className={style.box}>
          <div className={style.check} />
        </div>
        {label && <span className={style.label}>{label}</span>}
      </div>
    </label>
  )
}

export default Checkbox
