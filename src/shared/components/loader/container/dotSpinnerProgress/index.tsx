import React from 'react'

import classesBuilder from 'shared/utils/classesBuilder'

import { LoaderSchemaType } from '../../types/loader.type'

import style from 'theme/components/loader/container/dotSpinnerProgress/dotSpinnerProgress.module.scss'

const dotNodes = Array.from(Array(12))

const SpinnerCircleProgressLoader: React.FC<LoaderSchemaType> = ({ full, color }) => {
  const classNames = {
    full,
    dotSpinnerProgress: true,
  }

  const loaderClassNames = {
    dot: true,
    [color || '']: color
  }

  return (
    <div className={classesBuilder(style, classNames)}>
      {dotNodes.map((_, i) => (
        <div key={i} className={classesBuilder(style, loaderClassNames)} />
      ))}
    </div>
  )
}

export default SpinnerCircleProgressLoader
