import React from 'react'
import { NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components' 

import { useStores } from 'hooks/use-stores'

const Navigation = () => {
  const { userStore } = useStores()

  console.log(userStore.id)

  return (
    <SideBar>
      <NavLink to={`/users/${userStore.id}`}><FormattedMessage id="navigationPage" /></NavLink>
      <NavLink to={`/users/${userStore.id}/messages`}><FormattedMessage id="navigationMessages" /></NavLink>
      <NavLink to={`/users/${userStore.id}/settings`}><FormattedMessage id="navigationSettings" /></NavLink>
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