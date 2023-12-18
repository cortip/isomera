import { UserInterface } from '../user/User.interface'

export interface LoginResponseInterface extends UserInterface {
  access_token: string
  refresh_token: string
}
