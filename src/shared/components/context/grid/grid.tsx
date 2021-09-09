import React from 'react'

import classesBuilder from 'shared/utils/classesBuilder'

import GridType from './types/grid.type'

import style from 'theme/context/grid/grid.module.scss'

const Grid: React.FC<GridType> = ({
  alignContent = 'left',
  alignItems = 'top',
  children,
  column,
  columnReverse,
  growing,
  row,
  rowReverse,
  stretch,
  wrap,
}) => {
  const classNames = {
    [`alignContent_${alignContent}`]: alignContent || null,
    [`alignItems_${alignItems}`]: alignItems || null,
    column,
    columnReverse,
    grid: true,
    growing,
    row,
    rowReverse,
    stretch,
    wrap,
  }
  return <div className={classesBuilder(style, classNames)}>{children}</div>
}

export default Grid
