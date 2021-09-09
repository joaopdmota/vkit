import React from 'react'

import Row from 'shared/components/context/row'
import Text from 'shared/components/text'
import Grid from 'shared/components/context/grid'
import Col from 'shared/components/context/col'

import Button from './'

const ButtonExample: React.FC<{}> = () => (
  <Row>
    <Text value="Padrões" title />
    <Grid>
      <Col>
        <Button label="Default" />
      </Col>
      <Col>
        <Button label="Danger" color="danger" />
      </Col>
      <Col>
        <Button label="Info" color="info" />
      </Col>
      <Col>
        <Button label="Light" color="light" />
      </Col>
      <Col>
        <Button label="Success" color="success" />
      </Col>
      <Col>
        <Button label="Warning" color="warning" />
      </Col>
      <Col>
        <Button label="Disabled" color="warning" disabled />
      </Col>
      <Col>
        <Button label="Loading" loading loaderType="dot" />
      </Col>
    </Grid>
    <Text value="Invertido" title />
    <Grid>
      <Col>
        <Button label="Default" invertColor />
      </Col>
      <Col>
        <Button label="Danger" color="danger" invertColor />
      </Col>
      <Col>
        <Button label="Info" color="info" invertColor />
      </Col>
      <Col>
        <Button label="Light" color="light" invertColor />
      </Col>
      <Col>
        <Button label="Success" color="success" invertColor />
      </Col>
      <Col>
        <Button label="Warning" color="warning" invertColor />
      </Col>
    </Grid>
    <Text value="Solo" title />
    <Grid>
      <Col>
        <Button label="Default" solo />
      </Col>
      <Col>
        <Button label="Danger" color="danger" solo />
      </Col>
      <Col>
        <Button label="Info" color="info" solo />
      </Col>
      <Col>
        <Button label="Light" color="light" solo />
      </Col>
      <Col>
        <Button label="Success" color="success" solo />
      </Col>
      <Col>
        <Button label="Warning" color="warning" solo />
      </Col>
    </Grid>
    <Text value="Border" title />
    <Grid>
      <Col>
        <Button label="Default" outlined />
      </Col>
      <Col>
        <Button label="Danger" color="danger" outlined />
      </Col>
      <Col>
        <Button label="Info" color="info" outlined />
      </Col>
      <Col>
        <Button label="Light" color="light" outlined />
      </Col>
      <Col>
        <Button label="Success" color="success" outlined />
      </Col>
      <Col>
        <Button label="Warning" color="warning" outlined />
      </Col>
    </Grid>
    <Text value="Rounded" title />
    <Grid>
      <Col>
        <Button label="Default" rounded />
      </Col>
      <Col>
        <Button label="Danger" color="danger" rounded />
      </Col>
      <Col>
        <Button label="Info" color="info" rounded />
      </Col>
      <Col>
        <Button label="Light" color="light" rounded />
      </Col>
      <Col>
        <Button label="Success" color="success" rounded />
      </Col>
      <Col>
        <Button label="Warning" color="warning" rounded />
      </Col>
    </Grid>
    <Text value="Sizes" title />
    <Grid>
      <Col>
        <Button label="Minor" size="minor" icon="checkmark-circle-2-outline" />
      </Col>
      <Col>
        <Button label="Small" color="danger" size="small" icon="checkmark-circle-2-outline" />
      </Col>
      <Col>
        <Button
          label="Medium"
          color="info"
          size="medium"
          icon="checkmark-circle-2-outline"
          invertColor
        />
      </Col>
      <Col>
        <Button label="Larger" color="light" size="larger" icon="checkmark-circle-2-outline" />
      </Col>
      <Col>
        <Button label="xLarger" color="success" size="xLarger" icon="checkmark-circle-2-outline" />
      </Col>
    </Grid>
  </Row>
)

export default ButtonExample
