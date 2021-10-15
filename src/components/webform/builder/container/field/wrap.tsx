import React, { ReactNode, LegacyRef } from 'react'

type WrapFieldType = {
  body?: ReactNode
  children?: ReactNode
  className?: string
  footer?: ReactNode
  label?: string
  required?: boolean
  requiredSign?: boolean
  style?: { [key: string]: string }
  textHelper?: string
  textHelperTop?: boolean
  wrapperRef?: { current: HTMLDivElement | null }
}

const WrapField: React.FC<WrapFieldType> = ({
  body,
  children,
  className,
  footer,
  label,
  required,
  requiredSign,
  style,
  textHelper,
  textHelperTop,
  wrapperRef,
}) => (
  <div className={className} ref={wrapperRef as LegacyRef<HTMLDivElement>}>
    <div>
      {label && (
        <span className={style?.label}>
          {label}
          {(requiredSign || required) && <span className={style?.requiredSign}>*</span>}
        </span>
      )}

      {textHelperTop && <div className={style?.textHelper}>{textHelper}</div>}

      <div className={style?.container}>{children || body}</div>
    </div>

    {footer}

    {textHelperTop || <div className={style?.textHelper}>{textHelper}</div>}
  </div>
)

export default WrapField
