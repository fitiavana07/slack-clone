import { gql, useMutation } from '@apollo/client'
import { SignupMutation, SignupMutationVariables } from 'generated/graphql'
import { useState } from 'react'
import {
  DefaultErrorCodes,
  OperationError,
  OperationResult,
} from 'services/operation'
import { saveAccessToken } from './accessToken'

const useSignup = (args: {
  fullName: string
  username: string
  email: string
  password: string
}): [() => void, OperationResult<SignupErrorCodes>] => {
  const [error, setError] = useState<OperationError<SignupErrorCodes>>()
  const [mutate, { loading }] = useMutation<
    SignupMutation,
    SignupMutationVariables
  >(SIGNUP, {
    variables: args,
    onError: (error) => {
      const { networkError, graphQLErrors } = error
      if (networkError) {
        setError({ code: DefaultErrorCodes.NetworkError })
      } else if (graphQLErrors[0]?.extensions?.code) {
        switch (graphQLErrors[0]?.extensions?.code) {
          case 'EMAIL_ALREADY_USED':
            setError({ code: SignupErrorCodes.EmailAlreadyUsed })
            break
          case 'USERNAME_ALREADY_USED':
            setError({ code: SignupErrorCodes.UsernameAlreadyUsed })
            break
          default:
            setError({
              code: DefaultErrorCodes.UnknownError,
              message: graphQLErrors[0]?.extensions?.message,
            })
        }
      }
    },
    onCompleted: (data) => {
      const accessToken = data.signup.accessToken
      saveAccessToken(accessToken)
      window.location.reload()
    },
  })

  return [mutate, { loading, error }]
}

export const SIGNUP = gql`
  mutation Signup(
    $fullName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    signup(
      input: {
        fullName: $fullName
        username: $username
        email: $email
        password: $password
      }
    ) {
      accessToken
    }
  }
`

export default useSignup

export enum SignupErrorCodes {
  EmailAlreadyUsed = 'EMAIL_ALREADY_USED',
  UsernameAlreadyUsed = 'USERNAME_ALREADY_USED',
}
