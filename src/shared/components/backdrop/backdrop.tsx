import React from 'react'

import classesBuilder from 'shared/utils/classesBuilder'

import BackdropType from './types/backdrop.type'

import style from 'theme/components/backdrop/backdrop.module.scss'

const Backdrop: React.FC<BackdropType> = ({ color, blur, show, onClose = (): void => {} }) => {
  const backdropProps = { show, blur, backdrop: true }

  return (
    <div
      style={{ backgroundColor: color }}
      className={classesBuilder(style, backdropProps)}
      onClick={onClose}
    />
  )
}

export default Backdrop
