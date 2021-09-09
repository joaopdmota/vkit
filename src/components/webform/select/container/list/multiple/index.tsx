import React from 'react'

import FloatLayer from 'shared/components/floatLayer'

import Search from 'components/webform/select/container/list/search'
import TabsList from 'components/webform/select/container/tabs'
import ShowHide from 'components/webform/select/context/showHide'

import ListAll from './all'
import ListSelecteds from './selecteds'

import DataType from 'components/webform/select/types/data.type'

import style from 'theme/components/webform/select/select.module.scss'

type ListMultipleType = {
  getElement: ({}: HTMLDivElement) => void
  isChecked: Function
  isFinished: boolean
  isRequestable: boolean
  label?: string
  listItemHeight: number
  onClick?: Function
  onSearch: (...item: any) => void
  onSearchSelecteds: (...item: any) => void
  searchable?: boolean
  setListIndex: Function
  setPage: Function
  show: boolean
  showTabSelecteds?: boolean
  useContentList?: DataType[] | null
  useContentListSelecteds?: DataType[] | null
  useListIndex: number
  useSelecteds?: DataType[] | null
  useSize: number
  useTerm: string
  useTermSelecteds: string
}

const ListMultiple: React.FC<ListMultipleType> = ({
  getElement,
  isChecked,
  isFinished,
  isRequestable,
  label,
  listItemHeight,
  onClick,
  onSearch,
  onSearchSelecteds,
  searchable,
  setListIndex,
  setPage,
  show,
  showTabSelecteds,
  useContentList,
  useContentListSelecteds,
  useListIndex,
  useSelecteds,
  useSize,
  useTerm,
  useTermSelecteds,
}) => (
  <FloatLayer
    full
    outlined
    title={label ?? 'Selecione'}
    rounded
    show={show}
    height={window.innerHeight}
    elevation={9}
  >
    <div className={style.list}>
      {showTabSelecteds && (
        <TabsList
          numSelecteds={useSelecteds?.length ?? 0}
          tabActive={useListIndex}
          onChange={setListIndex as () => void}
        />
      )}

      <div ref={getElement}>
        <div>
          <ShowHide visible={!!searchable}>
            {useListIndex === 0 ? (
              <Search onSearch={onSearch} term={useTerm} />
            ) : (
              <Search onSearch={onSearchSelecteds} term={useTermSelecteds} />
            )}
          </ShowHide>
        </div>

        <ShowHide visible={useListIndex === 0}>
          <ListAll
            {...(!isFinished && isRequestable ? { onPage: setPage } : {})}
            isChecked={isChecked}
            data={useContentList}
            onClick={onClick}
            useSize={useSize}
            listItemHeight={listItemHeight}
          />
        </ShowHide>

        <ShowHide visible={useListIndex === 1}>
          <ListSelecteds
            data={useContentListSelecteds}
            listItemHeight={listItemHeight}
            onClick={onClick}
            useSize={useSize}
          />
        </ShowHide>
      </div>
    </div>
  </FloatLayer>
)

export default ListMultiple
