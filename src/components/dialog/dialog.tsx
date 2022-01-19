import React from 'react'

import classesBuilder from 'shared/utils/classesBuilder'

import BackDrop from 'shared/components/backdrop'
import Button from 'shared/components/button'
import Scrollbar from 'shared/components/context/scrollbar'

import DialogType from './types/dialog.type'

import UseDialog from './hooks/useDialog'

import style from 'theme/components/dialog/dialog.module.scss'

const Dialog: React.FC<DialogType> = ({
  autoOpen,
  body,
  children,
  close,
  elevation,
  footer,
  head,
  instanceEmitter,
  persistent,
  outlined,
  rounded,
  shadow,
  size = 'small',
  title,
  onClose = () => {}
}) => {
  const {
    useOpenDialog,
    usePersistent,
    useShowDialog,
    useHeightBody,
    onOpenDialog,
    onCloseDialog,
  } = UseDialog({ isAutoOpen: autoOpen, isSize: size, onClose })

  const classNamesDialog = {
    dialog: true,
    [`elevation${elevation}`]: elevation,
    persistent: usePersistent,
    outlined,
    rounded,
    shadow,
    show: useShowDialog,
    [size]: size,
  }

  if (instanceEmitter instanceof Object) {
    Object.assign(instanceEmitter, {
      open: onOpenDialog,
      dismiss: onCloseDialog,
    })
  }

  return useOpenDialog ? (
    <>
      <BackDrop blur show={useShowDialog} onClose={() => onCloseDialog(!!persistent)} />
      <div className={classesBuilder(style, classNamesDialog)}>
        {close && !persistent ? (
          <div className={style.close}>
            <Button icon="close-outline" onClick={() => onCloseDialog()} />
          </div>
        ) : null}
        <div className={style.head}>{head}</div>
        <div
          className={classesBuilder(style, {
            title: true,
            hide: !title,
          })}
        >
          {title}
        </div>
        <div className={style.body}>
          <Scrollbar maxHeight={useHeightBody} stopPropagation>
            <div className={style.context}>{body || children}</div>
          </Scrollbar>
        </div>
        <div className={style.footer}>{footer}</div>
      </div>
    </>
  ) : null
}

export default Dialog
