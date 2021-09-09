import { ApolloClient, ApolloLink, HttpLink } from '@apollo/client'
import { onError as onLinkError } from '@apollo/client/link/error'
import { RetryLink } from '@apollo/client/link/retry'
import { setContext } from '@apollo/client/link/context'
import { InMemoryCache } from '@apollo/client/cache'
import ApolloLinkTimeout from 'apollo-link-timeout'

import ApolloServiceType from './types/apolloService.type'

const options: ApolloServiceType = {
  attempts: 3,
  delay: 200,
  headers: ({}) => {},
  onError: () => {},
  uri: '',
  timeout: 10000,
}
const apolloService = {
  ...options,
  client: {},
  config(options: ApolloServiceType): {
    initClient: Function
    resetApollo: Function
  } {
    Object.assign(this, options)

    const resetApollo = async (instanceClient: ApolloClient<unknown>): Promise<void> => {
      try {
        await instanceClient.resetStore()
      } catch (err) {
        throw new Error(err)
      }
    }

    const initClient = async (): Promise<void> => {
      const { attempts, delay, headers, onError, uri, timeout } = this

      const retryLink = new RetryLink({
        delay: {
          initial: delay,
          max: (delay as number) * 1000,
          jitter: true,
        },
        attempts: {
          max: attempts,
          retryIf: (error) => onError?.({ error }),
        },
      })

      const errorLink = onLinkError(({ graphQLErrors, networkError, operation }) =>
        onError?.({
          graphQLErrors,
          networkError,
          operation,
        }),
      )

      const getLink = async (): Promise<ApolloLink> => {
        const timeoutLink = new ApolloLinkTimeout(timeout as number)
        const httpLink = new HttpLink({ uri })

        return ApolloLink.from([
          setContext(() => ({
            headers: {
              ...headers,
            },
          })),
          retryLink,
          errorLink,
          timeoutLink,
          httpLink,
        ])
      }

      const cache = new InMemoryCache()
      const link = await getLink()
      const instance = new ApolloClient({ ssrMode: true, link, cache })
      this.client = instance
    }

    return { initClient, resetApollo }
  },
}

export default apolloService
