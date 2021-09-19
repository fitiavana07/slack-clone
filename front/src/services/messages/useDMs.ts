import { gql, useQuery } from '@apollo/client'
import {
  DMsQuery,
  DMsQueryVariables,
  NewDMsSubscription,
  NewDMsSubscriptionVariables,
} from 'generated/graphql'
import { OperationResult } from 'services/operation'
import { PartialMessage } from './partialMessage'

const useDMs = (
  destID: string,
): [
  messages: Array<PartialMessage>,
  result: OperationResult<undefined>,
  subscribe: () => void,
] => {
  const { data, loading, subscribeToMore } = useQuery<
    DMsQuery,
    DMsQueryVariables
  >(QUERY_DMS, {
    variables: { destID },
  })

  const subscribe = () =>
    subscribeToMore<NewDMsSubscription, NewDMsSubscriptionVariables>({
      document: DM_SUBSCRIPTION,
      variables: { destID },
      updateQuery: (previous, { subscriptionData }) => {
        if (!subscriptionData?.data?.newDM) {
          return previous
        }
        const messages = previous.dms || []
        const newMessage = subscriptionData.data.newDM
        if (messages.find((m) => m.id === newMessage.id)) {
          // already here
          return previous
        }
        return {
          dms: [...messages, newMessage],
        }
      },
    })

  return [data?.dms || [], { loading }, subscribe]
}

export default useDMs

export const QUERY_DMS = gql`
  query DMs($destID: ID!) {
    dms(destID: $destID) {
      id
      content
      author {
        id
      }
      destUser {
        id
      }
      createdAt
    }
  }
`

const DM_SUBSCRIPTION = gql`
  subscription NewDMs($destID: ID!) {
    newDM(destID: $destID) {
      id
      content
      author {
        id
      }
      destUser {
        id
      }
      createdAt
    }
  }
`
