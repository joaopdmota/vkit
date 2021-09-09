import React, { useEffect, useState } from 'react'

import Col from 'shared/components/context/col'
import Grid from 'shared/components/context/grid'
import Row from 'shared/components/context/row'
import Text from 'shared/components/text'

import Image from './'

const ImageExample: React.FC = () => {
  const [useTexts, setTexts] = useState<any>({})
  const [useImage, setImage] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setTexts({ name: 'Jannet Scott' })
    }, 3000)

    setTimeout(() => {
      setTexts((prevState: any) => ({
        ...prevState,
        professional: 'Product Owner',
      }))
    }, 4000)

    setTimeout(() => {
      setImage('https://randomuser.me/api/portraits/women/21.jpg')
    }, 6000)
  }, [])

  return (
    <>
      <Row>
        <Grid>
          <Col full>
            <div style={{ width: '225px' }}>
              <Grid alignItems="center">
                <Col>
                  <Image src={useImage} type="circle" />
                </Col>
                <Col full>
                  <Text
                    value={useTexts.name}
                    title
                    size="medium"
                    {...(!useTexts?.name && { margin: '0 0 5px 0' })}
                    rounded
                  />
                  <Text value={useTexts.professional} size="minor" fontWeight="bold" />
                </Col>
              </Grid>
            </div>
          </Col>
          <Col full>
            <div style={{ width: '225px' }}>
              <Grid alignItems="center">
                <Col>
                  <Image type="circle" />
                </Col>
                <Col full>
                  <Text value="Margarett" title size="medium" rounded />
                  <Text value="Agile Coach" size="minor" fontWeight="bold" />
                </Col>
              </Grid>
            </div>
          </Col>
          <Col>
            <div style={{ width: '225px' }}>
              <Grid alignItems="center">
                <Col>
                  <Image src="https://randomuser.me/api/portraits/women/3.jpg" type="rounded" />
                </Col>
                <Col full>
                  <Text value="Julie Watson" title size="medium" rounded />
                  <Text value="UX Design" size="minor" fontWeight="bold" />
                </Col>
              </Grid>
            </div>
          </Col>
        </Grid>
        <Grid alignContent="center">
          <Col>
            <div style={{ width: '225px' }}>
              <Grid alignItems="center">
                <Col>
                  <Image alt="Wallace Belato" type="circle" />
                </Col>
                <Col full>
                  <Text value="Wallace Belato" title size="small" rounded />
                  <Text value="Developer" size="minor" fontWeight="bold" />
                </Col>
              </Grid>
            </div>
          </Col>
          <Col>
            <div style={{ width: '215px' }}>
              <Grid alignItems="center">
                <Col>
                  <Image alt="Richard Silva" type="circle" />
                </Col>
                <Col full>
                  <Text value="Richard Silva" title size="small" rounded />
                  <Text value="Developer" size="minor" fontWeight="bold" />
                </Col>
              </Grid>
            </div>
          </Col>
          <Col>
            <div style={{ width: '215px' }}>
              <Grid alignItems="center">
                <Col>
                  <Image alt="João Paulo" type="circle" />
                </Col>
                <Col full>
                  <Text value="João Paulo" title size="small" rounded />
                  <Text value="Developer" size="minor" fontWeight="bold" />
                </Col>
              </Grid>
            </div>
          </Col>
        </Grid>
      </Row>
    </>
  )
}

export default ImageExample
