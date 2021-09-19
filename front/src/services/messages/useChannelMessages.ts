import { gql, useQuery } from '@apollo/client'
import { OperationResult } from 'services/operation'
import { PartialMessage } from './partialMessage'
import {
  ChannelMessagesQuery,
  ChannelMessagesQueryVariables,
  NewChannelMessageSubscription,
  NewChannelMessageSubscriptionVariables,
} from '../../generated/graphql'

const useChannelMessages = (
  channelID: string,
): [
  messages: Array<PartialMessage>,
  result: OperationResult<undefined>,
  subscribe: () => void,
] => {
  const { data, loading, subscribeToMore } = useQuery<
    ChannelMessagesQuery,
    ChannelMessagesQueryVariables
  >(QUERY_CHANNEL_MESSAGES, { variables: { channelID } })

  const subscribe = () =>
    subscribeToMore<
      NewChannelMessageSubscription,
      NewChannelMessageSubscriptionVariables
    >({
      document: SUBSCRIPTION_CHANNEL_MESSAGE,
      variables: { channelID },
      updateQuery: (previous, { subscriptionData, variables }) => {
        if (!subscriptionData?.data.newChannelMessage) {
          return previous
        }
        if (variables?.channelID !== channelID) {
          // wrong channelID
          return previous
        }

        const messages = previous.channel?.messages || []
        const newMessage = subscriptionData.data.newChannelMessage
        if (!previous.channel) {
          // new data to cache
          return {
            channel: {
              __typename: 'Channel',
              id: channelID,
              messages: [newMessage],
            },
          }
        }

        if (messages.find((m) => m.id === newMessage.id)) {
          // the message is already here
          return previous
        }

        return {
          channel: {
            __typename: 'Channel',
            id: channelID,
            messages: [...messages, newMessage],
          },
        }
      },
    })
  return [data?.channel?.messages || [], { loading }, subscribe]
}

export const QUERY_CHANNEL_MESSAGES = gql`
  query ChannelMessages($channelID: ID!) {
    channel(id: $channelID) {
      id
      messages {
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

const SUBSCRIPTION_CHANNEL_MESSAGE = gql`
  subscription NewChannelMessage($channelID: ID!) {
    newChannelMessage(channelID: $channelID) {
      id
      content
      createdAt
      author {
        id
      }
    }
  }
`

export default useChannelMessages
