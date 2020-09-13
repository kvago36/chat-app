import React from 'react'
import { observer } from 'mobx-react'
import { Input } from 'antd';
import styled from 'styled-components'

import Layout from 'layout/Layout'

import { useStores } from 'hooks/use-stores'
import { Theme } from 'stores/theme-store'

const { TextArea } = Input;

export const Counter = observer(() => {
  const { counterStore, themeStore, userStore } = useStores()
  const { profile: { about } } = userStore

  console.log(about, '1')

  const changeUserInfo = (event: any) => {
    const { name, value } = event.target

    console.log(name, value)
    userStore.updateAbout(value)
  }

  return (
    <Layout>
      <div>{counterStore.doubleCount}</div>
      <div>{themeStore.theme}</div>
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