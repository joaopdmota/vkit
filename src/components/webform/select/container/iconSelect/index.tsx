import React from 'react'

import Icon from 'components/icon'

import style from 'theme/components/webform/select/select.module.scss'

import { classesBuilder } from 'shared/utils'

type ArrowType = {
  open: boolean
  autocomplete?: boolean
  onClick?: () => void
}

const IconSelect: React.FC<ArrowType> = ({ open, autocomplete, onClick }) => (
  <div
    className={classesBuilder(style, {
      iconSelect: true,
      rotate: open && !autocomplete,
    })}
    {...(!autocomplete ? { onClick } : {})}
  >
    {autocomplete && <Icon name="search" size={20} />}
    {!autocomplete && <Icon name="arrow-down" size={24} />}
  </div>
)

export default IconSelect
