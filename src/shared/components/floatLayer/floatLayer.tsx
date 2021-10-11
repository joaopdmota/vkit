import React, { LegacyRef } from 'react'

import BackDrop from 'shared/components/backdrop'
import Button from 'shared/components/button'
import FloatLayerType from './types/floatLayer.type'
import Scrollbar from 'shared/components/context/scrollbar'
import { classesBuilder, getIsUserAgent } from 'shared/utils'
import style from 'theme/components/floatLayer/floatLayer.module.scss'
import useFloatLayer from './hooks/useFloatLayer'

const FloatLayer: React.FC<FloatLayerType> = ({
  body,
  children,
  closeClickOutside = true,
  elevation,
  footer,
  full,
  header,
  height,
  maxWidth,
  onClose = (): void => {},
  outlined,
  rounded,
  show,
  title,
}) => {
  const isMobile = getIsUserAgent('mobile')

  const { getElementHeight, wrapperRef, useHeight, useOpen, useShow, useWidth, useBottom } =
    useFloatLayer({
      canShow: show,
      height,
      onClose,
      closeClickOutside,
    })

  const classesNames = {
    [`elevation${elevation}`]: elevation,
    floatLayer: true,
    full,
    outlined,
    rounded,
    show: useShow,
  }

  return useOpen ? (
    <div className={classesBuilder(style, classesNames)}>
      {isMobile ? <BackDrop show={useShow} blur /> : null}
      <div
        ref={wrapperRef as LegacyRef<HTMLDivElement>}
        className={style.box}
        style={{
          bottom: useBottom,
          maxWidth: maxWidth ?? useWidth,
        }}
      >
        {isMobile ? (
          <div className={style.close}>
            <Button icon="close-outline" onClick={onClose} />
          </div>
        ) : null}
        <div ref={getElementHeight} className={style.content}>
          <div>{header}</div>

          <div className={style.title}>{title}</div>

          <div className={style.body}>
            <Scrollbar maxHeight={useHeight} stopPropagation>
              {body || children}
            </Scrollbar>
          </div>

          <div>{footer}</div>
        </div>
      </div>
    </div>
  ) : null
}

export default FloatLayer
