import { observable, action } from 'mobx'

import { User } from 'types/User'

export class UserStore {
  @observable
  user: User | null = null

  @action
  signIn(user: User) {
    this.user = user
  }

  @action
  singOut() {
    this.user = null
  }
}