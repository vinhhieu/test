import { default as CookiesUtils } from 'utils/cookies'

export const AUTH_TOKEN = CookiesUtils.getKeyWithPrefix('aut', true)
export const ACCESS_TOKEN_EXPIRE_DAYS = 7
export const LOGIN_FORM_STATE = { LOGIN: 1, RESET: 2, EMAIL_SENT: 3 }
export const PASSWORD_TOKEN_TYPE = { ORGANIZATION: 'org', ACCOUNT: 'account' }
export const TOKEN_EXPIRED_TYPE = { FORGOT_PASSWORD: '1', NEW_ACCOUNT: '2', NEW_ORGANIZATION: '3' }

