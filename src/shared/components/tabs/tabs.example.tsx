import React, { useState } from 'react'

import Row from 'shared/components/context/row'
import Text from 'shared/components/text'
import Button from 'shared/components/button'

import Tabs from './'

type tabElementType = {
  label: string
  icon: string
  disabled?: boolean
  active?: boolean
}

const TabsExample: React.FC = () => {
  const [showTabs, setTabs] = useState(false)
  const [useTabs, setTabsElements] = useState<tabElementType[]>([
    {
      label: 'Tab 1',
      icon: 'question-mark-outline',
    },
    {
      label: 'Tab 2',
      icon: 'question-mark-outline',
    },
    {
      label: 'Tab 3',
      icon: 'question-mark-outline',
    },
    {
      label: 'Tab 4',
      icon: 'question-mark-outline',
    },
    {
      label: 'Tab 5',
      icon: 'question-mark-outline',
    },
    {
      label: 'Tab 6',
      icon: 'question-mark-outline',
    },
  ])

  const handleTab = (): void => {
    setTabs(!showTabs)
  }

  const handleTabChange = (index: number): void => {
    const tabs = useTabs.map((t, i) => ({
      ...t,
      active: index === i,
    }))

    setTabsElements(tabs)
  }

  return (
    <>
      <Row>
        <div>
          <Button label="Show tabs" onClick={handleTab} />
        </div>

        {showTabs && (
          <Row style={{ padding: '20px 0px 0px 0px' }}>
            <Tabs
              onChange={(index: number) => handleTabChange(index)}
              elements={[
                <Text
                  key={0}
                  value="Here is an example from Tab 1"
                  title
                  rounded
                  size="minor"
                  color="info"
                  icon="question-mark-outline"
                  iconColor="warning"
                  iconDir="right"
                />,
                <Text
                  key={1}
                  value="Here is an example from Tab 2"
                  title
                  rounded
                  size="minor"
                  color="info"
                  icon="question-mark-outline"
                  iconColor="warning"
                  iconDir="right"
                />,
                <Text
                  key={2}
                  value="Here is an example from Tab 3"
                  title
                  rounded
                  size="minor"
                  color="info"
                  icon="question-mark-outline"
                  iconColor="warning"
                  iconDir="right"
                />,
                <Text
                  key={3}
                  value="Here is an example from Tab 4"
                  title
                  rounded
                  size="minor"
                  color="info"
                  icon="question-mark-outline"
                  iconColor="warning"
                  iconDir="right"
                />,
                <Text
                  key={4}
                  value="Here is an example from Tab 5"
                  title
                  rounded
                  size="minor"
                  color="info"
                  icon="question-mark-outline"
                  iconColor="warning"
                  iconDir="right"
                />,
                <Text
                  key={5}
                  value="Here is an example from Tab 6"
                  title
                  rounded
                  size="minor"
                  color="info"
                  icon="question-mark-outline"
                  iconColor="warning"
                  iconDir="right"
                />,
                <Text
                  key={6}
                  value="Here is an example from Tab 6"
                  title
                  rounded
                  size="minor"
                  color="info"
                  icon="question-mark-outline"
                  iconColor="warning"
                  iconDir="right"
                />,
              ]}
              actions={useTabs}
            />
          </Row>
        )}
      </Row>
    </>
  )
}

export default TabsExample
