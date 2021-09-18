/**
 * GRAPHQL_URL is the URL of the backend.
 */
export const GRAPHQL_URL =
  process.env.REACT_APP_GRAPHQL_URL || 'http://localhost:4000/graphql'

/**
 * AUTH_TOKEN_COOKIE_KEY is the key used to register the authentication token.
 */
export const AUTH_TOKEN_COOKIE_KEY =
  process.env.REACT_APP_COOKIE_KEY || 'slack-clone-auth-token'

/**
 * BASE_DOMAIN_NAME is the base domain name of the platform
 */
export const BASE_DOMAIN_NAME =
  process.env.REACT_APP_DOMAIN_NAME || 'localhost'

/**
 * CLIENT_DOMAIN is the subdomain of the current app
 */
export const CLIENT_DOMAIN = process.env.REACT_APP_CLIENT_DOMAIN || 'localhost'
