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

import { messages } from 'locale/messages'

import { useStores } from 'hooks/use-stores';

import { lightTheme, darkTheme } from 'theme';
import { GlobalStyles } from 'global';

import 'antd/dist/antd.css';

import { Server, Response } from "miragejs"

new Server({
  routes() {
    this.namespace = "api"

    this.post("/singin", (schema, request) => {
      const { username, password } = JSON.parse(request.requestBody)
      const headers = {}

      if (!username || !password) {
        // 404 no user
        return new Response(404, headers, { message: 'Empty body'})
      }

      if (username !== 'user') {
        // 404 wrong data
        return new Response(404, headers, { message: 'User not found'})
      }

      return {
        id: 1, 
        name: "User",
        login: 'user',
        year: 2010 ,
      }
    },
    {
      timing: 1000
    })
  },
})


function App() {
  const { userStore, themeStore } = useStores()
  const themeMode = themeStore.theme === 'light' ? lightTheme : darkTheme;

  return (
    <IntlProvider locale="en" messages={messages}>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route path="/singUp">
              <SingUp />
            </Route>
            <Route path="/singIn">
              <SingIn />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
          <Route exact path="/">
            {userStore ? <Home /> : <Redirect to="/singIn" />}
          </Route>
        </Router>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default observer(App);
