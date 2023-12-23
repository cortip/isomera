import { AxiosResponse } from 'axios'

import { SignInWithEmailCredentialsDto } from '@isomera/dtos'

import { API_LOGIN_ROUTE } from '../../constants'
import { axiosInstance } from '../../utils'
import { getRoute } from '../../utils'
import { LoginResponseInterface, Pure } from '@isomera/interfaces'

export const signInService = async (
  body: Pure<SignInWithEmailCredentialsDto>
) => {
  const response: AxiosResponse<LoginResponseInterface> =
    await axiosInstance.post(getRoute(API_LOGIN_ROUTE), body)

  return response?.data
}
