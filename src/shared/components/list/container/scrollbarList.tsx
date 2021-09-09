import React, { ReactNode } from 'react'

import Scrollbar from 'shared/components/context/scrollbar'
interface WapperListInterface {
  children: ReactNode
  maxHeight: number
  isItems: boolean
  isPaginated: boolean
  scrollHeight: number
  onScroll?: Function
}

const ScrollbarList: React.FC<WapperListInterface> = ({
  children,
  maxHeight,
  isItems,
  isPaginated,
  scrollHeight,
  onScroll,
}) =>
  isItems ? (
    <Scrollbar
      stopPropagation={isPaginated}
      maxHeight={maxHeight}
      scrollHeight={scrollHeight}
      onScroll={onScroll}
    >
      {children}
    </Scrollbar>
  ) : (
    <div>{children}</div>
  )

export default ScrollbarList
