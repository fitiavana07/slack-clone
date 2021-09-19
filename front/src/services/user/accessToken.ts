import { AUTH_TOKEN_COOKIE_KEY, CLIENT_DOMAIN } from 'config'
import { deleteCookie, writeCookie } from 'utils/cookie'

const MAX_AGE = 30 * 24 * 60 * 60 // 30 days

export const saveAccessToken = (accessToken: string): void => {
  writeCookie({
    name: AUTH_TOKEN_COOKIE_KEY,
    value: accessToken,
    domain: CLIENT_DOMAIN,
    maxAge: MAX_AGE,
  })
}

export const clearAccessToken = (): void => {
  deleteCookie(AUTH_TOKEN_COOKIE_KEY)
}
