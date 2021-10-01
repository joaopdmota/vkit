import { ReactElement } from 'react'

import { TooltipType } from './types/tooltip.type'

declare function Tooltip({ ...props }: TooltipType): ReactElement | null

export default Tooltip
