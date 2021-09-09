import React from 'react'

import classesBuilder from 'shared/utils/classesBuilder'

import style from 'theme/components/loader/container/spinnerProgressFade/spinnerProgressFade.module.scss'

import { LoaderSchemaType } from '../../types/loader.type'

const SpinnerProgressFade: React.FC<LoaderSchemaType> = ({ full, color }) => {
  const classNames = {
    full,
    spinnerProgressFade: true,
    [color || '']: color
  }

  return <div className={classesBuilder(style, classNames)} />
}

export default SpinnerProgressFade
