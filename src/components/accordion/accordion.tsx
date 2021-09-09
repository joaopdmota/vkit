import React from 'react'

import { AccordionType } from './types/accordion.type'

import UseAccordion from './hooks/useAccordion'

import Layer from './container/layer'

const Accordion: React.FC<AccordionType> = ({ ...props }) => {
  const { handleChange, useAccordions } = UseAccordion(props)

  return (
    <>
      {useAccordions.map((acc, index) => (
        <Layer group={!!props.group} handleChange={handleChange} key={index} {...acc} />
      ))}
    </>
  )
}

export default Accordion
