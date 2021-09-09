import React from 'react'
import RouterType from './types/router.type'
import useComponentsByRoute from './hooks/useComponentByRoute'

const ModalPage: React.FC<RouterType> = ({ routesGroups }) => {
  const { modalPages } = useComponentsByRoute(routesGroups)

  return <>{modalPages}</>
}

export default ModalPage
