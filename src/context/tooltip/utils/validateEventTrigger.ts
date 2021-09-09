import getIsUserAgent from 'shared/utils/getIsUserAgent'

export default function isEventTriggerValid(eventType: string): boolean {
  const webEvents = ['mouseenter', 'mouseleave']
  const mobileEvents = ['click', 'blur']
  const isMobile = getIsUserAgent('mobile')

  return (
    (!isMobile && webEvents.includes(eventType)) ||
    (isMobile && mobileEvents.includes(eventType)) ||
    false
  )
}
