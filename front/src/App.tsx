import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'

import Login from 'pages/Login'
import Home from 'pages/Home'
import { AUTH_TOKEN_COOKIE_KEY, GRAPHQL_URL } from 'config'
import { readCookie } from 'utils/cookie'
import { createClient } from 'services/apollo'

const token = readCookie(AUTH_TOKEN_COOKIE_KEY)
const apolloClient = createClient(GRAPHQL_URL, token)

const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
