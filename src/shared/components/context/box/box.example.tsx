import React from 'react'

import Badge from 'components/badge/badge'
import Row from 'shared/components/context/row'

import Box from './'

const BoxExample: React.FC = () => (
  <>
    <Row>
      <h1>Example, Box</h1>
    </Row>
    <Row>
      <Box elevation={10} type="sheet">
        <Row>
          <div
            style={{
              width: '160px',
              position: 'relative',
              marginTop: '5px',
            }}
          >
            <strong>Box Sheet elevation</strong>
            <Badge value={10} />
          </div>{' '}
          <br />
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industrys standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </Row>
      </Box>
    </Row>
    <Row>
      <Box elevation={2} type="card" outlined>
        <Row>
          <div style={{ width: '150px', position: 'relative', marginTop: '5px' }}>
            <strong>Box Card elevation</strong>
            <Badge value={2} color="warning" />
          </div>{' '}
          <br />
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Row>
      </Box>
    </Row>
    <Row>
      <Box elevation={4} type="card">
        <Row>
          <div style={{ width: '150px', position: 'relative', marginTop: '5px' }}>
            <strong>Box Card elevation</strong>
            <Badge value={4} color="success" />
          </div>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Row>
      </Box>
    </Row>
  </>
)

export default BoxExample
