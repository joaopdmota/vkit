import React, { useCallback, useRef } from 'react'

import style from 'theme/components/webform/range/range.module.scss'

type TracesRangeFieldType = {
  min: number
  max: number
  step: number
}

const TracesRangeField: React.FC<TracesRangeFieldType> = ({ min = 0, max = 100, step = 5 }) => {
  const modCountSteps = (max - min) % (step || 1)
  const tracesRef = useRef<HTMLDivElement>(null)

  const getPercent = useCallback((value: number) => ((value - min) / (max - min)) * 100, [min, max])

  const countSteps = Math.round((max - min - modCountSteps) / (step || 1)) + 1
  const traces = Array(countSteps)
    .fill(null)
    .map((_, index) => <span key={index} className={style.trace} />)
  const modPercent = getPercent(min + modCountSteps)

  if (tracesRef.current) {
    tracesRef.current.style.paddingRight = `${modPercent}%`
  }

  return (
    <div ref={tracesRef} className={style.traces}>
      {step && step > 0 && traces}
    </div>
  )
}

export default TracesRangeField
