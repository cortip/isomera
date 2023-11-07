import { IsStrongPasswordOptions } from 'class-validator/types/decorator/string/IsStrongPassword'

interface AuthConfigInterface {
  isStrongPasswordOptions: IsStrongPasswordOptions
}

export const authConfig: AuthConfigInterface = {
  isStrongPasswordOptions: {
    minLength: 5
  }
}
