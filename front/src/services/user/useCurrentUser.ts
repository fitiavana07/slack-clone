import { gql, useQuery } from '@apollo/client'
import { CurrentUserQuery, User } from 'generated/graphql'
import { OperationResult } from 'services/operation'

const useCurrentUser = (): [
  User | null | undefined,
  OperationResult<CurrentUserErrorCode>,
] => {
  const { data, loading } = useQuery<CurrentUserQuery>(QUERY_CURRENT_USER)

  return [data?.currentUser, { loading }]
}

export default useCurrentUser

export const QUERY_CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      email
      username
      fullName
    }
  }
`

export enum CurrentUserErrorCode {}
