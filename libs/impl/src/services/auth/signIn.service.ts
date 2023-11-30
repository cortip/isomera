import { AxiosResponse } from 'axios'

import { SignInWithEmailCredentialsDto } from '@isomera/dtos'

import { API_LOGIN_ROUTE } from '../../constants'
import { axiosInstance } from '../../utils'
import { getRoute } from '../../utils'
import { Pure, SignInResponseInterface } from '@isomera/interfaces'

export const signInService = async (
  body: Pure<SignInWithEmailCredentialsDto>
) => {
  const response: AxiosResponse<SignInResponseInterface> =
    await axiosInstance.post(getRoute(API_LOGIN_ROUTE), body)

  return response?.data
}
