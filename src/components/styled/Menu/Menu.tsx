import { Menu } from 'antd';
import styled from 'styled-components'

export const StyledMenu = styled(Menu)`
  transition: none;
  background: ${({ theme }) => theme.header};
`

export const StyledMenuItem = styled(Menu.Item)`
  color: ${({ theme }) => theme.main};
`