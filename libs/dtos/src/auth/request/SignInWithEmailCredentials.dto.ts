import { IsEmail, IsStrongPassword } from 'class-validator'
import { ValidateableDto } from '../../generics/Validateable.dto'
import { authConfig } from '../../../../../config/auth.config'
import { UserInterface } from '@isomera/interfaces'
import { ApiProperty } from '@nestjs/swagger'

export class SignInWithEmailCredentialsDto
  extends ValidateableDto
  implements Partial<UserInterface>
{
  @ApiProperty()
  @IsEmail()
  email?: string

  @ApiProperty()
  @IsStrongPassword(authConfig.isStrongPasswordOptions)
  password?: string
}
