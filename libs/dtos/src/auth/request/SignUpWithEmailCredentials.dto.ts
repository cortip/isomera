import { IsEmail, IsString, IsStrongPassword } from 'class-validator'
import { ValidateableDto } from '../../generics/Validateable.dto'
import { authConfig } from '../../../../../config/auth.config'
import { UserInterface } from '@isomera/interfaces'

export class SignUpWithEmailCredentialsDto
  extends ValidateableDto
  implements Partial<UserInterface>
{
  @IsString()
  name?: string

  @IsEmail()
  email?: string

  @IsStrongPassword(authConfig.isStrongPasswordOptions)
  password?: string
}
