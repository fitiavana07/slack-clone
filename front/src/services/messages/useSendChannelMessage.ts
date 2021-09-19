import { gql, useMutation } from '@apollo/client'
import {
  SendChanelMessageMutation,
  SendChanelMessageMutationVariables,
} from 'generated/graphql'
import { OperationResult } from 'services/operation'

const useSendChannelMessage = (
  channelID: string,
): [(message: string) => void, OperationResult<undefined>] => {
  const [mutate, { loading }] = useMutation<
    SendChanelMessageMutation,
    SendChanelMessageMutationVariables
  >(SEND_CHANNEL_MESSAGE, {
    // TODO onError
  })

  return [
    (message) =>
      mutate({ variables: { destID: channelID, messageContent: message } }),
    { loading },
  ]
}

export default useSendChannelMessage

const SEND_CHANNEL_MESSAGE = gql`
  mutation SendChanelMessage($messageContent: String!, $destID: ID!) {
    sendChannelMessage(
      input: { messageContent: $messageContent, destID: $destID }
    ) {
      message {
        id
      }
    }
  }
`
