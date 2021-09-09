import React, { useRef, useEffect, useState } from 'react'

import { WrapComponentRouteChildrenType } from './types/wrapComponentRoute.type'
import Content from 'shared/components/context/content'
import style from 'theme/router//transitions.module.scss'
import useShowOpen from './hooks/useShowOpen'
import classesBuilder from 'shared/utils/classesBuilder'

const WrapComponentRoutePage: React.FC<WrapComponentRouteChildrenType> = ({
  children,
  height,
  show,
  pathParent,
}) => {
  const [useHeight, setHeight] = useState<number>(0)
  const wrapComponentRouteRef = useRef<HTMLDivElement>(null)

  const { useOpen, useShow } = useShowOpen({ canShow: show })

  useEffect(() => {
    if (wrapComponentRouteRef?.current) {
      const parentHeight =
        wrapComponentRouteRef.current?.parentElement?.offsetHeight ?? window.innerHeight

      setHeight(height ?? parentHeight)
    }
  }, [wrapComponentRouteRef, height])

  const classNames = {
    slide: pathParent,
    fade: !pathParent,
    show: useShow,
    transitions: true,
  }

  return useOpen ? (
    <div className={classesBuilder(style, classNames)}>
      <div ref={wrapComponentRouteRef} className={style.wrapper}>
        <Content height={useHeight}>{children}</Content>
      </div>
    </div>
  ) : null
}

export default WrapComponentRoutePage
