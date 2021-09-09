import { ReactElement } from 'react'

import DialogType from './types/dialog.type'

declare function Dialog({ ...props }: DialogType): ReactElement | null

export default Dialog
