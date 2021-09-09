import React, { useEffect, useState } from 'react'

import { Content } from 'context'
import Control from 'shared/utils/control.example'
import { TextArea } from 'components'

const TextFieldDemo = () => {
  const [helper, setHelper] = useState('')
  const [options, setOptions] = useState({ type: 'text' })

  useEffect(() => {
    setHelper(options.helperChecked ? 'Teste de helper' : '')
  }, [options.helperChecked])

  const handleOptions = (option) => setOptions({ ...options, ...option })

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '320px', padding: '15px' }}>
        <TextArea
          icon={options.icon && 'person-outline'}
          label="Isso é uma labe"
          textHelper={helper}
          status={options.status}
          clearable={options.clearable}
          textHelperTop={options.textHelperTop}
          disabled={options.disabled}
          required={options.required}
          small={options.size === 'small'}
          medium={options.size === 'medium'}
          large={options.size === 'large'}
          placeholder={options.placeholder && 'isso é um teste'}
        />
      </div>

      <div style={{ width: '320px', padding: '15px' }}>
        <Content>
          <Control
            onChange={handleOptions}
            options={options}
            groups={[
              {
                title: 'Options',
                tagName: 'Checkbox',
                items: [
                  'clearable',
                  'textHelperTop',
                  'disabled',
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

export default TextFieldDemo
