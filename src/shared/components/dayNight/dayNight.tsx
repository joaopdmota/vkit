import React from 'react'

import classesBuilder from 'shared/utils/classesBuilder'

import UseTheme from './hooks/useTheme'

import style from 'theme/components/dayNight/dayNight.module.scss'

const DayNight: React.FC<{}> = () => {
  const { handlerTheme, useTheme } = UseTheme()

  return (
    <div
      className={classesBuilder(style, {
        dayNight: true,
        night: useTheme === 'dark',
      })}
    >
      <div className={style.timeCircle} onClick={handlerTheme}>
        <div className={style.sun} />
        <div className={style.moon} />
        <div className={style.stars}>
          {Array.from(Array(7)).map((_, key) => (
            <div key={key} />
          ))}
        </div>
        <div className={style.water} />
      </div>
    </div>
  )
}

export default DayNight
