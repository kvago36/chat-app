import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps
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

const PublicRoute = ({ children: Component, ...rest }: RouteProps) => <AuthLayout><Route {...rest}>{Component}</Route></AuthLayout>

function App() {
  const { authStore, themeStore } = useStores()
  const themeMode = themeStore.theme === 'light' ? lightTheme : darkTheme;

  console.log(authStore.token)

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
          </Switch>
          <Route path="/users/:userId">
            {authStore.token ? <Home /> : <Redirect to="/login" />}
          </Route>
        </Router>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default observer(App);
