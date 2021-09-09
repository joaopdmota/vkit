import React, { useRef } from 'react'

import Grid from 'shared/components/context/grid'
import Row from 'shared/components/context/row'

import Slider from './'

const SliderExample: React.FC<{}> = () => {
  const useRefSliderIntance = useRef({ goSlider: ({}: number) => {} })
  const namesVideos = ['forest', 'Agua-natural', 'Tropical', 'animation-intro', 'Lines']

  return (
    <Slider
      axisX
      indicators="bottom"
      instanceEmitter={useRefSliderIntance.current}
      overlay="dark"
      elevation={2}
      duration={3}
      infinite
    >
      <Row style={{ padding: 0 }}>
        <Grid>
          {namesVideos.map((v, k) => (
            <video key={k} autoPlay loop muted width="100%" style={{ objectFit: 'cover' }}>
              <source src={`https://mdbcdn.b-cdn.net/img/video/${v}.mp4`} type="video/mp4" />
            </video>
          ))}
        </Grid>
      </Row>
    </Slider>
  )
}

export default SliderExample
