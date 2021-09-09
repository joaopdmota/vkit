import React from 'react'

import classesBuilder from 'shared/utils/classesBuilder'

import BoxType from './types/box.type'

import style from 'theme/context/box/box.module.scss'

const Box: React.FC<BoxType> = ({ elevation, children, outlined, rounded, type }) => (
  <div
    className={classesBuilder(style, {
      box: true,
      [`elevation${elevation}`]: elevation,
      outlined,
      rounded,
      [type || '']: type,
    })}
  >
    <div className={style.wrapper}>{children}</div>
  </div>
)

export default Box
