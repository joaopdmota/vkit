import React from 'react'

import ContainerType from './types/container.type'

import style from 'theme/context/container/container.module.scss'

const Container: React.FC<ContainerType> = ({ children }) => (
  <div className={style.container}>
    <div className={style.wrapper}>{children}</div>
  </div>
)

export default Container
