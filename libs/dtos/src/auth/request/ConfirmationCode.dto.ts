import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ConfirmationCodeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public code?: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public email?: string
}
