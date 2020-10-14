import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components' 

import { useStores } from 'hooks/use-stores'

import { StyledNavLink } from 'components/styled/Navigation/Navigation'

const Navigation = () => {
  const { userStore } = useStores()

  return (
    <SideBar>
      <StyledNavLink exact to={`/users/${userStore.id}`} activeClassName="selected">
        <FormattedMessage id="navigationPage" />
      </StyledNavLink>
      <StyledNavLink to={`/users/${userStore.id}/messages`} activeClassName="selected">
        <FormattedMessage id="navigationMessages" />
      </StyledNavLink>
      <StyledNavLink to={`/users/${userStore.id}/settings`} activeClassName="selected">
        <FormattedMessage id="navigationSettings" />
      </StyledNavLink>
    </SideBar>
  )
}

const SideBar = styled.div`
  display: flex;
  flex-flow: column;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  outline: none;
`;

export default Navigation