import { ConfirmationCodeInterface } from '../auth/confirmationCode.interface'
import { OrganizationInterface } from '../organization/organization.interface'

export interface UserInterface {
  id?: number
  firstName: string
  lastName: string
  email: string
  password: string
  accessToken?: string
  refreshToken?: string
  passwordResetCode?: string | null
  active: boolean
  confirmationCodes?: ConfirmationCodeInterface[]
  organizations: OrganizationInterface[]
}
