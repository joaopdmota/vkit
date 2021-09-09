import React from 'react'

import classesBuilder from 'shared/utils/classesBuilder'
import Icon from 'shared/components/icon'

import ImageType from './types/image.type'
import UseImage from './hooks/useImage'

import style from 'theme/components/image/image.module.scss'

const Image: React.FC<ImageType> = ({
  alt,
  elevation = 5,
  size = 'medium',
  src,
  shadow,
  type,
  width,
  height,
}) => {
  const { useAlt, useImage, useEmptyImage, useRandom } = UseImage({
    alt: alt?.trim(),
    src,
  })

  const classNames = {
    alt: useEmptyImage && useAlt,
    [`color${useRandom}`]: true,
    [`elevation${elevation}`]: elevation,
    async: src === '',
    image: true,
    emptyImage: useEmptyImage,
    [size || '']: size,
    shadow,
    [type || '']: type,
  }

  return (
    <div
      className={classesBuilder(style, classNames)}
      style={{
        ...(!useEmptyImage && useImage ? { backgroundImage: `url(${useImage})` } : ''),
        width,
        height,
      }}
    >
      {useEmptyImage && !useAlt ? <Icon name="image-outline" /> : <span>{useAlt}</span>}
    </div>
  )
}

export default Image
