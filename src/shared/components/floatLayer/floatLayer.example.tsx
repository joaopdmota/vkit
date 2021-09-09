import React, { useState } from 'react'

import Control from 'shared/utils/control.example'
import Row from 'shared/components/context/row'
import Grid from 'shared/components/context/grid'
import FloatLayer from 'shared/components/floatLayer'
import { Button } from 'components'

const TextFieldDemo: React.FC = () => {
  const [options, setOptions] = useState({
    elevation: 0,
    outlined: false,
    rounded: false,
    show: false,
    title: false,
    header: false,
    footer: false,
    closeClickOutside: true,
  })

  const handleOptions = (option: any): any => setOptions({ ...options, ...option })

  return (
    <>
      <Row>
        <h4>Float Layer</h4>
      </Row>
      <Row>
        <div>
          <Button label="Open Float Layer" onClick={() => handleOptions({ show: !options.show })} />

          <FloatLayer
            {...options}
            onClose={() => handleOptions({ show: false })}
            header={
              options.header && (
                <div style={{ padding: '16px 16px 0' }}>
                  <Grid alignContent="right" stretch>
                    <Button solo label="close" onClick={() => handleOptions({ show: false })} />
                  </Grid>
                </div>
              )
            }
            title={options.title ? 'Float Layer' : ''}
            footer={
              options.footer && (
                <div style={{ padding: '16px 24px 24px' }}>
                  <Grid alignContent="right" stretch>
                    <Button label="close" onClick={() => handleOptions({ show: false })} />
                  </Grid>
                </div>
              )
            }
          >
            <div style={{ padding: '24px', paddingTop: 0 }}>
              <Control
                onChange={handleOptions}
                options={options}
                groups={[
                  {
                    title: 'Options',
                    tagName: 'Checkbox',
                    items: [
                      'outlined',
                      'rounded',
                      'header',
                      'title',
                      'footer',
                      'closeClickOutside',
                    ],
                  },

                  {
                    title: 'Elevation',
                    tagName: 'Radio',
                    optionTarget: 'elevation',
                    items: Array(11)
                      .fill(null)
                      .map((_, index) => ({
                        text: index ? `Elevation ${index}` : 'Nenhum',
                        value: index,
                      })),
                  },
                ]}
              />
            </div>
          </FloatLayer>
        </div>
      </Row>
    </>
  )
}

export default TextFieldDemo
