import React, { useEffect, useRef, useState } from 'react'

import LimitText from './limitText'
import RangeFieldType from '../../types/rangeField.type'
import Slider from './slider'
import Tooltips from './tooltips'
import Traces from './traces'
import { classesBuilder } from 'shared/utils'
import style from 'theme/components/webform/range/range.module.scss'

const RangeField: React.FC<RangeFieldType> = ({
  disabled,
  large,
  max = 100,
  medium,
  min = 0,
  onChange,
  small,
  status,
  step,
  double,
  value,
}) => {
  if (min > max) {
    throw new Error('"max" attribute value must be less than "min" attribute.')
  }

  type ValuesType = {
    max: number
    min: number
  }

  const [minVal, setMinVal] = useState<number>(0)
  const [maxVal, setMaxVal] = useState<number>(0)

  const range = useRef<HTMLDivElement>(null)
  const slider = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const getValues = (
      valueCurrent: null | number | string | undefined | { min: number; max: number },
      minRange = 0,
      maxRange = 100,
      step = 1,
    ): ValuesType => {
      let initialMaxVal = maxRange
      let initialMinVal = minRange

      if (valueCurrent || valueCurrent === 0) {
        if (typeof +valueCurrent === 'number' && !isNaN(+valueCurrent)) {
          initialMaxVal = Math.min(Math.max(+valueCurrent, minRange), maxRange)
        }

        if (typeof valueCurrent === 'object' && 'max' in valueCurrent && 'min' in valueCurrent) {
          initialMaxVal = Math.min(Math.max(+valueCurrent.max, minRange), maxRange)

          initialMinVal = Math.max(Math.min(+valueCurrent.min, maxRange), minRange)
        }
      }

      const modCountSteps = (initialMinVal - initialMaxVal) % (step || 1)

      return {
        max: initialMaxVal - modCountSteps,
        min: initialMinVal,
      }
    }

    const { max: newMax, min: newMin } = getValues(value, min, max, step)
    setMaxVal(newMax)
    setMinVal(newMin)
  }, [min, max, value, step])

  useEffect(() => {
    onChange?.(double ? { min: minVal, max: maxVal } : maxVal)
  }, [minVal, maxVal, onChange, double])

  const rngProps = {
    [status as string]: status,
    disabled,
    large,
    medium,
    range: 'range',
    small,
  }

  return (
    <div className={classesBuilder(style, rngProps)}>
      <Slider
        disabled={disabled}
        double={double}
        max={max}
        maxVal={maxVal}
        min={min}
        minVal={minVal}
        setMaxVal={setMaxVal}
        setMinVal={setMinVal}
        step={step}
        slider={slider}
        range={range}
      />

      {slider.current && range.current && (
        <Tooltips
          double={!!double}
          max={max}
          maxVal={maxVal}
          min={min}
          minVal={minVal}
          range={range.current}
          slider={slider.current}
        />
      )}

      {step && step > 0 && <Traces min={min} max={max} step={step} />}

      <LimitText min={min} max={max} />
    </div>
  )
}

export default RangeField
