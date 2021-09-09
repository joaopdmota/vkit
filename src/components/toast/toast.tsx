import React, { ReactElement } from 'react'

import classesBuilder from 'shared/utils/classesBuilder'

import ToastType from './types/toast.type'

import UseToast from './hooks/useToast'

import Layer from './container/layer'

import style from 'theme/components/toast/toast.module.scss'

const Toast = (): {
  open: ({}: ToastType) => void
  toast: ReactElement
} => {
  const { useProps, useToast, openLayer } = UseToast(Layer)
  const { align, position } = useProps

  const classNamesToast = {
    toast: true,
    static: useProps.isStatic,
    [`align_${align}`]: align,
    [`position_${position}`]: position,
  }

  return {
    open: openLayer,
    toast: (
      <div className={classesBuilder(style, classNamesToast)}>
        <div className={style.container}>
          {useToast.map((toast, k) => (
            <div
              className={style.node}
              style={{
                zIndex:
                  useProps.align === 'center' && useProps.position === 'top' ? (k + 1) * -1 : k + 1,
              }}
              key={k}
            >
              {toast}
            </div>
          ))}
        </div>
      </div>
    ),
  }
}

export default Toast
