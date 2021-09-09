import React from 'react'
import List from 'shared/components/list'
import Button from 'shared/components/button'

import DataType from 'components/webform/select/types/data.type'

type ListMultipleType = {
  data?: DataType[] | null
  onClick?: Function
  useSize: number
  listItemHeight: number
}

const ListMultipleSelecteds: React.FC<ListMultipleType> = ({
  data,
  onClick,
  useSize,
  listItemHeight,
}) => (
  <List
    data={data?.length ? data : null}
    dataList={[
      {
        darken: true,
        value: 'text',
      },
      {
        // eslint-disable-next-line react/display-name
        value: <Button icon="close-outline" />,
        width: '24px',
      },
    ]}
    hideHeader
    onClick={onClick}
    onHover
    size={useSize}
    innerHeight={listItemHeight}
  />
)

export default ListMultipleSelecteds
