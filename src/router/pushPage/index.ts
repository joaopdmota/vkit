import { ReactElement } from 'react'

import RouterType from '../../shared/router/types/router.type'

declare function PushPage({ ...props }: RouterType): ReactElement | null

export default PushPage
