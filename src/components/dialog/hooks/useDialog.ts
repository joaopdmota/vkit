import { useState, useCallback, useEffect } from 'react'

interface UseDialogInterface {
  isAutoOpen?: boolean
  isSize: string
  onClose: Function
}

const UseDialog = ({
  isAutoOpen,
  isSize,
  onClose,
}: UseDialogInterface): {
  useOpenDialog: boolean
  usePersistent: boolean
  useShowDialog: boolean
  useHeightBody: number
  onOpenDialog: () => void
  onCloseDialog: Function
} => {
  const [useOpenDialog, setOpenDialog] = useState(false)
  const [usePersistent, setPersistent] = useState(false)
  const [useShowDialog, setShowDialog] = useState(false)
  const [useHeightBody, setHeightBody] = useState(0)

  const sizes = ['minor', 'small', 'medium', 'larger', 'xLarger']
  const heightBody = sizes.indexOf(isSize) * 150

  const onOpenDialog = useCallback(() => {
    setOpenDialog(true)
    setTimeout(() => {
      setShowDialog(true)
    })
  }, [])

  const onCloseDialog = useCallback(
    (isLock: boolean) => {
      if (!isLock) {
        setShowDialog(false)
        setTimeout(() => {
          setOpenDialog(false)
        }, 500)
        onClose()
      } else {
        setPersistent(true)
        setTimeout(() => {
          setPersistent(false)
        }, 500)
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (isAutoOpen) {
      onOpenDialog()
    }
    setHeightBody(heightBody)
  }, [isAutoOpen, heightBody, onOpenDialog])

  return {
    useOpenDialog,
    usePersistent,
    useShowDialog,
    useHeightBody,
    onOpenDialog,
    onCloseDialog,
  }
}

export default UseDialog
