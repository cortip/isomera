import { API_FORGOT_PASSWORD_PERFORM_RESET_ROUTE } from '../../constants'
import { axiosInstance } from '../../utils'
import { getRoute } from '../../utils'
import { PasswordResetPerformInterface, Pure } from '@isomera/interfaces'
import { ResetPasswordRequestDto } from '@isomera/dtos'
import { AxiosResponse } from 'axios'

export const passwordResetPerformService = async (
  body: Pure<ResetPasswordRequestDto>
) => {
  const response: AxiosResponse<PasswordResetPerformInterface> =
    await axiosInstance.post(
      getRoute(API_FORGOT_PASSWORD_PERFORM_RESET_ROUTE),
      body
    )

  return response?.data
}
