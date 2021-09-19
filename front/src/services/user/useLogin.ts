import { useMutation } from '@apollo/client'
import { LoginMutation, LoginMutationVariables } from 'generated/graphql'
import { gql } from 'graphql-tag'
import { useState } from 'react'
import {
  DefaultErrorCodes,
  OperationError,
  OperationResult,
} from 'services/operation'
import { saveAccessToken } from './accessToken'

const useLogin = (args: {
  email: string
  password: string
}): [() => void, OperationResult<LoginErrorCodes>] => {
  const { email, password } = args
  const [error, setError] = useState<OperationError<LoginErrorCodes>>()
  const [mutate, { loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN, {
    variables: { email, password },
    onError: (error) => {
      const { networkError, graphQLErrors } = error
      if (networkError) {
        setError({ code: DefaultErrorCodes.NetworkError })
      } else if (graphQLErrors[0]?.extensions?.code) {
        switch (graphQLErrors[0]?.extensions?.code) {
          case 'USER_NOT_FOUND':
            setError({ code: LoginErrorCodes.UserNotFound })
            break
          case 'WRONG_PASSWORD':
            setError({ code: LoginErrorCodes.WrongPassword })
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
      const accessToken = data.login.accessToken
      saveAccessToken(accessToken)
      window.location.reload()
    },
  })

  return [mutate, { loading, error }]
}

export default useLogin

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      accessToken
    }
  }
`

export enum LoginErrorCodes {
  UserNotFound = 'USER_NOT_FOUND',
  WrongPassword = 'WRONG_PASSWORD',
}
