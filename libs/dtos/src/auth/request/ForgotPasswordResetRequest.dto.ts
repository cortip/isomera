import { IsEmail } from 'class-validator'
import { ValidateableDto } from '../../generics/Validateable.dto'

/**
 * @openapi
 * components:
 *   schemas:
 *     ForgotBodyDto:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *       example:
 *         email: john@doe.com
 */
export class ForgotPasswordResetRequestDto extends ValidateableDto {
  @IsEmail()
  email!: string
}
