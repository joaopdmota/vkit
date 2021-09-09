import React, { useRef, useState } from 'react'

import Grid from 'shared/components/context/grid'
import Col from 'shared/components/context/col'

import SliderSwiper from './'

const SliderSwiperExample: React.FC<{}> = () => {
  const useRefSliderIntance = useRef({
    close: () => {},
    goSlider: ({}: number) => {},
  })
  const [useStartElement, setStartElement] = useState<HTMLDivElement | null>(null)

  return (
    <>
      <div style={{ position: 'absolute', left: 0, width: '50%', zIndex: 21 }}>
        <SliderSwiper axisY="top" parentMove startElement={useStartElement} closed preventDefault>
          <div
            style={{
              width: '100%',
              height: '280px',
              backgroundColor: 'var(--vkit-color-contrast-3)',
              zIndex: 21,
            }}
          >
            Swiper Top
          </div>
        </SliderSwiper>
        <div
          ref={setStartElement}
          style={{
            position: 'absolute',
            height: '20px',
            width: '100%',
            backgroundColor: 'var(--vkit-color-contrast-3)',
          }}
        >
          <div
            style={{
              width: '100px',
              height: '5px',
              backgroundColor: 'var(--vkit-color-contrast-2)',
              margin: '8px auto',
              borderRadius: '20px',
            }}
          />
        </div>
      </div>
      <div style={{ position: 'absolute', right: 0, width: '50%', zIndex: 20 }}>
        <SliderSwiper axisX="right" parentMove closed>
          <div
            style={{
              width: '100%',
              height: '300px',
              backgroundColor: 'var(--vkit-color-contrast-2)',
            }}
          >
            Swiper Right
          </div>
        </SliderSwiper>
      </div>
      <div
        style={{
          position: 'relative',
          top: '320px',
          zIndex: 21,
          overflow: 'hidden',
        }}
      >
        <SliderSwiper
          axisX
          sliders
          indicators="bottom"
          instanceEmitter={useRefSliderIntance.current}
        >
          <div style={{ height: '300px' }}>
            <Grid>
              {Array.from(Array(41)).map((_, key) => (
                <Col key={key} padding="0 8px 0 0" full>
                  <div
                    style={{
                      width: '100%',
                      height: '300px',
                      backgroundColor: 'var(--vkit-color-contrast-2)',
                    }}
                  >
                    Swiper Items {key + 1}
                  </div>
                </Col>
              ))}
            </Grid>
          </div>
        </SliderSwiper>
      </div>
    </>
  )
}

export default SliderSwiperExample
