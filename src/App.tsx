import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
  useHistory,
  useLocation
} from 'react-router-dom';
import { IntlProvider } from 'react-intl'
import { observer } from 'mobx-react'
import { ThemeProvider } from 'styled-components';

import AuthLayout from 'layout/AuthLayout'

import Main from 'pages/main'
import About from 'pages/about'
import Contacts from 'pages/contacts'
import SingIn from 'pages/login'
import SingUp from 'pages/registration'
import Home from 'pages/home'

import Test from 'pages/rxjs/sockets'

import { messages } from 'locale/messages'

import { useStores } from 'hooks/use-stores';

import { lightTheme, darkTheme } from 'theme';
import { GlobalStyles } from 'global';

const PublicRoute = ({ children: Component, path, ...rest }: RouteProps) => <AuthLayout><Route {...rest}>{Component}</Route></AuthLayout>

const ProtectedRoute = ({ children: Component, ...rest }: RouteProps) => {
  const { authStore } = useStores()
  let history = useHistory()
  let location = useLocation()

  if (!authStore.token) {
    history.push('/login', { error: 'authorizationError', from: location.pathname })
  }

  return <Route {...rest}>{Component}</Route>
}

function App() {
  const { themeStore } = useStores()
  const themeMode = themeStore.theme === 'light' ? lightTheme : darkTheme;

  return (
    <IntlProvider locale="en" messages={messages}>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <PublicRoute path="/login">
              <SingIn />
            </PublicRoute>
            <PublicRoute path="/registration">
              <SingUp />
            </PublicRoute>
            <PublicRoute path="/about">
              <About />
            </PublicRoute>
            <PublicRoute path="/contacts">
              <Contacts />
            </PublicRoute>
            <Route path="/test">
              <Test />
            </Route>
            <ProtectedRoute path="/users/:userId">
              <Home />
            </ProtectedRoute>
          </Switch>
        </Router>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default observer(App);
