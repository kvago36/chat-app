import React from 'react'
import { NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components' 

const list = [
  {
    name: 'Page',
    href: '/'
  },
  {
    name: 'Messages',
    href: '/messages'
  },
  { 
    name: 'Settings',
    href: '/settigs'
  }
]

const Navigation = () => {
  return (
    <SideBar>
      {
        list.map(({ name, href }) => <NavLink to={href}>{<FormattedMessage id={`navigation${name}`} />}</NavLink >)
      }
    </SideBar>
  )
}

const SideBar = styled.div`
  display: flex;
  flex-flow: column;
  color: ${({ theme }) => theme.text};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  outline: none;
`;

export default Navigation