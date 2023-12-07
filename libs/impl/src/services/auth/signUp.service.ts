import { AxiosResponse } from 'axios'

import { SignUpWithEmailCredentialsDto } from '@isomera/dtos'

import { API_REGISTER_ROUTE } from '../../constants'
import { axiosInstance } from '../../utils'
import { getRoute } from '../../utils'
import { Pure, SignUpResponseInterface } from '@isomera/interfaces'

export const signUpService = async (
  body: Pure<SignUpWithEmailCredentialsDto>
) => {
  const response: AxiosResponse<SignUpResponseInterface> =
    await axiosInstance.post(getRoute(API_REGISTER_ROUTE), body)

  return response?.data
}
