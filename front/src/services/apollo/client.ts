import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  from,
  HttpLink,
} from '@apollo/client'
import createAuthLink from './authLink'
import { createErrorLink } from './errorLink'

type CreateClientType = (
  uri: string,
  token: string | null,
) => ApolloClient<NormalizedCacheObject>

export const createClient: CreateClientType = (
  uri: string,
  token: string | null,
) => {
  const errorLink = createErrorLink()
  const authLink = createAuthLink(token)
  const httpLink = new HttpLink({ uri })
  const cache = new InMemoryCache()

  return new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: cache,
  })
}
