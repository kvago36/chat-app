import React from 'react'

import { CounterStore } from 'stores/counter-store'
import { ThemeStore } from 'stores/theme-store'
import { AuthStore } from 'stores/auth-store'
import { UserStore } from 'stores/user-store'

import { RootStore } from 'stores/root-store'

export const rootStoreContext = React.createContext(new RootStore())

export const storesContext = React.createContext({
  counterStore: new CounterStore(),
  authStore: new AuthStore(),
  userStore: new UserStore(),
  themeStore: new ThemeStore(),
})