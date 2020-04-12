import React from 'react'
import { CounterStore } from 'stores/counter-store'
import { ThemeStore } from 'stores/theme-store'
import { UserStore } from 'stores/user-store'

export const storesContext = React.createContext({
  counterStore: new CounterStore(),
  userStore: new UserStore(),
  themeStore: new ThemeStore(),
})