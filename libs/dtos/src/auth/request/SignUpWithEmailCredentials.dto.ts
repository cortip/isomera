import {
  IsBoolean,
  IsEmail,
  IsString,
  IsStrongPassword,
  IsNotEmpty,
  Equals
} from 'class-validator'
import { ValidateableDto } from '../../generics/Validateable.dto'
import { authConfig } from '../../../../../config/auth.config'
import { UserInterface } from '@isomera/interfaces'

export class SignUpWithEmailCredentialsDto
  extends ValidateableDto
  implements Partial<UserInterface>
{
  @IsString()
  firstName?: string

  @IsString()
  lastName?: string

  @IsEmail()
  email?: string

  @IsStrongPassword(authConfig.isStrongPasswordOptions)
  password?: string

  @IsNotEmpty()
  @IsBoolean()
  @Equals(true, {
    message: 'You mut read and accept our Privacy Policy terms'
  })
  isPrivacyPolicyAccepted?: boolean
}
