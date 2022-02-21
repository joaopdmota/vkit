import React, { useEffect, useCallback } from 'react'

import { Row } from 'context'
import { Loader } from 'components'
import Field from 'components/webform/select/container/field'
import { ListMultiple, ListSingle } from 'components/webform/select/container/list'
import IconSelect from 'components/webform/select/container/iconSelect'

import SelectType from 'components/webform/select/types/select.type'

import { WrapField } from 'components/webform/builder/container/field'

import { classesBuilder } from 'shared/utils'

import useSelect from 'components/webform/select/hooks/useSelect'
import useList from 'components/webform/select/hooks/useList'

import style from 'theme/components/webform/select/select.module.scss'

const Select: React.FC<SelectType> = ({
  autocomplete,
  autoRequest,
  clearable,
  data,
  disabled,
  searchable,
  icon,
  label,
  large,
  loading,
  medium,
  multiple,
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  onKeyPress,
  onKeyUp,
  placeholder,
  requestHeaders,
  requestPageParam,
  requestParams,
  requestResponseRootPath,
  requestResponseText,
  requestResponseValue,
  requestRouter,
  requestSearchParam,
  requestUri,
  required,
  requiredSign,
  shadow,
  small,
  showTabSelecteds,
  status,
  textHelper,
  textHelperTop,
  value,
}) => {
  const listItemHeight = 40

  const {
    handles,
    onClear,
    isFocus,
    setStatus,
    setTextHelper,
    useSelecteds,
    useShowList,
    useStatus,
    useTextHelper,
    wrapperRef,
    setSelecteds
  } = useSelect({
    autocomplete,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    status,
    textHelper,
    value
  })

  const {
    getElement,
    isChecked,
    isFinished,
    isRequestable,
    onSearch,
    onSearchSelecteds,
    setListIndex,
    setPage,
    setTerm,
    setTermSelecteds,
    useContentList,
    useContentListSelecteds,
    useListIndex,
    useSize,
    useTerm,
    useTermSelecteds,
  } = useList({
    autoRequest,
    data,
    listItemHeight,
    requestHeaders,
    requestPageParam,
    requestParams,
    requestResponseRootPath,
    requestResponseText,
    requestResponseValue,
    requestRouter,
    requestSearchParam,
    requestUri,
    value,
    useSelecteds,
    setSelecteds
  })

  const classNames = {
    [useStatus as string]: useStatus,
    clearable: clearable && (Array.isArray(value) ? value.length : value),
    disabled,
    focus: isFocus,
    icon,
    large,
    medium,
    shadow,
    small,
    status: useStatus,
    select: true,
    textHelperTop,
  }

  const fieldAttributes = {
    ...(autocomplete && {
      value: useTerm,
      onChange,
    }),
    autocomplete,
    clearable,
    contentRight: loading ? (
      <Row
        style={{
          marginRight: 12,
          padding: 0,
          alignSelf: 'center',
        }}
      >
        <Loader color="default" />
      </Row>
    ) : (
      <IconSelect onClick={handles.onClick} autocomplete={autocomplete} open={useShowList} />
    ),
    disabled,
    loading,
    icon,
    onBlur: handles.onBlur,
    onClear: () => {
      onSearch?.('')
      onClear(multiple && !autocomplete)
    },
    onFocus: handles.onFocus,
    onClick: handles.onClick,
    onSearch,
    placeholder,
    required,
    selected: useSelecteds,
    setStatus,
    setTextHelper,
    status: useStatus,
    statusOrigin: status,
    textHelper,
  }

  const listAttributes = {
    getElement,
    isChecked,
    isFinished,
    isRequestable,
    label,
    listItemHeight,
    onClick: (item: any) => {
      if (!multiple || autocomplete) {
        setTerm?.(null)
        setTermSelecteds?.(null)
      }
      handles.onChange?.(item, value, multiple)
    },
    onSearch,
    onSearchSelecteds,
    searchable: !autocomplete && searchable,
    setListIndex,
    setPage,
    show: autocomplete
      ? (useTerm || '').length >= 2 && useShowList && !!useContentList?.length
      : useShowList,
    showTabSelecteds,
    useContentList,
    useContentListSelecteds,
    useListIndex,
    useSelecteds,
    useSize,
    useTerm,
    useTermSelecteds,
  }

  const setValueSingle = useCallback(
    (newValue: string) => {
      const canAdd = useSelecteds?.every((item) => item.value !== newValue)
      if (canAdd) {
        const selected = (data || []).find((item) => item.value === newValue)

        if (selected) {
          handles.onChange?.(selected, newValue, multiple)
        } else {
          onClear(multiple)
        }
      }
    },
    [handles, data, useSelecteds, multiple, onClear],
  )

  useEffect(() => {
    if (value) {
      if (!Array.isArray(value)) {
        setValueSingle(value)
      }
    } else if (useSelecteds?.length) {
      onClear(multiple && !autocomplete)
    }
  }, [value, autocomplete, multiple, onClear, setValueSingle, useSelecteds?.length])

  return (
    <WrapField
      className={classesBuilder(style, classNames)}
      label={label}
      required={required}
      requiredSign={requiredSign}
      textHelper={useTextHelper}
      textHelperTop={textHelperTop}
      style={style}
      body={<Field {...fieldAttributes} />}
      wrapperRef={wrapperRef}
      footer={
        multiple && !autocomplete ? (
          <ListMultiple {...listAttributes} />
        ) : (
          <ListSingle {...listAttributes} />
        )
      }
    />
  )
}

export default Select
