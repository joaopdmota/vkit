import React, { useEffect, useState } from 'react'

import { Content } from 'context'
import Control from 'shared/utils/control.example'
import { TextField } from 'components'

const RangeDemo = () => {
  const [helper, setHelper] = useState('')
  const [useValue, setValue] = useState('')
  const [options, setOptions] = useState({ type: 'text' })

  useEffect(() => {
    setHelper(options.helperChecked ? 'Teste de helper' : '')
  }, [options.helperChecked])

  const handleOptions = (option) => setOptions({ ...options, ...option })

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '320px', padding: '15px' }}>
        <TextField
          clearable={options.clearable}
          disabled={options.disabled}
          icon={options.icon && 'person-outline'}
          label="Isso é uma labe"
          large={options.size === 'large'}
          medium={options.size === 'medium'}
          multiline={options.multiline}
          placeholder={options.placeholder && 'isso é um teste'}
          required={options.required}
          small={options.size === 'small'}
          status={options.status}
          textHelper={helper}
          textHelperTop={options.textHelperTop}
          type={options.type}
          value={useValue}
          onChange={setValue}
          double
        />
      </div>

      <div style={{ width: '320px', padding: '15px' }}>
        <Content>
          <Control
            onChange={handleOptions}
            options={options}
            groups={[
              {
                title: 'Types',
                tagName: 'Radio',
                optionTarget: 'type',
                items: ['cep', 'cnpj', 'cpf', 'date', 'password', 'range', 'text'],
              },

              {
                title: 'Options',
                tagName: 'Checkbox',
                items: [
                  'clearable',
                  'textHelperTop',
                  'disabled',
                  'multiline',
                  'required',
                  'icon',
                  'helperChecked',
                  'placeholder',
                ],
              },

              {
                title: 'Options',
                tagName: 'Radio',
                optionTarget: 'size',
                items: ['small', 'medium', 'large'],
              },
            ]}
          />
        </Content>
      </div>
    </div>
  )
}

export default RangeDemo
