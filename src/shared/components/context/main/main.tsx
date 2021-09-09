import React from 'react'

import classesBuilder from 'shared/utils/classesBuilder'

import UseTranslucent from './hooks/useTranslucent'

import MainType from './types/main.type'

import style from 'theme/context/main/main.module.scss'

const Main: React.FC<MainType> = ({ children, translucent, fullHeight }) => {
  const { isStyleTranslucent, useStylesInOvered } = UseTranslucent({
    isTranslucent: translucent,
  })

  const mainProps = {
    main: 'main',
    fullHeight,
  }

  return (
    <div className={classesBuilder(style, mainProps)}>
      {isStyleTranslucent && <div className={classesBuilder(style, useStylesInOvered)} />}
      {children}
    </div>
  )
}

export default Main
