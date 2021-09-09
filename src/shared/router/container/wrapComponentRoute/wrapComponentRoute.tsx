import React from 'react'

import WrapComponentRouteModal from './modal'
import WrapComponentRoutePage from './page'
import WrapComponentRouteType from './types/wrapComponentRoute.type'

const WrapComponentRoute: React.FC<WrapComponentRouteType> = ({
  children,
  show = false,
  type,
  title,
  pathParent,
}) => {
  const ComponentWrap =
    {
      page: WrapComponentRoutePage,
      modal: WrapComponentRouteModal,
    }[type] || WrapComponentRoutePage

  return (
    <ComponentWrap pathParent={pathParent} show={show} title={title}>
      {children}
    </ComponentWrap>
  )
}

export default WrapComponentRoute
