import { StatusType } from '../generic/Status.type'
import { SignTokenInterface } from './signToken.interface'

export interface TurnOff2FAResponseInterface extends SignTokenInterface {
  status: StatusType
}
