import { ReactElement } from 'react'

import { LoaderType } from '../../shared/components/loader/types/loader.type'

declare function Loader({ ...props }: LoaderType): ReactElement | null

export default Loader
