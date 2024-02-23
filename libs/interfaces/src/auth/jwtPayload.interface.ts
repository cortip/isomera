export interface JwtPayload {
  sub: string
  iat: number
  exp: number
}

export interface LoginWithEmailPayload {
  email: string
}

export interface LoginWith2FAPayload {
  email: string
  isTwoFactorAuthenticated: boolean
  isTwoFactorAuthenticationEnabled: boolean
}
