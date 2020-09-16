import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { IntlProvider } from 'react-intl'
import { observer } from 'mobx-react'
import { ThemeProvider } from 'styled-components';

import Main from 'pages/main'
import SingIn from 'pages/login'
import SingUp from 'pages/registration'
import Home from 'pages/home'
import Test from 'pages/rxjs/sockets'

import { messages } from 'locale/messages'

import { useStores } from 'hooks/use-stores';

import { lightTheme, darkTheme } from 'theme';
import { GlobalStyles } from 'global';

function App() {
  const { authStore, themeStore } = useStores()
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
            <Route path="/login">
              <SingIn />
            </Route>
            <Route path="/registration">
              <SingUp />
            </Route>
            <Route path="/test">
              <Test />
            </Route>
          </Switch>
          <Route exact path="/users/:userId">
            {authStore.token ? <Home /> : <Redirect to="/login" />}
          </Route>
        </Router>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default observer(App);
