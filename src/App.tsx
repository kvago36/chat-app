import React, { Suspense, lazy } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
  useHistory,
  useLocation
} from 'react-router-dom'
import { IntlProvider } from 'react-intl'
import { observer } from 'mobx-react'
import { Layout } from 'antd'
import { ThemeProvider } from 'styled-components'

import Test from 'pages/rxjs/sockets'

import { messages } from 'locale/messages'

import { useStores } from 'hooks/use-stores';

import { lightTheme, darkTheme } from 'theme';
import { GlobalStyles } from 'global';

import Header from 'components/header'

const Main = lazy(() => import('pages/main'))
const About = lazy(() => import('pages/about'))
const Contacts = lazy(() => import('pages/contacts'))
const SingIn = lazy(() => import('pages/login'))
const SingUp = lazy(() => import('pages/registration'))
const Home = lazy(() => import('pages/home'))

const PublicRoute = ({ children: Component, path, ...rest }: RouteProps) => <Route {...rest}>{Component}</Route>

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
  const layoutStyle = { height: '100%', backgroundColor: 'transparent' }

  console.log(themeStore.theme)

  return (
    <IntlProvider locale="en" messages={messages}>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <Router>
          <Layout style={layoutStyle}>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
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
          </Suspense>
          </Layout>
        </Router>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default observer(App);
