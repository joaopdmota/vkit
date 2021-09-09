import React, { useCallback, useEffect, useRef } from 'react'

import style from 'theme/components/webform/range/range.module.scss'

type TooltipRangeFieldType = {
  double: boolean
  max: number
  maxVal: number
  min: number
  minVal: number
  range: HTMLDivElement
  slider: HTMLDivElement
}

const TooltipRangeField: React.FC<TooltipRangeFieldType> = ({
  double = false,
  max = 0,
  maxVal = 0,
  min = 0,
  minVal = 0,
  range,
  slider,
}) => {
  const minTooltipRef = useRef<HTMLDivElement>(null)
  const maxTooltipRef = useRef<HTMLDivElement>(null)

  const getPercent = useCallback((value: number) => ((value - min) / (max - min)) * 100, [min, max])

  const getTooltipLeft = useCallback(
    (percent: number, tooltip: HTMLDivElement, hasRangeWidth: boolean): string => {
      if (!slider || !range) {
        return ''
      }

      const rangeOffsetLeft = range.offsetLeft
      const rangeWidth = hasRangeWidth ? range.offsetWidth : 0
      const sliderWidth = slider.offsetWidth
      const tooltipHalf = tooltip.offsetWidth / 2
      const limitBeondRangeWidth = 5
      const limitPositionRight = rangeOffsetLeft + rangeWidth + tooltipHalf - limitBeondRangeWidth

      const limitPositionLeft = rangeOffsetLeft + rangeWidth - tooltipHalf

      if (sliderWidth < limitPositionRight) {
        return `${sliderWidth - tooltip.offsetWidth + limitBeondRangeWidth}px`
      }

      if (limitPositionLeft < -limitBeondRangeWidth) {
        return '-5px'
      }

      return `calc(${percent}% - ${tooltipHalf}px)`
    },
    [range, slider],
  )

  useEffect(() => {
    const minPercent = getPercent(minVal)

    if (maxTooltipRef.current) {
      maxTooltipRef.current.style.zIndex = '2'
    }

    if (minTooltipRef.current) {
      minTooltipRef.current.style.zIndex = '4'
      minTooltipRef.current.style.left = getTooltipLeft(minPercent, minTooltipRef.current, false)
    }
  }, [minVal, getPercent, getTooltipLeft])

  useEffect(() => {
    const maxPercent = getPercent(maxVal)

    if (minTooltipRef.current) {
      minTooltipRef.current.style.zIndex = '2'
    }

    if (maxTooltipRef.current) {
      maxTooltipRef.current.style.zIndex = '4'
      maxTooltipRef.current.style.left = getTooltipLeft(maxPercent, maxTooltipRef.current, true)
    }
  }, [maxVal, getPercent, getTooltipLeft])

  return (
    <div className={style.sliderTooltips}>
      {double && (
        <div ref={minTooltipRef} className={`${style.sliderTooltip} ${style.sliderTooltipMin}`}>
          {minVal}
        </div>
      )}
      <div ref={maxTooltipRef} className={`${style.sliderTooltip} ${style.sliderTooltipMax}`}>
        {maxVal}
      </div>
    </div>
  )
}

export default TooltipRangeField
