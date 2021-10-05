declare type apolloServiceType = {
  config({}: any): {
    initClient: () => Promise<void>
    resetApollo: ({}: any) => Promise<void>
  }
  client: any
}
declare const apolloService: apolloServiceType

export default apolloService
