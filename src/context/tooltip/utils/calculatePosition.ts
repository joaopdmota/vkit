import { PositionsResolverType } from '../types/tooltip.type'

type calculatedPositionType = {
  left: string
  top: string
}

export default function calculateTooltipPosition(
  wrapper: HTMLDivElement,
  layer: HTMLDivElement,
  direction: string,
): void {
  const {
    left: wrapperLeft,
    top: wrapperTop,
    width: wrapperWidth,
    height: wrapperHeight,
  } = wrapper.getBoundingClientRect()

  const { height: layerHeight, width: layerWidth } = layer.getBoundingClientRect()

  const props = {
    wrapperLeft,
    wrapperTop,
    wrapperWidth,
    wrapperHeight,
    layerHeight,
    layerWidth,
  }

  const { left, top } = positionResolver(direction, props)

  layer.style.left = left
  layer.style.top = top
}

function positionResolver(dir: string, props: PositionsResolverType): calculatedPositionType {
  const { layerHeight, layerWidth, wrapperWidth, wrapperHeight, wrapperLeft, wrapperTop } = props

  const positions = {
    top: {
      left: `${wrapperLeft + wrapperWidth / 2 - layerWidth / 2}px`,
      top: `${wrapperTop - layerHeight - 15}px`,
    },
    bottom: {
      left: `${wrapperLeft + wrapperWidth / 2 - layerWidth / 2}px`,
      top: `${wrapperTop + wrapperHeight + 15}px`,
    },
    right: {
      left: `${wrapperLeft + wrapperWidth + 15}px`,
      top: `${wrapperTop + wrapperHeight / 2 - layerHeight / 2}px`,
    },
    left: {
      left: `${wrapperLeft - layerWidth - 15}px`,
      top: `${wrapperTop + wrapperHeight / 2 - layerHeight / 2}px`,
    },
  }

  return positions[dir]
}
