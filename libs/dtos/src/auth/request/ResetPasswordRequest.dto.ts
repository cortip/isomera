import { Length, IsStrongPassword } from 'class-validator'
import { authConfig } from '../../../../../config/auth.config'
import { ValidateableDto } from '../../generics/Validateable.dto'
import { ApiProperty } from '@nestjs/swagger'

/**
 * @openapi
 * components:
 *   schemas:
 *     ResetBodyDto:
 *       type: object
 *       required:
 *         - newPassword
 *         - resetToken
 *       properties:
 *         newPassword:
 *           type: string
 *         resetToken:
 *           type: string
 */
export class ResetPasswordRequestDto extends ValidateableDto {
  @ApiProperty()
  @IsStrongPassword(authConfig.isStrongPasswordOptions)
  newPassword!: string

  @ApiProperty()
  @Length(7)
  passwordResetCode!: string
}
