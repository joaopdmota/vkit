import React from 'react'
import style from 'theme/components/webform/range/range.module.scss'

type LimitTextRangeFieldType = {
  min: number
  max: number
}

const LimitTextRangeField: React.FC<LimitTextRangeFieldType> = ({ min = 0, max = 100 }) => (
  <div className={style.limitText}>
    <span>{min}</span>
    <span>{max}</span>
  </div>
)

export default LimitTextRangeField
