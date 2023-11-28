import { validate as CVValidate, ValidationError } from 'class-validator'

export class ValidateableDto {
  constructor(init: any) {
    this.validate = async () => {
      return await CVValidate(this)
    }
    Object.assign(this as object, init)
  }

  public validate: () => Promise<ValidationError[]>
}
