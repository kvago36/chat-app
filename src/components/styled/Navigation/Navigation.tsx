import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const StyledNavLink = styled(NavLink)`
  font-weight: bold;
  text-decoration: underline;
  color: ${({ theme }) => theme.text};

  :hover {
    color: ${({ theme }) => theme.mainHoverLight};
  }

  :focus,
  :active {
    color: ${({ theme }) => theme.mainActive};
  }

  &:not(:first-child) {
    padding-top: 4px;
  }

  &.selected {
    color: ${({ theme }) => theme.main};
  }
`