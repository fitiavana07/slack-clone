import { gql, useQuery } from '@apollo/client'
import { OperationResult } from 'services/operation'
import { PartialMessage } from './partialMessage'

import {
  ChannelMessagesQuery,
  ChannelMessagesQueryVariables,
} from '../../generated/graphql'
const useChannelMessages = (
  channelID: string,
): [Array<PartialMessage>, OperationResult<undefined>] => {
  const { data, loading } = useQuery<
    ChannelMessagesQuery,
    ChannelMessagesQueryVariables
  >(QUERY_CHANNEL_MESSAGES, { variables: { channelID } })

  return [data?.channel?.messages || [], { loading }]
}

const QUERY_CHANNEL_MESSAGES = gql`
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

export default useChannelMessages
