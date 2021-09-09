import { ContextSetter } from '@apollo/client/link/context'

type ApolloServiceType = {
  attempts?: number
  delay?: number
  headers?: ContextSetter
  onError?: Function
  uri: string
  timeout?: number
}

export default ApolloServiceType
