import { gql, useQuery } from '@apollo/client'
import { DMsQuery, DMsQueryVariables, Maybe } from 'generated/graphql'
import { OperationResult } from 'services/operation'

export type PartialMessage = {
  __typename?: 'Message'
  id: string
  content: string
  createdAt: any
  author: { __typename?: 'User'; id: string }
  destUser?: Maybe<{ __typename?: 'User'; id: string }>
}
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
