import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  from,
  HttpLink,
  split,
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import createAuthLink from './authLink'
import { createErrorLink } from './errorLink'
import createWSLink from './wsLink'

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
  const wsURI = 'ws://localhost:4000/graphql'
  const wsLink = createWSLink(wsURI, token)

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    from([errorLink, authLink, httpLink]),
  )

  return new ApolloClient({
    link,
    cache: cache,
  })
}
