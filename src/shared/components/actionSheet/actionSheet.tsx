import React, { useRef, useState, useEffect } from 'react'

import Backdrop from 'shared/components/backdrop'
import Icon from 'shared/components/icon'
import SliderSwiper from 'shared/components/context/sliderSwiper/sliderSwiper'
import classesBuilder from 'shared/utils/classesBuilder'

import ActionSheetType from './types/actionSheet.type'

import style from 'theme/components/actionSheet/actionSheet.module.scss'

const ActionSheet: React.FC<ActionSheetType> = ({ actions, iconDir = 'left', title, vertical }) => {
  const useRefSliderIntance = useRef({ close: () => {} })
  const [useStartElementSwipe, setStartElementSwipe] = useState<HTMLDivElement | null>(null)
  const [useDisplayActionSheet, setDisplayActionSheet] = useState(false)
  const [useActiveWrapper, setActiveWrapper] = useState(false)

  const handleChange = (): void => {
    if (useDisplayActionSheet) {
      setActiveWrapper(false)
      setTimeout(() => {
        setDisplayActionSheet(false)
      }, 300)
    } else {
      setDisplayActionSheet(true)
    }
  }

  const handleClose = (): void => {
    useRefSliderIntance.current.close()
    setTimeout(() => {
      handleChange()
    }, 200)
  }

  const onSlidingLayer = ({ isClosed }: { isClosed: boolean }): void => {
    if (isClosed) {
      setTimeout(handleChange, 200)
    }
  }

  useEffect(() => {
    if (useDisplayActionSheet) {
      setTimeout(() => {
        setActiveWrapper(true)
      })
    }
  }, [useDisplayActionSheet])

  const classNamesMore = {
    more: true,
    vertical,
  }

  const classNamesWrapper = {
    wrapper: true,
    show: useActiveWrapper,
  }

  const classNamesAction = {
    action: true,
    [iconDir]: iconDir,
  }

  const classNamesClose = {
    closeWrapper: true,
    [iconDir]: iconDir,
  }

  return (
    <div className={style.actionSheet}>
      <button className={classesBuilder(style, classNamesMore)} onClick={handleChange}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      {useDisplayActionSheet ? (
        <>
          <Backdrop show={useActiveWrapper} onClose={handleClose} />
          <div className={classesBuilder(style, classNamesWrapper)}>
            <SliderSwiper
              axisY="bottom"
              elastic
              startElement={useStartElementSwipe}
              onSliding={onSlidingLayer}
              instanceEmitter={useRefSliderIntance.current}
              parentMove
            >
              <div ref={setStartElementSwipe} className={style.swipe} />

              {title && (
                <div className={style.actionsheetTitle}>
                  <span className={style.title}>{title}</span>
                </div>
              )}
              <div className={style.actionsWrapper}>
                {actions?.map(({ onClick, label, icon }, index) => (
                  <div className={style.item} key={index}>
                    <button
                      onClick={(e) => {
                        onClick?.(e)
                        handleClose()
                      }}
                      className={classesBuilder(style, classNamesAction)}
                      key={index}
                    >
                      <span className={style.actionLabel}>{label}</span>
                      {icon && <Icon name={icon} color="default" />}
                    </button>
                    <div className={style.separator} />
                  </div>
                ))}
              </div>

              <button className={classesBuilder(style, classNamesClose)} onClick={handleClose}>
                <span className={style.close}>Cancelar</span>
                <Icon name="close-outline" />
              </button>
            </SliderSwiper>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default ActionSheet
