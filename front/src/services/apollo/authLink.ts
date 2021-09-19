import { ApolloLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const createAuthLink = (token: string | null): ApolloLink => {
  return setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token || '',
      },
    }
  })
}

export default createAuthLink
