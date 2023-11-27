import { Injectable } from '@nestjs/common'
import { SignInWithEmailCredentialsDto } from '@isomera/dtos'
import { DataSource } from 'typeorm'
import { UserEntity } from '../entities/user.entity'

@Injectable()
export class AppService {
  constructor(private readonly dataSource: DataSource) {}
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
    const userRepository = this.dataSource.getRepository(UserEntity)
    console.log({ metadata: userRepository.metadata.tableName })

    const users = await userRepository.find()

    return { message: 'Hello API', users: users.map(u => u.email) }
  }
}
