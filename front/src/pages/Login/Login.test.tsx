import React from 'react'

import { screen } from '@testing-library/react'
import LoginPage from './Login'
import { render } from 'utils/testing'
import { LOGIN } from 'services/user'
import { act } from 'react-dom/test-utils'
import userEvent from '@testing-library/user-event'
import { MockedProviderProps } from '@apollo/client/testing'
import { GraphQLError } from 'graphql'

test('smoke test', () => {
  render(<LoginPage />)

  expect(screen.getByPlaceholderText("Nom d'utilisateur")).toBeDefined()
  expect(screen.getByPlaceholderText('Mot de passe')).toBeDefined()
  expect(screen.getByText('Se connecter')).toBeDefined()
})

test('network error', async () => {
  const apolloProviderMocks: MockedProviderProps['mocks'] = [
    {
      request: {
        query: LOGIN,
        variables: { login: 'login', password: 'password' },
      },
      error: new Error('NetworkError'),
    },
  ]

  render(<LoginPage />, { providersProps: { apolloProviderMocks } })

  userEvent.click(screen.getByText('Se connecter'))

  expect(screen.getByText('Chargement...')).toBeDefined()

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0))
  })

  expect(
    screen.getByText('Erreur de réseau, vérifiez votre connexion.'),
  ).toBeDefined()
})

test('user not found', async () => {
  const apolloProviderMocks: MockedProviderProps['mocks'] = [
    {
      request: {
        query: LOGIN,
        variables: { login: 'login', password: 'password' },
      },
      result: {
        errors: [
          new GraphQLError('User not found', null, null, null, null, null, {
            code: 'USER_NOT_FOUND',
          }),
        ],
      },
    },
  ]

  render(<LoginPage />, { providersProps: { apolloProviderMocks } })

  userEvent.type(screen.getByPlaceholderText("Nom d'utilisateur"), 'login')
  userEvent.type(screen.getByPlaceholderText('Mot de passe'), 'password')
  userEvent.click(screen.getByText('Se connecter'))

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0))
  })

  expect(screen.getByText('Utilisateur introuvable.')).toBeDefined()
})

test('wrong password', async () => {
  const apolloProviderMocks: MockedProviderProps['mocks'] = [
    {
      request: {
        query: LOGIN,
        variables: { login: 'login', password: 'password' },
      },
      result: {
        errors: [
          new GraphQLError('Wrong password', null, null, null, null, null, {
            code: 'WRONG_PASSWORD',
          }),
        ],
      },
    },
  ]

  render(<LoginPage />, { providersProps: { apolloProviderMocks } })

  userEvent.type(screen.getByPlaceholderText("Nom d'utilisateur"), 'login')
  userEvent.type(screen.getByPlaceholderText('Mot de passe'), 'password')
  userEvent.click(screen.getByText('Se connecter'))

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0))
  })

  expect(screen.getByText('Mot de passe incorrect.')).toBeDefined()
})

export {}
