import React from 'react'

import classesBuilder from 'shared/utils/classesBuilder'

import { LoaderSchemaType } from '../../types/loader.type'

import style from 'theme/components/loader/container/dotSpinner/dotSpinner.module.scss'

const dotNodes = Array.from(Array(6))

const DotSpinner: React.FC<LoaderSchemaType> = ({ full, color }) => {
  const classNames = {
    full,
    dotSpinner: true,
  }

  const loaderClassNames = {
    dot: true,
    [color || '']: color,
  }

  return (
    <div className={classesBuilder(style, classNames)}>
      {dotNodes.map((_, i) => (
        <div key={i} className={classesBuilder(style, loaderClassNames)} />
      ))}
    </div>
  )
}

export default DotSpinner
