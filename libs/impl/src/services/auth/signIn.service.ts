import { AxiosResponse } from 'axios'

import { SignInWithEmailCredentialsDto } from '@isomera/dtos'

import { API_LOGIN_ROUTE } from '../../constants/apiRoutes'
import { axiosInstance } from '../../utils/axios'
import { getRoute } from '../../utils/getRoute'
import { SignInResponseInterface } from '@isomera/interfaces'

export const signInService = async (
  body: Omit<SignInWithEmailCredentialsDto, 'validate'>
) => {
  const response: AxiosResponse<SignInResponseInterface> =
    await axiosInstance.post(getRoute(API_LOGIN_ROUTE), body)

  return response?.data
}
