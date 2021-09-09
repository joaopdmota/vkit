import React from 'react'

import classesBuilder from 'shared/utils/classesBuilder'
import SliderSwiper from 'shared/components/context/sliderSwiper/sliderSwiper'
import Text from 'shared/components/text'
import Button from 'shared/components/button'

import ToastType from '../types/toast.type'

import { UseLayer, UseDuration } from './hooks'

import style from 'theme/components/toast/toast.module.scss'

const Layer: React.FC<ToastType> = ({
  action,
  align,
  elevation = 2,
  duration,
  icon,
  iconDir,
  instanceEmitter,
  position,
  outlined = true,
  rounded,
  shadow,
  text,
  title,
  titleColor,
  type,
}) => {
  const { useOpenLayer, useShowLayer, onOpenLayer, onCloseLayer } = UseLayer()
  const useRestDuration = UseDuration({
    duration,
    useShowLayer,
    onCloseLayer,
  })

  const iconNames = {
    success: 'checkmark-circle-outline',
    danger: 'alert-circle-outline',
    warning: 'alert-triangle-outline',
    info: 'info-outline',
  }

  const classNamesLayer = {
    [`elevation${elevation}`]: elevation,
    layer: true,
    outlined,
    rounded,
    shadow,
    show: useShowLayer,
  }

  const classNamesTimeDurationProgress = {
    progress: true,
    [type || '']: type,
  }

  if (instanceEmitter instanceof Object) {
    Object.assign(instanceEmitter, {
      open: onOpenLayer,
      dismiss: onCloseLayer,
    })
  }

  const getRefToast = (ref: HTMLDivElement): void => {
    if (ref) {
      const { offsetHeight } = ref

      if (!useShowLayer) {
        if (align === 'center') {
          if (position && position !== 'center') {
            ref.style[position] = `${offsetHeight * -1}px`
          }
        }
      } else {
        ref.style.height = `${offsetHeight}px`
      }
    }
  }

  const onSlidingLayer = ({ isClosed }: { isClosed: boolean }): void => {
    if (isClosed) {
      setTimeout(onCloseLayer, 200)
    }
  }

  const { label, icon: iconAction, solo, onClick } = action || {}
  const transitionDuration = `width ${duration}s linear`

  return useOpenLayer ? (
    <div ref={getRefToast} className={classesBuilder(style, classNamesLayer)}>
      <SliderSwiper
        {...(align === 'center'
          ? { axisY: position === 'center' ? true : position }
          : { axisX: align })}
        sliding={!(onClick instanceof Function)}
        onSliding={onSlidingLayer}
        parentMove
      >
        <div className={style.context}>
          <div className={style.action}>
            <Button
              solo={solo}
              color={type}
              iconColor={type}
              icon={iconAction || (!label && 'close-outline') || ''}
              label={label}
              size="larger"
              onClick={() => (onClick instanceof Function ? onClick() : onCloseLayer())}
            />
          </div>
          <div className={style.info}>
            {title ? (
              <Text
                value={title}
                title
                color={titleColor}
                margin="0 0 8px 0"
                icon={icon || (type && type !== 'default' && iconNames[type]) || ''}
                iconColor={type}
                iconDir={iconDir}
                iconSize={32}
              />
            ) : null}
            <Text value={text} />
          </div>
        </div>
        {duration ? (
          <div className={style.timeDuration}>
            <div
              className={classesBuilder(style, classNamesTimeDurationProgress)}
              style={{
                width: `${useRestDuration}%`,
                WebkitTransition: transitionDuration,
                MozTransition: transitionDuration,
                OTransition: transitionDuration,
                transition: transitionDuration,
              }}
            />
          </div>
        ) : null}
      </SliderSwiper>
    </div>
  ) : (
    <div className={style.layerEmpty} />
  )
}

export default Layer
