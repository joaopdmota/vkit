import React from 'react'

import Icon from 'shared/components/icon'
import ProgressLinear from 'shared/components/progressLinear'
import Text from 'shared/components/text'
import { classesBuilder, dataResolver } from 'shared/utils'

import { DEFAULT_ITEM_INNER_HEIGHT, DEFAULT_EMPTY_MSG } from './constants'

import UseItemsVirtualized from './hooks/virtualScroll/useItemsVirtualized'

import { getClassNamesBody, getClassNamesHeader, getItemsSerialize } from './utils'

import { DataType, ListType } from './types/list.type'

import ScrollbarList from './container'

import style from 'theme/components/list/list.module.scss'

const List: React.FC<ListType> = ({
  data,
  dataList,
  dataResolve,
  hideHeader,
  innerHeight,
  itemPushed,
  onClick,
  onHover,
  onPage,
  size,
  textToEmpty = DEFAULT_EMPTY_MSG,
}) => {
  const items = (
    dataResolve && data instanceof Object ? dataResolver({ data, target: dataResolve }) : data
  ) as Array<any> | null

  const {
    useHasProgressLoader,
    useHasItemsLoader,
    useItemsVirtualized,
    useItemSortable,
    height,
    scrollHeight,
    setScroll,
    setSortable,
  } = UseItemsVirtualized({
    items,
    size,
    innerHeight,
    onPage,
  })

  const getIsSetSort = (header: DataType): boolean => {
    const isSortable =
      items?.length && header?.sort && !useHasItemsLoader && typeof header.value === 'string'

    return !!isSortable
  }

  return (
    <div className={style.list}>
      {!hideHeader ? (
        <div className={style.head}>
          {dataList.map((header, key) => (
            <a
              key={key}
              className={getClassNamesHeader({
                header,
                isSortable: getIsSetSort(header),
                style,
                useItemSortable,
              })}
              style={{
                textAlign: header.align,
                flex: header.width ? `0 1 ${header.width}` : '',
              }}
              {...(getIsSetSort(header) ? { onClick: () => setSortable(header.value) } : null)}
            >
              {header.title}
            </a>
          ))}
          {itemPushed ? <div className={style.itemPushed} /> : null}
        </div>
      ) : null}
      {Array.isArray(items) ? (
        <div className={style.body}>
          <ScrollbarList
            maxHeight={height}
            isItems={!!items?.length}
            isPaginated={!!onPage}
            scrollHeight={scrollHeight}
            onScroll={setScroll}
          >
            {useItemsVirtualized.map((item: any, itemKey: number) => (
              <div
                tabIndex={itemKey}
                key={itemKey}
                className={classesBuilder(style, {
                  col: true,
                  markupHover: onHover && !useHasItemsLoader,
                  markupEnter: onClick && !useHasItemsLoader,
                  selected: item?.uiSelected === true,
                })}
                style={{ height: innerHeight || DEFAULT_ITEM_INNER_HEIGHT }}
                {...(onClick ? { onClick: () => onClick?.(item) } : null)}
                {...(typeof onHover === 'function' ? { onMouseEnter: () => onHover(item) } : null)}
              >
                {dataList.map((dataItem, dataItemKey) => (
                  <div
                    key={dataItemKey}
                    className={getClassNamesBody({ dataItem, style })}
                    style={{
                      textAlign: dataItem.align,
                      flex: dataItem.width ? `0 1 ${dataItem.width}` : '',
                      fontWeight: dataItem.fontWeight,
                    }}
                  >
                    <div
                      className={classesBuilder(style, {
                        itemDetail: true,
                        skeleton: useHasItemsLoader,
                      })}
                    >
                      {!useHasItemsLoader &&
                        getItemsSerialize({
                          dataItemValue: dataItem.value,
                          item,
                        })}
                    </div>
                  </div>
                ))}
                {itemPushed ? (
                  <div className={style.itemPushed}>
                    <Icon name="arrow-ios-forward-outline" />
                  </div>
                ) : null}
              </div>
            ))}
          </ScrollbarList>
          {useHasProgressLoader ? (
            <div className={style.progress}>
              <div className={style.area}>
                <ProgressLinear />
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className={style.msgEmpty}>
          <Text
            size="medium"
            icon="alert-triangle-outline"
            iconColor="warning"
            value={textToEmpty}
          />
        </div>
      )}
    </div>
  )
}

export default List
