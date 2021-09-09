import React from 'react'

import classesBuilder from 'shared/utils/classesBuilder'

import style from 'theme/components/loader/container/spinnerProgress/spinnerProgress.module.scss'

import { LoaderSchemaType } from '../../types/loader.type'

const SpinnerProgress: React.FC<LoaderSchemaType> = ({ full, color }) => {
  const classNames = {
    full,
    spinnerProgress: true,
    [color || '']: color
  }

  return <div className={classesBuilder(style, classNames)} />
}

export default SpinnerProgress
