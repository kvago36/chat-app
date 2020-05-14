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

import SingIn from 'pages/login'
import SingUp from 'pages/registration'
import Home from 'pages/home'
import Test from 'pages/rxjs/sockets'

import { messages } from 'locale/messages'

import { useStores } from 'hooks/use-stores';

import { lightTheme, darkTheme } from 'theme';
import { GlobalStyles } from 'global';

function App() {
  const { userStore, themeStore } = useStores()
  const themeMode = themeStore.theme === 'light' ? lightTheme : darkTheme;

  console.log(userStore.user)

  return (
    <IntlProvider locale="en" messages={messages}>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route path="/login">
              <SingIn />
            </Route>
            <Route path="/registration">
              <SingUp />
            </Route>
            <Route path="/test">
              <Test />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
          <Route exact path="/">
            {userStore.user ? <Home /> : <Redirect to="/login" />}
          </Route>
        </Router>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default observer(App);
