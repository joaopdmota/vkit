import React from 'react'

import classesBuilder from 'shared/utils/classesBuilder'

import ScrollbarType from '../../types/scrollbar.type'

import UseScrollbar from './hooks/useScrollbar'

import { DEFAULT_MIN_SIZE_CONTENT } from '../../constants'

import style from 'theme/context/scrollbar/platform/web/scrollbar.module.scss'

const Scrollbar: React.FC<ScrollbarType> = ({
  children,
  maxHeight,
  scrollHeight,
  onlyWheel,
  onScroll,
  stopPropagation = false,
}) => {
  const { useRefScrollbar, useRefScrollContent } = UseScrollbar(onScroll, stopPropagation)

  return (
    <div className={style.scrollbarContext}>
      <div className={classesBuilder(style, { scrollbar: true, onlyWheel })}>
        <div className={style.track}>
          <div ref={useRefScrollbar} className={style.thumbDrag} />
          <div className={style.thumbDraggable} />
        </div>
      </div>
      <div
        ref={useRefScrollContent}
        className={style.content}
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
