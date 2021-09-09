import React from 'react'

import classesBuilder from 'shared/utils/classesBuilder'

import DividerType from './types/divider.type'

import style from 'theme/components/divider/divider.module.scss'

const Divider: React.FC<DividerType> = ({ vertical }) => (
  <hr className={classesBuilder(style, { divider: true, vertical })} />
)

export default Divider
