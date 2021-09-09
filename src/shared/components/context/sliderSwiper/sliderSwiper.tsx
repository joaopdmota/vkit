import React from 'react'

import { classesBuilder, getIsUserAgent } from 'shared/utils'

import { SliderSwiperType } from './types/sliderSwiper.type'

import { UseDuration, UseSliderSwiper } from './hooks'

import style from 'theme/context/sliderSwiper/sliderSwiper.module.scss'

const SliderSwiper: React.FC<SliderSwiperType> = ({
  axisX,
  axisY,
  children,
  closed,
  duration,
  elastic,
  indicators,
  infinite,
  instanceEmitter,
  parentMove,
  preventDefault,
  slider,
  sliders,
  sliding = true,
  startElement,
  onSliding,
}) => {
  if (!getIsUserAgent('mobile')) {
    return <>{children}</>
  }

  const { useCountSliders, useIndexSlider, useRefContentElement, setSlider } = UseSliderSwiper({
    axisX,
    axisY,
    closed,
    elastic,
    indicators,
    infinite,
    instanceEmitter,
    parentMove,
    preventDefault,
    slider,
    sliders,
    sliding,
    startElement,
    onSliding,
  })

  const useDuration = UseDuration({
    duration,
    isSliding: indicators && useCountSliders > 1 && sliding,
    finishDuration: () => {
      const nextSlider = useIndexSlider + 1
      setSlider(nextSlider < useCountSliders ? nextSlider : 0)
    },
  })

  const classNamesSliderSwiper = {
    sliderSwiper: true,
    sliders,
  }

  const classNamesIndicators = {
    indicators: true,
    [indicators || '']: true,
  }

  const transitionDuration = `width ${duration}s linear, height ${duration}s linear`

  return (
    <div className={classesBuilder(style, classNamesSliderSwiper)}>
      <div ref={useRefContentElement}>{children}</div>
      {indicators && sliders && useCountSliders > 1 ? (
        <div className={classesBuilder(style, classNamesIndicators)}>
          {Array.from(Array(useCountSliders)).map((_, key) => {
            const sliderDuration = useIndexSlider === key ? useDuration : 100
            return (
              <a
                className={classesBuilder(style, {
                  delimiter: true,
                  active: useIndexSlider === key,
                })}
                key={key}
                onClick={() => setSlider(key)}
              >
                {duration ? (
                  <span
                    className={classesBuilder(style, {
                      progress: duration,
                    })}
                    style={{
                      ...(axisX
                        ? { width: `${sliderDuration}%` }
                        : { height: `${sliderDuration}%` }),
                      WebkitTransition: transitionDuration,
                      MozTransition: transitionDuration,
                      OTransition: transitionDuration,
                      transition: transitionDuration,
                    }}
                  />
                ) : null}
              </a>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default SliderSwiper
