import React from 'react'

import Row from 'shared/components/context/row'
import Text from 'shared/components/text'
import Grid from 'shared/components/context/grid'
import Col from 'shared/components/context/col'

import Chip from './chip'

const ChipExample: React.FC<{}> = () => (
  <Row>
    <Text value="Chips" title />
    <Grid>
      <Col>
        <Chip
          color="light"
          label="Light"
          rounded
          invertColor
          button={{
            color: 'light',
            icon: 'close',
            invertColor: false,
          }}
        />
      </Col>
      <Col>
        <Chip
          color="danger"
          label="Danger"
          icon="checkmark-circle-2-outline"
          rounded
          invertColor
          button={{
            color: 'danger',
            icon: 'trash',
            invertColor: true,
            solo: true,
          }}
        />
      </Col>
      <Col>
        <Chip color="light" label="Selecionar" outlined solo rounded />
      </Col>
      <Col>
        <Chip color="default" icon="checkmark-outline" label="Selecionado" outlined solo rounded />
      </Col>
      <Col>
        <Chip
          color="info"
          label="Mensagens"
          rounded
          size="small"
          reverse
          invertColor
          button={{
            color: 'info',
            invertColor: false,
            label: '27',
            size: 'small',
          }}
        />
      </Col>
      <Col>
        <Chip
          color="danger"
          label="Hanna"
          icon="heart-outline"
          rounded
          size="small"
          reverse
          image={{
            src: 'https://randomuser.me/api/portraits/women/68.jpg',
          }}
        />
      </Col>
      <Col>
        <Chip
          color="default"
          label="Glenna"
          icon="message-circle-outline"
          rounded
          size="small"
          invertColor
          image={{
            src: 'https://randomuser.me/api/portraits/women/50.jpg',
          }}
        />
      </Col>
    </Grid>
  </Row>
)

export default ChipExample
