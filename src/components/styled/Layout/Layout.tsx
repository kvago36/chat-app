import { Layout } from 'antd'
import styled from 'styled-components'

import { StyledMenu } from 'components/styled/Menu/Menu'

const { Header, Content, Sider } = Layout;

export const StyledSider = styled(Sider)`
  transition: none;
  border-right: ${({ theme }) => `1px solid ${theme.contentBorder}`};
  background-color: ${({ theme }) => theme.body};
`

export const StyledHeader = styled(Header)`
  z-index: 1;
  padding: 0 25px;
  box-shadow: var(--header-shadow);
  background-color: ${({ theme }) => theme.header};

  @media(max-width: 768px) {
    padding: 0 15px;

    ${StyledMenu} {
      display: none
    }
  }
`

export const StyledContent = styled(Content)`
  padding: 25px;
  background-color: ${({ theme }) => theme.body};
`