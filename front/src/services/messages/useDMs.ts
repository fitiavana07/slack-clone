import { gql, useQuery } from '@apollo/client'
import { DMsQuery, DMsQueryVariables } from 'generated/graphql'
import { OperationResult } from 'services/operation'
import { PartialMessage } from './partialMessage'

const useDMs = (
  destID: string,
): [Array<PartialMessage>, OperationResult<undefined>] => {
  const { data, loading } = useQuery<DMsQuery, DMsQueryVariables>(QUERY_DMS, {
    variables: { destID },
  })
  return [data?.dms || [], { loading }]
}

export default useDMs

const QUERY_DMS = gql`
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
