import { gql, useQuery } from '@apollo/client'
import { User, UsersQuery } from 'generated/graphql'
import { OperationResult } from 'services/operation'

const useUsers = (): [User[], OperationResult<UsersErrorCode>] => {
  const { data, loading } = useQuery<UsersQuery>(QUERY_USERS)
  return [data?.users || [], { loading }]
}

export default useUsers

const QUERY_USERS = gql`
  query Users {
    users {
      id
      email
      username
      fullName
    }
  }
`

enum UsersErrorCode {}
