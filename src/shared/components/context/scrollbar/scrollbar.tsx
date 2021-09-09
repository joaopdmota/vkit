import getIsUserAgent from 'shared/utils/getIsUserAgent'

import ScrollbarWeb from './platform/web'
import ScrollbarMobile from './platform/mobile'

const Scrollbar = getIsUserAgent('mobile') ? ScrollbarMobile : ScrollbarWeb

export default Scrollbar
