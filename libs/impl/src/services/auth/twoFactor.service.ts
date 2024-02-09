import { UserInterface } from '@isomera/interfaces'
import {
  API_AUTH_2FA_RECOVER,
  API_AUTH_2FA_STEP_1,
  API_AUTH_2FA_STEP_2,
  API_AUTH_2FA_STEP_3
} from '../../constants'
import { axiosInstance } from '../../utils'

export interface SuccessResponse {
  status: string
}

export interface GenerateQRResponse extends SuccessResponse {
  image: string
}
export interface TurnOn2FAResponse extends SuccessResponse, UserInterface {
  secret: string
  access_token: string
  refresh_token: string
}

export interface Auth2FAResponse extends UserInterface {
  access_token: string
  refresh_token: string
}

export interface Recover2FAResponse {
  status: string
}

export interface Verify2FAData {
  code: string
}

export interface Recover2FAData extends Verify2FAData {
  email: string
}

export const turnOn2FAServiceStep1 = async (): Promise<GenerateQRResponse> => {
  const response = await axiosInstance.post(API_AUTH_2FA_STEP_1)
  return response.data
}

export const turnOn2FAStep2Service = async (
  data: Verify2FAData
): Promise<TurnOn2FAResponse> => {
  const response = await axiosInstance.post(API_AUTH_2FA_STEP_2, data)

  return response.data
}

export const auth2FAService = async (
  data: Verify2FAData
): Promise<Auth2FAResponse> => {
  const response = await axiosInstance.post(API_AUTH_2FA_STEP_3, data)

  return response.data
}

export const auth2FARecoveryService = async (
  data: Verify2FAData
): Promise<Auth2FAResponse> => {
  const response = await axiosInstance.post(API_AUTH_2FA_RECOVER, data)

  return response.data
}
