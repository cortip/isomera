import { ValidateableDto } from '../../generics/Validateable.dto'
import { ApiProperty } from '@nestjs/swagger'

export class TurnOn2FADto extends ValidateableDto {
  @ApiProperty()
  code!: string
}
