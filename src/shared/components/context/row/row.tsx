import React from 'react'

import RowType from './types/row.type'

import styleModule from 'theme/context/row/row.module.scss'

const Row: React.FC<RowType> = ({ children, style }) => (
  <div className={styleModule.row} {...(style ? { style } : null)}>
    {children}
  </div>
)

export default Row
