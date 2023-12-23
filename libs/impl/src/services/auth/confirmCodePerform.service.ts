import { API_CONFIRM_CODE_AFTER_REGISTER } from '../../constants'
import { axiosInstance } from '../../utils'
import { getRoute } from '../../utils'
import { ConfirmCodeResponseInterface, Pure } from '@isomera/interfaces'
import { ConfirmationCodeDto } from '@isomera/dtos'
import { AxiosResponse } from 'axios'

export const confirmCodePerformService = async (
  body: Pure<ConfirmationCodeDto>
) => {
  const response: AxiosResponse<ConfirmCodeResponseInterface> =
    await axiosInstance.post(getRoute(API_CONFIRM_CODE_AFTER_REGISTER), body)

  return response?.data
}
