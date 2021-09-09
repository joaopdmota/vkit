import getIsUserAgent from 'shared/utils/getIsUserAgent'

import Popover from 'shared/components/popover'
import ActionSheet from 'shared/components/actionSheet'

const ActionsLayer = getIsUserAgent('mobile') ? ActionSheet : Popover

export default ActionsLayer
