declare type apolloServiceType = {
  config({}: any): {
    initClient: () => Promise<void>
    resetApollo: ({}: unknown) => Promise<void>
  }
  client: any
}
declare const apolloService: apolloServiceType

export default apolloService
