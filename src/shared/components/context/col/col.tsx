import React from 'react'

import classesBuilder from 'shared/utils/classesBuilder'

import ColType from './types/col.type'

import style from 'theme/context/col/col.module.scss'

const Col: React.FC<ColType> = ({ children, full, margin, padding }) => (
  <div
    className={classesBuilder(style, {
      col: true,
      full,
    })}
    style={{ margin, padding }}
  >
    {children}
  </div>
)

export default Col
