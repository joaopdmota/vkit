import React from 'react'
import RouterType from './types/router.type'
import useComponentsByRoute from './hooks/useComponentByRoute'

const SetPage: React.FC<RouterType> = ({ routesGroups }) => {
  const { setPage } = useComponentsByRoute(routesGroups)
  return <>{setPage}</>
}

export default SetPage
