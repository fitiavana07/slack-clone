import { gql, useQuery } from '@apollo/client'
import { ChannelsQuery } from 'generated/graphql'
import { OperationResult } from 'services/operation'

const useChannels = (): [
  PartialChannel[],
  OperationResult<ChannelsErrorCode>,
] => {
  const { data, loading } = useQuery<ChannelsQuery>(QUERY_CHANNELS)
  return [data?.channels || [], { loading }]
}

export default useChannels

const QUERY_CHANNELS = gql`
  query Channels {
    channels {
      id
      name
    }
  }
`

export type PartialChannel = {
  id: string
  name: string
}

enum ChannelsErrorCode {}
