import React from 'react'

import classesBuilder from 'shared/utils/classesBuilder'
import Icon from 'shared/components/icon'
import Button from 'shared/components/button'
import Image from 'shared/components/image'

import ChipType from './types/chip.type'

import style from 'theme/components/chip/chip.module.scss'

const Chip: React.FC<ChipType> = ({
  color = 'default',
  bold,
  button,
  full,
  icon,
  iconColor,
  image,
  invertColor,
  label,
  reverse,
  outlined,
  rounded,
  shadow,
  solo,
  upperCase,
  size = 'medium',
}) => {
  const classNamesChip = {
    chip: true,
    bold,
    [color || '']: color,
    [size || '']: size,
    reverse,
    full,
    iconOnly: !label,
    invertColor,
    outlined,
    rounded,
    shadow,
    solo,
    upperCase,
  }

  const classNamesAction = {
    action: button || image,
    pointer: !!(button?.onClick || image?.onClick),
  }

  const {
    color: colorButton,
    outlined: outlinedButton,
    icon: iconButton,
    iconColor: iconColorButton,
    invertColor: invertColorButton,
    size: sizeButton,
    solo: soloButton,
    shadow: shadowButton,
    label: labelButton,
    onClick: onClickButton,
  } = button || {}

  const { alt, src, size: sizeImage, shadow: shadowImage, onClick: onClickImage } = image || {}

  return (
    <div className={classesBuilder(style, classNamesChip)}>
      {icon && <Icon name={icon} color={iconColor || color} />}
      {label}
      <div className={classesBuilder(style, classNamesAction)}>
        {(button && (
          <Button
            icon={iconButton}
            iconColor={iconColorButton}
            color={colorButton}
            outlined={outlinedButton}
            solo={soloButton}
            size={sizeButton}
            shadow={shadowButton}
            onClick={onClickButton}
            label={labelButton}
            rounded={rounded}
            invertColor={invertColorButton}
          />
        )) ||
          (image && (
            <div onClick={onClickImage}>
              <Image
                alt={alt}
                {...(src ? { src } : null)}
                size={sizeImage || 'minor'}
                shadow={shadowImage}
                type={rounded ? 'circle' : 'rounded'}
              />
            </div>
          )) ||
          null}
      </div>
    </div>
  )
}

export default Chip
