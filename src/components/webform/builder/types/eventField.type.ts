import EventKeyType from './eventKey.type'

type EventField = EventKeyType & {
  onBlur?: (...item: any) => void
  onChange?: (...item: any) => void
  onClick?: (...item: any) => void
  onFocus?: (...item: any) => void
}

export default EventField
