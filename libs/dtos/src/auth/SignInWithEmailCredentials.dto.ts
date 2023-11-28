import { IsEmail, IsStrongPassword } from 'class-validator'
import { ValidateableDto } from '../generics/Validateable.dto'
import { authConfig } from '../../../../config/auth.config'
import { UserInterface } from '@isomera/interfaces'

export class SignInWithEmailCredentialsDto
  extends ValidateableDto
  implements Partial<UserInterface>
{
  @IsEmail()
  email?: string

  @IsStrongPassword(authConfig.isStrongPasswordOptions)
  password?: string
}
