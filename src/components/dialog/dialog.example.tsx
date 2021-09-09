import React, { useRef, useEffect } from 'react'

import Text from 'shared/components/text'

import Dialog from './dialog'

const DialogExample: React.FC = () => {
  const useRefDialog = useRef({ open: () => {}, dismiss: () => {} })

  useEffect(() => {
    // useRefDialog.current.open()
  }, [])

  return (
    <Dialog
      // autoOpen
      close
      outlined
      elevation={2}
      instanceEmitter={useRefDialog.current}
      rounded
      shadow
      head={<Text value="Head" title applyBaseColor padding="4px" icon="menu-outline" />}
      title={<Text value="Título" title />}
      // body={<Text value="Body Arg Prop" size="medium" />}
      footer={<Text value="Footer" applyBaseColor padding="8px" icon="info-outline" />}
    >
      <Text value="Body Children" size="medium" />
    </Dialog>
  )
}

export default DialogExample
