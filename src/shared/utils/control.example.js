import React from 'react'
import { Checkbox, Radio } from 'components'

const ComponentControl = ({ tagName = 'Checkbox', ...attributes }) => {
  const ComponentName = {
    Checkbox,
    Radio,
  }[tagName]

  return (
    <div>
      <ComponentName {...attributes} />
    </div>
  )
}

const ControlGroup = ({ components }) =>
  components.map((component, index) => <ComponentControl key={index} {...component} />)

const mountRadioComponets = ({ group, onChange, options }) =>
  group.items.map((itemName) => ({
    tagName: group.tagName,
    label: itemName.text ?? itemName,
    checked: options[group.optionTarget] === (itemName.value ?? itemName),
    onChange: () => onChange({ [group.optionTarget]: itemName.value ?? itemName }),
  }))

const mountCheckboxComponets = ({ group, onChange, options }) =>
  group.items.map((itemName) => ({
    tagName: group.tagName,
    label: itemName,
    checked: options[itemName],
    onChange: () => onChange({ [itemName]: !options[itemName] }),
  }))

const mountControl = ({ groups, onChange, options }) => {
  return groups.map((group) => ({
    title: group.title,
    components:
      group.tagName === 'Radio'
        ? mountRadioComponets({ group, onChange, options })
        : mountCheckboxComponets({ group, onChange, options }),
  }))
}

const ControlGroups = ({ groups, onChange, options }) =>
  mountControl({ groups, onChange, options }).map((group, index) => (
    <div key={index}>
      <p>{group.title}</p>
      <ControlGroup components={group.components} />
    </div>
  ))

export default ControlGroups
