import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class Jwt2faAuthGuard extends AuthGuard('jwt-2fa') {}
