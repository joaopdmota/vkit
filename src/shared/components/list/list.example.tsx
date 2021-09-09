/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from 'react'

import gql from 'graphql-tag'

import { apolloService, apiService } from 'services'
import { ActionsLayer, Icon, List } from 'components'
import { Box, Row } from 'context'

// Exemplo aplicado no carregamento do App
apiService.config({
  uri: 'https://jsonplaceholder.typicode.com',
})
const { initClient } = apolloService.config({
  uri: 'https://48p1r2roz4.sse.codesandbox.io/',
})

const ListExample: React.FC = () => {
  const [useDataItemsPosts, setDataItemsPosts] = useState<Array<any> | null>([])
  const [useDataItemsComments, setDataItemsComments] = useState<Array<any> | null>([])
  const [useDataItemsPhotos, setDataItemsPhotos] = useState<Array<any> | null>([])
  const [useDataItemsUsers, setDataItemsUsers] = useState<Array<any> | null>([])
  const [useDataItemsClient, setDataItemsClient] = useState<Array<any> | null>([])

  const [usePaginatedComments, setPaginatedComments] = useState(1)

  const requestPosts = useCallback(async (params?: object): Promise<void> => {
    const data = await apiService.request({ router: '/posts', params })
    const items = Array.isArray(data) ? data : []

    setDataItemsPosts((prevState) => {
      if (items.length || prevState?.length) {
        return [...(prevState as Array<any>), ...items]
      }
      return null
    })
  }, [])

  const requestComments = useCallback(async (): Promise<void> => {
    const data = await apiService.request({
      router: `/posts/${usePaginatedComments}/comments`,
    })
    const items = Array.isArray(data) ? data : []

    setDataItemsComments((prevState) => {
      if (items.length || prevState?.length) {
        return [...(prevState as Array<any>), ...items]
      }
      return null
    })
  }, [usePaginatedComments])

  const requestPhotos = useCallback(async (): Promise<void> => {
    const data = await apiService.request({ router: '/photos' })
    const items = Array.isArray(data) ? data : []

    setDataItemsPhotos((prevState) => {
      if (items.length || prevState?.length) {
        return [...(prevState as Array<any>), ...items]
      }
      return null
    })
  }, [])

  const requestUsers = useCallback(async (): Promise<void> => {
    const data = await apiService.request({ router: '/users' })
    const items = Array.isArray(data) ? data : []

    setDataItemsUsers((prevState) => {
      if (items.length || prevState?.length) {
        return [...(prevState as Array<any>), ...items]
      }
      return null
    })
  }, [])

  const requestClient = useCallback(async (): Promise<void> => {
    try {
      await initClient()
      const { data } = await apolloService.client.query({
        query: gql`
          query GetRates($currency: String!) {
            rates(currency: $currency) {
              name
              currency
              rate
            }
          }
        `,
        variables: {
          currency: 'ALL',
        },
      })
      if (data?.rates) {
        setDataItemsClient((prevState) => [...(prevState as Array<any>), ...data.rates])
      } else {
        setDataItemsClient(null)
      }
    } catch (_) {
      setDataItemsClient(null)
    }
  }, [])

  useEffect(() => {
    requestPosts()
    requestPhotos()
    requestUsers()
    requestClient()
  }, [requestClient, requestPhotos, requestPosts, requestUsers])

  useEffect(() => {
    requestComments()
  }, [requestComments])

  return (
    <>
      <Row>
        <h1>Example, List</h1>
      </Row>
      <Row>
        <div style={{ padding: '15px 5px' }}>
          <h3>Api - Carregando...</h3>
        </div>
        <Box outlined rounded>
          <List
            size={3}
            data={[]}
            innerHeight={40}
            dataList={[
              {
                title: 'ID',
                value: 'id',
                width: '70px',
                sort: true,
              },
              {
                title: 'Título',
                value: 'title',
                darken: true,
                sort: true,
              },
              {
                title: 'Descrição',
                value: 'body',
              },
              {
                width: '32px',
                value: '',
              },
            ]}
          />
        </Box>
      </Row>
      <Row>
        <div style={{ padding: '15px 5px' }}>
          <h3>Api - Posts - {useDataItemsPosts?.length ?? 'nenhum encontrado'}</h3>
        </div>
        <Box type="sheet" elevation={4} outlined rounded>
          <List
            size={4}
            data={useDataItemsPosts}
            innerHeight={50}
            onHover
            onClick={(item: any) => console.log(item)}
            itemPushed
            dataList={[
              {
                title: 'ID',
                value: 'id',
                width: '70px',
                sort: true,
              },
              {
                title: 'Título',
                value: 'title',
                darken: true,
                sort: true,
              },
              {
                title: 'Descrição',
                value: 'body',
              },
              {
                width: '32px',
                value: (
                  <ActionsLayer
                    position="left"
                    align="center"
                    vertical
                    actions={[
                      {
                        label: 'Adicionar',
                        onClick: () => console.log('Adicionar'),
                        icon: 'plus-outline',
                      },
                      {
                        label: 'Editar',
                        onClick: () => console.log('Editar'),
                        icon: 'edit-outline',
                      },
                      {
                        label: 'Visualizar',
                        onClick: () => console.log('Visualizar'),
                        icon: 'eye-outline',
                      },
                      {
                        label: 'Arquivar',
                        onClick: () => console.log('Arquivar'),
                        icon: 'archive-outline',
                      },
                      {
                        label: 'Ver mais detalhes',
                        onClick: () => console.log('Ver mais detalhes'),
                        icon: 'more-horizontal-outline',
                      },
                      {
                        label: 'Remover',
                        onClick: () => console.log('Remover'),
                        icon: 'trash-outline',
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
        </Box>
      </Row>
      <Row>
        <div style={{ padding: '15px 5px' }}>
          <h3>Api - Comments - {useDataItemsComments?.length ?? 'nenhum encontrado'}</h3>
        </div>
        <Box type="sheet" elevation={4} outlined rounded>
          <List
            size={2}
            data={useDataItemsComments}
            onPage={setPaginatedComments}
            innerHeight={50}
            dataList={[
              {
                title: 'ID',
                value: 'id',
                width: '60px',
                sort: true,
              },
              {
                title: 'Nome',
                value: 'name',
                darken: true,
                fontWeight: 'bold',
                sort: true,
              },
              {
                title: 'E-mail',
                value: 'email',
                darken: true,
              },
              {
                title: 'Descrição',
                value: 'body',
              },
              {
                width: '32px',
                value: (
                  <ActionsLayer
                    vertical
                    actions={[
                      {
                        label: 'Adicionar',
                        onClick: () => console.log('Adicionar'),
                        icon: 'plus-outline',
                      },
                      {
                        label: 'Editar',
                        onClick: () => console.log('Editar'),
                        icon: 'edit-outline',
                      },
                      {
                        label: 'Visualizar',
                        onClick: () => console.log('Visualizar'),
                        icon: 'eye-outline',
                      },
                      {
                        label: 'Arquivar',
                        onClick: () => console.log('Arquivar'),
                        icon: 'archive-outline',
                      },
                      {
                        label: 'Ver mais detalhes',
                        onClick: () => console.log('Ver mais detalhes'),
                        icon: 'more-horizontal-outline',
                      },
                      {
                        label: 'Remover',
                        onClick: () => console.log('Remover'),
                        icon: 'trash-outline',
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
        </Box>
      </Row>
      <Row>
        <div style={{ padding: '15px 5px' }}>
          <h3>Api - Photos - {useDataItemsPhotos?.length ?? 'nenhum encontrado'}</h3>
        </div>
        <Box type="sheet" elevation={4} outlined rounded>
          <List
            size={4}
            data={useDataItemsPhotos}
            innerHeight={50}
            dataList={[
              {
                // eslint-disable-next-line react/display-name
                value: (item: any) => (
                  <img
                    src={item.thumbnailUrl}
                    style={{
                      width: '35px',
                      height: '35px',
                      borderRadius: '50%',
                    }}
                  />
                ),
                width: '50px',
              },
              {
                title: 'Título',
                value: 'title',
                darken: true,
                sort: true,
              },
              {
                title: 'Ações',
                width: '32px',
                value: (
                  <ActionsLayer
                    actions={[
                      {
                        label: 'Adicionar',
                        onClick: () => console.log('Adicionar'),
                        icon: 'plus-outline',
                      },
                      {
                        label: 'Editar',
                        onClick: () => console.log('Editar'),
                        icon: 'edit-outline',
                      },
                      {
                        label: 'Visualizar',
                        onClick: () => console.log('Visualizar'),
                        icon: 'eye-outline',
                      },
                      {
                        label: 'Arquivar',
                        onClick: () => console.log('Arquivar'),
                        icon: 'archive-outline',
                      },
                      {
                        label: 'Ver mais detalhes',
                        onClick: () => console.log('Ver mais detalhes'),
                        icon: 'more-horizontal-outline',
                      },
                      {
                        label: 'Remover',
                        onClick: () => console.log('Remover'),
                        icon: 'trash-outline',
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
        </Box>
      </Row>
      <Row>
        <div style={{ padding: '15px 5px' }}>
          <h3>Api - Users - {useDataItemsUsers?.length ?? 'nenhum encontrado'}</h3>
        </div>
        <Box type="sheet" elevation={4} outlined rounded>
          <List
            size={10}
            data={useDataItemsUsers}
            innerHeight={50}
            dataList={[
              {
                title: 'Profile',
                value: (item: any) => {
                  const el = (
                    <>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: '12px',
                        }}
                      >
                        <img
                          src={`https://randomuser.me/api/portraits/women/${item.id}.jpg`}
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            marginRight: '8px',
                          }}
                        />

                        <p
                          style={{
                            fontSize: '10px',
                          }}
                        >
                          <span
                            style={{
                              color: 'var(--vkit-color-default-2)',
                              display: 'block',
                            }}
                          >
                            {item.name}
                          </span>
                        </p>
                      </div>
                    </>
                  )
                  return el
                },
                sort: true,
              },
              {
                title: 'E-Mail',
                value: (item: any) => item.email.toLowerCase(),
                darken: true,
              },
              {
                title: 'Endereço',
                value: (item: any) => item.address.street,
              },
              {
                title: 'Complemento',
                value: (item: any) => item.address.suite,
              },
              {
                title: 'Cidade',
                value: (item: any) => item.address.city,
              },
              {
                title: 'Telefone',
                value: (item: any) => item.address.zipcode,
              },
              {
                width: '22px',
                value: (
                  <a
                    style={{
                      width: '22px',
                      height: '21px',
                      cursor: 'pointer',
                    }}
                    onClick={(e) => {
                      const elIcon = (e.target as HTMLElement).parentElement

                      if (!elIcon?.getAttribute('fill')) {
                        elIcon?.setAttribute('fill', '#ff413a')
                      } else {
                        elIcon.removeAttribute('fill')
                      }
                    }}
                  >
                    <Icon name="heart-outline" />
                  </a>
                ),
              },
            ]}
          />
        </Box>
      </Row>
      <Row>
        <div style={{ padding: '15px 5px' }}>
          <h3>GraphQL - {useDataItemsClient?.length ?? 'nenhum encontrado'}</h3>
        </div>
        <Box type="sheet" elevation={4} outlined rounded>
          <List
            size={4}
            data={useDataItemsClient}
            dataList={[
              {
                title: 'Moeda',
                value: 'currency',
                width: '100px',
                sort: true,
              },
              {
                title: 'Nome',
                value: 'name',
                darken: true,
              },
              {
                title: 'Avaliação',
                value: 'rate',
              },
              {
                width: '32px',
                value: (
                  <ActionsLayer
                    actions={[
                      {
                        label: 'Adicionar',
                        onClick: () => console.log('Adicionar'),
                        icon: 'plus-outline',
                      },
                      {
                        label: 'Editar',
                        onClick: () => console.log('Editar'),
                        icon: 'edit-outline',
                      },
                      {
                        label: 'Visualizar',
                        onClick: () => console.log('Visualizar'),
                        icon: 'eye-outline',
                      },
                      {
                        label: 'Arquivar',
                        onClick: () => console.log('Arquivar'),
                        icon: 'archive-outline',
                      },
                      {
                        label: 'Ver mais detalhes',
                        onClick: () => console.log('Ver mais detalhes'),
                        icon: 'more-horizontal-outline',
                      },
                      {
                        label: 'Remover',
                        onClick: () => console.log('Remover'),
                        icon: 'trash-outline',
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
        </Box>
      </Row>
    </>
  )
}

export default ListExample
