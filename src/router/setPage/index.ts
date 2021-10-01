import { ReactElement } from 'react'

import RouterType from '../../shared/router/types/router.type'

declare function SetPage({ ...props }: RouterType): ReactElement | null

export default SetPage
