import { Injectable } from '@nestjs/common'
import { SignInWithEmailCredentialsDto } from '@isomera/dtos'

@Injectable()
export class AppService {
  async getData(): Promise<{ message: string }> {
    const signindto = new SignInWithEmailCredentialsDto({
      email: 'lalala@lalala.com',
      password: 'd65sdDFG@!%f4sd65f4sdef'
    })
    console.log(JSON.stringify(await signindto.validate()))

    return { message: 'Hello API' }
  }
}
