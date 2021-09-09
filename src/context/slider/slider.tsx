import React from 'react'

import { classesBuilder, getIsUserAgent } from 'shared/utils'
import Button from 'shared/components/button'
import SliderSwiper from 'shared/components/context/sliderSwiper'

import { SliderType } from './types/slider.type'

import { UseDuration, UseSlider } from './hooks'

import style from 'theme/context/slider/slider.module.scss'

const Slider: React.FC<SliderType> = ({
  arrows = true,
  arrowSize,
  axisX,
  axisY,
  children,
  duration,
  elevation,
  indicators,
  infinite,
  instanceEmitter,
  overlay,
  slider,
  sliding = true,
  onSliding,
}) => {
  if (getIsUserAgent('mobile')) {
    return (
      <SliderSwiper
        axisX={axisX}
        axisY={axisY}
        duration={duration}
        indicators={indicators}
        infinite={infinite}
        instanceEmitter={instanceEmitter}
        slider={slider}
        sliding={sliding}
        onSliding={onSliding}
        sliders
      >
        {children}
      </SliderSwiper>
    )
  }

  const { useCountSliders, useIndexSlider, useRefContentElement, setSlider } = UseSlider({
    axisX,
    axisY,
    indicators,
    infinite,
    slider,
    sliding,
    onSliding,
  })

  const useDuration = UseDuration({
    duration,
    isSliding: indicators && useCountSliders > 1 && sliding,
    useIndexSlider,
    finishDuration: () => {
      const nextSlider = useIndexSlider + 1
      setSlider(nextSlider < useCountSliders ? nextSlider : 0)
    },
  })

  const classNamesSlider = {
    slider: true,
    axisX,
    axisY,
    overlay,
    [`${overlay === true ? 'auto' : overlay}`]: overlay,
    [`elevation${elevation}`]: elevation,
  }

  const classNamesIndicators = {
    indicators: true,
    [indicators || '']: true,
  }

  if (instanceEmitter instanceof Object) {
    Object.assign(instanceEmitter, {
      goSlider: (index: number) => setSlider(index - 1),
    })
  }

  const transitionDuration = `width ${duration}s linear, height ${duration}s linear`

  return (
    <div className={classesBuilder(style, classNamesSlider)}>
      <div className={style.wrapper} ref={useRefContentElement} data-slider={useIndexSlider}>
        {children}
      </div>
      {sliding && arrows && useCountSliders > 1 ? (
        <>
          <div className={style.arrowA}>
            <Button
              icon={axisX ? 'arrow-ios-forward-outline' : 'arrow-ios-upward-outline'}
              solo
              size={arrowSize}
              onClick={() => setSlider(axisX ? useIndexSlider + 1 : useIndexSlider - 1)}
            />
          </div>
          <div className={style.arrowB}>
            <Button
              icon={axisX ? 'arrow-ios-back-outline' : 'arrow-ios-downward-outline'}
              solo
              size={arrowSize}
              onClick={() => setSlider(axisX ? useIndexSlider - 1 : useIndexSlider + 1)}
            />
          </div>
        </>
      ) : null}
      {sliding && indicators && useCountSliders > 1 ? (
        <div className={classesBuilder(style, classNamesIndicators)}>
          {Array.from(Array(useCountSliders)).map((_, key) => {
            const sliderDuration = useIndexSlider === key ? useDuration : 100
            return (
              <a
                key={key}
                className={classesBuilder(style, {
                  delimiter: true,
                  active: useIndexSlider === key,
                })}
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

export default Slider
