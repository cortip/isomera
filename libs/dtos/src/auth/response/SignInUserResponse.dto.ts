import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { UserInterface } from '@isomera/interfaces'

/**
 * @openapi
 * components:
 *   schemas:
 *     UserResponseDto:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *       example:
 *         id: 123
 *         email: john@doe.com
 *         password: password
 *         firstName: John
 *         lastName: Doe
 */
export class UserResponseDto {
  @IsString()
  id?: number

  @IsString()
  @IsEmail(undefined)
  @IsNotEmpty()
  email!: string

  @IsNotEmpty()
  @IsString()
  firstName!: string

  @IsNotEmpty()
  @IsString()
  lastName!: string

  static map({
    email,
    firstName,
    lastName,
    id
  }: UserInterface): UserResponseDto {
    return {
      email,
      firstName,
      lastName,
      id
    }
  }
}
