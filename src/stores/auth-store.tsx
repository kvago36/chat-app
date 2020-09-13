import { observable, action } from 'mobx'

export class AuthStore {
  @observable
  token = window.localStorage.getItem('token')

  @action
  setToken(token: string) {
    window.localStorage.setItem('token', token)
    this.token = token
  }

  @action
  clearToken() {
    window.localStorage.removeItem('token')
    this.token = ''
  }
}