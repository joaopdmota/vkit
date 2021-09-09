import React from 'react'

import Row from 'shared/components/context/row'
import Text from 'shared/components/text'

import Tabs from './'

const TabsExample: React.FC = () => {
  return (
    <Row>
      <Tabs
        activeElement={5}
        actions={[
          {
            label: 'Tab 1',
            icon: 'question-mark-outline',
            body: (
              <Text
                value="Here is an example from Tab 1"
                title
                rounded
                size="minor"
                color="info"
                icon="question-mark-outline"
                iconColor="warning"
                iconDir="right"
              />
            ),
          },
          {
            label: 'Tab 2',
            icon: 'question-mark-outline',
            body: (
              <Text
                value="Here is an example from Tab 2"
                title
                rounded
                size="minor"
                color="info"
                icon="question-mark-outline"
                iconColor="warning"
                iconDir="right"
              />
            ),
          },
          {
            label: 'Tab 3',
            icon: 'question-mark-outline',
            body: (
              <Text
                value="Here is an example from Tab 3"
                title
                rounded
                size="minor"
                color="info"
                icon="question-mark-outline"
                iconColor="warning"
                iconDir="right"
              />
            ),
          },
          {
            label: 'Tab 4',
            icon: 'question-mark-outline',
            body: (
              <Text
                value="Here is an example from Tab 4"
                title
                rounded
                size="minor"
                color="info"
                icon="question-mark-outline"
                iconColor="warning"
                iconDir="right"
              />
            ),
          },
          {
            label: 'Tab 5',
            icon: 'question-mark-outline',
            body: (
              <Text
                value="Here is an example from Tab 5"
                title
                rounded
                size="minor"
                color="info"
                icon="question-mark-outline"
                iconColor="warning"
                iconDir="right"
              />
            ),
          },
          {
            label: 'Tab 6',
            icon: 'question-mark-outline',
            body: (
              <Text
                value="Here is an example from Tab 6"
                title
                rounded
                size="minor"
                color="info"
                icon="question-mark-outline"
                iconColor="warning"
                iconDir="right"
              />
            ),
          },
        ]}
      ></Tabs>
    </Row>
  )
}

export default TabsExample
