import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmCodeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Code sent to email', type: () => String })
  public code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User email for validation', type: () => String })
  public email: string;
}
