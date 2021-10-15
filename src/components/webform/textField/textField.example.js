import React, { useState } from 'react'

import { TextField, Text } from 'components'
import { Grid, Row } from 'context'

const RangeDemo = () => {
  const [useValue1, setValue1] = useState()
  const [useValue2, setValue2] = useState()
  const [useValue3, setValue3] = useState()
  const [useValue4, setValue4] = useState()
  const [useValue5, setValue5] = useState()
  const [useValue6, setValue6] = useState()
  const [useValue7, setValue7] = useState()
  const [useValue8, setValue8] = useState()
  const [useValue9, setValue9] = useState()

  return (
    <>
      <Row>
        <Text value="TextFields" title />
      </Row>
      <Grid wrap>
        <Row>
          <TextField label="Simples" value={useValue1} onChange={setValue1} />
        </Row>

        <Row>
          <TextField label="Multiline" value={useValue2} onChange={setValue2} multiline />
        </Row>

        <Row>
          <TextField label="Disabled" value={useValue3} onChange={setValue3} disabled />
        </Row>

        <Row>
          <TextField label="Mask - CNPJ" value={useValue4} onChange={setValue4} type="cnpj" />
        </Row>

        <Row>
          <TextField label="Mask - CPF" value={useValue8} onChange={setValue8} type="cpf" />
        </Row>

        <Row>
          <TextField
            label="Custom"
            value={useValue9}
            onChange={setValue9}
            placeholder="Digite uma mascára"
          />
        </Row>

        <Row>
          <TextField
            label="Mask - Custom"
            value={useValue5}
            onChange={setValue5}
            mask={useValue9}
          />
        </Row>

        <Row>
          <TextField label="Loading" value={useValue6} onChange={setValue6} loading />
        </Row>
      </Grid>

      <Row>
        <Text value="Ranges" title />
      </Row>
      <Grid>
        <Row style={{ minWidth: 300 }}>
          <TextField label="Simples" value={useValue7} onChange={setValue7} type="range" />
        </Row>

        <Row style={{ minWidth: 300 }}>
          <TextField label="Double" type="range" double />
        </Row>

        <Row style={{ minWidth: 300 }}>
          <TextField label="Step" type="range" double step={20} />
        </Row>
      </Grid>
    </>
  )
}

export default RangeDemo
