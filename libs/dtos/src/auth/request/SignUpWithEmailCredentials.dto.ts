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
import { ApiProperty } from '@nestjs/swagger'

export class SignUpWithEmailCredentialsDto
  extends ValidateableDto
  implements Partial<UserInterface>
{
  @ApiProperty()
  @IsString()
  firstName?: string

  @ApiProperty()
  @IsString()
  lastName?: string

  @ApiProperty()
  @IsEmail()
  email?: string

  @ApiProperty()
  @IsStrongPassword(authConfig.isStrongPasswordOptions)
  password?: string

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  @Equals(true, {
    message: 'You mut read and accept our Privacy Policy terms'
  })
  isPrivacyPolicyAccepted?: boolean
}
