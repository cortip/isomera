import { Injectable } from '@nestjs/common'
import { SignInWithEmailCredentialsDto } from 'dtos/src/auth/SignInWithEmailCredentials.dto'

@Injectable()
export class AppService {
  async getData(): Promise<{ message: string }> {
    const signindto = new SignInWithEmailCredentialsDto({
      email: 'lalala@lalala.com',
      password: 'd65sdDFG@!%f4sd65f4sdef'
    })

    return { message: 'Hello API' + JSON.stringify(await signindto.validate()) }
  }
}
