import React, { useMemo } from 'react'
import { useOnSubmit, useValueInput } from 'utils/forms'
import { LoginErrorCodes, useLogin } from 'services/user'
import Page from './Page'
import Card from './Card'
import H2 from './H2'
import Input from 'components/Input'
import ActionButton from 'components/ActionButton'
import { DefaultErrorCodes } from 'services/operation'
import Alert from 'components/Alert'

export const LoginPage: React.FC = () => {
  const { value: email, handleChange: handleChangeEmail } = useValueInput()
  const { value: password, handleChange: handleChangePassword } =
    useValueInput()

  const [callLogin, { loading, error }] = useLogin({ email, password })

  const errorMessage = useMemo(() => {
    switch (error?.code) {
      case DefaultErrorCodes.NetworkError:
        return 'Erreur de réseau, vérifiez votre connexion.'
      case LoginErrorCodes.UserNotFound:
        return 'Utilisateur introuvable.'
      case LoginErrorCodes.WrongPassword:
        return 'Mot de passe incorrect.'
      default:
        return
    }
  }, [error])

  const onSubmit = useOnSubmit(callLogin)

  return (
    <Page>
      <Card>
        <H2>Slack Clone</H2>
        <form {...{ onSubmit }}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={handleChangeEmail}
            required
            placeholder="Nom d'utilisateur"
          />
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            onChange={handleChangePassword}
            placeholder="Mot de passe"
          />
          {errorMessage ? <Alert>{errorMessage}</Alert> : null}
          <ActionButton {...{ loading }}>Se connecter</ActionButton>
        </form>
      </Card>
    </Page>
  )
}

export default LoginPage
