import { gql, useMutation } from '@apollo/client'
import {
  ChannelMessagesQuery,
  ChannelMessagesQueryVariables,
  SendChanelMessageMutation,
  SendChanelMessageMutationVariables,
} from 'generated/graphql'
import { OperationResult } from 'services/operation'
import { QUERY_CHANNEL_MESSAGES } from './useChannelMessages'

const useSendChannelMessage = (
  channelID: string,
): [(message: string) => void, OperationResult<undefined>] => {
  const [mutate, { loading }] = useMutation<
    SendChanelMessageMutation,
    SendChanelMessageMutationVariables
  >(SEND_CHANNEL_MESSAGE, {
    update: (cache, { data }) => {
      const newMessage = data?.sendChannelMessage?.message
      if (!newMessage) {
        return
      }

      const queryData = cache.readQuery<
        ChannelMessagesQuery,
        ChannelMessagesQueryVariables
      >({
        query: QUERY_CHANNEL_MESSAGES,
        variables: { channelID },
      })
      const messages = queryData?.channel?.messages || []

      cache.writeQuery<ChannelMessagesQuery, ChannelMessagesQueryVariables>({
        query: QUERY_CHANNEL_MESSAGES,
        variables: { channelID },
        data: {
          channel: {
            id: channelID,
            messages: [...messages, newMessage],
          },
        },
      })
    },
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
        content
        createdAt
        author {
          id
        }
      }
    }
  }
`
