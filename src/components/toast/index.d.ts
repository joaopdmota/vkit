import { ReactElement } from 'react'

import ToastType from './types/toast.type'

declare function Toast(): { open: ({}: ToastType) => void; toast: ReactElement }

export default Toast
