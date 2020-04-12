import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import { useStores } from 'hooks/use-stores'
import { Theme } from 'stores/theme-store'

export const Counter = observer(() => {
  const { counterStore, themeStore } = useStores()

  return (
    <>
      <div>{counterStore.doubleCount}</div>
      <div>{themeStore.theme}</div>
      <Button onClick={() => themeStore.setTheme(Theme.light)}>
        set theme: light
      </Button>
      <Button onClick={() => themeStore.setTheme(Theme.dark)}>
        set theme: dark
      </Button>
      <Button onClick={() => counterStore.increment()}>++</Button>
      <Button onClick={() => counterStore.decrement()}>--</Button>
    </>
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