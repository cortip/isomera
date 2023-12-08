import { UserInterface } from '../user/User.interface'

export interface ConfirmationCodeInterface {
  id?: number

  code: string

  createdAt: Date

  expiresIn: Date

  user: UserInterface
}
