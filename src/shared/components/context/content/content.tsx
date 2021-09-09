import React from 'react'

import Scrollbar from 'shared/components/context/scrollbar'

import ContentType from './types/content.type'

import style from 'theme/context/content/content.module.scss'

const Content: React.FC<ContentType> = ({ height, children }) => (
  <div className={style.content} style={{ height }}>
    <Scrollbar maxHeight={height}>{children}</Scrollbar>
  </div>
)

export default Content
