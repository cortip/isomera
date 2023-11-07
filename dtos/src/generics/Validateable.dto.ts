import { validate as CVValidate, ValidationError } from 'class-validator'

export class ValidateableDto {
  constructor() {
    this.validate = async () => {
      return await CVValidate(this)
    }
  }

  public validate: () => Promise<ValidationError[]>
}
