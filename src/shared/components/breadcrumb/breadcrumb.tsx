import React from 'react'

import Icon from 'shared/components/icon'

import BreadcrumbType from './types/breadcrumb.type'

import style from 'theme/components/breadcrumb/breadcrumb.module.scss'

const Breadcrumb: React.FC<BreadcrumbType> = ({ historys }) => (
  <div className={style.breadcrumb}>
    {historys?.map((v, k) => (
      <a key={k} className={style.history} onClick={v?.onClick}>
        <div className={style.icon}>
          {!k ? (
            <Icon name="home-outline" size={16} />
          ) : (
            <Icon name="chevron-right-outline" size={24} />
          )}
        </div>
        <span>{v.name}</span>
      </a>
    ))}
  </div>
)

export default Breadcrumb
