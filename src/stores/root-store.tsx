import { create } from 'mobx-persist'

import { CounterStore } from 'stores/counter-store'
import { UserStore } from 'stores/user-store'
import { ThemeStore } from 'stores/theme-store'
import { AuthStore } from 'stores/auth-store'

const hydrate = create({
  jsonify: true
})

export class RootStore {
  userStore = new UserStore();
  counterStore = new CounterStore();
  themeStore = new ThemeStore();
  authStore = new AuthStore();

  constructor() {
    hydrate('user', this.userStore)
    hydrate('count', this.counterStore).then(() => console.log('someStore has been hydrated'))
  }
};