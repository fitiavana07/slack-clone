import React, { FC, useMemo } from 'react'
import CenteringPage from 'components/CenteringPage'
import Card from './Card'
import H2 from 'components/H2'
import H4 from 'components/H4'
import Input from 'components/Input'
import { useOnSubmit, useValueInput } from 'utils/forms'
import ActionButton from 'components/ActionButton'
import Alert from 'components/Alert'
import { DefaultErrorCodes } from 'services/operation'
import { SignupErrorCodes, useCurrentUser, useSignup } from 'services/user'
import RouterLink from 'components/RouterLink'
import BottomBar from './BottomBar'
import { Redirect } from 'react-router-dom'

const SignupPage: FC = () => {
  const { value: fullName, handleChange: handleChangeFullName } =
    useValueInput()
  const { value: username, handleChange: handleChangeUsername } =
    useValueInput()
  const { value: email, handleChange: handleChangeEmail } = useValueInput()
  const { value: password, handleChange: handleChangePassword } =
    useValueInput()

  const [callSignup, { loading, error }] = useSignup({
    fullName,
    username,
    email,
    password,
  })

  const errorMessage = useMemo(() => {
    switch (error?.code) {
      case DefaultErrorCodes.NetworkError:
        return 'Network error, please retry later'
      case SignupErrorCodes.EmailAlreadyUsed:
        return 'Email already used. Please use another email address'
      case SignupErrorCodes.UsernameAlreadyUsed:
        return 'Username already used. Please use another username'
      default:
        return
    }
  }, [error])

  const onSubmit = useOnSubmit(callSignup)

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
          <H4>Sign up</H4>
          <form {...{ onSubmit }}>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={handleChangeFullName}
              required
              placeholder="Full Name"
            />
            <Input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={handleChangeUsername}
              required
              placeholder="Username"
            />
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={handleChangeEmail}
              required
              placeholder="Email Address"
            />
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={handleChangePassword}
              required
              placeholder="Password"
            />
            {errorMessage ? <Alert>{errorMessage}</Alert> : null}
            <ActionButton loading={loading}>Sign up</ActionButton>
          </form>
        </div>
        <BottomBar>
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Already have an account?
          </span>

          <RouterLink to="/login">Login</RouterLink>
        </BottomBar>
      </Card>
    </CenteringPage>
  )
}

export default SignupPage
