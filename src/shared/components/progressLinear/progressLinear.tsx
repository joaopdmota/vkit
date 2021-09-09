import React from 'react'

import classesBuilder from 'shared/utils/classesBuilder'

import ProgressLinearType from './types/progressLinear.type'

import style from 'theme/components/progressLinear/progressLinear.module.scss'

const ProgressLinear: React.FC<ProgressLinearType> = ({ color, percent, visiblePercent }) => {
  const classNamesProgressLinear = {
    progressLinear: 'progressLinear',
    indeterminate: !percent,
  }

  const classNamesProgressResize = {
    [color || '']: color,
    resize: 'resize',
    visiblePercent: visiblePercent,
  }

  return (
    <div className={classesBuilder(style, classNamesProgressLinear)}>
      {percent ? (
        <div
          className={classesBuilder(style, classNamesProgressResize)}
          data-resize={percent}
          style={{ width: percent }}
        />
      ) : null}
    </div>
  )
}

export default ProgressLinear
