import React, { useEffect } from 'react'

import * as eva from 'eva-icons'

import classesBuilder from 'shared/utils/classesBuilder'

import IconType from './types/icon.type'

import style from 'theme/components/icon/icon.module.scss'

const Icon: React.FC<IconType> = ({ animation, solo = true, color, infinite, name, size = 20 }) => {
  const isIcon = !!eva.icons[name]

  useEffect(() => {
    if (isIcon) {
      eva.replace()
    }
  }, [isIcon, name])

  const iconProps = {
    [color || '']: color,
    solo,
    icon: true,
  }

  return (
    <span className={classesBuilder(style, iconProps)}>
      <i
        {...(isIcon
          ? {
              'data-eva': name,
              'data-eva-animation': animation,
              'data-eva-height': size,
              'data-eva-infinite': infinite,
              'data-eva-width': size,
            }
          : {
              className: classesBuilder(style, {
                iconCustom: true,
                [`icon${name}`]: true,
              }),
              style: {
                width: size,
                height: size,
              },
            })}
      />
    </span>
  )
}

export default Icon
