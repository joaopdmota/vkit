import React, { useLayoutEffect, useRef, useState, ReactNode } from 'react'

import classesBuilder from 'shared/utils/classesBuilder'
import style from 'theme/components/tabs/components/toggleContent.module.scss'

type toggleContentType = {
  visible: boolean
  children: ReactNode
  order?: number
}

const ToggleContent: React.FC<toggleContentType> = ({ visible = false, children, order = 1 }) => {
  const [useShow, setShow] = useState(false)
  const [useVisibleOpacity, setVisibleOpacity] = useState(false)

  const showHideRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const timer = useRef(0)

  useLayoutEffect(() => {
    clearTimeout(timer.current)

    if (visible) {
      setShow(true)

      if (showHideRef?.current) {
        showHideRef.current.style.height = '0px'
      }

      window.setTimeout(() => {
        if (showHideRef?.current && contentRef?.current) {
          setVisibleOpacity(true)
          showHideRef.current.style.height = `${contentRef.current.offsetHeight}px`
        }
      }, (order - 1) * 300)

      window.setTimeout(() => {
        if (showHideRef?.current) {
          showHideRef.current.style.height = 'auto'
        }
      }, (order - 1) * 700)
    } else {
      if (showHideRef.current) {
        setVisibleOpacity(false)

        if (contentRef?.current) {
          showHideRef.current.style.height = `${contentRef.current.offsetHeight}px`
        }

        window.setTimeout(() => {
          if (showHideRef?.current && contentRef?.current) {
            showHideRef.current.style.height = '0px'
          }
        })
      }

      timer.current = window.setTimeout(() => setShow(false), 400)
    }
  }, [visible, order])

  return (
    <>
      {useShow && (
        <div
          ref={showHideRef}
          className={classesBuilder(style, {
            showHide: true,
            visible: useVisibleOpacity,
          })}
        >
          <div ref={contentRef} className={style.contentShowHide}>
            {children}
          </div>
        </div>
      )}
    </>
  )
}

export default ToggleContent
