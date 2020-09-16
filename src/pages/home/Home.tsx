import React, { useEffect, useState } from 'react'
import {
  Switch,
  Route,
  Redirect,
  useParams,
  useLocation
} from 'react-router-dom';
import { observer } from 'mobx-react'
import { Input } from 'antd';
import styled from 'styled-components'

import Layout from 'layout/Layout'

import { useStores } from 'hooks/use-stores'
import { Theme } from 'stores/theme-store'

import axios from 'axiosConfig'

const { TextArea } = Input;

const MyPage = () => <p>MyPage</p>
const Messages = () => <p>Messages</p>
const Settings = () => <p>Settings</p>

export const Counter = observer(() => {
  const location = useLocation();
  const [isFetching, setFetching] = useState(false)
  const { counterStore, themeStore, userStore } = useStores()
  const { profile: { about } } = userStore
  const { userId } = useParams();

  useEffect(() => {
    (async () => {
      setFetching(true)
      try {
        const response = await axios.get(`/users/${userId}`)
        const { user, error } = await response.data

        console.log(user, error)
      } catch (error) {
        console.error(error)
      } finally {
        setFetching(false)
      }
    })()
  }, [])

  const changeUserInfo = (event: any) => {
    const { name, value } = event.target

    console.log(name, value)
    userStore.updateAbout(value)
  }

  return (
    <Layout>
      <div>{counterStore.doubleCount}</div>
      <div>{themeStore.theme}</div>
      <Switch>
        <Route path="/">
          <MyPage />
        </Route>
        <Route path="/messages">
          <Messages />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Redirect to="/" />
      </Switch>
      <Button onClick={() => themeStore.setTheme(Theme.light)}>
        set theme: light
      </Button>
      <Button onClick={() => themeStore.setTheme(Theme.dark)}>
        set theme: dark
      </Button>
      <Button onClick={() => counterStore.increment()}>+</Button>
      <Button onClick={() => counterStore.decrement()}>-</Button>
      <TextArea name="about" defaultValue={'about'} onPressEnter={changeUserInfo} onBlur={changeUserInfo} rows={4} />
    </Layout>
  )
})

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  outline: none;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export default Counter