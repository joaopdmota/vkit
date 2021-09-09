import React from 'react'
import LinkRouteType from './types/linkRoute.type'
import { Link } from 'react-router-dom'

const LinkRoute: React.FC<LinkRouteType> = ({ to, transition, children }) => (
  <Link
    to={{
      pathname: to,
      state: {
        transitionName: transition,
      },
    }}
  >
    {children}
  </Link>
)

export default LinkRoute
