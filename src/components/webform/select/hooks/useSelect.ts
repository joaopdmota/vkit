import { useState, useEffect, FocusEvent } from 'react'
import { StatusEnum } from 'components/webform/builder/enums'
import { EventFieldType } from 'components/webform/builder/types'
import { toggle } from '../actions'
import useClickOnOutside from './useClickOnOutside'

import DataType from 'components/webform/select/types/data.type'

interface useSelectInterface {
  onBlur?: Function
  onChange?: Function
  onFocus?: Function
  onKeyDown?: (...item: any) => void
  onKeyPress?: (...item: any) => void
  onKeyUp?: (...item: any) => void
  status?: StatusEnum
  textHelper?: string
  value?: string | string[]
  autocomplete?: boolean
}

const useSelect = ({
  autocomplete,
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  onKeyPress,
  onKeyUp,
  status,
  textHelper,
}: useSelectInterface): {
  handles: EventFieldType
  isFocus: boolean
  onClear: Function
  setShowList: (...item: any) => void
  setStatus: Function
  setSelecteds: Function
  setTextHelper: Function
  useSelecteds: DataType[] | null
  useShowList: boolean
  useStatus?: StatusEnum
  useTextHelper?: string
  wrapperRef: { current: HTMLDivElement | null }
} => {
  const [useTextHelper, setTextHelper] = useState<string>()
  const [isFocus, setFocus] = useState<boolean>(false)
  const [useStatus, setStatus] = useState<StatusEnum>()
  const [useShowList, setShowList] = useState<boolean>(false)
  const [useSelecteds, setSelecteds] = useState<DataType[]>([])

  const { ref: wrapperRef } = useClickOnOutside(() => setShowList(false))

  const handleChangeSingle = (item: DataType, currentValue: string | string[]): void => {
    setSelecteds([item])
    onChange?.(item.value ?? currentValue, item)
    setShowList(false)
  }

  const handleChangeMultiple = (item: DataType, currentValue: string | string[]): void => {
    const newSelecteds = useSelecteds && toggle.data(item, useSelecteds)
    const valueList = Array.isArray(currentValue) ? currentValue : [currentValue]
    const newValue = toggle.dataValue(item, valueList)

    setSelecteds(newSelecteds)
    onChange?.(newValue ?? currentValue, newSelecteds)
  }

  const handleChangeAutocomplete = (item: DataType, currentValue: string | string[]): void => {
    setSelecteds([item])
    onChange?.(item.text ?? currentValue, item)
    setShowList(false)
  }

  const handles: EventFieldType = {
    onBlur: (event: FocusEvent<HTMLInputElement>): void => {
      if (autocomplete) {
        setShowList(false)
      }
      setFocus(false)
      onBlur?.(event)
    },
    onChange: (item: DataType, currentValue: string | string[], multiple: boolean): void => {
      if (autocomplete) {
        handleChangeAutocomplete(item, currentValue)
      } else if (multiple) {
        handleChangeMultiple(item, currentValue)
      } else {
        handleChangeSingle(item, currentValue)
      }
    },
    onClick: (): void => {
      if (!autocomplete) {
        setShowList(!useShowList)
      }
    },
    onFocus: (event: FocusEvent<HTMLInputElement>): void => {
      if (autocomplete) {
        setShowList(true)
      }
      setFocus(true)
      onFocus?.(event)
    },
    onKeyDown,
    onKeyPress,
    onKeyUp,
  }

  const onClear = (multiple: boolean): void => {
    setSelecteds([])
    if (multiple) {
      onChange?.([], [])
    } else {
      onChange?.('')
    }
  }

  useEffect(() => {
    setTextHelper(textHelper)
  }, [textHelper])

  useEffect(() => {
    setStatus(status)
  }, [status])

  return {
    handles,
    isFocus,
    onClear,
    setShowList,
    setStatus,
    setSelecteds,
    setTextHelper,
    useSelecteds,
    useShowList,
    useStatus,
    useTextHelper,
    wrapperRef,
  }
}

export default useSelect
