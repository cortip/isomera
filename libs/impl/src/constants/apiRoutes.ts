/*
    Dynamic routes should be defined in the following format:
    /path/{dynamicRoutePath} and used with the getRoute function
    in the utils folder.
*/

// Authentication

export const API_LOGIN_ROUTE = '/auth/login'
export const API_CONFIRM_CODE_AFTER_REGISTER = '/auth/code'
export const API_FORGOT_PASSWORD_REQUEST_RESET_ROUTE =
  '/auth/request-password-reset'
export const API_FORGOT_PASSWORD_PERFORM_RESET_ROUTE =
  '/auth/request-password-reset/confirm'
export const API_REGISTER_ROUTE = '/auth/register'
export const API_CONFIRM_ROUTE = '/auth/confirm'
export const API_LOGOUT_ROUTE = '/auth/logout'
export const API_REFRESH_ROUTE = '/auth/refresh'
export const API_VERIFY_DOCS_ROUTE = '/auth/documents'
export const API_FORGOT_ROUTE = '/auth/forgot'
export const API_RESET_ROUTE = '/auth/reset'
export const API_AUTH_2FA_STEP_1 = 'auth/2fa/generate'
export const API_AUTH_2FA_STEP_2 = 'auth/2fa/turn-on'
export const API_AUTH_2FA_STEP_3 = 'auth/2fa/authenticate'
export const API_AUTH_2FA_RECOVER = 'auth/2fa/request-recovery'
export const API_AUTH_2FA_CONFIRM_RECOVERY = 'auth/2fa/confirm-recovery'
export const API_AUTH_2FA_TURN_OFF = 'auth/2fa/turn-off'

// User

export const API_USER_ROUTE = '/auth/me'
export const API_PARTIAL_PHONE_ROUTE = '/auth/partial-phone-number'
export const API_UPDATE_PROFILE = '/user/profile'
export const API_UPDATE_PROFILE_PICTURE = '/user/profile/picture'
export const API_UPDATE_PASSWORD = '/user/password'

// Settings
export const API_AVAILABILITY_SESSIONS_TIME_GAP =
  '/settings/availability/sessions-time-gap'
export const API_AVAILABILITY_SLOT_TIMES = '/settings/availability/slot-times'
export const API_AVAILABILITY_SLOT_TIME = '/settings/availability/slot-time'
export const API_AVAILABILITY_UPDATE_SLOT_TIME =
  '/settings/availability/slot-time'
export const API_AVAILABILITY_DELETE_SLOT_TIME =
  '/settings/availability/slot-time/{id}'

export const API_CALENDAR_THERAPIST_WORK_TIME =
  '/calendar/therapist/work-time/:start/:end'
