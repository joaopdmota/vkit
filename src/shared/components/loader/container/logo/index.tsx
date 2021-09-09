import React from 'react'

import classesBuilder from 'shared/utils/classesBuilder'

import { LoaderSchemaType } from '../../types/loader.type'

import style from 'theme/components/loader/container/logo/logo.module.scss'

const LogoLoader: React.FC<LoaderSchemaType> = () => {
  const classNames = {
    logo: true,
  }

  return <div className={classesBuilder(style, classNames)} />
}

export default LogoLoader
