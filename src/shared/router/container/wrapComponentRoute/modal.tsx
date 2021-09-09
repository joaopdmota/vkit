import React from 'react'

import Backdrop from 'shared/components/backdrop'
import Button from 'shared/components/button'
import Content from 'shared/components/context/content'
import Grid from 'shared/components/context/grid'
import SliderSwiper from 'shared/components/context/sliderSwiper/sliderSwiper'
import classesBuilder from 'shared/utils/classesBuilder'

import style from 'theme/router//modal.module.scss'
import { WrapComponentRouteModalType } from './types/wrapComponentRoute.type'
import useWrapModal from './hooks/useWrapModal'

const WrapComponentRouteModal: React.FC<WrapComponentRouteModalType> = ({
  children,
  show = false,
  title,
  pathParent,
}) => {
  const {
    getElementHeight,
    onClose,
    setHeaderElement,
    useHeaderElement,
    useHeight,
    useOpen,
    useShow,
  } = useWrapModal(show)

  const mdlProps = {
    modal: true,
    open: useShow,
  }

  const onSlidingLayer = ({ slided }: { slided: number }): void => {
    if (slided) {
      setTimeout(() => onClose(pathParent), 200)
    }
  }

  return useOpen ? (
    <div data-cascade className={classesBuilder(style, mdlProps)}>
      <Backdrop show={useShow} />
      <div
        {...(useShow ? { 'data-cascade-scale': true } : null)}
        ref={getElementHeight}
        className={style.modalBox}
      >
        <SliderSwiper
          axisY="bottom"
          onSliding={onSlidingLayer}
          startElement={useHeaderElement}
          parentMove
        >
          <div ref={setHeaderElement} className={style.header}>
            <div className={style.swipe} />

            <Grid alignItems="center">
              <div className={style.buttonClose}>
                <Button
                  solo
                  size="xLarger"
                  icon="arrow-ios-downward-outline"
                  onClick={() => onClose(pathParent)}
                />
              </div>

              <h4>{title}</h4>
            </Grid>
          </div>

          <Content height={useHeight}>{children}</Content>
        </SliderSwiper>
      </div>
    </div>
  ) : null
}

export default WrapComponentRouteModal
