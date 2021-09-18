import { ApolloLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

export const createErrorLink = (): ApolloLink => {
  return onError((error) => {
    const { graphQLErrors, networkError } = error
    if (graphQLErrors) {
      graphQLErrors.forEach((e) => {
        const { message, locations, path, extensions } = e
        console.log(
          `[GraphQL error] ${extensions?.code}: ${message} (Location: ${locations}, Path: ${path})`,
        )
      })
    }
    if (networkError) {
      console.log(`[Network error] ${networkError}`)
    }
  })
}
