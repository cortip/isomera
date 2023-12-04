import { IsNotEmpty, IsString } from 'class-validator'

export class ConfirmationCodeDto {
  @IsString()
  @IsNotEmpty()
  public code?: string

  @IsString()
  @IsNotEmpty()
  public email?: string
}
