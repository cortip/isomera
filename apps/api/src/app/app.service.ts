import { Injectable } from '@nestjs/common'
import { SignInWithEmailCredentialsDto } from '@isomera/dtos'
import { User } from '../entities/User.entity'
import DataSource from '../config/typeorm.datasource'

@Injectable()
export class AppService {
  async getData(): Promise<{ message: string; users: string[] }> {
    const signindto = new SignInWithEmailCredentialsDto({
      email: 'lalala@lalala.com',
      password: 'd65sdDFG@!%f4sd65f4sdef'
    })
    console.log(JSON.stringify(await signindto.validate()))

    /**
     * This is temporary dummy select for development, to make it
     * a bit easier to orientate. Will be removed when we get
     * to features implementation.
     */
    const userRepository = DataSource.getRepository(User)
    const users = await userRepository.find()

    return { message: 'Hello API', users: users.map(u => u.email) }
  }
}
