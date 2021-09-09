import React from 'react'
import RouterType from './types/router.type'
import useComponentsByRoute from './hooks/useComponentByRoute'

const PushPage: React.FC<RouterType> = ({ routesGroups }) => {
  const { pushPage } = useComponentsByRoute(routesGroups)
  return <>{pushPage}</>
}

export default PushPage
