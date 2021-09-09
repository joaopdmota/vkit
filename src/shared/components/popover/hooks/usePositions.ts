import { useRef, useState } from 'react'

import { getIsContainsRecipient, getTextCapitalize } from 'shared/utils'

import { PositionsType } from '../types/popover.type'
interface UsePositionsInterface {
  getElementLayerPopover: ({}: HTMLDivElement) => void
  useRefLastPositions: {
    current: {
      position: number
      align: number
      positionTraveled: number
    }
  }
  useClassNamesPositions: object | null
  setClassNamesPositions: Function
}

const UsePositions = (positions: PositionsType): UsePositionsInterface => {
  const useRefLastPositions = useRef({
    position: 0,
    align: 0,
    positionTraveled: 0,
  })

  const [useClassNamesPositions, setClassNamesPositions] = useState<object | null>(null)

  const getElementLayerPopover = (layerElement: HTMLDivElement): void => {
    if (layerElement) {
      const {
        current: {
          position: lastPosition,
          align: lastAlign,
          positionTraveled: lastPositionTraveled,
        },
      } = useRefLastPositions

      const isContainsRecipient = getIsContainsRecipient(layerElement)

      if (!isContainsRecipient) {
        const positionsNames = Object.keys(positions)
        const positionName = positionsNames[lastPosition]
        const alignPosition = positions[positionName as keyof PositionsType][lastAlign]

        if (lastPositionTraveled < positionsNames.length) {
          setClassNamesPositions(null)
          setClassNamesPositions({
            [`position${getTextCapitalize(positionName)}`]: positionName,
            [`align${getTextCapitalize(alignPosition)}`]: alignPosition,
          })

          const limitPositions = positionsNames.length / 2

          let position = lastAlign === limitPositions ? lastPosition + 1 : lastPosition

          const nextPosition = positionsNames[position]
          if (!nextPosition) {
            position = 0
          }

          const align = lastAlign < limitPositions ? lastAlign + 1 : 0

          const positionTraveled =
            lastAlign === limitPositions ? lastPositionTraveled + 1 : lastPositionTraveled

          useRefLastPositions.current = {
            position,
            align,
            positionTraveled,
          }
        }
      }
    }
  }

  return {
    getElementLayerPopover,
    useRefLastPositions,
    useClassNamesPositions,
    setClassNamesPositions,
  }
}

export default UsePositions
