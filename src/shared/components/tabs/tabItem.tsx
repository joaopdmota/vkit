import React from 'react'

import style from 'theme/components/tabs/tabs.module.scss'

import classesBuilder from 'shared/utils/classesBuilder'

import { TabType } from './types/tabs.type'

const TabItem: React.FC<TabType> = (props) => {
  const { active, body } = props

  const classNames = {
    tabContent: true,
    active,
  }

  return <div className={classesBuilder(style, classNames)}>{body}</div>
}

export default TabItem
