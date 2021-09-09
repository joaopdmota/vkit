import { FieldBaseType, InputEnum } from '../types/fieldBase.type'
import React, { useState } from 'react'

import FieldBase from './base'
import Icon from 'shared/components/icon'
import style from 'theme/components/webform/textField.module.scss'

type IconPasswordType = { visible: boolean; onClick?: Function }

const IconPassword: React.FC<IconPasswordType> = ({ visible, onClick }) => (
  <div className={`${style.iconCustom} ${style.cursorPointer}`} onClick={() => onClick?.()}>
    {visible && <Icon name="eye-off-2-outline" size={20} />}
    {!visible && <Icon name="eye-outline" size={20} />}
  </div>
)

const TextField: React.FC<FieldBaseType> = (props) => {
  const [isVisible, setVisible] = useState<boolean>(false)

  return (
    <FieldBase
      {...props}
      inputType={isVisible ? InputEnum.text : InputEnum.password}
      contentRight={<IconPassword visible={isVisible} onClick={() => setVisible(!isVisible)} />}
    />
  )
}

export default TextField
