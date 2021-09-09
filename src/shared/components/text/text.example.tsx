import React, { useEffect, useState } from 'react'

import Col from 'shared/components/context/col'
import Grid from 'shared/components/context/grid'
import Row from 'shared/components/context/row'

import Text from './'

const TextExample: React.FC = () => {
  const [useTexts, setTexts] = useState<any>({})

  const textLarger =
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'

  useEffect(() => {
    setTimeout(() => {
      setTexts({ title: 'Example, Text' })

      for (const [i] of Array.from(Array(6)).entries() as any) {
        if (i > 0) {
          setTimeout(() => {
            setTexts((prevState: any) => ({
              ...prevState,
              [`title${i}`]: textLarger.substr(0, 11),
              [`text${i}`]: textLarger.substr(0, i * 100),
            }))
          }, i * 1000)
        }
      }
    }, 4000)

    setTimeout(() => {
      setTexts((prevState: any) => ({
        ...prevState,
        subTitle1: 'What is Lorem Ipsum',
        text1b: textLarger.substr(0, 250),
      }))
    }, 6000)
  }, [])

  return (
    <>
      <Row>
        <div style={{ width: '250px' }}>
          <Text value={useTexts.title} title size="xLarger" rounded />
        </div>
      </Row>
      <Row>
        <div style={{ width: '200px' }}>
          <Text
            value={useTexts.title1}
            title
            rounded
            size="larger"
            color="danger"
            margin="0 0 8px 0"
            icon="pdf"
          />
        </div>
        <div style={{ width: '180px' }}>
          <Text
            value={useTexts.subTitle1}
            title
            rounded
            size="minor"
            color="info"
            margin="0 0 16px 0"
            icon="question-mark-outline"
            iconColor="warning"
            iconDir="right"
          />
        </div>{' '}
        <Text value={useTexts.text1} size="medium" />
        <br />
        <Text value={useTexts.text1b} lines={2} color="info" size="minor" />
      </Row>
      <Row>
        <div style={{ width: '172px' }}>
          <Text
            value={useTexts.title2}
            title
            size="larger"
            color="success"
            margin="0 0 8px 0"
            rounded
          />
        </div>{' '}
        <Text value={useTexts.text2} lines={2} />
      </Row>
      <Row>
        <Grid>
          <Col full>
            <div style={{ width: '172px' }}>
              <Text
                value={useTexts.title3}
                title
                size="medium"
                rounded
                color="warning"
                margin="0 0 8px 0"
              />
            </div>{' '}
            <Text value={useTexts.text3} lines={4} padding="8px" applyBaseColor />
          </Col>
          <Col full>
            <div style={{ width: '172px' }}>
              <Text value={useTexts.title4} title size="medium" rounded margin="0 0 8px 0" />
            </div>{' '}
            <Text value={useTexts.text4} lines={4} />
          </Col>
        </Grid>
      </Row>
      <Row>
        <Text
          value={useTexts.text5}
          lines={3}
          color="success"
          applyBaseColor
          padding="8px"
          rounded
          icon="checkmark-circle-outline"
          iconColor="success"
          margin="0 0 12px 0"
        />
        <Text
          value={useTexts.text5}
          lines={3}
          color="danger"
          applyBaseColor
          rounded
          icon="alert-circle-outline"
          iconColor="danger"
          padding="8px"
          margin="0 0 12px 0"
        />
        <Text
          value={useTexts.text5}
          lines={3}
          color="warning"
          applyBaseColor
          rounded
          icon="alert-triangle-outline"
          iconColor="warning"
          padding="8px"
          margin="0 0 12px 0"
        />
        <Text
          value={useTexts.text5}
          lines={3}
          color="info"
          applyBaseColor
          rounded
          icon="info-outline"
          iconColor="info"
          padding="8px"
        />
      </Row>
    </>
  )
}

export default TextExample
