import { MouseEventHandler } from 'react'
import BackdropClasses from './backdropClasses.type'

type Backdrop = BackdropClasses & {
  onClose?: MouseEventHandler
}

export default Backdrop
