import { IsDefined, IsString, IsNotEmpty } from 'class-validator'
import { UserInterface } from '@isomera/interfaces'

export class UserUpdate implements Partial<UserInterface> {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly firstName

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly lastName
}
