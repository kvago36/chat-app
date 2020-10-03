import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    header: string,
    body: string,
    contentBorder: string,
    text: string,
    sidebar: string,
    main: string,
    mainHover: string,
    mainHoverLight: string,
    mainActive: string,
    mainActiveDark: string,
    gradient: string
  }
}