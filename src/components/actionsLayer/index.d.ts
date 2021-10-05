import { ReactElement } from 'react'

import { PopoverType } from '../../shared/components/popover/types/popover.type'
import ActionSheetType from '../../shared/components/actionSheet/types/actionSheet.type'

declare function ActionsLayer({ ...props }: ActionSheetType & PopoverType): ReactElement | null

export default ActionsLayer
