import { observable, action } from 'mobx'

const localTheme = window.localStorage.getItem('theme');
const matcher = window.matchMedia('(prefers-color-scheme:dark)')

export enum Theme {
  dark = 'dark',
  light = 'light'
}

export class ThemeStore {
  @observable
  theme = localTheme ? localTheme : matcher.matches ? 'dark' : 'light'

  constructor() {
    matcher.addListener(event => {
      this.setTheme(event.matches ? Theme.dark : Theme.light)
    });
  }

  @action
  setTheme(newTheme: Theme) {
    window.localStorage.setItem('theme', newTheme)
    this.theme = newTheme
  }
}