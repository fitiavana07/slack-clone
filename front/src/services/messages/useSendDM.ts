import { gql, useMutation } from '@apollo/client'
import {
  DMsQuery,
  DMsQueryVariables,
  SendDmMutation,
  SendDmMutationVariables,
} from 'generated/graphql'
import { OperationResult } from 'services/operation'
import { QUERY_DMS } from './useDMs'

const useSendDM = (
  destID: string,
): [(message: string) => void, OperationResult<undefined>] => {
  const [mutate, { loading }] = useMutation<
    SendDmMutation,
    SendDmMutationVariables
  >(SEND_DM, {
    update: (cache, { data }) => {
      const newMessage = data?.sendDM?.message
      if (!newMessage) {
        return
      }

      const queryData = cache.readQuery<DMsQuery, DMsQueryVariables>({
        query: QUERY_DMS,
        variables: { destID },
      })
      const messages = queryData?.dms || []

      if (!messages.find((m) => m.id === newMessage.id)) {
        // not yet in the cache
        cache.writeQuery<DMsQuery, DMsQueryVariables>({
          query: QUERY_DMS,
          variables: { destID },
          data: {
            dms: [...messages, newMessage],
          },
        })
      }
    },
    // TODO onError
  })

  return [
    (message) => mutate({ variables: { destID, messageContent: message } }),
    { loading },
  ]
}

export default useSendDM

const SEND_DM = gql`
  mutation SendDM($messageContent: String!, $destID: ID!) {
    sendDM(input: { messageContent: $messageContent, destID: $destID }) {
      message {
        id
        content
        createdAt
        author {
          id
        }
        destUser {
          id
        }
      }
    }
  }
`
