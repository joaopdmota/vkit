import React from 'react'
import ReactDOM from 'react-dom'

import StructurePage from 'modules/structure/page'
// import BreadcrumbExample from 'shared/components/breadcrumb/breadcrumb.example'
// import ChipExample from 'shared/components/chip/chip.example'
// import ButtonExample from 'shared/components/button/button.example'
// import DialogExample from 'components/dialog/dialog.example'
// import ToastExample from 'components/toast/toast.example'
// import ImageExample from 'shared/components/image/image.example'
// import TextExample from 'shared/components/text/text.example'
// import BoxExample from 'shared/components/context/box/box.example'
// import ListExample from 'shared/components/list/list.example'
// import FloatLayerExample from 'shared/components/floatLayer/floatLayer.example'
// import AccordionExample from 'components/accordion/accordion.example'
// import TabsExample from 'shared/components/tabs/tabs.example'
// import TextFieldExample from 'components/webform/textField/textField.example'
// import SliderExample from 'context/slider/slider.example'
import SelectExample from 'components/webform/select/select.example'

ReactDOM.render(
  <React.StrictMode>
    <StructurePage>
      <SelectExample />
    </StructurePage>
  </React.StrictMode>,
  document.getElementById('root'),
)
