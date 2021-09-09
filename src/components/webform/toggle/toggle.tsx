import React from 'react'

import ToggleType from './types/toggle.type'
import classesBuilder from 'shared/utils/classesBuilder'
import style from 'theme/components/webform/toggle.module.scss'

const Toggle: React.FC<ToggleType> = ({
  disabled,
  checked,
  handleChange,
  small,
  medium,
  large,
}) => {
  const handleClick = (): void => handleChange?.(checked)

  const toggleProps = { small, medium, large, switch: true }

  return (
    <label
      className={classesBuilder(style, {
        ...toggleProps,
      })}
    >
      <input
        type="checkbox"
        className={style.input}
        disabled={disabled}
        checked={checked}
        onChange={handleClick}
      />
      <span className={style.slider}></span>
    </label>
  )
}

export default Toggle
