import { DefaultTheme } from 'styled-components';

import { COLORS } from 'style/colors'

export const lightTheme : DefaultTheme = {
  header: '#fff',
  body: '#fff',
  contentBorder: '#dadde1',
  text: '#363537',
  sidebar: '#fff',
  main: COLORS.secondaryPurple,
  mainHover: COLORS.secondaryPurpleLight,
  mainHoverLight: COLORS.secondaryPurpleLightMain,
  mainActive: COLORS.secondaryPurpleDark,
  mainActiveDark: COLORS.secondaryPurpleDarkMain,
  gradient: 'linear-gradient(#39598A, #79D7ED)',
}

export const darkTheme : DefaultTheme = {
  header: '#1e2125',
  body: '#161616',
  contentBorder: '#606770',
  text: '#fff',
  sidebar: '#1c1e21',
  main: COLORS.primary,
  mainHover: COLORS.primaryLight,
  mainHoverLight: COLORS.primaryLightMain,
  mainActive: COLORS.primaryDark,
  mainActiveDark: COLORS.primaryDarkMain,
  gradient: 'linear-gradient(#091236, #1E215D)',
}