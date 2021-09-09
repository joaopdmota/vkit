import { ReactElement } from 'react'

import SelectType from './types/select.type'

declare function Select(): { open: ({}: SelectType) => void; select: ReactElement }

export default Select
