import React, { useEffect, useState } from 'react'

import { Content } from 'context'
import Control from 'shared/utils/control.example'
import { TextField } from 'components'

const TextFieldDemo = () => {
  const [helper, setHelper] = useState('')
  const [options, setOptions] = useState({ type: 'range' })

  useEffect(() => {
    setHelper(options.helperChecked ? 'Teste de helper' : '')
  }, [options.helperChecked])

  const handleOptions = (option) => setOptions({ ...options, ...option })

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '320px', padding: '15px' }}>
        <TextField
          disabled={options.disabled}
          label="Isso é uma label ok"
          large={options.size === 'large'}
          medium={options.size === 'medium'}
          small={options.size === 'small'}
          status={options.status}
          textHelper={helper}
          textHelperTop={options.textHelperTop}
          type={options.type}
          double={options.double}
          step={options.step && 5}
          value={options.double ? { min: 15, max: 85 } : 75}
          max={100}
          min={0}
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
                items: ['disabled', 'helperChecked', 'textHelperTop', 'double', 'step'],
              },

              {
                title: 'Options',
                tagName: 'Radio',
                optionTarget: 'size',
                items: ['small', 'medium', 'large'],
              },

              {
                title: 'Status',
                tagName: 'Radio',
                optionTarget: 'status',
                items: ['default', 'success', 'error'],
              },
            ]}
          />
        </Content>
      </div>
    </div>
  )
}

export default TextFieldDemo
