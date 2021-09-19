import React, { useMemo } from 'react'
import { useOnSubmit, useValueInput } from 'utils/forms'
import { LoginErrorCodes, useCurrentUser, useLogin } from 'services/user'
import Card from './Card'
import Input from 'components/Input'
import ActionButton from 'components/ActionButton'
import { DefaultErrorCodes } from 'services/operation'
import Alert from 'components/Alert'
import CenteringPage from 'components/CenteringPage'
import H2 from 'components/H2'
import H4 from 'components/H4'
import BottomBar from './BottomBar'
import RouterLink from 'components/RouterLink'
import { Redirect } from 'react-router-dom'

export const LoginPage: React.FC = () => {
  const { value: email, handleChange: handleChangeEmail } = useValueInput()
  const { value: password, handleChange: handleChangePassword } =
    useValueInput()

  const [callLogin, { loading, error }] = useLogin({ email, password })

  const errorMessage = useMemo(() => {
    switch (error?.code) {
      case DefaultErrorCodes.NetworkError:
        return 'Network Error, please retry later'
      case LoginErrorCodes.UserNotFound:
        return 'User not found'
      case LoginErrorCodes.WrongPassword:
        return 'Wrong password'
      default:
        return
    }
  }, [error])

  const onSubmit = useOnSubmit(callLogin)

  const [currentUser, { loading: loadingCurrentUser }] = useCurrentUser()

  if (loadingCurrentUser) {
    return <p>Loading...</p>
  }

  if (currentUser) {
    return <Redirect to="/" />
  }

  return (
    <CenteringPage>
      <Card>
        <div className="px-6 py-4">
          <H2>Slack Clone</H2>
          <H4>Sign in</H4>
          <form {...{ onSubmit }}>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={handleChangeEmail}
              required
              placeholder="Email address"
            />
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={handleChangePassword}
              placeholder="Password"
            />
            {errorMessage ? <Alert>{errorMessage}</Alert> : null}
            <ActionButton loading={loading}>Login</ActionButton>
          </form>
        </div>
        <BottomBar>
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Dont&apos;t have an account yet?
          </span>

          <RouterLink to="/signup">Signup</RouterLink>
        </BottomBar>
      </Card>
    </CenteringPage>
  )
}

export default LoginPage
