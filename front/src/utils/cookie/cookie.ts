export const writeCookie = (params: CookieParams): void => {
  document.cookie = `${params.name}=${params.value};Max-Age=${params.maxAge};domain=${params.domain};path=/`
}

export const readCookie = (name: string): string | null => {
  const nameWithEq = `${name}=`

  // get token2=vvv2; token=vvvvv
  const cookiesSplitted = document.cookie.split(';')

  for (let i = 0, len = cookiesSplitted.length; i < len; i++) {
    let c = cookiesSplitted[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length)
    }
    if (c.indexOf(nameWithEq) === 0) {
      return c.substring(nameWithEq.length, c.length)
    }
  }
  return null
}

export const deleteCookie = (name: string): void => {
  writeCookie({
    name,
    value: '',
    maxAge: 0,
    domain: '',
  })
}

type CookieParams = {
  /**
   * Name of the cookie
   */
  name: string

  /**
   * Value of the cookie
   */
  value: string

  /**
   * Domaine of the cookie
   */
  domain: string

  /**
   * Max age of the cookie, in seconds
   */
  maxAge: number
}
