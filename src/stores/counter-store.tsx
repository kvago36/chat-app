import { observable, action, computed } from 'mobx'
import { persist } from 'mobx-persist'

export class CounterStore {
  @persist
  @observable
  count = 0

  @action
  increment() {
    this.count++
  }

  @action
  decrement() {
    this.count--
  }

  @computed
  get doubleCount() {
    return this.count * 2
  }
}