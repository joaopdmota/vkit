import React, { useState } from 'react'

import Row from 'shared/components/context/row'
import Grid from 'shared/components/context/grid'
import Text from 'shared/components/text'

import Select from './'

const SelectExample: React.FC = () => {
  const [useValue1, setValue1] = useState<string | string[]>('')
  const [useValue2, setValue2] = useState<string | string[]>('')
  const [useValue3, setValue3] = useState<string | string[]>('')

  return (
    <>
      <Row>
        <Text value="Select" title />
      </Row>

      <Grid>
        <Row>
          <Select
            label="Simples"
            data={Array(50)
              .fill(null)
              .map((_, index) => ({
                text: `text ${index}`,
                value: `text ${index}`,
              }))}
            value={useValue1}
            onChange={setValue1}
            clearable
          />
        </Row>
        <Row>
          <Select
            label="Multiplo"
            data={Array(50)
              .fill(null)
              .map((_, index) => ({
                text: `text ${index}`,
                value: `text ${index}`,
              }))}
            value={useValue2}
            onChange={setValue2}
            multiple
            clearable
          />
        </Row>
        <Row>
          <Select
            label="API"
            value={useValue3}
            onChange={setValue3}
            clearable
            searchable
            multiple
            autoRequest
            requestPageParam="page"
            requestResponseText={(item: any): string => `${item.Title} - ${item.Year}`}
            requestResponseValue="imdbID"
            requestRouter="/"
            requestResponseRootPath="Search"
            requestParams={{ apikey: 'f57cce53', s: 'batman' }}
            requestSearchParam="s"
            requestUri="http://www.omdbapi.com"
          />
        </Row>
      </Grid>
    </>
  )
}

export default SelectExample
