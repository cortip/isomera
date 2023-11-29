import { Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { UserEntity } from '../entities/user.entity'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(
    user: UserEntity,
    done: (err: Error | null, id?: UserEntity) => void
  ): void {
    done(null, user)
  }

  deserializeUser(
    payload: unknown,
    done: (err: Error | null, payload?: unknown) => void
  ): void {
    done(null, payload)
  }
}
