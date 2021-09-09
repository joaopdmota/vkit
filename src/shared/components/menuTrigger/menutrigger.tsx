import React from 'react'

import classesBuilder from 'shared/utils/classesBuilder'

import MenuTriggerType from './types/menutrigger.type'

import style from 'theme/components/menu/menutrigger.module.scss'

const MenuTrigger: React.FC<MenuTriggerType> = ({ collapsed, onClick }) => (
  <div className={style.menuTrigger} onClick={onClick}>
    <div
      className={classesBuilder(style, {
        icon: true,
        collapsed,
      })}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
)

export default MenuTrigger
