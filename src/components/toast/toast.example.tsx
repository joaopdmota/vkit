import React, { useRef, useCallback, useEffect } from 'react'

import Text from 'shared/components/text'
import Button from 'shared/components/button'
import Grid from 'shared/components/context/grid'
import Col from 'shared/components/context/col'
import Dialog from '../dialog/dialog'

import Toast from './'

const ToastExample: React.FC = () => {
  const useRefDialog = useRef({ open: () => {}, dismiss: () => {} })
  const useRefToast = useRef({ open: () => {}, dismiss: () => {} })

  const { toast, open } = Toast()

  const openToastWarning = useCallback(
    ({ icon, action, duration, type, text, instanceEmitter }) =>
      open({
        action,
        align: 'right',
        type,
        titleColor: type,
        title: 'Oops, you just started a fire',
        text,
        position: 'bottom',
        duration,
        // static: true,
        shadow: true,
        instanceEmitter,
        icon,
      }),
    [open],
  )

  const closeToast = (): void => {
    useRefToast.current.dismiss()
    useRefDialog.current.dismiss()
  }

  useEffect(() => {
    setTimeout(() => {
      openToastWarning({
        action: {
          onClick: () => useRefDialog.current.open(),
          icon: 'close-outline',
        },
        icon: 'activity-outline',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        instanceEmitter: useRefToast.current,
        type: 'default',
      })
    }, 1000)

    setTimeout(() => {
      openToastWarning({
        duration: 15,
        type: 'success',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      })
    }, 2000)

    setTimeout(() => {
      openToastWarning({
        duration: 8,
        type: 'danger',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      })
    }, 3000)

    setTimeout(() => {
      openToastWarning({
        duration: 10,
        type: 'info',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
      })
    }, 4000)

    setTimeout(() => {
      openToastWarning({
        duration: 12,
        type: 'warning',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
      })
    }, 5000)
  }, [openToastWarning])

  return (
    <>
      {toast}
      <Dialog
        persistent
        shadow
        outlined
        rounded
        instanceEmitter={useRefDialog.current}
        elevation={2}
        size="small"
        title={
          <Text
            value="Atenção"
            title
            size="larger"
            icon="alert-triangle-outline"
            iconColor="warning"
            iconSize={32}
          />
        }
        body={
          <>
            <Text value="Tem certeza que deseja excluir este toast?" size="medium" />
            <br />
            <Text value="Oops, you just started a fire" title />
            <Text value="Lorem Ipsum is simply dummy text of the printing and typesetting industry." />
          </>
        }
        footer={
          <Grid alignContent="right">
            <Col>
              <Button label="Cancelar" color="light" onClick={useRefDialog.current.dismiss} />
            </Col>
            <Col>
              <Button label="Remover" icon="close-outline" onClick={closeToast} />
            </Col>
          </Grid>
        }
      />
    </>
  )
}

export default ToastExample
