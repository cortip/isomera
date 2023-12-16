import { StatusType } from '../generic/Status.type'

export interface RefreshTokenResponseInterface {
  access_token: string,
  status: StatusType
}
