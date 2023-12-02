import { Length, IsStrongPassword } from 'class-validator'
import { authConfig } from '../../../../../config/auth.config'
import { ValidateableDto } from '../../generics/Validateable.dto'

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
  @IsStrongPassword(authConfig.isStrongPasswordOptions)
  newPassword!: string

  @Length(32)
  resetToken!: string
}
