import { AxiosResponse } from 'axios'

import { API_FORGOT_PASSWORD_REQUEST_RESET_ROUTE } from '../../constants'
import { axiosInstance } from '../../utils'
import { getRoute } from '../../utils'
import { PasswordResetRequestInterface, Pure } from '@isomera/interfaces'
import { ForgotPasswordResetRequestDto } from '@isomera/dtos'

export const passwordResetRequestService = async (
  body: Pure<ForgotPasswordResetRequestDto>
) => {
  const response: AxiosResponse<PasswordResetRequestInterface> =
    await axiosInstance.post(
      getRoute(API_FORGOT_PASSWORD_REQUEST_RESET_ROUTE),
      body
    )

  return response?.data
}
