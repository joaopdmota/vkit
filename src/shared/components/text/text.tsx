import React, { useCallback } from 'react'

import { classesBuilder, getTextCapitalize } from 'shared/utils'
import Icon from 'shared/components/icon'

import TextType from './types/text.type'

import style from 'theme/components/text/text.module.scss'

const Text: React.FC<TextType> = ({
  color,
  applyBaseColor,
  fontWeight,
  icon,
  iconColor,
  iconDir = 'left',
  iconSize,
  lines,
  margin,
  padding,
  rounded,
  size = 'small',
  textAlign,
  title,
  value,
}) => {
  const classNames = classesBuilder(style, {
    async: !value,
    bgColor: applyBaseColor,
    [color || '']: color,
    rounded,
    [size]: size,
    text: true,
    title,
  })

  const classNamesWrapper = classesBuilder(style, {
    [`iconColor${iconColor}`]: iconColor && icon,
    [`icon${getTextCapitalize(iconDir || '')}`]: iconDir && icon,
    icon,
    wrapper: true,
  })

  const getRef = useCallback(
    (ref: HTMLDivElement): void => {
      if (ref) {
        const sizes = ['minor', 'small', 'medium', 'larger', 'xLarger']
        const titleHead = sizes.reverse()?.indexOf(size) + 1

        const tagHead = `<h${titleHead}>${value || '&nbsp;'}</h${titleHead}>`
        const tagBody = value ? `<p>${value}</p>` : '&nbsp;'

        ref.innerHTML = title ? tagHead : tagBody
      }
    },
    [size, value, title],
  )

  const elementNode = (index?: number): object => {
    return (
      <div key={index} className={classNamesWrapper} style={{ fontWeight, textAlign }}>
        {icon && value ? <Icon name={icon} size={iconSize} color={iconColor} /> : ''}
        <div className={style.context} ref={getRef}></div>
      </div>
    )
  }

  const lineCount = Array.from(Array(lines))

  return (
    <div className={classNames} style={{ ...(value || !lines ? { padding } : null), margin }}>
      {!value && lines && lines > 1 ? lineCount.map((_, i) => elementNode(i)) : elementNode()}
    </div>
  )
}

export default Text
