import React, { useState } from 'react'

import Row from 'shared/components/context/row'
import Grid from 'shared/components/context/grid'
import Col from 'shared/components/context/col'
import Text from 'shared/components/text'

import Control from 'shared/utils/control.example'
import FloatLayer from 'shared/components/floatLayer'
import { Button } from 'components'

import Select from './'

const SelectExample: React.FC = () => {
  const [options, setOptions] = useState({
    autocomplete: false,
    clearable: false,
    disabled: false,
    helper: false,
    icon: false,
    multiple: true,
    placeholder: true,
    required: false,
    size: '',
    status: '',
    textHelperTop: false,
    searchable: true,
    request: true,
  })

  const [useShowOptions, setShowOptions] = useState<boolean>(false)
  const [useValue, setValue] = useState<string | string[]>([])
  const [useSelecteds, setSelecteds] = useState<any[]>([])
  const handleOptions = (option: any): any => setOptions({ ...options, ...option })

  return (
    <>
      <Grid>
        <Row>
          <Text value="Select" title />
          <div style={{ width: '250px', marginTop: '16px' }}>
            <Select
              autocomplete={options.autocomplete}
              label="Isso é um select"
              {...(!options.request
                ? {
                    data: Array(50)
                      .fill(null)
                      .map((_, index) => ({
                        text: `text ${index}`,
                        value: `text ${index}`,
                      })),
                  }
                : {})}
              value={useValue}
              onChange={(value, selecteds) => {
                setValue(value)
                setSelecteds(selecteds)
              }}
              multiple={options.multiple}
              clearable={options.clearable}
              disabled={options.disabled}
              icon={options.icon ? 'person-outline' : undefined}
              large={options.size === 'large'}
              medium={options.size === 'medium'}
              placeholder={options.placeholder ? 'Busque um filme' : undefined}
              required={options.required}
              small={options.size === 'small'}
              textHelper={options.helper ? 'issp é um helper' : undefined}
              textHelperTop={options.textHelperTop}
              searchable={options.searchable}
              showTabSelecteds
              // requestHeaders={{
              //   'Authorization': `Bearer ${bearer}`,
              // }}
              //autoRequest
              requestPageParam="page"
              requestResponseText="Title"
              requestResponseValue="imdbID"
              requestRouter={options.request ? '/' : undefined}
              requestResponseRootPath="Search"
              requestParams={{ apikey: 'f57cce53', s: 'batman' }}
              requestSearchParam="s"
              requestUri="http://www.omdbapi.com"
            />
          </div>
        </Row>

        <Col>
          <div>
            <Button label="Options" onClick={() => setShowOptions(true)} />

            <FloatLayer
              elevation={9}
              onClose={() => setShowOptions(false)}
              outlined
              rounded
              show={useShowOptions}
            >
              <div style={{ padding: '24px' }}>
                <Control
                  onChange={handleOptions}
                  options={options}
                  groups={[
                    {
                      title: 'Options',
                      tagName: 'Checkbox',
                      items: [
                        'autocomplete',
                        'clearable',
                        'disabled',
                        'helper',
                        'icon',
                        'multiple',
                        'placeholder',
                        'required',
                        'textHelperTop',
                        'searchable',
                        'request',
                      ],
                    },

                    {
                      title: 'Size',
                      tagName: 'Radio',
                      optionTarget: 'size',
                      items: ['small', 'medium', 'large'],
                    },
                  ]}
                />
              </div>
            </FloatLayer>

            <pre>
              value: <code>{JSON.stringify(useValue, null, 2)}</code>
              <br />
              selecteds: <code>{JSON.stringify(useSelecteds, null, 2)}</code>
            </pre>
          </div>
        </Col>
      </Grid>
    </>
  )
}

export default SelectExample
