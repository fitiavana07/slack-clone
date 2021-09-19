import { gql, useMutation } from '@apollo/client'
import {
  ChannelsQuery,
  CreateChannelMutation,
  CreateChannelMutationVariables,
} from 'generated/graphql'
import { OperationResult } from 'services/operation'
import { QUERY_CHANNELS } from './useChannels'

const useCreateChannel = (): [
  (name: string) => void,
  OperationResult<undefined>,
] => {
  const [mutate, { loading }] = useMutation<
    CreateChannelMutation,
    CreateChannelMutationVariables
  >(CREATE_CHANNEL, {
    update: (cache, { data }) => {
      const newChannel = data?.addChannel?.channel
      if (!newChannel) {
        return
      }

      const queryData = cache.readQuery<ChannelsQuery>({
        query: QUERY_CHANNELS,
      })
      const channels = queryData?.channels || []

      cache.writeQuery<ChannelsQuery>({
        query: QUERY_CHANNELS,
        data: {
          channels: [...channels, newChannel],
        },
      })
    },
  })

  return [(name) => mutate({ variables: { name } }), { loading }]
}

const CREATE_CHANNEL = gql`
  mutation CreateChannel($name: String!) {
    addChannel(input: { name: $name }) {
      channel {
        id
        name
      }
    }
  }
`

export default useCreateChannel
