import React, { ChangeEvent, useCallback, useEffect, useRef } from 'react'

import { classesBuilder } from 'shared/utils'
import style from 'theme/components/webform/range/range.module.scss'

type SlideRangeFieldType = {
  disabled?: boolean
  double?: boolean
  max: number
  maxVal: number
  min: number
  minVal: number
  setMaxVal: Function
  setMinVal: Function
  step?: number
  slider: { current: HTMLDivElement | null }
  range: { current: HTMLDivElement | null }
}

const SlideRangeField: React.FC<SlideRangeFieldType> = ({
  disabled,
  double,
  max,
  maxVal,
  min,
  minVal,
  setMaxVal,
  setMinVal,
  step,
  slider,
  range,
}: SlideRangeFieldType) => {
  const minThumbRef = useRef<HTMLInputElement>(null)
  const maxThumbRef = useRef<HTMLInputElement>(null)

  const getPercent = useCallback((value: number) => ((value - min) / (max - min)) * 100, [min, max])

  useEffect(() => {
    const minPercent = double ? getPercent(minVal) : 0
    const maxPercent = getPercent(maxVal)

    if (range.current) {
      range.current.style.left = `${minPercent}%`
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [minVal, getPercent, range, maxVal, double])

  useEffect(() => {
    const minPercent = double ? getPercent(minVal) : 0
    const maxPercent = getPercent(maxVal)

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [maxVal, getPercent, double, minVal, range])

  const handleMinChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = Math.min(Number(event.target.value), maxVal)
    setMinVal(value)
  }

  const handleMaxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = Math.max(Number(event.target.value), minVal)
    setMaxVal(value)
  }

  const handlesMin = {
    onChange: handleMinChange,
  }

  const handlesMax = {
    onChange: handleMaxChange,
  }

  const minThumbRefProps = {
    thumb: 'thumb',
    thumbIntangible: min === minVal && maxVal === min,
  }

  const maxThumbRefProps = {
    thumb: 'thumb',
    thumbIntangible: max === maxVal && minVal === max,
  }

  return (
    <div className={style.slider} ref={slider}>
      {double && (
        <input
          className={classesBuilder(style, minThumbRefProps)}
          disabled={disabled}
          max={max}
          min={min}
          step={step || 0}
          ref={minThumbRef}
          type="range"
          value={minVal}
          {...handlesMin}
        />
      )}
      <input
        className={classesBuilder(style, maxThumbRefProps)}
        disabled={disabled}
        max={max}
        min={min}
        step={step || 0}
        ref={maxThumbRef}
        type="range"
        value={maxVal}
        {...handlesMax}
      />
      <div className={style.sliderTrack} />
      <div ref={range} className={style.sliderRange} />
    </div>
  )
}

export default SlideRangeField
