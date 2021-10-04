import Grid from 'shared/components/context/grid'
import Main from 'shared/components/context/main'
import React from 'react'
import StructureAuthType from './types/auth.type'

const StructureAuth: React.FC<StructureAuthType> = ({ children, translucent }) => (
  <Main translucent={translucent} fullHeight>
    <Grid alignContent="center" alignItems="center" growing>
      {children}
    </Grid>
  </Main>
)

export default StructureAuth
