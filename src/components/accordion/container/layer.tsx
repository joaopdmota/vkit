import React from 'react'

import Icon from 'components/icon'
import Scrollbar from 'context/scrollbar'

import { LayerType } from '../types/accordion.type'

import classesBuilder from 'shared/utils/classesBuilder'
import UseLayer from './hooks/useLayer'

import style from 'theme/components/accordion/accordion.module.scss'

const Layer: React.FC<LayerType> = ({
  body,
  full,
  title,
  height,
  expanded,
  handleChange,
  accordionItem,
  disabled,
  children,
  cellSpacing,
  group,
}) => {
  const { getAccordionContent, useAccordion, useAccordionHeight, setAccordion } = UseLayer(
    !!expanded,
  )

  const handleAccordionChange = (): void => {
    setAccordion(!useAccordion)
    handleChange?.(accordionItem)
  }

  const classNames = {
    accordion: true,
    full,
    open: useAccordion,
    disabled,
    cellSpacing,
    single: !group,
  }

  const childrenClassNames = {
    body: true,
    scrollbarPadding: !!height,
  }

  const accordionElement = body || children

  return (
    <div className={classesBuilder(style, classNames)}>
      <div className={style.title} {...(!disabled && { onClick: () => handleAccordionChange() })}>
        <span className={style.label}>{title}</span>
        <span className={style.icon}>
          <Icon name="arrow-ios-downward-outline" />
        </span>
      </div>

      <div
        style={{ maxHeight: `${useAccordionHeight}px` }}
        className={classesBuilder(style, childrenClassNames)}
        ref={getAccordionContent}
      >
        {height ? <Scrollbar maxHeight={height}>{accordionElement}</Scrollbar> : accordionElement}
      </div>
    </div>
  )
}

export default Layer
