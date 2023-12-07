import { IsEmail } from 'class-validator'
import { ValidateableDto } from '../../generics/Validateable.dto'
import { ApiProperty } from '@nestjs/swagger'

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
  @ApiProperty()
  @IsEmail()
  email!: string
}
