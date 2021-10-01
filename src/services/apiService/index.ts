import { ApiServiceType, RequestType } from '../../shared/services/apiService/types/apiService.type'

declare type apiServiceType = {
  config({}: ApiServiceType): void
  request({}: RequestType): Promise<any>
}
declare const apiService: apiServiceType

export default apiService
