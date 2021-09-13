import React, { ReactNode } from 'react'

import Backdrop from 'shared/components/backdrop'
import classesBuilder from 'shared/utils/classesBuilder'

import { LoaderType } from './types/loader.type'

import {
  Dot,
  DotSpinner,
  DotSpinnerProgress,
  Logo,
  SpinnerProgress,
  SpinnerProgressFade,
} from './container'

import style from 'theme/components/loader/loader.module.scss'

const Loader: React.FC<LoaderType> = ({ label, type = 'spinnerProgressFade', full, color }) => {
  const classNames = {
    loader: true,
    full,
  }

  const wrapperClassnames = {
    loaderWrapper: true,
    full,
  }

  function renderLoader(loaderType: string): ReactNode | null {
    switch (loaderType) {
      case 'dot':
        return <Dot full={full} color={color} />
      case 'dotSpinner':
        return <DotSpinner full={full} color={color} />
      case 'dotSpinnerProgress':
        return <DotSpinnerProgress full={full} color={color} />
      case 'spinnerProgress':
        return <SpinnerProgress full={full} color={color} />
      case 'spinnerProgressFade':
        return <SpinnerProgressFade full={full} color={color} />
      case 'logo':
        return <Logo />
      default:
        return null
    }
  }

  return (
    <div className={classesBuilder(style, classNames)}>
      {full && <Backdrop show />}
      <div className={classesBuilder(style, wrapperClassnames)}>
        {renderLoader(type)}
        {full && <span className={style.label}>{label}</span>}
      </div>
    </div>
  )
}

export default Loader
