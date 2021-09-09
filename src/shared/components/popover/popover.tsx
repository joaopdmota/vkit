import React, { useRef } from 'react'

import Icon from 'shared/components/icon'
import Scrollbar from 'shared/components/context/scrollbar'
import { classesBuilder, getTextCapitalize, getIsUserAgent } from 'shared/utils'

import { DEFAULT_SCROLLBAR_HEIGHT } from './constants'

import { PopoverType } from './types/popover.type'

import UsePositions from './hooks/usePositions'

import style from 'theme/components/popover/popover.module.scss'

const Popover: React.FC<PopoverType> = ({
  actions,
  align = 'center',
  iconDir = 'left',
  position = 'top',
  vertical,
}) => {
  const useRefHoverAction = useRef(false)
  const isSafari = getIsUserAgent('safari')

  const aligns = ['left', 'center', 'right', 'top', 'center', 'bottom']
  const positions = {
    top: aligns.slice(0, 3),
    right: aligns.slice(3, 6),
    bottom: aligns.slice(0, 3),
    left: aligns.slice(3, 6),
  }

  const {
    getElementLayerPopover,
    useRefLastPositions,
    useClassNamesPositions,
    setClassNamesPositions,
  } = UsePositions(positions)

  const onHandlerPopover = (): void => {
    if (!useClassNamesPositions) {
      const positionsNames = Object.keys(positions)
      const indexPosition = positionsNames.indexOf(position)

      useRefLastPositions.current = {
        position: indexPosition >= 0 ? indexPosition : 0,
        align: 0,
        positionTraveled: 0,
      }

      setClassNamesPositions({
        [`position${getTextCapitalize(position)}`]: position,
        [`align${getTextCapitalize(align)}`]: align,
      })
    } else {
      onCloseLayer()
    }
  }

  const onCloseLayer = (): void => {
    if (!useRefHoverAction.current) {
      setClassNamesPositions(null)
    }
  }

  const classNamesMore = {
    focus: useClassNamesPositions,
    more: true,
    vertical,
  }

  const classNamesAction = {
    action: true,
    [iconDir]: iconDir,
    only: actions?.length === 1,
  }

  return (
    <div className={style.popover}>
      <button
        className={classesBuilder(style, classNamesMore)}
        onClick={() => !isSafari && onHandlerPopover()}
        onBlur={onCloseLayer}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {isSafari ? (
        <input
          className={style.trigger}
          type="text"
          readOnly
          onFocus={onHandlerPopover}
          onBlur={onCloseLayer}
        />
      ) : null}

      {useClassNamesPositions ? (
        <div
          ref={getElementLayerPopover}
          className={classesBuilder(style, {
            ...useClassNamesPositions,
            layer: 'layer',
          })}
        >
          <Scrollbar stopPropagation maxHeight={DEFAULT_SCROLLBAR_HEIGHT}>
            <div className={style.items}>
              {actions?.map((action, index) => (
                <div className={style.item} key={index}>
                  <button
                    className={classesBuilder(style, classNamesAction)}
                    onMouseEnter={() => (useRefHoverAction.current = true)}
                    onMouseLeave={() => (useRefHoverAction.current = false)}
                    onClick={(e) => {
                      useRefHoverAction.current = false
                      action?.onClick?.(e)
                      onCloseLayer()
                    }}
                  >
                    {action.icon && <Icon name={action.icon} color="default" />}
                    <span className={style.label}>{action.label}</span>
                  </button>
                  <div className={style.separator} />
                </div>
              ))}
            </div>
          </Scrollbar>
        </div>
      ) : null}
    </div>
  )
}

export default Popover
