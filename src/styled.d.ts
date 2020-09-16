import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    body: string;
    text: string;
    sidebar: string;
    toggleBorder: string;
    gradient: string;
  }
}