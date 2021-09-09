import React from 'react'

import Row from 'shared/components/context/row'

import Breadcrumb from './'

const BreadcrumbExample: React.FC = () => (
  <Row>
    <Breadcrumb
      historys={[
        { name: 'Página principal' },
        { name: 'Empresas' },
        { name: 'Stone Pagamentos' },
        { name: 'Contrato 123456' },
      ]}
    />
  </Row>
)

export default BreadcrumbExample
