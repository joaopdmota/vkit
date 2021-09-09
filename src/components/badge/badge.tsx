import React from 'react'

import BadgeType from './types/badge.type'

import classesBuilder from 'shared/utils/classesBuilder'
import getTextCapitalize from 'shared/utils/getTextCapitalize'
import compressNumber from 'shared/utils/compressNumber'

import style from 'theme/components/badge/badge.module.scss'

const Badge: React.FC<BadgeType> = ({
  align = 'top',
  position = 'right',
  color = 'danger',
  value,
}) => (
  <span
    className={classesBuilder(style, {
      [`align${getTextCapitalize(align)}`]: align,
      [`position${getTextCapitalize(position)}`]: position,
      badge: true,
      [color]: color,
      dot: !value,
    })}
  >
    {value ? compressNumber(value) : ''}
  </span>
)

export default Badge
