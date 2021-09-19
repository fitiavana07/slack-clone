import { ApolloLink } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'

const createWSLink = (uri: string, token: string | null): ApolloLink => {
  return new WebSocketLink({
    uri,
    options: {
      reconnect: true,
      connectionParams: {
        authorization: token,
      },
    },
  })
}

export default createWSLink
