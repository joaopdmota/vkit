import React from 'react'

import classesBuilder from 'shared/utils/classesBuilder'

import { DEFAULT_MIN_SIZE_CONTENT } from '../../constants'

import ScrollbarType from '../../types/scrollbar.type'

import UseScrollbar from './hooks/useScrollbar'

import style from 'theme/context/scrollbar/platform/mobile/scrollbar.module.scss'

const Scrollbar: React.FC<ScrollbarType> = ({
  maxHeight,
  scrollHeight,
  onlyWheel,
  onScroll,
  children,
}) => {
  const useRefScrollContent = UseScrollbar(onScroll)

  return (
    <div className={style.scrollbarContext}>
      <div
        ref={useRefScrollContent}
        className={classesBuilder(style, { content: true, onlyWheel })}
        style={{ maxHeight: maxHeight || DEFAULT_MIN_SIZE_CONTENT }}
      >
        <div className={style.children} style={{ height: scrollHeight }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Scrollbar
