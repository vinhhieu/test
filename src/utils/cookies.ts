import Cookies, { CookieAttributes } from 'js-cookie'

const IS_DEV = process.env.NODE_ENV === 'development'

const getKeyWithPrefix = (key: string, isSecure?: boolean) => {
  const prefix = IS_DEV ? '' : isSecure ? '__Secure-' : '__Host-'
  return `${prefix}${key}`
}

const set = (key: string, value: string, options: CookieAttributes = {}) => {
  Cookies.set(key, value, { secure: !IS_DEV, sameSite: 'Strict', ...options })
}

const get = (key: string, defaultValue = '') => {
  return Cookies.get(key) ?? defaultValue
}

const remove = (key: string, options: CookieAttributes = {}) => {
  Cookies.remove(key, { ...options, secure: !IS_DEV })
}

const CookiesUtils = { getKeyWithPrefix, set, get, remove }

export default CookiesUtils
