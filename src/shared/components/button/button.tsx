import React, { MouseEvent } from 'react'

import { classesBuilder, getTextCapitalize } from 'shared/utils'
import Icon from 'shared/components/icon'
import Loader from 'shared/components/loader'

import ButtonType from './types/button.type'

import usePositions from './hooks/usePositions'

import style from 'theme/components/button/button.module.scss'

const Button: React.FC<ButtonType> = ({
  bold,
  color = 'default',
  children,
  disabled,
  full,
  icon,
  iconDir = 'left',
  iconColor,
  invertColor,
  label,
  loading,
  loaderType,
  ripple = true,
  rounded,
  outlined,
  shadow,
  solo,
  upperCase,
  size = 'medium',
  onClick,
  submit,
}) => {
  const { coords, isRippling, setCoords, setIsRippling, rippleEffectTimeRef } = usePositions()

  const isOnClick = onClick instanceof Function

  const btnProps = {
    bold,
    button: true,
    [color || '']: !disabled && color,
    [size || '']: size,
    [`icon${getTextCapitalize(iconDir)}`]: iconDir && label,
    pointer: isOnClick,
    disabled,
    full,
    iconOnly: !label,
    invertColor,
    loading,
    ripple: ripple && isOnClick,
    rounded,
    outlined,
    shadow,
    solo,
    upperCase,
  }

  const handleClick = (event: MouseEvent): void => {
    handleRippleEffect(event)
    onClick?.()
  }

  const handleRippleEffect = (event: MouseEvent): void => {
    if (btnProps?.ripple) {
      const button = event.target as HTMLInputElement
      const { left, top } = button.getBoundingClientRect()

      const { clientX, clientY } = event

      setCoords({ x: clientX - left, y: clientY - top })
      setIsRippling(true)

      rippleEffectTimeRef.current = window.setTimeout(() => {
        setIsRippling(false)
        setCoords(null)
      }, 500)
    }
  }

  return (
    <button
      disabled={disabled}
      onClick={ripple ? handleClick : onClick}
      className={classesBuilder(style, btnProps)}
      {...(submit && { type: 'submit' })}
    >
      <>
        {loading ? (
          <div className={style.loader}>
            <Loader type={loaderType} />
          </div>
        ) : (
          icon && <Icon name={icon} color={iconColor || color} />
        )}

        {children || label}

        {isRippling && (
          <span
            className={style.rippleEffect}
            style={{
              left: coords.x,
              top: coords.y,
            }}
          ></span>
        )}
      </>
    </button>
  )
}

export default Button
