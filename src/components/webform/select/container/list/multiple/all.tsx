import React from 'react'
import List from 'shared/components/list'
import Grid from 'shared/components/context/grid'
import { Checkbox } from 'components'

import DataType from 'components/webform/select/types/data.type'

import style from 'theme/components/webform/select/select.module.scss'

type ListMultipleType = {
  data?: DataType[] | null
  onClick?: Function
  onPage?: Function
  isChecked: Function
  useSize: number
  listItemHeight: number
}

const ListMultipleAll: React.FC<ListMultipleType> = ({
  data,
  onClick,
  onPage,
  isChecked,
  useSize,
  listItemHeight,
}) => {
  return (
    <List
      data={data}
      dataList={[
        {
          // eslint-disable-next-line react/display-name
          value: (item: any) => (
            <div className={style.listCheckbox}>
              <Grid alignContent="center" alignItems="center">
                <Checkbox small noAnimation checked={isChecked(item.value)} />
              </Grid>
            </div>
          ),
          width: '24px',
        },
        {
          darken: true,
          value: 'text',
        },
      ]}
      hideHeader
      innerHeight={listItemHeight}
      onClick={onClick}
      onHover
      onPage={onPage}
      size={useSize}
    />
  )
}

export default ListMultipleAll
