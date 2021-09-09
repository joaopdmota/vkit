import React, { MouseEvent, FocusEvent } from 'react'

import classesBuilder from 'shared/utils/classesBuilder'
import getTextCapitalize from 'shared/utils/getTextCapitalize'
import isEventTriggerValid from './utils/validateEventTrigger'

import { TooltipType } from './types/tooltip.type'

import UsePositions from './hooks/usePositions'

import style from 'theme/context/tooltip/tooltip.module.scss'

const Tooltip: React.FC<TooltipType> = ({ children, position = 'right', text }) => {
  const positions = ['top', 'right', 'bottom', 'left']

  const {
    getElementLayerTooltip,
    useClassNamesPositions,
    useTooltipWrapperRef,
    useRefLastPositions,
    setClassNamesPositions,
  } = UsePositions(positions, position)

  const onHandlerTooltip = (event: MouseEvent): void => {
    const { type } = event

    if (!useClassNamesPositions) {
      if (isEventTriggerValid(type)) {
        setClassNamesPositions({
          [`position${getTextCapitalize(position)}`]: position,
        })
      }
    } else {
      onCloseLayer(event)
    }
  }

  const onCloseLayer = (event: MouseEvent | FocusEvent<HTMLDivElement>): void => {
    const { type } = event

    if (isEventTriggerValid(type)) {
      setClassNamesPositions(null)
      useRefLastPositions.current.position = 0
    }
  }

  return (
    <div className={style.tooltip}>
      <div
        className={style.children}
        onClick={onHandlerTooltip}
        onBlur={onCloseLayer}
        onMouseEnter={onHandlerTooltip}
        onMouseLeave={onCloseLayer}
        ref={useTooltipWrapperRef}
      >
        {children}
      </div>

      {useClassNamesPositions ? (
        <div
          className={classesBuilder(style, {
            ...useClassNamesPositions,
            layer: 'layer',
          })}
          ref={getElementLayerTooltip}
        >
          <div className={style.text}>{text}</div>
        </div>
      ) : null}
    </div>
  )
}

export default Tooltip
