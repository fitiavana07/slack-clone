import { gql, useQuery } from '@apollo/client'
import { User, UserQuery, UserQueryVariables } from 'generated/graphql'
import { OperationResult } from 'services/operation'

// will use cache when already queried once
const useUser = (id: string): [User | null, OperationResult<undefined>] => {
  const { data, loading } = useQuery<UserQuery, UserQueryVariables>(
    QUERY_USER,
    { variables: { id } },
  )

  return [data?.user || null, { loading }]
}

const QUERY_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      email
      username
      fullName
    }
  }
`

export default useUser
