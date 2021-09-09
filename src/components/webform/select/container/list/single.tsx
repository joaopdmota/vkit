import React from 'react'

import List from 'shared/components/list'
import FloatLayer from 'shared/components/floatLayer'

import Search from './search'

import DataType from 'components/webform/select/types/data.type'

type ListSingleType = {
  searchable?: boolean
  label?: string
  onClick?: Function
  show: boolean
  getElement: ({}: HTMLDivElement) => void
  isRequestable: boolean
  isFinished: boolean
  setPage: Function
  onSearch: (...item: any) => void
  useContentList?: DataType[] | null
  useSize: number
  useTerm: string
  listItemHeight: number
}

const ListSingle: React.FC<ListSingleType> = ({
  searchable,
  label,
  onClick,
  show,
  getElement,
  isFinished,
  isRequestable,
  listItemHeight,
  onSearch,
  setPage,
  useContentList,
  useSize,
  useTerm,
}) => (
  <FloatLayer
    elevation={9}
    full
    height={window.innerHeight}
    outlined
    rounded
    show={show}
    title={label ?? 'Selecione'}
  >
    <div ref={getElement}>
      <div>{searchable && <Search onSearch={onSearch} term={useTerm} />}</div>

      <List
        {...(!isFinished && isRequestable ? { onPage: setPage } : {})}
        data={useContentList}
        dataList={[
          {
            darken: true,
            value: 'text',
          },
        ]}
        hideHeader
        innerHeight={listItemHeight}
        onClick={onClick}
        onHover
        size={useSize}
      />
    </div>
  </FloatLayer>
)

export default ListSingle
