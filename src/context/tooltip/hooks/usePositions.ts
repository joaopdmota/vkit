import { useRef, useState, RefObject } from 'react'

import getIsContainsRecipient from 'shared/utils/getIsContainsRecipient'
import getTextCapitalize from 'shared/utils/getTextCapitalize'

import calculateTooltipPosition from '../utils/calculatePosition'

interface UsePositionsInterface {
  getElementLayerTooltip: ({}: HTMLDivElement) => void
  setClassNamesPositions: Function
  useClassNamesPositions: object | null
  useRefLastPositions: {
    current: {
      position: number
    }
  }
  useTooltipWrapperRef: RefObject<HTMLDivElement>
}

const UsePositions = (positions: Array<string>, currentPosition: string): UsePositionsInterface => {
  const useRefLastPositions = useRef({
    position: 0,
  })
  const useTooltipWrapperRef = useRef(null)

  const [useClassNamesPositions, setClassNamesPositions] = useState<object | null>(null)

  const getElementLayerTooltip = (layerElement: HTMLDivElement): void => {
    if (layerElement && useTooltipWrapperRef.current) {
      const {
        current: { position: lastPosition },
      } = useRefLastPositions

      const positionsNames = [currentPosition, ...positions.filter((p) => p !== currentPosition)]

      const positionName = positionsNames[lastPosition]

      calculateTooltipPosition(useTooltipWrapperRef.current, layerElement, positionName)

      const isContainsRecipient = getIsContainsRecipient(layerElement)

      if (!isContainsRecipient && lastPosition <= positionsNames.length) {
        const positionInArray = positionsNames.indexOf(positionName)

        const nextDirection =
          positionInArray + 1 <= positionsNames.length ? positionsNames[positionInArray + 1] : null

        if (nextDirection) {
          setClassNamesPositions({
            [`position${getTextCapitalize(nextDirection)}`]: nextDirection,
          })

          const position = useRefLastPositions.current.position + 1

          useRefLastPositions.current = {
            position,
          }
        }
      }
    }
  }

  return {
    getElementLayerTooltip,
    setClassNamesPositions,
    useClassNamesPositions,
    useRefLastPositions,
    useTooltipWrapperRef,
  }
}

export default UsePositions
